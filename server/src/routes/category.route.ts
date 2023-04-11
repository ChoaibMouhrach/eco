import { Router } from "express";
import { destroy, index, store, update } from "../controllers/category.controller";
import authAccessToken from "../middlewares/authAccessToken";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage });

const router = Router();

/* get all categories */
router.get("/", index);

/* create new category */
router.post("/", [authAccessToken, upload.single("image")], store);

/* update category */
router.patch("/:id", [authAccessToken, upload.single("image")], update);

/* delete category */
router.delete("/:id", [authAccessToken], destroy);

export default router;
