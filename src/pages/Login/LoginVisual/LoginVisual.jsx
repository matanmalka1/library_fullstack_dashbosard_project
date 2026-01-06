import React from "react";
import { BookOpen } from "lucide-react";
import "./LoginVisual.css";

export const LoginVisual = () => (
  <div className="login__visual">
    <img
      src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000&auto=format&fit=crop"
      alt="Bookshelf"
      className="login__visual-img"
    />
    <div className="login__visual-overlay">
      <div className="login__visual-content">
        <div className="login__visual-icon">
          <BookOpen className="login__visual-icon-svg" />
        </div>
        <h2 className="login__visual-title">
          "Books are a uniquely portable magic."
        </h2>
        <p className="login__visual-quote">— Stephen King</p>
      </div>
    </div>
  </div>
);
