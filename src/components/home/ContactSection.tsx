import { useState, useRef, useEffect } from 'react';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
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
    <section ref={sectionRef} style={{ background: '#08101E', padding: '96px 0', position: 'relative' }}>
      {/* Background grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'repeating-linear-gradient(0deg, transparent, transparent 59px, rgba(197,168,111,0.03) 60px), repeating-linear-gradient(90deg, transparent, transparent 79px, rgba(197,168,111,0.03) 80px)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px', position: 'relative' }}>
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          <span className="section-label reveal" style={{ color: '#C5A86F' }}>Get In Touch</span>
          <h2 className="reveal" style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', color: '#EDEBE4', marginTop: 8, marginBottom: 16 }}>
            Start Your Journey Today
          </h2>
          <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 14 }}>
            <div style={{ width: 40, height: 1, background: 'rgba(197,168,111,0.35)' }} />
            <span style={{ color: 'rgba(197,168,111,0.5)', fontSize: 10 }}>✦</span>
            <div style={{ width: 40, height: 1, background: 'rgba(197,168,111,0.35)' }} />
          </div>
          <p className="reveal" style={{ color: 'rgba(237,235,228,0.55)', fontSize: 15, maxWidth: 480, margin: '0 auto', fontStyle: 'italic' }}>
            Book a free consultation and let our expert counselors guide you toward your dream university.
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, alignItems: 'start' }} className="contact-grid">
          {/* Form */}
          <div className="reveal">
            {submitted ? (
              <div style={{
                background: 'rgba(197,168,111,0.08)', border: '1px solid rgba(197,168,111,0.25)',
                padding: '48px', textAlign: 'center',
              }}>
                <div style={{ fontSize: 40, marginBottom: 16, color: '#C5A86F' }}>✦</div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 28, color: '#EDEBE4', marginBottom: 12 }}>Message Received!</h3>
                <p style={{ color: 'rgba(237,235,228,0.65)', lineHeight: 1.7, fontStyle: 'italic' }}>
                  Our team shall contact you within 24 hours to schedule your free consultation.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                <div>
                  <input
                    className="form-field"
                    type="text" placeholder="Your Full Name *"
                    value={form.name}
                    onChange={e => setForm({...form, name: e.target.value})}
                  />
                  {errors.name && <p style={{ color: '#C5A86F', fontSize: 11, marginTop: 4, fontFamily: 'var(--font-label)' }}>{errors.name}</p>}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
                  <div>
                    <input
                      className="form-field"
                      type="email" placeholder="Email Address *"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                    />
                    {errors.email && <p style={{ color: '#C5A86F', fontSize: 11, marginTop: 4, fontFamily: 'var(--font-label)' }}>{errors.email}</p>}
                  </div>
                  <div>
                    <input
                      className="form-field"
                      type="tel" placeholder="Phone Number *"
                      value={form.phone}
                      onChange={e => setForm({...form, phone: e.target.value})}
                    />
                    {errors.phone && <p style={{ color: '#C5A86F', fontSize: 11, marginTop: 4, fontFamily: 'var(--font-label)' }}>{errors.phone}</p>}
                  </div>
                </div>
                <select
                  className="form-field"
                  value={form.country}
                  onChange={e => setForm({...form, country: e.target.value})}
                >
                  <option value="">Country Interested In...</option>
                  {['United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'Ireland', 'New Zealand', 'Dubai / UAE'].map(c => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
                <textarea
                  className="form-field"
                  placeholder="Your Message (optional)"
                  rows={4}
                  value={form.message}
                  onChange={e => setForm({...form, message: e.target.value})}
                  style={{ resize: 'vertical' }}
                />
                <button type="submit" className="btn btn-red" style={{ width: '100%', justifyContent: 'center', fontSize: 12, padding: '15px' }}>
                  Send Message
                </button>
                <p style={{ color: 'rgba(237,235,228,0.3)', fontSize: 11, textAlign: 'center', fontStyle: 'italic' }}>
                  By submitting, you agree to our Privacy Policy. We never share your data.
                </p>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="reveal reveal-delay-2">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
              {[
                { label: 'Office Address', value: 'Ali Bhaban (Ground Floor), Airport Road, Sylhet-3100, Bangladesh' },
                { label: 'Phone', value: '+880 1733-933689', href: 'tel:+8801733933689' },
                { label: 'Email', value: 'hello@studyex.net', href: 'mailto:hello@studyex.net' },
                { label: 'Office Hours', value: 'Sun–Thu: 9AM–6PM · Fri–Sat: 10AM–4PM' },
              ].map(info => (
                <div key={info.label} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
                  <div style={{
                    width: 36, height: 36,
                    border: '1px solid rgba(197,168,111,0.25)',
                    display: 'flex', alignItems: 'center',
                    justifyContent: 'center', flexShrink: 0,
                    color: '#C5A86F', fontSize: 12,
                  }}>✦</div>
                  <div>
                    <p style={{ fontSize: 9, color: 'rgba(237,235,228,0.4)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 4 }}>
                      {info.label}
                    </p>
                    {(info as any).href ? (
                      <a href={(info as any).href} style={{ color: 'rgba(237,235,228,0.8)', textDecoration: 'none', fontSize: 14, fontStyle: 'italic' }}>
                        {info.value}
                      </a>
                    ) : (
                      <p style={{ color: 'rgba(237,235,228,0.8)', fontSize: 14, lineHeight: 1.6, fontStyle: 'italic' }}>{info.value}</p>
                    )}
                  </div>
                </div>
              ))}

              {/* WhatsApp CTA */}
              <a
                href="https://wa.me/8801733933689"
                target="_blank" rel="noreferrer"
                style={{
                  display: 'flex', alignItems: 'center', gap: 14,
                  background: 'rgba(37,211,102,0.08)',
                  border: '1px solid rgba(37,211,102,0.2)',
                  padding: '14px 18px',
                  textDecoration: 'none', transition: 'all 0.25s ease',
                  marginTop: 8,
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.15)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(37,211,102,0.08)'; }}
              >
                <svg width="26" height="26" viewBox="0 0 24 24" fill="#25D366">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                <div>
                  <p style={{ color: '#25D366', fontWeight: 600, fontSize: 14, fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>Chat on WhatsApp</p>
                  <p style={{ color: 'rgba(237,235,228,0.45)', fontSize: 11, fontStyle: 'italic' }}>Typically replies within 30 mins</p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
