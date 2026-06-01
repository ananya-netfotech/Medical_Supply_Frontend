import { ShieldCheck } from "lucide-react";

const ecosystemFlow = [
  "Manufacturer",
  "Pharmacy / Distributor",
  "Hospital",
  "Citizen",
];

export default function EcosystemFlowCard() {
  return (
    <div className="rounded-3xl border bg-white p-8 shadow-xl">
      <h3 className="mb-6 text-2xl font-bold text-slate-900">
        Live Ecosystem Flow
      </h3>

      <div className="space-y-4">
        {ecosystemFlow.map((item, index) => (
          <div
            key={item}
            className="flex items-center justify-between rounded-2xl bg-slate-100 p-4"
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-900 font-bold text-white">
                {index + 1}
              </div>

              <span className="font-medium">{item}</span>
            </div>

            <ShieldCheck className="text-green-600" size={20} />
          </div>
        ))}
      </div>
    </div>
  );
}