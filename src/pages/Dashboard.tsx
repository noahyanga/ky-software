import { Link } from "react-router-dom";
import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

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

// MINIMAL Cards under green banner - Clean white design
function ScrollableInsightCards() {
  const insights = [
    {
      title: "DSO Optimization",
      metric: "45 → 38 days",
      benefit: "Save $24K/year",
      icon: "📉"
    },
    {
      title: "Payment Rail Switch",
      metric: "ACH 92%",
      benefit: "15% fee reduction",
      icon: "🔄"
    },
    {
      title: "Cash Forecast",
      metric: "+$1.2M Q3",
      benefit: "Liquidity buffer",
      icon: "📈"
    },
    {
      title: "Vendor Terms",
      metric: "DPO +5 days",
      benefit: "Unlock $87K",
      icon: "🕒"
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 py-12">
      <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-thin scrollbar-thumb-gray-300 snap-x snap-mandatory">
        {insights.map(({ title, metric, benefit, icon }, i) => (
          <div
            key={i}
            className="min-w-[340px] snap-center flex-shrink-0 bg-white border border-gray-200 rounded-2xl p-8 shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
          >
            <div className="text-4xl mb-6 opacity-75">{icon}</div>
            <h3 className="font-semibold text-xl mb-3 text-gray-900 leading-tight">{title}</h3>
            <div className="text-3xl font-bold mb-4 text-gray-900">{metric}</div>
            <div className="text-emerald-600 font-bold text-lg bg-emerald-50 px-4 py-2 rounded-xl">
              {benefit}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// FIXED Metrics Trend Graph - Full size, properly visible
// CLEAN Metrics Trend Graph with Graph-like Background
function MetricsTrendGraph() {
  return (
    <div className="max-w-7xl mx-auto px-6 my-20">
      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
        {/* Clean Header */}
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-4xl font-bold text-gray-900">Metrics Trend Analysis</h2>
          <p className="text-gray-600 text-sm mt-2">DSO, DPO, and Cash Flow Gap over 6 months</p>
        </div>

        {/* Graph-like Background + Chart */}
        <div className="h-[500px] relative overflow-hidden">
          {/* GRAPH-LIKE BACKGROUND */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-white to-emerald-50/30">
            {/* Subtle grid pattern */}
            <div className="absolute inset-0 opacity-10 bg-[linear-gradient(0deg,#e5e7eb33_1px,transparent_1px),linear-gradient(90deg,#e5e7eb33_1px,transparent_1px)] bg-[size:40px_40px]" />

            {/* Horizontal graph lines */}
            <div className="absolute inset-0 ">
              <div className="absolute left-24 right-8 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" style={{ top: '12%' }} />
              <div className="absolute left-24 right-8 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" style={{ top: '32%' }} />
              <div className="absolute left-24 right-8 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" style={{ top: '52%' }} />
              <div className="absolute left-24 right-8 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" style={{ top: '72%' }} />
              <div className="absolute left-24 right-8 top-0 h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent" style={{ top: '92%' }} />
            </div>

            {/* Vertical graph lines */}
            <div className="absolute inset-0">
              <div className="absolute top-24 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" style={{ left: '12%' }} />
              <div className="absolute top-24 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" style={{ left: '32%' }} />
              <div className="absolute top-24 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" style={{ left: '52%' }} />
              <div className="absolute top-24 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" style={{ left: '72%' }} />
              <div className="absolute top-24 bottom-8 left-0 w-px bg-gradient-to-b from-transparent via-gray-300 to-transparent" style={{ left: '92%' }} />
            </div>
          </div>

          {/* Y-axis */}
          <div className="absolute left-8 top-8 bottom-8 w-12 text-right text-lg text-gray-600 font-mono space-y-10 pr-1 z-10">
            <div>60</div>
            <div>50</div>
            <div>40</div>
            <div>30</div>
            <div>20</div>
            <div>10</div>
          </div>

          {/* X-axis */}
          <div className="absolute bottom-8 left-24 right-8 flex justify-between text-sm font-semibold text-gray-700 z-10">
            <span>Jan</span>
            <span>Feb</span>
            <span>Mar</span>
            <span>Apr</span>
            <span>May</span>
            <span>Jun</span>
          </div>

          {/* SVG Chart - on top */}
          <svg
            viewBox="0 0 900 350"
            className="absolute left-24 top-8 w-[calc(100%-3rem)] h-[calc(100%-3rem)] z-20"
          >
            {/* DSO Line */}
            <polyline
              points="50,60 150,90 250,120 350,100 450,130 550,150"
              fill="none"
              stroke="#ef4444"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.95"
            />

            {/* DPO Line */}
            <polyline
              points="50,160 150,150 250,140 350,160 450,150 550,140"
              fill="none"
              stroke="#3b82f6"
              strokeWidth="4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.95"
            />

            {/* Gap Line */}
            <polyline
              points="50,110 150,120 250,130 350,130 450,140 550,145"
              fill="none"
              stroke="#10b981"
              strokeWidth="3"
              strokeDasharray="8,4"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity="0.95"
            />

            {/* Data points - DSO */}
            {[60, 90, 120, 100, 130, 150].map((y, i) => (
              <circle key={i} cx={50 + i * 100} cy={y} r="7" fill="#ef4444" stroke="white" strokeWidth="2.5" />
            ))}

            {/* Data points - DPO */}
            {[160, 150, 140, 160, 150, 140].map((y, i) => (
              <circle key={i} cx={50 + i * 100} cy={y} r="7" fill="#3b82f6" stroke="white" strokeWidth="2.5" />
            ))}
          </svg>

          {/* Legend */}
          <div className="absolute top-8 right-8 flex flex-col gap-3 text-sm text-gray-700 font-medium bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-md z-10">
            <span className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-red-500 rounded-full shadow-sm" />
              DSO
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-blue-500 rounded-full shadow-sm" />
              DPO
            </span>
            <span className="flex items-center gap-2">
              <div className="w-3.5 h-3.5 bg-emerald-500 rounded-full shadow-sm" />
              Gap
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}



// HeroStatCard (unchanged)
function HeroStatCard() {
  return (
    <div className="max-w-7xl mx-auto mt-12 px-6">
      <div className="flex flex-col lg:flex-row shadow-2xl overflow-hidden rounded-3xl bg-gradient-to-r from-emerald-500 to-emerald-600">
        <div className="flex-1 p-12 text-white">
          <div className="uppercase mb-6 text-lg tracking-wider font-bold opacity-90">
            Total Cash Managed
          </div>
          <div className="text-6xl lg:text-7xl font-black mb-6 leading-none">
            $9.8M
          </div>
          <div className="text-xl opacity-95 max-w-lg mb-10 leading-relaxed">
            Projected net inflow for next quarter based on current trends and AI analysis.
          </div>
          <Link
            to="/upload"
            className="inline-flex items-center px-8 py-4 bg-white/20 backdrop-blur-sm text-white font-bold text-lg rounded-2xl shadow-2xl hover:shadow-3xl hover:bg-white/30 transition-all duration-300 hover:scale-105"
          >
            Upload New Data
          </Link>
        </div>
        <div className="flex-1 p-12 bg-white/10 backdrop-blur-sm grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl">
              <span className="text-3xl">💡</span>
            </div>
            <div className="font-black text-xl text-white">DSO Optimized</div>
            <div className="text-white/90 font-semibold">Reduce by 7%</div>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl">
              <span className="text-3xl">🔄</span>
            </div>
            <div className="font-black text-xl text-white">Payment Savings</div>
            <div className="text-white/90 font-semibold">Cut fees 15%</div>
          </div>
          <div className="flex flex-col items-center gap-4 text-center">
            <div className="w-20 h-20 bg-white/30 rounded-2xl flex items-center justify-center backdrop-blur-sm shadow-xl">
              <span className="text-3xl">📈</span>
            </div>
            <div className="font-black text-xl text-white">Cash Forecast</div>
            <div className="text-white/90 font-semibold">1 month ahead</div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WidgetGrid() {
  const widgets = [
    {
      title: "Overdue Receivables",
      value: "$34,200",
      description: "Amount currently overdue from clients.",
      icon: "📅",
    },
    {
      title: "Upcoming Payables",
      value: "$19,450",
      description: "Bills due in next 30 days.",
      icon: "💳",
    },
    {
      title: "Cash Conversion Cycle",
      value: "52 days",
      description: "Inventory to cash conversion time.",
      icon: "⏳",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {widgets.map(({ title, value, description, icon }, i) => (
          <div
            key={i}
            className="bg-white rounded-xl p-6 border border-gray-100 hover:border-emerald-200 hover:shadow-sm transition-all duration-200"
          >
            {/* Compact icon */}
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl">{icon}</span>
            </div>

            <h3 className="font-medium text-gray-900 mb-2 text-sm leading-tight">
              {title}
            </h3>

            <p className="text-2xl font-bold text-gray-900 mb-3 leading-none">
              {value}
            </p>

            <p className="text-xs text-gray-500 leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}


export default function Dashboard() {
  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <Sidebar />
      <HeroStatCard />
      <ScrollableInsightCards />
      <MetricsTrendGraph />
      <WidgetGrid />
    </div>
  );
}

