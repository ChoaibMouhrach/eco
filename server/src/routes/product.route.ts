import { Router } from "express";
import { update, index, show, store, destroy } from "../controllers/product.controller";
import authAccessToken from "../middlewares/authAccessToken";
import { guard } from "../middlewares/guard";
import storeProductRequest from "../requests/product/store.request"
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const router = Router();

/* Get a list of products */
router.get("/", index)

/* Get certain product */
router.get("/:id", show)

/* Store new product */
router.post("/", [authAccessToken, upload.array("images"), guard(storeProductRequest)], store)

/* Update certain product */
router.get("/:id", update)

/* Delete certain product */
router.get("/:id", destroy)

export default router

