import { ClipboardCheck, HeartPulse, ShieldCheck, Truck } from "lucide-react";
import SectionHeader from "./SectionHeader";
import InfoCard from "./InfoCard";

const reasons = [
  {
    title: "Regulatory Compliance",
    description:
      "Support monitoring of licensed manufacturers, medicine movement, batch status and recall actions.",
    icon: ShieldCheck,
  },
  {
    title: "Citizen Trust",
    description:
      "Provide authenticated citizens with visibility into medicines received through authorized channels.",
    icon: HeartPulse,
  },
  {
    title: "Healthcare Governance",
    description:
      "Enable PM-JAY claim visibility, beneficiary monitoring and healthcare scheme oversight.",
    icon: ClipboardCheck,
  },
  {
    title: "Supply Chain Transparency",
    description:
      "Track medicines from manufacturer to dispensing point using batch, lot and ownership records.",
    icon: Truck,
  },
];

export default function WhyPlatformSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Why this platform"
          title="Why India needs end-to-end medicine traceability"
          description="The platform is designed to improve operational visibility across pharmaceutical supply, healthcare benefit usage and compliance workflows."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reasons.map((item) => (
            <InfoCard
              key={item.title}
              Icon={item.icon}
              title={item.title}
              description={item.description}
            />
          ))}
        </div>
      </div>
    </section>
  );
}