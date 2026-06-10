import { useMemo, useState } from "react";
import { Box, Eye, Search, ChevronLeft, ChevronRight, Plus } from "lucide-react";
import AddMedicineUnitPopup from "../../../Components/Popups/Government/AddMedicineUnitPopup";

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
        to: "North India Pharmacy Network",
        timestamp: "4/16/2024, 10:30 AM",
        txnId: "TXN-PCM-0001",
      },
      {
        from: "North India Pharmacy Network",
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
      name: "MedPlus Pharmacy",
    },
    transferHistory: [
      {
        from: "Cipla Limited",
        to: "MediCare Pharmacy Network",
        timestamp: "4/2/2024, 11:45 AM",
        txnId: "TXN-ATV-0001",
      },
      {
        from: "MediCare Pharmacy Network",
        to: "MedPlus Pharmacy",
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
        to: "MedPlus Pharmacy",
        timestamp: "4/3/2024, 12:10 PM",
        txnId: "TXN-ATV-0003",
      },
      {
        from: "MedPlus Pharmacy",
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
      name: "MedPlus Pharmacy",
    },
    transferHistory: [
      {
        from: "Sun Pharmaceuticals Ltd.",
        to: "MedPlus Pharmacy",
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
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [units, setUnits] = useState(medicineUnits);
  const itemsPerPage = 10;

  const filteredUnits = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return units;

    return units.filter((unit) => {
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
  }, [units, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredUnits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentUnits = filteredUnits.slice(startIndex, endIndex);

  const handleAddMedicineUnit = (newUnit) => {
    setUnits(prevUnits => [newUnit, ...prevUnits]);
    console.log("New medicine unit added:", newUnit);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top spacer */}
      <div className="pt-16 lg:pt-20" />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-blue-200 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-50">
              <Box className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
                Medicine Unit Registry
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex w-auto items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Add Medicine Unit</span>
          </button>
        </div>

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Monitor registered medicine units with manufacturing approval,
          ownership, batch, and movement visibility
        </p>

        {/* Search and count */}
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by unit no., medicine reference, manufacturer registration, license, holder, or batch..."
              className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
          
          <div className="text-sm text-gray-600">
            <span className="font-medium text-gray-900">{filteredUnits.length}</span> registered medicine units
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="max-h-[620px] overflow-auto">
            <table className="w-full min-w-[1400px] border-collapse">
              <thead className="sticky top-0 z-10 bg-blue-50">
                <tr>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Medicine Unit No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Medicine Registration Ref.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Manufacturer Registration No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Manufacturing License No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Unit Status
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Created On
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Current Holder
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Movement History
                  </th>
                  <th className="border-b border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Batch No.
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100 bg-white">
                {currentUnits.map((unit, index) => (
                  <tr
                    key={`${unit.unitId}-${unit.batch}-${index}`}
                    className="transition-colors hover:bg-blue-50/40"
                  >
                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm font-medium text-blue-700">
                        {unit.unitId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm text-gray-600">
                        {unit.drugTypeId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm text-gray-600">
                        {unit.manufacturerId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm text-gray-600">
                        {unit.licenseId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <StatusBadge status={unit.status} />
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {unit.createdAt}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <CurrentOwner owner={unit.currentOwner} />
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <button
                        type="button"
                        onClick={() => setSelectedHistory(unit)}
                        className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 hover:border-blue-300"
                      >
                        <Eye className="h-3.5 w-3.5" />
                        View Movement
                      </button>
                    </td>

                    <td className="px-4 py-3">
                      <span className="font-mono text-sm font-medium text-gray-700">
                        {unit.batch}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredUnits.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p>No medicine unit records found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
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
            <span className="font-medium text-gray-900">{Math.min(endIndex, filteredUnits.length)}</span> of{' '}
            <span className="font-medium text-gray-900">{filteredUnits.length}</span> entries
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

      {/* Add Medicine Unit Popup */}
      <AddMedicineUnitPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={handleAddMedicineUnit}
      />

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
      <p className="text-sm font-semibold text-gray-900">{owner.id}</p>
      <p className="mt-0.5 text-xs text-gray-500">{owner.name}</p>
      <div className="mt-1">
        <OwnerBadge ownerType={owner.type} />
      </div>
    </div>
  );
}

function TransferHistoryModal({ unit, onClose }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-blue-200 bg-white shadow-xl">
        <div className="border-b border-blue-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Medicine Movement History
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Unit No. {unit.unitId} · Batch No. {unit.batch}
          </p>
        </div>

        <div className="px-6 py-4">
          <div className="mb-5 grid gap-3 rounded-md border border-blue-100 bg-blue-50 p-4 sm:grid-cols-2">
            <Info
              label="Medicine Registration Ref."
              value={unit.drugTypeId}
            />
            <Info
              label="Manufacturer Registration No."
              value={unit.manufacturerId}
            />
            <Info
              label="Manufacturing License No."
              value={unit.licenseId}
            />
            <Info
              label="Current Holder Registration No."
              value={unit.currentOwner.id}
            />
          </div>

          <div className="overflow-hidden rounded-md border border-blue-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="border-b border-r border-blue-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                      From Holder
                    </th>
                    <th className="border-b border-r border-blue-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                      To Holder
                    </th>
                    <th className="border-b border-r border-blue-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                      Movement Timestamp
                    </th>
                    <th className="border-b border-blue-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                      Transaction Ref.
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-blue-100 bg-white">
                  {unit.transferHistory.map((entry, index) => (
                    <tr key={`${entry.txnId}-${index}`} className="hover:bg-blue-50/40">
                      <td className="border-r border-blue-100 px-4 py-3 text-sm font-medium text-gray-900">
                        {entry.from}
                       </td>
                      <td className="border-r border-blue-100 px-4 py-3 text-sm font-medium text-gray-900">
                        {entry.to}
                       </td>
                      <td className="border-r border-blue-100 px-4 py-3 text-sm text-gray-600">
                        {entry.timestamp}
                       </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm font-medium text-gray-700">
                          {entry.txnId}
                        </span>
                       </td>
                    </tr>
                  ))}
                </tbody>
               </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Movement records are stored for audit, traceability, holder
            validation, recall verification, and regulatory review.
          </p>
        </div>

        <div className="border-t border-blue-200 bg-gray-50 px-6 py-4 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
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
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1 font-medium text-gray-900">{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "border-green-200 bg-green-50 text-green-700",
    Sold: "border-blue-200 bg-blue-50 text-blue-700",
    Expired: "border-orange-200 bg-orange-50 text-orange-700",
    Recalled: "border-red-200 bg-red-50 text-red-700",
    "In Transit": "border-purple-200 bg-purple-50 text-purple-700",
    Quarantined: "border-yellow-200 bg-yellow-50 text-yellow-700",
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
    distributor: "border-purple-200 bg-purple-50 text-purple-700",
    wholesaler: "border-indigo-200 bg-indigo-50 text-indigo-700",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${
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