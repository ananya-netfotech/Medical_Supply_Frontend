import { useMemo, useState } from "react";
import { AlertTriangle, Plus, Search } from "lucide-react";

const recalls = [
  {
    drugTypeId: "DRUG-AMX-500",
    licenseId: "LIC-SUN-AMX-001",
    manufacturerId: "MFG-SUN-002",
    unitId: "UNIT-0008",
    recallId: "RECALL-0001",
    reason:
      "Contamination detected during quality audit — potential microbial contamination identified in retained samples",
    status: "Active",
    timestamp: "5/1/2024, 10:30 AM",
  },
  {
    drugTypeId: "DRUG-PCM-500",
    licenseId: "LIC-CIP-PCM-001",
    manufacturerId: "MFG-CIP-001",
    unitId: "UNIT-0001",
    recallId: "RECALL-0002",
    reason:
      "Expired unit found in active pharmacy inventory and marked for regulatory recall review",
    status: "Active",
    timestamp: "5/3/2024, 2:15 PM",
  },
];

export default function BatchRecalls() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredRecalls = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return recalls;

    return recalls.filter((recall) => {
      return (
        recall.drugTypeId.toLowerCase().includes(query) ||
        recall.licenseId.toLowerCase().includes(query) ||
        recall.manufacturerId.toLowerCase().includes(query) ||
        recall.unitId.toLowerCase().includes(query) ||
        recall.recallId.toLowerCase().includes(query) ||
        recall.reason.toLowerCase().includes(query) ||
        recall.status.toLowerCase().includes(query) ||
        recall.timestamp.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <AlertTriangle className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Batch Recalls
              </h1>

              <p className="mt-2 text-lg leading-7 text-slate-500">
                Issue and manage medicine batch recalls (CDSCO)
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" />
            Issue Recall
          </button>
        </div>

        {/* Search */}
        <div className="mb-5 max-w-md">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by recall, unit, drug type, license, manufacturer, reason..."
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1500px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100/80">
                  <TableHead>Drug Type ID</TableHead>
                  <TableHead>License ID</TableHead>
                  <TableHead>Manufacturer ID</TableHead>
                  <TableHead>Unit ID</TableHead>
                  <TableHead>Recall ID</TableHead>
                  <TableHead>Reason</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredRecalls.map((recall) => (
                  <tr
                    key={recall.recallId}
                    className="border-b border-slate-300 transition last:border-b-0 hover:bg-blue-50/35"
                  >
                    <td className="px-5 py-5">
                      <span className="font-mono text-sm font-medium text-slate-600">
                        {recall.drugTypeId}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span className="font-mono text-sm text-slate-500">
                        {recall.licenseId}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span className="font-mono text-sm text-slate-500">
                        {recall.manufacturerId}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span className="font-mono text-sm font-medium text-slate-600">
                        {recall.unitId}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <span className="font-mono text-sm text-slate-500">
                        {recall.recallId}
                      </span>
                    </td>

                    <td className="px-5 py-5">
                      <p className="max-w-[460px] truncate text-base text-slate-500">
                        {recall.reason}
                      </p>
                    </td>

                    <td className="px-5 py-5">
                      <StatusBadge status={recall.status} />
                    </td>

                    <td className="px-5 py-5 text-base text-slate-500">
                      {recall.timestamp}
                    </td>

                    <td className="px-5 py-5">
                      <button
                        type="button"
                        className="inline-flex whitespace-nowrap rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-medium text-slate-950 shadow-sm transition hover:bg-slate-50"
                      >
                        Release
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredRecalls.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      No recall records found for “{searchTerm}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "border-emerald-300 bg-emerald-100 text-emerald-700",
    Released: "border-blue-300 bg-blue-100 text-blue-700",
    Closed: "border-slate-300 bg-slate-100 text-slate-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
        styles[status] || "border-slate-300 bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function TableHead({ children }) {
  return (
    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
      {children}
    </th>
  );
}