import { purchaseController } from "@src/controllers";
import { authAccess, validator } from "@src/middlewares";
import {
  deletePurchaseRequest,
  indexPurchaseRequest,
  showPurchaseRequest,
  storePurchaseRequest,
  updatePurchaseRequest,
} from "@src/requests";
import { Router } from "express";

export const purchaseRouter = Router();

purchaseRouter.get(
  "/",
  [authAccess, validator(indexPurchaseRequest)],
  purchaseController.index
);

purchaseRouter.get(
  "/:id",
  [authAccess, validator(showPurchaseRequest)],
  purchaseController.show
);

purchaseRouter.post(
  "/",
  [authAccess, validator(storePurchaseRequest)],
  purchaseController.store
);

purchaseRouter.patch(
  "/:id",
  [authAccess, validator(updatePurchaseRequest)],
  purchaseController.update
);

purchaseRouter.delete(
  "/:id",
  [authAccess, validator(deletePurchaseRequest)],
  purchaseController.destroy
);
