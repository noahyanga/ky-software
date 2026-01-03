import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  FiUpload,
  FiFile,
  FiLoader,
  FiTrendingUp,
  FiTrendingDown,
  FiBarChart,
  FiDollarSign,
  FiCalendar,
  FiDownload,
  FiAlertTriangle,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";

type LineItem = {
  label: string;
  valueA: number;
  valueB: number;
  category?: "positive" | "negative" | "neutral";
  description?: string;
};

type Section = {
  id: string;
  title: string;
  subtitle: string;
  lines: LineItem[];
  color: string;
  icon: any;
};

const SECTIONS: Section[] = [
  {
    id: "income",
    title: "Income Statement",
    subtitle: "Revenue & Profitability",
    icon: FiTrendingUp,
    color: "emerald",
    lines: [
      {
        label: "Total Revenue",
        valueA: 1_104_500,
        valueB: 993_000,
        category: "positive",
        description: "Total income from all business activities",
      },
      {
        label: "Cost of Goods Sold",
        valueA: 750_304,
        valueB: 625_796,
        category: "negative",
        description: "Direct costs to produce goods/services",
      },
      {
        label: "Gross Profit",
        valueA: 354_196,
        valueB: 367_204,
        category: "positive",
        description: "Revenue minus cost of goods sold",
      },
      {
        label: "Operating Expenses",
        valueA: 275_304,
        valueB: 225_796,
        category: "negative",
        description: "Day-to-day business operating costs",
      },
      {
        label: "Net Income",
        valueA: 78_892,
        valueB: 141_408,
        category: "positive",
        description: "Final profit after all expenses",
      },
    ],
  },
  {
    id: "balance",
    title: "Balance Sheet",
    subtitle: "Assets & Financial Position",
    icon: FiBarChart,
    color: "blue",
    lines: [
      {
        label: "Cash & Equivalents",
        valueA: 225_000,
        valueB: 110_000,
        category: "positive",
        description: "Liquid assets readily available",
      },
      {
        label: "Accounts Receivable",
        valueA: 280_000,
        valueB: 295_000,
        category: "positive",
        description: "Money owed by customers",
      },
      {
        label: "Total Assets",
        valueA: 766_669,
        valueB: 712_285,
        category: "positive",
        description: "Everything the company owns",
      },
      {
        label: "Total Liabilities",
        valueA: 216_825,
        valueB: 244_000,
        category: "negative",
        description: "What the company owes",
      },
      {
        label: "Shareholders' Equity",
        valueA: 549_844,
        valueB: 468_285,
        category: "positive",
        description: "Owner's stake in the company",
      },
    ],
  },
  {
    id: "cashflow",
    title: "Cash Flow Statement",
    subtitle: "Cash Movement & Liquidity",
    icon: FiDollarSign,
    color: "purple",
    lines: [
      {
        label: "Operating Cash Flow",
        valueA: 184_000,
        valueB: 188_900,
        category: "positive",
        description: "Cash from core business operations",
      },
      {
        label: "Investing Cash Flow",
        valueA: -45_000,
        valueB: -120_000,
        category: "negative",
        description: "Cash used for investments",
      },
      {
        label: "Financing Cash Flow",
        valueA: -24_000,
        valueB: -53_900,
        category: "negative",
        description: "Cash from loans, equity, dividends",
      },
      {
        label: "Net Cash Change",
        valueA: 115_000,
        valueB: 15_000,
        category: "positive",
        description: "Overall change in cash position",
      },
      {
        label: "Ending Cash Balance",
        valueA: 225_000,
        valueB: 110_000,
        category: "positive",
        description: "Cash available at period end",
      },
    ],
  },
];

type UploadedFile = {
  id: number;
  name: string;
  date: string;
  size: string;
  period: string;
};

type KeyMetric = {
  label: string;
  value: string | number;
  change: number;
  description: string;
  format: "currency" | "percentage" | "ratio";
  trend: "up" | "down" | "neutral";
};

