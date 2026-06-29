import { Calendar } from "lucide-react";
import { useState } from "react";

export default function PharmacyOverviewHeader() {
  const [currentDate] = useState(new Date());
  
  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <section className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-900/90 via-purple-800/80 to-indigo-900/90 p-6 text-white shadow-lg backdrop-blur-sm">
      <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-purple-400/10 blur-3xl" />
      <div className="absolute -bottom-20 left-10 h-56 w-56 rounded-full bg-indigo-400/10 blur-3xl" />
      <div className="absolute top-1/2 right-1/4 h-40 w-40 rounded-full bg-pink-400/5 blur-3xl" />

      <div className="relative flex flex-col justify-between gap-5 lg:flex-row lg:items-center">
        <div>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-bold text-purple-200">
            <span className="h-2 w-2 rounded-full bg-purple-300" />
            PHARMACY CONSOLE
          </div>

          <h1 className="text-2xl font-black lg:text-3xl bg-gradient-to-r from-purple-200 to-indigo-200 bg-clip-text text-transparent">
            Pharmacy / Distributor Dashboard
          </h1>

          <p className="mt-2 max-w-3xl text-sm leading-6 text-purple-200/80">
            Operational view of inventory, dispensing, citizen verification,
            PM-JAY claims, expiry risk, recall alerts and medicine movement
            across the pharmacy workflow.
          </p>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-5 py-3 backdrop-blur-sm hover:bg-white/10 transition-colors">
          <Calendar className="h-5 w-5 text-purple-300" />
          <span className="text-sm font-medium text-purple-100">
            {formatDate(currentDate)}
          </span>
        </div>
      </div>
    </section>
  );
}