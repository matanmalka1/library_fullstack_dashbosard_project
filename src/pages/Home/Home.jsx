
import React, { useEffect, useState } from 'react';
import { api } from '../../services/api';
import { HomeHero } from '../HomeHero/HomeHero';
import { HomeFeatures } from '../HomeFeatures/HomeFeatures';
import { HomeFeatured } from '../HomeFeatured/HomeFeatured';
import { HomeCTA } from './HomeCTA';

export const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    api.getBooks().then(books => {
      setFeaturedBooks(books.slice(0, 4));
    });
  }, []);

  return (
    <div className="flex flex-col gap-20 pb-20">
      <HomeHero />
      <HomeFeatures />
      <HomeFeatured featuredBooks={featuredBooks} />
      <HomeCTA />
    </div>
  );
};
