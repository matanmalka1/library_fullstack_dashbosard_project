import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, BookOpen } from "lucide-react";
import { useAuth } from "../../context/auth/AuthContext";
import "./Register.css";

export const Register = () => {
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
    <div className="register">
      {/* Right Form (Swapped for variety) */}
      <div className="register__panel">
        <div className="register__header">
          <Link
            to="/"
            className="register__brand"
          >
            <BookOpen className="register__brand-icon" />
            <span className="register__brand-text">
              Books
            </span>
          </Link>
          <h1 className="register__title">
            Create Account
          </h1>
          <p className="register__subtitle">Join our community of readers today.</p>
        </div>

        {error && (
          <div className="register__error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="register__form">
          <div className="register__field">
            <label className="register__label">
              Full Name
            </label>
            <div className="register__input-wrap">
              <User className="register__input-icon" />
              <input
                type="text"
                required
                className="register__input"
                placeholder="Jane Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          <div className="register__field">
            <label className="register__label">
              Email Address
            </label>
            <div className="register__input-wrap">
              <Mail className="register__input-icon" />
              <input
                type="email"
                required
                className="register__input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="register__field">
            <label className="register__label">
              Password
            </label>
            <div className="register__input-wrap">
              <Lock className="register__input-icon" />
              <input
                type="password"
                required
                className="register__input"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <p className="register__hint">
            By creating an account, you agree to our{" "}
            <strong>Terms of Service</strong> and{" "}
            <strong>Privacy Policy</strong>. We will never share your data.
          </p>

          <button
            type="submit"
            disabled={loading}
            className="register__submit"
          >
            {loading ? "Processing..." : "Start Reading"}{" "}
            <ArrowRight className="register__submit-icon" />
          </button>
        </form>

        <p className="register__footer">
          Already have an account?{" "}
          <Link
            to="/login"
            className="register__footer-link"
          >
            Sign in
          </Link>
        </p>
      </div>

      {/* Left Visual */}
      <div className="register__visual">
        <img
          src="https://images.unsplash.com/photo-1481627834876-b7833e8f5570?q=80&w=2000&auto=format&fit=crop"
          alt="Ancient Library"
          className="register__visual-img"
        />
        <div className="register__visual-overlay">
          <div className="register__visual-content">
            <h2 className="register__visual-title">
              Your world, curated.
            </h2>
            <div className="register__visual-list">
              <div className="register__visual-item">
                <div className="register__visual-step">
                  1
                </div>
                <p>
                  Personalized recommendations based on your taste.
                </p>
              </div>
              <div className="register__visual-item">
                <div className="register__visual-step">
                  2
                </div>
                <p>
                  Exclusive access to signed editions and early releases.
                </p>
              </div>
              <div className="register__visual-item">
                <div className="register__visual-step">
                  3
                </div>
                <p>
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
