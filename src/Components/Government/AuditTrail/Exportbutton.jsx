// ../../../Components/Government/AuditTrail/ExportButton.jsx

import { Download, Filter } from "lucide-react";

export default function ExportButton({
  exportFormat,
  setExportFormat,
  showFormatMenu,
  setShowFormatMenu,
  handleExportReport,
  exportMessage,
}) {
  return (
    <div className="relative">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={() => setShowFormatMenu(!showFormatMenu)}
          className="inline-flex items-center justify-center gap-2 rounded border border-blue-600 bg-white px-5 py-2.5 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
        >
          <Filter className="h-4 w-4" />
          <span>{exportFormat}</span>
        </button>
        <button
          type="button"
          onClick={handleExportReport}
          className="inline-flex w-auto items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
        >
          <Download className="h-4 w-4" />
          <span className="whitespace-nowrap">Export Audit Report</span>
        </button>
      </div>

      {showFormatMenu && (
        <div className="absolute top-full right-0 mt-2 rounded-md border border-gray-200 bg-white shadow-lg z-20 min-w-[120px]">
          {["PDF", "Excel", "JSON"].map((format) => (
            <button
              key={format}
              onClick={() => {
                setExportFormat(format);
                setShowFormatMenu(false);
              }}
              className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                exportFormat === format ? "bg-blue-50 text-blue-600" : "text-gray-700"
              }`}
            >
              {format}
            </button>
          ))}
        </div>
      )}

      {exportMessage && (
        <div className="absolute top-full right-0 mt-2 rounded-md bg-green-50 border border-green-200 px-3 py-1.5 text-sm text-green-700 whitespace-nowrap z-10">
          {exportMessage}
        </div>
      )}
    </div>
  );
}