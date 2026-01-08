import { z } from "zod";

const requiredMinLength = (minLength, message) =>
  z
    .string()
    .trim()
    .min(minLength, { message });

export const shippingAddressSchema = z.object({
  street: requiredMinLength(3, "Street must be at least 3 characters"),
  city: requiredMinLength(2, "City must be at least 2 characters"),
  state: requiredMinLength(2, "State must be at least 2 characters"),
  zip: requiredMinLength(3, "Zip code must be at least 3 characters"),
  country: requiredMinLength(2, "Country must be at least 2 characters"),
});
