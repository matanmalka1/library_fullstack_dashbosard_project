
import { Book } from '../../types';
import { INITIAL_BOOKS } from '../../constants';
import { getStore, setStore, KEYS } from './core';

export const bookApi = {
  getBooks: async (): Promise<Book[]> => {
    const books = getStore<Book[]>(KEYS.BOOKS);
    if (books.length === 0) {
      setStore(KEYS.BOOKS, INITIAL_BOOKS);
      return INITIAL_BOOKS;
    }
    return books;
  },
  
  getBookById: async (id: string): Promise<Book | undefined> => 
    (await bookApi.getBooks()).find(b => b.id === id),

  saveBook: async (book: Partial<Book>): Promise<Book> => {
    const books = await bookApi.getBooks();
    if (book.id) {
      const idx = books.findIndex(b => b.id === book.id);
      books[idx] = { ...books[idx], ...book };
      setStore(KEYS.BOOKS, books);
      return books[idx];
    }
    const newBook = { ...book, id: Date.now().toString(), reviews: [], rating: 0 } as Book;
    books.push(newBook);
    setStore(KEYS.BOOKS, books);
    return newBook;
  },

  deleteBook: async (id: string): Promise<void> => 
    setStore(KEYS.BOOKS, (await bookApi.getBooks()).filter(b => b.id !== id))
};
