import { useMemo, useState } from "react";
import {
  Activity,
  AlertTriangle,
  CalendarDays,
  CheckCircle2,
  ClipboardCheck,
  Download,
  Eye,
  Factory,
  FileCheck2,
  Filter,
  Gavel,
  MapPin,
  PackageCheck,
  RefreshCcw,
  Search,
  ShieldCheck,
  UserCheck,
  ChevronLeft,
  ChevronRight,
  X,
  User,
  Mail,
  Phone,
  Calendar,
  FileText,
  Printer,
  Share2,
  AlertCircle,
} from "lucide-react";
import AssignOfficerModal from "../../../Components/Popups/Government/AssignOfficerModal";
import GenerateReportModal from "../../../Components/Popups/Government/GenerateReportModal";
import MarkVerifiedModal from "../../../Components/Popups/Government/MarkVerifiedModal";
import ViewAuditModal from "../../../Components/Popups/Government/ViewAuditModal";
import * as XLSX from 'xlsx';

const auditSummary = [
  {
    label: "Total Audit Events",
    value: "1,482",
    detail: "Across manufacturers, pharmacies, claims and batches",
    icon: Activity,
    tone: "blue",
  },
  {
    label: "Manufacturer Audits",
    value: "286",
    detail: "License, batch and GMP-related reviews",
    icon: Factory,
    tone: "emerald",
  },
  {
    label: "Pending Review",
    value: "34",
    detail: "Require regulatory officer action",
    icon: AlertTriangle,
    tone: "amber",
  },
  {
    label: "Critical Findings",
    value: "11",
    detail: "High-risk issues requiring escalation",
    icon: Gavel,
    tone: "rose",
  },
];

const manufacturerAuditScorecards = [
  {
    manufacturer: "Cipla Limited",
    location: "Mumbai Manufacturing Unit",
    licenseId: "LIC-MFG-CDSCO-2026-001",
    score: 92,
    status: "Compliant",
    lastAudit: "5/2/2024",
    nextAudit: "8/2/2024",
    findings: 2,
    risk: "Low",
  },
  {
    manufacturer: "Sun Pharmaceuticals Ltd.",
    location: "Ahmedabad Manufacturing Unit",
    licenseId: "LIC-MFG-CDSCO-2026-002",
    score: 78,
    status: "Observation",
    lastAudit: "4/25/2024",
    nextAudit: "7/25/2024",
    findings: 6,
    risk: "Medium",
  },
  {
    manufacturer: "Bharat Lifecare Manufacturing",
    location: "Hyderabad Unit II",
    licenseId: "LIC-MFG-CDSCO-2026-003",
    score: 64,
    status: "Action Required",
    lastAudit: "4/18/2024",
    nextAudit: "5/18/2024",
    findings: 11,
    risk: "High",
  },
];

