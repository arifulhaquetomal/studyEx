import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import StatsCounter from '../components/home/StatsCounter';

const team = [
  { name: 'Mohammad Rafiq', title: 'Founder & Chief Counselor', avatar: 'MR', color: '#0057FF', exp: '15+ years in international education' },
  { name: 'Fatima Khanam', title: 'UK & Ireland Specialist', avatar: 'FK', color: '#E8173A', exp: 'MSc alumna, University of Edinburgh' },
  { name: 'Jahangir Alam', title: 'USA & Canada Counselor', avatar: 'JA', color: '#F5A623', exp: 'MBA alumnus, Western Michigan University' },
  { name: 'Razia Sultana', title: 'Visa & Documentation Expert', avatar: 'RS', color: '#25D366', exp: '10+ years visa processing experience' },
  { name: 'Tanvir Hossain', title: 'Australia & NZ Specialist', avatar: 'TH', color: '#9333EA', exp: 'PhD alumnus, University of Melbourne' },
  { name: 'Nasrin Akter', title: 'Scholarship & Finance Advisor', avatar: 'NA', color: '#0057FF', exp: 'Former DAAD scholarship recipient' },
];

const values = [
  { icon: '🎯', title: 'Mission', desc: 'To make world-class international education accessible to every ambitious Bangladeshi student, regardless of financial background or academic history.' },
  { icon: '🔭', title: 'Vision', desc: 'To be South Asia\'s most trusted international education consultancy, building a generation of globally competitive graduates who make Bangladesh proud.' },
  { icon: '💎', title: 'Values', desc: 'Integrity, transparency, and genuine care. We measure our success by our students\' success — not commission rates or enrollment numbers.' },
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
      <section style={{ background: 'var(--navy)', padding: '160px 28px 96px', textAlign: 'center' }}>
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <span className="section-label reveal" style={{ color: '#60A5FA' }}>OUR STORY</span>
          <h1 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(36px, 5vw, 64px)', color: '#fff', marginTop: 12, marginBottom: 20 }}>
            About <span style={{ color: '#60A5FA' }}>StudyEx</span>
          </h1>
          <p className="reveal" style={{ color: 'rgba(255,255,255,0.7)', fontSize: 18, lineHeight: 1.8, maxWidth: 640, margin: '0 auto 32px' }}>
            Since 2009, we've been Bangladesh's most trusted bridge between ambitious students and world-class universities. This is our story.
          </p>
        </div>
      </section>

      {/* Story */}
      <section style={{ padding: '96px 28px', maxWidth: 1280, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 72, alignItems: 'center' }} className="about-grid">
          <div className="reveal-left">
            <span className="section-label">WHO WE ARE</span>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 40px)', color: 'var(--navy)', marginTop: 12, marginBottom: 20 }}>
              Born from a Dream,<br />Built on Results
            </h2>
            <p style={{ color: 'var(--gray)', fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
              StudyEx was founded in 2009 in the heart of Sylhet, Bangladesh, by Mohammad Rafiq — himself a product of international education. Having navigated the complex overseas admissions process alone, Rafiq was determined to create a resource that would help future generations do it with expert guidance.
            </p>
            <p style={{ color: 'var(--gray)', fontSize: 16, lineHeight: 1.85, marginBottom: 16 }}>
              What started as a one-person operation in a small office on Airport Road has grown into a team of 12 specialists, each with international academic or professional credentials, helping 50+ students every year reach universities in 10+ countries.
            </p>
            <p style={{ color: 'var(--gray)', fontSize: 16, lineHeight: 1.85, marginBottom: 32 }}>
              We are not a visa factory. We are counselors, mentors, and advocates — we genuinely care about each student's outcome and work tirelessly to ensure they get into programs that will truly transform their lives.
            </p>
            <Link to="/contact" className="btn btn-primary">Talk to a Counselor →</Link>
          </div>
          <div className="reveal-right">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {[
                { num: '2009', label: 'Founded', color: 'var(--blue)', bg: 'rgba(0,87,255,0.05)' },
                { num: '500+', label: 'Students Placed', color: 'var(--navy)', bg: 'var(--white-soft)' },
                { num: '10+', label: 'Countries', color: 'var(--red)', bg: 'rgba(232,23,58,0.05)' },
                { num: '100%', label: 'Visa Success', color: '#25D366', bg: 'rgba(37,211,102,0.05)' },
              ].map(item => (
                <div key={item.label} style={{
                  background: item.bg, borderRadius: 16, padding: '28px',
                  border: `1px solid ${item.color}20`, textAlign: 'center',
                }}>
                  <p style={{ fontFamily: 'var(--font-heading)', fontSize: 40, fontWeight: 700, color: item.color, marginBottom: 8 }}>{item.num}</p>
                  <p style={{ fontSize: 13, color: 'var(--gray)', fontWeight: 500 }}>{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Mission/Vision */}
      <section style={{ padding: '80px 28px', background: 'var(--white-soft)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 56 }}>
            <span className="section-label reveal">OUR FOUNDATION</span>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--navy)', marginTop: 8 }}>
              What Drives Us
            </h2>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {values.map((v, i) => (
              <div key={v.title} className="reveal service-card" style={{ opacity: 0, transitionDelay: `${i * 0.1}s` }}>
                <div style={{ fontSize: 40, marginBottom: 16 }}>{v.icon}</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 22, color: 'var(--navy)', marginBottom: 12 }}>{v.title}</h3>
                <p style={{ color: 'var(--gray)', fontSize: 15, lineHeight: 1.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsCounter />

      {/* Team */}
      <section style={{ padding: '96px 28px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 60 }}>
            <span className="section-label reveal">THE TEAM</span>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--navy)', marginTop: 8, marginBottom: 16 }}>
              Meet Your Counselors
            </h2>
            <p className="reveal" style={{ color: 'var(--gray)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
              Every member of our team has lived the international student experience — so we know exactly what you're going through.
            </p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 24 }}>
            {team.map((member, i) => (
              <div key={member.name} className="team-card reveal" style={{ opacity: 0, transitionDelay: `${i * 0.08}s` }}>
                <div className="team-avatar" style={{ background: member.color }}>
                  {member.avatar}
                </div>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--navy)', marginBottom: 4 }}>{member.name}</h4>
                <p style={{ color: 'var(--blue)', fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{member.title}</p>
                <p style={{ color: 'var(--gray)', fontSize: 12, lineHeight: 1.6 }}>{member.exp}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--navy)', padding: '80px 28px', textAlign: 'center' }}>
        <div style={{ maxWidth: 640, margin: '0 auto' }}>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: '#fff', marginBottom: 20 }}>
            Ready to Start Your Journey?
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, marginBottom: 36 }}>
            Book a free consultation with one of our expert counselors today.
          </p>
          <Link to="/apply" className="btn btn-red" style={{ fontSize: 16, padding: '16px 36px' }}>
            Book Free Consultation →
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
