import { AlertTriangle, ShieldAlert } from "lucide-react";

const alerts = [
  {
    title: "Recall watch active",
    message: "Batch SUN-INS-0926 is blocked due to cold-chain deviation.",
    level: "High",
  },
  {
    title: "License renewal due",
    message: "LIC-MFG-SDCA-2026-014 expires in 45 days.",
    level: "Medium",
  },
  {
    title: "Complaint escalated",
    message: "Suspected counterfeit complaint requires manufacturer response.",
    level: "High",
  },
  {
    title: "QA report pending",
    message: "Additional quality document requested for SUN-AMOX-1125.",
    level: "Medium",
  },
];

export default function ManufAlertsPanel() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="rounded-2xl bg-rose-50 p-3 text-rose-700">
          <ShieldAlert className="h-5 w-5" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-slate-950">
            Priority Alerts
          </h2>
          <p className="text-sm text-slate-500">
            Items needing immediate manufacturer attention.
          </p>
        </div>
      </div>

      <div className="mt-5 space-y-3">
        {alerts.map((alert) => (
          <div
            key={alert.title}
            className="rounded-2xl border border-slate-100 bg-slate-50 p-4"
          >
            <div className="flex gap-3">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-amber-600" />
              <div>
                <p className="font-bold text-slate-950">{alert.title}</p>
                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {alert.message}
                </p>
                <span className="mt-3 inline-flex rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-xs font-bold text-amber-700">
                  {alert.level}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}