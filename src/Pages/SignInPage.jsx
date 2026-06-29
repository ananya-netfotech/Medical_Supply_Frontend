import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Factory,
  Building2,
  User,
  LockKeyhole,
  BadgeIndianRupee,
  Pill,
  Activity,
  Sparkles,
} from "lucide-react";

import RegulatorySignin from "../Components/SignInPage/RegulatorySignin";
import ManufacturerSignin from "../Components/SignInPage/ManufacturerSignin";
import PharmacySignin from "../Components/SignInPage/PharmacySignin";
import CitizenSignin from "../Components/SignInPage/CitizenSignin";

const roles = [
  {
    id: "REGULATORY_AUTHORITY",
    label: "Regulatory",
    icon: ShieldCheck,
    route: "/RegulatoryDashboard",
    accent: "blue",
  },
  {
    id: "MANUFACTURER",
    label: "Manufacturer",
    icon: Factory,
    route: "/Manufacturer",
    accent: "emerald",
  },
  {
    id: "PHARMACY_DISTRIBUTOR",
    label: "Pharmacy",
    icon: Building2,
    route: "/Pharmacy",
    accent: "purple",
  },
  {
    id: "CITIZEN",
    label: "Citizen",
    icon: User,
    route: "/dashboard/citizen",
    accent: "rose",
  },
];

const accentStyles = {
  blue: {
    text: "text-blue-700",
    bg: "bg-blue-50",
    border: "border-blue-200",
    gradient: "from-blue-700 to-indigo-700",
    ring: "focus:ring-blue-100 focus:border-blue-500",
    softRing: "ring-blue-100",
    badge: "bg-blue-100 text-blue-700",
  },
  emerald: {
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    gradient: "from-emerald-600 to-teal-600",
    ring: "focus:ring-emerald-100 focus:border-emerald-500",
    softRing: "ring-emerald-100",
    badge: "bg-emerald-100 text-emerald-700",
  },
  purple: {
    text: "text-purple-700",
    bg: "bg-purple-50",
    border: "border-purple-200",
    gradient: "from-purple-600 to-indigo-600",
    ring: "focus:ring-purple-100 focus:border-purple-500",
    softRing: "ring-purple-100",
    badge: "bg-purple-100 text-purple-700",
  },
  rose: {
    text: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    gradient: "from-rose-600 to-pink-600",
    ring: "focus:ring-rose-100 focus:border-rose-500",
    softRing: "ring-rose-100",
    badge: "bg-rose-100 text-rose-700",
  },
};

export default function SignInPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("REGULATORY_AUTHORITY");

  const activeRole = roles.find((role) => role.id === selectedRole) || roles[0];
  const activeAccent = accentStyles[activeRole.accent];

  const handleLogin = () => {
    navigate(activeRole.route);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-purple-50/40 to-white" />
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-purple-100/80 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-[30rem] w-[30rem] rounded-full bg-indigo-100/70 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-8 px-4 py-8 sm:gap-10 sm:px-6 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        {/* Brand / Context panel */}
        <div className="relative">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-600 p-3 text-white shadow-lg shadow-purple-700/20">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-purple-950">
                TraceCare Bharat
              </h1>
              <p className="text-sm font-medium text-slate-500">
                Pharmaceutical Traceability & PM-JAY Platform
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-purple-100 bg-white/80 px-4 py-2 text-sm font-semibold text-purple-900 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-purple-700" />
            Secure stakeholder access
          </div>

          <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-purple-950 sm:text-5xl lg:text-6xl">
            One platform.
            <span className="block bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
              Role-specific access.
            </span>
          </h2>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600">
            Select your stakeholder role to access the relevant dashboard,
            verification flow and operating context for medicine traceability,
            claims, benefits and compliance workflows.
          </p>

          <div className="mt-8 grid max-w-xl gap-3 sm:grid-cols-2">
            <MiniCard icon={ShieldCheck} title="Compliance" text="Regulatory oversight" />
            <MiniCard icon={Pill} title="Traceability" text="Medicine lifecycle" />
            <MiniCard icon={BadgeIndianRupee} title="PM-JAY" text="Claims and benefits" />
            <MiniCard icon={Activity} title="RBAC" text="Controlled role access" />
          </div>
        </div>

        {/* Access card */}
        <div className="relative">
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-purple-200/50 via-transparent to-indigo-200/50 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-purple-100 bg-white p-[1px] shadow-[0_35px_100px_rgba(15,23,42,0.14)]">
            <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-white p-4 sm:p-6 md:p-8">
              <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-purple-100 blur-3xl opacity-80" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-100 blur-3xl opacity-70" />

              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-purple-700">
                      Sign in
                    </p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight text-purple-950">
                      Access your workspace
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-slate-500">
                      Choose a role and continue into the relevant dashboard.
                    </p>
                  </div>

                  <div className={`hidden rounded-2xl ${activeAccent.bg} p-3 ${activeAccent.text} sm:block`}>
                    <LockKeyhole className="h-6 w-6" />
                  </div>
                </div>

                {/* Role selector */}
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-2">
                  <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                    {roles.map((role) => {
                      const Icon = role.icon;
                      const isActive = selectedRole === role.id;
                      const roleAccent = accentStyles[role.accent];

                      return (
                        <button
                          key={role.id}
                          type="button"
                          onClick={() => setSelectedRole(role.id)}
                          className={`group rounded-2xl px-3 py-3 text-center transition-all duration-300 ${
                            isActive
                              ? `bg-white shadow-md ring-1 ${roleAccent.softRing}`
                              : "hover:bg-white/70"
                          }`}
                        >
                          <div
                            className={`mx-auto mb-2 flex h-10 w-10 items-center justify-center rounded-xl transition-all duration-300 ${
                              isActive
                                ? `bg-gradient-to-br ${roleAccent.gradient} text-white shadow-lg`
                                : "bg-white text-slate-500 group-hover:text-purple-700"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                          <div
                            className={`text-xs font-semibold ${
                              isActive ? "text-purple-950" : "text-slate-500"
                            }`}
                          >
                            {role.label}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic role summary, Inputs, and Continue Button */}
                {selectedRole === "REGULATORY_AUTHORITY" && <RegulatorySignin handleLogin={handleLogin} activeAccent={activeAccent} />}
                {selectedRole === "MANUFACTURER" && <ManufacturerSignin handleLogin={handleLogin} activeAccent={activeAccent} />}
                {selectedRole === "PHARMACY_DISTRIBUTOR" && <PharmacySignin handleLogin={handleLogin} activeAccent={activeAccent} />}
                {selectedRole === "CITIZEN" && <CitizenSignin handleLogin={handleLogin} activeAccent={activeAccent} />}

                <p className="mt-4 text-center text-xs leading-5 text-slate-400">
                  MVP demo flow. OAuth 2.0 / OIDC and backend authentication can be integrated later.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <style>{`
        @keyframes roleChange {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-roleChange {
          animation: roleChange 0.28s ease-out both;
        }
      `}</style>
    </main>
  );
}

function MiniCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-purple-100 bg-white/80 p-3 sm:p-4 shadow-sm backdrop-blur-sm">
      <div className="mb-2 sm:mb-3 inline-flex rounded-xl bg-purple-50 p-2 text-purple-700">
        <Icon className="h-4 w-4" />
      </div>

      <h3 className="font-black text-slate-950">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}