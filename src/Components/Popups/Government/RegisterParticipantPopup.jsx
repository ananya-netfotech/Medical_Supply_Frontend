import { useState } from "react";
import { X, Upload, AlertCircle, UsersRound } from "lucide-react";

export default function RegisterParticipantPopup({ isOpen, onClose, onSuccess, participantType = "manufacturer" }) {
  const [formData, setFormData] = useState({
    participantId: "",
    role: "Manufacturer",
    name: "",
    organization: "",
    email: "",
    phone: "",
    status: "Active",
    registeredBy: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    { value: "Manufacturer", label: "Manufacturer" },
    { value: "Pharmacy", label: "Pharmacy" },
    { value: "Distributor", label: "Distributor" },
    { value: "Wholesaler", label: "Wholesaler" },
  ];

  const organizations = {
    Manufacturer: [
      "Cipla Limited",
      "Sun Pharmaceuticals Ltd.",
      "Bharat Biotech",
      "Divis Laboratories",
      "Dr. Reddy's Laboratories",
      "Lupin Limited",
    ],
    Pharmacy: [
      "Apollo Pharmacy",
      "MedPlus Pharmacy",
      "Wellness Pharmacy",
      "Netmeds Pharmacy",
      "Pharmeasy Pharmacy",
      "1mg Pharmacy",
    ],
    Distributor: [
      "North India Pharma Distributors",
      "South India Medical Supplies",
      "East Coast Pharma Network",
      "West Zone Drug Distributors",
    ],
    Wholesaler: [
      "ABC Wholesale Drugs",
      "XYZ Medical Wholesalers",
      "MediCare Wholesale",
    ],
  };

  const statuses = ["Active", "Inactive", "Suspended", "Under Review"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const generateParticipantId = (role) => {
    const prefix = role === "Manufacturer" ? "MFG" : 
                   role === "Pharmacy" ? "PHR" : 
                   role === "Distributor" ? "DIST" : "WHL";
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${prefix}-PART-${randomNum}`;
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.participantId.trim()) {
      newErrors.participantId = "Participant registration number is required";
    } else if (!/^(MFG|PHR|DIST|WHL)-PART-\d{3}$/.test(formData.participantId)) {
      newErrors.participantId = "Format should be XXX-PART-000 (e.g., MFG-PART-001)";
    }
    
    if (!formData.name.trim()) {
      newErrors.name = "Authorized contact name is required";
    } else if (formData.name.length < 3) {
      newErrors.name = "Name must be at least 3 characters";
    }
    
    if (!formData.organization) {
      newErrors.organization = "Please select or enter an organization";
    }
    
    if (!formData.email.trim()) {
      newErrors.email = "Official email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = "Contact number is required";
    } else if (!/^\+91-[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Format should be +91-XXXXXXXXXX (10 digits)";
    }
    
    if (!formData.registeredBy.trim()) {
      newErrors.registeredBy = "Registering authority is required";
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
      const newParticipant = {
        ...formData,
        registered: new Date().toLocaleDateString("en-US", {
          month: "numeric",
          day: "numeric",
          year: "numeric",
        }),
      };
      
      console.log("New participant registered:", newParticipant);
      
      if (onSuccess) {
        onSuccess(newParticipant);
      }
      
      setFormData({
        participantId: "",
        role: "Manufacturer",
        name: "",
        organization: "",
        email: "",
        phone: "",
        status: "Active",
        registeredBy: "",
      });
      
      setIsSubmitting(false);
      onClose();
    }, 1000);
  };

  const handleClose = () => {
    setFormData({
      participantId: "",
      role: "Manufacturer",
      name: "",
      organization: "",
      email: "",
      phone: "",
      status: "Active",
      registeredBy: "",
    });
    setErrors({});
    onClose();
  };

  const handleGenerateId = () => {
    const newId = generateParticipantId(formData.role);
    setFormData(prev => ({ ...prev, participantId: newId }));
    if (errors.participantId) {
      setErrors(prev => ({ ...prev, participantId: "" }));
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
              Register New Participant
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Register a manufacturer, pharmacy, or other authorized participant
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
            {/* Participant Registration No. */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Participant Registration No. <span className="text-red-500">*</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  name="participantId"
                  value={formData.participantId}
                  onChange={handleChange}
                  placeholder="e.g., MFG-PART-001"
                  className={`mt-1 h-10 flex-1 rounded-md border ${errors.participantId ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
                />
                <button
                  type="button"
                  onClick={handleGenerateId}
                  className="mt-1 inline-flex items-center gap-1 rounded-md border border-blue-200 bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 transition-colors hover:bg-blue-100"
                >
                  Generate ID
                </button>
              </div>
              {errors.participantId && (
                <p className="mt-1 text-xs text-red-600 flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.participantId}
                </p>
              )}
              <p className="mt-1 text-xs text-gray-500">Format: XXX-PART-000 (e.g., MFG-PART-001)</p>
            </div>

            {/* Participant Role */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Participant Role <span className="text-red-500">*</span>
              </label>
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                className="mt-1 h-10 w-full rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              >
                {roles.map(role => (
                  <option key={role.value} value={role.value}>{role.label}</option>
                ))}
              </select>
            </div>

            {/* Authorized Contact */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Authorized Contact <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full name of authorized contact"
                className={`mt-1 h-10 w-full rounded-md border ${errors.name ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.name && (
                <p className="mt-1 text-xs text-red-600">{errors.name}</p>
              )}
            </div>

            {/* Registered Organization */}
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Registered Organization <span className="text-red-500">*</span>
              </label>
              <select
                name="organization"
                value={formData.organization}
                onChange={handleChange}
                className={`mt-1 h-10 w-full rounded-md border ${errors.organization ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              >
                <option value="">Select organization</option>
                {organizations[formData.role]?.map(org => (
                  <option key={org} value={org}>{org}</option>
                ))}
              </select>
              {errors.organization && (
                <p className="mt-1 text-xs text-red-600">{errors.organization}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">You can type a custom organization name after selecting</p>
            </div>

            {/* Official Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Official Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="contact@organization.com"
                className={`mt-1 h-10 w-full rounded-md border ${errors.email ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.email && (
                <p className="mt-1 text-xs text-red-600">{errors.email}</p>
              )}
            </div>

            {/* Contact Number */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Contact Number <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="+91-XXXXXXXXXX"
                className={`mt-1 h-10 w-full rounded-md border ${errors.phone ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.phone && (
                <p className="mt-1 text-xs text-red-600">{errors.phone}</p>
              )}
              <p className="mt-1 text-xs text-gray-500">Format: +91 followed by 10 digits</p>
            </div>

            {/* Operational Status */}
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Operational Status
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
            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-700">
                Registered By (Authority) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                name="registeredBy"
                value={formData.registeredBy}
                onChange={handleChange}
                placeholder="e.g., CDSCO West Zone Admin, State Drug Control Karnataka"
                className={`mt-1 h-10 w-full rounded-md border ${errors.registeredBy ? 'border-red-300' : 'border-gray-300'} bg-white px-3 text-sm text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500`}
              />
              {errors.registeredBy && (
                <p className="mt-1 text-xs text-red-600">{errors.registeredBy}</p>
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
                  This registration will be recorded in the official participant registry and will be visible to all regulatory authorities.
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
                <UsersRound className="h-4 w-4" />
                Register Participant
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}