import { Request, Response } from "express";

import {
  BadRequestException,
  HttpException,
  HttpStatus,
  NotFoundException,
  TooManyRequestsException,
} from "../common";

import User from "../models/User";
import bcrypt from "bcrypt";
import { config } from "../config/config";
import { sendMail } from "../utils/email";
import { Auth, AuthRequest } from "../interfaces/User";
import {
  checkTokensLimit,
  generateAccessToken,
  generateEmailConfirmationToken,
  generateForgotPasswordToken,
  generateRefreshToken,
  verifyEmailConfirmationToken,
  verifyForgotPasswordToken,
} from "../repositories/auth.repository";
import { LoginRequest } from "../requests/auth/login.request";
import { RegisterRequest } from "../requests/auth/register.request";
import { ResetPasswordRequest } from "../requests/auth/resetPassword.request";
import { UpdateUserInfoRequest } from "../requests/auth/updateUserInfo.request";
import { UpdateUserPasswordRequest } from "../requests/auth/updateUserPassword.request";
import { ForgotPasswordRequest } from "../requests/auth/forgotPassword.request";

/* handles the login functionality */
export const login = async (request: LoginRequest, response: Response) => {
  const { email, password } = request.body;

  /* to check if the user does exists */
  let user = (await User.findOne({ email }))!;

  /* comparing the password with the hashed password to check if the password is correct or not */
  if (!bcrypt.compareSync(password, user.password)) {
    throw new BadRequestException(
      "Email Address or Password is not correct",
      "Invalid Credentials"
    );
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

  response.setHeader("Set-Cookie", [
    `refreshToken=${plainTextRefreshToken}`,
    `accessToken=${plainTextAccessToken}`,
  ]);

  return response.json(user.prepare());
};

export const register = async (
  request: RegisterRequest,
  response: Response
) => {
  const { body } = request;

  let user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password, Number(config.SALT)),
    address: body.address,
    phone: body.phone,
    gender: body.gender,
    birthDay: body.birthDay
  });

  /* generating access token  */
  const plainTextAccessToken = generateAccessToken(user._id);

  /* generating refresh token */
  const plainTextRefreshToken = generateRefreshToken(user._id);

  /* generate email confirmation token  */
  const emailConfirmationToken = generateEmailConfirmationToken(user._id);

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

  user.confirmEmailTokens.push({
    token: emailConfirmationToken,
    createdAt: new Date(),
  });

  user.refreshTokens.push({
    token: plainTextRefreshToken,
    createdAt: new Date(),
  });

  await user.save();

  response.setHeader("Set-Cookie", [
    `refreshToken=${plainTextRefreshToken}`,
    `accessToken=${plainTextAccessToken}`,
  ]);

  throw new HttpException(user.prepare(), HttpStatus.CREATED);
};

export const logout = async (request: AuthRequest, response: Response) => {
  const { user, token } = request.auth as Auth;

  user.refreshTokens = user.refreshTokens.filter(
    (refreshToken) => refreshToken.token !== token
  );

  await user.save();

  response.setHeader("Set-Cookie", [
    "refreshToken=; Max-Age=0",
    "accessToken=; Max-Age=0",
  ]);

  return response.sendStatus(204);
};

