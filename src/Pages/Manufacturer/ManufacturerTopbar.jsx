import {
  Bell,
  Search,
  UserCircle2,
} from "lucide-react";

export default function ManufacturerTopbar() {
  return (
    <header className="h-20 bg-white border-b px-8 flex items-center justify-between">

      <div>

        <h1 className="text-2xl font-bold text-slate-900">
          Manufacturer Dashboard
        </h1>

        <p className="text-sm text-slate-500">
          Manage medicine batches, inventory and compliance.
        </p>

      </div>

      <div className="flex items-center gap-4">

        <div className="relative">

          <Search
            size={18}
            className="absolute left-3 top-3 text-slate-400"
          />

          <input
            placeholder="Search batches..."
            className="pl-10 pr-4 py-2 border rounded-xl w-72"
          />

        </div>

        <button className="relative p-2 rounded-xl border hover:bg-slate-50">
          <Bell size={20} />

          <span className="absolute -top-1 -right-1 bg-red-500 h-5 w-5 rounded-full text-xs text-white flex items-center justify-center">
            3
          </span>
        </button>

        <div className="flex items-center gap-2 border rounded-xl px-3 py-2">

          <UserCircle2
            size={28}
            className="text-slate-600"
          />

          <div>
            <p className="text-sm font-semibold">
              Sun Pharma
            </p>

            <p className="text-xs text-slate-500">
              Manufacturer
            </p>
          </div>

        </div>

      </div>

    </header>
  );
}