import { Request, Response } from "express"
import { loginSchema, registerSchema } from "../validation/authValidation"
import User from "../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import RefreshToken from "../models/RefreshToken";

/* handles the login functionality */
export const login = async (request: Request, response: Response,) => {

  if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
    throw Error("ACCESS SECRET or REFRESH SECRET is not defined")
  }

  if (!process.env.ACCESS_TOKEN_DURATION) {
    throw Error("ACCESS TOKEN DURATION is not defined")
  }

  /* validate the request body */
  const validation = loginSchema.safeParse(request.body);

  if (!validation.success) {
    return response.status(400).json({ errors: validation.error.issues })
  }

  const { email, password } = validation.data;

  /* to check if the user does exists */
  let user = await User.findOne({ email });

  if (!user) {
    return response.status(400).json({ message: "Email Address or Password is not correct" })
  }

  /* comparing the password with the hashed password to check if the password is correct or not */
  if (!bcrypt.compareSync(password, user.password)) {
    return response.status(400).json({ message: "Email Address or Password is not correct" })
  }

  /* generating 2 tokens */
  const plainTextAccessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_DURATION });
  const plainTextRefreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET);

  /* inserting new token document in the refreshtokens collection */
  const refreshToken = new RefreshToken({
    token: plainTextRefreshToken
  })

  /* adding the token id to the tokens used by the specified id */
  user.refreshTokens.push(refreshToken._id)

  await user.save()
  await refreshToken.save();

  response.setHeader("Set-Cookie", [`refreshToken=${plainTextRefreshToken}`, `accessToken=${plainTextAccessToken}`])

  return response.json(user.prepare())

}

export const register = async (request: Request, response: Response) => {

  if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
    throw Error("ACCESS SECRET or REFRESH SECRET is not defined")
  }

  if (!process.env.ACCESS_TOKEN_DURATION) {
    throw Error("ACCESS TOKEN DURATION is not defined")
  }

  if (!process.env.SALT) {
    throw Error("SALT is not defined")
  }

  const validation = registerSchema.safeParse(request.body);

  if (!validation.success) {
    return response.status(400).json({ errors: validation.error.issues })
  }

  const body = validation.data;

  if (await User.exists({ email: body.email })) {
    return response.status(400).json({ message: "Email Address is already taken" })
  }

  let user = new User({
    firstName: body.firstName,
    lastName: body.lastName,
    email: body.email,
    password: bcrypt.hashSync(body.password, Number(process.env.SALT))
  })

  const plainTextAccessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_DURATION });
  const plainTextRefreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET);

  const refreshToken = new RefreshToken({
    token: plainTextRefreshToken
  });

  user.refreshTokens.push(refreshToken._id);

  await refreshToken.save();
  await user.save();

  response.setHeader("Set-Cookie", [`refreshToken=${plainTextRefreshToken}`, `accessToken=${plainTextAccessToken}`])

  return response.json(user.prepare())


}

export const logout = async (request: Request, response: Response,) => {

  const { user, token_id } = request.auth;
  await RefreshToken.deleteOne({ _id: token_id })
  await User.updateOne({ _id: user._id }, { $pull: { refreshTokens: token_id } })

  response.setHeader("Set-Cookie", ["refreshToken=0; Max-Age=0", "accessToken=0; Max-Age=0"])

  return response.sendStatus(204)
}

export const refresh = async (request: Request, response: Response,) => {

  if (!process.env.ACCESS_SECRET || !process.env.REFRESH_SECRET) {
    throw Error("ACCESS SECRET or REFRESH SECRET is not defined")
  }

  if (!process.env.ACCESS_TOKEN_DURATION) {
    throw Error("ACCESS TOKEN DURATION is not defined")
  }

  const { user, token_id } = request.auth;

  await RefreshToken.deleteOne({ _id: token_id })

  await User.updateOne({ _id: user._id }, { $pull: { refreshTokens: token_id } });

  const plainTextAccessToken = jwt.sign({ _id: user._id }, process.env.ACCESS_SECRET, { expiresIn: process.env.ACCESS_TOKEN_DURATION });
  const plainTextRefreshToken = jwt.sign({ _id: user._id }, process.env.REFRESH_SECRET);

  const refreshToken = new RefreshToken({
    token: plainTextRefreshToken
  })

  await refreshToken.save();

  await User.updateOne({ _id: user._id }, { $push: { refreshTokens: refreshToken._id } })

  return response.json({
    refreshToken: plainTextRefreshToken,
    accessToken: plainTextAccessToken
  })

}

export const verify = (request: Request, response: Response,) => {

  const { user } = request.auth;
  return response.json(user)

}
