import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FiUpload, FiFile, FiLoader } from "react-icons/fi";

type LineItem = {
  label: string;
  valueA: number;
  valueB: number;
};

type Section = {
  id: string;
  title: string;
  subtitle: string;
  lines: LineItem[];
};

const SECTIONS: Section[] = [
  {
    id: "income",
    title: "Income Statement",
    subtitle: "Key P&L metrics",
    lines: [
      { label: "Gross Revenue", valueA: 1_104_500, valueB: 993_000 },
      { label: "Cost of Goods Sold", valueA: 750_304, valueB: 625_796 },
      { label: "Gross Profit", valueA: 354_196, valueB: 367_204 },
      { label: "Operating Expenses", valueA: 750_304, valueB: 625_796 },
      { label: "Net Income", valueA: 221_559, valueB: 336_275 },
    ],
  },
  {
    id: "balance",
    title: "Balance Sheet",
    subtitle: "Assets & equity snapshot",
    lines: [
      { label: "Cash & Equivalents", valueA: 225_000, valueB: 110_000 },
      { label: "Accounts Receivable", valueA: 280_000, valueB: 295_000 },
      { label: "Total Assets", valueA: 766_669, valueB: 712_285 },
      { label: "Total Liabilities", valueA: 216_825, valueB: 244_000 },
      { label: "Shareholders’ Equity", valueA: 549_844, valueB: 393_285 },
    ],
  },
  {
    id: "cashflow",
    title: "Cash Flow",
    subtitle: "Movement in cash",
    lines: [
      { label: "Net Cash from Operations", valueA: 184_000, valueB: 388_900 },
      { label: "Net Cash from Investing", valueA: -10_000, valueB: -120_000 },
      { label: "Net Cash from Financing", valueA: -59_000, valueB: -253_900 },
      { label: "Net Change in Cash", valueA: 115_000, valueB: 15_000 },
      { label: "Ending Cash Balance", valueA: 225_000, valueB: 110_000 },
    ],
  },
];

type UploadedFile = {
  id: number;
  name: string;
  date: string;
  size: string;
};

function formatCurrency(n: number) {
  const sign = n < 0 ? "-" : "";
  const abs = Math.abs(n);
  if (abs >= 1_000_000) return `${sign}$${(abs / 1_000_000).toFixed(1)}M`;
  if (abs >= 1_000) return `${sign}$${(abs / 1_000).toFixed(1)}K`;
  return `${sign}$${abs.toLocaleString()}`;
}

function diffPct(a: number, b: number) {
  if (b === 0) return null;
  return ((a - b) / Math.abs(b)) * 100;
}

