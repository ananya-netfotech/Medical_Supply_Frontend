import { Building2, Factory, MapPin, Store, Truck } from "lucide-react";
import TraceMetric from "./TraceMetric";

export default function ManufacturerTraceCard({ item }) {
  return (
    <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm transition-colors hover:border-blue-300">
      <div className="p-5">
        <div className="mb-4 flex items-start justify-between gap-4">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
              <Factory className="h-5 w-5" />
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-900">
                {item.manufacturer}
              </h3>

              <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
                <MapPin className="h-3.5 w-3.5" />
                {item.branchLocation}
              </div>
            </div>
          </div>

          <span className="inline-flex rounded-md border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
            Active
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <TraceMetric
            icon={Store}
            label="Pharmacies Served"
            value={item.pharmaciesServed}
          />

          <TraceMetric
            icon={Truck}
            label="Last Movement"
            value={item.lastTransferDate}
          />
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Approved Medicines
          </p>

          <div className="mt-2 flex flex-wrap gap-2">
            {item.drugTypes.map((drug) => (
              <span
                key={drug}
                className="inline-flex rounded-md border border-blue-200 bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700"
              >
                {drug}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Pharmacy Branches Served
          </p>

          <div className="mt-2 space-y-2">
            {item.servedBranches.slice(0, 3).map((branch) => (
              <div
                key={branch}
                className="flex items-center gap-2 rounded-md border border-gray-100 bg-gray-50 px-3 py-2 text-sm text-gray-600"
              >
                <Building2 className="h-3.5 w-3.5 text-blue-600" />
                <span className="truncate">{branch}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}