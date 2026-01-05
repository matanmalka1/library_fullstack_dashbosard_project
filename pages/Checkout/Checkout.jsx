
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [zip, setZip] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) return;
    
    setLoading(true);
    try {
      const fullAddress = `${address}, ${city}, ${zip}`;
      await api.placeOrder(user.id, items, totalPrice, fullAddress);
      setSuccess(true);
      clearCart();
      setTimeout(() => navigate('/orders'), 3000);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center animate-in zoom-in-95 duration-500">
        <div className="w-24 h-24 bg-green-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <CheckCircle2 className="w-12 h-12 text-green-500" />
        </div>
        <h1 className="text-4xl font-serif font-bold text-slate-900 mb-4">Order Confirmed!</h1>
        <p className="text-slate-500 text-lg mb-10">Thank you for your purchase. We've sent a confirmation email to <strong>{user?.email}</strong>.</p>
        <p className="text-sm text-slate-400">Redirecting to your order history...</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <button onClick={() => navigate('/cart')} className="flex items-center gap-2 text-slate-400 hover:text-slate-600 font-bold text-sm mb-10 transition-colors">
        <ChevronLeft className="w-4 h-4" /> Back to Bag
      </button>

      <div className="flex flex-col lg:flex-row gap-16">
        {/* Shipping Form */}
        <div className="flex-grow">
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-8">Secure Checkout</h1>
          
          <div className="space-y-10">
            {/* Shipping Details */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold text-sm">1</div>
                <h2 className="text-xl font-bold text-slate-800">Shipping Details</h2>
              </div>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Full Name</label>
                  <input type="text" value={user?.name} disabled className="w-full px-4 py-3 bg-slate-50 border border-slate-100 rounded-xl text-slate-500 outline-none" />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Street Address</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                    placeholder="123 Reading Lane"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">City</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                    placeholder="New York"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">Zip Code</label>
                  <input 
                    type="text" 
                    required
                    className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none transition-all" 
                    placeholder="10001"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </form>
            </section>

            {/* Payment (Simulation) */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-indigo-600 rounded-full text-white flex items-center justify-center font-bold text-sm">2</div>
                <h2 className="text-xl font-bold text-slate-800">Payment Method</h2>
              </div>
              <div className="bg-indigo-50 p-8 rounded-3xl border border-indigo-100 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <CreditCard className="w-8 h-8 text-indigo-600" />
                  <div>
                    <h4 className="font-bold text-slate-800">Pay on Delivery</h4>
                    <p className="text-xs text-indigo-600 font-medium">Safe & Contactless payment when items arrive.</p>
                  </div>
                </div>
                <div className="bg-white p-2 rounded-full border border-indigo-200">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full" />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="w-full lg:w-96">
          <div className="bg-slate-900 p-8 rounded-[40px] text-white shadow-2xl lg:sticky lg:top-24">
            <h2 className="text-2xl font-serif font-bold mb-8">Your Order</h2>
            
            <div className="max-h-60 overflow-y-auto mb-8 pr-2 space-y-4">
              {items.map(item => (
                <div key={item.bookId} className="flex justify-between items-center gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/10 rounded-lg flex-shrink-0 p-1">
                      <img src={item.book.coverImage} className="w-full h-full object-contain" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold line-clamp-1">{item.book.title}</h4>
                      <p className="text-[10px] text-slate-400">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold">${(item.book.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 mb-8 pt-6 border-t border-white/10">
              <div className="flex justify-between text-sm text-slate-400">
                <span>Items Subtotal</span>
                <span className="text-white">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-400">
                <span>Shipping Fee</span>
                <span className="text-green-400 font-bold uppercase text-[10px] tracking-widest">Free</span>
              </div>
              <div className="flex justify-between text-xl font-bold pt-4 border-t border-white/10">
                <span className="font-serif">Total Pay</span>
                <span className="text-indigo-400">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <button 
              form="checkout-form"
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-500 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-400 transition-all shadow-xl shadow-black/20 disabled:opacity-50"
            >
              {loading ? 'Processing...' : 'Complete Purchase'}
            </button>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center text-center opacity-60">
                <Truck className="w-5 h-5 mb-1" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Express</span>
              </div>
              <div className="flex flex-col items-center text-center opacity-60">
                <ShieldCheck className="w-5 h-5 mb-1" />
                <span className="text-[10px] uppercase font-bold tracking-widest">Secure</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Checkout;
