import { CheckCircle2, CircleDot, Rocket, Sparkles } from "lucide-react";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SectionHeader from "./SectionHeader";

const steps = [
  "Drug Registration",
  "Manufacturer Licensed",
  "Medicine Batch Created",
  "Transferred to Pharmacy",
  "Dispensed to Citizen",
  "PM-JAY Claim Processed",
  "Compliance Audited",
];

const journeyPath =
  "M 0 120 C 130 60, 210 55, 330 100 S 500 185, 620 145 S 770 70, 900 125 S 1060 190, 1180 130";

export default function MedicineJourneySection() {
  const sectionRef = useRef(null);

  const hasEnteredView = useInView(sectionRef, {
    once: true,
    amount: 0.35,
  });

  return (
    <section className="relative overflow-hidden bg-white py-12 sm:py-20 lg:py-24">
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          center
          eyebrow="Medicine journey"
          title="Trace the complete medicine lifecycle"
          description="A structured journey helps stakeholders understand where a medicine came from, who handled it and what compliance events were recorded."
        />

        <div
          ref={sectionRef}
          className="relative mt-8 sm:mt-12 lg:mt-14 overflow-hidden rounded-2xl sm:rounded-[2rem] border border-blue-100 bg-[#07111f] shadow-[0_30px_90px_rgba(15,23,42,0.22)]"
        >
          {/* Background glow */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute inset-x-0 bottom-0 h-44 bg-[radial-gradient(circle_at_bottom,rgba(37,99,235,0.22),transparent_65%)]" />
            <div className="absolute left-[12%] top-10 h-44 w-44 rounded-full bg-blue-500/15 blur-3xl" />
            <div className="absolute right-[8%] top-12 h-44 w-44 rounded-full bg-indigo-500/15 blur-3xl" />
            <div className="absolute left-[45%] bottom-0 h-56 w-56 rounded-full bg-cyan-500/10 blur-3xl" />

            <div className="absolute left-[8%] top-[16%] h-1 w-1 rounded-full bg-white/20" />
            <div className="absolute left-[18%] top-[10%] h-1 w-1 rounded-full bg-blue-300/40" />
            <div className="absolute left-[30%] top-[22%] h-1 w-1 rounded-full bg-white/20" />
            <div className="absolute left-[46%] top-[12%] h-1 w-1 rounded-full bg-indigo-300/40" />
            <div className="absolute left-[62%] top-[20%] h-1 w-1 rounded-full bg-white/20" />
            <div className="absolute left-[80%] top-[14%] h-1 w-1 rounded-full bg-blue-300/40" />
            <div className="absolute left-[88%] top-[26%] h-1 w-1 rounded-full bg-white/20" />
          </div>

          <div className="relative px-4 py-8 sm:px-8 lg:px-10 lg:py-10">
            <div className="mb-6 flex items-center gap-3">
              <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-blue-200 backdrop-blur-sm">
                <Sparkles className="h-4 w-4" />
              </div>

              <div>
                <p className="text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-blue-200">
                  Medicine Lifecycle Timeline
                </p>
                <p className="mt-1 max-w-2xl text-[11px] sm:text-sm leading-relaxed sm:leading-6 text-white/60">
                  A connected traceability journey from registration to compliance audit.
                </p>
              </div>
            </div>

            {/* Desktop timeline */}
            <div className="relative mt-8 hidden h-[390px] lg:block">
              <svg
                viewBox="0 0 1200 520"
                className="absolute inset-0 h-full w-full"
                preserveAspectRatio="none"
              >
                <defs>
                  <linearGradient
                    id="medicineJourneyPathGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="0%"
                  >
                    <stop offset="0%" stopColor="#DBEAFE" />
                    <stop offset="20%" stopColor="#93C5FD" />
                    <stop offset="45%" stopColor="#60A5FA" />
                    <stop offset="70%" stopColor="#38BDF8" />
                    <stop offset="100%" stopColor="#2563EB" />
                  </linearGradient>

                  <filter id="medicineJourneyGlow">
                    <feGaussianBlur stdDeviation="4" result="blur" />
                    <feMerge>
                      <feMergeNode in="blur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Base path */}
                <path
                  id="medicineJourneyMainPath"
                  d={journeyPath}
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="14"
                  strokeLinecap="round"
                />

                {/* Animated glowing path */}
                <motion.path
                  d={journeyPath}
                  fill="none"
                  stroke="url(#medicineJourneyPathGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  filter="url(#medicineJourneyGlow)"
                  initial={{ pathLength: 0, opacity: 1 }}
                  animate={
                    hasEnteredView
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 1 }
                  }
                  transition={{ duration: 3.2, ease: "easeInOut" }}
                />

                {/* Rocket now follows the exact same SVG path */}
                {hasEnteredView && (
                  <g key="medicine-journey-rocket">
                    <animateMotion
                      dur="3.2s"
                      fill="freeze"
                      rotate="auto"
                      calcMode="spline"
                      keyTimes="0;1"
                      keySplines="0.42 0 0.58 1"
                    >
                      <mpath href="#medicineJourneyMainPath" />
                    </animateMotion>

                    <foreignObject x="-20" y="-20" width="40" height="40">
                      <div
                        xmlns="http://www.w3.org/1999/xhtml"
                        className="relative flex h-10 w-10 items-center justify-center"
                      >
                        <div className="absolute inset-0 rounded-full bg-blue-400/25 blur-xl" />
                        <div className="relative rounded-full border border-white/10 bg-white/10 p-2 text-blue-100 shadow-[0_0_30px_rgba(59,130,246,0.35)] backdrop-blur-sm">
                          <Rocket className="h-5 w-5" />
                        </div>
                      </div>
                    </foreignObject>
                  </g>
                )}

                {/* Vertical guide lines */}
                <line
                  x1="95"
                  y1="92"
                  x2="95"
                  y2="410"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
                <line
                  x1="250"
                  y1="72"
                  x2="250"
                  y2="410"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
                <line
                  x1="410"
                  y1="138"
                  x2="410"
                  y2="410"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
                <line
                  x1="590"
                  y1="154"
                  x2="590"
                  y2="410"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
                <line
                  x1="765"
                  y1="92"
                  x2="765"
                  y2="410"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
                <line
                  x1="960"
                  y1="142"
                  x2="960"
                  y2="410"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
                <line
                  x1="1100"
                  y1="158"
                  x2="1100"
                  y2="410"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="1"
                />
              </svg>

              {/* Timeline nodes */}
              {[
                { left: "7.4%", top: "17%", delay: 0.35 },
                { left: "20.2%", top: "13%", delay: 0.75 },
                { left: "33.6%", top: "26%", delay: 1.15 },
                { left: "48.8%", top: "29%", delay: 1.55 },
                { left: "63.2%", top: "16.5%", delay: 1.95 },
                { left: "79.6%", top: "26.5%", delay: 2.35 },
                { left: "91.2%", top: "29.5%", delay: 2.75 },
              ].map((node, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={
                    hasEnteredView
                      ? { scale: 1, opacity: 1 }
                      : { scale: 0.6, opacity: 0 }
                  }
                  transition={{
                    delay: hasEnteredView ? node.delay : 0,
                    duration: 0.4,
                  }}
                  className="absolute"
                  style={{ left: node.left, top: node.top }}
                >
                  <div className="relative">
                    <div className="absolute inset-0 rounded-full bg-blue-400/30 blur-xl" />
                    <div className="relative flex h-5 w-5 items-center justify-center rounded-full border-2 border-white bg-white">
                      <div className="h-2.5 w-2.5 rounded-full bg-blue-600" />
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Step cards */}
              {steps.map((step, index) => {
                const positions = [
                  "left-[1%] top-[44%] w-[13%]",
                  "left-[14.5%] top-[44%] w-[14%]",
                  "left-[28.5%] top-[44%] w-[15%]",
                  "left-[43.5%] top-[44%] w-[18%]",
                  "left-[61%] top-[44%] w-[13%]",
                  "left-[74%] top-[44%] w-[13.5%]",
                  "left-[87.5%] top-[44%] w-[12.5%]",
                ];

                return (
                  <motion.div
                    key={step}
                    initial={{ y: 24, opacity: 0 }}
                    animate={
                      hasEnteredView
                        ? { y: 0, opacity: 1 }
                        : { y: 24, opacity: 0 }
                    }
                    transition={{
                      delay: hasEnteredView ? 0.35 + index * 0.22 : 0,
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className={`absolute ${positions[index]}`}
                  >
                    <div className="text-[2rem] font-semibold tracking-tight text-white/10">
                      {String(index + 1).padStart(2, "0")}
                    </div>

                    <div className="mt-2 inline-flex rounded-full bg-blue-500/10 px-3 py-1 text-xs font-semibold text-blue-200 ring-1 ring-blue-300/20">
                      Step {index + 1}
                    </div>

                    <h3 className="mt-3 text-[13px] font-semibold leading-5 text-white">
                      {step}
                    </h3>

                    <CheckCircle2
                      className="mt-4 text-emerald-300"
                      size={20}
                    />
                  </motion.div>
                );
              })}
            </div>

            {/* Mobile timeline */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 lg:hidden">
              {steps.map((step, index) => (
                <motion.div
                  key={step}
                  initial={{ y: 20, opacity: 0 }}
                  animate={
                    hasEnteredView
                      ? { y: 0, opacity: 1 }
                      : { y: 20, opacity: 0 }
                  }
                  transition={{
                    delay: hasEnteredView ? index * 0.08 : 0,
                    duration: 0.45,
                  }}
                  className="relative overflow-hidden rounded-xl sm:rounded-[1.5rem] border border-white/10 bg-white/5 p-4 sm:p-5 backdrop-blur-sm"
                >
                  <div className="mb-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-white/10 bg-white/10 text-blue-200">
                      <CircleDot className="h-4 w-4" />
                    </div>

                    <div className="inline-flex rounded-full bg-white/10 px-3.5 py-1.5 text-xs sm:text-sm font-semibold text-blue-100">
                      Step {index + 1}
                    </div>
                  </div>

                  <h3 className="text-base sm:text-lg font-semibold text-white">{step}</h3>

                  <CheckCircle2
                    className="mt-4 sm:mt-5 text-emerald-300"
                    size={22}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}