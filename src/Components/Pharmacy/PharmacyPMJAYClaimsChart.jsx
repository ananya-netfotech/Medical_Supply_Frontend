import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, CheckCircle, Clock, AlertCircle, XCircle } from "lucide-react";

const data = [
  { status: "Submitted", count: 74, color: "#8B5CF6", icon: Clock },
  { status: "Review", count: 42, color: "#6366F1", icon: AlertCircle },
  { status: "Approved", count: 61, color: "#10B981", icon: CheckCircle },
  { status: "Paid", count: 38, color: "#06B6D4", icon: TrendingUp },
  { status: "Rejected", count: 8, color: "#EF4444", icon: XCircle },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <p className="mt-1 text-2xl font-black text-slate-700">
          {payload[0].value} claims
        </p>
        <p className="text-xs text-slate-400">
          {((payload[0].value / 223) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export default function PharmacyPMJAYClaimsChart() {
  const total = data.reduce((sum, item) => sum + item.count, 0);
  const approved = data.find(item => item.status === "Approved")?.count || 0;
  const paid = data.find(item => item.status === "Paid")?.count || 0;
  const completionRate = Math.round(((approved + paid) / total) * 100);

  return (
    <div className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">PM-JAY Claim Flow</h2>
          <p className="mt-1 text-sm text-slate-500">
            Current claim distribution across reimbursement stages
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-600">
              {completionRate}% Complete
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
            <defs>
              {data.map((item) => (
                <linearGradient key={item.status} id={`gradient-${item.status}`} x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={item.color} stopOpacity={0.8} />
                  <stop offset="100%" stopColor={item.color} stopOpacity={1} />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid 
              strokeDasharray="4 4" 
              horizontal={true}
              vertical={false}
              stroke="#E2E8F0"
              strokeOpacity={0.6}
            />
            
            <XAxis 
              type="number"
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
            />
            
            <YAxis 
              dataKey="status"
              type="category"
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 600 }}
              width={80}
            />
            
            <Tooltip content={<CustomTooltip />} />

            <Bar 
              dataKey="count" 
              radius={[0, 8, 8, 0]}
              barSize={32}
            >
              {data.map((item) => (
                <Cell key={item.status} fill={`url(#gradient-${item.status})`} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-5 gap-1.5">
        {data.map((item) => (
          <div 
            key={item.status} 
            className="rounded-xl px-2 py-1.5 text-center transition-all hover:scale-[1.02]"
            style={{ backgroundColor: `${item.color}10` }}
          >
            <item.icon className={`mx-auto h-4 w-4`} style={{ color: item.color }} />
            <p className="mt-1 text-xs font-bold" style={{ color: item.color }}>
              {item.count}
            </p>
            <p className="text-[9px] font-medium text-slate-400 truncate">
              {item.status}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}