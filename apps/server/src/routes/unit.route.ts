import { unitController } from "@src/controllers";
import { Router } from "express";

export const unitRouter = Router();

unitRouter.get("/", unitController.index);
