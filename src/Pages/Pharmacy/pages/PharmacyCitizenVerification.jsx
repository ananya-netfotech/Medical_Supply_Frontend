import { useState } from "react";
import {
  AlertTriangle,
  BadgeIndianRupee,
  CheckCircle2,
  Clock,
  Eye,
  FileCheck2,
  Fingerprint,
  HeartPulse,
  IdCard,
  Search,
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
} from "lucide-react";

const stats = [
  {
    title: "Verified Citizens",
    value: "642",
    note: "Successful verifications",
    icon: UserCheck,
    tone: "emerald",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "PM-JAY Eligible",
    value: "318",
    note: "Eligible beneficiaries",
    icon: BadgeIndianRupee,
    tone: "purple",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    title: "Pending Review",
    value: "24",
    note: "Manual verification needed",
    icon: Clock,
    tone: "blue",
    trend: "-2.1%",
    trendUp: false,
  },
  {
    title: "Failed Verification",
    value: "18",
    note: "Mismatch or inactive records",
    icon: XCircle,
    tone: "rose",
    trend: "+5.3%",
    trendUp: true,
  },
];

const verificationRows = [
  {
    id: "VER-CIT-2026-001",
    citizen: "Ravi Kumar",
    pmjayId: "AB-PMJAY-9081",
    aadhaar: "XXXX-XXXX-1234",
    abha: "14-XXXX-9081",
    state: "Maharashtra",
    eligibility: "Eligible",
    coverage: "Active",
    status: "Verified",
  },
  {
    id: "VER-CIT-2026-002",
    citizen: "Anita Sharma",
    pmjayId: "AB-PMJAY-7654",
    aadhaar: "XXXX-XXXX-7745",
    abha: "14-XXXX-7654",
    state: "Karnataka",
    eligibility: "Eligible",
    coverage: "Active",
    status: "Verified",
  },
  {
    id: "VER-CIT-2026-003",
    citizen: "Salim Khan",
    pmjayId: "AB-PMJAY-3412",
    aadhaar: "XXXX-XXXX-2211",
    abha: "Not Linked",
    state: "Uttar Pradesh",
    eligibility: "Review Required",
    coverage: "Pending",
    status: "Manual Review",
  },
  {
    id: "VER-CIT-2026-004",
    citizen: "Priya Nair",
    pmjayId: "AB-PMJAY-8821",
    aadhaar: "XXXX-XXXX-3309",
    abha: "14-XXXX-8821",
    state: "Tamil Nadu",
    eligibility: "Not Eligible",
    coverage: "Inactive",
    status: "Failed",
  },
];

const verificationChecks = [
  {
    title: "Aadhaar Last 4 Match",
    description: "Aadhaar last four digits match citizen-submitted details.",
    status: "Passed",
  },
  {
    title: "PM-JAY Beneficiary ID",
    description: "Beneficiary ID exists and is eligible for scheme benefits.",
    status: "Passed",
  },
  {
    title: "Coverage Status",
    description: "Family coverage is active and available for claim usage.",
    status: "Passed",
  },
  {
    title: "ABHA Readiness",
    description: "ABHA ID can be stored for future ABDM integration.",
    status: "Optional",
  },
];

const recentActivity = [
  {
    title: "Citizen verified",
    description: "Ravi Kumar verified successfully using PM-JAY Beneficiary ID.",
    time: "Today · 10:20 AM",
  },
  {
    title: "Manual review initiated",
    description: "Salim Khan verification moved to manual review.",
    time: "Today · 11:05 AM",
  },
  {
    title: "Coverage check completed",
    description: "Family coverage status confirmed for Anita Sharma.",
    time: "Yesterday · 04:30 PM",
  },
];

const rules = [
  "Citizen verification should happen before PM-JAY linked dispensing.",
  "Aadhaar should be masked; do not display full Aadhaar number.",
  "ABHA should be treated as future ABDM-ready information if live integration is not available.",
  "Only verified beneficiaries should be allowed for PM-JAY claim submission.",
  "Failed verification should not block normal cash purchase unless policy requires scheme validation.",
];

