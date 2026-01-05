
import React from 'react';
import './Footer.css';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer__grid">
        <div>
          <h3 className="footer__brand">Books</h3>
          <p className="footer__text">
            Bringing the finest literature to your doorstep. Explore our curated selection of global bestsellers.
          </p>
        </div>
        <div>
          <h4 className="footer__heading">Quick Links</h4>
          <ul className="footer__list">
            <li><a href="#" className="footer__link">About Us</a></li>
            <li><a href="#" className="footer__link">Privacy Policy</a></li>
            <li><a href="#" className="footer__link">Terms of Service</a></li>
          </ul>
        </div>
        <div>
          <h4 className="footer__heading">Newsletter</h4>
          <p className="footer__text footer__text--tight">Get updates on new arrivals and special offers.</p>
          <div className="footer__form">
            <input 
              type="email" 
              placeholder="Your email" 
              className="footer__input"
            />
            <button className="footer__button">Join</button>
          </div>
        </div>
      </div>
      <p className="footer__copyright">&copy; {currentYear} Books. All rights reserved.</p>
    </footer>
  );
};
