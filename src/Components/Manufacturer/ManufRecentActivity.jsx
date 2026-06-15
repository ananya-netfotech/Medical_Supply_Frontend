import { CheckCircle2 } from "lucide-react";

const activities = [
  {
    title: "Batch created",
    text: "SUN-PARA-0426 added to production registry.",
    time: "Today · 10:20 AM",
  },
  {
    title: "Transfer submitted",
    text: "10,000 units sent to Apollo Pharmacy, Pune.",
    time: "Today · 11:05 AM",
  },
  {
    title: "Complaint linked",
    text: "Complaint CMP-CIT-2026-004 linked to SUN-AMOX-1125.",
    time: "Yesterday · 04:30 PM",
  },
  {
    title: "Compliance response uploaded",
    text: "QA report submitted for regulatory review.",
    time: "2 days ago",
  },
];

export default function ManufRecentActivity() {
  return (
    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
      <h2 className="text-lg font-bold text-slate-950">Recent Activity</h2>
      <p className="mt-1 text-sm text-slate-500">
        Latest manufacturer-side operational events.
      </p>

      <div className="mt-5 space-y-4">
        {activities.map((item, index) => (
          <div key={item.title} className="relative flex gap-3">
            <div className="flex flex-col items-center">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700">
                <CheckCircle2 className="h-4 w-4" />
              </div>
              {index !== activities.length - 1 && (
                <div className="h-full w-px bg-emerald-100" />
              )}
            </div>

            <div className="pb-4">
              <p className="text-sm font-bold text-slate-950">{item.title}</p>
              <p className="mt-1 text-sm leading-6 text-slate-600">
                {item.text}
              </p>
              <p className="mt-1 text-xs font-medium text-slate-400">
                {item.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}