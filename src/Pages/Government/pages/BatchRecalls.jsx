import { useMemo, useState } from "react";
import { AlertTriangle, Plus, Search, ChevronLeft, ChevronRight } from "lucide-react";
import IssueRecallPopup from "../../../Components/Popups/Government/IssueRecallPopup";

const recalls = [
  {
    drugTypeId: "DRUG-AMX-500",
    licenseId: "LIC-SUN-AMX-001",
    manufacturerId: "MFG-SUN-002",
    unitId: "UNIT-0008",
    recallId: "RECALL-0001",
    reason:
      "Contamination detected during quality audit — potential microbial contamination identified in retained samples",
    status: "Active",
    timestamp: "5/1/2024, 10:30 AM",
  },
  {
    drugTypeId: "DRUG-PCM-500",
    licenseId: "LIC-CIP-PCM-001",
    manufacturerId: "MFG-CIP-001",
    unitId: "UNIT-0001",
    recallId: "RECALL-0002",
    reason:
      "Expired unit found in active pharmacy inventory and marked for regulatory recall review",
    status: "Active",
    timestamp: "5/3/2024, 2:15 PM",
  },
];

export default function BatchRecalls() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [recallsList, setRecallsList] = useState(recalls);
  const itemsPerPage = 10;

  const filteredRecalls = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return recallsList;

    return recallsList.filter((recall) => {
      return (
        recall.drugTypeId.toLowerCase().includes(query) ||
        recall.licenseId.toLowerCase().includes(query) ||
        recall.manufacturerId.toLowerCase().includes(query) ||
        recall.unitId.toLowerCase().includes(query) ||
        recall.recallId.toLowerCase().includes(query) ||
        recall.reason.toLowerCase().includes(query) ||
        recall.status.toLowerCase().includes(query) ||
        recall.timestamp.toLowerCase().includes(query)
      );
    });
  }, [recallsList, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredRecalls.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRecalls = filteredRecalls.slice(startIndex, endIndex);

  const handleIssueRecall = (newRecall) => {
    setRecallsList(prev => [newRecall, ...prev]);
    console.log("New recall issued:", newRecall);
  };

  const handleReleaseRecall = (recallId) => {
    setRecallsList(prev =>
      prev.map(recall =>
        recall.recallId === recallId
          ? { ...recall, status: "Released" }
          : recall
      )
    );
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
              <AlertTriangle className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
                Medicine Recall Registry
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex w-auto items-center justify-center gap-2 rounded bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Issue Recall Notice</span>
          </button>
        </div>

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Issue, monitor, and release medicine recall actions for
          regulatory safety and pharmacy compliance
        </p>

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
              placeholder="Search by recall notice, medicine reference, unit no., license no., manufacturer, or reason..."
              className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px] border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Medicine Registration Ref.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Manufacturing License No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Manufacturer Registration No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Medicine Unit No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Recall Notice No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Recall Reason
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Recall Status
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Issued On
                  </th>
                  <th className="border-b border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100 bg-white">
                {currentRecalls.map((recall) => (
                  <tr
                    key={recall.recallId}
                    className="transition-colors hover:bg-blue-50/40"
                  >
                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm font-medium text-blue-700">
                        {recall.drugTypeId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm text-gray-600">
                        {recall.licenseId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm text-gray-600">
                        {recall.manufacturerId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm font-medium text-blue-700">
                        {recall.unitId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm text-gray-600">
                        {recall.recallId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <p
                        title={recall.reason}
                        className="max-w-[460px] text-sm text-gray-600 line-clamp-2"
                      >
                        {recall.reason}
                      </p>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <StatusBadge status={recall.status} />
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {recall.timestamp}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <button
                        type="button"
                        onClick={() => handleReleaseRecall(recall.recallId)}
                        disabled={recall.status !== "Active"}
                        className={`inline-flex rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                          recall.status === "Active"
                            ? "border-gray-300 bg-white text-gray-700 hover:bg-gray-50 hover:border-gray-400"
                            : "border-gray-200 bg-gray-100 text-gray-400 cursor-not-allowed"
                        }`}
                      >
                        Release Recall
                      </button>
                    </td>
                  </tr>
                ))}

                {filteredRecalls.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p>No medicine recall records found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
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
            <span className="font-medium text-gray-900">{Math.min(endIndex, filteredRecalls.length)}</span> of{' '}
            <span className="font-medium text-gray-900">{filteredRecalls.length}</span> entries
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

      {/* Issue Recall Popup */}
      <IssueRecallPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={handleIssueRecall}
      />
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "border-red-200 bg-red-50 text-red-700",
    Released: "border-blue-200 bg-blue-50 text-blue-700",
    Closed: "border-gray-200 bg-gray-50 text-gray-700",
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

function TableHead({ children }) {
  return (
    <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
      {children}
    </th>
  );
}