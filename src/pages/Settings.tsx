import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { useState } from "react";

export default function SettingsPage() {
  const [form, setForm] = useState({
    fullName: "John Doe",
    email: "john@example.com",
    notifications: true,
    twoFactorAuth: false,
    language: "English",
    theme: "Light",
  });

  const [saved, setSaved] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type, checked } = e.target;
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
      // submit logic here
    } else {
      setErrors(formErrors);
      setSaved(false);
    }
  };

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <Sidebar />

      <div className="max-w-3xl mx-auto py-10 px-6">
        <header className="mb-10">
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
            Settings
          </h1>
          <p className="text-gray-600">
            Customize your preferences, update account settings, and configure notifications.
          </p>
        </header>

        <form onSubmit={onSubmit} className="space-y-10 bg-white rounded-2xl shadow-md p-8">
          {/* Account Information */}
          <section>
            <h2 className="font-bold text-lg mb-6">Account Information</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="fullName">
                  Full Name
                </label>
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  value={form.fullName}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${errors.fullName ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-emerald-500"
                    } transition`}
                  placeholder="John Doe"
                />
                {errors.fullName && (
                  <p className="mt-1 text-red-600 text-sm">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="email">
                  Email Address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${errors.email ? "border-red-500 focus:ring-red-600" : "border-gray-300 focus:ring-emerald-500"
                    } transition`}
                  placeholder="john@example.com"
                />
                {errors.email && (
                  <p className="mt-1 text-red-600 text-sm">{errors.email}</p>
                )}
              </div>
            </div>
          </section>

          {/* Notifications */}
          <section>
            <h2 className="font-bold text-lg mb-6">Notifications</h2>
            <label className="flex items-center gap-3">
              <input
                type="checkbox"
                name="notifications"
                checked={form.notifications}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 accent-emerald-600"
              />
              <span className="text-gray-700 font-medium">Email notifications</span>
            </label>
          </section>

          {/* Security Settings */}
          <section>
            <h2 className="font-bold text-lg mb-6">Security Settings</h2>
            <label className="flex items-center gap-3 mb-6">
              <input
                type="checkbox"
                name="twoFactorAuth"
                checked={form.twoFactorAuth}
                onChange={handleChange}
                className="w-5 h-5 rounded border-gray-300 accent-emerald-600"
              />
              <span className="text-gray-700 font-medium">Enable two-factor authentication (2FA)</span>
            </label>
            <button
              type="button"
              className="bg-white hover:bg-gray-50 border border-gray-300 px-4 py-2 rounded-lg shadow font-semibold transition"
              onClick={() => alert("Change Password flow triggered")}
            >
              Change Password
            </button>
          </section>

          {/* Preferences */}
          <section>
            <h2 className="font-bold text-lg mb-6">Preferences</h2>
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="language">
                  Language
                </label>
                <select
                  id="language"
                  name="language"
                  value={form.language}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                >
                  <option>English</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>

              <div>
                <label className="block text-gray-700 font-medium mb-1" htmlFor="theme">
                  Theme
                </label>
                <select
                  id="theme"
                  name="theme"
                  value={form.theme}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
                >
                  <option>Light</option>
                  <option>Dark (Coming Soon)</option>
                </select>
              </div>
            </div>
          </section>

          {/* Submit & Confirmation */}
          <div className="text-right">
            <button
              type="submit"
              className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold shadow transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

