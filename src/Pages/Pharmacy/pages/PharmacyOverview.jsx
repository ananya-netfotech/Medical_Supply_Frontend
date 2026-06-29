import PharmacyOverviewHeader from "../../../Components/Pharmacy/PharmacyOverviewHeader";
import PharmacyOverviewStats from "../../../Components/Pharmacy/PharmacyOverviewStats";
import PharmacyStockMixChart from "../../../Components/Pharmacy/PharmacyStockMixChart";
import PharmacyDispensingTrendChart from "../../../Components/Pharmacy/PharmacyDispensingTrendChart";
import PharmacyPMJAYClaimsChart from "../../../Components/Pharmacy/PharmacyPMJAYClaimsChart";
import PharmacyExpiryRiskChart from "../../../Components/Pharmacy/PharmacyExpiryRiskChart";
import PharmacyRecallHeatmap from "../../../Components/Pharmacy/PharmacyRecallHeatmap";
import PharmacyPriorityAlerts from "../../../Components/Pharmacy/PharmacyPriorityAlerts";
import PharmacyWorkflowStatus from "../../../Components/Pharmacy/PharmacyWorkflowStatus";
import PharmacyRecentActivity from "../../../Components/Pharmacy/PharmacyRecentActivity";

export default function PharmacyOverview() {
  return (
    <div className="min-h-screen space-y-6 bg-gradient-to-b from-slate-50 via-white to-slate-50/80 p-4 md:p-6">
      <div className="mx-auto max-w-7xl space-y-6">
        <PharmacyOverviewHeader />
        <PharmacyOverviewStats />

        {/* Charts Row 1 - Stock Mix & Dispensing Trend */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
            <PharmacyStockMixChart />
          </div>
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
            <PharmacyDispensingTrendChart />
          </div>
        </div>

        {/* Charts Row 2 - PM-JAY Claims & Expiry Risk */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
            <PharmacyPMJAYClaimsChart />
          </div>
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
            <PharmacyExpiryRiskChart />
          </div>
        </div>

        {/* Charts Row 3 - Recall Heatmap & Priority Alerts */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
            <PharmacyRecallHeatmap />
          </div>
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
            <PharmacyPriorityAlerts />
          </div>
        </div>

        {/* Charts Row 4 - Workflow Status & Recent Activity */}
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
            <PharmacyWorkflowStatus />
          </div>
          <div className="rounded-2xl border border-slate-200/60 bg-white/80 p-5 shadow-sm backdrop-blur-sm transition-all hover:shadow-md">
            <PharmacyRecentActivity />
          </div>
        </div>
      </div>
    </div>
  );
}