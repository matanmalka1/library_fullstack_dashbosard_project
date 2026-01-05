
import { Book, Review } from '../types';
import { INITIAL_BOOKS } from '../constants';

const BOOKS_KEY = 'books';

export const bookApi = {
  getBooks: async (): Promise<Book[]> => {
    const stored = localStorage.getItem(BOOKS_KEY);
    if (!stored) {
      localStorage.setItem(BOOKS_KEY, JSON.stringify(INITIAL_BOOKS));
      return INITIAL_BOOKS;
    }
    return JSON.parse(stored);
  },
  
  getBookById: async (id: string): Promise<Book | undefined> => 
    (await bookApi.getBooks()).find(b => b.id === id),

  saveBook: async (book: Partial<Book>): Promise<Book> => {
    const books = await bookApi.getBooks();
    if (book.id) {
      const idx = books.findIndex(b => b.id === book.id);
      books[idx] = { ...books[idx], ...book };
      localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
      return books[idx];
    }
    const newBook = { ...book, id: Date.now().toString(), reviews: [], rating: 0 } as Book;
    books.push(newBook);
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
    return newBook;
  },

  addReview: async (bid: string, rev: Omit<Review, 'id' | 'approved'>) => {
    const books = await bookApi.getBooks();
    const b = books.find(x => x.id === bid);
    if (b) b.reviews.push({ ...rev, id: Date.now().toString(), approved: false });
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  },

  approveReview: async (bid: string, rid: string) => {
    const books = await bookApi.getBooks();
    const b = books.find(x => x.id === bid);
    const r = b?.reviews.find(x => x.id === rid);
    if (r) {
      r.approved = true;
      const approved = b!.reviews.filter(x => x.approved);
      b!.rating = approved.length ? Number((approved.reduce((a, c) => a + c.rating, 0) / approved.length).toFixed(1)) : 0;
    }
    localStorage.setItem(BOOKS_KEY, JSON.stringify(books));
  }
};
