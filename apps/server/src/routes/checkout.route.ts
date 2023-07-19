import { checkOutController } from "@src/controllers";
import { authAccess, validator } from "@src/middlewares";
import { checkOutRequest } from "@src/requests";
import { Router } from "express";

export const checkOutRouter = Router();

checkOutRouter.post(
  "/",
  [authAccess, validator(checkOutRequest)],
  checkOutController.checkOut
);
