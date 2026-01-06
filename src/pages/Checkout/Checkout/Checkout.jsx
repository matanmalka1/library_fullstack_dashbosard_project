
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useCart } from '../../../context/cart/CartContext';
import { useAuth } from '../../../context/auth/AuthContext';
import { api } from '../../../services/api';
import { CheckoutSuccess } from '../CheckoutSuccess/CheckoutSuccess';
import { CheckoutForm } from '../CheckoutForm/CheckoutForm';
import { CheckoutSummary } from '../CheckoutSummary/CheckoutSummary';
import './Checkout.css';

export const Checkout = () => {
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
    return <CheckoutSuccess email={user?.email} />;
  }

  return (
    <div className="checkout">
      <button onClick={() => navigate('/cart')} className="checkout__back">
        <ChevronLeft className="checkout__back-icon" /> Back to Bag
      </button>

      <div className="checkout__layout">
        <CheckoutForm
          userName={user?.name}
          address={address}
          city={city}
          zip={zip}
          onAddressChange={setAddress}
          onCityChange={setCity}
          onZipChange={setZip}
          onSubmit={handlePlaceOrder}
        />
        <CheckoutSummary
          items={items}
          totalPrice={totalPrice}
          loading={loading}
        />
      </div>
    </div>
  );
};
