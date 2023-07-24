import { orderController } from "@src/controllers";
import { authAccess, validator } from "@src/middlewares";
import {
  deleteOrderRequest,
  indexOrderRequest,
  showOrderRequest,
  storeOrderRequest,
  updateOrderRequest,
} from "@src/requests";
import { Router } from "express";

export const orderRouter = Router();

orderRouter.get("/states", orderController.getOrderStates);

orderRouter.get(
  "/",
  [authAccess, validator(indexOrderRequest)],
  orderController.index
);

orderRouter.get(
  "/:id",
  [authAccess, validator(showOrderRequest)],
  orderController.show
);

orderRouter.post(
  "/",
  [authAccess, validator(storeOrderRequest)],
  orderController.store
);

orderRouter.patch(
  "/:id",
  [authAccess, validator(updateOrderRequest)],
  orderController.update
);

orderRouter.delete(
  "/:id",
  [authAccess, validator(deleteOrderRequest)],
  orderController.destroy
);
