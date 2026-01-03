import React, { useState } from "react";
import {
  FiPlus,
  FiMoreHorizontal,
  FiThumbsUp,
  FiThumbsDown,
  FiHelpCircle,
  FiTrendingUp,
  FiTrendingDown,
} from "react-icons/fi";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const kyColors = {
  bluePrimary: "#3A81F1",
  blueLight: "#AACBFF",
  greenPrimary: "#2DC44F",
  greenLight: "#A3D9A5",
  redPrimary: "#DC2626",
  redLight: "#FCA5A5",
  yellowPrimary: "#F59E0B",
  yellowLight: "#FDE68A",
  grayLight: "#EAF2F5",
  grayDarkText: "#224B21",
  grayMidText: "#475569",
  borderLight: "#B0CAAE",
};

interface Scenario {
  id: string;
  name: string;
  active: boolean;
}

interface MetricData {
  label: string;
  value: string;
  type: "user" | "system";
}

const chartDataCashBalance = [
  { month: "Mar 2021", value: 1.2, forecast: false },
  { month: "Apr 2021", value: 2.1, forecast: false },
  { month: "May 2021", value: 2.3, forecast: false },
  { month: "Jun 2021", value: 2.17, forecast: false },
  { month: "Jul 2021", value: 2.85, forecast: false },
  { month: "Aug 2021", value: 2.79, forecast: false },
  { month: "Sep 2021", value: 3.03, forecast: false },
  { month: "Oct 2021", value: 3.41, forecast: false },
  { month: "Nov 2021", value: 3.18, forecast: false },
  { month: "Dec 2021", value: 3.28, forecast: false },
  { month: "Jan 2022", value: 3.42, forecast: true },
  { month: "Feb 2022", value: 2.87, forecast: true },
  { month: "Mar 2022", value: 2.63, forecast: true },
];

const chartDataOperatingCashFlow = [
  { month: "Jan", inflow: 3.0, outflow: 2.2 },
  { month: "Feb", inflow: 2.8, outflow: 2.1 },
  { month: "Mar", inflow: 3.5, outflow: 2.7 },
  { month: "Apr", inflow: 3.1, outflow: 2.9 },
  { month: "May", inflow: 3.4, outflow: 3.0 },
  { month: "Jun", inflow: 3.6, outflow: 3.1 },
];

const agingBucketsReceivables = [
  {
    label: "0-30 days",
    count: 18,
    amount: 45000,
    color: kyColors.greenPrimary,
  },
  {
    label: "31-60 days",
    count: 7,
    amount: 22000,
    color: kyColors.yellowPrimary,
  },
  { label: "61-90 days", count: 4, amount: 15000, color: kyColors.redLight },
  { label: "90+ days", count: 1, amount: 8000, color: kyColors.redPrimary },
];

const agingBucketsPayables = [
  { label: "Current", count: 12, amount: 35000, color: kyColors.greenPrimary },
  {
    label: "1-15 days overdue",
    count: 4,
    amount: 12000,
    color: kyColors.yellowPrimary,
  },
  {
    label: "16-30 days overdue",
    count: 1,
    amount: 5000,
    color: kyColors.redPrimary,
  },
];

const cashConversionCycleTrend = [
  { month: "Jan", DSO: 45, DPO: 30, CCC: 15 },
  { month: "Feb", DSO: 42, DPO: 32, CCC: 10 },
  { month: "Mar", DSO: 43, DPO: 31, CCC: 12 },
  { month: "Apr", DSO: 41, DPO: 33, CCC: 8 },
  { month: "May", DSO: 40, DPO: 34, CCC: 6 },
  { month: "Jun", DSO: 38, DPO: 36, CCC: 2 },
];

const userDefinedMetrics: MetricData[] = [
  { label: "Total Clients", value: "241", type: "user" },
  { label: "Invoices Sent", value: "5,100", type: "user" },
];

const systemDefinedMetrics: MetricData[] = [
  { label: "Receivables Due", value: "$32,400", type: "system" },
  { label: "Expenses Processed", value: "$12,200", type: "system" },
  { label: "Net Cash Flow", value: "$8,900", type: "system" },
  { label: "Working Capital", value: "$45,600", type: "system" },
];

