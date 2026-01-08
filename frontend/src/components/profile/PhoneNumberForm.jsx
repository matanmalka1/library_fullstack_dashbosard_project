import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { authService } from "../../services/AuthService";
import { useAuth } from "../../context/auth/AuthContext";
import { phoneNumberSchema } from "../../validators/profile/phone-number-schema";
import { FormField } from "../ui/FormField";
import { FormError } from "../ui/FormError";
import { FormSubmitButton } from "../ui/FormSubmitButton";

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
    resolver: zodResolver(phoneNumberSchema),
    defaultValues: {
      phoneNumber: user?.phoneNumber || "",
    },
  });

  const onSubmit = async (data) => {
    setFormError("");
    setIsSubmitting(true);

    try {
      const updatedUser = await authService.updateProfile({
        phoneNumber: data.phoneNumber?.trim() || null,
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
      <FormError message={formError} />

      <FormField
        label="Phone Number"
        error={errors.phoneNumber?.message}
        helper="Optional - helps for order updates"
        inputProps={{
          ...register("phoneNumber"),
          type: "tel",
          placeholder: "+1 (555) 123-4567",
        }}
      />

      <FormSubmitButton type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save Phone Number"}
      </FormSubmitButton>
      {saved && <p className="text-sm text-emerald-600 mt-2">Saved</p>}
    </form>
  );
};
