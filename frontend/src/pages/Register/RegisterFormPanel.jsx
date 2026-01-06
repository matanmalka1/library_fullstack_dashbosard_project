import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, BookOpen } from "lucide-react";
import { AlertBanner } from "../../components/ui/AlertBanner";

export const RegisterFormPanel = ({
  name,
  email,
  password,
  error,
  loading,
  onNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => (
  <div className="w-full max-w-[450px] p-8 lg:p-16 bg-white shadow-[0_24px_50px_rgba(15,23,42,0.12)] z-10 flex flex-col justify-center order-2">
    <div className="mb-10 text-center lg:text-left">
      <Link to="/" className="inline-flex items-center gap-2 mb-8 no-underline lg:hidden">
        <BookOpen className="w-8 h-8 text-indigo-600" />
        <span className="text-xl font-bold font-serif text-slate-800">Books</span>
      </Link>
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Create Account</h1>
      <p className="text-slate-500 m-0">Join our community of readers today.</p>
    </div>

    <AlertBanner
      message={error}
      className="mb-6 animate-[login-shake_0.2s_ease]"
    />

    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-2">
        <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
          Full Name
        </label>
        <div className="relative">
          <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            type="text"
            required
            className="w-full pl-12 pr-4 py-3.5 rounded-[20px] border border-slate-200 bg-slate-50 text-sm outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
          Email Address
        </label>
        <div className="relative">
          <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            type="email"
            required
            className="w-full pl-12 pr-4 py-3.5 rounded-[20px] border border-slate-200 bg-slate-50 text-sm outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
      </div>

      <div className="grid gap-2">
        <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
          Password
        </label>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            type="password"
            required
            className="w-full pl-12 pr-4 py-3.5 rounded-[20px] border border-slate-200 bg-slate-50 text-sm outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
      </div>

      <p className="text-[10px] text-slate-400 leading-6 px-1 m-0">
        By creating an account, you agree to our <strong>Terms of Service</strong>
        {" "}and <strong>Privacy Policy</strong>. We will never share your data.
      </p>

      <button
        type="submit"
        disabled={loading}
        className="w-full border-0 rounded-[20px] px-4 py-4 bg-indigo-600 text-white text-lg font-bold inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_16px_30px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Processing..." : "Start Reading"}{" "}
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>

    <p className="mt-8 text-center text-slate-500 text-sm">
      Already have an account?{" "}
      <Link to="/login" className="text-indigo-600 font-bold no-underline hover:underline">
        Sign in
      </Link>
    </p>
  </div>
);
