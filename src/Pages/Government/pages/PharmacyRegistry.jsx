import { useMemo, useState } from "react";
import {
  Building2,
  Factory,
  Plus,
  Search,
  UsersRound,
} from "lucide-react";

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
    participantId: "DST-PART-002",
    role: "Distributor",
    name: "Sneha Patel",
    organization: "MedPlus Distributor",
    email: "medplus.distributor@example.in",
    phone: "+91-40-67234000",
    status: "Active",
    registered: "1/18/2024",
    registeredBy: "State Drug Control Telangana",
  },
];

export default function PharmacyRegistry() {
  const [activeTab, setActiveTab] = useState("manufacturers");
  const [searchTerm, setSearchTerm] = useState("");

  const activeData = activeTab === "manufacturers" ? manufacturers : pharmacies;

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

  return (
    <div className="min-h-[calc(100vh-5rem)] bg-slate-50 px-1 py-2">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-10 flex flex-col justify-between gap-6 lg:flex-row lg:items-start">
          <div className="flex items-start gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-100 text-blue-700">
              <UsersRound className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-3xl font-bold tracking-tight text-slate-950">
                Participant Registry
              </h1>

              <p className="mt-2 text-lg leading-7 text-slate-500">
                Register and manage manufacturers and pharmacies
              </p>
            </div>
          </div>

          <button
            type="button"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-blue-700 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-800"
          >
            <Plus className="h-4 w-4" />
            Register Participant
          </button>
        </div>

        {/* Tabs */}
        <div className="mb-9 inline-flex rounded-xl bg-slate-200/60 p-1">
          <TabButton
            active={activeTab === "manufacturers"}
            onClick={() => setActiveTab("manufacturers")}
            icon={Factory}
            label="Manufacturers"
          />

          <TabButton
            active={activeTab === "pharmacies"}
            onClick={() => setActiveTab("pharmacies")}
            icon={Building2}
            label="Pharmacies"
          />
        </div>

        {/* Search */}
        <div className="mb-5 max-w-md">
          <label className="relative block">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />

            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by participant ID, role, name, org, email, or registrar..."
              className="h-12 w-full rounded-xl border border-slate-300 bg-white pl-12 pr-4 text-base text-slate-700 shadow-sm outline-none transition placeholder:text-slate-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
            />
          </label>
        </div>

        {/* Table */}
        <div className="overflow-hidden rounded-2xl border border-slate-300 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1380px] border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-300 bg-slate-100/80">
                  <TableHead>Participant ID</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Organization</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Phone</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Registered</TableHead>
                  <TableHead>Registered By</TableHead>
                </tr>
              </thead>

              <tbody>
                {filteredParticipants.map((participant) => (
                  <tr
                    key={`${participant.participantId}-${participant.email}`}
                    className="border-b border-slate-300 transition last:border-b-0 hover:bg-blue-50/35"
                  >
                    <td className="px-5 py-4">
                      <span className="font-mono text-sm font-medium text-slate-600">
                        {participant.participantId}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <RoleBadge role={participant.role} />
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-sm font-bold text-white">
                          {getInitial(participant.name)}
                        </div>

                        <p className="text-base font-semibold text-slate-950">
                          {participant.name}
                        </p>
                      </div>
                    </td>

                    <td className="px-5 py-4 text-base font-medium text-slate-900">
                      {participant.organization}
                    </td>

                    <td className="px-5 py-4 text-base font-medium text-slate-500">
                      {participant.email}
                    </td>

                    <td className="px-5 py-4 text-base text-slate-500">
                      {participant.phone}
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex rounded-full border border-emerald-300 bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">
                        {participant.status}
                      </span>
                    </td>

                    <td className="px-5 py-4 text-base text-slate-500">
                      {participant.registered}
                    </td>

                    <td className="px-5 py-4">
                      <span className="text-sm font-medium text-slate-700">
                        {participant.registeredBy}
                      </span>
                    </td>
                  </tr>
                ))}

                {filteredParticipants.length === 0 && (
                  <tr>
                    <td
                      colSpan={9}
                      className="px-5 py-14 text-center text-slate-500"
                    >
                      No participants found for “{searchTerm}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon: Icon, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-3 py-2 text-base font-semibold transition ${
        active
          ? "bg-white text-slate-950 shadow-sm"
          : "text-slate-800 hover:bg-white/70"
      }`}
    >
      <Icon className="h-5 w-5" />
      {label}
    </button>
  );
}

function RoleBadge({ role }) {
  const normalizedRole = role.toLowerCase();

  const styles = {
    manufacturer: "border-blue-300 bg-blue-100 text-blue-700",
    pharmacy: "border-emerald-300 bg-emerald-100 text-emerald-700",
    distributor: "border-amber-300 bg-amber-100 text-amber-700",
  };

  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-sm font-semibold ${
        styles[normalizedRole] || "border-slate-300 bg-slate-100 text-slate-700"
      }`}
    >
      {role}
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

function getInitial(name) {
  return name?.trim()?.charAt(0)?.toUpperCase() || "U";
}