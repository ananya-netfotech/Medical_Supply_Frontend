// ../../../Components/Government/AuditTrail/AuditFilters.jsx

import { Filter, Search } from "lucide-react";

export default function AuditFilters({
  searchTerm,
  setSearchTerm,
  severityFilter,
  setSeverityFilter,
  auditTypeFilter,
  setAuditTypeFilter,
  auditTypes,
  setCurrentPage,
}) {
  return (
    <section className="mb-6 rounded-md border border-blue-200 bg-white p-4 shadow-sm">
      <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
        <div className="w-full max-w-md">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by audit ID, actor, module, entity, region..."
              className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <div className="mr-1 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
            <Filter className="h-3.5 w-3.5" />
            Severity
          </div>

          {["All", "Critical", "High", "Medium", "Low"].map((severity) => (
            <button
              key={severity}
              type="button"
              onClick={() => {
                setSeverityFilter(severity);
                setCurrentPage(1);
              }}
              className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                severityFilter === severity
                  ? "border-blue-200 bg-blue-50 text-blue-700"
                  : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
            >
              {severity}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-2">
        <div className="mr-1 text-sm font-medium text-gray-600">
          Audit Type
        </div>

        {auditTypes.slice(0, 6).map((type) => (
          <button
            key={type}
            type="button"
            onClick={() => {
              setAuditTypeFilter(type);
              setCurrentPage(1);
            }}
            className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
              auditTypeFilter === type
                ? "border-blue-200 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {type}
          </button>
        ))}
      </div>
    </section>
  );
}