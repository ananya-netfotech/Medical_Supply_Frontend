import { useState } from "react";
import {
  AlertTriangle,
  ArrowLeftRight,
  Boxes,
  CheckCircle2,
  Eye,
  Factory,
  Lock,
  MapPin,
  PackageCheck,
  PackageX,
  ShieldAlert,
  Warehouse,
  Search,
  RefreshCw,
  TrendingUp,
  TrendingDown,
  Clock,
  Download,
  ChevronRight,
} from "lucide-react";

const inventoryStats = [
  {
    title: "Total Inventory",
    value: "1.24M",
    icon: Boxes,
    tone: "emerald",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "Available Stock",
    value: "842K",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+5.1%",
    trendUp: true,
  },
  {
    title: "Reserved Stock",
    value: "286K",
    icon: Lock,
    tone: "amber",
    trend: "+2.3%",
    trendUp: true,
  },
  {
    title: "Blocked Stock",
    value: "12K",
    icon: ShieldAlert,
    tone: "rose",
    trend: "-1.2%",
    trendUp: false,
  },
];

const inventoryRows = [
  {
    batchNo: "SUN-PARA-0426",
    lotNo: "LOT-7842",
    medicine: "Paracetamol 500mg",
    warehouse: "Mumbai Plant",
    totalQty: "50,000",
    availableQty: "34,500",
    reservedQty: "10,000",
    expiryDate: "12 Apr 2028",
    status: "Available",
  },
  {
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    medicine: "Amoxicillin 250mg",
    warehouse: "Pune Store",
    totalQty: "32,000",
    availableQty: "18,000",
    reservedQty: "8,000",
    expiryDate: "22 Nov 2027",
    status: "Reserved",
  },
  {
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    medicine: "Human Insulin",
    warehouse: "Cold Chain",
    totalQty: "12,000",
    availableQty: "0",
    reservedQty: "0",
    expiryDate: "08 Sep 2027",
    status: "Recall Watch",
  },
  {
    batchNo: "SUN-CET-0625",
    lotNo: "LOT-1102",
    medicine: "Cetirizine Tablets",
    warehouse: "Nagpur WH",
    totalQty: "70,000",
    availableQty: "62,000",
    reservedQty: "2,000",
    expiryDate: "18 Jun 2026",
    status: "Near Expiry",
  },
];

const recentTransfers = [
  { batch: "SUN-PARA-0426", quantity: "5,500", destination: "Apollo Pharmacy", time: "2 hours ago" },
  { batch: "SUN-AMOX-1125", quantity: "6,000", destination: "MedPlus Stores", time: "Yesterday" },
  { batch: "SUN-CET-0625", quantity: "4,000", destination: "Wellness Pharmacy", time: "2 days ago" },
];

