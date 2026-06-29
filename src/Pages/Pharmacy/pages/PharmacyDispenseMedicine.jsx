import { useState } from "react";
import {
  AlertTriangle,
  BadgeIndianRupee,
  CheckCircle2,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  PackageCheck,
  Pill,
  ReceiptText,
  Search,
  Send,
  ShieldCheck,
  UserCheck,
  UserRound,
  XCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronRight,
  Info,
  Calendar,
  Users,
  Clock,
} from "lucide-react";

const stats = [
  {
    title: "Dispensed Today",
    value: "188",
    note: "Medicine units issued",
    icon: Pill,
    tone: "purple",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "PM-JAY Linked",
    value: "74",
    note: "Eligible scheme transactions",
    icon: BadgeIndianRupee,
    tone: "emerald",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    title: "Citizen Verified",
    value: "126",
    note: "Before dispensing",
    icon: UserCheck,
    tone: "blue",
    trend: "+5.3%",
    trendUp: true,
  },
  {
    title: "Blocked Attempts",
    value: "5",
    note: "Recall / expiry restriction",
    icon: XCircle,
    tone: "rose",
    trend: "-2.1%",
    trendUp: false,
  },
];

const dispenseRows = [
  {
    id: "DSP-PHR-2026-088",
    citizen: "Ravi Kumar",
    pmjayId: "AB-PMJAY-9081",
    medicine: "Paracetamol 500mg",
    batchNo: "SUN-PARA-0426",
    lotNo: "LOT-7842",
    quantity: "20",
    amount: "₹1,850",
    claimLinked: "Yes",
    status: "Dispensed",
    date: "18 Jun 2026",
  },
  {
    id: "DSP-PHR-2026-089",
    citizen: "Anita Sharma",
    pmjayId: "AB-PMJAY-7654",
    medicine: "Amoxicillin 250mg",
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    quantity: "15",
    amount: "₹2,400",
    claimLinked: "Yes",
    status: "Claim Pending",
    date: "18 Jun 2026",
  },
  {
    id: "DSP-PHR-2026-090",
    citizen: "Salim Khan",
    pmjayId: "AB-PMJAY-3412",
    medicine: "Cetirizine Tablets",
    batchNo: "SUN-CET-0625",
    lotNo: "LOT-1102",
    quantity: "10",
    amount: "₹900",
    claimLinked: "No",
    status: "Dispensed",
    date: "17 Jun 2026",
  },
  {
    id: "DSP-PHR-2026-091",
    citizen: "Priya Nair",
    pmjayId: "AB-PMJAY-8821",
    medicine: "Human Insulin",
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    quantity: "5",
    amount: "₹6,800",
    claimLinked: "Yes",
    status: "Blocked",
    date: "17 Jun 2026",
  },
];

const validationChecks = [
  {
    title: "Citizen verification",
    description: "Citizen has valid PM-JAY Beneficiary ID and masked Aadhaar verification.",
    status: "Passed",
  },
  {
    title: "Medicine batch status",
    description: "Selected batch is active and available in pharmacy inventory.",
    status: "Passed",
  },
  {
    title: "Expiry check",
    description: "Medicine is not expired and is safe for dispensing.",
    status: "Passed",
  },
  {
    title: "Recall check",
    description: "No active recall or recall-watch block exists for selected batch.",
    status: "Passed",
  },
  {
    title: "PM-JAY claim readiness",
    description: "Treatment episode and claim fields are ready for submission.",
    status: "Optional",
  },
];

const recentActivity = [
  {
    title: "Medicine dispensed",
    description: "20 units of Paracetamol 500mg dispensed to Ravi Kumar.",
    time: "Today · 02:18 PM",
  },
  {
    title: "PM-JAY claim prepared",
    description: "Claim draft generated for DSP-PHR-2026-088.",
    time: "Today · 02:30 PM",
  },
  {
    title: "Dispensing blocked",
    description: "Human Insulin batch SUN-INS-0926 blocked due to recall watch.",
    time: "Yesterday · 05:10 PM",
  },
];

