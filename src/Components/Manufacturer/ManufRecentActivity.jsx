import { CheckCircle2, Clock, Package, Truck, MessageSquare, FileCheck2, Bell, AlertTriangle, TrendingUp, ChevronRight } from "lucide-react";

const activities = [
  {
    title: "Batch Created",
    text: "SUN-PARA-0426 added to production registry with 50,000 units.",
    time: "Today · 10:20 AM",
    type: "batch",
    icon: Package,
    color: "emerald",
  },
  {
    title: "Transfer Submitted",
    text: "10,000 units sent to Apollo Pharmacy, Pune for distribution.",
    time: "Today · 11:05 AM",
    type: "transfer",
    icon: Truck,
    color: "blue",
  },
  {
    title: "Complaint Linked",
    text: "Complaint CMP-CIT-2026-004 linked to batch SUN-AMOX-1125.",
    time: "Yesterday · 04:30 PM",
    type: "complaint",
    icon: MessageSquare,
    color: "amber",
  },
  {
    title: "Compliance Response Uploaded",
    text: "QA report submitted for regulatory review and approval.",
    time: "2 days ago · 02:15 PM",
    type: "compliance",
    icon: FileCheck2,
    color: "emerald",
  },
];

const getColorStyles = (color) => {
  const map = {
    emerald: {
      bg: "bg-emerald-50",
      text: "text-emerald-600",
      border: "border-emerald-200",
      dot: "bg-emerald-400",
      line: "bg-emerald-100",
      hover: "hover:bg-emerald-50/50",
    },
    blue: {
      bg: "bg-blue-50",
      text: "text-blue-600",
      border: "border-blue-200",
      dot: "bg-blue-400",
      line: "bg-blue-100",
      hover: "hover:bg-blue-50/50",
    },
    amber: {
      bg: "bg-amber-50",
      text: "text-amber-600",
      border: "border-amber-200",
      dot: "bg-amber-400",
      line: "bg-amber-100",
      hover: "hover:bg-amber-50/50",
    },
    rose: {
      bg: "bg-rose-50",
      text: "text-rose-600",
      border: "border-rose-200",
      dot: "bg-rose-400",
      line: "bg-rose-100",
      hover: "hover:bg-rose-50/50",
    },
  };
  return map[color] || map.emerald;
};

export default function ManufRecentActivity() {
  // Count activities by type
  const batchCount = activities.filter(a => a.type === "batch").length;
  const transferCount = activities.filter(a => a.type === "transfer").length;
  const todayCount = activities.filter(a => a.time.includes("Today")).length;

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">Recent Activity</h2>
            {todayCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {todayCount} new
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-slate-500">Latest operational events and updates</p>
        </div>
        <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap">
          View All
          <ChevronRight className="h-3 w-3 inline ml-0.5" />
        </button>
      </div>

      {/* Quick Stats */}
      <div className="mt-3 grid grid-cols-3 gap-2 flex-shrink-0">
        <div className="rounded-lg bg-slate-50 p-2 text-center">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Today</p>
          <p className="text-sm font-bold text-slate-900">{todayCount}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2 text-center">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Batches</p>
          <p className="text-sm font-bold text-slate-900">{batchCount}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2 text-center">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Transfers</p>
          <p className="text-sm font-bold text-slate-900">{transferCount}</p>
        </div>
      </div>

      {/* Activity Timeline */}
      <div className="mt-4 flex-1 overflow-y-auto pr-1 space-y-3">
        {activities.map((item, index) => {
          const colors = getColorStyles(item.color);
          const Icon = item.icon;
          const isLast = index === activities.length - 1;

          return (
            <div key={`${item.title}-${index}`} className="relative flex gap-3 group">
              {/* Timeline line and dot */}
              <div className="flex flex-col items-center">
                <div className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${colors.bg} ${colors.text} border ${colors.border} transition-colors group-hover:shadow-sm`}>
                  <Icon className="h-4 w-4" />
                </div>
                {!isLast && (
                  <div className={`h-full w-0.5 ${colors.line} mt-1`} />
                )}
              </div>

              {/* Content */}
              <div className={`flex-1 pb-4 ${!isLast ? 'border-b border-slate-100' : ''}`}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-slate-900">
                    {item.title}
                  </p>
                  <span className={`inline-flex items-center gap-1 rounded-full px-1.5 py-0.5 text-[9px] font-medium ${colors.bg} ${colors.text} border ${colors.border}`}>
                    <span className={`h-1 w-1 rounded-full ${colors.dot}`} />
                    {item.type}
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                  {item.text}
                </p>
                <div className="mt-1.5 flex items-center gap-2">
                  <Clock className="h-3 w-3 text-slate-400" />
                  <span className="text-[10px] text-slate-400">
                    {item.time}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Bell className="h-3 w-3 text-slate-400" />
          <span className="text-[10px] text-slate-500">
            {activities.length} activities recorded
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-400">
            <TrendingUp className="h-3 w-3 inline text-emerald-500" />
            +{todayCount} today
          </span>
          <button className="text-[10px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
            Export Log
          </button>
        </div>
      </div>
    </div>
  );
}