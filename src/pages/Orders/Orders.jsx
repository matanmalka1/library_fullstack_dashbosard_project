
import React, { useEffect, useState } from 'react';
import { Package, Truck, Calendar, ChevronRight, CheckCircle2, Clock, XCircle, ShoppingBag } from 'lucide-react';
import { OrderStatus } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import './Orders.css';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      api.getOrders(user.id).then(data => {
        setOrders(data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()));
        setLoading(false);
      });
    }
  }, [user]);

  const getStatusStyle = (status) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return { statusClass: 'orders__status--delivered', icon: <CheckCircle2 className="orders__status-icon" /> };
      case OrderStatus.PENDING:
        return { statusClass: 'orders__status--pending', icon: <Clock className="orders__status-icon" /> };
      case OrderStatus.SHIPPED:
        return { statusClass: 'orders__status--shipped', icon: <Truck className="orders__status-icon" /> };
      case OrderStatus.CANCELLED:
        return { statusClass: 'orders__status--cancelled', icon: <XCircle className="orders__status-icon" /> };
      default:
        return { statusClass: '', icon: null };
    }
  };

  if (loading) return (
    <div className="orders__loading">
      <div className="orders__spinner" />
    </div>
  );

  if (orders.length === 0) {
    return (
      <div className="orders__empty">
        <div className="orders__empty-icon">
          <Package className="orders__empty-icon-svg" />
        </div>
        <h2 className="orders__empty-title">No orders yet</h2>
        <p className="orders__empty-text">When you buy your first book, it will show up here.</p>
        <Link to="/books" className="orders__empty-action">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="orders">
      <h1 className="orders__title">Purchase History</h1>
      
      <div className="orders__list">
        {orders.map(order => {
          const style = getStatusStyle(order.status);
          return (
            <div key={order.id} className="orders__card">
              <div className="orders__card-header">
                <div className="orders__meta">
                  <div>
                    <p className="orders__meta-label">Order ID</p>
                    <p className="orders__meta-value">#{order.id}</p>
                  </div>
                  <div>
                    <p className="orders__meta-label">Date Placed</p>
                    <p className="orders__meta-value orders__meta-value--date">
                      <Calendar className="orders__meta-icon" /> {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="orders__meta-label">Total Amount</p>
                    <p className="orders__meta-value orders__meta-value--total">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className={`orders__status ${style.statusClass}`}>
                  {style.icon} <span>{order.status}</span>
                </div>
              </div>
              
              <div className="orders__card-body">
                <div className="orders__items">
                  {order.items.map(item => (
                    <div key={item.bookId} className="orders__item">
                      <div className="orders__item-thumb">
                        <img src={item.book.coverImage} className="orders__item-img" />
                      </div>
                      <div className="orders__item-body">
                        <h4 className="orders__item-title">{item.book.title}</h4>
                        <p className="orders__item-author">{item.book.author}</p>
                        <div className="orders__item-meta">
                          <span className="orders__item-qty">Qty: {item.quantity}</span>
                          <span className="orders__item-price">${(item.book.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <Link to={`/books/${item.bookId}`} className="orders__item-link">
                        <ChevronRight className="orders__item-link-icon" />
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="orders__footer">
                  <div className="orders__footer-note">
                    <Truck className="orders__footer-icon" /> Delivered to: {order.shippingAddress}
                  </div>
                  <button className="orders__footer-action">Download Invoice</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
