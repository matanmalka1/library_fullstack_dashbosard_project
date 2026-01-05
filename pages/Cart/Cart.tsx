
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const Cart: React.FC = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-20 text-center">
        <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
          <ShoppingBag className="w-12 h-12 text-indigo-400" />
        </div>
        <h2 className="text-3xl font-bold font-serif text-slate-900 mb-4">Your bag is empty</h2>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto">Looks like you haven't added anything to your cart yet. Start exploring our collection!</p>
        <Link to="/books" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 inline-block">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-serif font-bold text-slate-900 mb-10">Shopping Bag <span className="text-slate-300 font-sans ml-2">({totalItems})</span></h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Items List */}
        <div className="flex-grow space-y-6">
          {items.map(item => (
            <div key={item.bookId} className="bg-white p-6 rounded-3xl border border-slate-100 flex gap-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-24 h-32 flex-shrink-0 bg-slate-50 rounded-xl overflow-hidden p-2">
                <img src={item.book.coverImage} alt={item.book.title} className="w-full h-full object-contain" />
              </div>
              
              <div className="flex-grow flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-slate-800 text-lg leading-tight mb-1">{item.book.title}</h3>
                    <p className="text-sm text-slate-500 font-medium">by {item.book.author}</p>
                    <div className="mt-2 text-[10px] uppercase font-bold text-indigo-500 bg-indigo-50 px-2 py-0.5 rounded w-fit">
                      {item.book.categories[0]}
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.bookId)} className="text-slate-300 hover:text-red-500 transition-colors p-2">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="flex justify-between items-end mt-4">
                  <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-1 border border-slate-100">
                    <button 
                      onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                      className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-6 text-center text-sm font-bold text-slate-800">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                      className="w-8 h-8 rounded-lg bg-white shadow-sm flex items-center justify-center hover:bg-slate-50 text-slate-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400 mb-1">Price per unit: ${item.book.price.toFixed(2)}</p>
                    <p className="text-xl font-bold text-slate-900">${(item.book.price * item.quantity).toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <div className="bg-indigo-50 p-6 rounded-3xl border border-indigo-100 flex items-start gap-4">
            <div className="bg-indigo-600 rounded-full p-1.5 flex-shrink-0">
              <Info className="w-4 h-4 text-white" />
            </div>
            <p className="text-sm text-indigo-800 leading-relaxed">
              Items will be held for <strong>60 minutes</strong>. Shipping costs and taxes will be calculated during the final step of checkout.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="w-full lg:w-96">
          <div className="bg-white p-8 rounded-[40px] border border-slate-100 shadow-xl lg:sticky lg:top-24">
            <h2 className="text-2xl font-serif font-bold text-slate-900 mb-8">Order Summary</h2>
            
            <div className="space-y-4 mb-8">
              <div className="flex justify-between text-slate-500">
                <span>Subtotal ({totalItems} items)</span>
                <span className="font-medium text-slate-800">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Estimated Shipping</span>
                <span className="text-green-600 font-bold uppercase text-xs">Calculated at Checkout</span>
              </div>
              <div className="pt-4 border-t border-slate-100 flex justify-between items-end">
                <span className="text-lg font-bold text-slate-900">Total</span>
                <span className="text-3xl font-bold text-indigo-600 tracking-tight">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group">
              Proceed to Checkout <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <div className="mt-8 pt-8 border-t border-slate-100 grid grid-cols-2 gap-4">
              <div className="text-center">
                <img src="https://www.svgrepo.com/show/508727/visa.svg" className="h-4 mx-auto grayscale opacity-50 mb-2" alt="Visa" />
              </div>
              <div className="text-center">
                <img src="https://www.svgrepo.com/show/508703/mastercard.svg" className="h-4 mx-auto grayscale opacity-50 mb-2" alt="Mastercard" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
