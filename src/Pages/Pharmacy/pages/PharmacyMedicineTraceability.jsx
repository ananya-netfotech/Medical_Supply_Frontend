import { useState } from "react";
import {
  AlertTriangle,
  ArrowDownToLine,
  ArrowRight,
  BadgeIndianRupee,
  Building2,
  CheckCircle2,
  Download,
  Eye,
  Factory,
  FileText,
  Filter,
  MapPin,
  PackageCheck,
  Pill,
  QrCode,
  Search,
  ShieldAlert,
  Truck,
  UserRound,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronRight,
  Info,
  Clock,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Traceable Batches",
    value: "86",
    note: "Available in inventory",
    icon: QrCode,
    tone: "purple",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "Received Transfers",
    value: "428",
    note: "Manufacturer to pharmacy",
    icon: ArrowDownToLine,
    tone: "blue",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    title: "Dispensed Records",
    value: "812",
    note: "Linked to citizens",
    icon: UserRound,
    tone: "emerald",
    trend: "+6.3%",
    trendUp: true,
  },
  {
    title: "Risk Flags",
    value: "7",
    note: "Recall / expiry / review",
    icon: ShieldAlert,
    tone: "rose",
    trend: "-2.1%",
    trendUp: false,
  },
];

const traceRows = [
  {
    traceId: "TRC-PHR-2026-001",
    medicine: "Paracetamol 500mg",
    batchNo: "SUN-PARA-0426",
    lotNo: "LOT-7842",
    manufacturer: "Sun Pharma",
    receivedFrom: "Sun Pharma Mumbai Plant",
    receivedDate: "16 Jun 2026",
    currentQty: "34,500",
    dispensedQty: "220",
    status: "Active",
    risk: "Low Risk",
  },
  {
    traceId: "TRC-PHR-2026-002",
    medicine: "Amoxicillin 250mg",
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    manufacturer: "Sun Pharma",
    receivedFrom: "Pune Distribution Store",
    receivedDate: "14 Jun 2026",
    currentQty: "18,000",
    dispensedQty: "145",
    status: "Under Review",
    risk: "Medium Risk",
  },
  {
    traceId: "TRC-PHR-2026-003",
    medicine: "Human Insulin",
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    manufacturer: "Sun Pharma",
    receivedFrom: "Cold Chain Storage - Mumbai",
    receivedDate: "12 Jun 2026",
    currentQty: "250",
    dispensedQty: "07",
    status: "Recall Watch",
    risk: "High Risk",
  },
  {
    traceId: "TRC-PHR-2026-004",
    medicine: "Cetirizine Tablets",
    batchNo: "SUN-CET-0625",
    lotNo: "LOT-1102",
    manufacturer: "Sun Pharma",
    receivedFrom: "Nagpur Warehouse",
    receivedDate: "11 Jun 2026",
    currentQty: "600",
    dispensedQty: "38",
    status: "Near Expiry",
    risk: "Medium Risk",
  },
];

const traceTimeline = [
  {
    title: "Drug registered",
    description: "Drug type approved and listed by Regulatory Authority.",
    actor: "CDSCO / State Drug Control",
    time: "01 Jan 2026",
    icon: Building2,
  },
  {
    title: "Batch created",
    description: "Batch SUN-PARA-0426 manufactured with lot LOT-7842.",
    actor: "Sun Pharma",
    time: "12 Apr 2026",
    icon: Factory,
  },
  {
    title: "Stock transferred",
    description: "10,000 units transferred to Apollo Pharmacy, Pune.",
    actor: "Manufacturer",
    time: "16 Jun 2026",
    icon: Truck,
  },
  {
    title: "Stock received",
    description: "Pharmacy received stock and added it to inventory.",
    actor: "Apollo Pharmacy",
    time: "16 Jun 2026",
    icon: PackageCheck,
  },
  {
    title: "Dispensed to citizen",
    description: "20 units dispensed to Ravi Kumar under PM-JAY workflow.",
    actor: "Pharmacy / Distributor",
    time: "17 Jun 2026",
    icon: UserRound,
  },
];

