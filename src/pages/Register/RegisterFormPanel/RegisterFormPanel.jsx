import React from "react";
import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight, BookOpen } from "lucide-react";
import "./RegisterFormPanel.css";

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
  <div className="register__panel">
    <div className="register__header">
      <Link to="/" className="register__brand">
        <BookOpen className="register__brand-icon" />
        <span className="register__brand-text">Books</span>
      </Link>
      <h1 className="register__title">Create Account</h1>
      <p className="register__subtitle">Join our community of readers today.</p>
    </div>

    {error && <div className="register__error">{error}</div>}

    <form onSubmit={onSubmit} className="register__form">
      <div className="register__field">
        <label className="register__label">Full Name</label>
        <div className="register__input-wrap">
          <User className="register__input-icon" />
          <input
            type="text"
            required
            className="register__input"
            placeholder="Jane Doe"
            value={name}
            onChange={(e) => onNameChange(e.target.value)}
          />
        </div>
      </div>

      <div className="register__field">
        <label className="register__label">Email Address</label>
        <div className="register__input-wrap">
          <Mail className="register__input-icon" />
          <input
            type="email"
            required
            className="register__input"
            placeholder="name@example.com"
            value={email}
            onChange={(e) => onEmailChange(e.target.value)}
          />
        </div>
      </div>

      <div className="register__field">
        <label className="register__label">Password</label>
        <div className="register__input-wrap">
          <Lock className="register__input-icon" />
          <input
            type="password"
            required
            className="register__input"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => onPasswordChange(e.target.value)}
          />
        </div>
      </div>

      <p className="register__hint">
        By creating an account, you agree to our <strong>Terms of Service</strong>
        {" "}and <strong>Privacy Policy</strong>. We will never share your data.
      </p>

      <button type="submit" disabled={loading} className="register__submit">
        {loading ? "Processing..." : "Start Reading"}{" "}
        <ArrowRight className="register__submit-icon" />
      </button>
    </form>

    <p className="register__footer">
      Already have an account?{" "}
      <Link to="/login" className="register__footer-link">
        Sign in
      </Link>
    </p>
  </div>
);
