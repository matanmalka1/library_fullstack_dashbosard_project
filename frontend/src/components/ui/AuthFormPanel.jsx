import { Link } from "react-router-dom";
import { BookOpen } from "lucide-react";

export const AuthFormPanel = ({
  title,
  subtitle,
  className = "",
  children,
  footer,
}) => (
  <div
    className={`w-full max-w-[450px] p-8 lg:p-16 bg-white shadow-[0_24px_50px_rgba(15,23,42,0.12)] z-10 flex flex-col justify-center ${className}`}
  >
    <div className="mb-10 text-center lg:text-left">
      <Link
        to="/"
        className="inline-flex items-center gap-2 mb-8 no-underline lg:hidden"
      >
        <BookOpen className="w-8 h-8 text-indigo-600" />
        <span className="text-xl font-bold font-serif text-slate-800">
          Books
        </span>
      </Link>
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">
        {title}
      </h1>
      {subtitle && <p className="text-slate-500 m-0">{subtitle}</p>}
    </div>
    {children}
    {footer}
  </div>
);
