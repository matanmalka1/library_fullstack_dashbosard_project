import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/auth/AuthContext";
import { passwordChangeSchema } from "../../validators/profile/password-change-schema";

export const PasswordChangeForm = ({ onSuccess, user }) => {
  const { user: authUser } = useAuth();
  const currentUser = user || authUser;
  const isOAuthUser = currentUser?.isOAuthUser;

  if (isOAuthUser) {
    return (
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
        <p className="text-sm text-blue-800 mb-2">
          <strong>Password changes not available</strong>
        </p>
        <p className="text-xs text-blue-700">
          You're signed in with a social account (Google/GitHub). To set a password for direct email login, please contact support.
        </p>
      </div>
    );
  }
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(passwordChangeSchema),
  });

  const onSubmit = async (data) => {
    setFormError("");
    setIsSubmitting(true);

    try {
      await authService.changePassword({
        userId: user.id,
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      onSuccess("Password changed successfully!");
      reset();
    } catch (error) {
      setFormError(error.message || "Failed to change password.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      {formError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {formError}
        </div>
      )}

      <div>
        <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
          Current Password
        </label>
        <input
          type="password"
          {...register("currentPassword")}
          className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
            errors.currentPassword ? "border-red-400" : "border-transparent"
          } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
          placeholder="••••••••"
        />
        {errors.currentPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.currentPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
          New Password
        </label>
        <input
          type="password"
          {...register("newPassword")}
          className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
            errors.newPassword ? "border-red-400" : "border-transparent"
          } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
          placeholder="••••••••"
        />
        {errors.newPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.newPassword.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
          Confirm New Password
        </label>
        <input
          type="password"
          {...register("confirmPassword")}
          className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
            errors.confirmPassword ? "border-red-400" : "border-transparent"
          } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
          placeholder="••••••••"
        />
        {errors.confirmPassword && (
          <p className="text-xs text-red-500 mt-1">
            {errors.confirmPassword.message}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="border-0 rounded-[14px] px-4 py-3 bg-indigo-600 text-white font-bold cursor-pointer shadow-[0_8px_16px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? "Updating..." : "Change Password"}
      </button>
    </form>
  );
};
