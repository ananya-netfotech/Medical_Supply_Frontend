import {
  ClipboardCheck,
  HeartPulse,
  ShieldCheck,
  Truck,
  TrendingUp,
  Award,
  Globe,
  CheckCircle2,
  Lock,
  KeyRound,
} from "lucide-react";
import { useState } from "react";
import { motion } from "framer-motion";

const reasons = [
  {
    title: "Regulatory Compliance",
    description:
      "Support monitoring of licensed manufacturers, medicine movement, batch status and recall actions with real-time compliance tracking.",
    icon: ShieldCheck,
    gradient: "from-blue-600 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    stat: "99.9%",
    statLabel: "Compliance Rate",
  },
  {
    title: "Citizen Trust",
    description:
      "Provide authenticated citizens with visibility into medicines received through authorized channels and supply chain verification.",
    icon: HeartPulse,
    gradient: "from-rose-600 to-pink-600",
    bgGradient: "from-rose-50 to-pink-50",
    stat: "100M+",
    statLabel: "Citizens Served",
  },
  {
    title: "Healthcare Governance",
    description:
      "Enable PM-JAY claim visibility, beneficiary monitoring and healthcare scheme oversight with transparent audit trails.",
    icon: ClipboardCheck,
    gradient: "from-emerald-600 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
    stat: "₹50K Cr+",
    statLabel: "Claims Processed",
  },
  {
    title: "Supply Chain Transparency",
    description:
      "Track medicines from manufacturer to dispensing point using batch, lot and ownership records with end-to-end visibility.",
    icon: Truck,
    gradient: "from-orange-600 to-amber-600",
    bgGradient: "from-orange-50 to-amber-50",
    stat: "24/7",
    statLabel: "Real-time Tracking",
  },
];

const platformStats = [
  { value: "500+", label: "Manufacturers", icon: Award },
  { value: "50K+", label: "Pharmacies", icon: Globe },
  { value: "100M+", label: "Transactions", icon: CheckCircle2 },
  { value: "28 States", label: "Pan-India Coverage", icon: TrendingUp },
];

const containerVariants = {
  closed: {
    transition: {
      staggerChildren: 0.04,
      staggerDirection: -1,
    },
  },
  open: {
    transition: {
      delayChildren: 0.12,
      staggerChildren: 0.08,
    },
  },
};

