import { useMemo, useState } from "react";
import { Edit3, FlaskConical, Plus, Search } from "lucide-react";

const drugTypes = [
  {
    drugTypeId: "DRUG-AMX-500",
    name: "Amoxicillin 500mg",
    description: "Broad-spectrum penicillin antibiotic for bacterial infections",
    category: "Antibiotic",
    regulatoryCode: "CDSCO-AMX-500",
    status: "Active",
    created: "1/10/2024",
    createdBy: "CDSCO Drug Registry Admin",
  },
  {
    drugTypeId: "DRUG-MET-500",
    name: "Metformin 500mg",
    description: "First-line medication for type 2 diabetes management",
    category: "Antidiabetic",
    regulatoryCode: "CDSCO-MET-500",
    status: "Active",
    created: "1/10/2024",
    createdBy: "CDSCO Drug Registry Admin",
  },
  {
    drugTypeId: "DRUG-ATV-020",
    name: "Atorvastatin 20mg",
    description: "Statin medication for lowering cholesterol levels",
    category: "Cardiovascular",
    regulatoryCode: "CDSCO-ATV-020",
    status: "Active",
    created: "1/10/2024",
    createdBy: "CDSCO West Zone Officer",
  },
  {
    drugTypeId: "DRUG-PCM-500",
    name: "Paracetamol 500mg",
    description: "Analgesic and antipyretic for pain and fever relief",
    category: "Analgesic",
    regulatoryCode: "CDSCO-PCM-500",
    status: "Active",
    created: "1/10/2024",
    createdBy: "State Drug Control Admin",
  },
];

export default function DrugRegistration() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredDrugs = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return drugTypes;

    return drugTypes.filter((drug) => {
      return (
        drug.drugTypeId.toLowerCase().includes(query) ||
        drug.name.toLowerCase().includes(query) ||
        drug.category.toLowerCase().includes(query) ||
        drug.regulatoryCode.toLowerCase().includes(query) ||
        drug.description.toLowerCase().includes(query) ||
        drug.createdBy.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <FlaskConical className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Drug Type Registry
              </h1>

              <p className="mt-2 text-lg leading-7 text-slate-500">
                Manage approved drug types and their regulatory codes
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" />
            New Drug Type
          </button>
        </div>

        {/* Search */}
        <div className="mb-7 max-w-md">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by drug type ID, name, code, category, or creator..."
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100/80">
                  <TableHead>Drug Type ID</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Description</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Regulatory Code</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Created By</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredDrugs.map((drug) => (
                  <tr
                    key={drug.drugTypeId}
                    className="border-b border-slate-300 transition last:border-b-0 hover:bg-blue-50/35"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-slate-600">
                        {drug.drugTypeId}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <p className="text-base font-semibold text-slate-950">
                        {drug.name}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <p className="max-w-[340px] truncate text-sm leading-5 text-slate-500">
                        {drug.description}
                      </p>
                    </td>

                    <td className="px-5 py-4 text-base font-medium text-slate-900">
                      {drug.category}
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono text-sm text-slate-500">
                        {drug.regulatoryCode}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                        {drug.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-base text-slate-500">
                      {drug.created}
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        {drug.createdBy}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-lg px-2 py-1 text-sm font-medium text-slate-950 transition hover:bg-slate-100"
                      >
                        <Edit3 className="h-4 w-4" />
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredDrugs.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      No drug types found for “{searchTerm}”.
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

function TableHead({ children }) {
  return (
    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
      {children}
    </th>
  );
}