
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, BookOpen, Star, ShieldCheck, Zap } from 'lucide-react';
import { api } from '../../services/api';
import BookCard from '../../components/BookCard/BookCard';

const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    api.getBooks().then(books => {
      setFeaturedBooks(books.slice(0, 4));
    });
  }, []);

  return (
    <div className="space-y-20 pb-20">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2560&auto=format&fit=crop" 
            alt="Library" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/60 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="inline-block px-4 py-1 rounded-full bg-indigo-500/20 text-indigo-400 text-sm font-bold tracking-wider mb-6 animate-fade-in">
              PREMIUM BOOKSTORE
            </span>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight mb-6 tracking-tight">
              Unlock Your <span className="text-indigo-400 italic">Next Chapter</span>
            </h1>
            <p className="text-slate-300 text-xl mb-10 leading-relaxed max-w-lg">
              Discover a universe of knowledge, adventure, and inspiration. Curated selections for every reader's journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/books" className="bg-indigo-600 text-white px-8 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-900/20 flex items-center justify-center gap-2">
                Explore Library <ArrowRight className="w-5 h-5" />
              </Link>
              <Link to="/register" className="bg-white/10 backdrop-blur-md text-white border border-white/20 px-8 py-4 rounded-2xl font-bold text-lg hover:bg-white/20 transition-all flex items-center justify-center">
                Join our Club
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Zap className="text-indigo-500" />, title: 'Fast Delivery', desc: 'Get your favorites delivered in as little as 24 hours.' },
            { icon: <ShieldCheck className="text-indigo-500" />, title: 'Secure Payment', desc: 'Your transactions are always protected and private.' },
            { icon: <Star className="text-indigo-500" />, title: 'Premium Curation', desc: 'Only the highest quality editions and translations.' }
          ].map((feature, i) => (
            <div key={i} className="bg-white p-8 rounded-3xl border border-slate-100 hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-2">{feature.title}</h3>
              <p className="text-slate-500 leading-relaxed">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-12">
          <div>
            <h2 className="text-3xl font-bold font-serif text-slate-900 mb-2">Featured Collection</h2>
            <p className="text-slate-500">Handpicked by our expert librarians this month.</p>
          </div>
          <Link to="/books" className="text-indigo-600 font-bold hover:text-indigo-700 flex items-center gap-1 group">
            View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-indigo-600 rounded-[40px] p-12 md:p-20 relative overflow-hidden text-center text-white">
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">Ready to expand your horizon?</h2>
            <p className="text-indigo-100 text-lg mb-10">Sign up today and get 20% off your first purchase. Join thousands of book lovers already using Books.</p>
            <Link to="/register" className="bg-white text-indigo-600 px-10 py-4 rounded-2xl font-bold text-lg hover:bg-indigo-50 transition-all inline-block shadow-xl">
              Create Free Account
            </Link>
          </div>
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-indigo-400 rounded-full blur-[120px] translate-y-1/2 -translate-x-1/2" />
        </div>
      </section>
    </div>
  );
};

export default Home;
