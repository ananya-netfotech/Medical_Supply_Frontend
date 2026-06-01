import { Database, MonitorCog, Network, Search, Server, ShieldCheck } from "lucide-react";
import SectionHeader from "./SectionHeader";

const layers = [
  { title: "Frontend", detail: "React + Next.js", icon: MonitorCog },
  { title: "Backend APIs", detail: "Node.js services", icon: Server },
  { title: "Database", detail: "PostgreSQL", icon: Database },
  { title: "Event Backbone", detail: "Apache Kafka", icon: Network },
  { title: "Search", detail: "OpenSearch", icon: Search },
  { title: "Governance", detail: "Audit-ready controls", icon: ShieldCheck },
];

export default function ArchitectureSection() {
  return (
    <section className="bg-slate-950 py-24 text-white">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Architecture"
          title="Secure, scalable and event-driven architecture"
          description="The platform is designed with standard enterprise technologies for controlled access, traceability, analytics and operational monitoring."
        />

        <div className="grid gap-5 md:grid-cols-3 lg:grid-cols-6">
          {layers.map((layer) => {
            const Icon = layer.icon;

            return (
              <div key={layer.title} className="rounded-3xl border border-white/10 bg-white/10 p-5">
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-white text-slate-950">
                  <Icon size={22} />
                </div>

                <h3 className="font-black">{layer.title}</h3>
                <p className="mt-2 text-sm text-slate-300">{layer.detail}</p>
              </div>
            );
          })}
        </div>

        <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-6 text-center text-slate-300">
          Frontend → Node.js APIs → PostgreSQL → Kafka → OpenSearch → Monitoring
        </div>
      </div>
    </section>
  );
}