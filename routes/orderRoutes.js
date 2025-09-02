import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getUserOrders } from "../controllers/orderController.js";

const router = express.Router();

// GET /api/orders - get orders for current user
router.get("/", authMiddleware, getUserOrders);

export default router;
