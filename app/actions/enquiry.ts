"use server";

import { connectDB } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";
import { EnquirySchema } from "@/lib/validation/enquiry";

export type EnquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function submitEnquiry(
  _prev: EnquiryState,
  formData: FormData
): Promise<EnquiryState> {
  const raw = Object.fromEntries(formData.entries());
  const parsed = EnquirySchema.safeParse({
    name: raw.name,
    email: raw.email,
    company: raw.company ?? "",
    budget: raw.budget ?? "undecided",
    service: raw.service ?? "",
    message: raw.message,
    website: raw.website ?? "",
  });

  if (!parsed.success) {
    return {
      status: "error",
      message: parsed.error.issues[0]?.message ?? "Please check the form.",
    };
  }

  if (parsed.data.website) return { status: "success" };

  try {
    await connectDB();
    await Enquiry.create({
      name: parsed.data.name,
      email: parsed.data.email,
      company: parsed.data.company || undefined,
      budget: parsed.data.budget,
      service: parsed.data.service || undefined,
      message: parsed.data.message,
    });
    return {
      status: "success",
      message: "Thanks — we'll be in touch within one business day.",
    };
  } catch (err) {
    console.error("[enquiry] save failed", err);
    return {
      status: "error",
      message:
        "Something went wrong on our end. Please email hello@your-agency.com directly.",
    };
  }
}