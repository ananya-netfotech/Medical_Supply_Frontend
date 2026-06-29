import { AlertTriangle, ShieldAlert, Clock, FileText, Users, Bell, ChevronRight } from "lucide-react";

const alerts = [
  {
    title: "Recall watch batch found",
    text: "SUN-INS-0926 is blocked and must not be dispensed.",
    level: "Critical",
    icon: ShieldAlert,
    time: "2 min ago",
  },
  {
    title: "Near-expiry stock",
    text: "8,200 units require expiry review within 90 days.",
    level: "Medium",
    icon: Clock,
    time: "15 min ago",
  },
  {
    title: "PM-JAY documents pending",
    text: "12 claims need prescription or treatment episode documents.",
    level: "Medium",
    icon: FileText,
    time: "1 hour ago",
  },
  {
    title: "Citizen notifications required",
    text: "18 citizens may need recall-related notifications.",
    level: "High",
    icon: Users,
    time: "2 hours ago",
  },
];

const getLevelStyles = (level) => {
  const styles = {
    Critical: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      badge: "bg-purple-100 text-purple-700 border-purple-200",
      dot: "bg-purple-500",
      icon: "text-purple-500",
      hover: "hover:border-purple-300 hover:shadow-purple-100/50",
    },
    High: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-700",
      badge: "bg-indigo-100 text-indigo-700 border-indigo-200",
      dot: "bg-indigo-500",
      icon: "text-indigo-500",
      hover: "hover:border-indigo-300 hover:shadow-indigo-100/50",
    },
    Medium: {
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
      badge: "bg-violet-100 text-violet-700 border-violet-200",
      dot: "bg-violet-500",
      icon: "text-violet-500",
      hover: "hover:border-violet-300 hover:shadow-violet-100/50",
    },
  };
  return styles[level] || styles.Medium;
};

export default function PharmacyPriorityAlerts() {
  const criticalCount = alerts.filter(a => a.level === "Critical").length;
  const highCount = alerts.filter(a => a.level === "High").length;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="rounded-2xl bg-gradient-to-br from-purple-50 to-purple-100 p-3 border border-purple-200/50">
            <ShieldAlert className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">
              Priority Alerts
            </h2>
            <p className="text-sm text-slate-500">
              Alerts requiring pharmacy action before dispensing
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {criticalCount > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 border border-purple-200">
              <span className="h-1.5 w-1.5 rounded-full bg-purple-500 animate-pulse" />
              <span className="text-xs font-semibold text-purple-600">
                {criticalCount} Critical
              </span>
            </div>
          )}
          {highCount > 0 && (
            <div className="flex items-center gap-1.5 rounded-full bg-indigo-50 px-3 py-1 border border-indigo-200">
              <Bell className="h-3 w-3 text-indigo-500" />
              <span className="text-xs font-semibold text-indigo-600">
                {highCount} High
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 mt-5 space-y-3 overflow-y-auto pr-1">
        {alerts.map((alert) => {
          const styles = getLevelStyles(alert.level);
          const Icon = alert.icon;
          
          return (
            <div
              key={alert.title}
              className={`group rounded-2xl border ${styles.border} ${styles.bg} ${styles.hover} p-4 transition-all duration-200 hover:shadow-lg cursor-pointer`}
            >
              <div className="flex gap-3">
                <div className={`flex-shrink-0 rounded-xl ${styles.bg} p-2 border ${styles.border}`}>
                  <Icon className={`h-4 w-4 ${styles.icon}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className={`font-bold ${styles.text}`}>
                      {alert.title}
                    </p>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${styles.badge}`}>
                        <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                        {alert.level}
                      </span>
                    </div>
                  </div>
                  <p className="mt-1 text-sm leading-6 text-slate-600">
                    {alert.text}
                  </p>
                  <div className="mt-2 flex items-center gap-4">
                    <span className="text-[10px] font-medium text-slate-400">
                      {alert.time}
                    </span>
                    <span className="text-[10px] font-medium text-slate-400">
                      Action required
                    </span>
                  </div>
                </div>
                <ChevronRight className={`h-4 w-4 ${styles.icon} opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0`} />
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer action */}
      <div className="mt-4 pt-3 border-t border-slate-200/50">
        <button className="w-full rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-2.5 text-center text-xs font-semibold text-purple-700 transition-all hover:from-purple-100 hover:to-indigo-100 hover:scale-[1.01] border border-purple-200/50">
          View all alerts →
        </button>
      </div>
    </div>
  );
}