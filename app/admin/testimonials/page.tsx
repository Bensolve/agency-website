import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import { Testimonial } from "@/models/Testimonial";

async function togglePublished(formData: FormData) {
  "use server";
  const session = await getSession();
  if (!session) redirect("/admin/login");
  await connectDB();
  const testimonial = await Testimonial.findById(String(formData.get("id")));
  if (!testimonial) return;
  if (testimonial.isSample && !testimonial.published) return;
  testimonial.published = !testimonial.published;
  await testimonial.save();
  revalidatePath("/admin/testimonials");
}

type Row = {
  _id: string;
  authorName: string;
  authorRole: string;
  quote: string;
  isSample: boolean;
  published: boolean;
};

async function load(): Promise<{ connected: boolean; rows: Row[] }> {
  try {
    await connectDB();
  } catch (error) {
    console.error(
      "Could not connect to the database while loading testimonials.",
      error
    );
    return { connected: false, rows: [] };
  }

  const list = await Testimonial.find().sort({ order: 1 }).lean();
  return {
    connected: true,
    rows: list.map((testimonial) => ({
      _id: String(testimonial._id),
      authorName: testimonial.authorName,
      authorRole: testimonial.authorRole,
      quote: testimonial.quote,
      isSample: testimonial.isSample,
      published: testimonial.published,
    })),
  };
}

export default async function AdminTestimonialsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { connected, rows } = await load();

  return (
    <div className="space-y-6">
      <h1 className="display-md">Testimonials</h1>
      <p className="text-sm text-ink-soft">
        Never publish placeholder testimonials. Only publish quotes you have
        written permission to use.
      </p>

      {!connected ? (
        <div className="rounded-sm border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          Database not connected. Run <code>pnpm seed</code> after setting{" "}
          <code>MONGODB_URI</code>.
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-sm border border-line p-8 text-center text-ink-soft">
          No testimonials yet.
        </p>
      ) : (
        <div className="rounded-sm border border-line bg-paper">
          <ul className="divide-y divide-line">
            {rows.map((testimonial) => (
              <li
                key={testimonial._id}
                className="flex items-start justify-between gap-4 p-5"
              >
                <div>
                  <p className="font-medium">
                    {testimonial.authorName} ·{" "}
                    <span className="text-ink-soft">
                      {testimonial.authorRole}
                    </span>
                  </p>
                  <p className="mt-1 max-w-2xl text-sm text-ink-soft">
                    &ldquo;{testimonial.quote}&rdquo;
                  </p>
                  {testimonial.isSample && (
                    <p className="mt-2 inline-block rounded-full bg-accent/15 px-2 py-0.5 text-[10px] font-semibold uppercase text-accent">
                      sample
                    </p>
                  )}
                </div>
                <form action={togglePublished}>
                  <input
                    type="hidden"
                    name="id"
                    value={testimonial._id}
                  />
                  <button
                    disabled={testimonial.isSample && !testimonial.published}
                    className="shrink-0 rounded-sm border border-line px-3 py-1 text-xs disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {testimonial.published ? "Unpublish" : "Publish"}
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}