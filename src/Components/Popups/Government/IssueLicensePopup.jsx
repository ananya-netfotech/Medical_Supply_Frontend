import { useState } from "react";
import { X, Upload, AlertCircle, Award, CalendarDays } from "lucide-react";

export default function IssueLicensePopup({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    licenseId: "",
    manufacturerId: "",
    drugTypeId: "",
    issued: "",
    expires: "",
    issuedBy: "",
    status: "Valid",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const manufacturers = [
    { id: "MFG-CIP-001", name: "Cipla Limited" },
    { id: "MFG-SUN-002", name: "Sun Pharmaceuticals Ltd." },
    { id: "MFG-BIO-003", name: "Bharat Biotech" },
    { id: "MFG-DIV-004", name: "Divis Laboratories" },
  ];

  const drugTypes = [
    { id: "DRUG-AMX-500", name: "Amoxicillin 500mg" },
    { id: "DRUG-MET-500", name: "Metformin 500mg" },
    { id: "DRUG-ATV-020", name: "Atorvastatin 20mg" },
    { id: "DRUG-PCM-500", name: "Paracetamol 500mg" },
  ];

  const issuingAuthorities = [
    "CDSCO Central Licensing Authority",
    "CDSCO West Zone",
    "CDSCO East Zone",
    "CDSCO North Zone",
    "CDSCO South Zone",
    "State Drug Control Authority"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.licenseId.trim()) {
      newErrors.licenseId = "License ID is required";
    } else if (!/^LIC-[A-Z]{3}-[A-Z]{3}-\d{3}$/.test(formData.licenseId)) {
      newErrors.licenseId = "Format should be LIC-XXX-XXX-000 (e.g., LIC-CIP-PCM-001)";
    }
    
    if (!formData.manufacturerId) {
      newErrors.manufacturerId = "Please select a manufacturer";
    }
    
    if (!formData.drugTypeId) {
      newErrors.drugTypeId = "Please select an approved medicine";
    }
    
    if (!formData.issued) {
      newErrors.issued = "Issue date is required";
    }
    
    if (!formData.expires) {
      newErrors.expires = "Expiry date is required";
    } else if (formData.expires <= formData.issued) {
      newErrors.expires = "Expiry date must be after issue date";
    }
    
    if (!formData.issuedBy) {
      newErrors.issuedBy = "Issuing authority is required";
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
      const issuedDate = new Date(formData.issued);
      const expiryDate = new Date(formData.expires);
      
      const newLicense = {
        ...formData,
        issued: issuedDate.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        expires: expiryDate.toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        revokedReason: "",
      };
      
      console.log("New license issued:", newLicense);
      
      if (onSuccess) {
        onSuccess(newLicense);
      }
      
      setFormData({
        licenseId: "",
        manufacturerId: "",
        drugTypeId: "",
        issued: "",
        expires: "",
        issuedBy: "",
        status: "Valid",
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      licenseId: "",
      manufacturerId: "",
      drugTypeId: "",
      issued: "",
      expires: "",
      issuedBy: "",
      status: "Valid",
    });
    setErrors({});
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg border border-blue-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-200 bg-blue-50 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Issue Manufacturing License
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Issue a new manufacturing license for a drug manufacturer
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

        {/* Form */}
        <form onSubmit={handleSubmit} className="overflow-y-auto p-6" style={{ maxHeight: "calc(90vh - 140px)" }}>
          <div className="grid gap-5 sm:grid-cols-2">
            {/* License ID */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                License Registration No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="licenseId"
                value={formData.licenseId}
                onChange={handleChange}
                placeholder="e.g., LIC-CIP-PCM-001"
                className={`mt-1 h-10 w-full rounded-md border ${errors.licenseId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.licenseId && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.licenseId}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">Format: LIC-XXX-XXX-000 (e.g., LIC-CIP-PCM-001)</p>
            </div>

            {/* Manufacturer */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Manufacturer <span className="text-red-500">*</span>
              </label>
              <select
                name="manufacturerId"
                value={formData.manufacturerId}
                onChange={handleChange}
                className={`mt-1 h-10 w-full rounded-md border ${errors.manufacturerId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select manufacturer</option>
                {manufacturers.map(mfr => (
                  <option key={mfr.id} value={mfr.id}>{mfr.name} ({mfr.id})</option>
                ))}
              </select>
              {errors.manufacturerId && (
                <p className="mt-1 text-xs text-red-600">{errors.manufacturerId}</p>
              )}
            </div>

            {/* Approved Medicine */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Approved Medicine <span className="text-red-500">*</span>
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

            {/* Issue Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Issue Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="issued"
                value={formData.issued}
                onChange={handleChange}
                className={`mt-1 h-10 w-full rounded-md border ${errors.issued ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.issued && (
                <p className="mt-1 text-xs text-red-600">{errors.issued}</p>
              )}
            </div>

            {/* Expiry Date */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Expiry Date <span className="text-red-500">*</span>
              </label>
              <input
                type="date"
                name="expires"
                value={formData.expires}
                onChange={handleChange}
                className={`mt-1 h-10 w-full rounded-md border ${errors.expires ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.expires && (
                <p className="mt-1 text-xs text-red-600">{errors.expires}</p>
              )}
            </div>

            {/* Issuing Authority */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Issuing Authority <span className="text-red-500">*</span>
              </label>
              <select
                name="issuedBy"
                value={formData.issuedBy}
                onChange={handleChange}
                className={`mt-1 h-10 w-full rounded-md border ${errors.issuedBy ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select issuing authority</option>
                {issuingAuthorities.map(authority => (
                  <option key={authority} value={authority}>{authority}</option>
                ))}
              </select>
              {errors.issuedBy && (
                <p className="mt-1 text-xs text-red-600">{errors.issuedBy}</p>
              )}
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-5 rounded-md border border-blue-100 bg-blue-50 p-3">
            <div className="flex items-start gap-2">
              <Upload className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-blue-800">
                  Regulatory Information
                </p>
                <p className="text-xs text-blue-700">
                  This license will be recorded in the official registry and linked to the manufacturer's profile.
                </p>
              </div>
            </div>
          </div>
        </form>

        {/* Footer */}
        <div className="flex flex-col-reverse gap-2 border-t border-blue-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
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
            className="inline-flex items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Issuing...
              </>
            ) : (
              <>
                <Award className="h-4 w-4" />
                Issue License
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}