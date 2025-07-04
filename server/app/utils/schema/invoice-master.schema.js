import { z } from "zod";

export const invoiceMasterSchema = z.object({
  application_id: z.string().uuid(),
  unit: z.string().min(1, "Unit is required"),
  internal_order_no: z.string().min(1, "Internal Order No is required"),
  invoice_no: z.string().min(1, "Invoice No is required"),
  date: z.string().date("Date is required"),

  invoice_quantity: z.string().min(1, "Invoice quantity is required"),

  delivery_date_with_ld: z
    .string()
    .date("Invalid date")
    .optional()
    .or(z.literal("")),
  delivery_date_without_ld: z
    .string()
    .date("Invalid date")
    .optional()
    .or(z.literal("")),

  supplied_quantity: z.coerce.number().int().nonnegative(),
  rejected_quantity: z.coerce.number().int().nonnegative(),
  accepted_quantity: z.coerce.number().int().nonnegative(),

  payment_received: z.coerce.number().int().nonnegative(),
  ld_deduction: z.coerce.number().int().default(0),

  payment_date: z.string().date("Payment Date is required"),
  days: z.coerce.number().int().nonnegative(),
});
