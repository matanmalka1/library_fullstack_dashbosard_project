import * as cartService from "../services/cart.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";

// READ ALL
// Get the authenticated user's cart.
export const getCart = asyncHandler(async (req, res) => {
  const items = await cartService.getCart(req.user.id);
  successResponse(res, { items }, "Cart retrieved successfully");
});

// UPDATE
// Replace the authenticated user's cart.
export const saveCart = asyncHandler(async (req, res) => {
  const items = await cartService.saveCart(req.user.id, req.body.items);
  successResponse(res, { items }, "Cart saved successfully");
});

// DELETE
// Clear the authenticated user's cart.
export const clearCart = asyncHandler(async (req, res) => {
  await cartService.clearCart(req.user.id);
  successResponse(res, null, "Cart cleared successfully");
});
