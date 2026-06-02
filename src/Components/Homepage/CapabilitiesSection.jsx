import {
  BadgeIndianRupee,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Pill,
  ShieldAlert,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const capabilities = [
  {
    title: "Drug Registration",
    description:
      "Create and maintain approved drug types with regulatory metadata.",
    icon: Pill,
  },
  {
    title: "Manufacturer Licensing",
    description:
      "Issue, revoke and prolong manufacturer licenses for specific drug types.",
    icon: FileCheck2,
  },
  {
    title: "Medicine Traceability",
    description:
      "Track medicine batches, lot numbers, ownership transitions and current status.",
    icon: Factory,
  },
  {
    title: "Inventory Monitoring",
    description:
      "View medicine movement across manufacturer and pharmacy/distributor operations.",
    icon: ClipboardCheck,
  },
  {
    title: "PM-JAY Claims",
    description:
      "Enable claim submission, monitoring and reimbursement visibility.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Audit & Compliance",
    description:
      "Record actions, compliance alerts, recall notices and governance reports.",
    icon: ShieldAlert,
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="relative overflow-hidden bg-slate-50 py-24">
      {/* Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50 via-white to-blue-50/50" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.035)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        {/* Header */}
        <div className="relative mx-auto max-w-3xl text-center">
          <div className="absolute -top-10 left-1/2 h-px w-20 -translate-x-1/2 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-700" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-900">
              Capabilities
            </span>
          </div>

          <h2 className="relative mt-6 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
            Core platform capabilities{" "}
            <span className="relative inline-block pb-2">
              for the MVP
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
            The MVP focuses on practical traceability, licensing, dispensing, claim visibility and controlled access.
          </p>

          <div className="mt-6 flex justify-center gap-1">
            <div className="h-1 w-1 rounded-full bg-blue-400" />
            <div className="h-1 w-1 rounded-full bg-blue-600" />
            <div className="h-1 w-1 rounded-full bg-blue-950" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className="group relative overflow-hidden rounded-2xl border-2 border-blue-100 bg-white p-6 opacity-0 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-xl"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animation: "fadeInUp 0.5s ease-out forwards",
                }}
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-blue-100/30 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

                {/* Top accent line */}
                <div className="absolute left-0 right-0 top-0 h-1 origin-left scale-x-0 bg-gradient-to-r from-blue-700 via-blue-500 to-indigo-600 transition-transform duration-500 group-hover:scale-x-100" />

                <div className="relative">
                  {/* Icon */}
                  <div className="relative mb-5 inline-block">
                    <div className="absolute inset-0 rounded-xl bg-blue-500/20 blur-lg transition-opacity group-hover:opacity-100" />

                    <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-700 to-indigo-700 shadow-md transition-all duration-300 group-hover:scale-110 group-hover:shadow-xl">
                      <Icon className="h-5 w-5 text-white" />
                    </div>

                    <div className="absolute -inset-1 rounded-xl border border-blue-300/40 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  </div>

                  <h3 className="text-lg font-semibold leading-tight text-slate-900">
                    {item.title}
                  </h3>

                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>

                  
                </div>

                {/* Decorative dots */}
                <div className="absolute bottom-4 right-4 flex gap-1 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <div className="h-1 w-1 rounded-full bg-blue-400" />
                  <div className="h-1 w-1 rounded-full bg-blue-600" />
                  <div className="h-1 w-1 rounded-full bg-blue-950" />
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
                MVP-ready healthcare traceability modules
              </span>
              <div className="h-2 w-2 animate-pulse rounded-full bg-blue-700" />
            </div>

            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white px-4 py-2 shadow-sm">
              <span className="text-xs font-semibold text-blue-950">6</span>
              <span className="text-xs text-slate-600">core capabilities</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
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