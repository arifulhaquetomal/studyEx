import { useEffect, useRef } from 'react';

const row1 = [
  { name: 'University of Oxford', short: 'Oxford' },
  { name: 'University of Cambridge', short: 'Cambridge' },
  { name: 'MIT', short: 'MIT' },
  { name: 'Harvard University', short: 'Harvard' },
  { name: 'University of Toronto', short: 'Toronto' },
  { name: 'University of Edinburgh', short: 'Edinburgh' },
  { name: 'UCL', short: 'UCL' },
  { name: 'University of Melbourne', short: 'Melbourne' },
  { name: 'TU Munich', short: 'TU Munich' },
  { name: 'University of British Columbia', short: 'UBC' },
];

const row2 = [
  { name: 'Stanford University', short: 'Stanford' },
  { name: 'University of Sydney', short: 'Sydney' },
  { name: 'McGill University', short: 'McGill' },
  { name: 'Imperial College London', short: 'Imperial' },
  { name: 'University of Auckland', short: 'Auckland' },
  { name: 'RWTH Aachen', short: 'RWTH Aachen' },
  { name: 'Western Michigan University', short: 'W. Michigan' },
  { name: 'University of Warwick', short: 'Warwick' },
  { name: 'Trinity College Dublin', short: 'Trinity Dublin' },
  { name: 'Queensland University', short: 'Queensland' },
];

function LogoChip({ name, short }: { name: string; short: string }) {
  return (
    <div
      title={name}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        background: '#fff',
        borderRadius: 12,
        padding: '12px 20px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.06)',
        border: '1px solid rgba(0,87,255,0.08)',
        whiteSpace: 'nowrap',
        cursor: 'default',
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 24px rgba(0,87,255,0.15)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,87,255,0.2)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.boxShadow = '0 2px 12px rgba(0,0,0,0.06)';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(0,87,255,0.08)';
      }}
    >
      <div style={{
        width: 32, height: 32, borderRadius: 8,
        background: 'linear-gradient(135deg, #0057FF15, #0057FF25)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 14, fontWeight: 700, color: 'var(--blue)',
        fontFamily: 'var(--font-heading)',
      }}>
        {short[0]}
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', fontFamily: 'var(--font-body)' }}>
        {short}
      </span>
    </div>
  );
}

export default function UniversityMarquee() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const reveals = sectionRef.current?.querySelectorAll('.reveal');
          reveals?.forEach((el, i) => setTimeout(() => el.classList.add('revealed'), i * 150));
        }
      },
      { threshold: 0.2 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const doubled1 = [...row1, ...row1];
  const doubled2 = [...row2, ...row2];

  return (
    <section ref={sectionRef} style={{ background: 'var(--white-soft)', padding: '80px 0', overflow: 'hidden' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', textAlign: 'center', marginBottom: 48 }}>
        <span className="section-label reveal">OUR ACCEPTANCES</span>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--navy)', marginTop: 8, marginBottom: 16 }}>
          Our Students Have Been Accepted To
        </h2>
        <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            background: 'var(--navy)', color: 'var(--gold)', borderRadius: 999,
            padding: '6px 18px', fontSize: 13, fontWeight: 600, fontFamily: 'var(--font-label)',
          }}>
            200+ Universities Worldwide
          </span>
        </div>
      </div>

      {/* Row 1 — left */}
      <div style={{ overflow: 'hidden', marginBottom: 20, maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
        <div style={{ display: 'flex', gap: 16, width: 'max-content' }} className="marquee-track--left">
          {doubled1.map((uni, i) => (
            <LogoChip key={`r1-${i}`} name={uni.name} short={uni.short} />
          ))}
        </div>
      </div>

      {/* Row 2 — right */}
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 10%, black 90%, transparent)' }}>
        <div style={{ display: 'flex', gap: 16, width: 'max-content' }} className="marquee-track--right">
          {doubled2.map((uni, i) => (
            <LogoChip key={`r2-${i}`} name={uni.name} short={uni.short} />
          ))}
        </div>
      </div>
    </section>
  );
}
