import { useMemo, useState, useRef } from "react";
import {
  AlertOctagon,
  ArrowDownRight,
  ArrowUpRight,
  BellRing,
  CheckCircle2,
  ClipboardCheck,
  Clock3,
  Eye,
  Factory,
  Gavel,
  IndianRupee,
  MapPin,
  PackageSearch,
  Search,
  Send,
  ShieldAlert,
  ShieldCheck,
  Siren,
  Stethoscope,
  TrendingDown,
  TrendingUp,
  Truck,
} from "lucide-react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const complianceSummary = [
  {
    label: "Open Compliance Alerts",
    value: "37",
    change: "+8%",
    trend: "up",
    detail: "11 high priority",
    tone: "rose",
    icon: ShieldAlert,
  },
  {
    label: "License Exceptions",
    value: "14",
    change: "+2",
    trend: "up",
    detail: "6 expired / 8 renewal due",
    tone: "amber",
    icon: Gavel,
  },
  {
    label: "Recall Watch",
    value: "5",
    change: "-1",
    trend: "down",
    detail: "2 acknowledgement pending",
    tone: "blue",
    icon: Siren,
  },
  {
    label: "PM-JAY Claim Flags",
    value: "21",
    change: "+5",
    trend: "up",
    detail: "duplicate / unusual claims",
    tone: "indigo",
    icon: IndianRupee,
  },
];

const complianceAlerts = [
  {
    alertId: "ALRT-CDSCO-001",
    category: "Drug Quality / Recall",
    regulation: "Drugs & Cosmetics Act / Schedule M / Recall Rapid Alert",
    entity: "BATCH003",
    entityType: "Medicine Batch",
    region: "Maharashtra",
    severity: "Critical",
    status: "Open",
    detected: "5/1/2024, 10:45 AM",
    owner: "CDSCO Quality Desk",
    finding:
      "Contamination detected during quality audit. Recall acknowledgement pending from two downstream pharmacies.",
    requiredAction:
      "Freeze affected batch movement, notify all current holders, issue recall closure only after stock reconciliation.",
  },
  {
    alertId: "ALRT-LIC-014",
    category: "Manufacturer Licensing",
    regulation: "Manufacturing License Validity / State Drug Control Review",
    entity: "Cipla Limited",
    entityType: "Manufacturer",
    region: "Maharashtra",
    severity: "High",
    status: "Under Review",
    detected: "4/28/2024, 2:20 PM",
    owner: "State Drug Licensing Cell",
    finding:
      "One manufacturer license has crossed validity date while related medicine units are still visible in supply chain movement.",
    requiredAction:
      "Review active manufacturing permissions, block new batch creation if license remains expired, and record licensing decision.",
  },
  {
    alertId: "ALRT-DIST-022",
    category: "Distribution / GDP",
    regulation: "Good Distribution Practices for Pharmaceutical Products",
    entity: "North India Pharma Distributors",
    entityType: "Pharmacy / Distributor",
    region: "Delhi",
    severity: "High",
    status: "Open",
    detected: "4/22/2024, 5:30 AM",
    owner: "Distribution Compliance Desk",
    finding:
      "Unusual transfer velocity detected between distributor and downstream pharmacy branch within short interval.",
    requiredAction:
      "Verify transfer documents, receiving branch acknowledgement, storage conditions, and batch ownership chain.",
  },
  {
    alertId: "ALRT-EXP-008",
    category: "Expired Medicine Stock",
    regulation: "Sale / Distribution Restriction for Expired Drugs",
    entity: "BATCH005",
    entityType: "Medicine Unit",
    region: "Uttar Pradesh",
    severity: "Critical",
    status: "Open",
    detected: "4/15/2024, 9:00 AM",
    owner: "State Drug Inspector",
    finding:
      "Expired medicine units remain tagged under pharmacy inventory and have not been removed from active dispensing pool.",
    requiredAction:
      "Mark units as non-dispensable, initiate pharmacy inspection workflow, and verify stock quarantine records.",
  },
  {
    alertId: "ALRT-PMJAY-031",
    category: "PM-JAY Claim Risk",
    regulation: "NHA / AB PM-JAY Anti-Fraud Monitoring",
    entity: "CLAIM-PMJAY-99999999",
    entityType: "Healthcare Claim",
    region: "Karnataka",
    severity: "Medium",
    status: "Pending Evidence",
    detected: "4/12/2024, 1:35 PM",
    owner: "PM-JAY Claims Review Cell",
    finding:
      "Claim submitted for medicine benefit with incomplete beneficiary and pharmacy linkage records.",
    requiredAction:
      "Verify beneficiary ID, pharmacy license, medicine dispense record, and duplicate claim indicators before approval.",
  },
  {
    alertId: "ALRT-TRACE-017",
    category: "Traceability / Barcode",
    regulation: "Barcode / QR Traceability under Drugs Rules, 1945 expansion",
    entity: "BATCH004",
    entityType: "Medicine Batch",
    region: "Gujarat",
    severity: "Medium",
    status: "Under Review",
    detected: "4/10/2024, 11:12 AM",
    owner: "Traceability Monitoring Cell",
    finding:
      "Batch transfer record is present, but package-level scan/QR verification is missing for one downstream movement.",
    requiredAction:
      "Request distributor scan logs, reconcile package-level identifiers, and mark gap resolved after validation.",
  },
  {
    alertId: "ALRT-PV-005",
    category: "Pharmacovigilance",
    regulation: "PvPI / Post-Marketing Safety Monitoring",
    entity: "Amoxicillin 500mg",
    entityType: "Drug Type",
    region: "Tamil Nadu",
    severity: "Medium",
    status: "Monitoring",
    detected: "4/8/2024, 4:10 PM",
    owner: "Post-Marketing Safety Cell",
    finding:
      "Repeated adverse reaction notes received from multiple pharmacy points for same drug type and nearby batches.",
    requiredAction:
      "Correlate batch numbers, verify ADR reports, review marketing authorization holder safety submissions.",
  },
];

