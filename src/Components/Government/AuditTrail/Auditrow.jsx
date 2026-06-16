// ../../../Components/Government/AuditTrail/AuditRow.jsx

import { Eye, MapPin } from "lucide-react";
import SeverityBadge from "./SeverityBadge";
import StatusBadge from "./StatusBadge";

export default function AuditRow({ event, onView }) {
  return (
    <tr className="transition-colors hover:bg-blue-50/40">
      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm font-medium text-blue-700">
          {event.auditId}
        </span>
      </td>
      <td className="border-r border-blue-100 px-4 py-3 text-sm text-gray-600">
        {event.timestamp}
      </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-semibold text-gray-900">{event.actor}</p>
        <p className="text-xs text-gray-500">{event.role}</p>
      </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-medium text-gray-900">{event.module}</p>
        <p className="text-xs text-gray-500 font-mono">{event.ipAddress}</p>
      </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-medium text-gray-900">{event.entity}</p>
        <p className="text-xs text-gray-500">{event.entityType}</p>
      </td>
      <td className="border-r border-blue-100 px-4 py-3 text-sm text-gray-700">
        {event.auditType}
      </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <SeverityBadge severity={event.severity} />
      </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <StatusBadge status={event.status} />
      </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="h-3 w-3 text-blue-600" />
          {event.region}
        </div>
      </td>
      <td className="px-4 py-3">
        <button
          onClick={onView}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-sm font-medium text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
      </td>
    </tr>
  );
}