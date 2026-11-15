import { Schema, model, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true, trim: true },
    title: { type: String, required: true, trim: true },
    clientLabel: { type: String, required: true, trim: true },
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Project = models.Project || model("Project", ProjectSchema);