import { complianceControls } from "../../../Pages/Government/pages/governmentDashboardData";
import { Shield, AlertTriangle, CheckCircle, Building2, FileCheck, Users, Activity } from "lucide-react";

export default function ComplianceControlTower() {
  const avgScore = Math.round(complianceControls.reduce((sum, item) => sum + item.score, 0) / complianceControls.length);
  
  const getTowerSegments = (score) => {
    // Return number of lit segments (out of 5)
    return Math.ceil(score / 20);
  };

  const getSegmentColor = (segmentIndex, totalSegments, score) => {
    if (segmentIndex < totalSegments) {
      if (score >= 85) return "bg-emerald-500";
      if (score >= 75) return "bg-blue-500";
      if (score >= 65) return "bg-amber-500";
      return "bg-rose-500";
    }
    return "bg-slate-200";
  };

  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      {/* Header */}
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
              <Shield className="h-4 w-4 text-indigo-700" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">Compliance Control Tower</h2>
          </div>
          <p className="text-sm text-slate-500">Real-time compliance readiness dashboard</p>
        </div>
        <div className="rounded-full bg-blue-50 px-3 py-1.5">
          <span className="text-xs font-semibold text-blue-700">Tower Average: {avgScore}%</span>
        </div>
      </div>

      {/* Stacked Tower Visual */}
      <div className="overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none']">
        <div className="grid grid-cols-5 gap-6 md:gap-8 w-full min-w-[700px]">
          {complianceControls.map((item, colIdx) => {
            const Icon = item.icon;
            const litSegments = getTowerSegments(item.score);
            const totalSegments = 5;
            
            return (
              <div key={item.label} className="relative flex flex-col items-center group w-full">
                {/* Tower Stack */}
                <div className="flex flex-col-reverse gap-1 mb-3 w-full max-w-[80px]">
                  {[...Array(totalSegments)].map((_, idx) => {
                    const isLit = idx < litSegments;
                    return (
                      <div
                        key={idx}
                        className={`w-full h-10 transition-all duration-700 ${
                          getSegmentColor(idx, litSegments, item.score)
                        } ${idx === 0 ? 'rounded-b-lg' : 'rounded-sm'} ${idx === totalSegments - 1 ? 'rounded-t-lg' : ''} group-hover:scale-105 ${isLit ? 'animate-pulse' : 'opacity-30'}`}
                        style={{ animationDelay: `${colIdx * 150 + idx * 100}ms`, animationDuration: '3s' }}
                      />
                    );
                  })}
                </div>

                {/* Score Badge */}
                <div className={`mt-2 rounded-full px-3 py-1 text-center w-full max-w-[80px] ${
                  item.score >= 85 ? 'bg-emerald-100 text-emerald-700' :
                  item.score >= 75 ? 'bg-blue-100 text-blue-700' :
                  item.score >= 65 ? 'bg-amber-100 text-amber-700' :
                  'bg-rose-100 text-rose-700'
                }`}>
                  <p className="text-xs font-black">{item.score}%</p>
                </div>

                {/* Icon and Label */}
                <div className="mt-3 text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-blue-700 mx-auto transition-transform group-hover:-translate-y-1">
                    <Icon className="h-5 w-5" />
                  </div>
                  <p className="mt-2 text-xs font-bold text-slate-700 leading-tight">{item.label}</p>
                  <p className="text-[10px] text-slate-500 mt-0.5">{item.openCases} open cases</p>
                </div>

                {/* Hover Tooltip */}
                <div className="absolute -top-24 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20 w-32">
                  <div className="rounded-xl bg-slate-800 px-4 py-3 text-center shadow-2xl">
                    <p className="text-sm font-bold text-white leading-tight mb-1">{item.label}</p>
                    <div className="text-[10px] font-medium text-emerald-300 mb-0.5">
                      Score: {item.score}%
                    </div>
                    <div className="text-[10px] font-medium text-rose-300">
                      {item.openCases} Cases
                    </div>
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 -bottom-1.5 w-3 h-3 rotate-45 bg-slate-800" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Tower Base Platform */}
      <div className="mt-6 h-2 rounded-full bg-gradient-to-r from-slate-400 via-slate-500 to-slate-400" />
      
      {/* Legend */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
        <div className="flex items-center gap-1">
          <div className="h-2 w-4 rounded-full bg-emerald-500" />
          <span className="text-[10px] text-slate-600">85-100%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-4 rounded-full bg-blue-500" />
          <span className="text-[10px] text-slate-600">75-84%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-4 rounded-full bg-amber-500" />
          <span className="text-[10px] text-slate-600">65-74%</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-4 rounded-full bg-rose-500" />
          <span className="text-[10px] text-slate-600">&lt;65%</span>
        </div>
        <div className="flex items-center gap-1 ml-4">
          <div className="h-2 w-4 rounded-full bg-slate-200" />
          <span className="text-[10px] text-slate-600">Unmet</span>
        </div>
      </div>
    </section>
  );
}