import { Book, Wishlist } from "../models/index.js";
import { resourceNotFoundError } from "../utils/error-factories.js";

const mapWishlistItems = (items = []) =>
  items.map((item) => item.book?.toString() || item.book?._id?.toString());

export const getWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId }).lean();
  if (!wishlist) return [];
  return mapWishlistItems(wishlist.items || []);
};

export const toggleWishlist = async (userId, bookId) => {
  const exists = await Book.exists({ _id: bookId });
  if (!exists) {
    throw resourceNotFoundError("Book");
  }

  const wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    const created = await Wishlist.create({
      user: userId,
      items: [{ book: bookId }],
    });
    return mapWishlistItems(created.items || []);
  }

  const index = wishlist.items.findIndex(
    (item) => item.book.toString() === bookId
  );
  if (index > -1) {
    wishlist.items.splice(index, 1);
  } else {
    wishlist.items.push({ book: bookId });
  }

  await wishlist.save();
  return mapWishlistItems(wishlist.items || []);
};

export const clearWishlist = async (userId) => {
  await Wishlist.deleteOne({ user: userId });
};
