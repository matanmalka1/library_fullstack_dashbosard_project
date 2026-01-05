
import React from 'react';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const BookInfo = ({ book }) => {
  const { addToCart } = useCart();
  
  const Feature = ({ icon: Icon, label, value }) => (
    <div className="bg-white p-4 rounded-2xl border flex flex-col items-center gap-1">
      <Icon className="text-indigo-500 w-5 h-5 mb-1" />
      <span className="text-[10px] font-bold text-slate-400 uppercase">{label}</span>
      <span className="text-xs font-bold">{value}</span>
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-16">
      <div className="w-full lg:w-1/2 space-y-6">
        <div className="aspect-[3/4] bg-white rounded-[40px] shadow-2xl p-12 flex items-center justify-center border border-slate-100">
          <img src={book.coverImage} alt={book.title} className="max-h-full object-contain" />
        </div>
        <div className="grid grid-cols-3 gap-4">
          <Feature icon={Truck} label="Delivery" value="Express" />
          <Feature icon={RotateCcw} label="Returns" value="30 Days" />
          <Feature icon={Shield} label="Safe" value="Verified" />
        </div>
      </div>
      <div className="w-full lg:w-1/2 space-y-8 py-6">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
            <span className="font-bold text-amber-700">{book.rating > 0 ? book.rating.toFixed(1) : 'New'}</span>
            <span className="text-slate-300">•</span>
            <span className="text-slate-500 text-sm">Verified Selection</span>
          </div>
          <h1 className="text-5xl font-serif font-bold leading-tight text-slate-900">{book.title}</h1>
          <p className="text-xl font-medium text-slate-500 mt-2">by <span className="text-indigo-600">{book.author}</span></p>
        </div>
        <p className="text-3xl font-bold text-slate-900">${book.price.toFixed(2)}</p>
        <p className="text-slate-600 text-lg leading-relaxed italic border-l-4 border-indigo-100 pl-6">"{book.description}"</p>
        <div className="flex gap-4 pt-6 border-t">
          <button 
            onClick={() => addToCart(book)}
            className="flex-grow bg-indigo-600 text-white py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 hover:bg-indigo-700"
          >
            <ShoppingCart className="w-5 h-5" /> Add to Shopping Bag
          </button>
          <button className="bg-white border p-4 rounded-2xl text-slate-300 hover:text-red-500"><Heart className="w-6 h-6" /></button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
