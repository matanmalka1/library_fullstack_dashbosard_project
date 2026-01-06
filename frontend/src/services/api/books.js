import { INITIAL_BOOKS } from "../../Utils/constants";
import { getStore, setStore, KEYS } from "./core";
import { requireRole } from "./auth.utils";
import { UserRole } from "../../types";

export class BookService {
  async getBooks() {
    const books = getStore(KEYS.BOOKS) || [];

    if (books.length === 0) {
      setStore(KEYS.BOOKS, INITIAL_BOOKS);
      return INITIAL_BOOKS;
    }

    return books;
  }

  async getBookById(id) {
    return (await this.getBooks()).find((b) => b.id === id);
  }

  async saveBook(book) {
    requireRole([UserRole.ADMIN, UserRole.MANAGER]);
    const books = await this.getBooks();

    if (book.id) {
      const index = books.findIndex((b) => b.id === book.id);
      if (index === -1) return null;

      books[index] = { ...books[index], ...book };
      setStore(KEYS.BOOKS, books);
      return books[index];
    }

    const newBook = {
      ...book,
      id: Date.now().toString(),
      reviews: [],
      rating: 0,
    };

    books.push(newBook);
    setStore(KEYS.BOOKS, books);
    return newBook;
  }

  async deleteBook(id) {
    // Removed ': string'
    requireRole([UserRole.ADMIN, UserRole.MANAGER]);
    const books = await this.getBooks();
    setStore(
      KEYS.BOOKS,
      books.filter((b) => b.id !== id)
    );

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

/* -------- Singleton export -------- */
export const bookApi = new BookService();
