import { useMemo, useState } from "react";
import { Box, Eye, Search } from "lucide-react";

const medicineUnits = [
  {
    unitId: "UNIT-0001",
    drugTypeId: "DRUG-PCM-500",
    manufacturerId: "MFG-CIP-001",
    licenseId: "LIC-CIP-PCM-001",
    status: "Expired",
    createdAt: "4/15/2024",
    currentOwner: {
      id: "PHR-APL-003",
      type: "Pharmacy",
      name: "Apollo Pharmacy",
    },
    transferHistory: [
      {
        from: "Cipla Limited",
        to: "North India Pharma Distributors",
        timestamp: "4/16/2024, 10:30 AM",
        txnId: "TXN-PCM-0001",
      },
      {
        from: "North India Pharma Distributors",
        to: "Apollo Pharmacy",
        timestamp: "4/18/2024, 2:15 PM",
        txnId: "TXN-PCM-0002",
      },
    ],
    batch: "BATCH005",
  },
  {
    unitId: "UNIT-0002",
    drugTypeId: "DRUG-PCM-500",
    manufacturerId: "MFG-CIP-001",
    licenseId: "LIC-CIP-PCM-001",
    status: "Active",
    createdAt: "4/15/2024",
    currentOwner: {
      id: "MFG-CIP-001",
      type: "Manufacturer",
      name: "Cipla Limited",
    },
    transferHistory: [
      {
        from: "System",
        to: "Cipla Limited",
        timestamp: "4/15/2024, 9:00 AM",
        txnId: "TXN-PCM-0003",
      },
    ],
    batch: "BATCH005",
  },
  {
    unitId: "UNIT-0003",
    drugTypeId: "DRUG-ATV-020",
    manufacturerId: "MFG-CIP-001",
    licenseId: "LIC-CIP-ATV-004",
    status: "Expired",
    createdAt: "4/1/2024",
    currentOwner: {
      id: "PHR-MED-002",
      type: "Pharmacy",
      name: "MedPlus Distributor",
    },
    transferHistory: [
      {
        from: "Cipla Limited",
        to: "MediDist Pharma Logistics",
        timestamp: "4/2/2024, 11:45 AM",
        txnId: "TXN-ATV-0001",
      },
      {
        from: "MediDist Pharma Logistics",
        to: "MedPlus Distributor",
        timestamp: "4/4/2024, 4:20 PM",
        txnId: "TXN-ATV-0002",
      },
    ],
    batch: "BATCH004",
  },
  {
    unitId: "UNIT-0004",
    drugTypeId: "DRUG-ATV-020",
    manufacturerId: "MFG-CIP-001",
    licenseId: "LIC-CIP-ATV-004",
    status: "Sold",
    createdAt: "4/1/2024",
    currentOwner: {
      id: "BEN-66666666",
      type: "Citizen",
      name: "PM-JAY Beneficiary",
    },
    transferHistory: [
      {
        from: "Cipla Limited",
        to: "MedPlus Distributor",
        timestamp: "4/3/2024, 12:10 PM",
        txnId: "TXN-ATV-0003",
      },
      {
        from: "MedPlus Distributor",
        to: "Citizen",
        timestamp: "4/6/2024, 5:40 PM",
        txnId: "TXN-ATV-0004",
      },
    ],
    batch: "BATCH004",
  },
  {
    unitId: "UNIT-0005",
    drugTypeId: "DRUG-MET-500",
    manufacturerId: "MFG-SUN-002",
    licenseId: "LIC-SUN-MET-002",
    status: "Expired",
    createdAt: "3/10/2024",
    currentOwner: {
      id: "PHR-MED-002",
      type: "Pharmacy",
      name: "MedPlus Distributor",
    },
    transferHistory: [
      {
        from: "Sun Pharmaceuticals Ltd.",
        to: "MedPlus Distributor",
        timestamp: "3/12/2024, 1:30 PM",
        txnId: "TXN-MET-0001",
      },
    ],
    batch: "BATCH002",
  },
  {
    unitId: "UNIT-0006",
    drugTypeId: "DRUG-MET-500",
    manufacturerId: "MFG-SUN-002",
    licenseId: "LIC-SUN-MET-002",
    status: "Active",
    createdAt: "3/10/2024",
    currentOwner: {
      id: "MFG-SUN-002",
      type: "Manufacturer",
      name: "Sun Pharmaceuticals Ltd.",
    },
    transferHistory: [
      {
        from: "System",
        to: "Sun Pharmaceuticals Ltd.",
        timestamp: "3/10/2024, 9:15 AM",
        txnId: "TXN-MET-0002",
      },
    ],
    batch: "BATCH002",
  },
  {
    unitId: "UNIT-0007",
    drugTypeId: "DRUG-AMX-500",
    manufacturerId: "MFG-SUN-002",
    licenseId: "LIC-SUN-AMX-001",
    status: "Sold",
    createdAt: "2/20/2024",
    currentOwner: {
      id: "BEN-66666666",
      type: "Citizen",
      name: "PM-JAY Beneficiary",
    },
    transferHistory: [
      {
        from: "Sun Pharmaceuticals Ltd.",
        to: "Apollo Pharmacy",
        timestamp: "2/22/2024, 3:00 PM",
        txnId: "TXN-AMX-0001",
      },
      {
        from: "Apollo Pharmacy",
        to: "Citizen",
        timestamp: "2/25/2024, 6:25 PM",
        txnId: "TXN-AMX-0002",
      },
    ],
    batch: "BATCH001",
  },
  {
    unitId: "UNIT-0008",
    drugTypeId: "DRUG-AMX-500",
    manufacturerId: "MFG-SUN-002",
    licenseId: "LIC-SUN-AMX-001",
    status: "Recalled",
    createdAt: "2/20/2024",
    currentOwner: {
      id: "PHR-APL-003",
      type: "Pharmacy",
      name: "Apollo Pharmacy",
    },
    transferHistory: [
      {
        from: "Sun Pharmaceuticals Ltd.",
        to: "Apollo Pharmacy",
        timestamp: "2/22/2024, 3:00 PM",
        txnId: "TXN-AMX-0003",
      },
      {
        from: "CDSCO",
        to: "Apollo Pharmacy",
        timestamp: "3/1/2024, 10:00 AM",
        txnId: "TXN-RECALL-0001",
      },
    ],
    batch: "BATCH001",
  },
];

