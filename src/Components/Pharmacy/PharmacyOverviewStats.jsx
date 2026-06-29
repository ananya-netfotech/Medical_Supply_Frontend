import {
  BadgeIndianRupee,
  Boxes,
  CalendarClock,
  Pill,
  ShieldAlert,
  UserCheck,
} from "lucide-react";

const stats = [
  {
    title: "Available Inventory",
    value: "1.12M",
    note: "Ready for dispensing",
    icon: Boxes,
    trend: "+12%",
  },
  {
    title: "Dispensed Today",
    value: "188",
    note: "Medicine units issued",
    icon: Pill,
    trend: "+8%",
  },
  {
    title: "Verified Citizens",
    value: "126",
    note: "PM-JAY checks today",
    icon: UserCheck,
    trend: "+5%",
  },
  {
    title: "PM-JAY Claims",
    value: "74",
    note: "Submitted today",
    icon: BadgeIndianRupee,
    trend: "+3%",
  },
  {
    title: "Near Expiry",
    value: "8.2K",
    note: "Within 90 days",
    icon: CalendarClock,
    trend: "-2%",
    warning: true,
  },
  {
    title: "Recall / Blocked",
    value: "1.45K",
    note: "Do not dispense",
    icon: ShieldAlert,
    trend: "+4%",
    alert: true,
  },
];

export default function PharmacyOverviewStats() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
      {stats.map((item, index) => (
        <StatCard key={item.title} {...item} index={index} />
      ))}
    </div>
  );
}

function StatCard({ title, value, note, icon: Icon, trend, warning, alert, index }) {
  // Different gradient backgrounds for each card
  const gradients = [
    "from-purple-500/10 to-indigo-500/10",
    "from-purple-500/10 to-pink-500/10",
    "from-indigo-500/10 to-blue-500/10",
    "from-purple-500/10 to-violet-500/10",
    "from-rose-500/10 to-purple-500/10",
    "from-red-500/10 to-rose-500/10",
  ];

  const iconColors = [
    "text-purple-600",
    "text-indigo-600",
    "text-blue-600",
    "text-violet-600",
    "text-amber-600",
    "text-rose-600",
  ];

  const borderColors = [
    "border-purple-200/50",
    "border-indigo-200/50",
    "border-blue-200/50",
    "border-violet-200/50",
    "border-amber-200/50",
    "border-rose-200/50",
  ];

  return (
    <div 
      className={`group relative overflow-hidden rounded-2xl border ${borderColors[index]} bg-gradient-to-br ${gradients[index]} p-5 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg`}
    >
      {/* Animated background orbs */}
      <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-400/5 blur-2xl transition-all duration-500 group-hover:bg-purple-400/10" />
      <div className="absolute -bottom-8 -left-8 h-24 w-24 rounded-full bg-indigo-400/5 blur-2xl transition-all duration-500 group-hover:bg-indigo-400/10" />

      <div className="relative">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              {title}
            </p>
            <div className="mt-2 flex items-baseline gap-3">
              <h3 className="text-3xl font-black text-slate-900 tracking-tight">
                {value}
              </h3>
              {trend && (
                <span className={`text-xs font-bold ${trend.startsWith('+') ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {trend}
                </span>
              )}
            </div>
            <p className="mt-1 text-xs font-medium text-slate-400">
              {note}
            </p>
          </div>

          <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${iconColors[index]} bg-white/50 backdrop-blur-sm border ${borderColors[index]}`}>
            <Icon className="h-5 w-5" />
          </div>
        </div>

        {/* Progress bar or indicator at bottom */}
        <div className="mt-4 h-1 w-full rounded-full bg-slate-200/50">
          <div 
            className={`h-1 rounded-full transition-all duration-1000 ${
              warning ? 'bg-amber-500' : 
              alert ? 'bg-rose-500' : 
              'bg-gradient-to-r from-purple-500 to-indigo-500'
            }`}
            style={{ 
              width: warning ? '65%' : 
                     alert ? '85%' : 
                     `${Math.min(parseInt(value) / 2, 100)}%` 
            }}
          />
        </div>

        {/* Status indicator */}
        {(warning || alert) && (
          <div className="mt-2 flex items-center gap-1.5">
            <span className={`h-1.5 w-1.5 rounded-full ${warning ? 'bg-amber-500' : 'bg-rose-500'} animate-pulse`} />
            <span className="text-[10px] font-medium uppercase tracking-wider text-slate-500">
              {warning ? 'Monitor closely' : 'Action required'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}