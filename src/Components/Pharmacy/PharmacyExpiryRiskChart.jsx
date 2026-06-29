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
import {
  AlertTriangle,
  Clock,
  Calendar,
  Skull,
} from "lucide-react";

const data = [
  {
    window: "0-30 days",
    units: 1120,
    color: "#EF4444",
    icon: Skull,
    status: "Critical",
  },
  {
    window: "31-60 days",
    units: 2840,
    color: "#F59E0B",
    icon: AlertTriangle,
    status: "High Risk",
  },
  {
    window: "61-90 days",
    units: 4240,
    color: "#8B5CF6",
    icon: Clock,
    status: "Monitor",
  },
  {
    window: "Expired",
    units: 186,
    color: "#DC2626",
    icon: Calendar,
    status: "Expired",
  },
];

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) {
    return null;
  }

  const item = payload[0].payload;

  return (
    <div className="rounded-xl border border-slate-200/60 bg-white/95 px-4 py-3 shadow-lg backdrop-blur-sm">
      <p className="text-sm font-bold text-slate-800">{label}</p>

      <p className="mt-1 text-2xl font-black text-slate-800">
        {payload[0].value.toLocaleString()} units
      </p>

      <div className="mt-1.5 flex items-center gap-2">
        <span
          className="h-2 w-2 rounded-full"
          style={{ backgroundColor: item.color }}
        />

        <span className="text-xs font-medium text-slate-600">
          Status: {item.status}
        </span>
      </div>
    </div>
  );
};

export default function PharmacyExpiryRiskChart() {
  const totalAtRisk = data.reduce(
    (sum, item) => sum + item.units,
    0
  );

  const expired =
    data.find((item) => item.window === "Expired")?.units || 0;

  const critical =
    data.find((item) => item.window === "0-30 days")?.units || 0;

  const riskPercentage = Math.round(
    ((totalAtRisk - expired) / totalAtRisk) * 100
  );

  return (
    <div className="h-full">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Expiry Risk Outlook
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Medicines nearing expiry or already expired
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1">
            <Skull className="h-3.5 w-3.5 text-rose-600" />

            <span className="text-xs font-semibold text-rose-600">
              {expired.toLocaleString()} Expired
            </span>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-amber-50 px-3 py-1">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-600" />

            <span className="text-xs font-semibold text-amber-600">
              {critical.toLocaleString()} Critical
            </span>
          </div>
        </div>
      </div>

      <div className="mt-10 h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 10,
              left: 10,
              bottom: 10,
            }}
          >
            <defs>
              {data.map((item, index) => (
                <linearGradient
                  key={item.window}
                  id={`expiry-gradient-${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="0%"
                    stopColor={item.color}
                    stopOpacity={0.95}
                  />

                  <stop
                    offset="100%"
                    stopColor={item.color}
                    stopOpacity={0.55}
                  />
                </linearGradient>
              ))}
            </defs>

            <CartesianGrid
              strokeDasharray="4 4"
              vertical={false}
              stroke="#CBD5E1"
              strokeOpacity={0.5}
            />

            <XAxis
              dataKey="window"
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 12,
                fontWeight: 500,
              }}
            />

            <YAxis
              tickLine={false}
              axisLine={false}
              tick={{
                fill: "#64748B",
                fontSize: 12,
                fontWeight: 500,
              }}
            />

            <Tooltip
              content={<CustomTooltip />}
              cursor={{ fill: "rgba(148, 163, 184, 0.08)" }}
            />

            <Bar
              dataKey="units"
              radius={[8, 8, 0, 0]}
              barSize={40}
            >
              {data.map((item, index) => (
                <Cell
                  key={item.window}
                  fill={`url(#expiry-gradient-${index})`}
                  className="cursor-pointer transition-opacity hover:opacity-80"
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {data.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.window}
              className="rounded-xl px-2 py-2 text-center transition-transform duration-200 hover:scale-[1.02]"
              style={{
                backgroundColor: `${item.color}10`,
              }}
            >
              <div className="flex items-center justify-center gap-1.5">
                <Icon
                  className="h-3.5 w-3.5"
                  style={{ color: item.color }}
                />

                <p
                  className="text-xs font-bold"
                  style={{ color: item.color }}
                >
                  {item.units.toLocaleString()}
                </p>
              </div>

              <p className="mt-0.5 text-[9px] font-medium text-slate-500">
                {item.window}
              </p>

              <span
                className="mt-1 inline-block rounded-full px-1.5 py-0.5 text-[8px] font-bold uppercase"
                style={{
                  backgroundColor: `${item.color}20`,
                  color: item.color,
                }}
              >
                {item.status}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-4 flex flex-col gap-3 rounded-xl border border-slate-200/50 bg-gradient-to-r from-rose-50/80 via-amber-50/80 to-purple-50/80 px-4 py-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-500" />

          <span className="text-xs font-medium text-slate-600">
            Total at risk:
          </span>

          <span className="text-sm font-bold text-slate-800">
            {totalAtRisk.toLocaleString()} units
          </span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-slate-500">
            Risk level:
          </span>

          <div className="flex h-2 w-24 overflow-hidden rounded-full bg-slate-200">
            <div
              className="h-full bg-gradient-to-r from-rose-500 via-amber-500 to-purple-500"
              style={{ width: `${riskPercentage}%` }}
            />
          </div>

          <span className="text-xs font-bold text-slate-700">
            {riskPercentage}%
          </span>
        </div>
      </div>
    </div>
  );
}