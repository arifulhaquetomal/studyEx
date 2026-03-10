import { useState } from "react";

interface ConsultationModalProps {
  onClose: () => void;
}

export default function ConsultationModal({ onClose }: ConsultationModalProps) {
  const [step, setStep] = useState<"form" | "thanks">("form");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    question: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.destination) return;
    setStep("thanks");
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div
        className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {step === "form" ? (
          <>
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-8 text-white relative">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white font-bold transition-colors"
              >
                ×
              </button>
              <div className="text-3xl mb-3">📅</div>
              <h2 className="text-2xl font-black mb-2">Book a Free Consultation</h2>
              <p className="text-blue-100 text-sm">Our expert counselors will contact you within 24 hours.</p>
            </div>
            <form onSubmit={handleSubmit} className="p-8 space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name *</label>
                <input
                  name="name"
                  type="text"
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email Address *</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Phone Number</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+880 1XX-XXXXXXX"
                  value={form.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium text-gray-800"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Preferred Destination *</label>
                <select
                  name="destination"
                  value={form.destination}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium text-gray-800 bg-white"
                >
                  <option value="">Select a country...</option>
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="USA">🇺🇸 United States</option>
                  <option value="Canada">🇨🇦 Canada</option>
                  <option value="Australia">🇦🇺 Australia</option>
                  <option value="Other">🌍 Other / Not Sure</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Your Question (Optional)</label>
                <textarea
                  name="question"
                  rows={3}
                  placeholder="Tell us about your academic background and goals..."
                  value={form.question}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium text-gray-800 resize-none"
                />
              </div>
              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg text-base"
              >
                Submit Request →
              </button>
              <p className="text-center text-xs text-gray-400">By submitting, you agree to our Privacy Policy. We'll never spam you.</p>
            </form>
          </>
        ) : (
          <div className="p-10 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <span className="text-3xl">✅</span>
            </div>
            <h2 className="text-2xl font-black text-gray-900 mb-3">Thank You, {form.name.split(" ")[0]}!</h2>
            <p className="text-gray-600 mb-6 leading-relaxed">We've received your request. A counselor will contact you at <strong>{form.email}</strong> within 24 hours to schedule your consultation.</p>
            
            {/* Counselor Card */}
            <div className="bg-blue-50 rounded-2xl p-5 mb-6 text-left flex items-center gap-4">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-xl flex-shrink-0">
                NI
              </div>
              <div>
                <div className="font-black text-gray-900">Nadia Islam</div>
                <div className="text-blue-600 text-sm font-medium">Senior Study Abroad Counselor</div>
                <div className="text-gray-500 text-xs mt-0.5">Expert in {form.destination || "UK & USA"} admissions</div>
              </div>
            </div>

            <div className="bg-green-50 rounded-xl p-4 mb-6 text-sm text-green-700 font-medium">
              📧 A confirmation email has been sent to {form.email}
            </div>

            <button
              onClick={onClose}
              className="w-full py-3 border-2 border-gray-200 text-gray-600 font-bold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
