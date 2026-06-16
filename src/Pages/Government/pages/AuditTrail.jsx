import { useMemo, useState } from "react";
import {
  Activity,
  ClipboardCheck,
  RefreshCcw,
  ShieldCheck,
} from "lucide-react";
import * as XLSX from "xlsx";

// Constants
import {
  auditSummary,
  manufacturerAuditScorecards,
  auditEvents,
  auditChecklist,
  monthlyAuditTrend,
} from "../../../Components/Government/AuditTrail/Constants";

// Sub-components
import SummaryCard from "../../../Components/Government/AuditTrail/Summarycard";
import ManufacturerAuditCard from "../../../Components/Government/AuditTrail/Manufacturerauditcard";
import Panel from "../../../Components/Government/AuditTrail/Panel";
import AuditTrendChart from "../../../Components/Government/AuditTrail/Audittrendchart";
import ChecklistRow from "../../../Components/Government/AuditTrail/Checklistrow";
import AuditFilters from "../../../Components/Government/AuditTrail/Auditfilters";
import AuditTable from "../../../Components/Government/AuditTrail/Audittable";
import AuditPagination from "../../../Components/Government/AuditTrail/Auditpagination";
import AuditDetailCard from "../../../Components/Government/AuditTrail/Auditdetailcard";
import ExportButton from "../../../Components/Government/AuditTrail/Exportbutton";

