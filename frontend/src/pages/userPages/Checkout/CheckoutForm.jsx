import { PaymentMethodSelector } from "./PaymentMethodSelector";
import { CardDetailsForm } from "./CardDetailsForm";
import { ShippingDetailsForm } from "./ShippingDetailsForm";

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
  return (
    <div className="flex-1">
      <h1 className="font-serif text-[32px] text-slate-900 mb-8">
        Secure Checkout
      </h1>

      <div className="grid gap-10">
        <ShippingDetailsForm
          userName={userName}
          address={address}
          city={city}
          zip={zip}
          onAddressChange={onAddressChange}
          onCityChange={onCityChange}
          onZipChange={onZipChange}
          hasSavedAddress={hasSavedAddress}
          onApplySavedAddress={onApplySavedAddress}
          onSubmit={onSubmit}
        />

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
            <PaymentMethodSelector
              paymentMethod={paymentMethod}
              onPaymentMethodChange={onPaymentMethodChange}
            />
            {paymentMethod === "card" && (
              <CardDetailsForm
                cardName={cardName}
                cardNumber={cardNumber}
                cardExpiry={cardExpiry}
                cardCvc={cardCvc}
                onCardNameChange={onCardNameChange}
                onCardNumberChange={onCardNumberChange}
                onCardExpiryChange={onCardExpiryChange}
                onCardCvcChange={onCardCvcChange}
              />
            )}
          </div>
        </section>
      </div>
    </div>
  );
};
