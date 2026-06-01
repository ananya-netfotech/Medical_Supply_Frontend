import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-950 p-2 text-white">
            <ShieldCheck size={24} />
          </div>

          <div>
            <h1 className="text-lg font-black text-slate-900">
              TraceCare Bharat
            </h1>
            <p className="text-xs text-slate-500">
              Pharmaceutical Traceability & PM-JAY Platform
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/signin")}
          className="rounded-xl bg-blue-950 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}