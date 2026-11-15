import { Schema, model, models } from "mongoose";

const TestimonialSchema = new Schema(
  {
    authorName: { type: String, required: true, trim: true },
    authorRole: { type: String, required: true, trim: true },
    company: { type: String, trim: true },
    quote: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    isSample: { type: Boolean, default: true },
    published: { type: Boolean, default: false },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export const Testimonial =
  models.Testimonial || model("Testimonial", TestimonialSchema);