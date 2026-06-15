import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { toneStyles } from "./constants";

export default function ModernSummaryCard({ item }) {
  const Icon = item.icon;
  const tone = toneStyles[item.tone];
  const TrendIcon = item.trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendColor = item.trend === "up" ? "text-green-600" : "text-rose-600";

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${tone.bg} ${tone.text} border ${tone.border}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-1">
          <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} />
          <span className={`text-sm font-medium ${trendColor}`}>
            {item.change}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-500">{item.label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{item.value}</p>
      <p className="mt-1 text-xs text-gray-500">{item.detail}</p>
    </div>
  );
}