import {
  Database,
  MonitorCog,
  Network,
  Search,
  Server,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { useEffect, useRef } from "react";
import { motion, useAnimation, useInView } from "framer-motion";

const layers = [
  { title: "Frontend", detail: "React + Next.js", icon: MonitorCog },
  { title: "Backend APIs", detail: "Node.js services", icon: Server },
  { title: "Database", detail: "PostgreSQL", icon: Database },
  { title: "Event Backbone", detail: "Apache Kafka", icon: Network },
  { title: "Search", detail: "OpenSearch", icon: Search },
  { title: "Governance", detail: "Audit-ready controls", icon: ShieldCheck },
];

function ArchitectureCard({
  layer,
  number,
  className = "",
  delay = 0,
  controls,
}) {
  const Icon = layer.icon;

  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, y: 28, scale: 0.96 },
        show: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: 0.55,
            delay,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      className={className}
    >
      <div className="group relative overflow-hidden rounded-2xl border border-blue-300/20 bg-white/[0.05] p-5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-300/40 hover:bg-white/[0.08]">
        <div className="pointer-events-none absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(147,197,253,0.14)_1px,transparent_1px),linear-gradient(to_bottom,rgba(147,197,253,0.14)_1px,transparent_1px)] bg-[size:16px_16px]" />
        </div>

        <div className="pointer-events-none absolute right-0 top-0 h-24 w-24 rounded-full bg-blue-400/10 blur-2xl" />
        <div className="pointer-events-none absolute bottom-0 left-0 h-20 w-20 rounded-full bg-indigo-400/10 blur-2xl" />

        <div className="relative flex items-start justify-between gap-4">
          <div className="flex-1">
            <div className="mb-4 inline-flex rounded-xl border border-blue-300/25 bg-gradient-to-br from-blue-700 to-indigo-700 p-3 shadow-lg shadow-blue-950/20 transition-all duration-300 group-hover:scale-110">
              <Icon className="h-5 w-5 text-white" />
            </div>

            <h3 className="text-lg font-bold text-white">{layer.title}</h3>

            <p className="mt-2 text-sm leading-relaxed text-blue-100/75">
              {layer.detail}
            </p>
          </div>

          <div className="text-3xl font-light leading-none text-blue-300/60">
            {number}
          </div>
        </div>

        <span className="absolute right-3 top-3 h-2 w-2 rounded-full border border-white/40" />
        <span className="absolute bottom-3 left-3 h-2 w-2 rounded-full border border-white/40" />
      </div>
    </motion.div>
  );
}

function AnimatedLine({
  className = "",
  delay = 0,
  controls,
  vertical = false,
}) {
  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: vertical
          ? { scaleY: 0, opacity: 0 }
          : { scaleX: 0, opacity: 0 },
        show: vertical
          ? {
              scaleY: 1,
              opacity: 1,
              transition: { duration: 0.45, delay, ease: "easeOut" },
            }
          : {
              scaleX: 1,
              opacity: 1,
              transition: { duration: 0.45, delay, ease: "easeOut" },
            },
      }}
      className={className}
      style={{
        transformOrigin: vertical ? "top center" : "left center",
      }}
    />
  );
}

function AnimatedArrow({ className = "", delay = 0, controls }) {
  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.6 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.25, delay, ease: "easeOut" },
        },
      }}
      className={className}
    />
  );
}

function AnimatedDot({ className = "", delay = 0, controls, style = {} }) {
  return (
    <motion.div
      initial="hidden"
      animate={controls}
      variants={{
        hidden: { opacity: 0, scale: 0.4 },
        show: {
          opacity: 1,
          scale: 1,
          transition: { duration: 0.25, delay, ease: "easeOut" },
        },
      }}
      className={className}
      style={style}
    />
  );
}

