import { BadgeIndianRupee, Building2, Pill, Users } from "lucide-react";
import StatCard from "./StatCard";

const stats = [
  {
    title: "Registered Drug Types",
    value: "2,486",
    icon: Pill,
  },
  {
    title: "Licensed Manufacturers",
    value: "842",
    icon: Building2,
  },
  {
    title: "PM-JAY Beneficiaries",
    value: "10.2 Cr",
    icon: Users,
  },
  {
    title: "Claims Processed",
    value: "₹5,200 Cr",
    icon: BadgeIndianRupee,
  },
];

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-20">
      <div className="grid gap-6 md:grid-cols-4">
        {stats.map((stat) => (
          <StatCard
            key={stat.title}
            title={stat.title}
            value={stat.value}
            Icon={stat.icon}
          />
        ))}
      </div>
    </section>
  );
}