
import { Link } from "react-router-dom";
import { ShoppingBag } from "lucide-react";
import { EmptyState } from "../../../components/ui/EmptyState";

export const CartEmpty = () => (
  <div className="max-w-[1120px] mx-auto px-4 py-20 text-center">
    <EmptyState
      icon={ShoppingBag}
      title="Your bag is empty"
      description="Looks like you haven't added anything to your cart yet. Start exploring our collection!"
      iconWrapperClassName="w-24 h-24 bg-indigo-50 rounded-full"
      iconClassName="w-12 h-12 text-indigo-400"
      action={
        <Link
          to="/books"
          className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold no-underline shadow-[0_16px_30px_rgba(79,70,229,0.2)]"
        >
          Browse Catalog
        </Link>
      }
    />
  </div>
);