export default function ArchitectureSection() {
  const containerRef = useRef(null);

  const isInView = useInView(containerRef, {
    amount: 0.35,
    once: false,
  });

  const controls = useAnimation();

  useEffect(() => {
    if (isInView) {
      controls.start("show");
    } else {
      controls.set("hidden");
    }
  }, [isInView, controls]);

  return (
    <section className="relative overflow-hidden bg-white py-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div
          ref={containerRef}
          className="relative overflow-hidden rounded-[2rem] bg-[#07111f] px-6 py-10 text-white shadow-[0_30px_90px_rgba(15,23,42,0.22)] lg:px-8"
        >
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -left-24 -top-24 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl" />
            <div className="absolute -right-24 -bottom-24 h-72 w-72 rounded-full bg-indigo-500/10 blur-3xl" />
            <div className="absolute left-1/2 top-1/2 h-64 w-64 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-500/10 blur-3xl" />
            <div className="absolute inset-0 bg-[linear-gradient(rgba(147,197,253,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(147,197,253,0.045)_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 18 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.5, ease: "easeOut" },
              },
            }}
            className="relative z-10 mx-auto max-w-3xl text-center"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-300/20 bg-white/5 px-4 py-1.5 backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-200">
                Architecture
              </span>
            </div>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
              Secure, scalable and{" "}
              <span className="relative inline-block pb-2">
                event-driven architecture
                <svg
                  className="absolute bottom-0 left-0 w-full"
                  height="6"
                  viewBox="0 0 200 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 3C66.6667 1 133.333 1 200 3"
                    stroke="#93C5FD"
                    strokeWidth="2"
                    strokeDasharray="4 4"
                  />
                </svg>
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-blue-100/75 lg:text-base">
              The platform is designed with standard enterprise technologies for controlled access, traceability, analytics and operational monitoring.
            </p>

            <div className="mt-5 flex justify-center gap-1">
              <div className="h-1 w-1 rounded-full bg-blue-300" />
              <div className="h-1 w-1 rounded-full bg-blue-500" />
              <div className="h-1 w-1 rounded-full bg-white/40" />
            </div>
          </motion.div>

