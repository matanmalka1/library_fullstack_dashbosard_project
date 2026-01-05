
import React from 'react';
import './MainFooter.css';

export const MainFooter = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="main-footer">
      <div className="main-footer__grid">
        <div className="main-footer__intro">
          <h3 className="main-footer__brand">Books</h3>
          <p className="main-footer__text">
            The world's premier digital sanctuary for literary explorers. We curate more than just books; we curate experiences.
          </p>
        </div>
        <div>
          <h4 className="main-footer__heading">Navigation</h4>
          <ul className="main-footer__list">
            <li><a href="#" className="main-footer__link">Our Story</a></li>
            <li><a href="#" className="main-footer__link">Latest Collections</a></li>
            <li><a href="#" className="main-footer__link">Membership</a></li>
          </ul>
        </div>
        <div>
          <h4 className="main-footer__heading">Connect</h4>
          <div className="main-footer__form">
            <input 
              type="email" 
              placeholder="Your email" 
              className="main-footer__input"
            />
            <button className="main-footer__button">Join</button>
          </div>
        </div>
      </div>
      <div className="main-footer__bottom">
        <p>&copy; {currentYear} Books Global</p>
        <p>Verified Secure Bookstore</p>
      </div>
    </footer>
  );
};
