
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, ShieldCheck, Truck, CreditCard, ChevronLeft } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../services/api';
import './Checkout.css';

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
      <div className="checkout checkout--success">
        <div className="checkout__success-icon">
          <CheckCircle2 className="checkout__success-icon-svg" />
        </div>
        <h1 className="checkout__success-title">Order Confirmed!</h1>
        <p className="checkout__success-text">Thank you for your purchase. We've sent a confirmation email to <strong>{user?.email}</strong>.</p>
        <p className="checkout__success-note">Redirecting to your order history...</p>
      </div>
    );
  }

  return (
    <div className="checkout">
      <button onClick={() => navigate('/cart')} className="checkout__back">
        <ChevronLeft className="checkout__back-icon" /> Back to Bag
      </button>

      <div className="checkout__layout">
        {/* Shipping Form */}
        <div className="checkout__content">
          <h1 className="checkout__title">Secure Checkout</h1>
          
          <div className="checkout__sections">
            {/* Shipping Details */}
            <section>
              <div className="checkout__step">
                <div className="checkout__step-badge">1</div>
                <h2 className="checkout__step-title">Shipping Details</h2>
              </div>
              <form id="checkout-form" onSubmit={handlePlaceOrder} className="checkout__form">
                <div className="checkout__field checkout__field--wide">
                  <label className="checkout__label">Full Name</label>
                  <input type="text" value={user?.name} disabled className="checkout__input checkout__input--disabled" />
                </div>
                <div className="checkout__field checkout__field--wide">
                  <label className="checkout__label">Street Address</label>
                  <input 
                    type="text" 
                    required
                    className="checkout__input" 
                    placeholder="123 Reading Lane"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
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
                    onChange={(e) => setCity(e.target.value)}
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
                    onChange={(e) => setZip(e.target.value)}
                  />
                </div>
              </form>
            </section>

            {/* Payment (Simulation) */}
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
                    <p className="checkout__payment-text">Safe & Contactless payment when items arrive.</p>
                  </div>
                </div>
                <div className="checkout__payment-check">
                  <div className="checkout__payment-dot" />
                </div>
              </div>
            </section>
          </div>
        </div>

        {/* Sidebar Summary */}
        <aside className="checkout__summary">
          <div className="checkout__summary-card">
            <h2 className="checkout__summary-title">Your Order</h2>
            
            <div className="checkout__summary-items">
              {items.map(item => (
                <div key={item.bookId} className="checkout__summary-item">
                  <div className="checkout__summary-item-info">
                    <div className="checkout__summary-item-thumb">
                      <img src={item.book.coverImage} className="checkout__summary-item-img" />
                    </div>
                    <div>
                      <h4 className="checkout__summary-item-title">{item.book.title}</h4>
                      <p className="checkout__summary-item-qty">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <span className="checkout__summary-item-price">${(item.book.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            <div className="checkout__summary-totals">
              <div className="checkout__summary-line">
                <span>Items Subtotal</span>
                <span className="checkout__summary-value">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="checkout__summary-line">
                <span>Shipping Fee</span>
                <span className="checkout__summary-shipping">Free</span>
              </div>
              <div className="checkout__summary-total">
                <span>Total Pay</span>
                <span className="checkout__summary-total-value">${totalPrice.toFixed(2)}</span>
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
      </div>
    </div>
  );
};

export default Checkout;
