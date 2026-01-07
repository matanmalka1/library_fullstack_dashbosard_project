
import { Link } from 'react-router-dom';

export const HomeCTA = () => (
  <section className="w-full max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8">
    <div className="relative bg-indigo-600 rounded-[32px] px-8 py-12 md:px-16 md:py-20 overflow-hidden text-center text-white">
      <div className="relative z-10 max-w-[640px] mx-auto">
        <h2 className="font-serif text-2xl md:text-[44px] font-bold mb-6">Ready to expand your horizon?</h2>
        <p className="text-indigo-100 text-lg mb-8">
          Sign up today and get 20% off your first purchase. Join thousands of
          book lovers already using Books.
        </p>
        <Link
          to="/register"
          className="inline-block bg-white text-indigo-600 px-10 py-4 rounded-[18px] font-bold no-underline shadow-[0_18px_30px_rgba(15,23,42,0.2)] transition-all hover:bg-indigo-50 hover:-translate-y-0.5"
        >
          Create Free Account
        </Link>
      </div>
      <div className="absolute w-[260px] h-[260px] rounded-full blur-[120px] opacity-90 top-0 right-0 bg-indigo-500 translate-x-1/2 -translate-y-1/2" />
      <div className="absolute w-[260px] h-[260px] rounded-full blur-[120px] opacity-90 bottom-0 left-0 bg-indigo-400 -translate-x-1/2 translate-y-1/2" />
    </div>
  </section>
);
