import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';
import './CartEmpty.css';

export const CartEmpty = () => (
  <div className="cart cart--empty">
    <div className="cart__empty-icon">
      <ShoppingBag className="cart__empty-icon-svg" />
    </div>
    <h2 className="cart__empty-title">Your bag is empty</h2>
    <p className="cart__empty-text">
      Looks like you haven't added anything to your cart yet. Start exploring
      our collection!
    </p>
    <Link to="/books" className="cart__empty-action">
      Browse Catalog
    </Link>
  </div>
);
