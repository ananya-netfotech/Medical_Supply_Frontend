import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { Package, AlertCircle, Shield, Clock } from "lucide-react";

const data = [
  { 
    name: "Available", 
    value: 1120000, 
    color: "#8B5CF6",
    icon: Package,
    bg: "bg-purple-50",
    text: "text-purple-600"
  },
  { 
    name: "Reserved", 
    value: 62000, 
    color: "#6366F1",
    icon: Clock,
    bg: "bg-indigo-50",
    text: "text-indigo-600"
  },
  { 
    name: "Near Expiry", 
    value: 8200, 
    color: "#F59E0B",
    icon: AlertCircle,
    bg: "bg-amber-50",
    text: "text-amber-600"
  },
  { 
    name: "Blocked", 
    value: 1450, 
    color: "#EF4444",
    icon: Shield,
    bg: "bg-rose-50",
    text: "text-rose-600"
  },
];

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="rounded-xl border border-slate-200/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
        <p className="text-sm font-semibold text-slate-900">{data.name}</p>
        <p className="text-lg font-black text-slate-700">
          {data.value.toLocaleString()} units
        </p>
        <p className="text-xs text-slate-400">
          {((data.value / 1120000) * 100).toFixed(1)}% of total
        </p>
      </div>
    );
  }
  return null;
};

export default function PharmacyStockMixChart() {
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <div className="h-full">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-900">Inventory Status Mix</h2>
          <p className="mt-1 text-sm text-slate-500">
            Visual split of available, reserved, near-expiry and blocked stock
          </p>
        </div>
        <div className="rounded-full bg-purple-50 px-3 py-1 text-xs font-semibold text-purple-600">
          Total: {(total / 1000000).toFixed(2)}M units
        </div>
      </div>

      <div className="mt-4 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip content={<CustomTooltip />} />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              strokeWidth={2}
              stroke="#ffffff"
            >
              {data.map((item) => (
                <Cell 
                  key={item.name} 
                  fill={item.color}
                  className="cursor-pointer transition-all hover:opacity-80"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        {data.map((item) => (
          <div 
            key={item.name} 
            className={`flex items-center gap-2.5 rounded-xl ${item.bg} px-3 py-2.5 transition-all hover:scale-[1.02]`}
          >
            <div className={`rounded-lg ${item.bg} p-1.5`}>
              <item.icon className={`h-4 w-4 ${item.text}`} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-slate-500 truncate">
                {item.name}
              </p>
              <p className={`text-sm font-bold ${item.text}`}>
                {item.value.toLocaleString()}
              </p>
            </div>
            <span className="text-[10px] font-semibold text-slate-400">
              {((item.value / total) * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}