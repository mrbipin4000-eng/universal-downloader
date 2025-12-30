import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface AnimatedTitleProps {
  text: string;
  className?: string;
}

const AnimatedTitle = ({ text, className }: AnimatedTitleProps) => {
  const [isAnimated, setIsAnimated] = useState(false);
  const [showShine, setShowShine] = useState(false);
  const [showIdle, setShowIdle] = useState(false);

  useEffect(() => {
    // Start animation after mount
    const timer = setTimeout(() => setIsAnimated(true), 300);
    // Show shine sweep after letters animate in
    const shineTimer = setTimeout(() => setShowShine(true), 1800);
    // Start idle animation after intro completes
    const idleTimer = setTimeout(() => setShowIdle(true), 3000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(shineTimer);
      clearTimeout(idleTimer);
    };
  }, []);

  const words = text.split(' ');

  return (
    <h1 
      className={cn(
        "relative font-display font-bold tracking-tight",
        "text-5xl md:text-7xl lg:text-8xl",
        className
      )}
    >
      {/* Main text container */}
      <span className="relative inline-block">
        {words.map((word, wordIndex) => (
          <span key={wordIndex} className="inline-block">
            {word.split('').map((char, charIndex) => {
              const globalIndex = words.slice(0, wordIndex).join(' ').length + charIndex + (wordIndex > 0 ? 1 : 0);
              const delay = globalIndex * 60;
              
              return (
                <span
                  key={`${wordIndex}-${charIndex}`}
                  className={cn(
                    "netflix-letter inline-block text-metallic",
                    isAnimated ? "netflix-letter-in" : "netflix-letter-out",
                    showIdle && "netflix-letter-idle"
                  )}
                  style={{
                    animationDelay: `${delay}ms`,
                    ['--char-index' as string]: globalIndex,
                    ['--idle-delay' as string]: `${globalIndex * 0.15}s`,
                  }}
                  data-text={char}
                >
                  {char}
                </span>
              );
            })}
            {/* Space between words */}
            {wordIndex < words.length - 1 && (
              <span className="inline-block w-[0.3em]">&nbsp;</span>
            )}
          </span>
        ))}

        {/* Shine sweep effect */}
        <span 
          className={cn(
            "netflix-shine absolute inset-0 pointer-events-none",
            showShine ? "netflix-shine-active" : ""
          )}
        />
      </span>
    </h1>
  );
};

export default AnimatedTitle;