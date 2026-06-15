import { ArrowLeftRight } from "lucide-react";

export default function TraceabilityHeader() {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-blue-200 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-50">
          <ArrowLeftRight className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
            Medicine Movement Traceability
          </h1>
        </div>
      </div>
    </div>
  );
}