
import { Book, User, AuthState, UserRole, Order, OrderStatus, CartItem, Review } from '../types';
import { INITIAL_BOOKS } from '../constants';

const KEYS = {
  BOOKS: 'books', USERS: 'users', ORDERS: 'orders',
  AUTH: 'auth', CART: 'cart', WISHLIST: 'wishlist'
};

const getStore = <T>(k: string): T => JSON.parse(localStorage.getItem(k) || '[]');
const setStore = (k: string, d: any) => localStorage.setItem(k, JSON.stringify(d));

export const api = {
  getBooks: async (): Promise<Book[]> => {
    const books = getStore<Book[]>(KEYS.BOOKS);
    if (books.length === 0) { setStore(KEYS.BOOKS, INITIAL_BOOKS); return INITIAL_BOOKS; }
    return books;
  },
  
  getBookById: async (id: string): Promise<Book | undefined> => 
    (await api.getBooks()).find(b => b.id === id),

  saveBook: async (book: Partial<Book>): Promise<Book> => {
    const books = await api.getBooks();
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
    setStore(KEYS.BOOKS, (await api.getBooks()).filter(b => b.id !== id)),

  login: async (email: string, pass: string): Promise<AuthState> => {
    const user = getStore<any[]>(KEYS.USERS).find(u => u.email === email && u.password === pass);
    if (!user) throw new Error('Invalid credentials');
    const { password: _, ...userNoPass } = user;
    const auth = { user: userNoPass as User, token: 'jwt-' + Date.now(), isAuthenticated: true };
    setStore(KEYS.AUTH, auth);
    return auth;
  },

  register: async (name: string, email: string, password: string): Promise<AuthState> => {
    const users = getStore<any[]>(KEYS.USERS);
    if (users.find(u => u.email === email)) throw new Error('User already exists');
    const newUser = { id: Date.now().toString(), name, email, password, role: UserRole.USER };
    users.push(newUser);
    setStore(KEYS.USERS, users);
    const { password: _, ...userNoPass } = newUser;
    const auth = { user: userNoPass as User, token: 'jwt-' + Date.now(), isAuthenticated: true };
    setStore(KEYS.AUTH, auth);
    return auth;
  },

  logout: () => localStorage.removeItem(KEYS.AUTH),
  getStoredAuth: (): AuthState | null => {
    const auth = localStorage.getItem(KEYS.AUTH);
    return auth ? JSON.parse(auth) : null;
  },

  getOrders: async (uid?: string): Promise<Order[]> => {
    const orders = getStore<Order[]>(KEYS.ORDERS);
    return uid ? orders.filter(o => o.userId === uid) : orders;
  },

  placeOrder: async (uid: string, items: CartItem[], total: number, address: string): Promise<Order> => {
    const orders = await api.getOrders();
    const newOrder: Order = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId: uid, items, total, shippingAddress: address, status: OrderStatus.PENDING, date: new Date().toISOString()
    };
    orders.push(newOrder);
    setStore(KEYS.ORDERS, orders);
    const books = await api.getBooks();
    items.forEach(item => {
      const b = books.find(x => x.id === item.bookId);
      if (b) b.stockQuantity -= item.quantity;
    });
    setStore(KEYS.BOOKS, books);
    return newOrder;
  },

  updateOrderStatus: async (id: string, status: OrderStatus) => {
    const orders = await api.getOrders();
    const o = orders.find(x => x.id === id);
    if (o) o.status = status;
    setStore(KEYS.ORDERS, orders);
  },

  getCart: (uid: string) => JSON.parse(localStorage.getItem(KEYS.CART) || '{}')[uid] || [],
  saveCart: (uid: string, items: CartItem[]) => {
    const carts = JSON.parse(localStorage.getItem(KEYS.CART) || '{}');
    carts[uid] = items;
    setStore(KEYS.CART, carts);
  },

  getWishlist: (uid: string) => JSON.parse(localStorage.getItem(KEYS.WISHLIST) || '{}')[uid] || [],
  toggleWishlist: (uid: string, bid: string) => {
    const wlists = JSON.parse(localStorage.getItem(KEYS.WISHLIST) || '{}');
    const list = wlists[uid] || [];
    const idx = list.indexOf(bid);
    idx > -1 ? list.splice(idx, 1) : list.push(bid);
    wlists[uid] = list;
    setStore(KEYS.WISHLIST, wlists);
    return list;
  },

  addReview: async (bid: string, rev: Omit<Review, 'id' | 'approved'>) => {
    const books = await api.getBooks();
    const b = books.find(x => x.id === bid);
    if (b) b.reviews.push({ ...rev, id: Date.now().toString(), approved: false });
    setStore(KEYS.BOOKS, books);
  },

  approveReview: async (bid: string, rid: string) => {
    const books = await api.getBooks();
    const b = books.find(x => x.id === bid);
    const r = b?.reviews.find(x => x.id === rid);
    if (r) {
      r.approved = true;
      const approved = b!.reviews.filter(x => x.approved);
      b!.rating = approved.length ? Number((approved.reduce((a, c) => a + c.rating, 0) / approved.length).toFixed(1)) : 0;
    }
    setStore(KEYS.BOOKS, books);
  }
};
