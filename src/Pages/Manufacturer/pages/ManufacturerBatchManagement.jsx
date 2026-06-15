import { useState } from "react";
import {
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileCheck2,
  PackagePlus,
  Pencil,
  Pill,
  Send,
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
  Shield,
  Bell,
  MoreVertical,
  ChevronRight,
  Download,
  Filter,
  X,
  Check,
  HelpCircle,
} from "lucide-react";

const batchStats = [
  {
    title: "Total Batches",
    value: "248",
    icon: Pill,
    tone: "emerald",
    trend: "+12",
    trendUp: true,
  },
  {
    title: "Active Batches",
    value: "216",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+8",
    trendUp: true,
  },
  {
    title: "Under Review",
    value: "18",
    icon: ClipboardCheck,
    tone: "amber",
    trend: "-2",
    trendUp: false,
  },
  {
    title: "Recall Watch",
    value: "3",
    icon: AlertTriangle,
    tone: "rose",
    trend: "+1",
    trendUp: true,
  },
];

const batches = [
  {
    batchNo: "SUN-PARA-0426",
    lotNo: "LOT-7842",
    drugType: "Paracetamol 500mg",
    licenseId: "LIC-MFG-CDSCO-2026-001",
    mfgDate: "12 Apr 2026",
    expiryDate: "12 Apr 2028",
    quantity: "50,000",
    qualityStatus: "Passed",
    status: "Active",
  },
  {
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    drugType: "Amoxicillin 250mg",
    licenseId: "LIC-MFG-CDSCO-2026-002",
    mfgDate: "22 Nov 2025",
    expiryDate: "22 Nov 2027",
    quantity: "32,000",
    qualityStatus: "Pending",
    status: "Under Review",
  },
  {
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    drugType: "Human Insulin",
    licenseId: "LIC-MFG-SDCA-2026-014",
    mfgDate: "08 Sep 2026",
    expiryDate: "08 Sep 2027",
    quantity: "12,000",
    qualityStatus: "Passed",
    status: "Recall Watch",
  },
];

const recentActivity = [
  { action: "Batch SUN-PARA-0426 created", time: "2 hours ago", status: "success" },
  { action: "Quality check pending for batch SUN-AMOX-1125", time: "5 hours ago", status: "warning" },
  { action: "Recall watch flag added for batch SUN-INS-0926", time: "1 day ago", status: "error" },
  { action: "License validation completed for Paracetamol batch", time: "2 days ago", status: "success" },
];

function FormField({ label, name, placeholder, type = "text", value, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-700">
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none"
      />
    </div>
  );
}