const cardVariants = {
  closed: {
    opacity: 0,
    y: -40,
    scale: 0.88,
    filter: "blur(10px)",
    transition: {
      duration: 0.42,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  open: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.55,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

function ReasonCard({ item }) {
  const Icon = item.icon;

  return (
    <motion.div variants={cardVariants}>
      <div className="group relative h-full overflow-hidden rounded-[1.5rem] border border-blue-100 bg-white/95 p-[1px] shadow-[0_12px_40px_rgba(15,23,42,0.08)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_60px_rgba(37,99,235,0.14)]">
        <div className="relative h-full rounded-[calc(1.5rem-1px)] bg-[linear-gradient(180deg,#FFFFFF_0%,#F8FAFC_100%)] p-6">
          <div className="pointer-events-none absolute right-0 top-0 h-20 w-20 rounded-full bg-blue-100 blur-2xl opacity-80" />
          <div className="pointer-events-none absolute bottom-0 left-0 h-16 w-16 rounded-full bg-indigo-50 blur-2xl opacity-90" />
          <div className="pointer-events-none absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

          <div className="relative z-10">
            <div className="mb-5 flex items-center justify-between">
              <div
                className={`inline-flex rounded-2xl bg-gradient-to-br ${item.bgGradient} p-3 ring-1 ring-blue-100 transition-all duration-300 group-hover:scale-110`}
              >
                <Icon className="h-6 w-6 text-blue-700" />
              </div>

              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-blue-200" />
                <span className="h-2 w-2 rounded-full bg-blue-300" />
                <span className="h-2 w-2 rounded-full bg-indigo-300" />
              </div>
            </div>

            <h3 className="text-xl font-bold leading-7 text-slate-900">
              {item.title}
            </h3>

            <p className="mt-3 text-sm leading-7 text-slate-600">
              {item.description}
            </p>

            <div className="mt-5 flex items-center gap-2">
              <div className={`h-1 w-8 rounded-full bg-gradient-to-r ${item.gradient}`} />
              <span className="text-xs font-semibold text-slate-500">
                {item.stat} {item.statLabel}
              </span>
            </div>
          </div>

          <div className="pointer-events-none absolute bottom-3 right-3 opacity-0 transition-opacity duration-300 group-hover:opacity-10">
            <Icon className="h-14 w-14 text-blue-700" />
          </div>

          <div className="pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100">
            <div className="absolute inset-y-0 left-[-30%] w-[40%] rotate-12 bg-white/40 blur-2xl" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function StatCard({ stat }) {
  const Icon = stat.icon;

  return (
    <motion.div variants={cardVariants}>
      <div className="group relative overflow-hidden rounded-2xl border border-blue-100 bg-white/95 p-6 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(37,99,235,0.12)]">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/0 to-indigo-600/0 transition-all group-hover:from-blue-600/5 group-hover:to-indigo-600/5" />
        <Icon className="relative z-10 mx-auto mb-3 h-8 w-8 text-blue-600 opacity-70" />
        <div className="relative z-10 text-2xl font-black text-slate-900">
          {stat.value}
        </div>
        <div className="relative z-10 mt-1 text-xs font-medium text-slate-500">
          {stat.label}
        </div>
      </div>
    </motion.div>
  );
}

export default function WhyPlatformSection() {
  const [isUnlocked, setIsUnlocked] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/30 py-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-400/5 blur-3xl" />
        <div className="absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-grid-pattern opacity-5" />
      </div>

      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-blue-600 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 px-4 py-1.5 shadow-sm backdrop-blur-sm">
            <TrendingUp size={14} className="text-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-900">
              Why This Platform
            </span>
          </div>

<h2 className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text pb-4 text-3xl font-black leading-tight  sm:text-4xl sm:leading-tight lg:text-5xl lg:leading-tight">
  Why India needs end-to-end
  <span className="relative mt-2 block pb-3">
    medicine traceability
    <svg
      className="absolute bottom-0 left-0 right-0 h-2 w-full"
      viewBox="0 0 200 8"
      preserveAspectRatio="none"
    >
      <path
        d="M0 4 Q 50 8 100 4 Q 150 0 200 4"
        stroke="#3B82F6"
        strokeWidth="2"
        fill="none"
        className="opacity-40"
      />
    </svg>
  </span>
</h2>

          <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
            The platform is designed to improve operational visibility across pharmaceutical supply,
            healthcare benefit usage and compliance workflows.
          </p>
        </div>

        <div className="relative mx-auto mt-16 max-w-6xl">
          <div className="relative flex flex-col items-center">
            <motion.div
              animate={{
                scale: isUnlocked ? 1.08 : 1,
                opacity: isUnlocked ? 1 : 0.85,
              }}
              transition={{ duration: 0.45 }}
              className="absolute top-[-78px] h-[260px] w-[260px] rounded-full border border-blue-200"
            />

            <motion.div
              animate={{
                scale: isUnlocked ? 1.16 : 1,
                rotate: isUnlocked ? 16 : 0,
                opacity: isUnlocked ? 1 : 0.75,
              }}
              transition={{ duration: 0.7 }}
              className="absolute top-[-48px] h-[190px] w-[190px] rounded-full border border-dashed border-blue-950"
            />

            <motion.div
              animate={{
                opacity: isUnlocked ? 1 : 0.65,
                scale: isUnlocked ? 1.12 : 1,
              }}
              transition={{ duration: 0.6 }}
              className="absolute top-[-18px] h-[130px] w-[130px] rounded-full bg-[radial-gradient(circle,rgba(37,99,235,0.16),transparent_70%)]"
            />

            <div className="relative z-20 flex flex-col items-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-blue-500/20 blur-3xl" />

                <button
                  type="button"
                  onClick={() => setIsUnlocked((prev) => !prev)}
                  className="relative flex items-center justify-center focus:outline-none"
                  aria-label={
                    isUnlocked
                      ? "Lock platform advantages"
                      : "Unlock platform advantages"
                  }
                >
                  <div className="relative">
                    <motion.div
                      animate={
                        isUnlocked
                          ? { rotate: -24, x: -16, y: -8 }
                          : { rotate: 0, x: 0, y: 0 }
                      }
                      transition={{ duration: 0.45, ease: "easeOut" }}
                      className="absolute left-1/2 top-[-18px] z-20 h-16 w-16 -translate-x-1/2 rounded-t-[999px] border-[10px] border-b-0 border-blue-800 bg-transparent"
                    />

                    <motion.div
                      animate={{
                        scale: isUnlocked ? 1.03 : 1,
                        boxShadow: isUnlocked
                          ? "0 25px 60px rgba(37,99,235,0.18)"
                          : "0 20px 50px rgba(15,23,42,0.12)",
                      }}
                      transition={{ duration: 0.35 }}
                      className="relative flex h-32 w-32 items-center justify-center rounded-[2rem] border border-blue-100 bg-[linear-gradient(180deg,#FFFFFF_0%,#EFF6FF_100%)]"
                    >
                      <div className="absolute inset-x-6 top-4 h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />

                      <motion.div
                        animate={{
                          rotate: isUnlocked ? -8 : 0,
                          scale: isUnlocked ? 1.05 : 1,
                        }}
                        transition={{ duration: 0.35 }}
                      >
                        <Lock className="h-9 w-9 text-blue-800" />
                      </motion.div>
                    </motion.div>
                  </div>
                </button>
              </div>

              <motion.p className="mt-8 text-sm font-medium text-slate-600">
                {isUnlocked
                  ? "Click lock to secure everything back inside"
                  : "Click the lock to unlock platform advantages"}
              </motion.p>

              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <div className="rounded-2xl border border-blue-100 bg-white/95 px-4 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="h-4 w-4 text-blue-700" />
                    <span className="text-xs font-medium text-slate-900">
                      Compliance Ready
                    </span>
                  </div>
                </div>

                <div className="rounded-2xl border border-blue-100 bg-white/95 px-4 py-2 shadow-[0_12px_30px_rgba(15,23,42,0.08)] backdrop-blur">
                  <div className="flex items-center gap-2">
                    <KeyRound className="h-4 w-4 text-blue-700" />
                    <span className="text-xs font-medium text-slate-900">
                      End-to-End Visibility
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <motion.div
              initial={false}
              animate={{
                height: isUnlocked ? "auto" : 0,
                opacity: isUnlocked ? 1 : 0,
                marginTop: isUnlocked ? 56 : 0,
              }}
              transition={{
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="relative z-10 w-full overflow-hidden"
            >
              <motion.div
                variants={containerVariants}
                initial="closed"
                animate={isUnlocked ? "open" : "closed"}
              >
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {platformStats.map((stat) => (
                    <StatCard key={stat.label} stat={stat} />
                  ))}
                </div>

                <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                  {reasons.map((item) => (
                    <ReasonCard key={item.title} item={item} />
                  ))}
                </div>

              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}