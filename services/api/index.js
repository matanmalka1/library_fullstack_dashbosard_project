
import { bookApi } from './books';
import { authApi } from './auth';
import { getStore, setStore, KEYS } from './core';
import { OrderStatus } from '../../types';

export const api = {
  ...bookApi,
  ...authApi,
  
  getOrders: async (userId) => {
    const orders = getStore(KEYS.ORDERS);
    return userId ? orders.filter(o => o.userId === userId) : orders;
  },

  placeOrder: async (userId, items, total, address) => {
    const orders = await api.getOrders();
    const newOrder = {
      id: 'ORD-' + Math.random().toString(36).substr(2, 9).toUpperCase(),
      userId, items, total, shippingAddress: address, status: OrderStatus.PENDING, date: new Date().toISOString()
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
  },

  deleteReview: async (bid, rid) => {
    const books = await api.getBooks();
    const b = books.find(x => x.id === bid);
    if (b) {
      b.reviews = b.reviews.filter(r => r.id !== rid);
      const approved = b.reviews.filter(x => x.approved);
      b.rating = approved.length ? Number((approved.reduce((a, c) => a + c.rating, 0) / approved.length).toFixed(1)) : 0;
    }
    setStore(KEYS.BOOKS, books);
  }
};
