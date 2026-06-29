import { useState } from "react";
import {
  AlertTriangle,
  BarChart3,
  Boxes,
  Building2,
  CalendarClock,
  CheckCircle2,
  Download,
  Eye,
  Factory,
  FileText,
  Filter,
  PackageCheck,
  PackageX,
  Pill,
  Search,
  ShieldAlert,
  TrendingDown,
  Truck,
  TrendingUp,
  RefreshCw,
  ChevronRight,
  Info,
  Clock,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Stock Units",
    value: "1.24M",
    note: "Across all medicine batches",
    icon: Boxes,
    tone: "purple",
    trend: "+8.2%",
    trendUp: true,
  },
  {
    title: "Available Stock",
    value: "1.12M",
    note: "Ready for dispensing",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+5.3%",
    trendUp: true,
  },
  {
    title: "Near Expiry",
    value: "8.2K",
    note: "Expiring within 90 days",
    icon: CalendarClock,
    tone: "amber",
    trend: "+2.1%",
    trendUp: true,
  },
  {
    title: "Recall / Blocked",
    value: "1.45K",
    note: "Must not be dispensed",
    icon: ShieldAlert,
    tone: "rose",
    trend: "-1.2%",
    trendUp: false,
  },
];

const inventoryRows = [
  {
    medicine: "Paracetamol 500mg",
    batchNo: "SUN-PARA-0426",
    lotNo: "LOT-7842",
    manufacturer: "Sun Pharma",
    currentStock: "34,500",
    reservedStock: "1,200",
    availableStock: "33,300",
    expiryDate: "12 Apr 2028",
    status: "Available",
  },
  {
    medicine: "Amoxicillin 250mg",
    batchNo: "SUN-AMOX-1125",
    lotNo: "LOT-5561",
    manufacturer: "Sun Pharma",
    currentStock: "18,000",
    reservedStock: "800",
    availableStock: "17,200",
    expiryDate: "22 Nov 2027",
    status: "Under Review",
  },
  {
    medicine: "Human Insulin",
    batchNo: "SUN-INS-0926",
    lotNo: "LOT-9082",
    manufacturer: "Sun Pharma",
    currentStock: "250",
    reservedStock: "0",
    availableStock: "0",
    expiryDate: "08 Sep 2027",
    status: "Recall Watch",
  },
  {
    medicine: "Cetirizine Tablets",
    batchNo: "SUN-CET-0625",
    lotNo: "LOT-1102",
    manufacturer: "Sun Pharma",
    currentStock: "600",
    reservedStock: "0",
    availableStock: "600",
    expiryDate: "18 Jun 2026",
    status: "Near Expiry",
  },
  {
    medicine: "Cough Syrup",
    batchNo: "CIP-CS-0224",
    lotNo: "LOT-4401",
    manufacturer: "Cipla",
    currentStock: "86",
    reservedStock: "0",
    availableStock: "0",
    expiryDate: "01 Jun 2026",
    status: "Expired",
  },
];

const stockHealth = [
  { label: "Available", value: "1.12M", width: "82%", tone: "emerald" },
  { label: "Reserved", value: "62K", width: "42%", tone: "purple" },
  { label: "Near Expiry", value: "8.2K", width: "22%", tone: "amber" },
  { label: "Blocked", value: "1.45K", width: "12%", tone: "rose" },
];

const expiryBuckets = [
  { label: "0-30 Days", value: "1,120", status: "Critical" },
  { label: "31-60 Days", value: "2,840", status: "Review" },
  { label: "61-90 Days", value: "4,240", status: "Monitor" },
  { label: "Expired", value: "186", status: "Blocked" },
];

const lowStockAlerts = [
  {
    medicine: "Human Insulin",
    batchNo: "SUN-INS-0926",
    current: "250",
    threshold: "500",
    status: "Low Stock",
  },
  {
    medicine: "Cough Syrup",
    batchNo: "CIP-CS-0224",
    current: "86",
    threshold: "300",
    status: "Blocked",
  },
  {
    medicine: "Amoxicillin 250mg",
    batchNo: "SUN-AMOX-1125",
    current: "18,000",
    threshold: "20,000",
    status: "Review",
  },
];

