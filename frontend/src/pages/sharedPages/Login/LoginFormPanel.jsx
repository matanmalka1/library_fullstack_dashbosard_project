import { Link } from "react-router-dom";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import { AlertBanner } from "../../../components/ui/AlertBanner";
import { AuthFormPanel } from "../../../components/ui/AuthFormPanel";
import { IconTextField } from "../../../components/ui/IconTextField";
import { PrimaryButton } from "../../../components/ui/PrimaryButton";

export const LoginFormPanel = ({
  email,
  password,
  error,
  loading,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  onOAuthLogin,
}) => (
  <AuthFormPanel
    title="Welcome back"
    subtitle="Sign in to continue your reading journey."
  >
    <AlertBanner
      message={error}
      className="mb-6 animate-[login-shake_0.2s_ease]"
    />

    <form onSubmit={onSubmit} className="grid gap-6">
      <IconTextField
        label="Email Address"
        icon={Mail}
        type="email"
        required
        placeholder="name@example.com"
        value={email}
        onChange={(e) => onEmailChange(e.target.value)}
      />

      <div className="grid gap-2">
        <div className="flex items-center justify-between px-1">
          <label className="text-[11px] uppercase tracking-[0.16em] font-bold text-slate-400">
            Password
          </label>
          <a
            href="#"
            className="text-xs font-bold text-indigo-600 no-underline hover:text-indigo-700"
          >
            Forgot?
          </a>
        </div>
        <IconTextField
          icon={Lock}
          type="password"
          required
          placeholder="********"
          value={password}
          onChange={(e) => onPasswordChange(e.target.value)}
        />
      </div>

      <PrimaryButton type="submit" disabled={loading}>
        {loading ? "Authenticating..." : "Sign In"}{" "}
        <ArrowRight className="w-5 h-5" />
      </PrimaryButton>
    </form>

    <div className="my-10 relative text-center">
      <div className="absolute inset-x-0 top-1/2 h-px bg-slate-200" />
      <div className="relative inline-flex px-3 bg-white text-[12px] uppercase tracking-[0.16em] font-bold text-slate-400">
        <span>Or continue with</span>
      </div>
    </div>

    <div className="flex gap-4">
      <button
        type="button"
        onClick={() => onOAuthLogin("google")}
        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 border border-slate-200 rounded-2xl bg-white font-bold text-[13px] text-slate-700 cursor-pointer transition hover:bg-slate-50"
      >
        <img
          src="https://www.svgrepo.com/show/475656/google-color.svg"
          className="w-5 h-5"
          alt="Google"
        />{" "}
        Google
      </button>
      <button
        type="button"
        onClick={() => onOAuthLogin("github")}
        className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-3 border border-slate-200 rounded-2xl bg-white font-bold text-[13px] text-slate-700 cursor-pointer transition hover:bg-slate-50"
      >
        <Github className="w-5 h-5" /> GitHub
      </button>
    </div>

    <p className="mt-10 text-center text-slate-500 text-sm">
      Don't have an account?{" "}
      <Link
        to="/register"
        className="text-indigo-600 font-bold no-underline hover:underline"
      >
        Create one
      </Link>
    </p>
  </AuthFormPanel>
);
