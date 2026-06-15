import { Search } from "lucide-react";
import ModernAlertRow from "./ModernAlertRow";

export default function AlertsTable({ filteredAlerts, selectedAlert, setSelectedAlert, searchTerm }) {
  return (
    <div className="mb-6 overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1280px] border-collapse">
          <thead className="bg-blue-50">
            <tr>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Alert ID
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Category / Owner
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Regulation
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Entity / Region
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Severity
              </th>
              <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Status
              </th>
              <th className="border-b border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                Action
              </th>
            </tr>
          </thead>

          <tbody className="divide-y divide-blue-100 bg-white">
            {filteredAlerts.map((alert) => (
              <ModernAlertRow
                key={alert.alertId}
                alert={alert}
                isSelected={selectedAlert === alert.alertId}
                onSelect={() =>
                  setSelectedAlert(
                    selectedAlert === alert.alertId ? null : alert.alertId
                  )
                }
              />
            ))}

            {filteredAlerts.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-gray-300" />
                    <p>No compliance alerts found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
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