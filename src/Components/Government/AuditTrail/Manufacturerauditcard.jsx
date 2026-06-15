// ../../../Components/Government/AuditTrail/ManufacturerAuditCard.jsx

import { Factory, MapPin } from "lucide-react";

export default function ManufacturerAuditCard({ manufacturer }) {
  const isHigh = manufacturer.risk === "High";
  const isMedium = manufacturer.risk === "Medium";

  const scoreColor =
    manufacturer.score >= 85
      ? "text-green-700 bg-green-50 border-green-200"
      : manufacturer.score >= 70
        ? "text-amber-700 bg-amber-50 border-amber-200"
        : "text-rose-700 bg-rose-50 border-rose-200";

  return (
    <div className="overflow-hidden rounded-lg border border-blue-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
            <Factory className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {manufacturer.manufacturer}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-3 w-3" />
              {manufacturer.location}
            </p>
          </div>
        </div>
        <span
          className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${
            isHigh
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : isMedium
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {manufacturer.risk} Risk
        </span>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-50 p-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Audit Score
          </p>
          <p className="mt-1 text-sm text-gray-500">{manufacturer.status}</p>
        </div>
        <div className={`rounded-md border px-3 py-1.5 text-xl font-semibold ${scoreColor}`}>
          {manufacturer.score}%
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500">License ID</span>
          <span className="font-mono text-xs font-medium text-gray-900">{manufacturer.licenseId}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500">Last Audit</span>
          <span className="font-medium text-gray-900">{manufacturer.lastAudit}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500">Next Audit</span>
          <span className="font-medium text-gray-900">{manufacturer.nextAudit}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500">Open Findings</span>
          <span className="font-medium text-gray-900">{manufacturer.findings}</span>
        </div>
      </div>
    </div>
  );
}