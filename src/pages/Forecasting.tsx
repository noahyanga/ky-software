import React, { useState } from 'react';
import {
  FiPlus,
  FiMoreHorizontal,
  FiThumbsUp,
  FiThumbsDown,
  FiHelpCircle,
} from 'react-icons/fi';
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const kyColors = {
  bluePrimary: "#3A81F1",
  blueLight: "#AACBFF",
  greenPrimary: "#2DC44F",
  greenLight: "#A3D9A5",
  grayLight: "#EAF2F5",
  grayDarkText: "#224B21",
  grayMidText: "#475569",
  borderLight: "#B0CAAE"
};

interface Scenario {
  id: string;
  name: string;
  active: boolean;
}

interface MetricData {
  label: string;
  value: string;
  type: 'user' | 'system';
}

const chartDataCashBalance = [
  { month: 'Mar 2021', value: 1.2 },
  { month: 'Apr 2021', value: 2.1 },
  { month: 'May 2021', value: 2.3 },
  { month: 'Jun 2021', value: 2.17 },
  { month: 'Jul 2021', value: 2.85 },
  { month: 'Aug 2021', value: 2.79 },
  { month: 'Sep 2021', value: 3.03 },
  { month: 'Oct 2021', value: 3.41 },
  { month: 'Nov 2021', value: 3.18 },
  { month: 'Dec 2021', value: 3.28 },
  { month: 'Jan 2022', value: 3.42, forecast: true },
  { month: 'Feb 2022', value: 2.87, forecast: true },
  { month: 'Mar 2022', value: 2.63, forecast: true }
];

const chartDataOperatingCashFlow = [
  { month: 'Mar', inflow: 3.0, outflow: 2.2 },
  { month: 'Apr', inflow: 2.8, outflow: 2.1 },
  { month: 'May', inflow: 3.5, outflow: 2.7 },
  { month: 'Jun', inflow: 3.1, outflow: 2.9 },
  { month: 'Jul', inflow: 3.4, outflow: 3.0 },
  { month: 'Aug', inflow: 3.6, outflow: 3.1 },
];

const agingBucketsReceivables = [
  { label: '0-30 days', count: 18, },
  { label: '31-60 days', count: 7, },
  { label: '61-90 days', count: 4, },
  { label: '90+ days', count: 1, },
];

const agingBucketsPayables = [
  { label: 'Current', count: 12, },
  { label: '1-15 days overdue', count: 4, },
  { label: '16-30 days overdue', count: 1, },
];

const cashConversionCycleTrend = [
  { month: 'Jan', DSO: 45, DPO: 30, CCC: 15 },
  { month: 'Feb', DSO: 42, DPO: 32, CCC: 10 },
  { month: 'Mar', DSO: 43, DPO: 31, CCC: 12 },
  { month: 'Apr', DSO: 41, DPO: 33, CCC: 8 },
  { month: 'May', DSO: 40, DPO: 34, CCC: 6 },
];

const userDefinedMetrics: MetricData[] = [
  { label: "Total Clients", value: "241", type: "user" },
  { label: "Invoices Sent", value: "5,100", type: "user" },
];

const systemDefinedMetrics: MetricData[] = [
  { label: "Receivables Due", value: "32,400", type: "system" },
  { label: "Expenses Processed", value: "12,200", type: "system" },
  // ...
];


// Helper function to create SVG points string for line chart
function createPoints(arr: number[], width: number, height: number) {
  return arr
    .map((val, i) => {
      const x = (i / (arr.length - 1)) * width;
      const y = height - val;
      return `${x},${y}`;
    })
    .join(" ");
}

