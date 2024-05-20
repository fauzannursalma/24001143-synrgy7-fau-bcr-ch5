import { Router } from "express";
import { RentController } from "../controllers/rentController";

const router = Router();

router.get("/", new RentController().rentList);
router.get("/:id", new RentController().getRentByID);
router.post("/", new RentController().createRent);
router.put("/:id", new RentController().updateRent);
router.delete("/:id", new RentController().deleteRentByID);

export default router;
