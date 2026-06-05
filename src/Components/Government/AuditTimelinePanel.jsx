import { auditTimeline } from "../../Pages/Government/pages/governmentDashboardData";
import { Calendar, Clock, AlertCircle, CheckCircle, ChevronRight, Building2, Pill, Truck, FileCheck, Shield } from "lucide-react";

export default function AuditTimelinePanel() {
  const today = new Date();
  const upcomingCount = auditTimeline.filter(item => {
    const itemDate = new Date(item.date);
    return itemDate >= today;
  }).length;

  const getStatusConfig = (status) => {
    switch(status) {
      case 'Completed': return { color: 'bg-emerald-100 text-emerald-700 border-emerald-200', icon: CheckCircle };
      case 'In Progress': return { color: 'bg-blue-100 text-blue-700 border-blue-200', icon: Clock };
      case 'Scheduled': return { color: 'bg-amber-100 text-amber-700 border-amber-200', icon: Calendar };
      default: return { color: 'bg-slate-100 text-slate-700 border-slate-200', icon: AlertCircle };
    }
  };

  const getDateStatus = (dateStr) => {
    const auditDate = new Date(dateStr);
    const today = new Date();
    const diffDays = Math.ceil((auditDate - today) / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return { label: 'Overdue', color: 'text-rose-600' };
    if (diffDays === 0) return { label: 'Today', color: 'text-amber-600' };
    if (diffDays <= 3) return { label: `${diffDays} days left`, color: 'text-amber-600' };
    return { label: dateStr, color: 'text-slate-500' };
  };

  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="mb-5 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
              <Calendar className="h-4 w-4 text-blue-700" />
            </div>
            <h2 className="text-xl font-bold text-slate-900">
              Upcoming Government Audits
            </h2>
          </div>
          <p className="text-sm text-slate-500">
            Scheduled manufacturer, distributor, recall and claim audits
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Summary Badge */}
          <div className="hidden sm:flex items-center gap-2 rounded-full bg-blue-50 px-3 py-1.5">
            <Clock className="h-3 w-3 text-blue-600" />
            <span className="text-xs font-semibold text-blue-700">
              {upcomingCount} Upcoming
            </span>
          </div>
          
          {/* Filter Button */}
          <button className="flex items-center gap-1 rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-600 transition hover:bg-slate-50">
            <span>Weekly View</span>
            <ChevronRight className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Timeline Container */}
      <div className="relative">
        {/* Vertical Timeline Line */}
        <div className="absolute left-[27px] top-6 bottom-6 w-px bg-gradient-to-b from-blue-200 via-blue-300 to-blue-200 hidden sm:block" />

        {/* Timeline Items */}
        <div className="space-y-4">
          {auditTimeline.map((item, idx) => {
            const Icon = item.icon;
            const statusConfig = getStatusConfig(item.status);
            const StatusIcon = statusConfig.icon;
            const dateStatus = getDateStatus(item.date);
            const isFirst = idx === 0;
            const isLast = idx === auditTimeline.length - 1;
            
            return (
              <div key={`${item.title}-${item.date}`} className="relative group">
                {/* Timeline Node */}
                <div className="absolute left-[19px] top-1/2 -translate-y-1/2 hidden sm:block">
                  <div className={`relative z-10 flex h-4 w-4 items-center justify-center rounded-full ring-4 ring-white ${
                    item.status === 'Completed' ? 'bg-emerald-500' :
                    item.status === 'In Progress' ? 'bg-blue-500 animate-pulse' :
                    'bg-amber-500'
                  }`}>
                    {item.status === 'In Progress' && (
                      <div className="absolute inset-0 rounded-full animate-ping bg-blue-400 opacity-75" />
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className={`relative rounded-xl border transition-all duration-300 hover:shadow-md cursor-pointer ml-0 sm:ml-12 ${
                  item.status === 'Completed' ? 'border-emerald-200 bg-gradient-to-r from-emerald-50/30 to-white' :
                  item.status === 'In Progress' ? 'border-blue-200 bg-gradient-to-r from-blue-50/30 to-white' :
                  'border-amber-200 bg-white'
                }`}>
                  <div className="p-4">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                      {/* Left Section - Icon & Details */}
                      <div className="flex gap-3">
                        {/* Icon - Mobile only */}
                        <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl sm:hidden ${
                          item.status === 'Completed' ? 'bg-emerald-100' :
                          item.status === 'In Progress' ? 'bg-blue-100' :
                          'bg-amber-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            item.status === 'Completed' ? 'text-emerald-600' :
                            item.status === 'In Progress' ? 'text-blue-600' :
                            'text-amber-600'
                          }`} />
                        </div>

                        {/* Icon - Desktop */}
                        <div className={`hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${
                          item.status === 'Completed' ? 'bg-emerald-100' :
                          item.status === 'In Progress' ? 'bg-blue-100' :
                          'bg-amber-100'
                        }`}>
                          <Icon className={`h-5 w-5 ${
                            item.status === 'Completed' ? 'text-emerald-600' :
                            item.status === 'In Progress' ? 'text-blue-600' :
                            'text-amber-600'
                          }`} />
                        </div>

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-1">
                            <h3 className="font-bold text-slate-900">
                              {item.title}
                            </h3>
                            {/* Mobile Status Badge */}
                            <span className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[9px] font-bold uppercase sm:hidden ${statusConfig.color}`}>
                              <StatusIcon className="h-2.5 w-2.5" />
                              {item.status}
                            </span>
                          </div>
                          <p className="text-sm text-slate-500 leading-relaxed">
                            {item.detail}
                          </p>
                        </div>
                      </div>

                      {/* Right Section - Status & Date */}
                      <div className="flex flex-row items-center justify-between gap-3 sm:flex-col sm:items-end">
                        {/* Desktop Status Badge */}
                        <span className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[10px] font-bold uppercase ${statusConfig.color}`}>
                          <StatusIcon className="h-3 w-3" />
                          {item.status}
                        </span>

                        {/* Date with urgency indicator */}
                        <div className={`flex items-center gap-1.5 ${dateStatus.color}`}>
                          <Calendar className="h-3.5 w-3.5" />
                          <span className="text-xs font-semibold">
                            {dateStatus.label}
                          </span>
                        </div>

                        {/* Time remaining badge for urgent items */}
                        {dateStatus.label !== item.date && dateStatus.label !== 'Today' && (
                          <div className="hidden sm:flex items-center gap-1 rounded-full bg-amber-50 px-2 py-0.5">
                            <Clock className="h-2.5 w-2.5 text-amber-600" />
                            <span className="text-[9px] font-bold text-amber-700">{dateStatus.label}</span>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Progress Bar for In Progress items */}
                    {item.status === 'In Progress' && (
                      <div className="mt-3">
                        <div className="h-1 w-full overflow-hidden rounded-full bg-slate-100">
                          <div 
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-blue-600 transition-all duration-500"
                            style={{ width: '65%' }}
                          />
                        </div>
                        <p className="mt-1 text-[9px] font-medium text-blue-600">65% completed</p>
                      </div>
                    )}

                    {/* Action button on hover */}
                   
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer Actions */}
      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-100">
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            <span>In Progress</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 rounded-full bg-amber-500" />
            <span>Scheduled</span>
          </div>
        </div>
        
        <button className="flex items-center gap-1 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors">
          View All Audits
          <ChevronRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </section>
  );
}