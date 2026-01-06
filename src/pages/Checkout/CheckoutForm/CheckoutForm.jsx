import React from 'react';
import { CreditCard } from 'lucide-react';
import './CheckoutForm.css';

export const CheckoutForm = ({
  userName,
  address,
  city,
  zip,
  onAddressChange,
  onCityChange,
  onZipChange,
  onSubmit,
}) => (
  <div className="checkout__content">
    <h1 className="checkout__title">Secure Checkout</h1>

    <div className="checkout__sections">
      <section>
        <div className="checkout__step">
          <div className="checkout__step-badge">1</div>
          <h2 className="checkout__step-title">Shipping Details</h2>
        </div>
        <form id="checkout-form" onSubmit={onSubmit} className="checkout__form">
          <div className="checkout__field checkout__field--wide">
            <label className="checkout__label">Full Name</label>
            <input
              type="text"
              value={userName}
              disabled
              className="checkout__input checkout__input--disabled"
            />
          </div>
          <div className="checkout__field checkout__field--wide">
            <label className="checkout__label">Street Address</label>
            <input
              type="text"
              required
              className="checkout__input"
              placeholder="123 Reading Lane"
              value={address}
              onChange={(e) => onAddressChange(e.target.value)}
            />
          </div>
          <div className="checkout__field">
            <label className="checkout__label">City</label>
            <input
              type="text"
              required
              className="checkout__input"
              placeholder="New York"
              value={city}
              onChange={(e) => onCityChange(e.target.value)}
            />
          </div>
          <div className="checkout__field">
            <label className="checkout__label">Zip Code</label>
            <input
              type="text"
              required
              className="checkout__input"
              placeholder="10001"
              value={zip}
              onChange={(e) => onZipChange(e.target.value)}
            />
          </div>
        </form>
      </section>

      <section>
        <div className="checkout__step">
          <div className="checkout__step-badge">2</div>
          <h2 className="checkout__step-title">Payment Method</h2>
        </div>
        <div className="checkout__payment">
          <div className="checkout__payment-info">
            <CreditCard className="checkout__payment-icon" />
            <div>
              <h4 className="checkout__payment-title">Pay on Delivery</h4>
              <p className="checkout__payment-text">
                Safe & Contactless payment when items arrive.
              </p>
            </div>
          </div>
          <div className="checkout__payment-check">
            <div className="checkout__payment-dot" />
          </div>
        </div>
      </section>
    </div>
  </div>
);
