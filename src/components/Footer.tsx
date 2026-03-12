import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{ background: 'var(--navy)', color: '#fff', paddingTop: 72, paddingBottom: 0 }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 48,
          paddingBottom: 64,
        }}>
          {/* Col 1 */}
          <div>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
              <div style={{
                width: 40, height: 40, borderRadius: 10,
                background: 'linear-gradient(135deg, #0057FF, #001F6B)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ color: '#fff', fontWeight: 700, fontSize: 18, fontFamily: 'var(--font-heading)' }}>S</span>
              </div>
              <span style={{ fontFamily: 'var(--font-heading)', fontWeight: 700, fontSize: 22, color: '#fff' }}>
                Study<span style={{ color: 'var(--blue)' }}>Ex</span>
              </span>
            </Link>
            <p style={{ color: 'rgba(255,255,255,0.6)', lineHeight: 1.75, fontSize: 14, maxWidth: 280, marginBottom: 24 }}>
              Bangladesh's premier international education consultancy. We guide ambitious students to world-class universities across the globe.
            </p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[
                { label: 'Facebook', icon: 'f', href: '#' },
                { label: 'Instagram', icon: '📷', href: '#' },
                { label: 'LinkedIn', icon: 'in', href: '#' },
                { label: 'YouTube', icon: '▶', href: '#' },
              ].map(s => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  style={{
                    width: 40, height: 40, borderRadius: '50%',
                    background: 'rgba(255,255,255,0.08)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: '#fff', textDecoration: 'none', fontSize: 14, fontWeight: 600,
                    transition: 'background 0.25s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = 'var(--blue)')}
                  onMouseLeave={e => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, marginBottom: 24, color: '#fff' }}>Quick Links</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
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
                    style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, transition: 'color 0.25s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    → {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, marginBottom: 24, color: '#fff' }}>Destinations</h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 12 }}>
              {['🇬🇧 United Kingdom', '🇺🇸 United States', '🇨🇦 Canada', '🇦🇺 Australia', '🇩🇪 Germany', '🇮🇪 Ireland', '🇳🇿 New Zealand', '🇦🇪 Dubai / UAE'].map(d => (
                <li key={d}>
                  <Link
                    to="/destinations"
                    style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, transition: 'color 0.25s ease' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                    onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}
                  >
                    {d}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4 */}
          <div>
            <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, marginBottom: 24, color: '#fff' }}>Contact Us</h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: 14, lineHeight: 1.6 }}>
                📍 Ali Bhaban (Ground Floor),<br />Airport Road, Sylhet-3100, Bangladesh
              </p>
              <a href="tel:+8801733933689" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, transition: 'color 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                📞 +880 1733-933689
              </a>
              <a href="mailto:hello@studyex.net" style={{ color: 'rgba(255,255,255,0.6)', textDecoration: 'none', fontSize: 14, transition: 'color 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.6)')}>
                ✉️ hello@studyex.net
              </a>
              <a href="https://wa.me/8801733933689" target="_blank" rel="noreferrer"
                style={{ color: 'var(--whatsapp)', textDecoration: 'none', fontSize: 14, fontWeight: 600 }}>
                💬 WhatsApp Chat
              </a>
              <div style={{ marginTop: 8 }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12, marginBottom: 4 }}>Office Hours</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Sun–Thu: 9:00 AM – 6:00 PM</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 13 }}>Fri–Sat: 10:00 AM – 4:00 PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          padding: '24px 0',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 12,
        }}>
          <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13 }}>
            © 2025 StudyEx. All rights reserved. Built with ❤️ for ambitious students.
          </p>
          <div style={{ display: 'flex', gap: 24 }}>
            {['Privacy Policy', 'Terms of Service'].map(item => (
              <a key={item} href="#" style={{ color: 'rgba(255,255,255,0.4)', fontSize: 13, textDecoration: 'none', transition: 'color 0.25s ease' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#fff')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.4)')}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
