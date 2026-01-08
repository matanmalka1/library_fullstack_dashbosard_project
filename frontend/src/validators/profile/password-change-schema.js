import { z } from "zod";

export const passwordChangeSchema = z
  .object({
    currentPassword: z
      .string()
      .trim()
      .min(1, { message: "Current password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    newPassword: z
      .string()
      .trim()
      .min(1, { message: "New password is required" })
      .min(6, { message: "Password must be at least 6 characters" }),
    confirmPassword: z
      .string()
      .trim()
      .min(1, { message: "Please confirm your password" }),
  })
  .refine((values) => values.newPassword === values.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
