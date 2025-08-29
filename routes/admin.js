import express from "express";
import {
  registerAdmin,
  loginAdmin,
  getCurrentAdmin,
  logoutAdmin,
} from "../controllers/adminController.js";
import { adminAuthMiddleware } from "../middleware/adminAuth.js";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin management
 */

/**
 * @swagger
 * /api/admin/register:
 *   post:
 *     summary: Register a new admin (plain text password, hashed automatically)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Super Admin
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *               role:
 *                 type: string
 *                 example: superadmin
 *     responses:
 *       201:
 *         description: Admin created successfully
 *       400:
 *         description: Admin already exists
 */

/**
 * @swagger
 * /api/admin/login:
 *   post:
 *     summary: Admin login (send plain text password)
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@example.com
 *               password:
 *                 type: string
 *                 example: Admin@123
 *     responses:
 *       200:
 *         description: Login successful
 *       400:
 *         description: Invalid email or password
 */

/**
 * @swagger
 * /api/admin/current:
 *   get:
 *     summary: Get current admin info
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Returns current admin info
 *       401:
 *         description: Not authenticated
 */

/**
 * @swagger
 * /api/admin/logout:
 *   post:
 *     summary: Admin logout
 *     tags: [Admin]
 *     security:
 *       - cookieAuth: []
 *     responses:
 *       200:
 *         description: Logout successful
 *       401:
 *         description: Not authenticated
 */

// Routes
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/current", adminAuthMiddleware, getCurrentAdmin);
router.post("/logout", adminAuthMiddleware, logoutAdmin);

export default router;
