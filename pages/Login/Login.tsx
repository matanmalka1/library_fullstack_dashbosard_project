import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, BookOpen, ArrowRight, Github } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-slate-50">
      {/* Left Form */}
      <div className="w-full lg:w-[450px] p-8 md:p-16 flex flex-col justify-center bg-white shadow-2xl z-10">
        <div className="mb-10 text-center lg:text-left">
          <Link
            to="/"
            className="inline-flex items-center gap-2 mb-8 lg:hidden"
          >
            <BookOpen className="w-8 h-8 text-indigo-600" />
            <span className="text-xl font-bold font-serif text-slate-800">
              Books
            </span>
          </Link>
          <h1 className="text-3xl font-bold font-serif text-slate-900 mb-2 tracking-tight">
            Welcome back
          </h1>
          <p className="text-slate-500">
            Sign in to continue your reading journey.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
              Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="email"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center px-1">
              <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                Password
              </label>
              <a
                href="#"
                className="text-xs font-bold text-indigo-600 hover:text-indigo-700"
              >
                Forgot?
              </a>
            </div>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Sign In"}{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <div className="mt-10 relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-slate-100" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-slate-400 font-bold tracking-widest">
              Or continue with
            </span>
          </div>
        </div>

        <div className="mt-8 flex gap-4">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors font-bold text-slate-700 text-sm">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-5 h-5"
              alt="Google"
            />{" "}
            Google
          </button>
          <button className="flex-1 flex items-center justify-center gap-2 py-3 border border-slate-100 rounded-xl hover:bg-slate-50 transition-colors font-bold text-slate-700 text-sm">
            <Github className="w-5 h-5" /> GitHub
          </button>
        </div>

        <p className="mt-12 text-center text-slate-500 text-sm">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-indigo-600 font-bold hover:underline"
          >
            Create one
          </Link>
        </p>
      </div>

      {/* Right Visual */}
      <div className="hidden lg:flex flex-grow relative overflow-hidden bg-slate-900">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000&auto=format&fit=crop"
          alt="Bookshelf"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/60 to-slate-900/90 flex flex-col items-center justify-center p-20 text-center">
          <div className="max-w-md">
            <div className="w-20 h-20 bg-indigo-500 rounded-3xl flex items-center justify-center mb-8 mx-auto rotate-12 shadow-2xl">
              <BookOpen className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-4xl font-serif font-bold text-white mb-6">
              "Books are a uniquely portable magic."
            </h2>
            <p className="text-indigo-200 text-lg italic">— Stephen King</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
