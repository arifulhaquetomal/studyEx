import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 'uk', flag: '🇬🇧', name: 'United Kingdom',
    desc: 'The UK offers world-class education with globally recognised degrees. Home to Oxford, Cambridge, Edinburgh and UCL, the UK remains a top destination for Bangladeshi students seeking quality education.',
    universities: 'Oxford · Cambridge · UCL · Edinburgh · Imperial',
    intakes: 'September · January',
    fees: '£15,000 – £35,000/year',
    scholarships: 'Chevening · Commonwealth · University Merit',
    postStudyWork: '2 years (Graduate Route)',
    color: '#012169',
  },
  {
    id: 'usa', flag: '🇺🇸', name: 'United States',
    desc: 'The USA hosts the world\'s largest number of international students. From Ivy League to state universities, the USA offers unmatched research opportunities, diverse campuses, and strong post-graduation career paths.',
    universities: 'MIT · Harvard · Stanford · Michigan · NYU',
    intakes: 'Fall (Aug) · Spring (Jan)',
    fees: '$25,000 – $60,000/year',
    scholarships: 'FullBright · OPT/CPT · University Aid',
    postStudyWork: 'OPT: 1-3 years',
    color: '#B22234',
  },
  {
    id: 'canada', flag: '🇨🇦', name: 'Canada',
    desc: 'Canada is the most immigration-friendly study destination. Affordable tuition, multicultural cities, and a clear path to permanent residency make Canada a top choice for ambitious students.',
    universities: 'Toronto · McGill · UBC · Waterloo · McMaster',
    intakes: 'September · January · May',
    fees: 'CAD $20,000 – $45,000/year',
    scholarships: 'Vanier · University Merit · Provincial',
    postStudyWork: 'PGWP: up to 3 years',
    color: '#FF0000',
  },
  {
    id: 'australia', flag: '🇦🇺', name: 'Australia',
    desc: 'Australia offers a high quality of life, world-ranked universities, and a welcoming visa system. Eight of Australia\'s universities rank in the global top 100, offering exceptional academic experiences.',
    universities: 'Melbourne · ANU · Sydney · Queensland · Monash',
    intakes: 'February · July',
    fees: 'AUD $25,000 – $50,000/year',
    scholarships: 'Australia Awards · Endeavour · University',
    postStudyWork: '2-4 years (subclass 485)',
    color: '#00008B',
  },
  {
    id: 'germany', flag: '🇩🇪', name: 'Germany',
    desc: 'Germany offers tuition-free or very low-cost education at public universities. Known for engineering, technology and research excellence, Germany is ideal for STEM students on a budget.',
    universities: 'TU Munich · Heidelberg · LMU · RWTH Aachen',
    intakes: 'Winter (Oct) · Summer (Apr)',
    fees: '€0 – €3,000/year (public unis)',
    scholarships: 'DAAD · Erasmus · Heinrich Böll',
    postStudyWork: '18 months job-seeking visa',
    color: '#000000',
  },
  {
    id: 'ireland', flag: '🇮🇪', name: 'Ireland',
    desc: 'Ireland is Europe\'s fastest-growing tech hub with campuses for Google, Meta, and Apple. English-speaking, EU-based, and with strong post-study work rights — Ireland is an outstanding choice.',
    universities: 'Trinity Dublin · UCD · UCC · NUI Galway',
    intakes: 'September · January',
    fees: '€10,000 – €25,000/year',
    scholarships: 'Government of Ireland · University Merit',
    postStudyWork: '2 years (Third Level Graduate Scheme)',
    color: '#169B62',
  },
  {
    id: 'newzealand', flag: '🇳🇿', name: 'New Zealand',
    desc: 'New Zealand combines world-class education with stunning natural landscapes. All 8 NZ universities rank in the top 3% globally. Friendly people, clean environment, and strong student support.',
    universities: 'Auckland · Otago · Victoria Wellington · Canterbury',
    intakes: 'February · July',
    fees: 'NZD $22,000 – $45,000/year',
    scholarships: 'NZ Government · University Merit',
    postStudyWork: '1-3 years (Post Study Open Work)',
    color: '#00247D',
  },
  {
    id: 'uae', flag: '🇦🇪', name: 'Dubai / UAE',
    desc: 'Dubai is now home to campuses of prestigious global universities. Close to Bangladesh, tax-free income opportunities, and a rapidly growing education hub make UAE an attractive option.',
    universities: 'Heriot-Watt Dubai · Middlesex · Manipal · BITS Pilani',
    intakes: 'September · January',
    fees: 'AED 50,000 – 120,000/year',
    scholarships: 'Merit Scholarships · University Aid',
    postStudyWork: 'Employment Visa',
    color: '#009A44',
  },
];

