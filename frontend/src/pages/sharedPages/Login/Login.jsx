import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/auth/AuthContext";
import { LoginFormPanel } from "./LoginFormPanel";
import { LoginVisual } from "./LoginVisual";

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api/v1";

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

  const handleOAuthLogin = (provider) => {
    // Redirect to backend OAuth endpoint
    window.location.href = `${API_BASE_URL}/auth/${provider}`;
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-slate-50">
      <LoginFormPanel
        email={email}
        password={password}
        error={error}
        loading={loading}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
        onOAuthLogin={handleOAuthLogin}
      />
      <LoginVisual />
    </div>
  );
};
