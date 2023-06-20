import config from "@src/config/config";
import db from "@src/config/db";
import { UnauthorizedException } from "@src/exceptions";
import mailer from "@src/lib/mailer.lib";
import {
  createAccessToken,
  createConfirmEmailToken,
  createRefreshToken,
  findUserOrThrow,
  verifyEmailToken,
} from "@src/repositories";
import { SignInRequest, SignUpRequest } from "@src/requests";
import { Request, Response } from "express";
import { UpdateProfileRequest } from "@src/requests/update-profile.request";
import { AuthRequest } from "..";

const signIn = async (request: SignInRequest, response: Response) => {
  const { email } = request.body;

  const user = await findUserOrThrow({ email });

  const emailToken = createConfirmEmailToken(user.id);

  await mailer.sendMail({
    from: config.SMTP_USER,
    to: email,
    subject: "Sign In confirmation",
    html: `<a href='${config.APP_CLIENT_URL}/auth/${emailToken}' >Sign In</a>`,
  });

  return response.json({
    message: "Check your inbox",
  });
};

const auth = async (request: Request, response: Response) => {
  const { token } = request.params;

  const {
    res: { id },
  } = verifyEmailToken<{ id: number }>(token);

  const user = await findUserOrThrow({ id });

  const refreshToken = createRefreshToken(id);
  const accessToken = createAccessToken(id);

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
  const { body } = request;

  const user = await db.user.create({
    data: {
      ...body,
      roleId: 1,
    },
  });

  const emailToken = createConfirmEmailToken(user.id);

  mailer.sendMail({
    from: config.SMTP_USER,
    to: user.email,
    subject: "Sign up request",
    html: `<!DOCTYPE><html><body><a href="${config.APP_CLIENT_URL}/auth/${emailToken}" >Sign In</a></body></html>`,
  });

  return response.status(201).json({
    message: "Check your inbox",
  });
};

const signOut = async (request: AuthRequest, response: Response) => {
  const { token } = request.auth!.refreshToken!;

  try {
    await db.refreshToken.delete({
      where: {
        token,
      },
    });

    response.cookie("refreshToken", "", {
      maxAge: 0,
      path: "/",
    });
    response.cookie("accessToken", "", {
      maxAge: 0,
      path: "/",
    });
  } catch (err) {
    throw new UnauthorizedException("Token invalid");
  }

  return response.sendStatus(204);
};

const refresh = async (request: AuthRequest, response: Response) => {
  const refreshToken = request.auth!.refreshToken!;

  await db.refreshToken.delete({
    where: {
      id: refreshToken.id,
    },
  });

  const newAccessToken = createAccessToken(refreshToken.userId);
  const newRefreshToken = createRefreshToken(refreshToken.userId);

  await db.refreshToken.create({
    data: {
      ip: request.ip,
      token: newRefreshToken,
      userId: refreshToken.userId,
    },
  });

  response.cookie("accessToken", newAccessToken, { httpOnly: true });
  response.cookie("refreshToken", newRefreshToken, { httpOnly: true });

  return response.sendStatus(204);
};

const profile = async (request: AuthRequest, response: Response) =>
  response.json(await findUserOrThrow({ id: request.auth!.user.id }));

const updateProfile = async (
  request: UpdateProfileRequest,
  response: Response
) => {
  const { user } = request.auth!;
  const data = request.body;

  await db.user.update({
    where: {
      id: user.id,
    },
    data,
  });

  return response.sendStatus(204);
};

const deleteProfile = async (request: AuthRequest, response: Response) => {
  const { user } = request.auth!;

  await db.user.delete({
    where: {
      id: user.id,
    },
  });

  return response.sendStatus(204);
};

export const authController = {
  signIn,
  signUp,
  signOut,
  auth,
  refresh,
  profile,
  updateProfile,
  deleteProfile,
};
