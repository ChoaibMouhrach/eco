import { Router } from "express"
import { verify, login, logout, refresh, register } from "../controllers/authController";
import authRefreshToken from "../middlewares/authRefreshToken";
import authAccessToken from "../middlewares/authAccessToken";

const authRouter = Router()

authRouter.post("/login", login);
authRouter.post("/register", register);

/* access token protection */
authRouter.get("/verify", authAccessToken, verify);

/* refresh token protection */
authRouter.post("/logout", authRefreshToken, logout);
authRouter.post("/refresh", authRefreshToken, refresh);

export default authRouter
