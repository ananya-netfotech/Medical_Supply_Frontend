import { Hospital, Pill, ShieldCheck } from "lucide-react";
import FeatureCard from "./FeatureCard";

const features = [
  {
    title: "Regulatory Governance",
    description:
      "CDSCO licensing, compliance monitoring, recalls and audit management.",
    icon: ShieldCheck,
  },
  {
    title: "Medicine Traceability",
    description:
      "Track medicine ownership and movement across the healthcare ecosystem.",
    icon: Pill,
  },
  {
    title: "Ayushman Bharat Integration",
    description:
      "Beneficiary management, PM-JAY claims and reimbursement analytics.",
    icon: Hospital,
  },
];

export default function FeaturesSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <h2 className="mb-16 text-center text-4xl font-black">
          Platform Capabilities
        </h2>

        <div className="grid gap-8 md:grid-cols-3">
          {features.map((feature) => (
            <FeatureCard
              key={feature.title}
              title={feature.title}
              description={feature.description}
              Icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
}