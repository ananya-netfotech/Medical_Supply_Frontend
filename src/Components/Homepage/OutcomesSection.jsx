import { Eye, Gauge, ShieldCheck, UserCheck, Sparkles } from "lucide-react";
import { useAnimate } from "framer-motion";

const outcomes = [
  {
    title: "Improved Traceability",
    description:
      "Provide visibility into medicine movement through authorized stakeholders.",
    icon: Eye,
  },
  {
    title: "Better Compliance",
    description:
      "Support regulatory oversight, licensing checks, recalls and audit readiness.",
    icon: ShieldCheck,
  },
  {
    title: "Operational Efficiency",
    description:
      "Reduce manual tracking and improve access to medicine lifecycle information.",
    icon: Gauge,
  },
  {
    title: "Citizen Awareness",
    description:
      "Enable citizens to view their medicines, claims, benefits and recall alerts.",
    icon: UserCheck,
  },
];

const NO_CLIP = "polygon(0 0, 100% 0, 100% 100%, 0% 100%)";
const BOTTOM_RIGHT_CLIP = "polygon(0 0, 100% 0, 0 0, 0% 100%)";
const TOP_RIGHT_CLIP = "polygon(0 0, 0 100%, 100% 100%, 0% 100%)";
const BOTTOM_LEFT_CLIP = "polygon(100% 100%, 100% 0, 100% 100%, 0 100%)";
const TOP_LEFT_CLIP = "polygon(0 0, 100% 0, 100% 100%, 100% 0)";

const ENTRANCE_KEYFRAMES = {
  left: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  bottom: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  top: [BOTTOM_RIGHT_CLIP, NO_CLIP],
  right: [TOP_LEFT_CLIP, NO_CLIP],
};

const EXIT_KEYFRAMES = {
  left: [NO_CLIP, TOP_RIGHT_CLIP],
  bottom: [NO_CLIP, TOP_RIGHT_CLIP],
  top: [NO_CLIP, TOP_RIGHT_CLIP],
  right: [NO_CLIP, BOTTOM_LEFT_CLIP],
};

