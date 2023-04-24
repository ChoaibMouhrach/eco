import { Router } from "express";
import { update, index, show, store, destroy } from "../controllers/product.controller";

const router = Router();

/* Get a list of products */
router.get("/", index)

/* Get certain product */
router.get("/:id", show)

/* Store new product */
router.get("/", store)

/* Update certain product */
router.get("/:id", update)

/* Delete certain product */
router.get("/:id", destroy)

export default router

