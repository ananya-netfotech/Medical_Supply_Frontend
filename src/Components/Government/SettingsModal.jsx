import { useState } from "react";
import { X, Settings, Bell, Moon, Globe, Mail, MessageCircle, Database, Download, Trash2, Save, Clock, Languages } from "lucide-react";

export default function SettingsModal({ isOpen, onClose, user, onUpdate }) {
  const [settings, setSettings] = useState({
    emailNotifications: true,
    pushNotifications: true,
    desktopNotifications: false,
    darkMode: false,
    language: "english",
    dateFormat: "DD/MM/YYYY",
    timezone: "IST",
    autoSave: true,
    compactView: false,
    emailDigest: "daily"
  });
  
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  if (!isOpen) return null;

  const handleToggle = (key) => {
    setSettings(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSaving(false);
      setSaveSuccess(true);
      
      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 1500);
  };

  const handleClearData = () => {
    if (confirm("Are you sure you want to clear all cached data? This action cannot be undone.")) {
      // Simulate clearing data
      alert("Cache cleared successfully!");
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" onClick={onClose} />

        <div className="relative w-full max-w-3xl rounded-2xl bg-white shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 p-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                <Settings className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-slate-900">Settings</h2>
                <p className="text-sm text-slate-500">Customize your experience</p>
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
          <div className="max-h-[70vh] overflow-y-auto p-6">
            {/* Success Message */}
            {saveSuccess && (
              <div className="mb-4 flex items-center gap-2 rounded-lg bg-green-50 p-3 text-green-700 border border-green-200">
                <Save className="h-4 w-4" />
                <p className="text-sm font-medium">Settings saved successfully!</p>
              </div>
            )}

            {/* Notification Settings */}
            <div className="mb-6 rounded-lg border border-slate-200 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Notifications</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Email Notifications</p>
                    <p className="text-xs text-slate-500">Receive updates via email</p>
                  </div>
                  <button
                    onClick={() => handleToggle("emailNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      settings.emailNotifications ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.emailNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Push Notifications</p>
                    <p className="text-xs text-slate-500">Receive browser notifications</p>
                  </div>
                  <button
                    onClick={() => handleToggle("pushNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      settings.pushNotifications ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.pushNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Desktop Notifications</p>
                    <p className="text-xs text-slate-500">Show desktop alerts</p>
                  </div>
                  <button
                    onClick={() => handleToggle("desktopNotifications")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      settings.desktopNotifications ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.desktopNotifications ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Email Digest Frequency
                  </label>
                  <select
                    value={settings.emailDigest}
                    onChange={(e) => handleChange("emailDigest", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="instant">Instant</option>
                    <option value="daily">Daily Digest</option>
                    <option value="weekly">Weekly Digest</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="mb-6 rounded-lg border border-slate-200 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Moon className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Appearance</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Dark Mode</p>
                    <p className="text-xs text-slate-500">Switch between light and dark theme</p>
                  </div>
                  <button
                    onClick={() => handleToggle("darkMode")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      settings.darkMode ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.darkMode ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Compact View</p>
                    <p className="text-xs text-slate-500">Reduce spacing between elements</p>
                  </div>
                  <button
                    onClick={() => handleToggle("compactView")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      settings.compactView ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.compactView ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Language & Region */}
            <div className="mb-6 rounded-lg border border-slate-200 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Language & Region</h3>
              </div>
              
              <div className="space-y-3">
                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Language
                  </label>
                  <div className="relative">
                    <Languages className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                    <select
                      value={settings.language}
                      onChange={(e) => handleChange("language", e.target.value)}
                      className="w-full rounded-lg border border-slate-300 pl-10 pr-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                    >
                      <option value="english">English</option>
                      <option value="hindi">Hindi</option>
                      <option value="tamil">Tamil</option>
                      <option value="telugu">Telugu</option>
                      <option value="bengali">Bengali</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Date Format
                  </label>
                  <select
                    value={settings.dateFormat}
                    onChange={(e) => handleChange("dateFormat", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium text-slate-700">
                    Timezone
                  </label>
                  <select
                    value={settings.timezone}
                    onChange={(e) => handleChange("timezone", e.target.value)}
                    className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="IST">IST (UTC+5:30)</option>
                    <option value="EST">EST (UTC-5:00)</option>
                    <option value="PST">PST (UTC-8:00)</option>
                    <option value="GMT">GMT (UTC+0:00)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Data & Privacy */}
            <div className="mb-6 rounded-lg border border-slate-200 p-4">
              <div className="mb-4 flex items-center gap-2">
                <Database className="h-5 w-5 text-blue-600" />
                <h3 className="font-semibold text-slate-900">Data & Privacy</h3>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-slate-900">Auto-save</p>
                    <p className="text-xs text-slate-500">Automatically save your work</p>
                  </div>
                  <button
                    onClick={() => handleToggle("autoSave")}
                    className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                      settings.autoSave ? "bg-blue-600" : "bg-slate-200"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings.autoSave ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>

                <div className="flex gap-3">
                  <button className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-blue-200 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-700 transition hover:bg-blue-100">
                    <Download className="h-4 w-4" />
                    Export Data
                  </button>
                  <button 
                    onClick={handleClearData}
                    className="flex-1 flex items-center justify-center gap-2 rounded-lg border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 transition hover:bg-rose-100"
                  >
                    <Trash2 className="h-4 w-4" />
                    Clear Cache
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 p-6">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:opacity-50"
            >
              {isSaving ? (
                <>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Saving Settings...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4" />
                  Save All Settings
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}