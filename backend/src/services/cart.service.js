import { Book, Cart } from "../models/index.js";
import { ApiError, API_ERROR_CODES } from "../constants/api-error-codes.js";

const mapCartItems = (items) =>
  items.map((item) => ({
    bookId: item.book?._id?.toString() || item.book?.toString(),
    quantity: item.quantity,
    book: item.book,
  }));

export const getCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId })
    .populate("items.book")
    .lean();

  if (!cart) {
    return [];
  }

  return mapCartItems(cart.items || []);
};

export const saveCart = async (userId, items = []) => {
  const bookIds = items.map((item) => item.bookId);
  const books = await Book.find({ _id: { $in: bookIds } }).select("_id").lean();
  const validBookIds = new Set(books.map((book) => book._id.toString()));

  const hasInvalid = bookIds.some((id) => !validBookIds.has(id));
  if (hasInvalid) {
    throw new ApiError(
      API_ERROR_CODES.VALIDATION_ERROR,
      "One or more books do not exist",
      400
    );
  }

  const payload = items.map((item) => ({
    book: item.bookId,
    quantity: item.quantity,
  }));

  const cart = await Cart.findOneAndUpdate(
    { user: userId },
    { user: userId, items: payload },
    { new: true, upsert: true }
  )
    .populate("items.book")
    .lean();

  return mapCartItems(cart.items || []);
};

export const clearCart = async (userId) => {
  await Cart.deleteOne({ user: userId });
};