// Chart Components
const CashBalanceChart: React.FC = () => {
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);
  const maxValue = Math.max(...chartDataCashBalance.map((d) => d.value)) * 1.1;
  const chartWidth = 600;
  const chartHeight = 200;
  const padding = 40;

  return (
    <div className="relative bg-white rounded-xl shadow-sm py-6 px-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">Cash Balance Over Time</h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: kyColors.bluePrimary }}
            ></div>
            <span className="text-gray-600">Actual</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded-full border-2"
              style={{ borderColor: kyColors.bluePrimary }}
            ></div>
            <span className="text-gray-600">Forecast</span>
          </div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight + padding * 2}`}
        width="100%"
        height="280"
      >
        <defs>
          <linearGradient id="cashGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={kyColors.bluePrimary}
              stopOpacity="0.15"
            />
            <stop
              offset="100%"
              stopColor={kyColors.bluePrimary}
              stopOpacity="0"
            />
          </linearGradient>
          <linearGradient id="forecastGradient" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="0%"
              stopColor={kyColors.blueLight}
              stopOpacity="0.1"
            />
            <stop
              offset="100%"
              stopColor={kyColors.blueLight}
              stopOpacity="0"
            />
          </linearGradient>
        </defs>

        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + (i * chartHeight) / 4}
            x2={chartWidth - padding}
            y2={padding + (i * chartHeight) / 4}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}

        {/* Actual data area */}
        <path
          d={`M ${padding} ${
            padding +
            chartHeight -
            (chartDataCashBalance[0].value / maxValue) * chartHeight
          } ${chartDataCashBalance
            .filter((d) => !d.forecast)
            .map((d, i) => {
              const x =
                padding +
                (i / (chartDataCashBalance.length - 1)) *
                  (chartWidth - padding * 2);
              const y =
                padding + chartHeight - (d.value / maxValue) * chartHeight;
              return `L ${x} ${y}`;
            })
            .join(" ")} L ${
            padding +
            ((chartDataCashBalance.filter((d) => !d.forecast).length - 1) /
              (chartDataCashBalance.length - 1)) *
              (chartWidth - padding * 2)
          } ${padding + chartHeight} L ${padding} ${padding + chartHeight} Z`}
          fill="url(#cashGradient)"
        />

        {/* Forecast data area */}
        <path
          d={`M ${
            padding +
            ((chartDataCashBalance.filter((d) => !d.forecast).length - 1) /
              (chartDataCashBalance.length - 1)) *
              (chartWidth - padding * 2)
          } ${
            padding +
            chartHeight -
            (chartDataCashBalance[
              chartDataCashBalance.filter((d) => !d.forecast).length - 1
            ].value /
              maxValue) *
              chartHeight
          } ${chartDataCashBalance
            .filter((d) => d.forecast)
            .map((d, i) => {
              const actualIndex =
                chartDataCashBalance.filter((d) => !d.forecast).length - 1;
              const forecastIndex = actualIndex + i + 1;
              const x =
                padding +
                (forecastIndex / (chartDataCashBalance.length - 1)) *
                  (chartWidth - padding * 2);
              const y =
                padding + chartHeight - (d.value / maxValue) * chartHeight;
              return `L ${x} ${y}`;
            })
            .join(" ")} L ${chartWidth - padding} ${padding + chartHeight} L ${
            padding +
            ((chartDataCashBalance.filter((d) => !d.forecast).length - 1) /
              (chartDataCashBalance.length - 1)) *
              (chartWidth - padding * 2)
          } ${padding + chartHeight} Z`}
          fill="url(#forecastGradient)"
        />

        {/* Actual data line */}
        <polyline
          fill="none"
          stroke={kyColors.bluePrimary}
          strokeWidth="3"
          points={chartDataCashBalance
            .filter((d) => !d.forecast)
            .map((d, i) => {
              const x =
                padding +
                (i / (chartDataCashBalance.length - 1)) *
                  (chartWidth - padding * 2);
              const y =
                padding + chartHeight - (d.value / maxValue) * chartHeight;
              return `${x},${y}`;
            })
            .join(" ")}
        />

        {/* Forecast data line */}
        <polyline
          fill="none"
          stroke={kyColors.bluePrimary}
          strokeWidth="3"
          strokeDasharray="8,4"
          points={chartDataCashBalance
            .filter((d) => d.forecast)
            .map((d, i) => {
              const actualIndex =
                chartDataCashBalance.filter((d) => !d.forecast).length - 1;
              const forecastIndex = actualIndex + i + 1;
              const x =
                padding +
                (forecastIndex / (chartDataCashBalance.length - 1)) *
                  (chartWidth - padding * 2);
              const y =
                padding + chartHeight - (d.value / maxValue) * chartHeight;
              return `${x},${y}`;
            })
            .join(" ")}
        />

        {/* Data points */}
        {chartDataCashBalance.map((d, i) => {
          const x =
            padding +
            (i / (chartDataCashBalance.length - 1)) *
              (chartWidth - padding * 2);
          const y = padding + chartHeight - (d.value / maxValue) * chartHeight;
          return (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={hoveredPoint === i ? 7 : 5}
              fill={d.forecast ? "white" : kyColors.bluePrimary}
              stroke={kyColors.bluePrimary}
              strokeWidth={d.forecast ? 3 : 2}
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
              style={{ cursor: "pointer" }}
            />
          );
        })}

        {/* X-axis labels */}
        {chartDataCashBalance.map((d, i) => {
          if (i % 3 === 0) {
            const x =
              padding +
              (i / (chartDataCashBalance.length - 1)) *
                (chartWidth - padding * 2);
            return (
              <text
                key={i}
                x={x}
                y={padding + chartHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#64748b"
              >
                {d.month.split(" ")[0]}
              </text>
            );
          }
          return null;
        })}

        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <text
            key={i}
            x={padding - 10}
            y={padding + chartHeight - (i * chartHeight) / 4 + 4}
            textAnchor="end"
            fontSize="12"
            fill="#64748b"
          >
            ${i}M
          </text>
        ))}

        {/* Hover tooltip */}
        {hoveredPoint !== null && (
          <g>
            <rect
              x={
                padding +
                (hoveredPoint / (chartDataCashBalance.length - 1)) *
                  (chartWidth - padding * 2) -
                40
              }
              y={
                padding +
                chartHeight -
                (chartDataCashBalance[hoveredPoint].value / maxValue) *
                  chartHeight -
                40
              }
              width="80"
              height="30"
              fill="rgba(0,0,0,0.8)"
              rx="4"
            />
            <text
              x={
                padding +
                (hoveredPoint / (chartDataCashBalance.length - 1)) *
                  (chartWidth - padding * 2)
              }
              y={
                padding +
                chartHeight -
                (chartDataCashBalance[hoveredPoint].value / maxValue) *
                  chartHeight -
                25
              }
              textAnchor="middle"
              fontSize="12"
              fill="white"
            >
              ${chartDataCashBalance[hoveredPoint].value.toFixed(2)}M
            </text>
            <text
              x={
                padding +
                (hoveredPoint / (chartDataCashBalance.length - 1)) *
                  (chartWidth - padding * 2)
              }
              y={
                padding +
                chartHeight -
                (chartDataCashBalance[hoveredPoint].value / maxValue) *
                  chartHeight -
                15
              }
              textAnchor="middle"
              fontSize="10"
              fill="white"
            >
              {chartDataCashBalance[hoveredPoint].month}
            </text>
          </g>
        )}
      </svg>
    </div>
  );
};

const OperatingCashFlowChart: React.FC = () => {
  const maxValue =
    Math.max(
      ...chartDataOperatingCashFlow.flatMap((d) => [d.inflow, d.outflow])
    ) * 1.2;
  const chartWidth = 500;
  const chartHeight = 200;
  const barWidth = 60;
  const padding = 50;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">
          Operating Cash Flow Breakdown
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: kyColors.greenPrimary }}
            ></div>
            <span className="text-gray-600">Inflow</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-3 rounded"
              style={{ backgroundColor: kyColors.redPrimary }}
            ></div>
            <span className="text-gray-600">Outflow</span>
          </div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight + padding * 2}`}
        width="100%"
        height="300"
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + (i * chartHeight) / 4}
            x2={chartWidth - padding}
            y2={padding + (i * chartHeight) / 4}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}

        {chartDataOperatingCashFlow.map((d, i) => {
          const x =
            padding +
            (i * (chartWidth - padding * 2)) /
              (chartDataOperatingCashFlow.length - 1) -
            barWidth / 2;
          const inflowHeight = (d.inflow / maxValue) * chartHeight;
          const outflowHeight = (d.outflow / maxValue) * chartHeight;

          return (
            <g key={i}>
              {/* Inflow bar */}
              <rect
                x={x}
                y={padding + chartHeight - inflowHeight}
                width={barWidth / 2 - 2}
                height={inflowHeight}
                fill={kyColors.greenPrimary}
                rx="2"
              />
              {/* Outflow bar */}
              <rect
                x={x + barWidth / 2}
                y={padding + chartHeight - outflowHeight}
                width={barWidth / 2 - 2}
                height={outflowHeight}
                fill={kyColors.redPrimary}
                rx="2"
              />
              {/* Month label */}
              <text
                x={x + barWidth / 2}
                y={padding + chartHeight + 20}
                textAnchor="middle"
                fontSize="12"
                fill="#64748b"
              >
                {d.month}
              </text>
            </g>
          );
        })}

        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map((i) => (
          <text
            key={i}
            x={padding - 10}
            y={padding + chartHeight - (i * chartHeight) / 4 + 4}
            textAnchor="end"
            fontSize="12"
            fill="#64748b"
          >
            ${i}M
          </text>
        ))}
      </svg>
    </div>
  );
};

