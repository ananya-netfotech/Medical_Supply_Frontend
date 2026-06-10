import { useState } from "react";
import { X, Upload, AlertCircle, AlertTriangle, Send } from "lucide-react";

export default function IssueRecallPopup({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    recallId: "",
    drugTypeId: "",
    licenseId: "",
    manufacturerId: "",
    unitId: "",
    reason: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const drugTypes = [
    { id: "DRUG-AMX-500", name: "Amoxicillin 500mg", licenseId: "LIC-SUN-AMX-001", manufacturerId: "MFG-SUN-002" },
    { id: "DRUG-MET-500", name: "Metformin 500mg", licenseId: "LIC-SUN-MET-002", manufacturerId: "MFG-SUN-002" },
    { id: "DRUG-ATV-020", name: "Atorvastatin 20mg", licenseId: "LIC-CIP-ATV-004", manufacturerId: "MFG-CIP-001" },
    { id: "DRUG-PCM-500", name: "Paracetamol 500mg", licenseId: "LIC-CIP-PCM-001", manufacturerId: "MFG-CIP-001" },
  ];

  const medicineUnits = [
    { id: "UNIT-0001", drugTypeId: "DRUG-PCM-500", manufacturerId: "MFG-CIP-001", licenseId: "LIC-CIP-PCM-001" },
    { id: "UNIT-0002", drugTypeId: "DRUG-PCM-500", manufacturerId: "MFG-CIP-001", licenseId: "LIC-CIP-PCM-001" },
    { id: "UNIT-0003", drugTypeId: "DRUG-ATV-020", manufacturerId: "MFG-CIP-001", licenseId: "LIC-CIP-ATV-004" },
    { id: "UNIT-0004", drugTypeId: "DRUG-ATV-020", manufacturerId: "MFG-CIP-001", licenseId: "LIC-CIP-ATV-004" },
    { id: "UNIT-0005", drugTypeId: "DRUG-MET-500", manufacturerId: "MFG-SUN-002", licenseId: "LIC-SUN-MET-002" },
    { id: "UNIT-0006", drugTypeId: "DRUG-MET-500", manufacturerId: "MFG-SUN-002", licenseId: "LIC-SUN-MET-002" },
    { id: "UNIT-0007", drugTypeId: "DRUG-AMX-500", manufacturerId: "MFG-SUN-002", licenseId: "LIC-SUN-AMX-001" },
    { id: "UNIT-0008", drugTypeId: "DRUG-AMX-500", manufacturerId: "MFG-SUN-002", licenseId: "LIC-SUN-AMX-001" },
  ];

  const statuses = ["Active", "Released", "Closed"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "drugTypeId") {
      const selectedDrug = drugTypes.find(d => d.id === value);
      setFormData(prev => ({
        ...prev,
        drugTypeId: value,
        licenseId: selectedDrug?.licenseId || "",
        manufacturerId: selectedDrug?.manufacturerId || "",
        unitId: "",
      }));
    } else if (name === "unitId") {
      const selectedUnit = medicineUnits.find(u => u.id === value);
      setFormData(prev => ({
        ...prev,
        unitId: value,
        drugTypeId: selectedUnit?.drugTypeId || "",
        licenseId: selectedUnit?.licenseId || "",
        manufacturerId: selectedUnit?.manufacturerId || "",
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const generateRecallId = () => {
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `RECALL-${randomNum}`;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.recallId.trim()) {
      newErrors.recallId = "Recall Notice No. is required";
    } else if (!/^RECALL-\d{4}$/.test(formData.recallId)) {
      newErrors.recallId = "Format should be RECALL-0000 (e.g., RECALL-0001)";
    }
    
    if (!formData.drugTypeId) {
      newErrors.drugTypeId = "Please select a medicine";
    }
    
    if (!formData.unitId) {
      newErrors.unitId = "Please select a medicine unit";
    }
    
    if (!formData.reason.trim()) {
      newErrors.reason = "Recall reason is required";
    } else if (formData.reason.length < 20) {
      newErrors.reason = "Please provide a detailed reason (minimum 20 characters)";
    }
    
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRecall = {
        ...formData,
        timestamp: new Date().toLocaleString(),
      };
      
      console.log("New recall issued:", newRecall);
      
      if (onSuccess) {
        onSuccess(newRecall);
      }
      
      setFormData({
        recallId: "",
        drugTypeId: "",
        licenseId: "",
        manufacturerId: "",
        unitId: "",
        reason: "",
        status: "Active",
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      recallId: "",
      drugTypeId: "",
      licenseId: "",
      manufacturerId: "",
      unitId: "",
      reason: "",
      status: "Active",
    });
    setErrors({});
    onClose();
  };

  const handleGenerateId = () => {
    const newId = generateRecallId();
    setFormData(prev => ({ ...prev, recallId: newId }));
    if (errors.recallId) {
      setErrors(prev => ({ ...prev, recallId: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-3xl rounded-lg border border-red-200 bg-white shadow-xl flex flex-col max-h-[90vh]">
        {/* Header - fixed at top */}
        <div className="flex items-center justify-between border-b border-red-200 bg-red-50 px-6 py-4 flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Issue Recall Notice
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Issue a recall notice for a medicine unit due to quality or safety concerns
            </p>
          </div>
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md p-1.5 text-gray-400 transition-colors hover:bg-white hover:text-gray-600"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto px-6 py-4">
          {/* Warning Banner */}
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3">
            <div className="flex items-start gap-2">
              <AlertTriangle className="h-4 w-4 text-red-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-red-800">
                  Regulatory Action Required
                </p>
                <p className="text-xs text-red-700">
                  Recall notices are legally binding. Ensure all information is accurate before issuing.
                </p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {/* Recall Notice No. */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Recall Notice No. <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="recallId"
                  value={formData.recallId}
                  onChange={handleChange}
                  placeholder="e.g., RECALL-0001"
                  className={`mt-1 h-10 flex-1 rounded-md border ${errors.recallId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={handleGenerateId}
                  className="mt-1 inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 flex-shrink-0"
                >
                  Generate ID
                </button>
              </div>
              {errors.recallId && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.recallId}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">Format: RECALL-0000 (e.g., RECALL-0001)</p>
            </div>

            {/* Select by Medicine OR Unit */}
            <div className="sm:col-span-2">
              <div className="mb-2 border-b border-blue-200 pb-1">
                <p className="text-xs font-semibold text-gray-500">Select by Medicine or Unit</p>
              </div>
            </div>

            {/* Medicine Registration Ref. */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medicine Registration Ref.
              </label>
              <select
                name="drugTypeId"
                value={formData.drugTypeId}
                onChange={handleChange}
                className={`mt-1 h-10 w-full rounded-md border ${errors.drugTypeId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select medicine</option>
                {drugTypes.map(drug => (
                  <option key={drug.id} value={drug.id}>{drug.name} ({drug.id})</option>
                ))}
              </select>
              {errors.drugTypeId && (
                <p className="mt-1 text-xs text-red-600">{errors.drugTypeId}</p>
              )}
            </div>

            {/* Medicine Unit No. */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medicine Unit No. <span className="text-red-500">*</span>
              </label>
              <select
                name="unitId"
                value={formData.unitId}
                onChange={handleChange}
                className={`mt-1 h-10 w-full rounded-md border ${errors.unitId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select unit</option>
                {medicineUnits
                  .filter(unit => !formData.drugTypeId || unit.drugTypeId === formData.drugTypeId)
                  .map(unit => (
                    <option key={unit.id} value={unit.id}>{unit.id}</option>
                  ))}
              </select>
              {errors.unitId && (
                <p className="mt-1 text-xs text-red-600">{errors.unitId}</p>
              )}
            </div>

            {/* Auto-filled fields */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturing License No.
              </label>
              <input
                type="text"
                name="licenseId"
                value={formData.licenseId}
                readOnly
                className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer Registration No.
              </label>
              <input
                type="text"
                name="manufacturerId"
                value={formData.manufacturerId}
                readOnly
                className="mt-1 h-10 w-full rounded-md border border-gray-200 bg-gray-50 px-3 text-sm text-gray-500"
              />
            </div>

            {/* Recall Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Recall Status
              </label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Recall Reason */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Recall Reason <span className="text-red-500">*</span>
              </label>
              <textarea
                name="reason"
                value={formData.reason}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the reason for recall in detail..."
                className={`mt-1 w-full rounded-md border ${errors.reason ? 'border-red-300' : 'border-gray-300'} bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.reason && (
                <p className="mt-1 text-xs text-red-600">{errors.reason}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Provide a detailed explanation for regulatory audit purposes</p>
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-5 rounded-md border border-red-100 bg-red-50 p-3">
            <div className="flex items-start gap-2">
              <Send className="h-4 w-4 text-red-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-red-800">
                  Recall Impact
                </p>
                <p className="text-xs text-red-700">
                  This recall will freeze all movement of the affected medicine unit and notify all stakeholders in the supply chain.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - fixed at bottom */}
        <div className="flex flex-col-reverse gap-2 border-t border-red-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end flex-shrink-0">
          <button
            type="button"
            onClick={handleClose}
            className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Issuing...
              </>
            ) : (
              <>
                <AlertTriangle className="h-4 w-4" />
                Issue Recall Notice
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}