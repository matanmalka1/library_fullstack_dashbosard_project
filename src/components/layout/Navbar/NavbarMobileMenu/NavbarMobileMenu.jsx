import React from "react";
import { Link } from "react-router-dom";
import "./NavbarMobileMenu.css";

export const NavbarMobileMenu = ({
  isAuthenticated,
  isManager,
  isAdmin,
  onLogout,
  onNavigate,
}) => (
  <div className="navbar__mobile">
    <Link to="/books" className="navbar__mobile-link" onClick={onNavigate}>
      Browse Catalog
    </Link>
    {isAuthenticated ? (
      <>
        {isManager && (
          <Link to="/manager" className="navbar__mobile-link" onClick={onNavigate}>
            Inventory Management
          </Link>
        )}
        {isAdmin && (
          <Link to="/admin" className="navbar__mobile-link" onClick={onNavigate}>
            Admin Panel
          </Link>
        )}
        <Link to="/orders" className="navbar__mobile-link" onClick={onNavigate}>
          My Orders
        </Link>
        <Link to="/wishlist" className="navbar__mobile-link" onClick={onNavigate}>
          Wishlist
        </Link>
        <button onClick={onLogout} className="navbar__mobile-logout">
          Logout
        </button>
      </>
    ) : (
      <Link to="/login" className="navbar__mobile-signin" onClick={onNavigate}>
        Sign In
      </Link>
    )}
  </div>
);
