import React from "react";
import { Link } from "react-router-dom";

export const NavbarLinks = ({ isAuthenticated, isManager, isAdmin }) => (
  <div className="hidden md:flex items-center gap-8">
    <Link to="/books" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
      Browse
    </Link>
    {isAuthenticated && (
      <>
        {isManager && (
          <Link to="/manager" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
            Inventory
          </Link>
        )}
        {isAdmin && (
          <Link to="/admin" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
            Admin
          </Link>
        )}
        <Link to="/orders" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
          Orders
        </Link>
      </>
    )}
  </div>
);
