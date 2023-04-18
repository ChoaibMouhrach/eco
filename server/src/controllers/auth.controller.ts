import { Request, Response } from "express";
import { loginSchema, registerSchema } from "../validation/auth.schema";
import User from "../models/User";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import z from "zod";
import { sendMail } from "../utils/email";
import { Auth, AuthRequest } from "../interfaces/User";
import { checkTokensLimit, generateAccessToken, generateEmailConfirmationToken, generateForgotPasswordToken, generateRefreshToken, verifyEmailConfirmationToken, verifyForgotPasswordToken } from "../repositories/auth.repository";

/* handles the login functionality */
export const login = async (request: Request, response: Response) => {
  /* validate the request body */
  const validation = loginSchema.safeParse(request.body);

  if (!validation.success) {
    return response.status(400).json({ errors: validation.error.issues });
  }

  const { email, password } = validation.data;

  /* to check if the user does exists */
  let user = await User.findOne({ email });

  if (!user) {
    return response.status(400).json({ message: "Email Address or Password is not correct" });
  }

  /* comparing the password with the hashed password to check if the password is correct or not */
  if (!bcrypt.compareSync(password, user.password)) {
    return response.status(400).json({ message: "Email Address or Password is not correct" });
  }

  /* generating accessToken */
  const plainTextAccessToken = generateAccessToken(user._id);

  /* generating refreshToken */
  const plainTextRefreshToken = generateRefreshToken(user._id);

  /* adding the token id to the tokens used by the specified id */
  user.refreshTokens.push({
    token: plainTextRefreshToken,
    createdAt: new Date(),
  });

  await user.save();

  response.setHeader("Set-Cookie", [`refreshToken=${plainTextRefreshToken}`, `accessToken=${plainTextAccessToken}`]);

  return response.json(user.prepare());
};

export const register = async (request: Request, response: Response) => {
  const validation = registerSchema.safeParse(request.body);

  if (!validation.success) {
    return response.status(400).json({ errors: validation.error.issues });
  }

  const body = validation.data;

  if (await User.exists({ email: body.email })) {
    return response.status(400).json({ message: "Email Address is already taken" });
  }

  let user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password, Number(config.SALT)),
  });

  /* generating access token  */
  const plainTextAccessToken = generateAccessToken(user._id);

  /* generating refresh token */
  const plainTextRefreshToken = generateRefreshToken(user._id);

  /* generate email confirmation token  */
  const emailConfirmationToken = generateEmailConfirmationToken(user._id);

  if (config.ENV !== "testing") {
    console.log("Email Sent");
    await sendMail({
      to: user.email,
      subject: "Email Address Confirmation",
      template: {
        path: "auth/confirm-email-address.ejs",
        data: {
          url: `${config.CLIENT_HOST}:${config.CLIENT_PORT}/confirm-email/${emailConfirmationToken}`,
          name: config.NAME,
        },
      },
    });
  }

  user.confirmEmailTokens.push({
    token: emailConfirmationToken,
    createdAt: new Date(),
  });
  user.refreshTokens.push({
    token: plainTextRefreshToken,
    createdAt: new Date(),
  });

  await user.save();

  response.setHeader("Set-Cookie", [`refreshToken=${plainTextRefreshToken}`, `accessToken=${plainTextAccessToken}`]);

  return response.status(201).json(user.prepare());
};

export const logout = async (request: AuthRequest, response: Response) => {
  const { user, token } = request.auth as Auth;

  user.refreshTokens = user.refreshTokens.filter((refreshToken) => refreshToken.token !== token);

  await user.save();

  response.setHeader("Set-Cookie", ["refreshToken=; Max-Age=0", "accessToken=; Max-Age=0"]);

  return response.sendStatus(204);
};

export const refresh = async (request: AuthRequest, response: Response) => {
  const { user, token } = request.auth as Auth;

  user.refreshTokens = user.refreshTokens.filter((refreshToken) => refreshToken.token === token);

  const plainTextAccessToken = generateAccessToken(user._id);
  const plainTextRefreshToken = generateRefreshToken(user._id);

  user.refreshTokens.push({
    token: plainTextRefreshToken,
    createdAt: new Date(),
  });

  await user.save();

  return response.json({
    refreshToken: plainTextRefreshToken,
    accessToken: plainTextAccessToken,
  });
};

export const verify = (request: AuthRequest, response: Response) => {
  const { user } = request.auth as Auth;

  return response.json(user.prepare());
};

export const forgotPassword = async (request: Request, response: Response) => {
  const validation = z
    .object({
      email: z.string().email(),
    })
    .safeParse(request.body);

  if (!validation.success) {
    return response.status(400).json({
      errors: validation.error.issues,
    });
  }

  const { email } = validation.data;

  const user = await User.findOne({ email });

  if (!user || user.deletedAt) {
    return response.json({
      message: "If the email address exists within our database an email will be sent to it",
    });
  }

  const rateLimitValidation = checkTokensLimit(user.forgotPasswordTokens, config.FORGOT_PASSWORD_RATE_LIMIT);

  if (!rateLimitValidation.success) {
    return response.sendStatus(429);
  }

  user.forgotPasswordTokens = rateLimitValidation.tokens;

  const token = generateForgotPasswordToken(user._id);

  user.forgotPasswordTokens.push({ token, createdAt: new Date() });

  await user.save();

  if (config.ENV !== "testing") {
    const mail = {
      to: user.email,
      subject: "Reset Password",
      template: {
        path: "auth/forgot-password.ejs",
        data: {
          username: user.firstName + " " + user.lastName,
          url: `${config.CLIENT_HOST}:${config.CLIENT_PORT}/reset-password/${token}`,
          name: config.NAME,
        },
      },
    };

    await sendMail(mail);
  }

  return response.json({
    message: "If the email address exists within our database an email will be sent to it",
  });
};

