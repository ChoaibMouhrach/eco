import { Router } from "express";
import {
  destroy,
  index,
  store,
  update,
} from "../controllers/category.controller";
import authAccessToken from "../middlewares/authAccessToken";
import multer from "multer";
import { guard } from "../middlewares/guard";
import storeRequest from "../requests/category/store.request";
import updateRequest from "../requests/category/update.request";
import deleteRequest from "../requests/category/delete.request";

const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = Router();

/* get all categories */
router.get("/", index);

/* create new category */
router.post(
  "/",
  [authAccessToken, upload.single("image"), guard(storeRequest)],
  store
);

/* update category */
router.patch(
  "/:id",
  [authAccessToken, upload.single("image"), guard(updateRequest)],
  update
);

/* delete category */
router.delete("/:id", [authAccessToken, guard(deleteRequest)], destroy);

export default router;
