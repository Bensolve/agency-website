import { NextResponse } from "next/server";
import { z } from "zod";
import { verifyCredentials } from "@/lib/auth";
import { createSession } from "@/lib/session";

const LoginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  const parsed = LoginSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 400 }
    );
  }

  const admin = await verifyCredentials(parsed.data.email, parsed.data.password);
  if (!admin) {
    await new Promise((r) => setTimeout(r, 350));
    return NextResponse.json(
      { error: "Invalid email or password." },
      { status: 401 }
    );
  }

  await createSession({
    sub: admin.id,
    email: admin.email,
    name: admin.name,
    role: admin.role,
  });

  return NextResponse.json({ ok: true });
}