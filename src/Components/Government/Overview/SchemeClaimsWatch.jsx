import { BadgeIndianRupee, HeartHandshake, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Clock, FileText, Users, PieChart, ArrowUpRight } from "lucide-react";
import { participantMix, schemeWatch } from "../../../Pages/Government/pages/governmentDashboardData";

export default function SchemeClaimsWatch() {
  const totalParticipants = participantMix.reduce((sum, item) => sum + item.value, 0);
  const totalClaims = schemeWatch.reduce((sum, item) => sum + item.claims, 0);
  const totalPending = schemeWatch.reduce((sum, item) => sum + item.pending, 0);
  const totalFlagged = schemeWatch.reduce((sum, item) => sum + item.flagged, 0);
  const approvalRate = Math.round(((totalClaims - totalPending) / totalClaims) * 100);

  const getStatusColor = (status) => {
    if (status === 'Active') return 'bg-emerald-100 text-emerald-700 border-emerald-200';
    if (status === 'Under Review') return 'bg-amber-100 text-amber-700 border-amber-200';
    return 'bg-blue-100 text-blue-700 border-blue-200';
  };

  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
            <HeartHandshake className="h-5 w-5 text-emerald-700" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-slate-900">Scheme & Claims Watch</h2>
            <p className="text-sm text-slate-500">Public healthcare scheme and reimbursement visibility</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="flex items-center gap-2">
          <div className="rounded-full bg-emerald-50 px-3 py-1.5">
            <span className="text-xs font-semibold text-emerald-700">Approval: {approvalRate}%</span>
          </div>
          <div className="rounded-full bg-rose-50 px-3 py-1.5">
            <span className="text-xs font-semibold text-rose-700">Flagged: {totalFlagged}</span>
          </div>
        </div>
      </div>

      {/* Schemes Grid */}
      <div className="grid gap-4 md:grid-cols-2">
        {schemeWatch.map((scheme, idx) => {
          const statusColor = getStatusColor(scheme.status);
          const claimRate = Math.round((scheme.claims / totalClaims) * 100);
          
          return (
            <div
              key={scheme.scheme}
              className="group relative overflow-hidden rounded-xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-4 transition-all duration-300 hover:shadow-md"
            >
              {/* Decorative gradient bar */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-400 to-emerald-600" />
              
              <div className="relative">
                {/* Header */}
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <h3 className="font-bold text-slate-900">{scheme.scheme}</h3>
                    <div className="mt-1 flex items-center gap-2">
                      <BadgeIndianRupee className="h-3 w-3 text-slate-400" />
                      <p className="text-xs text-slate-500">Coverage: {scheme.coverage}</p>
                    </div>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[9px] font-bold uppercase ${statusColor}`}>
                    {scheme.status === 'Active' && <CheckCircle className="h-2.5 w-2.5" />}
                    {scheme.status === 'Under Review' && <Clock className="h-2.5 w-2.5" />}
                    {scheme.status}
                  </span>
                </div>

                {/* Metrics Row */}
                <div className="grid grid-cols-3 gap-2 mt-4">
                  <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                    <FileText className="h-3.5 w-3.5 text-blue-500 mx-auto mb-1" />
                    <p className="text-lg font-black text-slate-900">{scheme.claims.toLocaleString()}</p>
                    <p className="text-[9px] font-medium text-slate-400">Total Claims</p>
                  </div>
                  <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                    <Clock className="h-3.5 w-3.5 text-amber-500 mx-auto mb-1" />
                    <p className="text-lg font-black text-amber-600">{scheme.pending.toLocaleString()}</p>
                    <p className="text-[9px] font-medium text-slate-400">Pending</p>
                  </div>
                  <div className="rounded-lg bg-white p-2 text-center shadow-sm">
                    <AlertCircle className="h-3.5 w-3.5 text-rose-500 mx-auto mb-1" />
                    <p className="text-lg font-black text-rose-600">{scheme.flagged.toLocaleString()}</p>
                    <p className="text-[9px] font-medium text-slate-400">Flagged</p>
                  </div>
                </div>

                {/* Progress to total */}
                <div className="mt-3">
                  <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
                    <span>Share of total claims</span>
                    <span>{claimRate}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-blue-500"
                      style={{ width: `${claimRate}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Participant Coverage Mix - Redesigned */}
      <div className="mt-5 rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/50 to-white p-5">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <Users className="h-4 w-4 text-blue-700" />
            </div>
            <div>
              <p className="text-sm font-bold text-slate-900">Participant Coverage Mix</p>
              <p className="text-[10px] text-slate-500">Total: {totalParticipants.toLocaleString()} participants</p>
            </div>
          </div>
          <div className="flex items-center gap-1 text-xs text-emerald-600">
            <TrendingUp className="h-3 w-3" />
            <span className="text-[10px] font-semibold">+12% vs last month</span>
          </div>
        </div>

        {/* Donut-style progress bars */}
        <div className="space-y-4">
          {participantMix.map((item, idx) => {
            const percentage = (item.value / totalParticipants) * 100;
            const colors = [
              'from-blue-500 to-blue-600',
              'from-emerald-500 to-emerald-600',
              'from-amber-500 to-amber-600',
              'from-purple-500 to-purple-600',
            ];
            
            return (
              <div key={item.label} className="group cursor-pointer">
                <div className="mb-1 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className={`h-2 w-2 rounded-full bg-gradient-to-r ${colors[idx % colors.length]}`} />
                    <span className="text-xs font-medium text-slate-700">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-slate-900">{item.value.toLocaleString()}</span>
                    <span className="text-[10px] font-medium text-slate-400">({percentage.toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="relative h-2 overflow-hidden rounded-full bg-slate-100">
                  <div
                    className={`h-full rounded-full bg-gradient-to-r ${colors[idx % colors]} transition-all duration-700 group-hover:opacity-80`}
                    style={{ width: `${percentage}%` }}
                  />
                  {/* Shimmer effect on hover */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary insight */}
        <div className="mt-4 flex items-center justify-between rounded-lg bg-white/80 p-3 text-xs">
          <div className="flex items-center gap-2">
            <PieChart className="h-3.5 w-3.5 text-slate-400" />
            <span className="text-slate-600">Coverage distribution across segments</span>
          </div>
          <button className="flex items-center gap-1 text-blue-600 hover:text-blue-700 transition-colors">
            <span className="text-[10px] font-semibold">View Details</span>
            <ArrowUpRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Footer Alert for Flagged Claims */}
      {totalFlagged > 0 && (
        <div className="mt-4 flex items-center gap-2 rounded-lg bg-rose-50 border border-rose-200 p-3">
          <AlertCircle className="h-4 w-4 text-rose-600" />
          <p className="text-xs text-rose-800">
            <span className="font-semibold">{totalFlagged}</span> flagged claims require immediate review across {schemeWatch.filter(s => s.flagged > 0).length} schemes
          </p>
        </div>
      )}
    </section>
  );
}