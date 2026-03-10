import { useState } from "react";

interface StudentPortalProps {
  onClose: () => void;
}

const applicationSteps = [
  { id: 0, label: "Profile Building", icon: "👤", status: "complete" },
  { id: 1, label: "University Shortlisting", icon: "🏫", status: "complete" },
  { id: 2, label: "Application Submitted", icon: "📝", status: "active" },
  { id: 3, label: "Offer Received", icon: "🎉", status: "pending" },
  { id: 4, label: "Visa Lodged", icon: "🛂", status: "pending" },
  { id: 5, label: "Success!", icon: "✈️", status: "pending" },
];

const documents = [
  { name: "Passport", status: "approved", uploaded: "Jun 10, 2025" },
  { name: "Academic Transcripts", status: "approved", uploaded: "Jun 12, 2025" },
  { name: "IELTS Certificate", status: "approved", uploaded: "Jun 15, 2025" },
  { name: "Statement of Purpose (SOP)", status: "review", uploaded: "Jun 18, 2025" },
  { name: "Letter of Recommendation #1", status: "missing", uploaded: null },
  { name: "Letter of Recommendation #2", status: "missing", uploaded: null },
  { name: "CV / Resume", status: "review", uploaded: "Jun 20, 2025" },
];

const notifications = [
  { icon: "🎉", text: "Your application to University of Manchester has been submitted!", time: "2 hours ago", unread: true },
  { icon: "📝", text: "Your SOP is under review. Expected feedback within 48 hours.", time: "1 day ago", unread: true },
  { icon: "📞", text: "Counselor Nadia has scheduled a call for June 25 at 3 PM.", time: "2 days ago", unread: false },
];

type AuthMode = "login" | "register" | "portal";

