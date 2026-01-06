import React from "react";
import { Link } from "react-router-dom";
import "./NavbarLinks.css";

export const NavbarLinks = ({ isAuthenticated, isManager, isAdmin }) => (
  <div className="navbar__links">
    <Link to="/books" className="navbar__link">
      Browse
    </Link>
    {isAuthenticated && (
      <>
        {isManager && (
          <Link to="/manager" className="navbar__link">
            Inventory
          </Link>
        )}
        {isAdmin && (
          <Link to="/admin" className="navbar__link">
            Admin
          </Link>
        )}
        <Link to="/orders" className="navbar__link">
          Orders
        </Link>
      </>
    )}
  </div>
);
