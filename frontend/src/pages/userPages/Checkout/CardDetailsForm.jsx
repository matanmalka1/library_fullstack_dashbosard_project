import { useEffect, useState } from "react";
import { cardPaymentSchema } from "../../../validators/checkout/card-payment-schema";
import { CheckoutField } from "./CheckoutField";

export const CardDetailsForm = ({
  cardName,
  cardNumber,
  cardExpiry,
  cardCvc,
  onCardNameChange,
  onCardNumberChange,
  onCardExpiryChange,
  onCardCvcChange,
}) => {
  const [nameTouched, setNameTouched] = useState(false);
  const [numberTouched, setNumberTouched] = useState(false);
  const [expiryTouched, setExpiryTouched] = useState(false);
  const [cvcTouched, setCvcTouched] = useState(false);

  const digitsOnly = (val) => val.replace(/\D/g, "");
  const formatCardNumber = (val) => {
    const digits = digitsOnly(val).slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1 ").trim();
  };
  const formatExpiry = (val) => {
    const digits = digitsOnly(val).slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  };
  const maskCardNumberDisplay = (val) => {
    const digits = digitsOnly(val);
    if (!digits) return "";
    const last4 = digits.slice(-4);
    return `•••• •••• •••• ${last4}`;
  };

  const [displayCardNumber, setDisplayCardNumber] = useState(cardNumber || "");
  useEffect(() => {
    setDisplayCardNumber(cardNumber || "");
  }, [cardNumber]);

  const handleCardNumberInput = (val) => {
    const formatted = formatCardNumber(val);
    onCardNumberChange(formatted);
    setDisplayCardNumber(formatted);
  };
  const handleExpiryInput = (val) => {
    onCardExpiryChange(formatExpiry(val));
  };
  const handleCvcInput = (val) => {
    const digits = digitsOnly(val).slice(0, 4);
    onCardCvcChange(digits);
  };

  const validation = cardPaymentSchema.safeParse({
    cardName,
    cardNumber,
    cardExpiry,
    cardCvc,
  });
  const errors = validation.success
    ? {}
    : validation.error.flatten().fieldErrors;
  const getError = (field) => errors[field]?.[0];

  return (
    <div className="bg-white border border-slate-200 rounded-[16px] p-6 grid gap-4">
      <CheckoutField
        label="Name on Card"
        type="text"
        placeholder="John Doe"
        value={cardName}
        onChange={(e) => onCardNameChange(e.target.value)}
        onBlur={() => setNameTouched(true)}
        required
        error={nameTouched ? getError("cardName") : null}
      />
      <CheckoutField
        label="Card Number"
        type="text"
        inputMode="numeric"
        placeholder="4242 4242 4242 4242"
        value={displayCardNumber}
        onChange={(e) => handleCardNumberInput(e.target.value)}
        onBlur={() => setNumberTouched(true)}
        onFocus={() => setDisplayCardNumber(formatCardNumber(cardNumber))}
        onBlurCapture={() =>
          setDisplayCardNumber(maskCardNumberDisplay(cardNumber))
        }
        maxLength={19}
        required
        error={numberTouched ? getError("cardNumber") : null}
      />
      <div className="grid grid-cols-2 gap-4">
        <CheckoutField
          label="Expiration (MM/YY)"
          type="text"
          inputMode="numeric"
          placeholder="12/29"
          value={cardExpiry}
          onChange={(e) => handleExpiryInput(e.target.value)}
          onBlur={() => setExpiryTouched(true)}
          maxLength={5}
          required
          error={expiryTouched ? getError("cardExpiry") : null}
        />
        <CheckoutField
          label="CVC"
          type="text"
          inputMode="numeric"
          placeholder="123"
          value={cardCvc}
          onChange={(e) => handleCvcInput(e.target.value)}
          onBlur={() => setCvcTouched(true)}
          maxLength={4}
          required
          error={cvcTouched ? getError("cardCvc") : null}
        />
      </div>
    </div>
  );
};
