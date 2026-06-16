import { ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-200 bg-white/90 backdrop-blur-md">
      <div className="mx-auto flex flex-col gap-4 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6 sm:py-4 max-w-7xl">
        
        {/* Brand Logo & Title Area */}
        <div className="flex items-center gap-3">
          <div className="shrink-0 rounded-lg bg-blue-950 p-2 text-white shadow-sm md:rounded-xl">
            <ShieldCheck size={24} className="h-5 w-5 md:h-6 md:w-6" />
          </div>

          <div>
            <h1 className="text-base font-black tracking-tight text-slate-900 md:text-lg">
              TraceCare Bharat
            </h1>
            <p className="text-[10px] leading-tight text-slate-500 sm:text-xs">
              Pharmaceutical Traceability & PM-JAY Platform
            </p>
          </div>
        </div>

        {/* Action Button */}
        <div className="w-full sm:w-auto">
          <button
            onClick={() => navigate("/signin")}
            className="w-full min-w-[110px] rounded-lg bg-blue-950 px-5 py-2.5 text-sm font-medium text-white transition-all duration-200 hover:bg-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:w-auto md:px-6 md:py-2.5 md:text-base"
          >
            Sign In
          </button>
        </div>

      </div>
    </nav>
  );
}