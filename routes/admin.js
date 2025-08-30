import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
  logoutAdmin,
} from "../controllers/adminController.js";
import { adminAuthMiddleware } from "../middleware/adminAuth.js";

const router = express.Router();

// --------------------- Routes ---------------------
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/current", adminAuthMiddleware, getCurrentAdmin);
router.post("/logout", adminAuthMiddleware, logoutAdmin);

export default router;
