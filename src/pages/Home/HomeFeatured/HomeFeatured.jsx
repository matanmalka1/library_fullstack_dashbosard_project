import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BookCard } from '../../../components/book/BookCard/BookCard/BookCard';
import './HomeFeatured.css';

export const HomeFeatured = ({ featuredBooks }) => (
  <section className="home__section home__container">
    <div className="home__section-header">
      <div>
        <h2 className="home__section-title">Featured Collection</h2>
        <p className="home__section-desc">
          Handpicked by our expert librarians this month.
        </p>
      </div>
      <Link to="/books" className="home__section-link">
        View All <ArrowRight className="home__section-link-icon" />
      </Link>
    </div>

    <div className="home__grid home__grid--featured">
      {featuredBooks.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  </section>
);
