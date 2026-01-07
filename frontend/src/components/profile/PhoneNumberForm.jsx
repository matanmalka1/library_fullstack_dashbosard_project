import { useState } from "react";
import { useForm } from "react-hook-form";
import { usersService } from "../../services/UsersService";
import { useAuth } from "../../context/auth/AuthContext";

export const PhoneNumberForm = ({ user, onSuccess }) => {
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
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const onSubmit = async (data) => {
    setFormError("");
    setIsSubmitting(true);

    try {
      const updatedUser = await usersService.updateProfile(user.id, {
        phoneNumber: data.phoneNumber || null,
      });

      updateUser(updatedUser);
      onSuccess("Phone number updated successfully!");
      reset(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setFormError(error.message || "Failed to update phone number.");
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
          Phone Number
        </label>
        <input
          type="tel"
          {...register("phoneNumber", {
            pattern: {
              value: /^[\d\s\-\+\(\)]*$/,
              message: "Please enter a valid phone number",
            },
          })}
          className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
            errors.phoneNumber ? "border-red-400" : "border-transparent"
          } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
          placeholder="+1 (555) 123-4567"
        />
        {errors.phoneNumber && (
          <p className="text-xs text-red-500 mt-1">{errors.phoneNumber.message}</p>
        )}
        <p className="text-xs text-slate-500 mt-1">Optional - helps for order updates</p>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="border-0 rounded-[14px] px-4 py-3 bg-indigo-600 text-white font-bold cursor-pointer shadow-[0_8px_16px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? "Saving..." : "Save Phone Number"}
      </button>
      {saved && (
        <p className="text-sm text-emerald-600 mt-2">Saved</p>
      )}
    </form>
  );
};
