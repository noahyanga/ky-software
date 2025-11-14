import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { FiMail, FiPhone, FiLinkedin, FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "How do I upload financial documents?",
    answer:
      "You can upload financial documents using the 'Upload Data' button on the dashboard. Supported formats include PDF, CSV, and Excel.",
  },
  {
    question: "Can I link my bank account directly?",
    answer:
      "Direct bank linking is a planned feature. For now, manual upload of statements is supported.",
  },
  {
    question: "How is my data secured?",
    answer:
      "KY Software is SOC 2 and ISO 27001 certified, with encryption both in transit and at rest.",
  },
];

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <Sidebar />
      <div className="max-w-3xl mx-auto py-10 px-6 space-y-10">
        {/* Intro */}
        <header className="mb-8">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Support & About KY Software
          </h1>
          <p className="text-gray-600">
            Get in touch, learn about our mission, and discover how we help banks and businesses keep money flowing.
          </p>
        </header>

        {/* Search Bar */}
        <div className="mb-12">
          <input
            type="search"
            placeholder="Search support topics"
            className="w-full bg-white rounded-2xl border border-gray-300 p-4 text-gray-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* FAQs */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-bold text-lg mb-4">Frequently Asked Questions</h2>
          <ul className="divide-y divide-gray-200">
            {filteredFaqs.length ? (
              filteredFaqs.map((faq, i) => (
                <li key={i} className="py-4">
                  <button
                    onClick={() =>
                      setExpandedFAQ(expandedFAQ === i ? null : i)
                    }
                    className="flex justify-between items-center w-full text-left text-gray-800 font-semibold"
                    aria-expanded={expandedFAQ === i}
                  >
                    {faq.question}
                    {expandedFAQ === i ? (
                      <FiChevronUp className="ml-4" />
                    ) : (
                      <FiChevronDown className="ml-4" />
                    )}
                  </button>
                  {expandedFAQ === i && (
                    <p className="mt-2 text-gray-600">{faq.answer}</p>
                  )}
                </li>
              ))
            ) : (
              <p className="text-gray-500 mt-4">No results found.</p>
            )}
          </ul>
        </section>

        {/* Mission & Story */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-bold text-lg mb-2">Our Mission</h2>
          <p className="text-gray-700 mb-4">
            Help businesses and banking advisors keep money flowing—so teams can grow on purpose, not on panic.
          </p>
          <h3 className="font-semibold text-md mb-1">Our Origin Story</h3>
          <p className="text-gray-700 mb-3">
            We’ve lived both sides: managing operational cash cycles and working with banks needing clear, defensible recommendations for clients. Everywhere, we saw late insights, fragmented tools, and “too late” discoveries. KY Software was built to unify financial data, spot DSO/DPO friction, and surface smart, risk-aware recommendations instantly.
          </p>
          <ul className="ml-5 list-disc text-gray-700 text-sm space-y-1 mb-2">
            <li>Unifies data from bank and financial statements</li>
            <li>Forecasts monthly cash flow & highlights DSO/DPO friction</li>
            <li>Recommends payment rails and reserve actions</li>
          </ul>
        </section>

        {/* Who We Serve & What Makes Us Different */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-bold text-lg mb-2">Who We Serve</h2>
            <ul className="ml-5 list-disc text-gray-700 text-sm space-y-1">
              <li>Banks & Credit Unions seeking deeper client relationships</li>
              <li>Banking Advisors looking for data-driven recommendations</li>
              <li>Fintech & Banking Startups building next-gen financial products</li>
            </ul>
          </div>
          <div className="bg-white rounded-2xl shadow-md p-6">
            <h2 className="font-bold text-lg mb-2">What Makes Us Different</h2>
            <ul className="ml-5 list-disc text-gray-700 text-sm space-y-1">
              <li>Cash-First Design: growth through real liquidity</li>
              <li>Bank-Grade Trust: encryption, audit, SOC 2/ISO 27001</li>
              <li>AI-Driven Decisions: accurate, actionable insights</li>
              <li>Saving Time & Money: automation for clients and advisors</li>
            </ul>
          </div>
        </section>

        {/* Product, Security & Outcomes */}
        <section className="bg-white rounded-2xl shadow-md p-6 mb-8">
          <h2 className="font-bold text-lg mb-2">Product & Security</h2>
          <ul className="ml-5 list-disc text-gray-700 text-sm space-y-1">
            <li>Cohesive cash management toolkit (DSO, DPO, heatmaps, forecasting)</li>
            <li>Data security: SOC 2, ISO/IEC 27001, encryption in transit & at rest</li>
            <li>Enterprise & audit-ready: exportable reports, full log & review trail</li>
          </ul>
        </section>

        {/* Contact & Enterprise Support */}
        <section className="bg-white rounded-2xl shadow-md p-6">
          <h2 className="font-bold text-lg mb-4">Contact & Enterprise Support</h2>
          <ul className="space-y-3 text-gray-700 text-md">
            <li className="flex items-center gap-3">
              <FiMail className="text-blue-600" />
              <span>hello@kysoftware.com</span>
            </li>
            <li className="flex items-center gap-3">
              <FiPhone className="text-green-600" />
              <span>(555) 123-4567</span>
            </li>
            <li className="flex items-center gap-3">
              <FiLinkedin className="text-blue-700" />
              <a
                href="https://www.linkedin.com/company/k-y-software/?viewAsMember=true"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
              >
                LinkedIn: KY Software
              </a>
            </li>
          </ul>
          <div className="mt-6 text-xs text-gray-400">
            © 2024 KY Software. All rights reserved. <br />
            SOC 2 Compliant | Bank-Grade Security
          </div>
        </section>
      </div>
    </div>
  );
}

