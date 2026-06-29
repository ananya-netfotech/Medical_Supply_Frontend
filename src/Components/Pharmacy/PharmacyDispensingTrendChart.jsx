import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { TrendingUp, Users, Pill } from "lucide-react";

const data = [
  { day: "Mon", dispensed: 142, pmjay: 58 },
  { day: "Tue", dispensed: 168, pmjay: 61 },
  { day: "Wed", dispensed: 154, pmjay: 57 },
  { day: "Thu", dispensed: 188, pmjay: 74 },
  { day: "Fri", dispensed: 176, pmjay: 69 },
  { day: "Sat", dispensed: 201, pmjay: 82 },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-xl border border-slate-200/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm font-bold text-slate-900">{label}</p>
        <div className="mt-2 space-y-1.5">
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-purple-600" />
            <span className="text-sm text-slate-600">Dispensed:</span>
            <span className="text-sm font-bold text-slate-900">
              {payload[0].value}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-sm text-slate-600">PM-JAY:</span>
            <span className="text-sm font-bold text-slate-900">
              {payload[1].value}
            </span>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default function PharmacyDispensingTrendChart() {
  const totalDispensed = data.reduce((sum, item) => sum + item.dispensed, 0);
  const avgDispensed = Math.round(totalDispensed / data.length);
  const totalPmJay = data.reduce((sum, item) => sum + item.pmjay, 0);
  const pmJayPercentage = Math.round((totalPmJay / totalDispensed) * 100);

  return (
    <div className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Dispensing Trend</h2>
          <p className="mt-1 text-sm text-slate-500">
            Daily medicine dispensing and PM-JAY linked transactions
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1">
            <Pill className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-xs font-semibold text-purple-600">
              {avgDispensed}/day
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1">
            <Users className="h-3.5 w-3.5 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-600">
              {pmJayPercentage}% PM-JAY
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data}>
            <defs>
              <linearGradient id="dispenseGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="pmjayGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#10B981" stopOpacity={0.15} />
                <stop offset="95%" stopColor="#10B981" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid 
              strokeDasharray="4 4" 
              vertical={false} 
              stroke="#E2E8F0"
              strokeOpacity={0.6}
            />
            
            <XAxis 
              dataKey="day" 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
            />
            
            <YAxis 
              tickLine={false} 
              axisLine={false}
              tick={{ fill: '#94A3B8', fontSize: 12, fontWeight: 500 }}
            />
            
            <Tooltip content={<CustomTooltip />} />

            <Area
              type="monotone"
              dataKey="dispensed"
              stroke="#8B5CF6"
              strokeWidth={3}
              fill="url(#dispenseGradient)"
              dot={{
                fill: "#8B5CF6",
                stroke: "#ffffff",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                fill: "#8B5CF6",
                stroke: "#ffffff",
                strokeWidth: 3,
                r: 6,
              }}
            />

            <Area
              type="monotone"
              dataKey="pmjay"
              stroke="#10B981"
              strokeWidth={2.5}
              fill="url(#pmjayGradient)"
              dot={{
                fill: "#10B981",
                stroke: "#ffffff",
                strokeWidth: 2,
                r: 4,
              }}
              activeDot={{
                fill: "#10B981",
                stroke: "#ffffff",
                strokeWidth: 3,
                r: 6,
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <div className="rounded-xl bg-purple-50/50 px-3 py-2 text-center">
          <p className="text-xs font-medium text-slate-500">Total Dispensed</p>
          <p className="text-lg font-black text-purple-600">
            {totalDispensed.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-emerald-50/50 px-3 py-2 text-center">
          <p className="text-xs font-medium text-slate-500">Total PM-JAY</p>
          <p className="text-lg font-black text-emerald-600">
            {totalPmJay.toLocaleString()}
          </p>
        </div>
        <div className="rounded-xl bg-indigo-50/50 px-3 py-2 text-center">
          <p className="text-xs font-medium text-slate-500">PM-JAY Share</p>
          <p className="text-lg font-black text-indigo-600">
            {pmJayPercentage}%
          </p>
        </div>
      </div>
    </div>
  );
}