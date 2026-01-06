
import React, { useEffect, useState } from 'react';
import { api } from '../../../services/api';
import { HomeHero } from '../HomeHero/HomeHero';
import { HomeFeatures } from '../HomeFeatures/HomeFeatures';
import { HomeFeatured } from '../HomeFeatured/HomeFeatured';
import { HomeCTA } from '../HomeCTA/HomeCTA';
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
      <HomeHero />
      <HomeFeatures />
      <HomeFeatured featuredBooks={featuredBooks} />
      <HomeCTA />
    </div>
  );
};
