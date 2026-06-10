import { X, Calendar, User, MapPin, Server, FileText, AlertCircle, CheckCircle2, Clock, Printer, Download, Share2 } from "lucide-react";
import { generateAuditPDF } from "../../../utils/pdfGenerator";

export default function ViewAuditModal({ isOpen, onClose, audit }) {
  if (!isOpen || !audit) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleExportPDF = async () => {
    try {
      await generateAuditPDF(audit);
    } catch (error) {
      console.error("Failed to generate PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        <div className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-lg bg-white shadow-xl">
          <div className="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Audit Details</h3>
                <p className="text-sm text-gray-500">Complete audit trail information</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPDF}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                title="Export PDF"
              >
                <Download className="h-5 w-5" />
              </button>
              <button
                onClick={handlePrint}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                title="Print"
              >
                <Printer className="h-5 w-5" />
              </button>
              <button
                onClick={onClose}
                className="rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-6 space-y-6" id="audit-modal-content">
            {/* Header Section */}
            <div className="rounded-lg bg-gradient-to-r from-blue-50 to-blue-100 p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-blue-700">AUDIT ID</p>
                  <p className="font-mono text-2xl font-bold text-blue-900">{audit.auditId}</p>
                  <p className="mt-2 text-lg font-semibold text-gray-800">{audit.action}</p>
                </div>
                <div className="text-right">
                  <span className={`inline-flex rounded-full px-3 py-1 text-sm font-semibold ${
                    audit.severity === "Critical" ? "bg-rose-100 text-rose-700" :
                    audit.severity === "High" ? "bg-orange-100 text-orange-700" :
                    audit.severity === "Medium" ? "bg-amber-100 text-amber-700" :
                    "bg-green-100 text-green-700"
                  }`}>
                    {audit.severity} Severity
                  </span>
                  <p className="mt-2 text-sm text-gray-600">{audit.timestamp}</p>
                </div>
              </div>
            </div>

            {/* Key Information Grid */}
            <div className="grid gap-4 md:grid-cols-2">
              <InfoCard
                icon={User}
                title="Actor Details"
                items={[
                  { label: "Name", value: audit.actor },
                  { label: "Role", value: audit.role },
                  { label: "IP Address", value: audit.ipAddress },
                ]}
              />
              <InfoCard
                icon={MapPin}
                title="Location & Region"
                items={[
                  { label: "Region", value: audit.region },
                  { label: "Module", value: audit.module },
                  { label: "Audit Type", value: audit.auditType },
                ]}
              />
              <InfoCard
                icon={Server}
                title="Entity Information"
                items={[
                  { label: "Entity Name", value: audit.entity },
                  { label: "Entity Type", value: audit.entityType },
                  { label: "Reference ID", value: audit.reference },
                ]}
              />
              <InfoCard
                icon={AlertCircle}
                title="Status Information"
                items={[
                  { label: "Current Status", value: audit.status },
                  { label: "Last Updated", value: audit.timestamp },
                ]}
              />
            </div>

            {/* Remarks Section */}
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              <div className="flex items-start gap-3">
                <FileText className="mt-1 h-5 w-5 text-blue-600" />
                <div className="flex-1">
                  <p className="font-semibold text-gray-900">Audit Remarks</p>
                  <p className="mt-1 text-sm text-gray-700">{audit.remarks}</p>
                </div>
              </div>
            </div>

            {/* Action Items */}
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-3 font-semibold text-gray-900">Required Actions</h4>
              <div className="space-y-2">
                {audit.severity === "Critical" && (
                  <div className="flex items-center gap-2 text-sm text-rose-700">
                    <AlertCircle className="h-4 w-4" />
                    <span>Immediate action required - Escalate to senior officer</span>
                  </div>
                )}
                {audit.status === "Under Review" && (
                  <div className="flex items-center gap-2 text-sm text-amber-700">
                    <Clock className="h-4 w-4" />
                    <span>Pending review - Complete verification within 48 hours</span>
                  </div>
                )}
                {audit.status === "Open" && (
                  <div className="flex items-center gap-2 text-sm text-blue-700">
                    <CheckCircle2 className="h-4 w-4" />
                    <span>Open case - Investigation in progress</span>
                  </div>
                )}
              </div>
            </div>

            {/* Timeline */}
            <div className="rounded-lg border border-gray-200 p-4">
              <h4 className="mb-3 font-semibold text-gray-900">Audit Timeline</h4>
              <div className="space-y-3">
                <TimelineItem
                  status="completed"
                  title="Audit Initiated"
                  time={audit.timestamp}
                  description="Audit was triggered by system"
                />
                <TimelineItem
                  status={audit.status === "Closed" ? "completed" : "current"}
                  title="Audit Review"
                  time={audit.timestamp}
                  description="Review in progress by regulatory officer"
                />
                <TimelineItem
                  status="pending"
                  title="Final Approval"
                  time="Pending"
                  description="Awaiting final approval from senior officer"
                />
              </div>
            </div>
          </div>

          <div className="sticky bottom-0 flex justify-end gap-3 border-t border-gray-200 bg-white p-4">
            <button
              onClick={onClose}
              className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Close
            </button>
            <button 
              onClick={handleExportPDF}
              className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              <Download className="h-4 w-4" />
              Export PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function InfoCard({ icon: Icon, title, items }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="mb-3 flex items-center gap-2">
        <Icon className="h-4 w-4 text-blue-600" />
        <h4 className="font-semibold text-gray-900">{title}</h4>
      </div>
      <div className="space-y-2">
        {items.map((item, idx) => (
          <div key={idx} className="flex justify-between text-sm">
            <span className="text-gray-500">{item.label}:</span>
            <span className="font-medium text-gray-900">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function TimelineItem({ status, title, time, description }) {
  const statusIcon = {
    completed: <CheckCircle2 className="h-4 w-4 text-green-600" />,
    current: <Clock className="h-4 w-4 text-blue-600" />,
    pending: <AlertCircle className="h-4 w-4 text-gray-400" />,
  };

  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        {statusIcon[status]}
        <div className="mt-1 h-full w-px bg-gray-200"></div>
      </div>
      <div className="flex-1 pb-3">
        <p className="text-sm font-semibold text-gray-900">{title}</p>
        <p className="text-xs text-gray-500">{time}</p>
        <p className="mt-1 text-sm text-gray-600">{description}</p>
      </div>
    </div>
  );
}