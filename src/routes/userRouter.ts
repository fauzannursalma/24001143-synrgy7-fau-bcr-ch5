import { Router } from "express";
import { UsersController } from "../controllers/usersController";

const router = Router();

router.get("/", new UsersController().userList);
router.get("/:id", new UsersController().getUserByID);
router.delete("/:id", new UsersController().deleteUserByID);
router.post("/", new UsersController().createUser);
router.put("/:id", new UsersController().updateUser);

export default router;
