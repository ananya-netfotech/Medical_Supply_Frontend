import { CheckCircle2, Send } from "lucide-react";

export default function ModernDetailCard({ alert }) {
  if (!alert) return null;

  return (
    <div className="rounded-lg border border-blue-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-blue-700">
              {alert.alertId}
            </span>
            <span className="rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700">
              {alert.severity}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {alert.category}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Owner: {alert.owner} • Detected: {alert.detected}
          </p>
        </div>

        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Mark Resolved
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-white px-3 py-1.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50">
            <Send className="h-3.5 w-3.5" />
            Escalate
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Finding
          </p>
          <p className="mt-1 text-sm text-gray-700">
            {alert.finding}
          </p>
        </div>

        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Required Government Action
          </p>
          <p className="mt-1 text-sm text-gray-700">
            {alert.requiredAction}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-gray-200 bg-gray-50 p-2.5">
        <p className="text-xs text-gray-500">
          <span className="font-semibold">Regulatory Reference:</span>{" "}
          {alert.regulation}
        </p>
      </div>
    </div>
  );
}