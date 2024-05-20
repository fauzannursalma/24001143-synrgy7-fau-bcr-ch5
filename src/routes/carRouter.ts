import { Router } from "express";

import upload from "../utils/fileUploadConfig";
import { CarsController } from "../controllers/carsController";

const router = Router();

router.get("/", new CarsController().carList);
router.get("/:id", new CarsController().getCarByID);
router.delete("/:id", new CarsController().deleteCarByID);
router.post("/", upload.single("image"), new CarsController().createCar);
router.put("/:id", upload.single("image"), new CarsController().updateCar);

export default router;