function MetricRow({
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
  const pctColor =
    pct == null ? "text-gray-400" : pct >= 0 ? "text-emerald-600" : "text-rose-600";

  return (
    <div className="py-4 border-b border-gray-100">
      <div className="text-xs font-medium text-gray-800 mb-1">{line.label}</div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-baseline">
        {/* File A */}
        <div className="flex flex-col">
          <span className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">
            {labelA}
          </span>
          <span className="text-xl font-semibold text-gray-900">
            {formatCurrency(line.valueA)}
          </span>
        </div>

        {/* File B (optional) */}
        {showCompare && (
          <div className="flex flex-col">
            <span className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">
              {labelB}
            </span>
            <span className="text-xl font-semibold text-gray-900">
              {formatCurrency(line.valueB)}
            </span>
          </div>
        )}

        {/* Change (optional, only when comparing) */}
        {showCompare && (
          <div className="flex flex-col md:items-end">
            <span className="text-xs uppercase tracking-wide text-gray-500 mb-0.5">
              Change
            </span>
            <span className={`text-sm font-semibold ${pctColor}`}>
              {pct == null ? "–" : `${pct.toFixed(1)}%`}
            </span>
          </div>
        )}
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
          name: "FY 2023 Financials.pdf",
          date: "Nov 29, 2025",
          size: "245.3 KB",
        },
        {
          id: 2,
          name: "FY 2022 Financials.pdf",
          date: "Nov 29, 2024",
          size: "231.0 KB",
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

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <Sidebar />

      <main className="max-w-7xl mx-auto py-10 px-6 space-y-8">
        {/* Title + upload */}
        <header className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 mb-2">
              Financial Report Analysis
            </h1>
            <p className="text-gray-600 max-w-2xl">
              Upload, view a single report, or compare two fiscal years side by side.
            </p>
          </div>
          <label className="bg-white border-2 border-dashed border-gray-300 rounded-2xl px-8 py-4 text-center cursor-pointer hover:border-emerald-300 hover:bg-emerald-50 transition-all duration-200 flex items-center gap-3 shadow-md hover:shadow-lg">
            <FiUpload className="w-6 h-6 text-emerald-500" />
            <span className="font-medium text-gray-700">Upload Statements</span>
            <input
              type="file"
              multiple
              onChange={handleUpload}
              className="hidden"
              accept=".pdf,.xlsx,.csv"
            />
          </label>
        </header>

        <section className="flex gap-8">
          {/* Files list */}
          <aside className="w-80 flex-shrink-0 bg-white rounded-2xl shadow border border-gray-200 p-6">
            <div className="flex items-center gap-3 mb-4">
              <FiFile className="w-5 h-5 text-gray-500" />
              <h2 className="text-lg font-semibold text-gray-900">
                Uploaded Files ({uploadedFiles.length})
              </h2>
            </div>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {uploadedFiles.map((file) => (
                <button
                  key={file.id}
                  onClick={() => setSelectedFile(file)}
                  className={
                    "w-full text-left px-3 py-3 rounded-xl border flex items-center gap-3 text-sm transition " +
                    (selectedFile?.id === file.id
                      ? "bg-emerald-50 border-emerald-300 shadow-sm"
                      : "bg-white border-gray-200 hover:bg-gray-50")
                  }
                >
                  <div
                    className={
                      "w-2 h-2 rounded-full " +
                      (selectedFile?.id === file.id
                        ? "bg-emerald-500"
                        : "bg-gray-300")
                    }
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">
                      {file.name}
                    </p>
                    <p className="text-[11px] text-gray-500">
                      {file.date} • {file.size}
                    </p>
                  </div>
                </button>
              ))}
            </div>

            {/* Compare selector */}
            {uploadedFiles.length > 1 && (
              <div className="mt-4 border-t pt-4 space-y-2">
                <p className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                  Compare with
                </p>
                <select
                  value={compareFile?.id || ""}
                  onChange={(e) =>
                    setCompareFile(
                      uploadedFiles.find((f) => f.id === Number(e.target.value)) ||
                      null
                    )
                  }
                  className="w-full p-2.5 border border-gray-200 rounded-xl text-sm focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="">Select file</option>
                  {uploadedFiles
                    .filter((f) => f.id !== selectedFile?.id)
                    .map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name}
                      </option>
                    ))}
                </select>
              </div>
            )}
          </aside>

          {/* Right side */}
          <div className="flex-1 space-y-6">
            {/* View toggle */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => setViewMode("single")}
                className={`px-6 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${viewMode === "single"
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-white border border-gray-200 hover:shadow-md"
                  }`}
              >
                Single Report
              </button>
              <button
                onClick={() => setViewMode("compare")}
                className={`px-6 py-2 rounded-xl font-medium text-sm transition-all duration-200 ${viewMode === "compare"
                  ? "bg-emerald-600 text-white shadow-lg"
                  : "bg-white border border-gray-200 hover:shadow-md"
                  }`}
                disabled={uploadedFiles.length < 2}
              >
                Compare Reports
              </button>
            </div>

            {isProcessing && (
              <div className="bg-white rounded-3xl shadow-xl border border-gray-200 py-16 flex flex-col justify-center items-center">
                <div className="mb-4">
                  <span className="inline-block text-4xl text-emerald-400 animate-spin">
                    <FiLoader />
                  </span>
                </div>
                <h3 className="font-semibold text-gray-900 text-lg mb-2">
                  Processing Statements
                </h3>
                <p className="text-gray-500 text-sm">
                  Parsing and analyzing your financial data. This usually takes a few seconds.
                </p>
              </div>
            )}

            {!isProcessing && selectedFile && (
              <>
                <div className="bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 text-xs text-slate-700 flex items-center justify-between">
                  <span className="font-medium">
                    {showCompare
                      ? "Side‑by‑side comparison"
                      : `Viewing: ${selectedFile.name}`}
                  </span>
                  {showCompare && compareFile && (
                    <span className="text-[11px] text-slate-500">
                      {selectedFile.name} vs {compareFile.name}
                    </span>
                  )}
                </div>

                {/* 3 big columns, each row = label + file A + optional file B */}
                <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {SECTIONS.map((section) => (
                    <article
                      key={section.id}
                      className="bg-white rounded-2xl shadow border border-gray-200 px-6 py-5"
                    >
                      <header className="mb-3">
                        <h2 className="text-base font-semibold text-gray-900">
                          {section.title}
                        </h2>
                        <p className="text-xs text-gray-500">
                          {section.subtitle}
                        </p>
                      </header>

                      <div>
                        {section.lines.map((line) => (
                          <MetricRow
                            key={line.label}
                            line={line}
                            showCompare={!!showCompare}
                            labelA={selectedFile.name}
                            labelB={compareFile?.name || ""}
                          />
                        ))}
                      </div>
                    </article>
                  ))}
                </section>
              </>
            )}

            {!isProcessing && !selectedFile && (
              <div className="bg-white rounded-3xl shadow-xl p-16 text-center border border-dashed border-gray-200">
                <p className="text-lg font-semibold text-gray-900 mb-2">
                  Upload financial statements to begin
                </p>
                <p className="text-gray-500 text-sm">
                  Once processed, choose between viewing a single report or comparing two files.
                </p>
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
}

