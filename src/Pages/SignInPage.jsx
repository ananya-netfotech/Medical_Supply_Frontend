import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Factory,
  Building2,
  User,
  ArrowRight,
  LockKeyhole,
  CheckCircle2,
  ClipboardCheck,
  BadgeIndianRupee,
  Pill,
  Activity,
  Sparkles,
} from "lucide-react";

const roles = [
  {
    id: "REGULATORY_AUTHORITY",
    label: "Regulatory",
    fullLabel: "Regulatory Authority",
    description: "CDSCO / State Drug Control Authority",
    icon: ShieldCheck,
    route: "/dashboard/regulatory-authority",
    accent: "blue",
    title: "Regulatory access",
    text: "Review drug registration, licensing, compliance alerts, recall notices and audit-ready governance workflows.",
    fields: [
      { label: "Email / Mobile Number", placeholder: "Enter login ID", type: "text" },
      { label: "Password", placeholder: "Enter password", type: "password" },
      { label: "Authority Employee ID", placeholder: "CDSCO-EMP-001", type: "text" },
    ],
    highlights: ["Drug Registration", "License Oversight", "Compliance Monitoring"],
  },
  {
    id: "MANUFACTURER",
    label: "Manufacturer",
    fullLabel: "Manufacturer",
    description: "Licensed pharmaceutical manufacturer",
    icon: Factory,
    route: "/dashboard/manufacturer",
    accent: "emerald",
    title: "Manufacturer access",
    text: "Create medicine batches, manage licensed drug production, transfer inventory and maintain downstream traceability.",
    fields: [
      { label: "Email / Mobile Number", placeholder: "Enter login ID", type: "text" },
      { label: "Password", placeholder: "Enter password", type: "password" },
      { label: "Manufacturer License ID", placeholder: "LIC-MFG-CDSCO-2026-001", type: "text" },
    ],
    highlights: ["Batch Creation", "Inventory Transfer", "Recall Notices"],
  },
  {
    id: "PHARMACY_DISTRIBUTOR",
    label: "Pharmacy",
    fullLabel: "Pharmacy / Distributor",
    description: "Medicine inventory, dispensing and PM-JAY claims",
    icon: Building2,
    route: "/dashboard/pharmacy-distributor",
    accent: "amber",
    title: "Pharmacy / distributor access",
    text: "Track inventory, dispense medicines, submit PM-JAY claims, monitor expiry alerts and support medicine traceability.",
    fields: [
      { label: "Email / Mobile Number", placeholder: "Enter login ID", type: "text" },
      { label: "Password", placeholder: "Enter password", type: "password" },
      { label: "Pharmacy / Distributor License ID", placeholder: "LIC-PHR-STATE-2026-001", type: "text" },
    ],
    highlights: ["Inventory", "Dispensing", "PM-JAY Claims"],
  },
  {
    id: "CITIZEN",
    label: "Citizen",
    fullLabel: "Citizen",
    description: "Ayushman beneficiary medicine dashboard",
    icon: User,
    route: "/dashboard/citizen",
    accent: "rose",
    title: "Citizen access",
    text: "View medicines, PM-JAY claims, benefit visibility, recall alerts and future ABHA-linked health information.",
    fields: [
      { label: "Mobile / Login ID", placeholder: "Enter mobile or login ID", type: "text" },
      { label: "Password", placeholder: "Enter password", type: "password" },
      { label: "Aadhaar Last 4 Digits", placeholder: "1234", type: "text" },
      { label: "PM-JAY Beneficiary ID", placeholder: "PMJAY-2026-0001", type: "text" },
      { label: "ABHA ID Optional", placeholder: "14xxxxxxxxxx", type: "text" },
    ],
    highlights: ["My Medicines", "Claims", "Recall Alerts"],
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
  },
  emerald: {
    text: "text-emerald-700",
    bg: "bg-emerald-50",
    border: "border-emerald-200",
    gradient: "from-emerald-600 to-teal-600",
    ring: "focus:ring-emerald-100 focus:border-emerald-500",
    softRing: "ring-emerald-100",
  },
  amber: {
    text: "text-amber-700",
    bg: "bg-amber-50",
    border: "border-amber-200",
    gradient: "from-amber-600 to-orange-600",
    ring: "focus:ring-amber-100 focus:border-amber-500",
    softRing: "ring-amber-100",
  },
  rose: {
    text: "text-rose-700",
    bg: "bg-rose-50",
    border: "border-rose-200",
    gradient: "from-rose-600 to-pink-600",
    ring: "focus:ring-rose-100 focus:border-rose-500",
    softRing: "ring-rose-100",
  },
};

