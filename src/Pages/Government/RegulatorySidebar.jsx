import { LogOut, ShieldCheck, Stethoscope, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { regulatoryNavigation } from "./regulatoryNavigation";

export default function RegulatorySidebar({
  activeModule,
  setActiveModule,
  sidebarOpen,
  setSidebarOpen,
}) {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/signin");
  };

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[310px] flex-col border-r border-blue-100 bg-white transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <div className="relative overflow-hidden border-b border-blue-100 px-5 py-5">
        <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-blue-100 blur-3xl" />

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-blue-500/25 blur-xl" />
              <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-700 to-indigo-700 text-white shadow-lg shadow-blue-700/20">
                <ShieldCheck className="h-6 w-6" />
              </div>
            </div>

            <div>
              <h1 className="text-lg font-semibold tracking-tight text-blue-950">
                TraceCare Bharat
              </h1>
              <p className="text-xs font-medium text-slate-500">
                Regulatory Authority
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setSidebarOpen(false)}
            className="rounded-xl p-2 text-slate-500 hover:bg-slate-100 lg:hidden"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="px-4 py-4">
        <div className="rounded-2xl border border-blue-100 bg-blue-50/70 p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-blue-700 shadow-sm">
              <Stethoscope className="h-5 w-5" />
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-blue-700">
                Authority Console
              </p>
              <p className="mt-1 text-sm font-semibold text-blue-950">
                CDSCO / State Drug Control
              </p>
            </div>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto px-4 pb-4">
        {regulatoryNavigation.map((item) => {
          const Icon = item.icon;
          const isActive = activeModule === item.id;

          return (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setActiveModule(item.id);
                setSidebarOpen(false);
              }}
              className={`group relative w-full overflow-hidden rounded-2xl border px-4 py-3 text-left transition-all duration-300 ${
                isActive
                  ? "border-blue-200 bg-blue-50 shadow-sm"
                  : "border-transparent hover:border-blue-100 hover:bg-slate-50"
              }`}
            >
              <div
                className={`absolute inset-y-3 left-0 w-1 rounded-r-full bg-gradient-to-b from-blue-700 to-indigo-700 transition-opacity ${
                  isActive ? "opacity-100" : "opacity-0"
                }`}
              />

              <div className="flex items-start gap-3">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all ${
                    isActive
                      ? "bg-gradient-to-br from-blue-700 to-indigo-700 text-white shadow-md shadow-blue-700/20"
                      : "bg-slate-100 text-slate-500 group-hover:bg-blue-50 group-hover:text-blue-700"
                  }`}
                >
                  <Icon className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p
                    className={`text-sm font-semibold ${
                      isActive ? "text-blue-950" : "text-slate-800"
                    }`}
                  >
                    {item.label}
                  </p>
                  <p className="mt-0.5 line-clamp-1 text-xs leading-5 text-slate-500">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </nav>

      <div className="border-t border-blue-100 p-4">
        <button
          type="button"
          onClick={handleLogout}
          className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-600 transition hover:border-red-100 hover:bg-red-50 hover:text-red-600"
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </button>
      </div>
    </aside>
  );
}