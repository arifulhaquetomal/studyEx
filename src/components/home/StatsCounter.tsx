import { useEffect, useRef, useState } from 'react';

const stats = [
  { value: 500, suffix: '+', label: 'Students Placed', icon: '🎓' },
  { value: 50, suffix: '+', label: 'Partner Universities', icon: '🏛' },
  { value: 10, suffix: '+', label: 'Countries Covered', icon: '🌍' },
  { value: 95, suffix: '%', label: 'Visa Success Rate', icon: '✅' },
  { value: 100, suffix: '%', label: 'Satisfaction Rate', icon: '⭐' },
  { value: 15, suffix: '+', label: 'Years Experience', icon: '🏆' },
];

function Counter({ value, suffix, duration = 2000 }: { value: number; suffix: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting && !started) setStarted(true); },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [started]);

  useEffect(() => {
    if (!started) return;
    let startTime: number;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * value));
      if (progress < 1) requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [started, value, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function StatsCounter() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const items = sectionRef.current?.querySelectorAll('.stat-item');
          items?.forEach((item, i) => {
            const el = item as HTMLElement;
            el.style.opacity = '0';
            el.style.transform = 'translateY(24px)';
            setTimeout(() => {
              el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, i * 100);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: 'var(--navy)', padding: '80px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 0,
        }}>
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className="stat-item"
              style={{
                textAlign: 'center',
                padding: '32px 20px',
                borderRight: i < stats.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                opacity: 0,
              }}
            >
              <div style={{ fontSize: 28, marginBottom: 8 }}>{stat.icon}</div>
              <div className="stats-number" style={{ color: '#60A5FA', marginBottom: 8 }}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </div>
              <div style={{
                fontFamily: 'var(--font-label)',
                fontSize: 13,
                fontWeight: 500,
                color: 'rgba(255,255,255,0.55)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
              }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
      <style>{`
        @media (max-width: 640px) {
          .stats-number { font-size: 40px !important; }
        }
      `}</style>
    </section>
  );
}
