import { X, XCircle } from "lucide-react";
import InfoField from "./InfoField";

export default function RevokeModal({ license, reason, setReason, onClose, onConfirm }) {
  const canRevoke = reason.trim().length >= 5;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-xl overflow-hidden rounded-lg border border-red-200 bg-white shadow-xl">
        <div className="flex items-start justify-between border-b border-red-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Revoke Manufacturing License
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Revocation requires a reason for audit and regulatory record.
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
          <div className="mb-5 rounded-md border border-red-100 bg-red-50 p-4">
            <p className="text-sm font-medium text-red-800">
              Manufacturing license selected for revocation
            </p>

            <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <InfoField
                label="Manufacturer Registration No."
                value={license.manufacturerId}
              />
              <InfoField label="Approved Medicine Ref." value={license.drugTypeId} />
              <InfoField label="License Registration No." value={license.licenseId} />
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-medium text-gray-700">
              Revocation Reason
            </span>

            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={4}
              placeholder="Example: License revoked due to failed quality audit, expired compliance documents, or violation of manufacturing conditions..."
              className="w-full resize-none rounded border border-gray-300 bg-white px-3 py-2 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-red-500 focus:ring-1 focus:ring-red-500"
            />
          </label>

          <p className="mt-2 text-xs text-gray-500">
            Minimum 5 characters required. This reason will be stored in the
            audit trail.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-2 border-t border-red-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
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
            disabled={!canRevoke}
            className={`inline-flex items-center justify-center gap-2 rounded px-4 py-2 text-sm font-medium text-white transition-colors ${
              canRevoke
                ? "bg-red-600 hover:bg-red-700"
                : "cursor-not-allowed bg-red-300"
            }`}
          >
            <XCircle className="h-4 w-4" />
            Revoke License
          </button>
        </div>
      </div>
    </div>
  );
}