const ownershipChain = [
  {
    from: "Sun Pharma",
    to: "Apollo Pharmacy, Pune",
    quantity: "10,000 units",
    date: "16 Jun 2026",
    status: "Completed",
  },
  {
    from: "Apollo Pharmacy, Pune",
    to: "Ravi Kumar",
    quantity: "20 units",
    date: "17 Jun 2026",
    status: "Dispensed",
  },
];

const traceChecks = [
  {
    title: "Manufacturer license reference",
    description: "Medicine is linked to manufacturer license LIC-MFG-CDSCO-2026-001.",
    status: "Verified",
  },
  {
    title: "Batch and lot mapping",
    description: "Batch number and lot number are available for traceability.",
    status: "Verified",
  },
  {
    title: "Inventory movement record",
    description: "Manufacturer-to-pharmacy stock transfer is recorded.",
    status: "Verified",
  },
  {
    title: "Citizen ownership",
    description: "Dispensed units are linked to citizen medicine history.",
    status: "Available",
  },
  {
    title: "Recall status",
    description: "No active recall is linked to selected batch.",
    status: "Clear",
  },
];

const rules = [
  "Pharmacy can trace only medicine batches received in its authorized inventory.",
  "Citizen-level traceability should show only medicines dispensed to that citizen.",
  "Batch, lot, manufacturer and transfer history should remain read-only after completion.",
  "Recall and expiry status must be visible before dispensing.",
  "Traceability records support Drug Inspector audit and recall investigation workflows.",
];

