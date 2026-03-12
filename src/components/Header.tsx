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
          transition: 'all 0.35s ease',
          background: transparent ? 'transparent' : '#FDF6E3',
          boxShadow: transparent ? 'none' : '0 1px 0 rgba(122,79,45,0.15)',
          borderBottom: transparent ? 'none' : '1px solid rgba(122,79,45,0.12)',
        }}
      >
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 72 }}>
          {/* Logo */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12 }}>
            {/* Monogram emblem */}
            <div style={{
              width: 42, height: 42,
              border: `1px solid ${transparent ? 'rgba(201,168,76,0.5)' : 'rgba(122,79,45,0.35)'}`,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: transparent ? 'rgba(201,168,76,0.08)' : 'rgba(122,79,45,0.06)',
              position: 'relative',
              transition: 'all 0.35s ease',
            }}>
              <span style={{
                color: transparent ? '#C9A84C' : '#7A4F2D',
                fontWeight: 700, fontSize: 20,
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                transition: 'color 0.35s ease',
              }}>S</span>
            </div>
            <div>
              <span style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 700,
                fontSize: 22,
                fontStyle: 'italic',
                color: transparent ? '#F5EDD8' : '#1C1007',
                transition: 'color 0.35s ease',
                display: 'block',
                lineHeight: 1,
              }}>
                Study<span style={{ color: transparent ? '#C9A84C' : '#7A4F2D' }}>Ex</span>
              </span>
              <span style={{
                fontFamily: 'var(--font-label)',
                fontSize: 8,
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: transparent ? 'rgba(245,237,216,0.55)' : 'rgba(107,91,75,0.7)',
                display: 'block',
                marginTop: 2,
                transition: 'color 0.35s ease',
              }}>Est. 2009</span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav style={{ display: 'flex', alignItems: 'center', gap: 36 }} className="desktop-nav">
            {navLinks.map(link => (
              <Link
                key={link.to}
                to={link.to}
                className={`nav-link ${location.pathname === link.to ? 'active' : ''}`}
                style={{ color: transparent ? 'rgba(245,237,216,0.88)' : '#1C1007' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 20 }} className="desktop-actions">
            <a
              href="tel:+8801733933689"
              style={{
                fontFamily: 'var(--font-label)',
                fontSize: 11,
                letterSpacing: '0.1em',
                color: transparent ? 'rgba(245,237,216,0.7)' : 'rgba(107,91,75,0.8)',
                textDecoration: 'none',
                transition: 'color 0.25s ease',
                textTransform: 'uppercase',
              }}
            >
              ☎ +880 1733-933689
            </a>
            <Link to="/apply" className="btn btn-red" style={{ padding: '9px 20px', fontSize: 11 }}>
              Apply Now
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
                height: 1.5,
                background: transparent ? '#C9A84C' : '#1C1007',
                borderRadius: 0,
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
        {/* Top row */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 48 }}>
          <span style={{ fontFamily: 'var(--font-heading)', fontSize: 22, fontStyle: 'italic', color: '#F5EDD8', fontWeight: 700 }}>
            Study<span style={{ color: '#C9A84C' }}>Ex</span>
          </span>
          <button
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
            style={{ background: 'none', border: 'none', color: 'rgba(245,237,216,0.7)', fontSize: 24, cursor: 'pointer', padding: 4 }}
          >
            ✕
          </button>
        </div>

        {/* Ornament */}
        <div style={{ borderBottom: '1px solid rgba(201,168,76,0.2)', marginBottom: 32 }} />

        <nav style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          {navLinks.map(link => (
            <Link
              key={link.to}
              to={link.to}
              style={{
                color: location.pathname === link.to ? '#C9A84C' : 'rgba(245,237,216,0.85)',
                textDecoration: 'none',
                fontSize: 22,
                fontFamily: 'var(--font-heading)',
                fontStyle: 'italic',
                fontWeight: 600,
                padding: '14px 0',
                borderBottom: '1px solid rgba(201,168,76,0.1)',
                transition: 'color 0.25s ease',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              {link.label}
              <span style={{ fontSize: 16, opacity: 0.4 }}>›</span>
            </Link>
          ))}
          <Link
            to="/apply"
            style={{
              marginTop: 28,
              textAlign: 'center',
              padding: '15px 0',
              background: '#6B1A2E',
              color: '#F5EDD8',
              borderRadius: 0,
              fontFamily: 'var(--font-label)',
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              textDecoration: 'none',
              border: '1px solid rgba(201,168,76,0.25)',
            }}
          >
            Apply Now
          </Link>
        </nav>

        <div style={{ marginTop: 'auto', paddingTop: 32 }}>
          <a href="tel:+8801733933689" style={{ color: 'rgba(245,237,216,0.5)', textDecoration: 'none', fontSize: 12, fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ☎ +880 1733-933689
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
