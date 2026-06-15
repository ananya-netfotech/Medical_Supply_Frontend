import { CalendarDays } from "lucide-react";
import LicenseStatus from "./LicenseStatus";
import StatusToggle from "./StatusToggle";

function shouldShowExtendAction(license) {
  if (license.status === "Revoked") return false;

  const expiryDate = new Date(license.expires);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const differenceInMs = expiryDate.getTime() - today.getTime();
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  return license.status === "Expired" || differenceInDays <= 90;
}

export default function LicenseTableRow({ license, index, onToggleStatus, onExtend }) {
  const isExpired = license.status === "Expired";
  const isRevoked = license.status === "Revoked";
  const shouldShowExtend = shouldShowExtendAction(license);

  return (
    <tr
      key={`${license.licenseId}-${license.drugTypeId}-${index}`}
      className="transition-colors hover:bg-blue-50/40"
    >
      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm font-medium text-blue-700">
          {license.licenseId}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm text-gray-700">
          {license.manufacturerId}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm text-gray-700">
          {license.drugTypeId}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <div className="space-y-2">
          <LicenseStatus status={license.status} />

          <StatusToggle
            checked={!isRevoked}
            onChange={() => onToggleStatus(license)}
          />

          {isRevoked && license.revokedReason && (
            <p className="max-w-[220px] text-xs leading-5 text-red-600">
              Reason: {license.revokedReason}
            </p>
          )}
        </div>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className="text-sm text-gray-600">{license.issued}</span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className="text-sm font-medium text-gray-800 whitespace-normal block">
          {license.issuedBy}
        </span>
      </td>

      <td
        className={`border-r border-blue-100 px-4 py-3 text-sm font-medium ${
          isExpired ? "text-red-600" : "text-gray-900"
        }`}
      >
        {license.expires}
      </td>

      <td className="px-4 py-3">
        <div className="min-w-[160px]">
          {isRevoked ? (
            <div className="inline-flex rounded-md border border-red-200 bg-red-50 px-3 py-1.5 text-sm font-medium text-red-700">
              License Revoked
            </div>
          ) : shouldShowExtend ? (
            <button
              type="button"
              onClick={() => onExtend(license)}
              className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 hover:border-blue-300"
            >
              <CalendarDays className="h-3.5 w-3.5" />
              Extend Validity
            </button>
          ) : (
            <span className="inline-flex rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700">
              Validity Current
            </span>
          )}
        </div>
      </td>
    </tr>
  );
}