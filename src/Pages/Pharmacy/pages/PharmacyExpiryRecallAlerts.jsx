import { useState } from "react";
import {
  AlertTriangle,
  Ban,
  Bell,
  CalendarClock,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Filter,
  PackageX,
  Pill,
  Search,
  ShieldAlert,
  Upload,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronRight,
  Clock,
  UserRound,
  Info,
  FileWarning,
} from "lucide-react";

const stats = [
  {
    title: "Near Expiry Stock",
    value: "1,240",
    note: "Units expiring within 90 days",
    icon: CalendarClock,
    tone: "purple",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "Expired Stock",
    value: "186",
    note: "Must not be dispensed",
    icon: PackageX,
    tone: "rose",
    trend: "-2.1%",
    trendUp: false,
  },
  {
    title: "Recall Watch",
    value: "3",
    note: "Batches under recall review",
    icon: ShieldAlert,
    tone: "rose",
    trend: "+1",
    trendUp: true,
  },
  {
    title: "Cleared Alerts",
    value: "28",
    note: "Resolved this month",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+12",
    trendUp: true,
  },
];

const alertRows = [
  {
    alertId: "ALR-PHR-2026-001",
    type: "Recall Watch",
    medicine: "Human Insulin",
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    manufacturer: "Sun Pharma",
    quantity: "250",
    expiryDate: "08 Sep 2027",
    severity: "High",
    action: "Block Dispensing",
    status: "Active",
  },
  {
    alertId: "ALR-PHR-2026-002",
    type: "Near Expiry",
    medicine: "Cetirizine Tablets",
    batchNo: "SUN-CET-0625",
    lotNo: "LOT-1102",
    manufacturer: "Sun Pharma",
    quantity: "600",
    expiryDate: "18 Jun 2026",
    severity: "Medium",
    action: "Review Stock",
    status: "Pending Review",
  },
  {
    alertId: "ALR-PHR-2026-003",
    type: "Expired",
    medicine: "Cough Syrup",
    batchNo: "CIP-CS-0224",
    lotNo: "LOT-4401",
    manufacturer: "Cipla",
    quantity: "86",
    expiryDate: "01 Jun 2026",
    severity: "High",
    action: "Quarantine Stock",
    status: "Blocked",
  },
  {
    alertId: "ALR-PHR-2026-004",
    type: "Recall Notice",
    medicine: "Amoxicillin 250mg",
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    manufacturer: "Sun Pharma",
    quantity: "120",
    expiryDate: "22 Nov 2027",
    severity: "High",
    action: "Notify Citizens",
    status: "Action Required",
  },
];

const citizenImpact = [
  {
    batchNo: "SUN-AMOX-1125",
    medicine: "Amoxicillin 250mg",
    citizens: "18",
    status: "Notification Required",
  },
  {
    batchNo: "SUN-INS-0926",
    medicine: "Human Insulin",
    citizens: "07",
    status: "Under Review",
  },
  {
    batchNo: "CIP-CS-0224",
    medicine: "Cough Syrup",
    citizens: "00",
    status: "No Dispensing Found",
  },
];

const requiredActions = [
  {
    title: "Stop dispensing recalled batches",
    description:
      "Recall-watch and recalled batches should be blocked from medicine dispensing immediately.",
    status: "Critical",
  },
  {
    title: "Quarantine expired stock",
    description:
      "Expired medicines must be physically separated and marked as non-dispensable.",
    status: "Required",
  },
  {
    title: "Notify affected citizens",
    description:
      "Citizens who received recalled batches should receive recall notifications through their dashboard.",
    status: "Pending",
  },
  {
    title: "Upload stock action report",
    description:
      "Pharmacy should submit a response confirming stock blocked, returned or disposed.",
    status: "Pending",
  },
];

const timeline = [
  {
    title: "Recall notice received",
    description:
      "Recall notice linked to batch SUN-AMOX-1125 was received from Regulatory Authority.",
    time: "18 Jun 2026 · 09:00 AM",
  },
  {
    title: "Inventory scan completed",
    description:
      "120 units of the affected batch were found in pharmacy inventory.",
    time: "18 Jun 2026 · 09:12 AM",
  },
  {
    title: "Dispensing restricted",
    description:
      "System marked batch as restricted for future dispensing.",
    time: "18 Jun 2026 · 09:18 AM",
  },
  {
    title: "Citizen impact identified",
    description:
      "18 citizens were identified as having received the affected batch.",
    time: "18 Jun 2026 · 09:30 AM",
  },
];

const documents = [
  {
    name: "Recall Notice",
    type: "Regulatory Document",
    status: "Received",
  },
  {
    name: "Stock Quarantine Report",
    type: "Pharmacy Response",
    status: "Required",
  },
  {
    name: "Citizen Notification Log",
    type: "Alert Record",
    status: "Pending",
  },
  {
    name: "Disposal / Return Note",
    type: "Stock Action",
    status: "Draft",
  },
];

