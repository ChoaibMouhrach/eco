import { Router } from "express";
import { verify, login, configEmailAddress, logout, refresh, register, forgotPassword, resetPassword, sendConfirmationEmail, updateUserInformation, updateUserPassword } from "../controllers/auth.controller";
import authRefreshToken from "../middlewares/authRefreshToken";
import authAccessToken from "../middlewares/authAccessToken";
import { rateLimit } from "express-rate-limit";

const emailsRateLimit = rateLimit({
  max: 5,
  windowMs: 60 * 60 * 1000,
});

const router = Router();

/* Login users */
router.post("/login", login);

/* Register users */
router.post("/register", register);

/* Get User information */
router.get("/verify", authAccessToken, verify);

/* Logout Users */
router.post("/logout", authRefreshToken, logout);

/* Refresh Token */
router.post("/refresh", authRefreshToken, refresh);

/* Send reset password email */
router.post("/forgot-password", [emailsRateLimit], forgotPassword);

/* Reset Password */
router.post("/reset-password/:token", resetPassword);

/* Send confirmation email */
router.post("/send-confirmation-email", [emailsRateLimit, authAccessToken], sendConfirmationEmail);

/* Confirm email address */
router.post("/confirm-email/:token", configEmailAddress);

/* Update User Information */
router.patch("/me", [authAccessToken], updateUserInformation);

/* Update User Password */
router.post("/change-password", [authAccessToken], updateUserPassword)

export default router;
