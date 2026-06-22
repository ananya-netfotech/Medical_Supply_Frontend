import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Calendar, Download, ChevronRight, Info } from "lucide-react";

const data = [
  { month: "Jan", batches: 28, units: 120000 },
  { month: "Feb", batches: 32, units: 148000 },
  { month: "Mar", batches: 36, units: 164000 },
  { month: "Apr", batches: 41, units: 188000 },
  { month: "May", batches: 39, units: 176000 },
  { month: "Jun", batches: 45, units: 210000 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
        <p className="text-xs font-semibold text-slate-900">{label}</p>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">Batches</span>
            <span className="text-xs font-semibold text-emerald-700">
              {payload[0]?.payload?.batches || 0}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">Units Produced</span>
            <span className="text-xs font-semibold text-emerald-700">
              {(payload[0]?.payload?.units || 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function ManufProductionTrend() {
  // Calculate summary stats
  const totalUnits = data.reduce((sum, item) => sum + item.units, 0);
  const avgBatches = Math.round(data.reduce((sum, item) => sum + item.batches, 0) / data.length);
  const lastMonthUnits = data[data.length - 1]?.units || 0;
  const prevMonthUnits = data[data.length - 2]?.units || 0;
  const growthPercent = ((lastMonthUnits - prevMonthUnits) / prevMonthUnits * 100).toFixed(1);
  const isGrowth = growthPercent > 0;

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">Production Trend</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Live
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">Monthly manufactured batch and unit output</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 transition-colors">
            <Download className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 transition-colors">
            <Calendar className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 flex-shrink-0">
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Total Units</p>
          <p className="text-sm font-bold text-slate-900">{totalUnits.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Avg Batches</p>
          <p className="text-sm font-bold text-slate-900">{avgBatches}/month</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">This Month</p>
          <p className="text-sm font-bold text-slate-900">{data[data.length - 1]?.batches || 0} batches</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Growth</p>
          <p className={`text-sm font-bold flex items-center gap-0.5 ${isGrowth ? 'text-emerald-600' : 'text-rose-600'}`}>
            {isGrowth ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {growthPercent}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4" style={{ height: '280px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="unitsGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#059669" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#059669" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="batchesGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2} />
                <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="month" 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 11, fill: '#6B7280' }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 11, fill: '#6B7280' }}
              tickFormatter={(value) => value >= 1000 ? `${(value/1000)}K` : value}
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => {
                const labels = {
                  units: 'Units Produced',
                  batches: 'Batches Created'
                };
                return <span className="text-xs text-slate-600">{labels[value] || value}</span>;
              }}
            />
            <Area
              type="monotone"
              dataKey="units"
              stroke="#059669"
              strokeWidth={2.5}
              fill="url(#unitsGradient)"
              name="units"
              dot={{
                r: 4,
                fill: "#059669",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{ r: 6, fill: "#059669", strokeWidth: 2, stroke: "#fff" }}
            />
            <Area
              type="monotone"
              dataKey="batches"
              stroke="#3B82F6"
              strokeWidth={2.5}
              fill="url(#batchesGradient)"
              name="batches"
              dot={{
                r: 4,
                fill: "#3B82F6",
                strokeWidth: 2,
                stroke: "#fff",
              }}
              activeDot={{ r: 6, fill: "#3B82F6", strokeWidth: 2, stroke: "#fff" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">Units</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-blue-500" />
            <span className="text-xs text-slate-500">Batches</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Info className="h-3 w-3 text-slate-400" />
            <span className="text-xs text-slate-400">Last 6 months</span>
          </div>
        </div>
        <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-0.5">
          View Details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}