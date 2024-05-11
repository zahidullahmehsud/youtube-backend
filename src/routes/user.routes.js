import { registerUser } from "../controllers/user.controller.js";
import app from "express";
import { upload } from "../middlewares/multer.midddleware.js";

const router = app();

router.route("/register").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  registerUser
);

export default router;
