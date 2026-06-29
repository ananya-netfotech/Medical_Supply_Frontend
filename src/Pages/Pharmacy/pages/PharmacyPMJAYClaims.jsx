import { useState } from "react";
import {
  AlertTriangle,
  BadgeIndianRupee,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck2,
  FileText,
  Filter,
  Hospital,
  IndianRupee,
  Search,
  Send,
  ShieldCheck,
  Upload,
  UserCheck,
  XCircle,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  ChevronRight,
  Info,
  User,
  Calendar,
  DollarSign,
} from "lucide-react";

const stats = [
  {
    title: "Total Claims",
    value: "428",
    note: "Submitted through pharmacy",
    icon: FileCheck2,
    tone: "purple",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "Under Review",
    value: "72",
    note: "Awaiting approval",
    icon: Clock,
    tone: "blue",
    trend: "-2.1%",
    trendUp: false,
  },
  {
    title: "Approved Claims",
    value: "318",
    note: "Eligible for reimbursement",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+12.5%",
    trendUp: true,
  },
  {
    title: "Rejected Claims",
    value: "38",
    note: "Need correction or appeal",
    icon: XCircle,
    tone: "rose",
    trend: "+5.3%",
    trendUp: true,
  },
];

const claimRows = [
  {
    claimId: "PMJAY-CLM-2026-0091",
    beneficiary: "Ravi Kumar",
    beneficiaryId: "AB-PMJAY-9081",
    hospital: "AIIMS Delhi",
    medicine: "Paracetamol 500mg",
    batchNo: "SUN-PARA-0426",
    claimAmount: "₹1,850",
    approvedAmount: "₹1,850",
    submittedOn: "17 Jun 2026",
    status: "Approved",
  },
  {
    claimId: "PMJAY-CLM-2026-0092",
    beneficiary: "Anita Sharma",
    beneficiaryId: "AB-PMJAY-7654",
    hospital: "Apollo Hospitals",
    medicine: "Amoxicillin 250mg",
    batchNo: "SUN-AMOX-1125",
    claimAmount: "₹2,400",
    approvedAmount: "Pending",
    submittedOn: "17 Jun 2026",
    status: "Under Review",
  },
  {
    claimId: "PMJAY-CLM-2026-0093",
    beneficiary: "Salim Khan",
    beneficiaryId: "AB-PMJAY-3412",
    hospital: "Fortis Healthcare",
    medicine: "Human Insulin",
    batchNo: "SUN-INS-0926",
    claimAmount: "₹6,800",
    approvedAmount: "₹5,900",
    submittedOn: "16 Jun 2026",
    status: "Partially Approved",
  },
  {
    claimId: "PMJAY-CLM-2026-0094",
    beneficiary: "Priya Nair",
    beneficiaryId: "AB-PMJAY-8821",
    hospital: "Narayana Health",
    medicine: "Cetirizine Tablets",
    batchNo: "SUN-CET-0625",
    claimAmount: "₹900",
    approvedAmount: "₹0",
    submittedOn: "15 Jun 2026",
    status: "Rejected",
  },
];

const exceptions = [
  {
    title: "Missing Prescription Upload",
    claimId: "PMJAY-CLM-2026-0092",
    description: "Prescription document is required for claim validation.",
    status: "Action Required",
  },
  {
    title: "Coverage Verification Pending",
    claimId: "PMJAY-CLM-2026-0093",
    description: "Beneficiary coverage utilization requires confirmation.",
    status: "Under Review",
  },
  {
    title: "Rejected Claim Correction",
    claimId: "PMJAY-CLM-2026-0094",
    description: "Claim rejected due to medicine not mapped to eligible treatment episode.",
    status: "Correction Needed",
  },
];

const reimbursements = [
  {
    label: "Total Claimed",
    value: "₹18.4L",
  },
  {
    label: "Approved Amount",
    value: "₹14.8L",
  },
  {
    label: "Paid Amount",
    value: "₹11.2L",
  },
  {
    label: "Pending Payment",
    value: "₹3.6L",
  },
];

const auditTrail = [
  {
    title: "Claim submitted",
    description: "PMJAY-CLM-2026-0091 submitted by Apollo Pharmacy.",
    time: "17 Jun 2026 · 02:30 PM",
  },
  {
    title: "Beneficiary verified",
    description: "PM-JAY Beneficiary ID AB-PMJAY-9081 verified successfully.",
    time: "17 Jun 2026 · 02:31 PM",
  },
  {
    title: "Claim approved",
    description: "Claim approved for full reimbursement amount.",
    time: "18 Jun 2026 · 11:15 AM",
  },
  {
    title: "Payment initiated",
    description: "Reimbursement payment initiated to pharmacy account.",
    time: "18 Jun 2026 · 04:40 PM",
  },
];

