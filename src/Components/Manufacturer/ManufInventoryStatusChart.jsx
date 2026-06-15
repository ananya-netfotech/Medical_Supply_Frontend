import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const data = [
  { name: "Available", value: 842000, color: "#059669" },
  { name: "Reserved", value: 286000, color: "#D97706" },
  { name: "Transferred", value: 95500, color: "#2563EB" },
  { name: "Blocked", value: 12000, color: "#E11D48" },
];

export default function ManufInventoryStatusChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">
        Inventory Status Mix
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Current stock distribution by operational status.
      </p>

      <div className="mt-5 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Tooltip />
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius={70}
              outerRadius={110}
              paddingAngle={4}
            >
              {data.map((entry) => (
                <Cell key={entry.name} fill={entry.color} />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((item) => (
          <div key={item.name} className="flex items-center gap-2">
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: item.color }}
            />
            <span className="text-sm font-medium text-slate-600">
              {item.name}: {item.value.toLocaleString()}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}