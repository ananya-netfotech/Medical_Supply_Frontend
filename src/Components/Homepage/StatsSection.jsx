import { BadgeIndianRupee, Building2, Pill, Users } from "lucide-react";

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

function StatCard({ title, value, Icon }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white/95 p-5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(37,99,235,0.12)]">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 transition-all group-hover:from-blue-600/5 group-hover:to-indigo-600/5" />
      <Icon className="relative z-10 mx-auto mb-3 h-7 w-7 sm:h-8 sm:w-8 text-blue-600 opacity-70" />
      <div className="relative z-10 text-xl sm:text-2xl font-black text-slate-900">
        {value}
      </div>
      <div className="relative z-10 mt-1 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-slate-500">
        {title}
      </div>
    </div>
  );
}

export default function StatsSection() {
  return (
    <section className="mx-auto max-w-7xl px-4 pb-12 sm:px-6 sm:pb-20">
      <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
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