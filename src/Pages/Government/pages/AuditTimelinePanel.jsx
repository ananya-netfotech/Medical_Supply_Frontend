import { auditTimeline } from "./governmentDashboardData";

export default function AuditTimelinePanel() {
  return (
    <section className="rounded-[1.8rem] border border-white bg-white p-5 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-black text-slate-950">
            Upcoming Audit Calendar
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Scheduled manufacturer, distributor, recall and claim audits.
          </p>
        </div>

        <button className="rounded-full bg-slate-100 px-4 py-2 text-sm font-bold text-slate-600">
          Weekly
        </button>
      </div>

      <div className="space-y-4">
        {auditTimeline.map((item, index) => {
          const Icon = item.icon;

          return (
            <div key={`${item.title}-${item.date}`} className="relative flex gap-4">
              {index < auditTimeline.length - 1 && (
                <div className="absolute left-[21px] top-12 h-[calc(100%-16px)] w-px bg-slate-200" />
              )}

              <div className="z-10 flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                <Icon className="h-5 w-5" />
              </div>

              <div className="flex-1 rounded-3xl border border-slate-100 bg-slate-50 p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-bold text-slate-950">{item.title}</p>
                    <p className="mt-1 text-sm leading-6 text-slate-500">
                      {item.detail}
                    </p>
                  </div>

                  <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-slate-500 shadow-sm">
                    {item.status}
                  </span>
                </div>

                <p className="mt-3 text-sm font-bold text-blue-700">
                  {item.date}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}