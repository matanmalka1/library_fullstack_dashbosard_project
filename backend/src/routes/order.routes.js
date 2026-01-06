import express from "express";
import {
  getOrders,
  placeOrder,
  updateOrderStatus,
  cancelOrder,
} from "../controllers/order.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import {
  validateOrderIdParam,
  validateCreateOrder,
  validateOrderStatus,
} from "../validators/orderValidate.js";

export const router = express.Router();

router.get("/", authenticate, getOrders);
router.post("/", authenticate, validateCreateOrder, placeOrder);
router.patch(
  "/:id/status",
  authenticate,
  authorize("admin", "manager"),
  validateOrderIdParam,
  validateOrderStatus,
  updateOrderStatus
);
router.patch("/:id/cancel", authenticate, validateOrderIdParam, cancelOrder);
