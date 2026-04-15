import express from "express";
import {
  userRegister,
  userLogin,
  userLogOut,
  getUserProfile,
  updateProfile,
} from "../controllers/user.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";
import { uploadImage } from "../middlewares/multer.js";

const router = express.Router();

router.post("/register", userRegister);
router.post("/login", userLogin);
router.get("/logout", userLogOut);
router.get("/profile", isAuthenticated, getUserProfile);

router.put(
  "/profile/update",
  isAuthenticated,
  uploadImage.single("profilePhoto"),
  updateProfile
);

export default router;
