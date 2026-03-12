import { useState } from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 'uk', flag: '🇬🇧', name: 'United Kingdom', color: '#012169',
    hero: 'Study in the UK — Home of Oxford, Cambridge & Edinburgh',
    desc: `The United Kingdom has been the world's gold standard in higher education for centuries. Oxford, Cambridge, UCL, Imperial College, and the University of Edinburgh are not just prestigious names — they are institutions that have shaped global history, science, and culture.

For Bangladeshi students, the UK offers particular advantages: English-medium instruction, a geographically close timezone for family communication, a vibrant South Asian diaspora community, and the new Graduate Route visa — which allows international graduates to remain in the UK for two years after completing their degree to work and explore career opportunities.

The UK's 2-year MSc programs are especially popular, offering world-class credentials in a focused, cost-effective timeframe.`,
    universities: ['University of Oxford', 'University of Cambridge', 'UCL (University College London)', 'University of Edinburgh', 'Imperial College London', 'University of Manchester', 'University of Warwick', 'King\'s College London'],
    intakes: ['September (Main)', 'January (Select programs)'],
    fees: '£15,000 – £35,000 per year',
    scholarships: ['Chevening Scholarship', 'Commonwealth Scholarship', 'British Council GREAT Scholarship', 'University Merit Awards'],
    postStudy: '2-year Graduate Route Visa',
    visa: 'Student Visa (formerly Tier 4)',
    ielts: '6.0 – 7.0 (program specific)',
  },
  {
    id: 'usa', flag: '🇺🇸', name: 'United States', color: '#B22234',
    hero: 'Study in the USA — Research, Innovation, and Opportunity',
    desc: `The United States hosts more international students than any other country in the world — and for good reason. From the Ivy League to state universities, the US offers an unmatched breadth of academic programs, world-class research facilities, and career opportunities.

The US university system is uniquely flexible — you can change majors, take interdisciplinary courses, and benefit from a liberal arts foundation before specializing. Research funding is extraordinary, making the US the top destination for PhD students in STEM fields.

Optional Practical Training (OPT) allows students to work in the US for 1 year post-graduation, with STEM OPT extending this to 3 years — a massive career advantage for tech, engineering, and science graduates.`,
    universities: ['MIT', 'Harvard University', 'Stanford University', 'University of Michigan', 'NYU', 'University of Illinois', 'Purdue University', 'Western Michigan University'],
    intakes: ['Fall (August)', 'Spring (January)'],
    fees: '$25,000 – $60,000 per year',
    scholarships: ['Fulbright Foreign Student Program', 'University Teaching Assistantships', 'Research Assistantships', 'Merit & Need-Based University Aid'],
    postStudy: 'OPT: 1 year (STEM: 3 years)',
    visa: 'F-1 Student Visa',
    ielts: '6.5 – 7.5 (program specific)',
  },
  {
    id: 'canada', flag: '🇨🇦', name: 'Canada', color: '#FF0000',
    hero: 'Study in Canada — Quality Education, Clear Path to PR',
    desc: `Canada has become one of the world's most sought-after study destinations — and the reason is clear: world-class education, affordable costs compared to the US and UK, multicultural cities, and the most immigration-friendly post-study pathway of any major destination.

The Post-Graduation Work Permit (PGWP) allows graduates to work in Canada for up to 3 years, and the Canadian Experience Class (CEC) under Express Entry provides a realistic and well-defined pathway to Permanent Residency for international graduates.

Toronto, Vancouver, and Montreal regularly rank among the world's most livable cities, and Canada's welcoming, multicultural society makes Bangladeshi students feel at home from day one.`,
    universities: ['University of Toronto', 'McGill University', 'University of British Columbia', 'University of Waterloo', 'McMaster University', 'University of Alberta', 'University of Ottawa'],
    intakes: ['September (Main)', 'January', 'May (Limited programs)'],
    fees: 'CAD $20,000 – $45,000 per year',
    scholarships: ['Vanier Canada Graduate Scholarships', 'Province-specific scholarships', 'University Merit Awards', 'Ontario Graduate Scholarship'],
    postStudy: 'PGWP: up to 3 years',
    visa: 'Study Permit',
    ielts: '6.5 – 7.0 (program specific)',
  },
  {
    id: 'australia', flag: '🇦🇺', name: 'Australia', color: '#00008B',
    hero: 'Study in Australia — World Rankings, Remarkable Lifestyle',
    desc: `Eight Australian universities rank in the global top 100, making Australia one of the highest-concentration destinations for world-class education. The University of Melbourne, ANU, and University of Sydney consistently rank among the world's elite institutions.

Australia's Temporary Graduate visa (subclass 485) allows graduates to remain and work for 2-4 years after graduation, and the pathway to Australian Permanent Residency through skilled migration is well-established and achievable.

The quality of life in Australia — sunshine, safety, natural beauty, and a relaxed pace of life — combined with academic excellence makes it a consistently top choice for international students. Australia's proximity to Bangladesh (shorter flight than Europe or Americas) is an added practical advantage.`,
    universities: ['University of Melbourne', 'Australian National University', 'University of Sydney', 'University of Queensland', 'Monash University', 'UNSW Sydney', 'University of Adelaide'],
    intakes: ['February/March (Semester 1)', 'July/August (Semester 2)'],
    fees: 'AUD $25,000 – $50,000 per year',
    scholarships: ['Australia Awards Scholarships', 'Endeavour Leadership Program', 'Research Training Program', 'University Merit Scholarships'],
    postStudy: 'Subclass 485: 2-4 years',
    visa: 'Student Visa (Subclass 500)',
    ielts: '6.5 – 7.0 (program specific)',
  },
  {
    id: 'germany', flag: '🇩🇪', name: 'Germany', color: '#000000',
    hero: 'Study in Germany — World-Class Engineering, Near-Zero Tuition',
    desc: `Germany offers one of the most extraordinary opportunities in international education: study at a world-class university for €0–€3,000 per year in tuition fees. Public universities in Germany charge only a nominal semester fee (typically €300–€500) — even for international students.

Germany's universities excel particularly in engineering, technology, natural sciences, and applied research. The DAAD (German Academic Exchange Service) provides hundreds of scholarships specifically for students from developing countries, including Bangladesh.

The German government's commitment to research and industry makes it an ideal destination for STEM students. Germany's robust manufacturing and technology sector means exceptional internship and career opportunities.`,
    universities: ['Technical University of Munich (TUM)', 'Heidelberg University', 'LMU Munich', 'RWTH Aachen', 'Humboldt University Berlin', 'University of Bonn', 'KIT Karlsruhe'],
    intakes: ['Winter Semester (October)', 'Summer Semester (April)'],
    fees: '€0 – €3,000/year at public universities',
    scholarships: ['DAAD Scholarship', 'Erasmus+ Program', 'Heinrich Böll Foundation', 'Konrad Adenauer Foundation'],
    postStudy: '18-month job-seeking visa after graduation',
    visa: 'National Visa (Type D)',
    ielts: '6.0+ (many programs accept German B2)',
  },
  {
    id: 'ireland', flag: '🇮🇪', name: 'Ireland', color: '#169B62',
    hero: 'Study in Ireland — Europe\'s Silicon Valley, English-Speaking',
    desc: `Ireland has transformed in the past two decades into one of Europe's most dynamic economies and education hubs. Google, Meta, Apple, Microsoft, and hundreds of other global tech giants have their European headquarters in Dublin and other Irish cities — creating extraordinary internship and employment opportunities for international graduates.

Ireland is the only English-speaking member of the European Union, making it uniquely attractive for students who want an English-medium education while also having access to the broader EU job market after graduation.

The Third Level Graduate Scheme allows international graduates to remain in Ireland for 2 years to seek employment, with strong tech sector demand meaning excellent career prospects for STEM and business graduates.`,
    universities: ['Trinity College Dublin', 'University College Dublin (UCD)', 'University College Cork', 'NUI Galway', 'Dublin City University', 'University of Limerick'],
    intakes: ['September (Main)', 'January (Limited)'],
    fees: '€10,000 – €25,000 per year',
    scholarships: ['Government of Ireland International Education Scholarship', 'University Merit Awards', 'Enterprise Ireland schemes'],
    postStudy: '2 years (Third Level Graduate Scheme)',
    visa: 'Study Visa',
    ielts: '6.0 – 6.5 (program specific)',
  },
  {
    id: 'nz', flag: '🇳🇿', name: 'New Zealand', color: '#00247D',
    hero: 'Study in New Zealand — Top 3% Universities Globally',
    desc: `All 8 universities in New Zealand rank in the top 3% of universities globally — making New Zealand one of the highest quality-per-university destinations in the world. The University of Auckland consistently ranks in the global top 100.

New Zealand's education system is renowned for its quality and its emphasis on practical, applied learning. The country's small size means students receive more personal attention, smaller class sizes, and better access to faculty than in larger countries.

New Zealand's stunning natural environment, safe and welcoming society, and strong agricultural, engineering, and IT sectors make it an underrated gem for international students seeking quality education and an excellent quality of life.`,
    universities: ['University of Auckland', 'University of Otago', 'Victoria University of Wellington', 'University of Canterbury', 'Massey University', 'AUT Auckland'],
    intakes: ['February (Semester 1)', 'July (Semester 2)'],
    fees: 'NZD $22,000 – $45,000 per year',
    scholarships: ['New Zealand Government Scholarships', 'University Merit Awards', 'Prime Minister\'s Scholarships for Asia'],
    postStudy: '1-3 years (Post Study Open Work Visa)',
    visa: 'Student Visa',
    ielts: '6.0 – 6.5 (program specific)',
  },
  {
    id: 'uae', flag: '🇦🇪', name: 'Dubai / UAE', color: '#009A44',
    hero: 'Study in Dubai — Global City, Regional Hub, Zero Tax',
    desc: `Dubai has emerged as a genuine global education destination, hosting campuses of prestigious international universities including Heriot-Watt (ranked top 300 globally), Middlesex University, University of Birmingham, and others.

The proximity to Bangladesh — just a 4-5 hour flight — makes Dubai an attractive option for students who want an international degree while remaining closer to home. The UAE's cosmopolitan, multicultural environment with a large South Asian community makes adaptation easy.

The UAE's tax-free income, booming economy, and strategic position as a global business hub means excellent career opportunities for graduates, particularly in business, finance, hospitality, engineering, and technology sectors.`,
    universities: ['Heriot-Watt University Dubai', 'Middlesex University Dubai', 'University of Birmingham Dubai', 'BITS Pilani Dubai', 'Manipal Academy of Higher Education'],
    intakes: ['September', 'January'],
    fees: 'AED 50,000 – 120,000 per year',
    scholarships: ['University Merit Scholarships', 'Industry Partnerships', 'Government Grants'],
    postStudy: 'Employment Visa (requires job offer)',
    visa: 'Student Visa',
    ielts: '6.0 – 6.5 (program specific)',
  },
];