export default function PharmacyMedicineTraceability() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRisk, setSelectedRisk] = useState("All");
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
              <span className="text-xs text-purple-100/70">Batch Movement Visibility</span>
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              Medicine Traceability
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-100/80 leading-relaxed">
              Track medicine origin, manufacturer, batch numbers, stock transfers,
              pharmacy receipt, dispensing history and citizen ownership.
            </p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Traceable Batches</p>
            <p className="text-xl font-bold text-white mt-1">86</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +8.2%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Received Transfers</p>
            <p className="text-xl font-bold text-white mt-1">428</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Citizen Dispensed</p>
            <p className="text-xl font-bold text-white mt-1">812</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +6.3%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Risk Flags</p>
            <p className="text-xl font-bold text-white mt-1">7</p>
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
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <input
              placeholder="Search medicine, batch, lot or manufacturer..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-purple-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">All Status</option>
            <option value="Active">Active</option>
            <option value="Under Review">Under Review</option>
            <option value="Recall Watch">Recall Watch</option>
            <option value="Near Expiry">Near Expiry</option>
          </select>

          <select
            value={selectedRisk}
            onChange={(e) => setSelectedRisk(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">All Risk Levels</option>
            <option value="Low Risk">Low Risk</option>
            <option value="Medium Risk">Medium Risk</option>
            <option value="High Risk">High Risk</option>
          </select>
        </div>
      </div>

      {/* Main Content - Table + Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Traceability Register Table */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-sm border border-purple-200 overflow-hidden flex flex-col">
            <div className="border-b border-purple-200/60 px-5 py-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-purple-700">Traceability Register</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {traceRows.length} records found
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

            <div className="overflow-auto">
              <table className="w-full min-w-[1200px] text-sm border-collapse">
                <thead className="sticky top-0 bg-slate-50 z-10">
                  <tr className="border-b border-purple-200">
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Trace ID</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Medicine</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Batch</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Manufacturer</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Qty</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Risk</th>
                    <th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {traceRows.map((item) => (
                    <tr key={item.traceId} className="border-b border-purple-100 hover:bg-purple-50/60 transition-colors group">
                      <td className="px-3 py-3 font-mono text-xs font-medium text-purple-700">{item.traceId}</td>
                      <td className="px-3 py-3 text-sm text-slate-700">{item.medicine}</td>
                      <td className="px-3 py-3">
                        <p className="text-xs font-medium text-slate-700">{item.batchNo}</p>
                        <p className="text-[10px] text-slate-400">{item.lotNo}</p>
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-600">{item.manufacturer}</td>
                      <td className="px-3 py-3 text-sm font-medium text-slate-700">{item.currentQty}</td>
                      <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                      <td className="px-3 py-3"><StatusBadge status={item.risk} /></td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors opacity-0 group-hover:opacity-100">
                            <QrCode className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            <div className="border-t border-purple-200 px-4 py-2.5 flex-shrink-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Showing {traceRows.length} of {traceRows.length} entries</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50 disabled:opacity-50" disabled>Previous</button>
                  <button className="px-3 py-1.5 rounded-md bg-purple-600 text-white shadow-sm">1</button>
                  <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Selected Batch Summary */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <PackageCheck className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Batch Summary</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="rounded-lg bg-purple-50 p-4 border border-purple-100">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-purple-700 shadow-sm">
                    <Pill className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-purple-900">Paracetamol 500mg</p>
                    <p className="text-xs text-purple-700 mt-0.5">Batch SUN-PARA-0426 · LOT-7842</p>
                  </div>
                </div>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  <div className="rounded-lg bg-white p-2">
                    <p className="text-[10px] text-slate-500">Manufacturer</p>
                    <p className="text-xs font-semibold text-slate-900">Sun Pharma</p>
                  </div>
                  <div className="rounded-lg bg-white p-2">
                    <p className="text-[10px] text-slate-500">Inventory</p>
                    <p className="text-xs font-semibold text-slate-900">34,500 units</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Traceability Checks */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Traceability Checks</h2>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[220px] overflow-y-auto">
              {traceChecks.map((item) => (
                <div key={item.title} className="flex items-start justify-between gap-3 rounded-lg border border-purple-200 p-3">
                  <div className="flex-1">
                    <p className="text-sm font-medium text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{item.description}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Timeline & Ownership */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Medicine Lifecycle Timeline */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Medicine Lifecycle Timeline</h2>
            </div>
          </div>
          <div className="p-5 space-y-4 max-h-[350px] overflow-y-auto">
            {traceTimeline.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    {index !== traceTimeline.length - 1 && (
                      <div className="h-full w-px bg-purple-200 mt-1" style={{ height: 'calc(100% - 2rem)' }} />
                    )}
                  </div>
                  <div className="flex-1 pb-4">
                    <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.actor} · {item.time}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Ownership Movement Chain */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <ArrowRight className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Ownership Movement Chain</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {ownershipChain.map((item, index) => (
              <div key={`${item.from}-${item.to}`} className="rounded-lg border border-purple-200 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">{item.from}</p>
                    <p className="text-xs text-slate-400">{item.date}</p>
                  </div>
                  <ArrowRight className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <div className="flex-1 text-right">
                    <p className="text-sm font-semibold text-slate-900">{item.to}</p>
                    <p className="text-xs text-slate-400">{item.quantity}</p>
                  </div>
                </div>
                <div className="mt-2">
                  <StatusBadge status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traceability Rules */}
      <div className="rounded-lg bg-white shadow-sm border border-purple-200">
        <div className="border-b border-purple-200/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-purple-600" />
            <h2 className="text-base font-semibold text-purple-700">Traceability Rules</h2>
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
              <QrCode className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900">All traceability records are auditable</p>
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

function Panel({ title, children }) {
  return (
    <div className="rounded-3xl border border-purple-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-purple-700">{title}</h2>
      <div className="mt-5">{children}</div>
    </div>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Active: "bg-emerald-50 text-emerald-700",
    Verified: "bg-emerald-50 text-emerald-700",
    Available: "bg-emerald-50 text-emerald-700",
    Clear: "bg-emerald-50 text-emerald-700",
    Completed: "bg-emerald-50 text-emerald-700",
    Dispensed: "bg-emerald-50 text-emerald-700",
    "Under Review": "bg-blue-50 text-blue-700",
    "Near Expiry": "bg-amber-50 text-amber-700",
    "Low Risk": "bg-emerald-50 text-emerald-700",
    "Medium Risk": "bg-amber-50 text-amber-700",
    "High Risk": "bg-rose-50 text-rose-700",
    "Recall Watch": "bg-rose-50 text-rose-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}