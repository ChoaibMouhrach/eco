import { productController } from "@src/controllers";
import { Router } from "express";

export const productRouter = Router();

productRouter.get("/", productController.index);
