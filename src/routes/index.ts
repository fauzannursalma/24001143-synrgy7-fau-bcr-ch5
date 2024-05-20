import express from "express";
import carRouter from "./carRouter";
import userRouter from "./userRouter";
import rentRouter from "./rentRouter";

const router = express.Router();

router.use("/cars", carRouter);
router.use("/users", userRouter);
router.use("/rents", rentRouter);

export default router;
