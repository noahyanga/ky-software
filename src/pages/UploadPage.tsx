import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

/** Document type dropdown options */
const DOC_OPTIONS = [
  { value: "bank", label: "Bank Statement (up to 12 months)" },
  { value: "fin", label: "Financial Statement (P&L, Balance Sheet)" },
  { value: "cashflow", label: "Cash Flow Report" },
  { value: "arap", label: "AR/AP Report" },
] as const;

type DocType = (typeof DOC_OPTIONS)[number]["value"];
type FileRow = { id: string; file: File };

const BYTES_10_MB = 10 * 1024 * 1024;
const ACCEPT_EXT = [".pdf", ".csv", ".xls", ".xlsx"].join(",");
const ACCEPT_MIMES = new Set([
  "application/pdf",
  "text/csv",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

function fmt(bytes: number) {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return `${(bytes / Math.pow(k, i)).toFixed(i === 0 ? 0 : 1)} ${sizes[i]}`;
}

export default function UploadPage() {
  const [docType, setDocType] = useState<DocType | "">("");
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState<FileRow[]>([]);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);

  function guardFile(file: File): string {
    if (!ACCEPT_MIMES.has(file.type))
      return `Unsupported file type: ${file.name}`;
    if (file.size > BYTES_10_MB) return `${file.name} is larger than 10MB`;
    return "";
  }

  function addFiles(list: FileList | File[]) {
    const fresh: FileRow[] = [];
    Array.from(list).forEach((f) => {
      const err = guardFile(f);
      if (err) {
        setError(err);
      } else {
        fresh.push({
          id: `${f.name}-${f.lastModified}-${Math.random()
            .toString(36)
            .slice(2)}`,
          file: f,
        });
      }
    });
    if (fresh.length) setFiles((prev) => [...prev, ...fresh]);
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (!docType) return;
    if (e.dataTransfer?.files?.length) addFiles(e.dataTransfer.files);
  }

  function onDrag(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (!docType) return;
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true);
    if (e.type === "dragleave") setDragActive(false);
  }

  function removeFile(id: string) {
    setFiles((p) => p.filter((x) => x.id !== id));
  }

  function fakeUpload() {
    alert(`Pretend uploading ${files.length} file(s) for type: ${docType}`);
  }

  const chooseDisabled = !docType;
  const dzState = dragActive
    ? "border-emerald-400 bg-emerald-50/40"
    : "border-slate-300 bg-white";

  const navigate = useNavigate();

  return (
    <div className="min-h-screen w-full bg-slate-200">
      <Sidebar />
      {/* Header */}
      <header className="mx-auto w-full max-w-5xl px-4 pt-6">
        <div className="flex items-center gap-3">
          <button
            type="button"
            aria-label="Back"
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
            onClick={() => navigate(-1)}
          >
            <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
              <path
                d="M15 5l-7 7 7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-slate-900">
              Upload Client Financial Data
            </h1>
            <p className="mt-1 text-slate-500">
              The app will automatically detect the company name from the
              documents.
            </p>
          </div>
        </div>
      </header>

      {/* Card */}
      <main className="mx-auto w-full max-w-5xl px-4 pb-24 pt-6">
        <section className="rounded-2xl bg-white/90 shadow-[0_1px_2px_rgba(16,24,40,0.05),0_10px_20px_-10px_rgba(16,24,40,0.1)] backdrop-blur p-6 sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-15 w-15 items-center justify-center rounded-xl bg-emerald-200 text-emerald-600">
              <svg viewBox="0 0 24 24" fill="none" className="h-9 w-9">
                <path
                  d="M4 4h16v16H4z"
                  stroke="green"
                  strokeWidth="1.6"
                />
                <path
                  d="M8 8h8M8 12h8M8 16h5"
                  stroke="green"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />
              </svg>
            </div>
            <h2 className="text-xl sm:text-2xl font-semibold text-slate-900">
              Upload Documents
            </h2>
          </div>

          {/* Document Type */}
          <div className="mt-6">
            <label
              htmlFor="doc-type"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Document Type <span className="text-red-600">*</span>
            </label>
            <div className="relative max-w-xl">
              <select
                id="doc-type"
                value={docType}
                onChange={(e) => {
                  setDocType(e.target.value as DocType | "");
                  setError("");
                }}
                className="peer w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 pr-10 text-slate-900 shadow-sm outline-none transition focus:border-emerald-900 focus:ring-2 focus:ring-emerald-100"
              >
                <option value="">Select document type</option>
                {DOC_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
              <svg
                className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          {/* Dropzone */}
          <div
            onDragEnter={onDrag}
            onDragOver={onDrag}
            onDragLeave={onDrag}
            onDrop={onDrop}
            className={`mt-6 rounded-2xl border-2 border-dashed ${dzState} transition`}
          >
            <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
              <div
                className={`mb-4 flex h-16 w-16 items-center justify-center rounded-full ${dragActive
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-emerald-600 text-white"
                  }`}
              >
                <svg viewBox="0 0 24 24" fill="none" className="h-7 w-7">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
              <p className="text-lg font-medium text-slate-800">
                Select document type to upload
              </p>
              <p className="mt-1 text-sm text-slate-500">
                Supports PDF, Excel, and CSV files up to 10MB
              </p>

              <div className="mt-6">
                <button
                  type="button"
                  onClick={() => inputRef.current?.click()}
                  disabled={chooseDisabled}
                  className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold shadow-sm transition focus:outline-none focus:ring-2 focus:ring-emerald-400 ${chooseDisabled
                    ? "cursor-not-allowed bg-slate-100 text-slate-400"
                    : "bg-emerald-600 text-white hover:bg-emerald-500"
                    }`}
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path
                      d="M12 3v12m0 0l-3-3m3 3l3-3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="4"
                      y="15"
                      width="16"
                      height="6"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                  Choose File
                </button>
                <input
                  ref={inputRef}
                  type="file"
                  accept={ACCEPT_EXT}
                  multiple
                  onChange={(e) => {
                    setError("");
                    if (e.target.files) addFiles(e.target.files);
                    e.target.value = "";
                  }}
                  className="hidden"
                />
              </div>

              {!docType && (
                <p className="mt-3 text-xs text-slate-500">
                  Choose a document type above to enable uploads.
                </p>
              )}
              {error && (
                <div className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
                  {error}
                </div>
              )}
            </div>
          </div>

          {/* File list */}
          {files.length > 0 && (
            <div className="mt-6">
              <h3 className="mb-3 text-sm font-semibold text-slate-700">
                Files ready to upload
              </h3>
              <ul className="divide-y divide-slate-200 overflow-hidden rounded-xl border border-slate-200 bg-white">
                {files.map(({ id, file }) => (
                  <li
                    key={id}
                    className="flex items-center justify-between gap-4 px-4 py-3"
                  >
                    <div className="flex min-w-0 items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
                        <svg
                          viewBox="0 0 24 24"
                          fill="none"
                          className="h-5 w-5"
                        >
                          <path
                            d="M6 2h7l5 5v15H6z"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                          <path
                            d="M13 2v6h6"
                            stroke="currentColor"
                            strokeWidth="1.6"
                          />
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium text-slate-900">
                          {file.name}
                        </p>
                        <p className="text-xs text-slate-500">
                          {file.type || "Unknown"} • {fmt(file.size)}
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="inline-flex items-center rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm transition hover:bg-slate-50"
                      onClick={() => removeFile(id)}
                    >
                      Remove
                    </button>
                  </li>
                ))}
              </ul>

              <div className="mt-4 flex justify-end">
                <button
                  type="button"
                  onClick={fakeUpload}
                  className="inline-flex items-center gap-2 rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-300"
                >
                  <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5">
                    <path
                      d="M12 3v12m0 0l-3-3m3 3l3-3"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <rect
                      x="4"
                      y="15"
                      width="16"
                      height="6"
                      rx="2"
                      stroke="currentColor"
                      strokeWidth="1.6"
                    />
                  </svg>
                  Upload {files.length} file{files.length > 1 ? "s" : ""}
                </button>
              </div>
            </div>
          )}
        </section>
      </main>
    </div>
  );
}
