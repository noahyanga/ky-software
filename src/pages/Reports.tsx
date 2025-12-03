import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FiCalendar, FiFileText, FiFile, FiLoader, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import React, { useState, useEffect } from "react";

// Dummy reports data
const dummyReports = [
  {
    id: "1",
    type: "Cash Flow Report",
    typeKey: "cash_flow_report",
    name: "analysis",
    status: "processing",
    date: "Sep 24, 2025",
  },
  {
    id: "2",
    type: "Financial Statement",
    typeKey: "financial_statement",
    name: "test",
    status: "processing",
    date: "Sep 24, 2025",
  },
  {
    id: "3",
    type: "Bank Statement",
    typeKey: "bank_statement",
    name: "report",
    status: "processing",
    date: "Sep 24, 2025",
  },
  {
    id: "4",
    type: "Other Statement",
    typeKey: "",
    name: "other report",
    status: "processing",
    date: "Sep 24, 2025",
  },
];

const reportTypeBadge = (typeKey) => {
  switch (typeKey) {
    case "cash_flow_report":
      return "bg-blue-100 text-blue-800";
    case "financial_statement":
      return "bg-amber-50 text-amber-700 border border-amber-200";
    case "bank_statement":
      return "bg-orange-50 text-orange-700 border border-orange-200";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export default function ReportsPage() {
  const [selectedReport, setSelectedReport] = useState(dummyReports[0]);
  const [isProcessing, setIsProcessing] = useState(true);
  const [reportData, setReportData] = useState(null);

  // Simulate 3-second processing
  useEffect(() => {
    setIsProcessing(true);
    const timer = setTimeout(() => {
      setIsProcessing(false);
      setReportData({
        metrics: {
          dso: "45 days",
          dpo: "38 days",
          cashFlow: "$9.8M",
          successRate: "87%"
        },
        suggestions: [
          { title: "Optimize DSO", priority: "high", desc: "Reduce Days Sales Outstanding by accelerating customer payments", savings: "$24K/year" },
          { title: "Extend Vendor Terms", priority: "medium", desc: "Negotiate 10 extra DPO days with key suppliers", savings: "$87K" },
          { title: "Switch to ACH", priority: "high", desc: "Replace wire transfers with ACH for 15% fee savings", savings: "15%" },
          { title: "Cash Buffer", priority: "low", desc: "Maintain 45-day liquidity buffer for unexpected needs", savings: "Stability" },
          { title: "Invoice Automation", priority: "medium", desc: "Automate recurring invoice generation and tracking", savings: "20 hours/mo" },
          { title: "Early Payment Discounts", priority: "low", desc: "Offer 2% discount for payments within 10 days", savings: "$12K/year" },
        ]
      });
    }, 3000);
    return () => clearTimeout(timer);
  }, [selectedReport]);

  if (isProcessing) {
    return (
      <div className="bg-slate-200 min-h-screen">
        <Header />
        <Sidebar />
        <div className="max-w-7xl mx-auto pt-10 px-6">
          <header className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-gray-900">
                Client Financial Reports
              </h1>
              <p className="mt-2 text-gray-600">
                Review, analyze, and schedule client financial data reports
              </p>
            </div>
            <button className="bg-white border border-gray-200 px-4 py-2 text-sm rounded-lg shadow hover:bg-gray-50 flex items-center gap-2">
              <FiFile className="inline" /> Export All Reports
            </button>
          </header>

          <div className="flex gap-6">
            <aside className="w-80 flex-shrink-0">
              <div className="font-semibold text-lg mb-2">All Client Reports</div>
              <div className="space-y-3">
                {dummyReports.map((r) => (
                  <button
                    key={r.id}
                    onClick={() => setSelectedReport(r)}
                    className={
                      "w-full text-left px-4 py-3 bg-white rounded-xl shadow border border-gray-200 flex flex-col gap-1 transition " +
                      (selectedReport.id === r.id
                        ? "ring-2 ring-blue-200 border-blue-300 shadow-md"
                        : "hover:ring-1 hover:ring-blue-100")
                    }
                  >
                    <span
                      className={
                        "inline-block text-xs font-medium px-2.5 py-0.5 rounded mb-1 " +
                        reportTypeBadge(r.typeKey)
                      }
                    >
                      {r.type}
                    </span>
                    <div className="flex items-center justify-between mb-0.5">
                      <span className="font-semibold text-gray-900">{r.name}</span>
                      <span className={`text-[11px] px-2 bg-blue-100 text-blue-700 font-medium rounded-full ml-1`}>
                        {r.status}
                      </span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <FiCalendar />
                      <span>{r.date}</span>
                    </div>
                  </button>
                ))}
              </div>
            </aside>

            <section className="flex-1 flex items-center justify-center min-h-[600px]">
              <div className="text-center bg-white/90 backdrop-blur-sm rounded-3xl p-16 shadow-2xl border border-gray-200 max-w-2xl w-full mx-8">
                <div className="w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-600 rounded-3xl flex items-center justify-center mx-auto mb-8 shadow-2xl">
                  <FiLoader className="w-16 h-16 text-white animate-spin" />
                </div>
                <h3 className="text-3xl font-black text-gray-900 mb-4">Processing Report</h3>
                <p className="text-xl text-gray-600 mb-12 leading-relaxed">
                  Analyzing your financial data with AI.
                </p>
                <div className="w-full bg-gray-200 rounded-2xl h-3 overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-emerald-500 h-3 rounded-2xl shadow-inner animate-pulse"
                    style={{ width: '80%' }}
                  />
                </div>
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
      <div className="max-w-7xl mx-auto pt-10 px-6">
        <header className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900">
              Client Financial Reports
            </h1>
            <p className="mt-2 text-gray-600">
              Review, analyze, and schedule client financial data reports
            </p>
          </div>
          <button className="bg-white border border-gray-200 px-4 py-2 text-sm rounded-lg shadow hover:bg-gray-50 flex items-center gap-2">
            <FiFile className="inline" /> Export All Reports
          </button>
        </header>

        <main className="flex gap-8">
          <aside className="w-80 flex-shrink-0">
            <div className="font-semibold text-lg mb-2">All Client Reports</div>
            <div className="space-y-3">
              {dummyReports.map((r) => (
                <button
                  key={r.id}
                  onClick={() => setSelectedReport(r)}
                  className={
                    "w-full text-left px-4 py-3 bg-white rounded-xl shadow border border-gray-200 flex flex-col gap-1 transition " +
                    (selectedReport.id === r.id
                      ? "ring-2 ring-blue-200 border-blue-300 shadow-md"
                      : "hover:ring-1 hover:ring-blue-100")
                  }
                >
                  <span
                    className={
                      "inline-block text-xs font-medium px-2.5 py-0.5 rounded mb-1 " +
                      reportTypeBadge(r.typeKey)
                    }
                  >
                    {r.type}
                  </span>
                  <div className="flex items-center justify-between mb-0.5">
                    <span className="font-semibold text-gray-900">{r.name}</span>
                    <span className={`text-[11px] px-2 bg-emerald-100 text-emerald-700 font-medium rounded-full ml-1`}>
                      Complete
                    </span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-400">
                    <FiCalendar />
                    <span>{r.date}</span>
                  </div>
                </button>
              ))}
            </div>
          </aside>

          <section className="flex-1 space-y-8">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 flex flex-wrap items-center justify-between gap-6">
              <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl">
                  <FiFileText className="w-8 h-8" />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900">{selectedReport.name}</h2>
                  <span className="px-4 py-2 text-sm rounded-2xl bg-emerald-100 text-emerald-800 font-semibold mt-2 inline-block">
                    Analysis Complete
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <FiCalendar className="text-lg" />
                  <span>{selectedReport.date}</span>
                </div>
                <button className="bg-emerald-600 text-white px-8 py-3 text-lg rounded-2xl shadow-xl hover:bg-emerald-700 transition-all duration-200 font-semibold flex items-center gap-2 whitespace-nowrap">
                  <FiFile className="w-5 h-5" /> Export PDF
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.entries(reportData.metrics).map(([key, value]) => (
                <div key={key} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-xl group-hover:scale-105 transition-transform">
                      <FiTrendingUp className="w-5 h-5" />
                    </div>
                    <span className="text-base font-bold text-emerald-600 bg-emerald-100 px-4 py-2 rounded-xl">
                      +12%
                    </span>
                  </div>
                  <p className="text-4xl lg:text-2xl font-black text-gray-900 mb-3 leading-none">
                    {value}
                  </p>
                  <p className="text-lg text-gray-700 font-semibold capitalize">
                    {key.replace('_', ' ')}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <h3 className="text-3xl font-black text-gray-900 mb-8 flex items-center gap-4">
                <FiCheckCircle className="text-emerald-500 w-10 h-10" />
                AI Recommendations
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {reportData.suggestions.map((suggestion, i) => {
                  const priorityColor = suggestion.priority === 'high' ? 'bg-red-500 text-white' :
                    suggestion.priority === 'medium' ? 'bg-amber-500 text-white' : 'bg-emerald-500 text-white';
                  return (
                    <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group h-full">
                      <div className="flex items-center gap-4 mb-6">
                        <div className={`w-3 h-3 rounded-full ${suggestion.priority === 'high' ? 'bg-red-500' : suggestion.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        <span className={`px-4 py-2 rounded-xl text-sm font-bold ${priorityColor}`}>
                          {suggestion.priority.toUpperCase()}
                        </span>
                      </div>
                      <h4 className="font-black text-xl text-gray-900 mb-4 leading-tight">
                        {suggestion.title}
                      </h4>
                      <p className="text-gray-600 text-base mb-6 leading-relaxed">
                        {suggestion.desc}
                      </p>
                      <div className="text-emerald-600 font-bold text-xl bg-emerald-50 px-6 py-3 rounded-2xl shadow-sm inline-block">
                        {suggestion.savings}
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

