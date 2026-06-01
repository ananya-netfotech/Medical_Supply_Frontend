import { Eye, Gauge, ShieldCheck, UserCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";
import InfoCard from "./InfoCard";

const outcomes = [
  {
    title: "Improved Traceability",
    description:
      "Provide visibility into medicine movement through authorized stakeholders.",
    icon: Eye,
  },
  {
    title: "Better Compliance",
    description:
      "Support regulatory oversight, licensing checks, recalls and audit readiness.",
    icon: ShieldCheck,
  },
  {
    title: "Operational Efficiency",
    description:
      "Reduce manual tracking and improve access to medicine lifecycle information.",
    icon: Gauge,
  },
  {
    title: "Citizen Awareness",
    description:
      "Enable citizens to view their medicines, claims, benefits and recall alerts.",
    icon: UserCheck,
  },
];

export default function OutcomesSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Expected outcomes"
          title="Practical outcomes without overclaiming"
          description="The platform is designed to strengthen visibility and governance while avoiding unrealistic promises."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((item) => (
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