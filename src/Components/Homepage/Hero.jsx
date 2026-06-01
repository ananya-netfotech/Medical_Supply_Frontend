import { Activity, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import EcosystemFlowCard from "./EcosystemFlowCard";

export default function HeroSection() {
  const navigate = useNavigate();

  return (
    <section className="mx-auto max-w-7xl px-6 py-24">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900">
            <Activity size={16} />
            CDSCO + Ayushman Bharat Ready
          </div>

          <h1 className="text-5xl font-black leading-tight text-slate-900 md:text-6xl">
            India's Smart Pharmaceutical Traceability Platform
          </h1>

          <p className="mt-6 text-xl leading-relaxed text-slate-600">
            Track medicines from manufacturers to pharmacies, hospitals and
            citizens while enabling Ayushman Bharat claim management,
            regulatory compliance and healthcare transparency.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <button
              onClick={() => navigate("/signin")}
              className="flex items-center gap-2 rounded-2xl bg-blue-900 px-8 py-4 font-semibold text-white transition hover:bg-blue-800"
            >
              Get Started
              <ArrowRight size={18} />
            </button>

            <button className="rounded-2xl border bg-white px-8 py-4 font-semibold">
              Learn More
            </button>
          </div>
        </div>

        <EcosystemFlowCard />
      </div>
    </section>
  );
}