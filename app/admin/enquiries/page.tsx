import { revalidatePath } from "next/cache";
import { connectDB } from "@/lib/mongodb";
import { Enquiry } from "@/models/Enquiry";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

async function updateStatus(formData: FormData) {
  "use server";
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const id = String(formData.get("id"));
  const status = String(formData.get("status"));
  const allowed = ["new", "contacted", "qualified", "won", "archived"];
  if (!allowed.includes(status)) return;
  await connectDB();
  await Enquiry.findByIdAndUpdate(id, { status });
  revalidatePath("/admin/enquiries");
}

type Row = {
  _id: string;
  name: string;
  email: string;
  message: string;
  budget: string;
  status: string;
  createdAt: Date | string;
};

async function loadEnquiries(): Promise<{ connected: boolean; rows: Row[] }> {
  try {
    await connectDB();
    const list = await Enquiry.find().sort({ createdAt: -1 }).lean();
    return {
      connected: true,
      rows: list.map((e) => ({
        _id: String(e._id),
        name: e.name,
        email: e.email,
        message: e.message,
        budget: e.budget,
        status: e.status,
        createdAt: e.createdAt,
      })),
    };
  } catch {
    return { connected: false, rows: [] };
  }
}

export default async function EnquiriesPage() {
  const session = await getSession();
  if (!session) redirect("/admin/login");
  const { connected, rows } = await loadEnquiries();

  return (
    <div className="space-y-6">
      <h1 className="display-md">Enquiries</h1>

      {!connected ? (
        <div className="rounded-sm border border-amber-300 bg-amber-50 p-5 text-sm text-amber-900">
          Database not connected. Add <code>MONGODB_URI</code> to{" "}
          <code>.env.local</code> and restart.
        </div>
      ) : rows.length === 0 ? (
        <p className="rounded-sm border border-line p-8 text-center text-ink-soft">
          No enquiries yet.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-sm border border-line bg-paper">
          <table className="w-full text-left text-sm">
            <thead className="border-b border-line bg-ink/5">
              <tr>
                <th className="p-4">Contact</th>
                <th className="p-4">Message</th>
                <th className="p-4">Budget</th>
                <th className="p-4">Status</th>
                <th className="p-4">Received</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-line">
              {rows.map((e) => (
                <tr key={e._id}>
                  <td className="p-4 align-top">
                    <p className="font-medium">{e.name}</p>
                    <a
                      className="text-ink-soft underline"
                      href={`mailto:${e.email}`}
                    >
                      {e.email}
                    </a>
                  </td>
                  <td className="max-w-md p-4 align-top text-ink-soft">
                    {e.message}
                  </td>
                  <td className="p-4 align-top">{e.budget}</td>
                  <td className="p-4 align-top">
                    <form action={updateStatus} className="flex gap-2">
                      <input type="hidden" name="id" value={e._id} />
                      <select
                        name="status"
                        defaultValue={e.status}
                        className="rounded-sm border border-line px-2 py-1 text-xs"
                      >
                        {["new", "contacted", "qualified", "won", "archived"].map(
                          (s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          )
                        )}
                      </select>
                      <button className="rounded-sm bg-ink px-3 py-1 text-xs text-paper">
                        Save
                      </button>
                    </form>
                  </td>
                  <td className="p-4 align-top text-ink-soft">
                    {new Date(e.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}