const AgingChart: React.FC<{
  data: typeof agingBucketsReceivables;
  title: string;
}> = ({ data, title }) => {
  const total = data.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <h2 className="font-semibold text-gray-700 mb-4">{title}</h2>
      <div className="space-y-3">
        {data.map((item, i) => {
          const percentage = (item.amount / total) * 100;
          return (
            <div key={i} className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-medium">{item.count} items</span>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>${item.amount.toLocaleString()}</span>
                <span>{percentage.toFixed(1)}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: `${percentage}%`,
                    backgroundColor: item.color,
                  }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const CashConversionChart: React.FC = () => {
  const maxValue =
    Math.max(
      ...cashConversionCycleTrend.flatMap((d) => [d.DSO, d.DPO, d.CCC])
    ) * 1.1;
  const chartWidth = 500;
  const chartHeight = 200;
  const padding = 50;

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-gray-700">
          Cash Conversion Cycle Trend
        </h2>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-0.5"
              style={{ backgroundColor: kyColors.bluePrimary }}
            ></div>
            <span className="text-gray-600">DSO</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-0.5"
              style={{ backgroundColor: kyColors.greenPrimary }}
            ></div>
            <span className="text-gray-600">DPO</span>
          </div>
          <div className="flex items-center gap-2">
            <div
              className="w-3 h-0.5"
              style={{ backgroundColor: kyColors.yellowPrimary }}
            ></div>
            <span className="text-gray-600">CCC</span>
          </div>
        </div>
      </div>

      <svg
        viewBox={`0 0 ${chartWidth} ${chartHeight + padding * 2}`}
        width="100%"
        height="300"
      >
        {/* Grid lines */}
        {[0, 1, 2, 3, 4, 5].map((i) => (
          <line
            key={i}
            x1={padding}
            y1={padding + (i * chartHeight) / 5}
            x2={chartWidth - padding}
            y2={padding + (i * chartHeight) / 5}
            stroke="#f1f5f9"
            strokeWidth="1"
          />
        ))}

        {/* DSO line */}
        <polyline
          fill="none"
          stroke={kyColors.bluePrimary}
          strokeWidth="3"
          points={cashConversionCycleTrend
            .map((d, i) => {
              const x =
                padding +
                (i / (cashConversionCycleTrend.length - 1)) *
                  (chartWidth - padding * 2);
              const y =
                padding + chartHeight - (d.DSO / maxValue) * chartHeight;
              return `${x},${y}`;
            })
            .join(" ")}
        />

        {/* DPO line */}
        <polyline
          fill="none"
          stroke={kyColors.greenPrimary}
          strokeWidth="3"
          points={cashConversionCycleTrend
            .map((d, i) => {
              const x =
                padding +
                (i / (cashConversionCycleTrend.length - 1)) *
                  (chartWidth - padding * 2);
              const y =
                padding + chartHeight - (d.DPO / maxValue) * chartHeight;
              return `${x},${y}`;
            })
            .join(" ")}
        />

        {/* CCC line */}
        <polyline
          fill="none"
          stroke={kyColors.yellowPrimary}
          strokeWidth="3"
          points={cashConversionCycleTrend
            .map((d, i) => {
              const x =
                padding +
                (i / (cashConversionCycleTrend.length - 1)) *
                  (chartWidth - padding * 2);
              const y =
                padding + chartHeight - (d.CCC / maxValue) * chartHeight;
              return `${x},${y}`;
            })
            .join(" ")}
        />

        {/* Data points */}
        {cashConversionCycleTrend.map((d, i) => {
          const x =
            padding +
            (i / (cashConversionCycleTrend.length - 1)) *
              (chartWidth - padding * 2);
          return (
            <g key={i}>
              <circle
                cx={x}
                cy={padding + chartHeight - (d.DSO / maxValue) * chartHeight}
                r="4"
                fill={kyColors.bluePrimary}
              />
              <circle
                cx={x}
                cy={padding + chartHeight - (d.DPO / maxValue) * chartHeight}
                r="4"
                fill={kyColors.greenPrimary}
              />
              <circle
                cx={x}
                cy={padding + chartHeight - (d.CCC / maxValue) * chartHeight}
                r="4"
                fill={kyColors.yellowPrimary}
              />
            </g>
          );
        })}

        {/* X-axis labels */}
        {cashConversionCycleTrend.map((d, i) => (
          <text
            key={i}
            x={
              padding +
              (i / (cashConversionCycleTrend.length - 1)) *
                (chartWidth - padding * 2)
            }
            y={padding + chartHeight + 20}
            textAnchor="middle"
            fontSize="12"
            fill="#64748b"
          >
            {d.month}
          </text>
        ))}

        {/* Y-axis labels */}
        {[0, 10, 20, 30, 40, 50].map((i) => (
          <text
            key={i}
            x={padding - 10}
            y={padding + chartHeight - (i / 50) * chartHeight + 4}
            textAnchor="end"
            fontSize="12"
            fill="#64748b"
          >
            {i}
          </text>
        ))}
      </svg>
    </div>
  );
};

const ForecastingPage: React.FC = () => {
  const [scenarios, setScenarios] = useState<Scenario[]>([
    { id: "1", name: "If expenses were doubled", active: true },
    { id: "2", name: "Aggressive collections", active: false },
    { id: "3", name: "Conservative growth", active: false },
  ]);
  const [activeScenario, setActiveScenario] = useState("1");
  const [showAddScenario, setShowAddScenario] = useState(false);
  const [newScenarioName, setNewScenarioName] = useState("");

  const addScenario = () => {
    if (newScenarioName.trim()) {
      const newScenario: Scenario = {
        id: Date.now().toString(),
        name: newScenarioName,
        active: false,
      };
      setScenarios([...scenarios, newScenario]);
      setNewScenarioName("");
      setShowAddScenario(false);
    }
  };

  const getScenarioImpact = (scenarioId: string) => {
    switch (scenarioId) {
      case "1":
        return { trend: "down", impact: -15.2, color: kyColors.redPrimary };
      case "2":
        return { trend: "up", impact: +8.7, color: kyColors.greenPrimary };
      case "3":
        return { trend: "up", impact: +3.2, color: kyColors.greenPrimary };
      default:
        return { trend: "neutral", impact: 0, color: kyColors.grayMidText };
    }
  };

  const currentImpact = getScenarioImpact(activeScenario);

  return (
    <div className="min-h-screen bg-slate-200">
      <Header />
      <Sidebar />

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Header and Actions */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-extrabold text-black">Forecasting</h1>
            <p className="text-gray-700">
              Visualize monthly cashflow forecasts and test scenarios to
              optimize decisions.
            </p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg">
              {currentImpact.trend === "up" ? (
                <FiTrendingUp style={{ color: currentImpact.color }} />
              ) : currentImpact.trend === "down" ? (
                <FiTrendingDown style={{ color: currentImpact.color }} />
              ) : null}
              <span
                className="text-sm font-medium"
                style={{ color: currentImpact.color }}
              >
                {currentImpact.impact > 0 ? "+" : ""}
                {currentImpact.impact}%
              </span>
              <span className="text-sm text-gray-500">impact</span>
            </div>
            <button
              className="flex items-center gap-2 rounded-lg px-4 py-2 hover:opacity-90 transition"
              style={{ backgroundColor: kyColors.bluePrimary, color: "white" }}
              onClick={() => setShowAddScenario(true)}
            >
              <FiPlus size={18} /> Add Scenario
            </button>
            <button
              className="p-2 rounded-lg hover:bg-white transition"
              style={{ color: kyColors.grayMidText }}
            >
              <FiMoreHorizontal size={18} />
            </button>
          </div>
        </div>

        {/* Add Scenario Modal */}
        {showAddScenario && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-6 max-w-md w-full mx-4">
              <h3 className="text-lg font-semibold mb-4">Add New Scenario</h3>
              <input
                type="text"
                value={newScenarioName}
                onChange={(e) => setNewScenarioName(e.target.value)}
                placeholder="Enter scenario name..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                onKeyPress={(e) => e.key === "Enter" && addScenario()}
              />
              <div className="flex gap-3 mt-4">
                <button
                  onClick={addScenario}
                  className="flex-1 py-2 px-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Add Scenario
                </button>
                <button
                  onClick={() => {
                    setShowAddScenario(false);
                    setNewScenarioName("");
                  }}
                  className="flex-1 py-2 px-4 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Layout: Scenario selector + charts + metrics */}
        <div className="bg-white rounded-2xl shadow-lg border-gray-300 p-8 flex flex-col lg:flex-row gap-8">
          <aside className="w-full lg:w-64 shrink-0">
            <h3 className="text-xs font-semibold uppercase mb-4 text-gray-600">
              KPI Forecasts
            </h3>
            <div className="space-y-2">
              {scenarios.map((sc) => {
                const impact = getScenarioImpact(sc.id);
                return (
                  <button
                    key={sc.id}
                    onClick={() => setActiveScenario(sc.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg font-medium hover:bg-gray-100 transition 
                      ${
                        activeScenario === sc.id
                          ? "bg-blue-50 text-blue-700 border-blue-200"
                          : "text-gray-800 "
                      }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{sc.name}</span>
                      {impact.impact !== 0 && (
                        <span
                          className="text-xs px-2 py-1 rounded"
                          style={{
                            backgroundColor:
                              impact.impact > 0
                                ? kyColors.greenLight
                                : kyColors.redLight,
                            color: impact.color,
                          }}
                        >
                          {impact.impact > 0 ? "+" : ""}
                          {impact.impact}%
                        </span>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          </aside>

          <section className="flex-1 min-w-0 space-y-8">
            {/* Cash Balance Chart */}
            <CashBalanceChart />

            {/* Operating Cash Flow Chart */}
            <OperatingCashFlowChart />

            {/* Aging Analyses */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <AgingChart
                data={agingBucketsReceivables}
                title="Receivables Aging"
              />
              <AgingChart data={agingBucketsPayables} title="Payables Aging" />
            </div>

            {/* Cash Conversion Cycle Trend */}
            <CashConversionChart />
          </section>

          {/* Metrics Sidebar */}
          <aside className="w-64 flex-shrink-0 bg-gray-50 rounded-xl p-5 shadow-inner border border-gray-200">
            <div className="mb-6">
              <h3 className="text-xs font-semibold text-gray-500 mb-1 uppercase tracking-wide">
                Underlying Metrics
              </h3>
              <p className="text-xs text-gray-400">Jan 2022</p>
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-green-700 mb-3">
                User Defined Metrics
              </h4>
              {userDefinedMetrics.map(({ label, value }, idx) => (
                <div key={idx} className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            <div className="mb-6">
              <h4 className="text-xs font-semibold text-green-700 mb-3">
                System Defined Metrics
              </h4>
              {systemDefinedMetrics.map(({ label, value }, idx) => (
                <div key={idx} className="flex justify-between py-2 text-sm">
                  <span className="text-gray-600">{label}</span>
                  <span className="font-semibold text-gray-900">{value}</span>
                </div>
              ))}
            </div>

            <div className="border-t border-gray-200 pt-4">
              <div className="text-xs text-gray-500 mb-2">Scenario Impact</div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Cash Position</span>
                <div className="flex items-center gap-1">
                  {currentImpact.trend === "up" ? (
                    <FiTrendingUp
                      size={14}
                      style={{ color: currentImpact.color }}
                    />
                  ) : currentImpact.trend === "down" ? (
                    <FiTrendingDown
                      size={14}
                      style={{ color: currentImpact.color }}
                    />
                  ) : null}
                  <span
                    className="text-sm font-semibold"
                    style={{ color: currentImpact.color }}
                  >
                    {currentImpact.impact > 0 ? "+" : ""}
                    {currentImpact.impact}%
                  </span>
                </div>
              </div>
            </div>

            <button className="w-full mt-6 bg-blue-50 border border-blue-100 text-blue-700 font-semibold py-2 rounded-lg shadow hover:bg-blue-100 transition">
              <FiHelpCircle className="inline mr-2" /> Help with Metrics?
            </button>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default ForecastingPage;
