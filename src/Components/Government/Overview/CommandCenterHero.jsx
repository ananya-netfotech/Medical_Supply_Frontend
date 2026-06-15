import {
  Bell,
  CalendarDays,
  Download,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  FileText,
  CheckCircle,
  AlertTriangle,
  Wallet,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { beneficiaryStats } from "../../../Pages/Government/pages/governmentDashboardData";

export default function CommandCenterHero() {
  // This would come from your auth context/state
  const userName = "Rajesh Kumar";
  const userRole = "Drug Controller General";
  const currentTime = new Date();
  const hour = currentTime.getHours();
  const greeting = hour < 12 ? "Good Morning" : hour < 18 ? "Good Afternoon" : "Good Evening";

  return (
    <section className="relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm ">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:32px_32px]" />

      <div className="relative z-10">
        {/* Welcome Section */}
        <div className="mb-5 flex items-center justify-between border-b border-blue-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-white shadow-sm">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div className="absolute -bottom-1 -right-1 rounded-full bg-emerald-500 p-0.5">
                <div className="h-2 w-2 rounded-full bg-white" />
              </div>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-sm font-medium text-slate-500">
                  {greeting},
                </h2>
                <h2 className="text-sm font-semibold text-slate-900">
                  {userName}
                </h2>

              </div>
              <p className="text-xs text-slate-400">
                {userRole} • Last login: Today 09:42 AM
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-1 rounded-lg bg-blue-50 px-2.5 py-1 md:flex">
              <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              <span className="text-xs font-medium text-blue-700">System Online</span>
            </div>
            <button className="inline-flex items-center gap-1 text-xs font-medium text-blue-600 hover:text-blue-700">
              View Profile
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="mb-6 flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
          <div>
            <div className="mb-1.5 flex flex-wrap items-center gap-2">
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                Live Monitoring
              </span>
              <span className="rounded-full bg-blue-50 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-blue-700">
                11 Alerts
              </span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Regulatory Command Center
            </h1>

            <p className="mt-1 max-w-3xl text-sm text-slate-500">
              Medicine traceability, licensing, batch recalls, and claims oversight
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative w-full sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
              <input
                placeholder="Search..."
                className="h-9 w-full rounded-xl border border-blue-100 bg-white pl-9 pr-3 text-sm outline-none focus:border-blue-300 focus:ring-2 focus:ring-blue-50"
              />
            </div>

            <button className="inline-flex h-9 items-center gap-1.5 rounded-xl border border-blue-100 bg-white px-3 text-sm font-medium text-slate-600 hover:bg-blue-50">
              <CalendarDays className="h-4 w-4 text-blue-500" />
              This Month
            </button>

            <button className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-white text-slate-600 hover:bg-blue-50">
              <SlidersHorizontal className="h-4 w-4 text-blue-500" />
            </button>

            <button className="relative inline-flex h-9 w-9 items-center justify-center rounded-xl border border-blue-100 bg-white text-slate-600 hover:bg-blue-50">
              <Bell className="h-4 w-4 text-blue-500" />
              <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-blue-500" />
            </button>

            <button className="inline-flex h-9 items-center gap-1.5 rounded-xl bg-blue-600 px-3.5 text-sm font-medium text-white hover:bg-blue-700">
              <Download className="h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        {/* Compact Stats Row - All 5 in one row */}
        <div className="flex gap-3">
          <StatCard
            icon={<Users className="h-3.5 w-3.5" />}
            label="Enrolled"
            value={beneficiaryStats.enrolled}
          />
          <StatCard
            icon={<FileText className="h-3.5 w-3.5" />}
            label="Active"
            value={beneficiaryStats.activeClaims}
          />
          <StatCard
            icon={<CheckCircle className="h-3.5 w-3.5" />}
            label="Approved"
            value={beneficiaryStats.approvedClaims}
          />
          <StatCard
            icon={<AlertTriangle className="h-3.5 w-3.5" />}
            label="Flagged"
            value={beneficiaryStats.flaggedClaims}
            danger
          />
          <StatCard
            icon={<Wallet className="h-3.5 w-3.5" />}
            label="Coverage"
            value={beneficiaryStats.totalCoverage}
            isCurrency
          />
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, value, danger = false, isCurrency = false }) {
  const formattedValue = isCurrency
    ? typeof value === 'number'
      ? `₹${(value / 10000000).toFixed(1)}Cr`
      : value
    : typeof value === 'number'
      ? value.toLocaleString()
      : value;

  return (
    <div className={`flex-1 flex items-center gap-2 rounded-lg border px-2.5 py-1.5 ${danger
        ? 'border-rose-200 bg-rose-50/30'
        : 'border-blue-100 bg-blue-50/30'
      }`}>
      <div className={`rounded-md p-1 ${danger
          ? 'bg-rose-100 text-rose-600'
          : 'bg-white text-blue-600 border border-blue-100'
        }`}>
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <p className={`text-sm font-bold leading-tight ${danger ? 'text-rose-600' : 'text-slate-900'
          }`}>
          {formattedValue}
        </p>
      </div>
    </div>
  );
}