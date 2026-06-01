import { BadgeIndianRupee, FileCheck2, HeartPulse, Link2 } from "lucide-react";
import SectionHeader from "./SectionHeader";
import InfoCard from "./InfoCard";

const items = [
  {
    title: "Beneficiary Visibility",
    description:
      "Track citizen medicine history, scheme status and utilization visibility for authenticated beneficiaries.",
    icon: HeartPulse,
  },
  {
    title: "Claims Monitoring",
    description:
      "Monitor submitted, approved, rejected and settled PM-JAY claim records.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Coverage Governance",
    description:
      "Support medicine coverage, benefit usage and reimbursement workflow configuration.",
    icon: FileCheck2,
  },
  {
    title: "Future ABDM Readiness",
    description:
      "Architecture prepared for future ABHA and ABDM integration without claiming live integration.",
    icon: Link2,
  },
];

export default function AyushmanSection() {
  return (
    <section className="bg-blue-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Ayushman Bharat"
          title="Designed for PM-JAY benefit and claim visibility"
          description="The platform supports healthcare scheme governance workflows while remaining ready for future ABDM and ABHA extensions."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-white/10 p-7 backdrop-blur"
            >
              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-white text-blue-950">
                <item.icon size={26} />
              </div>

              <h3 className="text-xl font-black">{item.title}</h3>
              <p className="mt-3 leading-7 text-blue-100">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}