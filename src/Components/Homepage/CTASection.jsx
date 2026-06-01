import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function CTASection() {
  const navigate = useNavigate();

  return (
    <section className="bg-slate-50 px-6 py-24">
      <div className="mx-auto max-w-5xl rounded-[2rem] bg-blue-950 p-10 text-center text-white shadow-xl">
        <h2 className="text-4xl font-black">
          Ready to explore TraceCare Bharat?
        </h2>

        <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-blue-100">
          Enter the platform to explore role-based dashboards for regulatory
          authority, manufacturer, pharmacy/distributor and citizen workflows.
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <button
            onClick={() => navigate("/signin")}
            className="flex items-center gap-2 rounded-2xl bg-white px-8 py-4 font-semibold text-blue-950 transition hover:bg-blue-50"
          >
            Sign In
            <ArrowRight size={18} />
          </button>

          <button className="rounded-2xl border border-white/30 px-8 py-4 font-semibold text-white transition hover:bg-white/10">
            Request Demonstration
          </button>
        </div>
      </div>
    </section>
  );
}