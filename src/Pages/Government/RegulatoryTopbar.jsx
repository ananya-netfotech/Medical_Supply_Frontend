import { useState } from "react";
import { Menu, Bell, Search, User, Settings, LogOut, Shield, ChevronDown } from "lucide-react";

export default function RegulatoryTopbar({ sidebarOpen, setSidebarOpen, activeModule }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Mock user data
  const user = {
    name: "Rajesh Kumar",
    role: "Drug Controller General",
    avatar: "RK"
  };

  // Mock notifications
  const notifications = [
    { id: 1, title: "New recall alert", time: "2 min ago", type: "urgent" },
    { id: 2, title: "Compliance report ready", time: "1 hour ago", type: "info" },
    { id: 3, title: "Manufacturer license expiring", time: "3 hours ago", type: "warning" },
  ];

  const getModuleTitle = (module) => {
    const titles = {
      overview: "Dashboard Overview",
      "drug-registration": "Drug Registration",
      licensing: "Manufacturer Licensing",
      "pharmacy-registry": "Pharmacy Registry",
      "medicine-units": "Medicine Units",
      traceability: "Medicine Traceability",
      recalls: "Batch Recalls",
      "healthcare-schemes": "Healthcare Schemes",
      compliance: "Compliance Alerts",
      "audit-trail": "Audit Trail",
    };
    return titles[module] || "Government Regulatory Console";
  };

  return (
    <>
      {/* Desktop Topbar */}
      <header className="fixed top-0 right-0 left-0 z-30 bg-white/95 backdrop-blur-xl border-b border-slate-200 shadow-sm lg:left-[310px]">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          {/* Left section - Menu toggle (mobile only) */}
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          {/* Page Title */}
          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-slate-900">
              {getModuleTitle(activeModule)}
            </h1>
            <p className="text-xs text-slate-500">
              Government Regulatory Command Center
            </p>
          </div>

          {/* Mobile title */}
          <div className="text-center lg:hidden">
            <p className="text-sm font-bold text-slate-950">TraceCare Bharat</p>
            <p className="text-[10px] text-slate-500">Government Console</p>
          </div>

          {/* Right section - Actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <div className="hidden md:block relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Search..."
                className="h-9 w-64 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-blue-300 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white">
                    {notifications.length}
                  </span>
                )}
              </button>

              {/* Notifications dropdown */}
              {showNotifications && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowNotifications(false)}
                  />
                  <div className="absolute right-0 top-12 z-50 w-80 rounded-xl border border-slate-200 bg-white shadow-lg">
                    <div className="border-b border-slate-100 p-3">
                      <p className="font-semibold text-slate-900">Notifications</p>
                    </div>
                    <div className="max-h-96 overflow-y-auto">
                      {notifications.map((notif) => (
                        <div
                          key={notif.id}
                          className="border-b border-slate-100 p-3 hover:bg-slate-50 cursor-pointer transition"
                        >
                          <p className="text-sm font-medium text-slate-900">
                            {notif.title}
                          </p>
                          <p className="text-xs text-slate-500">{notif.time}</p>
                        </div>
                      ))}
                    </div>
                    <div className="p-3">
                      <button className="w-full text-center text-xs font-semibold text-blue-600 hover:text-blue-700">
                        View all notifications
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition hover:bg-slate-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 text-sm font-bold text-white">
                  {user.avatar}
                </div>
                <div className="hidden text-left lg:block">
                  <p className="text-sm font-semibold text-slate-900">{user.name}</p>
                  <p className="text-[10px] text-slate-500">{user.role}</p>
                </div>
                <ChevronDown className="hidden h-4 w-4 text-slate-400 lg:block" />
              </button>

              {/* User dropdown */}
              {showUserMenu && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowUserMenu(false)}
                  />
                  <div className="absolute right-0 top-12 z-50 w-64 rounded-xl border border-slate-200 bg-white shadow-lg">
                    <div className="border-b border-slate-100 p-3">
                      <p className="font-semibold text-slate-900">{user.name}</p>
                      <p className="text-xs text-slate-500">{user.role}</p>
                    </div>
                    <div className="py-2">
                      <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                        <User className="h-4 w-4" />
                        Profile
                      </button>
                      <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-slate-700 hover:bg-slate-50 transition">
                        <Settings className="h-4 w-4" />
                        Settings
                      </button>
                      <div className="border-t border-slate-100 my-1" />
                      <button className="flex w-full items-center gap-3 px-3 py-2 text-sm text-rose-600 hover:bg-rose-50 transition">
                        <LogOut className="h-4 w-4" />
                        Logout
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Spacer for fixed topbar on mobile */}
      <div className="h-16 lg:hidden" />
    </>
  );
}