import { useMemo, useState } from "react";
import {
  Award,
  CalendarDays,
  Plus,
  Search,
  X,
  XCircle,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import IssueLicensePopup from "../../../Components/Popups/Government/IssueLicensePopup";

const initialLicenses = [
  {
    licenseId: "LIC-CIP-PCM-001",
    manufacturerId: "MFG-CIP-001",
    drugTypeId: "DRUG-PCM-500",
    status: "Valid",
    issued: "1/25/2024",
    expires: "6/1/2027",
    issuedBy: "CDSCO West Zone",
    revokedReason: "",
  },
  {
    licenseId: "LIC-CIP-ATV-004",
    manufacturerId: "MFG-CIP-001",
    drugTypeId: "DRUG-ATV-020",
    status: "Expired",
    issued: "1/25/2024",
    expires: "1/25/2026",
    issuedBy: "CDSCO West Zone",
    revokedReason: "",
  },
  {
    licenseId: "LIC-SUN-AMX-001",
    manufacturerId: "MFG-SUN-002",
    drugTypeId: "DRUG-AMX-500",
    status: "Expired",
    issued: "1/20/2024",
    expires: "1/20/2026",
    issuedBy: "CDSCO Central Licensing Authority",
    revokedReason: "",
  },
  {
    licenseId: "LIC-SUN-MET-002",
    manufacturerId: "MFG-SUN-002",
    drugTypeId: "DRUG-MET-500",
    status: "Expired",
    issued: "1/20/2024",
    expires: "1/20/2026",
    issuedBy: "CDSCO Central Licensing Authority",
    revokedReason: "",
  },
];

export default function ManufacturerLicensing() {
  const [licenses, setLicenses] = useState(initialLicenses);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const itemsPerPage = 10;

  const [revokeModal, setRevokeModal] = useState(null);
  const [revokeReason, setRevokeReason] = useState("");

  const [extendModal, setExtendModal] = useState(null);
  const [newExpireDate, setNewExpireDate] = useState("");

  const filteredLicenses = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return licenses;

    return licenses.filter((license) => {
      return (
        license.licenseId.toLowerCase().includes(query) ||
        license.manufacturerId.toLowerCase().includes(query) ||
        license.drugTypeId.toLowerCase().includes(query) ||
        license.status.toLowerCase().includes(query) ||
        license.issuedBy.toLowerCase().includes(query)
      );
    });
  }, [licenses, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredLicenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLicenses = filteredLicenses.slice(startIndex, endIndex);

  const handleIssueLicense = (newLicense) => {
    setLicenses(prevLicenses => [newLicense, ...prevLicenses]);
    console.log("New license issued:", newLicense);
  };

  const handleToggleStatus = (license) => {
    const isRevoked = license.status === "Revoked";

    if (isRevoked) {
      setLicenses((currentLicenses) =>
        currentLicenses.map((item) =>
          item === license
            ? {
                ...item,
                status: isLicenseExpired(item.expires) ? "Expired" : "Valid",
                revokedReason: "",
              }
            : item
        )
      );

      return;
    }

    setRevokeModal(license);
    setRevokeReason("");
  };

  const confirmRevoke = () => {
    if (!revokeReason.trim()) return;

    setLicenses((currentLicenses) =>
      currentLicenses.map((item) =>
        item === revokeModal
          ? {
              ...item,
              status: "Revoked",
              revokedReason: revokeReason.trim(),
            }
          : item
      )
    );

    setRevokeModal(null);
    setRevokeReason("");
  };

  const closeRevokeModal = () => {
    setRevokeModal(null);
    setRevokeReason("");
  };

  const openExtendModal = (license) => {
    setExtendModal(license);
    setNewExpireDate("");
  };

  const closeExtendModal = () => {
    setExtendModal(null);
    setNewExpireDate("");
  };

  const confirmExtend = () => {
    if (!newExpireDate) return;

    const formattedDate = formatDateForTable(newExpireDate);

    setLicenses((currentLicenses) =>
      currentLicenses.map((item) =>
        item === extendModal
          ? {
              ...item,
              expires: formattedDate,
              status: "Valid",
            }
          : item
      )
    );

    setExtendModal(null);
    setNewExpireDate("");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top spacer */}
      <div className="pt-16 lg:pt-20" />

      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-blue-200 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-50">
              <Award className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
                Manufacturer License Registry
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex w-auto items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Issue Manufacturing License</span>
          </button>
        </div>

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Manage manufacturing approvals, license validity, revocation, and expiry extensions
        </p>

        {/* Search */}
        <div className="mb-6">
          <div className="relative max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => {
                setSearchTerm(event.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search by license no., manufacturer registration no., medicine reference, or issuing authority..."
              className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1400px] border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    License Registration No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Manufacturer Registration No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Approved Medicine Ref.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    License Status
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Issued On
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Issuing Authority
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Valid Until
                  </th>
                  <th className="border-b border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100 bg-white">
                {currentLicenses.map((license, index) => {
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
                            onChange={() => handleToggleStatus(license)}
                          />

                          {isRevoked && license.revokedReason && (
                            <p className="max-w-[220px] text-xs leading-5 text-red-600">
                              Reason: {license.revokedReason}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="border-r border-blue-100 px-4 py-3">
                        <span className="text-sm text-gray-600">
                          {license.issued}
                        </span>
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
                              onClick={() => openExtendModal(license)}
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
                })}

                {filteredLicenses.length === 0 && (
                  <tr>
                    <td
                      colSpan={8}
                      className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p>No manufacturing license records found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Footer stats and pagination */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to{' '}
            <span className="font-medium text-gray-900">{Math.min(endIndex, filteredLicenses.length)}</span> of{' '}
            <span className="font-medium text-gray-900">{filteredLicenses.length}</span> entries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[32px] px-2 py-1.5 text-sm font-medium rounded border transition-colors ${
                      currentPage === pageNum
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Issue License Popup */}
      <IssueLicensePopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={handleIssueLicense}
      />

      {revokeModal && (
        <RevokeModal
          license={revokeModal}
          reason={revokeReason}
          setReason={setRevokeReason}
          onClose={closeRevokeModal}
          onConfirm={confirmRevoke}
        />
      )}

      {extendModal && (
        <ExtendModal
          license={extendModal}
          newExpireDate={newExpireDate}
          setNewExpireDate={setNewExpireDate}
          onClose={closeExtendModal}
          onConfirm={confirmExtend}
        />
      )}
    </div>
  );
}

function StatusToggle({ checked, onChange }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        onClick={onChange}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full border transition-colors duration-200 ${
          checked
            ? "border-green-300 bg-green-500"
            : "border-red-300 bg-red-500"
        }`}
      >
        <span
          className={`inline-block h-4 w-4 rounded-full bg-white shadow-sm transition-transform duration-200 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      <span
        className={`min-w-[52px] text-sm font-medium ${
          checked ? "text-green-700" : "text-red-700"
        }`}
      >
        {checked ? "Active" : "Revoked"}
      </span>
    </div>
  );
}

function ExtendModal({
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
              <Info label="License Registration No." value={license.licenseId} />
              <Info label="Current Valid Until" value={license.expires} />
              <Info
                label="Manufacturer Registration No."
                value={license.manufacturerId}
              />
              <Info label="Approved Medicine Ref." value={license.drugTypeId} />
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

function RevokeModal({ license, reason, setReason, onClose, onConfirm }) {
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
              <Info
                label="Manufacturer Registration No."
                value={license.manufacturerId}
              />
              <Info label="Approved Medicine Ref." value={license.drugTypeId} />
              <Info label="License Registration No." value={license.licenseId} />
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

function Info({ label, value }) {
  return (
    <div>
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </p>
      <p className="mt-1 font-medium text-gray-900">{value}</p>
    </div>
  );
}

function LicenseStatus({ status }) {
  const styles = {
    Expired: "border-orange-200 bg-orange-50 text-orange-700",
    Valid: "border-green-200 bg-green-50 text-green-700",
    Revoked: "border-red-200 bg-red-50 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${
        styles[status] || "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {status}
    </span>
  );
}

function isLicenseExpired(dateString) {
  const expiryDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expiryDate < today;
}

function shouldShowExtendAction(license) {
  if (license.status === "Revoked") return false;

  const expiryDate = new Date(license.expires);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const differenceInMs = expiryDate.getTime() - today.getTime();
  const differenceInDays = differenceInMs / (1000 * 60 * 60 * 24);

  return license.status === "Expired" || differenceInDays <= 90;
}

function formatDateForTable(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}