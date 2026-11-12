import { Schema, model, models } from "mongoose";

const EnquirySchema = new Schema(
  {
    name: { type: String, required: true, trim: true, maxlength: 120 },
    email: { type: String, required: true, lowercase: true, trim: true },
    company: { type: String, trim: true, maxlength: 160 },
    budget: {
      type: String,
      enum: ["<5k", "5-15k", "15-30k", "30k+", "undecided"],
      default: "undecided",
    },
    service: { type: String, trim: true },
    message: { type: String, required: true, maxlength: 5000 },
    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "won", "archived"],
      default: "new",
      index: true,
    },
    source: { type: String, default: "website" },
  },
  { timestamps: true }
);

EnquirySchema.index({ createdAt: -1 });

export const Enquiry = models.Enquiry || model("Enquiry", EnquirySchema);