import { useEffect, useRef, useState } from "react";
import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Search,
  Settings,
  Shield,
  User,
} from "lucide-react";

import ManufNotificationsPanel from "../../Components/Manufacturer/ManufNotificationPanel";
import ManufProfileModal from "../../Components/Manufacturer/ManufProfileModal";
import ManufSecurityModal from "../../Components/Manufacturer/ManufSecurityModal";
import ManufSettingsModal from "../../Components/Manufacturer/ManufSettingsModal";

export default function ManufacturerTopbar({
  sidebarOpen,
  setSidebarOpen,
  activeModule,
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "License Expiring Soon",
      message:
        "Manufacturing license LIC-MFG-CDSCO-2026-001 will expire in 18 days.",
      time: "10 min ago",
      type: "warning",
      read: false,
      actionUrl: "/licenses",
      icon: "AlertTriangle",
      priority: "high",
    },
    {
      id: 2,
      title: "Batch Transfer Completed",
      message:
        "Batch CIP-PARA-0426 has been transferred to Apollo Pharmacy, Pune.",
      time: "35 min ago",
      type: "success",
      read: false,
      actionUrl: "/transfer-history",
      icon: "CheckCircle2",
      priority: "medium",
    },
    {
      id: 3,
      title: "Recall Watch",
      message:
        "One manufactured batch has been placed under recall watch for review.",
      time: "2 hours ago",
      type: "urgent",
      read: false,
      actionUrl: "/compliance",
      icon: "AlertTriangle",
      priority: "high",
    },
    {
      id: 4,
      title: "Citizen Complaint Received",
      message:
        "A citizen complaint has been raised against batch SUN-AMOX-1125.",
      time: "4 hours ago",
      type: "info",
      read: true,
      actionUrl: "/complaints",
      icon: "Info",
      priority: "medium",
    },
    {
      id: 5,
      title: "Inventory Updated",
      message:
        "New medicine batch inventory has been added successfully.",
      time: "1 day ago",
      type: "success",
      read: true,
      actionUrl: "/inventory",
      icon: "CheckCircle2",
      priority: "low",
    },
  ]);

  const [user, setUser] = useState({
    name: "Sun Pharma",
    role: "Licensed Manufacturer",
    avatar: "SP",
    email: "operations@sunpharma.in",
    phone: "+91 98765 43210",
    department: "Manufacturing Operations",
    employeeId: "MFG/SUN/2026/001",
    licenseId: "LIC-MFG-CDSCO-2026-001",
    joinDate: "April 01, 2026",
    location: "Mumbai, Maharashtra",
  });

  const userMenuRef = useRef(null);
  const notificationsBtnRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target)
      ) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getModuleTitle = (module) => {
    const titles = {
      overview: "Manufacturer Dashboard",
      licenses: "Licenses & Approvals",
      batches: "Medicine Batch Management",
      inventory: "Inventory Management",
      "transfer-stock": "Stock Transfer",
      "transfer-history": "Transfer History",
      compliance: "Recall & Compliance Alerts",
      complaints: "Citizen Complaints",
      profile: "Manufacturer Profile",
    };

    return titles[module] || "Manufacturer Console";
  };

  const unreadCount = notifications.filter((notification) => !notification.read)
    .length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({ ...notification, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications((prev) =>
      prev.filter((notification) => notification.id !== id)
    );
  };

  const handleUpdateProfile = (updatedData) => {
    setUser((prev) => ({ ...prev, ...updatedData }));
  };

  const handleLogout = () => {
    window.location.href = "/signin";
  };

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-slate-200 bg-white/95 shadow-sm backdrop-blur-xl lg:left-[310px]">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 shadow-sm lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-slate-900">
              {getModuleTitle(activeModule)}
            </h1>
            <p className="text-xs text-slate-500">
              Manufacturer Operations Console
            </p>
          </div>

          <div className="text-center lg:hidden">
            <p className="text-sm font-bold text-slate-950">
              TraceCare Bharat
            </p>
            <p className="text-[10px] text-slate-500">
              Manufacturer Console
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />

              <input
                type="text"
                placeholder="Search batch, license, transfer..."
                className="h-9 w-72 rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-4 text-sm outline-none focus:border-emerald-300 focus:bg-white focus:ring-2 focus:ring-emerald-100"
              />
            </div>

            <div className="relative" ref={notificationsBtnRef}>
              <button
                type="button"
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50"
              >
                <Bell className="h-5 w-5" />

                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadCount > 9 ? "9+" : unreadCount}
                  </span>
                )}
              </button>

              <ManufNotificationsPanel
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onDelete={deleteNotification}
                anchorRef={notificationsBtnRef}
              />
            </div>

            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
                className="flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-2 py-1.5 transition hover:bg-slate-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-600 to-teal-600 text-sm font-bold text-white">
                  {user.avatar}
                </div>

                <div className="hidden text-left lg:block">
                  <p className="text-sm font-semibold text-slate-900">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500">
                    {user.role}
                  </p>
                </div>

                <ChevronDown className="hidden h-4 w-4 text-slate-400 lg:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-2xl">
                  <div className="border-b border-slate-100 bg-gradient-to-r from-emerald-50 to-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-600 to-teal-600 text-base font-bold text-white">
                        {user.avatar}
                      </div>

                      <div>
                        <p className="font-semibold text-slate-900">
                          {user.name}
                        </p>
                        <p className="text-xs text-slate-500">{user.role}</p>
                        <p className="mt-0.5 text-xs text-slate-400">
                          {user.email}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowProfileModal(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowSecurityModal(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <Shield className="h-4 w-4" />
                      Security
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowSettingsModal(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 transition hover:bg-slate-50"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>

                    <div className="my-1 border-t border-slate-100" />

                    <button
                      type="button"
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-rose-600 transition hover:bg-rose-50"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <ManufProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
        onUpdate={handleUpdateProfile}
      />

      <ManufSecurityModal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
        user={user}
      />

      <ManufSettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        user={user}
        onUpdate={handleUpdateProfile}
      />

      <div className="h-16 lg:hidden" />
    </>
  );
}