import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: '#08101E', color: '#EDEBE4', paddingTop: 72, paddingBottom: 0 }}>
      {/* Top ornament bar */}
      <div style={{ borderTop: '1px solid rgba(197,168,111,0.35)', borderBottom: '1px solid rgba(197,168,111,0.12)', padding: '12px 0', background: 'rgba(197,168,111,0.04)', textAlign: 'center', marginBottom: 0 }}>
        <span style={{ fontFamily: 'var(--font-label)', fontSize: 10, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'rgba(197,168,111,0.7)' }}>
          ❧ &nbsp; Established 2009 · Sylhet, Bangladesh · Excellence in International Education &nbsp; ❧
        </span>
      </div>

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 48,
          paddingTop: 56,
          paddingBottom: 56,
        }}>
          {/* Col 1 — Brand */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
              <div style={{
                width: 42, height: 42,
                border: '1px solid rgba(197,168,111,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                background: 'rgba(197,168,111,0.06)',
              }}>
                <span style={{ color: '#C5A86F', fontWeight: 700, fontSize: 20, fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>S</span>
              </div>
              <div>
                <span style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 700, fontSize: 22, color: '#EDEBE4', display: 'block', lineHeight: 1 }}>
                  Study<span style={{ color: '#C5A86F' }}>Ex</span>
                </span>
                <span style={{ fontFamily: 'var(--font-label)', fontSize: 8, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(197,168,111,0.5)', display: 'block', marginTop: 2 }}>Est. 2009</span>
              </div>
            </Link>
            <p style={{ color: 'rgba(237,235,228,0.55)', lineHeight: 1.8, fontSize: 14, maxWidth: 280, marginBottom: 28, fontStyle: 'italic' }}>
              Bangladesh's premier international education consultancy. We guide ambitious students to world-class universities across the globe.
            </p>
            {/* Ornamental divider */}
            <div style={{ borderBottom: '1px solid rgba(197,168,111,0.2)', marginBottom: 20, width: 60 }} />
            <div style={{ display: 'flex', gap: 10 }}>
              {[
                { label: 'Facebook', icon: 'f', href: '#' },
                { label: 'Instagram', icon: 'ig', href: '#' },
                { label: 'LinkedIn', icon: 'in', href: '#' },
                { label: 'YouTube', icon: '▶', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 34, height: 34,
                    border: '1px solid rgba(197,168,111,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'rgba(237,235,228,0.55)', textDecoration: 'none',
                    fontSize: 11, fontWeight: 600, fontFamily: 'var(--font-label)',
                    transition: 'all 0.25s ease',
                  }}
                  onMouseEnter={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = '#C5A86F';
                    (e.currentTarget as HTMLElement).style.color = '#C5A86F';
                  }}
                  onMouseLeave={e => {
                    (e.currentTarget as HTMLElement).style.borderColor = 'rgba(197,168,111,0.2)';
                    (e.currentTarget as HTMLElement).style.color = 'rgba(237,235,228,0.55)';
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 — Quick Links */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 20, marginBottom: 8, color: '#EDEBE4', fontWeight: 600 }}>Quick Links</h4>
            <div style={{ width: 32, height: 1, background: 'rgba(197,168,111,0.5)', marginBottom: 20 }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {[
                { label: 'Home', to: '/' },
                { label: 'About Us', to: '/about' },
                { label: 'Our Services', to: '/services' },
                { label: 'Destinations', to: '/destinations' },
                { label: 'Contact', to: '/contact' },
                { label: 'Apply Now', to: '/apply' },
              ].map(link => (
                <li key={link.to}>
                  <Link
                    to={link.to}
                    style={{ color: 'rgba(237,235,228,0.5)', textDecoration: 'none', fontSize: 13, transition: 'color 0.25s ease', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C5A86F')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,235,228,0.5)')}
                  >
                    ›&nbsp; {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 — Destinations */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 20, marginBottom: 8, color: '#EDEBE4', fontWeight: 600 }}>Destinations</h4>
            <div style={{ width: 32, height: 1, background: 'rgba(197,168,111,0.5)', marginBottom: 20 }} />
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 10 }}>
              {['🇬🇧 United Kingdom', '🇺🇸 United States', '🇨🇦 Canada', '🇦🇺 Australia', '🇩🇪 Germany', '🇮🇪 Ireland', '🇳🇿 New Zealand', '🇦🇪 Dubai / UAE'].map(d => (
                <li key={d}>
                  <Link
                    to="/destinations"
                    style={{ color: 'rgba(237,235,228,0.5)', textDecoration: 'none', fontSize: 13, transition: 'color 0.25s ease', fontFamily: 'var(--font-body)' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#C5A86F')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,235,228,0.5)')}
                  >
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 20, marginBottom: 8, color: '#EDEBE4', fontWeight: 600 }}>Contact Us</h4>
            <div style={{ width: 32, height: 1, background: 'rgba(197,168,111,0.5)', marginBottom: 20 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
              <p style={{ color: 'rgba(237,235,228,0.5)', fontSize: 13, lineHeight: 1.7, fontStyle: 'italic' }}>
                Ali Bhaban (Ground Floor),<br />Airport Road, Sylhet-3100, Bangladesh
              </p>
              <a href="tel:+8801733933689" style={{ color: 'rgba(237,235,228,0.5)', textDecoration: 'none', fontSize: 13, transition: 'color 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C5A86F')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,235,228,0.5)')}>
                ☎ +880 1733-933689
              </a>
              <a href="mailto:hello@studyex.net" style={{ color: 'rgba(237,235,228,0.5)', textDecoration: 'none', fontSize: 13, transition: 'color 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C5A86F')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,235,228,0.5)')}>
                ✉ hello@studyex.net
              </a>
              <a href="https://wa.me/8801733933689" target="_blank" rel="noreferrer"
                style={{ color: '#25D366', textDecoration: 'none', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                WhatsApp Chat
              </a>
              <div style={{ borderTop: '1px solid rgba(197,168,111,0.12)', paddingTop: 12, marginTop: 4 }}>
                <p style={{ color: 'rgba(237,235,228,0.35)', fontSize: 11, marginBottom: 4, fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Office Hours</p>
                <p style={{ color: 'rgba(237,235,228,0.55)', fontSize: 12 }}>Sun–Thu: 9:00 AM – 6:00 PM</p>
                <p style={{ color: 'rgba(237,235,228,0.55)', fontSize: 12 }}>Fri–Sat: 10:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(197,168,111,0.15)',
          padding: '20px 0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <p style={{ color: 'rgba(237,235,228,0.3)', fontSize: 12, fontFamily: 'var(--font-label)', letterSpacing: '0.06em' }}>
            © {new Date().getFullYear()} StudyEx. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a key={item} href="#" style={{ color: 'rgba(237,235,228,0.3)', fontSize: 12, textDecoration: 'none', transition: 'color 0.25s ease', fontFamily: 'var(--font-label)', letterSpacing: '0.06em' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C5A86F')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,235,228,0.3)')}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
