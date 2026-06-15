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
  { bucket: "0-30 days", licenses: 1 },
  { bucket: "31-60 days", licenses: 1 },
  { bucket: "61-90 days", licenses: 2 },
  { bucket: "90+ days", licenses: 8 },
];

export default function ManufLicenseExpiryChart() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">
        License Expiry Outlook
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        Upcoming manufacturing license renewal windows.
      </p>

      <div className="mt-5 h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="bucket" tickLine={false} axisLine={false} />
            <YAxis tickLine={false} axisLine={false} />
            <Tooltip />
            <Bar dataKey="licenses" fill="#0F766E" radius={[8, 8, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}