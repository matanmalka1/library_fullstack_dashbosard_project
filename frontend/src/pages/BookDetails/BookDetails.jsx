
import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { api } from '../../services/api';
import { BookInfo } from '../../components/book/BookInfo/BookInfo';
import { ReviewSection } from '../../components/book/ReviewSection/ReviewSection';
import { useAuth } from '../../context/auth/AuthContext';

export const DetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const fetchBook = () => {
    if (!id) return;
    api.getBookById(id).then(b => {
      if (b) setBook(b);
      setLoading(false);
    });
  };

  const fetchWishlist = () => {
    if (!user || !id) {
      setIsWishlisted(false);
      return;
    }
    const ids = api.getWishlist(user.id);
    setIsWishlisted(ids.includes(id));
  };

  useEffect(() => { fetchBook(); }, [id]);
  useEffect(() => { fetchWishlist(); }, [user, id]);

  const handleToggleWishlist = () => {
    if (!user) {
      if (confirm("Sign in to save items to your wishlist?")) {
        navigate("/login");
      }
      return;
    }
    const next = api.toggleWishlist(user.id, id);
    setIsWishlisted(next.includes(id));
  };

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="w-12 h-12 rounded-full border-4 border-indigo-600 border-t-transparent animate-spin" />
    </div>
  );

  if (!book) return (
    <div className="max-w-[1120px] mx-auto px-4 py-32 text-center">
      <h2 className="font-serif text-2xl md:text-[32px] font-bold mb-4">Book Not Found</h2>
      <Link to="/books" className="text-indigo-600 font-bold no-underline hover:underline">Return to Library</Link>
    </div>
  );

  return (
    <div className="max-w-[1120px] mx-auto px-4 lg:px-8 py-16 animate-[book-details-fade_0.4s_ease]">
      <BookInfo
        book={book}
        isWishlisted={isWishlisted}
        onToggleWishlist={handleToggleWishlist}
      />
      <div className="mt-24">
        <ReviewSection book={book} onUpdate={fetchBook} />
      </div>
    </div>
  );
};
