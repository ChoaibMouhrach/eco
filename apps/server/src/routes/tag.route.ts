import { tagController } from "@src/controllers";
import { Router } from "express";

export const tagRouter = Router();

tagRouter.get("/", tagController.index);
