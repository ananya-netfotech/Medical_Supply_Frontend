import { useMemo, useState } from "react";
import {
  ArrowLeftRight,
  Building2,
  Factory,
  MapPin,
  Search,
  Store,
  Truck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

const transfers = [
  {
    unitId: "UNIT-0001",
    from: {
      name: "North India Pharmacy Network",
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
    unitId: "UNIT-0002",
    from: {
      name: "Cipla Limited",
      type: "Manufacturer",
      location: "Mumbai Manufacturing Unit",
    },
    to: {
      name: "North India Pharmacy Network",
      type: "Pharmacy",
      location: "Delhi Branch",
    },
    status: "Completed",
    timestamp: "4/18/2024, 5:30:00 AM",
    remarks: "Transferred to pharmacy network",
  },
  {
    unitId: "UNIT-0003",
    from: {
      name: "MedPlus Health Services",
      type: "Pharmacy",
      location: "Noida Sector 62",
    },
    to: {
      name: "Sneha Gupta",
      type: "Citizen",
      location: "Beneficiary Record",
    },
    status: "Completed",
    timestamp: "4/15/2024, 5:30:00 AM",
    remarks: "Dispensed to beneficiary",
  },
  {
    unitId: "UNIT-0004",
    from: {
      name: "System",
      type: "System",
      location: "Platform Ledger",
    },
    to: {
      name: "Cipla Limited",
      type: "Manufacturer",
      location: "Mumbai Manufacturing Unit",
    },
    status: "Completed",
    timestamp: "4/15/2024, 5:30:00 AM",
    remarks: "Medicine unit created",
  },
  {
    unitId: "UNIT-0005",
    from: {
      name: "MediCare Pharmacy Network",
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
    remarks: "Transferred between pharmacy branches",
  },
  {
    unitId: "UNIT-0006",
    from: {
      name: "Cipla Limited",
      type: "Manufacturer",
      location: "Mumbai Manufacturing Unit",
    },
    to: {
      name: "MediCare Pharmacy Network",
      type: "Pharmacy",
      location: "Pune Branch",
    },
    status: "Completed",
    timestamp: "4/5/2024, 5:30:00 AM",
    remarks: "Released to pharmacy network",
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
      "North India Pharmacy Network - Delhi",
      "MediCare Pharmacy Network - Pune",
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
      "MediCare Pharmacy Network - Pune",
      "North India Pharmacy Network - Delhi",
      "MedPlus Health Services - Hyderabad",
    ],
  },
];

export default function MedicineTraceability() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

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
        transfer.remarks.toLowerCase().includes(query) ||
        transfer.timestamp.toLowerCase().includes(query)
      );
    });
  }, [searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredTransfers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentTransfers = filteredTransfers.slice(startIndex, endIndex);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top spacer */}
      <div className="pt-16 lg:pt-20" />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-blue-200 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-50">
              <ArrowLeftRight className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
                Medicine Movement Traceability
              </h1>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Monitor medicine unit movement from manufacturer release to
          pharmacy holding and citizen dispensing
        </p>

        {/* Manufacturer traceability summary */}
        <div className="mb-8 grid gap-5 lg:grid-cols-3">
          {manufacturerTraceability.map((item) => (
            <ManufacturerTraceCard key={item.manufacturer} item={item} />
          ))}
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by unit no., holder, pharmacy branch, location, status, or movement remarks..."
              className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Transfer table */}
        <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="max-h-[620px] overflow-auto">
            <table className="w-full min-w-[1200px] border-collapse">
              <thead className="sticky top-0 z-10 bg-blue-50">
                <tr>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Medicine Unit No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Source Holder
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Receiving Holder
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Movement Status
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Movement Timestamp
                  </th>
                  <th className="border-b border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Movement Remarks
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100 bg-white">
                {currentTransfers.map((transfer, index) => (
                  <tr
                    key={`${transfer.unitId}-${transfer.timestamp}-${index}`}
                    className="transition-colors hover:bg-blue-50/40"
                  >
                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm font-medium text-blue-700">
                        {transfer.unitId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <ParticipantCell participant={transfer.from} />
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <ParticipantCell participant={transfer.to} />
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <StatusBadge status={transfer.status} />
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {transfer.timestamp}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {transfer.remarks}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredTransfers.length === 0 && (
                  <tr>
                    <td
                      colSpan={6}
                      className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p>No medicine movement records found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer stats and pagination */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to{' '}
            <span className="font-medium text-gray-900">{Math.min(endIndex, filteredTransfers.length)}</span> of{' '}
            <span className="font-medium text-gray-900">{filteredTransfers.length}</span> entries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[32px] px-2 py-1.5 text-sm font-medium rounded border transition-colors ${
                      currentPage === pageNum
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ManufacturerTraceCard({ item }) {
  return (
    <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm transition-colors hover:border-blue-300">
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              <Factory className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {item.manufacturer}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                {item.branchLocation}
              </div>
            </div>
          </div>

          <span className="inline-flex rounded-md border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
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
            label="Last Movement"
            value={item.lastTransferDate}
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Approved Medicines
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {item.drugTypes.map((drug) => (
              <span
                key={drug}
                className="inline-flex rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
              >
                {drug}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Pharmacy Branches Served
          </p>

          <div className="mt-2 space-y-2">
            {item.servedBranches.slice(0, 3).map((branch) => (
              <div
                key={branch}
                className="flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-600"
              >
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
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
      <p className="text-sm font-semibold text-gray-900">
        {participant.name}
      </p>

      <div className="mt-1 flex flex-wrap items-center gap-2">
        <OwnerBadge ownerType={participant.type} />

        <span className="inline-flex items-center gap-1 text-xs text-gray-500">
          <MapPin className="h-3 w-3" />
          {participant.location}
        </span>
      </div>
    </div>
  );
}

function TraceMetric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-md border border-gray-100 bg-gray-50 p-3">
      <div className="mb-2 flex items-center gap-2 text-blue-600">
        <Icon className="h-3.5 w-3.5" />
        <span className="text-[10px] font-semibold uppercase tracking-wider">
          {label}
        </span>
      </div>

      <p className="text-sm font-semibold text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Completed: "border-green-200 bg-green-50 text-green-700",
    Pending: "border-amber-200 bg-amber-50 text-amber-700",
    Failed: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function OwnerBadge({ ownerType }) {
  const normalized = ownerType.toLowerCase();

  const styles = {
    pharmacy: "border-amber-200 bg-amber-50 text-amber-700",
    manufacturer: "border-green-200 bg-green-50 text-green-700",
    citizen: "border-blue-200 bg-blue-50 text-blue-700",
    system: "border-gray-200 bg-gray-50 text-gray-600",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${
        styles[normalized] || "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {ownerType}
    </span>
  );
}

function TableHead({ children }) {
  return (
    <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
      {children}
    </th>
  );
}