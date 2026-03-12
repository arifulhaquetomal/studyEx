import { useEffect, useRef, useState } from 'react';

interface Box {
  id: number;
  x: number;       // grid col position (0–1)
  y: number;       // grid row position (0–1)
  size: number;    // px
  depth: number;   // parallax layer 0.2–1.0
  color: string;
  borderColor: string;
  rotate: number;  // initial rotation deg
  icon: string;
  label: string;
  sublabel: string;
}

const BOXES: Box[] = [
  { id: 1,  x: 0.08, y: 0.12, size: 90,  depth: 0.9, color: 'rgba(0,87,255,0.18)',    borderColor: 'rgba(0,87,255,0.5)',    rotate: -12, icon: '🎓', label: 'Oxford',       sublabel: 'Accepted' },
  { id: 2,  x: 0.22, y: 0.28, size: 70,  depth: 0.5, color: 'rgba(232,23,58,0.15)',   borderColor: 'rgba(232,23,58,0.45)',  rotate: 8,   icon: '✅', label: 'Visa',          sublabel: 'Approved' },
  { id: 3,  x: 0.72, y: 0.08, size: 100, depth: 1.0, color: 'rgba(245,166,35,0.14)',  borderColor: 'rgba(245,166,35,0.45)', rotate: 14,  icon: '💷', label: '£8,500',        sublabel: 'Scholarship' },
  { id: 4,  x: 0.85, y: 0.35, size: 78,  depth: 0.7, color: 'rgba(0,87,255,0.12)',    borderColor: 'rgba(0,87,255,0.4)',    rotate: -6,  icon: '🇨🇦', label: 'Toronto',      sublabel: 'Admitted' },
  { id: 5,  x: 0.55, y: 0.18, size: 65,  depth: 0.4, color: 'rgba(52,211,153,0.13)',  borderColor: 'rgba(52,211,153,0.4)',  rotate: 10,  icon: '⭐', label: '5.0',           sublabel: 'Rating' },
  { id: 6,  x: 0.12, y: 0.62, size: 85,  depth: 0.8, color: 'rgba(96,165,250,0.14)',  borderColor: 'rgba(96,165,250,0.4)',  rotate: -9,  icon: '🇩🇪', label: 'TU Berlin',    sublabel: 'Placed' },
  { id: 7,  x: 0.40, y: 0.72, size: 72,  depth: 0.6, color: 'rgba(232,23,58,0.12)',   borderColor: 'rgba(232,23,58,0.4)',   rotate: 16,  icon: '📜', label: 'Offer Letter',  sublabel: 'Received' },
  { id: 8,  x: 0.78, y: 0.68, size: 88,  depth: 0.9, color: 'rgba(245,166,35,0.12)',  borderColor: 'rgba(245,166,35,0.4)',  rotate: -14, icon: '🇦🇺', label: 'Melbourne',   sublabel: 'Accepted' },
  { id: 9,  x: 0.62, y: 0.50, size: 60,  depth: 0.3, color: 'rgba(0,87,255,0.10)',    borderColor: 'rgba(0,87,255,0.3)',    rotate: 5,   icon: '🌍', label: '10+',           sublabel: 'Countries' },
  { id: 10, x: 0.30, y: 0.48, size: 76,  depth: 0.7, color: 'rgba(52,211,153,0.11)',  borderColor: 'rgba(52,211,153,0.35)', rotate: -18, icon: '🏆', label: '500+',          sublabel: 'Students' },
  { id: 11, x: 0.90, y: 0.80, size: 64,  depth: 0.5, color: 'rgba(96,165,250,0.12)',  borderColor: 'rgba(96,165,250,0.35)', rotate: 12,  icon: '🇺🇸', label: 'Michigan',     sublabel: 'Full Schol.' },
  { id: 12, x: 0.18, y: 0.85, size: 82,  depth: 0.8, color: 'rgba(232,23,58,0.10)',   borderColor: 'rgba(232,23,58,0.35)',  rotate: -7,  icon: '🎯', label: '100%',          sublabel: 'Visa Rate' },
];

