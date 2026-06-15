import { Search } from "lucide-react";
import LicenseTableHeader from "./LicenseTableHeader";
import LicenseTableRow from "./LicenseTableRow";

export default function LicenseTable({
  currentLicenses,
  filteredCount,
  searchTerm,
  onToggleStatus,
  onExtend,
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1400px] border-collapse">
          <LicenseTableHeader />

          <tbody className="divide-y divide-blue-100 bg-white">
            {currentLicenses.map((license, index) => (
              <LicenseTableRow
                key={`${license.licenseId}-${license.drugTypeId}-${index}`}
                license={license}
                index={index}
                onToggleStatus={onToggleStatus}
                onExtend={onExtend}
              />
            ))}

            {filteredCount === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-gray-300" />
                    <p>
                      No manufacturing license records found for "
                      <span className="font-medium text-gray-700">
                        {searchTerm}
                      </span>
                      "
                    </p>
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