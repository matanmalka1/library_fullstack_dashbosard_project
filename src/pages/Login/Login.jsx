import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, BookOpen, ArrowRight, Github } from "lucide-react";
import { useAuth } from "../../context/auth/AuthContext";
import "./Login.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await login(email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login">
      {/* Left Form */}
      <div className="login__panel">
        <div className="login__header">
          <Link
            to="/"
            className="login__brand"
          >
            <BookOpen className="login__brand-icon" />
            <span className="login__brand-text">
              Books
            </span>
          </Link>
          <h1 className="login__title">
            Welcome back
          </h1>
          <p className="login__subtitle">
            Sign in to continue your reading journey.
          </p>
        </div>

        {error && (
          <div className="login__error">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login__form">
          <div className="login__field">
            <label className="login__label">
              Email Address
            </label>
            <div className="login__input-wrap">
              <Mail className="login__input-icon" />
              <input
                type="email"
                required
                className="login__input"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div className="login__field">
            <div className="login__field-row">
              <label className="login__label">
                Password
              </label>
              <a
                href="#"
                className="login__forgot"
              >
                Forgot?
              </a>
            </div>
            <div className="login__input-wrap">
              <Lock className="login__input-icon" />
              <input
                type="password"
                required
                className="login__input"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="login__submit"
          >
            {loading ? "Authenticating..." : "Sign In"}{" "}
            <ArrowRight className="login__submit-icon" />
          </button>
        </form>

        <div className="login__divider">
          <div className="login__divider-line" />
          <div className="login__divider-text">
            <span>
              Or continue with
            </span>
          </div>
        </div>

        <div className="login__socials">
          <button className="login__social-button">
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="login__social-icon"
              alt="Google"
            />{" "}
            Google
          </button>
          <button className="login__social-button">
            <Github className="login__social-icon" /> GitHub
          </button>
        </div>

        <p className="login__footer">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="login__footer-link"
          >
            Create one
          </Link>
        </p>
      </div>

      {/* Right Visual */}
      <div className="login__visual">
        <img
          src="https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=2000&auto=format&fit=crop"
          alt="Bookshelf"
          className="login__visual-img"
        />
        <div className="login__visual-overlay">
          <div className="login__visual-content">
            <div className="login__visual-icon">
              <BookOpen className="login__visual-icon-svg" />
            </div>
            <h2 className="login__visual-title">
              "Books are a uniquely portable magic."
            </h2>
            <p className="login__visual-quote">— Stephen King</p>
          </div>
        </div>
      </div>
    </div>
  );
};
