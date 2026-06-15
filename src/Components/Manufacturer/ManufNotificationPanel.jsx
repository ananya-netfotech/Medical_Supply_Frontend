import { useState, useEffect } from "react";
import { Bell, CheckCircle2, AlertTriangle, Info, XCircle, Clock, Mail, Eye, Archive, CheckCheck } from "lucide-react";

const ManufNotificationsPanel = ({ 
  isOpen, 
  onClose, 
  notifications, 
  onMarkAsRead, 
  onMarkAllAsRead, 
  onDelete,
  anchorRef 
}) => {
  const [notificationFilter, setNotificationFilter] = useState("all");

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (anchorRef?.current && !anchorRef.current.contains(event.target)) {
        const panel = document.getElementById('notifications-panel');
        if (panel && !panel.contains(event.target)) {
          onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, anchorRef, onClose]);

  if (!isOpen) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter(notif => {
    if (notificationFilter === "all") return true;
    if (notificationFilter === "unread") return !notif.read;
    return notif.type === notificationFilter;
  });

  const getTypeStyles = (type) => {
    switch(type) {
      case "urgent":
        return { bg: "bg-rose-50", border: "border-rose-200", text: "text-rose-700", iconBg: "bg-rose-100" };
      case "warning":
        return { bg: "bg-amber-50", border: "border-amber-200", text: "text-amber-700", iconBg: "bg-amber-100" };
      case "success":
        return { bg: "bg-green-50", border: "border-green-200", text: "text-green-700", iconBg: "bg-green-100" };
      default:
        return { bg: "bg-blue-50", border: "border-blue-200", text: "text-blue-700", iconBg: "bg-blue-100" };
    }
  };

  const getPriorityBadge = (priority) => {
    switch(priority) {
      case "high":
        return <span className="ml-2 rounded-full bg-rose-100 px-2 py-0.5 text-[10px] font-semibold text-rose-700">High</span>;
      case "medium":
        return <span className="ml-2 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-700">Medium</span>;
      case "low":
        return <span className="ml-2 rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-semibold text-green-700">Low</span>;
      default:
        return null;
    }
  };

  const getIconComponent = (iconName) => {
    switch(iconName) {
      case "AlertTriangle":
        return AlertTriangle;
      case "CheckCircle2":
        return CheckCircle2;
      case "Info":
        return Info;
      default:
        return Info;
    }
  };

  return (
    <div 
      id="notifications-panel"
      className="absolute right-0 top-12 z-50 w-[420px] max-w-[calc(100vw-2rem)] rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-200 bg-gradient-to-r from-blue-50 to-white px-4 py-3">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4 text-blue-600" />
          <h3 className="font-semibold text-slate-900 text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <span className="rounded-full bg-blue-100 px-1.5 py-0.5 text-[10px] font-medium text-blue-700">
              {unreadCount} unread
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5">
          {unreadCount > 0 && (
            <button
              onClick={onMarkAllAsRead}
              className="flex items-center gap-1 rounded-lg px-1.5 py-1 text-[10px] font-medium text-blue-600 hover:bg-blue-50 transition"
            >
              <CheckCheck className="h-3 w-3" />
              Mark all read
            </button>
          )}
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 transition"
          >
            <XCircle className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="border-b border-slate-100 bg-slate-50/50 px-3 py-1.5">
        <div className="flex gap-1 overflow-x-auto">
          {[
            { id: "all", label: "All", icon: Bell },
            { id: "unread", label: "Unread", icon: Eye },
            { id: "urgent", label: "Urgent", icon: AlertTriangle },
            { id: "warning", label: "Warning", icon: AlertTriangle },
            { id: "success", label: "Success", icon: CheckCircle2 },
            { id: "info", label: "Info", icon: Info },
          ].map((filter) => (
            <button
              key={filter.id}
              onClick={() => setNotificationFilter(filter.id)}
              className={`flex items-center gap-1 rounded-md px-1.5 py-0.5 text-[10px] font-medium whitespace-nowrap transition ${
                notificationFilter === filter.id
                  ? "bg-blue-600 text-white"
                  : "text-slate-600 hover:bg-slate-100"
              }`}
            >
              <filter.icon className="h-2.5 w-2.5" />
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Notifications List */}
      <div className="max-h-[320px] overflow-y-auto divide-y divide-slate-100">
        {filteredNotifications.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 px-4 text-center">
            <div className="rounded-full bg-slate-100 p-2 mb-2">
              <Bell className="h-5 w-5 text-slate-400" />
            </div>
            <p className="text-xs font-medium text-slate-700">No notifications</p>
            <p className="text-[10px] text-slate-500 mt-0.5">
              {notificationFilter === "all" 
                ? "You're all caught up!" 
                : `No ${notificationFilter} notifications to display`}
            </p>
          </div>
        ) : (
          filteredNotifications.map((notif) => {
            const styles = getTypeStyles(notif.type);
            const IconComponent = getIconComponent(notif.icon);
            return (
              <div
                key={notif.id}
                className={`relative p-3 transition-all hover:bg-slate-50 cursor-pointer ${
                  !notif.read ? "bg-blue-50/30" : ""
                }`}
                onClick={() => onMarkAsRead(notif.id)}
              >
                <div className="flex gap-2.5">
                  {/* Icon */}
                  <div className={`flex-shrink-0 h-8 w-8 rounded-full ${styles.iconBg} flex items-center justify-center`}>
                    <IconComponent className={`h-4 w-4 ${styles.text}`} />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2 mb-0.5">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <p className="text-xs font-semibold text-slate-900">
                          {notif.title}
                        </p>
                        {getPriorityBadge(notif.priority)}
                      </div>
                      {!notif.read && (
                        <div className="h-1.5 w-1.5 rounded-full bg-blue-600 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-[11px] text-slate-600 mb-1.5 line-clamp-2">
                      {notif.message}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <Clock className="h-2.5 w-2.5 text-slate-400" />
                        <span className="text-[10px] text-slate-500">{notif.time}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onMarkAsRead(notif.id);
                          }}
                          className="rounded p-0.5 text-slate-400 hover:bg-slate-200 transition"
                          title="Mark as read"
                        >
                          <Eye className="h-3 w-3" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onDelete(notif.id);
                          }}
                          className="rounded p-0.5 text-slate-400 hover:bg-rose-100 hover:text-rose-600 transition"
                          title="Delete"
                        >
                          <Archive className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Footer */}
      <div className="border-t border-slate-200 bg-slate-50 px-3 py-2">
        <button className="flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-1.5 text-xs font-medium text-blue-600 transition hover:bg-blue-50 border border-slate-200">
          <Mail className="h-3.5 w-3.5" />
          View All Notifications
        </button>
      </div>
    </div>
  );
};

export default ManufNotificationsPanel;