// Modals
import AssignOfficerModal from "../../../Components/Popups/Government/AssignOfficerModal";
import GenerateReportModal from "../../../Components/Popups/Government/GenerateReportModal";
import MarkVerifiedModal from "../../../Components/Popups/Government/MarkVerifiedModal";
import ViewAuditModal from "../../../Components/Popups/Government/ViewAuditModal";

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

  const generatePDFHTML = () => {
    const getSeverityColor = (severity) => {
      switch (severity) {
        case "Critical": return "#dc2626";
        case "High": return "#ea580c";
        case "Medium": return "#d97706";
        default: return "#059669";
      }
    };

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Audit Report - ${new Date().toISOString().split("T")[0]}</title>
        <style>
          * { margin: 0; padding: 0; box-sizing: border-box; }
          body { font-family: 'Helvetica Neue', Arial, sans-serif; padding: 40px; color: #1f2937; line-height: 1.5; }
          .container { max-width: 1200px; margin: 0 auto; }
          .header { background: linear-gradient(135deg, #eff6ff 0%, #dbeafe 100%); padding: 30px; border-radius: 12px; margin-bottom: 30px; border: 1px solid #bfdbfe; }
          .header-content { display: flex; justify-content: space-between; align-items: flex-start; }
          .logo-section { display: flex; align-items: center; gap: 15px; }
          .logo { width: 50px; height: 50px; background: #2563eb; border-radius: 10px; display: flex; align-items: center; justify-content: center; color: white; font-size: 24px; font-weight: bold; }
          h1 { font-size: 24px; color: #1e3a8a; margin-bottom: 5px; }
          .subtitle { color: #3b82f6; font-size: 14px; }
          .report-date { text-align: right; font-size: 12px; color: #6b7280; }
          .section-title { font-size: 18px; font-weight: bold; color: #1e40af; margin: 25px 0 15px 0; padding-bottom: 8px; border-bottom: 2px solid #bfdbfe; }
          .summary-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 15px; margin-bottom: 30px; }
          .summary-card { border: 1px solid #e5e7eb; border-radius: 8px; padding: 15px; background: white; }
          .summary-label { font-size: 12px; color: #6b7280; margin-bottom: 5px; }
          .summary-value { font-size: 24px; font-weight: bold; color: #1f2937; }
          .summary-detail { font-size: 10px; color: #9ca3af; margin-top: 5px; }
          table { width: 100%; border-collapse: collapse; margin-bottom: 20px; }
          th { background: #f3f4f6; padding: 10px; text-align: left; font-size: 12px; font-weight: bold; color: #374151; border: 1px solid #e5e7eb; }
          td { padding: 8px 10px; font-size: 11px; border: 1px solid #e5e7eb; vertical-align: top; }
          .severity-badge { display: inline-block; padding: 2px 6px; border-radius: 4px; font-size: 10px; font-weight: 600; }
          .footer { margin-top: 40px; padding-top: 20px; border-top: 1px solid #e5e7eb; text-align: center; font-size: 10px; color: #9ca3af; }
          @media print { body { padding: 0; } .page-break { page-break-before: always; } }
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
              <div class="report-date">Generated: ${new Date().toLocaleString()}</div>
            </div>
          </div>
          <div class="section-title">Audit Summary</div>
          <div class="summary-grid">
            ${auditSummary
              .map(
                (item) => `
              <div class="summary-card">
                <div class="summary-label">${item.label}</div>
                <div class="summary-value">${item.value}</div>
                <div class="summary-detail">${item.detail}</div>
              </div>
            `
              )
              .join("")}
          </div>
          <div class="section-title">Applied Filters</div>
          <table>
            <tr><th style="width: 150px">Filter Type</th><th>Value</th></tr>
            <tr><td>Severity</td><td>${severityFilter}</td></tr>
            <tr><td>Audit Type</td><td>${auditTypeFilter}</td></tr>
            ${searchTerm ? `<tr><td>Search Term</td><td>${searchTerm}</td></tr>` : ""}
          </table>
          <div class="section-title">Audit Events (${filteredAudits.length} records)</div>
          <table>
            <thead>
              <tr>
                <th>Audit ID</th><th>Timestamp</th><th>Actor</th><th>Module</th>
                <th>Entity</th><th>Audit Type</th><th>Severity</th><th>Status</th><th>Region</th>
              </tr>
            </thead>
            <tbody>
              ${filteredAudits
                .map(
                  (event) => `
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
              `
                )
                .join("")}
            </tbody>
          </table>
          <div class="section-title">Manufacturer Audit Scorecards</div>
          <table>
            <thead>
              <tr><th>Manufacturer</th><th>Location</th><th>Score</th><th>Status</th><th>Risk</th><th>Findings</th><th>Last Audit</th><th>Next Audit</th></tr>
            </thead>
            <tbody>
              ${manufacturerAuditScorecards
                .map(
                  (m) => `
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
              `
                )
                .join("")}
            </tbody>
          </table>
          <div class="section-title">Audit Checklist Progress</div>
          <table>
            <thead><tr><th>Checklist Item</th><th>Completion</th></tr></thead>
            <tbody>
              ${auditChecklist
                .map(
                  (item) => `
                <tr>
                  <td>${item.title}</td>
                  <td>${item.completion}%</td>
                </tr>
              `
                )
                .join("")}
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

  const generateExcelData = () => {
    return filteredAudits.map((event) => ({
      "Audit ID": event.auditId,
      Timestamp: event.timestamp,
      Actor: event.actor,
      Role: event.role,
      Module: event.module,
      Entity: event.entity,
      "Entity Type": event.entityType,
      Action: event.action,
      "Audit Type": event.auditType,
      Severity: event.severity,
      Status: event.status,
      Region: event.region,
      Reference: event.reference,
      Remarks: event.remarks,
    }));
  };

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

  const exportAsExcel = () => {
    setExportMessage("Generating Excel...");
    setTimeout(() => {
      const data = generateExcelData();
      const ws = XLSX.utils.json_to_sheet(data);
      const wb = XLSX.utils.book_new();
      const colWidths = [
        { wch: 15 }, { wch: 20 }, { wch: 20 }, { wch: 15 },
        { wch: 20 }, { wch: 25 }, { wch: 15 }, { wch: 30 },
        { wch: 15 }, { wch: 10 }, { wch: 12 }, { wch: 15 },
        { wch: 20 }, { wch: 50 },
      ];
      ws["!cols"] = colWidths;
      XLSX.utils.book_append_sheet(wb, ws, "Audit Report");
      XLSX.writeFile(wb, `audit-report-${new Date().toISOString().split("T")[0]}.xlsx`);
      setExportMessage("Excel generated successfully!");
      setTimeout(() => setExportMessage(""), 3000);
    }, 500);
  };

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
      a.download = `audit-report-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      setExportMessage("JSON exported successfully!");
      setTimeout(() => setExportMessage(""), 3000);
    }, 500);
  };

  const handleExportReport = () => {
    switch (exportFormat) {
      case "PDF": exportAsPDF(); break;
      case "Excel": exportAsExcel(); break;
      case "JSON": exportAsJSON(); break;
      default: exportAsPDF();
    }
    setShowFormatMenu(false);
  };

  const openModal = (modalName, audit = null) => {
    setSelectedAudit(audit);
    setModalState((prev) => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModalState((prev) => ({ ...prev, [modalName]: false }));
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

          <ExportButton
            exportFormat={exportFormat}
            setExportFormat={setExportFormat}
            showFormatMenu={showFormatMenu}
            setShowFormatMenu={setShowFormatMenu}
            handleExportReport={handleExportReport}
            exportMessage={exportMessage}
          />
        </div>

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
        <AuditFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          severityFilter={severityFilter}
          setSeverityFilter={setSeverityFilter}
          auditTypeFilter={auditTypeFilter}
          setAuditTypeFilter={setAuditTypeFilter}
          auditTypes={auditTypes}
          setCurrentPage={setCurrentPage}
        />

        {/* Audit table */}
        <AuditTable
          currentAudits={currentAudits}
          filteredAudits={filteredAudits}
          searchTerm={searchTerm}
          onView={(event) => openModal("viewAudit", event)}
        />

        {/* Pagination */}
        <AuditPagination
          currentPage={currentPage}
          totalPages={totalPages}
          startIndex={startIndex}
          endIndex={endIndex}
          filteredAuditsLength={filteredAudits.length}
          setCurrentPage={setCurrentPage}
        />

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