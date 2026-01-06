import { OrderStatus } from "../../types";
import { getStore, setStore, KEYS } from "./core";

export const attachOrderMethods = (service) => {
  service.getOrders = async (userId) => {
    const orders = getStore(KEYS.ORDERS) || [];
    return userId ? orders.filter((o) => o.userId === userId) : orders;
  };

  service.placeOrder = async (userId, items, total, address) => {
    const orders = await service.getOrders();

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

    const books = await service.getBooks();
    items.forEach((item) => {
      const book = books.find((b) => b.id === item.bookId);
      if (book) book.stockQuantity -= item.quantity;
    });
    setStore(KEYS.BOOKS, books);

    return newOrder;
  };

  service.updateOrderStatus = async (id, status) => {
    const orders = await service.getOrders();
    const order = orders.find((o) => o.id === id);
    if (order) order.status = status;
    setStore(KEYS.ORDERS, orders);
  };
};
