import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import PaperPlaneLoader from './components/PaperPlaneLoader';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import DestinationsPage from './pages/DestinationsPage';
import ContactPage from './pages/ContactPage';
import ApplyPage from './pages/ApplyPage';

export function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <PaperPlaneLoader onDone={() => setLoading(false)} />}
      <div style={{
        opacity: loading ? 0 : 1,
        transition: 'opacity 0.5s ease',
        visibility: loading ? 'hidden' : 'visible',
      }}>
        <BrowserRouter>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/destinations" element={<DestinationsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/apply" element={<ApplyPage />} />
            </Routes>
          </main>
          <Footer />
          <WhatsAppFloat />
        </BrowserRouter>
      </div>
    </>
  );
}
