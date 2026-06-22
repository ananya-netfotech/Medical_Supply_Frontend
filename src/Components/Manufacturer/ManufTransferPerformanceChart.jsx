import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Calendar, Download, ChevronRight, Info } from "lucide-react";

const data = [
  { month: "Jan", completed: 38, blocked: 1, total: 39 },
  { month: "Feb", completed: 44, blocked: 2, total: 46 },
  { month: "Mar", completed: 51, blocked: 1, total: 52 },
  { month: "Apr", completed: 58, blocked: 3, total: 61 },
  { month: "May", completed: 62, blocked: 2, total: 64 },
  { month: "Jun", completed: 73, blocked: 4, total: 77 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
        <p className="text-xs font-semibold text-slate-900">{label}</p>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">Completed</span>
            <span className="text-xs font-semibold text-emerald-700">
              {payload[0]?.payload?.completed || 0}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <span className="text-xs text-slate-500">Blocked</span>
            <span className="text-xs font-semibold text-rose-700">
              {payload[0]?.payload?.blocked || 0}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4 border-t border-slate-100 pt-1.5 mt-1">
            <span className="text-xs font-medium text-slate-600">Total</span>
            <span className="text-xs font-bold text-slate-900">
              {payload[0]?.payload?.total || 0}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function ManufTransferPerformanceChart() {
  // Calculate summary stats
  const totalCompleted = data.reduce((sum, item) => sum + item.completed, 0);
  const totalBlocked = data.reduce((sum, item) => sum + item.blocked, 0);
  const totalTransfers = data.reduce((sum, item) => sum + item.total, 0);
  const successRate = ((totalCompleted / totalTransfers) * 100).toFixed(1);
  const lastMonthCompleted = data[data.length - 1]?.completed || 0;
  const prevMonthCompleted = data[data.length - 2]?.completed || 0;
  const growthPercent = ((lastMonthCompleted - prevMonthCompleted) / prevMonthCompleted * 100).toFixed(1);
  const isGrowth = growthPercent > 0;

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">Transfer Performance</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
              </span>
              Live
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">Completed versus blocked stock transfers</p>
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
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Total Transfers</p>
          <p className="text-sm font-bold text-slate-900">{totalTransfers}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Completed</p>
          <p className="text-sm font-bold text-emerald-600">{totalCompleted}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Blocked</p>
          <p className="text-sm font-bold text-rose-600">{totalBlocked}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Success Rate</p>
          <p className={`text-sm font-bold flex items-center gap-0.5 ${successRate >= 90 ? 'text-emerald-600' : successRate >= 75 ? 'text-amber-600' : 'text-rose-600'}`}>
            {isGrowth ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
            {successRate}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4" style={{ height: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <defs>
              <linearGradient id="completedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#059669" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#059669" stopOpacity={0.4} />
              </linearGradient>
              <linearGradient id="blockedGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#E11D48" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#E11D48" stopOpacity={0.4} />
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
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              verticalAlign="top"
              height={36}
              iconType="circle"
              iconSize={8}
              formatter={(value) => {
                const labels = {
                  completed: 'Completed',
                  blocked: 'Blocked'
                };
                return <span className="text-xs text-slate-600">{labels[value] || value}</span>;
              }}
            />
            <Bar 
              dataKey="completed" 
              fill="url(#completedGradient)" 
              radius={[4, 4, 0, 0]} 
              name="completed"
              barSize={28}
            />
            <Bar 
              dataKey="blocked" 
              fill="url(#blockedGradient)" 
              radius={[4, 4, 0, 0]} 
              name="blocked"
              barSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-500">Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-rose-500" />
            <span className="text-xs text-slate-500">Blocked</span>
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