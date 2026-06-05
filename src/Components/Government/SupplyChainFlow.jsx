import {
  CheckCircle,
  Clock,
  AlertCircle,
  ArrowRight,
  ClipboardList,
  Factory,
  Shield,
  Truck,
  Hospital,
  UserCircle,
  TrendingUp,
  AlertTriangle,
  Activity,
} from "lucide-react";
import { supplyChainStages } from "../../Pages/Government/pages/governmentDashboardData";

// Unique icons for each stage
const getUniqueIcon = (label) => {
  const iconMap = {
    "Drug Registered": Factory,
    "Licensed Manufacturing": Shield,
    "Units Created": ClipboardList,
    "Distributor / Pharmacy": Truck,
    "Claims / Benefits": UserCircle,
  };
  return iconMap[label] || ClipboardList;
};

export default function SupplyChainFlow() {
  return (
    <section className="overflow-hidden rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      <div className="mb-6 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
        <div>
          <h2 className="text-xl font-bold tracking-tight text-slate-900">
            National Medicine Lifecycle Flow
          </h2>
          <p className="mt-1 max-w-3xl text-sm text-slate-500">
            End-to-end regulatory flow from drug registration and manufacturer
            licensing to medicine unit tracking, distribution and claim settlement.
          </p>
        </div>

       
      </div>

      {/* Desktop Diagram View */}
      <div className="hidden lg:block">
        <div className="relative py-8">
          {/* Main connecting line - REMOVED the blue line under icons */}
          
          <div className="relative flex justify-between gap-2">
            {supplyChainStages.map((stage, index) => {
              const UniqueIcon = getUniqueIcon(stage.label);
              const isLast = index === supplyChainStages.length - 1;
              const progress = getProgressWidth(stage.label, index);

              return (
                <div key={stage.label} className="relative flex-1 text-center">
                  {/* Arrow between stages */}
                  {!isLast && (
                    <div className="absolute -right-4 top-[50px] z-20 -translate-y-1/2">
                      <ArrowRight className="h-4 w-4 text-blue-300" />
                    </div>
                  )}
                  
                  {/* Content */}
                  <div className="relative z-20">
                    {/* Icon */}
                    <div className="mb-3 flex justify-center">
                      <div className="relative">
                        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-blue-50 to-white border border-blue-200 shadow-sm">
                          <UniqueIcon className="h-6 w-6 text-blue-700" />
                        </div>
                        <div className="absolute -right-1 -top-1">
                          <StatusIcon status={stage.status} />
                        </div>
                      </div>
                    </div>

                    {/* Stage Number */}
                    <div className="mb-2">
                      <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-700">
                        STAGE {index + 1}
                      </span>
                    </div>

                    {/* Label */}
                    <div className="mb-2 px-1">
                      <p className="text-xs font-bold text-slate-800 leading-tight">
                        {stage.label}
                      </p>
                    </div>

                    {/* Value */}
                    <div className="mb-2">
                      <p className="text-xl font-black text-slate-900">
                        {Number(stage.value).toLocaleString()}
                      </p>
                    </div>

                    {/* Status */}
                    <div className="mb-3">
                      <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${getStatusColor(stage.status)}`}>
                        {stage.status}
                      </span>
                    </div>

                    {/* Progress Bar */}
                    <div className="px-2">
                      <div className="flex justify-between text-[8px] text-slate-400 mb-0.5">
                        <span>Progress</span>
                        <span>{progress}%</span>
                      </div>
                      <div className="h-1 overflow-hidden rounded-full bg-slate-100">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-700"
                          style={{ width: `${progress}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tablet View - 3 columns */}
      <div className="hidden md:block lg:hidden">
        <div className="relative">
          <div className="grid grid-cols-3 gap-4">
            {supplyChainStages.slice(0, 3).map((stage, index) => (
              <TabletStageCard key={stage.label} stage={stage} index={index} />
            ))}
          </div>
          <div className="mt-4 grid grid-cols-2 gap-4">
            {supplyChainStages.slice(3).map((stage, index) => (
              <TabletStageCard key={stage.label} stage={stage} index={index + 3} />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile View - Vertical timeline */}
      <div className="block md:hidden">
        {supplyChainStages.map((stage, index) => (
          <MobileStageCard
            key={stage.label}
            stage={stage}
            index={index}
            isLast={index === supplyChainStages.length - 1}
          />
        ))}
      </div>

      <LifecycleFooter />
    </section>
  );
}

// Tablet Stage Card Component
function TabletStageCard({ stage, index }) {
  const UniqueIcon = getUniqueIcon(stage.label);
  const progress = getProgressWidth(stage.label, index);

  return (
    <div className="rounded-xl border border-blue-100 bg-gradient-to-br from-white to-slate-50 p-3 shadow-sm">
      <div className="mb-3 flex items-start justify-between">
        <div className="relative">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 border border-blue-200">
            <UniqueIcon className="h-5 w-5 text-blue-700" />
          </div>
          <div className="absolute -right-1 -top-1">
            <StatusIcon status={stage.status} />
          </div>
        </div>
        <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[9px] font-bold text-blue-700">
          {index + 1}
        </span>
      </div>

      <h3 className="text-sm font-bold text-slate-900">{stage.label}</h3>
      <p className="text-2xl font-black text-slate-900 mt-1">
        {Number(stage.value).toLocaleString()}
      </p>
      
      <div className="mt-2">
        <div className="flex justify-between text-[9px] text-slate-400 mb-0.5">
          <span>Progress</span>
          <span>{progress}%</span>
        </div>
        <div className="h-1 overflow-hidden rounded-full bg-slate-100">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-700"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

// Mobile Stage Card Component
function MobileStageCard({ stage, index, isLast }) {
  const UniqueIcon = getUniqueIcon(stage.label);
  const progress = getProgressWidth(stage.label, index);

  return (
    <div className="relative pl-6 pb-6">
      {/* Vertical connecting line */}
      {!isLast && (
        <div className="absolute left-[19px] top-[28px] h-full w-px bg-blue-200" />
      )}
      
      {/* Timeline dot */}
      <div className="absolute left-[15px] top-[18px] z-10 h-2 w-2 rounded-full bg-blue-600 ring-4 ring-white" />
      
      <div className="rounded-xl border border-blue-100 bg-white p-4 shadow-sm ml-4">
        <div className="flex items-start justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 border border-blue-200">
                <UniqueIcon className="h-5 w-5 text-blue-700" />
              </div>
              <div className="absolute -right-1 -top-1">
                <StatusIcon status={stage.status} />
              </div>
            </div>
            <div>
              <span className="text-xs font-bold text-slate-400">Stage {index + 1}</span>
              <h3 className="text-sm font-bold text-slate-900">{stage.label}</h3>
            </div>
          </div>
          <span className={`inline-flex rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${getStatusColor(stage.status)}`}>
            {stage.status}
          </span>
        </div>

        <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-100">
          <p className="text-2xl font-black text-slate-900">
            {Number(stage.value).toLocaleString()}
          </p>
          <div className="flex-1 max-w-[150px] ml-3">
            <div className="flex justify-between text-[8px] text-slate-400 mb-0.5">
              <span>Progress</span>
              <span>{progress}%</span>
            </div>
            <div className="h-1 overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-700"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LifecycleFooter() {
  return (
    <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
      {/* Avg. Cycle Time */}
      <div className="flex items-center gap-3 rounded-xl border border-blue-100 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <Clock className="h-5 w-5 text-blue-700" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Avg. Cycle Time</p>
          <p className="text-lg font-bold text-slate-900">14.5 days</p>
        </div>
      </div>

      {/* Completion Rate */}
      <div className="flex items-center gap-3 rounded-xl border border-emerald-100 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-100">
          <TrendingUp className="h-5 w-5 text-emerald-700" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Completion Rate</p>
          <p className="text-lg font-bold text-slate-900">94.2%</p>
        </div>
      </div>

      {/* Bottlenecks */}
      <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-white p-4 shadow-sm">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-100">
          <AlertTriangle className="h-5 w-5 text-amber-700" />
        </div>
        <div>
          <p className="text-xs font-medium text-slate-500">Bottlenecks</p>
          <p className="text-lg font-bold text-slate-900">3 stages</p>
        </div>
      </div>
    </div>
  );
}

function StatusIcon({ status }) {
  const normalized = status?.toLowerCase();

  if (normalized?.includes("healthy") || normalized?.includes("active")) {
    return <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />;
  }
  if (normalized?.includes("live") || normalized?.includes("progress")) {
    return <Clock className="h-3.5 w-3.5 text-blue-500" />;
  }
  return <AlertCircle className="h-3.5 w-3.5 text-amber-500" />;
}

function getStatusColor(status) {
  const normalized = status?.toLowerCase();

  if (normalized?.includes("healthy") || normalized?.includes("active")) {
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  }
  if (normalized?.includes("live") || normalized?.includes("progress")) {
    return "border-blue-200 bg-blue-50 text-blue-700";
  }
  return "border-amber-200 bg-amber-50 text-amber-700";
}

function getProgressWidth(label, index) {
  const progressByLabel = {
    "Drug Registered": 100,
    "Licensed Manufacturing": 84,
    "Units Created": 96,
    "Distributor / Pharmacy": 78,
    "Claims / Benefits": 68,
  };
  return progressByLabel[label] || Math.max(60, 100 - index * 8);
}