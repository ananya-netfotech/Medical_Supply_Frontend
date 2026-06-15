import { Search } from "lucide-react";

export default function TransferSearchBar({ searchTerm, setSearchTerm, setCurrentPage }) {
  return (
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
  );
}