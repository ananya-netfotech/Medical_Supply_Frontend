import { useState } from "react";
import { X, FileText, Download, Printer, Share2, Calendar, CheckCircle2, AlertCircle } from "lucide-react";

export default function GenerateReportModal({ isOpen, onClose, audit }) {
  const [reportFormat, setReportFormat] = useState("PDF");
  const [includeDetails, setIncludeDetails] = useState({
    findings: true,
    recommendations: true,
    timeline: true,
    signatures: true,
  });
  const [generating, setGenerating] = useState(false);
  const [generated, setGenerated] = useState(false);

  if (!isOpen) return null;

  // Function to generate HTML content for PDF
  const generateHTMLContent = () => {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Audit Report - ${audit?.auditId}</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            margin: 40px;
            color: #333;
          }
          .header {
            text-align: center;
            margin-bottom: 30px;
            padding-bottom: 20px;
            border-bottom: 2px solid #2563eb;
          }
          .title {
            color: #1e40af;
            font-size: 24px;
            margin-bottom: 10px;
          }
          .subtitle {
            color: #666;
            font-size: 14px;
          }
          .section {
            margin-bottom: 25px;
            page-break-inside: avoid;
          }
          .section-title {
            background-color: #eff6ff;
            padding: 10px;
            font-size: 18px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 15px;
            border-left: 4px solid #2563eb;
          }
          .info-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin-bottom: 20px;
          }
          .info-card {
            border: 1px solid #e5e7eb;
            padding: 15px;
            border-radius: 8px;
            background-color: #f9fafb;
          }
          .info-label {
            font-weight: bold;
            color: #4b5563;
            font-size: 12px;
            text-transform: uppercase;
            margin-bottom: 5px;
          }
          .info-value {
            color: #111827;
            font-size: 14px;
          }
          .remarks {
            background-color: #f3f4f6;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
            font-size: 12px;
            color: #666;
          }
          table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 10px;
          }
          th, td {
            border: 1px solid #e5e7eb;
            padding: 8px;
            text-align: left;
          }
          th {
            background-color: #f3f4f6;
            font-weight: bold;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">Regulatory Audit Report</h1>
          <p class="subtitle">Generated on ${new Date().toLocaleString()}</p>
        </div>

        <div class="section">
          <div class="section-title">Audit Information</div>
          <div class="info-grid">
            <div class="info-card">
              <div class="info-label">Audit ID</div>
              <div class="info-value">${audit?.auditId}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Timestamp</div>
              <div class="info-value">${audit?.timestamp}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Severity</div>
              <div class="info-value">${audit?.severity}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Status</div>
              <div class="info-value">${audit?.status}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Action Details</div>
          <div class="info-card">
            <div class="info-label">Action Performed</div>
            <div class="info-value">${audit?.action}</div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Entity Information</div>
          <div class="info-grid">
            <div class="info-card">
              <div class="info-label">Entity Name</div>
              <div class="info-value">${audit?.entity}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Entity Type</div>
              <div class="info-value">${audit?.entityType}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Reference ID</div>
              <div class="info-value">${audit?.reference}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Region</div>
              <div class="info-value">${audit?.region}</div>
            </div>
          </div>
        </div>

        <div class="section">
          <div class="section-title">Actor Information</div>
          <div class="info-grid">
            <div class="info-card">
              <div class="info-label">Actor Name</div>
              <div class="info-value">${audit?.actor}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Role</div>
              <div class="info-value">${audit?.role}</div>
            </div>
            <div class="info-card">
              <div class="info-label">Module</div>
              <div class="info-value">${audit?.module}</div>
            </div>
            <div class="info-card">
              <div class="info-label">IP Address</div>
              <div class="info-value">${audit?.ipAddress}</div>
            </div>
          </div>
        </div>

        ${includeDetails.findings ? `
        <div class="section">
          <div class="section-title">Audit Findings</div>
          <div class="remarks">
            <p>${audit?.remarks}</p>
          </div>
        </div>
        ` : ''}

        ${includeDetails.recommendations ? `
        <div class="section">
          <div class="section-title">Recommendations</div>
          <ul>
            <li>Review all related documentation for compliance</li>
            <li>Schedule follow-up audit within 30 days</li>
            <li>Implement corrective actions for identified issues</li>
            <li>Update compliance tracking system with findings</li>
          </ul>
        </div>
        ` : ''}

        ${includeDetails.timeline ? `
        <div class="section">
          <div class="section-title">Timeline & Actions</div>
          <table>
            <thead>
              <tr><th>Date</th><th>Action</th><th>Status</th></tr>
            </thead>
            <tbody>
              <tr><td>${audit?.timestamp}</td><td>Audit Initiated</td><td>Completed</td></tr>
              <tr><td>${audit?.timestamp}</td><td>Review Process</td><td>${audit?.status}</td></tr>
              <tr><td>Pending</td><td>Final Approval</td><td>Pending</td></tr>
            </tbody>
          </table>
        </div>
        ` : ''}

        ${includeDetails.signatures ? `
        <div class="section">
          <div class="section-title">Digital Signatures</div>
          <div class="info-grid">
            <div class="info-card">
              <div class="info-label">Generated By</div>
              <div class="info-value">System Administrator</div>
            </div>
            <div class="info-card">
              <div class="info-label">Signature Date</div>
              <div class="info-value">${new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>
        ` : ''}

        <div class="footer">
          <p>This is a system-generated report. For any queries, please contact the regulatory department.</p>
          <p>Report ID: ${audit?.auditId}_${Date.now()}</p>
        </div>
      </body>
      </html>
    `;
  };

  // Function to generate CSV/Excel content
  const generateCSVContent = () => {
    const headers = [
      "Audit ID", "Timestamp", "Action", "Actor", "Role", "Module", 
      "Entity", "Entity Type", "Reference", "Region", "Severity", 
      "Status", "Remarks", "IP Address"
    ];
    
    const row = [
      audit?.auditId || "",
      audit?.timestamp || "",
      audit?.action || "",
      audit?.actor || "",
      audit?.role || "",
      audit?.module || "",
      audit?.entity || "",
      audit?.entityType || "",
      audit?.reference || "",
      audit?.region || "",
      audit?.severity || "",
      audit?.status || "",
      audit?.remarks || "",
      audit?.ipAddress || ""
    ];
    
    // Escape quotes and wrap fields with commas in quotes
    const escapedRow = row.map(field => {
      if (typeof field === 'string' && (field.includes(',') || field.includes('"'))) {
        return `"${field.replace(/"/g, '""')}"`;
      }
      return field;
    });
    
    return [headers, escapedRow].map(row => row.join(",")).join("\n");
  };

  // Function to generate JSON content
  const generateJSONContent = () => {
    const reportData = {
      reportMetadata: {
        reportId: `${audit?.auditId}_${Date.now()}`,
        generatedAt: new Date().toISOString(),
        generatedBy: "System Administrator",
        format: reportFormat,
        version: "1.0"
      },
      auditDetails: {
        auditId: audit?.auditId,
        timestamp: audit?.timestamp,
        action: audit?.action,
        actor: audit?.actor,
        role: audit?.role,
        module: audit?.module,
        entity: audit?.entity,
        entityType: audit?.entityType,
        reference: audit?.reference,
        region: audit?.region,
        severity: audit?.severity,
        status: audit?.status,
        remarks: audit?.remarks,
        ipAddress: audit?.ipAddress
      },
      includeSections: includeDetails,
      findings: includeDetails.findings ? audit?.remarks : null,
      recommendations: includeDetails.recommendations ? [
        "Review all related documentation for compliance",
        "Schedule follow-up audit within 30 days",
        "Implement corrective actions for identified issues",
        "Update compliance tracking system with findings"
      ] : null,
      timeline: includeDetails.timeline ? [
        { date: audit?.timestamp, action: "Audit Initiated", status: "Completed" },
        { date: audit?.timestamp, action: "Review Process", status: audit?.status },
        { date: "Pending", action: "Final Approval", status: "Pending" }
      ] : null,
      signatures: includeDetails.signatures ? {
        generatedBy: "System Administrator",
        signatureDate: new Date().toISOString(),
        verified: true
      } : null
    };
    
    return JSON.stringify(reportData, null, 2);
  };

  // Function to download file as PDF (using browser print)
  const downloadAsPDF = () => {
    const htmlContent = generateHTMLContent();
    const blob = new Blob([htmlContent], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const win = window.open(url, "_blank");
    
    if (win) {
      win.onload = () => {
        setTimeout(() => {
          win.print();
          URL.revokeObjectURL(url);
        }, 500);
      };
    }
  };

  // Function to download as Excel (CSV format that Excel can open)
  const downloadAsExcel = () => {
    const csvContent = generateCSVContent();
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-report-${audit?.auditId}-${Date.now()}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Function to download as JSON
  const downloadAsJSON = () => {
    const jsonContent = generateJSONContent();
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `audit-report-${audit?.auditId}-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleGenerate = () => {
    setGenerating(true);
    
    setTimeout(() => {
      setGenerating(false);
      setGenerated(true);
      
      // Generate report based on selected format
      switch(reportFormat) {
        case "PDF":
          downloadAsPDF();
          break;
        case "Excel":
          downloadAsExcel();
          break;
        case "JSON":
          downloadAsJSON();
          break;
        default:
          downloadAsJSON();
      }
      
      setTimeout(() => {
        onClose();
        setGenerated(false);
        setReportFormat("PDF");
        setIncludeDetails({
          findings: true,
          recommendations: true,
          timeline: true,
          signatures: true,
        });
      }, 2000);
    }, 2000);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        <div className="relative w-full max-w-lg rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Generate Audit Report</h3>
                <p className="text-sm text-gray-500">Create a comprehensive audit report</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {generated ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Report Generated Successfully!</h4>
              <p className="mt-2 text-sm text-gray-500">
                The {reportFormat} report has been generated and downloaded to your device.
              </p>
              {reportFormat === "PDF" && (
                <p className="mt-2 text-xs text-gray-400">
                  Note: The PDF will open in a new window. Use the browser's print dialog to save as PDF.
                </p>
              )}
            </div>
          ) : generating ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Generating Report...</h4>
              <p className="mt-2 text-sm text-gray-500">
                Please wait while we compile your {reportFormat} report.
              </p>
            </div>
          ) : (
            <>
              <div className="p-6">
                {/* Audit Info */}
                {audit && (
                  <div className="mb-6 rounded-md bg-gray-50 p-4">
                    <p className="text-sm font-semibold text-gray-900">{audit.audid}</p>
                    <p className="text-sm text-gray-600">{audit.action}</p>
                    <p className="text-xs text-gray-500 mt-1">Entity: {audit.entity}</p>
                  </div>
                )}

                {/* Report Format */}
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Report Format
                </label>
                <div className="mb-4 grid grid-cols-3 gap-2">
                  {["PDF", "Excel", "JSON"].map((format) => (
                    <button
                      key={format}
                      onClick={() => setReportFormat(format)}
                      className={`rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                        reportFormat === format
                          ? "border-blue-500 bg-blue-50 text-blue-700"
                          : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      {format}
                    </button>
                  ))}
                </div>

                {/* Format Info */}
                <div className="mb-4 rounded-md bg-gray-50 p-3">
                  <p className="text-xs text-gray-600">
                    {reportFormat === "PDF" && "📄 PDF: Opens in new window. Use browser print (Ctrl+P) to save as PDF."}
                    {reportFormat === "Excel" && "📊 Excel: Downloads as CSV format compatible with Microsoft Excel and Google Sheets."}
                    {reportFormat === "JSON" && "🔧 JSON: Raw data format for developers and system integration."}
                  </p>
                </div>

                {/* Report Sections */}
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Include Sections
                </label>
                <div className="mb-6 space-y-2">
                  {Object.entries(includeDetails).map(([key, value]) => (
                    <label key={key} className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) =>
                          setIncludeDetails((prev) => ({
                            ...prev,
                            [key]: e.target.checked,
                          }))
                        }
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 capitalize">
                        {key === "findings" && "Audit Findings"}
                        {key === "recommendations" && "Recommendations"}
                        {key === "timeline" && "Timeline & Actions"}
                        {key === "signatures" && "Digital Signatures"}
                      </span>
                    </label>
                  ))}
                </div>

                {/* Additional Options */}
                <div className="rounded-md bg-blue-50 p-4">
                  <div className="flex items-start gap-2">
                    <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-blue-900">Report will include:</p>
                      <ul className="mt-1 text-xs text-blue-700 space-y-1">
                        <li>• Complete audit trail and timestamp</li>
                        <li>• Entity details and action taken</li>
                        <li>• Officer remarks and verification status</li>
                        <li>• Regulatory compliance assessment</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 p-4">
                <button
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleGenerate}
                  className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
                >
                  <Download className="h-4 w-4" />
                  Generate & Download
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}