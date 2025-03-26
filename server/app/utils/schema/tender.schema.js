import { z } from "zod";

export const tenderSchema = z.object({
  name: z.string().default(""),
  tender_amount: z.coerce.number().int().default(0),
  // bid_start_date: z.coerce.date(),
  // bid_end_date: z.coerce.date(),
  bid_number: z.string().default(""),
  dated: z.string().default(""),
  bid_end_date_time: z.string().default(""),
  department: z.string().default(""),
  organisation: z.string().default(""),
  office: z.string().default(""),
  item_gem_parts: z.string().default(""),
  quantity: z.string().default(""),
  uom: z.string().default(""),
  no_of_items: z.string().default(""),
  minimum_average_annual_turnover: z.string().default(""),
  years_of_past_experience: z.string().default(""),
  evaluation_method: z.string().default(""),
  emd_amount: z.string().default(""),
  tender_value: z.string().default(""),
  ote_lte: z.string().default(""),
  epbg_percentage: z.string().default(""),
  buyer_specification_document: z.array(z.string()).optional(),
  drawing: z.array(z.string()).optional(),
  consignee: z.string().default(""),
  delivery_days: z.string().default(""),
  distribution: z.string().default(""),
  pre_qualification_criteria: z.string().default(""),

  bid_to_ra_enabled: z.coerce.boolean().default(false),
  mse_exemption_for_turnover: z.coerce.boolean().default(false),
  save_to_my_business: z.coerce.boolean().default(false),
  splitting_applied: z.coerce.boolean().default(false),
  startup_exemption_for_turnover: z.coerce.boolean().default(false),

  authority_ids: z.array(z.string().uuid()).default([]),
  city_ids: z.array(z.string().uuid()).default([]),
  keyword_ids: z.array(z.string().uuid()).default([]),
  sector_ids: z.array(z.string().uuid()).default([]),
  state_ids: z.array(z.string().uuid()).default([]),
  meta_title: z.string().default(""),
  meta_description: z.string().default(""),
  meta_keywords: z.string().default(""),
});
