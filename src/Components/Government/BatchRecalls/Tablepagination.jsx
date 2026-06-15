import { ChevronLeft, ChevronRight } from "lucide-react";

export default function TablePagination({
  currentPage,
  setCurrentPage,
  totalPages,
  startIndex,
  endIndex,
  filteredCount,
}) {
  return (
    <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
      <div className="text-sm text-gray-600">
        Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to{" "}
        <span className="font-medium text-gray-900">{Math.min(endIndex, filteredCount)}</span> of{" "}
        <span className="font-medium text-gray-900">{filteredCount}</span> entries
      </div>

      <div className="flex items-center gap-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
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
                    ? "border-blue-500 bg-blue-50 text-blue-700"
                    : "border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300"
                }`}
              >
                {pageNum}
              </button>
            );
          })}
        </div>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="inline-flex items-center gap-1 rounded border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
        >
          Next
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
}