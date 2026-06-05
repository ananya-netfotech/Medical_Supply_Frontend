import { MapPin, AlertTriangle, TrendingUp, TrendingDown, Circle } from "lucide-react";
import { stateRisk } from "../../Pages/Government/pages/governmentDashboardData";

export default function RegionalRiskMatrix() {
  const avgScore = Math.round(stateRisk.reduce((sum, item) => sum + item.score, 0) / stateRisk.length);
  const sortedStates = [...stateRisk].sort((a, b) => a.score - b.score);

  const getRiskConfig = (score) => {
    if (score >= 85) return { color: "#10b981", label: "Low", ring: "stroke-emerald-500" };
    if (score >= 75) return { color: "#3b82f6", label: "Moderate", ring: "stroke-blue-500" };
    if (score >= 68) return { color: "#f59e0b", label: "High", ring: "stroke-amber-500" };
    return { color: "#f43f5e", label: "Severe", ring: "stroke-rose-500" };
  };

  const radius = 35;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
              <MapPin className="h-4 w-4 text-amber-700" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Regional Risk Matrix</h2>
          </div>
          <p className="text-sm text-slate-500">State-wise compliance radial gauge</p>
        </div>
        <div className="rounded-full bg-blue-50 px-3 py-1.5">
          <span className="text-xs font-semibold text-blue-700">National Avg: {avgScore}%</span>
        </div>
      </div>

      {/* Radial Gauge Grid */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {sortedStates.map((item) => {
          const riskConfig = getRiskConfig(item.score);
          const totalIssues = item.critical + item.high + item.medium;
          const strokeDashoffset = circumference - (item.score / 100) * circumference;
          
          return (
            <div
              key={item.state}
              className="group relative rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-3 transition-all duration-300 hover:shadow-md"
            >
              {/* State Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 text-sm font-bold text-white">
                  {item.state.substring(0, 2)}
                </div>
                <div className={`flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                  item.score >= 85 ? 'bg-emerald-100 text-emerald-700' :
                  item.score >= 75 ? 'bg-blue-100 text-blue-700' :
                  item.score >= 68 ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  <Circle className="h-1.5 w-1.5 fill-current" />
                  {riskConfig.label}
                </div>
              </div>

              {/* State Name */}
              <p className="mb-4 text-sm font-bold text-slate-800">{item.state}</p>

              {/* Radial Gauge */}
              <div className="relative flex justify-center mb-4">
                <svg width="90" height="90" viewBox="0 0 100 100" className="transform -rotate-90">
                  {/* Background circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke="#e2e8f0"
                    strokeWidth="8"
                  />
                  {/* Progress circle */}
                  <circle
                    cx="50"
                    cy="50"
                    r={radius}
                    fill="none"
                    stroke={riskConfig.color}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    strokeLinecap="round"
                    className="transition-all duration-1000"
                  />
                </svg>
                {/* Center text */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <p className="text-xl font-black text-slate-900">{item.score}%</p>
                  <p className="text-[8px] font-medium text-slate-400">Compliance</p>
                </div>
              </div>

              {/* Metrics Row */}
              <div className="grid grid-cols-3 gap-1 text-center">
                <div className="rounded-md bg-rose-50 p-1.5">
                  <p className="text-xs font-black text-rose-700">{item.critical}</p>
                  <p className="text-[8px] font-medium text-rose-600">Critical</p>
                </div>
                <div className="rounded-md bg-orange-50 p-1.5">
                  <p className="text-xs font-black text-orange-700">{item.high}</p>
                  <p className="text-[8px] font-medium text-orange-600">High</p>
                </div>
                <div className="rounded-md bg-amber-50 p-1.5">
                  <p className="text-xs font-black text-amber-700">{item.medium}</p>
                  <p className="text-[8px] font-medium text-amber-600">Med</p>
                </div>
              </div>

              {/* Total Issues Badge */}
              {totalIssues > 0 && (
                <div className="absolute -top-2 -right-2 rounded-full bg-rose-500 px-1.5 py-0.5 text-[8px] font-bold text-white shadow-lg">
                  {totalIssues}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Summary Footer */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-3">
        <div className="flex items-center gap-2 text-xs text-slate-600">
          <AlertTriangle className="h-3.5 w-3.5 text-rose-500" />
          <span>{sortedStates.filter(s => s.score < 68).length} states in severe risk zone</span>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="h-3.5 w-3.5 text-emerald-500" />
          <span className="text-xs text-slate-500">
            {sortedStates.filter(s => s.score > avgScore).length} states above national average
          </span>
        </div>
      </div>
    </section>
  );
}