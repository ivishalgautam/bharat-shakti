import { z } from "zod";

export const TenderSchema = z.object({
  tender_value: z.number().multipleOf(0.01).optional().default(0),
  bid_number: z.string().default(""),
  dated: z.string().default(""),
  bid_end_date_time: z.coerce.date(),
  department: z.string().default(""),
  organisation: z.string().default(""),
  office: z.string().default(""),
  item_gem_arpts: z.string().default(""),
  quantity: z.string().default(""),
  uom: z.string().default(""),
  no_of_items: z.string().default(""),
  minimum_average_annual_turnover: z.string().default(""),
  years_of_past_experience: z.string().default(""),
  evaluation_method: z.string().default(""),
  emd_amount: z.string().default(""),
  ote_lte: z.string().default(""),
  epbg_percentage: z.string().default(""),
  consignee: z.string().default(""),
  delivery_days: z.string().default(""),
  distribution: z.string().default(""),
  pre_qualification_criteria: z.string().default(""),

  bid_to_ra_enabled: z.boolean().default(false),
  mse_exemption_for_turnover: z.boolean().default(false),
  save_to_my_business: z.boolean().default(false),
  splitting_applied: z.boolean().default(false),
  startup_exemption_for_turnover: z.boolean().default(false),

  state_id: z
    .union([z.object({ value: z.string(), label: z.string() }), z.null()])
    .optional()
    .transform((state_id) => (state_id ? state_id.value : null)),
  city_id: z
    .union([z.object({ value: z.string(), label: z.string() }), z.null()])
    .optional()
    .transform((city_id) => (city_id ? city_id.value : null)),
  category_id: z
    .union([z.object({ value: z.string(), label: z.string() }), z.null()])
    .optional()
    .transform((category_id) => (category_id ? category_id.value : null)),
  subcategory_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((subcategory_ids) => subcategory_ids.map(({ value }) => value))
    .default([]),
  authority_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((authority_ids) => authority_ids.map(({ value }) => value))
    .default([]),
  industry_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((industry_ids) => industry_ids.map(({ value }) => value))
    .default([]),
  sector_ids: z
    .array(z.object({ value: z.string(), label: z.string() }))
    .transform((sector_ids) => sector_ids.map(({ value }) => value))
    .default([]),
  keywords: z.array(z.string()).optional(),
  meta_title: z.string().default(""),
  meta_description: z.string().default(""),
  meta_keywords: z.string().default(""),
});