const manufacturerSupply = [
  {
    manufacturer: "Sun Pharma",
    units: "52,750",
    batches: "4",
    status: "Active",
  },
  {
    manufacturer: "Cipla",
    units: "12,400",
    batches: "2",
    status: "Review",
  },
  {
    manufacturer: "Dr. Reddy's",
    units: "18,600",
    batches: "3",
    status: "Active",
  },
  {
    manufacturer: "Lupin",
    units: "9,800",
    batches: "2",
    status: "Active",
  },
];

const movementTimeline = [
  {
    title: "Stock received",
    description: "10,000 units of SUN-PARA-0426 received from Sun Pharma.",
    time: "16 Jun 2026 · 10:30 AM",
  },
  {
    title: "Inventory reserved",
    description: "1,200 units reserved for PM-JAY linked dispensing.",
    time: "17 Jun 2026 · 11:20 AM",
  },
  {
    title: "Medicine dispensed",
    description: "20 units dispensed to Ravi Kumar.",
    time: "17 Jun 2026 · 02:18 PM",
  },
  {
    title: "Recall block applied",
    description: "SUN-INS-0926 blocked due to recall watch.",
    time: "18 Jun 2026 · 09:18 AM",
  },
];

const recallImpact = [
  {
    batchNo: "SUN-INS-0926",
    medicine: "Human Insulin",
    currentStock: "250",
    dispensed: "07",
    action: "Block Dispensing",
  },
  {
    batchNo: "SUN-AMOX-1125",
    medicine: "Amoxicillin 250mg",
    currentStock: "18,000",
    dispensed: "145",
    action: "Review Required",
  },
];

const rules = [
  "Expired or recalled stock must not be dispensed.",
  "Inventory quantity should reduce only after successful dispensing.",
  "Every medicine batch must retain batch number, lot number, manufacturer and expiry details.",
  "PM-JAY linked dispensing should reserve stock before claim submission.",
  "Inventory records should support State Drug Control inspection and recall audit.",
];

