import "server-only";
import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/mongodb";
import { Admin } from "@/models/Admin";

export type AuthedAdmin = {
  id: string;
  email: string;
  name: string;
  role: string;
};

export async function verifyCredentials(
  email: string,
  password: string
): Promise<AuthedAdmin | null> {
  const normalized = email.toLowerCase().trim();

  // Development-only bypass: no DB required.
  // Remove this block (or the env vars) before production.
  if (
    process.env.NODE_ENV !== "production" &&
    process.env.DEV_ADMIN_EMAIL &&
    process.env.DEV_ADMIN_PASSWORD &&
    normalized === process.env.DEV_ADMIN_EMAIL.toLowerCase() &&
    password === process.env.DEV_ADMIN_PASSWORD
  ) {
    return {
      id: "dev-admin",
      email: normalized,
      name: "Dev Admin",
      role: "admin",
    };
  }

  try {
    await connectDB();
  } catch {
    return null;
  }

  const admin = await Admin.findOne({ email: normalized }).lean();
  if (!admin) return null;

  const ok = await bcrypt.compare(password, admin.passwordHash);
  if (!ok) return null;

  return {
    id: String(admin._id),
    email: admin.email,
    name: admin.name,
    role: admin.role,
  };
}