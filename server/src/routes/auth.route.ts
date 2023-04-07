import { Router } from "express";
import { verify, login, logout, refresh, register } from "../controllers/auth.controller";
import authRefreshToken from "../middlewares/authRefreshToken";
import authAccessToken from "../middlewares/authAccessToken";

const router = Router();

router.post("/login", login);
router.post("/register", register);

/* access token protection */
router.get("/verify", authAccessToken, verify);

/* refresh token protection */
router.post("/logout", authRefreshToken, logout);
router.post("/refresh", authRefreshToken, refresh);

export default router;
