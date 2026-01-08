import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/auth/AuthContext";
import { personalInfoSchema } from "../../validators/profile/personal-info-schema";
import { FormField } from "../ui/FormField";
import { FormError } from "../ui/FormError";
import { FormSubmitButton } from "../ui/FormSubmitButton";

export const PersonalInfoForm = ({ user, onSuccess }) => {
  const { updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
    },
  });

  const onSubmit = async (data) => {
    setFormError("");
    setIsSubmitting(true);

    try {
      const updatedUser = await authService.updateProfile({
        firstName: data.firstName.trim(),
        lastName: data.lastName.trim(),
      });

      updateUser(updatedUser);
      onSuccess("Profile updated successfully!");
      reset(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setFormError(error.message || "Failed to update profile.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <FormError message={formError} />

      <FormField
        label="First Name"
        error={errors.firstName?.message}
        inputProps={{ ...register("firstName"), placeholder: "John" }}
      />

      <FormField
        label="Last Name"
        error={errors.lastName?.message}
        inputProps={{ ...register("lastName"), placeholder: "Doe" }}
      />

      <FormField
        label="Email"
        error={errors.email?.message}
        inputProps={{
          ...register("email"),
          type: "email",
          placeholder: "john@example.com",
        }}
      />

      <FormSubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Changes"}
      </FormSubmitButton>
      {saved && <p className="text-sm text-emerald-600 mt-2">Saved</p>}
    </form>
  );
};
