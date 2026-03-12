import { useEffect, useRef, useState, useCallback } from 'react';

const testimonials = [
  {
    name: 'Mahmudul Hasan Shahi',
    uni: 'Western Michigan University',
    flag: '🇺🇸',
    avatar: 'MH',
    color: '#E8173A',
    bg: 'linear-gradient(135deg,#E8173A,#FF6B6B)',
    course: 'MBA — Full Scholarship',
    review:
      'Studying in the U.S. with a full scholarship was once just a dream — StudyEx made it real. Their guidance on my SOP and scholarship application was exceptional. They truly go above and beyond for every single student.',
    stars: 5,
    tag: 'Scholarship Winner 🏆',
  },
  {
    name: 'Nusrat Jahan',
    uni: 'University of Toronto',
    flag: '🇨🇦',
    avatar: 'NJ',
    color: '#0057FF',
    bg: 'linear-gradient(135deg,#0057FF,#00C6FF)',
    course: 'MSc Computer Science',
    review:
      'I was completely lost in the maze of Canadian applications until I found StudyEx. They handled everything — shortlisting, SOP, visa prep. Got in with a scholarship! I cannot thank them enough for changing my life.',
    stars: 5,
    tag: 'Visa Approved ✅',
  },
  {
    name: 'Rashid Hossain',
    uni: 'University of Edinburgh',
    flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿',
    avatar: 'RH',
    color: '#7C3AED',
    bg: 'linear-gradient(135deg,#7C3AED,#A78BFA)',
    course: 'MSc Data Science',
    review:
      'StudyEx is the real deal. Professional, caring, and incredibly knowledgeable. They knew exactly which universities would accept my profile and helped me secure a £6,000 scholarship. Best investment I ever made.',
    stars: 5,
    tag: '£6,000 Scholarship 🎓',
  },
  {
    name: 'Tahmina Begum',
    uni: 'TU Munich',
    flag: '🇩🇪',
    avatar: 'TB',
    color: '#F5A623',
    bg: 'linear-gradient(135deg,#F5A623,#FFC36A)',
    course: 'MSc Mechanical Engineering',
    review:
      'Germany was my dream and StudyEx made it happen in just 6 months. Free public university, DAAD scholarship support, and they even helped me prepare for my language certificate. Absolutely amazing team!',
    stars: 5,
    tag: 'DAAD Scholarship 🇩🇪',
  },
  {
    name: 'Farhan Ahmed',
    uni: 'University of Melbourne',
    flag: '🇦🇺',
    avatar: 'FA',
    color: '#059669',
    bg: 'linear-gradient(135deg,#059669,#34D399)',
    course: 'PhD Biotechnology',
    review:
      'The visa process for Australia scared me but the StudyEx team was calm, professional, and handled every document perfectly. Got my visa in 3 weeks. Now living my absolute dream in Melbourne!',
    stars: 5,
    tag: 'PhD Offer 🔬',
  },
  {
    name: 'Sumaiya Akter',
    uni: 'University College Dublin',
    flag: '🇮🇪',
    avatar: 'SA',
    color: '#E8173A',
    bg: 'linear-gradient(135deg,#E8173A,#FF8C42)',
    course: 'MSc Marketing',
    review:
      'StudyEx found me a university AND a scholarship I had no idea existed. They were with me every step — application, visa, pre-departure. I felt genuinely cared for, not just treated as a client.',
    stars: 5,
    tag: 'Hidden Scholarship Found 💡',
  },
  {
    name: 'Imtiaz Karim',
    uni: 'Université de Paris',
    flag: '🇫🇷',
    avatar: 'IK',
    color: '#0057FF',
    bg: 'linear-gradient(135deg,#0057FF,#7C3AED)',
    course: 'MSc International Relations',
    review:
      'France seemed impossibly far — language barrier, different system, everything. StudyEx guided me through every single step. Their expertise saved me months of confusion and stress. Truly world-class consultancy.',
    stars: 5,
    tag: 'International Dream ✈️',
  },
  {
    name: 'Roksana Parvin',
    uni: 'Massey University',
    flag: '🇳🇿',
    avatar: 'RP',
    color: '#7C3AED',
    bg: 'linear-gradient(135deg,#7C3AED,#059669)',
    course: 'MBA Leadership',
    review:
      'New Zealand was not even on my radar until StudyEx showed me the opportunities there. Post-study work visa, beautiful country, world-class university — honestly the best decision of my entire life.',
    stars: 5,
    tag: 'New Destination Unlocked 🗺️',
  },
];

