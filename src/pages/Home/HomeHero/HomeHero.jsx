import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import './HomeHero.css';

export const HomeHero = () => (
  <section className="home__hero">
    <div className="home__hero-bg">
      <img
        src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?q=80&w=2560&auto=format&fit=crop"
        alt="Library"
        className="home__hero-img"
      />
      <div className="home__hero-gradient" />
    </div>

    <div className="home__container home__hero-content">
      <div className="home__hero-inner">
        <span className="home__badge">PREMIUM BOOKSTORE</span>
        <h1 className="home__title">
          Unlock Your <span className="home__title-accent">Next Chapter</span>
        </h1>
        <p className="home__subtitle">
          Discover a universe of knowledge, adventure, and inspiration. Curated
          selections for every reader's journey.
        </p>
        <div className="home__actions">
          <Link to="/books" className="home__button home__button--primary">
            Explore Library <ArrowRight className="home__button-icon" />
          </Link>
          <Link to="/register" className="home__button home__button--ghost">
            Join our Club
          </Link>
        </div>
      </div>
    </div>
  </section>
);
