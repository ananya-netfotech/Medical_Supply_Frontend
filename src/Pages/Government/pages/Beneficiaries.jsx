import { useMemo, useState } from "react";
import { Search, UsersRound } from "lucide-react";

const beneficiaries = [
  {
    name: "66666666-0000-4000-8000-000000000002",
    abhaId: "–",
    ayushmanCard: "–",
    scheme: "PM-JAY",
    status: "Inactive",
    enrolled: "1/4/2024",
  },
  {
    name: "66666666-0000-4000-8000-000000000001",
    abhaId: "–",
    ayushmanCard: "–",
    scheme: "PM-JAY",
    status: "Inactive",
    enrolled: "1/3/2024",
  },
];

export default function Beneficiaries() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredBeneficiaries = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return beneficiaries;

    return beneficiaries.filter((beneficiary) => {
      return (
        beneficiary.name.toLowerCase().includes(query) ||
        beneficiary.abhaId.toLowerCase().includes(query) ||
        beneficiary.ayushmanCard.toLowerCase().includes(query) ||
        beneficiary.scheme.toLowerCase().includes(query) ||
        beneficiary.status.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Beneficiaries
            </h1>

            <p className="mt-2 text-lg leading-7 text-slate-500">
              PM-JAY and Ayushman Bharat enrolled beneficiaries
            </p>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-700">
            <UsersRound className="h-4 w-4" />
            {beneficiaries.length} enrolled
          </div>
        </div>

        {/* Search */}
        <div className="mb-7 max-w-md">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by name, ABHA ID, or card number..."
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[980px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-300 bg-white">
                  <TableHead>Name</TableHead>
                  <TableHead>ABHA ID</TableHead>
                  <TableHead>Ayushman Card</TableHead>
                  <TableHead>Scheme</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Enrolled</TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredBeneficiaries.map((beneficiary) => (
                  <tr
                    key={beneficiary.name}
                    className="border-b border-slate-300 transition last:border-b-0 hover:bg-blue-50/35"
                  >
                    <td className="px-3 py-3 text-base font-medium text-slate-950">
                      {beneficiary.name}
                    </td>

                    <td className="px-3 py-3 text-base text-slate-950">
                      {beneficiary.abhaId}
                    </td>

                    <td className="px-3 py-3 text-base text-slate-950">
                      {beneficiary.ayushmanCard}
                    </td>

                    <td className="px-3 py-3">
                      <span className="inline-flex rounded-lg border border-slate-300 bg-white px-3 py-1 text-sm font-medium text-slate-950">
                        {beneficiary.scheme}
                      </span>
                    </td>

                    <td className="px-3 py-3">
                      <StatusBadge status={beneficiary.status} />
                    </td>

                    <td className="px-3 py-3 text-base text-slate-500">
                      {beneficiary.enrolled}
                    </td>
                  </tr>
                ))}

                {filteredBeneficiaries.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      No beneficiaries found for “{searchTerm}”.
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
  const isActive = status === "Active";

  return (
    <span
      className={`inline-flex rounded-lg px-3 py-1 text-sm font-semibold ${
        isActive
          ? "bg-emerald-100 text-emerald-700"
          : "bg-slate-200/70 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function TableHead({ children }) {
  return (
    <th className="px-3 py-5 text-base font-semibold text-slate-950">
      {children}
    </th>
  );
}