const auditEvents = [
  {
    auditId: "AUD-MFG-0001",
    timestamp: "5/3/2024, 10:45 AM",
    actor: "Regulatory Admin",
    role: "CDSCO Officer",
    module: "Manufacturer Licensing",
    entity: "Cipla Limited",
    entityType: "Manufacturer",
    action: "License extension approved",
    auditType: "License Audit",
    severity: "Low",
    status: "Closed",
    region: "Maharashtra",
    ipAddress: "10.21.45.122",
    reference: "LIC-MFG-CDSCO-2026-001",
    remarks:
      "License validity reviewed with approved drug type mapping and active batch controls verified.",
  },
  {
    auditId: "AUD-BAT-0002",
    timestamp: "5/3/2024, 09:30 AM",
    actor: "State Drug Inspector",
    role: "State Authority",
    module: "Medicine Traceability",
    entity: "BATCH003",
    entityType: "Medicine Batch",
    action: "Batch ownership chain reviewed",
    auditType: "Traceability Audit",
    severity: "Medium",
    status: "Under Review",
    region: "Karnataka",
    ipAddress: "10.21.41.087",
    reference: "BATCH003",
    remarks:
      "Transfer history reviewed from manufacturer to pharmacy. Two downstream acknowledgements pending.",
  },
  {
    auditId: "AUD-REC-0003",
    timestamp: "5/2/2024, 04:12 PM",
    actor: "CDSCO Quality Desk",
    role: "Quality Reviewer",
    module: "Batch Recalls",
    entity: "RECALL-BATCH003",
    entityType: "Recall Notice",
    action: "Recall issued for contaminated batch",
    auditType: "Recall Audit",
    severity: "Critical",
    status: "Open",
    region: "Maharashtra",
    ipAddress: "10.21.42.011",
    reference: "RECALL-BATCH003",
    remarks:
      "Recall initiated due to contamination detected during quality audit. Stock quarantine verification required.",
  },
  {
    auditId: "AUD-PMJAY-0004",
    timestamp: "5/2/2024, 01:20 PM",
    actor: "PM-JAY Review Cell",
    role: "Claims Reviewer",
    module: "PM-JAY Claims",
    entity: "CLAIM-PMJAY-99999999",
    entityType: "Healthcare Claim",
    action: "Claim approved after manual verification",
    auditType: "Claim Audit",
    severity: "Low",
    status: "Closed",
    region: "Delhi",
    ipAddress: "10.21.49.220",
    reference: "CLAIM-PMJAY-99999999",
    remarks:
      "Beneficiary eligibility, pharmacy license and medicine dispense record verified before approval.",
  },
  {
    auditId: "AUD-CMP-0005",
    timestamp: "5/1/2024, 05:50 PM",
    actor: "Compliance Desk",
    role: "Regulatory Compliance",
    module: "Compliance Alerts",
    entity: "North India Pharma Distributors",
    entityType: "Distributor",
    action: "Suspicious transfer velocity flagged",
    auditType: "Distribution Audit",
    severity: "High",
    status: "Escalated",
    region: "Delhi",
    ipAddress: "10.21.44.077",
    reference: "ALRT-DIST-022",
    remarks:
      "Unusual transfer pattern detected between distributor and pharmacy. Supporting documents requested.",
  },
  {
    auditId: "AUD-MFG-0006",
    timestamp: "4/30/2024, 11:15 AM",
    actor: "Regulatory Admin",
    role: "CDSCO Officer",
    module: "Drug Registration",
    entity: "Atorvastatin 20mg",
    entityType: "Drug Type",
    action: "Drug type regulatory code updated",
    auditType: "Drug Registry Audit",
    severity: "Low",
    status: "Closed",
    region: "National",
    ipAddress: "10.21.45.122",
    reference: "CDSCO-ATV-020",
    remarks:
      "Regulatory metadata updated and linked manufacturer licenses revalidated.",
  },
  {
    auditId: "AUD-EXP-0007",
    timestamp: "4/29/2024, 03:35 PM",
    actor: "State Drug Inspector",
    role: "State Authority",
    module: "Compliance Alerts",
    entity: "BATCH005",
    entityType: "Medicine Unit",
    action: "Expired stock found in pharmacy inventory",
    auditType: "Expiry Audit",
    severity: "Critical",
    status: "Open",
    region: "Uttar Pradesh",
    ipAddress: "10.21.47.094",
    reference: "ALRT-EXP-008",
    remarks:
      "Expired medicine units still mapped to active pharmacy stock. Quarantine and inspection workflow required.",
  },
];

const auditChecklist = [
  {
    title: "Manufacturing license validity",
    description: "Verify active CDSCO/state license, expiry, renewal history and licensed drug type mapping.",
    completion: 94,
  },
  {
    title: "Batch creation controls",
    description: "Check batch number, lot number, expiry date, drug type approval and manufacturer authorization.",
    completion: 88,
  },
  {
    title: "Ownership transfer trail",
    description: "Confirm every movement has sender, receiver, timestamp, branch and authorized role validation.",
    completion: 82,
  },
  {
    title: "Recall response audit",
    description: "Validate recall issuance, pharmacy acknowledgement, stock freeze, quarantine and release closure.",
    completion: 76,
  },
  {
    title: "PM-JAY claim evidence",
    description: "Match claim with beneficiary, pharmacy license, medicine dispense record and scheme eligibility.",
    completion: 71,
  },
];

const monthlyAuditTrend = [
  { month: "Jan", audits: 180, findings: 24 },
  { month: "Feb", audits: 240, findings: 31 },
  { month: "Mar", audits: 310, findings: 42 },
  { month: "Apr", audits: 420, findings: 55 },
  { month: "May", audits: 332, findings: 34 },
];

const toneStyles = {
  blue: {
    bg: "bg-blue-50",
    text: "text-blue-700",
    border: "border-blue-200",
    glow: "bg-blue-500/10",
  },
  emerald: {
    bg: "bg-emerald-50",
    text: "text-emerald-700",
    border: "border-emerald-200",
    glow: "bg-emerald-500/10",
  },
  amber: {
    bg: "bg-amber-50",
    text: "text-amber-700",
    border: "border-amber-200",
    glow: "bg-amber-500/10",
  },
  rose: {
    bg: "bg-rose-50",
    text: "text-rose-700",
    border: "border-rose-200",
    glow: "bg-rose-500/10",
  },
};

