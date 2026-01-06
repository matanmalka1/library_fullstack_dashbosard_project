import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';
import './OrderCardItems.css';

export const OrderCardItems = ({ items }) => (
  <div className="orders__items">
    {items.map((item) => (
      <div key={item.bookId} className="orders__item">
        <div className="orders__item-thumb">
          <img src={item.book.coverImage} className="orders__item-img" />
        </div>
        <div className="orders__item-body">
          <h4 className="orders__item-title">{item.book.title}</h4>
          <p className="orders__item-author">{item.book.author}</p>
          <div className="orders__item-meta">
            <span className="orders__item-qty">Qty: {item.quantity}</span>
            <span className="orders__item-price">
              ${(item.book.price * item.quantity).toFixed(2)}
            </span>
          </div>
        </div>
        <Link to={`/books/${item.bookId}`} className="orders__item-link">
          <ChevronRight className="orders__item-link-icon" />
        </Link>
      </div>
    ))}
  </div>
);
