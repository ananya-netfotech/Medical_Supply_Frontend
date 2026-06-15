import { Search } from "lucide-react";

export default function AlertsSearchBar({ searchTerm, setSearchTerm, severityFilter, setSeverityFilter }) {
  return (
    <div className="mb-6 flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <div className="relative max-w-lg flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search by alert ID, entity, regulation, region..."
          className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <span className="text-sm font-medium text-gray-500">
          Severity:
        </span>

        {["All", "Critical", "High", "Medium"].map((severity) => (
          <button
            key={severity}
            type="button"
            onClick={() => setSeverityFilter(severity)}
            className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
              severityFilter === severity
                ? severity === "Critical"
                  ? "border border-rose-200 bg-rose-50 text-rose-700"
                  : severity === "High"
                  ? "border border-orange-200 bg-orange-50 text-orange-700"
                  : severity === "Medium"
                  ? "border border-amber-200 bg-amber-50 text-amber-700"
                  : "border border-blue-200 bg-blue-50 text-blue-700"
                : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
            }`}
          >
            {severity}
          </button>
        ))}
      </div>
    </div>
  );
}