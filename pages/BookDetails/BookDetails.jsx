
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import BookInfo from '../../components/details/BookInfo';
import ReviewSection from '../../components/details/ReviewSection';

const DetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchBook = () => {
    if (id) api.getBookById(id).then(b => {
      if (b) setBook(b);
      setLoading(false);
    });
  };

  useEffect(() => { fetchBook(); }, [id]);

  if (loading) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-spin h-12 w-12 border-4 border-indigo-600 border-t-transparent rounded-full" />
    </div>
  );

  if (!book) return (
    <div className="max-w-7xl mx-auto px-4 py-32 text-center">
      <h2 className="text-3xl font-serif font-bold mb-4">Book Not Found</h2>
      <Link to="/books" className="text-indigo-600 font-bold hover:underline">Return to Library</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 py-16 animate-in fade-in duration-500">
      <BookInfo book={book} />
      <div className="mt-24">
        <ReviewSection book={book} onUpdate={fetchBook} />
      </div>
    </div>
  );
};

export default DetailsPage;
