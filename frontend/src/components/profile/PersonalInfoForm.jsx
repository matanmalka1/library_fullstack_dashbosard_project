import { useState } from "react";
import { useForm } from "react-hook-form";
import { usersService } from "../../services/UsersService";
import { useAuth } from "../../context/auth/AuthContext";

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
      const updatedUser = await usersService.updateProfile(user.id, {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
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
      {formError && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
          {formError}
        </div>
      )}

      <div>
        <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
          First Name
        </label>
        <input
          {...register("firstName", { required: "First name is required" })}
          className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
            errors.firstName ? "border-red-400" : "border-transparent"
          } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
          placeholder="John"
        />
        {errors.firstName && (
          <p className="text-xs text-red-500 mt-1">
            {errors.firstName.message}
          </p>
        )}
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
          Last Name
        </label>
        <input
          {...register("lastName", { required: "Last name is required" })}
          className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
            errors.lastName ? "border-red-400" : "border-transparent"
          } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
          placeholder="Doe"
        />
        {errors.lastName && (
          <p className="text-xs text-red-500 mt-1">{errors.lastName.message}</p>
        )}
      </div>

      <div>
        <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
          Email
        </label>
        <input
          type="email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address",
            },
          })}
          className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
            errors.email ? "border-red-400" : "border-transparent"
          } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
          placeholder="john@example.com"
        />
        {errors.email && (
          <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="border-0 rounded-[14px] px-4 py-3 bg-indigo-600 text-white font-bold cursor-pointer shadow-[0_8px_16px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? "Saving..." : "Save Changes"}
      </button>
      {saved && (
        <p className="text-sm text-emerald-600 mt-2">Saved</p>
      )}
    </form>
  );
};
