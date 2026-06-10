import { useState } from "react";
import { X, Upload, AlertCircle, HeartHandshake, IndianRupee } from "lucide-react";

export default function CreateSchemePopup({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    schemeId: "",
    schemeName: "",
    description: "",
    issuedBy: "",
    coverageAmount: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const statuses = ["Active", "Inactive", "Under Review", "Expired"];

  const issuingAuthorities = [
    "National Health Authority",
    "Ministry of Health and Family Welfare",
    "State Health Agency",
    "Employees' State Insurance Corporation",
    "Central Government Health Scheme",
    "State Government Health Department",
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const generateSchemeId = () => {
    const prefix = "SCH";
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${prefix}-${randomNum}`;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.schemeId.trim()) {
      newErrors.schemeId = "Scheme ID is required";
    } else if (!/^SCH-[A-Z]{3,4}-\d{3}$|^SCH-\d{4}$/.test(formData.schemeId)) {
      newErrors.schemeId = "Format should be SCH-XXXX-000 or SCH-0000 (e.g., SCH-PMJAY-001 or SCH-0001)";
    }
    
    if (!formData.schemeName.trim()) {
      newErrors.schemeName = "Scheme name is required";
    } else if (formData.schemeName.length < 5) {
      newErrors.schemeName = "Scheme name must be at least 5 characters";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Scheme description is required";
    } else if (formData.description.length < 30) {
      newErrors.description = "Please provide a detailed description (minimum 30 characters)";
    }
    
    if (!formData.issuedBy) {
      newErrors.issuedBy = "Please select issuing authority";
    }
    
    if (!formData.coverageAmount.trim()) {
      newErrors.coverageAmount = "Coverage amount is required";
    } else if (!/^₹?\d{1,3}(,\d{3})*$/.test(formData.coverageAmount.replace(/[^0-9,]/g, ''))) {
      newErrors.coverageAmount = "Please enter a valid amount (e.g., 500000 or ₹5,00,000)";
    }
    
    return newErrors;
  };

  const formatAmount = (amount) => {
    // Remove any non-digit characters
    const cleanAmount = amount.replace(/[^0-9]/g, '');
    if (!cleanAmount) return '';
    
    // Format with commas
    const num = parseInt(cleanAmount, 10);
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(num);
  };

  const handleAmountChange = (e) => {
    const rawValue = e.target.value;
    const formattedValue = formatAmount(rawValue);
    setFormData(prev => ({ ...prev, coverageAmount: formattedValue }));
    if (errors.coverageAmount) {
      setErrors(prev => ({ ...prev, coverageAmount: "" }));
    }
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
      const newScheme = {
        ...formData,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
      };
      
      console.log("New scheme created:", newScheme);
      
      if (onSuccess) {
        onSuccess(newScheme);
      }
      
      setFormData({
        schemeId: "",
        schemeName: "",
        description: "",
        issuedBy: "",
        coverageAmount: "",
        status: "Active",
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      schemeId: "",
      schemeName: "",
      description: "",
      issuedBy: "",
      coverageAmount: "",
      status: "Active",
    });
    setErrors({});
    onClose();
  };

  const handleGenerateId = () => {
    const newId = generateSchemeId();
    setFormData(prev => ({ ...prev, schemeId: newId }));
    if (errors.schemeId) {
      setErrors(prev => ({ ...prev, schemeId: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-3xl rounded-lg border border-blue-200 bg-white shadow-xl flex flex-col max-h-[90vh]">
        {/* Header - fixed at top */}
        <div className="flex items-center justify-between border-b border-blue-200 bg-blue-50 px-6 py-4 flex-shrink-0">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Create Healthcare Scheme
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Register a new government healthcare scheme
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
          <div className="grid gap-5 sm:grid-cols-2">
            {/* Scheme ID */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Scheme ID <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="schemeId"
                  value={formData.schemeId}
                  onChange={handleChange}
                  placeholder="e.g., SCH-PMJAY-001 or SCH-0001"
                  className={`mt-1 h-10 flex-1 rounded-md border ${errors.schemeId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={handleGenerateId}
                  className="mt-1 inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100 flex-shrink-0"
                >
                  Generate ID
                </button>
              </div>
              {errors.schemeId && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.schemeId}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">Format: SCH-XXXX-000 or SCH-0000</p>
            </div>

            {/* Scheme Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Scheme Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="schemeName"
                value={formData.schemeName}
                onChange={handleChange}
                placeholder="Enter full scheme name"
                className={`mt-1 h-10 w-full rounded-md border ${errors.schemeName ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.schemeName && (
                <p className="mt-1 text-xs text-red-600">{errors.schemeName}</p>
              )}
            </div>

            {/* Description */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Scheme Description <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={4}
                placeholder="Describe the scheme's objectives, coverage, and benefits..."
                className={`mt-1 w-full rounded-md border ${errors.description ? 'border-red-300' : 'border-gray-300'} bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">{errors.description}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Provide a comprehensive description for regulatory records</p>
            </div>

            {/* Issuing Authority */}
            <div>
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

            {/* Coverage Amount */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Coverage Amount <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <IndianRupee className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="coverageAmount"
                  value={formData.coverageAmount}
                  onChange={handleAmountChange}
                  placeholder="e.g., 500000 or ₹5,00,000"
                  className={`mt-1 h-10 w-full rounded-md border ${errors.coverageAmount ? 'border-red-300' : 'border-gray-300'} bg-white pl-9 pr-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
              </div>
              {errors.coverageAmount && (
                <p className="mt-1 text-xs text-red-600">{errors.coverageAmount}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Enter amount in INR (e.g., 500000 or ₹5,00,000)</p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Scheme Status
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
          </div>

          {/* Info Note */}
          <div className="mt-5 rounded-md border border-blue-100 bg-blue-50 p-3">
            <div className="flex items-start gap-2">
              <HeartHandshake className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-blue-800">
                  Scheme Registration Information
                </p>
                <p className="text-xs text-blue-700">
                  This scheme will be available for beneficiary enrollment and claim processing across all healthcare facilities.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - fixed at bottom */}
        <div className="flex flex-col-reverse gap-2 border-t border-blue-200 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end flex-shrink-0">
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
                Creating...
              </>
            ) : (
              <>
                <HeartHandshake className="h-4 w-4" />
                Create Scheme
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}