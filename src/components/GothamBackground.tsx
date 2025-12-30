import { useEffect, useRef, useState } from 'react';
import gothamVideo from '@/assets/gotham-cartoon-bg.mp4';

interface GothamBackgroundProps {
  onLoaded?: () => void;
}

const GothamBackground = ({ onLoaded }: GothamBackgroundProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, []);

  // Handle video load
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.8; // Slow down slightly for dreamy effect
    }
    if (videoLoaded && onLoaded) {
      onLoaded();
    }
  }, [videoLoaded, onLoaded]);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Fallback gradient for when video is loading or reduced motion */}
      <div 
        className="absolute inset-0 transition-opacity duration-1000"
        style={{
          opacity: videoLoaded && !prefersReducedMotion ? 0 : 1,
          background: `
            radial-gradient(ellipse 80% 50% at 50% 0%, hsl(270 30% 15%) 0%, transparent 50%),
            radial-gradient(ellipse 60% 40% at 20% 100%, hsl(240 40% 20% / 0.3) 0%, transparent 40%),
            radial-gradient(ellipse 60% 40% at 80% 100%, hsl(280 30% 15% / 0.2) 0%, transparent 40%),
            linear-gradient(180deg, hsl(250 25% 8%) 0%, hsl(240 20% 12%) 100%)
          `,
        }}
      />

      {/* Video background */}
      {!prefersReducedMotion && (
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-1000"
          style={{ 
            opacity: videoLoaded ? 1 : 0,
            filter: 'brightness(0.7) saturate(1.2)',
          }}
          autoPlay
          loop
          muted
          playsInline
          onLoadedData={() => setVideoLoaded(true)}
        >
          <source src={gothamVideo} type="video/mp4" />
        </video>
      )}

      {/* Dark overlay for better text readability */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(180deg, hsl(0 0% 0% / 0.55) 0%, hsl(0 0% 0% / 0.45) 30%, hsl(0 0% 0% / 0.6) 100%)
          `,
        }}
      />
      
      {/* Stronger vignette */}
      <div 
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 70% 60% at 50% 50%, transparent 0%, hsl(0 0% 0% / 0.7) 100%)`,
        }}
      />
    </div>
  );
};

export default GothamBackground;