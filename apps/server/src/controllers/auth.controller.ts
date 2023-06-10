import config from "@src/config/config";
import db from "@src/config/db";
import { NotFoundException, UnauthorizedException } from "@src/exceptions";
import { mailer } from "@src/lib";
import { SignInRequest, SignUpRequest } from "@src/requests";
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const signIn = async (request: SignInRequest, response: Response) => {
  const { email } = request.body;
  const user = await db.user.findUnique({ where: { email } });

  if (!user) {
    throw new NotFoundException("User does not exists");
  }

  const emailToken = jwt.sign({ id: user.id }, config.SECRET_AUTH_EMAIL);

  await mailer.sendMail({
    from: config.SMTP_USER,
    to: email,
    subject: "Sign In confirmation",
    html: `<a href='${config.APP_CLIENT_URL}/sign-in/${emailToken}' >Sign In</a>`,
  });

  return response.json({
    message: "Check your inbox",
  });
};

const auth = async (request: Request, response: Response) => {
  const { token } = request.params;

  let id: number;

  try {
    const decoded = jwt.verify(token, config.SECRET_AUTH_EMAIL) as {
      id: number;
    };
    id = decoded.id;
  } catch (err) {
    throw new UnauthorizedException();
  }

  const user = await db.user.findUnique({ where: { id } });

  if (!user) {
    throw new NotFoundException("User does not exists");
  }

  const refreshToken = jwt.sign({ id: user.id }, config.SECRET_REFRESH);
  const accessToken = jwt.sign({ id: user.id }, config.SECRET_ACCESS);

  await db.refreshToken.create({
    data: {
      token: refreshToken,
      ip: request.ip,
      userId: user.id,
    },
  });

  response.cookie("refreshToken", refreshToken, { httpOnly: true });
  response.cookie("accessToken", accessToken, { httpOnly: true });

  return response.json(user);
};

const signUp = async (request: SignUpRequest, response: Response) => {
  const {
    firstName,
    lastName,

    email,
    phone,

    address,
  } = request.body;

  const user = await db.user.create({
    data: {
      firstName,
      lastName,
      email,
      phone,
      address,
      roleId: 1,
    },
  });

  const emailToken = jwt.sign(
    {
      id: user.id,
    },
    config.SECRET_AUTH_EMAIL
  );

  mailer.sendMail({
    from: config.SMTP_USER,
    to: email,
    subject: "Sign up request",
    html: `<!DOCTYPE><html><body><a href="${config.APP_CLIENT_URL}/sign-in/${emailToken}" >Sign In</a></body></html>`,
  });

  return response.json({
    message: "Check your inbox",
  });
};

const signOut = async (request: Request, response: Response) => {
  const { refreshToken } = request.cookies;

  if (!refreshToken) {
    throw new UnauthorizedException();
  }

  try {
    jwt.verify(refreshToken, config.SECRET_REFRESH) as {
      id: number;
    };
  } catch (err) {
    throw new UnauthorizedException(err);
  }

  try {
    await db.refreshToken.delete({
      where: {
        token: refreshToken,
      },
    });
  } catch (err) {
    throw new UnauthorizedException();
  }

  return response.sendStatus(204);
};

export const authController = {
  signIn,
  signUp,
  signOut,
  auth,
};