export const resetPassword = async (request: Request, response: Response) => {
  const validation = z
    .object({
      password: z.string().min(8),
      password_confirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.password_confirmation, {
      path: ["password", "password_confirmation"],
      message: "Password and Password Confirmation does not exists",
    })
    .safeParse(request.body);

  if (!validation.success) {
    return response.status(400).json({
      errors: validation.error.issues,
    });
  }

  const { password } = validation.data;

  const { token } = request.params;

  const decoded = verifyForgotPasswordToken(token);

  if ("err" in decoded) {
    return response.status(400).json({
      message: "Token is invalid",
    });
  }

  const user = await User.findOne({ _id: decoded._id });

  if (!user || user.deletedAt) {
    return response.status(400).json({
      message: "User not found",
    });
  }

  if (!user.forgotPasswordTokens.find((forgotToken) => forgotToken.token === token)) {
    return response.status(400).json({
      message: "Token is invalid",
    });
  }

  user.password = bcrypt.hashSync(password, Number(config.SALT));

  user.forgotPasswordTokens = [];
  await user.save();

  return response.sendStatus(204);
};

export const sendConfirmationEmail = async (request: AuthRequest, response: Response) => {
  const { user } = request.auth as Auth;

  if (user.verifiedAt) {
    return response.status(400).json({
      message: "Email Address is alreay verified",
    });
  }

  const validation = checkTokensLimit(user.confirmEmailTokens, config.EMAIL_CONFIRMATION_RATE_LIMIT);

  if (!validation.success) {
    return response.sendStatus(429);
  }

  user.confirmEmailTokens = validation.tokens;

  const token = generateEmailConfirmationToken(user._id);

  if (config.ENV !== "testing") {
    const mail = {
      to: user.email,
      subject: "Email Confirmation",
      template: {
        path: "auth/confirm-email-address.ejs",
        data: {
          url: `${config.CLIENT_HOST}:${config.CLIENT_PORT}/confirm-email/${token}`,
          name: config.NAME,
        },
      },
    };

    await sendMail(mail);
  }

  user.confirmEmailTokens.push({ token, createdAt: new Date() });
  await user.save();

  return response.sendStatus(204);
};

export const configEmailAddress = async (request: Request, response: Response) => {
  const { token } = request.params;

  const decoded = verifyEmailConfirmationToken(token);

  if ("err" in decoded) {
    console.log(decoded.err);
    return response.status(400).json({
      message: "Token is not valid",
    });
  }

  const user = await User.findOne({ _id: decoded._id });

  if (!user || user.deletedAt) {
    return response.status(404).json({
      message: "User Not Found",
    });
  }

  if (user.verifiedAt) {
    return response.status(400).json({
      message: "Email Address is already verified",
    });
  }

  user.verifiedAt = new Date();

  user.confirmEmailTokens = [];

  await user.save();

  return response.sendStatus(204);
};

export const updateUserInformation = async (request: AuthRequest, response: Response) => {
  const validation = z
    .object({
      firstName: z.string().min(3).max(60).optional(),
      lastName: z.string().min(3).max(60).optional(),
      email: z.string().email().optional(),
      password: z.string().min(8),
    })
    .refine(
      (data) => {
        return Object.keys(data).length >= 2;
      },
      { path: ["root"], message: "There is nothing to update" }
    )
    .safeParse(request.body);

  if (!validation.success) {
    return response.status(400).json({
      errors: validation.error.issues,
    });
  }

  const body = validation.data;

  const { user } = request.auth as Auth;

  if (!bcrypt.compareSync(body.password, user.password)) {
    return response.status(400).json({
      errors: [
        {
          path: ["password"],
          message: "Password is not correct",
        },
      ],
    });
  }

  if (body.firstName) user.firstName = body.firstName;
  if (body.lastName) user.lastName = body.lastName;
  if (body.email) user.email = body.email;

  await user.save();

  return response.json(user.prepare());
};

export const updateUserPassword = async (request: AuthRequest, response: Response) => {
  const validation = z
    .object({
      old_password: z.string().min(8),
      password: z.string().min(8),
      password_confirmation: z.string().min(8),
    })
    .refine((data) => data.password === data.password_confirmation, { path: ["password"], message: "Password and Password confirmation does not match" })
    .safeParse(request.body);

  if (!validation.success) {
    return response.status(400).json({
      errors: validation.error.issues,
    });
  }

  const body = validation.data;

  const { user } = request.auth as Auth;

  if (!bcrypt.compareSync(body.old_password, user.password)) {
    return response.status(400).json({
      errors: [
        {
          path: ["password"],
          message: "Old Password is not correct",
        },
      ],
    });
  }

  user.password = bcrypt.hashSync(body.password, Number(config.SALT));

  await user.save();

  return response.sendStatus(204);
};
