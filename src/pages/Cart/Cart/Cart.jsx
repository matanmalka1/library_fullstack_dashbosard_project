
import React from 'react';
import { useCart } from '../../../context/cart/CartContext';
import { CartEmpty } from '../CartEmpty/CartEmpty';
import { CartItems } from '../CartItems/CartItems';
import { CartSummary } from '../CartSummary/CartSummary';
import './Cart.css';

export const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return <CartEmpty />;
  }

  return (
    <div className="cart">
      <h1 className="cart__title">
        Shopping Bag <span className="cart__title-count">({totalItems})</span>
      </h1>
      
      <div className="cart__layout">
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
