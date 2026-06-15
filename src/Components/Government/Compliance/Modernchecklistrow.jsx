import { TrendingDown, TrendingUp } from "lucide-react";

export default function ModernChecklistRow({ item, compact = false }) {
  const Icon = item.icon;

  const getColor = () => {
    if (item.score >= 90) return "bg-green-500";
    if (item.score >= 75) return "bg-blue-500";
    if (item.score >= 65) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getStatusColor = () => {
    if (item.status === "Strong") return "text-green-700 bg-green-50";
    if (item.status === "Watch") return "text-amber-700 bg-amber-50";
    return "text-rose-700 bg-rose-50";
  };

  const TrendIcon = item.trend.startsWith("+") ? TrendingUp : TrendingDown;
  const trendColor = item.trend.startsWith("+") ? "text-green-500" : "text-rose-500";

  return (
    <div className={`rounded-md transition-colors hover:bg-gray-50 ${compact ? "p-2" : "p-3"}`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-600">
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {item.label}
            </p>
            <span className={`mt-0.5 inline-block rounded-md px-1.5 py-0.5 text-xs font-medium ${getStatusColor()}`}>
              {item.status}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="text-base font-bold text-gray-800">{item.score}%</span>
          <div className="flex items-center gap-0.5">
            <TrendIcon className={`h-2.5 w-2.5 ${trendColor}`} />
            <span className={`text-xs font-medium ${trendColor}`}>
              {item.trend}
            </span>
          </div>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full ${getColor()} transition-all duration-500`}
          style={{ width: `${item.score}%` }}
        />
      </div>
    </div>
  );
}