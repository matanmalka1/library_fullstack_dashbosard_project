
import React from 'react';
import { Star, ShoppingCart, Heart, Truck, Shield, RotateCcw } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './BookInfo.css';

const BookInfo = ({ book }) => {
  const { addToCart } = useCart();
  
  const Feature = ({ icon: Icon, label, value }) => (
    <div className="book-info__feature">
      <Icon className="book-info__feature-icon" />
      <span className="book-info__feature-label">{label}</span>
      <span className="book-info__feature-value">{value}</span>
    </div>
  );

  return (
    <div className="book-info">
      <div className="book-info__media">
        <div className="book-info__image-wrap">
          <img src={book.coverImage} alt={book.title} className="book-info__image" />
        </div>
        <div className="book-info__features">
          <Feature icon={Truck} label="Delivery" value="Express" />
          <Feature icon={RotateCcw} label="Returns" value="30 Days" />
          <Feature icon={Shield} label="Safe" value="Verified" />
        </div>
      </div>
      <div className="book-info__details">
        <div className="book-info__header">
          <div className="book-info__rating">
            <Star className="book-info__star" />
            <span className="book-info__rating-value">{book.rating > 0 ? book.rating.toFixed(1) : 'New'}</span>
            <span className="book-info__rating-dot">•</span>
            <span className="book-info__rating-text">Verified Selection</span>
          </div>
          <h1 className="book-info__title">{book.title}</h1>
          <p className="book-info__author">by <span className="book-info__author-name">{book.author}</span></p>
        </div>
        <p className="book-info__price">${book.price.toFixed(2)}</p>
        <p className="book-info__description">"{book.description}"</p>
        <div className="book-info__actions">
          <button 
            onClick={() => addToCart(book)}
            className="book-info__add"
          >
            <ShoppingCart className="book-info__add-icon" /> Add to Shopping Bag
          </button>
          <button className="book-info__favorite"><Heart className="book-info__favorite-icon" /></button>
        </div>
      </div>
    </div>
  );
};

export default BookInfo;
