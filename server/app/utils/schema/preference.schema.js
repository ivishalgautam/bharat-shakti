import { z } from "zod";

export const preferenceSchema = z.object({
  name: z
    .string({ required_error: "Preference name is required." })
    .min(1, "Preference name is required."),
  category_ids: z.array(z.string().uuid()).default([]),
  subcategory_ids: z.array(z.string().uuid()).default([]),
  authority_ids: z.array(z.string().uuid()).default([]),
  city_ids: z.array(z.string().uuid()).default([]),
  industry_ids: z.array(z.string().uuid()).default([]),
  sector_ids: z.array(z.string().uuid()).default([]),
  state_ids: z.array(z.string().uuid()).default([]),
});
