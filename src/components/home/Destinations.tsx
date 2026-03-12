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
    color: '#112236',
  },
  {
    id: 'usa', flag: '🇺🇸', name: 'United States',
    desc: 'The USA hosts the world\'s largest number of international students. From Ivy League to state universities, the USA offers unmatched research opportunities, diverse campuses, and strong post-graduation career paths.',
    universities: 'MIT · Harvard · Stanford · Michigan · NYU',
    intakes: 'Fall (Aug) · Spring (Jan)',
    fees: '$25,000 – $60,000/year',
    scholarships: 'Fulbright · OPT/CPT · University Aid',
    postStudyWork: 'OPT: 1-3 years',
    color: '#7A2035',
  },
  {
    id: 'canada', flag: '🇨🇦', name: 'Canada',
    desc: 'Canada is the most immigration-friendly study destination. Affordable tuition, multicultural cities, and a clear path to permanent residency make Canada a top choice for ambitious students.',
    universities: 'Toronto · McGill · UBC · Waterloo · McMaster',
    intakes: 'September · January · May',
    fees: 'CAD $20,000 – $45,000/year',
    scholarships: 'Vanier · University Merit · Provincial',
    postStudyWork: 'PGWP: up to 3 years',
    color: '#1D3557',
  },
  {
    id: 'australia', flag: '🇦🇺', name: 'Australia',
    desc: 'Australia offers a high quality of life, world-ranked universities, and a welcoming visa system. Eight of Australia\'s universities rank in the global top 100.',
    universities: 'Melbourne · ANU · Sydney · Queensland · Monash',
    intakes: 'February · July',
    fees: 'AUD $25,000 – $50,000/year',
    scholarships: 'Australia Awards · Endeavour · University',
    postStudyWork: '2-4 years (subclass 485)',
    color: '#4A6274',
  },
  {
    id: 'germany', flag: '🇩🇪', name: 'Germany',
    desc: 'Germany offers tuition-free or very low-cost education at public universities. Known for engineering, technology and research excellence, Germany is ideal for STEM students.',
    universities: 'TU Munich · Heidelberg · LMU · RWTH Aachen',
    intakes: 'Winter (Oct) · Summer (Apr)',
    fees: '€0 – €3,000/year (public unis)',
    scholarships: 'DAAD · Erasmus · Heinrich Böll',
    postStudyWork: '18 months job-seeking visa',
    color: '#0F172A',
  },
  {
    id: 'ireland', flag: '🇮🇪', name: 'Ireland',
    desc: 'Ireland is Europe\'s fastest-growing tech hub with campuses for Google, Meta, and Apple. English-speaking, EU-based, and with strong post-study work rights.',
    universities: 'Trinity Dublin · UCD · UCC · NUI Galway',
    intakes: 'September · January',
    fees: '€10,000 – €25,000/year',
    scholarships: 'Government of Ireland · University Merit',
    postStudyWork: '2 years (Third Level Graduate Scheme)',
    color: '#2C3D2C',
  },
  {
    id: 'newzealand', flag: '🇳🇿', name: 'New Zealand',
    desc: 'New Zealand combines world-class education with stunning natural landscapes. All 8 NZ universities rank in the top 3% globally.',
    universities: 'Auckland · Otago · Victoria Wellington · Canterbury',
    intakes: 'February · July',
    fees: 'NZD $22,000 – $45,000/year',
    scholarships: 'NZ Government · University Merit',
    postStudyWork: '1-3 years (Post Study Open Work)',
    color: '#1A4B7C',
  },
  {
    id: 'uae', flag: '🇦🇪', name: 'Dubai / UAE',
    desc: 'Dubai is now home to campuses of prestigious global universities. Close to Bangladesh, tax-free income opportunities, and a rapidly growing education hub.',
    universities: 'Heriot-Watt Dubai · Middlesex · Manipal · BITS Pilani',
    intakes: 'September · January',
    fees: 'AED 50,000 – 120,000/year',
    scholarships: 'Merit Scholarships · University Aid',
    postStudyWork: 'Employment Visa',
    color: '#2A3B4C',
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

  const active = destinations.find(d => d.id === openId)!;

  return (
    <section ref={sectionRef} style={{ padding: '96px 0', background: '#F5F4F0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-label reveal">Study Destinations</span>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', color: '#08101E', marginTop: 8, marginBottom: 16 }}>
            Where Will You Study?
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 40, height: 1, background: 'rgba(197,168,111,0.4)' }} />
            <span style={{ color: '#C5A86F', fontSize: 10 }}>✦</span>
            <div style={{ width: 40, height: 1, background: 'rgba(197,168,111,0.4)' }} />
          </div>
          <p className="reveal" style={{ color: '#6D7782', fontSize: 15, maxWidth: 520, margin: '0 auto', fontStyle: 'italic' }}>
            We have established partnerships and extensive experience guiding students to top universities in 9 countries.
          </p>
        </div>

        <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }} className="destinations-layout">
          {/* Sidebar */}
          <div style={{ width: 220, flexShrink: 0, border: '1px solid rgba(29,53,87,0.15)', background: '#EDEBE4', padding: '8px' }} className="dest-sidebar">
            {destinations.map(dest => (
              <button
                key={dest.id}
                onClick={() => setOpenId(dest.id)}
                style={{
                  width: '100%', textAlign: 'left', padding: '12px 14px',
                  display: 'flex', alignItems: 'center', gap: 10,
                  background: openId === dest.id ? dest.color : 'transparent',
                  border: 'none', borderRadius: 0, cursor: 'pointer',
                  borderLeft: `2px solid ${openId === dest.id ? '#C5A86F' : 'transparent'}`,
                  transition: 'all 0.2s ease', marginBottom: 2,
                }}
              >
                <span style={{ fontSize: 18 }}>{dest.flag}</span>
                <span style={{
                  fontFamily: 'var(--font-body)', fontSize: 13,
                  color: openId === dest.id ? '#EDEBE4' : '#08101E',
                  fontStyle: openId === dest.id ? 'italic' : 'normal',
                }}>
                  {dest.name}
                </span>
              </button>
            ))}
          </div>

          {/* Content */}
          <div style={{
            flex: 1, minWidth: 300,
            background: '#EDEBE4',
            padding: '36px',
            border: '1px solid rgba(29,53,87,0.15)',
            position: 'relative',
          }}>
            {/* Corner ornaments */}
            <div style={{ position: 'absolute', top: 8, left: 8, width: 16, height: 16, borderTop: '1px solid rgba(197,168,111,0.5)', borderLeft: '1px solid rgba(197,168,111,0.5)' }} />
            <div style={{ position: 'absolute', top: 8, right: 8, width: 16, height: 16, borderTop: '1px solid rgba(197,168,111,0.5)', borderRight: '1px solid rgba(197,168,111,0.5)' }} />
            <div style={{ position: 'absolute', bottom: 8, left: 8, width: 16, height: 16, borderBottom: '1px solid rgba(197,168,111,0.5)', borderLeft: '1px solid rgba(197,168,111,0.5)' }} />
            <div style={{ position: 'absolute', bottom: 8, right: 8, width: 16, height: 16, borderBottom: '1px solid rgba(197,168,111,0.5)', borderRight: '1px solid rgba(197,168,111,0.5)' }} />

            <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 24 }}>
              <div style={{
                width: 60, height: 60,
                background: active.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 32, border: '1px solid rgba(197,168,111,0.3)',
              }}>
                {active.flag}
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 26, color: '#08101E' }}>{active.name}</h3>
                <span style={{ fontSize: 10, color: '#C5A86F', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.12em' }}>Popular Destination</span>
              </div>
            </div>

            {/* Ornament */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 32, height: 1, background: '#C5A86F' }} />
              <span style={{ color: '#C5A86F', fontSize: 8 }}>✦</span>
            </div>

            <p style={{ color: '#6D7782', lineHeight: 1.85, fontSize: 14, marginBottom: 24, fontStyle: 'italic' }}>{active.desc}</p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 28 }}>
              {[
                { label: 'Top Universities', value: active.universities },
                { label: 'Intakes', value: active.intakes },
                { label: 'Average Fees', value: active.fees },
                { label: 'Scholarships', value: active.scholarships },
                { label: 'Post-Study Work', value: active.postStudyWork },
              ].map(row => (
                <div key={row.label} style={{
                  background: '#fff', padding: '12px 14px',
                  border: '1px solid rgba(29,53,87,0.1)',
                  borderLeft: '2px solid rgba(197,168,111,0.5)',
                }}>
                  <p style={{ fontSize: 9, color: '#6D7782', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: 4 }}>
                    {row.label}
                  </p>
                  <p style={{ fontSize: 12, fontWeight: 600, color: '#08101E', lineHeight: 1.4, fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{row.value}</p>
                </div>
              ))}
            </div>

            <Link to="/apply" className="btn btn-red">
              Apply for {active.name}
            </Link>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .destinations-layout { flex-direction: column !important; }
          .dest-sidebar { width: 100% !important; display: flex; flex-wrap: wrap; gap: 4px; padding: 4px !important; }
          .dest-sidebar button { width: auto !important; flex: 1 1 120px; }
        }
      `}</style>
    </section>
  );
}
