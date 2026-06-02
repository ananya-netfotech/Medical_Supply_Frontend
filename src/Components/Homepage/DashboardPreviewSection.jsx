import {
  Building2,
  Factory,
  Landmark,
  UserRound,
  Sparkles,
  ShieldCheck,
  Activity,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

const dashboards = [
  {
    title: "Regulatory Authority Dashboard",
    icon: Landmark,
    metrics: [
      "Registered Drug Types",
      "Active Licenses",
      "Medicine Batches",
      "Compliance Alerts",
    ],
  },
  {
    title: "Manufacturer Dashboard",
    icon: Factory,
    metrics: [
      "Active Licenses",
      "Created Batches",
      "Transferred Inventory",
      "Recall Notices",
    ],
  },
  {
    title: "Pharmacy / Distributor Dashboard",
    icon: Building2,
    metrics: [
      "Inventory",
      "Dispensed Medicines",
      "Claims Submitted",
      "Expiry Alerts",
    ],
  },
  {
    title: "Citizen Dashboard",
    icon: UserRound,
    metrics: ["My Medicines", "Claims", "Benefits", "Recall Alerts"],
  },
];

export default function DashboardPreviewSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/35 to-white" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="absolute -top-10 left-1/2 h-px w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-700" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-900">
              Dashboards
            </span>
          </div>

          <h2 className="relative mt-6 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
            Role-specific operational{" "}
            <span className="relative inline-block pb-2">
              dashboards
              <svg
                className="absolute bottom-0 left-0 w-full"
                height="6"
                viewBox="0 0 200 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3C66.6667 1 133.333 1 200 3"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </span>
          </h2>

          <p className="relative mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600 lg:text-lg">
            Each stakeholder sees only the information and actions relevant to their role.
          </p>

          <div className="mt-6 flex justify-center gap-1">
            <div className="h-1 w-1 rounded-full bg-blue-400" />
            <div className="h-1 w-1 rounded-full bg-blue-600" />
            <div className="h-1 w-1 rounded-full bg-blue-950" />
          </div>
        </div>

        {/* Dashboard cards */}
        <div className="mt-14 grid gap-7 md:grid-cols-2">
          {dashboards.map((dashboard, index) => {
            const Icon = dashboard.icon;

            return (
              <div
                key={dashboard.title}
                className="group relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-[1px] shadow-[0_18px_50px_rgba(15,23,42,0.08)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_28px_80px_rgba(37,99,235,0.14)]"
                style={{
                  animationDelay: `${index * 120}ms`,
                  animation: "fadeInUp 0.6s ease-out forwards",
                  opacity: 0,
                }}
              >
                {/* Card background */}
                <div className="relative h-full rounded-[calc(2rem-1px)] bg-gradient-to-br from-white via-blue-50/40 to-slate-50 p-7">
                  <div className="pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full bg-blue-200/30 blur-3xl" />
                  <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 rounded-full bg-indigo-100/60 blur-3xl" />

                  {/* Top accent */}
                  <div className="absolute left-7 right-7 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />

                  <div className="relative z-10">
                    <div className="mb-7 flex items-start justify-between gap-4">
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="absolute inset-0 rounded-2xl bg-blue-500/25 blur-xl transition-opacity group-hover:opacity-100" />
                          <div className="relative flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-700/20 transition-all duration-300 group-hover:scale-110">
                            <Icon size={26} />
                          </div>
                        </div>

                        <div>
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-700">
                            Dashboard {index + 1}
                          </p>
                          <h3 className="mt-2 text-xl font-black leading-tight text-slate-900">
                            {dashboard.title}
                          </h3>
                        </div>
                      </div>

                      <div className="hidden rounded-full border border-blue-100 bg-white/80 px-3 py-1.5 text-xs font-semibold text-blue-700 shadow-sm sm:inline-flex">
                        Role-based
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {dashboard.metrics.map((metric, metricIndex) => (
                        <div
                          key={metric}
                          className="group/metric relative overflow-hidden rounded-2xl border border-blue-100 bg-white p-4 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
                        >
                          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/0 to-blue-100/0 transition-all duration-300 group-hover/metric:from-blue-50/80 group-hover/metric:to-transparent" />

                          <div className="relative z-10">
                            <div className="mb-3 flex items-center justify-between">
                              <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-blue-50 text-blue-700">
                                <Activity className="h-4 w-4" />
                              </div>

                              <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                            </div>

                            <p className="text-sm font-semibold leading-5 text-slate-700">
                              {metric}
                            </p>

                            <div className="mt-4 h-2 rounded-full bg-slate-100">
                              <div
                                className="h-2 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600"
                                style={{
                                  width: `${64 + metricIndex * 8}%`,
                                }}
                              />
                            </div>

                            <div className="mt-2 flex items-center justify-between text-[11px] text-slate-400">
                              <span>Visibility</span>
                              <span>{64 + metricIndex * 8}%</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 flex items-center justify-between rounded-2xl border border-blue-100 bg-white/70 px-4 py-3 shadow-sm backdrop-blur-sm">
                      <div className="flex items-center gap-2">
                        <ShieldCheck className="h-4 w-4 text-blue-700" />
                        <span className="text-sm font-medium text-slate-600">
                          Controlled role-based access
                        </span>
                      </div>

                      <ArrowRight className="h-4 w-4 text-blue-700 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom indicator */}
        <div className="relative mt-12">
          <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <div className="flex flex-wrap items-center justify-center gap-3 pt-6">
            <div className="inline-flex items-center gap-3 rounded-full border border-blue-100 bg-gradient-to-r from-blue-50 to-white px-5 py-2.5 shadow-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-700" />
              <span className="text-xs font-medium text-slate-600">
                Stakeholder-specific visibility and action control
              </span>
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-700" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
              <span className="text-xs font-semibold text-blue-950">4</span>
              <span className="text-xs text-slate-600">dashboard views</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }

          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}