import express from "express";
import { userController } from "./user.controller";
import auth from "../../middlewares/auth";

const router = express.Router();

router.post("/create/social", userController.createUserSocial);
router.get("/", auth("admin", "user"), userController.getUser);

export const userRoutes = router;