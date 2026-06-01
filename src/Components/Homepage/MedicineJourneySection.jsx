import { CheckCircle2 } from "lucide-react";
import SectionHeader from "./SectionHeader";

const steps = [
  "Drug Registration",
  "Manufacturer Licensed",
  "Medicine Batch Created",
  "Transferred to Pharmacy / Distributor",
  "Dispensed to Citizen",
  "PM-JAY Claim Processed",
  "Compliance Audited",
];

export default function MedicineJourneySection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          center
          eyebrow="Medicine journey"
          title="Trace the complete medicine lifecycle"
          description="A structured journey helps stakeholders understand where a medicine came from, who handled it and what compliance events were recorded."
        />

        <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-7">
            {steps.map((step, index) => (
              <div key={step} className="relative rounded-3xl bg-white p-5 shadow-sm">
                <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-950 font-bold text-white">
                  {index + 1}
                </div>

                <h3 className="font-black leading-6 text-slate-900">{step}</h3>

                <CheckCircle2 className="mt-5 text-green-600" size={22} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}