import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeftRight,
  CalendarDays,
  CheckCircle2,
  Download,
  Eye,
  FileText,
  Filter,
  History,
  PackageCheck,
  Search,
  ShieldAlert,
  Truck,
  XCircle,
  TrendingUp,
  TrendingDown,
  Clock,
  RefreshCw,
  ChevronRight,
  Printer,
  Mail,
} from "lucide-react";

const transferStats = [
  {
    title: "Total Transfers",
    value: "326",
    icon: ArrowLeftRight,
    tone: "emerald",
    trend: "+12",
    trendUp: true,
  },
  {
    title: "Completed",
    value: "298",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+8",
    trendUp: true,
  },
  {
    title: "Pending",
    value: "18",
    icon: Truck,
    tone: "amber",
    trend: "-2",
    trendUp: false,
  },
  {
    title: "Blocked / Rejected",
    value: "10",
    icon: ShieldAlert,
    tone: "rose",
    trend: "+1",
    trendUp: true,
  },
];

const transferRows = [
  {
    transferId: "TRF-MFG-2026-001",
    batchNo: "SUN-PARA-0426",
    lotNo: "LOT-7842",
    medicine: "Paracetamol 500mg",
    recipient: "Apollo Pharmacy, Pune",
    quantity: "10,000",
    warehouse: "Mumbai Plant Warehouse",
    date: "15 Jun 2026",
    status: "Completed",
    reason: "Transfer completed successfully",
  },
  {
    transferId: "TRF-MFG-2026-002",
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    medicine: "Amoxicillin 250mg",
    recipient: "MedPlus, Hyderabad",
    quantity: "6,500",
    warehouse: "Pune Distribution Store",
    date: "14 Jun 2026",
    status: "Pending",
    reason: "Awaiting dispatch confirmation",
  },
  {
    transferId: "TRF-MFG-2026-003",
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    medicine: "Human Insulin",
    recipient: "Apollo Pharmacy, Mumbai",
    quantity: "2,000",
    warehouse: "Cold Chain Storage - Mumbai",
    date: "12 Jun 2026",
    status: "Blocked",
    reason: "Batch placed under recall watch",
  },
  {
    transferId: "TRF-MFG-2026-004",
    batchNo: "SUN-CET-0625",
    lotNo: "LOT-1102",
    medicine: "Cetirizine Tablets",
    recipient: "Local Retail Pharmacy, Nagpur",
    quantity: "4,000",
    warehouse: "Nagpur Warehouse",
    date: "11 Jun 2026",
    status: "Rejected",
    reason: "Near-expiry stock requires review",
  },
];

const timeline = [
  {
    title: "Transfer submitted",
    description: "TRF-MFG-2026-001 created for Apollo Pharmacy, Pune.",
    time: "15 Jun 2026 · 10:30 AM",
    status: "Completed",
  },
  {
    title: "Compliance validation passed",
    description: "License, batch status, expiry and quantity checks completed.",
    time: "15 Jun 2026 · 10:35 AM",
    status: "Completed",
  },
  {
    title: "Dispatch completed",
    description: "10,000 units moved from Mumbai Plant Warehouse.",
    time: "15 Jun 2026 · 01:15 PM",
    status: "Completed",
  },
];

const recipients = [
  {
    name: "Apollo Pharmacy, Pune",
    transfers: "48",
    units: "2.4L",
    status: "Registered",
  },
  {
    name: "MedPlus, Hyderabad",
    transfers: "36",
    units: "1.8L",
    status: "Registered",
  },
  {
    name: "Local Retail Pharmacy, Nagpur",
    transfers: "18",
    units: "82K",
    status: "Review Required",
  },
];

const complianceNotes = [
  "Completed transfer records should remain read-only.",
  "Blocked transfers must retain the original rejection reason.",
  "Recall watch batches must not be transferred until cleared.",
  "Near-expiry transfers may require regulatory or internal compliance review.",
];

