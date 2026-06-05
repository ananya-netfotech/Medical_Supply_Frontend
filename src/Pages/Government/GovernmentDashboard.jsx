import CommandCenterHero from "../../Components/Government/CommandCenterHero";
import MetricStrip from "../../Components/Government/MetricStrip";
import CriticalActionQueue from "../../Components/Government/CriticalActionQueue";
import SupplyChainFlow from "../../Components/Government/SupplyChainFlow";
import TraceabilityChart from "../../Components/Government/TraceabilityChart";
import RegionalRiskMatrix from "../../Components/Government/RegionalRiskMatrix";
import SchemeClaimsWatch from "../../Components/Government/SchemeClaimsWatch";
import ComplianceControlTower from "../../Components/Government/ComplianceControlTower";
import GovernanceScoreGrid from "../../Components/Government/GovernanceScoreGrid";
import UpcomingAudits from "../../Components/Government/AuditTimelinePanel";

export default function GovernmentDashboard() {
  return (
    <div className="space-y-6">
      <CommandCenterHero />

      <MetricStrip />

      <div className="grid items-start gap-6 2xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-6">
          <SupplyChainFlow />
          <TraceabilityChart />
        </div>

        <CriticalActionQueue />
      </div>

      <div className="grid items-start gap-6 2xl:grid-cols-[1fr_1fr]">
        <RegionalRiskMatrix />
        
      </div>

<div className="grid items-start gap-6 xl:grid-cols-[1.05fr_0.95fr]">
  <ComplianceControlTower />
  <UpcomingAudits />
  <SchemeClaimsWatch />
</div>

      <GovernanceScoreGrid />
    </div>
  );
}