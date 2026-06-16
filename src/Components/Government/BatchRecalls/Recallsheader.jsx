import { AlertTriangle, Plus } from "lucide-react";

export default function RecallsHeader({ onIssueRecall }) {
  return (
    <div className="mb-8 flex flex-col gap-4 border-b border-blue-200 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-50">
          <AlertTriangle className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
            Medicine Recall Registry
          </h1>
        </div>
      </div>

      <button
        type="button"
        onClick={onIssueRecall}
        className="inline-flex w-auto items-center justify-center gap-2 rounded bg-red-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors"
      >
        <Plus className="h-4 w-4" />
        <span className="whitespace-nowrap">Issue Recall Notice</span>
      </button>
    </div>
  );
}