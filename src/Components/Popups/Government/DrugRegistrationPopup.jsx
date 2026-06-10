import { useState } from "react";
import { X, Upload, AlertCircle, Plus } from "lucide-react";

export default function DrugRegistrationPopup({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    drugTypeId: "",
    name: "",
    description: "",
    category: "",
    regulatoryCode: "",
    status: "Active",
    createdBy: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    "Antibiotic",
    "Antidiabetic",
    "Cardiovascular",
    "Analgesic",
    "Antiviral",
    "Antifungal",
    "Antihypertensive",
    "Other"
  ];

  const statuses = [
    "Active",
    "Inactive",
    "Under Review",
    "Suspended"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.drugTypeId.trim()) {
      newErrors.drugTypeId = "Drug Registration No. is required";
    } else if (!/^DRUG-[A-Z]{3}-\d{3}$/.test(formData.drugTypeId)) {
      newErrors.drugTypeId = "Format should be DRUG-XXX-000 (e.g., DRUG-AMX-500)";
    }
    
    if (!formData.name.trim()) {
      newErrors.name = "Medicine name is required";
    }
    
    if (!formData.description.trim()) {
      newErrors.description = "Therapeutic use description is required";
    } else if (formData.description.length < 20) {
      newErrors.description = "Please provide a more detailed description (minimum 20 characters)";
    }
    
    if (!formData.category) {
      newErrors.category = "Please select a drug category";
    }
    
    if (!formData.regulatoryCode.trim()) {
      newErrors.regulatoryCode = "Regulatory approval code is required";
    }
    
    if (!formData.createdBy.trim()) {
      newErrors.createdBy = "Registered by is required";
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
      const newDrug = {
        ...formData,
        created: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
      };
      
      console.log("New drug registered:", newDrug);
      
      // Call success callback if provided
      if (onSuccess) {
        onSuccess(newDrug);
      }
      
      // Reset form
      setFormData({
        drugTypeId: "",
        name: "",
        description: "",
        category: "",
        regulatoryCode: "",
        status: "Active",
        createdBy: "",
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      drugTypeId: "",
      name: "",
      description: "",
      category: "",
      regulatoryCode: "",
      status: "Active",
      createdBy: "",
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
              Register New Medicine
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Enter the details for new drug registration
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
            {/* Drug Registration No. */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Drug Registration No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="drugTypeId"
                value={formData.drugTypeId}
                onChange={handleChange}
                placeholder="e.g., DRUG-AMX-500"
                className={`mt-1 h-10 w-full rounded-md border ${errors.drugTypeId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.drugTypeId && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.drugTypeId}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">Format: DRUG-XXX-000 (e.g., DRUG-AMX-500)</p>
            </div>

            {/* Medicine Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Medicine Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter medicine name"
                className={`mt-1 h-10 w-full rounded-md border ${errors.name ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Therapeutic Use */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Therapeutic Use <span className="text-red-500">*</span>
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={3}
                placeholder="Describe the therapeutic use and indications"
                className={`mt-1 w-full rounded-md border ${errors.description ? 'border-red-300' : 'border-gray-300'} bg-white px-3 py-2 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.description && (
                <p className="mt-1 text-xs text-red-600">{errors.description}</p>
              )}
            </div>

            {/* Drug Category */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Drug Category <span className="text-red-500">*</span>
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={`mt-1 h-10 w-full rounded-md border ${errors.category ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select category</option>
                {categories.map(cat => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
              {errors.category && (
                <p className="mt-1 text-xs text-red-600">{errors.category}</p>
              )}
            </div>

            {/* Regulatory Approval Code */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Regulatory Approval Code <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="regulatoryCode"
                value={formData.regulatoryCode}
                onChange={handleChange}
                placeholder="e.g., CDSCO-AMX-500"
                className={`mt-1 h-10 w-full rounded-md border ${errors.regulatoryCode ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.regulatoryCode && (
                <p className="mt-1 text-xs text-red-600">{errors.regulatoryCode}</p>
              )}
            </div>

            {/* Approval Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Approval Status
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

            {/* Registered By */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Registered By <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="createdBy"
                value={formData.createdBy}
                onChange={handleChange}
                placeholder="Enter registrar name"
                className={`mt-1 h-10 w-full rounded-md border ${errors.createdBy ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.createdBy && (
                <p className="mt-1 text-xs text-red-600">{errors.createdBy}</p>
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
                  This registration will be recorded in the official drug registry and will be visible to all regulatory authorities.
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
                Registering...
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                Register Medicine
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}