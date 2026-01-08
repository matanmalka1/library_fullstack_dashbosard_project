import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/auth/AuthContext";
import { bioSchema } from "../../validators/bio-schema";

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
      {formError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {formError}
        </div>
      )}

      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 block">
            About You
          </label>
          <span className="text-xs text-slate-500">
            {bioLength}/{maxLength}
          </span>
        </div>
        <textarea
          {...register("bio")}
          className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
            errors.bio ? "border-red-400" : "border-transparent"
          } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200 resize-none`}
          placeholder="Tell other readers about yourself... (visible on your reviews)"
          rows={4}
        />
        {errors.bio && (
          <p className="text-xs text-red-500 mt-1">{errors.bio.message}</p>
        )}
        <p className="text-xs text-slate-500 mt-1">
          Optional - displayed on your reviews and public profile
        </p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="border-0 rounded-[14px] px-4 py-3 bg-indigo-600 text-white font-bold cursor-pointer shadow-[0_8px_16px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? "Saving..." : "Save Bio"}
      </button>
      {saved && <p className="text-sm text-emerald-600 mt-2">Saved</p>}
    </form>
  );
};
