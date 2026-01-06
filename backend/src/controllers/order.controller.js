import * as orderService from "../services/order.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { successResponse } from "../utils/response.js";

// CREATE
// Place an order for the authenticated user.
export const placeOrder = asyncHandler(async (req, res) => {
  const order = await orderService.placeOrder(req.user, req.body);
  successResponse(res, { order }, "Order placed successfully", 201);
});

// READ ALL
// List orders (admin/manager can list all).
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await orderService.getOrders(req.user, req.query);
  successResponse(res, { orders }, "Orders retrieved successfully");
});

// UPDATE
// Update order status (admin/manager).
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await orderService.updateOrderStatus(req.params.id,req.body.status);
  successResponse(res, { order }, "Order updated successfully");
});


// Cancel an order (owner or admin/manager).
export const cancelOrder = asyncHandler(async (req, res) => {
  const order = await orderService.cancelOrder(req.user, req.params.id);
  successResponse(res, { order }, "Order cancelled successfully");
});
