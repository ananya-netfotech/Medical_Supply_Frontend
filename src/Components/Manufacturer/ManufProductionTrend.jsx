import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", batches: 28, units: 120000 },
  { month: "Feb", batches: 32, units: 148000 },
  { month: "Mar", batches: 36, units: 164000 },
  { month: "Apr", batches: 41, units: 188000 },
  { month: "May", batches: 39, units: 176000 },
  { month: "Jun", batches: 45, units: 210000 },
];

export default function ManufProductionTrend() {
  return (
    <ChartCard
      title="Production Trend"
      subtitle="Monthly manufactured batch and unit output."
    >
      <ResponsiveContainer width="100%" height={320}>
        <AreaChart data={data}>
          <defs>
            <linearGradient id="unitsGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="month" tickLine={false} axisLine={false} />
          <YAxis tickLine={false} axisLine={false} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="units"
            stroke="#059669"
            strokeWidth={3}
            fill="url(#unitsGradient)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartCard>
  );
}

function ChartCard({ title, subtitle, children }) {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">{title}</h2>
      <p className="mt-1 text-sm text-slate-500">{subtitle}</p>
      <div className="mt-5">{children}</div>
    </div>
  );
}