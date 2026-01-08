import { z } from "zod";

export const bioSchema = z.object({
  bio: z.string().trim().max(500, {
    message: "Bio cannot exceed 500 characters",
  }),
});
