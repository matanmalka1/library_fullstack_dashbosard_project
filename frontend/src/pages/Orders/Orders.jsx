
import React, { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/auth/AuthContext';
import { Link } from 'react-router-dom';
import { OrderCard } from './OrderCard';

export const Orders = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  const fetchOrders = async () => {
    if (!user) return;
    const data = await api.getOrders(user.id);
    setOrders(
      data.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    );
    setLoading(false);
  };

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const handleCancelOrder = async (orderId) => {
    if (!confirm("Cancel this order and request a refund?")) return;
    await api.cancelOrder(orderId);
    fetchOrders();
  };

  if (loading) return (
    <div className="max-w-[1120px] mx-auto px-4 py-20 flex justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
    </div>
  );

  if (orders.length === 0) {
    return (
      <div className="max-w-[1120px] mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="font-serif text-2xl md:text-[32px] text-slate-800 mb-4">No orders yet</h2>
        <p className="text-slate-500 mb-8">When you buy your first book, it will show up here.</p>
        <Link to="/books" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold no-underline">
          Start Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[960px] mx-auto px-4 py-12">
      <h1 className="font-serif text-4xl text-slate-900 mb-10">Purchase History</h1>
      
      <div className="grid gap-8">
        {orders.map(order => (
          <OrderCard
            key={order.id}
            order={order}
            user={user}
            onCancel={handleCancelOrder}
          />
        ))}
      </div>
    </div>
  );
};
