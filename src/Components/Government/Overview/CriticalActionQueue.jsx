import { criticalQueue } from "../../../Pages/Government/pages/governmentDashboardData";
import { AlertCircle, Clock, ChevronRight, Flag, Star, Users, FileText, Pill, Building2, AlertTriangle } from "lucide-react";

const severityClass = {
  Critical: {
    badge: "bg-rose-100 text-rose-700 border-rose-200",
    icon: "text-rose-600",
    bg: "bg-rose-50",
    dot: "bg-rose-500",
    border: "border-rose-200"
  },
  High: {
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    icon: "text-orange-600",
    bg: "bg-orange-50",
    dot: "bg-orange-500",
    border: "border-orange-200"
  },
  Medium: {
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    icon: "text-amber-600",
    bg: "bg-amber-50",
    dot: "bg-amber-500",
    border: "border-amber-200"
  },
};

const getPriorityIcon = (severity) => {
  switch (severity) {
    case 'Critical': return AlertTriangle;
    case 'High': return Flag;
    default: return AlertCircle;
  }
};

export default function CriticalActionQueue() {
  const criticalCount = criticalQueue.filter(item => item.severity === 'Critical').length;
  const highCount = criticalQueue.filter(item => item.severity === 'High').length;
  const mediumCount = criticalQueue.filter(item => item.severity === 'Medium').length;

  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      {/* Header Section */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-rose-100">
              <AlertTriangle className="h-4 w-4 text-rose-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Critical Action Queue
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Cases requiring regulatory officer decision
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Priority Summary */}
          <div className="hidden items-center gap-2 rounded-full border border-slate-200 bg-white px-3 py-1.5 sm:flex">
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-xs font-semibold text-rose-700">{criticalCount}</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-orange-500" />
              <span className="text-xs font-semibold text-orange-700">{highCount}</span>
            </div>
            <div className="h-3 w-px bg-slate-200" />
            <div className="flex items-center gap-1">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-xs font-semibold text-amber-700">{mediumCount}</span>
            </div>
          </div>

          <span className="relative inline-flex items-center gap-2 rounded-full bg-rose-50 px-3 py-1.5 text-xs font-bold text-rose-700">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-rose-500"></span>
            </span>
            Live Monitoring
          </span>
        </div>
      </div>

      {/* Queue Items */}
      <div className="space-y-3">
        {criticalQueue.map((item, idx) => {
          const Icon = item.icon;
          const PriorityIcon = getPriorityIcon(item.severity);
          const severity = severityClass[item.severity];

          return (
            <div
              key={`${item.title}-${item.entity}`}
              className={`group relative overflow-hidden rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer ${severity.border
                } bg-white hover:${severity.bg.replace('bg-', 'hover:bg-')}`}
            >
              {/* Animated gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />

              <div className="relative p-4">
                <div className="flex items-start gap-3">
                  {/* Icon Section */}
                  <div className="relative">
                    <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-xl ${severity.bg} text-blue-700 shadow-sm transition-all duration-300 group-hover:scale-105`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    {/* Priority indicator dot */}
                    <div className={`absolute -right-1 -top-1 h-3 w-3 rounded-full ${severity.dot} ring-2 ring-white`} />
                  </div>

                  <div className="min-w-0 flex-1">
                    {/* Title and Severity */}
                    <div className="mb-2 flex flex-wrap items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-bold text-slate-900 group-hover:text-slate-950 transition-colors">
                          {item.title}
                        </h3>
                        <div className="mt-0.5 flex items-center gap-2">
                          <p className="font-mono text-xs text-slate-500">
                            {item.entity}
                          </p>
                          <div className="h-1 w-1 rounded-full bg-slate-300" />
                          <p className="text-xs text-slate-400">ID: {item.id || `#${idx + 1001}`}</p>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        {/* Severity Badge */}
                        <div className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 ${severity.badge}`}>
                          <PriorityIcon className={`h-3 w-3 ${severity.icon}`} />
                          <span className="text-[10px] font-bold uppercase">
                            {item.severity}
                          </span>
                        </div>

                        {/* Time indicator */}
                        <div className="hidden sm:flex items-center gap-1 text-xs text-slate-400">
                          <Clock className="h-3 w-3" />
                          <span>{item.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Footer Section */}
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-3">
                        {/* Owner with avatar placeholder */}
                        <div className="flex items-center gap-1.5">
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-slate-200 text-[9px] font-bold text-slate-600">
                            {item.owner.charAt(0)}
                          </div>
                          <p className="text-xs font-medium text-slate-600">
                            {item.owner}
                          </p>
                        </div>

                        {/* Department tag */}
                        <div className="hidden sm:flex items-center gap-1">
                          <div className="h-3 w-px bg-slate-200" />
                          <span className="text-xs text-slate-400">Regulatory Affairs</span>
                        </div>
                      </div>

                      {/* Action button on hover */}
                      <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Review Case
                        <ChevronRight className="h-3 w-3" />
                      </button>

                      {/* Mobile time display */}
                      <div className="flex sm:hidden items-center gap-1 text-xs text-slate-400">
                        <Clock className="h-3 w-3" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <AlertCircle className="h-3.5 w-3.5" />
          <span>Showing {criticalQueue.length} pending actions</span>
          <div className="h-1 w-1 rounded-full bg-slate-300" />
          <span>Last updated: 2 mins ago</span>
        </div>

        <button className="group inline-flex items-center justify-center gap-2 rounded-xl bg-blue-700 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition-all duration-300 hover:bg-blue-800 hover:shadow-md">
          Review Priority Cases
          <ChevronRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
        </button>
      </div>
    </section>
  );
}