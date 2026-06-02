import React from "react";
import {
  ArrowRight,
  Workflow,
  ClipboardCheck,
  Pill,
  BadgeIndianRupee,
  UserCheck,
  Sparkles,
  ShieldCheck,
  Activity,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-white py-20">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white" />
        <div className="absolute -left-32 top-20 h-96 w-96 rounded-full bg-blue-100/80 blur-3xl" />
        <div className="absolute -right-32 bottom-20 h-96 w-96 rounded-full bg-indigo-100/70 blur-3xl" />
        <div className="absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.03)_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid items-center gap-14 lg:grid-cols-2">
          {/* Left content */}
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-4 w-4 text-blue-700" />
              CDSCO + Ayushman Bharat Ready Platform
            </div>

            <h1 className="max-w-3xl text-2xl font-black tracking-tight text-blue-950 sm:text-3xl lg:text-4xl">
              National Pharmaceutical Traceability, Compliance & PM-JAY
              Enablement Platform
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-600">
              A unified digital platform designed to support medicine
              traceability, regulatory compliance, Ayushman Bharat beneficiary
              visibility, claim monitoring, and pharmaceutical supply chain
              governance across India.
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <button
                onClick={() => navigate("/signin")}
                className="group inline-flex items-center justify-center rounded-2xl bg-gradient-to-r bg-blue-950 px-6 py-3.5 text-sm font-semibold text-white shadow-lg shadow-blue-700/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-blue-700/25"
              >
                Enter Platform
                <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <button className="inline-flex items-center justify-center rounded-2xl border border-blue-100 bg-white px-6 py-3.5 text-sm font-semibold text-blue-950 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-blue-50 hover:shadow-md">
                Request Demonstration
              </button>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-sm">
                <ShieldCheck className="h-4 w-4 text-blue-700" />
                Compliance-ready workflows
              </div>

              <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm text-slate-600 shadow-sm backdrop-blur-sm">
                <Activity className="h-4 w-4 text-blue-700" />
                Lifecycle visibility
              </div>
            </div>
          </div>

          {/* Right preview */}
          <div className="relative">
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-200/40 via-transparent to-indigo-200/40 blur-2xl" />

            <div className="relative rounded-[2rem] border border-blue-100 bg-white p-6 shadow-[0_30px_90px_rgba(15,23,42,0.12)]">
              <div className="relative overflow-hidden rounded-[1.5rem] bg-[#07111f] p-6 text-white">
                <div className="pointer-events-none absolute inset-0">
                  <div className="absolute -left-20 -top-20 h-56 w-56 rounded-full bg-blue-500/15 blur-3xl" />
                  <div className="absolute -right-20 -bottom-20 h-56 w-56 rounded-full bg-indigo-500/15 blur-3xl" />
                  <div className="absolute inset-0 bg-[linear-gradient(rgba(147,197,253,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.045)_1px,transparent_1px)] bg-[size:32px_32px]" />
                </div>

                <div className="relative z-10">
                  <div className="mb-6 flex items-center justify-between gap-4">
                    <div>
                      <div className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-200/80">
                        Healthcare Governance Platform
                      </div>
                      <div className="mt-2 text-2xl font-black text-white">
                        Medicine Lifecycle Monitoring
                      </div>
                    </div>

                    <div className="rounded-2xl border border-blue-300/20 bg-white/10 p-3 text-blue-100 backdrop-blur-sm">
                      <Workflow className="h-6 w-6" />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <CapabilityCard
                      icon={<ClipboardCheck className="mb-3 h-5 w-5 text-blue-200" />}
                      title="Regulatory Compliance"
                      description="Drug registration, licensing, compliance monitoring and audit oversight."
                    />

                    <CapabilityCard
                      icon={<Pill className="mb-3 h-5 w-5 text-blue-200" />}
                      title="Medicine Traceability"
                      description="Track medicine batches, ownership movement and lifecycle visibility."
                    />

                    <CapabilityCard
                      icon={<BadgeIndianRupee className="mb-3 h-5 w-5 text-blue-200" />}
                      title="PM-JAY Governance"
                      description="Beneficiary visibility, claim monitoring and reimbursement oversight."
                    />

                    <CapabilityCard
                      icon={<UserCheck className="mb-3 h-5 w-5 text-blue-200" />}
                      title="Citizen Services"
                      description="Medicine history, benefit visibility, claims tracking and recall notifications."
                    />
                  </div>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-5">
                {[
                  "Register",
                  "Manufacture",
                  "Distribute",
                  "Dispense",
                  "Monitor",
                ].map((item, index) => (
                  <div
                    key={item}
                    className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-blue-50 px-3 py-4 text-center text-sm font-semibold text-blue-900 shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-200 hover:bg-white hover:shadow-md"
                  >
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-blue-300 to-transparent" />
                    <div className="mb-2 text-xs font-black text-blue-600/40">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="pointer-events-none absolute -right-3 -top-3 h-6 w-6 rounded-full border border-blue-300/50" />
            <div className="pointer-events-none absolute -bottom-3 -left-3 h-6 w-6 rounded-full border border-blue-300/50" />
          </div>
        </div>
      </div>
    </section>
  );
}

function CapabilityCard({ icon, title, description }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-blue-300/15 bg-white/[0.06] p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-blue-300/30 hover:bg-white/[0.1]">
      <div className="pointer-events-none absolute right-0 top-0 h-16 w-16 rounded-full bg-blue-400/10 blur-2xl" />
      <div className="relative z-10">
        {icon}
        <div className="font-semibold text-white">{title}</div>
        <p className="mt-2 text-sm leading-6 text-blue-100/75">
          {description}
        </p>
      </div>
    </div>
  );
}