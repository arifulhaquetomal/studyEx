import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import InteractiveBoxes from './InteractiveBoxes';

const studentCards = [
  { name: 'Sarah Mitchell',  uni: 'Edinburgh',  country: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', course: 'MSc Data Science',      avatar: 'SM', color: '#0057FF' },
  { name: 'Mahmudul Hasan',  uni: 'Michigan',   country: '🇺🇸',           course: 'MBA — Full Scholarship', avatar: 'MH', color: '#E8173A' },
  { name: 'Habib Rahman',    uni: 'Budapest',   country: '🇭🇺',           course: 'MBBS — Medicine',         avatar: 'HR', color: '#F5A623' },
];

export default function Hero() {
  const headlineRef = useRef<HTMLDivElement>(null);
  const cardsRef    = useRef<HTMLDivElement>(null);
  const eyebrowRef  = useRef<HTMLDivElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    /* Staggered entrance for text */
    const els = [eyebrowRef.current, headlineRef.current, ctaRef.current];
    els.forEach((el, i) => {
      if (!el) return;
      el.style.opacity   = '0';
      el.style.transform = 'translateY(30px)';
      setTimeout(() => {
        if (!el) return;
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        el.style.opacity    = '1';
        el.style.transform  = 'translateY(0)';
      }, 200 + i * 180);
    });

    /* Student cards entrance */
    if (cardsRef.current) {
      const cards = cardsRef.current.querySelectorAll('.hero-student-card');
      cards.forEach((card, i) => {
        const el = card as HTMLElement;
        el.style.opacity   = '0';
        el.style.transform = 'translateY(40px)';
        setTimeout(() => {
          el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
          el.style.opacity    = '1';
          el.style.transform  = 'translateY(0)';
        }, 900 + i * 150);
      });
    }
  }, []);

  return (
    <section
      className="hero-bg"
      style={{ paddingTop: 72, minHeight: '100vh', position: 'relative', overflow: 'hidden' }}
    >
      {/* ── Animated background orbs ── */}
      <div className="hero-orb" style={{ width: 600, height: 600, background: 'rgba(0,87,255,0.13)',  top: '-200px', right: '-100px', animation: 'orb1 18s ease-in-out infinite' }} />
      <div className="hero-orb" style={{ width: 400, height: 400, background: 'rgba(232,23,58,0.07)', bottom: '-100px', left: '-50px', animation: 'orb2 22s ease-in-out infinite' }} />
      <div className="hero-orb" style={{ width: 300, height: 300, background: 'rgba(0,87,255,0.09)', top: '40%', left: '20%', animation: 'orb3 16s ease-in-out infinite' }} />

      {/* ── Dot grid overlay ── */}
      <div style={{
        position: 'absolute', inset: 0, opacity: 0.06,
        backgroundImage: 'radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px)',
        backgroundSize: '36px 36px',
        pointerEvents: 'none', zIndex: 1,
      }} />

      {/* ══════════════════════════════════
          INTERACTIVE BOXES — full canvas
      ══════════════════════════════════ */}
      <InteractiveBoxes />

      {/* ══════════════════════════════════
          MAIN HERO CONTENT — left side
      ══════════════════════════════════ */}
      <div style={{
        maxWidth: 1280, margin: '0 auto',
        padding: '100px 28px 80px',
        position: 'relative', zIndex: 10,
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        minHeight: 'calc(100vh - 72px)',
      }}>
        {/* Left content block — constrained so boxes are visible on right */}
        <div style={{ maxWidth: 580, width: '100%' }}>

          {/* Eyebrow badge */}
          <div ref={eyebrowRef} style={{ marginBottom: 28 }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: 'rgba(0,87,255,0.15)', border: '1px solid rgba(0,87,255,0.3)',
              borderRadius: 999, padding: '8px 18px',
              color: '#60A5FA', fontSize: 12, fontWeight: 600,
              fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase',
            }}>
              <span style={{
                width: 6, height: 6, background: '#60A5FA', borderRadius: '50%',
                display: 'inline-block', animation: 'pulse-ring 2s ease-out infinite',
              }} />
              Trusted by 500+ Students
            </span>
          </div>

          {/* Headline */}
          <div ref={headlineRef} style={{ marginBottom: 32 }}>
            <h1 style={{
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(38px, 5vw, 70px)',
              fontWeight: 700, color: '#fff',
              lineHeight: 1.1, marginBottom: 20,
              letterSpacing: '-0.02em',
            }}>
              Your Global<br />
              <span style={{ color: '#60A5FA' }}>Education</span>{' '}
              Starts Here.
            </h1>
            <p style={{
              fontSize: 'clamp(15px, 1.8vw, 18px)',
              color: 'rgba(255,255,255,0.72)',
              lineHeight: 1.8, maxWidth: 480,
            }}>
              From Dhaka to Edinburgh. From Sylhet to Toronto.{' '}
              <strong style={{ color: 'rgba(255,255,255,0.95)' }}>We get you there.</strong>{' '}
              Expert guidance for university applications, scholarships & visas.
            </p>
          </div>

          {/* CTAs */}
          <div ref={ctaRef} style={{ display: 'flex', flexWrap: 'wrap', gap: 16, marginBottom: 52 }}>
            <Link to="/apply" className="btn btn-red" style={{ fontSize: 16, padding: '15px 30px' }}>
              Book Free Consultation →
            </Link>
            <Link to="/about" className="btn btn-ghost" style={{ fontSize: 16, padding: '15px 30px' }}>
              See Success Stories
            </Link>
          </div>

          {/* Trust bar */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 32,
            paddingTop: 28, borderTop: '1px solid rgba(255,255,255,0.1)',
          }}>
            {[
              { num: '500+', label: 'Students Placed' },
              { num: '100%', label: 'Visa Success' },
              { num: '50+',  label: 'Partner Universities' },
              { num: '15+',  label: 'Years Experience' },
            ].map(stat => (
              <div key={stat.label}>
                <div style={{ fontSize: 26, fontWeight: 700, fontFamily: 'var(--font-heading)', color: '#fff' }}>
                  {stat.num}
                </div>
                <div style={{
                  fontSize: 10, color: 'rgba(255,255,255,0.45)',
                  fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.08em',
                }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Hint for interactivity */}
          <div style={{
            marginTop: 36,
            display: 'flex', alignItems: 'center', gap: 8,
            color: 'rgba(255,255,255,0.3)', fontSize: 12,
            fontFamily: 'var(--font-label)',
          }}>
            <span style={{ fontSize: 16 }}>🖱</span>
            <span style={{ letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Move your cursor · Click the boxes
            </span>
          </div>
        </div>

        {/* Student cards row — bottom left */}
        <div ref={cardsRef} style={{
          display: 'flex', flexWrap: 'wrap', gap: 14,
          position: 'absolute', bottom: 48, left: 28, zIndex: 12,
        }}>
          {studentCards.map(card => (
            <div
              key={card.name}
              className="hero-student-card"
              style={{
                background: 'rgba(255,255,255,0.07)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255,255,255,0.12)',
                borderRadius: 14, padding: '12px 18px',
                display: 'flex', alignItems: 'center', gap: 12,
                minWidth: 185,
              }}
            >
              <div style={{
                width: 40, height: 40, borderRadius: '50%',
                background: card.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontWeight: 700, color: '#fff', fontSize: 13, flexShrink: 0,
              }}>
                {card.avatar}
              </div>
              <div>
                <p style={{ fontWeight: 600, color: '#fff', fontSize: 13 }}>{card.name}</p>
                <p style={{ color: 'rgba(255,255,255,0.55)', fontSize: 11 }}>{card.country} {card.uni}</p>
                <p style={{ color: 'var(--gold)', fontSize: 10, marginTop: 2 }}>{card.course}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom fade to next section */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 100,
        background: 'linear-gradient(to bottom, transparent, #F8F9FC)',
        pointerEvents: 'none', zIndex: 15,
      }} />
    </section>
  );
}
