import { useState, useEffect, useRef } from 'react';

const stories = [
  { name: 'Sarah Mitchell', uni: 'University of Edinburgh', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', country: 'UK', course: 'MSc Data Science', scholarship: '£8,000 Merit Scholarship', avatar: 'SM', color: '#0057FF', year: '2024' },
  { name: 'Mahmudul Hasan Shahi', uni: 'Western Michigan University', flag: '🇺🇸', country: 'USA', course: 'MBA — Business Administration', scholarship: 'Full Scholarship (100%)', avatar: 'MH', color: '#E8173A', year: '2024' },
  { name: 'Habib Rahman', uni: 'University of Pécs', flag: '🇭🇺', country: 'Hungary', course: 'MBBS — Medicine', scholarship: 'Stipendium Hungaricum', avatar: 'HR', color: '#F5A623', year: '2023' },
  { name: 'Nusrat Jahan', uni: 'University of Toronto', flag: '🇨🇦', country: 'Canada', course: 'MSc Computer Science', scholarship: 'Graduate Excellence Award', avatar: 'NJ', color: '#25D366', year: '2024' },
  { name: 'Arif Hossain', uni: 'University of Melbourne', flag: '🇦🇺', country: 'Australia', course: 'PhD Engineering', scholarship: 'Melbourne Research Scholarship', avatar: 'AH', color: '#9333EA', year: '2023' },
  { name: 'Farhan Kabir', uni: 'TU Munich', flag: '🇩🇪', country: 'Germany', course: 'MSc Mechanical Engineering', scholarship: 'DAAD Scholarship', avatar: 'FK', color: '#0057FF', year: '2024' },
];

export default function SuccessStories() {
  const [current, setCurrent] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | undefined>(undefined);
  const sectionRef = useRef<HTMLElement>(null);

  const goTo = (idx: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrent(idx);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const prev = () => goTo((current - 1 + stories.length) % stories.length);

  useEffect(() => {
    intervalRef.current = setInterval(() => goTo((current + 1) % stories.length), 4500);
    return () => clearInterval(intervalRef.current);
  }, [current]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const children = sectionRef.current?.querySelectorAll('.reveal');
          children?.forEach((el, i) => {
            setTimeout(() => el.classList.add('revealed'), i * 150);
          });
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const s = stories[current];

  return (
    <section ref={sectionRef} style={{ background: 'var(--white-soft)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label reveal">SUCCESS STORIES</span>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--navy)', marginTop: 8 }}>
            Our Students Got Into
          </h2>
          <p className="reveal" style={{ color: 'var(--gray)', fontSize: 16, marginTop: 12, maxWidth: 480, margin: '12px auto 0' }}>
            Real students, real results. Here are just a few of the hundreds of success stories we've helped create.
          </p>
        </div>

        <div
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 48,
            alignItems: 'center', maxWidth: 900, margin: '0 auto',
          }}
          className="success-grid"
        >
          {/* Avatar side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
            <div
              style={{
                width: 220, height: 220, borderRadius: '50%',
                background: `linear-gradient(135deg, ${s.color}, ${s.color}88)`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 80, fontWeight: 700, color: '#fff',
                fontFamily: 'var(--font-heading)',
                boxShadow: `0 20px 60px ${s.color}44`,
                transition: 'all 0.5s ease',
                opacity: isAnimating ? 0.4 : 1,
                transform: isAnimating ? 'scale(0.95)' : 'scale(1)',
              }}
            >
              {s.avatar}
            </div>

            {/* Mini dots nav */}
            <div style={{ display: 'flex', gap: 8 }}>
              {stories.map((_st, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === current ? 28 : 8,
                    height: 8,
                    borderRadius: 4,
                    background: i === current ? 'var(--blue)' : 'rgba(0,0,0,0.15)',
                    border: 'none', cursor: 'pointer',
                    transition: 'all 0.35s ease',
                    padding: 0,
                  }}
                />
              ))}
            </div>
          </div>

          {/* Info side */}
          <div style={{
            opacity: isAnimating ? 0 : 1,
            transform: isAnimating ? 'translateX(20px)' : 'translateX(0)',
            transition: 'all 0.5s ease',
          }}>
            <div style={{
              display: 'inline-flex', alignItems: 'center', gap: 8,
              background: `${s.color}15`, borderRadius: 8,
              padding: '6px 14px', marginBottom: 20,
            }}>
              <span style={{ fontSize: 20 }}>{s.flag}</span>
              <span style={{ fontSize: 12, fontWeight: 600, fontFamily: 'var(--font-label)', color: s.color, textTransform: 'uppercase', letterSpacing: '0.08em' }}>{s.country} • {s.year}</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--navy)', marginBottom: 8 }}>
              {s.name}
            </h3>
            <p style={{ fontSize: 17, color: 'var(--blue)', fontWeight: 600, marginBottom: 6 }}>{s.uni}</p>
            <p style={{ fontSize: 15, color: 'var(--gray)', marginBottom: 20 }}>{s.course}</p>

            <div style={{
              background: '#fff', borderRadius: 12, padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 12,
              boxShadow: 'var(--shadow-card)', marginBottom: 28,
            }}>
              <span style={{ fontSize: 24 }}>🎖</span>
              <div>
                <p style={{ fontSize: 11, color: 'var(--gray)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Scholarship Awarded</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: 'var(--navy)' }}>{s.scholarship}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 12 }}>
              <button onClick={prev} aria-label="Previous story"
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '2px solid rgba(0,87,255,0.2)',
                  background: '#fff', cursor: 'pointer', fontSize: 20, color: 'var(--navy)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--navy)'; }}
              >‹</button>
              <button onClick={() => goTo((current + 1) % stories.length)} aria-label="Next story"
                style={{
                  width: 44, height: 44, borderRadius: '50%',
                  border: '2px solid rgba(0,87,255,0.2)',
                  background: '#fff', cursor: 'pointer', fontSize: 20, color: 'var(--navy)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'var(--blue)'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = '#fff'; e.currentTarget.style.color = 'var(--navy)'; }}
              >›</button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 700px) {
          .success-grid { grid-template-columns: 1fr !important; text-align: center; }
          .success-grid > div:first-child { order: 1; }
          .success-grid > div:last-child { order: 2; }
        }
      `}</style>
    </section>
  );
}
