import { Router } from "express";
import { authRouter } from "./auth.route";
import { categoryRouter } from "./category.route";
import { tagRouter } from "./tag.route";
import { unitRouter } from "./unit.route";
import { productRouter } from "./product.route";
import { userRouter } from "./user.route";
import { orderRouter } from "./order.route";
import { checkOutRouter } from "./checkout.route";

const router = Router();

router.use("/", authRouter);
router.use("/categories", categoryRouter);
router.use("/tags", tagRouter);
router.use("/units", unitRouter);
router.use("/products", productRouter);
router.use("/users", userRouter);
router.use("/orders", orderRouter);
router.use("/checkout", checkOutRouter);

export default router;
