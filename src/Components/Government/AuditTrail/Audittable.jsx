// ../../../Components/Government/AuditTrail/AuditTable.jsx

import { Search } from "lucide-react";
import AuditRow from "./Auditrow";

export default function AuditTable({ currentAudits, filteredAudits, searchTerm, onView }) {
  return (
    <section className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1300px] border-collapse">
          <thead className="bg-blue-50">
            <tr>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Audit ID
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Timestamp
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Actor
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Module
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Entity
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Audit Type
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Severity
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Status
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Region
              </th>
              <th className="border-b border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100 bg-white">
            {currentAudits.map((event) => (
              <AuditRow
                key={event.auditId}
                event={event}
                onView={() => onView(event)}
              />
            ))}

            {filteredAudits.length === 0 && (
              <tr>
                <td
                  colSpan={10}
                  className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-gray-300" />
                    <p>
                      No audit records found for "
                      <span className="font-medium text-gray-700">{searchTerm}</span>
                      "
                    </p>
                  </div>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}