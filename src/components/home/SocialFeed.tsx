import { useEffect, useRef } from 'react';

const posts = [
  { id: 1, emoji: '🎓', caption: 'Congratulations to our latest batch of UK admits! 🇬🇧 #StudyAbroad', likes: 284, bg: '#112236' },
  { id: 2, emoji: '✈', caption: 'Another student heading to Canada with a full scholarship! 🇨🇦', likes: 412, bg: '#7A2035' },
  { id: 3, emoji: '🏛', caption: 'University of Edinburgh orientation day! Our students loving it 🏴󠁧󠁢󠁳󠁣󠁴󠁿', likes: 356, bg: '#08101E' },
  { id: 4, emoji: '📜', caption: 'Free consultation sessions every Saturday! Book your slot now.', likes: 198, bg: '#4A6274' },
  { id: 5, emoji: '📖', caption: 'IELTS prep workshop — 50 students, 3 weekends, amazing results! 📈', likes: 267, bg: '#182C4A' },
  { id: 6, emoji: '✦', caption: 'Germany calls! Two more scholars heading to TU Munich 🇩🇪 #DAADScholarship', likes: 321, bg: '#0F172A' },
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
              (el as HTMLElement).style.transform = 'translateY(0)';
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
    <section ref={sectionRef} style={{ padding: '96px 0', background: '#F5F4F0' }}>
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '0 28px' }}>
        <div style={{ textAlign: 'center', marginBottom: 44 }}>
          <span className="section-label">Follow Our Journey</span>
          <h2 style={{ fontFamily: 'var(--font-heading)', fontStyle: 'italic', fontSize: 'clamp(28px, 4vw, 44px)', color: '#08101E', marginTop: 8, marginBottom: 16 }}>
            @studyex on Social
          </h2>
          <p style={{ color: '#6D7782', fontSize: 15, maxWidth: 480, margin: '0 auto', fontStyle: 'italic' }}>
            Join 10,000+ followers and stay updated with success stories, scholarship alerts, and study abroad tips.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: 12,
          marginBottom: 36,
        }}>
          {posts.map(post => (
            <div
              key={post.id}
              className="social-card"
              style={{
                overflow: 'hidden', cursor: 'pointer',
                position: 'relative', aspectRatio: '1',
                background: post.bg,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                opacity: 0, transform: 'translateY(20px)',
                transition: 'all 0.5s ease',
                border: '1px solid rgba(197,168,111,0.2)',
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
              {/* Corner ornaments */}
              <div style={{ position: 'absolute', top: 6, left: 6, width: 10, height: 10, borderTop: '1px solid rgba(197,168,111,0.4)', borderLeft: '1px solid rgba(197,168,111,0.4)' }} />
              <div style={{ position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderTop: '1px solid rgba(197,168,111,0.4)', borderRight: '1px solid rgba(197,168,111,0.4)' }} />
              <div style={{ position: 'absolute', bottom: 6, left: 6, width: 10, height: 10, borderBottom: '1px solid rgba(197,168,111,0.4)', borderLeft: '1px solid rgba(197,168,111,0.4)' }} />
              <div style={{ position: 'absolute', bottom: 6, right: 6, width: 10, height: 10, borderBottom: '1px solid rgba(197,168,111,0.4)', borderRight: '1px solid rgba(197,168,111,0.4)' }} />

              <span style={{ fontSize: 48, filter: 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' }}>{post.emoji}</span>

              {/* Hover overlay */}
              <div
                className="social-overlay"
                style={{
                  position: 'absolute', inset: 0,
                  background: 'rgba(6,11,18,0.85)',
                  display: 'flex', flexDirection: 'column',
                  alignItems: 'center', justifyContent: 'center',
                  gap: 10, padding: 16,
                  opacity: 0, transition: 'opacity 0.3s ease',
                  border: '1px solid rgba(197,168,111,0.3)',
                }}
              >
                <p style={{ color: '#EDEBE4', fontSize: 12, textAlign: 'center', lineHeight: 1.6, fontStyle: 'italic' }}>{post.caption}</p>
                <p style={{ color: '#C5A86F', fontSize: 11, fontFamily: 'var(--font-label)', letterSpacing: '0.06em' }}>♥ {post.likes}</p>
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
            Follow @studyex on Instagram
          </a>
        </div>
      </div>
    </section>
  );
}
