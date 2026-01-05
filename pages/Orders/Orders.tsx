
import React, { useEffect, useState } from 'react';
import { Package, Truck, Calendar, ChevronRight, CheckCircle2, Clock, XCircle, ShoppingBag } from 'lucide-react';
import { Order, OrderStatus } from '../../types';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';

const Orders: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
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

  const getStatusStyle = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.DELIVERED: return { bg: 'bg-green-50', text: 'text-green-600', icon: <CheckCircle2 className="w-4 h-4" /> };
      case OrderStatus.PENDING: return { bg: 'bg-amber-50', text: 'text-amber-600', icon: <Clock className="w-4 h-4" /> };
      case OrderStatus.SHIPPED: return { bg: 'bg-indigo-50', text: 'text-indigo-600', icon: <Truck className="w-4 h-4" /> };
      case OrderStatus.CANCELLED: return { bg: 'bg-red-50', text: 'text-red-600', icon: <XCircle className="w-4 h-4" /> };
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
    </div>
  );

  if (orders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Package className="w-10 h-10 text-slate-300" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">No orders yet</h2>
        <p className="text-slate-500 mb-8">When you buy your first book, it will show up here.</p>
        <Link to="/books" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold shadow-lg inline-block">Start Shopping</Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <h1 className="text-4xl font-serif font-bold text-slate-900 mb-10">Purchase History</h1>
      
      <div className="space-y-8">
        {orders.map(order => {
          const style = getStatusStyle(order.status);
          return (
            <div key={order.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all hover:shadow-md">
              <div className="bg-slate-50 p-6 flex flex-wrap justify-between items-center gap-6 border-b border-slate-100">
                <div className="flex gap-8">
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Order ID</p>
                    <p className="text-sm font-bold text-slate-800">#{order.id}</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Date Placed</p>
                    <p className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" /> {new Date(order.date).toLocaleDateString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Total Amount</p>
                    <p className="text-sm font-bold text-indigo-600">${order.total.toFixed(2)}</p>
                  </div>
                </div>
                <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-xs font-bold uppercase tracking-wider ${style.bg} ${style.text}`}>
                  {style.icon} {order.status}
                </div>
              </div>
              
              <div className="p-6">
                <div className="space-y-6">
                  {order.items.map(item => (
                    <div key={item.bookId} className="flex gap-4">
                      <div className="w-16 h-20 bg-slate-50 rounded-lg overflow-hidden flex-shrink-0 p-1 border border-slate-100">
                        <img src={item.book.coverImage} className="w-full h-full object-contain" />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-bold text-slate-800 text-sm leading-tight mb-1">{item.book.title}</h4>
                        <p className="text-xs text-slate-500 mb-2">{item.book.author}</p>
                        <div className="flex items-center gap-4 text-xs">
                          <span className="bg-slate-100 px-2 py-0.5 rounded text-slate-600 font-medium">Qty: {item.quantity}</span>
                          <span className="font-bold text-slate-800">${(item.book.price * item.quantity).toFixed(2)}</span>
                        </div>
                      </div>
                      <Link to={`/books/${item.bookId}`} className="self-center p-2 text-slate-300 hover:text-indigo-600 transition-colors">
                        <ChevronRight className="w-5 h-5" />
                      </Link>
                    </div>
                  ))}
                </div>

                <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                  <div className="flex items-center gap-2 text-xs text-slate-400 italic">
                    <Truck className="w-4 h-4" /> Delivered to: {order.shippingAddress}
                  </div>
                  <button className="text-xs font-bold text-indigo-600 hover:underline">Download Invoice</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
