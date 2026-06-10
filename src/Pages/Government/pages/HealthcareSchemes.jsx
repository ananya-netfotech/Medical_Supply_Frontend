import { HeartHandshake, IndianRupee, Plus, Search } from "lucide-react";
import { useState, useMemo } from "react";
import CreateSchemePopup from "../../../Components/Popups/Government/CreateSchemePopup";

const schemes = [
  {
    schemeId: "SCH-PMJAY-001",
    schemeName: "Ayushman Bharat PM-JAY",
    description:
      "Pradhan Mantri Jan Arogya Yojana — provides health cover of Rs 5 lakh per family per year for secondary and tertiary care hospitalization",
    createdAt: "1/5/2024",
    issuedBy: "National Health Authority",
    coverageAmount: "₹5,00,000",
    status: "Active",
  },
  {
    schemeId: "SCH-CGHS-002",
    schemeName: "Central Government Health Scheme (CGHS)",
    description:
      "Comprehensive healthcare for central government employees and pensioners",
    createdAt: "1/12/2024",
    issuedBy: "Ministry of Health and Family Welfare",
    coverageAmount: "₹2,00,000",
    status: "Active",
  },
];

export default function HealthcareSchemes() {
  const [searchTerm, setSearchTerm] = useState("");
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [schemesList, setSchemesList] = useState(schemes);

  const filteredSchemes = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return schemesList;

    return schemesList.filter((scheme) => {
      return (
        scheme.schemeId.toLowerCase().includes(query) ||
        scheme.schemeName.toLowerCase().includes(query) ||
        scheme.description.toLowerCase().includes(query) ||
        scheme.issuedBy.toLowerCase().includes(query) ||
        scheme.status.toLowerCase().includes(query) ||
        scheme.coverageAmount.toLowerCase().includes(query)
      );
    });
  }, [schemesList, searchTerm]);

  const handleCreateScheme = (newScheme) => {
    setSchemesList(prev => [newScheme, ...prev]);
    console.log("New scheme created:", newScheme);
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
              <HeartHandshake className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
                Healthcare Schemes
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex w-auto items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Create Scheme</span>
          </button>
        </div>

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Manage PM-JAY, CGHS, and other government healthcare schemes
        </p>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by scheme ID, name, issuing authority, or coverage amount..."
              className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Scheme cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          {filteredSchemes.map((scheme) => (
            <SchemeCard key={scheme.schemeId} scheme={scheme} />
          ))}

          {filteredSchemes.length === 0 && (
            <div className="col-span-2 py-12 text-center">
              <div className="flex flex-col items-center gap-2">
                <Search className="h-8 w-8 text-gray-300" />
                <p className="text-sm text-gray-500">
                  No healthcare schemes found for "<span className="font-medium text-gray-700">{searchTerm}</span>"
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Scheme Popup */}
      <CreateSchemePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={handleCreateScheme}
      />
    </div>
  );
}

function SchemeCard({ scheme }) {
  const isActive = scheme.status === "Active";

  return (
    <div className="group overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm transition-all hover:border-blue-300 hover:shadow-md">
      <div className="p-6">
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              <HeartHandshake className="h-5 w-5" />
            </div>

            <div>
              <p className="font-mono text-xs font-medium text-blue-700">
                {scheme.schemeId}
              </p>

              <h2 className="mt-1 text-lg font-semibold leading-tight text-gray-900">
                {scheme.schemeName}
              </h2>
            </div>
          </div>

          <StatusBadge active={isActive} status={scheme.status} />
        </div>

        <p className="text-sm leading-relaxed text-gray-600 line-clamp-3">
          {scheme.description}
        </p>

        <div className="mt-5 grid gap-3 sm:grid-cols-2">
          <InfoBlock label="Created At" value={scheme.createdAt} />
          <InfoBlock label="Issued By" value={scheme.issuedBy} />
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-md border border-green-200 bg-green-50 px-4 py-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-green-100">
            <IndianRupee className="h-4 w-4 text-green-700" />
          </div>

          <div>
            <p className="text-[10px] font-semibold uppercase tracking-wider text-green-700">
              Coverage Amount
            </p>
            <p className="text-base font-bold text-gray-900">
              {scheme.coverageAmount}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoBlock({ label, value }) {
  return (
    <div className="rounded-md border border-gray-200 bg-gray-50 px-3 py-2">
      <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-0.5 text-sm font-medium text-gray-800">{value}</p>
    </div>
  );
}

function StatusBadge({ active, status }) {
  return (
    <span
      className={`inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
        active
          ? "border border-green-200 bg-green-50 text-green-700"
          : "border border-gray-200 bg-gray-50 text-gray-600"
      }`}
    >
      {status}
    </span>
  );
}