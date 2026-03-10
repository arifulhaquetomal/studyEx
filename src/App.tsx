import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./components/HomePage";
import UniversitiesPage from "./components/UniversitiesPage";
import ScholarshipsPage from "./components/ScholarshipsPage";
import PricingPage from "./components/PricingPage";
import BlogPage from "./components/BlogPage";
import CommunityPage from "./components/CommunityPage";
import ConsultationModal from "./components/ConsultationModal";
import StudentPortal from "./components/StudentPortal";
import CheckoutModal from "./components/CheckoutModal";

export default function App() {
  const [activePage, setActivePage] = useState("home");
  const [showConsultModal, setShowConsultModal] = useState(false);
  const [isPortalOpen, setIsPortalOpen] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutPlan, setCheckoutPlan] = useState("Standard");
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [whatsappPulse, setWhatsappPulse] = useState(false);

  // WhatsApp pulse effect
  useEffect(() => {
    const interval = setInterval(() => {
      setWhatsappPulse(p => !p);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleWhatsApp = () => {
    const message = encodeURIComponent("Hi StudyEx! I'm interested in studying abroad. Can you help me?");
    window.open(`https://wa.me/8801700000000?text=${message}`, "_blank");
  };

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <HomePage setActivePage={setActivePage} setShowConsultModal={setShowConsultModal} />;
      case "universities":
        return <UniversitiesPage setShowConsultModal={setShowConsultModal} />;
      case "scholarships":
        return <ScholarshipsPage setShowConsultModal={setShowConsultModal} />;
      case "pricing":
        return (
          <PricingPage
            setShowConsultModal={setShowConsultModal}
            setShowCheckout={setShowCheckout}
            setCheckoutPlan={setCheckoutPlan}
          />
        );
      case "blog":
        return <BlogPage setShowConsultModal={setShowConsultModal} />;
      case "community":
        return <CommunityPage />;
      default:
        return <HomePage setActivePage={setActivePage} setShowConsultModal={setShowConsultModal} />;
    }
  };

  return (
    <div className="font-sans antialiased">
      {/* Navbar */}
      <Navbar
        activePage={activePage}
        setActivePage={setActivePage}
        setShowConsultModal={setShowConsultModal}
        setIsPortalOpen={setIsPortalOpen}
      />

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer (not shown in portal) */}
      {!isPortalOpen && (
        <Footer setActivePage={setActivePage} setShowConsultModal={setShowConsultModal} />
      )}

      {/* Modals */}
      {showConsultModal && (
        <ConsultationModal onClose={() => setShowConsultModal(false)} />
      )}

      {isPortalOpen && (
        <StudentPortal onClose={() => setIsPortalOpen(false)} />
      )}

      {showCheckout && (
        <CheckoutModal plan={checkoutPlan} onClose={() => setShowCheckout(false)} />
      )}

      {/* WhatsApp Floating Button */}
      <button
        onClick={handleWhatsApp}
        className="fixed bottom-6 right-6 z-40 group"
        aria-label="Chat on WhatsApp"
      >
        <div className="relative">
          {/* Pulse ring */}
          <div className={`absolute inset-0 bg-green-500 rounded-full transition-all ${whatsappPulse ? "scale-125 opacity-20" : "scale-100 opacity-0"}`} />
          <div className="relative w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:shadow-green-500/50 transition-all hover:-translate-y-0.5">
            <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
            </svg>
          </div>
          {/* Tooltip */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap shadow-lg">
            Chat with us on WhatsApp
            <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 w-2 h-2 bg-gray-900 rotate-45" />
          </div>
        </div>
      </button>

      {/* Cookie Consent Banner */}
      {showCookieBanner && (
        <div className="fixed bottom-0 left-0 right-0 z-30 bg-white border-t border-gray-200 shadow-lg px-6 py-4">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              🍪 We use cookies to improve your experience and for analytics. By continuing, you agree to our{" "}
              <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Cookie Policy</a> and{" "}
              <a href="#" className="text-blue-600 font-semibold hover:text-blue-700">Privacy Policy</a>.
            </p>
            <div className="flex gap-3 flex-shrink-0">
              <button
                onClick={() => setShowCookieBanner(false)}
                className="px-4 py-2 text-sm font-semibold text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Manage Preferences
              </button>
              <button
                onClick={() => setShowCookieBanner(false)}
                className="px-5 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors"
              >
                Accept All
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
