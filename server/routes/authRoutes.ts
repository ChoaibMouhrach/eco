import { Router } from "express"
import { verify, login, logout, refresh, register } from "../controllers/authController";
import authRefreshToken from "../middlewares/authRefreshToken";
import authAccessToken from "../middlewares/authAccessToken";

const authRoutes = Router()

authRoutes.post("/login", login);
authRoutes.post("/register", register);
authRoutes.get("/verify", authAccessToken, verify);
authRoutes.post("/logout", authRefreshToken, logout);
authRoutes.post("/refresh", authRefreshToken, refresh);

export default authRoutes
