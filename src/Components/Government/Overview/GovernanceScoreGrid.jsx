import { governanceScores } from "../../../Pages/Government/pages/governmentDashboardData";
import { Shield, Award, Target, Star } from "lucide-react";
import { useEffect, useState } from "react";

export default function GovernanceScoreGrid() {
  const avgScore = Math.round(
    governanceScores.reduce((sum, item) => sum + parseInt(item.value), 0) /
      governanceScores.length
  );

  const highestScore = Math.max(
    ...governanceScores.map((item) => parseInt(item.value))
  );

  const lowestScore = Math.min(
    ...governanceScores.map((item) => parseInt(item.value))
  );

  const getScoreColor = (score) => {
    if (score >= 85) return "text-emerald-600";
    if (score >= 70) return "text-blue-600";
    if (score >= 55) return "text-amber-600";
    return "text-rose-600";
  };

  const getGaugeColor = (score) => {
    if (score >= 85) return "#10b981";
    if (score >= 70) return "#3b82f6";
    if (score >= 55) return "#f59e0b";
    return "#f43f5e";
  };

  const SpeedometerGauge = ({ score, label, icon: Icon, detail }) => {
    const [animatedScore, setAnimatedScore] = useState(0);

    const scoreColor = getScoreColor(score);
    const gaugeColor = getGaugeColor(score);

    const centerX = 80;
    const centerY = 90;
    const arcRadius = 60;
    const needleLength = 48;

    const safeScore = Math.max(0, Math.min(animatedScore, 100));

    /*
      Correct top-semicircle mapping:
      0%   = 180deg = left
      50%  = 270deg = top
      100% = 360deg = right
    */
    const needleAngle = 180 + safeScore * 1.8;
    const needleRad = (needleAngle * Math.PI) / 180;

    const needleX = centerX + needleLength * Math.cos(needleRad);
    const needleY = centerY + needleLength * Math.sin(needleRad);

    const halfCircumference = Math.PI * arcRadius;
    const progressOffset =
      halfCircumference - (safeScore / 100) * halfCircumference;

    useEffect(() => {
      const timer = setTimeout(() => {
        setAnimatedScore(score);
      }, 100);

      return () => clearTimeout(timer);
    }, [score]);

    return (
      <div className="group">
        <div className="relative flex flex-col items-center rounded-2xl border border-slate-100 bg-gradient-to-br from-white to-slate-50 p-4 transition-all duration-300 hover:shadow-lg">
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Icon className="h-5 w-5" />
          </div>

          <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">
            {label}
          </p>

          <div className="relative my-3">
            <svg
              width="160"
              height="120"
              viewBox="0 0 160 120"
              className="overflow-visible"
            >
              {/* Background arc */}
              <path
                d="M 20 90 A 60 60 0 0 1 140 90"
                fill="none"
                stroke="#e2e8f0"
                strokeWidth="12"
                strokeLinecap="round"
              />

              {/* Progress arc */}
              <path
                d="M 20 90 A 60 60 0 0 1 140 90"
                fill="none"
                stroke={gaugeColor}
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={halfCircumference}
                strokeDashoffset={progressOffset}
                className="transition-all duration-1000 ease-out"
              />

              {/* Tick marks */}
              <line
                x1="20"
                y1="90"
                x2="12"
                y2="90"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <text
                x="10"
                y="104"
                textAnchor="middle"
                className="text-[8px] fill-slate-400"
              >
                0
              </text>

              <line
                x1="37.5"
                y1="47.5"
                x2="31"
                y2="41"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <text
                x="28"
                y="37"
                textAnchor="middle"
                className="text-[8px] fill-slate-400"
              >
                25
              </text>

              <line
                x1="80"
                y1="30"
                x2="80"
                y2="20"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <text
                x="80"
                y="16"
                textAnchor="middle"
                className="text-[8px] fill-slate-400"
              >
                50
              </text>

              <line
                x1="122.5"
                y1="47.5"
                x2="129"
                y2="41"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <text
                x="132"
                y="37"
                textAnchor="middle"
                className="text-[8px] fill-slate-400"
              >
                75
              </text>

              <line
                x1="140"
                y1="90"
                x2="148"
                y2="90"
                stroke="#94a3b8"
                strokeWidth="2"
              />
              <text
                x="150"
                y="104"
                textAnchor="middle"
                className="text-[8px] fill-slate-400"
              >
                100
              </text>

              {/* Needle */}
              <line
                x1={centerX}
                y1={centerY}
                x2={needleX}
                y2={needleY}
                stroke="#1e293b"
                strokeWidth="3"
                strokeLinecap="round"
                className="transition-all duration-1000 ease-out"
              />

              {/* Needle base */}
              <circle cx={centerX} cy={centerY} r="7" fill="#1e293b" />
              <circle cx={centerX} cy={centerY} r="3.5" fill="white" />

              {/* Score text */}
              <text
                x="80"
                y="76"
                textAnchor="middle"
                className={`text-2xl font-black fill-current ${scoreColor} transition-all duration-500`}
              >
                {animatedScore}%
              </text>

              <text
                x="80"
                y="105"
                textAnchor="middle"
                className="text-[9px] fill-slate-400"
              >
                Score
              </text>
            </svg>
          </div>

          <p className="mt-1 text-center text-[10px] leading-relaxed text-slate-500">
            {detail}
          </p>

          <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-slate-100">
            <div
              className={`h-full rounded-full transition-all duration-1000 ease-out ${
                score >= 85
                  ? "bg-emerald-500"
                  : score >= 70
                  ? "bg-blue-500"
                  : score >= 55
                  ? "bg-amber-500"
                  : "bg-rose-500"
              }`}
              style={{ width: `${animatedScore}%` }}
            />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm">
      <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-1 flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-100">
              <Shield className="h-4 w-4 text-indigo-700" />
            </div>

            <h2 className="text-xl font-bold text-slate-900">
              Governance Scorecard
            </h2>
          </div>

          <p className="text-sm text-slate-500">
            Multi-dimensional governance performance
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 rounded-full bg-emerald-50 px-3 py-1.5">
            <Award className="h-3 w-3 text-emerald-600" />
            <span className="text-xs font-semibold text-emerald-700">
              Highest: {highestScore}%
            </span>
          </div>

          <div className="flex items-center gap-1 rounded-full bg-rose-50 px-3 py-1.5">
            <Target className="h-3 w-3 text-rose-600" />
            <span className="text-xs font-semibold text-rose-700">
              Lowest: {lowestScore}%
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {governanceScores.map((item) => (
          <SpeedometerGauge
            key={item.label}
            score={parseInt(item.value)}
            label={item.label}
            icon={item.icon}
            detail={item.detail}
          />
        ))}
      </div>

      <div className="mt-6 flex flex-wrap items-center justify-between gap-3 rounded-xl bg-slate-50 p-4">
        <div className="flex flex-wrap items-center gap-4">
          <Legend color="bg-emerald-500" label="85-100% (Excellent)" />
          <Legend color="bg-blue-500" label="70-84% (Good)" />
          <Legend color="bg-amber-500" label="55-69% (Needs Work)" />
          <Legend color="bg-rose-500" label="<55% (Critical)" />
        </div>

        <div className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1.5">
          <Star className="h-3 w-3 text-amber-500" />
          <span className="text-xs font-semibold text-blue-700">
            Overall Score: {avgScore}%
          </span>
        </div>
      </div>
    </section>
  );
}

function Legend({ color, label }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-[10px] text-slate-600">{label}</span>
    </div>
  );
}