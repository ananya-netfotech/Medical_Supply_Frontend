// ../../../Components/Government/AuditTrail/AuditDetailCard.jsx

import { CheckCircle2, FileCheck2, UserCheck } from "lucide-react";
import SeverityBadge from "./SeverityBadge";
import DetailBlock from "./DetailBlock";

export default function AuditDetailCard({ event, onMarkVerified, onGenerateReport, onAssignOfficer }) {
  return (
    <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-gray-500">{event.auditId}</p>
          <h3 className="mt-1 text-base font-semibold text-gray-900">
            {event.action}
          </h3>
        </div>
        <SeverityBadge severity={event.severity} />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <DetailBlock title="Reference" text={event.reference} />
        <DetailBlock title="Module" text={event.module} />
        <DetailBlock title="Actor" text={`${event.actor} · ${event.role}`} />
        <DetailBlock title="Region" text={event.region} />
      </div>

      <div className="mt-3">
        <DetailBlock title="Audit Remarks" text={event.remarks} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          onClick={onMarkVerified}
          className="inline-flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Mark Verified
        </button>
        <button
          onClick={onGenerateReport}
          className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
        >
          <FileCheck2 className="h-3.5 w-3.5" />
          Generate Report
        </button>
        <button
          onClick={onAssignOfficer}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          <UserCheck className="h-3.5 w-3.5" />
          Assign Officer
        </button>
      </div>
    </div>
  );
}