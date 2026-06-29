import { 
  CheckCircle2, 
  Package, 
  UserCheck, 
  Pill, 
  FileText,
  ArrowRight,
  Clock
} from "lucide-react";

const activities = [
  {
    title: "Stock received",
    text: "10,000 units of SUN-PARA-0426 received from Sun Pharma.",
    time: "Today · 10:30 AM",
    icon: Package,
    type: "inbound",
  },
  {
    title: "Citizen verified",
    text: "Ravi Kumar verified as PM-JAY beneficiary.",
    time: "Today · 02:10 PM",
    icon: UserCheck,
    type: "verification",
  },
  {
    title: "Medicine dispensed",
    text: "20 units of Paracetamol 500mg dispensed.",
    time: "Today · 02:18 PM",
    icon: Pill,
    type: "outbound",
  },
  {
    title: "Claim submitted",
    text: "PMJAY-CLM-2026-0091 submitted for reimbursement.",
    time: "Today · 02:30 PM",
    icon: FileText,
    type: "claim",
  },
];

const getTypeStyles = (type) => {
  const styles = {
    inbound: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      icon: "text-emerald-500",
      dot: "bg-emerald-500",
    },
    verification: {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      icon: "text-purple-500",
      dot: "bg-purple-500",
    },
    outbound: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-700",
      icon: "text-indigo-500",
      dot: "bg-indigo-500",
    },
    claim: {
      bg: "bg-violet-50",
      border: "border-violet-200",
      text: "text-violet-700",
      icon: "text-violet-500",
      dot: "bg-violet-500",
    },
  };
  return styles[type] || styles.verification;
};

export default function PharmacyRecentActivity() {
  const activityCount = activities.length;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Recent Activity</h2>
          <p className="mt-1 text-sm text-slate-500">
            Latest pharmacy-side operational events
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 border border-purple-200">
            <Clock className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-xs font-semibold text-purple-600">
              {activityCount} events
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-6 space-y-0 overflow-y-auto pr-1">
        {activities.map((item, index) => {
          const styles = getTypeStyles(item.type);
          const Icon = item.icon;
          const isLast = index === activities.length - 1;

          return (
            <div key={item.title} className="relative">
              <div className="flex gap-3 pb-5">
                {/* Icon with connector */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${styles.bg} border ${styles.border} transition-all duration-300 hover:scale-105`}>
                    <Icon className={`h-4 w-4 ${styles.icon}`} />
                  </div>
                  {!isLast && (
                    <div className="flex-1 w-0.5 bg-slate-200 relative">
                      <div className={`absolute top-0 left-0 w-full h-full ${styles.bg} opacity-30`} style={{ height: '50%' }} />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-1">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-bold text-slate-800">
                          {item.title}
                        </p>
                        <span className={`inline-flex h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.text}
                      </p>
                      <div className="mt-2 flex items-center gap-3">
                        <span className="text-[10px] font-medium text-slate-400">
                          {item.time}
                        </span>
                        <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${styles.bg} ${styles.text} border ${styles.border}`}>
                          {item.type}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer action */}
      <div className="mt-2 pt-3 border-t border-slate-200/50">
        <button className="w-full rounded-xl bg-gradient-to-r from-purple-50 to-indigo-50 px-4 py-2.5 text-center text-xs font-semibold text-purple-700 transition-all hover:from-purple-100 hover:to-indigo-100 hover:scale-[1.01] border border-purple-200/50 flex items-center justify-center gap-2 group">
          <span>View all activity</span>
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </button>
      </div>
    </div>
  );
}