function formatCurrency(n: number) {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toLocaleString()}`;
}

function formatPercentage(n: number) {
  return `${n.toFixed(1)}%`;
}

function diffPct(a: number, b: number) {
  if (b === 0) return null;
  return ((a - b) / Math.abs(b)) * 100;
}

function calculateKeyMetrics(sections: Section[]): KeyMetric[] {
  const incomeSection = sections.find((s) => s.id === "income");
  const balanceSection = sections.find((s) => s.id === "balance");
  const cashflowSection = sections.find((s) => s.id === "cashflow");

  if (!incomeSection || !balanceSection || !cashflowSection) return [];

  const revenue = incomeSection.lines.find((l) => l.label === "Total Revenue");
  const netIncome = incomeSection.lines.find((l) => l.label === "Net Income");
  const totalAssets = balanceSection.lines.find(
    (l) => l.label === "Total Assets"
  );
  const equity = balanceSection.lines.find(
    (l) => l.label === "Shareholders' Equity"
  );
  const operatingCash = cashflowSection.lines.find(
    (l) => l.label === "Operating Cash Flow"
  );

  const metrics: KeyMetric[] = [];

  if (revenue) {
    const change = diffPct(revenue.valueA, revenue.valueB) || 0;
    metrics.push({
      label: "Revenue Growth",
      value: formatPercentage(change),
      change,
      description: "Year-over-year revenue change",
      format: "percentage",
      trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
    });
  }

  if (netIncome && revenue) {
    const marginA = (netIncome.valueA / revenue.valueA) * 100;
    const marginB = (netIncome.valueB / revenue.valueB) * 100;
    const change = marginA - marginB;
    metrics.push({
      label: "Net Profit Margin",
      value: formatPercentage(marginA),
      change,
      description: "Net income as % of revenue",
      format: "percentage",
      trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
    });
  }

  if (netIncome && equity) {
    const roeA = (netIncome.valueA / equity.valueA) * 100;
    const roeB = (netIncome.valueB / equity.valueB) * 100;
    const change = roeA - roeB;
    metrics.push({
      label: "Return on Equity",
      value: formatPercentage(roeA),
      change,
      description: "Efficiency in generating profit from equity",
      format: "percentage",
      trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
    });
  }

  if (operatingCash) {
    const change = diffPct(operatingCash.valueA, operatingCash.valueB) || 0;
    metrics.push({
      label: "Operating Cash Flow",
      value: formatCurrency(operatingCash.valueA),
      change,
      description: "Cash generated from operations",
      format: "currency",
      trend: change > 0 ? "up" : change < 0 ? "down" : "neutral",
    });
  }

  return metrics;
}

function MetricCard({
  line,
  showCompare,
  labelA,
  labelB,
}: {
  line: LineItem;
  showCompare: boolean;
  labelA: string;
  labelB: string;
}) {
  const pct = showCompare ? diffPct(line.valueA, line.valueB) : null;
  const isPositiveChange = pct !== null && pct > 0;
  const isNegativeChange = pct !== null && pct < 0;

  return (
    <div className="bg-gray-50 rounded-xl p-4 hover:bg-gray-100 transition-colors duration-200">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <h4 className="font-semibold text-gray-900 text-sm mb-1">
            {line.label}
          </h4>
          {line.description && (
            <p className="text-xs text-gray-500 leading-relaxed">
              {line.description}
            </p>
          )}
        </div>
        {pct !== null && (
          <div
            className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-semibold ${
              isPositiveChange
                ? "bg-emerald-100 text-emerald-700"
                : isNegativeChange
                ? "bg-red-100 text-red-700"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            {isPositiveChange && <FiTrendingUp size={12} />}
            {isNegativeChange && <FiTrendingDown size={12} />}
            {pct.toFixed(1)}%
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 gap-3">
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 uppercase tracking-wide">
            {showCompare ? "Current" : "Amount"}
          </span>
          <span
            className={`font-bold text-lg ${
              line.category === "positive"
                ? "text-emerald-600"
                : line.category === "negative"
                ? "text-red-600"
                : "text-gray-900"
            }`}
          >
            {formatCurrency(line.valueA)}
          </span>
        </div>

        {showCompare && (
          <div className="flex justify-between items-center pt-2 border-t border-gray-200">
            <span className="text-xs text-gray-500 uppercase tracking-wide">
              Previous
            </span>
            <span className="font-semibold text-gray-700">
              {formatCurrency(line.valueB)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}

function KeyMetricsPanel({ metrics }: { metrics: KeyMetric[] }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-blue-100 rounded-lg">
          <FiBarChart className="text-blue-600" size={20} />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-gray-900">
            Key Financial Ratios
          </h2>
          <p className="text-sm text-gray-600">Important metrics at a glance</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {metrics.map((metric, index) => (
          <div
            key={index}
            className="bg-gradient-to-br from-gray-50 to-white rounded-xl p-4 border border-gray-100"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                {metric.trend === "up" && (
                  <FiTrendingUp className="text-emerald-500" size={16} />
                )}
                {metric.trend === "down" && (
                  <FiTrendingDown className="text-red-500" size={16} />
                )}
                {metric.trend === "neutral" && (
                  <div className="w-4 h-4 bg-gray-400 rounded-full" />
                )}
                <span className="text-xs font-medium text-gray-600 uppercase tracking-wide">
                  {metric.label}
                </span>
              </div>
            </div>

            <div className="mb-2">
              <span className="text-2xl font-bold text-gray-900">
                {metric.value}
              </span>
            </div>

            <p className="text-xs text-gray-500 leading-relaxed">
              {metric.description}
            </p>

            {metric.change !== 0 && (
              <div
                className={`mt-2 text-xs font-semibold ${
                  metric.change > 0 ? "text-emerald-600" : "text-red-600"
                }`}
              >
                {metric.change > 0 ? "+" : ""}
                {metric.change.toFixed(1)}% vs previous period
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function FinancialsPage() {
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [selectedFile, setSelectedFile] = useState<UploadedFile | null>(null);
  const [compareFile, setCompareFile] = useState<UploadedFile | null>(null);
  const [viewMode, setViewMode] = useState<"single" | "compare">("single");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setIsProcessing(true);

    setTimeout(() => {
      const files: UploadedFile[] = [
        {
          id: 1,
          name: "Annual Report 2023.pdf",
          date: "Dec 31, 2023",
          size: "245.3 KB",
          period: "FY 2023",
        },
        {
          id: 2,
          name: "Annual Report 2022.pdf",
          date: "Dec 31, 2022",
          size: "231.0 KB",
          period: "FY 2022",
        },
      ];
      setUploadedFiles(files);
      setSelectedFile(files[0]);
      setCompareFile(files[1]);
      setIsProcessing(false);
      setViewMode("compare");
    }, 2000);
  };

  const showCompare = viewMode === "compare" && compareFile;
  const keyMetrics = calculateKeyMetrics(SECTIONS);

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <Sidebar />

      <main className="max-w-7xl mx-auto py-8 px-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-3">
              Financial Reports
            </h1>
            <p className="text-lg text-gray-600">
              Upload and analyze financial statements with automated insights
              and comparisons.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <label className="bg-white border-2 border-dashed border-gray-300 rounded-xl px-6 py-3 cursor-pointer hover:border-blue-400 hover:bg-blue-50 transition-all duration-200 flex items-center gap-3 shadow-sm">
              <FiUpload className="w-5 h-5 text-blue-600" />
              <span className="font-medium text-gray-700">Upload Reports</span>
              <input
                type="file"
                multiple
                onChange={handleUpload}
                className="hidden"
                accept=".pdf,.xlsx,.csv"
              />
            </label>

            {selectedFile && (
              <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-3 rounded-xl hover:bg-blue-700 transition-colors">
                <FiDownload size={18} />
                Export Analysis
              </button>
            )}
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar with files */}
          <div className="w-80 flex-shrink-0 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-gray-100 rounded-lg">
                  <FiFile className="w-5 h-5 text-gray-600" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">
                  Uploaded Files ({uploadedFiles.length})
                </h2>
              </div>

              <div className="space-y-3 max-h-96 overflow-y-auto">
                {uploadedFiles.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <FiFile className="w-8 h-8 mx-auto mb-2 opacity-40" />
                    <p className="text-sm">No files uploaded yet</p>
                  </div>
                )}

                {uploadedFiles.map((file) => (
                  <button
                    key={file.id}
                    onClick={() => setSelectedFile(file)}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 ${
                      selectedFile?.id === file.id
                        ? "bg-blue-50 border-blue-300 shadow-sm"
                        : "bg-gray-50 border-gray-200 hover:bg-white hover:shadow-sm"
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-3 h-3 rounded-full mt-1 ${
                          selectedFile?.id === file.id
                            ? "bg-blue-500"
                            : "bg-gray-300"
                        }`}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate mb-1">
                          {file.name}
                        </p>
                        <div className="space-y-1">
                          <p className="text-xs text-gray-500">
                            {file.period} • {file.date}
                          </p>
                          <p className="text-xs text-gray-400">{file.size}</p>
                        </div>
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              {uploadedFiles.length > 1 && (
                <div className="mt-6 pt-4 border-t border-gray-200">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Compare with
                  </label>
                  <select
                    value={compareFile?.id || ""}
                    onChange={(e) =>
                      setCompareFile(
                        uploadedFiles.find(
                          (f) => f.id === Number(e.target.value)
                        ) || null
                      )
                    }
                    className="w-full p-3 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="">Select comparison file</option>
                    {uploadedFiles
                      .filter((f) => f.id !== selectedFile?.id)
                      .map((f) => (
                        <option key={f.id} value={f.id}>
                          {f.period} - {f.name}
                        </option>
                      ))}
                  </select>
                </div>
              )}
            </div>

            {/* Quick insights panel */}
            {selectedFile && !isProcessing && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Quick Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-3 bg-emerald-50 rounded-lg">
                    <FiCheckCircle
                      className="text-emerald-600 mt-0.5"
                      size={16}
                    />
                    <div>
                      <p className="text-sm font-medium text-emerald-800">
                        Healthy Cash Position
                      </p>
                      <p className="text-xs text-emerald-600">
                        Strong liquid assets
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <FiAlertTriangle
                      className="text-yellow-600 mt-0.5"
                      size={16}
                    />
                    <div>
                      <p className="text-sm font-medium text-yellow-800">
                        Monitor Expenses
                      </p>
                      <p className="text-xs text-yellow-600">
                        Operating costs increased
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <FiInfo className="text-blue-600 mt-0.5" size={16} />
                    <div>
                      <p className="text-sm font-medium text-blue-800">
                        Growth Opportunity
                      </p>
                      <p className="text-xs text-blue-600">
                        Revenue trending upward
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Main content */}
          <div className="flex-1 space-y-6">
            {/* View mode toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode("single")}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  viewMode === "single"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white border border-gray-200 text-gray-700 hover:shadow-sm"
                }`}
              >
                Single View
              </button>
              <button
                onClick={() => setViewMode("compare")}
                className={`px-6 py-3 rounded-xl font-medium text-sm transition-all duration-200 ${
                  viewMode === "compare"
                    ? "bg-blue-600 text-white shadow-lg"
                    : "bg-white border border-gray-200 text-gray-700 hover:shadow-sm"
                }`}
                disabled={uploadedFiles.length < 2}
              >
                Compare View
              </button>
            </div>

            {isProcessing && (
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 py-16 flex flex-col justify-center items-center">
                <div className="mb-4">
                  <FiLoader className="text-4xl text-blue-500 animate-spin" />
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Processing Financial Statements
                </h3>
                <p className="text-gray-600 text-center max-w-md">
                  Analyzing your financial data and calculating key metrics.
                  This usually takes a few moments.
                </p>
              </div>
            )}

            {!isProcessing && selectedFile && (
              <>
                {/* Status indicator */}
                <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FiCalendar className="text-blue-600" size={18} />
                    <span className="font-medium text-blue-900">
                      {showCompare && compareFile
                        ? `Comparing ${selectedFile.period} vs ${compareFile.period}`
                        : `Viewing ${selectedFile.period}`}
                    </span>
                  </div>
                  {showCompare && compareFile && (
                    <span className="text-sm text-blue-700">
                      Period-over-period analysis
                    </span>
                  )}
                </div>

                {/* Key metrics */}
                {keyMetrics.length > 0 && (
                  <KeyMetricsPanel metrics={keyMetrics} />
                )}

                {/* Financial statements */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {SECTIONS.map((section) => {
                    const Icon = section.icon;
                    const colorClasses = {
                      emerald: "bg-emerald-100 text-emerald-600",
                      blue: "bg-blue-100 text-blue-600",
                      purple: "bg-purple-100 text-purple-600",
                    };

                    return (
                      <div
                        key={section.id}
                        className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden"
                      >
                        <div className="p-6 border-b border-gray-100">
                          <div className="flex items-center gap-3 mb-2">
                            <div
                              className={`p-2 rounded-lg ${
                                colorClasses[
                                  section.color as keyof typeof colorClasses
                                ]
                              }`}
                            >
                              <Icon size={20} />
                            </div>
                            <h2 className="text-lg font-semibold text-gray-900">
                              {section.title}
                            </h2>
                          </div>
                          <p className="text-sm text-gray-600">
                            {section.subtitle}
                          </p>
                        </div>

                        <div className="p-6 space-y-4">
                          {section.lines.map((line) => (
                            <MetricCard
                              key={line.label}
                              line={line}
                              showCompare={!!showCompare}
                              labelA={selectedFile.name}
                              labelB={compareFile?.name || ""}
                            />
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {!isProcessing && !selectedFile && (
              <div className="bg-white rounded-xl shadow-sm border-2 border-dashed border-gray-300 p-16 text-center">
                <FiUpload className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Ready to Analyze Your Financials
                </h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  Upload your financial statements (PDF, Excel, or CSV) to get
                  started with automated analysis and insights.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
