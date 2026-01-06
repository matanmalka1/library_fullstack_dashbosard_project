import React from 'react';
import { CheckCircle2 } from 'lucide-react';
import './CheckoutSuccess.css';

export const CheckoutSuccess = ({ email }) => (
  <div className="checkout checkout--success">
    <div className="checkout__success-icon">
      <CheckCircle2 className="checkout__success-icon-svg" />
    </div>
    <h1 className="checkout__success-title">Order Confirmed!</h1>
    <p className="checkout__success-text">
      Thank you for your purchase. We've sent a confirmation email to{' '}
      <strong>{email}</strong>.
    </p>
    <p className="checkout__success-note">Redirecting to your order history...</p>
  </div>
);