function CreateBatchForm() {
  const [formData, setFormData] = useState({
    drugType: "",
    licenseId: "",
    batchNumber: "",
    lotNumber: "",
    mfgDate: "",
    expiryDate: "",
    quantity: "",
    qualityStatus: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
    <div className="rounded-lg bg-white shadow-sm h-full flex flex-col">
      <div className="border-b border-emerald-200 px-4 py-3">
        <h2 className="text-base font-semibold text-emerald-700">Create Medicine Batch</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Enter manufacturing batch details
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-4 flex flex-col">
        <div className="grid gap-3 sm:grid-cols-2">
          <FormField 
            label="Drug Type" 
            name="drugType"
            placeholder="Select drug type"
            value={formData.drugType}
            onChange={handleChange}
          />
          <FormField 
            label="License ID" 
            name="licenseId"
            placeholder="Enter license ID"
            value={formData.licenseId}
            onChange={handleChange}
          />
          <FormField 
            label="Batch Number" 
            name="batchNumber"
            placeholder="e.g., SUN-PARA-0426"
            value={formData.batchNumber}
            onChange={handleChange}
          />
          <FormField 
            label="Lot Number" 
            name="lotNumber"
            placeholder="e.g., LOT-7842"
            value={formData.lotNumber}
            onChange={handleChange}
          />
          <FormField 
            label="Manufacturing Date" 
            name="mfgDate"
            type="date"
            value={formData.mfgDate}
            onChange={handleChange}
          />
          <FormField 
            label="Expiry Date" 
            name="expiryDate"
            type="date"
            value={formData.expiryDate}
            onChange={handleChange}
          />
          <FormField 
            label="Quantity" 
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          <div>
            <label className="mb-1 block text-xs font-medium text-slate-700">
              Quality Status
            </label>
            <select
              name="qualityStatus"
              value={formData.qualityStatus}
              onChange={handleChange}
              className="w-full rounded-lg border border-slate-200 px-3 py-1.5 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none bg-white"
            >
              <option value="">Select</option>
              <option value="Passed">Passed</option>
              <option value="Pending">Pending</option>
              <option value="Failed">Failed</option>
            </select>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mt-3">
          <button 
            type="button"
            className="flex-1 rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            Save Draft
          </button>
          <button 
            type="submit"
            className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            Validate & Create
          </button>
        </div>
      </form>
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
    Passed: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    "Under Review": "bg-blue-50 text-blue-700",
    "Recall Watch": "bg-rose-50 text-rose-700",
    Failed: "bg-rose-50 text-rose-700",
    Expired: "bg-rose-50 text-rose-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}

// MAIN COMPONENT
function ManufacturerBatchManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredBatches = batches.filter(batch => {
    const matchesSearch = batch.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         batch.drugType.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || batch.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  return (
    <div className="space-y-6 bg-slate-50 min-h-full">
      {/* Page Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Dashboard</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-emerald-700 font-medium">Production & Batch Control</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900 lg:text-3xl">
            Medicine Batch Management
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Create, validate and manage medicine batches with quality control
          </p>
        </div>

        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:border-emerald-300 hover:bg-emerald-50 transition-colors">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm">
            <PackagePlus className="h-4 w-4" />
            Create Batch
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {batchStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content Grid - Equal height columns */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr] items-stretch">
        {/* Create Batch Form - Full height */}
        <CreateBatchForm />

        {/* Right Sidebar - Full height */}
        <div className="flex flex-col gap-6 h-full">
          {/* License Validation */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-emerald-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-emerald-700">License Validation</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="rounded-lg bg-emerald-50 p-4 border border-emerald-100">
                <div className="flex gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white text-emerald-700 shadow-sm">
                    <FileCheck2 className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-emerald-900">
                      License check required
                    </p>
                    <p className="mt-1 text-xs text-emerald-700 leading-relaxed">
                      Batch can only be created if the selected drug type is covered by an active, non-expired manufacturing license.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-600" />
                <h2 className="text-sm font-semibold text-slate-700">Recent Activity</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {recentActivity.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className={`h-2 w-2 rounded-full mt-2 flex-shrink-0 ${
                    item.status === 'success' ? 'bg-emerald-500' :
                    item.status === 'warning' ? 'bg-amber-500' : 'bg-rose-500'
                  }`} />
                  <div className="flex-1">
                    <p className="text-xs text-slate-700">{item.action}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Quality Checklist */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-emerald-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-emerald-700">Quality Checklist</h2>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {[
                "Raw material testing completed",
                "In-process quality checks",
                "Packaging verification",
                "Final product testing",
                "Documentation review",
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 py-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                  <span className="text-xs text-slate-600">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Batch Registry Table */}
      <div className="rounded-lg bg-white shadow-sm overflow-hidden flex flex-col">
        <div className="border-b border-emerald-200 px-5 py-3.5 flex-shrink-0">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-emerald-700">Batch Registry</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {filteredBatches.length} batches found
              </p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search batches..."
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
                <option value="Under Review">Under Review</option>
                <option value="Recall Watch">Recall Watch</option>
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

        {/* Table with borders */}
        <div className="overflow-auto flex-1">
          <table className="w-full min-w-[1200px] text-sm border-collapse">
            <thead className="sticky top-0 bg-slate-50 z-10">
              <tr className="border border-slate-200">
                <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Batch No.</th>
                <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Lot No.</th>
                <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Drug Type</th>
                <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">License ID</th>
                <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">MFG Date</th>
                <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Expiry</th>
                <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Quantity</th>
                <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Quality</th>
                <th className="border border-slate-200 px-4 py-3 text-left text-xs font-semibold text-slate-600 bg-slate-50">Status</th>
                <th className="border border-slate-200 px-4 py-3 text-right text-xs font-semibold text-slate-600 bg-slate-50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBatches.map((batch) => (
                <tr key={batch.batchNo} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="border border-slate-200 px-4 py-3">
                    <span className="font-mono text-xs font-medium text-emerald-700">
                      {batch.batchNo}
                    </span>
                  </td>
                  <td className="border border-slate-200 px-4 py-3 text-sm text-slate-600">{batch.lotNo}</td>
                  <td className="border border-slate-200 px-4 py-3 text-sm text-slate-600">{batch.drugType}</td>
                  <td className="border border-slate-200 px-4 py-3 text-sm text-slate-600">{batch.licenseId}</td>
                  <td className="border border-slate-200 px-4 py-3 text-sm text-slate-600">{batch.mfgDate}</td>
                  <td className="border border-slate-200 px-4 py-3 text-sm text-slate-600">{batch.expiryDate}</td>
                  <td className="border border-slate-200 px-4 py-3 text-sm text-slate-600">{batch.quantity}</td>
                  <td className="border border-slate-200 px-4 py-3">
                    <StatusBadge status={batch.qualityStatus} />
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    <StatusBadge status={batch.status} />
                  </td>
                  <td className="border border-slate-200 px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                        <Pencil className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 transition-colors">
                        <Send className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filteredBatches.length === 0 && (
                <tr>
                  <td colSpan="10" className="border border-slate-200 px-4 py-12 text-center text-sm text-slate-500">
                    No batches found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredBatches.length > 0 && (
          <div className="border-t border-slate-200 bg-white px-5 py-3 flex-shrink-0">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Showing {filteredBatches.length} of {batches.length} entries</span>
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
    </div>
  );
}

// DEFAULT EXPORT - THIS IS CRITICAL
export default ManufacturerBatchManagement;