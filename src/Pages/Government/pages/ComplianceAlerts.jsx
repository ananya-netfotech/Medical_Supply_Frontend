import { useMemo, useState } from "react";
import {
  AlertOctagon,
  Clock3,
  ClipboardCheck,
  Factory,
  IndianRupee,
  MapPin,
  PackageSearch,
} from "lucide-react";

import {
  complianceSummary,
  complianceAlerts,
  complianceChecklist,
  stateRisk,
  categoryBreakdown,
  recentActions,
} from "../../../Components/Government/Compliance/constants";
import { generatePDFReport } from "../../../Components/Government/Compliance/generatePDFReport";

import ComplianceHeader from "../../../Components/Government/Compliance/ComplianceHeader";
import ModernSummaryCard from "../../../Components/Government/Compliance/ModernSummaryCard";
import ModernPanel from "../../../Components/Government/Compliance/ModernPanel";
import ModernChecklistRow from "../../../Components/Government/Compliance/ModernChecklistRow";
import CategoryCard from "../../../Components/Government/Compliance/CategoryCard";
import ComplianceHeatmap from "../../../Components/Government/Compliance/ComplianceHeatmap";
import ActionItem from "../../../Components/Government/Compliance/ActionItem";
import PriorityItemModern from "../../../Components/Government/Compliance/PriorityItemModern";
import AlertsSearchBar from "../../../Components/Government/Compliance/AlertsSearchBar";
import AlertsTable from "../../../Components/Government/Compliance/AlertsTable";
import ModernDetailCard from "../../../Components/Government/Compliance/ModernDetailCard";
import ComplianceFooter from "../../../Components/Government/Compliance/ComplianceFooter";

export default function ComplianceAlerts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);

  const filteredAlerts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return complianceAlerts.filter((alert) => {
      const matchesSeverity =
        severityFilter === "All" || alert.severity === severityFilter;

      const matchesQuery =
        !query ||
        alert.alertId.toLowerCase().includes(query) ||
        alert.category.toLowerCase().includes(query) ||
        alert.regulation.toLowerCase().includes(query) ||
        alert.entity.toLowerCase().includes(query) ||
        alert.region.toLowerCase().includes(query) ||
        alert.status.toLowerCase().includes(query) ||
        alert.finding.toLowerCase().includes(query);

      return matchesSeverity && matchesQuery;
    });
  }, [searchTerm, severityFilter]);

  const criticalCount = complianceAlerts.filter(
    (alert) => alert.severity === "Critical"
  ).length;

  const handleDownload = async () => {
    setIsGenerating(true);
    try {
      await generatePDFReport(filteredAlerts, criticalCount);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF report. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-6 lg:px-6">
      <div className="pt-16 lg:pt-20" />
      <div className="mx-auto max-w-[1600px]">

        {/* Header */}
        <ComplianceHeader criticalCount={criticalCount} />

        {/* Summary Cards */}
        <div className="mb-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {complianceSummary.map((item) => (
            <ModernSummaryCard key={item.label} item={item} />
          ))}
        </div>

        {/* Analytics Grid */}
        <div className="mb-6 grid items-start gap-6 xl:grid-cols-[1.08fr_0.92fr]">
          <ModernPanel
            title="Compliance Readiness Scorecard"
            icon={ClipboardCheck}
            badge="Updated daily"
            tone="blue"
          >
            <div className="space-y-3">
              {complianceChecklist.map((item) => (
                <ModernChecklistRow key={item.label} item={item} compact />
              ))}
            </div>
          </ModernPanel>

          <ModernPanel
            title="Alert Distribution by Category"
            icon={PackageSearch}
            badge="Last 30 days"
            tone="emerald"
          >
            <div className="grid gap-3 sm:grid-cols-2">
              {categoryBreakdown.map((item) => (
                <CategoryCard key={item.label} item={item} />
              ))}
            </div>

            <div className="mt-4 rounded-md border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    Total alert categories
                  </p>
                  <p className="mt-1 text-xs text-gray-500">
                    Distribution across quality, licensing, claims and traceability.
                  </p>
                </div>

                <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2 text-center">
                  <p className="text-xl font-bold text-green-700">
                    {categoryBreakdown.length}
                  </p>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-green-700">
                    Types
                  </p>
                </div>
              </div>
            </div>
          </ModernPanel>
        </div>

        {/* Heatmap Row */}
        <div className="mb-6">
          <ModernPanel
            title="State-wise Risk Heatmap"
            icon={MapPin}
            badge="Critical first"
            tone="amber"
          >
            <ComplianceHeatmap data={stateRisk} />
          </ModernPanel>
        </div>

        {/* Recent Actions + Priorities */}
        <div className="mb-6 grid items-start gap-6 lg:grid-cols-2">
          <ModernPanel
            title="Recent Enforcement Actions"
            icon={Clock3}
            badge="Live feed"
            tone="slate"
          >
            <div className="space-y-3">
              {recentActions.map((action, index) => (
                <ActionItem key={`${action.action}-${index}`} action={action} />
              ))}
            </div>
          </ModernPanel>

          <ModernPanel
            title="Regulatory Action Priorities"
            icon={AlertOctagon}
            badge="Urgent"
            tone="rose"
          >
            <div className="space-y-3">
              <PriorityItemModern
                title="Freeze affected inventory"
                text="Stop movement of recalled or expired units until stock reconciliation is complete."
                icon={PackageSearch}
                urgency="high"
              />
              <PriorityItemModern
                title="Block non-compliant licenses"
                text="Prevent new batch creation when manufacturer license is expired, revoked or under review."
                icon={Factory}
                urgency="medium"
              />
              <PriorityItemModern
                title="Escalate suspicious claims"
                text="Route duplicate or incomplete PM-JAY claims to manual review before approval."
                icon={IndianRupee}
                urgency="high"
              />
              <PriorityItemModern
                title="Maintain audit trail"
                text="Capture every approval, recall, revoke, release and claim decision with actor/time metadata."
                icon={Clock3}
                urgency="low"
              />
            </div>
          </ModernPanel>
        </div>

        {/* Search and Filters */}
        <AlertsSearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
        />

        {/* Alerts Table */}
        <AlertsTable
          filteredAlerts={filteredAlerts}
          selectedAlert={selectedAlert}
          setSelectedAlert={setSelectedAlert}
          searchTerm={searchTerm}
        />

        {/* Selected Alert Detail */}
        {selectedAlert && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-300">
            <ModernDetailCard
              alert={complianceAlerts.find(
                (alert) => alert.alertId === selectedAlert
              )}
            />
          </div>
        )}

        {/* Footer */}
        <ComplianceFooter
          onDownload={handleDownload}
          isGenerating={isGenerating}
        />

      </div>
    </div>
  );
}