export default function PharmacyCitizenVerification() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedEligibility, setSelectedEligibility] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6 bg-slate-50 p-6">
      {/* Header - Purple theme */}
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
              <span className="text-xs text-purple-100/70">Beneficiary Identity & Eligibility</span>
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              Citizen Verification
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-100/80 leading-relaxed">
              Verify citizens before Ayushman Bharat PM-JAY linked medicine dispensing using
              masked Aadhaar details, PM-JAY Beneficiary ID, coverage status and ABHA readiness.
            </p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Total Citizens</p>
            <p className="text-xl font-bold text-white mt-1">642</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +8.2%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">PM-JAY Eligible</p>
            <p className="text-xl font-bold text-white mt-1">318</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Pending Review</p>
            <p className="text-xl font-bold text-white mt-1">24</p>
            <span className="inline-flex items-center gap-1 text-xs text-amber-300">
              <TrendingDown className="h-3 w-3" />
              -2.1%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Verification Rate</p>
            <p className="text-xl font-bold text-white mt-1">94%</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +3.2%
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

      {/* Main Content - Verify Form + Sidebar with equal height */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Verify Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-5 py-3">
              <h2 className="text-base font-semibold text-purple-700">Verify Citizen / Beneficiary</h2>
              <p className="text-xs text-slate-500 mt-0.5">Validate citizen details before PM-JAY linked medicine dispensing</p>
            </div>
            <div className="p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="Citizen Name" placeholder="Ravi Kumar" icon={UserRound} />
                <FormField label="PM-JAY Beneficiary ID" placeholder="AB-PMJAY-9081" icon={IdCard} />
                <FormField label="Aadhaar Last 4 Digits" placeholder="1234" icon={Fingerprint} />
                <FormField label="ABHA ID (Optional)" placeholder="14-XXXX-9081" icon={HeartPulse} />
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  Clear
                </button>
                <button className="inline-flex items-center gap-2 rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors shadow-sm">
                  <ShieldCheck className="h-4 w-4" />
                  Verify Beneficiary
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar - Matches left column height */}
        <div className="space-y-6 h-full">
          {/* Verification Result */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Verification Result</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="rounded-lg bg-purple-50 p-4 border border-purple-100">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-purple-700 shadow-sm">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-purple-900">Citizen eligible for PM-JAY linked dispensing</p>
                    <p className="text-xs text-purple-700 mt-0.5">Beneficiary ID, Aadhaar last four digits and scheme coverage status have been validated.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Checks - Scrollable to match left column */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200 flex-1">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Verification Checks</h2>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[220px] overflow-y-auto">
              {verificationChecks.map((item) => (
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

      {/* Filters */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
        <div className="grid gap-3 md:grid-cols-4">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <input
              placeholder="Search citizen, PM-JAY ID or verification ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-purple-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
            />
          </div>

          <select
            value={selectedEligibility}
            onChange={(e) => setSelectedEligibility(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">All Eligibility</option>
            <option value="Eligible">Eligible</option>
            <option value="Not Eligible">Not Eligible</option>
            <option value="Review Required">Review Required</option>
          </select>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">All Status</option>
            <option value="Verified">Verified</option>
            <option value="Manual Review">Manual Review</option>
            <option value="Failed">Failed</option>
          </select>
        </div>
      </div>

      {/* Verification Register Table */}
      <div className="rounded-lg bg-white shadow-sm border border-purple-200 overflow-hidden flex flex-col">
        <div className="border-b border-purple-200/60 px-5 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-purple-700">Citizen Verification Register</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {verificationRows.length} records found
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
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">ID</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Citizen</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">PM-JAY ID</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Aadhaar</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">ABHA</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">State</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Eligibility</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {verificationRows.map((item) => (
                <tr key={item.id} className="border-b border-purple-100 hover:bg-purple-50/60 transition-colors group">
                  <td className="px-3 py-3 font-mono text-xs font-medium text-purple-700">{item.id}</td>
                  <td className="px-3 py-3">
                    <p className="text-sm font-medium text-slate-900">{item.citizen}</p>
                    <p className="text-[10px] text-slate-400">{item.state}</p>
                  </td>
                  <td className="px-3 py-3 text-xs font-mono text-slate-600">{item.pmjayId}</td>
                  <td className="px-3 py-3 text-xs font-mono text-slate-600">{item.aadhaar}</td>
                  <td className="px-3 py-3 text-xs font-mono text-slate-600">{item.abha}</td>
                  <td className="px-3 py-3 text-xs text-slate-600">{item.state}</td>
                  <td className="px-3 py-3"><StatusBadge status={item.eligibility} /></td>
                  <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-3 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors opacity-0 group-hover:opacity-100">
                        <FileCheck2 className="h-3.5 w-3.5" />
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
            <span className="text-slate-500">Showing {verificationRows.length} of {verificationRows.length} entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-md bg-purple-600 text-white shadow-sm">1</button>
              <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Recent Activity & Rules */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Recent Verification Activity */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Recent Verification Activity</h2>
            </div>
          </div>
          <div className="p-5 space-y-4">
            {recentActivity.map((item, index) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                    <UserCheck className="h-4 w-4" />
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

        {/* Verification Rules */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <Info className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Verification Rules</h2>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {rules.map((rule, idx) => (
              <div key={idx} className="flex gap-3 p-3 rounded-lg bg-purple-50/50 border border-purple-100">
                <AlertTriangle className="h-4 w-4 text-purple-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-slate-600 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900">All verifications are auditable</p>
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

function VerificationForm() {
  return (
    <div className="rounded-3xl border border-purple-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-purple-700">
        Verify Citizen / Beneficiary
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Validate citizen details before PM-JAY linked medicine dispensing.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField label="Citizen Name" placeholder="Ravi Kumar" icon={UserRound} />
        <FormField label="PM-JAY Beneficiary ID" placeholder="AB-PMJAY-9081" icon={IdCard} />
        <FormField label="Aadhaar Last 4 Digits" placeholder="1234" icon={Fingerprint} />
        <FormField label="ABHA ID (Optional)" placeholder="14-XXXX-9081" icon={HeartPulse} />
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          Clear
        </button>

        <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-purple-700/20 hover:opacity-95">
          <ShieldCheck className="h-4 w-4" />
          Verify Beneficiary
        </button>
      </div>
    </div>
  );
}

function FormField({ label, placeholder, icon: Icon }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-slate-700">
        {label}
      </span>

      <div className="relative">
        <Icon className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
        <input
          placeholder={placeholder}
          className="w-full rounded-2xl border border-purple-200 bg-white px-4 py-3 pl-11 text-sm outline-none transition focus:border-purple-500 focus:ring-2 focus:ring-purple-100"
        />
      </div>
    </label>
  );
}

function StatCard({ title, value, note, icon: Icon, tone, trend, trendUp }) {
  const toneColors = {
    emerald: "bg-emerald-50 text-emerald-600",
    purple: "bg-purple-50 text-purple-600",
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
    Eligible: "bg-emerald-50 text-emerald-700",
    Active: "bg-emerald-50 text-emerald-700",
    Verified: "bg-emerald-50 text-emerald-700",
    Passed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    "Review Required": "bg-amber-50 text-amber-700",
    "Manual Review": "bg-blue-50 text-blue-700",
    Optional: "bg-blue-50 text-blue-700",
    "Not Eligible": "bg-rose-50 text-rose-700",
    Inactive: "bg-rose-50 text-rose-700",
    Failed: "bg-rose-50 text-rose-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}