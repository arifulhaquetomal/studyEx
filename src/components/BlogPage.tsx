import { useState } from "react";
import { blogPosts } from "../data";

export default function BlogPage({ setShowConsultModal }: { setShowConsultModal: (v: boolean) => void }) {
  const [selectedPost, setSelectedPost] = useState<typeof blogPosts[0] | null>(null);
  const [email, setEmail] = useState("");
  const [downloaded, setDownloaded] = useState(false);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Visa Guide", "Application Tips", "Student Life", "Scholarships", "Test Prep"];

  const filtered = blogPosts.filter(p => activeCategory === "All" || p.category === activeCategory);

  const categoryColors: Record<string, string> = {
    "Visa Guide": "bg-blue-100 text-blue-700",
    "Application Tips": "bg-green-100 text-green-700",
    "Student Life": "bg-purple-100 text-purple-700",
    "Scholarships": "bg-yellow-100 text-yellow-700",
    "Test Prep": "bg-red-100 text-red-700",
  };

  const handleDownload = () => {
    if (!email) return;
    setDownloaded(true);
  };

  if (selectedPost) {
    return (
      <div className="pt-16 min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12">
          <button
            onClick={() => setSelectedPost(null)}
            className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:text-blue-700 transition-colors"
          >
            ← Back to Resources
          </button>
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="bg-gradient-to-br from-blue-600 to-indigo-700 h-48 flex items-center justify-center text-6xl">
              {selectedPost.image}
            </div>
            <div className="p-8">
              <div className="flex items-center gap-3 mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold ${categoryColors[selectedPost.category] || "bg-gray-100 text-gray-600"}`}>
                  {selectedPost.category}
                </span>
                <span className="text-gray-400 text-sm">{selectedPost.date} · {selectedPost.readTime}</span>
              </div>
              <h1 className="text-3xl font-black text-gray-900 mb-6 leading-tight">{selectedPost.title}</h1>
              <div className="flex items-center gap-3 mb-8 pb-8 border-b border-gray-100">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-sm">
                  {selectedPost.author.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <div className="font-bold text-gray-900 text-sm">{selectedPost.author}</div>
                  <div className="text-gray-400 text-xs">{selectedPost.authorRole} at StudyEx</div>
                </div>
              </div>
              <div className="prose max-w-none text-gray-600 leading-relaxed space-y-4">
                <p className="text-lg font-medium text-gray-800">{selectedPost.excerpt}</p>
                <p>Studying abroad is one of the most exciting and transformative experiences of your life. However, it requires careful planning, especially when it comes to documentation, deadlines, and understanding what universities are looking for in their ideal candidates.</p>
                <h2 className="text-xl font-black text-gray-900 mt-6">Key Considerations</h2>
                <p>Every destination has unique requirements. The UK, for example, requires a Confirmation of Acceptance for Studies (CAS) number before you can apply for your student visa. Missing this step causes hundreds of application failures each year.</p>
                <p>In contrast, Canadian study permits require proof of financial support — often overlooked by first-time applicants. Our counselors have helped students compile this documentation correctly, contributing to our 98% visa success rate.</p>
                <h2 className="text-xl font-black text-gray-900 mt-6">What You Should Do Next</h2>
                <p>Start your preparation at least 12 months before your intended start date. This gives you enough time to take language tests, collect documents, write a compelling SOP, and wait for university responses.</p>
                <p>Most importantly, don't navigate this alone. Our counselors at StudyEx are available for a free 30-minute consultation to review your profile and guide you in the right direction.</p>
              </div>

              {/* CTA Box */}
              <div className="mt-10 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl p-8 text-white">
                <h3 className="text-xl font-black mb-2">Feeling overwhelmed?</h3>
                <p className="text-blue-100 mb-5">Download our free 'Ultimate Study Abroad Checklist'! 50 steps to guarantee a smooth application. Used by 5,000+ successful students.</p>
                {!downloaded ? (
                  <div className="flex gap-3">
                    <input
                      type="email"
                      placeholder="Your email address"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      className="flex-1 px-4 py-3 rounded-xl text-gray-800 font-medium focus:outline-none"
                    />
                    <button
                      onClick={handleDownload}
                      className="px-5 py-3 bg-white text-blue-700 font-black rounded-xl hover:bg-blue-50 transition-colors whitespace-nowrap"
                    >
                      Get Free PDF →
                    </button>
                  </div>
                ) : (
                  <div className="bg-white/20 rounded-xl p-4 text-center font-bold text-white">
                    ✅ Check your inbox! The checklist has been sent to {email}
                  </div>
                )}
              </div>

              <button
                onClick={() => setShowConsultModal(true)}
                className="mt-6 w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all"
              >
                Book a Free Consultation with Our Experts
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-emerald-900 to-teal-950 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black mb-4">📚 Resource Hub</h1>
          <p className="text-emerald-300 text-xl max-w-2xl">Expert guides, visa tips, and student success stories to help you every step of the way.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat ? "bg-blue-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-blue-200 hover:text-blue-600"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(post => (
            <article
              key={post.id}
              className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 overflow-hidden group cursor-pointer"
              onClick={() => setSelectedPost(post)}
            >
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 h-36 flex items-center justify-center text-5xl">
                {post.image}
              </div>
              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                    {post.category}
                  </span>
                  <span className="text-gray-400 text-xs">{post.readTime}</span>
                </div>
                <h2 className="font-black text-gray-900 mb-2 leading-tight text-base group-hover:text-blue-600 transition-colors">{post.title}</h2>
                <p className="text-gray-500 text-sm leading-relaxed mb-4 line-clamp-2">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-xs">
                      {post.author.split(" ").map(n => n[0]).join("")}
                    </div>
                    <span className="text-xs text-gray-500 font-medium">{post.author}</span>
                  </div>
                  <span className="text-xs text-gray-400">{post.date}</span>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Checklist Download CTA */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-3xl p-10 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div>
              <div className="text-4xl mb-3">📋</div>
              <h3 className="text-2xl font-black mb-2">Download the Ultimate Study Abroad Checklist</h3>
              <p className="text-blue-100 text-lg">50 actionable steps. Zero confusion. Used by 5,000+ StudyEx students.</p>
            </div>
            <div className="flex-shrink-0">
              {!downloaded ? (
                <div className="flex flex-col gap-3">
                  <input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    className="px-5 py-3 rounded-xl text-gray-800 font-medium w-72 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  />
                  <button
                    onClick={handleDownload}
                    className="px-6 py-3 bg-white text-blue-700 font-black rounded-xl hover:bg-blue-50 transition-colors shadow-lg"
                  >
                    Send Me the Free PDF →
                  </button>
                </div>
              ) : (
                <div className="bg-white/20 rounded-xl p-6 text-center font-bold">
                  ✅ Check your inbox! {email}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
