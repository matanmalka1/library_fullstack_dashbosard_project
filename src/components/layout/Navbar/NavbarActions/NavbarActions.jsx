import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Heart, LogOut } from "lucide-react";
import "./NavbarActions.css";

export const NavbarActions = ({
  isAuthenticated,
  user,
  totalItems,
  onLogout,
}) => (
  <div className="navbar__actions">
    <Link to="/wishlist" className="navbar__icon-link navbar__icon-link--wishlist">
      <Heart className="navbar__icon" />
    </Link>
    <Link to="/cart" className="navbar__icon-link navbar__icon-link--cart">
      <ShoppingCart className="navbar__icon" />
      {totalItems > 0 && <span className="navbar__badge">{totalItems}</span>}
    </Link>
    {isAuthenticated ? (
      <div className="navbar__profile">
        <div className="navbar__profile-text">
          <span className="navbar__profile-name">{user?.name}</span>
          <span className="navbar__profile-role">{user?.role}</span>
        </div>
        <button onClick={onLogout} className="navbar__logout">
          <LogOut className="navbar__icon" />
        </button>
      </div>
    ) : (
      <Link to="/login" className="navbar__signin">
        Sign In
      </Link>
    )}
  </div>
);
