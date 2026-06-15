import { useState } from "react";
import {
  AlertTriangle,
  CalendarClock,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Eye,
  FileCheck2,
  FileText,
  ShieldAlert,
  Upload,
  TrendingUp,
  TrendingDown,
  Clock,
  Shield,
  Bell,
  Search,
  MoreVertical,
  RefreshCw,
  ChevronRight,
  HelpCircle,
} from "lucide-react";

const licenseStats = [
  {
    title: "Active Licenses",
    value: "12",
    icon: FileCheck2,
    tone: "emerald",
    trend: "+2",
    trendUp: true,
  },
  {
    title: "Expiring Soon",
    value: "2",
    icon: CalendarClock,
    tone: "amber",
    trend: "+1",
    trendUp: true,
  },
  {
    title: "Suspended Licenses",
    value: "0",
    icon: ShieldAlert,
    tone: "slate",
    trend: "0",
    trendUp: false,
  },
  {
    title: "Approved Drug Types",
    value: "48",
    icon: ClipboardCheck,
    tone: "blue",
    trend: "+5",
    trendUp: true,
  },
];

const licenses = [
  {
    id: "LIC-MFG-CDSCO-2026-001",
    drugType: "Paracetamol Tablets",
    issueDate: "01 Jan 2026",
    expiryDate: "31 Dec 2028",
    authority: "CDSCO",
    status: "Active",
    lastInspection: "15 Mar 2026",
    compliance: 98,
  },
  {
    id: "LIC-MFG-CDSCO-2026-002",
    drugType: "Amoxicillin Capsules",
    issueDate: "01 Feb 2026",
    expiryDate: "31 Jan 2029",
    authority: "CDSCO",
    status: "Active",
    lastInspection: "10 Feb 2026",
    compliance: 95,
  },
  {
    id: "LIC-MFG-SDCA-2026-014",
    drugType: "Insulin Vials",
    issueDate: "15 Mar 2025",
    expiryDate: "15 Aug 2026",
    authority: "State Drug Control Authority",
    status: "Expiring Soon",
    lastInspection: "05 Jan 2026",
    compliance: 87,
  },
  {
    id: "LIC-MFG-CDSCO-2025-031",
    drugType: "Cough Syrup",
    issueDate: "05 Jun 2025",
    expiryDate: "05 Jul 2026",
    authority: "CDSCO",
    status: "Under Review",
    lastInspection: "20 Dec 2025",
    compliance: 76,
  },
];

const drugApprovals = [
  { name: "Paracetamol 500mg", status: "Approved", approvedDate: "15 Jan 2026" },
  { name: "Amoxicillin 250mg", status: "Approved", approvedDate: "20 Feb 2026" },
  { name: "Human Insulin", status: "Approved", approvedDate: "10 Mar 2026" },
  { name: "Oncology Injectables", status: "Pending Review", approvedDate: "-" },
  { name: "Vaccines", status: "Not Approved", approvedDate: "-" },
];

const renewals = [
  {
    license: "LIC-MFG-SDCA-2026-014",
    dueIn: "45 days",
    tone: "amber",
    type: "Manufacturing License",
  },
  {
    license: "LIC-MFG-CDSCO-2025-031",
    dueIn: "22 days",
    tone: "rose",
    type: "Manufacturing License",
  },
  {
    license: "LIC-MFG-CDSCO-2026-002",
    dueIn: "210 days",
    tone: "slate",
    type: "Manufacturing License",
  },
];

const documents = [
  { name: "Manufacturing License Certificate", size: "2.4 MB", date: "15 Mar 2026" },
  { name: "Drug Approval Certificate", size: "1.8 MB", date: "10 Feb 2026" },
  { name: "Latest Inspection Report", size: "3.2 MB", date: "05 Jan 2026" },
  { name: "Compliance Notice Response", size: "1.1 MB", date: "20 Dec 2025" },
  { name: "Renewal Request Document", size: "0.9 MB", date: "25 Mar 2026" },
];

const alerts = [
  { message: "License LIC-MFG-SDCA-2026-014 expires in 45 days.", severity: "warning" },
  { message: "Additional documentation requested for Cough Syrup approval.", severity: "info" },
  { message: "CDSCO inspection report uploaded for review.", severity: "success" },
];

const recentActivities = [
  { action: "License renewed", entity: "Paracetamol License", time: "2 hours ago", user: "CDSCO Admin" },
  { action: "Document uploaded", entity: "Inspection Report", time: "5 hours ago", user: "Quality Dept" },
  { action: "Status changed", entity: "Cough Syrup License", time: "1 day ago", user: "State Authority" },
];

