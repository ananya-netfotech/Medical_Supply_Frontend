import {
  AlertTriangle,
  ArrowLeftRight,
  Boxes,
  CheckCircle2,
  FileCheck2,
  MessageSquareWarning,
  Pill,
  ShieldAlert,
} from "lucide-react";

const stats = [
  {
    title: "Active Licenses",
    value: "12",
    note: "2 renewals due soon",
    icon: FileCheck2,
    tone: "emerald",
  },
  {
    title: "Medicine Batches",
    value: "248",
    note: "18 under review",
    icon: Pill,
    tone: "blue",
  },
  {
    title: "Available Inventory",
    value: "842K",
    note: "Ready for transfer",
    icon: Boxes,
    tone: "emerald",
  },
  {
    title: "Completed Transfers",
    value: "326",
    note: "18 pending",
    icon: ArrowLeftRight,
    tone: "emerald",
  },
  {
    title: "Recall Watch",
    value: "3",
    note: "Transfer blocked",
    icon: ShieldAlert,
    tone: "rose",
  },
  {
    title: "Compliance Alerts",
    value: "7",
    note: "2 overdue responses",
    icon: AlertTriangle,
    tone: "amber",
  },
  {
    title: "Citizen Complaints",
    value: "42",
    note: "11 open",
    icon: MessageSquareWarning,
    tone: "blue",
  },
  {
    title: "Quality Passed",
    value: "216",
    note: "Active approved batches",
    icon: CheckCircle2,
    tone: "emerald",
  },
];

export default function ManufOverviewStats() {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </section>
  );
}

function StatCard({ title, value, note, icon: Icon, tone }) {
  const tones = {
    emerald: "bg-emerald-50 text-emerald-700 border-emerald-100",
    amber: "bg-amber-50 text-amber-700 border-amber-100",
    rose: "bg-rose-50 text-rose-700 border-rose-100",
    blue: "bg-blue-50 text-blue-700 border-blue-100",
  };

  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">{title}</p>
          <h3 className="mt-2 text-3xl font-black text-slate-950">{value}</h3>
          <p className="mt-2 text-xs font-medium text-slate-400">{note}</p>
        </div>

        <div className={`rounded-2xl border p-3 ${tones[tone]}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}