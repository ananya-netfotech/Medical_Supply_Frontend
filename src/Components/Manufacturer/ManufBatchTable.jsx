import { Eye, Download, ChevronRight, TrendingUp, TrendingDown, AlertCircle, CheckCircle2, Clock } from "lucide-react";

const rows = [
  {
    batch: "SUN-PARA-0426",
    medicine: "Paracetamol 500mg",
    inventory: "34,500",
    status: "Active",
    risk: "Low",
    expiryDate: "12 Apr 2028",
    lastUpdated: "Today",
  },
  {
    batch: "SUN-AMOX-1125",
    medicine: "Amoxicillin 250mg",
    inventory: "18,000",
    status: "Under Review",
    risk: "Medium",
    expiryDate: "22 Nov 2027",
    lastUpdated: "Yesterday",
  },
  {
    batch: "SUN-INS-0926",
    medicine: "Human Insulin",
    inventory: "0",
    status: "Recall Watch",
    risk: "High",
    expiryDate: "08 Sep 2027",
    lastUpdated: "Today",
  },
  {
    batch: "SUN-CET-0625",
    medicine: "Cetirizine Tablets",
    inventory: "62,000",
    status: "Near Expiry",
    risk: "Medium",
    expiryDate: "18 Jun 2026",
    lastUpdated: "3 days ago",
  },
];

const getStatusIcon = (status) => {
  const map = {
    "Active": CheckCircle2,
    "Under Review": Clock,
    "Recall Watch": AlertCircle,
    "Near Expiry": AlertCircle,
  };
  return map[status] || CheckCircle2;
};

const getStatusColor = (status) => {
  const map = {
    "Active": "text-emerald-500",
    "Under Review": "text-blue-500",
    "Recall Watch": "text-rose-500",
    "Near Expiry": "text-amber-500",
  };
  return map[status] || "text-slate-500";
};

const getRiskBadge = (risk) => {
  const map = {
    "Low": { bg: "bg-emerald-50", text: "text-emerald-700", border: "border-emerald-200", label: "Low" },
    "Medium": { bg: "bg-amber-50", text: "text-amber-700", border: "border-amber-200", label: "Medium" },
    "High": { bg: "bg-rose-50", text: "text-rose-700", border: "border-rose-200", label: "High" },
  };
  return map[risk] || map.Low;
};

const getInventoryColor = (inventory) => {
  const value = parseInt(inventory.replace(/,/g, ''));
  if (value === 0) return "text-rose-600 font-bold";
  if (value < 10000) return "text-amber-600 font-semibold";
  return "text-emerald-600";
};

export default function ManufBatchTable() {
  const totalBatches = rows.length;
  const activeBatches = rows.filter(r => r.status === "Active").length;
  const highRiskBatches = rows.filter(r => r.risk === "High").length;
  const lowInventory = rows.filter(r => parseInt(r.inventory.replace(/,/g, '')) < 10000).length;

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white shadow-sm flex flex-col">
      {/* Header */}
      <div className="border-b border-slate-200 px-5 py-3.5 flex-shrink-0">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900">Key Batch Monitoring</h2>
              {highRiskBatches > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                  <AlertCircle className="h-3 w-3" />
                  {highRiskBatches} high risk
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-slate-500">Important batches with stock and compliance status</p>
          </div>
          <div className="flex items-center gap-2">
            <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 transition-colors">
              <Download className="h-3.5 w-3.5" />
            </button>
            <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-0.5">
              View All
              <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="mt-3 grid grid-cols-4 gap-2">
          <div className="rounded-lg bg-slate-50 p-2">
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Total</p>
            <p className="text-sm font-bold text-slate-900">{totalBatches}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2">
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Active</p>
            <p className="text-sm font-bold text-emerald-600">{activeBatches}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2">
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">High Risk</p>
            <p className="text-sm font-bold text-rose-600">{highRiskBatches}</p>
          </div>
          <div className="rounded-lg bg-slate-50 p-2">
            <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Low Stock</p>
            <p className="text-sm font-bold text-amber-600">{lowInventory}</p>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="flex-1 overflow-x-auto">
        <table className="w-full min-w-[780px] text-sm border-collapse">
          <thead className="bg-slate-50/50">
            <tr className="border-b border-slate-200">
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Batch</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Medicine</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Inventory</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Expiry</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Status</th>
              <th className="px-4 py-3 text-left text-[10px] font-semibold uppercase tracking-wider text-slate-500">Risk</th>
              <th className="px-4 py-3 text-right text-[10px] font-semibold uppercase tracking-wider text-slate-500">Action</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((item) => {
              const RiskIcon = getStatusIcon(item.status);
              const riskColor = getStatusColor(item.status);
              const riskBadge = getRiskBadge(item.risk);
              const inventoryColor = getInventoryColor(item.inventory);
              
              return (
                <tr
                  key={item.batch}
                  className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors group"
                >
                  <td className="px-4 py-3">
                    <span className="font-mono text-xs font-medium text-emerald-700">
                      {item.batch}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-sm text-slate-700">
                    {item.medicine}
                  </td>
                  <td className={`px-4 py-3 text-sm ${inventoryColor}`}>
                    {item.inventory}
                  </td>
                  <td className="px-4 py-3 text-xs text-slate-500">
                    {item.expiryDate}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1.5">
                      <RiskIcon className={`h-3.5 w-3.5 ${riskColor}`} />
                      <span className="text-xs text-slate-600">{item.status}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium border ${riskBadge.bg} ${riskBadge.text} ${riskBadge.border}`}>
                      {riskBadge.label}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-1">
                      <button className="rounded p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors">
                        <Eye className="h-3.5 w-3.5" />
                      </button>
                      <button className="rounded p-1.5 text-slate-400 hover:text-emerald-600 hover:bg-emerald-50 transition-colors opacity-0 group-hover:opacity-100">
                        <Download className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 px-4 py-2.5 flex-shrink-0">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-slate-500">
            Showing {rows.length} batches
          </span>
          <div className="flex items-center gap-3">
            <span className="text-[10px] text-slate-400">
              Last updated: Today
            </span>
            <button className="text-[10px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
              Refresh
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}