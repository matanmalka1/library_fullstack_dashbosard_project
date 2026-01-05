
import { INITIAL_BOOKS } from '../../constants';
import { getStore, setStore, KEYS } from './core';

export const bookApi = {
  getBooks: async () => {
    const books = getStore(KEYS.BOOKS);
    if (books.length === 0) {
      setStore(KEYS.BOOKS, INITIAL_BOOKS);
      return INITIAL_BOOKS;
    }
    return books;
  },
  
  getBookById: async (id) => 
    (await bookApi.getBooks()).find(b => b.id === id),

  saveBook: async (book) => {
    const books = await bookApi.getBooks();
    if (book.id) {
      const idx = books.findIndex(b => b.id === book.id);
      books[idx] = { ...books[idx], ...book };
      setStore(KEYS.BOOKS, books);
      return books[idx];
    }
    const newBook = { ...book, id: Date.now().toString(), reviews: [], rating: 0 };
    books.push(newBook);
    setStore(KEYS.BOOKS, books);
    return newBook;
  },

  deleteBook: async (id) => 
    setStore(KEYS.BOOKS, (await bookApi.getBooks()).filter(b => b.id !== id))
};
