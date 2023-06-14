import { purchaseController } from "@src/controllers";
import { Router } from "express";

export const purchaseRouter = Router();

purchaseRouter.get("/", purchaseController.index);
