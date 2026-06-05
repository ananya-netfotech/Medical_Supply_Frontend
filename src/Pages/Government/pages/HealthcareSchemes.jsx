import { HeartHandshake, IndianRupee, Plus } from "lucide-react";

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
  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-9 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-slate-950">
              Healthcare Schemes
            </h1>

            <p className="mt-2 text-lg leading-7 text-slate-500">
              Manage PM-JAY, CGHS, and other government healthcare schemes
            </p>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" />
            Create Scheme
          </button>
        </div>

        {/* Scheme cards */}
        <div className="grid gap-5 lg:grid-cols-2">
          {schemes.map((scheme) => (
            <SchemeCard key={scheme.schemeId} scheme={scheme} />
          ))}
        </div>
      </div>
    </div>
  );
}

function SchemeCard({ scheme }) {
  const isActive = scheme.status === "Active";

  return (
    <div className="relative min-h-[300px] overflow-hidden rounded-2xl border border-slate-300 bg-white p-7 shadow-sm transition hover:shadow-md">
      <div className="pointer-events-none absolute right-0 top-0 h-28 w-28 rounded-full bg-blue-100/70 blur-2xl" />

      <div className="relative z-10 flex h-full flex-col">
        <div className="mb-6 flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
              <HeartHandshake className="h-5 w-5" />
            </div>

            <div>
              <p className="font-mono text-sm font-medium text-slate-500">
                {scheme.schemeId}
              </p>

              <h2 className="mt-1 text-xl font-bold leading-tight text-slate-950">
                {scheme.schemeName}
              </h2>
            </div>
          </div>

          <StatusBadge active={isActive} status={scheme.status} />
        </div>

        <p className="max-w-2xl text-base leading-7 text-slate-500">
          {scheme.description}
        </p>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <InfoBlock label="Created At" value={scheme.createdAt} />
          <InfoBlock label="Issued By" value={scheme.issuedBy} />
        </div>

        <div className="mt-5 flex items-center gap-2 rounded-2xl border border-emerald-100 bg-emerald-50 px-4 py-3">
          <IndianRupee className="h-4 w-4 text-emerald-600" />

          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.12em] text-emerald-700">
              Coverage Amount
            </p>

            <p className="mt-1 text-lg font-bold text-slate-950">
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
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
    </div>
  );
}

function StatusBadge({ active, status }) {
  return (
    <span
      className={`inline-flex rounded-lg px-3 py-1.5 text-sm font-semibold ${
        active
          ? "border border-emerald-300 bg-emerald-100 text-emerald-700"
          : "border border-slate-300 bg-slate-100 text-slate-600"
      }`}
    >
      {status}
    </span>
  );
}