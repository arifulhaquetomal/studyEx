import { useState } from "react";
import { testimonials } from "../data";

interface HomePageProps {
  setActivePage: (page: string) => void;
  setShowConsultModal: (show: boolean) => void;
}

const stats = [
  { value: "5,000+", label: "Students Placed" },
  { value: "98%", label: "Visa Success Rate" },
  { value: "200+", label: "Partner Universities" },
  { value: "15+", label: "Years of Experience" },
];

const destinations = [
  { country: "United Kingdom", flag: "🇬🇧", color: "from-blue-600 to-indigo-800", unis: "120+ Universities", popular: "Oxford, UCL, Imperial" },
  { country: "United States", flag: "🇺🇸", color: "from-red-600 to-blue-700", unis: "200+ Universities", popular: "Harvard, MIT, Stanford" },
  { country: "Canada", flag: "🇨🇦", color: "from-red-600 to-red-800", unis: "80+ Universities", popular: "Toronto, UBC, McGill" },
  { country: "Australia", flag: "🇦🇺", color: "from-yellow-500 to-amber-700", unis: "45+ Universities", popular: "Melbourne, Sydney, ANU" },
];

const eligibilityResults: Record<string, { type: "Good Match" | "Reach" | "Safe"; unis: string[] }[]> = {
  default: [
    { type: "Good Match", unis: ["University of Manchester", "University of Edinburgh", "University of Leeds"] },
    { type: "Reach", unis: ["University of Oxford", "Imperial College London", "University College London"] },
    { type: "Safe", unis: ["University of Exeter", "University of Liverpool", "Coventry University"] },
  ]
};

