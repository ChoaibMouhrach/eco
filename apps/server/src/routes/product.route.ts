import { productController } from "@src/controllers";
import { upload } from "@src/lib/storage.lib";
import { authAccess, validator } from "@src/middlewares";
import {
  deleteProductRequest,
  showProductRequest,
  storeProductRequest,
  updateProductRequest,
} from "@src/requests";
import { Router } from "express";

export const productRouter = Router();

productRouter.get("/", productController.index);

productRouter.get(
  "/:id",
  [validator(showProductRequest)],
  productController.show
);

productRouter.post(
  "/",
  [authAccess, upload.array("images"), validator(storeProductRequest)],
  productController.store
);

productRouter.patch(
  "/:id",
  [authAccess, upload.array("images"), validator(updateProductRequest)],
  productController.update
);

productRouter.delete(
  "/:id",
  [authAccess, validator(deleteProductRequest)],
  productController.destroy
);
