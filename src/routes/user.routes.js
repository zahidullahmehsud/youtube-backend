import { registerUser } from "../controllers/user.controller.js";
import app from "express";

const router = app();

router.route("/register").post(registerUser);

export default router;
