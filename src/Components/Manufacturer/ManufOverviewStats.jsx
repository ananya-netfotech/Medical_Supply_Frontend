import {
  AlertTriangle,
  ArrowLeftRight,
  Boxes,
  CheckCircle2,
  FileCheck2,
  MessageSquareWarning,
  Pill,
  ShieldAlert,
  TrendingUp,
  TrendingDown,
} from "lucide-react";

const stats = [
  {
    title: "Active Licenses",
    value: "12",
    note: "2 renewals due soon",
    icon: FileCheck2,
    tone: "emerald",
    trend: "+2",
    trendUp: true,
    progress: 85,
  },
  {
    title: "Medicine Batches",
    value: "248",
    note: "18 under review",
    icon: Pill,
    tone: "blue",
    trend: "+12",
    trendUp: true,
    progress: 92,
  },
  {
    title: "Available Inventory",
    value: "842K",
    note: "Ready for transfer",
    icon: Boxes,
    tone: "emerald",
    trend: "+8.2%",
    trendUp: true,
    progress: 78,
  },
  {
    title: "Completed Transfers",
    value: "326",
    note: "18 pending",
    icon: ArrowLeftRight,
    tone: "emerald",
    trend: "+5.1%",
    trendUp: true,
    progress: 95,
  },
  {
    title: "Recall Watch",
    value: "3",
    note: "Transfer blocked",
    icon: ShieldAlert,
    tone: "rose",
    trend: "-1",
    trendUp: false,
    progress: 30,
  },
  {
    title: "Compliance Alerts",
    value: "7",
    note: "2 overdue responses",
    icon: AlertTriangle,
    tone: "amber",
    trend: "+2",
    trendUp: true,
    progress: 45,
  },
  {
    title: "Citizen Complaints",
    value: "42",
    note: "11 open",
    icon: MessageSquareWarning,
    tone: "blue",
    trend: "-3",
    trendUp: false,
    progress: 60,
  },
  {
    title: "Quality Passed",
    value: "216",
    note: "Active approved batches",
    icon: CheckCircle2,
    tone: "emerald",
    trend: "+8",
    trendUp: true,
    progress: 88,
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

function StatCard({ title, value, note, icon: Icon, tone, trend, trendUp, progress }) {
  const toneColors = {
    emerald: "bg-emerald-50 text-emerald-600",
    amber: "bg-amber-50 text-amber-600",
    rose: "bg-rose-50 text-rose-600",
    blue: "bg-blue-50 text-blue-600",
  };

  const progressColors = {
    emerald: "bg-emerald-500",
    amber: "bg-amber-500",
    rose: "bg-rose-500",
    blue: "bg-blue-500",
  };

  const borderColors = {
    emerald: "border-l-emerald-500",
    amber: "border-l-amber-500",
    rose: "border-l-rose-500",
    blue: "border-l-blue-500",
  };

  return (
    <div className={`group relative overflow-hidden rounded-lg border border-slate-200 bg-white p-5 shadow-sm hover:shadow-md transition-all duration-200 border-l-4 ${borderColors[tone]}`}>
      {/* Background decoration */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-gradient-to-br from-slate-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      
      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <p className="text-xs font-medium text-slate-500 uppercase tracking-wide">
                {title}
              </p>
              {trend && (
                <span className={`inline-flex items-center gap-0.5 text-[10px] font-semibold ${trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {trendUp ? <TrendingUp className="h-3 w-3" /> : <TrendingDown className="h-3 w-3" />}
                  {trend}
                </span>
              )}
            </div>
            
            <div className="mt-1 flex items-baseline gap-3">
              <h3 className="text-2xl font-bold text-slate-900">{value}</h3>
            </div>
            
            <p className="mt-1 text-xs text-slate-400">{note}</p>
          </div>

          <div className={`rounded-lg p-2.5 ${toneColors[tone]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Progress bar */}
        {progress && (
          <div className="mt-4">
            <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
              <div 
                className={`h-full rounded-full ${progressColors[tone]} transition-all duration-500 ease-out`}
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}