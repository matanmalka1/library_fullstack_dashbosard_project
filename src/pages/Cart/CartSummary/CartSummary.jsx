import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './CartSummary.css';

export const CartSummary = ({ totalItems, totalPrice }) => (
  <aside className="cart__summary">
    <div className="cart__summary-card">
      <h2 className="cart__summary-title">Order Summary</h2>

      <div className="cart__summary-lines">
        <div className="cart__summary-line">
          <span>Subtotal ({totalItems} items)</span>
          <span className="cart__summary-value">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="cart__summary-line">
          <span>Estimated Shipping</span>
          <span className="cart__summary-shipping">Calculated at Checkout</span>
        </div>
        <div className="cart__summary-total">
          <span>Total</span>
          <span className="cart__summary-total-value">${totalPrice.toFixed(2)}</span>
        </div>
      </div>

      <Link to="/checkout" className="cart__summary-action">
        Proceed to Checkout <ArrowRight className="cart__summary-action-icon" />
      </Link>

      <div className="cart__summary-icons">
        <div>
          <img
            src="https://www.svgrepo.com/show/508727/visa.svg"
            className="cart__summary-logo"
            alt="Visa"
          />
        </div>
        <div>
          <img
            src="https://www.svgrepo.com/show/508703/mastercard.svg"
            className="cart__summary-logo"
            alt="Mastercard"
          />
        </div>
      </div>
    </div>
  </aside>
);
