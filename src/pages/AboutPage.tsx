import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import StatsCounter from '../components/home/StatsCounter';

const team = [
  { name: 'Mohammad Rafiq', title: 'Founder & Chief Counselor', avatar: 'MR', color: '#3D2B1F', exp: '15+ years in international education' },
  { name: 'Fatima Khanam', title: 'UK & Ireland Specialist', avatar: 'FK', color: '#6B1A2E', exp: 'MSc alumna, University of Edinburgh' },
  { name: 'Jahangir Alam', title: 'USA & Canada Counselor', avatar: 'JA', color: '#7A4F2D', exp: 'MBA alumnus, Western Michigan University' },
  { name: 'Razia Sultana', title: 'Visa & Documentation Expert', avatar: 'RS', color: '#4A5C44', exp: '10+ years visa processing experience' },
  { name: 'Tanvir Hossain', title: 'Australia & NZ Specialist', avatar: 'TH', color: '#1C3A5C', exp: 'PhD alumnus, University of Melbourne' },
  { name: 'Nasrin Akter', title: 'Scholarship & Finance Advisor', avatar: 'NA', color: '#5C3D2B', exp: 'Former DAAD scholarship recipient' },
];

const values = [
  { icon: '✦', title: 'Mission', desc: 'To make world-class international education accessible to every ambitious Bangladeshi student, regardless of financial background or academic history.' },
  { icon: '✦', title: 'Vision', desc: 'To be South Asia\'s most trusted international education consultancy, building a generation of globally competitive graduates who make Bangladesh proud.' },
  { icon: '✦', title: 'Values', desc: 'Integrity, transparency, and genuine care. We measure our success by our students\' success — not commission rates or enrollment numbers.' },
];

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const reveals = entry.target.querySelectorAll('.reveal, .reveal-left, .reveal-right');
          reveals.forEach((el, i) => setTimeout(() => el.classList.add('revealed'), i * 100));
        }
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('section').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section style={{
        background: '#1C1007',
        padding: '160px 28px 96px',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Grid lines */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)',
          backgroundSize: '80px 80px', pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <span className="section-label reveal" style={{ color: '#C9A84C' }}>Our Story</span>
          <h1 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(36px, 5vw, 64px)', color: '#F5EDD8', marginTop: 12, marginBottom: 20 }}>
            About <span style={{ color: '#C9A84C' }}>StudyEx</span>
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
            <span style={{ color: '#C9A84C', fontSize: 12 }}>✦</span>
            <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
          </div>
          <p className="reveal" style={{ color: 'rgba(245,237,216,0.65)', fontSize: 17, lineHeight: 1.85, maxWidth: 640, margin: '0 auto 32px', fontStyle: 'italic' }}>
            Since 2009, we've been Bangladesh's most trusted bridge between ambitious students and world-class universities. This is our story.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '96px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="about-grid">
          <div className="reveal-left">
            <span className="section-label">Who We Are</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', color: '#1C1007', marginTop: 12, marginBottom: 20 }}>
              Born from a Dream,<br />Built on Results
            </h2>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
              <div style={{ width: 48, height: 1, background: '#C9A84C' }} />
              <span style={{ color: '#C9A84C', fontSize: 10 }}>✦</span>
            </div>
            <p style={{ color: '#6B5B4B', fontSize: 15, lineHeight: 1.9, marginBottom: 16, fontStyle: 'italic' }}>
              StudyEx was founded in 2009 in the heart of Sylhet, Bangladesh, by Mohammad Rafiq — himself a product of international education. Having navigated the complex overseas admissions process alone, Rafiq was determined to create a resource that would help future generations do it with expert guidance.
            </p>
            <p style={{ color: '#6B5B4B', fontSize: 15, lineHeight: 1.9, marginBottom: 16 }}>
              What started as a one-person operation in a small office on Airport Road has grown into a team of 12 specialists, each with international academic or professional credentials, helping 50+ students every year reach universities in 10+ countries.
            </p>
            <p style={{ color: '#6B5B4B', fontSize: 15, lineHeight: 1.9, marginBottom: 32 }}>
              We are not a visa factory. We are counselors, mentors, and advocates — we genuinely care about each student's outcome and work tirelessly to ensure they get into programs that will truly transform their lives.
            </p>
            <Link to="/contact" className="btn btn-primary">Talk to a Counselor</Link>
          </div>
          <div className="reveal-right">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
              {[
                { num: '2009', label: 'Founded', color: '#7A4F2D', bg: '#F5EDD8' },
                { num: '500+', label: 'Students Placed', color: '#1C1007', bg: '#F5EDD8' },
                { num: '10+', label: 'Countries', color: '#6B1A2E', bg: '#F5EDD8' },
                { num: '100%', label: 'Visa Success', color: '#4A5C44', bg: '#F5EDD8' },
              ].map(item => (
                <div key={item.label} style={{
                  background: item.bg, padding: '28px',
                  border: '1px solid rgba(122,79,45,0.15)',
                  borderTop: `2px solid ${item.color}`,
                  textAlign: 'center',
                }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 40, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.num}</p>
                  <p style={{ fontSize: 12, color: '#6B5B4B', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section style={{ padding: '80px 28px', background: '#F5EDD8', borderTop: '1px solid rgba(122,79,45,0.12)', borderBottom: '1px solid rgba(122,79,45,0.12)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="section-label reveal">Our Foundation</span>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', color: '#1C1007', marginTop: 8 }}>
              What Drives Us
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 20 }}>
            {values.map((v, i) => (
              <div key={v.title} className="reveal service-card" style={{ opacity: 0, transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: 16, color: '#C9A84C', marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 22, color: '#1C1007', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: '#6B5B4B', fontSize: 14, lineHeight: 1.85 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* Team */}
      <section style={{ padding: '96px 28px', background: '#FDF6E3' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label reveal">The Team</span>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', color: '#1C1007', marginTop: 8, marginBottom: 16 }}>
              Meet Your Counselors
            </h2>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 16 }}>
              <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.4)' }} />
              <span style={{ color: '#C9A84C', fontSize: 10 }}>✦</span>
              <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.4)' }} />
            </div>
            <p className="reveal" style={{ color: '#6B5B4B', fontSize: 15, maxWidth: 520, margin: '0 auto', fontStyle: 'italic' }}>
              Every member of our team has lived the international student experience — so we know exactly what you're going through.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
            {team.map((member, i) => (
              <div key={member.name} className="team-card reveal" style={{ opacity: 0, transitionDelay: `${i * 0.08}s` }}>
                <div className="team-avatar" style={{ background: member.color }}>
                  {member.avatar}
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 18, color: '#1C1007', marginBottom: 4 }}>{member.name}</h4>
                <p style={{ color: '#7A4F2D', fontSize: 12, fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: 8 }}>{member.title}</p>
                <p style={{ color: '#6B5B4B', fontSize: 12, lineHeight: 1.7, fontStyle: 'italic' }}>{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: '#1C1007', padding: '80px 28px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(201,168,76,0.03) 80px)',
          pointerEvents: 'none',
        }} />
        <div style={{ maxWidth: 640, margin: '0 auto', position: 'relative' }}>
          <span style={{ color: '#C9A84C', fontSize: 20 }}>✦</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', color: '#F5EDD8', marginBottom: 16, marginTop: 12 }}>
            Ready to Start Your Journey?
          </h2>
          <p style={{ color: 'rgba(245,237,216,0.6)', fontSize: 16, marginBottom: 36, fontStyle: 'italic' }}>
            Book a free consultation with one of our expert counselors today.
          </p>
          <Link to="/apply" className="btn btn-red" style={{ fontSize: 12, padding: '14px 36px' }}>
            Book Free Consultation
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
