import {
  BadgeIndianRupee,
  Boxes,
  CheckCircle2,
  Pill,
  UserCheck,
  ArrowRight,
  Clock,
  TrendingUp,
} from "lucide-react";

const workflow = [
  {
    title: "Stock Received",
    text: "Manufacturer transfer received and added to pharmacy inventory.",
    icon: Boxes,
    status: "Completed",
    time: "Today, 9:30 AM",
    progress: 100,
  },
  {
    title: "Citizen Verified",
    text: "PM-JAY beneficiary and masked Aadhaar details checked.",
    icon: UserCheck,
    status: "In Progress",
    time: "Today, 10:15 AM",
    progress: 75,
  },
  {
    title: "Medicine Dispensed",
    text: "Ownership transferred to citizen with batch and lot record.",
    icon: Pill,
    status: "In Progress",
    time: "Today, 11:45 AM",
    progress: 50,
  },
  {
    title: "PM-JAY Claim Created",
    text: "Claim generated after verified scheme-linked dispensing.",
    icon: BadgeIndianRupee,
    status: "Pending",
    time: "Today, 1:30 PM",
    progress: 25,
  },
];

const getStatusStyles = (status) => {
  const styles = {
    Completed: {
      bg: "bg-emerald-50",
      border: "border-emerald-200",
      text: "text-emerald-700",
      dot: "bg-emerald-500",
      icon: "text-emerald-500",
    },
    "In Progress": {
      bg: "bg-purple-50",
      border: "border-purple-200",
      text: "text-purple-700",
      dot: "bg-purple-500",
      icon: "text-purple-500",
    },
    Pending: {
      bg: "bg-amber-50",
      border: "border-amber-200",
      text: "text-amber-700",
      dot: "bg-amber-500",
      icon: "text-amber-500",
    },
    Review: {
      bg: "bg-indigo-50",
      border: "border-indigo-200",
      text: "text-indigo-700",
      dot: "bg-indigo-500",
      icon: "text-indigo-500",
    },
  };
  return styles[status] || styles.Pending;
};

const getProgressColor = (progress) => {
  if (progress >= 75) return "bg-emerald-500";
  if (progress >= 50) return "bg-purple-500";
  if (progress >= 25) return "bg-amber-500";
  return "bg-slate-300";
};

export default function PharmacyWorkflowStatus() {
  const completedCount = workflow.filter(w => w.status === "Completed").length;
  const totalCount = workflow.length;
  const overallProgress = Math.round((completedCount / totalCount) * 100);

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800">Operational Workflow</h2>
          <p className="mt-1 text-sm text-slate-500">
            End-to-end pharmacy process from stock receipt to claim creation
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 rounded-full bg-purple-50 px-3 py-1 border border-purple-200">
            <TrendingUp className="h-3.5 w-3.5 text-purple-600" />
            <span className="text-xs font-semibold text-purple-600">
              {overallProgress}% Complete
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 mt-6 space-y-0 overflow-y-auto pr-1">
        {workflow.map((item, index) => {
          const Icon = item.icon;
          const styles = getStatusStyles(item.status);
          const progressColor = getProgressColor(item.progress);
          const isLast = index === workflow.length - 1;

          return (
            <div key={item.title} className="relative">
              <div className="flex gap-4 pb-6">
                {/* Icon and connector */}
                <div className="flex flex-col items-center">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${styles.bg} border ${styles.border} transition-all duration-300 group-hover:scale-105`}>
                    <Icon className={`h-5 w-5 ${styles.icon}`} />
                  </div>
                  {!isLast && (
                    <div className={`flex-1 w-0.5 ${index < completedCount ? 'bg-emerald-400' : 'bg-slate-200'} relative`}>
                      <div 
                        className={`absolute top-0 left-0 w-full transition-all duration-1000 ${progressColor}`}
                        style={{ 
                          height: `${index < completedCount ? 100 : item.progress}%`,
                          opacity: index < completedCount ? 1 : 0.6
                        }}
                      />
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex-1 pb-2">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-bold text-slate-800">{item.title}</p>
                        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-[10px] font-bold ${styles.bg} ${styles.border} ${styles.text}`}>
                          <span className={`h-1.5 w-1.5 rounded-full ${styles.dot}`} />
                          {item.status}
                        </span>
                      </div>
                      <p className="mt-1 text-sm leading-6 text-slate-500">
                        {item.text}
                      </p>
                    </div>
                    <span className="text-[10px] font-medium text-slate-400 whitespace-nowrap">
                      {item.time}
                    </span>
                  </div>

                  {/* Progress bar */}
                  <div className="mt-3 flex items-center gap-3">
                    <div className="flex-1 h-1.5 rounded-full bg-slate-100 overflow-hidden">
                      <div 
                        className={`h-full rounded-full ${progressColor} transition-all duration-1000`}
                        style={{ width: `${item.progress}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500 min-w-[32px] text-right">
                      {item.progress}%
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer summary */}
      <div className="mt-2 pt-3 border-t border-slate-200/50">
        <div className="grid grid-cols-4 gap-2">
          <div className="rounded-xl bg-emerald-50/50 px-3 py-2 text-center border border-emerald-200/30">
            <p className="text-[10px] font-medium text-slate-500">Completed</p>
            <p className="text-sm font-bold text-emerald-600">
              {workflow.filter(w => w.status === "Completed").length}
            </p>
          </div>
          <div className="rounded-xl bg-purple-50/50 px-3 py-2 text-center border border-purple-200/30">
            <p className="text-[10px] font-medium text-slate-500">In Progress</p>
            <p className="text-sm font-bold text-purple-600">
              {workflow.filter(w => w.status === "In Progress").length}
            </p>
          </div>
          <div className="rounded-xl bg-amber-50/50 px-3 py-2 text-center border border-amber-200/30">
            <p className="text-[10px] font-medium text-slate-500">Pending</p>
            <p className="text-sm font-bold text-amber-600">
              {workflow.filter(w => w.status === "Pending").length}
            </p>
          </div>
          <div className="rounded-xl bg-indigo-50/50 px-3 py-2 text-center border border-indigo-200/30">
            <p className="text-[10px] font-medium text-slate-500">Total Steps</p>
            <p className="text-sm font-bold text-indigo-600">{workflow.length}</p>
          </div>
        </div>
      </div>
    </div>
  );
}