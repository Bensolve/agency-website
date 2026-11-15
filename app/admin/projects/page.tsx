import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/mongodb";
import { getSession } from "@/lib/session";
import { Project } from "@/models/Project";

async function togglePublished(formData: FormData) {
  "use server";
  const session = await getSession();
  if (!session) redirect("/admin/login");
  await connectDB();
  const project = await Project.findById(String(formData.get("id")));
  if (!project) return;
  project.published = !project.published;
  await project.save();
  revalidatePath("/admin/projects");
}

type Row = {
  _id: string;
  slug: string;
  title: string;
  clientLabel: string;
  published: boolean;
};

async function load(): Promise<{ connected: boolean; rows: Row[] }> {
  try {
    await connectDB();
  } catch (error) {
    console.error(
      "Could not connect to the database while loading projects.",
      error
    );
    return { connected: false, rows: [] };
  }

  const list = await Project.find().sort({ order: 1 }).lean();
  return {
    connected: true,
    rows: list.map((project) => ({
      _id: String(project._id),
      slug: project.slug,
      title: project.title,
      clientLabel: project.clientLabel,
      published: project.published,
    })),
  };
}

export default async function AdminProjectsPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { connected, rows } = await load();

  return (
    <div className="space-y-6">
      <h1 className="display-md">Projects</h1>
      {!connected ? (
        <div className="rounded-sm border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          Database not connected. Run <code>pnpm seed</code> after setting{" "}
          <code>MONGODB_URI</code>.
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-sm border border-line p-8 text-center text-ink-soft">
          No projects in the database yet. Run <code>pnpm seed</code>.
        </p>
      ) : (
        <div className="rounded-sm border border-line bg-paper">
          <ul className="divide-y divide-line">
            {rows.map((project) => (
              <li
                key={project._id}
                className="flex items-center justify-between gap-4 p-5"
              >
                <div>
                  <p className="font-medium">{project.title}</p>
                  <p className="text-sm text-ink-soft">
                    /{project.slug} · {project.clientLabel}
                  </p>
                </div>
                <form action={togglePublished}>
                  <input type="hidden" name="id" value={project._id} />
                  <button className="rounded-sm border border-line px-3 py-1 text-xs">
                    {project.published ? "Unpublish" : "Publish"}
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