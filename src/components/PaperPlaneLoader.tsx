import { useEffect, useState, useRef } from 'react';

interface Props {
  onDone?: () => void;
}

// ─── Cubic Bézier path definition ───────────────────────────────────────────
// Each segment: P0 (start), CP1, CP2 (control points), P3 (end)
// Coordinates in vw (x) / vh (y) — starting from bottom-left corner
const CURVE_SEGMENTS = [
  {
    p0:  { x: -6,  y: 102 },
    cp1: { x: 5,   y: 78  },
    cp2: { x: 30,  y: 90  },
    p3:  { x: 28,  y: 68  },
  },
  {
    p0:  { x: 28,  y: 68  },
    cp1: { x: 26,  y: 46  },
    cp2: { x: 55,  y: 72  },
    p3:  { x: 54,  y: 50  },
  },
  {
    p0:  { x: 54,  y: 50  },
    cp1: { x: 53,  y: 28  },
    cp2: { x: 78,  y: 60  },
    p3:  { x: 78,  y: 34  },
  },
  {
    p0:  { x: 78,  y: 34  },
    cp1: { x: 78,  y: 8   },
    cp2: { x: 98,  y: 28  },
    p3:  { x: 112, y: 8   },
  },
];

// Evaluate a cubic Bézier at t ∈ [0,1]
function cubicBezier(
  p0: { x: number; y: number },
  cp1: { x: number; y: number },
  cp2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
) {
  const mt = 1 - t;
  return {
    x: mt * mt * mt * p0.x + 3 * mt * mt * t * cp1.x + 3 * mt * t * t * cp2.x + t * t * t * p3.x,
    y: mt * mt * mt * p0.y + 3 * mt * mt * t * cp1.y + 3 * mt * t * t * cp2.y + t * t * t * p3.y,
  };
}

// Derivative of cubic Bézier at t (gives tangent direction)
function cubicBezierTangent(
  p0: { x: number; y: number },
  cp1: { x: number; y: number },
  cp2: { x: number; y: number },
  p3: { x: number; y: number },
  t: number
) {
  const mt = 1 - t;
  return {
    dx: 3 * mt * mt * (cp1.x - p0.x) + 6 * mt * t * (cp2.x - cp1.x) + 3 * t * t * (p3.x - cp2.x),
    dy: 3 * mt * mt * (cp1.y - p0.y) + 6 * mt * t * (cp2.y - cp1.y) + 3 * t * t * (p3.y - cp2.y),
  };
}

// Map overall progress [0,1] → position + angle on the full multi-segment path
function getPositionOnPath(progress: number) {
  const n = CURVE_SEGMENTS.length;
  const scaled = progress * n;
  const segIndex = Math.min(Math.floor(scaled), n - 1);
  const t = scaled - segIndex;

  const seg = CURVE_SEGMENTS[segIndex];
  const { x, y } = cubicBezier(seg.p0, seg.cp1, seg.cp2, seg.p3, t);
  const { dx, dy } = cubicBezierTangent(seg.p0, seg.cp1, seg.cp2, seg.p3, t);
  const angle = Math.atan2(dy, dx) * (180 / Math.PI);

  return { x, y, angle };
}

// Pre-bake a dense polyline of the full path for the SVG ghost trail
function buildPathPolyline(steps = 120) {
  const points: { x: number; y: number }[] = [];
  for (let i = 0; i <= steps; i++) {
    points.push(getPositionOnPath(i / steps));
  }
  return points;
}

const GHOST_POINTS = buildPathPolyline(200);

const TRAIL_COLORS = ['#C5A86F', '#1A4B7C', '#112236'];
const DURATION = 2600;
const HOLD = 300;
const MAX_TRAIL_DOTS = 10;   // short tail — only last 10 dots kept

interface TrailDot {
  id: number;
  x: number;
  y: number;
  opacity: number;
  size: number;
  color: string;
}

