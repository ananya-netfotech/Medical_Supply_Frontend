import { useState } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck2,
  FileText,
  MessageSquareWarning,
  PackageSearch,
  Send,
  ShieldAlert,
  Upload,
  UserRound,
  TrendingUp,
  TrendingDown,
  Search,
  RefreshCw,
  ChevronRight,
  Filter,
  FileWarning,
  User,
  MapPin,
  Calendar,
} from "lucide-react";

const complaintStats = [
  {
    title: "Total Complaints",
    value: "42",
    icon: MessageSquareWarning,
    tone: "blue",
    trend: "+8",
    trendUp: true,
  },
  {
    title: "Open Complaints",
    value: "11",
    icon: Clock,
    tone: "amber",
    trend: "-2",
    trendUp: false,
  },
  {
    title: "High Severity",
    value: "3",
    icon: ShieldAlert,
    tone: "rose",
    trend: "+1",
    trendUp: true,
  },
  {
    title: "Resolved",
    value: "31",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+5",
    trendUp: true,
  },
];

const complaints = [
  {
    id: "CMP-CIT-2026-001",
    citizen: "Ravi Kumar",
    category: "Quality Issue",
    medicine: "Human Insulin",
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    location: "Pune, Maharashtra",
    severity: "High",
    status: "Under Investigation",
    submittedOn: "16 Jun 2026",
    assignedTo: "Quality Assurance",
  },
  {
    id: "CMP-CIT-2026-002",
    citizen: "Anita Sharma",
    category: "Packaging Issue",
    medicine: "Paracetamol 500mg",
    batchNo: "SUN-PARA-0426",
    lotNo: "LOT-7842",
    location: "Mumbai, Maharashtra",
    severity: "Medium",
    status: "Pending Response",
    submittedOn: "15 Jun 2026",
    assignedTo: "Regulatory Affairs",
  },
  {
    id: "CMP-CIT-2026-003",
    citizen: "Salim Khan",
    category: "Expiry Concern",
    medicine: "Cetirizine Tablets",
    batchNo: "SUN-CET-0625",
    lotNo: "LOT-1102",
    location: "Nagpur, Maharashtra",
    severity: "Medium",
    status: "Response Submitted",
    submittedOn: "13 Jun 2026",
    assignedTo: "Plant Operations",
  },
  {
    id: "CMP-CIT-2026-004",
    citizen: "Priya Nair",
    category: "Suspected Counterfeit",
    medicine: "Amoxicillin 250mg",
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    location: "Bengaluru, Karnataka",
    severity: "High",
    status: "Escalated",
    submittedOn: "12 Jun 2026",
    assignedTo: "Compliance Team",
  },
];

const requiredActions = [
  {
    title: "Investigate linked batch",
    description: "Review QA records for SUN-INS-0926 and validate batch quality history.",
    status: "Required",
  },
  {
    title: "Upload QA report",
    description: "Submit quality assurance report for complaint CMP-CIT-2026-001.",
    status: "Pending",
  },
  {
    title: "Submit manufacturer response",
    description: "Provide official response for packaging issue complaint.",
    status: "Pending",
  },
  {
    title: "Coordinate with Regulatory Authority",
    description: "Escalated counterfeit suspicion requires authority review.",
    status: "Active",
  },
];

const timeline = [
  {
    title: "Complaint received",
    description: "Citizen complaint CMP-CIT-2026-001 was submitted.",
    time: "16 Jun 2026 · 09:15 AM",
  },
  {
    title: "Batch linked",
    description: "Complaint linked to batch SUN-INS-0926 and lot LOT-9082.",
    time: "16 Jun 2026 · 09:25 AM",
  },
  {
    title: "Investigation started",
    description: "Quality Assurance team assigned for batch-level review.",
    time: "16 Jun 2026 · 10:10 AM",
  },
];

const documents = [
  {
    name: "Citizen Complaint Evidence",
    type: "Citizen Upload",
    status: "Received",
  },
  {
    name: "Batch QA Report",
    type: "Manufacturer Response",
    status: "Required",
  },
  {
    name: "Packaging Image Evidence",
    type: "Complaint Attachment",
    status: "Received",
  },
  {
    name: "Manufacturer Response Note",
    type: "Compliance Response",
    status: "Draft",
  },
];

const complaintRules = [
  "Manufacturer can view only complaints linked to its own medicines or batches.",
  "Citizen-submitted complaint content must remain read-only for manufacturer.",
  "High severity complaints should trigger quality review and possible batch restriction.",
  "Suspected counterfeit complaints should be escalated for regulatory review.",
  "Manufacturer response should be auditable and timestamped.",
];

