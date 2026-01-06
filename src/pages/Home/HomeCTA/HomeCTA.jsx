import React from 'react';
import { Link } from 'react-router-dom';
import './HomeCTA.css';

export const HomeCTA = () => (
  <section className="home__section home__container">
    <div className="home__cta">
      <div className="home__cta-inner">
        <h2 className="home__cta-title">Ready to expand your horizon?</h2>
        <p className="home__cta-text">
          Sign up today and get 20% off your first purchase. Join thousands of
          book lovers already using Books.
        </p>
        <Link to="/register" className="home__cta-button">
          Create Free Account
        </Link>
      </div>
      <div className="home__cta-glow home__cta-glow--one" />
      <div className="home__cta-glow home__cta-glow--two" />
    </div>
  </section>
);
