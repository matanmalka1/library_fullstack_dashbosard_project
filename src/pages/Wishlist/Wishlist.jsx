import React, { useEffect, useState } from "react";
import { Heart, Search, ArrowRight } from "lucide-react";
import { api } from "../../services/api";
import { useAuth } from "../../context/auth/AuthContext";
import { BookCard } from "../../components/book/BookCard/BookCard/BookCard";
import { Link } from "react-router-dom";
import "./Wishlist.css";

export const Wishlist = () => {
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
    setWishlist(allBooks.filter((b) => ids.includes(b.id)));
    setLoading(false);
  };

  const handleToggle = (id) => {
    if (user) {
      api.toggleWishlist(user.id, id);
      fetchWishlist();
    }
  };

  if (loading)
    return (
      <div className="wishlist__loading">
        <div className="wishlist__spinner" />
      </div>
    );

  if (!user) {
    return (
      <div className="wishlist__empty">
        <div className="wishlist__empty-icon">
          <Heart className="wishlist__empty-icon-svg" />
        </div>
        <h2 className="wishlist__empty-title">Save your favorites</h2>
        <p className="wishlist__empty-text">
          Please sign in to keep track of books you'd like to read later.
        </p>
        <Link to="/login" className="wishlist__empty-action">
          Sign In
        </Link>
      </div>
    );
  }

  return (
    <div className="wishlist">
      <div className="wishlist__header">
        <div>
          <h1 className="wishlist__title">My Wishlist</h1>
          <p className="wishlist__subtitle">Items you've saved for later.</p>
        </div>
        <Link to="/books" className="wishlist__link">
          Keep Shopping <ArrowRight className="wishlist__link-icon" />
        </Link>
      </div>

      {wishlist.length > 0 ? (
        <div className="wishlist__grid">
          {wishlist.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              isWishlisted={true}
              onToggleWishlist={handleToggle}
            />
          ))}
        </div>
      ) : (
        <div className="wishlist__empty-card">
          <div className="wishlist__empty-card-icon">
            <Search className="wishlist__empty-card-icon-svg" />
          </div>
          <h3 className="wishlist__empty-card-title">Your wishlist is empty</h3>
          <p className="wishlist__empty-card-text">
            Click the heart icon on any book to add it to your personal
            favorites collection.
          </p>
          <Link to="/books" className="wishlist__empty-card-action">
            Explore Catalog
          </Link>
        </div>
      )}
    </div>
  );
};
