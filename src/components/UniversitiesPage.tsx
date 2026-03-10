import { useState } from "react";
import { universities } from "../data";

export default function UniversitiesPage({ setShowConsultModal }: { setShowConsultModal: (v: boolean) => void }) {
  const [countryFilter, setCountryFilter] = useState("All");
  const [rankingFilter, setRankingFilter] = useState("All");
  const [tuitionFilter, setTuitionFilter] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedUni, setSelectedUni] = useState<typeof universities[0] | null>(null);

  const filtered = universities.filter(u => {
    const countryOk = countryFilter === "All" || u.country === countryFilter;
    const rankingOk = rankingFilter === "All" || u.ranking === rankingFilter;
    const tuitionOk = tuitionFilter === "All" ||
      (tuitionFilter === "Under $30k" && u.tuition < 30000) ||
      (tuitionFilter === "$30k–$45k" && u.tuition >= 30000 && u.tuition <= 45000) ||
      (tuitionFilter === "Over $45k" && u.tuition > 45000);
    const searchOk = !searchQuery || u.name.toLowerCase().includes(searchQuery.toLowerCase());
    return countryOk && rankingOk && tuitionOk && searchOk;
  });

  const flagMap: Record<string, string> = { UK: "🇬🇧", USA: "🇺🇸", Canada: "🇨🇦", Australia: "🇦🇺" };
  const colorMap: Record<string, string> = {
    UK: "from-blue-600 to-indigo-800",
    USA: "from-red-600 to-blue-700",
    Canada: "from-red-500 to-red-700",
    Australia: "from-yellow-500 to-amber-700",
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-slate-900 to-blue-950 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">🏫 University Finder</h1>
          <p className="text-blue-300 text-xl max-w-2xl">Search and filter through 200+ partner universities. Find your perfect academic home.</p>
          <div className="mt-6 max-w-xl">
            <input
              type="text"
              placeholder="Search universities..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full px-5 py-4 rounded-xl text-gray-800 font-medium text-lg focus:outline-none shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-20">
              <h3 className="font-black text-gray-900 mb-5 text-lg">Filters</h3>
              
              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Country</label>
                {["All", "UK", "USA", "Canada", "Australia"].map(c => (
                  <button
                    key={c}
                    onClick={() => setCountryFilter(c)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-all ${
                      countryFilter === c ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {c !== "All" ? `${flagMap[c]} ` : ""}{c}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Ranking Tier</label>
                {["All", "Top 10", "Top 50"].map(r => (
                  <button
                    key={r}
                    onClick={() => setRankingFilter(r)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-all ${
                      rankingFilter === r ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Tuition Fee / Year</label>
                {["All", "Under $30k", "$30k–$45k", "Over $45k"].map(t => (
                  <button
                    key={t}
                    onClick={() => setTuitionFilter(t)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-all ${
                      tuitionFilter === t ? "bg-blue-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setCountryFilter("All"); setRankingFilter("All"); setTuitionFilter("All"); setSearchQuery(""); }}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* University Cards */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 font-medium">{filtered.length} universities found</p>
              <span className="text-sm text-gray-400">Showing partner institutions only</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-5">
              {filtered.map(u => (
                <div key={u.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group">
                  <div className={`bg-gradient-to-br ${colorMap[u.country]} h-24 flex items-center justify-center text-4xl relative`}>
                    <span>{u.logo}</span>
                    <span className="absolute top-3 right-3 bg-white/20 backdrop-blur-sm text-white text-xs font-bold px-2 py-0.5 rounded-full">
                      {flagMap[u.country]} {u.country}
                    </span>
                  </div>
                  <div className="p-5">
                    <h3 className="font-black text-gray-900 mb-1 text-base leading-tight">{u.name}</h3>
                    <p className="text-gray-500 text-xs mb-3">{u.description}</p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      <span className="px-2 py-0.5 bg-blue-50 text-blue-700 text-xs font-semibold rounded-full border border-blue-100">{u.ranking}</span>
                      <span className="px-2 py-0.5 bg-green-50 text-green-700 text-xs font-semibold rounded-full border border-green-100">${u.tuition.toLocaleString()}/yr</span>
                      <span className="px-2 py-0.5 bg-orange-50 text-orange-700 text-xs font-semibold rounded-full border border-orange-100">Deadline: {u.deadline}</span>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setSelectedUni(u)}
                        className="flex-1 py-2 text-sm font-bold text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors"
                      >
                        View Details
                      </button>
                      <button
                        onClick={() => setShowConsultModal(true)}
                        className="flex-1 py-2 text-sm font-bold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition-all"
                      >
                        Apply Now
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl font-semibold">No universities found</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* University Detail Modal */}
      {selectedUni && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={() => setSelectedUni(null)}>
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className={`bg-gradient-to-br ${colorMap[selectedUni.country]} h-40 flex items-center justify-center text-6xl relative rounded-t-3xl`}>
              <span>{selectedUni.logo}</span>
              <button onClick={() => setSelectedUni(null)} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors">×</button>
            </div>
            <div className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-2xl font-black text-gray-900">{selectedUni.name}</h2>
                  <p className="text-gray-500">{flagMap[selectedUni.country]} {selectedUni.country} · {selectedUni.ranking} Globally</p>
                </div>
                <span className="text-2xl font-black text-blue-600">${selectedUni.tuition.toLocaleString()}<span className="text-sm font-normal text-gray-400">/yr</span></span>
              </div>
              <p className="text-gray-600 mb-6">{selectedUni.description}</p>
              <div className="mb-6">
                <h3 className="font-black text-gray-900 mb-3">Popular Courses</h3>
                <div className="flex flex-wrap gap-2">
                  {selectedUni.courses.map(c => (
                    <span key={c} className="px-4 py-2 bg-blue-50 text-blue-700 rounded-xl text-sm font-semibold border border-blue-100">{c}</span>
                  ))}
                </div>
              </div>
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 mb-6">
                <div className="text-sm font-bold text-orange-700">⏰ Application Deadline</div>
                <div className="text-xl font-black text-orange-800">{selectedUni.deadline}</div>
              </div>
              <div className="flex gap-3">
                <button onClick={() => { setShowConsultModal(true); setSelectedUni(null); }} className="flex-1 py-3 font-black text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all">
                  Start My Application
                </button>
                <button onClick={() => setSelectedUni(null)} className="py-3 px-6 font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
