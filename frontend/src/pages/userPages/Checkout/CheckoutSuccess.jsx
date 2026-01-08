
import { CheckCircle2 } from "lucide-react";
import { EmptyState } from "../../../components/ui/EmptyState";

export const CheckoutSuccess = ({ email }) => (
  <div className="max-w-[1120px] mx-auto px-4 py-32 text-center animate-[checkout-pop_0.3s_ease]">
    <EmptyState
      icon={CheckCircle2}
      title="Order Confirmed!"
      titleAs="h1"
      description={
        <>
          Thank you for your purchase. We've sent a confirmation email to{" "}
          <strong>{email}</strong>.
        </>
      }
      iconWrapperClassName="w-24 h-24 bg-emerald-50 rounded-full"
      iconClassName="w-12 h-12 text-emerald-500"
      titleClassName="text-4xl mb-4"
      descriptionClassName="text-lg mb-8 max-w-none"
      footer={
        <p className="text-slate-400 m-0">
          Redirecting to your order history...
        </p>
      }
    />
  </div>
);
