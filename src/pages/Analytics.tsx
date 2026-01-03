import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  FiUsers,
  FiTrendingUp,
  FiDollarSign,
  FiTarget,
  FiActivity,
  FiZap,
  FiArrowUpRight,
  FiArrowDownRight,
  FiMoreHorizontal,
  FiRefreshCw,
  FiStar,
  FiBarChart,
  FiPieChart,
  FiCalendar,
  FiDownload,
  FiFilter,
} from "react-icons/fi";

const AnalyticsPage: React.FC = () => {
  const [selectedMetric, setSelectedMetric] = useState("revenue");
  const [activeTab, setActiveTab] = useState("overview");

  const metrics = [
    {
      id: "revenue",
      title: "Total Revenue",
      value: "$2.4M",
      change: "+23.5%",
      trend: "up",
      icon: FiDollarSign,
      color: "#10B981",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-600",
    },
    {
      id: "clients",
      title: "Active Clients",
      value: "247",
      change: "+12.3%",
      trend: "up",
      icon: FiUsers,
      color: "#3B82F6",
      bgColor: "bg-blue-50",
      textColor: "text-blue-600",
    },
    {
      id: "success",
      title: "Success Rate",
      value: "87.2%",
      change: "+4.1%",
      trend: "up",
      icon: FiTarget,
      color: "#8B5CF6",
      bgColor: "bg-purple-50",
      textColor: "text-purple-600",
    },
    {
      id: "insights",
      title: "AI Insights",
      value: "1,284",
      change: "+18.7%",
      trend: "up",
      icon: FiZap,
      color: "#F59E0B",
      bgColor: "bg-yellow-50",
      textColor: "text-yellow-600",
    },
  ];

  const opportunityCategories = [
    { name: "Cash Flow", value: 85, color: "#10B981", percentage: 85 },
    {
      name: "Payment Optimization",
      value: 72,
      color: "#3B82F6",
      percentage: 72,
    },
    { name: "Risk Management", value: 64, color: "#8B5CF6", percentage: 64 },
    { name: "Process Automation", value: 58, color: "#F59E0B", percentage: 58 },
  ];

  const recentActivities = [
    {
      type: "optimization",
      title: "Cash flow improved by $45K",
      time: "2 min ago",
      impact: "high",
      icon: FiTrendingUp,
      bgColor: "bg-emerald-50",
      iconColor: "text-emerald-600",
    },
    {
      type: "alert",
      title: "Payment delay detected - ClientCorp",
      time: "15 min ago",
      impact: "medium",
      icon: FiActivity,
      bgColor: "bg-yellow-50",
      iconColor: "text-yellow-600",
    },
    {
      type: "success",
      title: "DSO reduced to 32 days",
      time: "1 hour ago",
      impact: "high",
      icon: FiTarget,
      bgColor: "bg-blue-50",
      iconColor: "text-blue-600",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <Sidebar />

      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Analytics Overview
              </h1>
              <p className="text-lg text-gray-600 max-w-2xl leading-relaxed">
                Real-time insights powered by AI to optimize your financial
                operations and drive strategic growth decisions.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-4 py-2">
                <FiCalendar className="text-gray-500" size={18} />
                <select className="bg-transparent border-none outline-none text-sm font-medium text-gray-700">
                  <option>Last 30 days</option>
                  <option>Last 90 days</option>
                  <option>Last 12 months</option>
                </select>
              </div>
              <button className="flex items-center gap-2 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                <FiDownload size={18} />
                Generate Report
              </button>
              <button className="p-2 bg-white border border-gray-200 rounded-lg text-gray-500 hover:bg-gray-50 transition-colors">
                <FiRefreshCw size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            const isActive = selectedMetric === metric.id;

            return (
              <div
                key={metric.id}
                onClick={() => setSelectedMetric(metric.id)}
                className={`bg-white border rounded-2xl p-6 cursor-pointer transition-all duration-200 hover:border-gray-300 ${
                  isActive
                    ? "border-blue-500 ring-1 ring-blue-500"
                    : "border-gray-200"
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${metric.bgColor}`}>
                    <Icon size={24} className={metric.textColor} />
                  </div>
                  <div
                    className={`flex items-center gap-1 px-2 py-1 rounded-lg text-sm font-semibold ${
                      metric.trend === "up"
                        ? "bg-emerald-100 text-emerald-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    <FiArrowUpRight size={12} />
                    {metric.change}
                  </div>
                </div>

                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-2">
                    {metric.value}
                  </h3>
                  <p className="text-gray-600 font-medium">{metric.title}</p>
                </div>

                <div className="mt-4 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-1000"
                    style={{
                      backgroundColor: metric.color,
                      width: `${75 + Math.random() * 25}%`,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
          {/* Opportunity Analysis */}
          <div className="xl:col-span-2 bg-white border border-gray-200 rounded-2xl p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Opportunity Analysis
                </h2>
                <p className="text-gray-600">
                  Performance metrics across key business areas
                </p>
              </div>
              <div className="flex gap-2">
                {["overview", "details", "trends"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab
                        ? "bg-blue-600 text-white"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              {opportunityCategories.map((category, index) => (
                <div
                  key={category.name}
                  className="p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="font-semibold text-gray-900">
                        {category.name}
                      </span>
                    </div>
                    <div className="text-right">
                      <span className="text-2xl font-bold text-gray-900">
                        {category.value}
                      </span>
                      <div className="text-sm text-gray-600">opportunities</div>
                    </div>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        backgroundColor: category.color,
                        width: `${category.percentage}%`,
                      }}
                    />
                  </div>

                  <div
                    className="mt-2 text-right text-sm font-medium"
                    style={{ color: category.color }}
                  >
                    {category.percentage}% completion
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Feed */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">Live Activity</h3>
              <button className="text-gray-400 hover:text-gray-600">
                <FiMoreHorizontal size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                const Icon = activity.icon;
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-3 hover:bg-gray-50 rounded-lg transition-colors"
                  >
                    <div className={`p-2 rounded-lg ${activity.bgColor}`}>
                      <Icon size={16} className={activity.iconColor} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-gray-900 text-sm font-medium mb-1">
                        {activity.title}
                      </p>
                      <p className="text-gray-500 text-xs">{activity.time}</p>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        activity.impact === "high"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {activity.impact}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-sm font-semibold text-gray-900 mb-3">
                Quick Actions
              </h4>
              <div className="grid grid-cols-2 gap-3">
                <button className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Run Analysis
                </button>
                <button className="p-3 border border-gray-200 rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                  Export Data
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Insights Panel */}
        <div className="bg-white border border-gray-200 rounded-2xl p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">
            AI-Powered Insights
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiStar size={24} className="text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Top Performer
              </h3>
              <p className="text-gray-600 text-sm">
                Cash flow optimization delivering 94% success rate
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiTrendingUp size={24} className="text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Growth Trend
              </h3>
              <p className="text-gray-600 text-sm">
                Revenue opportunities increased by 23% this month
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <FiTarget size={24} className="text-emerald-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Next Focus
              </h3>
              <p className="text-gray-600 text-sm">
                Payment processing optimization shows $680K potential
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AnalyticsPage;
