import { Book, Order } from "../models/index.js";
import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";
import { mapItemWithBook } from "../utils/normalize.js";

const canManageOrders = (user) =>
  user?.role?.name === "admin" || user?.role?.name === "manager";

const mapOrder = (order) => ({
  ...order,
  items: (order.items || []).map(mapItemWithBook),
});

export const getOrders = async (user, query = {}) => {
  const filter = {};
  if (canManageOrders(user)) {
    if (query.userId) {
      filter.user = query.userId;
    }
  } else {
    filter.user = user._id;
  }

  const orders = await Order.find(filter)
    .populate("items.book")
    .sort({ createdAt: -1 })
    .lean();

  return orders.map(mapOrder);
};

export const placeOrder = async (user, payload) => {
  const { items = [], shippingAddress } = payload;

  const bookIds = items.map((item) => item.bookId);
  const books = await Book.find({ _id: { $in: bookIds } }).lean();
  const bookMap = new Map(books.map((book) => [book._id.toString(), book]));

  if (books.length !== bookIds.length) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "One or more items are no longer available.",
      404
    );
  }

  let total = 0;
  const orderItems = items.map((item) => {
    const book = bookMap.get(item.bookId);
    if (!book) {
      throw new ApiError(
        API_ERROR_CODES.RESOURCE_NOT_FOUND,
        "One or more items are no longer available.",
        404
      );
    }
    if (book.stockQuantity < item.quantity) {
      throw new ApiError(
        API_ERROR_CODES.VALIDATION_ERROR,
        `Not enough stock for "${book.title}".`,
        400
      );
    }
    total += book.price * item.quantity;
    return {
      book: book._id,
      title: book.title,
      price: book.price,
      quantity: item.quantity,
    };
  });

  const order = await Order.create({
    user: user._id,
    items: orderItems,
    total,
    shippingAddress,
    status: "PENDING",
    statusHistory: [{ status: "PENDING", date: new Date() }],
    placedAt: new Date(),
  });

  const updates = items.map((item) => ({
    updateOne: {
      filter: { _id: item.bookId },
      update: { $inc: { stockQuantity: -item.quantity } },
    },
  }));
  if (updates.length) {
    await Book.bulkWrite(updates);
  }

  const populated = await Order.findById(order._id)
    .populate("items.book")
    .lean();

  return mapOrder(populated);
};

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "Order not found",
      404
    );
  }

  order.status = status;
  order.statusHistory = order.statusHistory || [];
  order.statusHistory.push({ status, date: new Date() });
  await order.save();

  const populated = await Order.findById(order._id)
    .populate("items.book")
    .lean();

  return mapOrder(populated);
};

export const cancelOrder = async (user, orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw new ApiError(
      API_ERROR_CODES.RESOURCE_NOT_FOUND,
      "Order not found",
      404
    );
  }

  if (!canManageOrders(user) && order.user.toString() !== user._id.toString()) {
    throw new ApiError(
      API_ERROR_CODES.AUTHORIZATION_ERROR,
      "Not authorized to cancel this order",
      403
    );
  }

  if (order.status === "DELIVERED" || order.status === "CANCELLED") {
    const populated = await Order.findById(order._id)
      .populate("items.book")
      .lean();
    return mapOrder(populated);
  }

  order.status = "CANCELLED";
  order.statusHistory = order.statusHistory || [];
  order.statusHistory.push({
    status: "CANCELLED",
    date: new Date(),
    note: "Refund initiated",
  });
  await order.save();

  const updates = order.items.map((item) => ({
    updateOne: {
      filter: { _id: item.book },
      update: { $inc: { stockQuantity: item.quantity } },
    },
  }));
  if (updates.length) {
    await Book.bulkWrite(updates);
  }

  const populated = await Order.findById(order._id)
    .populate("items.book")
    .lean();

  return mapOrder(populated);
};
