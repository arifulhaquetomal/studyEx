import { useState } from "react";
import { scholarships } from "../data";

export default function ScholarshipsPage({ setShowConsultModal }: { setShowConsultModal: (v: boolean) => void }) {
  const [levelFilter, setLevelFilter] = useState("All");
  const [countryFilter, setCountryFilter] = useState("All");
  const [fieldFilter, setFieldFilter] = useState("All");
  const [search, setSearch] = useState("");

  const filtered = scholarships.filter(s => {
    const ok1 = levelFilter === "All" || s.level === levelFilter;
    const ok2 = countryFilter === "All" || s.country === countryFilter;
    const ok3 = fieldFilter === "All" || s.field === fieldFilter || s.field === "All Fields";
    const ok4 = !search || s.name.toLowerCase().includes(search.toLowerCase());
    return ok1 && ok2 && ok3 && ok4;
  });

  const flagMap: Record<string, string> = { UK: "🇬🇧", USA: "🇺🇸", Canada: "🇨🇦", Australia: "🇦🇺" };
  const levelColors: Record<string, string> = {
    "Bachelor's": "bg-blue-100 text-blue-700 border-blue-200",
    "Master's": "bg-purple-100 text-purple-700 border-purple-200",
    "PhD": "bg-green-100 text-green-700 border-green-200",
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-purple-900 to-indigo-950 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">🏆 Scholarship Finder</h1>
          <p className="text-purple-300 text-xl max-w-2xl">Discover fully-funded and partial scholarships. We've helped students win over $12M in scholarships.</p>
          <div className="mt-6 max-w-xl">
            <input
              type="text"
              placeholder="Search scholarships..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full px-5 py-4 rounded-xl text-gray-800 font-medium text-lg focus:outline-none shadow-lg"
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sticky top-20">
              <h3 className="font-black text-gray-900 mb-5 text-lg">Filters</h3>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Study Level</label>
                {["All", "Bachelor's", "Master's", "PhD"].map(l => (
                  <button
                    key={l}
                    onClick={() => setLevelFilter(l)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-all ${
                      levelFilter === l ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Country</label>
                {["All", "UK", "USA", "Canada", "Australia"].map(c => (
                  <button
                    key={c}
                    onClick={() => setCountryFilter(c)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-all ${
                      countryFilter === c ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {c !== "All" ? `${flagMap[c]} ` : ""}{c}
                  </button>
                ))}
              </div>

              <div className="mb-6">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Field of Study</label>
                {["All", "STEM", "Business", "Law", "Arts"].map(f => (
                  <button
                    key={f}
                    onClick={() => setFieldFilter(f)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium mb-1 transition-all ${
                      fieldFilter === f ? "bg-purple-600 text-white" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {f}
                  </button>
                ))}
              </div>

              <button
                onClick={() => { setLevelFilter("All"); setCountryFilter("All"); setFieldFilter("All"); setSearch(""); }}
                className="w-full py-2 text-sm text-gray-500 hover:text-gray-800 border border-gray-200 rounded-lg transition-colors"
              >
                Clear All Filters
              </button>
            </div>
          </aside>

          {/* Results */}
          <main className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600 font-medium">{filtered.length} scholarships found</p>
              <span className="text-sm text-gray-400">Sorted by deadline (closest first)</span>
            </div>

            <div className="space-y-4">
              {filtered.map(s => (
                <div key={s.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-6 group">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-2xl">{flagMap[s.country]}</span>
                        <h3 className="font-black text-gray-900 text-lg">{s.name}</h3>
                        <span className={`px-2 py-0.5 rounded-full text-xs font-bold border ${levelColors[s.level] || "bg-gray-100 text-gray-700"}`}>{s.level}</span>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">{s.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-200">📍 {s.country}</span>
                        <span className="px-3 py-1 bg-gray-50 text-gray-600 text-xs font-semibold rounded-full border border-gray-200">📚 {s.field}</span>
                        <span className="px-3 py-1 bg-orange-50 text-orange-600 text-xs font-semibold rounded-full border border-orange-200">⏰ Deadline: {s.deadline}</span>
                      </div>
                    </div>
                    <div className="flex flex-col items-end gap-3 flex-shrink-0">
                      <div className="text-right">
                        <div className="text-xs text-gray-400 font-medium uppercase tracking-wide">Scholarship Value</div>
                        <div className="text-2xl font-black text-green-600">{s.value}</div>
                      </div>
                      <button
                        onClick={() => setShowConsultModal(true)}
                        className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all shadow-md whitespace-nowrap"
                      >
                        Apply with Guidance →
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                <div className="text-6xl mb-4">🔍</div>
                <p className="text-xl font-semibold">No scholarships found</p>
                <p className="text-sm mt-2">Try adjusting your filters</p>
              </div>
            )}

            {/* Scholarship CTA */}
            <div className="mt-10 bg-gradient-to-r from-purple-600 to-indigo-700 rounded-3xl p-8 text-white text-center">
              <h3 className="text-2xl font-black mb-3">Not Sure Which Scholarship to Apply For?</h3>
              <p className="text-purple-100 mb-6 text-lg">Our experts have helped students win over $12 million in scholarships. Let us guide you.</p>
              <button
                onClick={() => setShowConsultModal(true)}
                className="px-8 py-4 bg-white text-purple-700 font-black rounded-xl hover:bg-purple-50 transition-colors shadow-lg text-lg"
              >
                Get Free Scholarship Guidance
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
