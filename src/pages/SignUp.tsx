import React, { useState } from "react";
import { FiMail, FiLock, FiUser, FiEye, FiEyeOff } from "react-icons/fi";
import { FaGoogle, FaFacebook, FaApple } from "react-icons/fa";

export default function SignupPage() {
  const [formData, setFormData] = useState({ email: "", password: "", name: "" });
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Replace with actual submit functionality
    alert("Sign-up submitted: " + JSON.stringify(formData));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-200 to-emerald-300 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center">
            <span className="text-white font-bold text-2xl">KY</span>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create your account</h1>
          <p className="text-gray-600">Sign up to start optimizing your cash flow</p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
              <div className="relative">
                <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Your full name"
                  required
                />
              </div>
            </div>
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
              <div className="relative">
                <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Your email"
                  required
                />
              </div>
            </div>
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Password</label>
              <div className="relative">
                <FiLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                  placeholder="Choose a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <FiEyeOff /> : <FiEye />}
                </button>
              </div>
            </div>
            {/* Terms & Privacy */}
            <div className="text-sm text-gray-600 flex items-center">
              <input type="checkbox" required className="mr-2 accent-emerald-600 rounded" />
              I agree to the <a href="#" className="text-emerald-600 hover:text-blue-700 font-medium ml-1">Terms & Privacy Policy</a>
            </div>
            {/* Sign Up Button */}
            <button
              type="submit"
              className="w-full bg-emerald-500 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-blue-800 transition-all transform hover:translate-y-[-1px] shadow-lg"
            >
              Sign Up
            </button>
            {/* Divider */}
            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>
            {/* Social Signup */}
            <div className="grid grid-cols-3 gap-3">
              <button type="button" className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FaGoogle className="text-red-500 text-xl" />
              </button>
              <button type="button" className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FaFacebook className="text-blue-600 text-xl" />
              </button>
              <button type="button" className="flex items-center justify-center py-3 px-4 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                <FaApple className="text-gray-900 text-xl" />
              </button>
            </div>
          </form>
          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <a href="/login" className="text-emerald-600 hover:text-blue-700 font-medium">
                Sign In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

