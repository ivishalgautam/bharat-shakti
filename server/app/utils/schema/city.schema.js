import { z } from "zod";

export const citySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  is_featured: z.coerce.boolean().default(false),
  meta_title: z.string().default(""),
  meta_description: z.string().default(""),
  meta_keywords: z.string().default(""),
});
