import { useMemo, useState } from "react";
import {
  Building2,
  Factory,
  Plus,
  Search,
  UsersRound,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import RegisterParticipantPopup from "../../../Components/Popups/Government/RegisterParticipantPopup";

const manufacturers = [
  {
    participantId: "MFG-PART-001",
    role: "Manufacturer",
    name: "Priya Sharma",
    organization: "Cipla Limited",
    email: "mfr2@cipla.in",
    phone: "+91-22-25001000",
    status: "Active",
    registered: "1/20/2024",
    registeredBy: "CDSCO West Zone Admin",
  },
  {
    participantId: "MFG-PART-002",
    role: "Manufacturer",
    name: "Arjun Mehta",
    organization: "Sun Pharmaceuticals Ltd.",
    email: "mfr1@sunpharma.in",
    phone: "+91-22-43241000",
    status: "Active",
    registered: "1/15/2024",
    registeredBy: "CDSCO Central Licensing Authority",
  },
];

const pharmacies = [
  {
    participantId: "PHR-PART-001",
    role: "Pharmacy",
    name: "Ravi Kumar",
    organization: "Apollo Pharmacy",
    email: "apollo.pharmacy@example.in",
    phone: "+91-80-44112000",
    status: "Active",
    registered: "1/22/2024",
    registeredBy: "State Drug Control Karnataka",
  },
  {
    participantId: "PHR-PART-002",
    role: "Pharmacy",
    name: "Sneha Patel",
    organization: "MedPlus Pharmacy",
    email: "medplus.pharmacy@example.in",
    phone: "+91-40-67234000",
    status: "Active",
    registered: "1/18/2024",
    registeredBy: "State Drug Control Telangana",
  },
];

export default function PharmacyRegistry() {
  const [activeTab, setActiveTab] = useState("manufacturers");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const itemsPerPage = 10;

  const [manufacturersList, setManufacturersList] = useState(manufacturers);
  const [pharmaciesList, setPharmaciesList] = useState(pharmacies);

  const activeData = activeTab === "manufacturers" ? manufacturersList : pharmaciesList;

  const filteredParticipants = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    if (!query) return activeData;

    return activeData.filter((participant) => {
      return (
        participant.participantId.toLowerCase().includes(query) ||
        participant.role.toLowerCase().includes(query) ||
        participant.name.toLowerCase().includes(query) ||
        participant.organization.toLowerCase().includes(query) ||
        participant.email.toLowerCase().includes(query) ||
        participant.phone.toLowerCase().includes(query) ||
        participant.status.toLowerCase().includes(query) ||
        participant.registeredBy.toLowerCase().includes(query)
      );
    });
  }, [activeData, searchTerm]);

  // Pagination
  const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentParticipants = filteredParticipants.slice(startIndex, endIndex);

  const handleRegisterParticipant = (newParticipant) => {
    if (newParticipant.role === "Manufacturer") {
      setManufacturersList(prev => [newParticipant, ...prev]);
    } else {
      setPharmaciesList(prev => [newParticipant, ...prev]);
    }
    console.log("New participant registered:", newParticipant);
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
              <UsersRound className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
                Authorized Participant Registry
              </h1>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsPopupOpen(true)}
            className="inline-flex w-auto items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
          >
            <Plus className="h-4 w-4" />
            <span className="whitespace-nowrap">Register Participant</span>
          </button>
        </div>

        {/* Description */}
        <p className="mb-6 text-base text-gray-600">
          Manage registered manufacturers, pharmacies, and authorized operating contacts
        </p>

        {/* Tabs */}
        <div className="mb-6 inline-flex rounded-md border border-blue-200 bg-white p-1">
          <TabButton
            active={activeTab === "manufacturers"}
            onClick={() => {
              setActiveTab("manufacturers");
              setCurrentPage(1);
              setSearchTerm("");
            }}
            icon={Factory}
            label="Manufacturers"
          />

          <TabButton
            active={activeTab === "pharmacies"}
            onClick={() => {
              setActiveTab("pharmacies");
              setCurrentPage(1);
              setSearchTerm("");
            }}
            icon={Building2}
            label="Pharmacies"
          />
        </div>

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
              placeholder="Search by registration no., role, contact person, organization, email, or registering authority..."
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
                    Participant Registration No.
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Participant Role
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Authorized Contact
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Registered Organization
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Official Email
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Contact Number
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Operational Status
                  </th>
                  <th className="border-b border-r border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Registered On
                  </th>
                  <th className="border-b border-blue-200 bg-blue-50 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Registered By
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100 bg-white">
                {currentParticipants.map((participant) => (
                  <tr
                    key={`${participant.participantId}-${participant.email}`}
                    className="transition-colors hover:bg-blue-50/40"
                  >
                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="font-mono text-sm font-medium text-blue-700">
                        {participant.participantId}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <RoleBadge role={participant.role} />
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                          {getInitial(participant.name)}
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                          {participant.name}
                        </p>
                      </div>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="text-sm font-medium text-gray-800">
                        {participant.organization}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {participant.email}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {participant.phone}
                      </span>
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <StatusBadge status={participant.status} />
                    </td>

                    <td className="border-r border-blue-100 px-4 py-3">
                      <span className="text-sm text-gray-600">
                        {participant.registered}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <span className="text-sm text-gray-700 whitespace-normal block">
                        {participant.registeredBy}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredParticipants.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p>No authorized participant records found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
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
            <span className="font-medium text-gray-900">{Math.min(endIndex, filteredParticipants.length)}</span> of{' '}
            <span className="font-medium text-gray-900">{filteredParticipants.length}</span> entries
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

      {/* Register Participant Popup */}
      <RegisterParticipantPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onSuccess={handleRegisterParticipant}
      />
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium transition-colors ${
        active
          ? "bg-blue-50 text-blue-700"
          : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
      }`}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {label}
    </button>
  );
}

function RoleBadge({ role }) {
  const normalizedRole = role.toLowerCase();

  const styles = {
    manufacturer: "border-blue-200 bg-blue-50 text-blue-700",
    pharmacy: "border-green-200 bg-green-50 text-green-700",
    distributor: "border-purple-200 bg-purple-50 text-purple-700",
    wholesaler: "border-amber-200 bg-amber-50 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2.5 py-1 text-xs font-semibold ${
        styles[normalizedRole] || "border-gray-200 bg-gray-50 text-gray-700"
      }`}
    >
      {role}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "border-green-200 bg-green-50 text-green-700",
    Inactive: "border-gray-200 bg-gray-50 text-gray-600",
    Suspended: "border-red-200 bg-red-50 text-red-700",
    "Under Review": "border-amber-200 bg-amber-50 text-amber-700",
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

function TableHead({ children }) {
  return (
    <th className="px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
      {children}
    </th>
  );
}

function getInitial(name) {
  return name?.trim()?.charAt(0)?.toUpperCase() || "U";
}