export const refresh = async (request: AuthRequest, response: Response) => {
  const { user, token } = request.auth as Auth;

  user.refreshTokens = user.refreshTokens.filter(
    (refreshToken) => refreshToken.token === token
  );

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

export const getUser = (request: AuthRequest, response: Response) => {
  const { user } = request.auth as Auth;
  return response.json(user.prepare());
};

export const forgotPassword = async (
  request: ForgotPasswordRequest,
  response: Response
) => {
  const { email } = request.body;

  const user = await User.findOne({ email });

  if (!user || user.deletedAt) {
    return response.json({
      message:
        "If the email address exists within our database an email will be sent to it",
    });
  }

  const rateLimitValidation = checkTokensLimit(
    user.forgotPasswordTokens,
    config.FORGOT_PASSWORD_RATE_LIMIT
  );

  if (!rateLimitValidation.success) {
    throw new TooManyRequestsException("Too many requests");
  }

  user.forgotPasswordTokens = rateLimitValidation.tokens;

  const token = generateForgotPasswordToken(user._id);

  user.forgotPasswordTokens.push({ token, createdAt: new Date() });

  await user.save();

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

  return response.json({
    message:
      "If the email address exists within our database an email will be sent to it",
  });
};

export const resetPassword = async (
  request: ResetPasswordRequest,
  response: Response
) => {
  const { password } = request.body;

  const { token } = request.params;

  const decoded = verifyForgotPasswordToken(token);

  if ("err" in decoded) {
    throw new BadRequestException("Token is invalid", "Invalid Token");
  }

  const user = await User.findOne({ _id: decoded._id });

  if (!user || user.deletedAt) {
    throw new NotFoundException("User not found");
  }

  if (
    !user.forgotPasswordTokens.find(
      (forgotToken) => forgotToken.token === token
    )
  ) {
    throw new BadRequestException("Token is invalid", "Invalid Token");
  }

  user.password = bcrypt.hashSync(password, Number(config.SALT));

  user.forgotPasswordTokens = [];
  await user.save();

  return response.sendStatus(204);
};

export const sendConfirmationEmail = async (
  request: AuthRequest,
  response: Response
) => {
  const { user } = request.auth as Auth;

  if (user.verifiedAt) {
    throw new BadRequestException("Email Address is already verified");
  }

  const validation = checkTokensLimit(
    user.confirmEmailTokens,
    config.EMAIL_CONFIRMATION_RATE_LIMIT
  );

  if (!validation.success) {
    return response.sendStatus(429);
  }

  user.confirmEmailTokens = validation.tokens;

  const token = generateEmailConfirmationToken(user._id);

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

  user.confirmEmailTokens.push({ token, createdAt: new Date() });
  await user.save();

  return response.sendStatus(204);
};

export const configEmailAddress = async (
  request: Request,
  response: Response
) => {
  const { token } = request.params;

  const decoded = verifyEmailConfirmationToken(token);

  if ("err" in decoded) {
    throw new BadRequestException("Token is invalid");
  }

  const user = await User.findOne({ _id: decoded._id });

  if (!user || user.deletedAt) {
    throw new NotFoundException("User Not Found");
  }

  if (user.verifiedAt) {
    throw new BadRequestException("Email Address is already verified");
  }

  user.verifiedAt = new Date();

  user.confirmEmailTokens = [];

  await user.save();

  return response.sendStatus(204);
};

export const updateUserInformation = async (
  request: UpdateUserInfoRequest,
  response: Response
) => {
  const body = request.body;

  const { user } = request.auth as Auth;

  if (!bcrypt.compareSync(body.password, user.password)) {
    throw new BadRequestException("Password is not correct");
  }

  if (body.firstName) user.firstName = body.firstName;
  if (body.lastName) user.lastName = body.lastName;
  if (body.email) user.email = body.email;
  if (body.address) user.address = body.address;
  if (body.phone) user.phone = body.phone;
  if (body.gender) user.gender = body.gender;
  if (body.birthDay) user.birthDay = new Date(body.birthDay);

  await user.save();

  return response.json(user.prepare());
};

export const updateUserPassword = async (
  request: UpdateUserPasswordRequest,
  response: Response
) => {
  const { password } = request.body;

  const { user } = request.auth as Auth;

  user.password = bcrypt.hashSync(password, Number(config.SALT));

  await user.save();

  return response.sendStatus(204);
};

export const deleteAccount = async (
  request: AuthRequest,
  response: Response
) => {
  const { user } = request.auth as Auth;

  user.deletedAt = new Date();

  await user.save();

  response.setHeader("set-cookie", [
    "refreshToken=;Max-Age=0",
    "accessToken=;Max-Age=0",
  ]);

  return response.sendStatus(204);
};