export default function PaperPlaneLoader({ onDone }: Props) {
  const [phase, setPhase] = useState<'flying' | 'fading'>('flying');
  const [visible, setVisible] = useState(true);
  const [trailDots, setTrailDots] = useState<TrailDot[]>([]);
  const [planeState, setPlaneState] = useState({ x: -6, y: 102, angle: -45 });
  const [progress, setProgress] = useState(0);

  const trailRef = useRef<TrailDot[]>([]);
  const dotIdRef = useRef(0);
  const frameRef = useRef(0);
  const startTimeRef = useRef<number | null>(null);
  const colorIndexRef = useRef(0);

  useEffect(() => {
    let holdTimeout: ReturnType<typeof setTimeout>;
    let fadeTimeout: ReturnType<typeof setTimeout>;

    const animate = (timestamp: number) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const prog = Math.min(elapsed / DURATION, 1);

      setProgress(prog);

      const { x, y, angle } = getPositionOnPath(prog);
      setPlaneState({ x, y, angle });

      // Spawn a trail dot every frame
      const color = TRAIL_COLORS[colorIndexRef.current % TRAIL_COLORS.length];
      colorIndexRef.current += 1;
      const dot: TrailDot = {
        id: dotIdRef.current,
        x,
        y,
        opacity: 0.88,
        size: 3.5 + Math.random() * 2.5,
        color,
      };
      // Keep only the last MAX_TRAIL_DOTS — short, crisp tail
      trailRef.current = [...trailRef.current.slice(-(MAX_TRAIL_DOTS - 1)), dot];

      // Fade + shrink existing dots quickly
      trailRef.current = trailRef.current.map((d) => ({
        ...d,
        opacity: d.opacity * 0.78,   // fast fade — disappears in ~10 frames
        size: Math.max(d.size * 0.93, 1),
      }));

      dotIdRef.current += 1;
      setTrailDots([...trailRef.current]);

      if (prog < 1) {
        frameRef.current = requestAnimationFrame(animate);
      } else {
        holdTimeout = setTimeout(() => {
          setPhase('fading');
          fadeTimeout = setTimeout(() => {
            setVisible(false);
            onDone?.();
          }, 650);
        }, HOLD);
      }
    };

    frameRef.current = requestAnimationFrame(animate);
    return () => {
      cancelAnimationFrame(frameRef.current);
      clearTimeout(holdTimeout);
      clearTimeout(fadeTimeout);
    };
  }, []);

  if (!visible) return null;

  // Convert ghost polyline vw/vh → pixel SVG points string
  const ghostPointsStr = GHOST_POINTS.map(
    (p) =>
      `${(p.x / 100) * (typeof window !== 'undefined' ? window.innerWidth : 1920)},${(p.y / 100) * (typeof window !== 'undefined' ? window.innerHeight : 1080)}`
  ).join(' ');

  // (trail is dots-only now — no polyline needed)

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 99999,
        background: '#08101E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        pointerEvents: phase === 'fading' ? 'none' : 'all',
        opacity: phase === 'fading' ? 0 : 1,
        transition: 'opacity 0.65s cubic-bezier(0.4,0,0.2,1)',
        overflow: 'hidden',
      }}
    >
      {/* Grid */}
      <svg
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', opacity: 0.05 }}
        aria-hidden="true"
      >
        <defs>
          <pattern id="ldr-grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#C5A86F" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#ldr-grid)" />
      </svg>

      <div
        aria-hidden="true"
        style={{
          position: 'absolute', width: 600, height: 600, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(197,168,111,0.06) 0%, transparent 70%)',
          bottom: '-10%', left: '-8%', pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute', width: 400, height: 400, borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(29,53,87,0.05) 0%, transparent 70%)',
          top: '5%', right: '5%', pointerEvents: 'none',
        }}
      />

      {/* Full-path ghost line (dim, shows the whole intended route) */}
      <svg
        aria-hidden="true"
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          pointerEvents: 'none', overflow: 'visible',
        }}
      >
        <defs>
          <linearGradient id="ghostGrad" x1="0%" y1="100%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#C5A86F" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#C5A86F" stopOpacity="0.1" />
          </linearGradient>

        </defs>

        {/* Ghost path — full route, barely visible */}
        <polyline
          points={ghostPointsStr}
          fill="none"
          stroke="url(#ghostGrad)"
          strokeWidth="1.5"
          strokeDasharray="4 8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Active trail — just dots, no long polyline */}
      </svg>

      {/* Trail dots */}
      {trailDots.map((dot) => (
        <div
          key={dot.id}
          aria-hidden="true"
          style={{
            position: 'absolute',
            left: `${dot.x}vw`,
            top: `${dot.y}vh`,
            width: dot.size,
            height: dot.size,
            borderRadius: '50%',
            background: dot.color,
            opacity: dot.opacity,
            transform: 'translate(-50%, -50%)',
            pointerEvents: 'none',
            boxShadow: `0 0 ${dot.size * 2}px ${dot.color}99`,
          }}
        />
      ))}

      {/* ── Paper Plane ── */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: `${planeState.x}vw`,
          top: `${planeState.y}vh`,
          // rotate to match tangent direction; plane SVG nose faces right (+X)
          transform: `translate(-50%, -50%) rotate(${planeState.angle}deg)`,
          pointerEvents: 'none',
          filter:
            'drop-shadow(0 0 6px #C5A86F) drop-shadow(0 0 2px rgba(255,255,255,0.6))',
          willChange: 'transform',
        }}
      >
        {/*
          Paper plane SVG — nose points right (+X axis)
          Classic 2-wing origami silhouette:
            • Top wing    : nose (44,14) → tail-top (2,4)  → body-center (16,14)
            • Bottom wing : nose (44,14) → tail-bot (2,24) → body-center (16,14)
            • Belly flap  : small fold triangle at tail
            • Crease line : nose → body-center
        */}
        <svg
          width="52"
          height="28"
          viewBox="0 0 52 28"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{ display: 'block' }}
        >
          {/* Top wing */}
          <path
            d="M 50 14 L 2 2 L 18 14 Z"
            fill="#EDEBE4"
            stroke="rgba(197,168,111,0.3)"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {/* Bottom wing */}
          <path
            d="M 50 14 L 2 2 26 L 18 14 Z"
            fill="#C5A86F"
            stroke="rgba(197,168,111,0.3)"
            strokeWidth="0.5"
            strokeLinejoin="round"
          />
          {/* Belly fold flap — darker triangle at tail */}
          <path
            d="M 18 14 L 2 26 L 9 18 Z"
            fill="rgba(180,215,255,0.55)"
            strokeWidth="0"
          />
          {/* Center crease: nose → fold point */}
          <line
            x1="50" y1="14"
            x2="18" y2="14"
            stroke="#1A4B7C"
            strokeWidth="0.8"
            strokeLinecap="round"
            strokeDasharray="2 2"
          />
          {/* Top edge highlight */}
          <line
            x1="50" y1="14"
            x2="2" y2="2"
            stroke="rgba(255,255,255,0.5)"
            strokeWidth="0.5"
            strokeLinecap="round"
          />
          {/* Nose tip glow dot */}
          <circle cx="49" cy="14" r="1.5" fill="#C5A86F" />
        </svg>
      </div>

      {/* Centre branding */}
      <div
        style={{
          textAlign: 'center',
          userSelect: 'none',
          position: 'relative',
          zIndex: 2,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            fontFamily: "var(--font-heading)",
            fontStyle: "italic",
            fontSize: 'clamp(28px, 4.5vw, 48px)',
            fontWeight: 700,
            color: '#EDEBE4',
            letterSpacing: '-0.5px',
            lineHeight: 1,
            marginBottom: 10,
          }}
        >
          Study<span style={{ color: '#C5A86F' }}>Ex</span>
        </div>
        <div
          style={{
            fontFamily: "var(--font-label)",
            fontSize: 10,
            letterSpacing: '0.4em',
            color: 'rgba(237,235,228,0.35)',
            textTransform: 'uppercase',
          }}
        >
          Your Global Journey Begins
        </div>

        {/* Progress bar */}
        <div
          style={{
            marginTop: 28,
            width: 130,
            height: 2,
            background: 'rgba(255,255,255,0.07)',
            borderRadius: 99,
            overflow: 'hidden',
            margin: '26px auto 0',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: 'linear-gradient(90deg, #1A4B7C, #C5A86F, #1A4B7C)',
              borderRadius: 99,
              transition: 'width 0.05s linear',
            }}
          />
        </div>
      </div>
    </div>
  );
}
