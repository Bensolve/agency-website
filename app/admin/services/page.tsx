import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import { Service } from "@/models/Service";

async function togglePublished(formData: FormData) {
  "use server";
  const session = await getSession();
  if (!session) redirect("/admin/login");
  await connectDB();
  const service = await Service.findById(String(formData.get("id")));
  if (!service) return;
  service.published = !service.published;
  await service.save();
  revalidatePath("/admin/services");
}

type Row = {
  _id: string;
  slug: string;
  title: string;
  tagline: string;
  published: boolean;
};

async function load(): Promise<{ connected: boolean; rows: Row[] }> {
  try {
    await connectDB();
  } catch (error) {
    console.error(
      "Could not connect to the database while loading services.",
      error
    );
    return { connected: false, rows: [] };
  }

  const list = await Service.find().sort({ order: 1 }).lean();
  return {
    connected: true,
    rows: list.map((service) => ({
      _id: String(service._id),
      slug: service.slug,
      title: service.title,
      tagline: service.tagline,
      published: service.published,
    })),
  };
}

export default async function AdminServicesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { connected, rows } = await load();

  return (
    <div className="space-y-6">
      <h1 className="display-md">Services</h1>
      {!connected ? (
        <div className="rounded-sm border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          Database not connected. Run <code>pnpm seed</code> after setting{" "}
          <code>MONGODB_URI</code>.
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-sm border border-line p-8 text-center text-ink-soft">
          No services in the database yet. Run <code>pnpm seed</code>.
        </p>
      ) : (
        <div className="rounded-sm border border-line bg-paper">
          <ul className="divide-y divide-line">
            {rows.map((service) => (
              <li
                key={service._id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div>
                  <p className="font-medium">{service.title}</p>
                  <p className="text-sm text-ink-soft">
                    /{service.slug} · {service.tagline}
                  </p>
                </div>
                <form action={togglePublished}>
                  <input type="hidden" name="id" value={service._id} />
                  <button className="rounded-sm border border-line px-3 py-1 text-xs">
                    {service.published ? "Unpublish" : "Publish"}
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