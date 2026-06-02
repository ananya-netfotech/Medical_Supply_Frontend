import {
  BadgeIndianRupee,
  FileCheck2,
  HeartPulse,
  Link2,
  Sparkles,
} from "lucide-react";
import styled from "styled-components";
import { motion } from "framer-motion";

const items = [
  {
    title: "Beneficiary Visibility",
    description:
      "Track citizen medicine history, scheme status and utilization visibility for authenticated beneficiaries.",
    icon: HeartPulse,
  },
  {
    title: "Claims Monitoring",
    description:
      "Monitor submitted, approved, rejected and settled PM-JAY claim records.",
    icon: BadgeIndianRupee,
  },
  {
    title: "Coverage Governance",
    description:
      "Support medicine coverage, benefit usage and reimbursement workflow configuration.",
    icon: FileCheck2,
  },
  {
    title: "Future ABDM Readiness",
    description:
      "Architecture prepared for future ABHA and ABDM integration without claiming live integration.",
    icon: Link2,
  },
];

const heights = [
  "h-[235px] sm:h-[255px] lg:h-[275px]",
  "h-[255px] sm:h-[275px] lg:h-[295px]",
  "h-[275px] sm:h-[295px] lg:h-[315px]",
  "h-[295px] sm:h-[315px] lg:h-[335px]",
];

const StyledWrap = styled.section`
  .pillar-shell {
    position: relative;
    padding-top: 3.8rem;
  }

  .pillar-number {
    position: absolute;
    top: 0;
    left: 50%;
    z-index: 20;
    transform: translateX(-50%);
    pointer-events: none;
    font-size: 3.2rem;
    line-height: 1;
    font-weight: 800;
    letter-spacing: -0.03em;
    color: rgba(37, 99, 235, 0.22);
  }

  .pillar-card {
    position: relative;
    overflow: hidden;
    border-radius: 1.6rem 1.6rem 0 0;
    border: 1px solid rgba(191, 219, 254, 0.9);
    background: linear-gradient(
      180deg,
      #ffffff 0%,
      #eff6ff 38%,
      #dbeafe 100%
    );
    box-shadow: 0 24px 50px rgba(37, 99, 235, 0.12);
    transition: box-shadow 0.35s ease, transform 0.35s ease;
  }

  .pillar-card:hover {
    transform: translateY(-6px);
    box-shadow: 0 34px 80px rgba(37, 99, 235, 0.18);
  }

  .pillar-card::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.9) 0%,
      rgba(239, 246, 255, 0.45) 35%,
      rgba(37, 99, 235, 0.08) 100%
    );
    pointer-events: none;
  }

  .pillar-card::after {
    content: "";
    position: absolute;
    left: 0;
    top: 0;
    width: 22%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.85) 0%,
      rgba(191, 219, 254, 0.35) 55%,
      rgba(255, 255, 255, 0) 100%
    );
    pointer-events: none;
  }

  .pillar-inner {
    position: relative;
    z-index: 2;
    display: flex;
    height: 100%;
    flex-direction: column;
    padding: 1.4rem 1rem 0.9rem;
  }

  .pillar-kicker {
    font-size: 0.72rem;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: #2563eb;
  }

  .pillar-title {
    margin-top: 0.8rem;
    font-size: 1.22rem;
    line-height: 1.15;
    font-weight: 800;
    color: #0f172a;
  }

  .pillar-divider {
    margin-top: 1rem;
    height: 1px;
    width: 100%;
    background: linear-gradient(
      90deg,
      rgba(37, 99, 235, 0.35),
      rgba(147, 197, 253, 0.12)
    );
  }

  .pillar-text {
    margin-top: 1rem;
    font-size: 0.9rem;
    line-height: 1.68;
    color: #475569;
  }

  .pillar-icon-wrap {
    margin-top: auto;
    display: flex;
    justify-content: center;
    padding-top: 1.35rem;
  }

  .pillar-icon-box {
    position: relative;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: 3.7rem;
    width: 3.7rem;
    border-radius: 1rem;
    border: 1px solid rgba(147, 197, 253, 0.55);
    background: linear-gradient(180deg, #2563eb 0%, #1e40af 100%);
    backdrop-filter: blur(8px);
    box-shadow:
      0 18px 35px rgba(37, 99, 235, 0.22),
      inset 0 0 0 1px rgba(255, 255, 255, 0.14);
  }

  .pillar-icon-box svg {
    width: 1.45rem;
    height: 1.45rem;
    color: #ffffff;
  }

  .pillar-grid-line {
    position: absolute;
    inset: 0;
    background-image: linear-gradient(
      rgba(37, 99, 235, 0.055) 1px,
      transparent 1px
    );
    background-size: 100% 40px;
    opacity: 0.55;
    pointer-events: none;
  }

  .pillar-floor {
    position: absolute;
    left: 0;
    right: 0;
    bottom: -10px;
    height: 90px;
    background: radial-gradient(
      circle at center,
      rgba(37, 99, 235, 0.16),
      transparent 70%
    );
    pointer-events: none;
  }
`;

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.08,
    },
  },
};

