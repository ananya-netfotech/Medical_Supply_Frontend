import { Search } from "lucide-react";
import StatusBadge from "./StatusBadge";

export default function RecallsTable({ currentRecalls, filteredRecalls, searchTerm, onReleaseRecall }) {
  return (
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
                    onClick={() => onReleaseRecall(recall.recallId)}
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
  );
}