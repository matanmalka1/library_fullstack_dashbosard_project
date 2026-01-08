import { Link } from "react-router-dom";
import { Mail, Lock, User, ArrowRight } from "lucide-react";
import { AlertBanner } from "../../../components/ui/AlertBanner";
import { AuthFormPanel } from "../../../components/ui/AuthFormPanel";
import { IconTextField } from "../../../components/ui/IconTextField";
import { PrimaryButton } from "../../../components/ui/PrimaryButton";

export const RegisterFormPanel = ({
  firstName,
  lastName,
  email,
  password,
  error,
  validationErrors = {},
  loading,
  onFirstNameChange,
  onLastNameChange,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}) => (
  <AuthFormPanel
    title="Create Account"
    subtitle="Join our community of readers today."
    className="order-2"
  >

    <AlertBanner
      message={error}
      className="mb-6 animate-[login-shake_0.2s_ease]"
    />

    <form onSubmit={onSubmit} className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        <IconTextField
          label="First Name"
          icon={User}
          type="text"
          required
          placeholder="Jane"
          value={firstName}
          onChange={(e) => onFirstNameChange(e.target.value)}
          error={validationErrors.firstName}
        />
        <IconTextField
          label="Last Name"
          icon={User}
          type="text"
          required
          placeholder="Doe"
          value={lastName}
          onChange={(e) => onLastNameChange(e.target.value)}
          error={validationErrors.lastName}
        />
      </div>

      <IconTextField
        label="Email Address"
        icon={Mail}
        type="email"
        required
        placeholder="name@example.com"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
        error={validationErrors.email}
      />

      <IconTextField
        label="Password"
        icon={Lock}
        type="password"
        required
        placeholder="Min. 8 characters"
        value={password}
        onChange={(e) => onPasswordChange(e.target.value)}
        error={validationErrors.password}
      />

      <p className="text-[10px] text-slate-400 leading-6 px-1 m-0">
        By creating an account, you agree to our{" "}
        <strong>Terms of Service</strong> and <strong>Privacy Policy</strong>.
        We will never share your data.
      </p>

      <PrimaryButton type="submit" disabled={loading}>
        {loading ? "Processing..." : "Start Reading"}{" "}
        <ArrowRight className="w-5 h-5" />
      </PrimaryButton>
    </form>

    <p className="mt-8 text-center text-slate-500 text-sm">
      Already have an account?{" "}
      <Link
        to="/login"
        className="text-indigo-600 font-bold no-underline hover:underline"
      >
        Sign in
      </Link>
    </p>
  </AuthFormPanel>
);
