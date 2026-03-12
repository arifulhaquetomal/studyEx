import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const services = [
  {
    icon: '📋',
    title: 'Profile Evaluation',
    desc: 'We assess your academic background, work experience and goals to map the perfect university shortlist tailored just for you.',
    link: '/services#profile-eval',
  },
  {
    icon: '🏛',
    title: 'University Selection',
    desc: 'Strategic selection of universities across 10+ countries that align with your profile, budget, and career aspirations.',
    link: '/services#uni-selection',
  },
  {
    icon: '📝',
    title: 'Application Assistance',
    desc: 'End-to-end application support — from SOP writing to recommendation letters, we craft a compelling application.',
    link: '/services#application',
  },
  {
    icon: '🎓',
    title: 'Scholarship Guidance',
    desc: 'We identify and help you apply for scholarships worth thousands of dollars, maximizing your funding opportunities.',
    link: '/services#scholarship',
  },
  {
    icon: '✈️',
    title: 'Visa Processing',
    desc: 'Expert visa guidance with 100% success record. We handle documentation, mock interviews, and embassy prep.',
    link: '/services#visa',
  },
  {
    icon: '🌏',
    title: 'Pre-Departure Guidance',
    desc: 'From travel insurance to accommodation — we prepare you for a smooth transition to your new country.',
    link: '/services#pre-departure',
  },
  {
    icon: '📚',
    title: 'Test Preparation',
    desc: 'IELTS, TOEFL, GRE, and SAT preparation with our expert trainers. Achieve the scores you need to get in.',
    link: '/services#test-prep',
  },
  {
    icon: '💰',
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
              el.style.transition = 'opacity 0.6s ease, transform 0.6s ease, box-shadow 0.35s ease, border-color 0.35s ease';
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
    <section ref={sectionRef} style={{ background: 'var(--white-soft)', padding: '96px 0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 60 }}>
          <span className="section-label">OUR SERVICES</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--navy)', marginTop: 8, marginBottom: 16 }}>
            Everything You Need to Study Abroad
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: 16, maxWidth: 520, margin: '0 auto' }}>
            From your first consultation to landing at your destination university — we're with you every step.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(270px, 1fr))',
          gap: 24,
        }}>
          {services.map(service => (
            <div key={service.title} className="service-card" style={{ opacity: 0 }}>
              <div style={{
                width: 56, height: 56, borderRadius: 14,
                background: 'rgba(0,87,255,0.08)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, marginBottom: 20,
              }}>
                {service.icon}
              </div>
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 20, color: 'var(--navy)', marginBottom: 12 }}>
                {service.title}
              </h3>
              <p style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.75, marginBottom: 20 }}>
                {service.desc}
              </p>
              <Link
                to={service.link}
                style={{
                  color: 'var(--blue)', fontWeight: 600, fontSize: 14,
                  textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6,
                  transition: 'gap 0.25s ease',
                }}
                onMouseEnter={e => { (e.currentTarget.style.gap = '10px'); }}
                onMouseLeave={e => { (e.currentTarget.style.gap = '6px'); }}
              >
                Learn More →
              </Link>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginTop: 48 }}>
          <Link to="/services" className="btn btn-primary">
            View All Services →
          </Link>
        </div>
      </div>
    </section>
  );
}
