import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Search,
  ShoppingCart,
  User,
  LogOut,
  Menu,
  X,
  BookOpen,
  Heart,
} from "lucide-react";
import { useAuth } from "../../../context/auth/AuthContext";
import { useCart } from "../../../context/cart/CartContext";
import "./Navbar.css";

export const Navbar = () => {
  const { user, isAuthenticated, logout, isAdmin, isManager } = useAuth();
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar__inner">
        <div className="navbar__row">
          <Link to="/" className="navbar__brand">
            <BookOpen className="navbar__brand-icon" />
            <span className="navbar__brand-text">
              Books
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="navbar__links">
            <Link
              to="/books"
              className="navbar__link"
            >
              Browse
            </Link>
            {isAuthenticated && (
              <>
                {isManager && (
                  <Link
                    to="/manager"
                    className="navbar__link"
                  >
                    Inventory
                  </Link>
                )}
                {isAdmin && (
                  <Link
                    to="/admin"
                    className="navbar__link"
                  >
                    Admin
                  </Link>
                )}
                <Link
                  to="/orders"
                  className="navbar__link"
                >
                  Orders
                </Link>
              </>
            )}
          </div>

          <div className="navbar__actions">
            <Link
              to="/wishlist"
              className="navbar__icon-link navbar__icon-link--wishlist"
            >
              <Heart className="navbar__icon" />
            </Link>
            <Link
              to="/cart"
              className="navbar__icon-link navbar__icon-link--cart"
            >
              <ShoppingCart className="navbar__icon" />
              {totalItems > 0 && (
                <span className="navbar__badge">
                  {totalItems}
                </span>
              )}
            </Link>
            {isAuthenticated ? (
              <div className="navbar__profile">
                <div className="navbar__profile-text">
                  <span className="navbar__profile-name">
                    {user?.name}
                  </span>
                  <span className="navbar__profile-role">
                    {user?.role}
                  </span>
                </div>
                <button
                  onClick={handleLogout}
                  className="navbar__logout"
                >
                  <LogOut className="navbar__icon" />
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="navbar__signin"
              >
                Sign In
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="navbar__menu-btn"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="navbar__menu-icon" />
            ) : (
              <Menu className="navbar__menu-icon" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="navbar__mobile">
          <Link
            to="/books"
            className="navbar__mobile-link"
            onClick={() => setIsMenuOpen(false)}
          >
            Browse Catalog
          </Link>
          {isAuthenticated ? (
            <>
              {isManager && (
                <Link
                  to="/manager"
                  className="navbar__mobile-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Inventory Management
                </Link>
              )}
              {isAdmin && (
                <Link
                  to="/admin"
                  className="navbar__mobile-link"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Admin Panel
                </Link>
              )}
              <Link
                to="/orders"
                className="navbar__mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                My Orders
              </Link>
              <Link
                to="/wishlist"
                className="navbar__mobile-link"
                onClick={() => setIsMenuOpen(false)}
              >
                Wishlist
              </Link>
              <button
                onClick={handleLogout}
                className="navbar__mobile-logout"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="navbar__mobile-signin"
              onClick={() => setIsMenuOpen(false)}
            >
              Sign In
            </Link>
          )}
        </div>
      )}
    </nav>
  );
};
