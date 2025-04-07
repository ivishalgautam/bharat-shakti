import { z } from "zod";

export const userSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters").max(50),
  email: z.string().email("Please enter a valid email address"),
  mobile_number: z.string().min(10, "Please enter a valid mobile number"),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  role: z.string().default("user"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  terms: z.literal(true, {
    errorMap: () => ({ message: "You must accept the terms and conditions" }),
  }),
});
