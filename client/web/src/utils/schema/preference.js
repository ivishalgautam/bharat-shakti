import { z } from "zod";

export const preferenceSchema = z.object({
  name: z
    .string({ required_error: "Preference name is required." })
    .min(1, "Preference name is required."),
  category_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((category_ids) => category_ids.map(({ value }) => value))
    .default([]),
  subcategory_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((subcategory_ids) => subcategory_ids.map(({ value }) => value))
    .default([]),
  authority_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((authority_ids) => authority_ids.map(({ value }) => value))
    .default([]),
  city_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((city_ids) => city_ids.map(({ value }) => value))
    .default([]),
  industry_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((industry_ids) => industry_ids.map(({ value }) => value))
    .default([]),
  sector_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((sector_ids) => sector_ids.map(({ value }) => value))
    .default([]),
  state_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((state_ids) => state_ids.map(({ value }) => value))
    .default([]),
});
