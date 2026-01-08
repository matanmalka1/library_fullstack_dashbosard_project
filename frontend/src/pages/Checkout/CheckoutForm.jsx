import { useEffect, useState } from "react";
import { CreditCard } from "lucide-react";
import { cardPaymentSchema } from "../../validators/checkout/card-payment-schema";
import { checkoutShippingSchema } from "../../validators/checkout/checkout-shipping-schema";

export const CheckoutForm = ({
  userName,
  address,
  city,
  zip,
  onAddressChange,
  onCityChange,
  onZipChange,
  paymentMethod,
  onPaymentMethodChange,
  cardName,
  cardNumber,
  cardExpiry,
  cardCvc,
  onCardNameChange,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvcChange,
  hasSavedAddress,
  onApplySavedAddress,
  onSubmit,
}) => {
  const [nameTouched, setNameTouched] = useState(false);
  const [numberTouched, setNumberTouched] = useState(false);
  const [expiryTouched, setExpiryTouched] = useState(false);
  const [cvcTouched, setCvcTouched] = useState(false);
  const [addressTouched, setAddressTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [zipTouched, setZipTouched] = useState(false);

  const digitsOnly = (val) => val.replace(/\D/g, "");
  const formatCardNumber = (val) => {
    const digits = digitsOnly(val).slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };
  const handleCardNumberInput = (val) => {
    const formatted = formatCardNumber(val);
    onCardNumberChange(formatted);
    setDisplayCardNumber(formatted);
  };
  const formatExpiry = (val) => {
    const digits = digitsOnly(val).slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };
  const handleExpiryInput = (val) => {
    onCardExpiryChange(formatExpiry(val));
  };
  const handleCvcInput = (val) => {
    const digits = digitsOnly(val).slice(0, 4);
    onCardCvcChange(digits);
  };

  // Local display state for masking on blur
  const [displayCardNumber, setDisplayCardNumber] = useState(cardNumber || "");
  useEffect(() => {
    setDisplayCardNumber(cardNumber || "");
  }, [cardNumber]);

  const maskCardNumberDisplay = (val) => {
    const digits = digitsOnly(val);
    if (!digits) return "";
    const last4 = digits.slice(-4);
    return `•••• •••• •••• ${last4}`;
  };

  const cardValidation =
    paymentMethod === "card"
      ? cardPaymentSchema.safeParse({
          cardName,
          cardNumber,
          cardExpiry,
          cardCvc,
        })
      : { success: true };
  const cardErrors = cardValidation.success
    ? {}
    : cardValidation.error.flatten().fieldErrors;
  const getCardError = (field) => cardErrors[field]?.[0];

  const shippingValidation = checkoutShippingSchema.safeParse({
    address,
    city,
    zip,
  });
  const shippingErrors = shippingValidation.success
    ? {}
    : shippingValidation.error.flatten().fieldErrors;
  const getShippingError = (field) => shippingErrors[field]?.[0];

  return (
    <div className="flex-1">
      <h1 className="font-serif text-[32px] text-slate-900 mb-8">
        Secure Checkout
      </h1>

      <div className="grid gap-10">
        <section>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
                1
              </div>
              <h2 className="text-xl font-bold text-slate-800 m-0">
                Shipping Details
              </h2>
            </div>
            {hasSavedAddress && (
              <button
                type="button"
                onClick={onApplySavedAddress}
                className="text-sm font-semibold text-indigo-700 hover:text-indigo-800 bg-indigo-50 border border-indigo-200 px-3 py-1.5 rounded-lg cursor-pointer"
              >
                Use saved address
              </button>
            )}
          </div>
          <form
            id="checkout-form"
            onSubmit={onSubmit}
            className="grid grid-cols-1 gap-5 bg-white border border-slate-200 rounded-[24px] p-8 shadow-[0_8px_20px_rgba(15,23,42,0.05)] md:grid-cols-2"
          >
            <div className="grid gap-2 md:col-span-2">
              <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
                Full Name
              </label>
              <input
                type="text"
                value={userName}
                disabled
                className="px-4 py-3 rounded-[14px] border border-slate-200 bg-slate-50 text-sm text-slate-400"
              />
            </div>
            <div className="grid gap-2 md:col-span-2">
              <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
                Street Address
              </label>
              <input
                type="text"
                required
                className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
                placeholder="123 Reading Lane"
                value={address}
                onChange={(e) => onAddressChange(e.target.value)}
                onBlur={() => setAddressTouched(true)}
              />
              {addressTouched && getShippingError("address") && (
                <p className="text-xs text-red-500 mt-1">
                  {getShippingError("address")}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
                City
              </label>
              <input
                type="text"
                required
                className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
                placeholder="New York"
                value={city}
                onChange={(e) => onCityChange(e.target.value)}
                onBlur={() => setCityTouched(true)}
              />
              {cityTouched && getShippingError("city") && (
                <p className="text-xs text-red-500 mt-1">
                  {getShippingError("city")}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
                Zip Code
              </label>
              <input
                type="text"
                required
                className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
                placeholder="10001"
                value={zip}
                onChange={(e) => onZipChange(e.target.value)}
                onBlur={() => setZipTouched(true)}
              />
              {zipTouched && getShippingError("zip") && (
                <p className="text-xs text-red-500 mt-1">
                  {getShippingError("zip")}
                </p>
              )}
            </div>
          </form>
        </section>

        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-full bg-indigo-600 text-white font-bold text-sm flex items-center justify-center">
              2
            </div>
            <h2 className="text-xl font-bold text-slate-800 m-0">
              Payment Method
            </h2>
          </div>

          <div className="grid gap-4">
            <div className="grid md:grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => onPaymentMethodChange("cod")}
                className={`text-left bg-white border rounded-[16px] p-4 flex items-center justify-between gap-4 cursor-pointer ${
                  paymentMethod === "cod"
                    ? "border-indigo-300 ring-2 ring-indigo-200"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-slate-600" />
                  <div>
                    <h4 className="m-0 font-bold text-slate-800">
                      Pay on Delivery
                    </h4>
                    <p className="mt-1 text-slate-500 text-xs font-semibold">
                      Safe & contactless payment when items arrive
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    paymentMethod === "cod"
                      ? "border-indigo-600"
                      : "border-slate-300"
                  }`}
                >
                  {paymentMethod === "cod" && (
                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                  )}
                </div>
              </button>

              <button
                type="button"
                onClick={() => onPaymentMethodChange("card")}
                className={`text-left bg-white border rounded-[16px] p-4 flex items-center justify-between gap-4 cursor-pointer ${
                  paymentMethod === "card"
                    ? "border-indigo-300 ring-2 ring-indigo-200"
                    : "border-slate-200"
                }`}
              >
                <div className="flex items-center gap-3">
                  <CreditCard className="w-5 h-5 text-slate-600" />
                  <div>
                    <h4 className="m-0 font-bold text-slate-800">
                      Credit Card
                    </h4>
                    <p className="mt-1 text-slate-500 text-xs font-semibold">
                      Visa, Mastercard, AmEx supported
                    </p>
                  </div>
                </div>
                <div
                  className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    paymentMethod === "card"
                      ? "border-indigo-600"
                      : "border-slate-300"
                  }`}
                >
                  {paymentMethod === "card" && (
                    <div className="w-3 h-3 rounded-full bg-indigo-600" />
                  )}
                </div>
              </button>
            </div>

            {paymentMethod === "card" && (
              <div className="bg-white border border-slate-200 rounded-[16px] p-6 grid gap-4">
                <div className="grid gap-2">
                  <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
                    Name on Card
                  </label>
                  <input
                    type="text"
                    className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
                    placeholder="John Doe"
                    value={cardName}
                    onChange={(e) => onCardNameChange(e.target.value)}
                    onBlur={() => setNameTouched(true)}
                    required={paymentMethod === "card"}
                  />
                  {paymentMethod === "card" &&
                    nameTouched &&
                    getCardError("cardName") && (
                    <p className="text-xs text-red-500 mt-1">
                      {getCardError("cardName")}
                    </p>
                  )}
                </div>
                <div className="grid gap-2">
                  <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
                    Card Number
                  </label>
                  <input
                    type="text"
                    inputMode="numeric"
                    className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
                    placeholder="4242 4242 4242 4242"
                    value={displayCardNumber}
                    onChange={(e) => handleCardNumberInput(e.target.value)}
                    onBlur={() => setNumberTouched(true)}
                    onFocus={() =>
                      setDisplayCardNumber(formatCardNumber(cardNumber))
                    }
                    onBlurCapture={() =>
                      setDisplayCardNumber(maskCardNumberDisplay(cardNumber))
                    }
                    maxLength={19}
                    required={paymentMethod === "card"}
                  />
                  {paymentMethod === "card" &&
                    numberTouched &&
                    getCardError("cardNumber") && (
                      <p className="text-xs text-red-500 mt-1">
                        {getCardError("cardNumber")}
                      </p>
                    )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
                      Expiration (MM/YY)
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
                      placeholder="12/29"
                      value={cardExpiry}
                      onChange={(e) => handleExpiryInput(e.target.value)}
                      onBlur={() => setExpiryTouched(true)}
                      maxLength={5}
                      required={paymentMethod === "card"}
                    />
                    {paymentMethod === "card" &&
                      expiryTouched &&
                      getCardError("cardExpiry") && (
                        <p className="text-xs text-red-500 mt-1">
                          {getCardError("cardExpiry")}
                        </p>
                      )}
                  </div>
                  <div className="grid gap-2">
                    <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
                      CVC
                    </label>
                    <input
                      type="text"
                      inputMode="numeric"
                      className="px-4 py-3 rounded-[14px] border border-slate-200 text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200"
                      placeholder="123"
                      value={cardCvc}
                      onChange={(e) => handleCvcInput(e.target.value)}
                      onBlur={() => setCvcTouched(true)}
                      maxLength={4}
                      required={paymentMethod === "card"}
                    />
                    {paymentMethod === "card" &&
                      cvcTouched &&
                      getCardError("cardCvc") && (
                        <p className="text-xs text-red-500 mt-1">
                          {getCardError("cardCvc")}
                        </p>
                      )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
