import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";
import {
  FiUser,
  FiBell,
  FiShield,
  FiGlobe,
  FiMoon,
  FiSave,
  FiCheck,
  FiLock,
  FiMail,
  FiSettings,
  FiAlertCircle,
  FiEye,
  FiEyeOff,
  FiKey,
} from "react-icons/fi";

export default function SettingsPage() {
  const [form, setForm] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    notifications: true,
    emailNotifications: true,
    pushNotifications: false,
    marketingEmails: false,
    twoFactorAuth: false,
    language: "English",
    theme: "Light",
    timezone: "UTC-5 (Eastern)",
    currency: "USD",
  });

  const [activeSection, setActiveSection] = useState("account");
  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
    setErrors((e) => ({ ...e, [name]: "" }));
    setSaved(false);
  };

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!form.fullName.trim()) newErrors.fullName = "Full Name is required.";
    if (!form.email.includes("@")) newErrors.email = "Valid email required.";
    return newErrors;
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length === 0) {
      setSaved(true);
      setErrors({});
      setTimeout(() => setSaved(false), 3000);
    } else {
      setErrors(formErrors);
      setSaved(false);
    }
  };

  const sections = [
    { id: "account", label: "Account", icon: FiUser },
    { id: "notifications", label: "Notifications", icon: FiBell },
    { id: "security", label: "Security", icon: FiShield },
    { id: "preferences", label: "Preferences", icon: FiSettings },
  ];

  const renderSection = () => {
    switch (activeSection) {
      case "account":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-green-100 rounded-lg">
                <FiUser className="text-green-600" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Account Information
                </h2>
                <p className="text-sm text-gray-600">
                  Manage your personal details and contact information
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="fullName"
                >
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-xl border px-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                    errors.fullName
                      ? "border-red-300 focus:ring-red-500 bg-red-50"
                      : "border-gray-200 focus:ring-green-500 focus:border-green-500"
                  }`}
                  placeholder="Enter your full name"
                />
                {errors.fullName && (
                  <div className="flex items-center gap-2 mt-2">
                    <FiAlertCircle className="text-red-500" size={16} />
                    <p className="text-red-600 text-sm">{errors.fullName}</p>
                  </div>
                )}
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <div className="relative">
                  <FiMail
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={18}
                  />
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    className={`w-full rounded-xl border pl-10 pr-4 py-3 focus:outline-none focus:ring-2 transition-all ${
                      errors.email
                        ? "border-red-300 focus:ring-red-500 bg-red-50"
                        : "border-gray-200 focus:ring-green-500 focus:border-green-500"
                    }`}
                    placeholder="Enter your email"
                  />
                </div>
                {errors.email && (
                  <div className="flex items-center gap-2 mt-2">
                    <FiAlertCircle className="text-red-500" size={16} />
                    <p className="text-red-600 text-sm">{errors.email}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case "notifications":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-emerald-100 rounded-lg">
                <FiBell className="text-emerald-600" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Notification Preferences
                </h2>
                <p className="text-sm text-gray-600">
                  Choose how you want to be notified about updates and
                  activities
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <FiMail className="text-gray-500 mt-1" size={18} />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Email Notifications
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive notifications via email
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="emailNotifications"
                      checked={form.emailNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <FiBell className="text-gray-500 mt-1" size={18} />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Push Notifications
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive push notifications in your browser
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="pushNotifications"
                      checked={form.pushNotifications}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <FiMail className="text-gray-500 mt-1" size={18} />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Marketing Emails
                      </h3>
                      <p className="text-sm text-gray-600">
                        Receive updates about new features and tips
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="marketingEmails"
                      checked={form.marketingEmails}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case "security":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-red-100 rounded-lg">
                <FiShield className="text-red-600" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Security Settings
                </h2>
                <p className="text-sm text-gray-600">
                  Protect your account with advanced security features
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-start gap-3">
                    <FiShield className="text-gray-500 mt-1" size={18} />
                    <div>
                      <h3 className="font-medium text-gray-900">
                        Two-Factor Authentication
                      </h3>
                      <p className="text-sm text-gray-600">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      name="twoFactorAuth"
                      checked={form.twoFactorAuth}
                      onChange={handleChange}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
                {form.twoFactorAuth && (
                  <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
                    <p className="text-sm text-green-800">
                      Two-factor authentication is enabled. You'll receive a
                      verification code via SMS or authenticator app when
                      signing in.
                    </p>
                  </div>
                )}
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-start gap-3">
                    <FiKey className="text-gray-500 mt-1" size={18} />
                    <div>
                      <h3 className="font-medium text-gray-900">Password</h3>
                      <p className="text-sm text-gray-600">
                        Change your account password
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="flex items-center gap-2 bg-white hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg font-medium transition-colors"
                    onClick={() => alert("Change Password flow triggered")}
                  >
                    <FiLock size={16} />
                    Change Password
                  </button>
                </div>
              </div>
            </div>
          </div>
        );

      case "preferences":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <FiSettings className="text-purple-600" size={20} />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  Application Preferences
                </h2>
                <p className="text-sm text-gray-600">
                  Customize your experience with language, theme, and regional
                  settings
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="language"
                >
                  <FiGlobe className="inline mr-2" size={16} />
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="English">English</option>
                  <option value="French">Français</option>
                  <option value="Spanish">Español</option>
                  <option value="German">Deutsch</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="theme"
                >
                  <FiMoon className="inline mr-2" size={16} />
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={form.theme}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="Light">Light Mode</option>
                  <option value="Dark" disabled>
                    Dark Mode (Coming Soon)
                  </option>
                  <option value="Auto" disabled>
                    Auto (System)
                  </option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="timezone"
                >
                  Timezone
                </label>
                <select
                  id="timezone"
                  name="timezone"
                  value={form.timezone}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="UTC-5 (Eastern)">UTC-5 (Eastern)</option>
                  <option value="UTC-6 (Central)">UTC-6 (Central)</option>
                  <option value="UTC-7 (Mountain)">UTC-7 (Mountain)</option>
                  <option value="UTC-8 (Pacific)">UTC-8 (Pacific)</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-semibold text-gray-700 mb-2"
                  htmlFor="currency"
                >
                  Currency
                </label>
                <select
                  id="currency"
                  name="currency"
                  value={form.currency}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="CAD">CAD (C$)</option>
                </select>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <Sidebar />

      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-3">Settings</h1>
          <p className="text-lg text-gray-600">
            Manage your account preferences, security settings, and application
            configuration.
          </p>
        </div>

        <div className="flex gap-8">
          {/* Navigation Sidebar */}
          <div className="w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Settings Menu
              </h2>
              <nav className="space-y-2">
                {sections.map((section) => {
                  const Icon = section.icon;
                  return (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 ${
                        activeSection === section.id
                          ? "bg-green-50 text-green-700 border border-green-200"
                          : "hover:bg-gray-50 text-gray-700 hover:text-gray-900"
                      }`}
                    >
                      <Icon size={18} />
                      <span className="font-medium">{section.label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <form
              onSubmit={onSubmit}
              className="bg-white rounded-2xl border border-gray-200 p-8"
            >
              {renderSection()}

              {/* Save Button */}
              <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-between">
                {saved && (
                  <div className="flex items-center gap-2 text-emerald-600">
                    <FiCheck size={18} />
                    <span className="font-medium">
                      Settings saved successfully!
                    </span>
                  </div>
                )}
                <div className="flex gap-3 ml-auto">
                  <button
                    type="button"
                    className="px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 font-medium transition-colors"
                    onClick={() => {
                      setForm({
                        fullName: "John Doe",
                        email: "john@example.com",
                        notifications: true,
                        emailNotifications: true,
                        pushNotifications: false,
                        marketingEmails: false,
                        twoFactorAuth: false,
                        language: "English",
                        theme: "Light",
                        timezone: "UTC-5 (Eastern)",
                        currency: "USD",
                      });
                      setErrors({});
                    }}
                  >
                    Reset
                  </button>
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                  >
                    <FiSave size={18} />
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
