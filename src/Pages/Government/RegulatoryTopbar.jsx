import { useState, useRef, useEffect } from "react";
import { Menu, Bell, Search, User, Settings, LogOut, Shield, ChevronDown } from "lucide-react";
import NotificationsPanel from "../../Components/Government/NotificationsPanel";
import ProfileModal from "../../Components/Government/ProfileModal";
import SecurityModal from "../../Components/Government/SecurityModal";
import SettingsModal from "../../Components/Government/SettingsModal";

export default function RegulatoryTopbar({ sidebarOpen, setSidebarOpen, activeModule }) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  
  const [notifications, setNotifications] = useState([
    { 
      id: 1, 
      title: "New Recall Alert", 
      message: "Batch #AMX-2024-001 has been recalled due to quality issues",
      time: "2 min ago", 
      type: "urgent",
      read: false,
      actionUrl: "/recalls",
      icon: "AlertTriangle",
      priority: "high"
    },
    { 
      id: 2, 
      title: "Compliance Report Ready", 
      message: "Monthly compliance report for March 2024 is now available for download",
      time: "1 hour ago", 
      type: "info",
      read: false,
      actionUrl: "/compliance",
      icon: "CheckCircle2",
      priority: "medium"
    },
    { 
      id: 3, 
      title: "License Expiring Soon", 
      message: "Manufacturer license for Cipla Limited will expire in 15 days",
      time: "3 hours ago", 
      type: "warning",
      read: true,
      actionUrl: "/licensing",
      icon: "AlertTriangle",
      priority: "high"
    },
    { 
      id: 4, 
      title: "New Registration Approved", 
      message: "Drug registration for Metformin 1000mg has been approved",
      time: "5 hours ago", 
      type: "success",
      read: true,
      actionUrl: "/drug-registration",
      icon: "CheckCircle2",
      priority: "low"
    },
    { 
      id: 5, 
      title: "System Update", 
      message: "Platform will undergo maintenance on April 15, 2024 from 2-4 AM",
      time: "1 day ago", 
      type: "info",
      read: true,
      actionUrl: "#",
      icon: "Info",
      priority: "low"
    },
    { 
      id: 6, 
      title: "New Manufacturer Registration", 
      message: "A new manufacturer has submitted registration for approval",
      time: "2 days ago", 
      type: "info",
      read: false,
      actionUrl: "/licensing",
      icon: "Info",
      priority: "medium"
    },
    { 
      id: 7, 
      title: "Quality Audit Scheduled", 
      message: "Quality audit scheduled for Cipla Limited on April 20, 2024",
      time: "2 days ago", 
      type: "warning",
      read: false,
      actionUrl: "/compliance",
      icon: "AlertTriangle",
      priority: "high"
    },
  ]);

  const [user, setUser] = useState({
    name: "Rajesh Kumar",
    role: "Drug Controller General",
    avatar: "RK",
    email: "rajesh.kumar@cdsco.gov.in",
    phone: "+91 98765 43210",
    department: "CDSCO",
    employeeId: "CDSCO/2024/001",
    joinDate: "January 15, 2020",
    location: "New Delhi, India"
  });

  const userMenuRef = useRef(null);
  const notificationsBtnRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notif => ({ ...notif, read: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notif => notif.id !== id));
  };

  const handleUpdateProfile = (updatedData) => {
    setUser(prev => ({ ...prev, ...updatedData }));
  };

  const handleLogout = () => {
    // Add your logout logic here
    console.log("Logging out...");
    // Example: window.location.href = "/login";
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
            <div className="relative" ref={notificationsBtnRef}>
              <button
                onClick={() => {
                  setShowNotifications(!showNotifications);
                  setShowUserMenu(false);
                }}
                className="relative rounded-xl border border-slate-200 bg-white p-2 text-slate-700 transition hover:bg-slate-50"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white ring-2 ring-white">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>

              {/* Notifications Panel */}
              <NotificationsPanel
                isOpen={showNotifications}
                onClose={() => setShowNotifications(false)}
                notifications={notifications}
                onMarkAsRead={markAsRead}
                onMarkAllAsRead={markAllAsRead}
                onDelete={deleteNotification}
                anchorRef={notificationsBtnRef}
              />
            </div>

            {/* User Menu */}
            <div className="relative" ref={userMenuRef}>
              <button
                onClick={() => {
                  setShowUserMenu(!showUserMenu);
                  setShowNotifications(false);
                }}
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
                <div className="absolute right-0 top-12 z-50 w-72 rounded-xl border border-slate-200 bg-white shadow-2xl overflow-hidden">
                  <div className="border-b border-slate-100 p-4 bg-gradient-to-r from-blue-50 to-white">
                    <div className="flex items-center gap-3">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-blue-600 to-blue-700 text-base font-bold text-white">
                        {user.avatar}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{user.name}</p>
                        <p className="text-xs text-slate-500">{user.role}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{user.email}</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowProfileModal(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </button>
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowSecurityModal(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Shield className="h-4 w-4" />
                      Security
                    </button>
                    <button 
                      onClick={() => {
                        setShowUserMenu(false);
                        setShowSettingsModal(true);
                      }}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-slate-50 transition"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </button>
                    <div className="border-t border-slate-100 my-1" />
                    <button 
                      onClick={handleLogout}
                      className="flex w-full items-center gap-3 px-4 py-2.5 text-sm text-rose-600 hover:bg-rose-50 transition"
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

      {/* Modals */}
      <ProfileModal 
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
        user={user}
        onUpdate={handleUpdateProfile}
      />
      
      <SecurityModal 
        isOpen={showSecurityModal}
        onClose={() => setShowSecurityModal(false)}
        user={user}
      />
      
      <SettingsModal 
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        user={user}
        onUpdate={handleUpdateProfile}
      />


    </>
  );
}