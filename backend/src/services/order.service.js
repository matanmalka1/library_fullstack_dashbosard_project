import { Book, Order } from "../models/index.js";
import { mapItemWithBook } from "../utils/normalize.js";
import {resourceNotFoundError,validationError,authorizationError,notFoundError } from "../utils/error-factories.js";

const canManageOrders = (user) =>
  user?.role?.name === "admin" || user?.role?.name === "manager";

const mapOrder = (order) => ({
  ...order,
  items: (order.items || []).map(mapItemWithBook),
});

// Helper: load order with populated books and map items
const populateAndMapOrder = async (orderId) => {
  const populated = await Order.findById(orderId).populate("items.book").lean();
  return mapOrder(populated);
};

// Helper: append a status entry to order.statusHistory
const appendStatus = (order, status, note) => {
  order.statusHistory = order.statusHistory || [];
  const entry = { status, date: new Date() };
  if (note) entry.note = note;
  order.statusHistory.push(entry);
};

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
    throw notFoundError("One or more items are no longer available.");
  }

  let total = 0;
  const orderItems = items.map((item) => {
    const book = bookMap.get(item.bookId);
    if (!book) {
      throw notFoundError("One or more items are no longer available.");
    }
    if (book.stockQuantity < item.quantity) {
      throw validationError(`Not enough stock for "${book.title}".`);
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

  return await populateAndMapOrder(order._id);
};

export const updateOrderStatus = async (orderId, status) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw resourceNotFoundError("Order");
  }

  order.status = status;
  appendStatus(order, status);
  await order.save();

  return await populateAndMapOrder(order._id);
};

export const cancelOrder = async (user, orderId) => {
  const order = await Order.findById(orderId);
  if (!order) {
    throw resourceNotFoundError("Order");
  }

  if (!canManageOrders(user) && order.user.toString() !== user._id.toString()) {
    throw authorizationError("Not authorized to cancel this order");
  }

  if (order.status === "DELIVERED" || order.status === "CANCELLED") {
    return await populateAndMapOrder(order._id);
  }

  order.status = "CANCELLED";
  appendStatus(order, "CANCELLED", "Refund initiated");
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

  return await populateAndMapOrder(order._id);
};