export default function ManufacturerTransferHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedRecipient, setSelectedRecipient] = useState("All");
  const [selectedDate, setSelectedDate] = useState("");
  const [isRefreshing, setIsRefreshing] = useState(false);

  const filteredTransfers = transferRows.filter(transfer => {
    const matchesSearch = transfer.transferId.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transfer.medicine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || transfer.status === selectedStatus;
    const matchesRecipient = selectedRecipient === "All" || transfer.recipient.includes(selectedRecipient);
    return matchesSearch && matchesStatus && matchesRecipient;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const handleExport = () => {
    console.log("Exporting report...");
  };

  return (
    <div className="space-y-6 bg-slate-50 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Dashboard</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-emerald-700 font-medium">Stock Movement Audit</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Transfer History</h1>
          <p className="mt-1 text-sm text-slate-500">
            Review all manufacturer stock transfers and audit history
          </p>
        </div>
        <button 
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700 transition-colors shadow-sm"
        >
          <Download className="h-4 w-4" />
          Export Report
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {transferStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Filters */}
      <div className="rounded-lg bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              placeholder="Search transfer ID, batch or medicine..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full rounded-lg border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
            />
          </div>

          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          >
            <option value="All">All Status</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
            <option value="Blocked">Blocked</option>
            <option value="Rejected">Rejected</option>
          </select>

          <select
            value={selectedRecipient}
            onChange={(e) => setSelectedRecipient(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          >
            <option value="All">All Recipients</option>
            <option value="Apollo Pharmacy">Apollo Pharmacy</option>
            <option value="MedPlus">MedPlus</option>
            <option value="Local Retail Pharmacy">Local Retail Pharmacy</option>
          </select>

          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="rounded-lg border border-slate-200 px-3 py-2 text-sm outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400"
          />
        </div>
      </div>

      {/* Main Content - 2 Column Layout */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Transfer Records Table + Recipient Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Transfer Records Table */}
          <div className="rounded-lg bg-white shadow-sm overflow-hidden">
            <div className="border-b border-emerald-200 px-5 py-3">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-emerald-700">Transfer Records</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {filteredTransfers.length} transfers found
                  </p>
                </div>
                <button onClick={handleRefresh} className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50">
                  <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? 'animate-spin' : ''}`} />
                </button>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[1100px] text-sm border-collapse">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Transfer ID</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Batch/Lot</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Medicine</th>
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
                      <td className="px-4 py-3">
                        <p className="text-xs font-medium text-slate-700">{item.batchNo}</p>
                        <p className="text-xs text-slate-400">{item.lotNo}</p>
                      </td>
                      <td className="px-4 py-3 text-sm text-slate-700">{item.medicine}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{item.recipient}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-slate-700">{item.quantity}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{item.date}</td>
                      <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                            <Download className="h-3.5 w-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {filteredTransfers.length === 0 && (
                    <tr>
                      <td colSpan="8" className="px-4 py-8 text-center text-sm text-slate-500">
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
                  <span className="text-slate-500">Showing {filteredTransfers.length} of {transferRows.length} entries</span>
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

          {/* Recipient Summary - Below the table */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-emerald-200 px-5 py-3">
              <h2 className="text-base font-semibold text-emerald-700">Recipient Summary</h2>
              <p className="text-xs text-slate-500 mt-0.5">Top recipient pharmacies and distributors</p>
            </div>
            <div className="p-5">
              <div className="grid gap-4 md:grid-cols-3">
                {recipients.map((item) => (
                  <div key={item.name} className="rounded-lg border border-slate-200 p-4 hover:shadow-sm transition-shadow">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      </div>
                      <StatusBadge status={item.status} />
                    </div>
                    <div className="mt-4 grid grid-cols-2 gap-3">
                      <div>
                        <p className="text-xs text-slate-500">Transfers</p>
                        <p className="text-lg font-semibold text-slate-900">{item.transfers}</p>
                      </div>
                      <div>
                        <p className="text-xs text-slate-500">Units Sent</p>
                        <p className="text-lg font-semibold text-slate-900">{item.units}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Transfer Timeline */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-emerald-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <History className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-emerald-700">Transfer Timeline</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {timeline.map((item, index) => (
                <div key={item.title} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                      <CheckCircle2 className="h-4 w-4" />
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

          {/* Compliance Notes */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-amber-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-600" />
                <h2 className="text-sm font-semibold text-amber-700">Compliance Notes</h2>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {complianceNotes.map((note, idx) => (
                <div key={idx} className="flex gap-2 py-1">
                  <div className="h-1.5 w-1.5 rounded-full bg-amber-400 mt-1.5" />
                  <p className="text-xs text-slate-600">{note}</p>
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
    Completed: "bg-emerald-50 text-emerald-700",
    Registered: "bg-emerald-50 text-emerald-700",
    Pending: "bg-amber-50 text-amber-700",
    Blocked: "bg-rose-50 text-rose-700",
    Rejected: "bg-rose-50 text-rose-700",
    "Review Required": "bg-amber-50 text-amber-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}