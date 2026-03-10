import { useState } from "react";
import { forumPosts } from "../data";

export default function CommunityPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [votes, setVotes] = useState<Record<number, number>>({});
  const [newPost, setNewPost] = useState({ title: "", category: "Visa Experiences", text: "" });
  const [posts, setPosts] = useState(forumPosts);
  const [showNewPost, setShowNewPost] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const categories = ["All", "Visa Experiences", "Life in Canada", "Accommodation in London", "Life in USA", "Scholarships"];

  const filtered = posts.filter(p => activeCategory === "All" || p.category === activeCategory);

  const handleUpvote = (id: number) => {
    setVotes(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleSubmitPost = () => {
    if (!newPost.title || !newPost.text) return;
    const np = {
      id: Date.now(),
      category: newPost.category,
      title: newPost.title,
      author: "You",
      authorBadge: null,
      upvotes: 0,
      replies: 0,
      time: "Just now",
    };
    setPosts(prev => [np, ...prev]);
    setSubmitted(true);
    setShowNewPost(false);
    setNewPost({ title: "", category: "Visa Experiences", text: "" });
    setTimeout(() => setSubmitted(false), 4000);
  };

  const categoryColors: Record<string, string> = {
    "Visa Experiences": "bg-blue-100 text-blue-700",
    "Life in Canada": "bg-red-100 text-red-700",
    "Accommodation in London": "bg-purple-100 text-purple-700",
    "Life in USA": "bg-indigo-100 text-indigo-700",
    "Scholarships": "bg-yellow-100 text-yellow-700",
  };

  return (
    <div className="pt-16 min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-br from-violet-900 to-purple-950 text-white py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-4xl md:text-5xl font-black mb-4">💬 Community Forum</h1>
            <p className="text-purple-300 text-xl max-w-2xl">Connect with students, share experiences, and get advice from alumni mentors who've been in your shoes.</p>
          </div>
          <button
            onClick={() => setShowNewPost(true)}
            className="self-start md:self-auto px-6 py-3 bg-white text-purple-800 font-black rounded-xl hover:bg-purple-50 transition-colors shadow-lg text-sm"
          >
            + Create New Post
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        {submitted && (
          <div className="mb-6 bg-green-50 border border-green-200 rounded-xl p-4 text-green-700 font-semibold flex items-center gap-2">
            ✅ Your post has been submitted! The community will respond soon.
          </div>
        )}

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: "👥", label: "Members", value: "12,400+" },
            { icon: "💬", label: "Posts", value: "8,300+" },
            { icon: "🎓", label: "Alumni Mentors", value: "240+" },
          ].map(s => (
            <div key={s.label} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center">
              <div className="text-2xl mb-1">{s.icon}</div>
              <div className="text-xl font-black text-gray-900">{s.value}</div>
              <div className="text-xs text-gray-500 font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                activeCategory === cat ? "bg-purple-600 text-white shadow-md" : "bg-white text-gray-600 border border-gray-200 hover:border-purple-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* New Post Form */}
        {showNewPost && (
          <div className="bg-white rounded-2xl border-2 border-purple-200 shadow-lg p-6 mb-6">
            <h3 className="font-black text-gray-900 text-lg mb-4">✍️ Create a New Post</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Category</label>
                <select
                  value={newPost.category}
                  onChange={e => setNewPost(p => ({ ...p, category: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-purple-400 focus:outline-none"
                >
                  {categories.filter(c => c !== "All").map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Title</label>
                <input
                  type="text"
                  placeholder="Ask a question or share your experience..."
                  value={newPost.title}
                  onChange={e => setNewPost(p => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-purple-400 focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Your Post</label>
                <textarea
                  rows={4}
                  placeholder="Share more details here..."
                  value={newPost.text}
                  onChange={e => setNewPost(p => ({ ...p, text: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-purple-400 focus:outline-none resize-none"
                />
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleSubmitPost}
                  className="flex-1 py-3 font-black text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl hover:from-purple-700 hover:to-indigo-700 transition-all"
                >
                  Submit Post
                </button>
                <button
                  onClick={() => setShowNewPost(false)}
                  className="py-3 px-6 font-bold text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Forum Posts */}
        <div className="space-y-4">
          {filtered.map(post => (
            <div key={post.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all p-5 group cursor-pointer">
              <div className="flex gap-4">
                {/* Upvote */}
                <div className="flex flex-col items-center gap-1 flex-shrink-0">
                  <button
                    onClick={() => handleUpvote(post.id)}
                    className="w-9 h-9 rounded-xl bg-gray-50 hover:bg-purple-100 group-hover:border-purple-200 border border-gray-200 flex items-center justify-center transition-all hover:text-purple-600 text-gray-500"
                  >
                    ▲
                  </button>
                  <span className="text-sm font-black text-gray-700">{post.upvotes + (votes[post.id] || 0)}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex flex-wrap items-center gap-2 mb-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${categoryColors[post.category] || "bg-gray-100 text-gray-600"}`}>
                      {post.category}
                    </span>
                  </div>
                  <h3 className="font-black text-gray-900 text-base leading-tight mb-3 group-hover:text-purple-700 transition-colors">
                    {post.title}
                  </h3>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-full flex items-center justify-center text-white font-black text-xs">
                        {post.author[0]}
                      </div>
                      <span className="font-medium text-gray-600">{post.author}</span>
                      {post.authorBadge && (
                        <span className="px-2 py-0.5 bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 border border-amber-200 rounded-full font-bold text-xs">
                          🎓 {post.authorBadge}
                        </span>
                      )}
                    </div>
                    <span>💬 {post.replies} replies</span>
                    <span>🕐 {post.time}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Alumni Mentor CTA */}
        <div className="mt-10 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-3xl p-8 text-white">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="text-5xl">🎓</div>
            <div className="flex-1">
              <h3 className="text-xl font-black mb-2">Become an Alumni Mentor</h3>
              <p className="text-amber-100">Currently studying abroad after going through StudyEx? Apply to become a mentor and help the next generation of students!</p>
            </div>
            <button className="flex-shrink-0 px-6 py-3 bg-white text-amber-700 font-black rounded-xl hover:bg-amber-50 transition-colors shadow-lg whitespace-nowrap">
              Apply Now →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
