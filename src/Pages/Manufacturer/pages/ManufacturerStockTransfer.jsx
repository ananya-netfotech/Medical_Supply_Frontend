import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeftRight,
  Building2,
  CheckCircle2,
  ClipboardCheck,
  Eye,
  FileCheck2,
  MapPin,
  PackageCheck,
  PackageX,
  Save,
  Send,
  ShieldAlert,
  Truck,
  Warehouse,
  XCircle,
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
  Download,
  ChevronRight,
  Filter,
  MoreVertical,
} from "lucide-react";

const transferStats = [
  {
    title: "Ready for Transfer",
    value: "842K",
    icon: PackageCheck,
    tone: "emerald",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "Pending Transfers",
    value: "18",
    icon: Truck,
    tone: "amber",
    trend: "+3",
    trendUp: true,
  },
  {
    title: "Completed Transfers",
    value: "326",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+12",
    trendUp: true,
  },
  {
    title: "Blocked Transfers",
    value: "4",
    icon: ShieldAlert,
    tone: "rose",
    trend: "-1",
    trendUp: false,
  },
];

const pendingTransfers = [
  {
    transferId: "TRF-MFG-2026-001",
    batchNo: "SUN-PARA-0426",
    medicine: "Paracetamol 500mg",
    recipient: "Apollo Pharmacy, Pune",
    quantity: "10,000",
    status: "Pending Dispatch",
  },
  {
    transferId: "TRF-MFG-2026-002",
    batchNo: "SUN-AMOX-1125",
    medicine: "Amoxicillin 250mg",
    recipient: "MedPlus, Hyderabad",
    quantity: "6,500",
    status: "Awaiting Validation",
  },
  {
    transferId: "TRF-MFG-2026-003",
    batchNo: "SUN-CET-0625",
    medicine: "Cetirizine Tablets",
    recipient: "Local Retail Pharmacy, Nagpur",
    quantity: "4,000",
    status: "Draft",
  },
];

const recentTransfers = [
  {
    transferId: "TRF-MFG-2025-221",
    batchNo: "SUN-PARA-0326",
    recipient: "Apollo Pharmacy, Mumbai",
    quantity: "12,000",
    date: "14 Jun 2026",
    status: "Completed",
  },
  {
    transferId: "TRF-MFG-2025-220",
    batchNo: "SUN-AMOX-1025",
    recipient: "MedPlus, Bengaluru",
    quantity: "8,500",
    date: "13 Jun 2026",
    status: "Completed",
  },
  {
    transferId: "TRF-MFG-2025-219",
    batchNo: "SUN-INS-0926",
    recipient: "Apollo Pharmacy, Pune",
    quantity: "2,000",
    date: "12 Jun 2026",
    status: "Blocked",
  },
];

const validationChecks = [
  {
    label: "Manufacturer license is active",
    status: "Passed",
    icon: FileCheck2,
  },
  {
    label: "Batch is not under recall",
    status: "Passed",
    icon: ShieldAlert,
  },
  {
    label: "Batch expiry date is valid",
    status: "Passed",
    icon: CheckCircle2,
  },
  {
    label: "Requested quantity is available",
    status: "Passed",
    icon: PackageCheck,
  },
  {
    label: "Recipient pharmacy/distributor is registered",
    status: "Passed",
    icon: Building2,
  },
];

const complianceRules = [
  "Only active batches can be transferred.",
  "Recall Watch or recalled batches must be blocked from transfer.",
  "Transfer quantity cannot exceed available inventory.",
  "Recipient must be a registered Pharmacy / Distributor.",
  "Expired or near-expiry batches should require review before transfer.",
];

