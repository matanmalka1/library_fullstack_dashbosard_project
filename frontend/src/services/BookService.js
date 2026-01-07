import { httpClient } from "./shared/httpClient";
import { normalizeBook } from "./shared/normalize";
import { BaseService } from "./BaseService";

class BookServiceClass extends BaseService {
  getBooks() {
    return this.handleRequest(async () => {
      const { data } = await httpClient.get("/books");
      const books = data?.data?.books || [];
      return books.map(normalizeBook);
    }, "Unable to load books.");
  }

  getBookById(id) {
    return this.handleRequest(async () => {
      const { data } = await httpClient.get(`/books/${id}`);
      return normalizeBook(data?.data?.book);
    }, "Unable to load book.");
  }

  saveBook(payload) {
    return this.handleRequest(async () => {
      const next = { ...payload };
      const id = next.id || next._id;
      delete next.id;
      delete next._id;
      const { data } = id
        ? await httpClient.put(`/books/${id}`, next)
        : await httpClient.post("/books", next);
      return normalizeBook(data?.data?.book);
    }, "Unable to save book.");
  }

  deleteBook(id) {
    return this.handleRequest(async () => {
      await httpClient.delete(`/books/${id}`);
      return true;
    }, "Unable to delete book.");
  }
}

export const bookService = new BookServiceClass();
