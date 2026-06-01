import {
  BadgeIndianRupee,
  ClipboardCheck,
  Factory,
  FileCheck2,
  Pill,
  ShieldAlert,
} from "lucide-react";
import SectionHeader from "./SectionHeader";
import InfoCard from "./InfoCard";

const capabilities = [
  {
    title: "Drug Registration",
    description:
      "Create and maintain approved drug types with regulatory metadata.",
    icon: Pill,
  },
  {
    title: "Manufacturer Licensing",
    description:
      "Issue, revoke and prolong manufacturer licenses for specific drug types.",
    icon: FileCheck2,
  },
  {
    title: "Medicine Traceability",
    description:
      "Track medicine batches, lot numbers, ownership transitions and current status.",
    icon: Factory,
  },
  {
    title: "Inventory Monitoring",
    description:
      "View medicine movement across manufacturer and pharmacy/distributor operations.",
    icon: ClipboardCheck,
  },
  {
    title: "PM-JAY Claims",
    description:
      "Enable claim submission, monitoring and reimbursement visibility.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Audit & Compliance",
    description:
      "Record actions, compliance alerts, recall notices and governance reports.",
    icon: ShieldAlert,
  },
];

export default function CapabilitiesSection() {
  return (
    <section className="bg-slate-50 py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Capabilities"
          title="Core platform capabilities for the MVP"
          description="The MVP focuses on practical traceability, licensing, dispensing, claim visibility and controlled access."
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((item) => (
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