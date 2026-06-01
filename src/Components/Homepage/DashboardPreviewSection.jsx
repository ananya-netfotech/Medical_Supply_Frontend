import { Building2, Factory, Landmark, UserRound } from "lucide-react";
import SectionHeader from "./SectionHeader";

const dashboards = [
  {
    title: "Regulatory Authority Dashboard",
    icon: Landmark,
    metrics: ["Registered Drug Types", "Active Licenses", "Medicine Batches", "Compliance Alerts"],
  },
  {
    title: "Manufacturer Dashboard",
    icon: Factory,
    metrics: ["Active Licenses", "Created Batches", "Transferred Inventory", "Recall Notices"],
  },
  {
    title: "Pharmacy / Distributor Dashboard",
    icon: Building2,
    metrics: ["Inventory", "Dispensed Medicines", "Claims Submitted", "Expiry Alerts"],
  },
  {
    title: "Citizen Dashboard",
    icon: UserRound,
    metrics: ["My Medicines", "Claims", "Benefits", "Recall Alerts"],
  },
];

export default function DashboardPreviewSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Dashboards"
          title="Role-specific operational dashboards"
          description="Each stakeholder sees only the information and actions relevant to their role."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {dashboards.map((dashboard) => {
            const Icon = dashboard.icon;

            return (
              <div
                key={dashboard.title}
                className="rounded-[2rem] border border-slate-200 bg-slate-50 p-7"
              >
                <div className="mb-6 flex items-center gap-4">
                  <div className="rounded-2xl bg-blue-950 p-3 text-white">
                    <Icon size={26} />
                  </div>
                  <h3 className="text-xl font-black text-slate-900">
                    {dashboard.title}
                  </h3>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                  {dashboard.metrics.map((metric) => (
                    <div key={metric} className="rounded-2xl bg-white p-4 shadow-sm">
                      <p className="text-sm font-semibold text-slate-500">
                        {metric}
                      </p>
                      <div className="mt-3 h-2 rounded-full bg-slate-100">
                        <div className="h-2 w-2/3 rounded-full bg-blue-900" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}