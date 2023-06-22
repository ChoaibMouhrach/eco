import { tagController } from "@src/controllers";
import { authAccess, validator } from "@src/middlewares";
import {
  deleteTagRequest,
  storeTagRequest,
  showTagRequest,
  updateTagRequest,
} from "@src/requests";
import { Router } from "express";

export const tagRouter = Router();

tagRouter.get("/", tagController.index);

tagRouter.get("/:id", [validator(showTagRequest)], tagController.show);

tagRouter.post(
  "/",
  [authAccess, validator(storeTagRequest)],
  tagController.store
);

tagRouter.patch(
  "/:id",
  [authAccess, validator(updateTagRequest)],
  tagController.update
);

tagRouter.delete(
  "/:id",
  [authAccess, validator(deleteTagRequest)],
  tagController.destroy
);
