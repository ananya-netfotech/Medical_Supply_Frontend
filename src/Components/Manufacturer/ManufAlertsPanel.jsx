import { AlertTriangle, ShieldAlert, Bell, Clock, CheckCircle2, XCircle, ChevronRight, Info } from "lucide-react";

const alerts = [
  {
    title: "Recall watch active",
    message: "Batch SUN-INS-0926 is blocked due to cold-chain deviation.",
    level: "High",
    time: "2 hours ago",
    status: "Action Required",
    icon: ShieldAlert,
  },
  {
    title: "License renewal due",
    message: "LIC-MFG-SDCA-2026-014 expires in 45 days.",
    level: "Medium",
    time: "5 hours ago",
    status: "In Progress",
    icon: Bell,
  },
  {
    title: "Complaint escalated",
    message: "Suspected counterfeit complaint requires manufacturer response.",
    level: "High",
    time: "1 day ago",
    status: "Pending",
    icon: AlertTriangle,
  },
  {
    title: "QA report pending",
    message: "Additional quality document requested for SUN-AMOX-1125.",
    level: "Medium",
    time: "2 days ago",
    status: "Under Review",
    icon: Clock,
  },
];

const getLevelStyles = (level) => {
  const map = {
    High: {
      bg: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      dot: "bg-rose-500",
      hover: "hover:bg-rose-50/50",
    },
    Medium: {
      bg: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      dot: "bg-amber-500",
      hover: "hover:bg-amber-50/50",
    },
    Low: {
      bg: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      dot: "bg-blue-500",
      hover: "hover:bg-blue-50/50",
    },
  };
  return map[level] || map.Medium;
};

const getStatusBadge = (status) => {
  const map = {
    "Action Required": "bg-rose-50 text-rose-700 border-rose-200",
    "In Progress": "bg-blue-50 text-blue-700 border-blue-200",
    "Pending": "bg-amber-50 text-amber-700 border-amber-200",
    "Under Review": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Resolved": "bg-emerald-50 text-emerald-700 border-emerald-200",
  };
  return map[status] || "bg-slate-50 text-slate-600 border-slate-200";
};

const getTimeColor = (time) => {
  if (time.includes("hour") || time.includes("minute")) return "text-rose-500";
  if (time.includes("day")) {
    const days = parseInt(time);
    if (days <= 1) return "text-amber-500";
    if (days <= 3) return "text-blue-500";
    return "text-slate-400";
  }
  return "text-slate-400";
};

export default function ManufAlertsPanel() {
  const highCount = alerts.filter(a => a.level === "High").length;
  const actionRequiredCount = alerts.filter(a => a.status === "Action Required").length;

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex items-start justify-between gap-3 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="rounded-lg bg-rose-50 p-2.5 text-rose-600">
            <ShieldAlert className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base font-semibold text-slate-900">Priority Alerts</h2>
              {highCount > 0 && (
                <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />
                  {highCount} critical
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-slate-500">
              {actionRequiredCount > 0 
                ? `${actionRequiredCount} alert${actionRequiredCount > 1 ? 's' : ''} require immediate attention`
                : 'All alerts being reviewed'}
            </p>
          </div>
        </div>
        <button className="text-xs font-medium text-emerald-600 hover:text-emerald-700 transition-colors whitespace-nowrap">
          View All
          <ChevronRight className="h-3 w-3 inline ml-0.5" />
        </button>
      </div>

      {/* Alerts List */}
      <div className="mt-4 flex-1 overflow-y-auto space-y-2.5 pr-1">
        {alerts.map((alert, index) => {
          const levelStyle = getLevelStyles(alert.level);
          const statusBadge = getStatusBadge(alert.status);
          const Icon = alert.icon;
          const timeColor = getTimeColor(alert.time);

          return (
            <div
              key={`${alert.title}-${index}`}
              className={`group relative rounded-lg border border-slate-200 p-4 transition-all duration-200 ${levelStyle.hover} hover:shadow-sm`}
            >
              {/* Top row - Title and status */}
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-lg ${levelStyle.bg} ${levelStyle.text}`}>
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <p className="text-sm font-semibold text-slate-900">
                        {alert.title}
                      </p>
                      <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-medium border ${statusBadge}`}>
                        {alert.status}
                      </span>
                    </div>
                    <p className="mt-1 text-xs text-slate-600 leading-relaxed">
                      {alert.message}
                    </p>
                  </div>
                </div>
                <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium border ${levelStyle.bg} ${levelStyle.text} ${levelStyle.border} flex-shrink-0`}>
                  {alert.level}
                </span>
              </div>

              {/* Bottom row - Time and action */}
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1.5">
                    <Clock className={`h-3 w-3 ${timeColor}`} />
                    <span className={`text-[10px] ${timeColor}`}>
                      {alert.time}
                    </span>
                  </div>
                  <div className={`h-1.5 w-1.5 rounded-full ${levelStyle.dot}`} />
                  <span className={`text-[10px] font-medium ${levelStyle.text}`}>
                    {alert.level} priority
                  </span>
                </div>
                <button className="text-[10px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors opacity-0 group-hover:opacity-100">
                  Acknowledge
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Info className="h-3 w-3 text-slate-400" />
          <span className="text-[10px] text-slate-500">
            {alerts.length} active alerts
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-[10px] text-slate-400">
            {highCount} high priority
          </span>
          <button className="text-[10px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors">
            Dismiss All
          </button>
        </div>
      </div>
    </div>
  );
}