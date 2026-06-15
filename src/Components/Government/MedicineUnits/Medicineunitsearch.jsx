import { Search } from "lucide-react";

export default function MedicineUnitSearch({ searchTerm, filteredCount, onSearch }) {
  return (
    <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative max-w-md flex-1">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => onSearch(event.target.value)}
          placeholder="Search by unit no., medicine reference, manufacturer registration, license, holder, or batch..."
          className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
      </div>

      <div className="text-sm text-gray-600">
        <span className="font-medium text-gray-900">{filteredCount}</span> registered medicine units
      </div>
    </div>
  );
}