export default function Destinations() {
  const [openId, setOpenId] = useState('uk');
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const reveals = sectionRef.current?.querySelectorAll('.reveal');
          reveals?.forEach((el, i) => setTimeout(() => el.classList.add('revealed'), i * 100));
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '96px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label reveal">STUDY DESTINATIONS</span>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--navy)', marginTop: 8, marginBottom: 16 }}>
            Where Will You Study?
          </h2>
          <p className="reveal" style={{ color: 'var(--gray)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
            We have established partnerships and extensive experience guiding students to top universities in 9 countries.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }} className="destinations-layout">
          {/* Sidebar */}
          <div style={{ width: 240, flexShrink: 0 }} className="dest-sidebar">
            {destinations.map(dest => (
              <button
                key={dest.id}
                onClick={() => setOpenId(dest.id)}
                style={{
                  width: '100%', textAlign: 'left', padding: '14px 18px',
                  display: 'flex', alignItems: 'center', gap: 12,
                  background: openId === dest.id ? 'rgba(0,87,255,0.08)' : 'transparent',
                  border: 'none', borderRadius: 10, cursor: 'pointer',
                  borderLeft: `3px solid ${openId === dest.id ? 'var(--blue)' : 'transparent'}`,
                  transition: 'all 0.25s ease', marginBottom: 4,
                }}
              >
                <span style={{ fontSize: 22 }}>{dest.flag}</span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontWeight: 600, fontSize: 14,
                  color: openId === dest.id ? 'var(--blue)' : 'var(--navy)',
                }}>
                  {dest.name}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          {destinations.filter(d => d.id === openId).map(dest => (
            <div key={dest.id} style={{
              flex: 1, minWidth: 300,
              background: 'var(--white-soft)', borderRadius: 20, padding: '40px',
              border: '1px solid rgba(0,87,255,0.08)',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
                <div style={{
                  width: 64, height: 64, borderRadius: '50%',
                  background: `${dest.color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 36,
                }}>
                  {dest.flag}
                </div>
                <div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--navy)' }}>{dest.name}</h3>
                  <span style={{ fontSize: 12, color: 'var(--blue)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Popular Destination</span>
                </div>
              </div>

              <p style={{ color: 'var(--gray)', lineHeight: 1.8, fontSize: 15, marginBottom: 28 }}>{dest.desc}</p>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 28 }}>
                {[
                  { icon: '🏛', label: 'Top Universities', value: dest.universities },
                  { icon: '📅', label: 'Intakes', value: dest.intakes },
                  { icon: '💰', label: 'Average Fees', value: dest.fees },
                  { icon: '🎓', label: 'Scholarships', value: dest.scholarships },
                  { icon: '🛂', label: 'Post-Study Work', value: dest.postStudyWork },
                ].map(row => (
                  <div key={row.label} style={{
                    background: '#fff', borderRadius: 12, padding: '14px 16px',
                    boxShadow: 'var(--shadow-card)',
                  }}>
                    <p style={{ fontSize: 11, color: 'var(--gray)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                      {row.icon} {row.label}
                    </p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', lineHeight: 1.4 }}>{row.value}</p>
                  </div>
                ))}
              </div>

              <Link to="/apply" className="btn btn-red">
                Apply for {dest.name} →
              </Link>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .destinations-layout { flex-direction: column !important; }
          .dest-sidebar { width: 100% !important; display: flex; flex-wrap: wrap; gap: 8px; }
          .dest-sidebar button { width: auto !important; flex: 1 1 120px; }
        }
      `}</style>
    </section>
  );
}
