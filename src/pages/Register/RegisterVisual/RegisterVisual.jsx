import React from "react";
import "./RegisterVisual.css";

export const RegisterVisual = () => (
  <div className="register__visual">
    <img
      src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop"
      alt="Ancient Library"
      className="register__visual-img"
    />
    <div className="register__visual-overlay">
      <div className="register__visual-content">
        <h2 className="register__visual-title">Your world, curated.</h2>
        <div className="register__visual-list">
          <div className="register__visual-item">
            <div className="register__visual-step">1</div>
            <p>Personalized recommendations based on your taste.</p>
          </div>
          <div className="register__visual-item">
            <div className="register__visual-step">2</div>
            <p>Exclusive access to signed editions and early releases.</p>
          </div>
          <div className="register__visual-item">
            <div className="register__visual-step">3</div>
            <p>Earn points with every purchase for future discounts.</p>
          </div>
        </div>
      </div>
    </div>
  </div>
);
