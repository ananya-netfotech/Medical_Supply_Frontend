import { Search } from "lucide-react";
import MedicineUnitTableHeader from "./MedicineUnitTableHeader";
import MedicineUnitTableRow from "./MedicineUnitTableRow";

export default function MedicineUnitTable({
  currentUnits,
  filteredCount,
  searchTerm,
  onViewHistory,
}) {
  return (
    <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
      <div className="max-h-[620px] overflow-auto">
        <table className="w-full min-w-[1400px] border-collapse">
          <MedicineUnitTableHeader />

          <tbody className="divide-y divide-blue-100 bg-white">
            {currentUnits.map((unit, index) => (
              <MedicineUnitTableRow
                key={`${unit.unitId}-${unit.batch}-${index}`}
                unit={unit}
                index={index}
                onViewHistory={onViewHistory}
              />
            ))}

            {filteredCount === 0 && (
              <tr>
                <td
                  colSpan={9}
                  className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                >
                  <div className="flex flex-col items-center gap-2">
                    <Search className="h-8 w-8 text-gray-300" />
                    <p>
                      No medicine unit records found for "
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