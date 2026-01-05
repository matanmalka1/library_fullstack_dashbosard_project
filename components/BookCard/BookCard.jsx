import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart, AlertCircle } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './BookCard.css';

const BookCard = ({ book, isWishlisted, onToggleWishlist }) => {
  const { addToCart } = useCart();

  const isLowStock = book.stockQuantity > 0 && book.stockQuantity <= 5;
  const isOutOfStock = book.stockQuantity === 0;

  return (
    <div className="book-card">
      <div className="book-card__media">
        <Link to={`/books/${book.id}`}>
          <img 
            src={book.coverImage} 
            alt={book.title}
            className="book-card__image"
          />
        </Link>
        <div className="book-card__wishlist">
          <button 
            onClick={() => onToggleWishlist?.(book.id)}
            className={`book-card__wishlist-btn ${isWishlisted ? 'is-active' : ''}`}
          >
            <Heart className="book-card__wishlist-icon" />
          </button>
        </div>
        {isOutOfStock && (
          <div className="book-card__overlay">
            <span className="book-card__overlay-text">Out of Stock</span>
          </div>
        )}
      </div>
      
      <div className="book-card__body">
        <div className="book-card__meta">
          <Star className="book-card__star" />
          <span className="book-card__rating">{book.rating > 0 ? book.rating.toFixed(1) : 'New'}</span>
          <span className="book-card__dot">•</span>
          <span className="book-card__category">
            {book.categories[0]}
          </span>
        </div>

        <Link to={`/books/${book.id}`} className="book-card__title-link">
          <h3 className="book-card__title">
            {book.title}
          </h3>
        </Link>
        <p className="book-card__author">{book.author}</p>
        
        {isLowStock && (
          <div className="book-card__low-stock">
            <AlertCircle className="book-card__low-stock-icon" />
            Only {book.stockQuantity} left!
          </div>
        )}

        <div className="book-card__footer">
          <span className="book-card__price">${book.price.toFixed(2)}</span>
          {!isOutOfStock && (
            <button 
              onClick={() => addToCart(book)}
              className="book-card__add"
              title="Add to Cart"
            >
              <ShoppingCart className="book-card__add-icon" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;
