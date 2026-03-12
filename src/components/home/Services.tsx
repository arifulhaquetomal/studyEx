import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: '✒',
    title: 'Profile Evaluation',
    desc: 'We assess your academic background, work experience and goals to map the perfect university shortlist tailored just for you.',
    link: '/services#profile-eval',
  },
  {
    icon: '⚑',
    title: 'University Selection',
    desc: 'Strategic selection of universities across 10+ countries that align with your profile, budget, and career aspirations.',
    link: '/services#uni-selection',
  },
  {
    icon: '📜',
    title: 'Application Assistance',
    desc: 'End-to-end application support — from SOP writing to recommendation letters, we craft a compelling application.',
    link: '/services#application',
  },
  {
    icon: '🎖',
    title: 'Scholarship Guidance',
    desc: 'We identify and help you apply for scholarships worth thousands of dollars, maximising your funding opportunities.',
    link: '/services#scholarship',
  },
  {
    icon: '✈',
    title: 'Visa Processing',
    desc: 'Expert visa guidance with 100% success record. We handle documentation, mock interviews, and embassy prep.',
    link: '/services#visa',
  },
  {
    icon: '⚓',
    title: 'Pre-Departure Guidance',
    desc: 'From travel insurance to accommodation — we prepare you for a smooth transition to your new country.',
    link: '/services#pre-departure',
  },
  {
    icon: '📖',
    title: 'Test Preparation',
    desc: 'IELTS, TOEFL, GRE, and SAT preparation with our expert trainers. Achieve the scores you need to get in.',
    link: '/services#test-prep',
  },
  {
    icon: '⚖',
    title: 'Financial Aid',
    desc: 'We guide you through education loans, bank requirements, and financial documentation to fund your dream degree.',
    link: '/services#financial',
  },
];

export default function Services() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = sectionRef.current?.querySelectorAll('.service-card');
          cards?.forEach((card, i) => {
            const el = card as HTMLElement;
            el.style.opacity = '0';
            el.style.transform = 'translateY(28px)';
            setTimeout(() => {
              el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.35s ease';
              el.style.opacity = '1';
              el.style.transform = 'translateY(0)';
            }, i * 80);
          });
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ background: '#F5EDD8', padding: '96px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 52 }}>
          <span className="section-label">Our Services</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', color: '#1C1007', marginTop: 8, marginBottom: 16 }}>
            Everything You Need to Study Abroad
          </h2>
          {/* Ornamental rule */}
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.5)' }} />
            <span style={{ color: '#C9A84C', fontSize: 12 }}>✦</span>
            <div style={{ width: 40, height: 1, background: 'rgba(201,168,76,0.5)' }} />
          </div>
          <p style={{ color: '#6B5B4B', fontSize: 15, maxWidth: 520, margin: '0 auto', fontStyle: 'italic' }}>
            From your first consultation to landing at your destination university — we're with you every step.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: 20,
        }}>
          {services.map(service => (
            <div key={service.title} className="service-card" style={{ opacity: 0 }}>
              <div style={{
                fontSize: 22,
                color: '#C9A84C',
                marginBottom: 18,
                fontFamily: 'serif',
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 20, color: '#1C1007', marginBottom: 10 }}>
                {service.title}
              </h3>
              <p style={{ color: '#6B5B4B', fontSize: 14, lineHeight: 1.8, marginBottom: 20 }}>
                {service.desc}
              </p>
              <Link
                to={service.link}
                style={{
                  color: '#7A4F2D', fontFamily: 'var(--font-label)', fontWeight: 600, fontSize: 11,
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
                  letterSpacing: '0.1em', textTransform: 'uppercase',
                  transition: 'gap 0.25s ease',
                  borderBottom: '1px solid rgba(122,79,45,0.3)',
                  paddingBottom: 2,
                }}
                onMouseEnter={e => { (e.currentTarget.style.gap = '10px'); (e.currentTarget.style.color = '#C9A84C'); (e.currentTarget.style.borderBottomColor = '#C9A84C'); }}
                onMouseLeave={e => { (e.currentTarget.style.gap = '6px'); (e.currentTarget.style.color = '#7A4F2D'); (e.currentTarget.style.borderBottomColor = 'rgba(122,79,45,0.3)'); }}
              >
                Learn More ›
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/services" className="btn btn-primary">
            View All Services
          </Link>
        </div>
      </div>
    </section>
  );
}
