import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import { TrendingUp, TrendingDown, Info, Download, Calendar } from "lucide-react";

const data = [
  { name: "Available", value: 842000, color: "#059669", percentage: 68 },
  { name: "Reserved", value: 286000, color: "#D97706", percentage: 23 },
  { name: "Transferred", value: 95500, color: "#2563EB", percentage: 8 },
  { name: "Blocked", value: 12000, color: "#E11D48", percentage: 1 },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-4 shadow-lg">
        <p className="text-sm font-semibold text-slate-900">{data.name}</p>
        <div className="mt-2 space-y-1">
          <div className="flex items-center justify-between gap-6">
            <span className="text-xs text-slate-500">Value</span>
            <span className="text-xs font-semibold text-slate-900">
              {data.value.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between gap-6">
            <span className="text-xs text-slate-500">Percentage</span>
            <span className="text-xs font-semibold text-slate-900">
              {data.percentage}%
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor="middle"
      dominantBaseline="central"
      className="text-xs font-bold"
    >
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

export default function ManufInventoryStatusChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const available = data.find(item => item.name === "Available")?.value || 0;
  const availablePercentage = ((available / total) * 100).toFixed(1);
  const blocked = data.find(item => item.name === "Blocked")?.value || 0;
  const blockedPercentage = ((blocked / total) * 100).toFixed(1);

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">Inventory Status Mix</h2>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Updated Today
            </span>
          </div>
          <p className="mt-0.5 text-xs text-slate-500">Current stock distribution by operational status</p>
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
      <div className="mt-3 grid grid-cols-3 gap-2 flex-shrink-0">
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Total Inventory</p>
          <p className="text-sm font-bold text-slate-900">{total.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Available</p>
          <p className="text-sm font-bold text-emerald-600">{available.toLocaleString()}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Availability</p>
          <p className="text-sm font-bold text-emerald-600 flex items-center gap-0.5">
            <TrendingUp className="h-3 w-3" />
            {availablePercentage}%
          </p>
        </div>
      </div>

      {/* Chart */}
      <div className="mt-4" style={{ height: '260px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <defs>
              {data.map((entry) => (
                <filter key={entry.name} id={`shadow-${entry.name}`}>
                  <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
                </filter>
              ))}
            </defs>
            <Tooltip content={<CustomTooltip />} />
            <Legend
              verticalAlign="bottom"
              height={30}
              iconType="circle"
              iconSize={8}
              formatter={(value) => (
                <span className="text-xs text-slate-600">{value}</span>
              )}
              wrapperStyle={{ fontSize: '11px', paddingTop: '4px' }}
            />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={90}
              paddingAngle={4}
              labelLine={false}
              label={renderCustomizedLabel}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="white"
                  strokeWidth={2}
                  filter={`url(#shadow-${entry.name})`}
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend with detailed stats - Fixed overlap */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 flex-shrink-0">
        {data.map((item) => (
          <div 
            key={item.name} 
            className="flex items-center justify-between rounded-lg border border-slate-100 p-2 hover:bg-slate-50 transition-colors"
          >
            <div className="flex items-center gap-1.5 min-w-0">
              <span
                className="h-2.5 w-2.5 rounded-full flex-shrink-0"
                style={{ backgroundColor: item.color }}
              />
              <span className="text-[11px] font-medium text-slate-600 truncate">
                {item.name}
              </span>
            </div>
            <div className="text-right flex-shrink-0 ml-1">
              <p className="text-[11px] font-semibold text-slate-900">
                {item.value.toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Info className="h-3 w-3 text-slate-400" />
          <span className="text-[10px] text-slate-500">
            Based on current inventory data
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-400">
            Blocked: {blockedPercentage}%
          </span>
          <button className="text-[10px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
            View Details →
          </button>
        </div>
      </div>
    </div>
  );
}