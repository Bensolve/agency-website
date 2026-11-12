import { z } from "zod";

export const EnquirySchema = z.object({
  name: z.string().min(2, "Please enter your name.").max(120),
  email: z.string().email("Enter a valid email address."),
  company: z.string().max(160).optional().or(z.literal("")),
  budget: z
    .enum(["<5k", "5-15k", "15-30k", "30k+", "undecided"])
    .default("undecided"),
  service: z.string().max(120).optional(),
  message: z
    .string()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(5000),
  website: z.string().max(0).optional().or(z.literal("")),
});