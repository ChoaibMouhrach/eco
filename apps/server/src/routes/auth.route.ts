import { authController } from "@src/controllers";
import { validator } from "@src/middlewares";
import { signInRequest, signUpRequest } from "@src/requests";
import { Router } from "express";

export const authRouter = Router();

authRouter.post("/sign-in", [validator(signInRequest)], authController.signIn);

authRouter.post("/auth/:token", authController.auth);

authRouter.post("/sign-up", [validator(signUpRequest)], authController.signUp);

authRouter.post("/sign-out", authController.signOut);
