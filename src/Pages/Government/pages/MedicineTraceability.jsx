import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Building2,
  Factory,
  MapPin,
  Search,
  Store,
  Truck,
} from "lucide-react";

const transfers = [
  {
    unitId: "cccccccc...",
    from: {
      name: "North India Pharma Distributors",
      type: "Pharmacy",
      location: "Delhi Branch",
    },
    to: {
      name: "MedPlus Health Services",
      type: "Pharmacy",
      location: "Noida Sector 62",
    },
    status: "Completed",
    timestamp: "4/22/2024, 5:30:00 AM",
    remarks: "Delivered to pharmacy",
  },
  {
    unitId: "cccccccc...",
    from: {
      name: "Cipla Limited",
      type: "Manufacturer",
      location: "Mumbai Manufacturing Unit",
    },
    to: {
      name: "North India Pharma Distributors",
      type: "Pharmacy",
      location: "Delhi Distribution Branch",
    },
    status: "Completed",
    timestamp: "4/18/2024, 5:30:00 AM",
    remarks: "Dispatched",
  },
  {
    unitId: "cccccccc...",
    from: {
      name: "MedPlus Health Services",
      type: "Pharmacy",
      location: "Noida Sector 62",
    },
    to: {
      name: "Sneha Gupta",
      type: "citizen",
      location: "Beneficiary Record",
    },
    status: "Completed",
    timestamp: "4/15/2024, 5:30:00 AM",
    remarks: "Dispensed to patient",
  },
  {
    unitId: "cccccccc...",
    from: {
      name: "System",
      type: "system",
      location: "Platform Ledger",
    },
    to: {
      name: "Cipla Limited",
      type: "Manufacturer",
      location: "Mumbai Manufacturing Unit",
    },
    status: "Completed",
    timestamp: "4/15/2024, 5:30:00 AM",
    remarks: "Initial creation",
  },
  {
    unitId: "cccccccc...",
    from: {
      name: "MediDist Pharma Logistics",
      type: "Pharmacy",
      location: "Pune Branch",
    },
    to: {
      name: "MedPlus Health Services",
      type: "Pharmacy",
      location: "Hyderabad Branch",
    },
    status: "Completed",
    timestamp: "4/10/2024, 5:30:00 AM",
    remarks: "Delivered",
  },
  {
    unitId: "cccccccc...",
    from: {
      name: "MediDist Pharma Logistics",
      type: "Pharmacy",
      location: "Pune Branch",
    },
    to: {
      name: "MedPlus Health Services",
      type: "Pharmacy",
      location: "Hyderabad Branch",
    },
    status: "Completed",
    timestamp: "4/10/2024, 5:30:00 AM",
    remarks: "Delivered",
  },
  {
    unitId: "cccccccc...",
    from: {
      name: "Cipla Limited",
      type: "Manufacturer",
      location: "Mumbai Manufacturing Unit",
    },
    to: {
      name: "MediDist Pharma Logistics",
      type: "Pharmacy",
      location: "Pune Branch",
    },
    status: "Completed",
    timestamp: "4/5/2024, 5:30:00 AM",
    remarks: "Dispatched",
  },
];

const manufacturerTraceability = [
  {
    manufacturer: "Cipla Limited",
    branchLocation: "Mumbai Manufacturing Unit",
    drugTypes: ["Paracetamol 500mg", "Atorvastatin 20mg"],
    pharmaciesServed: 3,
    lastTransferDate: "4/22/2024",
    servedBranches: [
      "North India Pharma Distributors - Delhi",
      "MediDist Pharma Logistics - Pune",
      "MedPlus Health Services - Noida",
    ],
  },
  {
    manufacturer: "Sun Pharmaceuticals Ltd.",
    branchLocation: "Ahmedabad Manufacturing Unit",
    drugTypes: ["Amoxicillin 500mg", "Metformin 500mg"],
    pharmaciesServed: 2,
    lastTransferDate: "4/18/2024",
    servedBranches: [
      "MedPlus Health Services - Hyderabad",
      "Apollo Pharmacy Network - Bengaluru",
    ],
  },
  {
    manufacturer: "Bharat Lifecare Manufacturing",
    branchLocation: "Hyderabad Unit II",
    drugTypes: ["Insulin Glargine", "Cefixime 200mg"],
    pharmaciesServed: 4,
    lastTransferDate: "4/10/2024",
    servedBranches: [
      "Wellness Pharmacy - Chennai",
      "MediDist Pharma Logistics - Pune",
      "North India Pharma Distributors - Delhi",
      "MedPlus Health Services - Hyderabad",
    ],
  },
];

