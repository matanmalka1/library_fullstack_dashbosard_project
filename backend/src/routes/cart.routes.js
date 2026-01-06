import express from "express";
import {
  getCart,
  saveCart,
  clearCart,
} from "../controllers/cart.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateCartPayload } from "../validators/cartValidate.js";

export const router = express.Router();

router.get("/", authenticate, getCart);
router.put("/", authenticate, validateCartPayload, saveCart);
router.delete("/", authenticate, clearCart);
