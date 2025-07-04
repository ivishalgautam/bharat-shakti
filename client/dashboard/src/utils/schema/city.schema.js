import { z } from "zod";

export const citySchema = z.object({
  name: z
    .string({ required_error: "Name is required" })
    .min(1, "Name is required"),
  is_featured: z.coerce.boolean().default(false),
  files: z
    .array(
      z.object({
        name: z.string().min(1, "File name is required"),
        size: z.number().max(5 * 1024 * 1024, "File size must be under 5MB"), // Max 5MB
        type: z.enum(["image/png", "image/jpeg", "image/jpg"]),
      })
    )
    .optional(),
  state_id: z
    .object({ value: z.string(), label: z.string() })
    .transform((state_id) => state_id.value)
    .default(null),
  meta_title: z.string().default(""),
  meta_description: z.string().default(""),
  meta_keywords: z.string().default(""),
});
