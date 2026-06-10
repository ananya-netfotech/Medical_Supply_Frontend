import { useState } from "react";
import { X, CheckCircle2, AlertTriangle, FileText, UserCheck, Calendar, Award, Upload, Lock } from "lucide-react";

export default function MarkVerifiedModal({ isOpen, onClose, audit }) {
  const [verificationStatus, setVerificationStatus] = useState("verified");
  const [remarks, setRemarks] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [digitalSignature, setDigitalSignature] = useState("");
  const [signatureError, setSignatureError] = useState("");

  if (!isOpen) return null;

  const handleSignatureUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        setSignatureError("Please upload PNG or JPG/JPEG file only");
        return;
      }
      
      // Validate file size (max 2MB)
      if (file.size > 2 * 1024 * 1024) {
        setSignatureError("File size should be less than 2MB");
        return;
      }
      
      const reader = new FileReader();
      reader.onloadend = () => {
        setDigitalSignature(reader.result);
        setSignatureError("");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClearSignature = () => {
    setDigitalSignature("");
    setSignatureError("");
  };

  const validateForm = () => {
    if (!digitalSignature) {
      setSignatureError("Digital signature is mandatory");
      return false;
    }
    if (!remarks.trim()) {
      setSignatureError("Verification remarks are mandatory");
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
    if (!validateForm()) {
      return;
    }
    
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setTimeout(() => {
        onClose();
        setSubmitted(false);
        setVerificationStatus("verified");
        setRemarks("");
        setDigitalSignature("");
        setSignatureError("");
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        <div className="relative w-full max-w-2xl rounded-lg bg-white shadow-xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-white z-10 flex items-center justify-between border-b border-gray-200 p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-5 w-5 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">Mark Audit as Verified</h3>
                <p className="text-sm text-gray-500">Confirm the verification of this audit</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {submitted ? (
            <div className="p-8 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                <CheckCircle2 className="h-8 w-8 text-green-600" />
              </div>
              <h4 className="text-lg font-semibold text-gray-900">Audit Verified Successfully!</h4>
              <p className="mt-2 text-sm text-gray-500">
                The audit has been marked as verified and added to the compliance record.
              </p>
            </div>
          ) : (
            <>
              <div className="p-6">
                {/* Audit Info */}
                {audit && (
                  <div className="mb-6 rounded-md bg-blue-50 p-4 border border-blue-200">
                    <p className="text-sm font-semibold text-blue-900">{audit.auditId}</p>
                    <p className="text-sm text-blue-700 mt-1">{audit.action}</p>
                    <div className="mt-2 flex gap-4 text-xs text-blue-600">
                      <span>Entity: {audit.entity}</span>
                      <span>Severity: {audit.severity}</span>
                    </div>
                  </div>
                )}

                {/* Verification Status */}
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Verification Status <span className="text-red-500">*</span>
                </label>
                <div className="mb-4 grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setVerificationStatus("verified")}
                    className={`rounded-md border p-3 text-sm font-medium transition-colors ${
                      verificationStatus === "verified"
                        ? "border-green-500 bg-green-50 text-green-700 ring-2 ring-green-500 ring-offset-1"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <CheckCircle2 className="h-5 w-5" />
                      <span>Verified</span>
                    </div>
                  </button>
                  <button
                    onClick={() => setVerificationStatus("needs_review")}
                    className={`rounded-md border p-3 text-sm font-medium transition-colors ${
                      verificationStatus === "needs_review"
                        ? "border-yellow-500 bg-yellow-50 text-yellow-700 ring-2 ring-yellow-500 ring-offset-1"
                        : "border-gray-300 bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex flex-col items-center gap-1">
                      <AlertTriangle className="h-5 w-5" />
                      <span>Needs Review</span>
                    </div>
                  </button>
                </div>

                {/* Digital Signature Section - Mandatory */}
                <div className="mb-4">
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Digital Signature <span className="text-red-500">* (Mandatory)</span>
                  </label>
                  
                  <div className="rounded-md border border-gray-300 bg-white p-4">
                    {/* Signature Upload Area */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <label className="cursor-pointer flex-1">
                          <div className="flex items-center justify-center gap-2 rounded-md border-2 border-dashed border-gray-300 bg-gray-50 px-4 py-3 hover:bg-gray-100 transition-colors">
                            <Upload className="h-5 w-5 text-gray-500" />
                            <span className="text-sm text-gray-600">Click to upload signature image</span>
                          </div>
                          <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg"
                            onChange={handleSignatureUpload}
                            className="hidden"
                          />
                        </label>
                        {digitalSignature && (
                          <button
                            onClick={handleClearSignature}
                            className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600 hover:bg-red-100"
                          >
                            Clear
                          </button>
                        )}
                      </div>
                      
                      {digitalSignature && (
                        <div className="rounded-md border border-gray-200 p-3 bg-gray-50">
                          <p className="text-xs text-gray-500 mb-2">Signature Preview:</p>
                          <img src={digitalSignature} alt="Signature" className="max-h-20 object-contain" />
                        </div>
                      )}
                      
                      <div className="rounded-md bg-blue-50 p-2">
                        <p className="text-xs text-blue-700 flex items-center gap-1">
                          <Lock className="h-3 w-3" />
                          Accepted formats: PNG, JPG, JPEG (Max 2MB)
                        </p>
                      </div>
                    </div>

                    {/* Signature Error */}
                    {signatureError && (
                      <div className="mt-3 rounded-md bg-red-50 p-2 border border-red-200">
                        <p className="text-xs text-red-600 flex items-center gap-1">
                          <AlertTriangle className="h-3 w-3" />
                          {signatureError}
                        </p>
                      </div>
                    )}

                    {/* Digital Certificate Info */}
                    <div className="mt-3 rounded-md bg-green-50 p-2 border border-green-200">
                      <div className="flex items-center gap-2">
                        <Award className="h-4 w-4 text-green-600" />
                        <p className="text-xs text-green-700">
                          By uploading your digital signature, you confirm the accuracy of this verification
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Verification Remarks - Made Mandatory */}
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Verification Remarks <span className="text-red-500">* (Mandatory)</span>
                </label>
                <textarea
                  value={remarks}
                  onChange={(e) => setRemarks(e.target.value)}
                  rows={4}
                  className="w-full rounded-md border border-gray-300 p-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  placeholder="Add verification notes, findings, or recommendations..."
                  required
                />

                {/* Verification Checklist */}
                <div className="mt-4 rounded-md bg-gray-50 p-4">
                  <p className="mb-2 text-sm font-semibold text-gray-700">Verification Checklist</p>
                  <div className="space-y-2">
                    {[
                      "Audit documentation reviewed",
                      "Entity details verified",
                      "Timeline and actions confirmed",
                      "Compliance with regulations checked",
                    ].map((item, idx) => (
                      <label key={idx} className="flex items-center gap-2">
                        <input type="checkbox" className="h-4 w-4 rounded border-gray-300 text-green-600" />
                        <span className="text-sm text-gray-600">{item}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Signer Information */}
                <div className="mt-4 rounded-md border border-blue-200 bg-blue-50 p-3">
                  <div className="flex items-start gap-2">
                    <UserCheck className="h-5 w-5 text-blue-600 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-blue-900">Signer Information</p>
                      <div className="mt-2 grid grid-cols-2 gap-2 text-xs text-blue-700">
                        <div>
                          <p className="font-semibold">Name:</p>
                          <p>Authorized Officer</p>
                        </div>
                        <div>
                          <p className="font-semibold">Designation:</p>
                          <p>Compliance Verifier</p>
                        </div>
                        <div>
                          <p className="font-semibold">Date:</p>
                          <p>{new Date().toLocaleDateString()}</p>
                        </div>
                        <div>
                          <p className="font-semibold">Time:</p>
                          <p>{new Date().toLocaleTimeString()}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="sticky bottom-0 bg-white border-t border-gray-200 p-4 flex justify-end gap-3">
                <button
                  onClick={onClose}
                  className="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={submitting || !digitalSignature || !remarks.trim()}
                  className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {submitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 className="h-4 w-4" />
                      Confirm Verification
                    </>
                  )}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}