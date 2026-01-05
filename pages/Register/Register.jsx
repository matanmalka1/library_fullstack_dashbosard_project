import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, BookOpen } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await register(name, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-slate-50">
      {/* Right Form (Swapped for variety) */}
      <div className="w-full lg:w-[450px] p-8 md:p-16 flex flex-col justify-center bg-white shadow-2xl z-10 lg:order-2">
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
            Create Account
          </h1>
          <p className="text-slate-500">Join our community of readers today.</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl text-sm font-medium border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
              Full Name
            </label>
            <div className="relative">
              <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="text"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

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
            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest pl-1">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-300" />
              <input
                type="password"
                required
                className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-100 rounded-2xl focus:ring-2 focus:ring-indigo-500 focus:bg-white transition-all outline-none"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <p className="text-[10px] text-slate-400 leading-relaxed px-1">
            By creating an account, you agree to our{" "}
            <strong>Terms of Service</strong> and{" "}
            <strong>Privacy Policy</strong>. We will never share your data.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 text-white py-4 rounded-2xl font-bold text-lg hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100 flex items-center justify-center gap-2 group disabled:opacity-50"
          >
            {loading ? "Processing..." : "Start Reading"}{" "}
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </form>

        <p className="mt-10 text-center text-slate-500 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-600 font-bold hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Left Visual */}
      <div className="hidden lg:flex flex-grow relative overflow-hidden bg-indigo-900 lg:order-1">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop"
          alt="Ancient Library"
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-tr from-slate-900 via-indigo-900/40 to-transparent flex flex-col items-center justify-center p-20 text-center">
          <div className="max-w-md">
            <h2 className="text-5xl font-serif font-bold text-white mb-8 tracking-tight">
              Your world, curated.
            </h2>
            <div className="space-y-6 text-indigo-100">
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center border border-white/20">
                  1
                </div>
                <p className="font-medium">
                  Personalized recommendations based on your taste.
                </p>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center border border-white/20">
                  2
                </div>
                <p className="font-medium">
                  Exclusive access to signed editions and early releases.
                </p>
              </div>
              <div className="flex items-center gap-4 text-left">
                <div className="w-10 h-10 rounded-full bg-indigo-500/30 flex items-center justify-center border border-white/20">
                  3
                </div>
                <p className="font-medium">
                  Earn points with every purchase for future discounts.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
