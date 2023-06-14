import { userController } from "@src/controllers";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", userController.index);