const SLIDE_INTERVAL = 4500;

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [direction, setDirection] = useState<'next' | 'prev'>('next');
  const [animating, setAnimating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [paused, setPaused] = useState(false);
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const progressRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = testimonials.length;

  const goTo = useCallback((idx: number, dir: 'next' | 'prev') => {
    if (animating) return;
    setAnimating(true);
    setDirection(dir);
    setPrev(current);
    setCurrent(idx);
    setProgress(0);
    setTimeout(() => {
      setPrev(null);
      setAnimating(false);
    }, 500);
  }, [animating, current]);

  const goNext = useCallback(() => goTo((current + 1) % total, 'next'), [goTo, current, total]);
  const goPrev = useCallback(() => goTo((current - 1 + total) % total, 'prev'), [goTo, current, total]);

  // Auto-advance
  useEffect(() => {
    if (paused) return;
    intervalRef.current = setInterval(goNext, SLIDE_INTERVAL);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [paused, goNext]);

  // Progress bar
  useEffect(() => {
    if (paused) return;
    setProgress(0);
    const start = Date.now();
    progressRef.current = setInterval(() => {
      const elapsed = Date.now() - start;
      setProgress(Math.min((elapsed / SLIDE_INTERVAL) * 100, 100));
    }, 30);
    return () => { if (progressRef.current) clearInterval(progressRef.current); };
  }, [current, paused]);

  // Scroll visibility
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Touch swipe
  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) diff > 0 ? goNext() : goPrev();
    touchStartX.current = null;
  };

  const t = testimonials[current];
  const p = prev !== null ? testimonials[prev] : null;

  return (
    <section
      ref={sectionRef}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        background: '#fff',
        padding: '80px 0 64px',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative bg blobs */}
      <div style={{
        position: 'absolute', top: -120, right: -120, width: 480, height: 480,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0,87,255,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      <div style={{
        position: 'absolute', bottom: -80, left: -80, width: 320, height: 320,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,23,58,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>

        {/* Section label */}
        <div style={{
          textAlign: 'center', marginBottom: 48,
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(20px)',
          transition: 'all 0.6s ease',
        }}>
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: 11, letterSpacing: '0.18em',
            color: 'var(--blue)', fontWeight: 600, textTransform: 'uppercase',
            display: 'inline-block', marginBottom: 12,
          }}>
            STUDENT VOICES
          </span>
          <h2 style={{
            fontFamily: 'var(--font-heading)',
            fontSize: 'clamp(26px, 3.5vw, 44px)',
            color: 'var(--navy)', margin: '0 0 10px', lineHeight: 1.15,
          }}>
            Real Stories. Real Results.
          </h2>
          <p style={{
            color: 'var(--gray)', fontSize: 16, maxWidth: 440, margin: '0 auto',
            fontFamily: 'var(--font-body)',
          }}>
            Hear straight from students whose lives changed with StudyEx.
          </p>
        </div>

        {/* Main slider */}
        <div style={{
          opacity: visible ? 1 : 0,
          transform: visible ? 'translateY(0)' : 'translateY(24px)',
          transition: 'all 0.7s ease 0.2s',
        }}>
          <div style={{
            position: 'relative',
            maxWidth: 900,
            margin: '0 auto',
            minHeight: 340,
          }}>

            {/* Slide: previous (exiting) */}
            {p && (
              <SlideCard
                t={p}
                style={{
                  position: 'absolute', inset: 0,
                  opacity: 0,
                  transform: direction === 'next' ? 'translateX(-60px)' : 'translateX(60px)',
                  transition: 'all 0.45s cubic-bezier(0.4,0,0.2,1)',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Slide: current (entering) */}
            <SlideCard
              t={t}
              style={{
                position: prev !== null ? 'absolute' : 'relative',
                inset: prev !== null ? 0 : undefined,
                opacity: 1,
                transform: 'translateX(0)',
                transition: animating ? 'all 0.45s cubic-bezier(0.4,0,0.2,1)' : 'none',
                zIndex: 2,
              }}
            />
          </div>

          {/* Controls row */}
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            gap: 20, marginTop: 36,
          }}>

            {/* Prev button */}
            <button
              onClick={goPrev}
              aria-label="Previous testimonial"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '2px solid rgba(0,87,255,0.2)',
                background: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, color: 'var(--blue)',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--blue)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--blue)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = 'var(--blue)';
                e.currentTarget.style.borderColor = 'rgba(0,87,255,0.2)';
              }}
            >
              ‹
            </button>

            {/* Dots + progress */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
              {/* Dots */}
              <div style={{ display: 'flex', gap: 8 }}>
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i, i > current ? 'next' : 'prev')}
                    aria-label={`Go to testimonial ${i + 1}`}
                    style={{
                      width: i === current ? 28 : 8,
                      height: 8, borderRadius: 999,
                      background: i === current ? 'var(--blue)' : 'rgba(0,87,255,0.2)',
                      border: 'none', cursor: 'pointer', padding: 0,
                      transition: 'all 0.35s cubic-bezier(0.4,0,0.2,1)',
                    }}
                  />
                ))}
              </div>

              {/* Progress bar */}
              <div style={{
                width: 120, height: 2, borderRadius: 999,
                background: 'rgba(0,87,255,0.1)', overflow: 'hidden',
              }}>
                <div style={{
                  height: '100%', borderRadius: 999,
                  background: 'var(--blue)',
                  width: `${paused ? progress : progress}%`,
                  transition: paused ? 'none' : 'width 0.03s linear',
                }} />
              </div>
            </div>

            {/* Next button */}
            <button
              onClick={goNext}
              aria-label="Next testimonial"
              style={{
                width: 44, height: 44, borderRadius: '50%',
                border: '2px solid rgba(0,87,255,0.2)',
                background: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 20, color: 'var(--blue)',
                transition: 'all 0.25s ease',
                flexShrink: 0,
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'var(--blue)';
                e.currentTarget.style.color = '#fff';
                e.currentTarget.style.borderColor = 'var(--blue)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = '#fff';
                e.currentTarget.style.color = 'var(--blue)';
                e.currentTarget.style.borderColor = 'rgba(0,87,255,0.2)';
              }}
            >
              ›
            </button>
          </div>

          {/* Counter */}
          <p style={{
            textAlign: 'center', marginTop: 14,
            fontFamily: 'var(--font-label)', fontSize: 12,
            color: 'var(--gray)', letterSpacing: '0.06em',
          }}>
            {current + 1} / {total}
          </p>
        </div>

        {/* Mini avatar strip */}
        <div style={{
          display: 'flex', justifyContent: 'center', gap: 12,
          marginTop: 40, flexWrap: 'wrap',
          opacity: visible ? 1 : 0,
          transition: 'opacity 0.7s ease 0.4s',
        }}>
          {testimonials.map((s, i) => (
            <button
              key={i}
              onClick={() => goTo(i, i > current ? 'next' : 'prev')}
              aria-label={`View ${s.name}'s story`}
              title={s.name}
              style={{
                width: 40, height: 40, borderRadius: '50%',
                background: s.bg, border: i === current
                  ? `3px solid ${s.color}`
                  : '3px solid transparent',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 13,
                color: '#fff', cursor: 'pointer',
                transform: i === current ? 'scale(1.15)' : 'scale(1)',
                transition: 'all 0.3s ease',
                boxShadow: i === current ? `0 0 0 3px ${s.color}33` : 'none',
                flexShrink: 0,
              }}
            >
              {s.avatar}
            </button>
          ))}
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: 'center', marginTop: 44 }}>
          <a
            href="/apply"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: 10,
              background: 'var(--red)', color: '#fff',
              padding: '14px 32px', borderRadius: 999,
              fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 15,
              textDecoration: 'none',
              boxShadow: '0 4px 24px rgba(232,23,58,0.3)',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(232,23,58,0.45)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 24px rgba(232,23,58,0.3)';
            }}
          >
            Join Our Success Stories →
          </a>
        </div>
      </div>
    </section>
  );
}

