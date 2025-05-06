import { z } from "zod";

export const planSchema = z.object({
  name: z.string().min(1, "Name is required"),
  duration_in_months: z.number().int().min(1),
  price: z.number().min(0),
  discount_percentage: z.number().min(0).max(100).optional(),
  is_popular: z.boolean().optional(),
  is_active: z.boolean().optional(),
  plan_tier: z.enum(["free", "standard", "premium", "elite"]),
  features: z
    .array(z.any(), { required_error: "Features must be an array" })
    .min(1, "Features must contain at least one item"),
});
