import { useState } from "react";
import { checkoutShippingSchema } from "../../../validators/checkout/checkout-shipping-schema";
import { CheckoutField } from "./CheckoutField";

export const ShippingDetailsForm = ({
  userName,
  address,
  city,
  zip,
  onAddressChange,
  onCityChange,
  onZipChange,
  hasSavedAddress,
  onApplySavedAddress,
  onSubmit,
}) => {
  const [addressTouched, setAddressTouched] = useState(false);
  const [cityTouched, setCityTouched] = useState(false);
  const [zipTouched, setZipTouched] = useState(false);

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
          <CheckoutField
            label="Street Address"
            type="text"
            required
            placeholder="123 Reading Lane"
            value={address}
            onChange={(e) => onAddressChange(e.target.value)}
            onBlur={() => setAddressTouched(true)}
            error={addressTouched ? getShippingError("address") : null}
          />
        </div>
        <CheckoutField
          label="City"
          type="text"
          required
          placeholder="New York"
          value={city}
          onChange={(e) => onCityChange(e.target.value)}
          onBlur={() => setCityTouched(true)}
          error={cityTouched ? getShippingError("city") : null}
        />
        <CheckoutField
          label="Zip Code"
          type="text"
          required
          placeholder="10001"
          value={zip}
          onChange={(e) => onZipChange(e.target.value)}
          onBlur={() => setZipTouched(true)}
          error={zipTouched ? getShippingError("zip") : null}
        />
      </form>
    </section>
  );
};
