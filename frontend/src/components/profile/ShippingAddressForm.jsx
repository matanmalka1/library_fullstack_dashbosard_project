import { useState } from "react";
import { useForm } from "react-hook-form";
import { usersService } from "../../services/UsersService";
import { useAuth } from "../../context/auth/AuthContext";

export const ShippingAddressForm = ({ user, onSuccess }) => {
  const { updateUser } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [saved, setSaved] = useState(false);
  const defaultAddress = user?.defaultShippingAddress || {};

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onChange",
    defaultValues: {
      street: defaultAddress.street || "",
      city: defaultAddress.city || "",
      state: defaultAddress.state || "",
      zip: defaultAddress.zip || "",
      country: defaultAddress.country || "",
    },
  });

  const onSubmit = async (data) => {
    setFormError("");
    setIsSubmitting(true);

    try {
      // Check if all fields are empty
      const isEmpty = !data.street && !data.city && !data.state && !data.zip && !data.country;

      const updatedUser = await usersService.updateProfile(user.id, {
        defaultShippingAddress: isEmpty ? null : data,
      });

      updateUser(updatedUser);
      onSuccess("Shipping address updated successfully!");
      reset(data);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      setFormError(error.message || "Failed to update address.");
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
          Street Address
        </label>
        <input
          {...register("street")}
          className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
            errors.street ? "border-red-400" : "border-transparent"
          } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
          placeholder="123 Main Street"
        />
        {errors.street && (
          <p className="text-xs text-red-500 mt-1">{errors.street.message}</p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
            City
          </label>
          <input
            {...register("city")}
            className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
              errors.city ? "border-red-400" : "border-transparent"
            } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
            placeholder="New York"
          />
          {errors.city && (
            <p className="text-xs text-red-500 mt-1">{errors.city.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
            State/Province
          </label>
          <input
            {...register("state")}
            className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
              errors.state ? "border-red-400" : "border-transparent"
            } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
            placeholder="NY"
          />
          {errors.state && (
            <p className="text-xs text-red-500 mt-1">{errors.state.message}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
            ZIP/Postal Code
          </label>
          <input
            {...register("zip")}
            className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
              errors.zip ? "border-red-400" : "border-transparent"
            } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
            placeholder="10001"
          />
          {errors.zip && (
            <p className="text-xs text-red-500 mt-1">{errors.zip.message}</p>
          )}
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.12em] font-bold text-slate-600 mb-2 block">
            Country
          </label>
          <input
            {...register("country")}
            className={`w-full px-4 py-3 bg-slate-50 rounded-[14px] border ${
              errors.country ? "border-red-400" : "border-transparent"
            } text-sm outline-none focus:border-indigo-400/60 focus:ring-2 focus:ring-indigo-200`}
            placeholder="United States"
          />
          {errors.country && (
            <p className="text-xs text-red-500 mt-1">{errors.country.message}</p>
          )}
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="border-0 rounded-[14px] px-4 py-3 bg-indigo-600 text-white font-bold cursor-pointer shadow-[0_8px_16px_rgba(79,70,229,0.2)] transition-colors hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed mt-4"
      >
        {isSubmitting ? "Saving..." : "Save Address"}
      </button>
      {saved && (
        <p className="text-sm text-emerald-600 mt-2">Saved</p>
      )}
    </form>
  );
};