const rules = [
  "Medicine should be dispensed only from available inventory.",
  "Expired or recalled batches must be blocked automatically.",
  "PM-JAY linked dispensing requires beneficiary verification before claim creation.",
  "Dispensing creates citizen-level medicine ownership and medicine history.",
  "Every dispensing transaction should be auditable with batch, lot and pharmacy details.",
];

export default function PharmacyDispenseMedicine() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedClaim, setSelectedClaim] = useState("All");
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
              <span className="text-xs text-purple-100/70">Medicine Dispensing Operations</span>
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              Dispense Medicine
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-100/80 leading-relaxed">
              Transfer medicine ownership from pharmacy inventory to verified citizens
              while checking inventory availability, expiry, recall status and PM-JAY eligibility.
            </p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Today's Dispense</p>
            <p className="text-xl font-bold text-white mt-1">188</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +8.2%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">PM-JAY Linked</p>
            <p className="text-xl font-bold text-white mt-1">74</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Verified Citizens</p>
            <p className="text-xl font-bold text-white mt-1">126</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +5.3%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Blocked Attempts</p>
            <p className="text-xl font-bold text-white mt-1">5</p>
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

      {/* Main Content - Dispense Form + Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Dispense Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-5 py-3">
              <h2 className="text-base font-semibold text-purple-700">Dispense Medicine to Citizen</h2>
              <p className="text-xs text-slate-500 mt-0.5">Select citizen, medicine batch and quantity before completing dispensing</p>
            </div>
            <div className="p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Citizen / Beneficiary ID" placeholder="AB-PMJAY-9081" />
                <FormField label="Citizen Name" placeholder="Ravi Kumar" />
                <FormField label="Medicine" placeholder="Paracetamol 500mg" />
                <FormField label="Batch Number" placeholder="SUN-PARA-0426" />
                <FormField label="Lot Number" placeholder="LOT-7842" />
                <FormField label="Quantity" placeholder="20" />
                <FormField label="Amount" placeholder="₹1,850" />
                <FormField label="Treatment Episode ID" placeholder="TEP-AIIMS-2026-009" />
              </div>

              <div className="mt-5 rounded-lg bg-purple-50 p-3 border border-purple-100">
                <div className="flex gap-3">
                  <PackageCheck className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-purple-900">Available Stock: 34,500 units</p>
                    <p className="text-xs text-purple-700 mt-0.5">Selected batch is active, not expired and not under recall watch.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <FileCheck2 className="h-4 w-4 inline mr-2" />
                  Save Draft
                </button>
                <button className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors">
                  <ShieldCheck className="h-4 w-4 inline mr-2" />
                  Validate
                </button>
                <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors shadow-sm">
                  <Send className="h-4 w-4 inline mr-2" />
                  Complete Dispensing
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Dispensing Validation */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Dispensing Validation</h2>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[280px] overflow-y-auto">
              {validationChecks.map((item) => (
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

          {/* Recent Activity */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Recent Activity</h2>
              </div>
            </div>
            <div className="p-4 space-y-4 max-h-[200px] overflow-y-auto">
              {recentActivity.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                      <ReceiptText className="h-4 w-4" />
                    </div>
                    {index !== recentActivity.length - 1 && (
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

      {/* Filters */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <input
              placeholder="Search dispensing ID, citizen, medicine or batch..."
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
            <option value="Dispensed">Dispensed</option>
            <option value="Claim Pending">Claim Pending</option>
            <option value="Blocked">Blocked</option>
          </select>

          <select
            value={selectedClaim}
            onChange={(e) => setSelectedClaim(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">Claim Linked</option>
            <option value="Yes">Yes</option>
            <option value="No">No</option>
          </select>
        </div>
      </div>

      {/* Dispensing Register Table */}
      <div className="rounded-lg bg-white shadow-sm border border-purple-200 overflow-hidden flex flex-col">
        <div className="border-b border-purple-200/60 px-5 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-purple-700">Dispensing Register</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {dispenseRows.length} records found
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
          <table className="w-full min-w-[1100px] text-sm border-collapse">
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr className="border-b border-purple-200">
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Dispense ID</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Citizen</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Medicine</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Batch</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Qty</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Amount</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">PM-JAY</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {dispenseRows.map((item) => (
                <tr key={item.id} className="border-b border-purple-100 hover:bg-purple-50/60 transition-colors group">
                  <td className="px-3 py-3 font-mono text-xs font-medium text-purple-700">{item.id}</td>
                  <td className="px-3 py-3">
                    <p className="text-sm font-medium text-slate-900">{item.citizen}</p>
                    <p className="text-[10px] text-slate-400">{item.pmjayId}</p>
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-700">{item.medicine}</td>
                  <td className="px-3 py-3">
                    <p className="text-xs font-medium text-slate-700">{item.batchNo}</p>
                    <p className="text-[10px] text-slate-400">{item.lotNo}</p>
                  </td>
                  <td className="px-3 py-3 text-sm font-medium text-slate-700">{item.quantity}</td>
                  <td className="px-3 py-3 text-sm font-semibold text-slate-700">{item.amount}</td>
                  <td className="px-3 py-3"><StatusBadge status={item.claimLinked} /></td>
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
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="border-t border-purple-200 px-4 py-2.5 flex-shrink-0">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-500">Showing {dispenseRows.length} of {dispenseRows.length} entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-md bg-purple-600 text-white shadow-sm">1</button>
              <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Dispensing Rules */}
      <div className="rounded-lg bg-white shadow-sm border border-purple-200">
        <div className="border-b border-purple-200/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-purple-600" />
            <h2 className="text-base font-semibold text-purple-700">Dispensing Rules</h2>
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
              <Pill className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900">All dispensing transactions are auditable</p>
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

function DispenseForm() {
  return (
    <div className="rounded-3xl border border-purple-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-purple-700">
        Dispense Medicine to Citizen
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Select citizen, medicine batch and quantity before completing
        dispensing.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField label="Citizen / Beneficiary ID" placeholder="AB-PMJAY-9081" />
        <FormField label="Citizen Name" placeholder="Ravi Kumar" />
        <FormField label="Medicine" placeholder="Paracetamol 500mg" />
        <FormField label="Batch Number" placeholder="SUN-PARA-0426" />
        <FormField label="Lot Number" placeholder="LOT-7842" />
        <FormField label="Quantity" placeholder="20" />
        <FormField label="Amount" placeholder="₹1,850" />
        <FormField label="Treatment Episode ID" placeholder="TEP-AIIMS-2026-009" />
      </div>

      <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-4">
        <div className="flex gap-3">
          <PackageCheck className="mt-0.5 h-5 w-5 text-purple-700" />
          <div>
            <p className="text-sm font-bold text-purple-950">
              Available Stock: 34,500 units
            </p>
            <p className="mt-1 text-sm leading-6 text-purple-700">
              Selected batch is active, not expired and not under recall watch.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          <FileCheck2 className="h-4 w-4" />
          Save Draft
        </button>

        <button className="inline-flex items-center gap-2 rounded-2xl border border-purple-200 bg-purple-50 px-5 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-100">
          <ShieldCheck className="h-4 w-4" />
          Validate Dispensing
        </button>

        <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-purple-700/20 hover:opacity-95">
          <Send className="h-4 w-4" />
          Complete Dispensing
        </button>
      </div>
    </div>
  );
}

function FormField({ label, placeholder }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <input
        placeholder={placeholder}
        className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
      />
    </label>
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
    Dispensed: "bg-emerald-50 text-emerald-700",
    "Claim Pending": "bg-blue-50 text-blue-700",
    Blocked: "bg-rose-50 text-rose-700",
    Passed: "bg-emerald-50 text-emerald-700",
    Optional: "bg-blue-50 text-blue-700",
    Yes: "bg-emerald-50 text-emerald-700",
    No: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}