const complianceChecklist = [
  {
    label: "Drugs & Cosmetics Act / Rules",
    score: 91,
    status: "Strong",
    icon: Gavel,
    trend: "+3%",
  },
  {
    label: "License Validity Monitoring",
    score: 84,
    status: "Watch",
    icon: ClipboardCheck,
    trend: "-2%",
  },
  {
    label: "Recall & Rapid Alert Readiness",
    score: 78,
    status: "Watch",
    icon: Siren,
    trend: "+1%",
  },
  {
    label: "Good Distribution Practices",
    score: 73,
    status: "Watch",
    icon: Truck,
    trend: "-4%",
  },
  {
    label: "PM-JAY Anti-Fraud Controls",
    score: 68,
    status: "Risk",
    icon: IndianRupee,
    trend: "-6%",
  },
  {
    label: "Post-Marketing Safety / PvPI",
    score: 82,
    status: "Watch",
    icon: Stethoscope,
    trend: "+2%",
  },
];

const stateRisk = [
  { state: "MH", critical: 2, high: 4, medium: 7, score: 72 },
  { state: "UP", critical: 3, high: 3, medium: 6, score: 65 },
  { state: "DL", critical: 1, high: 5, medium: 4, score: 78 },
  { state: "KA", critical: 1, high: 2, medium: 8, score: 82 },
  { state: "GJ", critical: 0, high: 3, medium: 7, score: 85 },
  { state: "TN", critical: 0, high: 2, medium: 5, score: 88 },
];

const categoryBreakdown = [
  {
    label: "Drug Quality",
    value: 9,
    percent: 92,
    color: "from-rose-400 to-rose-300",
    bg: "bg-rose-50",
    text: "text-rose-700",
  },
  {
    label: "Licensing",
    value: 7,
    percent: 72,
    color: "from-amber-400 to-amber-300",
    bg: "bg-amber-50",
    text: "text-amber-700",
  },
  {
    label: "Distribution",
    value: 6,
    percent: 64,
    color: "from-blue-400 to-blue-300",
    bg: "bg-blue-50",
    text: "text-blue-700",
  },
  {
    label: "PM-JAY Claims",
    value: 8,
    percent: 80,
    color: "from-indigo-400 to-indigo-300",
    bg: "bg-indigo-50",
    text: "text-indigo-700",
  },
  {
    label: "Traceability",
    value: 5,
    percent: 52,
    color: "from-cyan-400 to-cyan-300",
    bg: "bg-cyan-50",
    text: "text-cyan-700",
  },
  {
    label: "Pharmacovigilance",
    value: 2,
    percent: 28,
    color: "from-emerald-400 to-emerald-300",
    bg: "bg-emerald-50",
    text: "text-emerald-700",
  },
];

