import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="rounded-xl bg-blue-900 p-2">
            <ShieldCheck className="text-white" size={24} />
          </div>

          <div>
            <h1 className="text-lg font-bold text-slate-900">
              TraceCare Bharat
            </h1>
            <p className="text-xs text-slate-500">
              Pharmaceutical Traceability & PM-JAY Platform
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/signin")}
          className="rounded-xl bg-blue-900 px-6 py-3 font-semibold text-white transition hover:bg-blue-800"
        >
          Sign In
        </button>
      </div>
    </nav>
  );
}