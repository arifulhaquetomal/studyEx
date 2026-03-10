interface FooterProps {
  setActivePage: (page: string) => void;
  setShowConsultModal: (v: boolean) => void;
}

export default function Footer({ setActivePage, setShowConsultModal }: FooterProps) {
  return (
    <footer className="bg-slate-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center">
                <span className="text-white font-black text-sm">SE</span>
              </div>
              <span className="font-black text-xl">Study<span className="text-blue-400">Ex</span></span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-5">
              Bangladesh's most trusted study abroad agency. We've helped 5,000+ students gain admission to top universities worldwide since 2009.
            </p>
            <div className="space-y-2 text-sm">
              <a href="#" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                📍 House 12, Road 4, Gulshan, Dhaka 1212
              </a>
              <a href="tel:+8801700000000" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                📞 +880 1700-000000
              </a>
              <a href="mailto:info@studyex.net" className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                ✉️ info@studyex.net
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-black text-white mb-5 uppercase tracking-wider text-xs">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", page: "home" },
                { label: "University Finder", page: "universities" },
                { label: "Scholarship Finder", page: "scholarships" },
                { label: "Pricing & Packages", page: "pricing" },
                { label: "Blog & Resources", page: "blog" },
                { label: "Community Forum", page: "community" },
              ].map(l => (
                <li key={l.page}>
                  <button
                    onClick={() => { setActivePage(l.page); window.scrollTo(0, 0); }}
                    className="text-gray-400 hover:text-white text-sm transition-colors"
                  >
                    {l.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-black text-white mb-5 uppercase tracking-wider text-xs">Study Destinations</h4>
            <ul className="space-y-3 text-sm text-gray-400">
              <li className="hover:text-white transition-colors cursor-pointer">🇬🇧 Study in United Kingdom</li>
              <li className="hover:text-white transition-colors cursor-pointer">🇺🇸 Study in United States</li>
              <li className="hover:text-white transition-colors cursor-pointer">🇨🇦 Study in Canada</li>
              <li className="hover:text-white transition-colors cursor-pointer">🇦🇺 Study in Australia</li>
            </ul>
            <h4 className="font-black text-white mb-4 mt-8 uppercase tracking-wider text-xs">Accreditations</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-gray-300">
                🇬🇧 British Council Certified Agent
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-gray-300">
                ✅ ICEF Accredited Agency
              </div>
              <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-xs font-semibold text-gray-300">
                ⭐ Google Rated 4.9/5 (1,247 reviews)
              </div>
            </div>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-black text-white mb-5 uppercase tracking-wider text-xs">Stay Updated</h4>
            <p className="text-gray-400 text-sm mb-4">Get scholarship alerts, visa updates, and application tips in your inbox.</p>
            <div className="space-y-3">
              <input
                type="email"
                placeholder="Your email address"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-400 text-sm transition-colors"
              />
              <button className="w-full py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all text-sm">
                Subscribe for Free
              </button>
            </div>
            <div className="mt-5">
              <button
                onClick={() => setShowConsultModal(true)}
                className="w-full py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-xl hover:from-green-700 hover:to-emerald-700 transition-all text-sm"
              >
                📅 Book Free Consultation
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-14 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} StudyEx.net. All rights reserved. Built with ❤️ for Bangladeshi students.
          </p>
          <div className="flex flex-wrap gap-5 text-xs text-gray-500">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Refund Policy</a>
            <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
