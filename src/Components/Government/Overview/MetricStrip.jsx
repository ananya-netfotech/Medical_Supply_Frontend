import { TrendingUp, TrendingDown } from "lucide-react";
import { commandMetrics } from "../../../Pages/Government/pages/governmentDashboardData";

export default function MetricStrip() {
  // Mock trend data - replace with actual data
  const getTrend = (label) => {
    const trends = {
      "Active Manufacturers": { value: 8.5, positive: true },
      "Pending Licenses": { value: 12.3, positive: false },
      "Batch Recalls": { value: 5.2, positive: true },
      "Compliance Rate": { value: 2.1, positive: true },
    };
    return trends[label] || { value: 4.5, positive: true };
  };

  const getColor = (tone) => {
    const colors = {
      blue: "from-blue-500 to-blue-600",
      emerald: "from-emerald-500 to-emerald-600",
      indigo: "from-indigo-500 to-indigo-600",
      rose: "from-rose-500 to-rose-600",
    };
    return colors[tone];
  };

  const getBgColor = (tone) => {
    const colors = {
      blue: "bg-blue-50",
      emerald: "bg-emerald-50",
      indigo: "bg-indigo-50",
      rose: "bg-rose-50",
    };
    return colors[tone];
  };

  const getIconColor = (tone) => {
    const colors = {
      blue: "text-blue-600",
      emerald: "text-emerald-600",
      indigo: "text-indigo-600",
      rose: "text-rose-600",
    };
    return colors[tone];
  };

  return (
    <div className="relative">
      {/* Glass morphism background */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/5 via-transparent to-blue-500/5" />

      <div className="relative grid grid-cols-4 gap-px overflow-hidden rounded-2xl bg-blue-100/50">
        {commandMetrics.map((item, idx) => {
          const Icon = item.icon;
          const trend = getTrend(item.label);
          const isFirst = idx === 0;
          const isLast = idx === commandMetrics.length - 1;

          return (
            <div
              key={item.label}
              className={`relative bg-white ${isFirst ? "rounded-l-2xl" : ""
                } ${isLast ? "rounded-r-2xl" : ""}`}
            >
              <div className="relative p-4">
                {/* Top section with icon and trend */}
                <div className="mb-3 flex items-center justify-between">
                  <div className={`relative rounded-xl ${getBgColor(item.tone)} p-2.5`}>
                    <Icon className={`h-4 w-4 ${getIconColor(item.tone)}`} />
                  </div>

                  <div className={`flex items-center gap-1 rounded-full px-1.5 py-0.5 ${trend.positive ? "bg-emerald-50" : "bg-rose-50"
                    }`}>
                    {trend.positive ? (
                      <TrendingUp className={`h-3 w-3 ${trend.positive ? "text-emerald-600" : "text-rose-600"}`} />
                    ) : (
                      <TrendingDown className={`h-3 w-3 ${trend.positive ? "text-emerald-600" : "text-rose-600"}`} />
                    )}
                    <span className={`text-xs font-bold ${trend.positive ? "text-emerald-600" : "text-rose-600"
                      }`}>
                      {trend.value}%
                    </span>
                  </div>
                </div>

                {/* Metric value */}
                <div className="mb-1">
                  <p className="text-xs font-medium uppercase tracking-wider text-slate-400">
                    {item.label}
                  </p>
                  <p className="text-2xl font-black tracking-tight text-slate-900">
                    {item.value}
                    {item.label === "Compliance Rate" && "%"}
                  </p>
                </div>

                {/* Progress bar */}
                <div className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-[10px]">
                    <span className="text-slate-400">Target</span>
                    <span className="font-medium text-slate-500">
                      {item.label === "Active Manufacturers" ? "500" :
                        item.label === "Pending Licenses" ? "50" :
                          item.label === "Batch Recalls" ? "20" : "100%"}
                    </span>
                  </div>
                  <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${getColor(item.tone)}`}
                      style={{
                        width: `${item.label === "Active Manufacturers" ? (item.value / 500) * 100 :
                            item.label === "Pending Licenses" ? (item.value / 50) * 100 :
                              item.label === "Batch Recalls" ? (item.value / 20) * 100 :
                                item.value
                          }%`,
                      }}
                    />
                  </div>
                </div>

                {/* Subtext with live indicator */}
                <div className="mt-3 flex items-center gap-1.5 border-t border-slate-100 pt-2.5">
                  <div className="relative">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                    <div className="absolute inset-0 h-1.5 w-1.5 animate-ping rounded-full bg-emerald-500 opacity-75" />
                  </div>
                  <span className="text-[11px] font-medium text-slate-400">
                    {item.subtext}
                  </span>
                </div>
              </div>

              {/* Decorative divider between cards */}
              {!isLast && (
                <div className="absolute right-0 top-1/2 h-8 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-slate-200 to-transparent" />
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom accent line */}
      <div className="mt-2 flex justify-center gap-1">
        {commandMetrics.map((item, idx) => (
          <div
            key={idx}
            className={`h-0.5 w-full rounded-full ${item.tone === "blue" ? "bg-blue-500/30" :
                item.tone === "emerald" ? "bg-emerald-500/30" :
                  item.tone === "indigo" ? "bg-indigo-500/30" :
                    "bg-rose-500/30"
              }`}
          />
        ))}
      </div>
    </div>
  );
}