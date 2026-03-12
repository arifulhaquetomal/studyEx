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
        background: '#FDF6E3',
        padding: '10px 18px',
        border: '1px solid rgba(122, 79, 45, 0.2)',
        borderLeft: '2px solid rgba(201,168,76,0.5)',
        whiteSpace: 'nowrap',
        cursor: 'default',
        transition: 'all 0.3s ease',
        flexShrink: 0,
      }}
      onMouseEnter={e => {
        (e.currentTarget as HTMLElement).style.borderColor = '#C9A84C';
        (e.currentTarget as HTMLElement).style.background = '#F5EDD8';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)';
      }}
      onMouseLeave={e => {
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(122, 79, 45, 0.2)';
        (e.currentTarget as HTMLElement).style.background = '#FDF6E3';
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
      }}
    >
      <div style={{
        width: 28, height: 28,
        background: 'rgba(122,79,45,0.08)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 13, fontWeight: 700, color: '#7A4F2D',
        fontFamily: 'var(--font-heading)', fontStyle: 'italic',
      }}>
        {short[0]}
      </div>
      <span style={{ fontSize: 12, fontWeight: 600, color: '#1C1007', fontFamily: 'var(--font-body)' }}>
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
    <section ref={sectionRef} style={{ background: '#F5EDD8', padding: '80px 0', overflow: 'hidden', borderTop: '1px solid rgba(122,79,45,0.12)', borderBottom: '1px solid rgba(122,79,45,0.12)' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', textAlign: 'center', marginBottom: 44 }}>
        <span className="section-label reveal">Our Acceptances</span>
        <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', color: '#1C1007', marginTop: 8, marginBottom: 16 }}>
          Our Students Have Been Accepted To
        </h2>
        <div className="reveal" style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <span style={{
            background: '#1C1007', color: '#C9A84C',
            padding: '6px 20px', fontSize: 11, fontWeight: 600,
            fontFamily: 'var(--font-label)', letterSpacing: '0.1em', textTransform: 'uppercase',
            border: '1px solid rgba(201,168,76,0.3)',
          }}>
            200+ Universities Worldwide
          </span>
        </div>
      </div>

      {/* Row 1 — left */}
      <div style={{ overflow: 'hidden', marginBottom: 14, maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
        <div style={{ display: 'flex', gap: 12, width: 'max-content' }} className="marquee-track--left">
          {doubled1.map((uni, i) => (
            <LogoChip key={`r1-${i}`} name={uni.name} short={uni.short} />
          ))}
        </div>
      </div>

      {/* Row 2 — right */}
      <div style={{ overflow: 'hidden', maskImage: 'linear-gradient(90deg, transparent, black 8%, black 92%, transparent)' }}>
        <div style={{ display: 'flex', gap: 12, width: 'max-content' }} className="marquee-track--right">
          {doubled2.map((uni, i) => (
            <LogoChip key={`r2-${i}`} name={uni.name} short={uni.short} />
          ))}
        </div>
      </div>
    </section>
  );
}
