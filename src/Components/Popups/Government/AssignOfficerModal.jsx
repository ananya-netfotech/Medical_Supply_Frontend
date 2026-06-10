import { useState } from "react";
import { X, User, Mail, Phone, Calendar, Users, CheckCircle2 } from "lucide-react";

const availableOfficers = [
  { id: 1, name: "Dr. Rajesh Kumar", role: "Senior CDSCO Officer", email: "rajesh.kumar@cdsco.gov.in", phone: "+91 98765 43210", department: "Manufacturing Audit" },
  { id: 2, name: "Ms. Priya Sharma", role: "State Drug Inspector", email: "priya.sharma@state.gov.in", phone: "+91 98765 43211", department: "Quality Control" },
  { id: 3, name: "Dr. Amit Patel", role: "Regulatory Compliance Officer", email: "amit.patel@cdsco.gov.in", phone: "+91 98765 43212", department: "Compliance" },
  { id: 4, name: "Mr. Suresh Reddy", role: "Audit Specialist", email: "suresh.reddy@cdsco.gov.in", phone: "+91 98765 43213", department: "Traceability" },
  { id: 5, name: "Ms. Neha Gupta", role: "Claims Reviewer", email: "neha.gupta@pmjay.gov.in", phone: "+91 98765 43214", department: "PM-JAY Claims" },
];

export default function AssignOfficerModal({ isOpen, onClose, audit }) {
  const [selectedOfficer, setSelectedOfficer] = useState(null);
  const [assigned, setAssigned] = useState(false);
  const [assignmentNotes, setAssignmentNotes] = useState("");

  if (!isOpen) return null;

  const handleAssign = () => {
    if (selectedOfficer) {
      setAssigned(true);
      setTimeout(() => {
        onClose();
        setSelectedOfficer(null);
        setAssigned(false);
        setAssignmentNotes("");
      }, 2000);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        {/* Backdrop */}
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        {/* Modal */}
        <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl">
          <div className="flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                <Users className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Assign Regulatory Officer</h3>
                <p className="text-sm text-gray-500">Select an officer to review this audit</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {assigned ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Officer Assigned Successfully</h4>
              <p className="mt-2 text-sm text-gray-500">
                {selectedOfficer?.name} has been assigned to review this audit.
                They will receive a notification shortly.
              </p>
            </div>
          ) : (
            <>
              <div className="p-6">
                {/* Audit Info */}
                {audit && (
                  <div className="mb-6 rounded-md bg-blue-50 p-4">
                    <p className="text-sm font-semibold text-blue-900">Audit Details</p>
                    <p className="mt-1 text-sm text-blue-700">
                      <span className="font-medium">ID:</span> {audit.auditId} | 
                      <span className="font-medium ml-2">Entity:</span> {audit.entity} |
                      <span className="font-medium ml-2">Severity:</span> {audit.severity}
                    </p>
                  </div>
                )}

                {/* Officers List */}
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Select Officer
                </label>
                <div className="mb-4 space-y-3 max-h-80 overflow-y-auto">
                  {availableOfficers.map((officer) => (
                    <div
                      key={officer.id}
                      onClick={() => setSelectedOfficer(officer)}
                      className={`cursor-pointer rounded-lg border p-4 transition-all ${
                        selectedOfficer?.id === officer.id
                          ? "border-blue-500 bg-blue-50 shadow-sm"
                          : "border-gray-200 hover:border-blue-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                              <User className="h-4 w-4 text-blue-600" />
                            </div>
                            <div>
                              <p className="font-semibold text-gray-900">{officer.name}</p>
                              <p className="text-xs text-gray-500">{officer.role}</p>
                            </div>
                          </div>
                          <div className="mt-2 grid gap-1 pl-10">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Mail className="h-3.5 w-3.5" />
                              {officer.email}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Phone className="h-3.5 w-3.5" />
                              {officer.phone}
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="h-3.5 w-3.5" />
                              {officer.department}
                            </div>
                          </div>
                        </div>
                        {selectedOfficer?.id === officer.id && (
                          <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600 text-white">
                            <CheckCircle2 className="h-3 w-3" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Assignment Notes */}
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Assignment Notes (Optional)
                </label>
                <textarea
                  value={assignmentNotes}
                  onChange={(e) => setAssignmentNotes(e.target.value)}
                  rows={3}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Add any specific instructions or notes for the assigned officer..."
                />
              </div>

              <div className="flex justify-end gap-3 border-t border-gray-200 p-4">
                <button
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAssign}
                  disabled={!selectedOfficer}
                  className="rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Assign Officer
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}