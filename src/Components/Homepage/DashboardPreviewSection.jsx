import { useMemo, useState } from "react";
import {
  Building2,
  Factory,
  Landmark,
  UserRound,
  Sparkles,
  ShieldCheck,
  ArrowRight,
  ImageIcon,
  ChevronLeft,
  ChevronRight,
  Layers3,
} from "lucide-react";

const dashboards = [
  {
    title: "Regulatory Authority Dashboard",
    shortTitle: "Regulatory",
    description:
      "Oversight for drug registration, active licenses, medicine batches and compliance alerts.",
    icon: Landmark,
    image: "/images/dashboard-regulatory-placeholder.png",
    alt: "Regulatory Authority Dashboard Preview",
    accent: {
      gradient: "from-blue-700 to-indigo-700",
      soft: "bg-blue-50",
      text: "text-blue-700",
      border: "border-blue-200",
      glow: "bg-blue-500/20",
    },
    points: ["Drug registry", "License oversight", "Compliance alerts"],
  },
  {
    title: "Manufacturer Dashboard",
    shortTitle: "Manufacturer",
    description:
      "Operational view for active licenses, created batches, transferred inventory and recall notices.",
    icon: Factory,
    image: "/images/dashboard-manufacturer-placeholder.png",
    alt: "Manufacturer Dashboard Preview",
    accent: {
      gradient: "from-emerald-600 to-teal-600",
      soft: "bg-emerald-50",
      text: "text-emerald-700",
      border: "border-emerald-200",
      glow: "bg-emerald-500/20",
    },
    points: ["Batch creation", "Inventory transfer", "Recall notices"],
  },
  {
    title: "Pharmacy / Distributor Dashboard",
    shortTitle: "Pharmacy",
    description:
      "Inventory, medicine dispensing, submitted claims and expiry alerts for pharmacy/distributor operations.",
    icon: Building2,
    image: "/images/dashboard-pharmacy-placeholder.png",
    alt: "Pharmacy / Distributor Dashboard Preview",
    accent: {
      gradient: "from-amber-600 to-orange-600",
      soft: "bg-amber-50",
      text: "text-amber-700",
      border: "border-amber-200",
      glow: "bg-amber-500/20",
    },
    points: ["Inventory", "Dispensing", "PM-JAY claims"],
  },
  {
    title: "Citizen Dashboard",
    shortTitle: "Citizen",
    description:
      "Citizen-facing visibility for medicines, claims, benefits and recall alerts.",
    icon: UserRound,
    image: "/images/dashboard-citizen-placeholder.png",
    alt: "Citizen Dashboard Preview",
    accent: {
      gradient: "from-rose-600 to-pink-600",
      soft: "bg-rose-50",
      text: "text-rose-700",
      border: "border-rose-200",
      glow: "bg-rose-500/20",
    },
    points: ["My medicines", "Claims", "Recall alerts"],
  },
];

