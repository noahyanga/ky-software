import { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import {
  FiMail,
  FiPhone,
  FiLinkedin,
  FiChevronDown,
  FiChevronUp,
  FiSearch,
  FiShield,
  FiUsers,
  FiTrendingUp,
  FiHelpCircle,
  FiMessageCircle,
  FiStar,
  FiCheck,
  FiArrowRight,
  FiBookOpen,
  FiGlobe,
} from "react-icons/fi";

const faqs = [
  {
    question: "How do I upload financial documents?",
    answer:
      "You can upload financial documents using the 'Upload Data' button on the dashboard. Supported formats include PDF, CSV, and Excel files. Our system automatically processes and categorizes your data for analysis.",
    category: "Getting Started",
  },
  {
    question: "Can I link my bank account directly?",
    answer:
      "Direct bank linking is a planned feature for early 2024. Currently, we support secure manual upload of bank statements. This ensures maximum security while we develop our direct integration capabilities.",
    category: "Banking",
  },
  {
    question: "How is my data secured?",
    answer:
      "KY Software is SOC 2 Type II and ISO 27001 certified. We use enterprise-grade encryption both in transit (TLS 1.3) and at rest (AES-256). Your data is stored in secure, audited data centers with strict access controls.",
    category: "Security",
  },
  {
    question: "What file formats do you support?",
    answer:
      "We support PDF bank statements, CSV files, Excel spreadsheets (.xlsx, .xls), and QIF files. Our AI can automatically extract data from most standard financial document formats.",
    category: "Getting Started",
  },
  {
    question: "How accurate are the cash flow forecasts?",
    answer:
      "Our AI-powered forecasts typically achieve 85-95% accuracy for 30-day predictions and 75-85% for 90-day forecasts. Accuracy improves as we learn from your historical data patterns.",
    category: "Features",
  },
  {
    question: "Can multiple team members access the same account?",
    answer:
      "Yes, our Business and Enterprise plans support multiple users with role-based permissions. You can control who has access to view, edit, or manage different aspects of your financial data.",
    category: "Account",
  },
];

const features = [
  {
    title: "Cash Flow Forecasting",
    description: "AI-powered predictions for better planning",
    icon: FiTrendingUp,
  },
  {
    title: "DSO/DPO Analysis",
    description: "Optimize payment timing and collections",
    icon: FiMessageCircle,
  },
  {
    title: "Risk Assessment",
    description: "Identify potential financial risks early",
    icon: FiShield,
  },
  {
    title: "Automated Reports",
    description: "Generate insights automatically",
    icon: FiBookOpen,
  },
];

export default function SupportPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = [
    "All",
    ...Array.from(new Set(faqs.map((faq) => faq.category))),
  ];

  const filteredFaqs = faqs.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-200 min-h-screen">
      <Header />
      <Sidebar />

      <div className="max-w-7xl mx-auto py-8 px-6">
        {/* Hero Section */}
        <div className=" mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Support & Resources
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl">
            Get help, learn about our mission, and discover how we help banks
            and businesses optimize their cash flow management.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Search and FAQ Section */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiHelpCircle className="text-green-600" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Frequently Asked Questions
                </h2>
              </div>

              {/* Search Bar */}
              <div className="relative mb-6">
                <FiSearch
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="search"
                  placeholder="Search support topics..."
                  className="w-full bg-gray-50 rounded-xl border border-gray-200 pl-12 pr-4 py-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Category Filter */}
              <div className="flex flex-wrap gap-2 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? "bg-green-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              {/* FAQ List */}
              <div className="space-y-4">
                {filteredFaqs.length ? (
                  filteredFaqs.map((faq, i) => (
                    <div
                      key={i}
                      className="border border-gray-200 rounded-xl overflow-hidden"
                    >
                      <button
                        onClick={() =>
                          setExpandedFAQ(expandedFAQ === i ? null : i)
                        }
                        className="w-full p-4 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex justify-between items-center"
                        aria-expanded={expandedFAQ === i}
                      >
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {faq.question}
                          </h3>
                          <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                            {faq.category}
                          </span>
                        </div>
                        {expandedFAQ === i ? (
                          <FiChevronUp
                            className="text-gray-500 flex-shrink-0 ml-4"
                            size={20}
                          />
                        ) : (
                          <FiChevronDown
                            className="text-gray-500 flex-shrink-0 ml-4"
                            size={20}
                          />
                        )}
                      </button>
                      {expandedFAQ === i && (
                        <div className="p-4 bg-white border-t border-gray-200">
                          <p className="text-gray-700 leading-relaxed">
                            {faq.answer}
                          </p>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <FiSearch
                      className="mx-auto text-gray-400 mb-4"
                      size={48}
                    />
                    <p className="text-gray-500 text-lg">
                      No results found for "{searchTerm}"
                    </p>
                    <p className="text-gray-400 text-sm">
                      Try adjusting your search terms
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Our Mission */}
            <div className="bg-white rounded-2xl border border-gray-200 p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-emerald-100 rounded-lg">
                  <FiStar className="text-emerald-600" size={20} />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">
                  Our Mission
                </h2>
              </div>

              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Help businesses and banking advisors keep money flowing—so
                  teams can grow on purpose, not on panic.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Our Origin Story
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">
                  We've lived both sides: managing operational cash cycles and
                  working with banks needing clear, defensible recommendations
                  for clients. Everywhere, we saw late insights, fragmented
                  tools, and "too late" discoveries. KY Software was built to
                  unify financial data, spot DSO/DPO friction, and surface
                  smart, risk-aware recommendations instantly.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FiUsers size={18} />
                      Who We Serve
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <FiCheck
                          className="text-emerald-600 mt-1 flex-shrink-0"
                          size={16}
                        />
                        Banks & Credit Unions seeking deeper client
                        relationships
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck
                          className="text-emerald-600 mt-1 flex-shrink-0"
                          size={16}
                        />
                        Banking Advisors looking for data-driven recommendations
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck
                          className="text-emerald-600 mt-1 flex-shrink-0"
                          size={16}
                        />
                        Fintech & Banking Startups building financial products
                      </li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                      <FiShield size={18} />
                      What Makes Us Different
                    </h4>
                    <ul className="space-y-2 text-gray-700">
                      <li className="flex items-start gap-2">
                        <FiCheck
                          className="text-emerald-600 mt-1 flex-shrink-0"
                          size={16}
                        />
                        Cash-First Design: growth through real liquidity
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck
                          className="text-emerald-600 mt-1 flex-shrink-0"
                          size={16}
                        />
                        Bank-Grade Trust: encryption, audit, SOC 2/ISO 27001
                      </li>
                      <li className="flex items-start gap-2">
                        <FiCheck
                          className="text-emerald-600 mt-1 flex-shrink-0"
                          size={16}
                        />
                        AI-Driven Decisions: accurate, actionable insights
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Contact Card */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-green-100 rounded-lg">
                  <FiMessageCircle className="text-green-600" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Get in Touch
                </h3>
              </div>

              <div className="space-y-4">
                <a
                  href="mailto:hello@kysoftware.com"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <FiMail className="text-green-600" size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Email Support
                    </div>
                    <div className="text-sm text-gray-600">
                      hello@kysoftware.com
                    </div>
                  </div>
                </a>

                <a
                  href="tel:+15551234567"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                  <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <FiPhone className="text-green-600" size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">
                      Phone Support
                    </div>
                    <div className="text-sm text-gray-600">(555) 123-4567</div>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/company/k-y-software/?viewAsMember=true"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
                >
                    <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                    <FiLinkedin className="text-green-600" size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">LinkedIn</div>
                    <div className="text-sm text-gray-600">KY Software</div>
                  </div>
                  <FiArrowRight
                    className="text-gray-400 ml-auto group-hover:text-gray-600"
                    size={16}
                  />
                </a>
              </div>
            </div>
            {/* Quick Links */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Quick Links
              </h3>
              <div className="space-y-3">
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiBookOpen size={16} />
                  <span className="text-sm">Documentation</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiUsers size={16} />
                  <span className="text-sm">Community Forum</span>
                </a>
                <a
                  href="#"
                  className="flex items-center gap-2 text-gray-700 hover:text-blue-600 transition-colors"
                >
                  <FiMessageCircle size={16} />
                  <span className="text-sm">Live Chat</span>
                </a>
              </div>
            </div>

            {/* Security & Compliance */}
            <div className="bg-white rounded-2xl border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 bg-red-100 rounded-lg">
                  <FiShield className="text-red-600" size={20} />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Security & Compliance
                </h3>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <FiCheck className="text-emerald-600" size={16} />
                  <span className="text-gray-700 text-sm">
                    SOC 2 Type II Certified
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheck className="text-emerald-600" size={16} />
                  <span className="text-gray-700 text-sm">
                    ISO 27001 Compliant
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheck className="text-emerald-600" size={16} />
                  <span className="text-gray-700 text-sm">
                    Bank-Grade Encryption
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <FiCheck className="text-emerald-600" size={16} />
                  <span className="text-gray-700 text-sm">
                    Regular Security Audits
                  </span>
                </div>
              </div>

              <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">
                  <FiGlobe className="inline mr-2" size={14} />
                  Your data is protected with enterprise-grade security measures
                  trusted by financial institutions worldwide.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-500 text-sm">
            © 2026 KY Software. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