export default function HomePage({ setActivePage, setShowConsultModal }: HomePageProps) {
  const [cgpa, setCgpa] = useState("");
  const [ielts, setIelts] = useState("");
  const [budget, setBudget] = useState("");
  const [destination, setDestination] = useState("UK");
  const [eligibilityResult, setEligibilityResult] = useState<null | typeof eligibilityResults.default>(null);
  const [checking, setChecking] = useState(false);


  const handleCheckEligibility = () => {
    if (!cgpa || !ielts) return;
    setChecking(true);
    setTimeout(() => {
      setEligibilityResult(eligibilityResults.default);
      setChecking(false);
    }, 1500);
  };

  const partnerLogos = ["🎓 Oxford", "🏛️ Harvard", "🍁 Toronto", "🦘 Melbourne", "🔬 Imperial", "🌴 Stanford", "⚙️ MIT", "🏙️ UCL", "🌲 UBC", "🌉 Sydney"];

  const typeColors: Record<string, string> = {
    "Good Match": "bg-green-100 text-green-800 border-green-200",
    "Reach": "bg-orange-100 text-orange-800 border-orange-200",
    "Safe": "bg-blue-100 text-blue-800 border-blue-200",
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-24 md:py-32">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-1.5 text-sm font-medium text-blue-300 mb-6">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              Trusted by 5,000+ Students Since 2009
            </div>
            <h1 className="text-4xl md:text-6xl font-black leading-tight mb-6">
              Your Dream University
              <span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                Starts Here
              </span>
            </h1>
            <p className="text-xl text-blue-100/80 max-w-2xl mx-auto mb-10 leading-relaxed">
              StudyEx has helped thousands of Bangladeshi students gain admission to top universities in the UK, USA, Canada & Australia. Expert guidance from inquiry to enrollment.
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <button
                onClick={() => setShowConsultModal(true)}
                className="px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-bold rounded-xl shadow-xl shadow-blue-900/50 transition-all hover:-translate-y-0.5 text-lg"
              >
                📅 Book Free Consultation
              </button>
              <button
                onClick={() => setActivePage("universities")}
                className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold rounded-xl transition-all hover:-translate-y-0.5 text-lg backdrop-blur-sm"
              >
                🔍 Explore Universities
              </button>
            </div>
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((s) => (
                <div key={s.label} className="bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="text-3xl font-black text-white mb-1">{s.value}</div>
                  <div className="text-sm text-blue-300">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* AI Eligibility Checker */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-10">
            <span className="inline-block bg-white/20 text-white text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-4">🤖 AI-Powered Tool</span>
            <h2 className="text-3xl md:text-4xl font-black mb-3">Find Your Match in 60 Seconds</h2>
            <p className="text-blue-100 text-lg">Enter your academic profile and our AI instantly shows which universities you're likely to get into.</p>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CGPA / Grades</label>
                <input
                  type="number"
                  placeholder="e.g. 3.5"
                  value={cgpa}
                  onChange={e => setCgpa(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-gray-800 focus:border-blue-400 focus:outline-none font-semibold transition-colors"
                  max="4"
                  step="0.1"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">IELTS / TOEFL Score</label>
                <input
                  type="number"
                  placeholder="e.g. 6.5"
                  value={ielts}
                  onChange={e => setIelts(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-gray-800 focus:border-blue-400 focus:outline-none font-semibold transition-colors"
                  max="9"
                  step="0.5"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Destination</label>
                <select
                  value={destination}
                  onChange={e => setDestination(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-gray-800 focus:border-blue-400 focus:outline-none font-semibold transition-colors bg-white"
                >
                  <option value="UK">🇬🇧 United Kingdom</option>
                  <option value="USA">🇺🇸 United States</option>
                  <option value="Canada">🇨🇦 Canada</option>
                  <option value="Australia">🇦🇺 Australia</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Annual Budget (USD)</label>
                <input
                  type="number"
                  placeholder="e.g. 30000"
                  value={budget}
                  onChange={e => setBudget(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl text-gray-800 focus:border-blue-400 focus:outline-none font-semibold transition-colors"
                />
              </div>
            </div>
            <button
              onClick={handleCheckEligibility}
              disabled={checking || !cgpa || !ielts}
              className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl text-lg hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
            >
              {checking ? "🔍 Analyzing your profile..." : "✨ Check My Eligibility"}
            </button>

            {eligibilityResult && (
              <div className="mt-6 space-y-4">
                <h3 className="text-gray-800 font-black text-xl text-center">Your Personalized University Matches</h3>
                {eligibilityResult.map((group) => (
                  <div key={group.type} className={`border rounded-xl p-4 ${typeColors[group.type]}`}>
                    <div className="font-bold mb-2 text-sm uppercase tracking-wide">
                      {group.type === "Good Match" ? "✅" : group.type === "Reach" ? "🎯" : "🛡️"} {group.type}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {group.unis.map(uni => (
                        <span key={uni} className="bg-white/60 px-3 py-1 rounded-full text-sm font-medium">{uni}</span>
                      ))}
                    </div>
                  </div>
                ))}
                <button
                  onClick={() => setShowConsultModal(true)}
                  className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl"
                >
                  Get Expert Guidance on These Matches →
                </button>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Destinations */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">Study in Your Dream Destination</h2>
            <p className="text-gray-500 text-lg">We specialize in placing students at top institutions across 4 major study destinations</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {destinations.map((dest) => (
              <button
                key={dest.country}
                onClick={() => setActivePage("universities")}
                className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-br ${dest.color} p-8 text-white text-left`}>
                  <div className="text-5xl mb-4">{dest.flag}</div>
                  <h3 className="text-xl font-black mb-1">{dest.country}</h3>
                  <p className="text-sm opacity-80 mb-3">{dest.unis}</p>
                  <p className="text-xs opacity-60">{dest.popular}</p>
                  <div className="mt-4 text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
                    Explore → 
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-14">
            <h2 className="text-3xl md:text-4xl font-black text-gray-900 mb-4">From Dream to Destination</h2>
            <p className="text-gray-500 text-lg">Our proven 6-step process has placed 5,000+ students worldwide</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { step: "01", icon: "🎯", title: "Profile Building", desc: "We assess your academic profile and goals" },
              { step: "02", icon: "🏫", title: "University Shortlisting", desc: "AI-matched universities based on your profile" },
              { step: "03", icon: "📝", title: "Application", desc: "Perfect SOP, LOR, and application submission" },
              { step: "04", icon: "🎉", title: "Offer Received", desc: "Celebrate your conditional or unconditional offer" },
              { step: "05", icon: "🛂", title: "Visa Processing", desc: "Expert visa guidance with 98% success rate" },
              { step: "06", icon: "✈️", title: "Pre-Departure", desc: "Accommodation, travel, and orientation support" },
            ].map((item, i) => (
              <div key={item.step} className="relative text-center group">
                {i < 5 && (
                  <div className="hidden lg:block absolute top-8 left-[60%] w-full h-0.5 bg-gradient-to-r from-blue-200 to-blue-300" />
                )}
                <div className="relative z-10 inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-100 to-indigo-100 group-hover:from-blue-600 group-hover:to-indigo-600 rounded-2xl mb-4 text-2xl shadow-sm transition-all duration-300">
                  <span className="group-hover:scale-110 transition-transform inline-block">{item.icon}</span>
                </div>
                <div className="text-xs font-black text-blue-400 mb-1">STEP {item.step}</div>
                <h3 className="text-sm font-bold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-slate-900 to-blue-950 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-1 mb-3">
              {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-xl">★</span>)}
              <span className="text-yellow-400 font-bold ml-2">4.9/5</span>
              <span className="text-blue-300 text-sm ml-1">(1,247 Google Reviews)</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-black mb-4">Success Stories</h2>
            <p className="text-blue-300 text-lg">Real students. Real results. Real universities.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.slice(0,3).map((t) => (
              <div key={t.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur-sm hover:bg-white/10 transition-all">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-black text-sm">
                    {t.photo}
                  </div>
                  <div>
                    <div className="font-bold text-white">{t.name}</div>
                    <div className="text-blue-300 text-xs">{t.university}</div>
                    <div className="text-blue-400 text-xs">{t.course} · {t.year}</div>
                  </div>
                </div>
                <div className="flex gap-0.5 mb-3">
                  {Array(t.rating).fill(0).map((_, i) => <span key={i} className="text-yellow-400 text-sm">★</span>)}
                </div>
                <p className="text-blue-100/80 text-sm leading-relaxed italic">"{t.text}"</p>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <a href="#" className="inline-flex items-center gap-2 text-blue-300 hover:text-white font-semibold transition-colors">
              View All 1,247+ Reviews on Google
              <span>→</span>
            </a>
          </div>
        </div>
      </section>

      {/* Partner Universities */}
      <section className="py-14 bg-white border-y border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <p className="text-center text-gray-400 text-sm font-semibold uppercase tracking-widest mb-8">Our University Partners</p>
          <div className="flex flex-wrap justify-center gap-4">
            {partnerLogos.map((logo, i) => (
              <div key={i} className="px-5 py-3 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 rounded-xl text-gray-600 hover:text-blue-700 font-semibold text-sm transition-all cursor-pointer">
                {logo}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-xl px-5 py-3">
              <span className="text-2xl">🇬🇧</span>
              <div>
                <div className="text-xs font-black text-gray-600 uppercase tracking-wide">British Council</div>
                <div className="text-xs text-gray-400">Certified Agent</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-green-50 border border-green-100 rounded-xl px-5 py-3">
              <span className="text-2xl">✅</span>
              <div>
                <div className="text-xs font-black text-gray-600 uppercase tracking-wide">ICEF</div>
                <div className="text-xs text-gray-400">Accredited Agency</div>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-yellow-50 border border-yellow-100 rounded-xl px-5 py-3">
              <span className="text-2xl">⭐</span>
              <div>
                <div className="text-xs font-black text-gray-600 uppercase tracking-wide">Google</div>
                <div className="text-xs text-gray-400">4.9 Star Rating</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog CTA Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white shadow-2xl">
            <div>
              <h2 className="text-2xl md:text-3xl font-black mb-3">Download Our Free Study Abroad Checklist</h2>
              <p className="text-blue-100 text-lg">The ultimate 50-point checklist used by our top counselors. 100% free.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <input
                type="email"
                placeholder="Your email address"
                className="px-5 py-3 rounded-xl text-gray-800 font-medium w-64 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button className="px-6 py-3 bg-white text-blue-700 font-black rounded-xl hover:bg-blue-50 transition-all shadow-md whitespace-nowrap">
                Get Free PDF →
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
