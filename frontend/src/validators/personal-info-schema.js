import { z } from "zod";

export const personalInfoSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(1, { message: "First name is required" })
    .regex(/^[A-Za-z]{2,15}$/, {
      message: "First name must be 2-15 letters with no spaces",
    }),
  lastName: z
    .string()
    .trim()
    .min(1, { message: "Last name is required" })
    .regex(/^[A-Za-z]{2,15}$/, {
      message: "Last name must be 2-15 letters with no spaces",
    }),
  email: z
    .string()
    .trim()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" }),
});