export default function ManufacturerStockTransfer() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredTransfers = recentTransfers.filter(transfer => {
    const matchesSearch = transfer.transferId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.batchNo.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || transfer.status === selectedStatus;
    return matchesSearch && matchesStatus;
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
            <span className="text-emerald-700 font-medium">Inventory Movement</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Stock Transfer</h1>
          <p className="mt-1 text-sm text-slate-500">
            Transfer approved medicine batches to licensed Pharmacy / Distributor entities
          </p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            <ArrowLeftRight className="h-4 w-4" />
            New Transfer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {transferStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Create Transfer Form */}
        <div className="lg:col-span-2">
          <CreateTransferForm />
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Transfer Validation */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-emerald-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <ClipboardCheck className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-emerald-700">Transfer Validation</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {validationChecks.map((check) => {
                const Icon = check.icon;
                return (
                  <div key={check.label} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
                      <Icon className="h-4 w-4" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-medium text-slate-700">{check.label}</p>
                    </div>
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recipient Details */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-emerald-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Building2 className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-emerald-700">Sample Recipient</h2>
              </div>
            </div>
            <div className="p-4">
              <div className="rounded-lg border border-slate-200 p-3">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                    <Building2 className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-slate-900">Apollo Pharmacy, Pune</p>
                    <p className="text-xs text-slate-500 mt-0.5">License ID: LIC-PHR-STATE-2026-041</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                      <MapPin className="h-3 w-3" /> Pune, Maharashtra
                    </p>
                    <div className="mt-2">
                      <StatusBadge status="Registered" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pending Transfer Queue + Compliance Rules */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Pending Transfer Queue */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-emerald-200 px-5 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-semibold text-emerald-700">Pending Transfer Queue</h2>
                <p className="text-xs text-slate-500 mt-0.5">{pendingTransfers.length} pending transfers</p>
              </div>
              <button className="text-xs text-emerald-600 hover:text-emerald-700 font-medium">View All →</button>
            </div>
          </div>
          <div className="p-4 space-y-3">
            {pendingTransfers.map((item) => (
              <div key={item.transferId} className="rounded-lg border border-slate-200 p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.transferId}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{item.medicine} · {item.batchNo}</p>
                    <p className="text-xs text-slate-500 mt-0.5">To: {item.recipient}</p>
                  </div>
                  <StatusBadge status={item.status} />
                </div>
                <div className="mt-3 flex items-center justify-between">
                  <p className="text-xs font-medium text-slate-700">Qty: {item.quantity}</p>
                  <div className="flex gap-1">
                    <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded p-1.5 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50">
                      <Send className="h-3.5 w-3.5" />
                    </button>
                    <button className="rounded p-1.5 text-rose-600 hover:text-rose-700 hover:bg-rose-50">
                      <XCircle className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Transfer Compliance Rules */}
        <div className="rounded-lg bg-white shadow-sm">
          <div className="border-b border-emerald-200 px-5 py-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-emerald-600" />
              <h2 className="text-base font-semibold text-emerald-700">Compliance Rules</h2>
            </div>
          </div>
          <div className="p-4 space-y-2">
            {complianceRules.map((rule, idx) => (
              <div key={idx} className="flex gap-2 py-2">
                <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5" />
                <p className="text-xs text-slate-600 leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Transfers Table */}
      <div className="rounded-lg bg-white shadow-sm overflow-hidden">
        <div className="border-b border-emerald-200 px-5 py-3">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-base font-semibold text-emerald-700">Recent Stock Transfers</h2>
              <p className="text-xs text-slate-500 mt-0.5">{filteredTransfers.length} transfers found</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search transfers..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-emerald-400 outline-none w-48"
                />
              </div>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 outline-none bg-white"
              >
                <option value="All">All Status</option>
                <option value="Completed">Completed</option>
                <option value="Blocked">Blocked</option>
              </select>
              <button onClick={handleRefresh} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
                <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
              </button>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px] text-sm border-collapse">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Transfer ID</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Batch No.</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Recipient</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Quantity</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Date</th>
                <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransfers.map((item) => (
                <tr key={item.transferId} className="border-b border-slate-100 hover:bg-slate-50">
                  <td className="px-4 py-3 font-mono text-xs font-medium text-emerald-700">{item.transferId}</td>
                  <td className="px-4 py-3 text-xs text-slate-600">{item.batchNo}</td>
                  <td className="px-4 py-3 text-sm text-slate-700">{item.recipient}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.quantity}</td>
                  <td className="px-4 py-3 text-sm text-slate-600">{item.date}</td>
                  <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                  <td className="px-4 py-3 text-right">
                    <button className="rounded p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                      <Eye className="h-3.5 w-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
              {filteredTransfers.length === 0 && (
                <tr>
                  <td colSpan="7" className="px-4 py-8 text-center text-sm text-slate-500">
                    No transfers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {filteredTransfers.length > 0 && (
          <div className="border-t border-slate-200 bg-white px-5 py-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500">Showing {filteredTransfers.length} of {recentTransfers.length} entries</span>
              <div className="flex gap-1">
                <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50 disabled:opacity-50" disabled>Previous</button>
                <button className="px-3 py-1.5 rounded-md bg-emerald-600 text-white shadow-sm">1</button>
                <button className="px-3 py-1.5 rounded-md border border-slate-200 bg-white text-slate-600 hover:bg-slate-50">Next</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function CreateTransferForm() {
  const [formData, setFormData] = useState({
    batchNumber: "",
    medicine: "",
    sourceWarehouse: "",
    recipient: "",
    recipientLicense: "",
    quantity: "",
    transportRef: "",
    dispatchDate: "",
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
    <div className="rounded-lg bg-white shadow-sm">
      <div className="border-b border-emerald-200 px-5 py-3">
        <h2 className="text-base font-semibold text-emerald-700">Create Stock Transfer</h2>
        <p className="text-xs text-slate-500 mt-0.5">
          Select approved batch inventory and transfer to registered Pharmacy / Distributor
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <FormField 
            label="Batch Number" 
            name="batchNumber"
            placeholder="Enter batch number"
            value={formData.batchNumber}
            onChange={handleChange}
          />
          <FormField 
            label="Medicine" 
            name="medicine"
            placeholder="Medicine name"
            value={formData.medicine}
            onChange={handleChange}
          />
          <FormField 
            label="Source Warehouse" 
            name="sourceWarehouse"
            placeholder="Select warehouse"
            value={formData.sourceWarehouse}
            onChange={handleChange}
          />
          <FormField 
            label="Recipient" 
            name="recipient"
            placeholder="Pharmacy / Distributor name"
            value={formData.recipient}
            onChange={handleChange}
          />
          <FormField 
            label="Recipient License ID" 
            name="recipientLicense"
            placeholder="License ID"
            value={formData.recipientLicense}
            onChange={handleChange}
          />
          <FormField 
            label="Quantity to Transfer" 
            name="quantity"
            type="number"
            placeholder="Enter quantity"
            value={formData.quantity}
            onChange={handleChange}
          />
          <FormField 
            label="Transport Reference" 
            name="transportRef"
            placeholder="LR / Transport ID"
            value={formData.transportRef}
            onChange={handleChange}
          />
          <FormField 
            label="Expected Dispatch Date" 
            name="dispatchDate"
            type="date"
            value={formData.dispatchDate}
            onChange={handleChange}
          />
        </div>

        {/* Available Stock Info */}
        <div className="mt-5 rounded-lg bg-emerald-50 p-3 border border-emerald-100">
          <div className="flex items-center gap-2">
            <Warehouse className="h-4 w-4 text-emerald-600" />
            <p className="text-xs font-medium text-emerald-900">
              Available Quantity: <span className="font-bold">34,500 units</span>
            </p>
          </div>
          <p className="text-xs text-emerald-700 mt-1">
            This batch is active, not expired and not under recall watch.
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button 
            type="button"
            className="rounded-lg border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors"
          >
            <Save className="h-4 w-4 inline mr-2" />
            Save Draft
          </button>
          <button 
            type="button"
            className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700 hover:bg-emerald-100 transition-colors"
          >
            <CheckCircle2 className="h-4 w-4 inline mr-2" />
            Validate
          </button>
          <button 
            type="submit"
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm"
          >
            <Send className="h-4 w-4 inline mr-2" />
            Submit Transfer
          </button>
        </div>
      </form>
    </div>
  );
}

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
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 outline-none"
      />
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
    Completed: "bg-emerald-50 text-emerald-700",
    Registered: "bg-emerald-50 text-emerald-700",
    Passed: "bg-emerald-50 text-emerald-700",
    "Pending Dispatch": "bg-amber-50 text-amber-700",
    "Awaiting Validation": "bg-blue-50 text-blue-700",
    Draft: "bg-slate-100 text-slate-600",
    Blocked: "bg-rose-50 text-rose-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}