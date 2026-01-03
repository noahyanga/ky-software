import React, { useState, useEffect } from "react";
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
  FiUser,
  FiLogOut,
  FiMenu,
  FiX,
} from "react-icons/fi";

const kyColors = {
  bluePrimary: "#3A81F1",
  blueLight: "#AACBFF",
  greenPrimary: "#2DC44F",
  greenLight: "#A3D9A5",
  grayLight: "#EAF2F5",
  grayDarkText: "#224B21",
  grayMidText: "#475569",
  borderLight: "#B0CAAE",
};

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: FiHome, path: "/" },
  {
    id: "forecasting",
    label: "Forecasting",
    icon: FiTrendingUp,
    path: "/forecasting",
  },
  { id: "financials", label: "Financials", icon: FiTruck, path: "/financials" },
  { id: "reports", label: "Reports", icon: FiFolder, path: "/reports" },
  { id: "analytics", label: "Analytics", icon: FiFileText, path: "/analytics" },
  { id: "users", label: "User Management", icon: FiUsers, path: "/users" },
  { id: "support", label: "Support", icon: FiLifeBuoy, path: "/support" },
  { id: "settings", label: "Settings", icon: FiSettings, path: "/settings" },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Handle escape key to close mobile sidebar
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const toggleMobileSidebar = () => {
    setMobileOpen(!mobileOpen);
  };

  const sidebarContent = (
    <>
      {/* Header Section */}
      <div className="p-6 border-b border-slate-700/50">
        {/* Logo */}
        <div
          className={`flex items-center gap-3 transition-all duration-300 ${
            collapsed ? "justify-center" : "justify-start"
          }`}
        >
          <div className="relative">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">K</span>
            </div>
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-800"></div>
          </div>
          <div
            className={`transition-all duration-300 overflow-hidden ${
              collapsed ? "w-0 opacity-0" : "w-auto opacity-100"
            }`}
          >
            <h2 className="text-white font-bold text-xl">KY Software</h2>
            <p className="text-slate-400 text-xs">Financial Dashboard</p>
          </div>
        </div>
      </div>
      
      {/* Navigation */}
      <nav className="flex-1 px-4 pb-4">
        <div className="space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const IconComponent = item.icon;

            return (
              <div key={item.id} className="relative">
                <button
                  disabled={!item.path}
                  onClick={() => item.path && navigate(item.path)}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative overflow-hidden
                    ${
                      isActive
                        ? "bg-green-600 text-white transform scale-[1.02]"
                        : "text-slate-400 hover:text-white hover:bg-slate-700/50"
                    }
                    ${hoveredItem === item.id ? "transform translate-x-1" : ""}
                  `}
                >
                  {/* Background animation */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-600/0 to-slate-600/0 group-hover:from-slate-600/20 group-hover:to-slate-600/5 transition-all duration-300 rounded-xl"></div>
                  )}

                  <div
                    className={`relative z-10 flex items-center gap-3 w-full ${
                      collapsed ? "justify-center" : "justify-start"
                    }`}
                  >
                    <div
                      className={`
                      flex items-center justify-center transition-all duration-300
                      ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-white"
                      }
                      ${hoveredItem === item.id ? "transform scale-110" : ""}
                    `}
                    >
                      <IconComponent size={20} />
                    </div>

                    <span
                      className={`
                      font-medium transition-all duration-300 overflow-hidden whitespace-nowrap
                      ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
                      ${
                        isActive
                          ? "text-white"
                          : "text-slate-400 group-hover:text-white"
                      }
                    `}
                    >
                      {item.label}
                    </span>
                  </div>
                </button>

                {/* Tooltip for collapsed state */}
                {collapsed && (
                  <div
                    className={`
                    absolute left-full ml-2 top-1/2 transform -translate-y-1/2
                    bg-slate-900 text-white px-3 py-2 rounded-lg text-sm
                    transition-all duration-200 pointer-events-none whitespace-nowrap z-50
                    ${
                      hoveredItem === item.id
                        ? "opacity-100 translate-x-0"
                        : "opacity-0 -translate-x-2"
                    }
                  `}
                  >
                    {item.label}
                    <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-2 h-2 bg-slate-900 rotate-45"></div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700/50">
        <button
          className="w-full flex items-center gap-3 px-4 py-3 text-slate-400 hover:text-white hover:bg-slate-700/50 rounded-xl transition-all duration-200 group"
          onClick={() => {
            /* Handle logout */
          }}
        >
          <FiLogOut className="text-lg group-hover:transform group-hover:scale-110 transition-transform duration-200" />
          <span
            className={`
            font-medium transition-all duration-300 overflow-hidden whitespace-nowrap
            ${collapsed ? "w-0 opacity-0" : "w-auto opacity-100"}
          `}
          >
            Sign out
          </span>
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileSidebar}
        className="fixed top-4 left-4 z-50 lg:hidden bg-white p-2 rounded-lg shadow-lg border hover:bg-gray-50 transition-colors duration-200"
        aria-label="Toggle mobile menu"
      >
        {mobileOpen ? <FiX size={20} /> : <FiMenu size={20} />}
      </button>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity duration-300"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Desktop sidebar */}
      <aside
        className={`
          hidden lg:flex fixed left-0 top-0 z-40 h-screen bg-slate-800 shadow-2xl flex-col
          transition-all duration-500 ease-in-out
          ${collapsed ? "w-20" : "w-72"}
        `}
      >
        {/* Collapse toggle button */}
        <button
          onClick={toggleSidebar}
          className={`
            absolute -right-3 top-8 z-50 bg-white text-slate-600 hover:text-slate-800
            rounded-full shadow-lg border border-slate-200 hover:border-slate-300
            w-8 h-8 flex items-center justify-center
            transition-all duration-300 hover:shadow-xl hover:scale-110
            ${collapsed ? "rotate-180" : "rotate-0"}
          `}
          aria-label="Toggle sidebar"
        >
          <FiChevronLeft
            size={16}
            className="transition-transform duration-300"
          />
        </button>

        {sidebarContent}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`
          lg:hidden fixed left-0 top-0 z-40 h-screen bg-slate-800 shadow-2xl flex flex-col w-72
          transition-transform duration-300 ease-in-out
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
      >
        {sidebarContent}
      </aside>

      {/* Spacer for desktop content */}
      <div
        className={`hidden lg:block transition-all duration-500 ${
          collapsed ? "w-20" : "w-72"
        }`}
      ></div>
    </>
  );
};

export default Sidebar;
