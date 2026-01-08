import { z } from "zod";

export const checkoutShippingSchema = z.object({
  address: z.string().trim().min(1, { message: "Street address is required" }),
  city: z.string().trim().min(1, { message: "City is required" }),
  zip: z.string().trim().min(1, { message: "Zip code is required" }),
});