export default function MedicineUnits() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedHistory, setSelectedHistory] = useState(null);

  const filteredUnits = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return medicineUnits;

    return medicineUnits.filter((unit) => {
      return (
        unit.unitId.toLowerCase().includes(query) ||
        unit.drugTypeId.toLowerCase().includes(query) ||
        unit.manufacturerId.toLowerCase().includes(query) ||
        unit.licenseId.toLowerCase().includes(query) ||
        unit.status.toLowerCase().includes(query) ||
        unit.createdAt.toLowerCase().includes(query) ||
        unit.currentOwner.id.toLowerCase().includes(query) ||
        unit.currentOwner.type.toLowerCase().includes(query) ||
        unit.currentOwner.name.toLowerCase().includes(query) ||
        unit.batch.toLowerCase().includes(query) ||
        unit.transferHistory.some((entry) => {
          return (
            entry.from.toLowerCase().includes(query) ||
            entry.to.toLowerCase().includes(query) ||
            entry.timestamp.toLowerCase().includes(query) ||
            entry.txnId.toLowerCase().includes(query)
          );
        })
      );
    });
  }, [searchTerm]);

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex items-start gap-4">
          <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
            <Box className="h-7 w-7" />
          </div>

          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Medicine Units
            </h1>

            <p className="mt-2 text-lg leading-7 text-slate-500">
              All medicine units with licensing, ownership, batch and transfer visibility
            </p>
          </div>
        </div>

        {/* Search and count */}
        <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-center">
          <div className="w-full max-w-md">
            <label className="relative block">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search by unit, drug type ID, manufacturer, license, owner..."
                className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
              />
            </label>
          </div>

          <p className="text-base text-slate-500">
            {filteredUnits.length} total units
          </p>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="max-h-[620px] overflow-auto">
            <table className="w-full min-w-[1360px] border-collapse text-left">
              <thead className="sticky top-0 z-10">
                <tr className="border-b border-slate-300 bg-slate-100/95 backdrop-blur">
                  <TableHead>Unit ID</TableHead>
                  <TableHead>Drug Type ID</TableHead>
                  <TableHead>Manufacturer ID</TableHead>
                  <TableHead>License ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Created At</TableHead>
                  <TableHead>Current Owner</TableHead>
                  <TableHead>Transfer History</TableHead>
                  <TableHead>Batch</TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredUnits.map((unit, index) => (
                  <tr
                    key={`${unit.unitId}-${unit.batch}-${index}`}
                    className="border-b border-slate-300 transition last:border-b-0 hover:bg-blue-50/35"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-slate-600">
                        {unit.unitId}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono text-sm text-slate-500">
                        {unit.drugTypeId}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono text-sm text-slate-500">
                        {unit.manufacturerId}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono text-sm text-slate-500">
                        {unit.licenseId}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <StatusBadge status={unit.status} />
                    </td>

                    <td className="px-5 py-4 text-base text-slate-500">
                      {unit.createdAt}
                    </td>

                    <td className="px-5 py-4">
                      <CurrentOwner owner={unit.currentOwner} />
                    </td>

                    <td className="px-5 py-4">
                      <button
                        type="button"
                        onClick={() => setSelectedHistory(unit)}
                        className="inline-flex items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                      >
                        <Eye className="h-4 w-4" />
                        View History
                      </button>
                    </td>

                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-slate-600">
                        {unit.batch}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredUnits.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      No medicine units found for “{searchTerm}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {selectedHistory && (
        <TransferHistoryModal
          unit={selectedHistory}
          onClose={() => setSelectedHistory(null)}
        />
      )}
    </div>
  );
}

