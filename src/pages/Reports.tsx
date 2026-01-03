import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  FiCalendar,
  FiFileText,
  FiFile,
  FiLoader,
  FiTrendingUp,
  FiCheckCircle,
  FiDownload,
  FiClock,
  FiDollarSign,
  FiTarget,
  FiBarChart,
  FiFilter,
  FiSearch,
  FiAlertCircle,
  FiArrowUpRight,
} from "react-icons/fi";
import React, { useState, useEffect } from "react";

// Enhanced reports data with more context
const dummyReports = [
  {
    id: "1",
    type: "Cash Flow Analysis",
    typeKey: "cash_flow_report",
    name: "Monthly Cash Flow Review",
    status: "processing",
    date: "Nov 28, 2024",
    client: "Tech Startup Inc",
    period: "Q4 2024",
    size: "2.4 MB",
  },
  {
    id: "2",
    type: "Financial Statement",
    typeKey: "financial_statement",
    name: "Annual Financial Report",
    status: "processing",
    date: "Nov 27, 2024",
    client: "Manufacturing Corp",
    period: "FY 2024",
    size: "1.8 MB",
  },
  {
    id: "3",
    type: "Bank Reconciliation",
    typeKey: "bank_statement",
    name: "Bank Account Analysis",
    status: "processing",
    date: "Nov 26, 2024",
    client: "Retail Solutions",
    period: "Oct 2024",
    size: "945 KB",
  },
  {
    id: "4",
    type: "Performance Report",
    typeKey: "performance_report",
    name: "KPI Performance Review",
    status: "processing",
    date: "Nov 25, 2024",
    client: "Service Provider LLC",
    period: "Q3 2024",
    size: "3.1 MB",
  },
];

const reportTypeBadge = (typeKey) => {
  switch (typeKey) {
    case "cash_flow_report":
      return "bg-blue-50 text-blue-700 border border-blue-200";
    case "financial_statement":
      return "bg-emerald-50 text-emerald-700 border border-emerald-200";
    case "bank_statement":
      return "bg-purple-50 text-purple-700 border border-purple-200";
    case "performance_report":
      return "bg-orange-50 text-orange-700 border border-orange-200";
    default:
      return "bg-gray-50 text-gray-700 border border-gray-200";
  }
};

