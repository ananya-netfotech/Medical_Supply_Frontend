import { useMemo, useState } from "react";
import {
  Award,
  CalendarDays,
  Plus,
  Search,
  X,
  XCircle,
} from "lucide-react";

const initialLicenses = [
  {
    licenseId: "bbbbbbbb...",
    manufacturerId: "MFG-CIP-001",
    drugTypeId: "DRUG-ATV-020",
    status: "Expired",
    issued: "1/25/2024",
    expires: "1/25/2026",
    issuedBy: "CDSCO West Zone",
    revokedReason: "",
  },
  {
    licenseId: "bbbbbbbb...",
    manufacturerId: "MFG-CIP-001",
    drugTypeId: "DRUG-PCM-500",
    status: "Valid",
    issued: "1/25/2024",
    expires: "6/1/2027",
    issuedBy: "CDSCO West Zone",
    revokedReason: "",
  },
  {
    licenseId: "bbbbbbbb...",
    manufacturerId: "MFG-SUN-002",
    drugTypeId: "DRUG-AMX-500",
    status: "Expired",
    issued: "1/20/2024",
    expires: "1/20/2026",
    issuedBy: "CDSCO Central Licensing Authority",
    revokedReason: "",
  },
  {
    licenseId: "bbbbbbbb...",
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
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <Award className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                License Management
              </h1>

              <p className="mt-2 text-lg leading-7 text-slate-500">
                Issue, revoke, and prolong manufacturer licenses
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" />
            Issue License
          </button>
        </div>

        {/* Search */}
        <div className="mb-7 max-w-md">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by license ID, manufacturer ID, issuer, or drug type ID..."
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1320px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100/80">
                  <TableHead>License ID</TableHead>
                  <TableHead>Manufacturer ID</TableHead>
                  <TableHead>Drug Type ID</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Issued</TableHead>
                  <TableHead>Issued By</TableHead>
                  <TableHead>Expires</TableHead>
                  <TableHead>Actions</TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredLicenses.map((license, index) => {
                  const isExpired = license.status === "Expired";
                  const isRevoked = license.status === "Revoked";
                  const shouldShowExtend = shouldShowExtendAction(license);

                  return (
                    <tr
                      key={`${license.licenseId}-${license.drugTypeId}-${index}`}
                      className="border-b border-slate-300 transition last:border-b-0 hover:bg-blue-50/35"
                    >
                      <td className="px-5 py-5">
                        <span className="font-mono text-sm text-slate-500">
                          {license.licenseId}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span className="font-mono text-sm font-medium text-slate-600">
                          {license.manufacturerId}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <span className="font-mono text-sm font-medium text-slate-600">
                          {license.drugTypeId}
                        </span>
                      </td>

                      <td className="px-5 py-5">
                        <div className="space-y-3">
                          <LicenseStatus status={license.status} />

                          <StatusToggle
                            checked={!isRevoked}
                            onChange={() => handleToggleStatus(license)}
                          />

                          {isRevoked && license.revokedReason && (
                            <p className="max-w-[220px] text-xs leading-5 text-red-500">
                              Reason: {license.revokedReason}
                            </p>
                          )}
                        </div>
                      </td>

                      <td className="px-5 py-5 text-base text-slate-500">
                        {license.issued}
                      </td>

                      <td className="px-5 py-5">
                        <span className="text-base font-medium text-slate-700">
                          {license.issuedBy}
                        </span>
                      </td>

                      <td
                        className={`px-5 py-5 text-base font-medium ${
                          isExpired ? "text-red-500" : "text-slate-950"
                        }`}
                      >
                        {license.expires}
                      </td>

                      <td className="px-5 py-5">
                        <div className="min-w-[180px]">
                          {isRevoked ? (
                            <div className="inline-flex whitespace-nowrap rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600">
                              License revoked
                            </div>
                          ) : shouldShowExtend ? (
                            <button
                              type="button"
                              onClick={() => openExtendModal(license)}
                              className="inline-flex whitespace-nowrap items-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 transition hover:bg-blue-100"
                            >
                              <CalendarDays className="h-4 w-4 shrink-0" />
                              Extend
                            </button>
                          ) : (
                            <span className="inline-flex whitespace-nowrap rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                              No extension needed
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
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      No licenses found for “{searchTerm}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

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
        className={`relative inline-flex h-7 w-12 shrink-0 items-center rounded-full border transition-colors duration-300 ${
          checked
            ? "border-emerald-300 bg-emerald-500"
            : "border-red-300 bg-red-500"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow-sm transition-transform duration-300 ${
            checked ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>

      <span
        className={`min-w-[58px] text-sm font-semibold ${
          checked ? "text-emerald-700" : "text-red-600"
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
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-lg overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Extend License Expiry
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Select a new expiry date for this manufacturer license.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-5 rounded-2xl border border-blue-100 bg-blue-50 p-4">
            <div className="grid gap-3 text-sm sm:grid-cols-2">
              <Info label="License ID" value={license.licenseId} />
              <Info label="Current Expire At" value={license.expires} />
              <Info label="Manufacturer ID" value={license.manufacturerId} />
              <Info label="Drug Type ID" value={license.drugTypeId} />
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              New Expire At Date
            </span>

            <input
              type="date"
              value={newExpireDate}
              onChange={(event) => setNewExpireDate(event.target.value)}
              className="h-12 w-full rounded-2xl border border-slate-300 bg-white px-4 text-sm text-slate-800 outline-none transition focus:border-blue-400 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={!canExtend}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
              canExtend
                ? "bg-blue-700 hover:bg-blue-800"
                : "cursor-not-allowed bg-blue-300"
            }`}
          >
            <CalendarDays className="h-4 w-4" />
            Extend License
          </button>
        </div>
      </div>
    </div>
  );
}

function RevokeModal({
  license,
  reason,
  setReason,
  onClose,
  onConfirm,
}) {
  const canRevoke = reason.trim().length >= 5;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-slate-950/50 px-4 backdrop-blur-sm">
      <div className="w-full max-w-xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-slate-200 px-6 py-5">
          <div>
            <h2 className="text-xl font-bold text-slate-950">
              Revoke Manufacturer License
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Revocation requires a reason for audit and regulatory record.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-xl p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="px-6 py-5">
          <div className="mb-5 rounded-2xl border border-red-100 bg-red-50 p-4">
            <p className="text-sm font-semibold text-red-700">
              License selected for revocation
            </p>

            <div className="mt-3 grid gap-3 text-sm sm:grid-cols-2">
              <Info label="Manufacturer ID" value={license.manufacturerId} />
              <Info label="Drug Type ID" value={license.drugTypeId} />
              <Info label="License ID" value={license.licenseId} />
            </div>
          </div>

          <label className="block">
            <span className="mb-2 block text-sm font-semibold text-slate-700">
              Revocation Reason
            </span>

            <textarea
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              rows={5}
              placeholder="Example: License revoked due to failed quality audit, expired compliance documents, or violation of manufacturing conditions..."
              className="w-full resize-none rounded-2xl border border-slate-300 bg-white px-4 py-3 text-sm leading-6 text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-red-400 focus:ring-4 focus:ring-red-100"
            />
          </label>

          <p className="mt-2 text-xs text-slate-500">
            Minimum 5 characters required. This reason will be stored in the
            audit trail.
          </p>
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 bg-slate-50 px-6 py-5 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={!canRevoke}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold text-white transition ${
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
      <p className="text-xs font-semibold uppercase tracking-[0.12em] text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-medium text-slate-900">{value}</p>
    </div>
  );
}

function LicenseStatus({ status }) {
  const styles = {
    Expired: "border-orange-300 bg-orange-100 text-orange-700",
    Valid: "border-emerald-300 bg-emerald-100 text-emerald-700",
    Revoked: "border-red-300 bg-red-100 text-red-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
        styles[status] || "border-slate-300 bg-slate-100 text-slate-700"
      }`}
    >
      {status}
    </span>
  );
}

function TableHead({ children }) {
  return (
    <th className="px-5 py-4 text-xs font-bold uppercase tracking-[0.12em] text-slate-500">
      {children}
    </th>
  );
}

function isLicenseExpired(dateString) {
  const expiryDate = new Date(dateString);
  const today = new Date();

  return expiryDate < today;
}

function shouldShowExtendAction(license) {
  if (license.status === "Revoked") return false;

  const expiryDate = new Date(license.expires);
  const today = new Date();

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