import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod";

export const userFormSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters")
      .max(50),
    email: z.string().email("Please enter a valid email address"),
    mobile_number: z
      .string({ required_error: "Mobile number is required." })
      .min(1, { message: "Mobile number is required." }),
    first_name: z.string().optional(),
    last_name: z.string().optional(),
    password: z.string().min(8, "Password must be at least 8 characters"),
    terms: z.literal(true, {
      errorMap: () => ({ message: "You must accept the terms and conditions" }),
    }),
  })
  .refine((data) => isValidPhoneNumber(data.mobile_number), {
    path: ["mobile_number"],
    message: "Invalid phone number",
  });

export const otpSchema = z.object({
  otp: z.string().min(6, "OTP must be 6 digits").max(6, "OTP must be 6 digits"),
});
