import { Info, Download, Calendar, ChevronRight, Shield, TrendingUp, TrendingDown } from "lucide-react";

const heatmap = [
  ["Licenses", "low", "low", "medium", "low", "low"],
  ["Batches", "low", "medium", "medium", "high", "low"],
  ["Inventory", "low", "low", "medium", "medium", "high"],
  ["Transfers", "low", "medium", "low", "medium", "high"],
  ["Complaints", "medium", "high", "medium", "low", "medium"],
  ["Recalls", "low", "medium", "high", "high", "medium"],
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const getRiskLevel = (level) => {
  const map = {
    low: { color: "bg-emerald-100 hover:bg-emerald-200", text: "text-emerald-700", label: "Low" },
    medium: { color: "bg-amber-100 hover:bg-amber-200", text: "text-amber-700", label: "Medium" },
    high: { color: "bg-rose-100 hover:bg-rose-200", text: "text-rose-700", label: "High" },
  };
  return map[level] || map.low;
};

const getRiskScore = (level) => {
  const map = { low: 1, medium: 2, high: 3 };
  return map[level] || 0;
};

export default function ManufComplianceHeatmap() {
  // Calculate summary stats
  const allLevels = heatmap.flatMap(row => row.slice(1));
  const totalCells = allLevels.length;
  const highCount = allLevels.filter(l => l === "high").length;
  const mediumCount = allLevels.filter(l => l === "medium").length;
  const lowCount = allLevels.filter(l => l === "low").length;
  
  const totalRiskScore = allLevels.reduce((sum, level) => sum + getRiskScore(level), 0);
  const maxPossibleScore = totalCells * 3;
  const riskPercentage = ((totalRiskScore / maxPossibleScore) * 100).toFixed(1);
  
  // Get areas with high risk
  const highRiskAreas = heatmap
    .filter(row => row.slice(1).includes("high"))
    .map(row => row[0]);

  return (
    <div className="h-full rounded-lg border border-slate-200 bg-white p-5 shadow-sm flex flex-col">
      {/* Header */}
      <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start flex-shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-base font-semibold text-slate-900">Compliance Risk Heatmap</h2>
            {highCount > 0 && (
              <span className="inline-flex items-center gap-1 rounded-full bg-rose-50 px-2 py-0.5 text-xs font-medium text-rose-700">
                <Shield className="h-3 w-3" />
                {highCount} high risks
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-slate-500">Risk concentration across operational areas</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 transition-colors">
            <Download className="h-3.5 w-3.5" />
          </button>
          <button className="rounded-lg border border-slate-200 p-1.5 text-slate-500 hover:bg-slate-50 transition-colors">
            <Calendar className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4 flex-shrink-0">
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Total Cells</p>
          <p className="text-sm font-bold text-slate-900">{totalCells}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">High Risk</p>
          <p className="text-sm font-bold text-rose-600">{highCount}</p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Risk Score</p>
          <p className={`text-sm font-bold ${parseFloat(riskPercentage) > 50 ? 'text-rose-600' : parseFloat(riskPercentage) > 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
            {riskPercentage}%
          </p>
        </div>
        <div className="rounded-lg bg-slate-50 p-2.5">
          <p className="text-[10px] font-medium text-slate-500 uppercase tracking-wider">Areas at Risk</p>
          <p className="text-sm font-bold text-slate-900">{highRiskAreas.length}</p>
        </div>
      </div>

      {/* Heatmap Grid */}
      <div className="mt-4 flex-1 overflow-x-auto">
        <div className="min-w-[580px]">
          <div className="grid grid-cols-6 gap-2">
            {/* Header row */}
            <div className="flex items-center justify-end pr-2">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider">Area</span>
            </div>
            {days.map((day) => (
              <div key={day} className="text-center text-[10px] font-semibold text-slate-500 uppercase tracking-wider">
                {day}
              </div>
            ))}

            {/* Heatmap rows */}
            {heatmap.map(([area, ...levels]) => {
              const riskLevels = levels.map(l => getRiskLevel(l));
              
              return (
                <>
                  <div 
                    key={`${area}-label`} 
                    className="flex items-center justify-end pr-2 text-xs font-semibold text-slate-700"
                  >
                    {area}
                  </div>
                  {levels.map((level, index) => {
                    const risk = getRiskLevel(level);
                    return (
                      <div
                        key={`${area}-${index}`}
                        className={`relative group h-12 rounded-lg ${risk.color} transition-all duration-200 cursor-help flex items-center justify-center border border-white/50`}
                        title={`${area} - ${days[index]}: ${risk.label} Risk`}
                      >
                        <span className={`text-[11px] font-bold opacity-0 group-hover:opacity-100 transition-opacity ${risk.text}`}>
                          {risk.label}
                        </span>
                      </div>
                    );
                  })}
                </>
              );
            })}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="mt-4 flex flex-wrap items-center gap-4 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <Info className="h-3.5 w-3.5 text-slate-400" />
          <span className="text-[10px] text-slate-500">Risk Level:</span>
        </div>
        {["low", "medium", "high"].map((level) => {
          const risk = getRiskLevel(level);
          return (
            <div key={level} className="flex items-center gap-1.5">
              <span className={`h-3 w-3 rounded-full ${risk.color} border border-white/50`} />
              <span className={`text-[10px] font-medium ${risk.text}`}>
                {risk.label}
              </span>
            </div>
          );
        })}
        {highRiskAreas.length > 0 && (
          <div className="flex items-center gap-1.5 ml-2 border-l border-slate-200 pl-3">
            <span className="text-[10px] text-rose-600 font-medium">
              ⚠️ {highRiskAreas.join(", ")} need attention
            </span>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5 flex-shrink-0">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] text-slate-500">
            Risk score: <span className={`font-semibold ${parseFloat(riskPercentage) > 50 ? 'text-rose-600' : parseFloat(riskPercentage) > 30 ? 'text-amber-600' : 'text-emerald-600'}`}>
              {riskPercentage}%
            </span>
          </span>
        </div>
        <button className="text-[10px] font-medium text-emerald-600 hover:text-emerald-700 transition-colors inline-flex items-center gap-0.5">
          View Details
          <ChevronRight className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}