export default function StudentPortal({ onClose }: StudentPortalProps) {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [activeTab, setActiveTab] = useState("tracker");
  const [docStatuses, setDocStatuses] = useState(documents.map(d => d.status));

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (email && password) setMode("portal");
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email && password) setMode("portal");
  };

  const handleUpload = (idx: number) => {
    const updated = [...docStatuses];
    updated[idx] = "review";
    setDocStatuses(updated);
  };

  const statusConfig = {
    approved: { icon: "✅", color: "text-green-600", bg: "bg-green-50 border-green-200", label: "Approved" },
    review: { icon: "🔄", color: "text-yellow-600", bg: "bg-yellow-50 border-yellow-200", label: "Under Review" },
    missing: { icon: "❌", color: "text-red-500", bg: "bg-red-50 border-red-200", label: "Missing" },
  };

  if (mode === "login") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-8 text-white relative">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center font-bold transition-colors">×</button>
            <div className="text-3xl mb-3">🔐</div>
            <h2 className="text-2xl font-black mb-1">Student Portal</h2>
            <p className="text-blue-300 text-sm">Access your application dashboard</p>
          </div>
          <form onSubmit={handleLogin} className="p-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="••••••••"
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium" />
            </div>
            <div className="text-right">
              <a href="#" className="text-xs text-blue-600 font-semibold hover:text-blue-700">Forgot password?</a>
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
              Sign In to Portal →
            </button>
            <p className="text-center text-sm text-gray-500">
              Don't have an account?{" "}
              <button type="button" onClick={() => setMode("register")} className="text-blue-600 font-bold hover:text-blue-700">Register here</button>
            </p>
            <div className="bg-blue-50 rounded-xl p-3 text-center text-xs text-blue-600 font-medium">
              💡 Demo: Use any email + password to log in
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (mode === "register") {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-white rounded-3xl w-full max-w-md shadow-2xl overflow-hidden" onClick={e => e.stopPropagation()}>
          <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-8 text-white relative">
            <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 bg-white/20 hover:bg-white/40 rounded-full flex items-center justify-center font-bold transition-colors">×</button>
            <div className="text-3xl mb-3">✨</div>
            <h2 className="text-2xl font-black mb-1">Create Account</h2>
            <p className="text-blue-300 text-sm">Start tracking your study abroad journey</p>
          </div>
          <form onSubmit={handleRegister} className="p-8 space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Full Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="Your full name"
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Email</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} required placeholder="you@example.com"
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium" />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1.5">Password</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} required placeholder="Minimum 8 characters"
                className="w-full px-4 py-3 border-2 border-gray-100 rounded-xl focus:border-blue-400 focus:outline-none transition-colors font-medium" />
            </div>
            <button type="submit" className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
              Create My Account →
            </button>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <button type="button" onClick={() => setMode("login")} className="text-blue-600 font-bold hover:text-blue-700">Sign in</button>
            </p>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-gray-50" onClick={e => e.stopPropagation()}>
      {/* Portal Header */}
      <div className="bg-gradient-to-r from-slate-900 to-blue-950 text-white px-6 py-4 flex items-center justify-between flex-shrink-0">
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center font-black">
            AR
          </div>
          <div>
            <h1 className="font-black text-lg">My Application Hub</h1>
            <p className="text-blue-300 text-xs">Arif Rahman · UK Applicant 2025</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <button className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center transition-colors text-lg">🔔</button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-black">2</span>
          </div>
          <button onClick={onClose} className="w-9 h-9 bg-white/10 hover:bg-white/20 rounded-xl flex items-center justify-center font-bold transition-colors text-lg">×</button>
        </div>
      </div>

      {/* Notifications Banner */}
      {notifications.filter(n => n.unread).length > 0 && (
        <div className="bg-blue-600 text-white px-6 py-2.5 text-sm flex items-center gap-2">
          <span className="font-bold">🔔 {notifications.filter(n => n.unread).length} new notifications:</span>
          <span className="text-blue-100 truncate">{notifications[0].text}</span>
        </div>
      )}

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-6 flex gap-1 flex-shrink-0">
        {[
          { id: "tracker", label: "📊 Application Tracker" },
          { id: "documents", label: "📁 Documents" },
          { id: "counselor", label: "👤 My Counselor" },
          { id: "booking", label: "📅 Book Appointment" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-4 text-sm font-semibold border-b-2 -mb-px transition-all whitespace-nowrap ${
              activeTab === tab.id ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 overflow-y-auto p-6">
        {activeTab === "tracker" && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-6">Application Progress</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 mb-6">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                {applicationSteps.map((step, i) => (
                  <div key={step.id} className="flex items-center gap-3 md:gap-0">
                    <div className="flex flex-col items-center">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-sm ${
                        step.status === "complete" ? "bg-green-500 text-white" :
                        step.status === "active" ? "bg-blue-600 text-white ring-4 ring-blue-100" :
                        "bg-gray-100 text-gray-400"
                      }`}>
                        {step.status === "complete" ? "✓" : step.icon}
                      </div>
                      <div className="text-xs font-semibold text-center mt-1.5 max-w-16 leading-tight">
                        <span className={step.status === "active" ? "text-blue-600 font-black" : step.status === "complete" ? "text-green-600" : "text-gray-400"}>
                          {step.label}
                        </span>
                      </div>
                    </div>
                    {i < applicationSteps.length - 1 && (
                      <div className={`hidden md:block flex-1 h-1 mx-3 rounded ${
                        applicationSteps[i + 1].status === "complete" || (step.status === "complete") ? "bg-green-300" : "bg-gray-200"
                      }`} style={{ minWidth: "30px" }} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-blue-600 font-black text-2xl mb-2">3</div>
                <div className="text-gray-600 text-sm font-medium">Universities Applied</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-yellow-600 font-black text-2xl mb-2">2</div>
                <div className="text-gray-600 text-sm font-medium">Documents Under Review</div>
              </div>
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <div className="text-green-600 font-black text-2xl mb-2">Jun 25</div>
                <div className="text-gray-600 text-sm font-medium">Next Counselor Meeting</div>
              </div>
            </div>

            <div className="mt-6 bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
              <h3 className="font-black text-gray-900 mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {notifications.map((n, i) => (
                  <div key={i} className={`flex items-start gap-3 p-3 rounded-xl ${n.unread ? "bg-blue-50 border border-blue-100" : "bg-gray-50"}`}>
                    <span className="text-xl flex-shrink-0">{n.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-gray-700 font-medium">{n.text}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{n.time}</p>
                    </div>
                    {n.unread && <span className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1.5" />}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "documents" && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-6">Document Checklist</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              {documents.map((doc, idx) => {
                const status = docStatuses[idx] as keyof typeof statusConfig;
                const cfg = statusConfig[status];
                return (
                  <div key={doc.name} className={`flex items-center gap-4 p-5 border-b border-gray-50 last:border-0 ${cfg.bg} border-l-4`}>
                    <span className="text-xl">{cfg.icon}</span>
                    <div className="flex-1">
                      <div className="font-bold text-gray-900 text-sm">{doc.name}</div>
                      {doc.uploaded && status !== "missing" ? (
                        <div className="text-xs text-gray-400 mt-0.5">Uploaded: {doc.uploaded}</div>
                      ) : (
                        <div className="text-xs text-red-400 mt-0.5">Not yet uploaded</div>
                      )}
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs font-bold ${cfg.color} px-2 py-0.5 rounded-full border ${cfg.bg}`}>{cfg.label}</span>
                      {status === "missing" && (
                        <button
                          onClick={() => handleUpload(idx)}
                          className="px-4 py-2 bg-blue-600 text-white text-xs font-bold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          📎 Upload
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-4 bg-blue-50 rounded-xl p-4 text-sm text-blue-700 font-medium">
              📱 On mobile? Use the Upload button to open your camera directly for easy document scanning!
            </div>
          </div>
        )}

        {activeTab === "counselor" && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-6">My Counselor</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8 max-w-md">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center text-white font-black text-2xl">
                  NI
                </div>
                <div>
                  <h3 className="font-black text-gray-900 text-xl">Nadia Islam</h3>
                  <p className="text-blue-600 font-semibold">Senior Study Abroad Counselor</p>
                  <div className="flex gap-1 mt-1">
                    {[1,2,3,4,5].map(s => <span key={s} className="text-yellow-400 text-xs">★</span>)}
                    <span className="text-xs text-gray-400 ml-1">4.9 (312 reviews)</span>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-blue-500">🎓</span> Expert in UK & USA Admissions
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-blue-500">📅</span> 8 years of experience
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-blue-500">✅</span> 450+ students successfully placed
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <span className="text-blue-500">🗣️</span> Speaks English, Bengali, Hindi
                </div>
              </div>
              <div className="space-y-3">
                <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all">
                  💬 Chat Now
                </button>
                <button className="w-full py-3 border-2 border-blue-200 text-blue-600 font-bold rounded-xl hover:bg-blue-50 transition-colors">
                  📅 Schedule a Meeting
                </button>
              </div>
            </div>
          </div>
        )}

        {activeTab === "booking" && (
          <div>
            <h2 className="text-xl font-black text-gray-900 mb-6">Schedule an Appointment</h2>
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 max-w-2xl">
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Select Service</label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {["30-Min Profile Review", "1-Hour Visa Guidance", "SOP Review Session", "University Selection Consult"].map(svc => (
                    <div key={svc} className="p-4 border-2 border-gray-100 hover:border-blue-400 rounded-xl cursor-pointer transition-colors group">
                      <div className="font-bold text-gray-800 text-sm group-hover:text-blue-700 transition-colors">{svc}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-5">
                <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Select Date & Time</label>
                <div className="grid grid-cols-4 sm:grid-cols-7 gap-2 mb-4">
                  {["Mon 23", "Tue 24", "Wed 25", "Thu 26", "Fri 27", "Sat 28", "Sun 29"].map((day, i) => (
                    <button key={day} className={`p-2.5 rounded-xl text-xs font-bold text-center transition-all border ${
                      i === 2 ? "bg-blue-600 text-white border-blue-600 shadow-md" : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                    }`}>
                      {day.split(" ").map((d, j) => <div key={j}>{d}</div>)}
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                  {["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM", "4:00 PM"].map((time, i) => (
                    <button key={time} className={`py-2.5 rounded-xl text-xs font-bold transition-all border ${
                      i === 2 ? "bg-blue-600 text-white border-blue-600" : "border-gray-200 text-gray-600 hover:border-blue-300 hover:bg-blue-50"
                    }`}>
                      {time}
                    </button>
                  ))}
                </div>
                <p className="text-xs text-gray-400 mt-2">Times shown in your local timezone (GMT+6)</p>
              </div>
              <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-lg">
                Confirm Appointment – Google Meet link will be sent automatically
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
