import { Factory, CheckCircle2, ArrowRight } from "lucide-react";
import { Input } from "./Input";

export default function ManufacturerSignin({ handleLogin, activeAccent }) {
  return (
    <>
      <div className={`mt-6 animate-roleChange rounded-3xl border ${activeAccent.border} ${activeAccent.bg} p-4 sm:p-5`}>
        <div className="flex items-start gap-4">
          <div className={`rounded-2xl bg-gradient-to-br ${activeAccent.gradient} p-3 text-white shadow-lg`}>
            <Factory className="h-6 w-6" />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-3">
              <h4 className="text-lg font-semibold text-blue-950">Manufacturer access</h4>
              <CheckCircle2 className={`h-5 w-5 shrink-0 ${activeAccent.text}`} />
            </div>

            <p className="mt-2 text-sm leading-6 text-slate-600">
              Create medicine batches, manage licensed drug production, transfer inventory and maintain downstream traceability.
            </p>

            <div className="mt-4 flex flex-wrap gap-2">
              {["Batch Creation", "Inventory Transfer", "Recall Notices"].map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-4 animate-roleChange">
        <Input label="Email / Mobile Number" placeholder="Enter login ID" type="text" accent={activeAccent} />
        <Input label="Password" placeholder="Enter password" type="password" accent={activeAccent} />
        <Input label="Manufacturer License ID" placeholder="LIC-MFG-CDSCO-2026-001" type="text" accent={activeAccent} />
      </div>

      <button
        onClick={handleLogin}
        className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${activeAccent.gradient} py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
      >
        Continue as Manufacturer
        <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
      </button>
    </>
  );
}
