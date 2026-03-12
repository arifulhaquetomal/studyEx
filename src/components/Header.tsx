import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Destinations', to: '/destinations' },
  { label: 'Contact', to: '/contact' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isHome = location.pathname === '/';
  const transparent = isHome && !scrolled && !mobileOpen;

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
          background: transparent ? 'transparent' : '#fff',
          boxShadow: transparent ? 'none' : '0 2px 24px rgba(10,22,40,0.10)',
          backdropFilter: transparent ? 'none' : 'blur(12px)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10 }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10,
              background: 'linear-gradient(135deg, #0057FF, #001F6B)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: 'var(--font-heading)' }}>S</span>
            </div>
            <span style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 700,
              fontSize: 22,
              color: transparent ? '#fff' : 'var(--navy)',
              transition: 'color 0.35s ease',
            }}>
              Study<span style={{ color: 'var(--blue)' }}>Ex</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 32 }} className="desktop-nav">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                style={{ color: transparent ? 'rgba(255,255,255,0.9)' : 'var(--navy)' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }} className="desktop-actions">
            <a
              href="tel:+8801733933689"
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 14,
                fontWeight: 500,
                color: transparent ? 'rgba(255,255,255,0.85)' : 'var(--gray)',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
              }}
            >
              📱 +880 1733-933689
            </a>
            <Link to="/apply" className="btn btn-red" style={{ padding: '10px 22px', fontSize: 14 }}>
              Apply Now →
            </Link>
          </div>

          {/* Hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            style={{
              display: 'none',
              flexDirection: 'column',
              gap: 5,
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: 8,
            }}
          >
            {[0, 1, 2].map(i => (
              <span key={i} style={{
                display: 'block',
                width: 24,
                height: 2,
                background: transparent ? '#fff' : 'var(--navy)',
                borderRadius: 2,
                transition: 'all 0.3s ease',
                transform: mobileOpen
                  ? i === 0 ? 'rotate(45deg) translate(5px, 5px)'
                  : i === 1 ? 'opacity: 0'
                  : 'rotate(-45deg) translate(5px, -5px)'
                  : 'none',
                opacity: mobileOpen && i === 1 ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </header>

      {/* Mobile Nav Overlay */}
      <div
        className={`mobile-nav-overlay ${mobileOpen ? 'open' : ''}`}
        aria-hidden={!mobileOpen}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: '#fff', fontWeight: 700 }}>
            Study<span style={{ color: 'var(--blue)' }}>Ex</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{ background: 'none', border: 'none', color: '#fff', fontSize: 28, cursor: 'pointer', padding: 4 }}
          >
            ✕
          </button>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: location.pathname === link.to ? 'var(--blue)' : '#fff',
                textDecoration: 'none',
                fontSize: 24,
                fontFamily: 'var(--font-heading)',
                fontWeight: 600,
                padding: '12px 0',
                borderBottom: '1px solid rgba(255,255,255,0.08)',
                transition: 'color 0.25s ease',
              }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/apply"
            style={{
              marginTop: 24,
              textAlign: 'center',
              padding: '16px 0',
              background: 'var(--red)',
              color: '#fff',
              borderRadius: 999,
              fontWeight: 600,
              fontSize: 16,
              textDecoration: 'none',
            }}
          >
            Apply Now →
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 32 }}>
          <a href="tel:+8801733933689" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', fontSize: 14 }}>
            📱 +880 1733-933689
          </a>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .desktop-nav, .desktop-actions { display: none !important; }
          .hamburger-btn { display: flex !important; }
        }
      `}</style>
    </>
  );
}
