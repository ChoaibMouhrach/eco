import { orderController } from "@src/controllers";
import { Router } from "express";

export const orderRouter = Router();

orderRouter.get("/", orderController.index);
