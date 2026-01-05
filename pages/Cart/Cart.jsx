
import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Info } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Cart.css';

const Cart = () => {
  const { items, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart cart--empty">
        <div className="cart__empty-icon">
          <ShoppingBag className="cart__empty-icon-svg" />
        </div>
        <h2 className="cart__empty-title">Your bag is empty</h2>
        <p className="cart__empty-text">Looks like you haven't added anything to your cart yet. Start exploring our collection!</p>
        <Link to="/books" className="cart__empty-action">
          Browse Catalog
        </Link>
      </div>
    );
  }

  return (
    <div className="cart">
      <h1 className="cart__title">Shopping Bag <span className="cart__title-count">({totalItems})</span></h1>
      
      <div className="cart__layout">
        {/* Items List */}
        <div className="cart__items">
          {items.map(item => (
            <div key={item.bookId} className="cart__item">
              <div className="cart__item-image">
                <img src={item.book.coverImage} alt={item.book.title} className="cart__item-image-img" />
              </div>
              
              <div className="cart__item-body">
                <div className="cart__item-header">
                  <div>
                    <h3 className="cart__item-title">{item.book.title}</h3>
                    <p className="cart__item-author">by {item.book.author}</p>
                    <div className="cart__item-category">
                      {item.book.categories[0]}
                    </div>
                  </div>
                  <button onClick={() => removeFromCart(item.bookId)} className="cart__item-remove">
                    <Trash2 className="cart__item-remove-icon" />
                  </button>
                </div>

                <div className="cart__item-footer">
                  <div className="cart__quantity">
                    <button 
                      onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                      className="cart__quantity-btn"
                    >
                      <Minus className="cart__quantity-icon" />
                    </button>
                    <span className="cart__quantity-count">{item.quantity}</span>
                    <button 
                      onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                      className="cart__quantity-btn"
                    >
                      <Plus className="cart__quantity-icon" />
                    </button>
                  </div>
                  <div className="cart__item-price">
                    <p className="cart__item-unit">Price per unit: ${item.book.price.toFixed(2)}</p>
                    <p className="cart__item-total">${(item.book.price * item.quantity).toFixed(2)}</p>
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
              Items will be held for <strong>60 minutes</strong>. Shipping costs and taxes will be calculated during the final step of checkout.
            </p>
          </div>
        </div>

        {/* Order Summary */}
        <aside className="cart__summary">
          <div className="cart__summary-card">
            <h2 className="cart__summary-title">Order Summary</h2>
            
            <div className="cart__summary-lines">
              <div className="cart__summary-line">
                <span>Subtotal ({totalItems} items)</span>
                <span className="cart__summary-value">${totalPrice.toFixed(2)}</span>
              </div>
              <div className="cart__summary-line">
                <span>Estimated Shipping</span>
                <span className="cart__summary-shipping">Calculated at Checkout</span>
              </div>
              <div className="cart__summary-total">
                <span>Total</span>
                <span className="cart__summary-total-value">${totalPrice.toFixed(2)}</span>
              </div>
            </div>

            <Link to="/checkout" className="cart__summary-action">
              Proceed to Checkout <ArrowRight className="cart__summary-action-icon" />
            </Link>

            <div className="cart__summary-icons">
              <div>
                <img src="https://www.svgrepo.com/show/508727/visa.svg" className="cart__summary-logo" alt="Visa" />
              </div>
              <div>
                <img src="https://www.svgrepo.com/show/508703/mastercard.svg" className="cart__summary-logo" alt="Mastercard" />
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default Cart;
