
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, ShieldCheck, Zap } from 'lucide-react';
import { api } from '../../services/api';
import { BookCard } from '../../components/book/BookCard/BookCard';
import './Home.css';

export const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    api.getBooks().then(books => {
      setFeaturedBooks(books.slice(0, 4));
    });
  }, []);

  return (
    <div className="home">
      {/* Hero Section */}
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
            <span className="home__badge">
              PREMIUM BOOKSTORE
            </span>
            <h1 className="home__title">
              Unlock Your <span className="home__title-accent">Next Chapter</span>
            </h1>
            <p className="home__subtitle">
              Discover a universe of knowledge, adventure, and inspiration. Curated selections for every reader's journey.
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

      {/* Features */}
      <section className="home__section home__container">
        <div className="home__features">
          {[
            { icon: <Zap className="home__feature-icon-svg" />, title: 'Fast Delivery', desc: 'Get your favorites delivered in as little as 24 hours.' },
            { icon: <ShieldCheck className="home__feature-icon-svg" />, title: 'Secure Payment', desc: 'Your transactions are always protected and private.' },
            { icon: <Star className="home__feature-icon-svg" />, title: 'Premium Curation', desc: 'Only the highest quality editions and translations.' }
          ].map((feature, i) => (
            <div key={i} className="home__feature-card">
              <div className="home__feature-icon">
                {feature.icon}
              </div>
              <h3 className="home__feature-title">{feature.title}</h3>
              <p className="home__feature-desc">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Featured Books */}
      <section className="home__section home__container">
        <div className="home__section-header">
          <div>
            <h2 className="home__section-title">Featured Collection</h2>
            <p className="home__section-desc">Handpicked by our expert librarians this month.</p>
          </div>
          <Link to="/books" className="home__section-link">
            View All <ArrowRight className="home__section-link-icon" />
          </Link>
        </div>

        <div className="home__grid home__grid--featured">
          {featuredBooks.map(book => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="home__section home__container">
        <div className="home__cta">
          <div className="home__cta-inner">
            <h2 className="home__cta-title">Ready to expand your horizon?</h2>
            <p className="home__cta-text">Sign up today and get 20% off your first purchase. Join thousands of book lovers already using Books.</p>
            <Link to="/register" className="home__cta-button">
              Create Free Account
            </Link>
          </div>
          <div className="home__cta-glow home__cta-glow--one" />
          <div className="home__cta-glow home__cta-glow--two" />
        </div>
      </section>
    </div>
  );
};
