import React, { useState, useEffect, useRef } from "react";
import {
  FiSearch,
  FiBell,
  FiSettings,
  FiUser,
  FiChevronDown,
  FiCalendar,
  FiFilter,
  FiRefreshCw,
  FiX,
} from "react-icons/fi";

const notifications = [
  {
    id: 1,
    text: "New bank statement uploaded",
    time: "5 min ago",
    type: "info",
    unread: true,
  },
  {
    id: 2,
    text: "Payment due in 3 days",
    time: "1 hour ago",
    type: "warning",
    unread: true,
  },
  {
    id: 3,
    text: "DSO exceeded target",
    time: "Yesterday",
    type: "alert",
    unread: true,
  },
  {
    id: 4,
    text: "Your report is ready",
    time: "2 days ago",
    type: "success",
    unread: true,
  },
];

const Header: React.FC = () => {
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [searchFocused, setSearchFocused] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const notificationRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  // Close dropdowns if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target as Node)
      ) {
        setNotificationOpen(false);
      }
      if (
        profileRef.current &&
        !profileRef.current.contains(event.target as Node)
      ) {
        setProfileOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "warning":
        return "⚠️";
      case "alert":
        return "🚨";
      case "success":
        return "✅";
      default:
        return "💼";
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case "warning":
        return "border-l-yellow-500 bg-yellow-50";
      case "alert":
        return "border-l-red-500 bg-red-50";
      case "success":
        return "border-l-emerald-500 bg-emerald-50";
      default:
        return "border-l-blue-500 bg-blue-50";
    }
  };

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-200 backdrop-blur-md bg-white/95 supports-[backdrop-filter]:bg-white/75">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 px-6">
          {/* Logo Section */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">K</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="hidden md:block">
                <h1 className="font-bold text-xl text-gray-900">KY Software</h1>
                <p className="text-xs text-gray-500 -mt-1">
                  Financial Dashboard
                </p>
              </div>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex-1 max-w-2xl mx-8">
            <div
              className={`relative transition-all duration-300 ${
                searchFocused ? "scale-105" : ""
              }`}
            >
              <div
                className={`relative flex items-center ${
                  searchFocused
                    ? "ring-2 ring-blue-500 ring-opacity-20 shadow-lg"
                    : "shadow-sm"
                } rounded-2xl bg-gray-50 hover:bg-white border border-gray-200 hover:border-gray-300 transition-all duration-200`}
              >
                <FiSearch
                  className={`absolute left-4 transition-colors duration-200 ${
                    searchFocused ? "text-blue-600" : "text-gray-400"
                  }`}
                  size={20}
                />

                <input
                  type="search"
                  placeholder="Search transactions, reports, clients..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => setSearchFocused(false)}
                  className="w-full bg-transparent border-none outline-none pl-12 pr-4 py-3 text-gray-900 placeholder-gray-500 text-sm"
                />

                {searchValue && (
                  <button
                    onClick={() => setSearchValue("")}
                    className="absolute right-4 p-1 rounded-full hover:bg-gray-200 transition-colors"
                  >
                    <FiX size={16} className="text-gray-400" />
                  </button>
                )}
              </div>

              {/* Search suggestions dropdown (optional enhancement) */}
              {searchFocused && searchValue && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden z-50">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                      Quick Results
                    </p>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="p-2">
                      <div className="px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <p className="text-sm font-medium text-gray-900">
                          Client: Tech Startup Inc
                        </p>
                        <p className="text-xs text-gray-500">
                          Recent transactions
                        </p>
                      </div>
                      <div className="px-3 py-2 hover:bg-gray-50 rounded-lg cursor-pointer">
                        <p className="text-sm font-medium text-gray-900">
                          Report: Cash Flow Analysis
                        </p>
                        <p className="text-xs text-gray-500">
                          Generated Nov 28
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Actions Section */}
          <div className="flex items-center gap-2">
            {/* Quick Actions */}
            <div className="hidden lg:flex items-center gap-1 mr-4">
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                <FiRefreshCw size={18} />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                <FiFilter size={18} />
              </button>
              <button className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-gray-900 transition-colors">
                <FiCalendar size={18} />
              </button>
            </div>

            {/* Notifications */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setNotificationOpen(!notificationOpen)}
                className={`relative p-2 rounded-xl transition-all duration-200 ${
                  notificationOpen
                    ? "bg-blue-100 text-blue-700"
                    : "hover:bg-gray-100 text-gray-600 hover:text-gray-900"
                }`}
              >
                <FiBell size={20} />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs font-bold rounded-full flex items-center justify-center animate-pulse">
                    {unreadCount}
                  </span>
                )}
              </button>

              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden z-50">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-white">
                        Notifications
                      </h3>
                      <span className="bg-white/20 text-white text-xs px-2 py-1 rounded-full">
                        {unreadCount} new
                      </span>
                    </div>
                  </div>

                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`relative p-4 border-l-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          notification.unread ? "bg-blue-50/50" : ""
                        } ${getNotificationColor(notification.type)}`}
                      >
                        <div className="flex items-start gap-3">
                          <span className="text-lg mt-0.5">
                            {getNotificationIcon(notification.type)}
                          </span>
                          <div className="flex-1 min-w-0">
                            <p
                              className={`text-sm ${
                                notification.unread
                                  ? "font-semibold text-gray-900"
                                  : "text-gray-700"
                              }`}
                            >
                              {notification.text}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                          {notification.unread && (
                            <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-gray-200 p-3">
                    <button
                      onClick={() => setNotificationOpen(false)}
                      className="w-full py-2 text-blue-600 hover:bg-blue-50 font-semibold text-sm rounded-lg transition-colors"
                    >
                      Mark all as read
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Profile Dropdown */}
            <div className="relative" ref={profileRef}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                className={`flex items-center gap-3 px-3 py-2 rounded-xl transition-all duration-200 ${
                  profileOpen ? "bg-gray-100" : "hover:bg-gray-100"
                }`}
              >
                <div className="relative">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center shadow-sm">
                    <FiUser className="text-white" size={16} />
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full border-2 border-white"></div>
                </div>

                <div className="hidden md:block text-left">
                  <p className="text-sm font-semibold text-gray-900">
                    John Doe
                  </p>
                  <p className="text-xs text-gray-500">Admin</p>
                </div>

                <FiChevronDown
                  className={`text-gray-400 transition-transform duration-200 ${
                    profileOpen ? "rotate-180" : ""
                  }`}
                  size={16}
                />
              </button>

              {profileOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden z-50">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-lg flex items-center justify-center">
                        <FiUser className="text-white" size={18} />
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">John Doe</p>
                        <p className="text-sm text-gray-500">
                          john@company.com
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="py-2">
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors">
                      <FiUser size={16} />
                      <span className="text-sm">Profile Settings</span>
                    </button>
                    <button className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-3 text-gray-700 hover:text-gray-900 transition-colors">
                      <FiSettings size={16} />
                      <span className="text-sm">Preferences</span>
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="w-full px-4 py-2 text-left hover:bg-red-50 flex items-center gap-3 text-red-600 hover:text-red-700 transition-colors">
                      <span className="text-sm">Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
