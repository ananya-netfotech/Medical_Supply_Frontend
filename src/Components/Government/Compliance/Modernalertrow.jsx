import { Eye } from "lucide-react";

export default function ModernAlertRow({ alert, isSelected, onSelect }) {
  const getSeverityStyles = () => {
    switch (alert.severity) {
      case "Critical":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "High":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getStatusStyles = () => {
    switch (alert.status) {
      case "Open":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case "Under Review":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Pending Evidence":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <tr
      className={`cursor-pointer transition-colors hover:bg-blue-50/40 ${
        isSelected ? "bg-blue-50/40" : ""
      }`}
      onClick={onSelect}
    >
      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm font-medium text-blue-700">
          {alert.alertId}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-semibold text-gray-800">
          {alert.category}
        </p>
        <p className="text-xs text-gray-500">{alert.owner}</p>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <p className="max-w-[220px] text-xs text-gray-600 line-clamp-2">
          {alert.regulation}
        </p>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-medium text-gray-800">{alert.entity}</p>
        <p className="text-xs text-gray-500">{alert.region}</p>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${getSeverityStyles()}`}>
          {alert.severity}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${getStatusStyles()}`}>
          {alert.status}
        </span>
      </td>

      <td className="px-4 py-3">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-sm font-medium text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <Eye className="h-3.5 w-3.5" />
          Review
        </button>
      </td>
    </tr>
  );
}