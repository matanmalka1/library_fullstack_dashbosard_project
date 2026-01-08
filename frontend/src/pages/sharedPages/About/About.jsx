import { BookOpen, Sparkles, Users } from "lucide-react";

export const About = () => (
  <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-16">
    <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] items-center">
      <div>
        <p className="text-[11px] uppercase tracking-[0.2em] font-bold text-slate-400 mb-4">
          About Us
        </p>
        <h1 className="font-serif text-4xl lg:text-5xl text-slate-900 mb-6">
          Built for readers who want more than a checkout.
        </h1>
        <p className="text-slate-600 text-lg leading-7 max-w-[560px]">
          We are a community-first library storefront that curates thoughtful
          collections, highlights emerging voices, and gives you tools to keep
          track of every chapter. From wishlists to reviews, we make reading
          feel connected.
        </p>
      </div>
      <div className="bg-slate-900 text-white rounded-[32px] p-8 shadow-[0_24px_50px_rgba(15,23,42,0.3)]">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
            <BookOpen className="w-6 h-6 text-indigo-200" />
          </div>
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-indigo-200 m-0">
              Our Mission
            </p>
            <p className="text-lg font-bold m-0">Better stories, shared.</p>
          </div>
        </div>
        <p className="text-slate-200 leading-7 m-0">
          Curate books with intention, serve readers with care, and build a
          platform that celebrates every voice.
        </p>
      </div>
    </div>

    <div className="grid gap-6 mt-16 md:grid-cols-3">
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <Sparkles className="w-6 h-6 text-indigo-500 mb-4" />
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Curated shelves
        </h3>
        <p className="text-slate-500 m-0">
          Handpicked picks from librarians, authors, and the community.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <Users className="w-6 h-6 text-indigo-500 mb-4" />
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Reader community
        </h3>
        <p className="text-slate-500 m-0">
          Follow reviewers, save lists, and discover your next favorite.
        </p>
      </div>
      <div className="bg-white border border-slate-200 rounded-[24px] p-6 shadow-[0_8px_20px_rgba(15,23,42,0.05)]">
        <BookOpen className="w-6 h-6 text-indigo-500 mb-4" />
        <h3 className="text-lg font-bold text-slate-900 mb-2">
          Thoughtful tools
        </h3>
        <p className="text-slate-500 m-0">
          Keep your reading life organized with profiles, reviews, and
          wishlists.
        </p>
      </div>
    </div>
  </div>
);
