import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, BookOpen, ArrowRight, Github } from "lucide-react";
import "./LoginFormPanel.css";

export const LoginFormPanel = ({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => (
  <div className="login__panel">
    <div className="login__header">
      <Link to="/" className="login__brand">
        <BookOpen className="login__brand-icon" />
        <span className="login__brand-text">Books</span>
      </Link>
      <h1 className="login__title">Welcome back</h1>
      <p className="login__subtitle">Sign in to continue your reading journey.</p>
    </div>

    {error && <div className="login__error">{error}</div>}

    <form onSubmit={onSubmit} className="login__form">
      <div className="login__field">
        <label className="login__label">Email Address</label>
        <div className="login__input-wrap">
          <Mail className="login__input-icon" />
          <input
            type="email"
            required
            className="login__input"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
      </div>

      <div className="login__field">
        <div className="login__field-row">
          <label className="login__label">Password</label>
          <a href="#" className="login__forgot">
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
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
      </div>

      <button type="submit" disabled={loading} className="login__submit">
        {loading ? "Authenticating..." : "Sign In"}{" "}
        <ArrowRight className="login__submit-icon" />
      </button>
    </form>

    <div className="login__divider">
      <div className="login__divider-line" />
      <div className="login__divider-text">
        <span>Or continue with</span>
      </div>
    </div>

    <div className="login__socials">
      <button className="login__social-button">
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="login__social-icon"
          alt="Google"
        />{' '}
        Google
      </button>
      <button className="login__social-button">
        <Github className="login__social-icon" /> GitHub
      </button>
    </div>

    <p className="login__footer">
      Don't have an account?{" "}
      <Link to="/register" className="login__footer-link">
        Create one
      </Link>
    </p>
  </div>
);
