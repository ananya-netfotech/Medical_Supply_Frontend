import { useState, useEffect } from "react";
import {
  TrendingUp,
  TrendingDown,
  ChevronRight,
  RefreshCw,
  Download,
  Calendar,
  Filter,
  Bell,
} from "lucide-react";
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
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
    }, 300000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setLastUpdated(new Date());
    setTimeout(() => setIsRefreshing(false), 1000);
  };

  const formatDate = (date) => {
    return date.toLocaleString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      month: 'short',
      day: 'numeric',
      hour12: true
    });
  };

  return (
    <div className="space-y-6 bg-slate-50 p-6">
      {/* Enhanced Header */}
      <div className="relative overflow-hidden rounded-lg bg-gradient-to-br from-emerald-600 to-teal-700 p-6 shadow-lg">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-emerald-400/20 rounded-full blur-2xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-white/5 rounded-full blur-2xl" />

        <div className="relative flex flex-col justify-between gap-4 lg:flex-row lg:items-center">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur-sm px-3 py-1 text-xs font-semibold text-white">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-green-400" />
                </span>
                LIVE
              </span>
              <span className="text-xs text-emerald-100/80">
                Last updated: {formatDate(lastUpdated)}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-white lg:text-3xl">
              Dashboard Overview
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-emerald-100/90 leading-relaxed">
              Visual overview of licenses, medicine batches, inventory, stock transfers, 
              recall alerts, citizen complaints and compliance health.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all border border-white/20 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-white/10 backdrop-blur-sm px-3 py-2 text-sm font-medium text-white hover:bg-white/20 transition-all border border-white/20">
              <Download className="h-4 w-4" />
              Export
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg bg-white text-emerald-700 px-3 py-2 text-sm font-medium hover:bg-emerald-50 transition-all shadow-lg">
              <Calendar className="h-4 w-4" />
              Date Range
            </button>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-xs text-emerald-100/80">Total Licenses</p>
            <p className="text-xl font-bold text-white mt-1">12</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-200">
              <TrendingUp className="h-3 w-3" />
              +2 this month
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-xs text-emerald-100/80">Active Batches</p>
            <p className="text-xl font-bold text-white mt-1">216</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-200">
              <TrendingUp className="h-3 w-3" />
              +12% vs last month
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-xs text-emerald-100/80">Compliance Score</p>
            <p className="text-xl font-bold text-white mt-1">94%</p>
            <span className="inline-flex items-center gap-1 text-xs text-emerald-200">
              <TrendingUp className="h-3 w-3" />
              +2% improvement
            </span>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
            <p className="text-xs text-emerald-100/80">Open Alerts</p>
            <p className="text-xl font-bold text-white mt-1">7</p>
            <span className="inline-flex items-center gap-1 text-xs text-amber-200">
              <TrendingDown className="h-3 w-3" />
              3 critical
            </span>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <ManufOverviewStats />

      {/* Chart Section 1 - Equal height using flex */}
      <div className="grid gap-6 lg:grid-cols-2 items-stretch">
        <div className="flex flex-col">
          <ManufProductionTrend />
        </div>
        <div className="flex flex-col">
          <ManufInventoryStatusChart />
        </div>
      </div>

      {/* Chart Section 2 */}
      <div className="grid gap-6 lg:grid-cols-[1fr_1fr] items-stretch">
        <div className="flex flex-col">
          <ManufTransferPerformanceChart />
        </div>
        <div className="flex flex-col">
          <ManufLicenseExpiryChart />
        </div>
      </div>

      {/* Chart Section 3 */}
<div className="grid gap-6 lg:grid-cols-2 items-stretch">
  <div className="flex flex-col">
    <ManufComplianceHeatmap />
  </div>

  <div className="flex flex-col">
    <ManufAlertsPanel />
  </div>
</div>

      {/* Bottom Section */}
<div className="grid gap-6 lg:grid-cols-2 items-stretch">
  <div className="flex flex-col">
    <ManufBatchTable />
  </div>

  <div className="flex flex-col">
    <ManufRecentActivity />
  </div>
</div>

      {/* Footer */}
      <div className="rounded-lg bg-white p-4 shadow-sm border border-slate-200">
        <div className="flex flex-col items-center justify-between gap-3 sm:flex-row">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600">
              <Bell className="h-4 w-4" />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-900">All systems operational</p>
              <p className="text-xs text-slate-500">Last checked: {formatDate(lastUpdated)}</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
              View Audit Log
            </button>
            <button className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
              System Status
            </button>
            <button className="text-xs text-slate-500 hover:text-slate-700 transition-colors">
              Help
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}