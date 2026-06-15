import ManufOverviewStats from "../../../Components/Manufacturer/ManufOverviewStats";
import ManufProductionTrend from "../../../Components/Manufacturer/ManufProductionTrend";
import ManufInventoryStatusChart from "../../../Components/Manufacturer/ManufInventoryStatusChart";
import ManufComplianceHeatmap from "../../../Components/Manufacturer/ManufComplianceHeatmap";
import ManufLicenseExpiryChart from "../../../Components/Manufacturer/ManufLicenseExpiryChart";
import ManufTransferPerformanceChart from "../../../Components/Manufacturer/ManufTransferPerformanceChart";
import ManufAlertsPanel from "../../../Components/Manufacturer/ManufAlertsPanel";
import ManufRecentActivity from "../../../Components/Manufacturer/ManufRecentActivity";
import ManufBatchTable from "../../../Components/Manufacturer/ManufBatchTable";

export default function ManufacturerOverview() {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-emerald-100 bg-white p-6 shadow-sm">
        <p className="text-sm font-bold uppercase tracking-[0.18em] text-emerald-700">
          Manufacturer Operations
        </p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950 lg:text-3xl">
          Dashboard Overview
        </h1>
        <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-500">
          Visual overview of licenses, medicine batches, inventory, stock
          transfers, recall alerts, citizen complaints and compliance health.
        </p>
      </section>

      <ManufOverviewStats />

      <section className="grid gap-6 xl:grid-cols-[1.3fr_0.9fr]">
        <ManufProductionTrend />
        <ManufInventoryStatusChart />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <ManufTransferPerformanceChart />
        <ManufLicenseExpiryChart />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr]">
        <ManufComplianceHeatmap />
        <ManufAlertsPanel />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.25fr_0.9fr]">
        <ManufBatchTable />
        <ManufRecentActivity />
      </section>
    </div>
  );
}