import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { useCart } from "../../context/cart/CartContext";
import { useAuth } from "../../context/auth/AuthContext";
import { ordersService } from "../../services/OrdersService";
import { cartService } from "../../services/CartService";
import { CheckoutSuccess } from "./CheckoutSuccess";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutSummary } from "./CheckoutSummary";
import { AlertBanner } from "../../components/ui/AlertBanner";

export const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [zip, setZip] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError("");
    try {
      const fullAddress = `${address}, ${city}, ${zip}`;
      await ordersService.placeOrder(user.id, items, totalPrice, fullAddress);
      setSuccess(true);
      clearCart();
      setTimeout(() => navigate("/orders"), 3000);
    } catch (err) {
      setError(err.message || "Unable to place order.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return <CheckoutSuccess email={user?.email} />;
  }

  return (
    <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-12">
      <AlertBanner message={error} className="mb-6" />
      <button
        onClick={() => navigate("/cart")}
        className="border-0 bg-transparent text-slate-400 font-bold text-sm inline-flex items-center gap-2 mb-10 cursor-pointer"
        type="button"
      >
        <ChevronLeft className="w-4 h-4" /> Back to Bag
      </button>

      <div className="flex flex-col gap-16 lg:flex-row">
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
