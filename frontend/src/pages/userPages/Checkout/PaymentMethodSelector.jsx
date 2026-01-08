import { CreditCard } from "lucide-react";

export const PaymentMethodSelector = ({
  paymentMethod,
  onPaymentMethodChange,
}) => (
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
          <h4 className="m-0 font-bold text-slate-800">Pay on Delivery</h4>
          <p className="mt-1 text-slate-500 text-xs font-semibold">
            Safe & contactless payment when items arrive
          </p>
        </div>
      </div>
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
          paymentMethod === "cod" ? "border-indigo-600" : "border-slate-300"
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
          <h4 className="m-0 font-bold text-slate-800">Credit Card</h4>
          <p className="mt-1 text-slate-500 text-xs font-semibold">
            Visa, Mastercard, AmEx supported
          </p>
        </div>
      </div>
      <div
        className={`w-5 h-5 rounded-full border flex items-center justify-center ${
          paymentMethod === "card" ? "border-indigo-600" : "border-slate-300"
        }`}
      >
        {paymentMethod === "card" && (
          <div className="w-3 h-3 rounded-full bg-indigo-600" />
        )}
      </div>
    </button>
  </div>
);
