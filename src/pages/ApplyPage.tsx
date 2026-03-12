import { useState } from 'react';
import { Link } from 'react-router-dom';

const steps = [
  { num: 1, label: 'Personal Info' },
  { num: 2, label: 'Study Preferences' },
  { num: 3, label: 'Qualifications' },
];

const countries = ['United Kingdom', 'United States', 'Canada', 'Australia', 'Germany', 'Ireland', 'New Zealand', 'Dubai / UAE', 'Not Sure Yet'];
const levels = ['Foundation / Pathway', 'Undergraduate (Bachelor)', 'Postgraduate (Master)', 'Doctoral (PhD)', 'Diploma / Certificate', 'Short Course'];
const budgets = ['Under $10,000/year', '$10,000 – $20,000/year', '$20,000 – $35,000/year', '$35,000 – $50,000/year', '$50,000+/year', 'Scholarship Only'];
const intakes = ['September / Fall 2025', 'January / Spring 2026', 'September / Fall 2026', 'Flexible / Not Sure'];

export default function ApplyPage() {
  const [step, setStep] = useState(1);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', dob: '', nationality: 'Bangladeshi',
    country: '', level: '', field: '', budget: '', intake: '', scholarship: '',
    cgpa: '', lastDegree: '', ielts: '', gre: '', workExp: '', documents: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const progress = (step / 3) * 100;

  const validateStep = (s: number) => {
    const errs: Record<string, string> = {};
    if (s === 1) {
      if (!form.name.trim()) errs.name = 'Required';
      if (!form.email.match(/^[^@]+@[^@]+\.[^@]+$/)) errs.email = 'Valid email required';
      if (!form.phone.trim()) errs.phone = 'Required';
    }
    if (s === 2) {
      if (!form.country) errs.country = 'Please select a country';
      if (!form.level) errs.level = 'Please select a level';
    }
    return errs;
  };

  const next = () => {
    const errs = validateStep(step);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setErrors({});
    setStep(s => s + 1);
  };

  const prev = () => setStep(s => s - 1);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setDone(true);
  };

  const Field = ({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) => (
    <div>
      <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--navy)', marginBottom: 6 }}>{label}</label>
      {children}
      {error && <p style={{ color: 'var(--red)', fontSize: 12, marginTop: 4 }}>{error}</p>}
    </div>
  );

  if (done) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--white-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '28px' }}>
        <div style={{ maxWidth: 600, width: '100%', textAlign: 'center' }}>
          <div style={{
            width: 100, height: 100, borderRadius: '50%',
            background: 'linear-gradient(135deg, #25D366, #00b09b)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 28px', fontSize: 48,
          }}>✓</div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 40, color: 'var(--navy)', marginBottom: 16 }}>
            Application Received!
          </h1>
          <p style={{ color: 'var(--gray)', fontSize: 16, lineHeight: 1.8, marginBottom: 12 }}>
            Thank you, <strong style={{ color: 'var(--navy)' }}>{form.name}</strong>! We have received your application and a dedicated counselor will contact you within 24 hours.
          </p>
          <p style={{ color: 'var(--gray)', fontSize: 15, lineHeight: 1.7, marginBottom: 32 }}>
            In the meantime, feel free to explore our destinations guide or WhatsApp us if you have any urgent questions.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/" className="btn btn-primary" style={{ textDecoration: 'none' }}>Back to Home</Link>
            <a href="https://wa.me/8801733933689" target="_blank" rel="noreferrer" className="btn btn-ghost" style={{
              background: '#25D366', border: 'none', color: '#fff',
            }}>
              WhatsApp Us
            </a>
          </div>

          <div style={{
            marginTop: 48, background: '#fff', borderRadius: 16, padding: '24px',
            boxShadow: 'var(--shadow-card)', textAlign: 'left',
          }}>
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 18, color: 'var(--navy)', marginBottom: 16 }}>What Happens Next?</h3>
            {[
              { step: '01', text: 'A counselor reviews your application and contacts you within 24 hours' },
              { step: '02', text: 'Free 45-minute consultation — phone, video, or in-office' },
              { step: '03', text: 'Personalised study plan and university shortlist presented to you' },
              { step: '04', text: 'Application journey begins — we handle everything from here' },
            ].map(item => (
              <div key={item.step} style={{ display: 'flex', gap: 16, alignItems: 'flex-start', marginBottom: 16 }}>
                <div style={{
                  width: 36, height: 36, borderRadius: '50%',
                  background: 'var(--blue)', color: '#fff',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 12, flexShrink: 0, fontFamily: 'var(--font-label)',
                }}>{item.step}</div>
                <p style={{ color: 'var(--gray)', fontSize: 14, lineHeight: 1.6, paddingTop: 6 }}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--white-soft)' }}>
      {/* Header */}
      <div style={{ background: 'var(--navy)', padding: '140px 28px 60px', textAlign: 'center' }}>
        <span className="section-label" style={{ color: '#60A5FA' }}>FREE APPLICATION</span>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(32px, 5vw, 56px)', color: '#fff', marginTop: 12, marginBottom: 16 }}>
          Start Your Application
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 16, maxWidth: 500, margin: '0 auto' }}>
          3 simple steps to get matched with your dream university and a dedicated counselor.
        </p>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 28px 96px' }}>
        {/* Progress bar */}
        <div style={{ marginBottom: 48 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
            {steps.map(s => (
              <div key={s.num} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
                <div style={{
                  width: 44, height: 44, borderRadius: '50%',
                  background: step >= s.num ? 'var(--blue)' : '#e5e7eb',
                  color: step >= s.num ? '#fff' : 'var(--gray)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontWeight: 700, fontSize: 16, transition: 'all 0.4s ease',
                  boxShadow: step === s.num ? '0 0 0 4px rgba(0,87,255,0.2)' : 'none',
                }}>
                  {step > s.num ? '✓' : s.num}
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: step >= s.num ? 'var(--blue)' : 'var(--gray)', fontFamily: 'var(--font-label)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                  {s.label}
                </span>
              </div>
            ))}
          </div>
          <div className="step-bar">
            <div className="step-bar-fill" style={{ width: `${progress}%` }} />
          </div>
          <p style={{ textAlign: 'right', color: 'var(--gray)', fontSize: 12, marginTop: 8 }}>Step {step} of 3</p>
        </div>

        {/* Form card */}
        <div style={{
          background: '#fff', borderRadius: 24, padding: '40px',
          boxShadow: '0 8px 40px rgba(0,87,255,0.08)',
          border: '1px solid rgba(0,87,255,0.06)',
        }}>
          <form onSubmit={submit}>
            {/* Step 1 — Personal Info */}
            {step === 1 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--navy)', marginBottom: 4 }}>Personal Information</h2>
                  <p style={{ color: 'var(--gray)', fontSize: 14 }}>Tell us a bit about yourself so we can personalise your experience.</p>
                </div>

                <Field label="Full Name *" error={errors.name}>
                  <input
                    className="form-field-light" type="text" placeholder="e.g. Mohammad Rashid"
                    value={form.name}
                    onChange={e => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: '' }); }}
                  />
                </Field>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-2col">
                  <Field label="Email Address *" error={errors.email}>
                    <input
                      className="form-field-light" type="email" placeholder="your@email.com"
                      value={form.email}
                      onChange={e => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: '' }); }}
                    />
                  </Field>
                  <Field label="Phone Number *" error={errors.phone}>
                    <input
                      className="form-field-light" type="tel" placeholder="+880 1XXX-XXXXXX"
                      value={form.phone}
                      onChange={e => { setForm({ ...form, phone: e.target.value }); setErrors({ ...errors, phone: '' }); }}
                    />
                  </Field>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-2col">
                  <Field label="Date of Birth">
                    <input
                      className="form-field-light" type="date"
                      value={form.dob}
                      onChange={e => setForm({ ...form, dob: e.target.value })}
                    />
                  </Field>
                  <Field label="Nationality">
                    <input
                      className="form-field-light" type="text" placeholder="Bangladeshi"
                      value={form.nationality}
                      onChange={e => setForm({ ...form, nationality: e.target.value })}
                    />
                  </Field>
                </div>
              </div>
            )}

            {/* Step 2 — Study Preferences */}
            {step === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--navy)', marginBottom: 4 }}>Study Preferences</h2>
                  <p style={{ color: 'var(--gray)', fontSize: 14 }}>Help us find the perfect destination and program for you.</p>
                </div>

                <Field label="Preferred Country *" error={errors.country}>
                  <select
                    className="form-field-light"
                    value={form.country}
                    onChange={e => { setForm({ ...form, country: e.target.value }); setErrors({ ...errors, country: '' }); }}
                    style={{ color: form.country ? 'var(--navy)' : 'var(--gray)' }}
                  >
                    <option value="">Select a country...</option>
                    {countries.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>

                <Field label="Study Level *" error={errors.level}>
                  <select
                    className="form-field-light"
                    value={form.level}
                    onChange={e => { setForm({ ...form, level: e.target.value }); setErrors({ ...errors, level: '' }); }}
                    style={{ color: form.level ? 'var(--navy)' : 'var(--gray)' }}
                  >
                    <option value="">Select study level...</option>
                    {levels.map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
                </Field>

                <Field label="Field of Study">
                  <input
                    className="form-field-light" type="text" placeholder="e.g. Computer Science, Business Administration, Medicine"
                    value={form.field}
                    onChange={e => setForm({ ...form, field: e.target.value })}
                  />
                </Field>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-2col">
                  <Field label="Annual Budget">
                    <select
                      className="form-field-light"
                      value={form.budget}
                      onChange={e => setForm({ ...form, budget: e.target.value })}
                      style={{ color: form.budget ? 'var(--navy)' : 'var(--gray)' }}
                    >
                      <option value="">Select budget range...</option>
                      {budgets.map(b => <option key={b} value={b}>{b}</option>)}
                    </select>
                  </Field>
                  <Field label="Target Intake">
                    <select
                      className="form-field-light"
                      value={form.intake}
                      onChange={e => setForm({ ...form, intake: e.target.value })}
                      style={{ color: form.intake ? 'var(--navy)' : 'var(--gray)' }}
                    >
                      <option value="">Select intake...</option>
                      {intakes.map(i => <option key={i} value={i}>{i}</option>)}
                    </select>
                  </Field>
                </div>

                <Field label="Are you interested in scholarships?">
                  <div style={{ display: 'flex', gap: 12 }}>
                    {['Yes, actively seeking', 'Yes, if available', 'Not a priority'].map(opt => (
                      <label key={opt} style={{
                        flex: 1, display: 'flex', alignItems: 'center', gap: 8,
                        background: form.scholarship === opt ? 'rgba(0,87,255,0.08)' : 'var(--white-soft)',
                        border: `2px solid ${form.scholarship === opt ? 'var(--blue)' : '#e5e7eb'}`,
                        borderRadius: 10, padding: '12px 14px', cursor: 'pointer',
                        transition: 'all 0.25s ease', fontSize: 13, fontWeight: 500,
                        color: form.scholarship === opt ? 'var(--blue)' : 'var(--gray)',
                      }}>
                        <input
                          type="radio" name="scholarship" value={opt}
                          checked={form.scholarship === opt}
                          onChange={() => setForm({ ...form, scholarship: opt })}
                          style={{ display: 'none' }}
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                </Field>
              </div>
            )}

            {/* Step 3 — Qualifications */}
            {step === 3 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 28, color: 'var(--navy)', marginBottom: 4 }}>Your Qualifications</h2>
                  <p style={{ color: 'var(--gray)', fontSize: 14 }}>Help us understand your academic background. Be honest — there are great universities for every profile.</p>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-2col">
                  <Field label="Highest Qualification">
                    <input
                      className="form-field-light" type="text" placeholder="e.g. BSc Computer Science"
                      value={form.lastDegree}
                      onChange={e => setForm({ ...form, lastDegree: e.target.value })}
                    />
                  </Field>
                  <Field label="CGPA / Grade">
                    <input
                      className="form-field-light" type="text" placeholder="e.g. 3.2 / 4.0 or 65%"
                      value={form.cgpa}
                      onChange={e => setForm({ ...form, cgpa: e.target.value })}
                    />
                  </Field>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }} className="form-2col">
                  <Field label="IELTS / TOEFL Score">
                    <input
                      className="form-field-light" type="text" placeholder="e.g. IELTS 6.5 (Not taken yet)"
                      value={form.ielts}
                      onChange={e => setForm({ ...form, ielts: e.target.value })}
                    />
                  </Field>
                  <Field label="GRE / GMAT Score">
                    <input
                      className="form-field-light" type="text" placeholder="e.g. GRE 315 (if applicable)"
                      value={form.gre}
                      onChange={e => setForm({ ...form, gre: e.target.value })}
                    />
                  </Field>
                </div>

                <Field label="Work Experience">
                  <input
                    className="form-field-light" type="text" placeholder="e.g. 2 years as Software Engineer at XYZ (or none)"
                    value={form.workExp}
                    onChange={e => setForm({ ...form, workExp: e.target.value })}
                  />
                </Field>

                <Field label="What documents do you currently have?">
                  <textarea
                    className="form-field-light" rows={3}
                    placeholder="e.g. Transcripts, passport, IELTS certificate — or let us know what you still need to arrange"
                    value={form.documents}
                    onChange={e => setForm({ ...form, documents: e.target.value })}
                    style={{ resize: 'vertical' }}
                  />
                </Field>

                <div style={{
                  background: 'rgba(0,87,255,0.04)', borderRadius: 12, padding: '16px 20px',
                  border: '1px solid rgba(0,87,255,0.1)',
                  display: 'flex', gap: 12, alignItems: 'flex-start',
                }}>
                  <span style={{ fontSize: 20 }}>ℹ️</span>
                  <p style={{ fontSize: 13, color: 'var(--gray)', lineHeight: 1.6 }}>
                    Do not worry if you are missing some documents. Our counselors will guide you on exactly what to prepare. Just submit and we will take it from there.
                  </p>
                </div>
              </div>
            )}

            {/* Navigation buttons */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 36, paddingTop: 24, borderTop: '1px solid rgba(0,87,255,0.08)' }}>
              {step > 1 ? (
                <button type="button" onClick={prev} className="btn btn-outline" style={{ textDecoration: 'none' }}>
                  ← Back
                </button>
              ) : (
                <div />
              )}
              {step < 3 ? (
                <button type="button" onClick={next} className="btn btn-primary">
                  Continue →
                </button>
              ) : (
                <button type="submit" className="btn btn-red" style={{ fontSize: 15, padding: '14px 32px' }}>
                  Submit Application →
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Trust bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'center', marginTop: 40, padding: '24px', background: '#fff', borderRadius: 16, boxShadow: 'var(--shadow-card)' }}>
          {[
            { icon: '🔒', text: '100% Private & Secure' },
            { icon: '🆓', text: 'Free Consultation' },
            { icon: '⚡', text: '24hr Response' },
            { icon: '🏆', text: '500+ Students Placed' },
          ].map(item => (
            <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 18 }}>{item.icon}</span>
              <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--navy)' }}>{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 600px) {
          .form-2col { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
