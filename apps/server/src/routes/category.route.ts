import { categoryController } from "@src/controllers";
import { authAccess, validator } from "@src/middlewares";
import { storeCategoryRequest, updateCategoryRequest } from "@src/requests";
import { deleteCategoryRequest } from "@src/requests/delete-category.request";
import { Router } from "express";

export const categoryRouter = Router();

categoryRouter.get("", categoryController.index);
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
categoryRouter.delete("/:id", [authAccess, validator(deleteCategoryRequest)], categoryController.destroy);
