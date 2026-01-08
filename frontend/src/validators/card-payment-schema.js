import { z } from "zod";

const digitsOnly = (value) => value.replace(/\D/g, "");

const luhnCheck = (digitsStr) => {
  if (!digitsStr) return false;
  let sum = 0;
  let shouldDouble = false;
  for (let i = digitsStr.length - 1; i >= 0; i -= 1) {
    let digit = parseInt(digitsStr[i], 10);
    if (Number.isNaN(digit)) return false;
    if (shouldDouble) {
      digit *= 2;
      if (digit > 9) digit -= 9;
    }
    sum += digit;
    shouldDouble = !shouldDouble;
  }
  return sum % 10 === 0;
};

export const cardPaymentSchema = z.object({
  cardName: z.string().trim().min(1, { message: "Name on card is required" }),
  cardNumber: z
    .string()
    .trim()
    .min(1, { message: "Card number is required" })
    .refine((value) => digitsOnly(value).length === 16, {
      message: "Card number must be 16 digits",
    })
    .refine((value) => luhnCheck(digitsOnly(value)), {
      message: "Invalid card number",
    }),
  cardExpiry: z
    .string()
    .trim()
    .min(1, { message: "Expiration is required" })
    .regex(/^(0[1-9]|1[0-2])\/(\d{2})$/, { message: "Use MM/YY format" }),
  cardCvc: z
    .string()
    .trim()
    .min(1, { message: "CVC is required" })
    .regex(/^\d{3,4}$/, { message: "CVC must be 3-4 digits" }),
});
