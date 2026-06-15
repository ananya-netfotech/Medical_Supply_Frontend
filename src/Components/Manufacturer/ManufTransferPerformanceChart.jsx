import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const data = [
  { month: "Jan", completed: 38, blocked: 1 },
  { month: "Feb", completed: 44, blocked: 2 },
  { month: "Mar", completed: 51, blocked: 1 },
  { month: "Apr", completed: 58, blocked: 3 },
  { month: "May", completed: 62, blocked: 2 },
  { month: "Jun", completed: 73, blocked: 4 },
];

export default function ManufTransferPerformanceChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">
        Transfer Performance
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Completed versus blocked stock transfers.
      </p>

      <div className="mt-5 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="month" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="completed" fill="#059669" radius={[8, 8, 0, 0]} />
            <Bar dataKey="blocked" fill="#E11D48" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}