export default function InteractiveBoxes() {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouse = useRef({ x: 0.5, y: 0.5 });
  const current = useRef({ x: 0.5, y: 0.5 });
  const rafRef = useRef<number>(0);
  const [positions, setPositions] = useState<{ x: number; y: number }[]>(
    BOXES.map(() => ({ x: 0, y: 0 }))
  );
  const [hovered, setHovered] = useState<number | null>(null);
  const [clicked, setClicked] = useState<number | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMove = (e: MouseEvent | TouchEvent) => {
      const rect = container.getBoundingClientRect();
      let cx: number, cy: number;
      if ('touches' in e) {
        cx = e.touches[0].clientX;
        cy = e.touches[0].clientY;
      } else {
        cx = (e as MouseEvent).clientX;
        cy = (e as MouseEvent).clientY;
      }
      mouse.current.x = (cx - rect.left) / rect.width;
      mouse.current.y = (cy - rect.top) / rect.height;
    };

    container.addEventListener('mousemove', handleMove);
    container.addEventListener('touchmove', handleMove, { passive: true });

    // Smooth lerp animation loop
    const animate = () => {
      const lerpFactor = 0.06;
      current.current.x += (mouse.current.x - current.current.x) * lerpFactor;
      current.current.y += (mouse.current.y - current.current.y) * lerpFactor;

      const dx = current.current.x - 0.5; // -0.5 to 0.5
      const dy = current.current.y - 0.5;

      setPositions(
        BOXES.map(box => ({
          x: dx * box.depth * 60,  // max 30px shift per layer
          y: dy * box.depth * 40,
        }))
      );

      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener('mousemove', handleMove);
      container.removeEventListener('touchmove', handleMove);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  const handleClick = (id: number) => {
    setClicked(id);
    setTimeout(() => setClicked(null), 600);
  };

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        zIndex: 2,
        pointerEvents: 'none',
      }}
    >
      {BOXES.map((box, i) => {
        const isHovered = hovered === box.id;
        const isClicked = clicked === box.id;

        const baseX = box.x * 100; // % across container
        const baseY = box.y * 100;
        const px = positions[i]?.x ?? 0;
        const py = positions[i]?.y ?? 0;

        return (
          <div
            key={box.id}
            onMouseEnter={() => setHovered(box.id)}
            onMouseLeave={() => setHovered(null)}
            onClick={() => handleClick(box.id)}
            style={{
              position: 'absolute',
              left: `calc(${baseX}% + ${px}px)`,
              top: `calc(${baseY}% + ${py}px)`,
              width: box.size,
              height: box.size,
              transform: `
                rotate(${isHovered ? 0 : box.rotate}deg)
                scale(${isClicked ? 1.25 : isHovered ? 1.12 : 1})
              `,
              transition: isClicked
                ? 'transform 0.15s cubic-bezier(0.34,1.56,0.64,1), box-shadow 0.2s ease, border-color 0.2s ease, background 0.2s ease'
                : 'transform 0.55s cubic-bezier(0.4,0,0.2,1), box-shadow 0.35s ease, border-color 0.35s ease, background 0.35s ease',
              background: isHovered
                ? box.color.replace(/[\d.]+\)$/, '0.32)')
                : box.color,
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: `1.5px solid ${isHovered ? box.borderColor.replace(/[\d.]+\)$/, '0.9)') : box.borderColor}`,
              borderRadius: 16,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
              cursor: 'pointer',
              pointerEvents: 'all',
              boxShadow: isHovered
                ? `0 0 0 1px ${box.borderColor}, 0 16px 40px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.15)`
                : isClicked
                ? `0 0 24px 4px ${box.borderColor}, 0 8px 24px rgba(0,0,0,0.3)`
                : '0 4px 20px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.07)',
              userSelect: 'none',
              zIndex: isHovered ? 10 : Math.round(box.depth * 5),
            }}
          >
            {/* Shine overlay on hover */}
            {isHovered && (
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: 16,
                background: 'linear-gradient(135deg, rgba(255,255,255,0.12) 0%, transparent 60%)',
                pointerEvents: 'none',
              }} />
            )}

            {/* Click ripple */}
            {isClicked && (
              <div style={{
                position: 'absolute',
                inset: -4,
                borderRadius: 20,
                border: `2px solid ${box.borderColor}`,
                animation: 'rippleOut 0.6s ease-out forwards',
                pointerEvents: 'none',
              }} />
            )}

            <span style={{ fontSize: box.size * 0.3, lineHeight: 1, filter: isHovered ? 'drop-shadow(0 2px 8px rgba(0,0,0,0.4))' : 'none' }}>
              {box.icon}
            </span>
            <span style={{
              fontSize: Math.max(9, box.size * 0.14),
              fontWeight: 700,
              color: '#fff',
              fontFamily: 'var(--font-body)',
              textAlign: 'center',
              lineHeight: 1.2,
              opacity: isHovered ? 1 : 0.9,
            }}>
              {box.label}
            </span>
            <span style={{
              fontSize: Math.max(8, box.size * 0.11),
              color: 'rgba(255,255,255,0.6)',
              fontFamily: 'var(--font-label)',
              textAlign: 'center',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              opacity: isHovered ? 1 : 0.7,
            }}>
              {box.sublabel}
            </span>
          </div>
        );
      })}

      {/* Connecting lines between nearby boxes — decorative SVG */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.08 }}
        preserveAspectRatio="none"
      >
        <line x1="8%" y1="12%" x2="22%" y2="28%" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="55%" y1="18%" x2="72%" y2="8%" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="72%" y1="8%" x2="85%" y2="35%" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="30%" y1="48%" x2="40%" y2="72%" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="62%" y1="50%" x2="78%" y2="68%" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="12%" y1="62%" x2="18%" y2="85%" stroke="white" strokeWidth="1" strokeDasharray="4 6" />
      </svg>
    </div>
  );
}
