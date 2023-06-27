import { categoryController } from "@src/controllers";
import { authAccess, validator } from "@src/middlewares";
import {
  deleteCategoryRequest,
  showCategoryRequest,
  storeCategoryRequest,
  updateCategoryRequest,
} from "@src/requests";
import { Router } from "express";

export const categoryRouter = Router();

categoryRouter.get("", categoryController.index);

categoryRouter.get(
  "/:id",
  validator(showCategoryRequest),
  categoryController.show
);

categoryRouter.post(
  "",
  [authAccess, validator(storeCategoryRequest)],
  categoryController.store
);

categoryRouter.patch(
  "/:id",
  [authAccess, validator(updateCategoryRequest)],
  categoryController.update
);

categoryRouter.delete(
  "/:id",
  [authAccess, validator(deleteCategoryRequest)],
  categoryController.destroy
);
