import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  Cell,
} from "recharts";
import { TrendingUp, TrendingDown, Calendar, Download, ChevronRight, Info, Clock, AlertTriangle } from "lucide-react";

const data = [
  { bucket: "0-30 days", licenses: 1, color: "#E11D48", status: "Critical" },
  { bucket: "31-60 days", licenses: 1, color: "#D97706", status: "Warning" },
  { bucket: "61-90 days", licenses: 2, color: "#059669", status: "Moderate" },
  { bucket: "90+ days", licenses: 8, color: "#3B82F6", status: "Healthy" },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
        <p className="text-xs font-semibold text-slate-900">{label}</p>
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between gap-6">
            <span className="text-xs text-slate-500">Licenses</span>
            <span className="text-xs font-semibold text-slate-900">
              {data.licenses}
            </span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-xs text-slate-500">Status</span>
            <span className="text-xs font-semibold" style={{ color: data.color }}>
              {data.status}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function ManufLicenseExpiryChart() {
  // Calculate summary stats
  const totalLicenses = data.reduce((sum, item) => sum + item.licenses, 0);
  const expiringSoon = data.filter(item => item.bucket === "0-30 days" || item.bucket === "31-60 days")
    .reduce((sum, item) => sum + item.licenses, 0);
  const expiringSoonPercentage = ((expiringSoon / totalLicenses) * 100).toFixed(1);
  const criticalLicenses = data.find(item => item.bucket === "0-30 days")?.licenses || 0;

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">License Expiry Outlook</h2>
            {criticalLicenses > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                <AlertTriangle className="h-3 w-3" />
                {criticalLicenses} critical
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-slate-500">Upcoming manufacturing license renewal windows</p>
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
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Total Licenses</p>
          <p className="text-sm font-bold text-slate-900">{totalLicenses}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Expiring Soon</p>
          <p className="text-sm font-bold text-rose-600">{expiringSoon}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">At Risk</p>
          <p className="text-sm font-bold text-amber-600">{expiringSoonPercentage}%</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Healthy</p>
          <p className="text-sm font-bold text-emerald-600">
            {data.find(item => item.bucket === "90+ days")?.licenses || 0}
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4" style={{ height: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <defs>
              <linearGradient id="expiryGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#0F766E" stopOpacity={0.8} />
                <stop offset="100%" stopColor="#0F766E" stopOpacity={0.3} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis 
              dataKey="bucket" 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 11, fill: '#6B7280' }}
            />
            <YAxis 
              tickLine={false} 
              axisLine={false}
              tick={{ fontSize: 11, fill: '#6B7280' }}
              allowDecimals={false}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar 
              dataKey="licenses" 
              radius={[4, 4, 0, 0]} 
              name="licenses"
              barSize={40}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke={entry.color}
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Status Legend */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 flex-shrink-0">
        {data.map((item) => (
          <div 
            key={item.bucket} 
            className="flex items-center justify-between rounded-lg border border-slate-100 p-2 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-1.5">
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[10px] font-medium text-slate-600 truncate">
                {item.bucket}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[11px] font-semibold text-slate-900">
                {item.licenses}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Clock className="h-3 w-3 text-slate-400" />
          <span className="text-[10px] text-slate-500">
            {criticalLicenses > 0 
              ? `${criticalLicenses} license${criticalLicenses > 1 ? 's' : ''} expiring within 30 days`
              : 'All licenses are healthy'}
          </span>
        </div>
        <button className="text-[10px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-0.5">
          View Details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}