import express from "express";
import { 
  updateProfile, 
  getProfile
} from "../controllers/profile.controllers.js"; // ✅ renamed to match our user.controller
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// ✅ Get user profile 
router.get("/", protectRoute, getProfile);

// ✅ Update user profile
router.patch("/update", protectRoute, updateProfile);

export default router;