const recentActions = [
  {
    action: "License suspension issued",
    entity: "Sunrise Pharma",
    officer: "Dr. Mehta",
    time: "15 min ago",
    status: "completed",
  },
  {
    action: "Batch recall order sent",
    entity: "Amoxicillin 500mg",
    officer: "CDSCO Desk",
    time: "1 hr ago",
    status: "pending",
  },
  {
    action: "Inspection scheduled",
    entity: "Delhi Distributor",
    officer: "State Drug Cell",
    time: "3 hrs ago",
    status: "completed",
  },
  {
    action: "Claim flagged for review",
    entity: "PM-JAY #8821",
    officer: "Claims Cell",
    time: "5 hrs ago",
    status: "review",
  },
];

const toneStyles = {
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    glow: "bg-rose-500/10",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    glow: "bg-amber-500/10",
  },
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    glow: "bg-blue-500/10",
  },
  indigo: {
    bg: "bg-indigo-50",
    text: "text-indigo-700",
    border: "border-indigo-200",
    glow: "bg-indigo-500/10",
  },
};

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

  const generatePDFReport = async () => {
    setIsGenerating(true);
    
    try {
      const doc = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      // Header
      doc.setFillColor(37, 99, 235);
      doc.rect(0, 0, 210, 45, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("Compliance Monitoring Report", 20, 20);
      
      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.text(`Generated: ${new Date().toLocaleString()}`, 20, 35);
      doc.text("CDSCO & State Drug Control Authorities", 20, 42);
      
      doc.setTextColor(0, 0, 0);
      
      let yPos = 60;
      
      // Executive Summary
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Executive Summary", 20, yPos);
      yPos += 8;
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(`Total Active Compliance Alerts: ${complianceAlerts.length}`, 20, yPos);
      yPos += 6;
      doc.text(`Critical Alerts: ${criticalCount}`, 20, yPos);
      yPos += 6;
      doc.text(`High Priority Alerts: ${complianceAlerts.filter(a => a.severity === "High").length}`, 20, yPos);
      yPos += 6;
      doc.text(`Open Compliance Rate: 78%`, 20, yPos);
      yPos += 6;
      doc.text(`License Exceptions: 14 (6 expired / 8 renewal due)`, 20, yPos);
      yPos += 6;
      doc.text(`Recall Watch Active: 5`, 20, yPos);
      yPos += 6;
      doc.text(`PM-JAY Claim Flags: 21`, 20, yPos);
      yPos += 12;
      
      // Summary Cards
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Compliance Summary", 20, yPos);
      yPos += 8;
      
      const summaryData = complianceSummary.map(item => [
        item.label,
        item.value,
        item.change,
        item.detail
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Metric', 'Value', 'Change', 'Details']],
        body: summaryData,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 25 },
          2: { cellWidth: 25 },
          3: { cellWidth: 80 },
        },
        margin: { left: 20 },
      });
      
      yPos = doc.lastAutoTable.finalY + 10;
      
      // Compliance Readiness Scorecard
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Compliance Readiness Scorecard", 20, yPos);
      yPos += 8;
      
      const readinessData = complianceChecklist.map(item => [
        item.label,
        `${item.score}%`,
        item.status,
        item.trend
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Category', 'Score', 'Status', 'Trend']],
        body: readinessData,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 70 },
          1: { cellWidth: 25 },
          2: { cellWidth: 30 },
          3: { cellWidth: 25 },
        },
        margin: { left: 20 },
      });
      
      yPos = doc.lastAutoTable.finalY + 10;
      
      // Category Breakdown
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Alert Distribution by Category", 20, yPos);
      yPos += 8;
      
      const categoryData = categoryBreakdown.map(item => [
        item.label,
        item.value.toString(),
        `${item.percent}%`
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Category', 'Alert Count', 'Percentage']],
        body: categoryData,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 40 },
          2: { cellWidth: 40 },
        },
        margin: { left: 20 },
      });
      
      yPos = doc.lastAutoTable.finalY + 10;
      
      // State-wise Risk
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("State-wise Risk Assessment", 20, yPos);
      yPos += 8;
      
      const stateData = stateRisk.map(item => [
        item.state,
        item.critical.toString(),
        item.high.toString(),
        item.medium.toString(),
        `${item.score}%`
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['State', 'Critical', 'High', 'Medium', 'Score']],
        body: stateData,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 30 },
          1: { cellWidth: 30 },
          2: { cellWidth: 30 },
          3: { cellWidth: 30 },
          4: { cellWidth: 40 },
        },
        margin: { left: 20 },
      });
      
      yPos = doc.lastAutoTable.finalY + 10;
      
      // Recent Actions
      if (yPos > 250) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Recent Enforcement Actions", 20, yPos);
      yPos += 8;
      
      const actionsData = recentActions.map(item => [
        item.action,
        item.entity,
        item.officer,
        item.time,
        item.status
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Action', 'Entity', 'Officer', 'Time', 'Status']],
        body: actionsData,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 10 },
        bodyStyles: { fontSize: 9 },
        columnStyles: {
          0: { cellWidth: 50 },
          1: { cellWidth: 45 },
          2: { cellWidth: 35 },
          3: { cellWidth: 25 },
          4: { cellWidth: 25 },
        },
        margin: { left: 20 },
      });
      
      yPos = doc.lastAutoTable.finalY + 10;
      
      // Detailed Alerts
      if (yPos > 200) {
        doc.addPage();
        yPos = 20;
      }
      
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text("Detailed Compliance Alerts", 20, yPos);
      yPos += 8;
      
      const alertsData = filteredAlerts.map(alert => [
        alert.alertId,
        alert.category,
        alert.entity,
        alert.region,
        alert.severity,
        alert.status,
        alert.detected
      ]);
      
      autoTable(doc, {
        startY: yPos,
        head: [['Alert ID', 'Category', 'Entity', 'Region', 'Severity', 'Status', 'Detected']],
        body: alertsData,
        theme: 'striped',
        headStyles: { fillColor: [37, 99, 235], textColor: 255, fontSize: 9 },
        bodyStyles: { fontSize: 8 },
        columnStyles: {
          0: { cellWidth: 25 },
          1: { cellWidth: 35 },
          2: { cellWidth: 30 },
          3: { cellWidth: 20 },
          4: { cellWidth: 20 },
          5: { cellWidth: 25 },
          6: { cellWidth: 25 },
        },
        margin: { left: 20 },
      });
      
      yPos = doc.lastAutoTable.finalY + 10;
      
      // Critical Alert Details
      const criticalAlerts = filteredAlerts.filter(a => a.severity === "Critical");
      
      if (criticalAlerts.length > 0) {
        if (yPos > 200) {
          doc.addPage();
          yPos = 20;
        }
        
        doc.setFontSize(14);
        doc.setFont("helvetica", "bold");
        doc.text("Critical Alert Details", 20, yPos);
        yPos += 8;
        
        for (const alert of criticalAlerts) {
          if (yPos > 250) {
            doc.addPage();
            yPos = 20;
          }
          
          doc.setFontSize(11);
          doc.setFont("helvetica", "bold");
          doc.setTextColor(37, 99, 235);
          doc.text(`${alert.alertId} - ${alert.category}`, 20, yPos);
          yPos += 6;
          
          doc.setFontSize(9);
          doc.setFont("helvetica", "normal");
          doc.setTextColor(0, 0, 0);
          
          doc.text(`Entity: ${alert.entity}`, 25, yPos);
          yPos += 5;
          doc.text(`Region: ${alert.region}`, 25, yPos);
          yPos += 5;
          doc.text(`Regulation: ${alert.regulation}`, 25, yPos);
          yPos += 5;
          doc.text(`Finding: ${alert.finding.substring(0, 80)}...`, 25, yPos);
          yPos += 5;
          doc.text(`Required Action: ${alert.requiredAction.substring(0, 80)}...`, 25, yPos);
          yPos += 5;
          doc.text(`Status: ${alert.status}`, 25, yPos);
          yPos += 5;
          doc.text(`Detected: ${alert.detected}`, 25, yPos);
          yPos += 10;
        }
      }
      
      // Footer
      const pageCount = doc.internal.getNumberOfPages();
      for (let i = 1; i <= pageCount; i++) {
        doc.setPage(i);
        doc.setFontSize(8);
        doc.setTextColor(128, 128, 128);
        doc.text(
          `Compliance Report - Page ${i} of ${pageCount} - Generated by CDSCO System`,
          doc.internal.pageSize.getWidth() / 2,
          doc.internal.pageSize.getHeight() - 10,
          { align: 'center' }
        );
      }
      
      doc.save(`compliance_report_${new Date().toISOString().split('T')[0]}.pdf`);
      
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
        <div className="relative mb-8 overflow-hidden rounded-lg border border-blue-200 bg-white p-6 shadow-sm lg:p-8">
          <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-blue-100/50 blur-3xl" />
          <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-gray-100/50 blur-3xl" />

          <div className="relative flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            <div className="flex items-start gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-md border border-blue-200 bg-blue-50 text-blue-600">
                <ShieldAlert className="h-7 w-7" />
              </div>

              <div>
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <span className="inline-flex rounded-md border border-green-200 bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                    LIVE MONITORING
                  </span>

                  <span className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-rose-50 px-2.5 py-1 text-xs font-semibold text-rose-700">
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-rose-400 opacity-75" />
                      <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-rose-500" />
                    </span>
                    {criticalCount} Critical
                  </span>
                </div>

                <h1 className="text-2xl font-semibold text-gray-900 lg:text-3xl">
                  Compliance Monitoring & Enforcement
                </h1>

                <p className="mt-2 max-w-3xl text-sm text-gray-600">
                  Real-time regulatory oversight for CDSCO and State Drug Control
                  authorities — track alerts, enforce actions, and maintain audit
                  readiness.
                </p>
              </div>
            </div>

            <div className="flex shrink-0 items-center gap-3">
              <div className="rounded-md border border-gray-200 bg-white px-3 py-2">
                <p className="text-xs text-gray-500">Today's Actions</p>
                <p className="text-lg font-bold text-gray-900">24</p>
              </div>

              <div className="rounded-md border border-green-200 bg-green-50 px-3 py-2">
                <p className="text-xs text-gray-500">Resolution Rate</p>
                <p className="text-lg font-bold text-green-700">78%</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="mb-6 grid gap-5 lg:grid-cols-2 xl:grid-cols-4">
          {complianceSummary.map((item) => (
            <ModernSummaryCard key={item.label} item={item} />
          ))}
        </div>

        {/* Fixed Analytics Grid */}
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

        {/* Full-width Heatmap Row */}
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
        <div className="mb-6 flex flex-col gap-4 rounded-md border border-gray-200 bg-white p-4 shadow-sm lg:flex-row lg:items-center lg:justify-between">
          <div className="relative max-w-lg flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(event) => setSearchTerm(event.target.value)}
              placeholder="Search by alert ID, entity, regulation, region..."
              className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-medium text-gray-500">
              Severity:
            </span>

            {["All", "Critical", "High", "Medium"].map((severity) => (
              <button
                key={severity}
                type="button"
                onClick={() => setSeverityFilter(severity)}
                className={`rounded-md px-3 py-1.5 text-sm font-medium transition-colors ${
                  severityFilter === severity
                    ? severity === "Critical"
                      ? "border border-rose-200 bg-rose-50 text-rose-700"
                      : severity === "High"
                      ? "border border-orange-200 bg-orange-50 text-orange-700"
                      : severity === "Medium"
                      ? "border border-amber-200 bg-amber-50 text-amber-700"
                      : "border border-blue-200 bg-blue-50 text-blue-700"
                    : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {severity}
              </button>
            ))}
          </div>
        </div>

        {/* Alerts Table */}
        <div className="mb-6 overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1280px] border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Alert ID
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Category / Owner
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Regulation
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Entity / Region
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Severity
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Status
                  </th>
                  <th className="border-b border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100 bg-white">
                {filteredAlerts.map((alert) => (
                  <ModernAlertRow
                    key={alert.alertId}
                    alert={alert}
                    isSelected={selectedAlert === alert.alertId}
                    onSelect={() =>
                      setSelectedAlert(
                        selectedAlert === alert.alertId ? null : alert.alertId
                      )
                    }
                  />
                ))}

                {filteredAlerts.length === 0 && (
                  <tr>
                    <td
                      colSpan={7}
                      className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p>No compliance alerts found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

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
        <div className="mt-6 rounded-lg border border-blue-200 bg-gradient-to-r from-blue-50 via-white to-gray-50 p-5 shadow-sm">
          <div className="flex flex-col items-center justify-between gap-4 lg:flex-row">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-blue-100 text-blue-600">
                <ShieldCheck className="h-5 w-5" />
              </div>

              <div>
                <p className="font-semibold text-gray-900">
                  Audit Ready System
                </p>
                <p className="text-sm text-gray-500">
                  All actions are timestamped and logged for regulatory review.
                </p>
              </div>
            </div>

            <button 
              onClick={generatePDFReport}
              disabled={isGenerating}
              className="rounded-md bg-blue-600 px-5 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              {isGenerating ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Generating...
                </>
              ) : (
                'Download Compliance Report'
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ModernPanel({ title, icon: Icon, badge, tone = "blue", children }) {
  const styles = {
    blue: {
      header: "border-b border-blue-200 bg-blue-50",
      border: "border-blue-200",
      icon: "bg-blue-50 text-blue-600",
      badge: "bg-blue-50 text-blue-700 border border-blue-200",
      title: "text-gray-900",
    },
    emerald: {
      header: "border-b border-green-200 bg-green-50",
      border: "border-green-200",
      icon: "bg-green-50 text-green-600",
      badge: "bg-green-50 text-green-700 border border-green-200",
      title: "text-gray-900",
    },
    amber: {
      header: "border-b border-amber-200 bg-amber-50",
      border: "border-amber-200",
      icon: "bg-amber-50 text-amber-600",
      badge: "bg-amber-50 text-amber-700 border border-amber-200",
      title: "text-gray-900",
    },
    rose: {
      header: "border-b border-rose-200 bg-rose-50",
      border: "border-rose-200",
      icon: "bg-rose-50 text-rose-600",
      badge: "bg-rose-50 text-rose-700 border border-rose-200",
      title: "text-gray-900",
    },
    slate: {
      header: "border-b border-gray-200 bg-gray-50",
      border: "border-gray-200",
      icon: "bg-gray-50 text-gray-600",
      badge: "bg-gray-50 text-gray-600 border border-gray-200",
      title: "text-gray-900",
    },
  };

  const active = styles[tone] || styles.blue;

  return (
    <div className={`h-fit overflow-hidden rounded-lg border ${active.border} bg-white shadow-sm`}>
      <div className={`flex items-center justify-between gap-4 border-b ${active.header} px-4 py-3`}>
        <div className="flex items-center gap-2">
          <div className={`flex h-8 w-8 items-center justify-center rounded-md ${active.icon}`}>
            <Icon className="h-4 w-4" />
          </div>
          <h3 className={`font-semibold ${active.title}`}>{title}</h3>
        </div>
        <span className={`rounded-md px-2 py-0.5 text-xs font-medium ${active.badge}`}>
          {badge}
        </span>
      </div>
      <div className="p-4">{children}</div>
    </div>
  );
}

function ModernSummaryCard({ item }) {
  const Icon = item.icon;
  const tone = toneStyles[item.tone];
  const TrendIcon = item.trend === "up" ? ArrowUpRight : ArrowDownRight;
  const trendColor =
    item.trend === "up" ? "text-green-600" : "text-rose-600";

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${tone.bg} ${tone.text} border ${tone.border}`}>
          <Icon className="h-5 w-5" />
        </div>
        <div className="flex items-center gap-1">
          <TrendIcon className={`h-3.5 w-3.5 ${trendColor}`} />
          <span className={`text-sm font-medium ${trendColor}`}>
            {item.change}
          </span>
        </div>
      </div>
      <p className="text-sm font-medium text-gray-500">{item.label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{item.value}</p>
      <p className="mt-1 text-xs text-gray-500">{item.detail}</p>
    </div>
  );
}

function ModernChecklistRow({ item, compact = false }) {
  const Icon = item.icon;

  const getColor = () => {
    if (item.score >= 90) return "bg-green-500";
    if (item.score >= 75) return "bg-blue-500";
    if (item.score >= 65) return "bg-amber-500";
    return "bg-rose-500";
  };

  const getStatusColor = () => {
    if (item.status === "Strong") return "text-green-700 bg-green-50";
    if (item.status === "Watch") return "text-amber-700 bg-amber-50";
    return "text-rose-700 bg-rose-50";
  };

  const TrendIcon = item.trend.startsWith("+") ? TrendingUp : TrendingDown;
  const trendColor = item.trend.startsWith("+")
    ? "text-green-500"
    : "text-rose-500";

  return (
    <div className={`rounded-md transition-colors hover:bg-gray-50 ${compact ? "p-2" : "p-3"}`}>
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-2">
          <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-gray-100 text-gray-600">
            <Icon className="h-3.5 w-3.5" />
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-gray-800 truncate">
              {item.label}
            </p>
            <span className={`mt-0.5 inline-block rounded-md px-1.5 py-0.5 text-xs font-medium ${getStatusColor()}`}>
              {item.status}
            </span>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1.5">
          <span className="text-base font-bold text-gray-800">{item.score}%</span>
          <div className="flex items-center gap-0.5">
            <TrendIcon className={`h-2.5 w-2.5 ${trendColor}`} />
            <span className={`text-xs font-medium ${trendColor}`}>
              {item.trend}
            </span>
          </div>
        </div>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-gray-100">
        <div
          className={`h-full rounded-full ${getColor()} transition-all duration-500`}
          style={{ width: `${item.score}%` }}
        />
      </div>
    </div>
  );
}

function CategoryCard({ item }) {
  return (
    <div className={`flex flex-col rounded-md border ${item.bg} p-3 transition-colors hover:shadow-sm`}>
      <div className="mb-2 flex items-center justify-between">
        <span className={`text-sm font-semibold ${item.text}`}>
          {item.label}
        </span>
        <span className={`text-base font-bold ${item.text}`}>
          {item.value}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/70">
        <div
          className={`h-full rounded-full bg-gradient-to-r ${item.color}`}
          style={{ width: `${item.percent}%` }}
        />
      </div>
      <p className="mt-2 text-xs text-gray-500">
        {item.percent}% of total alerts
      </p>
    </div>
  );
}

function ComplianceHeatmap({ data }) {
  return (
    <div className="overflow-x-auto">
      <div className="min-w-[860px] overflow-hidden rounded-md border border-blue-200 bg-white">
        <div className="grid grid-cols-[120px_repeat(4,minmax(130px,1fr))] border-b border-blue-200 bg-blue-50 text-xs font-semibold uppercase tracking-wider text-blue-900">
          <div className="px-3 py-2.5">State</div>
          <div className="px-3 py-2.5 text-center">Critical</div>
          <div className="px-3 py-2.5 text-center">High</div>
          <div className="px-3 py-2.5 text-center">Medium</div>
          <div className="px-3 py-2.5 text-center">Score</div>
        </div>

        <div className="divide-y divide-blue-100">
          {data.map((item) => (
            <div
              key={item.state}
              className="grid grid-cols-[120px_repeat(4,minmax(130px,1fr))] items-center transition hover:bg-blue-50/40"
            >
              <div className="px-3 py-2.5">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-gray-900 text-sm font-bold text-white">
                  {item.state}
                </span>
              </div>
              <HeatCell value={item.critical} type="critical" />
              <HeatCell value={item.high} type="high" />
              <HeatCell value={item.medium} type="medium" />
              <ScoreCell score={item.score} />
            </div>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3 border-t border-blue-200 bg-blue-50 px-3 py-2 text-xs text-gray-600">
          <Legend color="bg-rose-500" label="Critical" />
          <Legend color="bg-orange-500" label="High" />
          <Legend color="bg-amber-400" label="Medium" />
          <Legend color="bg-blue-500" label="Compliance score" />
        </div>
      </div>
    </div>
  );
}

function HeatCell({ value, type }) {
  const intensity =
    value >= 5 ? "strong" : value >= 3 ? "medium" : value >= 1 ? "light" : "empty";

  const styles = {
    critical: {
      strong: "bg-rose-600 text-white",
      medium: "bg-rose-200 text-rose-900",
      light: "bg-rose-50 text-rose-700",
      empty: "bg-gray-50 text-gray-400",
    },
    high: {
      strong: "bg-orange-500 text-white",
      medium: "bg-orange-200 text-orange-900",
      light: "bg-orange-50 text-orange-700",
      empty: "bg-gray-50 text-gray-400",
    },
    medium: {
      strong: "bg-amber-400 text-amber-950",
      medium: "bg-amber-200 text-amber-900",
      light: "bg-amber-50 text-amber-700",
      empty: "bg-gray-50 text-gray-400",
    },
  };

  return (
    <div className="px-2 py-2">
      <div className={`mx-auto flex h-10 w-full max-w-[110px] items-center justify-center rounded-md text-sm font-bold ${styles[type][intensity]}`}>
        {value}
      </div>
    </div>
  );
}

function ScoreCell({ score }) {
  const scoreStyle =
    score >= 85
      ? "bg-green-50 text-green-700 border-green-200"
      : score >= 75
      ? "bg-blue-50 text-blue-700 border-blue-200"
      : score >= 65
      ? "bg-amber-50 text-amber-700 border-amber-200"
      : "bg-rose-50 text-rose-700 border-rose-200";

  return (
    <div className="px-2 py-2">
      <div className={`mx-auto flex h-10 w-full max-w-[110px] items-center justify-center rounded-md border text-sm font-bold ${scoreStyle}`}>
        {score}%
      </div>
    </div>
  );
}

function Legend({ color, label }) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-full ${color}`} />
      <span className="text-xs">{label}</span>
    </span>
  );
}

function ActionItem({ action }) {
  const statusStyles = {
    completed: "bg-green-50 text-green-700 border border-green-200",
    pending: "bg-amber-50 text-amber-700 border border-amber-200",
    review: "bg-blue-50 text-blue-700 border border-blue-200",
  };

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-200 p-3 transition-colors hover:bg-gray-50">
      <div className="flex-1">
        <p className="text-sm font-semibold text-gray-800">
          {action.action}
        </p>
        <p className="text-xs text-gray-500">
          {action.entity} • {action.officer}
        </p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-xs text-gray-400">{action.time}</span>
        <span className={`rounded-md px-1.5 py-0.5 text-xs font-medium ${statusStyles[action.status]}`}>
          {action.status}
        </span>
      </div>
    </div>
  );
}

function PriorityItemModern({ title, text, icon: Icon, urgency }) {
  const urgencyColors = {
    high: "border-l-4 border-l-rose-400 bg-rose-50/40",
    medium: "border-l-4 border-l-amber-400 bg-amber-50/40",
    low: "border-l-4 border-l-blue-400 bg-blue-50/40",
  };

  return (
    <div className={`rounded-md p-3 ${urgencyColors[urgency]}`}>
      <div className="flex gap-2">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-white shadow-sm border border-gray-200">
          <Icon className="h-3.5 w-3.5 text-gray-600" />
        </div>
        <div>
          <p className="font-semibold text-gray-800 text-sm">{title}</p>
          <p className="mt-0.5 text-xs text-gray-500">{text}</p>
        </div>
      </div>
    </div>
  );
}

function ModernAlertRow({ alert, isSelected, onSelect }) {
  const getSeverityStyles = () => {
    switch (alert.severity) {
      case "Critical":
        return "bg-rose-50 text-rose-700 border-rose-200";
      case "High":
        return "bg-orange-50 text-orange-700 border-orange-200";
      default:
        return "bg-amber-50 text-amber-700 border-amber-200";
    }
  };

  const getStatusStyles = () => {
    switch (alert.status) {
      case "Open":
        return "bg-rose-50 text-rose-700 border border-rose-200";
      case "Under Review":
        return "bg-blue-50 text-blue-700 border border-blue-200";
      case "Pending Evidence":
        return "bg-amber-50 text-amber-700 border border-amber-200";
      default:
        return "bg-gray-50 text-gray-700 border border-gray-200";
    }
  };

  return (
    <tr
      className={`cursor-pointer transition-colors hover:bg-blue-50/40 ${
        isSelected ? "bg-blue-50/40" : ""
      }`}
      onClick={onSelect}
    >
      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm font-medium text-blue-700">
          {alert.alertId}
        </span>
      </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-semibold text-gray-800">
          {alert.category}
        </p>
        <p className="text-xs text-gray-500">{alert.owner}</p>
       </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <p className="max-w-[220px] text-xs text-gray-600 line-clamp-2">
          {alert.regulation}
        </p>
       </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-medium text-gray-800">{alert.entity}</p>
        <p className="text-xs text-gray-500">{alert.region}</p>
       </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${getSeverityStyles()}`}>
          {alert.severity}
        </span>
       </td>

      <td className="border-r border-blue-100 px-4 py-3">
        <span className={`inline-flex rounded-md px-2 py-0.5 text-xs font-semibold ${getStatusStyles()}`}>
          {alert.status}
        </span>
       </td>

      <td className="px-4 py-3">
        <button
          type="button"
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-sm font-medium text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <Eye className="h-3.5 w-3.5" />
          Review
        </button>
       </td>
     </tr>
  );
}

function ModernDetailCard({ alert }) {
  if (!alert) return null;

  return (
    <div className="rounded-lg border border-blue-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="font-mono text-sm font-semibold text-blue-700">
              {alert.alertId}
            </span>
            <span className="rounded-md border border-rose-200 bg-rose-50 px-2 py-0.5 text-xs font-semibold text-rose-700">
              {alert.severity}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-gray-800">
            {alert.category}
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            Owner: {alert.owner} • Detected: {alert.detected}
          </p>
        </div>

        <div className="flex gap-2">
          <button className="inline-flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100">
            <CheckCircle2 className="h-3.5 w-3.5" />
            Mark Resolved
          </button>
          <button className="inline-flex items-center gap-1.5 rounded-md border border-rose-200 bg-white px-3 py-1.5 text-sm font-medium text-rose-600 transition-colors hover:bg-rose-50">
            <Send className="h-3.5 w-3.5" />
            Escalate
          </button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Finding
          </p>
          <p className="mt-1 text-sm text-gray-700">
            {alert.finding}
          </p>
        </div>

        <div className="rounded-md bg-gray-50 p-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Required Government Action
          </p>
          <p className="mt-1 text-sm text-gray-700">
            {alert.requiredAction}
          </p>
        </div>
      </div>

      <div className="mt-3 rounded-md border border-gray-200 bg-gray-50 p-2.5">
        <p className="text-xs text-gray-500">
          <span className="font-semibold">Regulatory Reference:</span>{" "}
          {alert.regulation}
        </p>
      </div>
    </div>
  );
}