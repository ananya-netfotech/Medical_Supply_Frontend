import { Eye } from "lucide-react";

const rows = [
  {
    batch: "SUN-PARA-0426",
    medicine: "Paracetamol 500mg",
    inventory: "34,500",
    status: "Active",
    risk: "Low",
  },
  {
    batch: "SUN-AMOX-1125",
    medicine: "Amoxicillin 250mg",
    inventory: "18,000",
    status: "Under Review",
    risk: "Medium",
  },
  {
    batch: "SUN-INS-0926",
    medicine: "Human Insulin",
    inventory: "0",
    status: "Recall Watch",
    risk: "High",
  },
  {
    batch: "SUN-CET-0625",
    medicine: "Cetirizine Tablets",
    inventory: "62,000",
    status: "Near Expiry",
    risk: "Medium",
  },
];

export default function ManufBatchTable() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5">
        <h2 className="text-lg font-bold text-slate-950">
          Key Batch Monitoring
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Important batches with current stock and compliance risk.
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50 text-xs uppercase tracking-wide text-slate-500">
              <th className="px-5 py-4">Batch</th>
              <th className="px-5 py-4">Medicine</th>
              <th className="px-5 py-4">Inventory</th>
              <th className="px-5 py-4">Status</th>
              <th className="px-5 py-4">Risk</th>
              <th className="px-5 py-4 text-right">Action</th>
            </tr>
          </thead>

          <tbody>
            {rows.map((item) => (
              <tr
                key={item.batch}
                className="border-b border-slate-100 last:border-0 hover:bg-slate-50/70"
              >
                <td className="px-5 py-4 font-semibold text-slate-900">
                  {item.batch}
                </td>
                <td className="px-5 py-4 text-slate-600">{item.medicine}</td>
                <td className="px-5 py-4 text-slate-600">{item.inventory}</td>
                <td className="px-5 py-4">
                  <Badge value={item.status} />
                </td>
                <td className="px-5 py-4">
                  <Badge value={item.risk} />
                </td>
                <td className="px-5 py-4">
                  <div className="flex justify-end">
                    <button className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:bg-slate-50">
                      <Eye className="h-4 w-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Badge({ value }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Low: "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    "Recall Watch": "bg-rose-50 text-rose-700 border-rose-200",
    High: "bg-rose-50 text-rose-700 border-rose-200",
    "Near Expiry": "bg-amber-50 text-amber-700 border-amber-200",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-xs font-bold ${
        styles[value] || "bg-slate-100 text-slate-600 border-slate-200"
      }`}
    >
      {value}
    </span>
  );
}