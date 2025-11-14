import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default function FinancialsPage() {
  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <Sidebar />

      <main className="max-w-7xl mx-auto py-10 px-6 space-y-12">
        {/* Page Title */}
        <header>
          <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 mb-2">
            Financial Report Analysis
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Explore powerful features and analytics enabling smarter cash management and liquidity decisions.
          </p>
        </header>

        {/* KPI Cards Section */}
        <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          <Card title="DSO" value="32 days" />
          <Card title="DPO" value="24 days" />
          <Card title="Cash Conversion Cycle" value="54 days" />
          <Card title="Current Cash Position" value="$885,000" />
        </section>

        {/* Working Capital & Cash Flow Details */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel title="Working Capital Analytics">
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>AR/AP aging buckets & heatmap visualization</li>
              <li>Root-cause insights: late payers, vendor term bottlenecks</li>
              <li>Playbook suggestions to reduce DSO & optimize DPO</li>
            </ul>
          </Panel>
          <Panel title="Cash Flow Summary">
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>Operating cash flow (30d): <strong>$120,000</strong></li>
              <li>Cash runway: <strong>7.4 months</strong></li>
              <li>Trend: <strong className="text-green-600">Positive</strong></li>
            </ul>
          </Panel>
        </section>

        {/* Payment Rail & Liquidity */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel title="Payment Rail Advisor">
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>Recommended method: <strong>ACH/EFT (90% of payments)</strong></li>
              <li>Average payment fee saved/mo: <strong className="text-green-600">$420</strong></li>
              <li>Cross-border fee transparency & remittance detail handling</li>
            </ul>
          </Panel>
          <Panel title="Liquidity & Yield Optimization">
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>Laddered GIC/CD suggestion for <strong>$250,000</strong> idle cash</li>
              <li>Reserve buffer sized for payroll & supplier risk</li>
              <li>Simulate yield/loss scenarios and break-glass unwind plans</li>
            </ul>
          </Panel>
        </section>

        {/* Credit Readiness & Security */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Panel title="Credit Readiness">
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>Borrowing headroom: <strong>$400,000 LOC</strong></li>
              <li>DSCR: <strong>2.8</strong> & covenants passed</li>
              <li>Sensitivity testing: "Safe" on 15% sales drop</li>
              <li>Instant bank package exports (summary, ratios, variances)</li>
            </ul>
          </Panel>
          <Panel title="Security & Compliance">
            <ul className="space-y-3 text-gray-700 text-sm">
              <li>SOC 2, ISO/IEC 27001 certified</li>
              <li>Encryption: TLS 1.2+ in transit, AES-256 at rest</li>
              <li>Centralized logging & annual pen-testing</li>
            </ul>
          </Panel>
        </section>

        {/* Tracked Outcomes */}
        <section>
          <Panel title="Tracked Outcomes">
            <ul className="list-disc list-inside space-y-2 text-gray-700 text-sm max-w-xl ml-4">
              <li>Reduced DSO by <strong>7 days</strong> average</li>
              <li>Cut average payment fees by <strong>18%</strong></li>
              <li>Lifted idle-cash yield by <strong>+54bps</strong></li>
              <li>Reduced month-end close and audit prep time by <strong>23%</strong></li>
            </ul>
          </Panel>
        </section>
      </main>
    </div>
  );
}

function Card({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-white rounded-3xl p-6 shadow-md flex flex-col items-center justify-center text-center">
      <p className="text-2xl font-semibold text-gray-900">{value}</p>
      <p className="mt-2 text-gray-500 font-medium">{title}</p>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl shadow p-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4 text-gray-900">{title}</h2>
      {children}
    </div>
  );
}

