import { BookService } from "./books";
import { AuthService } from "./auth";
import { getStore, setStore, KEYS } from "./core";

/* Order statuses as plain constants */
const OrderStatus = {
  PENDING: "PENDING",
  SHIPPED: "SHIPPED",
  DELIVERED: "DELIVERED",
  CANCELLED: "CANCELLED",
};

export class ApiService {
  constructor() {
    const bookService = new BookService();
    const authService = new AuthService();

    this.getBooks = bookService.getBooks.bind(bookService);
    this.getBookById = bookService.getBookById.bind(bookService);
    this.saveBook = bookService.saveBook.bind(bookService);
    this.deleteBook = bookService.deleteBook.bind(bookService);

    this.login = authService.login.bind(authService);
    this.register = authService.register.bind(authService);
    this.logout = authService.logout.bind(authService);
    this.getStoredAuth = authService.getStoredAuth.bind(authService);
  }

  /* -------- Orders -------- */

  async getOrders(userId) {
    const orders = getStore(KEYS.ORDERS) || [];
    return userId ? orders.filter((o) => o.userId === userId) : orders;
  }

  async placeOrder(userId, items, total, address) {
    const orders = await this.getOrders();

    const newOrder = {
      id: `ORD-${Math.random().toString(36).slice(2, 11).toUpperCase()}`,
      userId,
      items,
      total,
      shippingAddress: address,
      status: OrderStatus.PENDING,
      date: new Date().toISOString(),
    };

    orders.push(newOrder);
    setStore(KEYS.ORDERS, orders);

    const books = await this.getBooks();
    items.forEach((item) => {
      const book = books.find((b) => b.id === item.bookId);
      if (book) book.stockQuantity -= item.quantity;
    });
    setStore(KEYS.BOOKS, books);

    return newOrder;
  }

  async updateOrderStatus(id, status) {
    const orders = await this.getOrders();
    const order = orders.find((o) => o.id === id);
    if (order) order.status = status;
    setStore(KEYS.ORDERS, orders);
  }

  /* -------- Cart -------- */

  getCart(uid) {
    return JSON.parse(localStorage.getItem(KEYS.CART) || "{}")[uid] || [];
  }

  saveCart(uid, items) {
    const carts = JSON.parse(localStorage.getItem(KEYS.CART) || "{}");
    carts[uid] = items;
    setStore(KEYS.CART, carts);
  }

  /* -------- Wishlist -------- */

  getWishlist(uid) {
    return JSON.parse(localStorage.getItem(KEYS.WISHLIST) || "{}")[uid] || [];
  }

  toggleWishlist(uid, bookId) {
    const wishlists = JSON.parse(localStorage.getItem(KEYS.WISHLIST) || "{}");
    const list = wishlists[uid] || [];

    const index = list.indexOf(bookId);
    index > -1 ? list.splice(index, 1) : list.push(bookId);

    wishlists[uid] = list;
    setStore(KEYS.WISHLIST, wishlists);

    return list;
  }

  /* -------- Reviews -------- */

  async addReview(bookId, review) {
    const books = await this.getBooks();
    const book = books.find((b) => b.id === bookId);

    if (book) {
      book.reviews.push({
        ...review,
        id: Date.now().toString(),
        approved: false,
      });
    }

    setStore(KEYS.BOOKS, books);
  }

  async approveReview(bookId, reviewId) {
    const books = await this.getBooks();
    const book = books.find((b) => b.id === bookId);
    const review = book?.reviews.find((r) => r.id === reviewId);

    if (book && review) {
      review.approved = true;
      this.recalculateRating(book);
    }

    setStore(KEYS.BOOKS, books);
  }

  async deleteReview(bookId, reviewId) {
    const books = await this.getBooks();
    const book = books.find((b) => b.id === bookId);

    if (book) {
      book.reviews = book.reviews.filter((r) => r.id !== reviewId);
      this.recalculateRating(book);
    }

    setStore(KEYS.BOOKS, books);
  }

  /* -------- Helpers -------- */

  recalculateRating(book) {
    const approved = book.reviews.filter((r) => r.approved);
    book.rating = approved.length
      ? Number(
          (
            approved.reduce((sum, r) => sum + r.rating, 0) / approved.length
          ).toFixed(1)
        )
      : 0;
  }
}

/* -------- Singleton export -------- */
export const api = new ApiService();
