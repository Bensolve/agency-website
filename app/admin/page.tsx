import { connectDB } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";
import { Project } from "@/models/Project";
import { Service } from "@/models/Service";
import { getSession } from "@/lib/session";

type Dash = {
  connected: boolean;
  total: number;
  newCount: number;
  projectCount: number;
  serviceCount: number;
  recent: {
    _id: string;
    name: string;
    email: string;
    message: string;
    status: string;
    createdAt: Date | string;
  }[];
};

async function loadDashboard(): Promise<Dash> {
  try {
    await connectDB();
    const [total, newCount, projectCount, serviceCount, recent] =
      await Promise.all([
        Enquiry.countDocuments(),
        Enquiry.countDocuments({ status: "new" }),
        Project.countDocuments(),
        Service.countDocuments(),
        Enquiry.find().sort({ createdAt: -1 }).limit(6).lean(),
      ]);
    return {
      connected: true,
      total,
      newCount,
      projectCount,
      serviceCount,
      recent: recent.map((r) => ({
        _id: String(r._id),
        name: r.name,
        email: r.email,
        message: r.message,
        status: r.status,
        createdAt: r.createdAt,
      })),
    };
  } catch {
    return {
      connected: false,
      total: 0,
      newCount: 0,
      projectCount: 0,
      serviceCount: 0,
      recent: [],
    };
  }
}

export default async function AdminDashboard() {
  const session = await getSession();
  const d = await loadDashboard();

  return (
    <div className="space-y-8">
      <div>
        <p className="eyebrow">Dashboard</p>
        <h1 className="display-md mt-2">Welcome back, {session?.name}</h1>
      </div>

      {!d.connected && (
        <div className="rounded-sm border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          <p className="font-medium">Database not connected.</p>
          <p className="mt-1">
            Add <code>MONGODB_URI</code> to <code>.env.local</code> and restart{" "}
            <code>pnpm dev</code>. Your dashboard will populate automatically.
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {(
          [
            ["Total enquiries", d.total],
            ["New", d.newCount],
            ["Projects", d.projectCount],
            ["Services", d.serviceCount],
          ] as const
        ).map(([label, value]) => (
          <div
            key={label}
            className="rounded-sm border border-line bg-paper p-5"
          >
            <p className="text-sm text-ink-soft">{label}</p>
            <p className="mt-2 font-display text-4xl">{value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-sm border border-line bg-paper">
        <div className="border-b border-line p-5">
          <h2 className="font-medium">Latest enquiries</h2>
        </div>
        {d.recent.length === 0 ? (
          <p className="p-5 text-sm text-ink-soft">
            No enquiries yet. Submit the contact form to see one appear here.
          </p>
        ) : (
          <ul className="divide-y divide-line">
            {d.recent.map((e) => (
              <li
                key={e._id}
                className="flex flex-wrap items-center justify-between gap-3 p-5 text-sm"
              >
                <div>
                  <p className="font-medium">
                    {e.name} ·{" "}
                    <span className="text-ink-soft">{e.email}</span>
                  </p>
                  <p className="mt-1 text-ink-soft">{e.message.slice(0, 100)}…</p>
                </div>
                <span className="rounded-full bg-accent/15 px-3 py-1 text-xs font-semibold uppercase text-accent">
                  {e.status}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}