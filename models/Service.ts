import { Schema, model, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    tagline: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Service = models.Service || model("Service", ServiceSchema);