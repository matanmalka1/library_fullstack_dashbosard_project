import { Link } from "react-router-dom";

export const NavbarLinks = ({ isAuthenticated, isManager, isAdmin }) => (
  <div className="hidden md:flex items-center gap-8">
    <Link to="/books" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
      Browse
    </Link>
    {isAuthenticated && (
      <>
        <Link to="/orders" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
          Orders
        </Link>
        {isManager && (
          <Link to="/manager" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
            Inventory
          </Link>
        )}
        {isAdmin && (
          <>
            <Link to="/admin/reviews" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
              Reviews
            </Link>
            <Link to="/admin/users" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
              User Controls
            </Link>
          </>
        )}
      </>
    )}
    <Link to="/about" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
      About
    </Link>
    <Link to="/help" className="text-slate-600 font-medium no-underline transition-colors hover:text-indigo-600">
      Help
    </Link>
  </div>
);
