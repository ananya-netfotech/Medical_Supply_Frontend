import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ShieldCheck,
  Factory,
  Building2,
  User,
  ArrowRight,
} from "lucide-react";

const roles = [
  {
    id: "REGULATORY_AUTHORITY",
    label: "Regulatory Authority",
    description: "CDSCO / State Drug Control Authority",
    icon: ShieldCheck,
  },
  {
    id: "MANUFACTURER",
    label: "Manufacturer",
    description: "Licensed pharmaceutical manufacturer",
    icon: Factory,
  },
  {
    id: "PHARMACY_DISTRIBUTOR",
    label: "Pharmacy / Distributor",
    description: "Medicine inventory, dispensing and PM-JAY claims",
    icon: Building2,
  },
  {
    id: "CITIZEN",
    label: "Citizen",
    description: "Ayushman beneficiary medicine dashboard",
    icon: User,
  },
];

export default function SignInPage() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState("REGULATORY_AUTHORITY");

  const handleLogin = () => {
    const routes = {
      REGULATORY_AUTHORITY: "/dashboard/regulatory-authority",
      MANUFACTURER: "/dashboard/manufacturer",
      PHARMACY_DISTRIBUTOR: "/dashboard/pharmacy-distributor",
      CITIZEN: "/dashboard/citizen",
    };

    navigate(routes[selectedRole]);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="grid min-h-screen lg:grid-cols-2">
        <div className="flex flex-col justify-center bg-blue-950 p-10 text-white lg:p-14">
          <div className="max-w-xl">
            <div className="mb-8 flex items-center gap-3">
              <div className="rounded-2xl bg-white/10 p-3">
                <ShieldCheck size={34} />
              </div>
              <div>
                <h1 className="text-3xl font-black">TraceCare Bharat</h1>
                <p className="text-sm text-blue-200">
                  Pharmaceutical Traceability & PM-JAY Platform
                </p>
              </div>
            </div>

            <h2 className="text-4xl font-black leading-tight lg:text-5xl">
              Secure access for India’s healthcare supply chain.
            </h2>

            <p className="mt-6 text-lg leading-relaxed text-blue-100">
              Access medicine traceability, Ayushman Bharat benefits, citizen
              medicine history, pharmaceutical compliance, claim monitoring and
              supply chain governance.
            </p>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <InfoCard title="CDSCO Ready" text="Regulatory workflows" />
              <InfoCard title="PM-JAY Enabled" text="Claims and benefits" />
              <InfoCard title="Traceability" text="Batch-level visibility" />
              <InfoCard title="Secure RBAC" text="Role-based access" />
            </div>
          </div>
        </div>

        <div className="flex items-center justify-center p-6 lg:p-10">
          <div className="w-full max-w-2xl rounded-3xl border bg-white p-8 shadow-xl lg:p-10">
            <div className="mb-8">
              <p className="text-sm font-bold uppercase tracking-wide text-blue-900">
                Sign In
              </p>
              <h2 className="mt-2 text-3xl font-black text-slate-900">
                Select your stakeholder role
              </h2>
              <p className="mt-2 text-slate-500">
                This is a static MVP login flow. Backend OAuth 2.0 / OIDC can be
                integrated later.
              </p>
            </div>

            <div className="mb-8 grid gap-4 md:grid-cols-2">
              {roles.map((role) => {
                const Icon = role.icon;
                const isActive = selectedRole === role.id;

                return (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => setSelectedRole(role.id)}
                    className={`rounded-2xl border p-4 text-left transition ${
                      isActive
                        ? "border-blue-900 bg-blue-50 shadow-sm"
                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`rounded-xl p-2 ${
                          isActive
                            ? "bg-blue-900 text-white"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        <Icon size={22} />
                      </div>

                      <div>
                        <h3 className="font-bold text-slate-900">
                          {role.label}
                        </h3>
                        <p className="mt-1 text-sm leading-5 text-slate-500">
                          {role.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="space-y-5">
              <Input label="Email / Mobile Number" placeholder="Enter login ID" />

              <Input
                label="Password"
                type="password"
                placeholder="Enter password"
              />

              {selectedRole === "REGULATORY_AUTHORITY" && (
                <Input
                  label="Authority Employee ID"
                  placeholder="CDSCO-EMP-001"
                />
              )}

              {selectedRole === "MANUFACTURER" && (
                <Input
                  label="Manufacturer License ID"
                  placeholder="LIC-MFG-CDSCO-2026-001"
                />
              )}

              {selectedRole === "PHARMACY_DISTRIBUTOR" && (
                <Input
                  label="Pharmacy / Distributor License ID"
                  placeholder="LIC-PHR-STATE-2026-001"
                />
              )}

              {selectedRole === "CITIZEN" && (
                <div className="rounded-3xl bg-slate-50 p-5">
                  <h3 className="mb-4 font-bold text-slate-900">
                    Citizen Verification
                  </h3>

                  <div className="grid gap-4 md:grid-cols-2">
                    <Input
                      label="Aadhaar Last 4 Digits"
                      placeholder="1234"
                    />

                    <Input
                      label="PM-JAY Beneficiary ID"
                      placeholder="PMJAY-2026-0001"
                    />

                    <div className="md:col-span-2">
                      <Input
                        label="ABHA ID (Optional)"
                        placeholder="14xxxxxxxxxx"
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>

            <button
              onClick={handleLogin}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-900 py-4 font-semibold text-white transition hover:bg-blue-800"
            >
              Continue
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Input({ label, placeholder, type = "text" }) {
  return (
    <div>
      <label className="mb-2 block font-medium text-slate-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-blue-700 focus:ring-2 focus:ring-blue-100"
      />
    </div>
  );
}

function InfoCard({ title, text }) {
  return (
    <div className="rounded-2xl bg-white/10 p-4">
      <h3 className="font-bold">{title}</h3>
      <p className="mt-1 text-sm text-blue-200">{text}</p>
    </div>
  );
}