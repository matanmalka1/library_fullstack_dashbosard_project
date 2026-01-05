
import { UserRole, OrderStatus } from '../types';
import { INITIAL_BOOKS } from '../constants';

const KEYS = {
  BOOKS: 'books', USERS: 'users', ORDERS: 'orders',
  AUTH: 'auth', CART: 'cart', WISHLIST: 'wishlist'
};

const getStore = (k) => JSON.parse(localStorage.getItem(k) || '[]');
const setStore = (k, d) => localStorage.setItem(k, JSON.stringify(d));

export const api = {
  getBooks: async () => {
    const books = getStore(KEYS.BOOKS);
    if (books.length === 0) { setStore(KEYS.BOOKS, INITIAL_BOOKS); return INITIAL_BOOKS; }
    return books;
  },
  
  getBookById: async (id) => 
    (await api.getBooks()).find(b => b.id === id),

  saveBook: async (book) => {
    const books = await api.getBooks();
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
    setStore(KEYS.BOOKS, (await api.getBooks()).filter(b => b.id !== id)),

  login: async (email, pass) => {
    const user = getStore(KEYS.USERS).find(u => u.email === email && u.password === pass);
    if (!user) throw new Error('Invalid credentials');
    const { password: _, ...userNoPass } = user;
    const auth = { user: userNoPass, token: 'jwt-' + Date.now(), isAuthenticated: true };
    setStore(KEYS.AUTH, auth);
    return auth;
  },

  register: async (name, email, password) => {
    const users = getStore(KEYS.USERS);
    if (users.find(u => u.email === email)) throw new Error('User already exists');
    const newUser = { id: Date.now().toString(), name, email, password, role: UserRole.USER };
    users.push(newUser);
    setStore(KEYS.USERS, users);
    const { password: _, ...userNoPass } = newUser;
    const auth = { user: userNoPass, token: 'jwt-' + Date.now(), isAuthenticated: true };
    setStore(KEYS.AUTH, auth);
    return auth;
  },

  logout: () => localStorage.removeItem(KEYS.AUTH),
  getStoredAuth: () => {
    const auth = localStorage.getItem(KEYS.AUTH);
    return auth ? JSON.parse(auth) : null;
  },

  getOrders: async (uid) => {
    const orders = getStore(KEYS.ORDERS);
    return uid ? orders.filter(o => o.userId === uid) : orders;
  },

  placeOrder: async (uid, items, total, address) => {
    const orders = await api.getOrders();
    const newOrder = {
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

  updateOrderStatus: async (id, status) => {
    const orders = await api.getOrders();
    const o = orders.find(x => x.id === id);
    if (o) o.status = status;
    setStore(KEYS.ORDERS, orders);
  },

  getCart: (uid) => JSON.parse(localStorage.getItem(KEYS.CART) || '{}')[uid] || [],
  saveCart: (uid, items) => {
    const carts = JSON.parse(localStorage.getItem(KEYS.CART) || '{}');
    carts[uid] = items;
    setStore(KEYS.CART, carts);
  },

  getWishlist: (uid) => JSON.parse(localStorage.getItem(KEYS.WISHLIST) || '{}')[uid] || [],
  toggleWishlist: (uid, bid) => {
    const wlists = JSON.parse(localStorage.getItem(KEYS.WISHLIST) || '{}');
    const list = wlists[uid] || [];
    const idx = list.indexOf(bid);
    idx > -1 ? list.splice(idx, 1) : list.push(bid);
    wlists[uid] = list;
    setStore(KEYS.WISHLIST, wlists);
    return list;
  },

  addReview: async (bid, rev) => {
    const books = await api.getBooks();
    const b = books.find(x => x.id === bid);
    if (b) b.reviews.push({ ...rev, id: Date.now().toString(), approved: false });
    setStore(KEYS.BOOKS, books);
  },

  approveReview: async (bid, rid) => {
    const books = await api.getBooks();
    const b = books.find(x => x.id === bid);
    const r = b?.reviews.find(x => x.id === rid);
    if (b && r) {
      r.approved = true;
      const approved = b.reviews.filter(x => x.approved);
      b.rating = approved.length ? Number((approved.reduce((a, c) => a + c.rating, 0) / approved.length).toFixed(1)) : 0;
    }
    setStore(KEYS.BOOKS, books);
  }
};
