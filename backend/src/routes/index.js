import express from "express";
import { router as authRoutes } from "./auth.routes.js";
import { router as userRoutes } from "./user.routes.js";
import { router as healthRoutes } from "./health.routes.js";
import { router as uploadRoutes } from "./upload.routes.js";
import { router as bookRoutes } from "./book.routes.js";
import { router as reviewRoutes } from "./review.routes.js";
import { router as cartRoutes } from "./cart.routes.js";
import { router as wishlistRoutes } from "./wishlist.routes.js";

export const router = express.Router();

router.use("/auth", authRoutes);
router.use("/users", userRoutes);
router.use("/books", bookRoutes);
router.use("/cart", cartRoutes);
router.use("/wishlist", wishlistRoutes);
router.use("/", reviewRoutes);
router.use("/upload", uploadRoutes);
router.use("/", healthRoutes);
