import { z } from "zod";

export const inquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  company: z
    .string()
    .min(2, { message: "Company name must be at least 2 characters." }),
  phone: z.string().regex(/^(?:\+91|91)?[6-9]\d{9}$/, {
    message:
      "Please enter a valid Indian phone number (10 digits starting with 6-9).",
  }),
  inquiry_type: z.string({
    required_error: "Please select an inquiry type.",
  }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters." }),
});
