import { useState } from "react";
import { X, Shield, Lock, Key, Smartphone, AlertCircle, CheckCircle, Eye, EyeOff, Fingerprint } from "lucide-react";

export default function SecurityModal({ isOpen, onClose, user }) {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [updateError, setUpdateError] = useState("");

  if (!isOpen) return null;

  const handlePasswordUpdate = async (e) => {
    e.preventDefault();
    
    if (newPassword !== confirmPassword) {
      setUpdateError("New passwords do not match");
      return;
    }
    
    if (newPassword.length < 8) {
      setUpdateError("Password must be at least 8 characters");
      return;
    }
    
    setIsUpdating(true);
    setUpdateError("");
    
    // Simulate API call
    setTimeout(() => {
      setIsUpdating(false);
      setUpdateSuccess(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      
      setTimeout(() => {
        setUpdateSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleTwoFactorToggle = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // Simulate API call to enable/disable 2FA
    setTimeout(() => {
      console.log("2FA toggled:", !twoFactorEnabled);
    }, 500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        <div className="relative w-full max-w-2xl rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Shield className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Security Settings</h2>
                <p className="text-sm text-slate-500">Manage your account security</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-slate-400 transition hover:bg-slate-100 hover:text-slate-600"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Success Message */}
            {updateSuccess && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700 border border-green-200">
                <CheckCircle className="h-4 w-4" />
                <p className="text-sm font-medium">Password updated successfully!</p>
              </div>
            )}

            {/* Password Update Section */}
            <div className="mb-6 rounded-lg border border-slate-200 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Lock className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Change Password</h3>
              </div>
              
              <form onSubmit={handlePasswordUpdate} className="space-y-4">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Current Password
                  </label>
                  <div className="relative">
                    <input
                      type={showCurrentPassword ? "text" : "password"}
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter current password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showCurrentPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    New Password
                  </label>
                  <div className="relative">
                    <input
                      type={showNewPassword ? "text" : "password"}
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      className="w-full rounded-lg border border-slate-300 px-3 py-2 pr-10 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      placeholder="Enter new password"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                    >
                      {showNewPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Confirm new password"
                  />
                </div>

                {updateError && (
                  <div className="flex items-center gap-2 rounded-lg bg-red-50 p-2 text-red-700">
                    <AlertCircle className="h-4 w-4" />
                    <p className="text-xs">{updateError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isUpdating}
                  className="w-full rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
                >
                  {isUpdating ? (
                    <div className="flex items-center justify-center gap-2">
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Updating...
                    </div>
                  ) : (
                    "Update Password"
                  )}
                </button>
              </form>
            </div>

            {/* Two-Factor Authentication */}
            <div className="mb-6 rounded-lg border border-slate-200 p-4">
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-5 w-5 text-blue-600" />
                  <h3 className="font-semibold text-slate-900">Two-Factor Authentication (2FA)</h3>
                </div>
                <button
                  onClick={handleTwoFactorToggle}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                    twoFactorEnabled ? "bg-blue-600" : "bg-slate-200"
                  }`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                      twoFactorEnabled ? "translate-x-6" : "translate-x-1"
                    }`}
                  />
                </button>
              </div>
              <p className="text-sm text-slate-600">
                Add an extra layer of security to your account by requiring a verification code from your mobile device.
              </p>
              {twoFactorEnabled && (
                <div className="mt-3 rounded-lg bg-green-50 p-3">
                  <p className="text-sm text-green-800">
                    <strong>2FA is enabled</strong> - Your account is protected with two-factor authentication.
                  </p>
                </div>
              )}
            </div>

            {/* Session Management */}
            <div className="rounded-lg border border-slate-200 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Key className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Active Sessions</h3>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between rounded-lg bg-slate-50 p-3">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Current Session</p>
                    <p className="text-xs text-slate-500">Chrome on Windows • New Delhi, India</p>
                  </div>
                  <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">Active Now</span>
                </div>
                <button className="w-full rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100">
                  Log out all other devices
                </button>
              </div>
            </div>

            {/* Security Tips */}
            <div className="mt-6 rounded-lg bg-blue-50 p-4">
              <div className="flex items-start gap-2">
                <Fingerprint className="h-5 w-5 text-blue-600 mt-0.5" />
                <div>
                  <p className="text-sm font-semibold text-blue-900">Security Tips</p>
                  <ul className="mt-2 space-y-1 text-xs text-blue-800">
                    <li>• Use a strong, unique password for your account</li>
                    <li>• Enable two-factor authentication for added security</li>
                    <li>• Never share your password or verification codes</li>
                    <li>• Regularly review your active sessions</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}