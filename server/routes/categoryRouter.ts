import { Router } from "express";
import { destroy, index, store, update } from "../controllers/categoryController";
import authAccessToken from "../middlewares/authAccessToken";
import multer from "multer";

const storage = multer.memoryStorage();

const upload = multer({ storage })

const categoryRouter = Router();

/* get all categories */
categoryRouter.get("/", index);

/* create new category */
categoryRouter.post("/", [authAccessToken, upload.single("image")], store)

/* update category */
categoryRouter.patch("/:id", [authAccessToken, upload.single("image")], update)

/* delete category */
categoryRouter.delete("/:id", [authAccessToken], destroy);

export default categoryRouter
