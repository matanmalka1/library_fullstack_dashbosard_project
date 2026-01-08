import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/auth/AuthContext";
import { RegisterFormPanel } from "./RegisterFormPanel";
import { RegisterVisual } from "./RegisterVisual";
import { registerSchema } from "../../validators/auth/register-schema";

export const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [validationErrors, setValidationErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const validation = registerSchema.safeParse({
      firstName,
      lastName,
      email,
      password,
    });

    if (validation.success) {
      setValidationErrors({});
      return true;
    }

    const fieldErrors = validation.error.flatten().fieldErrors;
    setValidationErrors({
      firstName: fieldErrors.firstName?.[0] || null,
      lastName: fieldErrors.lastName?.[0] || null,
      email: fieldErrors.email?.[0] || null,
      password: fieldErrors.password?.[0] || null,
    });
    return false;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) {
      return;
    }

    setLoading(true);
    try {
      await register(firstName, lastName, email, password);
      navigate("/");
    } catch (err) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex bg-slate-50">
      <RegisterFormPanel
        firstName={firstName}
        lastName={lastName}
        email={email}
        password={password}
        error={error}
        validationErrors={validationErrors}
        loading={loading}
        onFirstNameChange={setFirstName}
        onLastNameChange={setLastName}
        onEmailChange={setEmail}
        onPasswordChange={setPassword}
        onSubmit={handleSubmit}
      />
      <RegisterVisual />
    </div>
  );
};
