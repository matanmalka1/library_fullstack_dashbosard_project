
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../../services/api';
import BookInfo from '../../components/details/BookInfo';
import ReviewSection from '../../components/details/ReviewSection';
import './BookDetails.css';

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
    <div className="book-details__loading">
      <div className="book-details__spinner" />
    </div>
  );

  if (!book) return (
    <div className="book-details__empty">
      <h2 className="book-details__empty-title">Book Not Found</h2>
      <Link to="/books" className="book-details__empty-link">Return to Library</Link>
    </div>
  );

  return (
    <div className="book-details">
      <BookInfo book={book} />
      <div className="book-details__reviews">
        <ReviewSection book={book} onUpdate={fetchBook} />
      </div>
    </div>
  );
};

export default DetailsPage;
