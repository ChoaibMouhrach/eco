import { unitController } from "@src/controllers";
import { authAccess, validator } from "@src/middlewares";
import { deleteTagRequest, storeUnitRequest, updateUnitRequest } from "@src/requests";
import { Router } from "express";

export const unitRouter = Router();

unitRouter.get("/", unitController.index);

unitRouter.post("/", [authAccess, validator(storeUnitRequest)], unitController.store);

unitRouter.patch("/:id", [authAccess, validator(updateUnitRequest)], unitController.update);

unitRouter.delete("/:id", [authAccess, validator(deleteTagRequest)], unitController.destroy);
