import { Search } from "lucide-react";
import ParticipantCell from "./ParticipantCell";
import StatusBadge from "./StatusBadge";

export default function TransferTable({ currentTransfers, filteredTransfers, searchTerm }) {
  return (
    <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
      <div className="max-h-[620px] overflow-auto">
        <table className="w-full min-w-[1200px] border-collapse">
          <thead className="sticky top-0 z-10 bg-blue-50">
            <tr>
              <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Medicine Unit No.
              </th>
              <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Source Holder
              </th>
              <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Receiving Holder
              </th>
              <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Movement Status
              </th>
              <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Movement Timestamp
              </th>
              <th className="border-b border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Movement Remarks
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100 bg-white">
            {currentTransfers.map((transfer, index) => (
              <tr
                key={`${transfer.unitId}-${transfer.timestamp}-${index}`}
                className="transition-colors hover:bg-blue-50/40"
              >
                <td className="border-r border-blue-100 px-4 py-3">
                  <span className="font-mono text-sm font-medium text-blue-700">
                    {transfer.unitId}
                  </span>
                </td>

                <td className="border-r border-blue-100 px-4 py-3">
                  <ParticipantCell participant={transfer.from} />
                </td>

                <td className="border-r border-blue-100 px-4 py-3">
                  <ParticipantCell participant={transfer.to} />
                </td>

                <td className="border-r border-blue-100 px-4 py-3">
                  <StatusBadge status={transfer.status} />
                </td>

                <td className="border-r border-blue-100 px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {transfer.timestamp}
                  </span>
                </td>

                <td className="px-4 py-3">
                  <span className="text-sm text-gray-600">
                    {transfer.remarks}
                  </span>
                </td>
              </tr>
            ))}

            {filteredTransfers.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-gray-300" />
                    <p>No medicine movement records found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
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