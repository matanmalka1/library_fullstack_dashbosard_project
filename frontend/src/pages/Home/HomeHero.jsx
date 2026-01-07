import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useAuth } from "../../context/auth/AuthContext";

export const HomeHero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <section className="relative min-h-[520px] h-[85vh] flex items-center bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2560&auto=format&fit=crop"
          alt="Library"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,_#0f172a_0%,_rgba(15,23,42,0.6)_55%,_transparent_100%)]" />
      </div>

      <div className="relative z-10 max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="max-w-[640px]">
          <span className="inline-block px-4 py-1.5 rounded-full bg-indigo-600/20 text-indigo-200 text-xs font-bold tracking-[0.08em] mb-6 animate-[home-fade-in_0.8s_ease]">
            PREMIUM BOOKSTORE
          </span>
          <h1 className="font-serif text-4xl md:text-6xl lg:text-[72px] font-bold text-white leading-[1.1] mb-6">
            Unlock Your{" "}
            <span className="text-indigo-400 italic">Next Chapter</span>
          </h1>
          <p className="text-lg text-indigo-100/90 leading-[1.7] mb-8 max-w-[520px]">
            Discover a universe of knowledge, adventure, and inspiration.
            Curated selections for every reader's journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link
              to="/books"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[18px] text-lg font-bold no-underline text-white bg-indigo-600 shadow-[0_18px_30px_rgba(15,23,42,0.2)] transition-all hover:bg-indigo-700 hover:-translate-y-0.5"
            >
              Explore Library <ArrowRight className="w-5 h-5" />
            </Link>
            {!isAuthenticated && (
              <Link
                to="/register"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-[18px] text-lg font-bold no-underline text-white bg-white/10 border border-white/20 backdrop-blur transition-all hover:bg-white/20"
              >
                Join our Club
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
