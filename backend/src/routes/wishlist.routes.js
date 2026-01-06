import express from "express";
import {
  getWishlist,
  toggleWishlist,
  clearWishlist,
} from "../controllers/wishlist.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateToggleWishlist } from "../validators/wishlistValidate.js";

export const router = express.Router();

router.get("/", authenticate, getWishlist);
router.post("/toggle", authenticate, validateToggleWishlist, toggleWishlist);
router.delete("/", authenticate, clearWishlist);