const pillarVariants = {
  hidden: {
    opacity: 0,
    y: 120,
    scaleY: 0.82,
    transformOrigin: "bottom center",
  },
  show: {
    opacity: 1,
    y: 0,
    scaleY: 1,
    transition: {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

export default function AyushmanSection() {
  return (
    <section className="relative overflow-hidden bg-white py-24">
      <StyledWrap className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-white via-blue-50/40 to-white" />
          <div className="absolute -right-32 top-1/2 h-96 w-96 rounded-full bg-blue-100/70 blur-3xl" />
          <div className="absolute -left-32 bottom-20 h-80 w-80 rounded-full bg-indigo-100/60 blur-3xl" />
        </div>

        <div className="relative">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/80 px-4 py-2 shadow-sm backdrop-blur-sm">
              <Sparkles className="h-3.5 w-3.5 text-blue-700" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-blue-900">
                Ayushman Bharat
              </span>
            </div>

            <h2 className="relative mt-5 text-3xl font-bold tracking-tight text-blue-950 sm:text-4xl lg:text-5xl">
              Designed for PM-JAY benefit and{" "}
              <span className="relative inline-block pb-2">
                claim visibility
                <svg
                  className="absolute bottom-0 left-0 w-full"
                  height="5"
                  viewBox="0 0 200 5"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0 2.5C66.6667 1 133.333 1 200 2.5"
                    stroke="#2563EB"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                </svg>
              </span>
            </h2>

            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-600">
              The platform supports healthcare scheme governance workflows while remaining ready for future ABDM and ABHA extensions.
            </p>

            <div className="mt-5 flex justify-center gap-1">
              <div className="h-1 w-1 rounded-full bg-blue-400" />
              <div className="h-1 w-1 rounded-full bg-blue-600" />
              <div className="h-1 w-1 rounded-full bg-blue-950" />
            </div>
          </div>

          <div className="relative mt-10">
            <div className="pillar-floor" />

            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              className="grid items-end gap-5 sm:grid-cols-2 lg:grid-cols-4"
            >
              {items.map((item, index) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="pillar-shell">
                    <div className="pillar-number">{index + 1}</div>

                    <motion.div
                      variants={pillarVariants}
                      whileHover={{
                        y: -10,
                        transition: { duration: 0.25, ease: "easeOut" },
                      }}
                      className={`${heights[index]} pillar-card`}
                    >
                      <div className="pillar-grid-line" />

                      <div className="pillar-inner">
                        <div className="pillar-kicker">Pillar {index + 1}</div>

                        <h3 className="pillar-title">{item.title}</h3>

                        <div className="pillar-divider" />

                        <p className="pillar-text">{item.description}</p>

                        <div className="pillar-icon-wrap">
                          <motion.div
                            whileHover={{ scale: 1.08 }}
                            transition={{ duration: 0.2 }}
                            className="pillar-icon-box"
                          >
                            <Icon />
                          </motion.div>
                        </div>
                      </div>
                    </motion.div>
                  </div>
                );
              })}
            </motion.div>
          </div>

          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2">
              <div className="h-1.5 w-1.5 rounded-full bg-blue-700" />
              <span className="text-xs text-slate-600">
                Four pillars of PM-JAY visibility
              </span>
              <div className="h-1.5 w-1.5 rounded-full bg-blue-700" />
            </div>
          </div>
        </div>
      </StyledWrap>
    </section>
  );
}