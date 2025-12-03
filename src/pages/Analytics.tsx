import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  FiUsers,
  FiFileText,
  FiTrendingUp,
  FiCheckCircle,
  FiBarChart2,
  FiActivity
} from "react-icons/fi";

const AnalyticsPage: React.FC = () => {
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [categoryFilter, setCategoryFilter] = useState("All");

  // KPI Data
  const kpis = [
    { title: "Clients Managed", value: "247", change: "+12%", icon: FiUsers, color: "emerald" },
    { title: "Reports Generated", value: "1,284", change: "+8%", icon: FiFileText, color: "blue" },
    { title: "Opportunities Identified", value: "156", change: "+23%", icon: FiTrendingUp, color: "purple" },
    { title: "Recommendation Success Rate", value: "87%", change: "+4%", icon: FiCheckCircle, color: "green" },
  ];

  // Opportunities by Priority
  const priorityData = [
    { label: "High", value: 45, color: "#ef4444" },
    { label: "Medium", value: 78, color: "#f59e0b" },
    { label: "Low", value: 33, color: "#10b981" },
  ];

  // Opportunities by Category
  const categoryData = [
    { label: "Cash Flow", value: 52, color: "#3b82f6" },
    { label: "DSO Reduction", value: 41, color: "#8b5cf6" },
    { label: "Payment Optimization", value: 38, color: "#06b6d4" },
    { label: "Liquidity", value: 25, color: "#10b981" },
  ];

  const maxPriorityValue = Math.max(...priorityData.map(d => d.value));
  const maxCategoryValue = Math.max(...categoryData.map(d => d.value));

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <Sidebar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
              Analytics Dashboard
            </h1>
            <p className="text-gray-600 mx-auto ">
              Comprehensive insights into your client portfolio performance, opportunities, and recommendation success.
            </p>
          </div>
        </div>



        {/* KPI Cards - Compact row */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            const bgColor = kpi.color === "emerald" ? "bg-emerald-500" :
              kpi.color === "blue" ? "bg-blue-500" :
                kpi.color === "purple" ? "bg-purple-500" : "bg-emerald-500";
            const textColor = kpi.color === "emerald" ? "from-emerald-500 to-emerald-600" :
              kpi.color === "blue" ? "from-blue-500 to-blue-600" :
                kpi.color === "purple" ? "from-purple-500 to-purple-600" : "from-emerald-500 to-emerald-600";

            return (
              <div key={index} className="group bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl border border-white/50 p-8 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 hover:bg-white">
                <div className="flex items-start justify-between mb-6">
                  <div className={`p-4 rounded-2xl ${bgColor} shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${kpi.change.startsWith('+') ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'}`}>
                    {kpi.change}
                  </span>
                </div>
                <div>
                  <p className="text-4xl font-black text-gray-900 mb-2">{kpi.value}</p>
                  <p className="text-lg text-gray-600 font-semibold">{kpi.title}</p>
                </div>
              </div>
            );
          })}
        </section>

        {/* Full-width Charts Section */}
        <section className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-20">
          {/* Opportunities by Priority - Larger */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-10 col-span-1 xl:col-span-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FiTrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Opportunities by Priority</h2>
                  <p className="text-sm text-gray-500">Total: 156 opportunities</p>
                </div>
              </div>
              <select
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>All</option>
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>

            <div className="relative h-96 bg-gradient-to-b from-gray-50 to-slate-100 rounded-2xl overflow-hidden p-8">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-4 gap-px opacity-20">
                {Array.from({ length: 5 }).map((_, i) => (
                  <div key={i} className="bg-gray-200" />
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between items-end pr-4 pt-12 pb-12 text-sm text-gray-500 font-mono">
                <span>{maxPriorityValue}</span>
                <span>{(maxPriorityValue * 0.75).toFixed(0)}</span>
                <span>{(maxPriorityValue * 0.5).toFixed(0)}</span>
                <span>{(maxPriorityValue * 0.25).toFixed(0)}</span>
                <span>0</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-12 left-20 right-8 flex justify-between text-sm text-gray-700 font-semibold">
                {priorityData.map(d => (
                  <span key={d.label} className="flex flex-col items-center">
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="mt-1 text-xs">{d.label}</span>
                  </span>
                ))}
              </div>

              {/* Large Bar chart SVG */}
              <svg viewBox="0 0 500 300" className="absolute left-20 top-12 w-[calc(100%-6rem)] h-[80%]">
                {priorityData.map((data, index) => {
                  const barWidth = 60;
                  const barHeight = (data.value / maxPriorityValue) * 220;
                  const x = index * 110;

                  return (
                    <g key={data.label}>
                      <rect
                        x={x}
                        y={280 - barHeight}
                        width={barWidth}
                        height={barHeight}
                        rx="8"
                        fill={data.color}
                        className="group-hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 origin-bottom"
                      />
                      <text
                        x={x + barWidth / 2}
                        y={280 - barHeight - 8}
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="800"
                        fill="#111827"
                        className="drop-shadow-sm"
                      >
                        {data.value}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Opportunities by Category - Larger */}
          <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-10 col-span-1 xl:col-span-1">
            <div className="flex items-center justify-between mb-8">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shadow-lg">
                  <FiBarChart2 className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Opportunities by Category</h2>
                  <p className="text-sm text-gray-500">Breakdown by opportunity type</p>
                </div>
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="rounded-xl border border-gray-300 px-4 py-2 text-sm font-semibold bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
              >
                <option>All</option>
                <option>Cash Flow</option>
                <option>DSO Reduction</option>
                <option>Payment Optimization</option>
                <option>Liquidity</option>
              </select>
            </div>

            <div className="relative h-96 bg-gradient-to-b from-gray-50 to-slate-100 rounded-2xl overflow-hidden p-8">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-5 gap-px opacity-20">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div key={i} className="bg-gray-200" />
                ))}
              </div>

              {/* Y-axis labels */}
              <div className="absolute left-0 top-0 bottom-0 w-16 flex flex-col justify-between items-end pr-4 pt-12 pb-12 text-sm text-gray-500 font-mono">
                <span>{maxCategoryValue}</span>
                <span>{(maxCategoryValue * 0.75).toFixed(0)}</span>
                <span>{(maxCategoryValue * 0.5).toFixed(0)}</span>
                <span>{(maxCategoryValue * 0.25).toFixed(0)}</span>
                <span>0</span>
              </div>

              {/* X-axis labels */}
              <div className="absolute bottom-12 left-20 right-8 flex justify-between text-sm text-gray-700 font-semibold">
                {categoryData.map(d => (
                  <span key={d.label} className="flex flex-col items-center w-20">
                    <span className="w-4 h-4 rounded-lg mb-1" style={{ backgroundColor: d.color }} />
                    <span className="text-xs text-center truncate">{d.label}</span>
                  </span>
                ))}
              </div>

              {/* Large Bar chart SVG */}
              <svg viewBox="0 0 600 300" className="absolute left-20 top-12 w-[calc(100%-6rem)] h-[80%]">
                {categoryData.map((data, index) => {
                  const barWidth = 45;
                  const barHeight = (data.value / maxCategoryValue) * 220;
                  const x = index * 105;

                  return (
                    <g key={data.label}>
                      <rect
                        x={x}
                        y={280 - barHeight}
                        width={barWidth}
                        height={barHeight}
                        rx="8"
                        fill={data.color}
                        className="group-hover:opacity-90 transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 origin-bottom"
                      />
                      <text
                        x={x + barWidth / 2}
                        y={280 - barHeight - 8}
                        textAnchor="middle"
                        fontSize="16"
                        fontWeight="800"
                        fill="#111827"
                        className="drop-shadow-sm"
                      >
                        {data.value}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default AnalyticsPage;

