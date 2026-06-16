import { ShieldAlert } from "lucide-react";

export default function ComplianceHeader({ criticalCount }) {
  return (
    <div className="relative mb-8 overflow-hidden rounded-lg border border-blue-200 bg-white p-6 shadow-sm lg:p-8">
      <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-100/50 blur-3xl" />
      <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-gray-100/50 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
        <div className="flex items-start gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-md border border-blue-200 bg-blue-50 text-blue-600">
            <ShieldAlert className="h-7 w-7" />
          </div>

          <div>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <span className="inline-flex rounded-md border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                LIVE MONITORING
              </span>

              <span className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                </span>
                {criticalCount} Critical
              </span>
            </div>

            <h1 className="text-2xl font-semibold text-gray-900 lg:text-3xl">
              Compliance Monitoring & Enforcement
            </h1>

            <p className="mt-2 max-w-3xl text-sm text-gray-600">
              Real-time regulatory oversight for CDSCO and State Drug Control
              authorities — track alerts, enforce actions, and maintain audit
              readiness.
            </p>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <div className="rounded-md border border-gray-200 bg-white px-3 py-2">
            <p className="text-xs text-gray-500">Today's Actions</p>
            <p className="text-lg font-bold text-gray-900">24</p>
          </div>

          <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">
            <p className="text-xs text-gray-500">Resolution Rate</p>
            <p className="text-lg font-bold text-green-700">78%</p>
          </div>
        </div>
      </div>
    </div>
  );
}