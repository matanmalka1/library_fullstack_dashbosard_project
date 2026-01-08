import { z } from "zod";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

export const profilePictureSchema = z
  .instanceof(File, { message: "Please select an image file" })
  .refine((file) => file.type.startsWith("image/"), {
    message: "Please select an image file",
  })
  .refine((file) => file.size <= MAX_FILE_SIZE, {
    message: "Image must be under 2MB",
  });
