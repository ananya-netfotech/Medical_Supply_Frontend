import { X, CalendarDays } from "lucide-react";
import InfoField from "./InfoField";

export default function ExtendModal({
  license,
  newExpireDate,
  setNewExpireDate,
  onClose,
  onConfirm,
}) {
  const canExtend = Boolean(newExpireDate);

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-lg overflow-hidden rounded-lg border border-blue-200 bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-blue-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Extend License Validity
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Select a revised validity date for this manufacturing license.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-4">
          <div className="mb-5 rounded-md border border-blue-100 bg-blue-50 p-4">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <InfoField label="License Registration No." value={license.licenseId} />
              <InfoField label="Current Valid Until" value={license.expires} />
              <InfoField
                label="Manufacturer Registration No."
                value={license.manufacturerId}
              />
              <InfoField label="Approved Medicine Ref." value={license.drugTypeId} />
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              New Valid Until Date
            </span>

            <input
              type="date"
              value={newExpireDate}
              onChange={(event) => setNewExpireDate(event.target.value)}
              className="h-10 w-full rounded border border-blue-200 bg-white px-3 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </label>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-blue-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={!canExtend}
            className={`inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium text-white transition-colors ${
              canExtend
                ? "bg-blue-600 hover:bg-blue-700"
                : "cursor-not-allowed bg-blue-300"
            }`}
          >
            <CalendarDays className="h-4 w-4" />
            Extend Validity
          </button>
        </div>
      </div>
    </div>
  );
}