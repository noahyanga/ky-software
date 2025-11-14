import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FiCalendar, FiFileText, FiFile, FiLoader } from "react-icons/fi";
import React, { useState } from "react";

// Dummy reports data
const dummyReports = [
  {
    id: "1",
    type: "Cash Flow Report",
    typeKey: "cash_flow_report",
    name: "anaylsis",
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
  // ...repeat for each report as needed
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
              Review and analyze client financial data reports
            </p>
          </div>
          <button className="bg-white border border-gray-200 px-4 py-2 text-sm rounded-lg shadow hover:bg-gray-50 flex items-center gap-2">
            <FiFile className="inline" /> Export All Reports
          </button>
        </header>
        <main className="flex gap-6">
          {/* Left: Reports list */}
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
                      ? "ring-2 ring-blue-200 border-blue-300"
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
          {/* Right: Report summary/details */}
          <section className="flex-1 space-y-4">
            {/* Report info (header) */}
            <div className="bg-white rounded-xl shadow border border-gray-200 p-6 flex justify-between items-center">
              <div className="flex items-center gap-2">
                <FiFileText className="text-blue-400 text-xl" />
                <span className="font-bold text-lg text-gray-800">{selectedReport.name}</span>
                <span className="ml-2 px-2 text-xs rounded-full bg-blue-50 text-blue-700 capitalize">
                  {selectedReport.status}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FiCalendar className="text-xs text-gray-400" />
                <span className="text-xs text-gray-400">{selectedReport.date}</span>
                <button className="bg-white border ml-4 border-gray-200 px-4 py-2 text-sm rounded-lg shadow hover:bg-gray-50 flex items-center gap-2">
                  <FiFile className="inline" /> Export PDF
                </button>
              </div>
            </div>
            {/* Analysis status/details card */}
            <div className="bg-white rounded-xl shadow border border-gray-200 py-16 flex flex-col justify-center items-center">
              <div className="mb-4">
                <span className="inline-block animate-spin text-4xl text-blue-300">
                  <FiLoader />
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 text-lg mb-2">
                Analysis in Progress
              </h3>
              <p className="text-gray-500 text-sm">
                We're analyzing your financial data. This usually takes 1-2 minutes.
              </p>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}

