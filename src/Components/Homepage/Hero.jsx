import { Activity, ArrowRight, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import StakeholderBadges from "./StakeholderBadges";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-slate-100">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 py-24 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-semibold text-blue-900">
            <Activity size={16} />
            India-focused healthcare governance platform
          </div>

          <h1 className="text-5xl font-black leading-tight text-slate-950 md:text-6xl">
            National Pharmaceutical Traceability & Ayushman Bharat Enablement
            Platform
          </h1>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-slate-600">
            A unified digital platform enabling medicine traceability,
            regulatory compliance, beneficiary visibility and healthcare scheme
            governance across India’s pharmaceutical ecosystem.
          </p>

          <StakeholderBadges />

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="flex items-center gap-2 rounded-2xl bg-blue-950 px-8 py-4 font-semibold text-white transition hover:bg-blue-800"
            >
              Enter Platform
              <ArrowRight size={18} />
            </button>

            <button className="rounded-2xl border border-slate-300 bg-white px-8 py-4 font-semibold text-slate-800 transition hover:border-blue-800">
              Request Demonstration
            </button>
          </div>
        </div>

        <div className="rounded-[2rem] border border-slate-200 bg-white p-8 shadow-xl">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-blue-900">
                Platform Control View
              </p>
              <h3 className="text-2xl font-black text-slate-900">
                Medicine Movement Snapshot
              </h3>
            </div>

            <div className="rounded-2xl bg-green-100 p-3 text-green-700">
              <ShieldCheck />
            </div>
          </div>

          {[
            "Drug Type registered by Regulatory Authority",
            "Manufacturer licensed for approved medicine",
            "Medicine batch created with batch and lot number",
            "Inventory transferred to Pharmacy / Distributor",
            "Medicine dispensed to Citizen",
            "PM-JAY claim and audit record monitored",
          ].map((item, index) => (
            <div
              key={item}
              className="mb-4 flex items-start gap-4 rounded-2xl bg-slate-50 p-4 last:mb-0"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-950 text-sm font-bold text-white">
                {index + 1}
              </div>
              <p className="font-medium leading-6 text-slate-700">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}