export default function AuditTrail() {
  const [searchTerm, setSearchTerm] = useState("");
  const [severityFilter, setSeverityFilter] = useState("All");
  const [auditTypeFilter, setAuditTypeFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAudit, setSelectedAudit] = useState(null);
  const [modalState, setModalState] = useState({
    assignOfficer: false,
    generateReport: false,
    markVerified: false,
    viewAudit: false,
  });
  const [exportMessage, setExportMessage] = useState("");
  const [exportFormat, setExportFormat] = useState("PDF");
  const [showFormatMenu, setShowFormatMenu] = useState(false);

  const itemsPerPage = 10;

  const auditTypes = useMemo(() => {
    return ["All", ...new Set(auditEvents.map((event) => event.auditType))];
  }, []);

  const filteredAudits = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();

    return auditEvents.filter((event) => {
      const matchesSeverity =
        severityFilter === "All" || event.severity === severityFilter;

      const matchesAuditType =
        auditTypeFilter === "All" || event.auditType === auditTypeFilter;

      const matchesQuery =
        !query ||
        event.auditId.toLowerCase().includes(query) ||
        event.actor.toLowerCase().includes(query) ||
        event.module.toLowerCase().includes(query) ||
        event.entity.toLowerCase().includes(query) ||
        event.region.toLowerCase().includes(query) ||
        event.reference.toLowerCase().includes(query) ||
        event.action.toLowerCase().includes(query);

      return matchesSeverity && matchesAuditType && matchesQuery;
    });
  }, [searchTerm, severityFilter, auditTypeFilter]);

  const totalPages = Math.ceil(filteredAudits.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentAudits = filteredAudits.slice(startIndex, endIndex);

  // Generate HTML for PDF export
  const generatePDFHTML = () => {
    const getSeverityColor = (severity) => {
      switch(severity) {
        case 'Critical': return '#dc2626';
        case 'High': return '#ea580c';
        case 'Medium': return '#d97706';
        default: return '#059669';
      }
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Audit Report - ${new Date().toISOString().split('T')[0]}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body {
            font-family: 'Helvetica Neue', Arial, sans-serif;
            padding: 40px;
            color: #1f2937;
            line-height: 1.5;
          }
          .container { max-width: 1200px; margin: 0 auto; }
          .header {
            background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%);
            padding: 30px;
            border-radius: 12px;
            margin-bottom: 30px;
            border: 1px solid #bfdbfe;
          }
          .header-content { display: flex; justify-content: space-between; align-items: flex-start; }
          .logo-section { display: flex; align-items: center; gap: 15px; }
          .logo {
            width: 50px; height: 50px; background: #2563eb; border-radius: 10px;
            display: flex; align-items: center; justify-content: center;
            color: white; font-size: 24px; font-weight: bold;
          }
          h1 { font-size: 24px; color: #1e3a8a; margin-bottom: 5px; }
          .subtitle { color: #3b82f6; font-size: 14px; }
          .report-date { text-align: right; font-size: 12px; color: #6b7280; }
          .section-title {
            font-size: 18px; font-weight: bold; color: #1e40af;
            margin: 25px 0 15px 0; padding-bottom: 8px;
            border-bottom: 2px solid #bfdbfe;
          }
          .summary-grid {
            display: grid; grid-template-columns: repeat(4, 1fr);
            gap: 15px; margin-bottom: 30px;
          }
          .summary-card {
            border: 1px solid #e5e7eb; border-radius: 8px;
            padding: 15px; background: white;
          }
          .summary-label { font-size: 12px; color: #6b7280; margin-bottom: 5px; }
          .summary-value { font-size: 24px; font-weight: bold; color: #1f2937; }
          .summary-detail { font-size: 10px; color: #9ca3af; margin-top: 5px; }
          table {
            width: 100%; border-collapse: collapse; margin-bottom: 20px;
          }
          th {
            background: #f3f4f6; padding: 10px; text-align: left;
            font-size: 12px; font-weight: bold; color: #374151;
            border: 1px solid #e5e7eb;
          }
          td {
            padding: 8px 10px; font-size: 11px; border: 1px solid #e5e7eb;
            vertical-align: top;
          }
          .severity-badge {
            display: inline-block; padding: 2px 6px; border-radius: 4px;
            font-size: 10px; font-weight: 600;
          }
          .footer {
            margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb;
            text-align: center; font-size: 10px; color: #9ca3af;
          }
          @media print {
            body { padding: 0; }
            .page-break { page-break-before: always; }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <div class="header-content">
              <div class="logo-section">
                <div class="logo">CDSCO</div>
                <div>
                  <h1>Regulatory Audit Report</h1>
                  <div class="subtitle">Central Drugs Standard Control Organization</div>
                </div>
              </div>
              <div class="report-date">
                Generated: ${new Date().toLocaleString()}
              </div>
            </div>
          </div>

          <!-- Summary Section -->
          <div class="section-title">Audit Summary</div>
          <div class="summary-grid">
            ${auditSummary.map(item => `
              <div class="summary-card">
                <div class="summary-label">${item.label}</div>
                <div class="summary-value">${item.value}</div>
                <div class="summary-detail">${item.detail}</div>
              </div>
            `).join('')}
          </div>

          <!-- Filters Info -->
          <div class="section-title">Applied Filters</div>
          <table>
            <tr><th style="width: 150px">Filter Type</th><th>Value</th></tr>
            <tr><td>Severity</td><td>${severityFilter}</td></tr>
            <tr><td>Audit Type</td><td>${auditTypeFilter}</td></tr>
            ${searchTerm ? `<tr><td>Search Term</td><td>${searchTerm}</td></tr>` : ''}
          </table>

          <!-- Audit Events Table -->
          <div class="section-title">Audit Events (${filteredAudits.length} records)</div>
          <table>
            <thead>
              <tr>
                <th>Audit ID</th><th>Timestamp</th><th>Actor</th><th>Module</th>
                <th>Entity</th><th>Audit Type</th><th>Severity</th><th>Status</th><th>Region</th>
              </tr>
            </thead>
            <tbody>
              ${filteredAudits.map(event => `
                <tr>
                  <td>${event.auditId}</td>
                  <td>${event.timestamp}</td>
                  <td>${event.actor}</td>
                  <td>${event.module}</td>
                  <td>${event.entity}</td>
                  <td>${event.auditType}</td>
                  <td><span class="severity-badge" style="background: ${getSeverityColor(event.severity)}20; color: ${getSeverityColor(event.severity)}">${event.severity}</span></td>
                  <td>${event.status}</td>
                  <td>${event.region}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Manufacturer Scorecards -->
          <div class="section-title">Manufacturer Audit Scorecards</div>
          <table>
            <thead>
              <tr><th>Manufacturer</th><th>Location</th><th>Score</th><th>Status</th><th>Risk</th><th>Findings</th><th>Last Audit</th><th>Next Audit</th></tr>
            </thead>
            <tbody>
              ${manufacturerAuditScorecards.map(m => `
                <tr>
                  <td>${m.manufacturer}</td>
                  <td>${m.location}</td>
                  <td>${m.score}%</td>
                  <td>${m.status}</td>
                  <td>${m.risk}</td>
                  <td>${m.findings}</td>
                  <td>${m.lastAudit}</td>
                  <td>${m.nextAudit}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <!-- Audit Checklist -->
          <div class="section-title">Audit Checklist Progress</div>
          <table>
            <thead><tr><th>Checklist Item</th><th>Completion</th></tr></thead>
            <tbody>
              ${auditChecklist.map(item => `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.completion}%</td>
                </tr>
              `).join('')}
            </tbody>
          </table>

          <div class="footer">
            <p>This is an electronically generated regulatory audit report</p>
            <p>© CDSCO - Central Drugs Standard Control Organization</p>
          </div>
        </div>
      </body>
      </html>
    `;
  };

  // Generate Excel data
  const generateExcelData = () => {
    const auditData = filteredAudits.map(event => ({
      "Audit ID": event.auditId,
      "Timestamp": event.timestamp,
      "Actor": event.actor,
      "Role": event.role,
      "Module": event.module,
      "Entity": event.entity,
      "Entity Type": event.entityType,
      "Action": event.action,
      "Audit Type": event.auditType,
      "Severity": event.severity,
      "Status": event.status,
      "Region": event.region,
      "Reference": event.reference,
      "Remarks": event.remarks,
    }));
    
    return auditData;
  };

  // Export as PDF
  const exportAsPDF = () => {
    setExportMessage("Generating PDF...");
    const htmlContent = generatePDFHTML();
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    
    if (win) {
      win.onload = () => {
        setTimeout(() => {
          win.print();
          setTimeout(() => {
            URL.revokeObjectURL(url);
            setExportMessage("PDF generated successfully!");
            setTimeout(() => setExportMessage(""), 3000);
          }, 100);
        }, 500);
      };
    }
  };

  // Export as Excel
  const exportAsExcel = () => {
    setExportMessage("Generating Excel...");
    setTimeout(() => {
      const data = generateExcelData();
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      
      // Adjust column widths
      const colWidths = [
        { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 15 },
        { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 30 },
        { wch: 15 }, { wch: 10 }, { wch: 12 }, { wch: 15 },
        { wch: 20 }, { wch: 50 }
      ];
      ws['!cols'] = colWidths;
      
      XLSX.utils.book_append_sheet(wb, ws, "Audit Report");
      XLSX.writeFile(wb, `audit-report-${new Date().toISOString().split('T')[0]}.xlsx`);
      setExportMessage("Excel generated successfully!");
      setTimeout(() => setExportMessage(""), 3000);
    }, 500);
  };

  // Export as JSON
  const exportAsJSON = () => {
    setExportMessage("Exporting JSON...");
    setTimeout(() => {
      const reportData = {
        exportedAt: new Date().toISOString(),
        totalAudits: filteredAudits.length,
        filters: { severity: severityFilter, auditType: auditTypeFilter, search: searchTerm },
        audits: filteredAudits,
        summary: auditSummary,
        manufacturers: manufacturerAuditScorecards,
        checklist: auditChecklist,
      };
      
      const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: "application/json" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `audit-report-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      setExportMessage("JSON exported successfully!");
      setTimeout(() => setExportMessage(""), 3000);
    }, 500);
  };

  const handleExportReport = () => {
    switch(exportFormat) {
      case "PDF":
        exportAsPDF();
        break;
      case "Excel":
        exportAsExcel();
        break;
      case "JSON":
        exportAsJSON();
        break;
      default:
        exportAsPDF();
    }
    setShowFormatMenu(false);
  };

  const openModal = (modalName, audit = null) => {
    setSelectedAudit(audit);
    setModalState(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModalState(prev => ({ ...prev, [modalName]: false }));
    setSelectedAudit(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="pt-16 lg:pt-20" />
      
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8 flex flex-col gap-4 border-b border-blue-200 pb-6 lg:flex-row lg:items-center lg:justify-between lg:gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded bg-blue-50">
              <Activity className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="whitespace-nowrap text-2xl font-semibold text-gray-900 lg:text-3xl">
                Audit Trail
              </h1>
            </div>
          </div>

          <div className="relative">
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setShowFormatMenu(!showFormatMenu)}
                className="inline-flex items-center justify-center gap-2 rounded border border-blue-600 bg-white px-5 py-2.5 text-sm font-medium text-blue-600 shadow-sm hover:bg-blue-50 transition-colors"
              >
                <Filter className="h-4 w-4" />
                <span>{exportFormat}</span>
              </button>
              <button
                type="button"
                onClick={handleExportReport}
                className="inline-flex w-auto items-center justify-center gap-2 rounded bg-blue-600 px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors"
              >
                <Download className="h-4 w-4" />
                <span className="whitespace-nowrap">Export Audit Report</span>
              </button>
            </div>
            
            {showFormatMenu && (
              <div className="absolute top-full right-0 mt-2 rounded-md border border-gray-200 bg-white shadow-lg z-20 min-w-[120px]">
                {["PDF", "Excel", "JSON"].map((format) => (
                  <button
                    key={format}
                    onClick={() => {
                      setExportFormat(format);
                      setShowFormatMenu(false);
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                      exportFormat === format ? "bg-blue-50 text-blue-600" : "text-gray-700"
                    }`}
                  >
                    {format}
                  </button>
                ))}
              </div>
            )}
            
            {exportMessage && (
              <div className="absolute top-full right-0 mt-2 rounded-md bg-green-50 border border-green-200 px-3 py-1.5 text-sm text-green-700 whitespace-nowrap z-10">
                {exportMessage}
              </div>
            )}
          </div>
        </div>

        {/* Rest of your component remains the same */}
        <p className="mb-6 text-base text-gray-600">
          Continuous audit monitoring for manufacturers, medicine batches,
          licenses, transfers, recalls, PM-JAY claims and compliance actions.
        </p>

        {/* Gov purpose note */}
        <section className="mb-6 rounded-lg border border-blue-200 bg-white p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-blue-700">
                Regulatory Audit Control
              </p>
              <h2 className="mt-2 text-lg font-semibold text-gray-900">
                Manufacturer audit readiness and accountability monitoring
              </h2>
              <p className="mt-2 max-w-5xl text-sm text-gray-600">
                This audit page helps government officers review who performed
                each action, what entity was affected, when it happened, which
                manufacturer or batch was involved, and whether further
                regulatory action is required.
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2 rounded-md border border-green-200 bg-green-50 px-3 py-2 text-sm font-medium text-green-700">
              <ShieldCheck className="h-4 w-4" />
              Immutable log view
            </div>
          </div>
        </section>

        {/* Summary cards */}
        <section className="mb-6 grid grid-cols-2 gap-4 xl:grid-cols-4">
          {auditSummary.map((item) => (
            <SummaryCard key={item.label} item={item} />
          ))}
        </section>

        {/* Manufacturer scorecards */}
        <section className="mb-6">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Manufacturer Audit Scorecards
              </h2>
              <p className="mt-1 text-sm text-gray-500">
                Regular audit readiness view for licensed manufacturers.
              </p>
            </div>
            <div className="text-sm text-gray-500">
              {manufacturerAuditScorecards.length} manufacturers
            </div>
          </div>

          <div className="max-h-[600px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {manufacturerAuditScorecards.map((manufacturer) => (
                <ManufacturerAuditCard
                  key={manufacturer.licenseId}
                  manufacturer={manufacturer}
                />
              ))}
            </div>
          </div>
        </section>

        {/* Analytics */}
        <section className="mb-6 grid gap-6 md:grid-cols-2">
          <Panel title="Audit volume and findings trend" icon={RefreshCcw} className="h-[320px]">
            <AuditTrendChart data={monthlyAuditTrend} />
          </Panel>

          <Panel title="Manufacturer audit checklist" icon={ClipboardCheck} className="h-[320px]">
            <div className="h-[260px] overflow-y-auto pr-1 space-y-3 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb:hover]:bg-gray-400">
              {auditChecklist.map((item) => (
                <ChecklistRow key={item.title} item={item} />
              ))}
            </div>
          </Panel>
        </section>

        {/* Filters */}
        <section className="mb-6 rounded-md border border-blue-200 bg-white p-4 shadow-sm">
          <div className="flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
            <div className="w-full max-w-md">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-blue-400" />
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(event) => {
                    setSearchTerm(event.target.value);
                    setCurrentPage(1);
                  }}
                  placeholder="Search by audit ID, actor, module, entity, region..."
                  className="h-10 w-full rounded border border-blue-200 bg-white pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </label>
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <div className="mr-1 inline-flex items-center gap-1.5 text-sm font-medium text-gray-600">
                <Filter className="h-3.5 w-3.5" />
                Severity
              </div>

              {["All", "Critical", "High", "Medium", "Low"].map((severity) => (
                <button
                  key={severity}
                  type="button"
                  onClick={() => {
                    setSeverityFilter(severity);
                    setCurrentPage(1);
                  }}
                  className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                    severityFilter === severity
                      ? "border-blue-200 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                  }`}
                >
                  {severity}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-3 flex flex-wrap items-center gap-2">
            <div className="mr-1 text-sm font-medium text-gray-600">
              Audit Type
            </div>

            {auditTypes.slice(0, 6).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => {
                  setAuditTypeFilter(type);
                  setCurrentPage(1);
                }}
                className={`rounded-md border px-3 py-1.5 text-sm font-medium transition-colors ${
                  auditTypeFilter === type
                    ? "border-blue-200 bg-blue-50 text-blue-700"
                    : "border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </section>

        {/* Audit table */}
        <section className="overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1300px] border-collapse">
              <thead className="bg-blue-50">
                <tr>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Audit ID
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Timestamp
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Actor
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Module
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Entity
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Audit Type
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Severity
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Status
                  </th>
                  <th className="border-b border-r border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Region
                  </th>
                  <th className="border-b border-blue-200 px-4 py-3.5 text-left text-xs font-semibold uppercase tracking-wider text-blue-900">
                    Action
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-blue-100 bg-white">
                {currentAudits.map((event) => (
                  <AuditRow
                    key={event.auditId}
                    event={event}
                    onView={() => openModal("viewAudit", event)}
                  />
                ))}

                {filteredAudits.length === 0 && (
                  <tr>
                    <td
                      colSpan={10}
                      className="border-t border-blue-100 px-4 py-12 text-center text-sm text-gray-500"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <Search className="h-8 w-8 text-gray-300" />
                        <p>No audit records found for "<span className="font-medium text-gray-700">{searchTerm}</span>"</p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pagination */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
          <div className="text-sm text-gray-600">
            Showing <span className="font-medium text-gray-900">{startIndex + 1}</span> to{' '}
            <span className="font-medium text-gray-900">{Math.min(endIndex, filteredAudits.length)}</span> of{' '}
            <span className="font-medium text-gray-900">{filteredAudits.length}</span> entries
          </div>
          
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>
            
            <div className="flex items-center gap-1">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNum;
                if (totalPages <= 5) {
                  pageNum = i + 1;
                } else if (currentPage <= 3) {
                  pageNum = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i;
                } else {
                  pageNum = currentPage - 2 + i;
                }
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => setCurrentPage(pageNum)}
                    className={`min-w-[32px] px-2 py-1.5 text-sm font-medium rounded border transition-colors ${
                      currentPage === pageNum
                        ? 'border-blue-500 bg-blue-50 text-blue-700'
                        : 'border-blue-200 bg-white text-gray-700 hover:bg-blue-50 hover:border-blue-300'
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}
            </div>
            
            <button
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages || totalPages === 0}
              className="inline-flex items-center gap-1 rounded border border-blue-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:border-blue-300 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-white"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        {/* Detailed audit records */}
        <section className="mt-6 grid gap-5 md:grid-cols-2">
          {currentAudits.slice(0, 4).map((event) => (
            <AuditDetailCard 
              key={event.auditId} 
              event={event}
              onMarkVerified={() => openModal("markVerified", event)}
              onGenerateReport={() => openModal("generateReport", event)}
              onAssignOfficer={() => openModal("assignOfficer", event)}
            />
          ))}
        </section>
      </div>

      {/* Modals */}
      <AssignOfficerModal
        isOpen={modalState.assignOfficer}
        onClose={() => closeModal("assignOfficer")}
        audit={selectedAudit}
      />
      
      <GenerateReportModal
        isOpen={modalState.generateReport}
        onClose={() => closeModal("generateReport")}
        audit={selectedAudit}
      />
      
      <MarkVerifiedModal
        isOpen={modalState.markVerified}
        onClose={() => closeModal("markVerified")}
        audit={selectedAudit}
      />
      
      <ViewAuditModal
        isOpen={modalState.viewAudit}
        onClose={() => closeModal("viewAudit")}
        audit={selectedAudit}
      />
    </div>
  );
}

function SummaryCard({ item }) {
  const Icon = item.icon;
  const tone = toneStyles[item.tone];

  return (
    <div className="overflow-hidden rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md">
      <div className="mb-3 flex items-center justify-between">
        <div className={`flex h-10 w-10 items-center justify-center rounded-md ${tone.bg} ${tone.text} border ${tone.border}`}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <p className="text-sm font-medium text-gray-500">{item.label}</p>
      <p className="mt-1 text-2xl font-bold text-gray-900">{item.value}</p>
      <p className="mt-1 text-xs text-gray-500">{item.detail}</p>
    </div>
  );
}

function ManufacturerAuditCard({ manufacturer }) {
  const isHigh = manufacturer.risk === "High";
  const isMedium = manufacturer.risk === "Medium";

  const scoreColor =
    manufacturer.score >= 85
      ? "text-green-700 bg-green-50 border-green-200"
      : manufacturer.score >= 70
        ? "text-amber-700 bg-amber-50 border-amber-200"
        : "text-rose-700 bg-rose-50 border-rose-200";

  return (
    <div className="overflow-hidden rounded-lg border border-blue-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-blue-50 text-blue-600">
            <Factory className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {manufacturer.manufacturer}
            </h3>
            <p className="mt-1 flex items-center gap-1 text-sm text-gray-500">
              <MapPin className="h-3 w-3" />
              {manufacturer.location}
            </p>
          </div>
        </div>
        <span
          className={`rounded-md border px-2.5 py-1 text-xs font-semibold ${
            isHigh
              ? "border-rose-200 bg-rose-50 text-rose-700"
              : isMedium
                ? "border-amber-200 bg-amber-50 text-amber-700"
                : "border-green-200 bg-green-50 text-green-700"
          }`}
        >
          {manufacturer.risk} Risk
        </span>
      </div>

      <div className="mb-4 flex items-center justify-between rounded-md bg-gray-50 p-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Audit Score
          </p>
          <p className="mt-1 text-sm text-gray-500">{manufacturer.status}</p>
        </div>
        <div className={`rounded-md border px-3 py-1.5 text-xl font-semibold ${scoreColor}`}>
          {manufacturer.score}%
        </div>
      </div>

      <div className="space-y-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500">License ID</span>
          <span className="font-mono text-xs font-medium text-gray-900">{manufacturer.licenseId}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500">Last Audit</span>
          <span className="font-medium text-gray-900">{manufacturer.lastAudit}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500">Next Audit</span>
          <span className="font-medium text-gray-900">{manufacturer.nextAudit}</span>
        </div>
        <div className="flex items-center justify-between gap-4">
          <span className="text-gray-500">Open Findings</span>
          <span className="font-medium text-gray-900">{manufacturer.findings}</span>
        </div>
      </div>
    </div>
  );
}

function Panel({ title, icon: Icon, children, className = "" }) {
  return (
    <div className={`overflow-hidden rounded-lg border border-blue-200 bg-white shadow-sm flex flex-col ${className}`}>
      <div className="border-b border-blue-200 bg-blue-50 px-4 py-3 flex-shrink-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-md bg-blue-100 text-blue-600">
            <Icon className="h-4 w-4" />
          </div>
          <h3 className="font-semibold text-gray-900">{title}</h3>
        </div>
      </div>
      <div className="p-4 flex-1">{children}</div>
    </div>
  );
}

function AuditTrendChart({ data }) {
  const max = Math.max(...data.flatMap((item) => [item.audits, item.findings]));

  return (
    <div className="h-full flex flex-col">
      <div className="mb-2 flex items-center gap-4 text-xs font-medium text-gray-500 flex-shrink-0">
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-blue-600" />
          Audit events
        </span>
        <span className="inline-flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-rose-500" />
          Findings
        </span>
      </div>

      <div className="flex-1 flex items-end gap-3 rounded-md bg-gray-50 p-3">
        {data.map((item) => {
          const auditHeight = (item.audits / max) * 100;
          const findingHeight = (item.findings / max) * 100;

          return (
            <div key={item.month} className="flex flex-1 flex-col items-center h-full justify-end">
              <div className="flex w-full items-end justify-center gap-1" style={{ height: '80%' }}>
                <div
                  className="w-4 rounded-t-md bg-blue-600 transition-all duration-300"
                  style={{ height: `${auditHeight}%` }}
                />
                <div
                  className="w-4 rounded-t-md bg-rose-500 transition-all duration-300"
                  style={{ height: `${findingHeight}%` }}
                />
              </div>
              <p className="mt-2 text-xs font-medium text-gray-500 flex-shrink-0">
                {item.month}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function ChecklistRow({ item }) {
  const color =
    item.completion >= 85
      ? "bg-green-500"
      : item.completion >= 75
        ? "bg-blue-500"
        : "bg-amber-500";

  return (
    <div className="rounded-md bg-gray-50 p-3">
      <div className="mb-2 flex items-start justify-between gap-3">
        <div className="flex-1">
          <h4 className="text-sm font-semibold text-gray-900">{item.title}</h4>
          <p className="mt-0.5 text-xs text-gray-500 line-clamp-2">
            {item.description}
          </p>
        </div>
        <span className="text-sm font-semibold text-gray-900 flex-shrink-0">
          {item.completion}%
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white">
        <div
          className={`h-full rounded-full ${color}`}
          style={{ width: `${item.completion}%` }}
        />
      </div>
    </div>
  );
}

function SeverityBadge({ severity }) {
  const styles = {
    Critical: "bg-rose-50 text-rose-700 border-rose-200",
    High: "bg-orange-50 text-orange-700 border-orange-200",
    Medium: "bg-amber-50 text-amber-700 border-amber-200",
    Low: "bg-green-50 text-green-700 border-green-200",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${
        styles[severity] || "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {severity}
    </span>
  );
}

function StatusBadge({ status }) {
  const styles = {
    Closed: "bg-green-50 text-green-700 border-green-200",
    Open: "bg-rose-50 text-rose-700 border-rose-200",
    "Under Review": "bg-blue-50 text-blue-700 border-blue-200",
    Escalated: "bg-orange-50 text-orange-700 border-orange-200",
  };

  return (
    <span
      className={`inline-flex rounded-md border px-2 py-0.5 text-xs font-semibold ${
        styles[status] || "bg-gray-50 text-gray-700 border-gray-200"
      }`}
    >
      {status}
    </span>
  );
}

function AuditRow({ event, onView }) {
  return (
    <tr className="transition-colors hover:bg-blue-50/40">
      <td className="border-r border-blue-100 px-4 py-3">
        <span className="font-mono text-sm font-medium text-blue-700">
          {event.auditId}
        </span>
       </td>
      <td className="border-r border-blue-100 px-4 py-3 text-sm text-gray-600">
        {event.timestamp}
       </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-semibold text-gray-900">{event.actor}</p>
        <p className="text-xs text-gray-500">{event.role}</p>
        </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-medium text-gray-900">{event.module}</p>
        <p className="text-xs text-gray-500 font-mono">{event.ipAddress}</p>
        </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <p className="text-sm font-medium text-gray-900">{event.entity}</p>
        <p className="text-xs text-gray-500">{event.entityType}</p>
        </td>
      <td className="border-r border-blue-100 px-4 py-3 text-sm text-gray-700">
        {event.auditType}
        </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <SeverityBadge severity={event.severity} />
        </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <StatusBadge status={event.status} />
        </td>
      <td className="border-r border-blue-100 px-4 py-3">
        <div className="flex items-center gap-1 text-sm text-gray-600">
          <MapPin className="h-3 w-3 text-blue-600" />
          {event.region}
        </div>
        </td>
      <td className="px-4 py-3">
        <button 
          onClick={onView}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-2.5 py-1 text-sm font-medium text-gray-600 transition-colors hover:border-blue-300 hover:bg-blue-50 hover:text-blue-700"
        >
          <Eye className="h-3.5 w-3.5" />
          View
        </button>
        </td>
    </tr>
  );
}

function AuditDetailCard({ event, onMarkVerified, onGenerateReport, onAssignOfficer }) {
  return (
    <div className="rounded-lg border border-blue-200 bg-white p-4 shadow-sm">
      <div className="mb-3 flex items-start justify-between gap-3">
        <div>
          <p className="font-mono text-xs text-gray-500">{event.auditId}</p>
          <h3 className="mt-1 text-base font-semibold text-gray-900">
            {event.action}
          </h3>
        </div>
        <SeverityBadge severity={event.severity} />
      </div>

      <div className="grid gap-2 sm:grid-cols-2">
        <DetailBlock title="Reference" text={event.reference} />
        <DetailBlock title="Module" text={event.module} />
        <DetailBlock title="Actor" text={`${event.actor} · ${event.role}`} />
        <DetailBlock title="Region" text={event.region} />
      </div>

      <div className="mt-3">
        <DetailBlock title="Audit Remarks" text={event.remarks} />
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button 
          onClick={onMarkVerified}
          className="inline-flex items-center gap-1.5 rounded-md border border-green-200 bg-green-50 px-3 py-1.5 text-sm font-medium text-green-700 transition-colors hover:bg-green-100"
        >
          <CheckCircle2 className="h-3.5 w-3.5" />
          Mark Verified
        </button>
        <button 
          onClick={onGenerateReport}
          className="inline-flex items-center gap-1.5 rounded-md border border-blue-200 bg-blue-50 px-3 py-1.5 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
        >
          <FileCheck2 className="h-3.5 w-3.5" />
          Generate Report
        </button>
        <button 
          onClick={onAssignOfficer}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-50"
        >
          <UserCheck className="h-3.5 w-3.5" />
          Assign Officer
        </button>
      </div>
    </div>
  );
}

function DetailBlock({ title, text }) {
  return (
    <div className="rounded-md bg-gray-50 p-3">
      <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {title}
      </p>
      <p className="mt-1 text-sm text-gray-700 break-words">{text}</p>
    </div>
  );
}