import React from 'react';
import { Trash2, Plus, Minus, Info } from 'lucide-react';
import './CartItems.css';

export const CartItems = ({ items, onRemove, onUpdateQuantity }) => (
  <div className="cart__items">
    {items.map((item) => (
      <div key={item.bookId} className="cart__item">
        <div className="cart__item-image">
          <img
            src={item.book.coverImage}
            alt={item.book.title}
            className="cart__item-image-img"
          />
        </div>

        <div className="cart__item-body">
          <div className="cart__item-header">
            <div>
              <h3 className="cart__item-title">{item.book.title}</h3>
              <p className="cart__item-author">by {item.book.author}</p>
              <div className="cart__item-category">{item.book.categories[0]}</div>
            </div>
            <button
              onClick={() => onRemove(item.bookId)}
              className="cart__item-remove"
            >
              <Trash2 className="cart__item-remove-icon" />
            </button>
          </div>

          <div className="cart__item-footer">
            <div className="cart__quantity">
              <button
                onClick={() => onUpdateQuantity(item.bookId, item.quantity - 1)}
                className="cart__quantity-btn"
              >
                <Minus className="cart__quantity-icon" />
              </button>
              <span className="cart__quantity-count">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item.bookId, item.quantity + 1)}
                className="cart__quantity-btn"
              >
                <Plus className="cart__quantity-icon" />
              </button>
            </div>
            <div className="cart__item-price">
              <p className="cart__item-unit">
                Price per unit: ${item.book.price.toFixed(2)}
              </p>
              <p className="cart__item-total">
                ${(item.book.price * item.quantity).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
    ))}

    <div className="cart__notice">
      <div className="cart__notice-icon">
        <Info className="cart__notice-icon-svg" />
      </div>
      <p className="cart__notice-text">
        Items will be held for <strong>60 minutes</strong>. Shipping costs and
        taxes will be calculated during the final step of checkout.
      </p>
    </div>
  </div>
);
