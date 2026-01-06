import React from "react";
import { Truck, Shield, RotateCcw } from "lucide-react";
import { BookInfoFeature } from "../BookInfoFeature/BookInfoFeature";
import "./BookInfoMedia.css";

export const BookInfoMedia = ({ coverImage, safeTitle }) => (
  <div className="book-info__media">
    <div className="book-info__image-wrap">
      <img
        src={coverImage}
        alt={`Cover of ${safeTitle}`}
        className="book-info__image"
        loading="lazy"
      />
    </div>

    <div className="book-info__features">
      <BookInfoFeature icon={Truck} label="Delivery" value="Express" />
      <BookInfoFeature icon={RotateCcw} label="Returns" value="30 Days" />
      <BookInfoFeature icon={Shield} label="Safe" value="Verified" />
    </div>
  </div>
);
