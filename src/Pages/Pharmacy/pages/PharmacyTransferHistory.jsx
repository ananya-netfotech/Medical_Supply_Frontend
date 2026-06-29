import { useState } from "react";
import {
  ArrowDownToLine,
  BadgeIndianRupee,
  CalendarDays,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Filter,
  History,
  PackageCheck,
  Pill,
  Search,
  ShieldAlert,
  UserRound,
  XCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronRight,
  Clock,
  Building2,
  Users,
  AlertCircle,
  Info,
} from "lucide-react";

const stats = [
  {
    title: "Total Movements",
    value: "1,284",
    note: "Received + dispensed records",
    icon: History,
    tone: "purple",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "Stock Received",
    value: "428",
    note: "From manufacturers",
    icon: ArrowDownToLine,
    tone: "blue",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    title: "Dispensed to Citizens",
    value: "812",
    note: "Ownership transferred",
    icon: UserRound,
    tone: "emerald",
    trend: "+6.3%",
    trendUp: true,
  },
  {
    title: "Blocked / Recalled",
    value: "44",
    note: "Requires attention",
    icon: ShieldAlert,
    tone: "rose",
    trend: "-2.1%",
    trendUp: false,
  },
];

const transferRows = [
  {
    id: "TRF-PHR-2026-001",
    type: "Received",
    medicine: "Paracetamol 500mg",
    batchNo: "SUN-PARA-0426",
    lotNo: "LOT-7842",
    quantity: "10,000",
    from: "Sun Pharma",
    to: "Apollo Pharmacy, Pune",
    date: "16 Jun 2026",
    linkedClaim: "-",
    status: "Completed",
  },
  {
    id: "DSP-PHR-2026-088",
    type: "Dispensed",
    medicine: "Paracetamol 500mg",
    batchNo: "SUN-PARA-0426",
    lotNo: "LOT-7842",
    quantity: "20",
    from: "Apollo Pharmacy, Pune",
    to: "Ravi Kumar",
    date: "17 Jun 2026",
    linkedClaim: "PMJAY-CLM-2026-0091",
    status: "Claim Submitted",
  },
  {
    id: "DSP-PHR-2026-089",
    type: "Dispensed",
    medicine: "Amoxicillin 250mg",
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    quantity: "15",
    from: "Apollo Pharmacy, Pune",
    to: "Anita Sharma",
    date: "17 Jun 2026",
    linkedClaim: "PMJAY-CLM-2026-0092",
    status: "Completed",
  },
  {
    id: "BLK-PHR-2026-011",
    type: "Blocked",
    medicine: "Human Insulin",
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    quantity: "250",
    from: "Cold Chain Inventory",
    to: "Blocked Stock",
    date: "18 Jun 2026",
    linkedClaim: "-",
    status: "Recall Watch",
  },
  {
    id: "RTN-PHR-2026-004",
    type: "Return",
    medicine: "Cetirizine Tablets",
    batchNo: "SUN-CET-0625",
    lotNo: "LOT-1102",
    quantity: "600",
    from: "Apollo Pharmacy, Pune",
    to: "Manufacturer Review",
    date: "18 Jun 2026",
    linkedClaim: "-",
    status: "Under Review",
  },
];

const timeline = [
  {
    title: "Stock received",
    description:
      "10,000 units of SUN-PARA-0426 received from Sun Pharma and added to pharmacy inventory.",
    time: "16 Jun 2026 · 10:30 AM",
    status: "Completed",
  },
  {
    title: "Citizen verification completed",
    description:
      "PM-JAY beneficiary details verified before medicine dispensing.",
    time: "17 Jun 2026 · 02:10 PM",
    status: "Completed",
  },
  {
    title: "Medicine dispensed",
    description:
      "20 units transferred from pharmacy inventory to Ravi Kumar.",
    time: "17 Jun 2026 · 02:18 PM",
    status: "Completed",
  },
  {
    title: "PM-JAY claim submitted",
    description:
      "Claim PMJAY-CLM-2026-0091 submitted against dispensed medicine.",
    time: "17 Jun 2026 · 02:30 PM",
    status: "Claim Submitted",
  },
  {
    title: "Stock received",
    description:
      "5,000 units of Amoxicillin 250mg received from Sun Pharma.",
    time: "18 Jun 2026 · 09:15 AM",
    status: "Completed",
  },
  {
    title: "Quality check passed",
    description:
      "Batch SUN-AMOX-1125 passed quality inspection.",
    time: "18 Jun 2026 · 10:30 AM",
    status: "Completed",
  },
];

