import { z } from "zod";

export const subcategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  category_id: z.string().uuid({ message: "Invalid category ID" }),
  is_featured: z.coerce.boolean().default(false),
  image: z.array(z.string()).optional(),
  meta_title: z.string().optional(),
  meta_description: z.string().optional(),
  meta_keywords: z.string().optional(),
});
