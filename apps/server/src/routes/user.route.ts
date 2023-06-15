import { userController } from "@src/controllers";
import { authAccess, validator } from "@src/middlewares";
import { deleteUserRequest, indexUserRequest, showUserRequest, storeUserRequest, updateUserRequest } from "@src/requests";
import { Router } from "express";

export const userRouter = Router();

userRouter.get("/", [authAccess, validator(indexUserRequest)], userController.index);

userRouter.get("/:id", [authAccess, validator(showUserRequest)], userController.show);

userRouter.post("/", [authAccess, validator(storeUserRequest)], userController.store);

userRouter.patch("/:id", [authAccess, validator(updateUserRequest)], userController.update);

userRouter.delete("/:id", [authAccess, validator(deleteUserRequest)], userController.destroy);
