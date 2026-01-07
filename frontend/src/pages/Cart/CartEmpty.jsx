
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

export const CartEmpty = () => (
  <div className="max-w-[1120px] mx-auto px-4 py-20 text-center">
    <div className="w-24 h-24 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-8">
      <ShoppingBag className="w-12 h-12 text-indigo-400" />
    </div>
    <h2 className="font-serif text-2xl md:text-[32px] font-bold text-slate-900 mb-4">
      Your bag is empty
    </h2>
    <p className="text-slate-500 max-w-[360px] mx-auto mb-10">
      Looks like you haven't added anything to your cart yet. Start exploring
      our collection!
    </p>
    <Link to="/books" className="inline-block bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold no-underline shadow-[0_16px_30px_rgba(79,70,229,0.2)]">
      Browse Catalog
    </Link>
  </div>
);