export default function DashboardPreviewSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const activeDashboard = dashboards[activeIndex];
  const ActiveIcon = activeDashboard.icon;

  const nextDashboard = () => {
    setActiveIndex((current) => (current + 1) % dashboards.length);
  };

  const previousDashboard = () => {
    setActiveIndex((current) =>
      current === 0 ? dashboards.length - 1 : current - 1
    );
  };

  const progressWidth = useMemo(() => {
    return `${((activeIndex + 1) / dashboards.length) * 100}%`;
  }, [activeIndex]);

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-24">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/35 to-white" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="absolute -top-10 left-1/2 h-px w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-505 to-transparent" />

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

          <p className="relative mx-auto mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base lg:text-lg leading-relaxed text-slate-600">
            Each stakeholder sees only the information and actions relevant to their role.
          </p>

          <div className="mt-6 flex justify-center gap-1">
            <div className="h-1 w-1 rounded-full bg-blue-400" />
            <div className="h-1 w-1 rounded-full bg-blue-600" />
            <div className="h-1 w-1 rounded-full bg-blue-950" />
          </div>
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-14 overflow-hidden rounded-2xl sm:rounded-[2.25rem] border border-blue-100 bg-white p-[1px] shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
          <div className="relative overflow-hidden rounded-[15px] sm:rounded-[calc(2.25rem-1px)] bg-gradient-to-br from-white via-blue-50/40 to-slate-50">
            <div className="pointer-events-none absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl" />
            <div className="pointer-events-none absolute bottom-0 left-0 h-56 w-56 rounded-full bg-indigo-100/70 blur-3xl" />

            <div className="relative z-10 border-b border-blue-100/80 p-3 sm:p-5">
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:grid-cols-4">
                {dashboards.map((dashboard, index) => {
                  const Icon = dashboard.icon;
                  const isActive = activeIndex === index;

                  return (
                    <button
                      key={dashboard.title}
                      type="button"
                      onClick={() => setActiveIndex(index)}
                      className={`group relative overflow-hidden rounded-xl sm:rounded-2xl border p-3 sm:p-4 text-left transition-all duration-300 ${
                        isActive
                          ? `${dashboard.accent.border} ${dashboard.accent.soft} shadow-[0_14px_36px_rgba(15,23,42,0.10)]`
                          : "border-slate-200 bg-white/80 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
                      }`}
                    >
                      <div
                        className={`absolute inset-x-0 top-0 h-1 origin-left bg-gradient-to-r ${dashboard.accent.gradient} transition-transform duration-300 ${
                          isActive
                            ? "scale-x-100"
                            : "scale-x-0 group-hover:scale-x-100"
                        }`}
                      />

                      <div className="flex items-center gap-2 sm:gap-3">
                        <div
                          className={`flex h-9 w-9 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl transition-all duration-300 ${
                            isActive
                              ? `bg-gradient-to-br ${dashboard.accent.gradient} text-white shadow-lg`
                              : "bg-slate-100 text-slate-600 group-hover:bg-blue-50 group-hover:text-blue-700"
                          }`}
                        >
                          <Icon className="h-4.5 w-4.5 sm:h-5 sm:w-5" />
                        </div>

                        <div className="min-w-0">
                          <p
                            className={`text-[9px] sm:text-xs font-semibold uppercase tracking-[0.16em] ${
                              isActive
                                ? dashboard.accent.text
                                : "text-slate-400"
                            }`}
                          >
                            View {index + 1}
                          </p>
                          <h3 className="mt-0.5 sm:mt-1 truncate text-xs sm:text-sm font-bold text-slate-900">
                            {dashboard.shortTitle}
                          </h3>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="relative z-10 grid gap-0 lg:grid-cols-[0.36fr_0.64fr]">
              <div className="border-b border-blue-100/80 p-5 sm:p-8 lg:border-b-0 lg:border-r">
                <div
                  key={`info-${activeDashboard.title}`}
                  className="animate-dashboardFade"
                >
                  <div className="mb-6 flex items-center justify-between">
                    <div
                      className={`inline-flex items-center gap-2 rounded-full border ${activeDashboard.accent.border} ${activeDashboard.accent.soft} px-3.5 py-1.5 sm:px-4 sm:py-2`}
                    >
                      <Layers3 className={`h-4 w-4 ${activeDashboard.accent.text}`} />
                      <span
                        className={`text-[10px] sm:text-xs font-semibold uppercase tracking-[0.18em] ${activeDashboard.accent.text}`}
                      >
                        Active Preview
                      </span>
                    </div>

                    <span className="rounded-full border border-blue-100 bg-white px-2.5 py-1.5 text-[10px] sm:text-xs font-semibold text-slate-500 shadow-sm">
                      {String(activeIndex + 1).padStart(2, "0")} /{" "}
                      {String(dashboards.length).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative mb-6 inline-flex">
                    <div
                      className={`absolute inset-0 rounded-[1.5rem] ${activeDashboard.accent.glow} blur-xl`}
                    />
                    <div
                      className={`relative flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-[1.25rem] sm:rounded-[1.5rem] bg-gradient-to-br ${activeDashboard.accent.gradient} text-white shadow-lg`}
                    >
                      <ActiveIcon className="h-7 w-7 sm:h-8 sm:w-8" />
                    </div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-blue-950">
                    {activeDashboard.title}
                  </h3>

                  <p className="mt-3 sm:mt-4 text-sm sm:text-base leading-relaxed sm:leading-8 text-slate-600">
                    {activeDashboard.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {activeDashboard.points.map((point) => (
                      <span
                        key={point}
                        className="rounded-full border border-white bg-white/80 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[10px] sm:text-xs font-semibold text-slate-600 shadow-sm"
                      >
                        {point}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 sm:mt-8 h-1.5 overflow-hidden rounded-full bg-slate-200">
                    <div
                      className={`h-full rounded-full bg-gradient-to-r ${activeDashboard.accent.gradient} transition-all duration-500`}
                      style={{ width: progressWidth }}
                    />
                  </div>

                  <div className="mt-6 sm:mt-8 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={previousDashboard}
                      className="flex h-10 w-10 sm:h-11 sm:w-11 items-center justify-center rounded-xl sm:rounded-2xl border border-blue-100 bg-white text-blue-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-blue-50"
                      aria-label="Previous dashboard"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>

                    <button
                      type="button"
                      onClick={nextDashboard}
                      className={`group inline-flex flex-1 items-center justify-center gap-2 rounded-xl sm:rounded-2xl bg-gradient-to-r ${activeDashboard.accent.gradient} px-4 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold text-white shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl`}
                    >
                      Next dashboard
                      <ChevronRight className="h-5 w-5 transition group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="relative p-3 sm:p-6 lg:p-8">
                <div
                  key={`image-${activeDashboard.title}`}
                  className="animate-dashboardSlide"
                >
                  <DashboardImagePreview dashboard={activeDashboard} />
                </div>
              </div>
            </div>

            <div className="relative z-10 border-t border-blue-100/80 px-4 py-3 sm:px-6 sm:py-4">
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1.5 sm:gap-x-3 sm:gap-y-2 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                <span>Role selected</span>
                <span className="text-blue-400">→</span>
                <span>Dashboard preview loaded</span>
                <span className="text-blue-400">→</span>
                <span>Access scope controlled</span>
              </div>
            </div>
          </div>
        </div>

        <div className="relative mt-8 sm:mt-12">
          <div className="absolute left-1/2 top-0 h-px w-32 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 pt-4 sm:pt-6">
            <div className="inline-flex items-center gap-2 sm:gap-3 rounded-full border border-blue-100 bg-gradient-to-r from-blue-50 to-white px-3.5 py-2 sm:px-5 sm:py-2.5 shadow-sm">
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-700" />
              <span className="text-[10px] sm:text-xs font-medium text-slate-600">
                Stakeholder-specific visibility and action control
              </span>
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-700" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-3 py-1.5 sm:px-4 sm:py-2 shadow-sm">
              <span className="text-[10px] sm:text-xs font-semibold text-blue-950">4</span>
              <span className="text-[10px] sm:text-xs text-slate-600">dashboard previews</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes dashboardFade {
          from {
            opacity: 0;
            transform: translateY(12px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes dashboardSlide {
          from {
            opacity: 0;
            transform: translateX(28px) scale(0.98);
          }

          to {
            opacity: 1;
            transform: translateX(0) scale(1);
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

        .animate-dashboardFade {
          animation: dashboardFade 0.35s ease-out both;
        }

        .animate-dashboardSlide {
          animation: dashboardSlide 0.4s ease-out both;
        }

        .animate-pulse {
          animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `}</style>
    </section>
  );
}

function DashboardImagePreview({ dashboard }) {
  return (
    <div className="relative overflow-hidden rounded-xl sm:rounded-[1.75rem] border border-slate-200 bg-white p-2 sm:p-3 shadow-[0_18px_50px_rgba(15,23,42,0.10)]">
      <div className={`pointer-events-none absolute right-0 top-0 h-32 w-32 rounded-full ${dashboard.accent.glow} blur-2xl`} />
      <div className="pointer-events-none absolute bottom-0 left-0 h-28 w-28 rounded-full bg-indigo-100/70 blur-2xl" />

      <div className="relative z-10 mb-2 sm:mb-3 flex items-center justify-between rounded-lg sm:rounded-2xl border border-slate-100 bg-slate-50 px-2.5 py-1.5 sm:px-3 sm:py-2">
        <div className="flex items-center gap-1.5">
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-red-300" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-amber-300" />
          <span className="h-2 w-2 sm:h-2.5 sm:w-2.5 rounded-full bg-green-300" />
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-white px-2 py-0.5 sm:px-3 sm:py-1 text-[9px] sm:text-[10px] font-semibold text-slate-400 shadow-sm">
          <ImageIcon className="h-3 w-3" />
          dashboard image
        </div>
      </div>

      <div className="relative z-10 overflow-hidden rounded-lg sm:rounded-[1.35rem] border border-slate-100 bg-slate-100">
        <img
          src={dashboard.image}
          alt={dashboard.alt}
          className="h-[220px] xs:h-[300px] sm:h-[380px] lg:h-[430px] w-full object-cover transition duration-500 group-hover:scale-[1.02]"
          loading="lazy"
        />

        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/10 via-transparent to-white/5" />

        <div
          className={`absolute bottom-3 left-3 sm:bottom-4 sm:left-4 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-xs font-semibold ${dashboard.accent.text} shadow-sm backdrop-blur-sm`}
        >
          Temporary dashboard screenshot
        </div>

        <div className="absolute right-3 top-3 sm:right-4 sm:top-4 rounded-full border border-white/70 bg-white/90 px-2.5 py-1 sm:px-3 sm:py-1.5 text-[9px] sm:text-xs font-semibold text-slate-600 shadow-sm backdrop-blur-sm">
          Replaceable PNG
        </div>
      </div>
    </div>
  );
}