export default function MedicineTraceability() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredTransfers = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return transfers;

    return transfers.filter((transfer) => {
      return (
        transfer.unitId.toLowerCase().includes(query) ||
        transfer.from.name.toLowerCase().includes(query) ||
        transfer.from.type.toLowerCase().includes(query) ||
        transfer.from.location.toLowerCase().includes(query) ||
        transfer.to.name.toLowerCase().includes(query) ||
        transfer.to.type.toLowerCase().includes(query) ||
        transfer.to.location.toLowerCase().includes(query) ||
        transfer.status.toLowerCase().includes(query) ||
        transfer.remarks.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-9 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <ArrowLeftRight className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Transfer History
            </h1>

            <p className="mt-2 text-lg leading-7 text-slate-500">
              All medicine unit transfers across the supply chain
            </p>
          </div>
        </div>

        {/* Manufacturer traceability summary */}
        <div className="mb-8 grid gap-5 lg:grid-cols-3">
          {manufacturerTraceability.map((item) => (
            <ManufacturerTraceCard key={item.manufacturer} item={item} />
          ))}
        </div>

        {/* Search */}
        <div className="mb-5 max-w-md">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by unit, participant, branch, or remarks..."
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        {/* Transfer table */}
        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="max-h-[620px] overflow-auto">
            <table className="w-full min-w-[1100px] border-collapse text-left">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-slate-300 bg-slate-100/95 backdrop-blur">
                  <TableHead>Unit ID</TableHead>
                  <TableHead>From</TableHead>
                  <TableHead>To</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Timestamp</TableHead>
                  <TableHead>Remarks</TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredTransfers.map((transfer, index) => (
                  <tr
                    key={`${transfer.unitId}-${transfer.timestamp}-${index}`}
                    className="border-b border-slate-300 transition last:border-b-0 hover:bg-blue-50/35"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm text-slate-500">
                        {transfer.unitId}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <ParticipantCell participant={transfer.from} />
                    </td>

                    <td className="px-5 py-4">
                      <ParticipantCell participant={transfer.to} />
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                        {transfer.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-base text-slate-500">
                      {transfer.timestamp}
                    </td>

                    <td className="px-5 py-4 text-base text-slate-500">
                      {transfer.remarks}
                    </td>
                  </tr>
                ))}

                {filteredTransfers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      No transfer records found for “{searchTerm}”.
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

function ManufacturerTraceCard({ item }) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-100 blur-2xl" />

      <div className="relative z-10">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <Factory className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-slate-950">
                {item.manufacturer}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-sm text-slate-500">
                <MapPin className="h-3.5 w-3.5" />
                {item.branchLocation}
              </div>
            </div>
          </div>

          <span className="rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
            Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <TraceMetric
            icon={Store}
            label="Pharmacies Served"
            value={item.pharmaciesServed}
          />
          <TraceMetric
            icon={Truck}
            label="Last Transfer"
            value={item.lastTransferDate}
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            Drug Types
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {item.drugTypes.map((drug) => (
              <span
                key={drug}
                className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700"
              >
                {drug}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-slate-400">
            Branches / Pharmacies Served
          </p>

          <div className="mt-2 space-y-2">
            {item.servedBranches.slice(0, 3).map((branch) => (
              <div
                key={branch}
                className="flex items-center gap-2 rounded-xl bg-slate-50 px-3 py-2 text-sm text-slate-600"
              >
                <Building2 className="h-4 w-4 text-blue-700" />
                <span className="truncate">{branch}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ParticipantCell({ participant }) {
  return (
    <div>
      <p className="text-base font-semibold text-slate-950">
        {participant.name}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-2">
        <OwnerBadge ownerType={participant.type} />

        <span className="inline-flex items-center gap-1 text-xs text-slate-500">
          <MapPin className="h-3 w-3" />
          {participant.location}
        </span>
      </div>
    </div>
  );
}

function TraceMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
      <div className="mb-2 flex items-center gap-2 text-blue-700">
        <Icon className="h-4 w-4" />
        <span className="text-[11px] font-bold uppercase tracking-[0.1em]">
          {label}
        </span>
      </div>

      <p className="text-sm font-semibold text-slate-950">{value}</p>
    </div>
  );
}

function OwnerBadge({ ownerType }) {
  const normalized = ownerType.toLowerCase();

  const styles = {
    pharmacy: "border-amber-300 bg-amber-100 text-amber-700",
    manufacturer: "border-emerald-300 bg-emerald-100 text-emerald-700",
    citizen: "border-amber-300 bg-amber-100 text-amber-700",
    system: "border-amber-300 bg-amber-100 text-amber-700",
    distributor: "border-indigo-300 bg-indigo-100 text-indigo-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
        styles[normalized] || "border-slate-300 bg-slate-100 text-slate-700"
      }`}
    >
      {ownerType}
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