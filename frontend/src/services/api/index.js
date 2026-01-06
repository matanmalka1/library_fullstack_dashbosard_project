import { BookService } from "./books";
import { AuthService } from "./auth";
import { attachOrderMethods } from "./orders";
import { attachCartMethods } from "./cart";
import { attachWishlistMethods } from "./wishlist";
import { attachReviewMethods } from "./reviews";

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
    this.getUsers = authService.getUsers.bind(authService);
    this.updateUserRole = authService.updateUserRole.bind(authService);

    attachOrderMethods(this);
    attachCartMethods(this);
    attachWishlistMethods(this);
    attachReviewMethods(this);
  }
}

/* -------- Singleton export -------- */
export const api = new ApiService();
