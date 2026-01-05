
import React, { useEffect, useState } from 'react';
import { Heart, Search, ArrowRight } from 'lucide-react';
import { api } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import BookCard from '../../components/BookCard/BookCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchWishlist();
  }, [user]);

  const fetchWishlist = async () => {
    if (!user) {
      setWishlist([]);
      setLoading(false);
      return;
    }
    const allBooks = await api.getBooks();
    const ids = api.getWishlist(user.id);
    setWishlist(allBooks.filter(b => ids.includes(b.id)));
    setLoading(false);
  };

  const handleToggle = (id) => {
    if (user) {
      api.toggleWishlist(user.id, id);
      fetchWishlist();
    }
  };

  if (loading) return (
    <div className="max-w-7xl mx-auto px-4 py-20 flex justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600" />
    </div>
  );

  if (!user) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
          <Heart className="w-10 h-10 text-slate-200" />
        </div>
        <h2 className="text-3xl font-serif font-bold text-slate-800 mb-4">Save your favorites</h2>
        <p className="text-slate-500 mb-10 max-w-sm mx-auto">Please sign in to keep track of books you'd like to read later.</p>
        <Link to="/login" className="bg-indigo-600 text-white px-10 py-4 rounded-2xl font-bold shadow-xl shadow-indigo-100 inline-block">Sign In</Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex justify-between items-center mb-12">
        <div>
          <h1 className="text-4xl font-serif font-bold text-slate-900 mb-2">My Wishlist</h1>
          <p className="text-slate-500">Items you've saved for later.</p>
        </div>
        <Link to="/books" className="text-indigo-600 font-bold flex items-center gap-1 group">
          Keep Shopping <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </Link>
      </div>

      {wishlist.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {wishlist.map(book => (
            <BookCard 
              key={book.id} 
              book={book} 
              isWishlisted={true}
              onToggleWishlist={handleToggle}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-[40px] p-20 text-center border border-slate-100">
          <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-slate-200" />
          </div>
          <h3 className="text-xl font-bold text-slate-800 mb-2">Your wishlist is empty</h3>
          <p className="text-slate-500 max-w-xs mx-auto mb-8">Click the heart icon on any book to add it to your personal favorites collection.</p>
          <Link to="/books" className="bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-colors inline-block">Explore Catalog</Link>
        </div>
      )}
    </div>
  );
};

export default Wishlist;
