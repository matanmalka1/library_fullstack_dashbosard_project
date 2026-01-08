import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/auth/AuthContext";
import { passwordChangeSchema } from "../../validators/profile/password-change-schema";
import { FormField } from "../ui/FormField";
import { FormError } from "../ui/FormError";
import { FormSubmitButton } from "../ui/FormSubmitButton";

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
      <FormError message={formError} />

      <FormField
        label="Current Password"
        error={errors.currentPassword?.message}
        inputProps={{
          ...register("currentPassword"),
          type: "password",
          placeholder: "••••••••",
        }}
      />

      <FormField
        label="New Password"
        error={errors.newPassword?.message}
        inputProps={{
          ...register("newPassword"),
          type: "password",
          placeholder: "••••••••",
        }}
      />

      <FormField
        label="Confirm New Password"
        error={errors.confirmPassword?.message}
        inputProps={{
          ...register("confirmPassword"),
          type: "password",
          placeholder: "••••••••",
        }}
      />

      <FormSubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Updating..." : "Change Password"}
      </FormSubmitButton>
    </form>
  );
};
