import { useMemo, useState } from "react";
import { Award, Plus } from "lucide-react";
import IssueLicensePopup from "../../../Components/Popups/Government/IssueLicensePopup";
import LicenseSearch from "../../../Components/Government/Licensing/LicenseSearch";
import LicenseTable from "../../../Components/Government/Licensing/LicenseTable";
import LicensePagination from "../../../Components/Government/Licensing/LicensePagination";
import RevokeModal from "../../../Components/Government/Licensing/RevokeModal";
import ExtendModal from "../../../Components/Government/Licensing/ExtendModal";

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

function isLicenseExpired(dateString) {
  const expiryDate = new Date(dateString);
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return expiryDate < today;
}

function formatDateForTable(dateString) {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
}

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

    return licenses.filter((license) =>
      license.licenseId.toLowerCase().includes(query) ||
      license.manufacturerId.toLowerCase().includes(query) ||
      license.drugTypeId.toLowerCase().includes(query) ||
      license.status.toLowerCase().includes(query) ||
      license.issuedBy.toLowerCase().includes(query)
    );
  }, [licenses, searchTerm]);

  const totalPages = Math.ceil(filteredLicenses.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentLicenses = filteredLicenses.slice(startIndex, endIndex);

  const handleIssueLicense = (newLicense) => {
    setLicenses((prevLicenses) => [newLicense, ...prevLicenses]);
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
          ? { ...item, status: "Revoked", revokedReason: revokeReason.trim() }
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
          ? { ...item, expires: formattedDate, status: "Valid" }
          : item
      )
    );

    setExtendModal(null);
    setNewExpireDate("");
  };

  const handleSearch = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
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

        <LicenseSearch searchTerm={searchTerm} onSearch={handleSearch} />

        <LicenseTable
          currentLicenses={currentLicenses}
          filteredCount={filteredLicenses.length}
          searchTerm={searchTerm}
          onToggleStatus={handleToggleStatus}
          onExtend={openExtendModal}
        />

        <LicensePagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          totalCount={filteredLicenses.length}
          onPageChange={setCurrentPage}
        />
      </div>

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