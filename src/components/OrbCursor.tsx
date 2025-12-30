import { useEffect, useRef, useState } from 'react';

interface TrailPoint {
  x: number;
  y: number;
  id: number;
}

const OrbCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState<TrailPoint[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const trailIdRef = useRef(0);
  const rafRef = useRef<number>();
  const lastPositionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const handleMouseMove = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      
      setPosition({ x, y });
      setIsVisible(true);

      // Calculate movement distance for trail intensity
      const dx = x - lastPositionRef.current.x;
      const dy = y - lastPositionRef.current.y;
      const distance = Math.sqrt(dx * dx + dy * dy);

      // Only add trail points when moving
      if (distance > 2) {
        trailIdRef.current += 1;
        setTrail(prev => {
          const newTrail = [...prev, { x, y, id: trailIdRef.current }];
          // Keep last 30 points for longer trail
          return newTrail.slice(-30);
        });
        lastPositionRef.current = { x, y };
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    // Cleanup old trail points
    const cleanupTrail = () => {
      setTrail(prev => prev.slice(-25));
      rafRef.current = requestAnimationFrame(cleanupTrail);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);
    
    // Start trail cleanup loop - slower cleanup for longer trail
    const intervalId = setInterval(() => {
      setTrail(prev => prev.length > 0 ? prev.slice(1) : prev);
    }, 80);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      clearInterval(intervalId);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <>
      {/* Hide default cursor */}
      <style>{`
        * {
          cursor: none !important;
        }
      `}</style>

      {/* Trail particles */}
      {trail.map((point, index) => {
        const age = trail.length - index;
        const opacity = Math.max(0, 0.7 - (age * 0.025));
        const scale = Math.max(0.1, 1 - (age * 0.035));
        
        return (
          <div
            key={point.id}
            className="fixed pointer-events-none z-[9998]"
            style={{
              left: point.x,
              top: point.y,
              transform: `translate(-50%, -50%) scale(${scale})`,
              opacity,
            }}
          >
            <div 
              className="w-4 h-4 rounded-full"
              style={{
                background: `radial-gradient(circle, hsl(var(--primary) / 0.6) 0%, hsl(var(--primary) / 0.2) 50%, transparent 70%)`,
                boxShadow: `0 0 10px hsl(var(--primary) / 0.4)`,
              }}
            />
          </div>
        );
      })}

      {/* Main orb cursor */}
      <div
        className="fixed pointer-events-none z-[9999] transition-opacity duration-150"
        style={{
          left: position.x,
          top: position.y,
          transform: 'translate(-50%, -50%)',
          opacity: isVisible ? 1 : 0,
        }}
      >
        {/* Outer glow ring */}
        <div 
          className="absolute inset-0 w-10 h-10 -translate-x-1/2 -translate-y-1/2 rounded-full animate-pulse"
          style={{
            left: '50%',
            top: '50%',
            background: `radial-gradient(circle, transparent 30%, hsl(var(--primary) / 0.15) 60%, transparent 70%)`,
            boxShadow: `0 0 30px hsl(var(--primary) / 0.3)`,
          }}
        />
        
        {/* Inner orb */}
        <div 
          className="w-5 h-5 rounded-full"
          style={{
            background: `radial-gradient(circle at 30% 30%, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.8) 40%, hsl(var(--primary) / 0.4) 100%)`,
            boxShadow: `
              0 0 20px hsl(var(--primary) / 0.8),
              0 0 40px hsl(var(--primary) / 0.4),
              inset 0 0 10px hsl(0 0% 100% / 0.3)
            `,
          }}
        />
        
        {/* Highlight */}
        <div 
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: '25%',
            top: '25%',
            background: `radial-gradient(circle, hsl(0 0% 100% / 0.8) 0%, transparent 70%)`,
          }}
        />
      </div>
    </>
  );
};

export default OrbCursor;
