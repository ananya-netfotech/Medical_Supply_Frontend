import InfoField from "./InfoField";

export default function TransferHistoryModal({ unit, onClose }) {
  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-4xl overflow-hidden rounded-lg border border-blue-200 bg-white shadow-xl">
        <div className="border-b border-blue-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Medicine Movement History
          </h2>
          <p className="mt-1 text-sm text-gray-600">
            Unit No. {unit.unitId} · Batch No. {unit.batch}
          </p>
        </div>

        <div className="px-6 py-4">
          <div className="mb-5 grid gap-3 rounded-md border border-blue-100 bg-blue-50 p-4 sm:grid-cols-2">
            <InfoField
              label="Medicine Registration Ref."
              value={unit.drugTypeId}
            />
            <InfoField
              label="Manufacturer Registration No."
              value={unit.manufacturerId}
            />
            <InfoField
              label="Manufacturing License No."
              value={unit.licenseId}
            />
            <InfoField
              label="Current Holder Registration No."
              value={unit.currentOwner.id}
            />
          </div>

          <div className="overflow-hidden rounded-md border border-blue-200">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[800px] border-collapse">
                <thead className="bg-blue-50">
                  <tr>
                    <th className="border-b border-r border-blue-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                      From Holder
                    </th>
                    <th className="border-b border-r border-blue-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                      To Holder
                    </th>
                    <th className="border-b border-r border-blue-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                      Movement Timestamp
                    </th>
                    <th className="border-b border-blue-200 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                      Transaction Ref.
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-blue-100 bg-white">
                  {unit.transferHistory.map((entry, index) => (
                    <tr key={`${entry.txnId}-${index}`} className="hover:bg-blue-50/40">
                      <td className="border-r border-blue-100 px-4 py-3 text-sm font-medium text-gray-900">
                        {entry.from}
                      </td>
                      <td className="border-r border-blue-100 px-4 py-3 text-sm font-medium text-gray-900">
                        {entry.to}
                      </td>
                      <td className="border-r border-blue-100 px-4 py-3 text-sm text-gray-600">
                        {entry.timestamp}
                      </td>
                      <td className="px-4 py-3">
                        <span className="font-mono text-sm font-medium text-gray-700">
                          {entry.txnId}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <p className="mt-4 text-xs text-gray-500">
            Movement records are stored for audit, traceability, holder
            validation, recall verification, and regulatory review.
          </p>
        </div>

        <div className="border-t border-blue-200 bg-gray-50 px-6 py-4 text-right">
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}