{/* Desktop workflow */}
<div className="relative z-10 mt-10 hidden lg:block">
  <div className="relative h-[640px]">
    <div className="pointer-events-none absolute inset-0">
      {/* Top row: 01 -> 02 */}
      <AnimatedLine
        controls={controls}
        delay={0.45}
        className="absolute left-[25%] top-[20%] h-px w-[12.5%] bg-blue-300/45"
      />
      <AnimatedArrow
        controls={controls}
        delay={0.82}
        className="absolute left-[37.1%] top-[19.45%] h-2 w-2 rotate-45 border-r border-t border-blue-300/55"
      />

      {/* Top row: 02 -> 03 */}
      <AnimatedLine
        controls={controls}
        delay={1.0}
        className="absolute left-[62.5%] top-[20%] h-px w-[12.5%] bg-blue-300/45"
      />
      <AnimatedArrow
        controls={controls}
        delay={1.37}
        className="absolute left-[74.6%] top-[19.45%] h-2 w-2 rotate-45 border-r border-t border-blue-300/55"
      />

      {/* Drop from 03 down to 04 */}
      <AnimatedLine
        controls={controls}
        delay={1.55}
        vertical
        className="absolute left-[87.5%] top-[30.5%] h-[26%] w-px bg-blue-300/45"
      />
      <AnimatedArrow
        controls={controls}
        delay={1.9}
        className="absolute left-[87.05%] top-[56%] h-2 w-2 rotate-45 border-r border-t border-blue-300/55"
      />

      {/* Bottom row: 04 -> 05 (right to left) */}
      <AnimatedLine
        controls={controls}
        delay={2.05}
        className="absolute left-[62.5%] top-[70%] h-px w-[12.5%] bg-blue-300/45"
      />
      <AnimatedArrow
        controls={controls}
        delay={2.4}
        className="absolute left-[62.1%] top-[69.45%] h-2 w-2 rotate-[225deg] border-r border-t border-blue-300/55"
      />

      {/* Bottom row: 05 -> 06 (right to left) */}
      <AnimatedLine
        controls={controls}
        delay={2.55}
        className="absolute left-[25%] top-[70%] h-px w-[12.5%] bg-blue-300/45"
      />
      <AnimatedArrow
        controls={controls}
        delay={2.9}
        className="absolute left-[24.6%] top-[69.45%] h-2 w-2 rotate-[225deg] border-r border-t border-blue-300/55"
      />

      {/* Nodes */}
      {[
        { left: "25%", top: "20%", delay: 0.4 },
        { left: "37.5%", top: "20%", delay: 0.85 },
        { left: "62.5%", top: "20%", delay: 0.95 },
        { left: "75%", top: "20%", delay: 1.4 },
        { left: "87.5%", top: "30.5%", delay: 1.7 },
        { left: "87.5%", top: "56.5%", delay: 1.95 },
        { left: "75%", top: "70%", delay: 2.2 },
        { left: "62.5%", top: "70%", delay: 2.45 },
        { left: "37.5%", top: "70%", delay: 2.7 },
        { left: "25%", top: "70%", delay: 3.0 },
      ].map((dot, index) => (
        <AnimatedDot
          key={index}
          controls={controls}
          delay={dot.delay}
          className="absolute h-2 w-2 rounded-full border border-white/60 bg-[#07111f]"
          style={{ left: dot.left, top: dot.top }}
        />
      ))}
    </div>

    {/* Top row */}
    <ArchitectureCard
      layer={layers[0]}
      number="01"
      delay={0.2}
      controls={controls}
      className="absolute left-0 top-[6%] w-[25%]"
    />

    <ArchitectureCard
      layer={layers[1]}
      number="02"
      delay={0.75}
      controls={controls}
      className="absolute left-[37.5%] top-[6%] w-[25%]"
    />

    <ArchitectureCard
      layer={layers[2]}
      number="03"
      delay={1.3}
      controls={controls}
      className="absolute left-[75%] top-[6%] w-[25%]"
    />

    {/* Bottom row */}
    <ArchitectureCard
      layer={layers[5]}
      number="06"
      delay={3.2}
      controls={controls}
      className="absolute left-0 top-[56%] w-[25%]"
    />

    <ArchitectureCard
      layer={layers[4]}
      number="05"
      delay={2.85}
      controls={controls}
      className="absolute left-[37.5%] top-[56%] w-[25%]"
    />

    <ArchitectureCard
      layer={layers[3]}
      number="04"
      delay={2.2}
      controls={controls}
      className="absolute left-[75%] top-[56%] w-[25%]"
    />
  </div>
</div>

          {/* Mobile workflow */}
          <div className="relative z-10 mt-8 grid gap-4 lg:hidden">
            {layers.map((layer, index) => (
              <ArchitectureCard
                key={layer.title}
                layer={layer}
                number={String(index + 1).padStart(2, "0")}
                controls={controls}
                delay={index * 0.12}
              />
            ))}
          </div>

          <motion.div
            initial="hidden"
            animate={controls}
            variants={{
              hidden: { opacity: 0, y: 14 },
              show: {
                opacity: 1,
                y: 0,
                transition: { duration: 0.45, delay: 0.35 },
              },
            }}
            className="relative z-10 mt-6 rounded-xl border border-blue-300/20 bg-white/[0.04] px-4 py-3 backdrop-blur-sm"
          >
            <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs font-medium uppercase tracking-wider text-blue-200">
              <span>Frontend</span>
              <span className="text-blue-400">→</span>
              <span>Node.js APIs</span>
              <span className="text-blue-400">→</span>
              <span>PostgreSQL</span>
              <span className="text-blue-400">→</span>
              <span>Kafka</span>
              <span className="text-blue-400">→</span>
              <span>OpenSearch</span>
              <span className="text-blue-400">→</span>
              <span>Monitoring</span>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}