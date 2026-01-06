import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, BookOpen, ArrowRight, Github } from "lucide-react";
import { AlertBanner } from "../../components/ui/AlertBanner";

export const LoginFormPanel = ({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => (
  <div className="w-full max-w-[450px] p-8 lg:p-16 bg-white shadow-[0_24px_50px_rgba(15,23,42,0.12)] z-10 flex flex-col justify-center">
    <div className="mb-10 text-center lg:text-left">
      <Link to="/" className="inline-flex items-center gap-2 mb-8 no-underline lg:hidden">
        <BookOpen className="w-8 h-8 text-indigo-600" />
        <span className="text-xl font-bold font-serif text-slate-800">Books</span>
      </Link>
      <h1 className="font-serif text-3xl font-bold text-slate-900 mb-2">Welcome back</h1>
      <p className="text-slate-500 m-0">Sign in to continue your reading journey.</p>
    </div>

    <AlertBanner
      message={error}
      className="mb-6 animate-[login-shake_0.2s_ease]"
    />

    <form onSubmit={onSubmit} className="grid gap-6">
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
        <div className="flex items-center justify-between px-1">
          <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
            Password
          </label>
          <a href="#" className="text-xs font-bold text-indigo-600 no-underline hover:text-indigo-700">
            Forgot?
          </a>
        </div>
        <div className="relative">
          <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
          <input
            type="password"
            required
            className="w-full pl-12 pr-4 py-3.5 rounded-[20px] border border-slate-200 bg-slate-50 text-sm outline-none transition focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200 focus:bg-white"
            placeholder="••••••••"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full border-0 rounded-[20px] px-4 py-4 bg-indigo-600 text-white text-lg font-bold inline-flex items-center justify-center gap-2 cursor-pointer shadow-[0_16px_30px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? "Authenticating..." : "Sign In"}{" "}
        <ArrowRight className="w-5 h-5" />
      </button>
    </form>

    <div className="my-10 relative text-center">
      <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
      <div className="relative inline-flex px-3 bg-white text-[12px] uppercase tracking-[0.16em] font-bold text-slate-400">
        <span>Or continue with</span>
      </div>
    </div>

    <div className="flex gap-4">
      <button type="button" className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 border border-slate-200 rounded-2xl bg-white font-bold text-[13px] text-slate-700 cursor-pointer transition hover:bg-slate-50">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
          alt="Google"
        />{' '}
        Google
      </button>
      <button type="button" className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 border border-slate-200 rounded-2xl bg-white font-bold text-[13px] text-slate-700 cursor-pointer transition hover:bg-slate-50">
        <Github className="w-5 h-5" /> GitHub
      </button>
    </div>

    <p className="mt-10 text-center text-slate-500 text-sm">
      Don't have an account?{" "}
      <Link to="/register" className="text-indigo-600 font-bold no-underline hover:underline">
        Create one
      </Link>
    </p>
  </div>
);
