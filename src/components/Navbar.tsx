import { useState } from "react";

interface NavbarProps {
  activePage: string;
  setActivePage: (page: string) => void;
  setShowConsultModal: (show: boolean) => void;
  setIsPortalOpen: (open: boolean) => void;
}

export default function Navbar({ activePage, setActivePage, setShowConsultModal, setIsPortalOpen }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "universities", label: "Universities" },
    { id: "scholarships", label: "Scholarships" },
    { id: "pricing", label: "Pricing" },
    { id: "blog", label: "Resources" },
    { id: "community", label: "Community" },
  ];

  const handleNav = (page: string) => {
    setActivePage(page);
    setMobileOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button onClick={() => handleNav("home")} className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-blue-200 transition-shadow">
              <span className="text-white font-black text-sm">SE</span>
            </div>
            <div className="leading-tight text-left">
              <span className="font-black text-gray-900 text-lg tracking-tight">Study<span className="text-blue-600">Ex</span></span>
              <p className="text-[10px] text-gray-500 font-medium -mt-1">Global Education</p>
            </div>
          </button>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  activePage === link.id
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => setIsPortalOpen(true)}
              className="px-4 py-2 text-sm font-semibold text-blue-600 hover:text-blue-700 border border-blue-200 hover:border-blue-300 rounded-lg transition-all"
            >
              Student Portal
            </button>
            <button
              onClick={() => setShowConsultModal(true)}
              className="px-4 py-2 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg hover:from-blue-700 hover:to-indigo-700 shadow-md hover:shadow-blue-200 transition-all"
            >
              Free Consultation
            </button>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100"
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "rotate-45 translate-y-2.5" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "opacity-0" : ""}`} />
              <span className={`block h-0.5 bg-current transition-all ${mobileOpen ? "-rotate-45 -translate-y-2" : ""}`} />
            </div>
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-gray-100 py-3 space-y-1">
            {navLinks.map(link => (
              <button
                key={link.id}
                onClick={() => handleNav(link.id)}
                className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  activePage === link.id ? "bg-blue-50 text-blue-600" : "text-gray-600 hover:bg-gray-50"
                }`}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 space-y-2 px-1">
              <button
                onClick={() => { setIsPortalOpen(true); setMobileOpen(false); }}
                className="w-full py-2.5 text-sm font-semibold text-blue-600 border border-blue-200 rounded-lg"
              >
                Student Portal
              </button>
              <button
                onClick={() => { setShowConsultModal(true); setMobileOpen(false); }}
                className="w-full py-2.5 text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg"
              >
                Free Consultation
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
