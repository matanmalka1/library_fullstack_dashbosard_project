import { getStore, setStore, KEYS } from "./core";
import { requireRole } from "./auth.utils";
import { UserRole } from "../../types";
import { http } from "./http";
import { getApiErrorMessage } from "./error";
import { normalizeId } from "./normalize";

const normalizeReview = (review) => {
  if (!review) return review;
  return {
    ...review,
    id: normalizeId(review._id || review.id),
    userId: normalizeId(review.user?._id || review.user || review.userId),
  };
};

const normalizeBook = (book) => {
  if (!book) return book;
  const normalized = {
    ...book,
    id: normalizeId(book._id || book.id),
    reviews: (book.reviews || []).map(normalizeReview),
  };
  return normalized;
};

export class BookService {
  async getBooks() {
    try {
      const { data } = await http.get("/books", { params: { limit: 200 } });
      const books = data?.data?.books || [];
      return books.map(normalizeBook);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to load books"));
    }
  }

  async getBookById(id) {
    try {
      const { data } = await http.get(`/books/${id}`);
      return normalizeBook(data?.data?.book);
    } catch (error) {
      if (error?.response?.status === 404) return null;
      throw new Error(getApiErrorMessage(error, "Unable to load book"));
    }
  }

  async saveBook(book) {
    requireRole([UserRole.ADMIN, UserRole.MANAGER]);
    try {
      if (book.id) {
        const payload = { ...book };
        delete payload.id;
        const { data } = await http.put(`/books/${book.id}`, payload);
        return normalizeBook(data?.data?.book);
      }

      const { data } = await http.post("/books", book);
      return normalizeBook(data?.data?.book);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to save book"));
    }
  }

  async deleteBook(id) {
    requireRole([UserRole.ADMIN, UserRole.MANAGER]);
    try {
      await http.delete(`/books/${id}`);
    } catch (error) {
      throw new Error(getApiErrorMessage(error, "Unable to delete book"));
    }

    const carts = getStore(KEYS.CART) || {};
    Object.keys(carts).forEach((uid) => {
      carts[uid] = (carts[uid] || []).filter((item) => item.bookId !== id);
    });
    setStore(KEYS.CART, carts);

    const wishlists = getStore(KEYS.WISHLIST) || {};
    Object.keys(wishlists).forEach((uid) => {
      wishlists[uid] = (wishlists[uid] || []).filter((bookId) => bookId !== id);
    });
    setStore(KEYS.WISHLIST, wishlists);
  }
}

