import { Building2, Factory, Landmark, UserRound } from "lucide-react";
import SectionHeader from "./SectionHeader";

const stakeholders = [
  {
    title: "Regulatory Authority",
    icon: Landmark,
    points: ["Drug Registration", "Licensing", "Compliance", "Audit Monitoring"],
  },
  {
    title: "Manufacturer",
    icon: Factory,
    points: ["Medicine Creation", "Inventory", "Batch Tracking", "Stock Transfer"],
  },
  {
    title: "Pharmacy / Distributor",
    icon: Building2,
    points: ["Inventory Receipt", "Dispensing", "Claim Submission", "Traceability"],
  },
  {
    title: "Citizen",
    icon: UserRound,
    points: ["My Medicines", "Benefits", "Claims Tracking", "Recall Alerts"],
  },
];

export default function StakeholderSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Stakeholders"
          title="Built for the Indian healthcare ecosystem"
          description="Each role gets a focused dashboard with relevant actions, data visibility and access restrictions."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stakeholders.map((stakeholder) => {
            const Icon = stakeholder.icon;

            return (
              <div
                key={stakeholder.title}
                className="rounded-3xl border border-slate-200 bg-white p-7 shadow-sm"
              >
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-950 text-white">
                  <Icon size={26} />
                </div>

                <h3 className="text-xl font-black text-slate-900">
                  {stakeholder.title}
                </h3>

                <ul className="mt-5 space-y-3">
                  {stakeholder.points.map((point) => (
                    <li key={point} className="flex items-center gap-3 text-slate-600">
                      <span className="h-2 w-2 rounded-full bg-green-600" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}