const priorityColors = {
  high: {
    bg: "bg-red-50",
    text: "text-red-700",
    border: "border-red-200",
    icon: "text-red-500",
  },
  medium: {
    bg: "bg-yellow-50",
    text: "text-yellow-700",
    border: "border-yellow-200",
    icon: "text-yellow-500",
  },
  low: {
    bg: "bg-green-50",
    text: "text-green-700",
    border: "border-green-200",
    icon: "text-green-500",
  },
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(dummyReports[0]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [reportData, setReportData] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  // Simulate 3-second processing
  useEffect(() => {
    setIsProcessing(true);
    const timer = setTimeout(() => {
      setIsProcessing(false);
      setReportData({
        metrics: [
          {
            key: "dso",
            label: "Days Sales Outstanding",
            value: "45 days",
            change: "-3 days",
            trend: "down",
            description: "Time to collect receivables",
            icon: FiClock,
          },
          {
            key: "dpo",
            label: "Days Payable Outstanding",
            value: "38 days",
            change: "+2 days",
            trend: "up",
            description: "Payment timing to suppliers",
            icon: FiCalendar,
          },
          {
            key: "cashFlow",
            label: "Net Cash Flow",
            value: "$9.8M",
            change: "+23%",
            trend: "up",
            description: "Monthly cash movement",
            icon: FiDollarSign,
          },
          {
            key: "successRate",
            label: "Collection Success",
            value: "87%",
            change: "+4%",
            trend: "up",
            description: "Invoice collection rate",
            icon: FiTarget,
          },
        ],
        summary: {
          totalRevenue: "$2.4M",
          expenses: "$1.6M",
          netProfit: "$800K",
          profitMargin: "33.3%",
        },
        suggestions: [
          {
            title: "Optimize Payment Terms",
            priority: "high",
            desc: "Reduce Days Sales Outstanding by implementing automated payment reminders and offering early payment discounts",
            savings: "$24K annually",
            timeframe: "30 days",
            effort: "Medium",
          },
          {
            title: "Extend Vendor Terms",
            priority: "medium",
            desc: "Negotiate extended payment terms with key suppliers to improve cash flow timing",
            savings: "$87K buffer",
            timeframe: "60 days",
            effort: "High",
          },
          {
            title: "Payment Method Optimization",
            priority: "high",
            desc: "Switch from wire transfers to ACH payments for significant fee reduction",
            savings: "15% fee reduction",
            timeframe: "14 days",
            effort: "Low",
          },
          {
            title: "Cash Reserve Management",
            priority: "low",
            desc: "Maintain optimal cash buffer while maximizing investment returns",
            savings: "Stability increase",
            timeframe: "Ongoing",
            effort: "Low",
          },
          {
            title: "Invoice Process Automation",
            priority: "medium",
            desc: "Implement automated invoice generation and tracking system",
            savings: "20 hours/month",
            timeframe: "45 days",
            effort: "Medium",
          },
          {
            title: "Early Payment Incentives",
            priority: "low",
            desc: "Offer structured discounts for early payments to accelerate cash flow",
            savings: "$12K annually",
            timeframe: "21 days",
            effort: "Low",
          },
        ],
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [selectedReport]);

  const filteredReports = dummyReports.filter(
    (report) =>
      report.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.client.toLowerCase().includes(searchTerm.toLowerCase()) ||
      report.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (isProcessing) {
    return (
      <div className="bg-slate-200 min-h-screen">
        <Header />
        <Sidebar />
        <div className="max-w-7xl mx-auto pt-8 px-6">
          {/* Header */}
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 mb-3">Reports</h1>
              <p className="text-lg text-gray-600">
                AI-powered analysis and insights for your financial data
              </p>
            </div>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
                <FiFilter size={18} />
                <span className="font-medium">Filter</span>
              </button>
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                <FiDownload size={18} />
                Export All
              </button>
            </div>
          </div>

          <div className="flex gap-8">
            {/* Sidebar */}
            <aside className="w-80 flex-shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-lg font-semibold text-gray-900">
                    Reports ({filteredReports.length})
                  </h2>
                </div>

                {/* Search */}
                <div className="relative mb-4">
                  <FiSearch
                    className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    size={16}
                  />
                  <input
                    type="text"
                    placeholder="Search reports..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {filteredReports.map((r) => (
                    <button
                      key={r.id}
                      onClick={() => setSelectedReport(r)}
                      className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                        selectedReport.id === r.id
                          ? "border-blue-300 bg-blue-50 ring-1 ring-blue-300"
                          : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-2">
                        <span
                          className={`text-xs font-medium px-2 py-1 rounded border ${reportTypeBadge(
                            r.typeKey
                          )}`}
                        >
                          {r.type}
                        </span>
                        <span className="text-xs px-2 py-1 bg-yellow-100 text-yellow-700 rounded-full">
                          Processing
                        </span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {r.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-2">{r.client}</p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{r.period}</span>
                        <span>{r.size}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </aside>

            {/* Main content - Processing */}
            <section className="flex-1 flex items-center justify-center min-h-[600px]">
              <div className="text-center bg-white rounded-2xl p-16 border border-gray-200 max-w-lg w-full">
                <div className="w-20 h-20 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <FiLoader className="w-10 h-10 text-blue-600 animate-spin" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-3">
                  Processing Report
                </h3>
                <p className="text-gray-600 mb-8 leading-relaxed">
                  Analyzing financial data with AI to generate insights and
                  recommendations.
                </p>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <div
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                    style={{ width: "75%" }}
                  />
                </div>
                <p className="text-sm text-gray-500 mt-2">
                  Estimated time: 30 seconds
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <Sidebar />
      <div className="max-w-7xl mx-auto pt-8 px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Reports
            </h1>
            <p className="text-lg text-gray-600">
              AI-powered analysis and insights for your financial data
            </p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">
              <FiFilter size={18} />
              <span className="font-medium">Filter</span>
            </button>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">
              <FiDownload size={18} />
              Export All
            </button>
          </div>
        </div>

        <main className="flex gap-8">
          {/* Sidebar */}
          <aside className="w-80 flex-shrink-0">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  Reports ({filteredReports.length})
                </h2>
              </div>

              {/* Search */}
              <div className="relative mb-4">
                <FiSearch
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={16}
                />
                <input
                  type="text"
                  placeholder="Search reports..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {filteredReports.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedReport(r)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedReport.id === r.id
                        ? "border-blue-300 bg-blue-50 ring-1 ring-blue-300"
                        : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    <div className="flex items-start justify-between mb-2">
                      <span
                        className={`text-xs font-medium px-2 py-1 rounded border ${reportTypeBadge(
                          r.typeKey
                        )}`}
                      >
                        {r.type}
                      </span>
                      <span className="text-xs px-2 py-1 bg-emerald-100 text-emerald-700 rounded-full">
                        Complete
                      </span>
                    </div>
                    <h3 className="font-semibold text-gray-900 mb-1">
                      {r.name}
                    </h3>
                    <p className="text-sm text-gray-600 mb-2">{r.client}</p>
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <span>{r.period}</span>
                      <span>{r.size}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <section className="flex-1 space-y-8">
            {/* Report Header */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                <div className="flex items-start gap-4">
                  <div className="p-4 bg-emerald-100 rounded-2xl">
                    <FiFileText className="w-8 h-8 text-emerald-600" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {selectedReport.name}
                    </h2>
                    <p className="text-gray-600 mb-3">
                      {selectedReport.client}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <FiCalendar size={14} />
                        {selectedReport.period}
                      </span>
                      <span className="flex items-center gap-1">
                        <FiFile size={14} />
                        {selectedReport.size}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-lg font-medium">
                    Analysis Complete
                  </span>
                  <button className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors">
                    <FiDownload size={18} />
                    Export PDF
                  </button>
                </div>
              </div>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reportData.metrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <div
                    key={metric.key}
                    className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-gray-300 transition-colors"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="p-3 bg-gray-100 rounded-xl">
                        <Icon className="text-gray-600" size={24} />
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
                    <h3 className="text-3xl font-bold text-gray-900 mb-2">
                      {metric.value}
                    </h3>
                    <p className="text-gray-900 font-medium mb-1">
                      {metric.label}
                    </p>
                    <p className="text-sm text-gray-600">
                      {metric.description}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Financial Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Financial Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {reportData.summary.totalRevenue}
                  </div>
                  <p className="text-gray-600">Total Revenue</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    {reportData.summary.expenses}
                  </div>
                  <p className="text-gray-600">Total Expenses</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-emerald-600 mb-2">
                    {reportData.summary.netProfit}
                  </div>
                  <p className="text-gray-600">Net Profit</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600 mb-2">
                    {reportData.summary.profitMargin}
                  </div>
                  <p className="text-gray-600">Profit Margin</p>
                </div>
              </div>
            </div>

            {/* AI Recommendations */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <FiCheckCircle className="text-blue-600" size={24} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900">
                  AI-Powered Recommendations
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportData.suggestions.map((suggestion, i) => {
                  const colors = priorityColors[suggestion.priority];
                  return (
                    <div
                      key={i}
                      className={`rounded-2xl p-6 border ${colors.border} ${colors.bg} hover:shadow-sm transition-all duration-200`}
                    >
                      <div className="flex items-center gap-3 mb-4">
                        <div
                          className={`w-3 h-3 rounded-full ${colors.icon.replace(
                            "text-",
                            "bg-"
                          )}`}
                        />
                        <span
                          className={`px-3 py-1 rounded-lg text-sm font-semibold ${colors.text} ${colors.bg}`}
                        >
                          {suggestion.priority.toUpperCase()} PRIORITY
                        </span>
                      </div>

                      <h4 className="font-bold text-lg text-gray-900 mb-3">
                        {suggestion.title}
                      </h4>

                      <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                        {suggestion.desc}
                      </p>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Potential Savings:
                          </span>
                          <span className="font-semibold text-emerald-600">
                            {suggestion.savings}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Timeline:</span>
                          <span className="font-medium text-gray-900">
                            {suggestion.timeframe}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">
                            Effort Required:
                          </span>
                          <span className="font-medium text-gray-900">
                            {suggestion.effort}
                          </span>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