const auditNotes = [
  "Received stock must be linked to manufacturer transfer records.",
  "Dispensed medicines should create citizen-level medicine history.",
  "PM-JAY linked dispensing must preserve claim reference details.",
  "Recall-watch or expired batches must not be dispensed.",
  "Completed movement records should remain read-only for audit integrity.",
];

const recipients = [
  {
    label: "Citizens Served",
    value: "642",
    icon: UserRound,
  },
  {
    label: "PM-JAY Linked Dispensing",
    value: "318",
    icon: BadgeIndianRupee,
  },
  {
    label: "Batches Received",
    value: "86",
    icon: PackageCheck,
  },
];

const getTypeStyles = (type) => {
  const map = {
    Received: "bg-blue-50 text-blue-700 border-blue-200",
    Dispensed: "bg-emerald-50 text-emerald-700 border-emerald-200",
    Blocked: "bg-rose-50 text-rose-700 border-rose-200",
    Return: "bg-purple-50 text-purple-700 border-purple-200",
  };
  return map[type] || map.Received;
};

export default function PharmacyTransferHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6 bg-slate-50 p-6">
      {/* Header - Subtle purple */}
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
              <span className="text-xs text-purple-100/70">
                Stock Movement Audit
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              Transfer History
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-100/80 leading-relaxed">
              View all pharmacy stock movements including received inventory,
              dispensing, citizen transfers, blocked batches, returns and PM-JAY
              linked transactions.
            </p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Total Movements</p>
            <p className="text-xl font-bold text-white mt-1">1,284</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +8.2%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Citizens Served</p>
            <p className="text-xl font-bold text-white mt-1">642</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">PM-JAY Claims</p>
            <p className="text-xl font-bold text-white mt-1">318</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +6.3%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Blocked Stock</p>
            <p className="text-xl font-bold text-white mt-1">44</p>
            <span className="inline-flex items-center gap-1 text-xs text-rose-300">
              <TrendingDown className="h-3 w-3" />
              -2.1%
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

      {/* Filters */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
        <div className="grid gap-3 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <input
              placeholder="Search transfer ID, batch, citizen or claim..."
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
            <option value="All">All Types</option>
            <option value="Received">Received</option>
            <option value="Dispensed">Dispensed</option>
            <option value="Blocked">Blocked</option>
            <option value="Return">Return</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Claim Submitted">Claim Submitted</option>
            <option value="Recall Watch">Recall Watch</option>
            <option value="Under Review">Under Review</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          />
        </div>
      </div>

      {/* Main Content - 2 Column Layout with equal height */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Movement Records Table */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-sm border border-purple-200 overflow-hidden flex flex-col h-[520px]">
            <div className="border-b border-purple-200/60 px-5 py-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-purple-700">Movement Records</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {transferRows.length} movements found
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
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">ID</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Type</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Medicine</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Batch</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Qty</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">From → To</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Date</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {transferRows.map((item) => {
                    const typeStyle = getTypeStyles(item.type);
                    return (
                      <tr key={item.id} className="border-b border-purple-100 hover:bg-purple-50/60 transition-colors group">
                        <td className="px-3 py-3 font-mono text-xs font-medium text-purple-700">{item.id}</td>
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
                        <td className="px-3 py-3">
                          <div className="flex flex-col">
                            <span className="text-xs text-slate-600">{item.from}</span>
                            <span className="text-[10px] text-slate-400">→ {item.to}</span>
                          </div>
                        </td>
                        <td className="px-3 py-3 text-xs text-slate-500">{item.date}</td>
                        <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                        <td className="px-3 py-3 text-right">
                          <div className="flex justify-end gap-1">
                            <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                              <Eye className="h-3.5 w-3.5" />
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
                <span className="text-slate-500">Showing {transferRows.length} of {transferRows.length} entries</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50 disabled:opacity-50" disabled>Previous</button>
                  <button className="px-3 py-1.5 rounded-md bg-purple-600 text-white shadow-sm">1</button>
                  <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar with scrollable timeline */}
        <div className="space-y-6 h-[520px] overflow-y-auto">
          {/* Movement Timeline - Scrollable */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3 flex-shrink-0">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Movement Timeline</h2>
                <span className="ml-auto text-xs text-slate-400">{timeline.length} events</span>
              </div>
            </div>
            <div className="p-4 space-y-4 max-h-[280px] overflow-y-auto">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                      <CheckCircle2 className="h-4 w-4" />
                    </div>
                    {index !== timeline.length - 1 && (
                      <div className="h-full w-px bg-purple-200 mt-1" style={{ height: 'calc(100% - 2rem)' }} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                    <div className="mt-2">
                      <StatusBadge status={item.status} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Movement Summary */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <PackageCheck className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Movement Summary</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {recipients.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-center gap-3 rounded-lg border border-purple-200 p-3 hover:shadow-sm transition-shadow">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-500">{item.label}</p>
                      <p className="text-xl font-bold text-slate-900">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - All in one row */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Audit Notes */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-purple-600" />
              <h2 className="text-sm font-semibold text-purple-700">Audit Notes</h2>
            </div>
          </div>
          <div className="p-4 space-y-2 max-h-[200px] overflow-y-auto">
            {auditNotes.map((note, idx) => (
              <div key={idx} className="flex gap-2 p-2 rounded-lg bg-purple-50/50 border border-purple-100">
                <CalendarDays className="h-3.5 w-3.5 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-600 leading-relaxed">{note}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Operational Relevance */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200 lg:col-span-2">
          <div className="border-b border-purple-200/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-purple-600" />
              <h2 className="text-sm font-semibold text-purple-700">Operational Relevance</h2>
            </div>
          </div>
          <div className="p-4 space-y-2">
            <div className="flex gap-3 p-2 rounded-lg bg-purple-50/50 border border-purple-100">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <Pill className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Drug inspector audit support</p>
                <p className="text-xs text-slate-500">Batch, lot, quantity and movement details can be shown during State Drug Control inspections.</p>
              </div>
            </div>
            <div className="flex gap-3 p-2 rounded-lg bg-purple-50/50 border border-purple-100">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <BadgeIndianRupee className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">PM-JAY claim linkage</p>
                <p className="text-xs text-slate-500">Medicine dispensing linked to claim IDs helps connect stock movement with Ayushman Bharat transactions.</p>
              </div>
            </div>
            <div className="flex gap-3 p-2 rounded-lg bg-purple-50/50 border border-purple-100">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                <ShieldAlert className="h-4 w-4" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-900">Recall traceability</p>
                <p className="text-xs text-slate-500">If a recalled batch is identified, the pharmacy can trace whether it was received, blocked or dispensed.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <History className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900">All movements are auditable</p>
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
    Received: "bg-blue-50 text-blue-700",
    Dispensed: "bg-emerald-50 text-emerald-700",
    Blocked: "bg-rose-50 text-rose-700",
    Return: "bg-purple-50 text-purple-700",
    Completed: "bg-emerald-50 text-emerald-700",
    "Claim Submitted": "bg-blue-50 text-blue-700",
    "Recall Watch": "bg-rose-50 text-rose-700",
    "Under Review": "bg-amber-50 text-amber-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}