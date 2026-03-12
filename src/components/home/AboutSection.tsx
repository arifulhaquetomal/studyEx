import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  { icon: '✦', title: 'Personalised Approach', desc: 'Every student gets a dedicated counselor and a custom roadmap' },
  { icon: '✦', title: 'Proven Track Record', desc: '500+ students placed in top global universities since 2009' },
  { icon: '✦', title: '100% Visa Success', desc: 'Unmatched visa success record across all popular destinations' },
  { icon: '✦', title: 'End-to-End Support', desc: 'From profile building to post-arrival — we\'re with you throughout' },
];

export default function AboutSection() {
  const leftRef = useRef<HTMLDivElement>(null);
  const rightRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (leftRef.current) leftRef.current.classList.add('revealed');
          if (rightRef.current) {
            setTimeout(() => rightRef.current?.classList.add('revealed'), 200);
          }
        }
      },
      { threshold: 0.2 }
    );
    if (leftRef.current) observer.observe(leftRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section style={{ padding: '96px 0', background: '#F5F4F0', position: 'relative' }}>
      {/* Subtle side ornament */}
      <div style={{ position: 'absolute', left: 0, top: 80, bottom: 80, width: 3, background: 'linear-gradient(to bottom, transparent, rgba(197,168,111,0.3), transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="about-grid">
          {/* Left — text */}
          <div ref={leftRef} className="reveal-left">
            <span className="section-label">About StudyEx</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontStyle: 'italic',
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: '#08101E',
              marginTop: 12, marginBottom: 20,
              lineHeight: 1.2,
            }}>
              Why Students Choose<br />
              <span style={{ color: '#1D3557' }}>StudyEx</span>
            </h2>

            {/* Ornamental rule */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ width: 48, height: 1, background: '#C5A86F' }} />
              <span style={{ color: '#C5A86F', fontSize: 10 }}>✦</span>
            </div>

            <p style={{ color: '#6D7782', fontSize: 15, lineHeight: 1.9, marginBottom: 20, fontStyle: 'italic' }}>
              Since 2009, StudyEx has been Bangladesh's most trusted international education consultancy. Based in Sylhet with students across the globe, we've helped over 500 students transform their academic dreams into reality.
            </p>
            <p style={{ color: '#6D7782', fontSize: 15, lineHeight: 1.9, marginBottom: 32 }}>
              Our team of experienced counselors — many of whom are international graduates themselves — understands the journey from both sides. We don't just process applications; we build futures.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 36 }}>
              {highlights.map(h => (
                <div key={h.title} style={{
                  background: '#EDEBE4',
                  padding: '16px',
                  border: '1px solid rgba(29, 53, 87, 0.15)',
                  borderLeft: '2px solid #C5A86F',
                }}>
                  <span style={{ color: '#C5A86F', fontSize: 12, display: 'block', marginBottom: 6 }}>{h.icon}</span>
                  <p style={{ fontFamily: 'var(--font-heading)', fontWeight: 600, color: '#08101E', fontSize: 14, marginBottom: 4, fontStyle: 'italic' }}>{h.title}</p>
                  <p style={{ color: '#6D7782', fontSize: 12, lineHeight: 1.6 }}>{h.desc}</p>
                </div>
              ))}
            </div>

            <Link to="/about" className="btn btn-outline">
              Learn More About Us
            </Link>
          </div>

          {/* Right — visual grid */}
          <div ref={rightRef} className="reveal-right">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {/* Large dark card */}
              <div style={{
                gridColumn: '1 / -1',
                background: '#08101E',
                padding: '36px',
                color: '#EDEBE4',
                position: 'relative', overflow: 'hidden',
                border: '1px solid rgba(197,168,111,0.2)',
              }}>
                <div style={{
                  position: 'absolute', top: 0, right: 0, bottom: 0,
                  width: '40%',
                  backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 8px, rgba(197,168,111,0.04) 9px)',
                }} />
                <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 52, fontWeight: 700, color: '#C5A86F', marginBottom: 8, position: 'relative' }}>500+</p>
                <p style={{ fontSize: 15, color: 'rgba(237,235,228,0.75)', fontStyle: 'italic', position: 'relative', marginBottom: 16 }}>Students successfully placed in global universities</p>
                <div style={{ display: 'flex', gap: 8, position: 'relative' }}>
                  {['🇬🇧', '🇺🇸', '🇨🇦', '🇦🇺', '🇩🇪'].map(f => (
                    <span key={f} style={{ fontSize: 18 }}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div style={{
                background: '#EDEBE4',
                padding: '24px',
                border: '1px solid rgba(29, 53, 87, 0.15)',
                borderTop: '2px solid #C5A86F',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 38, fontWeight: 700, color: '#1D3557' }}>100%</p>
                <p style={{ fontSize: 12, color: '#6D7782', fontWeight: 500, marginTop: 4, lineHeight: 1.5 }}>Visa<br />Success Rate</p>
              </div>

              {/* Card 3 */}
              <div style={{
                background: '#7A2035',
                padding: '24px',
                textAlign: 'center', color: '#EDEBE4',
                border: '1px solid rgba(197,168,111,0.2)',
              }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 38, fontWeight: 700 }}>15+</p>
                <p style={{ fontSize: 12, opacity: 0.8, fontWeight: 500, marginTop: 4, lineHeight: 1.5 }}>Years<br />Experience</p>
              </div>

              {/* Card 4 */}
              <div style={{
                gridColumn: '1 / -1',
                background: 'rgba(29,53,87,0.06)',
                padding: '18px 22px',
                border: '1px solid rgba(29, 53, 87, 0.15)',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{ fontSize: 24 }}>📍</div>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 600, color: '#08101E', fontSize: 14 }}>Based in Sylhet, Bangladesh</p>
                  <p style={{ color: '#6D7782', fontSize: 12, marginTop: 2 }}>Ali Bhaban, Airport Road, Sylhet-3100</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>
    </section>
  );
}
