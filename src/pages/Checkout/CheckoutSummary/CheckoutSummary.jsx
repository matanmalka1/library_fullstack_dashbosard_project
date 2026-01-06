import React from 'react';
import { ShieldCheck, Truck } from 'lucide-react';
import './CheckoutSummary.css';

export const CheckoutSummary = ({ items, totalPrice, loading }) => (
  <aside className="checkout__summary">
    <div className="checkout__summary-card">
      <h2 className="checkout__summary-title">Your Order</h2>

      <div className="checkout__summary-items">
        {items.map((item) => (
          <div key={item.bookId} className="checkout__summary-item">
            <div className="checkout__summary-item-info">
              <div className="checkout__summary-item-thumb">
                <img
                  src={item.book.coverImage}
                  className="checkout__summary-item-img"
                />
              </div>
              <div>
                <h4 className="checkout__summary-item-title">{item.book.title}</h4>
                <p className="checkout__summary-item-qty">Qty: {item.quantity}</p>
              </div>
            </div>
            <span className="checkout__summary-item-price">
              ${(item.book.price * item.quantity).toFixed(2)}
            </span>
          </div>
        ))}
      </div>

      <div className="checkout__summary-totals">
        <div className="checkout__summary-line">
          <span>Items Subtotal</span>
          <span className="checkout__summary-value">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
        <div className="checkout__summary-line">
          <span>Shipping Fee</span>
          <span className="checkout__summary-shipping">Free</span>
        </div>
        <div className="checkout__summary-total">
          <span>Total Pay</span>
          <span className="checkout__summary-total-value">
            ${totalPrice.toFixed(2)}
          </span>
        </div>
      </div>

      <button
        form="checkout-form"
        type="submit"
        disabled={loading}
        className="checkout__summary-submit"
      >
        {loading ? 'Processing...' : 'Complete Purchase'}
      </button>

      <div className="checkout__summary-icons">
        <div>
          <Truck className="checkout__summary-icon" />
          <span>Express</span>
        </div>
        <div>
          <ShieldCheck className="checkout__summary-icon" />
          <span>Secure</span>
        </div>
      </div>
    </div>
  </aside>
);
