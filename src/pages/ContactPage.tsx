import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';

const faqs = [
  {
    q: 'Is the initial consultation really free?',
    a: 'Yes, absolutely. Your first consultation with a StudyEx counselor is completely free with no obligation. We believe every student deserves access to quality guidance regardless of their situation.',
  },
  {
    q: 'How long does the full application process take?',
    a: 'Typically 3 to 6 months from consultation to visa approval, depending on your target country and intake. UK applications can move faster (2 to 3 months), while USA and Canada may take 4 to 6 months.',
  },
  {
    q: 'Do you guarantee visa approval?',
    a: 'We have a 100% visa success rate based on our track record. While no one can legally guarantee a government decision, our meticulous preparation and documentation process has never resulted in a rejected visa application for our supported students.',
  },
  {
    q: 'What documents do I need to bring to the first consultation?',
    a: 'Your academic transcripts, any existing test scores (IELTS/TOEFL if taken), your CV/resume if available, and a rough idea of what you want to study and where. But even if you have nothing — just come. We will help you figure out the rest.',
  },
  {
    q: 'Can you help if my grades are not strong?',
    a: 'Yes. A weak CGPA does not close all doors. Many universities consider a holistic profile — work experience, recommendation letters, a strong SOP, and demonstrated passion. Our counselors are skilled at finding programs that fit your real profile.',
  },
  {
    q: 'Do you help with scholarships?',
    a: 'Yes, scholarship identification and application is a core part of our service. Our students have collectively received over BDT 50 crore in scholarship funding. We maintain a database of 500+ scholarships and match you to opportunities you genuinely qualify for.',
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: '1px solid rgba(122,79,45,0.12)', overflow: 'hidden' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          width: '100%', textAlign: 'left', padding: '20px 0',
          background: 'none', border: 'none', cursor: 'pointer',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16,
        }}
      >
        <span style={{ fontFamily: 'var(--font-body)', fontStyle: 'italic', fontWeight: 600, fontSize: 16, color: '#1C1007', lineHeight: 1.4 }}>{q}</span>
        <span style={{
          width: 30, height: 30,
          background: open ? '#7A4F2D' : '#F5EDD8',
          color: open ? '#F5EDD8' : '#7A4F2D',
          border: '1px solid rgba(122,79,45,0.2)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 18, fontWeight: 300, flexShrink: 0,
          transition: 'all 0.3s ease',
          transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
        }}>+</span>
      </button>
      <div style={{
        maxHeight: open ? 300 : 0,
        overflow: 'hidden',
        transition: 'max-height 0.4s cubic-bezier(0.4,0,0.2,1)',
      }}>
        <p style={{ color: '#6B5B4B', fontSize: 14, lineHeight: 1.8, paddingBottom: 20, fontStyle: 'italic' }}>{a}</p>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.reveal').forEach((el, i) =>
            setTimeout(() => el.classList.add('revealed'), i * 100)
          );
        }
      },
      { threshold: 0.1 }
    );
    sectionRef.current?.querySelectorAll('section').forEach(s => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = 'Name is required';
    if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = 'Valid email required';
    if (!form.phone.trim()) errs.phone = 'Phone is required';
    return errs;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  return (
    <div ref={sectionRef}>
      {/* Hero */}
      <section style={{ background: '#1C1007', padding: '160px 28px 96px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 720, margin: '0 auto', position: 'relative' }}>
          <span className="section-label reveal" style={{ color: '#C9A84C' }}>Get In Touch</span>
          <h1 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(36px, 5vw, 64px)', color: '#F5EDD8', marginTop: 12, marginBottom: 20 }}>
            Contact <span style={{ color: '#C9A84C' }}>StudyEx</span>
          </h1>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
            <span style={{ color: '#C9A84C', fontSize: 12 }}>✦</span>
            <div style={{ width: 48, height: 1, background: 'rgba(201,168,76,0.4)' }} />
          </div>
          <p className="reveal" style={{ color: 'rgba(245,237,216,0.6)', fontSize: 17, lineHeight: 1.85, fontStyle: 'italic' }}>
            Whether you are ready to apply or just exploring your options — we are here to help. No pressure, no obligation.
          </p>
        </div>
      </section>

      {/* Quick contact cards */}
      <section style={{ padding: '0 28px', transform: 'translateY(-40px)' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 20 }}>
            {[
              { icon: '📞', label: 'Call Us', value: '+880 1733-933689', href: 'tel:+8801733933689', color: '#7A4F2D' },
              { icon: '✉️', label: 'Email Us', value: 'hello@studyex.net', href: 'mailto:hello@studyex.net', color: '#6B1A2E' },
              { icon: '💬', label: 'WhatsApp', value: 'Chat Now', href: 'https://wa.me/8801733933689', color: '#4A5C44' },
              { icon: '📍', label: 'Visit Us', value: 'Airport Road, Sylhet', href: '#map', color: '#7A5C44' },
            ].map(card => (
              <a
                key={card.label}
                href={card.href}
                target={card.href.startsWith('http') ? '_blank' : undefined}
                rel="noreferrer"
                style={{
                  background: '#F5EDD8', borderRadius: 0, padding: '24px',
                  boxShadow: '0 4px 24px rgba(28,16,7,0.08)',
                  textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: 16,
                  transition: 'all 0.3s ease',
                  border: '1px solid rgba(122,79,45,0.15)',
                  borderTop: `2px solid ${card.color}`,
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)';
                  (e.currentTarget as HTMLElement).style.background = '#FDF6E3';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
                  (e.currentTarget as HTMLElement).style.background = '#F5EDD8';
                }}
              >
                <div style={{
                  width: 52, height: 52, borderRadius: 14,
                  background: `${card.color}15`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 24, flexShrink: 0,
                }}>{card.icon}</div>
                <div>
                  <p style={{ fontSize: 9, color: '#6B5B4B', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{card.label}</p>
                  <p style={{ fontSize: 15, fontWeight: 600, color: '#1C1007', fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{card.value}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Main contact section */}
      <section style={{ padding: '40px 28px 96px' }}>
        <div style={{ maxWidth: 1280, margin: '0 auto' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="contact-grid">
            {/* Form */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 32, color: '#1C1007', marginBottom: 8 }}>Send Us a Message</h2>
              <p style={{ color: '#6B5B4B', fontSize: 14, marginBottom: 32, fontStyle: 'italic' }}>Fill out the form and we will respond within 24 hours.</p>
              {submitted ? (
                <div style={{
                  background: '#F5EDD8', border: '1px solid rgba(122,79,45,0.25)',
                  padding: '48px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 40, marginBottom: 16, color: '#C9A84C' }}>✦</div>
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 28, color: '#1C1007', marginBottom: 12 }}>Message Received!</h3>
                  <p style={{ color: '#6B5B4B', lineHeight: 1.7, fontStyle: 'italic' }}>
                    Thank you for contacting StudyEx. Our team will reach out within 24 hours.
                  </p>
                  <Link to="/" className="btn btn-primary" style={{ marginTop: 24, textDecoration: 'none', display: 'inline-block' }}>
                    Back to Home
                  </Link>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <input
                        className="form-field-light" type="text" placeholder="Your Full Name *"
                        value={form.name}
                        onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                      />
                      {errors.name && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.name}</p>}
                    </div>
                    <div>
                      <input
                        className="form-field-light" type="email" placeholder="Email Address *"
                        value={form.email}
                        onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                      />
                      {errors.email && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.email}</p>}
                    </div>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                    <div>
                      <input
                        className="form-field-light" type="tel" placeholder="Phone Number *"
                        value={form.phone}
                        onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
                      />
                      {errors.phone && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{errors.phone}</p>}
                    </div>
                    <select
                      className="form-field-light"
                      value={form.country}
                      onChange={e => setForm({ ...form, country: e.target.value })}
                      style={{ color: form.country ? 'var(--navy)' : 'var(--gray)' }}
                    >
                      <option value="">Country Interested In...</option>
                      {['United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'Ireland', 'New Zealand', 'Dubai / UAE'].map(c => (
                        <option key={c} value={c}>{c}</option>
                      ))}
                    </select>
                  </div>
                  <input
                    className="form-field-light" type="text" placeholder="Subject"
                    value={form.subject}
                    onChange={e => setForm({ ...form, subject: e.target.value })}
                  />
                  <textarea
                    className="form-field-light" placeholder="Your Message" rows={5}
                    value={form.message}
                    onChange={e => setForm({ ...form, message: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                  <button type="submit" className="btn btn-red" style={{ width: '100%', justifyContent: 'center', fontSize: 16, padding: '16px' }}>
                    Send Message →
                  </button>
                  <p style={{ color: 'var(--gray)', fontSize: 12, textAlign: 'center' }}>
                    By submitting, you agree to our Privacy Policy. We never share your data.
                  </p>
                </form>
              )}
            </div>

            {/* Info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 32, color: '#1C1007', marginBottom: 8 }}>Visit Our Office</h2>
              <p style={{ color: '#6B5B4B', fontSize: 14, marginBottom: 32, fontStyle: 'italic' }}>We welcome walk-in consultations during office hours.</p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginBottom: 32 }}>
                {[
                  { icon: '📍', label: 'Office Address', value: 'Ali Bhaban (Ground Floor), Airport Road, Sylhet-3100, Bangladesh', href: '' },
                  { icon: '📞', label: 'Phone', value: '+880 1733-933689', href: 'tel:+8801733933689' },
                  { icon: '✉️', label: 'Email', value: 'hello@studyex.net', href: 'mailto:hello@studyex.net' },
                  { icon: '⏰', label: 'Office Hours', value: 'Sun to Thu: 9:00 AM to 6:00 PM  |  Fri to Sat: 10:00 AM to 4:00 PM', href: '' },
                ].map(info => (
                  <div key={info.label} style={{ display: 'flex', gap: 16, alignItems: 'flex-start' }}>
                    <div style={{
                      width: 44, height: 44,
                      background: '#F5EDD8',
                      border: '1px solid rgba(122,79,45,0.15)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 18, flexShrink: 0,
                    }}>{info.icon}</div>
                    <div>
                      <p style={{ fontSize: 9, color: '#6B5B4B', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.12em', marginBottom: 4 }}>{info.label}</p>
                      {info.href ? (
                        <a href={info.href} style={{ color: '#1C1007', textDecoration: 'none', fontSize: 15, fontWeight: 500, fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}
                          onMouseEnter={e => (e.currentTarget.style.color = '#7A4F2D')}
                          onMouseLeave={e => (e.currentTarget.style.color = '#1C1007')}
                        >{info.value}</a>
                      ) : (
                        <p style={{ color: '#1C1007', fontSize: 15, lineHeight: 1.6, fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>{info.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Map visual */}
              <div id="map" style={{
                background: '#1C1007',
                height: 180,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center', gap: 10,
                border: '1px solid rgba(201,168,76,0.3)',
                marginBottom: 20, overflow: 'hidden', position: 'relative',
              }}>
                <div style={{
                  position: 'absolute', inset: 0, opacity: 0.05,
                  backgroundImage: 'linear-gradient(rgba(201,168,76,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.5) 1px, transparent 1px)',
                  backgroundSize: '30px 30px',
                }} />
                <span style={{ fontSize: 36 }}>📍</span>
                <p style={{ color: '#F5EDD8', fontWeight: 600, fontSize: 14, position: 'relative', zIndex: 1, fontFamily: 'var(--font-heading)', fontStyle: 'italic' }}>StudyEx Office — Airport Road, Sylhet</p>
                <a
                  href="https://maps.google.com/?q=Airport+Road+Sylhet+Bangladesh"
                  target="_blank" rel="noreferrer"
                  style={{
                    background: '#7A4F2D', color: '#F5EDD8',
                    padding: '8px 24px', fontSize: 12, fontWeight: 600,
                    textDecoration: 'none', position: 'relative', zIndex: 1,
                    transition: 'background 0.25s ease',
                    fontFamily: 'var(--font-label)', letterSpacing: '0.05em', textTransform: 'uppercase',
                    border: '1px solid rgba(201,168,76,0.4)',
                  }}
                >
                  Open in Google Maps
                </a>
              </div>

              {/* WhatsApp */}
              <a
                href="https://wa.me/8801733933689"
                target="_blank" rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: 'rgba(37,211,102,0.08)',
                  border: '1px solid rgba(37,211,102,0.2)',
                  padding: '16px 20px',
                  textDecoration: 'none', transition: 'all 0.25s ease',
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.08)'; }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                <div>
                  <p style={{ color: '#25D366', fontWeight: 600, fontSize: 13, fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Chat on WhatsApp</p>
                  <p style={{ color: '#6B5B4B', fontSize: 11, fontStyle: 'italic' }}>Typically replies within 30 minutes</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ background: '#F5EDD8', padding: '80px 28px', borderTop: '1px solid rgba(122,79,45,0.12)' }}>
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: 52 }}>
            <span className="section-label reveal">Frequently Asked</span>
            <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 40px)', color: '#1C1007', marginTop: 8 }}>
              Common Questions
            </h2>
          </div>
          <div>
            {faqs.map(faq => (
              <FAQItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 44 }}>
            <p style={{ color: '#6B5B4B', fontSize: 14, marginBottom: 20, fontStyle: 'italic' }}>Still have questions? We are happy to help.</p>
            <a href="https://wa.me/8801733933689" target="_blank" rel="noreferrer" className="btn btn-primary">
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </div>
  );
}
