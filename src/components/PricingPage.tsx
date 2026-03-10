import { useState } from "react";

interface PricingPageProps {
  setShowConsultModal: (v: boolean) => void;
  setShowCheckout: (v: boolean) => void;
  setCheckoutPlan: (plan: string) => void;
}

const plans = [
  {
    name: "Basic",
    priceBDT: 0,
    priceUSD: 0,
    label: "Free",
    color: "border-gray-200",
    badgeColor: "bg-gray-100 text-gray-600",
    btnColor: "border-2 border-blue-600 text-blue-600 hover:bg-blue-50",
    icon: "🌱",
    tagline: "Start your journey",
    features: [
      "Free 30-Minute Consultation",
      "University Finder Access",
      "Scholarship Database Access",
      "Basic Eligibility Check (AI Tool)",
      "Community Forum Access",
      "Email Support",
    ],
    notIncluded: ["Application Assistance", "SOP Review", "Visa Processing", "Interview Prep"],
  },
  {
    name: "Standard",
    priceBDT: 27500,
    priceUSD: 250,
    label: "$250",
    color: "border-blue-500 ring-2 ring-blue-500",
    badgeColor: "bg-blue-600 text-white",
    btnColor: "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg",
    icon: "🚀",
    tagline: "Most Popular",
    popular: true,
    features: [
      "Everything in Basic",
      "5 University Applications",
      "Statement of Purpose (SOP) Review",
      "Letter of Recommendation Guidance",
      "Visa Document Checklist",
      "Pre-Departure Briefing",
      "Priority Email & Phone Support",
      "Application Tracker Access",
    ],
    notIncluded: ["Unlimited Applications", "Full Visa Processing", "Mock Interviews"],
  },
  {
    name: "Premium",
    priceBDT: 55000,
    priceUSD: 500,
    label: "$500",
    color: "border-gold-400 border-amber-400",
    badgeColor: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white",
    btnColor: "bg-gradient-to-r from-amber-500 to-yellow-500 text-white hover:from-amber-600 hover:to-yellow-600 shadow-lg",
    icon: "👑",
    tagline: "Complete Support",
    features: [
      "Everything in Standard",
      "Unlimited University Applications",
      "Full Visa Processing & Guidance",
      "Scholarship Application Support",
      "Interview Preparation (3 Mock Sessions)",
      "SOP Writing (Full Draft)",
      "Dedicated Personal Counselor",
      "Document Checklist & Upload Portal",
      "Post-Admission Support",
      "24/7 WhatsApp Support",
    ],
    notIncluded: [],
  },
];

export default function PricingPage({ setShowConsultModal, setShowCheckout, setCheckoutPlan }: PricingPageProps) {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-16 px-4 sm:px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">💎 Simple, Transparent Pricing</h1>
          <p className="text-blue-300 text-xl max-w-2xl mx-auto">No hidden fees. Choose the plan that fits your journey. All packages include a free initial consultation.</p>
          <div className="mt-8 inline-flex bg-white/10 rounded-xl p-1.5">
            <button
              onClick={() => setCurrency("USD")}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${currency === "USD" ? "bg-white text-gray-900 shadow-md" : "text-blue-300"}`}
            >
              🇺🇸 USD
            </button>
            <button
              onClick={() => setCurrency("BDT")}
              className={`px-6 py-2.5 rounded-lg font-bold text-sm transition-all ${currency === "BDT" ? "bg-white text-gray-900 shadow-md" : "text-blue-300"}`}
            >
              🇧🇩 BDT
            </button>
          </div>
        </div>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`relative bg-white rounded-3xl border-2 ${plan.color} shadow-sm hover:shadow-xl transition-all p-8 flex flex-col`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-xs font-black px-4 py-1.5 rounded-full shadow-lg uppercase tracking-widest">
                    Most Popular
                  </span>
                </div>
              )}
              <div className="text-4xl mb-4">{plan.icon}</div>
              <div className={`inline-block self-start px-3 py-1 rounded-full text-xs font-black mb-4 ${plan.badgeColor}`}>{plan.tagline}</div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">{plan.name}</h2>
              <div className="mb-6">
                {plan.priceUSD === 0 ? (
                  <span className="text-4xl font-black text-gray-900">Free</span>
                ) : (
                  <div>
                    <span className="text-4xl font-black text-gray-900">
                      {currency === "USD" ? `$${plan.priceUSD}` : `৳${plan.priceBDT.toLocaleString()}`}
                    </span>
                    <span className="text-gray-400 text-sm font-medium ml-1">one-time</span>
                    {currency === "USD" && plan.priceBDT > 0 && (
                      <p className="text-xs text-gray-400 mt-1">≈ ৳{plan.priceBDT.toLocaleString()} BDT</p>
                    )}
                    {currency === "BDT" && plan.priceBDT > 0 && (
                      <p className="text-xs text-gray-400 mt-1">≈ ${plan.priceUSD} USD</p>
                    )}
                  </div>
                )}
              </div>
              <ul className="space-y-3 mb-6 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="text-green-500 font-black mt-0.5 flex-shrink-0">✓</span>
                    <span className="text-gray-700">{f}</span>
                  </li>
                ))}
                {plan.notIncluded.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm">
                    <span className="text-gray-300 font-black mt-0.5 flex-shrink-0">✗</span>
                    <span className="text-gray-400 line-through">{f}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => {
                  if (plan.priceUSD === 0) {
                    setShowConsultModal(true);
                  } else {
                    setCheckoutPlan(plan.name);
                    setShowCheckout(true);
                  }
                }}
                className={`w-full py-4 rounded-2xl font-black text-base transition-all ${plan.btnColor}`}
              >
                {plan.priceUSD === 0 ? "Book Free Consultation" : `Get ${plan.name} Package`}
              </button>
            </div>
          ))}
        </div>

        {/* Trust Signals */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {[
            { icon: "🔒", title: "Secure Payments", desc: "SSL encrypted. We accept Credit/Debit Cards, bKash, and Nagad." },
            { icon: "↩️", title: "Refund Policy", desc: "Not satisfied with your consultation? Full refund within 7 days." },
            { icon: "📞", title: "Need Help Choosing?", desc: "Talk to a counselor to pick the right package for your goals." },
          ].map(t => (
            <div key={t.title} className="bg-white rounded-2xl border border-gray-100 p-6 text-center">
              <div className="text-3xl mb-3">{t.icon}</div>
              <h3 className="font-black text-gray-900 mb-2">{t.title}</h3>
              <p className="text-gray-500 text-sm">{t.desc}</p>
            </div>
          ))}
        </div>

        {/* Payment Methods */}
        <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-6 max-w-4xl mx-auto">
          <h3 className="text-center font-black text-gray-700 mb-5 text-sm uppercase tracking-widest">Accepted Payment Methods</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {["💳 Visa / Mastercard", "💳 American Express", "📱 bKash", "📱 Nagad", "🏦 Bank Transfer"].map(m => (
              <div key={m} className="px-5 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-700 font-semibold text-sm">
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