export default function SignInPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("REGULATORY_AUTHORITY");

  const activeRole = roles.find((role) => role.id === selectedRole) || roles[0];
  const ActiveIcon = activeRole.icon;
  const activeAccent = accentStyles[activeRole.accent];

  const handleLogin = () => {
    navigate(activeRole.route);
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white" />
        <div className="absolute -left-40 top-20 h-[30rem] w-[30rem] rounded-full bg-blue-100/80 blur-3xl" />
        <div className="absolute -right-40 bottom-20 h-[30rem] w-[30rem] rounded-full bg-indigo-100/70 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:42px_42px]" />
      </div>

      <section className="relative mx-auto grid min-h-screen max-w-7xl items-center gap-10 px-6 py-10 lg:grid-cols-[0.9fr_1.1fr] lg:px-8">
        {/* Brand / Context panel */}
        <div className="relative">
          <div className="mb-8 flex items-center gap-3">
            <div className="rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-700 p-3 text-white shadow-lg shadow-blue-700/20">
              <ShieldCheck className="h-7 w-7" />
            </div>

            <div>
            <h1 className="text-2xl font-semibold tracking-tight text-blue-950">
  TraceCare Bharat
</h1>
              <p className="text-sm font-medium text-slate-500">
                Pharmaceutical Traceability & PM-JAY Platform
              </p>
            </div>
          </div>

          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 text-sm font-semibold text-blue-900 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-4 w-4 text-blue-700" />
            Secure stakeholder access
          </div>

          <h2 className="mt-6 max-w-2xl text-4xl font-semibold leading-tight tracking-tight text-blue-950 sm:text-5xl lg:text-6xl">
  One platform.
  <span className="block bg-gradient-to-r from-blue-700 to-indigo-700 bg-clip-text text-transparent">
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
          <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-br from-blue-200/50 via-transparent to-indigo-200/50 blur-2xl" />

          <div className="relative overflow-hidden rounded-[2rem] border border-blue-100 bg-white p-[1px] shadow-[0_35px_100px_rgba(15,23,42,0.14)]">
            <div className="relative overflow-hidden rounded-[calc(2rem-1px)] bg-white p-6 sm:p-8">
              <div className="pointer-events-none absolute right-0 top-0 h-44 w-44 rounded-full bg-blue-100 blur-3xl opacity-80" />
              <div className="pointer-events-none absolute bottom-0 left-0 h-40 w-40 rounded-full bg-indigo-100 blur-3xl opacity-70" />

              <div className="relative z-10">
                <div className="mb-6 flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-blue-700">
                      Sign in
                    </p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight text-blue-950">
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
                  <div className="grid gap-2 sm:grid-cols-4">
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
                                : "bg-white text-slate-500 group-hover:text-blue-700"
                            }`}
                          >
                            <Icon className="h-5 w-5" />
                          </div>

                         <div
  className={`text-xs font-semibold ${
    isActive ? "text-blue-950" : "text-slate-500"
  }`}
>
  {role.label}
</div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Dynamic role summary */}
                <div
                  key={activeRole.id}
                  className={`mt-6 animate-roleChange rounded-3xl border ${activeAccent.border} ${activeAccent.bg} p-5`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`rounded-2xl bg-gradient-to-br ${activeAccent.gradient} p-3 text-white shadow-lg`}>
                      <ActiveIcon className="h-6 w-6" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between gap-3">
                       <h4 className="text-lg font-semibold text-blue-950">
  {activeRole.title}
</h4>

                        <CheckCircle2 className={`h-5 w-5 shrink-0 ${activeAccent.text}`} />
                      </div>

                      <p className="mt-2 text-sm leading-6 text-slate-600">
                        {activeRole.text}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {activeRole.highlights.map((item) => (
                          <span
                            key={item}
                            className="rounded-full border border-white/70 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inputs */}
                <div key={`fields-${activeRole.id}`} className="mt-6 grid gap-4 animate-roleChange">
                  {activeRole.fields.map((field) => (
                    <Input
                      key={field.label}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type}
                      accent={activeAccent}
                    />
                  ))}
                </div>

                <button
                  onClick={handleLogin}
                  className={`group mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gradient-to-r ${activeAccent.gradient} py-4 font-bold text-white shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl`}
                >
                  Continue as {activeRole.fullLabel}
                  <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

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

function Input({ label, placeholder, type = "text", accent }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-bold text-slate-700">
        {label}
      </span>

      <input
        type={type}
        placeholder={placeholder}
        className={`w-full rounded-2xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-medium text-slate-900 outline-none transition-all duration-300 placeholder:text-slate-400 focus:ring-4 ${accent.ring}`}
      />
    </label>
  );
}

function MiniCard({ icon: Icon, title, text }) {
  return (
    <div className="rounded-2xl border border-blue-100 bg-white/80 p-4 shadow-sm backdrop-blur-sm">
      <div className="mb-3 inline-flex rounded-xl bg-blue-50 p-2 text-blue-700">
        <Icon className="h-4 w-4" />
      </div>

      <h3 className="font-black text-slate-950">{title}</h3>
      <p className="mt-1 text-sm text-slate-500">{text}</p>
    </div>
  );
}