// ─── Slide Card ────────────────────────────────────────────────────────────────
function SlideCard({
  t,
  style,
}: {
  t: typeof testimonials[0];
  style?: React.CSSProperties;
}) {
  return (
    <div style={{
      ...style,
      borderRadius: 24,
      overflow: 'hidden',
      boxShadow: '0 8px 48px rgba(0,0,0,0.10)',
      border: '1px solid rgba(0,0,0,0.06)',
      background: '#fff',
      display: 'flex',
      flexWrap: 'wrap',
      minHeight: 300,
    }}>

      {/* Left colour panel */}
      <div style={{
        background: t.bg,
        width: 220,
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 24px',
        gap: 14,
        minWidth: 160,
        flex: '0 0 220px',
      }}>
        {/* Big avatar */}
        <div style={{
          width: 80, height: 80, borderRadius: '50%',
          background: 'rgba(255,255,255,0.25)',
          border: '3px solid rgba(255,255,255,0.6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-body)', fontWeight: 800,
          fontSize: 26, color: '#fff', letterSpacing: 1,
          boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
        }}>
          {t.avatar}
        </div>

        <div style={{ textAlign: 'center' }}>
          <p style={{
            fontFamily: 'var(--font-body)', fontWeight: 700,
            fontSize: 15, color: '#fff', margin: 0, lineHeight: 1.3,
          }}>
            {t.name}
          </p>
          <p style={{
            fontFamily: 'var(--font-body)', fontSize: 12,
            color: 'rgba(255,255,255,0.8)', margin: '4px 0 0',
          }}>
            {t.flag} {t.uni}
          </p>
          <p style={{
            fontFamily: 'var(--font-label)', fontSize: 11,
            color: 'rgba(255,255,255,0.7)', margin: '4px 0 0',
            letterSpacing: '0.04em',
          }}>
            {t.course}
          </p>
        </div>

        {/* Tag badge */}
        <span style={{
          background: 'rgba(255,255,255,0.2)',
          border: '1px solid rgba(255,255,255,0.35)',
          borderRadius: 999,
          padding: '4px 12px',
          fontSize: 11, color: '#fff',
          fontFamily: 'var(--font-label)',
          fontWeight: 600, letterSpacing: '0.04em',
          textAlign: 'center',
          lineHeight: 1.5,
        }}>
          {t.tag}
        </span>
      </div>

      {/* Right content panel */}
      <div style={{
        flex: 1,
        padding: '44px 44px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minWidth: 260,
        background: '#fff',
      }}>
        {/* Stars */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 20 }}>
          {[...Array(t.stars)].map((_, i) => (
            <span key={i} style={{ color: 'var(--gold)', fontSize: 20 }}>★</span>
          ))}
        </div>

        {/* Big quote mark */}
        <div style={{
          fontSize: 72, lineHeight: 0.8,
          color: t.color, opacity: 0.15,
          fontFamily: 'Georgia, serif',
          marginBottom: 8,
          userSelect: 'none',
        }}>
          "
        </div>

        {/* Review */}
        <p style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(14px, 1.5vw, 17px)',
          color: '#374151',
          lineHeight: 1.85,
          fontStyle: 'italic',
          margin: 0,
          flex: 1,
        }}>
          "{t.review}"
        </p>

        {/* Verified badge */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginTop: 28,
          paddingTop: 20,
          borderTop: '1px solid rgba(0,0,0,0.06)',
        }}>
          <span style={{
            display: 'inline-flex', alignItems: 'center', gap: 5,
            background: `${t.color}15`,
            border: `1px solid ${t.color}30`,
            borderRadius: 999, padding: '4px 12px',
            fontSize: 11, color: t.color,
            fontFamily: 'var(--font-label)', fontWeight: 600,
            letterSpacing: '0.05em',
          }}>
            ✓ Verified StudyEx Graduate
          </span>
          <span style={{
            fontFamily: 'var(--font-label)', fontSize: 11,
            color: 'var(--gray)', letterSpacing: '0.04em',
          }}>
            via Google Reviews
          </span>
        </div>
      </div>
    </div>
  );
}
