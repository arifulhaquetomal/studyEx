import { useState, useEffect, useRef } from 'react';

const stories = [
  { name: 'Sarah Mitchell', uni: 'University of Edinburgh', flag: '🏴󠁧󠁢󠁳󠁣󠁴󠁿', country: 'UK', course: 'MSc Data Science', scholarship: '£8,000 Merit Scholarship', avatar: 'SM', color: '#7A4F2D', year: '2024' },
  { name: 'Mahmudul Hasan Shahi', uni: 'Western Michigan University', flag: '🇺🇸', country: 'USA', course: 'MBA — Business Administration', scholarship: 'Full Scholarship (100%)', avatar: 'MH', color: '#6B1A2E', year: '2024' },
  { name: 'Habib Rahman', uni: 'University of Pécs', flag: '🇭🇺', country: 'Hungary', course: 'MBBS — Medicine', scholarship: 'Stipendium Hungaricum', avatar: 'HR', color: '#3D2B1F', year: '2023' },
  { name: 'Nusrat Jahan', uni: 'University of Toronto', flag: '🇨🇦', country: 'Canada', course: 'MSc Computer Science', scholarship: 'Graduate Excellence Award', avatar: 'NJ', color: '#4A5C44', year: '2024' },
  { name: 'Arif Hossain', uni: 'University of Melbourne', flag: '🇦🇺', country: 'Australia', course: 'PhD Engineering', scholarship: 'Melbourne Research Scholarship', avatar: 'AH', color: '#5C3D2B', year: '2023' },
  { name: 'Farhan Kabir', uni: 'TU Munich', flag: '🇩🇪', country: 'Germany', course: 'MSc Mechanical Engineering', scholarship: 'DAAD Scholarship', avatar: 'FK', color: '#7A4F2D', year: '2024' },
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
    <section ref={sectionRef} style={{ background: '#FDF6E3', padding: '96px 0', position: 'relative' }}>
      {/* Right side ornament */}
      <div style={{ position: 'absolute', right: 0, top: 80, bottom: 80, width: 3, background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,0.25), transparent)' }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label reveal">Success Stories</span>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', color: '#1C1007', marginTop: 8 }}>
            Our Students Got Into
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginTop: 16 }}>
            <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.4)' }} />
            <span style={{ color: '#C9A84C', fontSize: 10 }}>✦</span>
            <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.4)' }} />
          </div>
          <p className="reveal" style={{ color: '#6B5B4B', fontSize: 15, marginTop: 16, maxWidth: 480, margin: '16px auto 0', fontStyle: 'italic' }}>
            Real students, real results. Here are just a few of the hundreds of success stories we've helped create.
          </p>
        </div>

        <div
          style={{
            display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60,
            alignItems: 'center', maxWidth: 900, margin: '0 auto',
          }}
          className="success-grid"
        >
          {/* Avatar side */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
            <div
              style={{
                width: 200, height: 200,
                background: s.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 72, fontWeight: 700, color: '#F5EDD8',
                fontFamily: 'var(--font-heading)', fontStyle: 'italic',
                border: '1px solid rgba(201,168,76,0.3)',
                boxShadow: '4px 4px 0 rgba(201,168,76,0.2), inset 0 0 40px rgba(0,0,0,0.2)',
                transition: 'all 0.5s ease',
                opacity: isAnimating ? 0.4 : 1,
                transform: isAnimating ? 'scale(0.96)' : 'scale(1)',
                position: 'relative',
              }}
            >
              {/* Corner ornaments */}
              <div style={{ position: 'absolute', top: 8, left: 8, width: 12, height: 12, borderTop: '1px solid rgba(201,168,76,0.5)', borderLeft: '1px solid rgba(201,168,76,0.5)' }} />
              <div style={{ position: 'absolute', top: 8, right: 8, width: 12, height: 12, borderTop: '1px solid rgba(201,168,76,0.5)', borderRight: '1px solid rgba(201,168,76,0.5)' }} />
              <div style={{ position: 'absolute', bottom: 8, left: 8, width: 12, height: 12, borderBottom: '1px solid rgba(201,168,76,0.5)', borderLeft: '1px solid rgba(201,168,76,0.5)' }} />
              <div style={{ position: 'absolute', bottom: 8, right: 8, width: 12, height: 12, borderBottom: '1px solid rgba(201,168,76,0.5)', borderRight: '1px solid rgba(201,168,76,0.5)' }} />
              {s.avatar}
            </div>

            {/* Dots nav */}
            <div style={{ display: 'flex', gap: 6 }}>
              {stories.map((_st, i) => (
                <button
                  key={i}
                  onClick={() => goTo(i)}
                  aria-label={`Go to slide ${i + 1}`}
                  style={{
                    width: i === current ? 24 : 6,
                    height: 6,
                    borderRadius: 0,
                    background: i === current ? '#C9A84C' : 'rgba(122,79,45,0.2)',
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
              background: 'rgba(122,79,45,0.08)',
              border: '1px solid rgba(122,79,45,0.15)',
              padding: '5px 12px', marginBottom: 20,
            }}>
              <span style={{ fontSize: 18 }}>{s.flag}</span>
              <span style={{ fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-label)', color: '#7A4F2D', textTransform: 'uppercase', letterSpacing: '0.12em' }}>{s.country} · {s.year}</span>
            </div>

            <h3 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 28, color: '#1C1007', marginBottom: 8 }}>
              {s.name}
            </h3>
            <p style={{ fontSize: 16, color: '#7A4F2D', fontWeight: 600, marginBottom: 4, fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{s.uni}</p>
            <p style={{ fontSize: 14, color: '#6B5B4B', marginBottom: 24 }}>{s.course}</p>

            <div style={{
              background: '#F5EDD8', padding: '16px 20px',
              display: 'flex', alignItems: 'center', gap: 14,
              boxShadow: 'var(--shadow-card)', marginBottom: 28,
              border: '1px solid rgba(122,79,45,0.12)',
              borderLeft: '3px solid #C9A84C',
            }}>
              <span style={{ fontSize: 18, color: '#C9A84C' }}>✦</span>
              <div>
                <p style={{ fontSize: 10, color: '#6B5B4B', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Scholarship Awarded</p>
                <p style={{ fontSize: 14, fontWeight: 600, color: '#1C1007', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{s.scholarship}</p>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={prev} aria-label="Previous story"
                style={{
                  width: 40, height: 40,
                  border: '1px solid rgba(122,79,45,0.25)',
                  background: 'transparent', cursor: 'pointer', fontSize: 20, color: '#7A4F2D',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#7A4F2D'; e.currentTarget.style.color = '#F5EDD8'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7A4F2D'; }}
              >‹</button>
              <button onClick={() => goTo((current + 1) % stories.length)} aria-label="Next story"
                style={{
                  width: 40, height: 40,
                  border: '1px solid rgba(122,79,45,0.25)',
                  background: 'transparent', cursor: 'pointer', fontSize: 20, color: '#7A4F2D',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = '#7A4F2D'; e.currentTarget.style.color = '#F5EDD8'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#7A4F2D'; }}
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
