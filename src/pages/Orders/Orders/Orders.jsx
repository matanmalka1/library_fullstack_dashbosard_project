
import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { api } from '../../../services/api';
import { useAuth } from '../../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import { OrderCard } from '../OrderCard/OrderCard';
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
        {orders.map(order => (
          <OrderCard key={order.id} order={order} user={user} />
        ))}
      </div>
    </div>
  );
};
