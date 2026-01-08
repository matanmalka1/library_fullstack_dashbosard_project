import { z } from "zod";

export const phoneNumberSchema = z.object({
  phoneNumber: z
    .string()
    .trim()
    .refine(
      (value) => value.length === 0 || value.length >= 10,
      "Phone number must be at least 10 characters"
    )
    .regex(/^[\d\s()+-]*$/, {
      message:
        "Phone number can only contain digits, spaces, and +-() characters",
    }),
});
