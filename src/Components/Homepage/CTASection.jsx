import {
  ArrowRight,
  Sparkles,
  ShieldCheck,
  LayoutDashboard,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white px-6 py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-indigo-100/60 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-[1px] shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
          <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-[#07111f] px-6 py-14 text-center text-white sm:px-10 lg:px-16">
            {/* Inner background effects */}
            <div className="pointer-events-none absolute inset-0">
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300/50 to-transparent" />
              <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/15 blur-3xl" />
              <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-500/15 blur-3xl" />
              <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
              <div className="absolute inset-0 bg-[linear-gradient(rgba(147,197,253,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.045)_1px,transparent_1px)] bg-[size:36px_36px]" />
            </div>

            <div className="relative z-10 mx-auto max-w-4xl">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-4 py-2 shadow-sm backdrop-blur-sm">
                <Sparkles className="h-3.5 w-3.5 text-blue-300" />
                <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-100">
                  Start Exploring
                </span>
              </div>

              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                Ready to explore{" "}
                <span className="relative inline-block pb-2 text-blue-100">
                  TraceCare Bharat?
                  <svg
                    className="absolute bottom-0 left-0 w-full"
                    height="6"
                    viewBox="0 0 200 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M0 3C66.6667 1 133.333 1 200 3"
                      stroke="#93C5FD"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                    />
                  </svg>
                </span>
              </h2>

              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-blue-100/80 sm:text-lg">
                Enter the platform to explore role-based dashboards for regulatory
                authority, manufacturer, pharmacy/distributor and citizen workflows.
              </p>

              {/* Feature chips */}
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-4 py-2 text-sm text-blue-100 backdrop-blur-sm">
                  <LayoutDashboard className="h-4 w-4 text-blue-300" />
                  Role-based dashboards
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-4 py-2 text-sm text-blue-100 backdrop-blur-sm">
                  <ShieldCheck className="h-4 w-4 text-blue-300" />
                  Controlled access
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-4 py-2 text-sm text-blue-100 backdrop-blur-sm">
                  <Users className="h-4 w-4 text-blue-300" />
                  Multi-stakeholder workflows
                </div>
              </div>

              {/* Buttons */}
              <div className="mt-9 flex flex-wrap justify-center gap-4">
                <button
                  onClick={() => navigate("/signin")}
                  className="group inline-flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-blue-950 shadow-lg shadow-blue-950/20 transition-all duration-300 hover:-translate-y-0.5 hover:bg-blue-50 hover:shadow-xl"
                >
                  Sign In
                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>

                <button className="group inline-flex items-center gap-2 rounded-2xl border border-blue-200/30 bg-white/5 px-8 py-4 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200/50 hover:bg-white/10">
                  Request Demonstration
                  <ArrowRight
                    size={18}
                    className="opacity-70 transition-transform duration-300 group-hover:translate-x-1"
                  />
                </button>
              </div>

              {/* Bottom indicator */}
              <div className="mt-10 flex justify-center">
                <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/[0.04] px-4 py-2 text-xs font-medium text-blue-100/70 backdrop-blur-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(147,197,253,0.7)]" />
                  Traceability, claims, compliance and citizen visibility in one platform
                  <span className="h-1.5 w-1.5 rounded-full bg-blue-300 shadow-[0_0_14px_rgba(147,197,253,0.7)]" />
                </div>
              </div>
            </div>

            {/* Decorative corners */}
            <div className="pointer-events-none absolute left-5 top-5 h-3 w-3 rounded-full border border-blue-200/40" />
            <div className="pointer-events-none absolute right-5 top-5 h-3 w-3 rounded-full border border-blue-200/40" />
            <div className="pointer-events-none absolute bottom-5 left-5 h-3 w-3 rounded-full border border-blue-200/40" />
            <div className="pointer-events-none absolute bottom-5 right-5 h-3 w-3 rounded-full border border-blue-200/40" />
          </div>
        </div>
      </div>
    </section>
  );
}