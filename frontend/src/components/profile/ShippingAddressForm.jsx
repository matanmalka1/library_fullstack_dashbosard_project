import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/auth/AuthContext";
import { shippingAddressSchema } from "../../validators/profile/shipping-address-schema";
import { FormField } from "../ui/FormField";
import { FormError } from "../ui/FormError";
import { FormSubmitButton } from "../ui/FormSubmitButton";

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
    resolver: zodResolver(shippingAddressSchema),
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
      // Check if all fields are empty or whitespace
      const isEmpty =
        !data.street?.trim() &&
        !data.city?.trim() &&
        !data.state?.trim() &&
        !data.zip?.trim() &&
        !data.country?.trim();

      const updatedUser = await authService.updateProfile({
        shippingAddress: isEmpty ? null : data,
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
      <FormError message={formError} />

      <FormField
        label="Street Address"
        error={errors.street?.message}
        inputProps={{ ...register("street"), placeholder: "123 Main Street" }}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="City"
          error={errors.city?.message}
          inputProps={{ ...register("city"), placeholder: "New York" }}
        />

        <FormField
          label="State/Province"
          error={errors.state?.message}
          inputProps={{ ...register("state"), placeholder: "NY" }}
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          label="ZIP/Postal Code"
          error={errors.zip?.message}
          inputProps={{ ...register("zip"), placeholder: "10001" }}
        />

        <FormField
          label="Country"
          error={errors.country?.message}
          inputProps={{ ...register("country"), placeholder: "United States" }}
        />
      </div>

      <FormSubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Address"}
      </FormSubmitButton>
      {saved && <p className="text-sm text-emerald-600 mt-2">Saved</p>}
    </form>
  );
};
