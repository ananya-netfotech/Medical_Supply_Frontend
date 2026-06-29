import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
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
import PharmacyNotificationsPanel from "../../../Components/Pharmacy/PharmacyNotificationPanel";
import PharmacyProfileModal from "../../../Components/Pharmacy/PharmacyProfileModal";
import PharmacySecurityModal from "../../../Components/Pharmacy/PharmacySecurityModal";
import PharmacySettingsModal from "../../../Components/Pharmacy/PharmacySettingsModal";

export default function PharmacyDistributorTopbar({
  setSidebarOpen,
  activeModule,
}) {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const userMenuRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationButtonRef = useRef(null);

  // Sample notifications data
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: "Recall alert: SUN-INS-0926",
      message: "This batch has been flagged for recall. Do not dispense.",
      type: "urgent",
      priority: "high",
      icon: "AlertTriangle",
      time: "2 min ago",
      read: false,
    },
    {
      id: 2,
      title: "Near-expiry stock warning",
      message: "8,200 units across 15 batches will expire within 90 days.",
      type: "warning",
      priority: "medium",
      icon: "AlertTriangle",
      time: "15 min ago",
      read: false,
    },
    {
      id: 3,
      title: "PM-JAY claim approved",
      message: "Claim PMJAY-CLM-2026-0091 has been approved for reimbursement.",
      type: "success",
      priority: "low",
      icon: "CheckCircle2",
      time: "1 hour ago",
      read: true,
    },
    {
      id: 4,
      title: "Inventory update",
      message: "10,000 units of SUN-PARA-0426 added to inventory.",
      type: "info",
      priority: "low",
      icon: "Info",
      time: "2 hours ago",
      read: true,
    },
  ]);

  const [user, setUser] = useState({
    name: "Apollo Pharmacy",
    role: "Pharmacy / Distributor",
    avatar: "AP",
    email: "operations@apollopharmacy.in",
    phone: "+91 98765 43210",
    pharmacyName: "Apollo Pharmacy",
    licenseId: "LIC-PHR-STATE-2026-041",
    registrationDate: "15 Jan 2023",
    location: "Pune, Maharashtra",
    gstNumber: "GST-22-ABCDE-1234F-1Z5",
    address: "123, Main Road, Kothrud, Pune - 411038",
  });

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
      if (
        notificationButtonRef.current && 
        !notificationButtonRef.current.contains(event.target) &&
        notificationRef.current && 
        !notificationRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getModuleTitle = (module) => {
    const titles = {
      overview: "Pharmacy / Distributor Dashboard",
      inventory: "Inventory",
      traceability: "Medicine Traceability",
      dispense: "Dispense Medicine",
      "citizen-verification": "Citizen Verification",
      "pmjay-claims": "PM-JAY Claims",
      "expiry-recall-alerts": "Expiry / Recall Alerts",
      "transfer-history": "Transfer History",
    };

    return titles[module] || "Pharmacy / Distributor Console";
  };

  const handleMarkAsRead = (id) => {
    setNotifications(prev =>
      prev.map(notif =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleMarkAllAsRead = () => {
    setNotifications(prev =>
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const handleDelete = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-30 border-b border-purple-100 bg-white/95 shadow-sm backdrop-blur-xl lg:left-[310px]">
        <div className="flex h-16 items-center justify-between px-4 lg:px-6">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="rounded-xl border border-purple-200 bg-white p-2 text-purple-700 shadow-sm lg:hidden"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="hidden lg:block">
            <h1 className="text-lg font-bold text-purple-950">
              {getModuleTitle(activeModule)}
            </h1>
            <p className="text-xs text-slate-500">
              Inventory, dispensing and Ayushman Bharat claim operations
            </p>
          </div>

          <div className="text-center lg:hidden">
            <p className="text-sm font-bold text-purple-950">
              TraceCare Bharat
            </p>
            <p className="text-[10px] text-slate-500">
              Pharmacy Console
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-purple-400" />

              <input
                type="text"
                placeholder="Search batch, citizen, claim..."
                className="h-9 w-72 rounded-xl border border-purple-200 bg-purple-50/50 pl-9 pr-4 text-sm outline-none focus:border-purple-500 focus:bg-white focus:ring-2 focus:ring-purple-100"
              />
            </div>

            <div className="relative" ref={notificationButtonRef}>
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative rounded-xl border border-purple-200 bg-white p-2 text-purple-700 transition hover:bg-purple-50"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Panel */}
              <div ref={notificationRef}>
                <PharmacyNotificationsPanel
                  isOpen={showNotifications}
                  onClose={() => setShowNotifications(false)}
                  notifications={notifications}
                  onMarkAsRead={handleMarkAsRead}
                  onMarkAllAsRead={handleMarkAllAsRead}
                  onDelete={handleDelete}
                  anchorRef={notificationButtonRef}
                />
              </div>
            </div>

            <div className="relative" ref={userMenuRef}>
              <button
                type="button"
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center gap-2 rounded-xl border border-purple-200 bg-white px-2 py-1.5 transition hover:bg-purple-50"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-purple-600 to-indigo-600 text-sm font-bold text-white">
                  {user.avatar}
                </div>

                <div className="hidden text-left lg:block">
                  <p className="text-sm font-semibold text-purple-950">
                    {user.name}
                  </p>
                  <p className="text-[10px] text-slate-500">{user.role}</p>
                </div>

                <ChevronDown className="hidden h-4 w-4 text-purple-400 lg:block" />
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-12 z-50 w-72 overflow-hidden rounded-xl border border-purple-200 bg-white shadow-2xl">
                  <div className="border-b border-purple-100 bg-gradient-to-r from-purple-50 to-white p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-purple-600 to-indigo-600 text-base font-bold text-white">
                        {user.avatar}
                      </div>

                      <div>
                        <p className="font-semibold text-purple-950">
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
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowProfileModal(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-purple-50"
                    >
                      <User className="h-4 w-4 text-purple-500" />
                      Profile
                    </button>

                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowSecurityModal(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-purple-50"
                    >
                      <Shield className="h-4 w-4 text-purple-500" />
                      Security
                    </button>

                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowSettingsModal(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-purple-50"
                    >
                      <Settings className="h-4 w-4 text-purple-500" />
                      Settings
                    </button>

                    <div className="my-1 border-t border-purple-100" />

                    <button
                      type="button"
                      onClick={() => {
                        setShowUserMenu(false);
                        navigate("/signin");
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-purple-600 hover:bg-purple-50"
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

      <div className="h-16 lg:hidden" />

      {/* Modals */}
      <PharmacyProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
        onUpdate={handleUpdateProfile}
      />

      <PharmacySecurityModal
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
        user={user}
      />

      <PharmacySettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        user={user}
        onUpdate={handleUpdateProfile}
      />
    </>
  );
}