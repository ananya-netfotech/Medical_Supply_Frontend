import { Eye } from "lucide-react";
import StatusBadge from "./StatusBadge";
import CurrentOwner from "./CurrentOwner";

export default function MedicineUnitTableRow({ unit, index, onViewHistory }) {
  return (
    <tr
      key={`${unit.unitId}-${unit.batch}-${index}`}
      className="transition-colors hover:bg-blue-50/40"
    >
      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm font-medium text-blue-700">
          {unit.unitId}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm text-gray-600">
          {unit.drugTypeId}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm text-gray-600">
          {unit.manufacturerId}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm text-gray-600">
          {unit.licenseId}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <StatusBadge status={unit.status} />
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className="text-sm text-gray-600">{unit.createdAt}</span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <CurrentOwner owner={unit.currentOwner} />
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <button
          type="button"
          onClick={() => onViewHistory(unit)}
          className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 hover:border-blue-300"
        >
          <Eye className="h-3.5 w-3.5" />
          View Movement
        </button>
      </td>

      <td className="px-4 py-3">
        <span className="font-mono text-sm font-medium text-gray-700">
          {unit.batch}
        </span>
      </td>
    </tr>
  );
}