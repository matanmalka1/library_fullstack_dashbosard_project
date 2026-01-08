import { z } from "zod";

export const bookFormSchema = z.object({
  title: z.string().trim().min(1, { message: "Title is required" }),
  author: z.string().trim().min(1, { message: "Author is required" }),
  isbn: z.string().trim().min(1, { message: "ISBN is required" }),
  price: z.coerce
    .number()
    .min(1, { message: "Price must be higher then $1" }),
  stock: z.coerce
    .number()
    .min(0, { message: "Stock must be 0 or higher" }),
  category: z.string().trim().min(1, { message: "Category is required" }),
  coverImage: z.string().trim().min(1, { message: "Cover image is required." }),
});
