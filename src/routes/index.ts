import express from "express";
import carRouter from "./carRouter";

const router = express.Router();

router.use("/cars", carRouter);

export default router;
