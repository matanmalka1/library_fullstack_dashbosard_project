import { useEffect, useState } from "react";
import { bookService } from "../../../services/BookService";
import { HomeHero } from "./HomeHero";
import { HomeFeatures } from "./HomeFeatures";
import { HomeFeatured } from "./HomeFeatured";
import { HomeCTA } from "./HomeCTA";

export const Home = () => {
  const [featuredBooks, setFeaturedBooks] = useState([]);

  useEffect(() => {
    bookService.getBooks().then((books) => {
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
