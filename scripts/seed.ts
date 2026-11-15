import dotenv from "dotenv";
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { Service } from "../models/Service";
import { Project } from "../models/Project";
import { Testimonial } from "../models/Testimonial";
import { Admin } from "../models/Admin";
import { fallbackServices, fallbackProjects } from "../lib/data/fallback";

dotenv.config({ path: ".env.local" });
dotenv.config();

async function seed() {
  const mongoUri = process.env.MONGODB_URI;
  const adminEmail = process.env.SEED_ADMIN_EMAIL?.trim().toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD;

  if (!mongoUri) {
    throw new Error("MONGODB_URI not set. Add it to .env.local first.");
  }
  if (!adminEmail || !adminPassword) {
    throw new Error(
      "Set SEED_ADMIN_EMAIL and SEED_ADMIN_PASSWORD in .env.local first."
    );
  }

  await mongoose.connect(mongoUri);
  console.log("Connected.");

  try {
    if ((await Service.countDocuments()) === 0) {
      await Service.insertMany(
        fallbackServices.map((service, index) => ({
          ...service,
          order: index + 1,
          published: true,
        }))
      );
    }

    if (fallbackProjects.length > 0 && (await Project.countDocuments()) === 0) {
      await Project.insertMany(
        fallbackProjects.map((project, index) => ({
          ...project,
          order: index + 1,
          published: true,
        }))
      );
    }

    const sampleTestimonials = [
      {
        authorName: "Sample Client",
        authorRole: "Head of Marketing",
        company: "Sample Co.",
        order: 1,
        isSample: true,
        quote:
          "Placeholder copy. Replace with a real, attributable quote before launch.",
        published: false,
      },
      {
        authorName: "Sample Client",
        authorRole: "Founder",
        company: "Sample Studio",
        order: 2,
        isSample: true,
        quote:
          "Placeholder testimonial — do not publish until you have written permission.",
        published: false,
      },
      {
        authorName: "Sample Client",
        authorRole: "Product Lead",
        company: "Sample Labs",
        order: 3,
        isSample: true,
        quote: "Placeholder testimonial. Use real client words only.",
        published: false,
      },
    ];

    if ((await Testimonial.countDocuments()) === 0) {
      await Testimonial.insertMany(sampleTestimonials);
    }

    const passwordHash = await bcrypt.hash(adminPassword, 12);
    await Admin.updateOne(
      { email: adminEmail },
      {
        $setOnInsert: {
          email: adminEmail,
          passwordHash,
          name: "Agency Admin",
          role: "admin",
        },
      },
      { upsert: true }
    );

    console.log("Seed complete.");
    console.log(`Admin login email: ${adminEmail}`);
  } finally {
    await mongoose.disconnect();
  }
}

seed().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});