import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  FiChevronLeft,
  FiChevronRight,
  FiHome,
  FiUsers,
  FiTrendingUp,
  FiTruck,
  FiFileText,
  FiSettings,
  FiFolder,
  FiLifeBuoy,
} from "react-icons/fi";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: <FiHome />, path: "/" },
  { id: "forecasting", label: "Forecasting", icon: <FiTrendingUp />, path: "/forecasting" },
  { id: "financials", label: "Financials", icon: <FiTruck />, path: "/financials" },
  { id: "reports", label: "Reports", icon: <FiFolder />, path: "/reports" },
  { id: "support", label: "Support", icon: <FiLifeBuoy />, path: "/support" },
  { id: "settings", label: "Settings", icon: <FiSettings />, path: "/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <aside
      className={`fixed left-0 top-0 z-20 h-screen bg-slate-800 shadow-xl flex flex-col transition-all duration-300
  ${collapsed ? "w-20" : "w-64"}`}
      style={{ minWidth: collapsed ? '5rem' : '16rem' }}
    >
      {/* Collapse Button - hidden on small screens */}
      <button
        aria-label="Toggle sidebar"
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-6 z-30 bg-white text-slate-800 rounded-full shadow border transition-transform duration-300 flex items-center justify-center w-7 h-7 hidden md:flex"
        style={{ border: "1px solid #cbd5e1" }}
      >
        <span className={`transition-transform duration-300 ${collapsed ? "rotate-180" : "rotate-0"}`}>
          <FiChevronLeft />
        </span>
      </button>

      {/* Profile Card */}
      <div
        className={`p-6 relative flex items-center gap-3 bg-slate-700 rounded-2xl mx-4 mt-6 shadow-sm transition-all duration-300 h-20
          ${collapsed ? "justify-center" : "justify-start"}`}
      >
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-500 to-green-700 border-2 border-gray-700 flex items-center justify-center" />
        {!collapsed && <div>
          <h4 className="text-base font-semibold text-white truncate">User Name</h4>
          <p className="text-xs text-gray-400 truncate">#ID 123456789</p>
        </div>}
      </div>

      {/* Navigation */}
      <nav className="py-6 flex-1 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <li key={item.id}>
                <button
                  disabled={!item.path}
                  onClick={() => item.path && navigate(item.path)}
                  className={`
                    w-full flex items-center gap-3 px-3.5 py-3 rounded-xl transition-all duration-150 whitespace-nowrap 
                    ${isActive
                      ? "bg-gradient-to-r from-green-600/80 to-green-500/60 text-white font-bold shadow-green-900/20 shadow-md"
                      : "hover:bg-gray-800 hover:text-white text-gray-400"
                    }
                  `}
                >
                  <span
                    className={`
                      text-[1.3rem] flex items-center justify-center
                      ${isActive ? "bg-green-700/25 p-2 rounded-lg" : ""}
                    `}
                  >
                    {item.icon}
                  </span>
                  <span
                    className={`
                      text-sm transition-all duration-200 overflow-hidden 
                      ${collapsed ? "opacity-0 w-0" : "opacity-100 w-auto ml-1"}
                    `}
                  >
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;

