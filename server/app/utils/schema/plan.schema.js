import { z } from "zod";

export const planSchema = z.object({
  name: z
    .string({
      required_error: "Plan name is required",
    })
    .min(1, "Plan name cannot be empty"),
  duration_in_months: z
    .number({
      required_error: "Duration is required",
      invalid_type_error: "Duration must be a number",
    })
    .int()
    .positive("Duration must be a positive integer"),
  price: z
    .number({
      required_error: "Price is required",
      invalid_type_error: "Price must be a number",
    })
    .nonnegative("Price cannot be negative"),
  discount_percentage: z
    .number({
      invalid_type_error: "Discount must be a number",
    })
    .min(0, "Discount cannot be negative")
    .max(100, "Discount cannot be more than 100")
    .optional()
    .default(0),
  is_popular: z.boolean().optional().default(false),
  is_active: z.boolean().optional().default(true),
  plan_tier: z
    .enum(["free", "standard", "premium", "elite"], {
      required_error: "Tier is required",
      invalid_type_error: "Tier must be one of: free, standard, premium, elite",
    })
    .default("standard"),
  features: z
    .array(z.any(), { required_error: "Features must be an array" })
    .min(1, "Features must contain at least one item"),
});
