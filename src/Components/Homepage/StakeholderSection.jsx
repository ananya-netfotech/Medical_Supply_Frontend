import { Building2, Factory, Landmark, UserRound, CheckCircle2, Shield, Zap, Eye, Settings, TrendingUp, Clock, Users, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import SectionHeader from "./SectionHeader";
import { useEffect, useRef, useState } from "react";

const stakeholders = [
  {
    title: "Regulatory Authority",
    icon: Landmark,
    gradient: "from-blue-600 to-indigo-600",
    bgGradient: "from-blue-50 to-indigo-50",
    points: ["Drug Registration", "Licensing", "Compliance", "Audit Monitoring"],
    metrics: { label: "Active Regulators", value: "35+", change: "+12%" },
    color: "blue",
    capabilities: ["Real-time dashboards", "Automated alerts", "Compliance reports"],
  },
  {
    title: "Manufacturer",
    icon: Factory,
    gradient: "from-emerald-600 to-teal-600",
    bgGradient: "from-emerald-50 to-teal-50",
    points: ["Medicine Creation", "Inventory", "Batch Tracking", "Stock Transfer"],
    metrics: { label: "Active Manufacturers", value: "500+", change: "+18%" },
    color: "emerald",
    capabilities: ["Batch management", "Quality control", "Distribution tracking"],
  },
  {
    title: "Pharmacy / Distributor",
    icon: Building2,
    gradient: "from-orange-600 to-amber-600",
    bgGradient: "from-orange-50 to-amber-50",
    points: ["Inventory Receipt", "Dispensing", "Claim Submission", "Traceability"],
    metrics: { label: "Partner Outlets", value: "50K+", change: "+25%" },
    color: "orange",
    capabilities: ["POS integration", "Inventory sync", "Claim processing"],
  },
  {
    title: "Citizen",
    icon: UserRound,
    gradient: "from-rose-600 to-pink-600",
    bgGradient: "from-rose-50 to-pink-50",
    points: ["My Medicines", "Benefits", "Claims Tracking", "Recall Alerts"],
    metrics: { label: "Registered Citizens", value: "100M+", change: "+32%" },
    color: "rose",
    capabilities: ["Mobile access", "QR verification", "Health records"],
  },
];

export default function StakeholderSection() {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const getColorClasses = (color) => {
    const colors = {
      blue: {
        bg: "bg-blue-50",
        text: "text-blue-600",
        border: "border-blue-200",
        hover: "hover:border-blue-300",
        iconBg: "from-blue-600 to-indigo-600",
        badge: "bg-blue-100 text-blue-700",
      },
      emerald: {
        bg: "bg-emerald-50",
        text: "text-emerald-600",
        border: "border-emerald-200",
        hover: "hover:border-emerald-300",
        iconBg: "from-emerald-600 to-teal-600",
        badge: "bg-emerald-100 text-emerald-700",
      },
      orange: {
        bg: "bg-orange-50",
        text: "text-orange-600",
        border: "border-orange-200",
        hover: "hover:border-orange-300",
        iconBg: "from-orange-600 to-amber-600",
        badge: "bg-orange-100 text-orange-700",
      },
      rose: {
        bg: "bg-rose-50",
        text: "text-rose-600",
        border: "border-rose-200",
        hover: "hover:border-rose-300",
        iconBg: "from-rose-600 to-pink-600",
        badge: "bg-rose-100 text-rose-700",
      },
    };
    return colors[color] || colors.blue;
  };

  return (
    <section 
      ref={sectionRef}
      className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-blue-50/20 py-24"
    >
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-blue-400/5 blur-3xl" />
        <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-indigo-400/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 h-full w-full -translate-x-1/2 -translate-y-1/2 bg-grid-pattern opacity-[0.02]" />
        
        {/* Floating elements */}
        <div className="absolute top-20 left-10 h-64 w-64 animate-float rounded-full bg-blue-500/5 blur-3xl" />
        <div className="absolute bottom-20 right-10 h-64 w-64 animate-float-delayed rounded-full bg-indigo-500/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Section Header with enhanced styling */}
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-white/80 backdrop-blur-sm px-4 py-1.5 shadow-sm mb-6">
            <Users className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold uppercase tracking-wider text-blue-900">
              Ecosystem Stakeholders
            </span>
          </div>
          
          <h2 className="bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 bg-clip-text text-3xl font-black sm:text-4xl lg:text-5xl">
            Built for the Indian
            <span className="relative mt-2 block">
              healthcare ecosystem
              <svg className="absolute -bottom-2 left-0 right-0 h-2 w-full" viewBox="0 0 200 8" preserveAspectRatio="none">
                <path d="M0 4 Q 50 8 100 4 Q 150 0 200 4" stroke="#3B82F6" strokeWidth="2" fill="none" className="opacity-40" />
              </svg>
            </span>
          </h2>
          
          <p className="mt-6 text-lg leading-relaxed text-slate-600 md:text-xl">
            Each role gets a focused dashboard with relevant actions, data visibility and access restrictions.
          </p>
        </div>

        {/* Stakeholder Cards Grid */}
        <div className="mt-16">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {stakeholders.map((stakeholder, index) => {
              const Icon = stakeholder.icon;
              const colors = getColorClasses(stakeholder.color);
              const isHovered = hoveredCard === index;

              return (
                <div
                  key={stakeholder.title}
                  className={`group relative transition-all duration-700`}
                  style={{ 
                    animationDelay: `${index * 150}ms`,
                    opacity: isVisible ? 1 : 0,
                    transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
                    transition: 'opacity 0.7s ease-out, transform 0.7s ease-out'
                  }}
                  onMouseEnter={() => setHoveredCard(index)}
                  onMouseLeave={() => setHoveredCard(null)}
                >
                  {/* Card Container */}
                  <div className={`relative h-full overflow-hidden rounded-3xl border ${colors.border} bg-white shadow-sm transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${colors.hover}`}>
                    
                    {/* Gradient Top Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${stakeholder.gradient} transition-all duration-300 group-hover:h-2`} />

                    {/* Icon Section */}
                    <div className="p-6 pb-4">
                      <div className="relative">
                        <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${stakeholder.gradient} opacity-10 blur-xl transition-opacity duration-300 group-hover:opacity-20`} />
                        <div className={`relative inline-flex rounded-2xl bg-gradient-to-br ${stakeholder.bgGradient} p-3 shadow-sm transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                          <Icon className={`h-7 w-7 bg-gradient-to-br ${stakeholder.gradient} bg-clip-text text-transparent`} />
                        </div>
                      </div>

                      {/* Title with Icon */}
                      <div className="mt-4 flex items-start justify-between">
                        <h3 className="text-xl font-black text-slate-900">
                          {stakeholder.title}
                        </h3>
                        <Shield className={`h-5 w-5 ${colors.text} opacity-0 transition-opacity duration-300 group-hover:opacity-100`} />
                      </div>

                      {/* Metrics Badge */}
                      <div className="mt-3 flex items-center gap-2">
                        <div className={`inline-flex items-center gap-1 rounded-full ${colors.badge} px-2 py-0.5 text-xs font-semibold`}>
                          <TrendingUp size={10} />
                          <span>{stakeholder.metrics.change}</span>
                        </div>
                        <span className="text-xs text-slate-500">{stakeholder.metrics.label}</span>
                      </div>
                    </div>

                    {/* Features List */}
                    <div className="border-t border-slate-100 px-6 py-4">
                      <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-slate-400">
                        Key Capabilities
                      </p>
                      <ul className="space-y-2.5">
                        {stakeholder.points.map((point, idx) => (
                          <li key={idx} className="flex items-center gap-2.5 text-sm text-slate-700">
                            <CheckCircle2 className={`h-4 w-4 ${colors.text} flex-shrink-0`} />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Additional Capabilities (Reveal on Hover) */}
                    <div className={`overflow-hidden transition-all duration-300 ${
                      isHovered ? "max-h-32 opacity-100" : "max-h-0 opacity-0"
                    }`}>
                      <div className="border-t border-slate-100 px-6 py-4">
                        <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400">
                          Platform Features
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {stakeholder.capabilities.map((cap, idx) => (
                            <span
                              key={idx}
                              className={`inline-flex items-center gap-1 rounded-full ${colors.bg} ${colors.text} px-2 py-1 text-xs font-medium`}
                            >
                              <Zap size={10} />
                              {cap}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Login Prompt - Replacing the Dashboard Button */}
                    <div className={`border-t border-slate-100 p-4 transition-colors duration-300 ${colors.bg}`}>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-slate-600">Access requires login</span>
                        <Shield className={`h-4 w-4 ${colors.text}`} />
                      </div>
                    </div>

                    {/* Decorative Corner Icon */}
                    <div className="absolute -bottom-6 -right-6 opacity-0 transition-all duration-500 group-hover:opacity-10 group-hover:scale-150">
                      <Icon className="h-24 w-24" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>


      </div>

      {/* Keyframe animations */}
      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        
        @keyframes floatDelayed {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(20px); }
        }
        
        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-float-delayed {
          animation: floatDelayed 10s ease-in-out infinite;
        }
        
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #3B82F6 1px, transparent 1px);
          background-size: 40px 40px;
        }
      `}</style>
    </section>
  );
}