export default function ManufacturerCitizenComplaints() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredComplaints = complaints.filter(complaint => {
    const matchesSearch = complaint.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.citizen.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         complaint.medicine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === "All" || complaint.severity === selectedSeverity;
    const matchesStatus = selectedStatus === "All" || complaint.status === selectedStatus;
    return matchesSearch && matchesSeverity && matchesStatus;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6 bg-slate-50 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Dashboard</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-emerald-700 font-medium">Quality Feedback & Complaint Review</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Citizen Complaints</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review citizen complaints linked to your manufactured medicines
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm">
          <Upload className="h-4 w-4" />
          Upload QA Response
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {complaintStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Critical Alert Banner */}
      <div className="rounded-lg bg-rose-50 p-4 border border-rose-200">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-rose-600 shadow-sm">
              <ShieldAlert className="h-5 w-5" />
            </div>
            <div>
              <h2 className="text-sm font-semibold text-rose-900">
                High Severity Complaint: Suspected Counterfeit Reported
              </h2>
              <p className="mt-0.5 text-xs text-rose-700">
                Complaint CMP-CIT-2026-004 has been escalated for regulatory review.
              </p>
            </div>
          </div>
          <button className="rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition-colors whitespace-nowrap">
            View Complaint
          </button>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Complaints Table */}
        <div className="lg:col-span-2 space-y-6">
          {/* Complaints Table */}
          <div className="rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="border-b border-emerald-200 px-5 py-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-emerald-700">Complaint Register</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {filteredComplaints.length} complaints found
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search complaints..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-emerald-400 outline-none w-40"
                    />
                  </div>
                  <select
                    value={selectedSeverity}
                    onChange={(e) => setSelectedSeverity(e.target.value)}
                    className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 outline-none bg-white"
                  >
                    <option value="All">All Severity</option>
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 outline-none bg-white"
                  >
                    <option value="All">All Status</option>
                    <option value="Under Investigation">Under Investigation</option>
                    <option value="Pending Response">Pending Response</option>
                    <option value="Response Submitted">Response Submitted</option>
                    <option value="Escalated">Escalated</option>
                  </select>
                  <button onClick={handleRefresh} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
                    <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                  </button>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-sm border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">ID</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Citizen</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Category</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Medicine/Batch</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Location</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Severity</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredComplaints.map((item) => (
                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-3 font-mono text-xs font-medium text-emerald-700">{item.id}</td>
                      <td className="px-3 py-3">
                        <p className="text-sm font-medium text-slate-900">{item.citizen}</p>
                        <p className="text-xs text-slate-400">{item.submittedOn}</p>
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-600">{item.category}</td>
                      <td className="px-3 py-3">
                        <p className="text-xs font-medium text-slate-700">{item.medicine}</p>
                        <p className="text-xs text-slate-400">{item.batchNo} · {item.lotNo}</p>
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-600">{item.location}</td>
                      <td className="px-3 py-3"><StatusBadge status={item.severity} /></td>
                      <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                            <FileCheck2 className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredComplaints.length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-sm text-slate-500">
                        No complaints found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {filteredComplaints.length > 0 && (
              <div className="border-t border-slate-200 bg-white px-5 py-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500">Showing {filteredComplaints.length} of {complaints.length} entries</span>
                  <div className="flex gap-1">
                    <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                    <button className="px-3 py-1.5 rounded-md bg-emerald-600 text-white shadow-sm">1</button>
                    <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">2</button>
                    <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">Next</button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Documents & Complaint Rules - Side by Side */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Supporting Documents */}
            <div className="rounded-lg bg-white shadow-sm">
              <div className="border-b border-emerald-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-emerald-600" />
                  <h2 className="text-sm font-semibold text-emerald-700">Supporting Documents</h2>
                </div>
              </div>
              <div className="p-4 space-y-3">
                {documents.map((doc) => (
                  <div key={doc.name} className="rounded-lg border border-slate-200 p-3 hover:shadow-sm transition-shadow">
                    <div className="flex items-start gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
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

            {/* Complaint Rules */}
            <div className="rounded-lg bg-white shadow-sm">
              <div className="border-b border-blue-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <PackageSearch className="h-4 w-4 text-blue-600" />
                  <h2 className="text-sm font-semibold text-blue-700">Complaint Rules</h2>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {complaintRules.map((rule, idx) => (
                  <div key={idx} className="flex gap-2 py-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5" />
                    <p className="text-xs text-slate-600 leading-relaxed">{rule}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Required Actions */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-amber-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <FileWarning className="h-4 w-4 text-amber-600" />
                <h2 className="text-sm font-semibold text-amber-700">Required Actions</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {requiredActions.map((item) => (
                <div key={item.title} className="rounded-lg border border-slate-200 p-3">
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

          {/* Complaint Timeline */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-emerald-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-emerald-700">Complaint Timeline</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <MessageSquareWarning className="h-4 w-4" />
                    </div>
                    {index !== timeline.length - 1 && (
                      <div className="h-full w-px bg-emerald-100 mt-1" style={{ height: 'calc(100% - 2rem)' }} />
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

      {/* Manufacturer Response Section */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-emerald-200 px-5 py-3">
          <h2 className="text-base font-semibold text-emerald-700">Manufacturer Response</h2>
          <p className="text-xs text-slate-500 mt-0.5">Submit auditable response for selected complaint</p>
        </div>
        <div className="p-5">
          <div className="grid gap-4 lg:grid-cols-[1fr_200px]">
            <textarea
              rows="4"
              placeholder="Enter manufacturer response for the selected complaint..."
              className="w-full rounded-lg border border-slate-200 px-4 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
            <div className="space-y-2">
              <button className="flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
                <Upload className="h-4 w-4" />
                Attach File
              </button>
              <button className="flex w-full items-center justify-center gap-2 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm">
                <Send className="h-4 w-4" />
                Submit Response
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon: Icon, tone, trend, trendUp }) {
  const toneColors = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    blue: "bg-blue-50 text-blue-600",
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
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
    High: "bg-rose-50 text-rose-700",
    Medium: "bg-amber-50 text-amber-700",
    Low: "bg-blue-50 text-blue-700",
    "Under Investigation": "bg-blue-50 text-blue-700",
    "Pending Response": "bg-amber-50 text-amber-700",
    "Response Submitted": "bg-emerald-50 text-emerald-700",
    Escalated: "bg-rose-50 text-rose-700",
    Required: "bg-rose-50 text-rose-700",
    Pending: "bg-amber-50 text-amber-700",
    Active: "bg-emerald-50 text-emerald-700",
    Received: "bg-blue-50 text-blue-700",
    Draft: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}