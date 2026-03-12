import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const studentCards = [
  { name: 'Sarah Mitchell', uni: 'Edinburgh', country: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', course: 'MSc Data Science', avatar: 'SM', color: '#1D3557' },
  { name: 'Mahmudul Hasan', uni: 'Michigan', country: '🇺🇸', course: 'MBA — Full Scholarship', avatar: 'MH', color: '#7A2035' },
  { name: 'Habib Rahman', uni: 'Budapest', country: '🇭🇺', course: 'MBBS — Medicine', avatar: 'HR', color: '#4A6274' },
];

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  const eyebrowRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const els = [eyebrowRef.current, headlineRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.9s ease, transform 0.9s ease';
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
      }, 200 + i * 200);
    });

    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.hero-student-card');
      cards.forEach((card, i) => {
        const el = card as HTMLElement;
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
        }, 900 + i * 180);
      });
    }
  }, []);

  return (
    <section className="hero-bg" style={{ paddingTop: 72 }}>
      {/* Vintage warm glow orbs */}
      <div className="hero-orb" style={{ width: 500, height: 500, background: 'rgba(29, 53, 87, 0.12)', top: '-150px', right: '-80px' }} />
      <div className="hero-orb" style={{ width: 350, height: 350, background: 'rgba(139, 26, 46, 0.08)', bottom: '-80px', left: '-40px' }} />

      {/* Aged paper texture lines */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 1,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(197,168,111,0.04) 60px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 28px', position: 'relative', zIndex: 2, width: '100%' }}>
        <div style={{ maxWidth: 800 }}>

          {/* Eyebrow label */}
          <div ref={eyebrowRef}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              border: '1px solid rgba(197, 168, 111, 0.3)',
              padding: '8px 20px',
              color: '#C5A86F', fontSize: 11, fontWeight: 600,
              fontFamily: 'var(--font-label)', letterSpacing: '0.18em', textTransform: 'uppercase',
              marginBottom: 32, background: 'rgba(197, 168, 111, 0.06)',
            }}>
              <span style={{ width: 5, height: 5, background: '#C5A86F', borderRadius: '50%', display: 'inline-block', animation: 'pulse-ring 2.5s ease-out infinite' }} />
              Trusted by 500+ Students Since 2009
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(42px, 6vw, 82px)',
              fontWeight: 700,
              color: '#EDEBE4',
              lineHeight: 1.08,
              marginBottom: 28,
              fontStyle: 'italic',
              letterSpacing: '-0.01em',
            }}>
              Your Global<br />
              <span style={{ color: '#C5A86F' }}>Education</span>{' '}
              Starts Here.
            </h1>
            {/* Ornamental rule under headline */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
              <div style={{ flex: 1, maxWidth: 80, height: 1, background: 'rgba(197,168,111,0.4)' }} />
              <span style={{ color: 'rgba(197,168,111,0.6)', fontSize: 14 }}>✦</span>
              <div style={{ width: 24, height: 1, background: 'rgba(197,168,111,0.25)' }} />
            </div>
            <p style={{
              fontSize: 'clamp(16px, 2vw, 19px)',
              color: 'rgba(237, 235, 228, 0.68)',
              lineHeight: 1.85,
              maxWidth: 540,
              marginBottom: 40,
              fontStyle: 'italic',
            }}>
              From Dhaka to Edinburgh. From Sylhet to Toronto.{' '}
              <strong style={{ color: 'rgba(237,235,228,0.92)', fontWeight: 600 }}>We get you there.</strong>{' '}
              Expert guidance for university applications, scholarships & visas.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 16 }}>
            <Link to="/apply" className="btn btn-red" style={{ fontSize: 12, padding: '14px 32px' }}>
              Book Free Consultation
            </Link>
            <Link to="/about" className="btn btn-ghost" style={{ fontSize: 12, padding: '14px 32px' }}>
              See Success Stories
            </Link>
          </div>

          {/* Trust stats */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 40, marginTop: 56, paddingTop: 36, borderTop: '1px solid rgba(197,168,111,0.15)' }}>
            {[
              { num: '500+', label: 'Students Placed' },
              { num: '100%', label: 'Visa Success' },
              { num: '50+', label: 'Partner Universities' },
              { num: '15+', label: 'Years Experience' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: 28, fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#C5A86F', fontStyle: 'italic' }}>{stat.num}</div>
                <div style={{ fontSize: 10, color: 'rgba(237,235,228,0.45)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 4 }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Student testimonial cards */}
        <div ref={cardsRef} style={{
          display: 'flex', flexWrap: 'wrap', gap: 14, marginTop: 56,
        }}>
          {studentCards.map(card => (
            <div
              key={card.name}
              className="hero-student-card"
              style={{
                background: 'rgba(234,230,218,0.06)',
                border: '1px solid rgba(197, 168, 111, 0.2)',
                padding: '16px 20px',
                display: 'flex', alignItems: 'center', gap: 14,
                minWidth: 220,
                flex: '1 1 200px',
                maxWidth: 280,
              }}
            >
              <div style={{
                width: 44, height: 44,
                background: card.color,
                border: '1px solid rgba(197, 168, 111, 0.3)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, color: '#EDEBE4', fontSize: 14, flexShrink: 0,
                fontFamily: 'var(--font-heading)', fontStyle: 'italic',
              }}>
                {card.avatar}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: '#EDEBE4', fontSize: 13, fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{card.name}</p>
                <p style={{ color: 'rgba(237,235,228,0.55)', fontSize: 11, marginTop: 2 }}>
                  {card.country} {card.uni}
                </p>
                <p style={{ color: '#C5A86F', fontSize: 10, marginTop: 3, fontFamily: 'var(--font-label)', letterSpacing: '0.08em' }}>{card.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to parchment */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 140,
        background: 'linear-gradient(to bottom, transparent, #F5F4F0)',
        pointerEvents: 'none',
      }} />
    </section>
  );
}