const rules = [
  "Expired medicine must not be dispensed under any condition.",
  "Recall-watch batches should be blocked until cleared by authority.",
  "Affected citizens must be identified using dispensing history.",
  "PM-JAY claim-linked medicine records should retain recall status.",
  "Stock quarantine, return or disposal action should be auditable.",
];

const getTypeStyles = (type) => {
  const map = {
    "Recall Watch": "bg-purple-50 text-purple-700 border-purple-200",
    "Recall Notice": "bg-purple-50 text-purple-700 border-purple-200",
    Expired: "bg-rose-50 text-rose-700 border-rose-200",
    "Near Expiry": "bg-amber-50 text-amber-700 border-amber-200",
  };
  return map[type] || map["Near Expiry"];
};

export default function PharmacyExpiryRecallAlerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6 bg-slate-50 p-6">
      {/* Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-purple-600/90 to-indigo-700/90 p-6 shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-400/10 rounded-full blur-2xl" />

        <div className="relative flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/15 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                LIVE
              </span>
              <span className="text-xs text-purple-100/70">Medicine Safety & Stock Risk</span>
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              Expiry & Recall Alerts
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-100/80 leading-relaxed">
              Monitor expired medicines, near-expiry stock, recalled batches,
              citizen impact and stock quarantine actions.
            </p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Total Alerts</p>
            <p className="text-xl font-bold text-white mt-1">47</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +12%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Critical</p>
            <p className="text-xl font-bold text-white mt-1">8</p>
            <span className="inline-flex items-center gap-1 text-xs text-rose-300">
              <TrendingUp className="h-3 w-3" />
              +2
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Affected Citizens</p>
            <p className="text-xl font-bold text-white mt-1">25</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingDown className="h-3 w-3" />
              -5
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Resolved</p>
            <p className="text-xl font-bold text-white mt-1">28</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +12
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Critical Alert Banner */}
      <div className="rounded-lg bg-purple-50 p-4 border border-purple-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-purple-600 shadow-sm">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-purple-900">
                Critical Alert: Recalled / Expired Stock Must Not Be Dispensed
              </h2>
              <p className="mt-0.5 text-xs text-purple-700">
                Affected batches should be blocked, quarantined and reviewed before further sale or PM-JAY linked dispensing.
              </p>
            </div>
          </div>
          <button className="rounded-lg border border-purple-200 bg-white px-3 py-1.5 text-xs font-medium text-purple-700 hover:bg-purple-100 transition-colors whitespace-nowrap">
            View Critical Stock
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
        <div className="grid gap-3 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <input
              placeholder="Search alert ID, medicine, batch or manufacturer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-purple-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
            />
          </div>

          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">All Alert Types</option>
            <option value="Recall Watch">Recall Watch</option>
            <option value="Recall Notice">Recall Notice</option>
            <option value="Near Expiry">Near Expiry</option>
            <option value="Expired">Expired</option>
          </select>

          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">All Severity</option>
            <option value="High">High</option>
            <option value="Medium">Medium</option>
            <option value="Low">Low</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          />
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Alert Register Table */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-sm border border-purple-200 overflow-hidden flex flex-col h-[520px]">
            <div className="border-b border-purple-200/60 px-5 py-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-purple-700">Expiry & Recall Alert Register</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {alertRows.length} alerts found
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button 
                    onClick={handleRefresh}
                    className="rounded-lg border border-purple-200 p-1.5 text-purple-500 hover:bg-purple-50"
                  >
                    <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </button>
                  <button className="text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors inline-flex items-center gap-0.5">
                    View All
                    <ChevronRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-auto flex-1">
              <table className="w-full min-w-[1200px] text-sm border-collapse">
                <thead className="sticky top-0 bg-slate-50 z-10">
                  <tr className="border-b border-purple-200">
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Alert ID</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Type</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Medicine</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Batch</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Qty</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Expiry</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Severity</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {alertRows.map((item) => {
                    const typeStyle = getTypeStyles(item.type);
                    return (
                      <tr key={item.alertId} className="border-b border-purple-100 hover:bg-purple-50/60 transition-colors group">
                        <td className="px-3 py-3 font-mono text-xs font-medium text-purple-700">{item.alertId}</td>
                        <td className="px-3 py-3">
                          <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium border ${typeStyle}`}>
                            {item.type}
                          </span>
                        </td>
                        <td className="px-3 py-3 text-sm text-slate-700">{item.medicine}</td>
                        <td className="px-3 py-3">
                          <p className="text-xs font-medium text-slate-700">{item.batchNo}</p>
                          <p className="text-[10px] text-slate-400">{item.lotNo}</p>
                        </td>
                        <td className="px-3 py-3 text-sm font-medium text-slate-700">{item.quantity}</td>
                        <td className="px-3 py-3 text-xs text-slate-500">{item.expiryDate}</td>
                        <td className="px-3 py-3"><StatusBadge status={item.severity} /></td>
                        <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                        <td className="px-3 py-3 text-right">
                          <div className="flex justify-end gap-1">
                            <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                              <Eye className="h-3.5 w-3.5" />
                            </button>
                            <button className="rounded p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors">
                              <Ban className="h-3.5 w-3.5" />
                            </button>
                            <button className="rounded p-1.5 text-slate-400 hover:text-purple-600 hover:bg-purple-50 transition-colors opacity-0 group-hover:opacity-100">
                              <Download className="h-3.5 w-3.5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-purple-200 px-4 py-2.5 flex-shrink-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Showing {alertRows.length} of {alertRows.length} entries</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50 disabled:opacity-50" disabled>Previous</button>
                  <button className="px-3 py-1.5 rounded-md bg-purple-600 text-white shadow-sm">1</button>
                  <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6 h-[520px] overflow-y-auto">
          {/* Required Actions */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <FileWarning className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Required Actions</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {requiredActions.map((item) => (
                <div key={item.title} className="rounded-lg border border-purple-200 p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Recall Timeline */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Recall Timeline</h2>
              </div>
            </div>
            <div className="p-4 space-y-4 max-h-[200px] overflow-y-auto">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                      <Bell className="h-4 w-4" />
                    </div>
                    {index !== timeline.length - 1 && (
                      <div className="h-full w-px bg-purple-200 mt-1" style={{ height: 'calc(100% - 2rem)' }} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Citizen Impact & Documents */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Citizen Impact */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <UserRound className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Citizen Impact Review</h2>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {citizenImpact.map((item) => (
              <div key={item.batchNo} className="flex items-center justify-between rounded-lg border border-purple-200 p-3 hover:shadow-sm transition-shadow">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.batchNo}</p>
                  <p className="text-xs text-slate-500">{item.medicine}</p>
                </div>
                <div className="flex items-center gap-4">
                  <span className="text-sm font-medium text-slate-700">
                    {item.citizens} citizens
                  </span>
                  <StatusBadge status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Documents */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Supporting Documents</h2>
            </div>
          </div>
          <div className="p-5 grid gap-3 sm:grid-cols-2">
            {documents.map((doc) => (
              <div key={doc.name} className="rounded-lg border border-purple-200 p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-start gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <FileText className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{doc.name}</p>
                    <p className="text-xs text-slate-500">{doc.type}</p>
                    <div className="mt-2">
                      <StatusBadge status={doc.status} />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Safety Rules */}
      <div className="rounded-lg bg-white shadow-sm border border-purple-200">
        <div className="border-b border-purple-200/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-purple-600" />
            <h2 className="text-base font-semibold text-purple-700">Pharmacy Safety Rules</h2>
          </div>
        </div>
        <div className="p-5 grid gap-3 md:grid-cols-2">
          {rules.map((rule, idx) => (
            <div key={idx} className="flex gap-3 p-3 rounded-lg bg-purple-50/50 border border-purple-100">
              <AlertTriangle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-slate-600 leading-relaxed">{rule}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <ShieldAlert className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900">All alerts are auditable</p>
              <p className="text-xs text-slate-500">Last updated: Today, 2:30 PM</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
              View Audit Log
            </button>
            <button className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
              System Status
            </button>
            <button className="text-xs font-medium text-purple-600 hover:text-purple-700 transition-colors">
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, note, icon: Icon, tone, trend, trendUp }) {
  const toneColors = {
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
    blue: "bg-blue-50 text-blue-600",
    amber: "bg-amber-50 text-amber-600",
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
          {trend && (
            <span className={`inline-flex items-center gap-0.5 text-xs font-medium mt-1 ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
              {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
              {trend}
            </span>
          )}
          <p className="text-xs text-slate-400 mt-1">{note}</p>
        </div>
        <div className={`rounded-lg p-2 ${toneColors[tone]}`}>
          <Icon className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    "Recall Watch": "bg-purple-50 text-purple-700",
    "Recall Notice": "bg-purple-50 text-purple-700",
    Expired: "bg-rose-50 text-rose-700",
    "Near Expiry": "bg-amber-50 text-amber-700",
    High: "bg-rose-50 text-rose-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-blue-50 text-blue-700",
    Active: "bg-rose-50 text-rose-700",
    "Pending Review": "bg-amber-50 text-amber-700",
    Blocked: "bg-rose-50 text-rose-700",
    "Action Required": "bg-rose-50 text-rose-700",
    Critical: "bg-rose-50 text-rose-700",
    Required: "bg-amber-50 text-amber-700",
    Pending: "bg-amber-50 text-amber-700",
    Received: "bg-blue-50 text-blue-700",
    Draft: "bg-slate-100 text-slate-600",
    "Notification Required": "bg-amber-50 text-amber-700",
    "Under Review": "bg-blue-50 text-blue-700",
    "No Dispensing Found": "bg-emerald-50 text-emerald-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}