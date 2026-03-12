import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const highlights = [
  { icon: '🎯', title: 'Personalized Approach', desc: 'Every student gets a dedicated counselor and a custom roadmap' },
  { icon: '🏆', title: 'Proven Track Record', desc: '500+ students placed in top global universities since 2009' },
  { icon: '✅', title: '100% Visa Success', desc: 'Unmatched visa success record across all popular destinations' },
  { icon: '💼', title: 'End-to-End Support', desc: 'From profile building to post-arrival — we\'re with you throughout' },
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
    <section style={{ padding: '96px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="about-grid">
          {/* Left — text */}
          <div ref={leftRef} className="reveal-left">
            <span className="section-label">ABOUT STUDYEX</span>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(28px, 4vw, 44px)',
              color: 'var(--navy)',
              marginTop: 12, marginBottom: 20,
              lineHeight: 1.2,
            }}>
              Why Students Choose<br />
              <span style={{ color: 'var(--blue)' }}>StudyEx</span>
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: 16, lineHeight: 1.85, marginBottom: 20 }}>
              Since 2009, StudyEx has been Bangladesh's most trusted international education consultancy. Based in Sylhet with students across the globe, we've helped over 500 students transform their academic dreams into reality.
            </p>
            <p style={{ color: 'var(--gray)', fontSize: 16, lineHeight: 1.85, marginBottom: 32 }}>
              Our team of experienced counselors — many of whom are international graduates themselves — understands the journey from both sides. We don't just process applications; we build futures. Our holistic approach combines academic counseling, scholarship hunting, visa expertise, and genuine personal care.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 36 }}>
              {highlights.map(h => (
                <div key={h.title} style={{
                  background: 'var(--white-soft)', borderRadius: 12, padding: '16px',
                  border: '1px solid rgba(0,87,255,0.08)',
                }}>
                  <span style={{ fontSize: 24, display: 'block', marginBottom: 8 }}>{h.icon}</span>
                  <p style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 14, marginBottom: 4 }}>{h.title}</p>
                  <p style={{ color: 'var(--gray)', fontSize: 12, lineHeight: 1.6 }}>{h.desc}</p>
                </div>
              ))}
            </div>

            <Link to="/about" className="btn btn-outline">
              Learn More About Us →
            </Link>
          </div>

          {/* Right — visual grid */}
          <div ref={rightRef} className="reveal-right">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Large card */}
              <div style={{
                gridColumn: '1 / -1',
                background: 'linear-gradient(135deg, var(--navy), #001F6B)',
                borderRadius: 20, padding: '32px',
                color: '#fff', position: 'relative', overflow: 'hidden',
              }}>
                <div style={{
                  position: 'absolute', top: -30, right: -30,
                  width: 150, height: 150, borderRadius: '50%',
                  background: 'rgba(0,87,255,0.2)',
                }} />
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 48, fontWeight: 700, color: '#60A5FA', marginBottom: 4 }}>500+</p>
                <p style={{ fontSize: 16, color: 'rgba(255,255,255,0.8)' }}>Students successfully placed in global universities</p>
                <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
                  {['🇬🇧', '🇺🇸', '🇨🇦', '🇦🇺', '🇩🇪'].map(f => (
                    <span key={f} style={{ fontSize: 20 }}>{f}</span>
                  ))}
                </div>
              </div>

              {/* Card 2 */}
              <div style={{
                background: 'var(--white-soft)',
                borderRadius: 16, padding: '24px',
                border: '1px solid rgba(0,87,255,0.08)',
                textAlign: 'center',
              }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700, color: 'var(--blue)' }}>100%</p>
                <p style={{ fontSize: 13, color: 'var(--gray)', fontWeight: 500 }}>Visa<br/>Success Rate</p>
              </div>

              {/* Card 3 */}
              <div style={{
                background: 'linear-gradient(135deg, var(--red), #c9102e)',
                borderRadius: 16, padding: '24px',
                textAlign: 'center', color: '#fff',
              }}>
                <p style={{ fontFamily: 'var(--font-heading)', fontSize: 36, fontWeight: 700 }}>15+</p>
                <p style={{ fontSize: 13, opacity: 0.85, fontWeight: 500 }}>Years<br/>Experience</p>
              </div>

              {/* Card 4 */}
              <div style={{
                gridColumn: '1 / -1',
                background: 'rgba(0,87,255,0.05)',
                borderRadius: 16, padding: '20px 24px',
                border: '1px solid rgba(0,87,255,0.1)',
                display: 'flex', alignItems: 'center', gap: 16,
              }}>
                <div style={{ fontSize: 36 }}>📍</div>
                <div>
                  <p style={{ fontWeight: 600, color: 'var(--navy)', fontSize: 15 }}>Based in Sylhet, Bangladesh</p>
                  <p style={{ color: 'var(--gray)', fontSize: 13 }}>Ali Bhaban, Airport Road, Sylhet-3100</p>
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
