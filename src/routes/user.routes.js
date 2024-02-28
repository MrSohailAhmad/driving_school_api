// import express from "express";
import { Router } from "express";
import { loginUser, registerUser } from "../controllers/user.controller.js";
import { updateUserApproval } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";
const router = Router();

router.route("/register").post(
  upload.fields([
    {
      name: "avatar",
      maxCount: 1,
    },
    {
      name: "fitnessCertificate",
      maxCount: 1,
    },
  ]),
  registerUser
);

router.route("/update/:id").patch(updateUserApproval);
router.route("/login").post(loginUser);

export default router;
