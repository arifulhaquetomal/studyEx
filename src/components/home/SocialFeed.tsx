import { useEffect, useRef } from 'react';

const posts = [
  { id: 1, emoji: '🎓', caption: 'Congratulations to our latest batch of UK admits! 🇬🇧 #StudyAbroad', likes: 284, bg: 'linear-gradient(135deg, #012169, #0057FF)' },
  { id: 2, emoji: '✈️', caption: 'Another student heading to Canada with a full scholarship! 🇨🇦', likes: 412, bg: 'linear-gradient(135deg, #E8173A, #FF6B6B)' },
  { id: 3, emoji: '🏛', caption: 'University of Edinburgh orientation day! Our students loving it 🏴󠁧󠁢󠁳󠁣󠁴󠁿', likes: 356, bg: 'linear-gradient(135deg, #1a1a2e, #16213e)' },
  { id: 4, emoji: '🎉', caption: 'Free consultation sessions every Saturday! Book your slot now.', likes: 198, bg: 'linear-gradient(135deg, #F5A623, #E8173A)' },
  { id: 5, emoji: '📚', caption: 'IELTS prep workshop — 50 students, 3 weekends, amazing results! 📈', likes: 267, bg: 'linear-gradient(135deg, #0057FF, #00d2ff)' },
  { id: 6, emoji: '🌏', caption: 'Germany calls! Two more scholars heading to TU Munich 🇩🇪 #DAADScholarship', likes: 321, bg: 'linear-gradient(135deg, #25D366, #00b09b)' },
];

export default function SocialFeed() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const cards = sectionRef.current?.querySelectorAll('.social-card');
          cards?.forEach((el, i) => {
            setTimeout(() => {
              (el as HTMLElement).style.opacity = '1';
              (el as HTMLElement).style.transform = 'translateY(0) scale(1)';
            }, i * 80);
          });
        }
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} style={{ padding: '96px 0', background: '#fff' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 48 }}>
          <span className="section-label">FOLLOW OUR JOURNEY</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(28px, 4vw, 44px)', color: 'var(--navy)', marginTop: 8, marginBottom: 16 }}>
            @studyex on Instagram
          </h2>
          <p style={{ color: 'var(--gray)', fontSize: 16, maxWidth: 480, margin: '0 auto' }}>
            Join 10,000+ followers and stay updated with success stories, scholarship alerts, and study abroad tips.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 16,
          marginBottom: 40,
        }}>
          {posts.map(post => (
            <div
              key={post.id}
              className="social-card"
              style={{
                borderRadius: 16, overflow: 'hidden', cursor: 'pointer',
                position: 'relative', aspectRatio: '1',
                background: post.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transform: 'translateY(20px) scale(0.97)',
                transition: 'all 0.5s ease',
                boxShadow: 'var(--shadow-card)',
              }}
              onMouseEnter={e => {
                const overlay = e.currentTarget.querySelector('.social-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '1';
              }}
              onMouseLeave={e => {
                const overlay = e.currentTarget.querySelector('.social-overlay') as HTMLElement;
                if (overlay) overlay.style.opacity = '0';
              }}
            >
              <span style={{ fontSize: 56 }}>{post.emoji}</span>

              {/* Hover overlay */}
              <div
                className="social-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(0,0,0,0.7)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 12, padding: 16,
                  opacity: 0, transition: 'opacity 0.3s ease',
                }}
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="white" strokeWidth="2"/>
                  <circle cx="12" cy="12" r="4" fill="none" stroke="white" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white"/>
                </svg>
                <p style={{ color: '#fff', fontSize: 12, textAlign: 'center', lineHeight: 1.5 }}>{post.caption}</p>
                <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12 }}>❤️ {post.likes} likes</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center' }}>
          <a
            href="https://instagram.com/studyex"
            target="_blank" rel="noreferrer"
            className="btn btn-outline"
            style={{ textDecoration: 'none' }}
          >
            Follow @studyex on Instagram →
          </a>
        </div>
      </div>
    </section>
  );
}