function OutcomeCard({ icon: Icon, title, description, index }) {
  const [scope, animate] = useAnimate();

  const getNearestSide = (e) => {
    const box = e.currentTarget.getBoundingClientRect();

    const sides = [
      { side: "left", proximity: Math.abs(box.left - e.clientX) },
      { side: "right", proximity: Math.abs(box.right - e.clientX) },
      { side: "top", proximity: Math.abs(box.top - e.clientY) },
      { side: "bottom", proximity: Math.abs(box.bottom - e.clientY) },
    ];

    return sides.sort((a, b) => a.proximity - b.proximity)[0].side;
  };

  const handleMouseEnter = (e) => {
    animate(scope.current, {
      clipPath: ENTRANCE_KEYFRAMES[getNearestSide(e)],
      transition: { duration: 0.3, ease: "easeOut" },
    });
  };

  const handleMouseLeave = (e) => {
    animate(scope.current, {
      clipPath: EXIT_KEYFRAMES[getNearestSide(e)],
      transition: { duration: 0.25, ease: "easeInOut" },
    });
  };

  return (
    <div
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group relative min-h-[230px] h-auto flex flex-col overflow-hidden rounded-[1.35rem] border border-blue-100 bg-gradient-to-b from-white to-blue-50/40 p-[1px] shadow-[0_10px_30px_rgba(15,23,42,0.06)] transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-[0_22px_55px_rgba(37,99,235,0.14)]"
      style={{
        animationDelay: `${index * 100}ms`,
        animation: "fadeInUp 0.55s ease-out forwards",
        opacity: 0,
      }}
    >
      {/* Default card */}
      <div className="relative z-10 flex-1 flex flex-col rounded-[calc(1.35rem-1px)] bg-white p-5 sm:p-6">
        <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-blue-100 blur-2xl opacity-80" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 rounded-full bg-indigo-50 blur-2xl opacity-90" />
        <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

        <div className="relative z-10 flex flex-1 flex-col">
          <div className="mb-5 flex items-center justify-between">
            <div className="inline-flex rounded-2xl bg-blue-50 p-3 text-blue-700 ring-1 ring-blue-100 transition-all duration-300 group-hover:scale-105 group-hover:bg-blue-100">
              <Icon className="h-6 w-6" />
            </div>

            <div className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-blue-200" />
              <span className="h-2 w-2 rounded-full bg-blue-300" />
              <span className="h-2 w-2 rounded-full bg-blue-500" />
            </div>
          </div>

          <div className="text-[2rem] font-black leading-none text-blue-600/10">
            {String(index + 1).padStart(2, "0")}
          </div>

          <h3 className="mt-3 text-xl font-black leading-tight text-slate-900">
            {title}
          </h3>

          <p className="mt-3 text-sm leading-relaxed text-slate-600">
            {description}
          </p>

          <div className="mt-auto pt-5">
            <div className="h-1 w-12 rounded-full bg-gradient-to-r from-blue-700 to-indigo-600" />
          </div>
        </div>
      </div>

      {/* Hover overlay */}
      <div
        ref={scope}
        style={{ clipPath: BOTTOM_RIGHT_CLIP }}
        className="absolute inset-0 z-20 flex flex-col bg-[linear-gradient(135deg,#1E3A8A_0%,#2563EB_48%,#312E81_100%)]"
      >
        <div className="relative flex-1 flex flex-col p-5 sm:p-6">
          <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/10 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-8 -left-8 h-28 w-28 rounded-full bg-blue-300/20 blur-2xl" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:28px_28px]" />

          <div className="relative z-10 flex flex-1 flex-col">
            <div className="mb-5 flex items-center justify-between">
              <div className="inline-flex rounded-2xl bg-white/10 p-3 text-white ring-1 ring-white/15 backdrop-blur-sm">
                <Icon className="h-6 w-6" />
              </div>

              <div className="h-2 w-2 rounded-full bg-white/80 shadow-[0_0_16px_rgba(255,255,255,0.55)]" />
            </div>

            <div className="text-[2rem] font-black leading-none text-white/15">
              {String(index + 1).padStart(2, "0")}
            </div>

            <h3 className="mt-3 text-xl font-black leading-tight text-white">
              {title}
            </h3>

            <p className="mt-3 text-sm leading-relaxed text-blue-50/85">
              {description}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function OutcomesSection() {
  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(circle_at_top,rgba(37,99,235,0.12),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-72 bg-[radial-gradient(circle_at_bottom,rgba(30,64,175,0.08),transparent_60%)]" />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(37,99,235,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(37,99,235,0.025)_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
            <Sparkles className="h-3.5 w-3.5 text-blue-700" />
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-900">
              Expected Outcomes
            </span>
          </div>

          <h2 className="relative mt-5 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
            Practical outcomes without{" "}
            <span className="relative inline-block pb-2">
              overclaiming
              <svg
                className="absolute bottom-0 left-0 w-full"
                height="6"
                viewBox="0 0 200 6"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 3C66.6667 1 133.333 1 200 3"
                  stroke="#2563EB"
                  strokeWidth="2"
                  strokeDasharray="4 4"
                />
              </svg>
            </span>
          </h2>

          <p className="mx-auto mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base leading-relaxed text-slate-600">
            The platform is designed to strengthen visibility and governance while avoiding unrealistic promises.
          </p>

          <div className="mt-6 flex justify-center gap-1">
            <div className="h-1 w-1 rounded-full bg-blue-400" />
            <div className="h-1 w-1 rounded-full bg-blue-600" />
            <div className="h-1 w-1 rounded-full bg-blue-950" />
          </div>
        </div>

        {/* Cards */}
        <div className="mt-8 sm:mt-12 lg:mt-14 grid gap-4 sm:gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map((item, index) => (
            <OutcomeCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              index={index}
            />
          ))}
        </div>

        {/* Bottom indicator */}
        <div className="mt-8 sm:mt-10 flex justify-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-3.5 py-1.5 sm:px-4 sm:py-2 shadow-sm">
            <div className="h-1.5 w-1.5 rounded-full bg-blue-700" />
            <span className="text-[10px] sm:text-xs font-medium text-slate-600">
              Four practical governance outcomes
            </span>
            <div className="h-1.5 w-1.5 rounded-full bg-blue-700" />
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(22px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}