function CurrentOwner({ owner }) {
  return (
    <div>
      <p className="text-base font-semibold text-slate-950">{owner.id}</p>
      <p className="mt-1 text-sm text-slate-500">{owner.name}</p>
      <OwnerBadge ownerType={owner.type} />
    </div>
  );
}

function TransferHistoryModal({ unit, onClose }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="border-b border-slate-200 px-6 py-5">
          <h2 className="text-xl font-bold text-slate-950">
            Transfer History
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Unit {unit.unitId} · Batch {unit.batch}
          </p>
        </div>

        <div className="px-6 py-5">
          <div className="mb-5 grid gap-3 rounded-2xl border border-blue-100 bg-blue-50/60 p-4 sm:grid-cols-2">
            <Info label="Drug Type ID" value={unit.drugTypeId} />
            <Info label="Manufacturer ID" value={unit.manufacturerId} />
            <Info label="License ID" value={unit.licenseId} />
            <Info label="Current Owner" value={unit.currentOwner.id} />
          </div>

          <div className="overflow-hidden rounded-2xl border border-slate-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[760px] border-collapse text-left">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50">
                    <TableHead>From</TableHead>
                    <TableHead>To</TableHead>
                    <TableHead>Timestamp</TableHead>
                    <TableHead>Txn ID</TableHead>
                  </tr>
                </thead>

                <tbody>
                  {unit.transferHistory.map((entry, index) => (
                    <tr
                      key={`${entry.txnId}-${index}`}
                      className="border-b border-slate-100 last:border-b-0"
                    >
                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {entry.from}
                      </td>

                      <td className="px-5 py-4 text-sm font-semibold text-slate-900">
                        {entry.to}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-500">
                        {entry.timestamp}
                      </td>

                      <td className="px-5 py-4">
                        <span className="font-mono text-sm font-medium text-slate-600">
                          {entry.txnId}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-sm text-slate-500">
            Transfer records are stored for audit, traceability, ownership validation and regulatory review.
          </p>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-5 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "border-emerald-300 bg-emerald-100 text-emerald-700",
    Sold: "border-blue-300 bg-blue-100 text-blue-700",
    Expired: "border-orange-300 bg-orange-100 text-orange-700",
    Recalled: "border-red-300 bg-red-100 text-red-700",
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

function OwnerBadge({ ownerType }) {
  const normalized = ownerType.toLowerCase();

  const styles = {
    pharmacy: "border-amber-300 bg-amber-100 text-amber-700",
    manufacturer: "border-emerald-300 bg-emerald-100 text-emerald-700",
    citizen: "border-blue-300 bg-blue-100 text-blue-700",
    distributor: "border-indigo-300 bg-indigo-100 text-indigo-700",
  };

  return (
    <span
      className={`mt-1 inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
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