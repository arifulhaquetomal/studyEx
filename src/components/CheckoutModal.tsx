import { useState } from "react";

interface CheckoutModalProps {
  plan: string;
  onClose: () => void;
}

const planDetails: Record<string, { price: number; priceBDT: number }> = {
  Standard: { price: 250, priceBDT: 27500 },
  Premium: { price: 500, priceBDT: 55000 },
};

export default function CheckoutModal({ plan, onClose }: CheckoutModalProps) {
  const [currency, setCurrency] = useState<"USD" | "BDT">("USD");
  const [payMethod, setPayMethod] = useState("card");
  const [step, setStep] = useState<"checkout" | "success">("checkout");
  const [form, setForm] = useState({ name: "", email: "", card: "", expiry: "", cvv: "", phone: "" });

  const details = planDetails[plan] || { price: 0, priceBDT: 0 };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setStep("success");
  };

  if (step === "success") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="bg-gradient-to-br from-green-500 to-emerald-600 p-8 text-white text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">✅</div>
            <h2 className="text-2xl font-black mb-2">Payment Successful!</h2>
            <p className="text-green-100">Welcome to StudyEx {plan} Package</p>
          </div>
          <div className="p-8">
            <div className="bg-gray-50 rounded-2xl p-5 mb-6 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Package</span>
                <span className="font-black text-gray-900">{plan}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Amount Paid</span>
                <span className="font-black text-green-600">{currency === "USD" ? `$${details.price}` : `৳${details.priceBDT.toLocaleString()}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Invoice</span>
                <span className="font-black text-blue-600">#STX-{Math.floor(Math.random() * 9000 + 1000)}</span>
              </div>
            </div>
            <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm text-blue-700 font-medium">
              📧 Invoice and access details sent to <strong>{form.email || "your email"}</strong>
            </div>
            <p className="text-gray-600 text-sm mb-6 text-center">Your counselor will contact you within 24 hours to kick off your {plan} package.</p>
            <button onClick={onClose} className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all">
              Access Student Portal →
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden max-h-[95vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 text-white relative">
          <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center font-bold transition-colors">×</button>
          <div className="flex items-center gap-3 mb-3">
            <div className="text-2xl">{plan === "Premium" ? "👑" : "🚀"}</div>
            <div>
              <h2 className="text-xl font-black">{plan} Package</h2>
              <p className="text-blue-300 text-xs">Secure checkout</p>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="inline-flex bg-white/10 rounded-lg p-1">
              {(["USD", "BDT"] as const).map(c => (
                <button key={c} onClick={() => setCurrency(c)} className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all ${currency === c ? "bg-white text-gray-900" : "text-blue-300"}`}>{c}</button>
              ))}
            </div>
            <div className="text-right">
              <div className="text-2xl font-black">{currency === "USD" ? `$${details.price}` : `৳${details.priceBDT.toLocaleString()}`}</div>
              <div className="text-blue-300 text-xs">≈ {currency === "USD" ? `৳${details.priceBDT.toLocaleString()}` : `$${details.price}`}</div>
            </div>
          </div>
        </div>

        <form onSubmit={handlePay} className="p-6 space-y-4">
          {/* Payment Method */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Payment Method</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: "card", label: "💳 Card" },
                { id: "bkash", label: "📱 bKash" },
                { id: "nagad", label: "📱 Nagad" },
              ].map(m => (
                <button
                  key={m.id}
                  type="button"
                  onClick={() => setPayMethod(m.id)}
                  className={`py-3 rounded-xl text-sm font-bold border-2 transition-all ${
                    payMethod === m.id ? "border-blue-600 bg-blue-50 text-blue-700" : "border-gray-200 text-gray-600 hover:border-gray-300"
                  }`}
                >
                  {m.label}
                </button>
              ))}
            </div>
          </div>

          {/* Customer Info */}
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
            <input name="name" type="text" required placeholder="As on card / account" value={form.name} onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none font-medium" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email (for invoice)</label>
            <input name="email" type="email" required placeholder="you@example.com" value={form.email} onChange={handleChange}
              className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none font-medium" />
          </div>

          {payMethod === "card" && (
            <>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Card Number</label>
                <input name="card" type="text" required placeholder="1234 5678 9012 3456" value={form.card} onChange={handleChange} maxLength={19}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none font-medium" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Expiry Date</label>
                  <input name="expiry" type="text" required placeholder="MM/YY" value={form.expiry} onChange={handleChange}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none font-medium" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">CVV</label>
                  <input name="cvv" type="text" required placeholder="123" value={form.cvv} onChange={handleChange} maxLength={4}
                    className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none font-medium" />
                </div>
              </div>
            </>
          )}

          {(payMethod === "bkash" || payMethod === "nagad") && (
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">
                {payMethod === "bkash" ? "bKash" : "Nagad"} Number
              </label>
              <input name="phone" type="tel" required placeholder="+880 1XX-XXXXXXX" value={form.phone} onChange={handleChange}
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none font-medium" />
              <p className="text-xs text-gray-400 mt-1.5">A payment request will be sent to this number.</p>
            </div>
          )}

          <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl p-3 text-xs text-green-700 font-medium">
            🔒 256-bit SSL Encrypted · PCI DSS Compliant · Secure Payment
          </div>

          <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg text-base">
            Pay {currency === "USD" ? `$${details.price}` : `৳${details.priceBDT.toLocaleString()}`} Securely →
          </button>
          <p className="text-center text-xs text-gray-400">7-day refund policy · Invoice emailed automatically</p>
        </form>
      </div>
    </div>
  );
}