const ForecastingPage: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: '1', name: 'If expenses were doubled', active: true },
    { id: '2', name: 'Aggressive collections', active: false },
  ]);
  const [activeScenario, setActiveScenario] = useState('1');

  // Assuming max value for chart scaling is 4 for simplicity
  const maxCashValue = 4;
  const maxFlowValue = 5;
  const chartWidth = 480;
  const chartHeight = 140;

  return (
    <div className="min-h-screen bg-slate-200" >
      <Header />
      <Sidebar />

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header and Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-4xl font-extrabold" style={{ color: 'black' }}>Forecasting</h1>
            <p className="text-gray-700">Visualize monthly cashflow forecasts and test scenarios to optimize decisions.</p>
          </div>
          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 rounded-lg px-4 py-2" style={{ backgroundColor: kyColors.bluePrimary, color: "white" }}
              onClick={() => alert("Add scenario clicked")}>
              <FiPlus size={18} /> Add Scenario
            </button>
            <button className="p-2 rounded-lg hover:bg-white transition" style={{ color: kyColors.grayMidText }}>
              <FiMoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Layout: Scenario selector + charts + metrics */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-300 p-8 flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-56 shrink-0">
            <h3 className="text-xs font-semibold uppercase mb-4 text-gray-600">KPI Forecasts</h3>
            <div className="space-y-2">
              {scenarios.map((sc) => (
                <button
                  key={sc.id}
                  onClick={() => setActiveScenario(sc.id)}
                  className={`w-full text-left px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition
                    ${activeScenario === sc.id ? 'bg-blue-100 text-blue-700' : 'text-gray-800'}`}>
                  {sc.name}
                </button>
              ))}
              <button className="w-full text-left px-4 py-2 text-sm text-gray-400 hover:text-blue-600 hover:bg-gray-50 rounded-lg transition">
                + Add scenario
              </button>
            </div>
          </aside>

          <section className="flex-1 min-w-0 space-y-8">
            {/* Cash Balance Chart */}
            <div className="relative bg-white rounded-xl shadow-inner py-4 px-4 overflow-hidden border border-gray-200" aria-label="Cash Balance Line Chart">
              <h2 className="font-semibold text-gray-700 mb-3">Cash Balance Over Time</h2>

              <svg viewBox={`0 0 ${chartWidth} ${chartHeight}`} width="100%" height="150" aria-hidden="true" >
                <defs>
                  <linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor={kyColors.bluePrimary} stopOpacity="0.2" />
                    <stop offset="100%" stopColor={kyColors.bluePrimary} stopOpacity="0" />
                  </linearGradient>
                </defs>

                <polyline
                  fill="url(#cashGrad)"
                  stroke="none"
                  points={chartDataCashBalance.map((d, i) => {
                    const x = (i / (chartDataCashBalance.length - 1)) * chartWidth;
                    const y = chartHeight - (d.value! / maxCashValue) * (chartHeight - 20);
                    return `${x},${y}`;
                  }).join(" ")}
                />

                <polyline
                  fill="none"
                  stroke={kyColors.bluePrimary}
                  strokeWidth={3}
                  points={chartDataCashBalance.map((d, i) => {
                    const x = (i / (chartDataCashBalance.length - 1)) * chartWidth;
                    const y = chartHeight - (d.value! / maxCashValue) * (chartHeight - 20);
                    return `${x},${y}`;
                  }).join(" ")}
                />

                {chartDataCashBalance.map((d, i) => {
                  const x = (i / (chartDataCashBalance.length - 1)) * chartWidth;
                  const y = chartHeight - (d.value! / maxCashValue) * (chartHeight - 20);
                  return <circle key={i} cx={x} cy={y} r={5} fill="white" stroke={kyColors.bluePrimary} strokeWidth={2} />;
                })}
              </svg>
            </div>

            {/* Operating Cash Flow Breakdown (placeholder) */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="font-semibold text-gray-700 mb-4">Operating Cash Flow Breakdown</h2>
              <div className="text-center text-gray-400 py-24">[Stacked Bar Chart Placeholder]</div>
            </div>

            {/* Aging Analyses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                <h2 className="font-semibold text-gray-700 mb-4">Receivables Aging</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>0-30 days: 18 invoices</li>
                  <li>31-60 days: 7 invoices</li>
                  <li>61-90 days: 4 invoices</li>
                  <li>90+ days: 1 invoice</li>
                </ul>
              </div>
              <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
                <h2 className="font-semibold text-gray-700 mb-4">Payables Aging</h2>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Current: 12 payments</li>
                  <li>1-15 days overdue: 4 payments</li>
                  <li>16-30 days overdue: 1 payment</li>
                </ul>
              </div>
            </div>

            {/* Cash Conversion Cycle Trend (placeholder) */}
            <div className="bg-white rounded-xl shadow p-6 border border-gray-200">
              <h2 className="font-semibold text-gray-700 mb-4">Cash Conversion Cycle Trend</h2>
              <div className="text-center text-gray-400 py-20">
                [Line Chart Placeholder: DSO, DPO, CCC]
              </div>
            </div>
          </section>

          {/* Metrics Sidebar */}
          <aside className="w-64 flex-shrink-0 bg-gray-50 rounded-xl p-5 shadow-inner border border-gray-200">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">Underlying Metrics</h3>
              <p className="text-xs text-gray-400">Jan 2022</p>
            </div>
            <div className="mb-6">
              <h4 className="text-xs font-semibold text-green-700 mb-2">User Defined Metrics</h4>
              {userDefinedMetrics.map(({ label, value }, idx) => (
                <div key={idx} className="flex justify-between py-2 text-sm font-semibold text-gray-700">
                  <span>{label}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
            <div>
              <h4 className="text-xs font-semibold text-green-700 mb-2">System Defined Metrics</h4>
              {systemDefinedMetrics.map(({ label, value }, idx) => (
                <div key={idx} className="flex justify-between py-2 text-sm font-semibold text-gray-700">
                  <span>{label}</span>
                  <span className="text-gray-900">{value}</span>
                </div>
              ))}
            </div>
            <button className="w-full mt-6 bg-blue-50 border border-blue-100 text-blue-700 font-semibold py-2 rounded-lg shadow hover:bg-blue-100 transition">
              <FiHelpCircle className="inline mr-2" /> Need help with metrics?
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ForecastingPage;