export default function ManufacturerInventoryManagement() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");

  const filteredInventory = inventoryRows.filter(item => {
    const matchesSearch = item.batchNo.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.medicine.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === "All" || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6 bg-slate-50 p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Dashboard</span>
            <ChevronRight className="h-3 w-3 text-slate-400" />
            <span className="text-emerald-700 font-medium">Inventory Management</span>
          </div>
          <h1 className="mt-2 text-2xl font-semibold text-slate-900">Inventory Management</h1>
          <p className="mt-1 text-sm text-slate-500">Monitor stock availability and manage transfers</p>
        </div>
        <div className="flex gap-2">
          <button className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50">
            <Download className="h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center gap-2 rounded-lg bg-emerald-600 px-3 py-2 text-sm font-medium text-white hover:bg-emerald-700">
            <ArrowLeftRight className="h-4 w-4" />
            Create Transfer
          </button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {inventoryStats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Main Content - Table + Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Inventory Table + Insight Cards */}
        <div className="lg:col-span-2 space-y-6">
          {/* Inventory Table */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-slate-200 px-5 py-3">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-base font-semibold text-slate-900">Inventory Register</h2>
                  <p className="text-xs text-slate-500">{filteredInventory.length} batches found</p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-2.5 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 focus:border-emerald-400 outline-none w-40"
                    />
                  </div>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-2 py-1.5 text-xs rounded-lg border border-slate-200 outline-none bg-white"
                  >
                    <option value="All">All Status</option>
                    <option value="Available">Available</option>
                    <option value="Reserved">Reserved</option>
                    <option value="Near Expiry">Near Expiry</option>
                    <option value="Recall Watch">Recall Watch</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full min-w-[900px] text-sm">
                <thead className="bg-slate-50">
                  <tr className="border-b border-slate-200">
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Batch No.</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Medicine</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Warehouse</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Total</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Available</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Reserved</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Expiry</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-slate-600">Status</th>
                    <th className="px-4 py-3 text-right text-xs font-semibold text-slate-600">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredInventory.map((item) => (
                    <tr key={item.batchNo} className="border-b border-slate-100 hover:bg-slate-50">
                      <td className="px-4 py-3 font-mono text-xs font-medium text-emerald-700">{item.batchNo}</td>
                      <td className="px-4 py-3 text-sm text-slate-700">{item.medicine}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{item.warehouse}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{item.totalQty}</td>
                      <td className="px-4 py-3 text-sm font-semibold text-emerald-700">{item.availableQty}</td>
                      <td className="px-4 py-3 text-sm text-amber-700">{item.reservedQty}</td>
                      <td className="px-4 py-3 text-sm text-slate-600">{item.expiryDate}</td>
                      <td className="px-4 py-3"><StatusBadge status={item.status} /></td>
                      <td className="px-4 py-3 text-right">
                        <button className="rounded p-1 text-slate-400 hover:text-slate-600 hover:bg-slate-100">
                          <Eye className="h-3.5 w-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Insight Cards - Vertically stacked below the table */}
          <div className="space-y-4">
            <div className="rounded-lg bg-white p-4 shadow-sm border-l-4 border-emerald-500">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-emerald-50 flex items-center justify-center">
                  <PackageCheck className="h-5 w-5 text-emerald-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Transfer Ready Stock</p>
                  <p className="text-xs text-slate-500">68% of total inventory available for immediate transfer</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm border-l-4 border-amber-500">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-amber-50 flex items-center justify-center">
                  <AlertTriangle className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Expiry Risk Alert</p>
                  <p className="text-xs text-slate-500">3 batches nearing expiry date, review before transfer</p>
                </div>
              </div>
            </div>
            
            <div className="rounded-lg bg-white p-4 shadow-sm border-l-4 border-blue-500">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-lg bg-blue-50 flex items-center justify-center">
                  <Factory className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Manufacturing Stock Control</p>
                  <p className="text-xs text-slate-500">Inventory managed at source before distribution</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column - Sidebar */}
        <div className="space-y-6">
          {/* Stock Summary */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <h2 className="text-sm font-semibold text-slate-900">Stock Summary</h2>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Available Stock</span>
                  <span className="font-semibold text-emerald-700">842K (68%)</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[68%] bg-emerald-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Reserved Stock</span>
                  <span className="font-semibold text-amber-700">286K (23%)</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[23%] bg-amber-500 rounded-full" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs mb-1">
                  <span className="text-slate-600">Blocked Stock</span>
                  <span className="font-semibold text-rose-700">12K (1%)</span>
                </div>
                <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-[1%] bg-rose-500 rounded-full" />
                </div>
              </div>
            </div>
          </div>

          {/* Warehouse Locations */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Warehouse className="h-4 w-4 text-emerald-600" />
                <h2 className="text-sm font-semibold text-slate-900">Warehouses</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {[
                { name: "Mumbai Plant", location: "Mumbai", units: "4.8L" },
                { name: "Pune Store", location: "Pune", units: "3.2L" },
                { name: "Cold Chain", location: "Mumbai", units: "72K" },
                { name: "Nagpur WH", location: "Nagpur", units: "2.1L" },
              ].map((wh) => (
                <div key={wh.name} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-sm font-medium text-slate-900">{wh.name}</p>
                    <p className="text-xs text-slate-500 flex items-center gap-1">
                      <MapPin className="h-3 w-3" /> {wh.location}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-slate-700">{wh.units}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Transfers */}
          <div className="rounded-lg bg-white shadow-sm">
            <div className="border-b border-slate-200 px-4 py-3">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-slate-600" />
                <h2 className="text-sm font-semibold text-slate-900">Recent Transfers</h2>
              </div>
            </div>
            <div className="p-4 space-y-3">
              {recentTransfers.map((transfer, idx) => (
                <div key={idx} className="flex items-center justify-between py-2 border-b border-slate-100 last:border-0">
                  <div>
                    <p className="text-xs font-mono font-medium text-slate-700">{transfer.batch}</p>
                    <p className="text-xs text-slate-500">{transfer.destination}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-emerald-700">{transfer.quantity}</p>
                    <p className="text-xs text-slate-400">{transfer.time}</p>
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
    Available: "bg-emerald-50 text-emerald-700",
    Reserved: "bg-amber-50 text-amber-700",
    "Near Expiry": "bg-amber-50 text-amber-700",
    "Recall Watch": "bg-rose-50 text-rose-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}