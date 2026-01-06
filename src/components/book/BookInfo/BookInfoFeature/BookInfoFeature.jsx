import React, { memo } from "react";

export const BookInfoFeature = memo(({ icon: Icon, label, value }) => (
  <div className="book-info__feature">
    <Icon className="book-info__feature-icon" aria-hidden="true" />
    <div className="book-info__feature-text">
      <span className="book-info__feature-label">{label}</span>
      <span className="book-info__feature-value">{value}</span>
    </div>
  </div>
));

BookInfoFeature.displayName = "BookInfoFeature";
