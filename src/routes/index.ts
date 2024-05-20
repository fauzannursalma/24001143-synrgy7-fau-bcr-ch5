import express from "express";
import carRouter from "./carRouter";
import userRouter from "./userRouter";

const router = express.Router();

router.use("/cars", carRouter);
router.use("/users", userRouter);

export default router;
