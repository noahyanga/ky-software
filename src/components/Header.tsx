import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiBell, FiMoreHorizontal } from "react-icons/fi";

const notifications = [
  { id: 1, text: "New bank statement uploaded", time: "5 min ago" },
  { id: 2, text: "Payment due in 3 days", time: "1 hour ago" },
  { id: 3, text: "DSO exceeded target", time: "Yesterday" },
  { id: 4, text: "Your report is ready", time: "2 days ago" },
];

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const bellRef = useRef<HTMLDivElement>(null);

  // Close dropdown if clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (bellRef.current && !bellRef.current.contains(event.target as Node)) {
        setMenuOpen(false);
      }
    }
    if (menuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  return (
    <header className="w-full bg-white shadow-md sticky top-0">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
        {/* Logo or Branding */}
        <div className="hidden md:block font-bold text-xl text-slate-800">
          KY Software
        </div>

        {/* Search bar */}
        <div className="flex-1 max-w-lg mx-6">
          <div className="relative text-gray-500 focus-within:text-emerald-600">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search items…"
              className="block w-full border border-gray-300 rounded-full pl-10 pr-4 py-2 text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            />
          </div>
        </div>

        {/* Notifications and View Selector */}
        <div className="flex items-center space-x-6">
          <div className="relative" ref={bellRef}>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-haspopup="true"
              aria-expanded={menuOpen}
              aria-label="Toggle notifications"
              className="relative p-2 rounded-full hover:bg-gray-100 transition text-gray-600 focus:outline-none focus:ring-2 focus:ring-emerald-500"
            >
              <FiBell className="text-xl" />
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white rounded-full h-5 w-5 flex items-center justify-center text-xs font-semibold shadow">
                {notifications.length}
              </span>
            </button>

            {menuOpen && (
              <div
                className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="notification-menu"
              >
                <div className="font-semibold bg-emerald-600 text-white px-4 py-2 text-center">
                  Notifications
                </div>
                <ul className="divide-y divide-gray-200 max-h-64 overflow-y-auto text-gray-700 text-sm">
                  {notifications.map(({ id, text, time }) => (
                    <li
                      key={id}
                      className="px-4 py-3 hover:bg-gray-50 cursor-pointer"
                      role="menuitem"
                    >
                      <p>{text}</p>
                      <span className="text-xs text-gray-400">{time}</span>
                    </li>
                  ))}
                  {notifications.length === 0 && (
                    <li className="px-4 py-3 text-center text-gray-400">
                      No new notifications.
                    </li>
                  )}
                </ul>
                <div className="border-t border-gray-100 text-center">
                  <button
                    onClick={() => setMenuOpen(false)}
                    className="w-full px-4 py-2 text-emerald-600 hover:bg-emerald-50 font-semibold transition"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex items-center space-x-2 text-gray-600">
            <span className="hidden sm:block font-semibold">View:</span>
            <select
              className="rounded-full border border-gray-300 text-sm py-1 px-3 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
              defaultValue="month"
              aria-label="Select view option"
            >
              <option value="month">Month</option>
              <option value="week">Week</option>
              <option value="day">Day</option>
            </select>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;

