import { AlertTriangle, Shield, Package, Pill, Users, Calendar, TrendingUp } from "lucide-react";

const rows = [
  { area: "Inventory", levels: ["low", "low", "medium", "medium", "high"], icon: Package },
  { area: "Dispensing", levels: ["low", "medium", "low", "high", "medium"], icon: Pill },
  { area: "PM-JAY", levels: ["low", "low", "medium", "medium", "low"], icon: Users },
  { area: "Expiry", levels: ["medium", "medium", "high", "high", "medium"], icon: Calendar },
  { area: "Recall", levels: ["low", "medium", "high", "high", "high"], icon: Shield },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const getColor = (level) => {
  const colors = {
    low: "bg-emerald-100/80 hover:bg-emerald-200/80 border-emerald-200",
    medium: "bg-purple-100/80 hover:bg-purple-200/80 border-purple-200",
    high: "bg-rose-100/80 hover:bg-rose-200/80 border-rose-200",
  };
  return colors[level] || colors.low;
};

const getTextColor = (level) => {
  const colors = {
    low: "text-emerald-700",
    medium: "text-purple-700",
    high: "text-rose-700",
  };
  return colors[level] || colors.low;
};

const getLevelLabel = (level) => {
  return level.charAt(0).toUpperCase() + level.slice(1);
};

export default function PharmacyRecallHeatmap() {
  // Calculate risk scores for summary
  const riskScores = rows.map(row => {
    const highCount = row.levels.filter(l => l === 'high').length;
    const mediumCount = row.levels.filter(l => l === 'medium').length;
    const score = (highCount * 3 + mediumCount * 2) / row.levels.length;
    return { area: row.area, score, icon: row.icon };
  });

  const maxRisk = Math.max(...riskScores.map(r => r.score));

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">
            Safety Risk Heatmap
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Risk concentration across inventory, dispensing, expiry and recall areas
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-rose-50 px-3 py-1 border border-rose-200">
            <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
            <span className="text-xs font-semibold text-rose-600">
              {rows.filter(r => r.levels.includes('high')).length} Areas at Risk
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 border border-purple-200">
            <TrendingUp className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-xs font-semibold text-purple-600">
              {rows.filter(r => r.levels.includes('medium')).length} Medium Risk
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-6 overflow-x-auto">
        <div className="min-w-[560px] h-full">
          <div className="grid grid-cols-6 gap-3 h-full">
            {/* Header */}
            <div className="flex items-center">
              <span className="text-xs font-bold text-slate-400">Area</span>
            </div>
            {days.map((day) => (
              <div 
                key={day} 
                className="flex items-center justify-center text-xs font-bold text-slate-500 py-2 rounded-lg bg-purple-50/30 border border-purple-100/30"
              >
                {day}
              </div>
            ))}

            {/* Heatmap Rows */}
            {rows.map(({ area, levels, icon: Icon }) => (
              <div key={area} className="contents">
                <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                  <Icon className="h-4 w-4 text-purple-500 flex-shrink-0" />
                  <span className="truncate">{area}</span>
                </div>

                {levels.map((level, index) => (
                  <div
                    key={`${area}-${index}`}
                    className={`group relative rounded-xl border ${getColor(level)} transition-all duration-200 hover:scale-105 hover:shadow-md cursor-help min-h-[48px]`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <span className={`text-[10px] font-bold ${getTextColor(level)}`}>
                        {getLevelLabel(level)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 text-xs font-medium">
        <span className="text-slate-500">Risk Level:</span>
        <Legend color="bg-emerald-400" label="Low" />
        <Legend color="bg-purple-400" label="Medium" />
        <Legend color="bg-rose-400" label="High" />
      </div>

      {/* Risk Summary */}
      <div className="mt-3 grid grid-cols-5 gap-2">
        {riskScores.map(({ area, score, icon: Icon }) => {
          const percentage = Math.round((score / maxRisk) * 100);
          const riskLevel = score >= 2.5 ? 'High' : score >= 1.5 ? 'Medium' : 'Low';
          const color = score >= 2.5 ? 'rose' : score >= 1.5 ? 'purple' : 'emerald';
          const bgColor = score >= 2.5 ? 'bg-rose-50/50' : score >= 1.5 ? 'bg-purple-50/50' : 'bg-emerald-50/50';
          const borderColor = score >= 2.5 ? 'border-rose-200/30' : score >= 1.5 ? 'border-purple-200/30' : 'border-emerald-200/30';
          const textColor = score >= 2.5 ? 'text-rose-600' : score >= 1.5 ? 'text-purple-600' : 'text-emerald-600';
          const iconColor = score >= 2.5 ? 'text-rose-500' : score >= 1.5 ? 'text-purple-500' : 'text-emerald-500';
          const barColor = score >= 2.5 ? 'bg-rose-400' : score >= 1.5 ? 'bg-purple-400' : 'bg-emerald-400';
          
          return (
            <div 
              key={area}
              className={`rounded-xl px-2 py-2 text-center transition-all hover:scale-[1.02] ${bgColor} border ${borderColor}`}
            >
              <div className="flex items-center justify-center gap-1.5">
                <Icon className={`h-3.5 w-3.5 ${iconColor}`} />
                <span className={`text-[10px] font-bold ${textColor}`}>
                  {riskLevel}
                </span>
              </div>
              <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-slate-200">
                <div 
                  className={`h-full rounded-full ${barColor} transition-all duration-1000`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-1 text-[8px] font-medium text-slate-400">
                {area}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="flex items-center gap-2">
      <span className={`h-3 w-3 rounded-full ${color} shadow-sm`} />
      <span className="text-slate-600">{label}</span>
    </span>
  );
}