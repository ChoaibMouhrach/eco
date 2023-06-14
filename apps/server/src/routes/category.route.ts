import { categoryController } from "@src/controllers";
import { authAccess } from "@src/middlewares";
import { Router } from "express";

export const categoryRouter = Router();

categoryRouter.get("", categoryController.index);
categoryRouter.post("", [authAccess], categoryController.store);
categoryRouter.patch("/:id", [authAccess], categoryController.update);
categoryRouter.delete("/:id", [authAccess], categoryController.destroy);