export default function PharmacyPMJAYClaims() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedHospital, setSelectedHospital] = useState("All");
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
              <span className="text-xs text-purple-100/70">Ayushman Bharat Claim Operations</span>
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              PM-JAY Claims
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-100/80 leading-relaxed">
              Submit and monitor Ayushman Bharat PM-JAY medicine claims linked to verified beneficiaries,
              treatment episodes, dispensed medicine batches and reimbursement status.
            </p>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Total Claims</p>
            <p className="text-xl font-bold text-white mt-1">428</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +8.2%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Approved</p>
            <p className="text-xl font-bold text-white mt-1">318</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +12.5%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Pending Review</p>
            <p className="text-xl font-bold text-white mt-1">72</p>
            <span className="inline-flex items-center gap-1 text-xs text-amber-300">
              <TrendingDown className="h-3 w-3" />
              -2.1%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Reimbursement Value</p>
            <p className="text-xl font-bold text-white mt-1">₹14.8L</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +6.3%
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

      {/* Main Content - Submit Claim + Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Submit Claim Form */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-5 py-3">
              <h2 className="text-base font-semibold text-purple-700">Submit New PM-JAY Claim</h2>
              <p className="text-xs text-slate-500 mt-0.5">Create a medicine claim after citizen verification and dispensing</p>
            </div>
            <div className="p-5">
              <div className="grid gap-4 sm:grid-cols-2">
                <FormField label="PM-JAY Beneficiary ID" placeholder="AB-PMJAY-9081" />
                <FormField label="Beneficiary Name" placeholder="Ravi Kumar" />
                <FormField label="Aadhaar Last 4" placeholder="1234" />
                <FormField label="Treatment Episode ID" placeholder="TEP-AIIMS-2026-009" />
                <FormField label="Hospital" placeholder="AIIMS Delhi" />
                <FormField label="Medicine Batch" placeholder="SUN-PARA-0426" />
                <FormField label="Quantity" placeholder="20" />
                <FormField label="Claim Amount" placeholder="₹1,850" />
              </div>

              <div className="mt-5 rounded-lg bg-purple-50 p-3 border border-purple-100">
                <div className="flex gap-3">
                  <UserCheck className="h-5 w-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-purple-900">Beneficiary verification required</p>
                    <p className="text-xs text-purple-700 mt-0.5">Claim submission should be allowed only after PM-JAY beneficiary and medicine dispensing validation.</p>
                  </div>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <button className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                  <Upload className="h-4 w-4 inline mr-2" />
                  Upload Prescription
                </button>
                <button className="rounded-lg border border-purple-200 bg-purple-50 px-4 py-2 text-sm font-medium text-purple-700 hover:bg-purple-100 transition-colors">
                  <ShieldCheck className="h-4 w-4 inline mr-2" />
                  Validate Claim
                </button>
                <button className="rounded-lg bg-purple-600 px-4 py-2 text-sm font-medium text-white hover:bg-purple-700 transition-colors shadow-sm">
                  <Send className="h-4 w-4 inline mr-2" />
                  Submit Claim
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Reimbursement Tracking */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Reimbursement Tracking</h2>
              </div>
            </div>
            <div className="p-4 grid grid-cols-2 gap-2">
              {reimbursements.map((item) => (
                <div key={item.label} className="rounded-lg bg-purple-50/50 p-3 border border-purple-100">
                  <p className="text-xs font-medium text-slate-500 uppercase tracking-wider">{item.label}</p>
                  <p className="mt-1 text-lg font-bold text-purple-700">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Exception Queue */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Exception Queue</h2>
              </div>
            </div>
            <div className="p-4 space-y-3 max-h-[220px] overflow-y-auto">
              {exceptions.map((item) => (
                <div key={item.claimId} className="rounded-lg border border-purple-200 p-3">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className="text-sm font-medium text-slate-900">{item.title}</p>
                      <p className="text-xs text-purple-600 mt-0.5 font-mono">{item.claimId}</p>
                      <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                    </div>
                    <StatusBadge status={item.status} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
        <div className="grid gap-3 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <input
              placeholder="Search claim ID, beneficiary, medicine or batch..."
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
            <option value="Approved">Approved</option>
            <option value="Under Review">Under Review</option>
            <option value="Partially Approved">Partially Approved</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={selectedHospital}
            onChange={(e) => setSelectedHospital(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">All Hospitals</option>
            <option value="AIIMS Delhi">AIIMS Delhi</option>
            <option value="Apollo Hospitals">Apollo Hospitals</option>
            <option value="Fortis Healthcare">Fortis Healthcare</option>
            <option value="Narayana Health">Narayana Health</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          />
        </div>
      </div>

      {/* Claims Registry Table */}
      <div className="rounded-lg bg-white shadow-sm border border-purple-200 overflow-hidden flex flex-col">
        <div className="border-b border-purple-200/60 px-5 py-3 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold text-purple-700">PM-JAY Claims Registry</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {claimRows.length} claims found
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
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Claim ID</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Beneficiary</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Hospital</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Medicine / Batch</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Claim Amount</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Approved</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Submitted</th>
                <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                <th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Action</th>
              </tr>
            </thead>
            <tbody>
              {claimRows.map((item) => (
                <tr key={item.claimId} className="border-b border-purple-100 hover:bg-purple-50/60 transition-colors group">
                  <td className="px-3 py-3 font-mono text-xs font-medium text-purple-700">{item.claimId}</td>
                  <td className="px-3 py-3">
                    <p className="text-sm font-medium text-slate-900">{item.beneficiary}</p>
                    <p className="text-[10px] text-slate-400">{item.beneficiaryId}</p>
                  </td>
                  <td className="px-3 py-3 text-sm text-slate-600">{item.hospital}</td>
                  <td className="px-3 py-3">
                    <p className="text-xs font-medium text-slate-700">{item.medicine}</p>
                    <p className="text-[10px] text-slate-400">{item.batchNo}</p>
                  </td>
                  <td className="px-3 py-3 text-sm font-semibold text-slate-700">{item.claimAmount}</td>
                  <td className="px-3 py-3 text-sm font-semibold text-slate-700">{item.approvedAmount}</td>
                  <td className="px-3 py-3 text-xs text-slate-500">{item.submittedOn}</td>
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
            <span className="text-slate-500">Showing {claimRows.length} of {claimRows.length} entries</span>
            <div className="flex gap-1">
              <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50 disabled:opacity-50" disabled>Previous</button>
              <button className="px-3 py-1.5 rounded-md bg-purple-600 text-white shadow-sm">1</button>
              <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50">Next</button>
            </div>
          </div>
        </div>
      </div>

      {/* Claim Audit Trail */}
      <div className="rounded-lg bg-white shadow-sm border border-purple-200">
        <div className="border-b border-purple-200/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-purple-600" />
            <h2 className="text-base font-semibold text-purple-700">Claim Audit Trail</h2>
          </div>
        </div>
        <div className="p-5">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {auditTrail.map((item, index) => (
              <div key={item.title} className="flex gap-3 p-3 rounded-lg bg-purple-50/50 border border-purple-100">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                    <ShieldCheck className="h-4 w-4" />
                  </div>
                  {index !== auditTrail.length - 1 && (
                    <div className="h-full w-px bg-purple-200 mt-1" style={{ height: 'calc(100% - 2rem)' }} />
                  )}
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.title}</p>
                  <p className="text-xs text-slate-500 mt-1">{item.description}</p>
                  <p className="text-xs text-slate-400 mt-1">{item.time}</p>
                </div>
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
              <BadgeIndianRupee className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900">All claims are auditable</p>
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

function SubmitClaimForm() {
  return (
    <div className="rounded-3xl border border-purple-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-purple-700">
        Submit New PM-JAY Claim
      </h2>

      <p className="mt-1 text-sm text-slate-500">
        Create a medicine claim after citizen verification and dispensing.
      </p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <FormField label="PM-JAY Beneficiary ID" placeholder="AB-PMJAY-9081" />
        <FormField label="Beneficiary Name" placeholder="Ravi Kumar" />
        <FormField label="Aadhaar Last 4" placeholder="1234" />
        <FormField label="Treatment Episode ID" placeholder="TEP-AIIMS-2026-009" />
        <FormField label="Hospital" placeholder="AIIMS Delhi" />
        <FormField label="Medicine Batch" placeholder="SUN-PARA-0426" />
        <FormField label="Quantity" placeholder="20" />
        <FormField label="Claim Amount" placeholder="₹1,850" />
      </div>

      <div className="mt-6 rounded-2xl border border-purple-100 bg-purple-50 p-4">
        <div className="flex gap-3">
          <UserCheck className="mt-0.5 h-5 w-5 text-purple-700" />
          <div>
            <p className="text-sm font-bold text-purple-950">
              Beneficiary verification required
            </p>
            <p className="mt-1 text-sm leading-6 text-purple-700">
              Claim submission should be allowed only after PM-JAY beneficiary
              and medicine dispensing validation.
            </p>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-600 hover:bg-slate-50">
          <Upload className="h-4 w-4" />
          Upload Prescription
        </button>

        <button className="inline-flex items-center gap-2 rounded-2xl border border-purple-200 bg-purple-50 px-5 py-3 text-sm font-semibold text-purple-700 hover:bg-purple-100">
          <ShieldCheck className="h-4 w-4" />
          Validate Claim
        </button>

        <button className="inline-flex items-center gap-2 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-purple-700/20 hover:opacity-95">
          <Send className="h-4 w-4" />
          Submit Claim
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
    Submitted: "bg-blue-50 text-blue-700",
    "Under Review": "bg-amber-50 text-amber-700",
    Approved: "bg-emerald-50 text-emerald-700",
    "Partially Approved": "bg-blue-50 text-blue-700",
    Rejected: "bg-rose-50 text-rose-700",
    Paid: "bg-emerald-50 text-emerald-700",
    "Action Required": "bg-rose-50 text-rose-700",
    "Correction Needed": "bg-amber-50 text-amber-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}