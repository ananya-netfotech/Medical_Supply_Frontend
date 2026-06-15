import CommandCenterHero from "../../Components/Government/Overview/CommandCenterHero";
import MetricStrip from "../../Components/Government/Overview/MetricStrip";
import CriticalActionQueue from "../../Components/Government/Overview/CriticalActionQueue";
import SupplyChainFlow from "../../Components/Government/Overview/SupplyChainFlow";
import TraceabilityChart from "../../Components/Government/Overview/TraceabilityChart";
import RegionalRiskMatrix from "../../Components/Government/Overview/RegionalRiskMatrix";
import SchemeClaimsWatch from "../../Components/Government/Overview/SchemeClaimsWatch";
import ComplianceControlTower from "../../Components/Government/Overview/ComplianceControlTower";
import GovernanceScoreGrid from "../../Components/Government/Overview/GovernanceScoreGrid";
import UpcomingAudits from "../../Components/Government/Overview/AuditTimelinePanel";

export default function GovernmentDashboard() {
  return (
    <div className="space-y-6">
      {/* Added significant top spacing to account for fixed topbar */}
      <div className="pt-2 lg:pt-20">
        <CommandCenterHero />
      </div>

      <MetricStrip />

      <div className="space-y-6">
        <SupplyChainFlow />
        <TraceabilityChart />
        <CriticalActionQueue />
        <RegionalRiskMatrix />
        <ComplianceControlTower />
        <UpcomingAudits />
        <SchemeClaimsWatch />
        <GovernanceScoreGrid />
      </div>
    </div>
  );
}