export default function DestinationsPage() {
  const [activeId, setActiveId] = useState('uk');
  const active = destinations.find(d => d.id === activeId)!;

  return (
    <div>
      {/* Hero */}
      <section style={{ background: 'var(--navy)', padding: '160px 28px 60px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="section-label" style={{ color: '#60A5FA' }}>STUDY DESTINATIONS</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', marginTop: 12, marginBottom: 20 }}>
            Where Will You <span style={{ color: '#60A5FA' }}>Study?</span>
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.8 }}>
            9 countries. 200+ universities. One expert team to guide you there.
          </p>
        </div>
      </section>

      {/* Tab Navigation */}
      <div style={{ background: '#fff', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', position: 'sticky', top: 72, zIndex: 100 }}>
        <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: 4, padding: '12px 0', minWidth: 'max-content' }}>
            {destinations.map(dest => (
              <button
                key={dest.id}
                onClick={() => setActiveId(dest.id)}
                style={{
                  padding: '10px 18px', borderRadius: 10, border: 'none', cursor: 'pointer',
                  background: activeId === dest.id ? 'var(--blue)' : 'transparent',
                  color: activeId === dest.id ? '#fff' : 'var(--gray)',
                  fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-body)',
                  transition: 'all 0.25s ease',
                  display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap',
                }}
              >
                <span>{dest.flag}</span>
                <span>{dest.name}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '60px 28px 96px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 48 }} className="dest-content-grid">
          {/* Main */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 32 }}>
              <div style={{
                width: 72, height: 72, borderRadius: '50%',
                background: `${active.color}15`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 40,
              }}>
                {active.flag}
              </div>
              <div>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(24px, 3vw, 36px)', color: 'var(--navy)' }}>
                  {active.hero}
                </h2>
              </div>
            </div>

            {active.desc.split('\n\n').map((para, i) => (
              <p key={i} style={{ color: 'var(--gray)', fontSize: 16, lineHeight: 1.85, marginBottom: 18 }}>{para}</p>
            ))}

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--navy)', marginTop: 40, marginBottom: 20 }}>
              Popular Universities
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              {active.universities.map(uni => (
                <div key={uni} style={{
                  background: 'var(--white-soft)', borderRadius: 10, padding: '12px 16px',
                  border: '1px solid rgba(0,87,255,0.06)', display: 'flex', alignItems: 'center', gap: 10,
                }}>
                  <span style={{ color: 'var(--blue)', fontWeight: 700, fontSize: 16 }}>🏛</span>
                  <span style={{ fontSize: 13, color: 'var(--navy)', fontWeight: 500 }}>{uni}</span>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40 }}>
              <Link to="/apply" className="btn btn-red" style={{ fontSize: 16, padding: '16px 32px' }}>
                Apply for {active.name} →
              </Link>
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <div style={{ background: 'var(--white-soft)', borderRadius: 20, padding: '28px', border: '1px solid rgba(0,87,255,0.08)', position: 'sticky', top: 160 }}>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--navy)', marginBottom: 24 }}>
                Key Facts
              </h3>
              {[
                { icon: '📅', label: 'Intakes', value: active.intakes.join(', ') },
                { icon: '💰', label: 'Avg. Tuition', value: active.fees },
                { icon: '🛂', label: 'Visa Type', value: active.visa },
                { icon: '📝', label: 'IELTS Requirement', value: active.ielts },
                { icon: '💼', label: 'Post-Study Work', value: active.postStudy },
              ].map(fact => (
                <div key={fact.label} style={{ paddingBottom: 16, marginBottom: 16, borderBottom: '1px solid rgba(0,87,255,0.06)' }}>
                  <p style={{ fontSize: 11, color: 'var(--gray)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 4 }}>
                    {fact.icon} {fact.label}
                  </p>
                  <p style={{ fontSize: 14, fontWeight: 600, color: 'var(--navy)' }}>{fact.value}</p>
                </div>
              ))}

              <div style={{ marginTop: 8 }}>
                <p style={{ fontSize: 12, fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--gray)', marginBottom: 12 }}>
                  🎓 Scholarships
                </p>
                {active.scholarships.map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                    <span style={{ color: 'var(--gold)', fontSize: 12 }}>★</span>
                    <span style={{ fontSize: 13, color: 'var(--navy)' }}>{s}</span>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: 24, background: 'rgba(37,211,102,0.08)', borderRadius: 12, padding: '16px', border: '1px solid rgba(37,211,102,0.15)' }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>💬 Need personalised advice?</p>
                <a href="https://wa.me/8801733933689" target="_blank" rel="noreferrer"
                  style={{ color: '#25D366', fontSize: 13, textDecoration: 'none', fontWeight: 500 }}>
                  Chat on WhatsApp →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .dest-content-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
