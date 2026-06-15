import { useState } from "react";
import {
  AlertTriangle,
  Ban,
  CheckCircle2,
  Clock,
  Download,
  Eye,
  FileCheck2,
  FileText,
  MessageSquareWarning,
  PackageX,
  ShieldAlert,
  Upload,
  XCircle,
  TrendingUp,
  TrendingDown,
  Search,
  RefreshCw,
  ChevronRight,
  Filter,
  Bell,
  FileWarning,
} from "lucide-react";

const complianceStats = [
  {
    title: "Active Alerts",
    value: "7",
    icon: AlertTriangle,
    tone: "amber",
    trend: "+2",
    trendUp: true,
  },
  {
    title: "Recall Watch Batches",
    value: "3",
    icon: ShieldAlert,
    tone: "rose",
    trend: "+1",
    trendUp: true,
  },
  {
    title: "Overdue Responses",
    value: "2",
    icon: Clock,
    tone: "rose",
    trend: "-1",
    trendUp: false,
  },
  {
    title: "Closed This Month",
    value: "14",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+5",
    trendUp: true,
  },
];

const recallRows = [
  {
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    medicine: "Human Insulin",
    issue: "Cold-chain deviation reported",
    severity: "High",
    status: "Recall Watch",
    transferStatus: "Blocked",
    authority: "State Drug Control Authority",
    responseDue: "18 Jun 2026",
  },
  {
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    medicine: "Amoxicillin 250mg",
    issue: "Citizen quality complaint received",
    severity: "Medium",
    status: "Under Review",
    transferStatus: "Restricted",
    authority: "CDSCO",
    responseDue: "22 Jun 2026",
  },
  {
    batchNo: "SUN-CET-0625",
    lotNo: "LOT-1102",
    medicine: "Cetirizine Tablets",
    issue: "Near-expiry stock flagged",
    severity: "Medium",
    status: "Compliance Review",
    transferStatus: "Review Required",
    authority: "Internal Compliance",
    responseDue: "25 Jun 2026",
  },
];

const alertRows = [
  {
    alertId: "ALT-CMP-2026-001",
    category: "Recall Watch",
    title: "Batch transfer blocked",
    description: "Batch SUN-INS-0926 blocked due to cold-chain deviation.",
    severity: "High",
    status: "Action Required",
    owner: "Quality Assurance",
    dueDate: "18 Jun 2026",
  },
  {
    alertId: "ALT-CMP-2026-002",
    category: "Documentation",
    title: "Additional report requested",
    description: "CDSCO requested updated batch quality report for SUN-AMOX-1125.",
    severity: "Medium",
    status: "Pending Response",
    owner: "Regulatory Affairs",
    dueDate: "22 Jun 2026",
  },
  {
    alertId: "ALT-CMP-2026-003",
    category: "License",
    title: "License renewal pending",
    description: "Manufacturing license LIC-MFG-SDCA-2026-014 expires soon.",
    severity: "Medium",
    status: "In Progress",
    owner: "Compliance Team",
    dueDate: "30 Jun 2026",
  },
  {
    alertId: "ALT-CMP-2026-004",
    category: "Inspection",
    title: "Inspection finding response",
    description: "Response required for latest inspection observation.",
    severity: "Low",
    status: "Submitted",
    owner: "Plant Operations",
    dueDate: "05 Jul 2026",
  },
];

const requiredActions = [
  {
    title: "Quarantine affected stock",
    description: "Move SUN-INS-0926 to blocked inventory until review is complete.",
    status: "Required",
  },
  {
    title: "Upload batch quality report",
    description: "Submit updated QA report for SUN-AMOX-1125.",
    status: "Pending",
  },
  {
    title: "Submit regulatory clarification",
    description: "Respond to CDSCO documentation request.",
    status: "Pending",
  },
  {
    title: "Stop transfer activity",
    description: "Prevent transfer of all recall-watch batches.",
    status: "Active",
  },
];

const timeline = [
  {
    title: "Alert raised",
    description: "Cold-chain deviation reported for SUN-INS-0926.",
    time: "16 Jun 2026 · 09:20 AM",
    status: "High",
  },
  {
    title: "Transfer blocked",
    description: "Batch automatically marked as transfer blocked.",
    time: "16 Jun 2026 · 09:35 AM",
    status: "Blocked",
  },
  {
    title: "Manufacturer notified",
    description: "Quality Assurance team assigned for response.",
    time: "16 Jun 2026 · 10:05 AM",
    status: "Action Required",
  },
];

const documents = [
  {
    name: "Batch Quality Report",
    type: "QA Document",
    status: "Requested",
  },
  {
    name: "Inspection Response",
    type: "Regulatory Response",
    status: "Submitted",
  },
  {
    name: "Cold Chain Log",
    type: "Storage Record",
    status: "Required",
  },
  {
    name: "Recall Response Note",
    type: "Compliance Document",
    status: "Draft",
  },
];

const complianceRules = [
  "Recall-watch batches cannot be transferred until cleared by the authority.",
  "Manufacturer can submit responses but cannot close regulatory alerts.",
  "Expired or near-expiry stock must be reviewed before transfer.",
  "Citizen complaints linked to a batch must trigger quality review.",
  "Blocked stock must remain quarantined until compliance clearance.",
];

