import { ShieldCheck } from "lucide-react";

export default function ComplianceFooter({ onDownload, isGenerating }) {
  return (
    <div className="mt-6 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-gray-50 p-5 shadow-sm">
      <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-600">
            <ShieldCheck className="h-5 w-5" />
          </div>

          <div>
            <p className="font-semibold text-gray-900">
              Audit Ready System
            </p>
            <p className="text-sm text-gray-500">
              All actions are timestamped and logged for regulatory review.
            </p>
          </div>
        </div>

        <button
          onClick={onDownload}
          disabled={isGenerating}
          className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {isGenerating ? (
            <>
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
              Generating...
            </>
          ) : (
            "Download Compliance Report"
          )}
        </button>
      </div>
    </div>
  );
}