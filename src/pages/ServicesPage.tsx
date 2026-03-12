import { Link } from 'react-router-dom';

const services = [
  {
    id: 'profile-eval',
    icon: '📋',
    title: 'Profile Evaluation',
    tagline: 'Know where you stand. Know where you\'re going.',
    desc: `Your academic journey abroad starts with an honest, thorough assessment of your profile. Our experienced counselors analyse your academic records, work experience, language test scores, and career aspirations to create a comprehensive picture of your strengths and areas for development.

We then map this against the entry requirements of hundreds of global universities to identify realistic yet ambitious targets — shortlisting programs where you have the highest chance of admission AND scholarship.

This is not a generic service. Every evaluation is personalised and delivered by a specialist counselor with experience in your target country.`,
    steps: ['Submit your academic documents', 'Meet your dedicated counselor', 'Receive your profile report within 48 hours', 'Get your university shortlist with admission probability ratings'],
    color: '#7A4F2D',
  },
  {
    id: 'uni-selection',
    icon: '🏛',
    title: 'University Selection',
    tagline: 'The right university changes everything.',
    desc: `Choosing the wrong university can cost you years and thousands of dollars. Choosing the right one can define your career trajectory for decades. Our strategic university selection process is one of the most critical steps we guide you through.

We consider: global rankings, program reputation, scholarship availability, post-study work rights, location, alumni network, employment outcomes, and — critically — your admission probability. We don't just recommend prestigious names; we recommend programs where you will thrive.

Our counselors have direct relationships with international recruitment offices at over 50 universities globally, giving you insider knowledge that no public source provides.`,
    steps: ['Profile analysis complete', 'Research 100+ programs matching your goals', 'Shortlist 6–10 target universities', 'Strategy meeting to finalise your list'],
    color: '#6B1A2E',
  },
  {
    id: 'application',
    icon: '📝',
    title: 'Application Assistance',
    tagline: 'A great application tells your story powerfully.',
    desc: `The application package — including your Statement of Purpose, recommendation letters, CV/resume, and supporting documents — is your voice to the admissions committee. We help you craft a compelling narrative that stands out from thousands of applicants.

Our SOP writers are Masters and PhD graduates who know what admissions officers are looking for. We don't write your SOP for you — we work with you through multiple rounds of drafts, editing, and refinement until it authentically represents your voice and vision.

We also guide your academic referees on how to write impactful recommendation letters, manage all application portals, track deadlines, and submit everything before it's due.`,
    steps: ['SOP strategy session with your counselor', 'Draft 1 → 2 → 3 review cycle', 'Recommendation letter briefing for referees', 'Final submission with checklist verification'],
    color: '#7A5C44',
  },
  {
    id: 'scholarship',
    icon: '🎓',
    title: 'Scholarship Guidance',
    tagline: 'Tuition money you don\'t have to pay back.',
    desc: `Scholarships are not just for academic toppers. They exist for students from diverse backgrounds, specific nationalities, unique research interests, and financial need. Our scholarship team knows where to find them.

We maintain a continuously updated database of 500+ scholarships across all study destinations. For each student, we identify 10–15 scholarship opportunities they genuinely qualify for, then build a scholarship application calendar with deadlines, requirements, and submission strategy.

Our students have collectively received over BDT 50 crore in scholarship funding across their study programs.`,
    steps: ['Scholarship database matching to your profile', 'Application calendar creation', 'Essay writing support for scholarship applications', 'Submission tracking and follow-up'],
    color: '#1C3A5C',
  },
  {
    id: 'visa',
    icon: '✈️',
    title: 'Visa Processing',
    tagline: '100% visa success — not a marketing claim, a track record.',
    desc: `Visa rejection is devastating after months of preparation. Our 100% visa success rate reflects the thoroughness and precision with which we handle every visa application. We leave nothing to chance.

Our visa team meticulously prepares every document — financial statements, sponsorship letters, English proficiency evidence, accommodation confirmations, travel history — ensuring nothing is missing or inconsistent. We conduct mock visa interviews for countries that require them (USA, Canada), giving you the confidence to present yourself professionally.

We know the specific requirements of each country's visa system and tailor our approach accordingly. No generic checklists — precise, country-specific guidance every time.`,
    steps: ['Document collection & verification', 'Financial statement preparation', 'Mock interview preparation (where required)', 'Visa application submission & tracking'],
    color: '#3D2B1F',
  },
  {
    id: 'pre-departure',
    icon: '🌏',
    title: 'Pre-Departure Guidance',
    tagline: 'Arrive confident. Not confused.',
    desc: `Getting your offer letter and visa is a milestone — but the journey continues. Moving to a new country for the first time can be overwhelming. Our pre-departure support ensures you arrive prepared, confident, and ready to hit the ground running.

We cover: accommodation search and booking strategy, travel insurance selection, packing essentials, arrival procedures at the destination airport, opening a bank account abroad, local SIM cards, student ID processes, and the all-important orientation week advice.

We also connect you with our alumni network in your destination city — real students who've done it before and are happy to help newcomers settle in.`,
    steps: ['Accommodation search guidance', 'Travel insurance and logistics', 'Financial setup (bank account, cards)', 'Alumni network introduction in your city'],
    color: '#4A5C44',
  },
  {
    id: 'test-prep',
    icon: '📚',
    title: 'Test Preparation',
    tagline: 'The right score opens the right doors.',
    desc: `English language proficiency tests — IELTS, TOEFL, PTE — are mandatory for university admission. GRE or GMAT may be required for postgraduate and MBA programs. Achieving the score you need requires targeted preparation, not just practice.

Our test preparation programs are led by experienced instructors who have themselves achieved top scores. We run intensive weekend workshops, one-on-one tutoring sessions, and provide comprehensive practice materials.

Our students consistently achieve Band 7.0+ on IELTS and 100+ on TOEFL, unlocking top-ranked universities and scholarship opportunities that lower scores would foreclose.`,
    steps: ['Diagnostic assessment', 'Personalised study plan creation', 'Weekly classes + practice tests', 'Final mock exam before test day'],
    color: '#6B1A2E',
  },
  {
    id: 'financial',
    icon: '💰',
    title: 'Financial Aid & Loans',
    tagline: 'Money should never be the reason you don\'t go.',
    desc: `Education is an investment, and financing it should be approached strategically. Our financial advisors help you understand and access every available funding option — scholarships, bursaries, education loans, bank guarantees, and sponsor documentation.

For student loans, we work with multiple partner banks in Bangladesh who offer competitive rates for international students. We help you prepare the loan application, financial documentation, and bank guarantee letters that universities require.

We also advise on part-time work rights in each country, helping you plan a realistic budget that includes living costs, travel, and academic expenses — so you're never caught off-guard financially.`,
    steps: ['Financial need assessment', 'Loan partner bank introduction', 'Documentation preparation', 'Bank guarantee letter guidance'],
    color: '#7A4F2D',
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section style={{ background: '#1C1007', padding: '160px 28px 96px', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(201,168,76,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.04) 1px, transparent 1px)', backgroundSize: '80px 80px', pointerEvents: 'none' }} />
        <div style={{ maxWidth: 800, margin: '0 auto', position: 'relative' }}>
          <span className="section-label" style={{ color: '#C9A84C' }}>What We Do</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(36px, 5vw, 64px)', color: '#F5EDD8', marginTop: 12, marginBottom: 20 }}>
            Our <span style={{ color: '#C9A84C' }}>Services</span>
          </h1>
          <p style={{ color: 'rgba(245,237,216,0.6)', fontSize: 17, lineHeight: 1.85, maxWidth: 600, margin: '0 auto', fontStyle: 'italic' }}>
            End-to-end international education support — from your first free consultation to the day you land at your destination university.
          </p>
        </div>
      </section>

      {/* Services */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '80px 28px' }}>
        {services.map((service, i) => (
          <section
            key={service.id}
            id={service.id}
            style={{
              display: 'grid',
              gridTemplateColumns: i % 2 === 0 ? '1fr 1fr' : '1fr 1fr',
              gap: 60, alignItems: 'start',
              paddingBottom: 80, marginBottom: 80,
              borderBottom: i < services.length - 1 ? '1px solid rgba(122,79,45,0.12)' : 'none',
            }}
            className="service-section"
          >
            <div style={{ order: i % 2 === 0 ? 0 : 1 }}>
              <div style={{
                width: 56, height: 56,
                background: service.color,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 28, marginBottom: 24,
                border: '1px solid rgba(201,168,76,0.3)',
              }}>
                {service.icon}
              </div>
              <span style={{
                display: 'inline-block',
                border: '1px solid rgba(201,168,76,0.3)',
                color: '#C9A84C', padding: '3px 12px',
                fontSize: 10, fontWeight: 600, fontFamily: 'var(--font-label)',
                textTransform: 'uppercase', letterSpacing: '0.14em', marginBottom: 12,
              }}>
                Service {String(i + 1).padStart(2, '0')}
              </span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(24px, 3vw, 36px)', color: '#1C1007', marginBottom: 8 }}>
                {service.title}
              </h2>
              <p style={{ color: '#7A4F2D', fontWeight: 600, fontSize: 15, marginBottom: 20, fontStyle: 'italic' }}>
                "{service.tagline}"
              </p>
              <div>
                {service.desc.split('\n\n').map((para, j) => (
                  <p key={j} style={{ color: '#6B5B4B', fontSize: 14, lineHeight: 1.9, marginBottom: 14 }}>{para}</p>
                ))}
              </div>
              <Link to="/apply" className="btn btn-red" style={{ marginTop: 16 }}>
                Get Started →
              </Link>
            </div>

            <div style={{ order: i % 2 === 0 ? 1 : 0 }}>
              <div style={{
                background: '#F5EDD8', padding: '28px',
                border: '1px solid rgba(122,79,45,0.15)',
                borderTop: '2px solid #C9A84C',
              }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 18, color: '#1C1007', marginBottom: 24 }}>
                  How It Works
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  {service.steps.map((step, j) => (
                    <div key={j} className="process-step">
                      <div className="step-number" style={{ background: '#1C1007', border: '1px solid rgba(201,168,76,0.4)' }}>
                        {j + 1}
                      </div>
                      <div style={{ paddingTop: 10 }}>
                        <p style={{ color: '#1C1007', fontSize: 13, lineHeight: 1.6 }}>{step}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{
                marginTop: 16,
                background: 'rgba(28,16,7,0.05)',
                border: '1px solid rgba(122,79,45,0.15)',
                borderLeft: '2px solid #C9A84C',
                padding: '16px 18px',
                display: 'flex', alignItems: 'center', gap: 14,
              }}>
                <span style={{ color: '#C9A84C', fontSize: 16 }}>✦</span>
                <div>
                  <p style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontWeight: 600, color: '#1C1007', fontSize: 13 }}>Have questions?</p>
                  <a href="https://wa.me/8801733933689" target="_blank" rel="noreferrer"
                    style={{ color: '#7A4F2D', fontSize: 12, textDecoration: 'none', fontFamily: 'var(--font-label)', letterSpacing: '0.06em', textTransform: 'uppercase' }}>
                    Chat with a specialist on WhatsApp
                  </a>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      <style>{`
        @media (max-width: 768px) {
          .service-section { grid-template-columns: 1fr !important; }
          .service-section > div { order: unset !important; }
        }
      `}</style>
    </div>
  );
}