export default function ManufacturerLicenses() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredLicenses = licenses.filter(license => {
    const matchesSearch = license.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         license.drugType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || license.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6 bg-slate-50 p-6">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Dashboard</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-emerald-700 font-medium">Manufacturer Compliance</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 lg:text-3xl">
            Licenses & Approvals
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage manufacturing licenses and regulatory approvals
          </p>
        </div>

        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
            <Upload className="h-4 w-4" />
            Upload
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm">
            <CalendarClock className="h-4 w-4" />
            Submit Renewal
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {licenseStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-[1.6fr_0.9fr]">
        {/* License Registry Table */}
        <div className="rounded-lg bg-white shadow-sm overflow-hidden flex flex-col h-[520px]">
          <div className="border-b border-emerald-200 bg-white px-5 py-3.5 flex-shrink-0">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h2 className="text-base font-semibold text-emerald-700">License Registry</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  {filteredLicenses.length} licenses found
                </p>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search licenses..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none w-48"
                  />
                </div>
                <select
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-emerald-400 outline-none bg-white text-slate-700"
                >
                  <option value="All">All Status</option>
                  <option value="Active">Active</option>
                  <option value="Expiring Soon">Expiring Soon</option>
                  <option value="Under Review">Under Review</option>
                </select>
                <button 
                  onClick={handleRefresh}
                  className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 transition-colors"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>
          </div>

          {/* Table with row and column borders */}
          <div className="overflow-auto flex-1">
            <table className="w-full min-w-[1000px] text-sm border-collapse">
              <thead className="sticky top-0 bg-slate-50 z-10">
                <tr className="border border-slate-200">
                  <th className="border border-slate-200 px-5 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">License ID</th>
                  <th className="border border-slate-200 px-5 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Drug Type</th>
                  <th className="border border-slate-200 px-5 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Issue Date</th>
                  <th className="border border-slate-200 px-5 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Expiry Date</th>
                  <th className="border border-slate-200 px-5 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Authority</th>
                  <th className="border border-slate-200 px-5 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Status</th>
                  <th className="border border-slate-200 px-5 py-3 text-right text-xs font-semibold text-slate-600 bg-slate-50">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLicenses.map((license) => (
                  <tr
                    key={license.id}
                    className="hover:bg-emerald-50/30 transition-colors"
                  >
                    <td className="border border-slate-200 px-5 py-3.5">
                      <span className="font-mono text-xs font-medium text-emerald-700">
                        {license.id}
                      </span>
                    </td>
                    <td className="border border-slate-200 px-5 py-3.5">
                      <div>
                        <p className="text-sm text-slate-900">{license.drugType}</p>
                        <p className="text-xs text-slate-400 mt-0.5">Insp: {license.lastInspection}</p>
                      </div>
                    </td>
                    <td className="border border-slate-200 px-5 py-3.5 text-sm text-slate-600">{license.issueDate}</td>
                    <td className="border border-slate-200 px-5 py-3.5 text-sm text-slate-600">{license.expiryDate}</td>
                    <td className="border border-slate-200 px-5 py-3.5 text-sm text-slate-600">{license.authority}</td>
                    <td className="border border-slate-200 px-5 py-3.5">
                      <StatusBadge status={license.status} />
                    </td>
                    <td className="border border-slate-200 px-5 py-3.5">
                      <div className="flex justify-end gap-1">
                        <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                        <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                          <Download className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
                {filteredLicenses.length === 0 && (
                  <tr>
                    <td colSpan="7" className="border border-slate-200 px-5 py-12 text-center text-sm text-slate-500">
                      No licenses found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {filteredLicenses.length > 0 && (
            <div className="border-t border-slate-200 bg-white px-5 py-3 flex-shrink-0">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-500">Showing {filteredLicenses.length} of {licenses.length} entries</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors disabled:opacity-50" disabled>
                    Previous
                  </button>
                  <button className="px-3 py-1.5 rounded-md bg-emerald-600 text-white shadow-sm">1</button>
                  <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">2</button>
                  <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 transition-colors">Next</button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6 h-[520px] overflow-y-auto">
          {/* Renewal Tracker */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-emerald-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-emerald-700">Renewal Tracker</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {renewals.map((item) => (
                <div key={item.license} className="flex items-center justify-between py-2">
                  <div>
                    <p className="text-xs font-mono font-medium text-slate-700">{item.license}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.type}</p>
                  </div>
                  <StatusPill tone={item.tone}>{item.dueIn}</StatusPill>
                </div>
              ))}
            </div>
          </div>

          {/* Notifications */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-amber-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Bell className="h-4 w-4 text-amber-600" />
                <h2 className="text-sm font-semibold text-amber-700">Notifications</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {alerts.map((alert, idx) => (
                <div key={idx} className="flex gap-2 text-sm">
                  {alert.severity === 'warning' && <AlertTriangle className="h-3.5 w-3.5 text-amber-500 mt-0.5 flex-shrink-0" />}
                  {alert.severity === 'success' && <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500 mt-0.5 flex-shrink-0" />}
                  {alert.severity === 'info' && <HelpCircle className="h-3.5 w-3.5 text-blue-500 mt-0.5 flex-shrink-0" />}
                  <p className="text-xs text-slate-600">{alert.message}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-slate-600" />
                <h2 className="text-sm font-semibold text-slate-700">Recent Activity</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {recentActivities.map((activity, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="h-6 w-6 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                    <CheckCircle2 className="h-3 w-3 text-slate-500" />
                  </div>
                  <div>
                    <p className="text-xs font-medium text-slate-900">{activity.action}</p>
                    <p className="text-xs text-slate-400">{activity.entity}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Drug Approvals & Compliance */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Drug Approvals */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-emerald-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <ClipboardCheck className="h-4 w-4 text-emerald-600" />
              <h2 className="text-sm font-semibold text-emerald-700">Drug Type Approvals</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="space-y-3">
              {drugApprovals.map((drug) => (
                <div key={drug.name} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{drug.name}</p>
                    {drug.approvedDate !== '-' && (
                      <p className="text-xs text-slate-400 mt-0.5">Approved: {drug.approvedDate}</p>
                    )}
                  </div>
                  <StatusBadge status={drug.status} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance Summary */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-emerald-200 px-4 py-3">
            <div className="flex items-center gap-2">
              <Shield className="h-4 w-4 text-emerald-600" />
              <h2 className="text-sm font-semibold text-emerald-700">Compliance Summary</h2>
            </div>
          </div>
          <div className="p-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Last Inspection</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">12 Mar 2026</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Open Findings</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">3</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Recall Actions</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">1</p>
              </div>
              <div className="rounded-lg bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Pending Responses</p>
                <p className="text-sm font-semibold text-slate-900 mt-1">2</p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-200">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-slate-600">Overall Compliance</p>
                <p className="text-sm font-semibold text-emerald-600">94%</p>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full w-[94%] bg-emerald-500 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Documents Section */}
      <div className="rounded-lg bg-white shadow-sm">
        <div className="border-b border-emerald-200 px-4 py-3">
          <div className="flex items-center gap-2">
            <FileText className="h-4 w-4 text-emerald-600" />
            <h2 className="text-sm font-semibold text-emerald-700">Regulatory Documents</h2>
          </div>
        </div>
        <div className="p-4">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
            {documents.map((doc) => (
              <div key={doc.name} className="rounded-lg border border-slate-200 p-3 hover:shadow-sm transition-shadow">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                  <FileText className="h-4 w-4" />
                </div>
                <p className="mt-2 text-xs font-medium text-slate-900 line-clamp-2">{doc.name}</p>
                <div className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                </div>
                <div className="mt-3 flex gap-2">
                  <button className="flex-1 rounded-md border border-slate-200 px-2 py-1 text-xs font-medium text-slate-600 hover:bg-slate-50 transition-colors">
                    View
                  </button>
                  <button className="flex-1 rounded-md bg-emerald-600 px-2 py-1 text-xs font-medium text-white hover:bg-emerald-700 transition-colors">
                    Download
                  </button>
                </div>
              </div>
            ))}
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
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <div className="rounded-lg bg-white p-4 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-slate-500">{title}</p>
          <div className="flex items-baseline gap-1 mt-1">
            <p className="text-2xl font-semibold text-slate-900">{value}</p>
            {trend && (
              <span className={`inline-flex items-center gap-0.5 text-xs font-medium ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                {trend}
              </span>
            )}
          </div>
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
    Active: "bg-emerald-50 text-emerald-700",
    Approved: "bg-emerald-50 text-emerald-700",
    "Expiring Soon": "bg-amber-50 text-amber-700",
    "Pending Review": "bg-amber-50 text-amber-700",
    "Under Review": "bg-blue-50 text-blue-700",
    Suspended: "bg-rose-50 text-rose-700",
    Expired: "bg-rose-50 text-rose-700",
    "Not Approved": "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}

function StatusPill({ tone, children }) {
  const styles = {
    emerald: "bg-emerald-50 text-emerald-700",
    amber: "bg-amber-50 text-amber-700",
    rose: "bg-rose-50 text-rose-700",
    slate: "bg-slate-100 text-slate-600",
  };

  return (
    <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${styles[tone]}`}>
      {children}
    </span>
  );
}

function Activity({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 12h-4l-3 9-4-18-3 9H2" />
    </svg>
  );
}