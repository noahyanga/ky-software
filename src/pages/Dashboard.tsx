import { Link } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  FiArrowUpRight,
  FiArrowDownRight,
  FiTrendingUp,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiBarChart,
  FiTarget,
  FiRefreshCw,
  FiChevronRight,
  FiFilter,
  FiDownload,
} from "react-icons/fi";

const colors = {
  indigo: "bg-[#64748b]",
  indigoLight: "bg-[#cbd5e1]",
  green: "bg-[#3CB371]",
  red: "bg-[#A52A2A]",
  blue: "bg-[#4169E1]",
  yellowLight: "bg-[#fef3c7]",
  grayTextDark: "text-[#1e293b]",
  grayTextMedium: "text-[#475569]",
  grayBackground: "bg-[#f1f5f9]",
};

// Enhanced Hero Section with better visual hierarchy
function HeroStatCard() {
  const [timeframe, setTimeframe] = useState("quarter");

  return (
    <div className="max-w-7xl mx-auto mt-8 px-6">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-emerald-700 shadow-2xl">
        {/* Background pattern */}
          <div
            className="absolute inset-0"
            style={{
              backgroundImage: `url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')`,
            }}
          />

          

        <div className="relative z-10 flex flex-col lg:flex-row">
          <div className="flex-1 p-10 lg:p-12 text-white">
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg">
                  <FiDollarSign className="text-white" size={24} />
                </div>
                <span className="uppercase text-lg tracking-wider font-bold text-emerald-100">
                  Total Cash Managed
                </span>
              </div>

              <div className="text-6xl lg:text-7xl font-black mb-6 leading-none tracking-tight">
                $9.8M
              </div>

              <div className="text-xl text-emerald-100 max-w-lg mb-8 leading-relaxed">
                Projected net inflow for next quarter based on current trends and AI analysis.
              </div>

              <div className="flex items-center gap-3 mb-8">
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <FiTrendingUp size={16} />
                  <span className="text-sm font-semibold">+23.5% vs last quarter</span>
                </div>
                <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-lg">
                  <FiRefreshCw size={16} />
                  <span className="text-sm font-semibold">Updated 2 min ago</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/forecasting"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-emerald-600 font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:bg-gray-50 transition-all duration-300 hover:scale-105"
              >
                View Forecasting
                <FiArrowUpRight className="ml-2" size={20} />
              </Link>
              <Link
                to="/upload"
                className="inline-flex items-center justify-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-2xl shadow-lg hover:shadow-xl hover:bg-white/30 transition-all duration-300"
              >
                Upload New Data
              </Link>
            </div>
          </div>

          {/* Enhanced stats grid */}
          <div className="flex-1 p-8 lg:p-12 bg-white/10 backdrop-blur-sm">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 h-1">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FiTarget className="text-white" size={24} />
                  </div>
                  <FiArrowUpRight className="text-white/70 group-hover:text-white transition-colors" size={20} />
                </div>
                <div className="font-black text-xl text-white mb-1">DSO Optimized</div>
                <div className="text-emerald-100 font-semibold text-sm">Reduce by 7%</div>
                <div className="text-emerald-100 text-xs mt-1">Save $24K annually</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FiBarChart className="text-white" size={24} />
                  </div>
                  <FiArrowUpRight className="text-white/70 group-hover:text-white transition-colors" size={20} />
                </div>
                <div className="font-black text-xl text-white mb-1">Payment Savings</div>
                <div className="text-emerald-100 font-semibold text-sm">Cut fees 15%</div>
                <div className="text-emerald-100 text-xs mt-1">ACH optimization</div>
              </div>

              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300 group">
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 bg-white/20 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <FiTrendingUp className="text-white" size={24} />
                  </div>
                  <FiArrowUpRight className="text-white/70 group-hover:text-white transition-colors" size={20} />
                </div>
                <div className="font-black text-xl text-white mb-1">Cash Forecast</div>
                <div className="text-emerald-100 font-semibold text-sm">1 month ahead</div>
                <div className="text-emerald-100 text-xs mt-1">AI-powered accuracy</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Insight Cards with better interactions
function ScrollableInsightCards() {
  const insights = [
    {
      title: "DSO Optimization",
      metric: "45 → 38 days",
      benefit: "Save $24K/year",
      icon: FiTrendingUp,
      color: "emerald",
      description: "Reduce collection time through automation",
      actionable: true,
    },
    {
      title: "Payment Rail Switch",
      metric: "ACH 92%",
      benefit: "15% fee reduction",
      icon: FiRefreshCw,
      color: "blue",
      description: "Optimize payment processing costs",
      actionable: true,
    },
    {
      title: "Cash Forecast",
      metric: "+$1.2M Q3",
      benefit: "Liquidity buffer",
      icon: FiBarChart,
      color: "purple",
      description: "Enhanced visibility into cash position",
      actionable: false,
    },
    {
      title: "Vendor Terms",
      metric: "DPO +5 days",
      benefit: "Unlock $87K",
      icon: FiClock,
      color: "orange",
      description: "Negotiate better payment terms",
      actionable: true,
    },
  ];

  const colorMap = {
    emerald: "from-emerald-500 to-emerald-600",
    blue: "from-blue-500 to-blue-600",
    purple: "from-purple-500 to-purple-600",
    orange: "from-orange-500 to-orange-600",
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Key Insights & Opportunities</h2>
          <p className="text-gray-600">AI-powered recommendations to optimize your financial performance</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <FiFilter size={16} />
            <span className="text-sm font-medium">Filter</span>
          </button>
          <Link
            to="/analytics"
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <span className="text-sm font-medium">View All</span>
            <FiChevronRight size={16} />
          </Link>
        </div>
      </div>

      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-300 snap-x snap-mandatory">
        {insights.map(({ title, metric, benefit, icon: Icon, color, description, actionable }, i) => (
          <div
            key={i}
            className="min-w-[360px] snap-center flex-shrink-0 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
          >
            <div className={`h-1 bg-gradient-to-r ${colorMap[color as keyof typeof colorMap]}`} />

            <div className="p-8">
              <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-xl bg-gradient-to-r ${colorMap[color as keyof typeof colorMap]} shadow-lg`}>
                  <Icon className="text-white" size={24} />
                </div>
                {actionable && (
                  <div className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                    Actionable
                  </div>
                )}
              </div>

              <h3 className="font-bold text-xl mb-2 text-gray-900 leading-tight">{title}</h3>
              <p className="text-sm text-gray-600 mb-4">{description}</p>

              <div className="text-3xl font-black mb-4 text-gray-900">{metric}</div>

              <div className="flex items-center justify-between">
                <div className="text-emerald-600 font-bold text-lg bg-emerald-50 px-4 py-2 rounded-xl">
                  {benefit}
                </div>
                {actionable && (
                  <button className="text-gray-400 hover:text-gray-600 transition-colors group-hover:translate-x-1">
                    <FiChevronRight size={20} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Enhanced Metrics Graph with better styling
function MetricsTrendGraph() {
  const [selectedMetric, setSelectedMetric] = useState("all");

  return (
    <div className="max-w-7xl mx-auto px-6 my-16">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Enhanced Header */}
        <div className="p-8 border-b border-gray-100 bg-gradient-to-r from-gray-50 to-white">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Metrics Trend Analysis</h2>
              <p className="text-gray-600">DSO, DPO, and Cash Flow Gap over 6 months</p>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-1">
                <button
                  onClick={() => setSelectedMetric("all")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedMetric === "all"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  All Metrics
                </button>
                <button
                  onClick={() => setSelectedMetric("dso")}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                    selectedMetric === "dso"
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-gray-900"
                  }`}
                >
                  DSO Only
                </button>
              </div>

              <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                <FiDownload size={16} />
                <span className="text-sm font-medium">Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Enhanced Graph with better background */}
        <div className="h-[520px] relative overflow-hidden">
          {/* Improved gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50/50 via-white to-blue-50/30">
            {/* Enhanced grid pattern */}
            <div className="absolute inset-0 opacity-20">
              <div className="h-full w-full bg-[linear-gradient(0deg,rgba(148,163,184,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.3)_1px,transparent_1px)] bg-[size:50px_50px]" />
            </div>

            {/* Horizontal graph lines with better spacing */}
            <div className="absolute inset-0">
              {[15, 30, 45, 60, 75, 90].map((percent, i) => (
                <div
                  key={i}
                  className="absolute left-20 right-8 h-px bg-gradient-to-r from-transparent via-gray-300/60 to-transparent"
                  style={{ top: `${percent}%` }}
                />
              ))}
            </div>

            {/* Vertical graph lines with better spacing */}
            <div className="absolute inset-0">
              {[15, 28, 41, 54, 67, 80].map((percent, i) => (
                <div
                  key={i}
                  className="absolute top-16 bottom-12 w-px bg-gradient-to-b from-transparent via-gray-300/60 to-transparent"
                  style={{ left: `${percent}%` }}
                />
              ))}
            </div>
          </div>

          {/* Enhanced Y-axis */}
          <div className="absolute left-3 top-16 bottom-16 w-16 text-right text-sm text-gray-600 font-mono flex flex-col justify-between pr-2 z-10">
            <div className="font-semibold">60</div>
            <div>50</div>
            <div>40</div>
            <div>30</div>
            <div>20</div>
            <div className="font-semibold">10</div>
          </div>

          {/* Enhanced X-axis */}
          <div className="absolute bottom-6 left-20 right-8 flex justify-between text-sm font-semibold text-gray-700 z-10">
            {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month, i) => (
              <div key={month} className="flex flex-col items-center">
                <span>{month}</span>
                <span className="text-xs text-gray-500 mt-1">2024</span>
              </div>
            ))}
          </div>

          {/* Enhanced SVG Chart */}
          <svg
            viewBox="0 0 900 400"
            className="absolute left-20 top-16 w-[calc(100%-5rem)] h-[calc(100%-4rem)] z-20"
          >
            {/* DSO Line with gradient */}
            <defs>
              <linearGradient id="dsoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#dc2626" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="dpoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="1" />
              </linearGradient>
              <linearGradient id="gapGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#059669" stopOpacity="1" />
              </linearGradient>
            </defs>

            {/* DSO Line */}
            <polyline
              points="50,80 150,110 250,140 350,120 450,150 550,170"
              fill="none"
              stroke="url(#dsoGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-sm"
            />

            {/* DPO Line */}
            <polyline
              points="50,180 150,170 250,160 350,180 450,170 550,160"
              fill="none"
              stroke="url(#dpoGradient)"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-sm"
            />

            {/* Gap Line */}
            <polyline
              points="50,130 150,140 250,150 350,150 450,160 550,165"
              fill="none"
              stroke="url(#gapGradient)"
              strokeWidth="3"
              strokeDasharray="8,4"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="drop-shadow-sm"
            />

            {/* Enhanced data points with hover effects */}
            {[80, 110, 140, 120, 150, 170].map((y, i) => (
              <g key={`dso-${i}`}>
                <circle cx={50 + i * 100} cy={y} r="8" fill="#ef4444" className="drop-shadow-md hover:r-10 transition-all" />
                <circle cx={50 + i * 100} cy={y} r="4" fill="white" />
              </g>
            ))}

            {[180, 170, 160, 180, 170, 160].map((y, i) => (
              <g key={`dpo-${i}`}>
                <circle cx={50 + i * 100} cy={y} r="8" fill="#3b82f6" className="drop-shadow-md hover:r-10 transition-all" />
                <circle cx={50 + i * 100} cy={y} r="4" fill="white" />
              </g>
            ))}

            {[130, 140, 150, 150, 160, 165].map((y, i) => (
              <g key={`gap-${i}`}>
                <circle cx={50 + i * 100} cy={y} r="6" fill="#10b981" className="drop-shadow-md" />
                <circle cx={50 + i * 100} cy={y} r="3" fill="white" />
              </g>
            ))}
          </svg>

          {/* Enhanced Legend */}
          <div className="absolute top-8 right-8 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-2xl shadow-lg p-4 z-30">
            <h3 className="text-sm font-semibold text-gray-900 mb-3">Metrics</h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-red-500 to-red-600 rounded-full shadow-sm" />
                <span className="text-gray-700 font-medium">DSO (Days)</span>
                <span className="text-gray-500">42 avg</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full shadow-sm" />
                <span className="text-gray-700 font-medium">DPO (Days)</span>
                <span className="text-gray-500">35 avg</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full shadow-sm" />
                <span className="text-gray-700 font-medium">Cash Gap</span>
                <span className="text-gray-500">7 days</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced Widget Grid with better styling
function WidgetGrid() {
  const widgets = [
    {
      title: "Overdue Receivables",
      value: "$34,200",
      description: "Amount currently overdue from clients",
      icon: FiCalendar,
      trend: "up",
      trendValue: "+5.2%",
      color: "red",
      urgency: "high",
    },
    {
      title: "Upcoming Payables",
      value: "$19,450",
      description: "Bills due in next 30 days",
      icon: FiClock,
      trend: "down",
      trendValue: "-2.1%",
      color: "blue",
      urgency: "medium",
    },
    {
      title: "Cash Conversion Cycle",
      value: "52 days",
      description: "Inventory to cash conversion time",
      icon: FiRefreshCw,
      trend: "down",
      trendValue: "-7 days",
      color: "emerald",
      urgency: "low",
    },
  ];

  const colorMap = {
    red: {
      bg: "bg-red-100",
      text: "text-red-600",
      border: "border-red-200",
      hover: "hover:border-red-300",
    },
    blue: {
      bg: "bg-blue-100",
      text: "text-blue-600",
      border: "border-blue-200",
      hover: "hover:border-blue-300",
    },
    emerald: {
      bg: "bg-emerald-100",
      text: "text-emerald-600",
      border: "border-emerald-200",
      hover: "hover:border-emerald-300",
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Financial Overview</h2>
        <p className="text-gray-600">Key metrics and pending actions requiring your attention</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {widgets.map(({ title, value, description, icon: Icon, trend, trendValue, color, urgency }, i) => {
          const colorConfig = colorMap[color as keyof typeof colorMap];

          return (
            <div
              key={i}
              className={`bg-white rounded-2xl p-8 border-2 ${colorConfig.border} ${colorConfig.hover} hover:shadow-lg transition-all duration-300 group cursor-pointer`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className={`p-4 ${colorConfig.bg} rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className={colorConfig.text} size={28} />
                </div>

                <div className="text-right">
                  <div className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-semibold ${
                    trend === "up"
                      ? "bg-red-100 text-red-700"
                      : "bg-emerald-100 text-emerald-700"
                  }`}>
                    {trend === "up" ? (
                      <FiArrowUpRight size={12} />
                    ) : (
                      <FiArrowDownRight size={12} />
                    )}
                    {trendValue}
                  </div>

                  {urgency === "high" && (
                    <div className="mt-1">
                      <span className="inline-block w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                    </div>
                  )}
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-3 text-lg leading-tight">
                {title}
              </h3>

              <p className="text-4xl font-black text-gray-900 mb-4 leading-none">
                {value}
              </p>

              <p className="text-sm text-gray-600 leading-relaxed mb-4">
                {description}
              </p>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">Last updated: 2m ago</span>
                <FiChevronRight className="text-gray-400 group-hover:text-gray-600 group-hover:translate-x-1 transition-all" size={18} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <Sidebar />
      <HeroStatCard />
      <ScrollableInsightCards />
      <MetricsTrendGraph />
      <WidgetGrid />
    </div>
  );
}
