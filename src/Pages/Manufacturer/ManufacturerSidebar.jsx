import { NavLink } from "react-router-dom";
import { Factory } from "lucide-react";
import manufacturerNavigation from "./manufacturerNavigation";

export default function ManufacturerSidebar() {
  return (
    <aside className="w-72 bg-slate-950 text-white flex flex-col">

      <div className="border-b border-slate-800 p-6">

        <div className="flex items-center gap-3">

          <div className="bg-blue-900 p-3 rounded-xl">
            <Factory size={24} />
          </div>

          <div>
            <h2 className="font-bold text-lg">
              Manufacturer Portal
            </h2>

            <p className="text-xs text-slate-400">
              Pharmaceutical Operations
            </p>
          </div>

        </div>

      </div>

      <div className="flex-1 overflow-y-auto py-4">

        {manufacturerNavigation.map((item) => {
          const Icon = item.icon;

          return (
            <NavLink
              key={item.title}
              to={item.path}
              className={({ isActive }) =>
                `mx-3 mb-2 flex items-center gap-3 rounded-xl px-4 py-3 transition
                 ${
                   isActive
                     ? "bg-blue-900 text-white"
                     : "text-slate-300 hover:bg-slate-800"
                 }`
              }
            >
              <Icon size={20} />

              <span className="text-sm font-medium">
                {item.title}
              </span>
            </NavLink>
          );
        })}
      </div>

      <div className="border-t border-slate-800 p-4">
        <div className="rounded-xl bg-slate-900 p-4">
          <p className="text-xs text-slate-400">
            Logged In As
          </p>

          <p className="font-semibold">
            Sun Pharma
          </p>
        </div>
      </div>

    </aside>
  );
}