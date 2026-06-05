import { traceabilityTrend } from "../../Pages/Government/pages/governmentDashboardData";
import { TrendingUp, TrendingDown, AlertCircle, Shield, CheckCircle, Activity } from "lucide-react";

export default function TraceabilityChart() {
  const totalUnits = traceabilityTrend.reduce((sum, item) => sum + item.units, 0);
  const avgUnits = totalUnits / traceabilityTrend.length;
  const latestMonth = traceabilityTrend[traceabilityTrend.length - 1];
  const previousMonth = traceabilityTrend[traceabilityTrend.length - 2];
  const trend = previousMonth ? ((latestMonth.units - previousMonth.units) / previousMonth.units * 100).toFixed(1) : 0;

  // Find min and max for better visualization
  const maxUnits = Math.max(...traceabilityTrend.map((item) => item.units));
  const minUnits = Math.min(...traceabilityTrend.map((item) => item.units));
  const dataPoints = traceabilityTrend.map((item, idx) => ({
    x: (idx / (traceabilityTrend.length - 1)) * 100,
    y: ((item.units - minUnits) / (maxUnits - minUnits)) * 200 + 30,
    value: item.units,
    month: item.month,
    recalls: item.recalls
  }));

  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      {/* Header Section */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <Shield className="h-4 w-4 text-blue-700" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Traceability & Claims Momentum
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Verified medicine units tracked across the supply chain with recall monitoring
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
            Monthly Trend
          </span>
          <div className={`flex items-center gap-1 rounded-full px-3 py-1.5 text-xs font-semibold ${trend >= 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
            {trend >= 0 ? (
              <TrendingUp className="h-3 w-3" />
            ) : (
              <TrendingDown className="h-3 w-3" />
            )}
            <span>{Math.abs(trend)}% vs last month</span>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-[0.35fr_0.65fr]">
        {/* Left Panel - Key Metrics */}
        <div className="space-y-4">
          {/* Traceability Score */}
          <div className="relative overflow-hidden rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50 to-white p-5">
            <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-blue-200/30 blur-2xl" />
            <div className="relative">
              <div className="mb-3 flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Traceability Score
                </p>
                <CheckCircle className="h-5 w-5 text-emerald-500" />
              </div>
              <p className="text-5xl font-black text-slate-900">96%</p>
              <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full w-[96%] rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
              </div>
              <p className="mt-3 text-xs leading-5 text-slate-600">
                Medicine units with complete ownership and transfer history
              </p>
            </div>
          </div>

          {/* Summary Stats */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl border border-blue-100 bg-white p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Total Tracked
              </p>
              <p className="text-xl font-black text-slate-900">
                {(totalUnits / 1000).toFixed(0)}K
              </p>
              <p className="text-[10px] text-slate-500">medicine units</p>
            </div>
            <div className="rounded-xl border border-blue-100 bg-white p-3">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">
                Monthly Avg
              </p>
              <p className="text-xl font-black text-slate-900">
                {(avgUnits / 1000).toFixed(1)}K
              </p>
              <p className="text-[10px] text-slate-500">units per month</p>
            </div>
          </div>

          {/* Alert Banner */}
          <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
            <div className="flex items-start gap-2">
              <AlertCircle className="h-4 w-4 text-amber-600 mt-0.5" />
              <div>
                <p className="text-xs font-semibold text-amber-800">Total Recalls (YTD)</p>
                <p className="text-2xl font-bold text-amber-900">
                  {traceabilityTrend.reduce((sum, item) => sum + item.recalls, 0)}
                </p>
                <p className="text-[10px] text-amber-700">across all monitored batches</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Panel - Line Chart */}
        <div className="rounded-xl border border-blue-100 bg-white p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Verified Units Trend
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-2xl font-black text-slate-900">
                  {(latestMonth.units / 1000).toFixed(1)}K
                </span>
                <span className="text-xs text-slate-500">in {latestMonth.month}</span>
              </div>
            </div>
            <div className="flex items-center gap-3 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="h-3 w-3 rounded-full bg-blue-500" />
                <span className="text-slate-600">Verified Units</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="h-2 w-2 rounded-full bg-rose-500" />
                <span className="text-slate-600">Recall Events</span>
              </div>
            </div>
          </div>

          {/* SVG Line Chart */}
          <div className="relative">
            <svg viewBox="0 0 500 280" className="h-64 w-full">
              {/* More visible grid lines */}
              <g stroke="#cbd5e1" strokeWidth="1" strokeDasharray="6,4">
                <line x1="40" y1="40" x2="480" y2="40" />
                <line x1="40" y1="100" x2="480" y2="100" />
                <line x1="40" y1="160" x2="480" y2="160" />
                <line x1="40" y1="220" x2="480" y2="220" />
              </g>

              {/* Vertical grid lines */}
              <g stroke="#e2e8f0" strokeWidth="0.5" strokeDasharray="4,4">
                {dataPoints.map((point, idx) => (
                  <line
                    key={idx}
                    x1={40 + point.x * 4.4}
                    y1="30"
                    x2={40 + point.x * 4.4}
                    y2="260"
                  />
                ))}
              </g>

              {/* Area under the line */}
              <path
                d={`M 40 ${280 - dataPoints[0].y} 
                    ${dataPoints.map(point => `L ${40 + point.x * 4.4} ${280 - point.y}`).join(' ')}
                    L 480 280 L 40 280 Z`}
                fill="url(#gradient)"
                opacity="0.15"
              />

              {/* Gradient definition */}
              <defs>
                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Main Line */}
              <path
                d={`M 40 ${280 - dataPoints[0].y} 
                    ${dataPoints.map(point => `L ${40 + point.x * 4.4} ${280 - point.y}`).join(' ')}`}
                fill="none"
                stroke="#3b82f6"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {/* Data points - hover interactions */}
              {dataPoints.map((point, idx) => (
                <g key={idx}>
                  {/* Invisible larger hit area for easier hovering */}
                  <circle
                    cx={40 + point.x * 4.4}
                    cy={280 - point.y}
                    r="12"
                    fill="transparent"
                    className="cursor-pointer"
                  />
                  
                  {/* Visible circle */}
                  <circle
                    cx={40 + point.x * 4.4}
                    cy={280 - point.y}
                    r="4"
                    fill="white"
                    stroke="#3b82f6"
                    strokeWidth="2"
                    className="cursor-pointer transition-all duration-300"
                  />
                  
                  {/* Hover tooltip - Value */}
                  <g className="opacity-0 transition-opacity duration-200 hover:opacity-100" pointerEvents="none">
                    {/* Tooltip background */}
                    <rect
                      x={40 + point.x * 4.4 - 25}
                      y={280 - point.y - 35}
                      width="50"
                      height="22"
                      rx="4"
                      fill="#1e293b"
                    />
                    {/* Tooltip text */}
                    <text
                      x={40 + point.x * 4.4}
                      y={280 - point.y - 20}
                      textAnchor="middle"
                      className="text-[9px] font-bold fill-white"
                    >
                      {(point.value / 1000).toFixed(1)}K units
                    </text>
                    {/* Tooltip arrow */}
                    <polygon
                      points={`${40 + point.x * 4.4 - 4},${280 - point.y - 13} ${40 + point.x * 4.4 + 4},${280 - point.y - 13} ${40 + point.x * 4.4},${280 - point.y - 9}`}
                      fill="#1e293b"
                    />
                  </g>

                  {/* Recall indicators with hover */}
                  {point.recalls > 0 && (
                    <g>
                      {/* Recall pulse ring */}
                      <circle
                        cx={40 + point.x * 4.4}
                        cy={280 - point.y - 8}
                        r="10"
                        fill="#f43f5e"
                        fillOpacity="0.1"
                        className="animate-pulse"
                      />
                      {/* Recall dot */}
                      <circle
                        cx={40 + point.x * 4.4}
                        cy={280 - point.y - 8}
                        r="3"
                        fill="#f43f5e"
                      />
                      
                      {/* Hover tooltip for recalls */}
                      <g className="opacity-0 transition-opacity duration-200 hover:opacity-100" pointerEvents="none">
                        <rect
                          x={40 + point.x * 4.4 - 30}
                          y={280 - point.y - 45}
                          width="60"
                          height="22"
                          rx="4"
                          fill="#9f1239"
                        />
                        <text
                          x={40 + point.x * 4.4}
                          y={280 - point.y - 30}
                          textAnchor="middle"
                          className="text-[9px] font-bold fill-white"
                        >
                          ⚠️ {point.recalls} recall{point.recalls !== 1 ? 's' : ''}
                        </text>
                        <polygon
                          points={`${40 + point.x * 4.4 - 4},${280 - point.y - 23} ${40 + point.x * 4.4 + 4},${280 - point.y - 23} ${40 + point.x * 4.4},${280 - point.y - 19}`}
                          fill="#9f1239"
                        />
                      </g>
                    </g>
                  )}
                  
                  {/* Month label - always visible */}
                  <text
                    x={40 + point.x * 4.4}
                    y={265}
                    textAnchor="middle"
                    className="text-[10px] font-medium fill-slate-500"
                  >
                    {point.month}
                  </text>
                </g>
              ))}
            </svg>

            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 flex h-64 flex-col justify-between text-[10px] font-medium text-slate-500">
              <span>{Math.round(maxUnits / 1000)}K</span>
              <span>{Math.round((maxUnits * 0.75) / 1000)}K</span>
              <span>{Math.round((maxUnits * 0.5) / 1000)}K</span>
              <span>{Math.round((maxUnits * 0.25) / 1000)}K</span>
              <span>0</span>
            </div>

            {/* X-axis label */}
            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium text-slate-500">
              Month
            </div>
          </div>

          {/* Insights from the trend */}
          <div className="mt-8 rounded-lg bg-blue-50/50 p-3">
            <div className="flex items-center gap-2">
              <Activity className="h-4 w-4 text-blue-600" />
              <p className="text-xs text-slate-600">
                <span className="font-semibold text-slate-900">Insight:</span>{" "}
                {trend >= 0 
                  ? `Verified units increased by ${trend}% compared to last month, indicating improved traceability adoption.`
                  : `Verified units decreased by ${Math.abs(trend)}% this month. Review required for compliance.`}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Key Insights */}
      <div className="mt-6 grid grid-cols-1 gap-3 border-t border-blue-100 pt-5 sm:grid-cols-3">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <TrendingUp className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Growth Rate
            </p>
            <p className="text-sm font-bold text-slate-900">
              +{trend}% month over month
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <Shield className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Compliance Rate
            </p>
            <p className="text-sm font-bold text-slate-900">94.2% across all units</p>
          </div>
        </div>
        
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <AlertCircle className="h-4 w-4 text-amber-700" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-wider text-slate-400">
              Recall Response
            </p>
            <p className="text-sm font-bold text-slate-900">2.4 days avg resolution</p>
          </div>
        </div>
      </div>
    </section>
  );
}