import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/auth/AuthContext";
import { bioSchema } from "../../validators/profile/bio-schema";
import { FormField } from "../ui/FormField";
import { FormError } from "../ui/FormError";
import { FormSubmitButton } from "../ui/FormSubmitButton";

export const BioForm = ({ user, onSuccess }) => {
  const { updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    resolver: zodResolver(bioSchema),
    defaultValues: {
      bio: user?.bio || "",
    },
  });

  const bioLength = watch("bio")?.length || 0;
  const maxLength = 500;

  const onSubmit = async (data) => {
    setFormError("");
    setIsSubmitting(true);

    try {
      const updatedUser = await authService.updateProfile({
        bio: data.bio?.trim() || null,
      });

      updateUser(updatedUser);
      onSuccess("Bio updated successfully!");
      reset(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setFormError(error.message || "Failed to update bio.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
      <FormError message={formError} />

      <FormField
        label={
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 block">
              About You
            </span>
            <span className="text-xs text-slate-500">
              {bioLength}/{maxLength}
            </span>
          </div>
        }
        labelClassName="mb-2"
        as="textarea"
        inputClassName="resize-none"
        error={errors.bio?.message}
        helper="Optional - displayed on your reviews and public profile"
        inputProps={{
          ...register("bio"),
          placeholder:
            "Tell other readers about yourself... (visible on your reviews)",
          rows: 4,
        }}
      />

      <FormSubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Bio"}
      </FormSubmitButton>
      {saved && <p className="text-sm text-emerald-600 mt-2">Saved</p>}
    </form>
  );
};