export default function ManufacturerRecallCompliance() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSeverity, setSelectedSeverity] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredAlerts = alertRows.filter(alert => {
    const matchesSearch = alert.alertId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alert.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSeverity = selectedSeverity === "All" || alert.severity === selectedSeverity;
    return matchesSearch && matchesSeverity;
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
            <span className="text-rose-700 font-medium">Risk & Regulatory Monitoring</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Recall & Compliance Alerts</h1>
          <p className="mt-1 text-sm text-slate-500">
            Monitor recall-watch batches, regulatory requests, and required responses
          </p>
        </div>
        <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm">
          <Upload className="h-4 w-4" />
          Upload Response
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {complianceStats.map((stat) => (
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
                Critical Alert: Batch SUN-INS-0926 is under Recall Watch
              </h2>
              <p className="mt-0.5 text-xs text-rose-700">
                Transfer is currently blocked due to a reported cold-chain deviation. Response required before due date.
              </p>
            </div>
          </div>
          <button className="rounded-lg border border-rose-200 bg-white px-3 py-1.5 text-xs font-medium text-rose-700 hover:bg-rose-100 transition-colors whitespace-nowrap">
            View Required Action
          </button>
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Tables + Documents + Compliance Rules */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recall Watch Table */}
          <div className="rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="border-b border-rose-200 px-5 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-rose-700">Recall Watch & Blocked Batches</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {recallRows.length} batches under review
                  </p>
                </div>
                <button onClick={handleRefresh} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
                  <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1000px] text-sm border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Batch No.</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Medicine</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Issue</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Severity</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Transfer</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Due Date</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {recallRows.map((item) => (
                    <tr key={item.batchNo} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-3 font-mono text-xs font-medium text-rose-700">{item.batchNo}</td>
                      <td className="px-3 py-3 text-sm text-slate-700">{item.medicine}</td>
                      <td className="px-3 py-3 text-xs text-slate-600">{item.issue}</td>
                      <td className="px-3 py-3"><StatusBadge status={item.severity} /></td>
                      <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                      <td className="px-3 py-3"><StatusBadge status={item.transferStatus} /></td>
                      <td className="px-3 py-3 text-xs text-slate-600">{item.responseDue}</td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                            <Upload className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Compliance Alerts Table */}
          <div className="rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="border-b border-rose-200 px-5 py-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-rose-700">Compliance Alerts</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {filteredAlerts.length} alerts found
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search alerts..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-rose-400 outline-none w-40"
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
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Alert ID</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Category</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Alert</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Severity</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                    <th className="px-3 py-3 text-left text-xs font-semibold text-slate-600">Due Date</th>
                    <th className="px-3 py-3 text-right text-xs font-semibold text-slate-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAlerts.map((item) => (
                    <tr key={item.alertId} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-3 py-3 font-mono text-xs font-medium text-rose-700">{item.alertId}</td>
                      <td className="px-3 py-3 text-xs text-slate-600">{item.category}</td>
                      <td className="px-3 py-3">
                        <p className="text-xs font-medium text-slate-900">{item.title}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{item.description}</p>
                      </td>
                      <td className="px-3 py-3"><StatusBadge status={item.severity} /></td>
                      <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                      <td className="px-3 py-3 text-xs text-slate-600">{item.dueDate}</td>
                      <td className="px-3 py-3 text-right">
                        <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {filteredAlerts.length === 0 && (
                    <tr>
                      <td colSpan="7" className="px-4 py-8 text-center text-sm text-slate-500">
                        No alerts found
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Supporting Documents & Compliance Rules - Side by Side */}
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

            {/* Compliance Rules */}
            <div className="rounded-lg bg-white shadow-sm">
              <div className="border-b border-amber-200 px-4 py-3">
                <div className="flex items-center gap-2">
                  <MessageSquareWarning className="h-4 w-4 text-amber-600" />
                  <h2 className="text-sm font-semibold text-amber-700">Compliance Rules</h2>
                </div>
              </div>
              <div className="p-4 space-y-2">
                {complianceRules.map((rule, idx) => (
                  <div key={idx} className="flex gap-2 py-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5" />
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
            <div className="border-b border-rose-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <FileWarning className="h-4 w-4 text-rose-600" />
                <h2 className="text-sm font-semibold text-rose-700">Required Actions</h2>
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

          {/* Alert Timeline */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-rose-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-rose-600" />
                <h2 className="text-sm font-semibold text-rose-700">Alert Timeline</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-rose-50 text-rose-600">
                      <AlertTriangle className="h-4 w-4" />
                    </div>
                    {index !== timeline.length - 1 && (
                      <div className="h-full w-px bg-rose-100 mt-1" style={{ height: 'calc(100% - 2rem)' }} />
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
    "Recall Watch": "bg-rose-50 text-rose-700",
    "Under Review": "bg-blue-50 text-blue-700",
    "Compliance Review": "bg-amber-50 text-amber-700",
    Blocked: "bg-rose-50 text-rose-700",
    Restricted: "bg-amber-50 text-amber-700",
    "Review Required": "bg-blue-50 text-blue-700",
    Required: "bg-rose-50 text-rose-700",
    Pending: "bg-amber-50 text-amber-700",
    Active: "bg-emerald-50 text-emerald-700",
    "Action Required": "bg-rose-50 text-rose-700",
    "Pending Response": "bg-amber-50 text-amber-700",
    "In Progress": "bg-blue-50 text-blue-700",
    Submitted: "bg-emerald-50 text-emerald-700",
    Requested: "bg-amber-50 text-amber-700",
    Draft: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}