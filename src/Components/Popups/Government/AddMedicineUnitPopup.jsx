import { useState } from "react";
import { X, Upload, AlertCircle, Box, Package } from "lucide-react";

export default function AddMedicineUnitPopup({ isOpen, onClose, onSuccess }) {
  const [formData, setFormData] = useState({
    unitId: "",
    drugTypeId: "",
    manufacturerId: "",
    licenseId: "",
    batch: "",
    status: "Active",
    currentOwner: {
      id: "",
      type: "Manufacturer",
      name: "",
    },
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const drugTypes = [
    { id: "DRUG-AMX-500", name: "Amoxicillin 500mg" },
    { id: "DRUG-MET-500", name: "Metformin 500mg" },
    { id: "DRUG-ATV-020", name: "Atorvastatin 20mg" },
    { id: "DRUG-PCM-500", name: "Paracetamol 500mg" },
  ];

  const manufacturers = [
    { id: "MFG-CIP-001", name: "Cipla Limited", licenseId: "LIC-CIP-PCM-001" },
    { id: "MFG-SUN-002", name: "Sun Pharmaceuticals Ltd.", licenseId: "LIC-SUN-AMX-001" },
  ];

  const statuses = ["Active", "Expired", "Sold", "Recalled", "In Transit", "Quarantined"];

  const ownerTypes = ["Manufacturer", "Pharmacy", "Distributor", "Citizen", "Wholesaler"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    if (name === "manufacturerId") {
      const selectedMfr = manufacturers.find(m => m.id === value);
      setFormData(prev => ({
        ...prev,
        manufacturerId: value,
        licenseId: selectedMfr?.licenseId || "",
      }));
    } else if (name === "ownerId") {
      setFormData(prev => ({
        ...prev,
        currentOwner: { ...prev.currentOwner, id: value },
      }));
    } else if (name === "ownerType") {
      setFormData(prev => ({
        ...prev,
        currentOwner: { ...prev.currentOwner, type: value },
      }));
    } else if (name === "ownerName") {
      setFormData(prev => ({
        ...prev,
        currentOwner: { ...prev.currentOwner, name: value },
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const generateUnitId = () => {
    const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `UNIT-${randomNum}`;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.unitId.trim()) {
      newErrors.unitId = "Medicine Unit No. is required";
    } else if (!/^UNIT-\d{4}$/.test(formData.unitId)) {
      newErrors.unitId = "Format should be UNIT-0000 (e.g., UNIT-0001)";
    }
    
    if (!formData.drugTypeId) {
      newErrors.drugTypeId = "Please select a medicine";
    }
    
    if (!formData.manufacturerId) {
      newErrors.manufacturerId = "Please select a manufacturer";
    }
    
    if (!formData.batch.trim()) {
      newErrors.batch = "Batch number is required";
    } else if (!/^BATCH\d{3}$/.test(formData.batch)) {
      newErrors.batch = "Format should be BATCH000 (e.g., BATCH001)";
    }
    
    if (!formData.currentOwner.id.trim()) {
      newErrors.ownerId = "Owner registration ID is required";
    }
    
    if (!formData.currentOwner.name.trim()) {
      newErrors.ownerName = "Owner name is required";
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
      const newUnit = {
        ...formData,
        createdAt: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
        transferHistory: [
          {
            from: "System",
            to: formData.currentOwner.name,
            timestamp: new Date().toLocaleString(),
            txnId: `TXN-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
          },
        ],
      };
      
      console.log("New medicine unit created:", newUnit);
      
      if (onSuccess) {
        onSuccess(newUnit);
      }
      
      setFormData({
        unitId: "",
        drugTypeId: "",
        manufacturerId: "",
        licenseId: "",
        batch: "",
        status: "Active",
        currentOwner: {
          id: "",
          type: "Manufacturer",
          name: "",
        },
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      unitId: "",
      drugTypeId: "",
      manufacturerId: "",
      licenseId: "",
      batch: "",
      status: "Active",
      currentOwner: {
        id: "",
        type: "Manufacturer",
        name: "",
      },
    });
    setErrors({});
    onClose();
  };

  const handleGenerateId = () => {
    const newId = generateUnitId();
    setFormData(prev => ({ ...prev, unitId: newId }));
    if (errors.unitId) {
      setErrors(prev => ({ ...prev, unitId: "" }));
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="relative w-full max-w-3xl max-h-[90vh] overflow-hidden rounded-lg border border-blue-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-blue-200 bg-blue-50 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Add New Medicine Unit
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Register a new medicine unit in the supply chain
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
            {/* Medicine Unit No. */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Medicine Unit No. <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="unitId"
                  value={formData.unitId}
                  onChange={handleChange}
                  placeholder="e.g., UNIT-0001"
                  className={`mt-1 h-10 flex-1 rounded-md border ${errors.unitId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={handleGenerateId}
                  className="mt-1 inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  Generate ID
                </button>
              </div>
              {errors.unitId && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.unitId}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">Format: UNIT-0000 (e.g., UNIT-0001)</p>
            </div>

            {/* Medicine Registration Ref. */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Medicine <span className="text-red-500">*</span>
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

            {/* Manufacturing License No. */}
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
              <p className="mt-1 text-xs text-gray-500">Auto-filled from manufacturer</p>
            </div>

            {/* Batch No. */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Batch No. <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="batch"
                value={formData.batch}
                onChange={handleChange}
                placeholder="e.g., BATCH001"
                className={`mt-1 h-10 w-full rounded-md border ${errors.batch ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.batch && (
                <p className="mt-1 text-xs text-red-600">{errors.batch}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Format: BATCH000 (e.g., BATCH001)</p>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Unit Status
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

            {/* Current Owner Section */}
            <div className="sm:col-span-2">
              <div className="mb-2 border-b border-blue-200 pb-2">
                <h3 className="text-sm font-semibold text-gray-900">Current Holder Information</h3>
              </div>
            </div>

            {/* Owner Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Holder Type
              </label>
              <select
                name="ownerType"
                value={formData.currentOwner.type}
                onChange={handleChange}
                className="mt-1 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {ownerTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Owner ID */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Holder Registration ID <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ownerId"
                value={formData.currentOwner.id}
                onChange={handleChange}
                placeholder="e.g., MFG-CIP-001, PHR-APL-003"
                className={`mt-1 h-10 w-full rounded-md border ${errors.ownerId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.ownerId && (
                <p className="mt-1 text-xs text-red-600">{errors.ownerId}</p>
              )}
            </div>

            {/* Owner Name */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Holder Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="ownerName"
                value={formData.currentOwner.name}
                onChange={handleChange}
                placeholder="Full name of the current holder"
                className={`mt-1 h-10 w-full rounded-md border ${errors.ownerName ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.ownerName && (
                <p className="mt-1 text-xs text-red-600">{errors.ownerName}</p>
              )}
            </div>
          </div>

          {/* Info Note */}
          <div className="mt-5 rounded-md border border-blue-100 bg-blue-50 p-3">
            <div className="flex items-start gap-2">
              <Package className="h-4 w-4 text-blue-600 mt-0.5" />
              <div>
                <p className="text-xs font-medium text-blue-800">
                  Supply Chain Information
                </p>
                <p className="text-xs text-blue-700">
                  This medicine unit will be tracked throughout its lifecycle from manufacturer to end consumer.
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
                Creating...
              </>
            ) : (
              <>
                <Box className="h-4 w-4" />
                Add Medicine Unit
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}