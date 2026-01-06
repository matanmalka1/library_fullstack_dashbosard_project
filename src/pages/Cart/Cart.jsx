
import React from 'react';
import { useCart } from '../../context/cart/CartContext';
import { CartEmpty } from '../CartEmpty/CartEmpty';
import { CartItems } from '../CartItems/CartItems';
import { CartSummary } from '../CartSummary/CartSummary';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-12">
      <h1 className="font-serif text-4xl font-bold text-slate-900 mb-10">
        Shopping Bag <span className="text-slate-300 ml-2">({totalItems})</span>
      </h1>
      
      <div className="flex flex-col gap-12 lg:flex-row">
        <CartItems
          items={items}
          onRemove={removeFromCart}
          onUpdateQuantity={updateQuantity}
        />
        <CartSummary totalItems={totalItems} totalPrice={totalPrice} />
      </div>
    </div>
  );
};
