import { normalizeBook } from "./shared/normalize";
import { BaseService } from "./BaseService";

class BookServiceClass extends BaseService {
  constructor() {
    super();
  }

  getBooks() {
    return this.handleGetList("/books", {
      dataKey: "books",
      normalize: normalizeBook,
      fallback: "Unable to load books."
    });
  }

  getBookById(id) {
    return this.handleGet(`/books/${id}`, {
      normalize: (data) => normalizeBook(data?.book),
      fallback: "Unable to load book."
    });
  }

  saveBook(payload) {
    const next = { ...payload };
    const id = next.id || next._id;
    delete next.id;
    delete next._id;

    if (id) {
      return this.handlePut(`/books/${id}`, next, {
        normalize: (data) => normalizeBook(data?.book),
        fallback: "Unable to update book."
      });
    }

    return this.handlePost("/books", next, {
      normalize: (data) => normalizeBook(data?.book),
      fallback: "Unable to create book."
    });
  }

  deleteBook(id) {
    return this.handleDelete(`/books/${id}`, {
      fallback: "Unable to delete book."
    });
  }
}

export const bookService = new BookServiceClass();