export default function PharmacyInventory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedManufacturer, setSelectedManufacturer] = useState("All");
  const [selectedExpiry, setSelectedExpiry] = useState("All");
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
              <span className="text-xs text-purple-100/70">Pharmacy Stock Operations</span>
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              Inventory
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-purple-100/80 leading-relaxed">
              Monitor received stock, available medicine batches, expiry risk,
              recall status, manufacturer supply and dispensing readiness.
            </p>
          </div> 
        </div>

        {/* Quick Stats Row */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Total Stock</p>
            <p className="text-xl font-bold text-white mt-1">1.24M</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +8.2%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Available</p>
            <p className="text-xl font-bold text-white mt-1">1.12M</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-300">
              <TrendingUp className="h-3 w-3" />
              +5.3%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Near Expiry</p>
            <p className="text-xl font-bold text-white mt-1">8.2K</p>
            <span className="inline-flex items-center gap-1 text-xs text-amber-300">
              <TrendingUp className="h-3 w-3" />
              +2.1%
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/15">
            <p className="text-xs text-purple-100/70">Blocked Stock</p>
            <p className="text-xl font-bold text-white mt-1">1.45K</p>
            <span className="inline-flex items-center gap-1 text-xs text-rose-300">
              <TrendingDown className="h-3 w-3" />
              -1.2%
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

      {/* Filters */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-purple-200">
        <div className="grid gap-3 md:grid-cols-5">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />
            <input
              placeholder="Search medicine, batch, lot or manufacturer..."
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
            <option value="Available">Available</option>
            <option value="Low Stock">Low Stock</option>
            <option value="Near Expiry">Near Expiry</option>
            <option value="Recall Watch">Recall Watch</option>
            <option value="Expired">Expired</option>
          </select>

          <select
            value={selectedManufacturer}
            onChange={(e) => setSelectedManufacturer(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">All Manufacturers</option>
            <option value="Sun Pharma">Sun Pharma</option>
            <option value="Cipla">Cipla</option>
            <option value="Dr. Reddy's">Dr. Reddy's</option>
            <option value="Lupin">Lupin</option>
          </select>

          <select
            value={selectedExpiry}
            onChange={(e) => setSelectedExpiry(e.target.value)}
            className="rounded-lg border border-purple-200 px-3 py-2 text-sm outline-none focus:border-purple-400 focus:ring-1 focus:ring-purple-400/50"
          >
            <option value="All">Expiry Window</option>
            <option value="0-30 Days">0-30 Days</option>
            <option value="31-60 Days">31-60 Days</option>
            <option value="61-90 Days">61-90 Days</option>
            <option value="90+ Days">90+ Days</option>
          </select>
        </div>
      </div>

      {/* Main Content - Table + Sidebar */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Inventory Register Table */}
        <div className="lg:col-span-2">
          <div className="rounded-lg bg-white shadow-sm border border-purple-200 overflow-hidden flex flex-col">
            <div className="border-b border-purple-200/60 px-5 py-3 flex-shrink-0">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-base font-semibold text-purple-700">Medicine Inventory Register</h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {inventoryRows.length} batches found
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
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Medicine</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Batch</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Manufacturer</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Stock</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Available</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Expiry</th>
                    <th className="px-3 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
                    <th className="px-3 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {inventoryRows.map((item) => (
                    <tr key={item.batchNo} className="border-b border-purple-100 hover:bg-purple-50/60 transition-colors group">
                      <td className="px-3 py-3 text-sm font-medium text-slate-900">{item.medicine}</td>
                      <td className="px-3 py-3">
                        <p className="text-xs font-medium text-slate-700">{item.batchNo}</p>
                        <p className="text-[10px] text-slate-400">{item.lotNo}</p>
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-600">{item.manufacturer}</td>
                      <td className="px-3 py-3 text-sm font-medium text-slate-700">{item.currentStock}</td>
                      <td className={`px-3 py-3 text-sm font-semibold ${parseInt(item.availableStock) === 0 ? 'text-rose-600' : parseInt(item.availableStock) < 10000 ? 'text-amber-600' : 'text-emerald-600'}`}>
                        {item.availableStock}
                      </td>
                      <td className="px-3 py-3 text-xs text-slate-500">{item.expiryDate}</td>
                      <td className="px-3 py-3"><StatusBadge status={item.status} /></td>
                      <td className="px-3 py-3 text-right">
                        <div className="flex justify-end gap-1">
                          <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                            <Eye className="h-3.5 w-3.5" />
                          </button>
                          <button className="rounded p-1.5 text-purple-600 hover:text-purple-700 hover:bg-purple-50 transition-colors opacity-0 group-hover:opacity-100">
                            <FileText className="h-3.5 w-3.5" />
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
                <span className="text-slate-500">Showing {inventoryRows.length} of {inventoryRows.length} entries</span>
                <div className="flex gap-1">
                  <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50 disabled:opacity-50" disabled>Previous</button>
                  <button className="px-3 py-1.5 rounded-md bg-purple-600 text-white shadow-sm">1</button>
                  <button className="px-3 py-1.5 rounded-md border border-purple-200 bg-white text-slate-600 hover:bg-purple-50">Next</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="space-y-6">
          {/* Inventory Health */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <BarChart3 className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Inventory Health</h2>
              </div>
            </div>
            <div className="p-4 space-y-4">
              {stockHealth.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-slate-600">{item.label}</span>
                    <span className="text-xs font-semibold text-slate-900">{item.value}</span>
                  </div>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${getBarColor(item.tone)}`}
                      style={{ width: item.width }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Expiry Monitoring */}
          <div className="rounded-lg bg-white shadow-sm border border-purple-200">
            <div className="border-b border-purple-200/60 px-4 py-3">
              <div className="flex items-center gap-2">
                <CalendarClock className="h-4 w-4 text-purple-600" />
                <h2 className="text-sm font-semibold text-purple-700">Expiry Monitoring</h2>
              </div>
            </div>
            <div className="p-4 space-y-2">
              {expiryBuckets.map((item) => (
                <div key={item.label} className="flex items-center justify-between rounded-lg border border-purple-200 p-2.5">
                  <div>
                    <span className="text-xs font-medium text-slate-700">{item.label}</span>
                    <StatusBadge status={item.status} />
                  </div>
                  <span className="text-sm font-semibold text-slate-900">{item.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Section - Low Stock Alerts & Manufacturer Supply */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Low Stock Alerts */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Low Stock Alerts</h2>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {lowStockAlerts.map((item) => (
              <div key={item.batchNo} className="flex items-center justify-between rounded-lg border border-purple-200 p-3 hover:shadow-sm transition-shadow">
                <div>
                  <p className="text-sm font-semibold text-slate-900">{item.medicine}</p>
                  <p className="text-xs text-slate-500">{item.batchNo}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-600">Stock: {item.current}</span>
                  <span className="text-xs text-slate-400">Threshold: {item.threshold}</span>
                  <StatusBadge status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Manufacturer Supply */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <Factory className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Manufacturer Supply</h2>
            </div>
          </div>
          <div className="p-5 grid gap-3 sm:grid-cols-2">
            {manufacturerSupply.map((item) => (
              <div key={item.manufacturer} className="rounded-lg border border-purple-200 p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-600">
                    <Factory className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.manufacturer}</p>
                    <p className="text-xs text-slate-500">{item.batches} batches</p>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <span className="text-xs text-slate-500">Units</span>
                  <span className="text-sm font-bold text-slate-900">{item.units}</span>
                </div>
                <div className="mt-1">
                  <StatusBadge status={item.status} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Section - Movement Timeline & Recall Impact */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Inventory Movement Timeline */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Inventory Movement</h2>
            </div>
          </div>
          <div className="p-5 space-y-4 max-h-[280px] overflow-y-auto">
            {movementTimeline.map((item, index) => (
              <div key={item.title} className="flex gap-3">
                <div className="flex flex-col items-center">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-purple-50 text-purple-600">
                    <Truck className="h-4 w-4" />
                  </div>
                  {index !== movementTimeline.length - 1 && (
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

        {/* Recall Impact Analysis */}
        <div className="rounded-lg bg-white shadow-sm border border-purple-200">
          <div className="border-b border-purple-200/60 px-5 py-3">
            <div className="flex items-center gap-2">
              <ShieldAlert className="h-4 w-4 text-purple-600" />
              <h2 className="text-base font-semibold text-purple-700">Recall Impact Analysis</h2>
            </div>
          </div>
          <div className="p-5 space-y-3">
            {recallImpact.map((item) => (
              <div key={item.batchNo} className="rounded-lg border border-purple-200 p-3 hover:shadow-sm transition-shadow">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-900">{item.batchNo}</p>
                    <p className="text-xs text-slate-500">{item.medicine}</p>
                  </div>
                  <StatusBadge status={item.action} />
                </div>
                <div className="mt-2 flex items-center gap-3 text-xs text-slate-500">
                  <span>Current: <span className="font-semibold text-slate-700">{item.currentStock}</span></span>
                  <span>Dispensed: <span className="font-semibold text-slate-700">{item.dispensed}</span></span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Inventory Rules */}
      <div className="rounded-lg bg-white shadow-sm border border-purple-200">
        <div className="border-b border-purple-200/60 px-5 py-3">
          <div className="flex items-center gap-2">
            <Info className="h-4 w-4 text-purple-600" />
            <h2 className="text-base font-semibold text-purple-700">Inventory Rules</h2>
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
              <Boxes className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900">All inventory movements are auditable</p>
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

function getBarColor(tone) {
  const colors = {
    emerald: "bg-emerald-500",
    purple: "bg-purple-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    blue: "bg-blue-500",
  };
  return colors[tone] || "bg-purple-500";
}

function StatCard({ title, value, note, icon: Icon, tone, trend, trendUp }) {
  const toneColors = {
    purple: "bg-purple-50 text-purple-600",
    emerald: "bg-emerald-50 text-emerald-600",
    rose: "bg-rose-50 text-rose-600",
    amber: "bg-amber-50 text-amber-600",
    blue: "bg-blue-50 text-blue-600",
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
    Available: "bg-emerald-50 text-emerald-700",
    Active: "bg-emerald-50 text-emerald-700",
    Monitor: "bg-blue-50 text-blue-700",
    "Under Review": "bg-blue-50 text-blue-700",
    Review: "bg-blue-50 text-blue-700",
    "Review Required": "bg-blue-50 text-blue-700",
    "Near Expiry": "bg-amber-50 text-amber-700",
    Critical: "bg-rose-50 text-rose-700",
    Blocked: "bg-rose-50 text-rose-700",
    "Recall Watch": "bg-rose-50 text-rose-700",
    Expired: "bg-rose-50 text-rose-700",
    "Low Stock": "bg-amber-50 text-amber-700",
    "Block Dispensing": "bg-rose-50 text-rose-700",
  };

  return (
    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${styles[status] || 'bg-slate-100 text-slate-600'}`}>
      {status}
    </span>
  );
}