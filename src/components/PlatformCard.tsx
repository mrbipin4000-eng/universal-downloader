import { useState, useRef } from 'react';
import { cn } from '@/lib/utils';

interface PlatformCardProps {
  title: string;
  subtitle: string;
  icon: React.ReactNode;
  href?: string;
  isComingSoon?: boolean;
  accentColor?: string;
  delay?: number;
}

const PlatformCard = ({
  title,
  subtitle,
  icon,
  href,
  isComingSoon = false,
  accentColor = 'hsl(var(--primary))',
  delay = 0,
}: PlatformCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState({ rotateX: 0, rotateY: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current || isComingSoon) return;
    
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = ((y - centerY) / centerY) * -8;
    const rotateY = ((x - centerX) / centerX) * 8;
    
    setTransform({ rotateX, rotateY });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setTransform({ rotateX: 0, rotateY: 0 });
  };

  const cardContent = (
    <div
      ref={cardRef}
      className={cn(
        "relative rounded-2xl p-6 h-full",
        "glass-card neon-border",
        "transition-all duration-500 ease-out",
        isComingSoon 
          ? "opacity-50 cursor-not-allowed" 
          : "cursor-pointer hover-lift",
        "animate-fade-in"
      )}
      style={{
        animationDelay: `${delay}ms`,
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg)`,
        ['--accent' as string]: accentColor,
      }}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => !isComingSoon && setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
    >
      {/* Accent gradient overlay */}
      <div 
        className="absolute inset-0 rounded-2xl opacity-10 transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at 30% 30%, ${accentColor}, transparent 70%)`,
          opacity: isHovered ? 0.2 : 0.1,
        }}
      />
      
      {/* Blueprint pattern */}
      <div className="absolute inset-0 rounded-2xl blueprint-pattern" />
      
      {/* Scanline effect */}
      {!isComingSoon && <div className="absolute inset-0 rounded-2xl overflow-hidden scanline" />}
      
      {/* Soon badge */}
      {isComingSoon && (
        <div className="absolute top-4 right-4 soon-badge px-3 py-1 rounded-full text-xs">
          SOON
        </div>
      )}
      
      {/* Content */}
      <div className="relative z-10">
        {/* Icon - LARGER AREA */}
        <div 
          className={cn(
            "w-16 h-16 mb-6 flex items-center justify-center",
            "transition-all duration-500 ease-out"
          )}
        >
          {icon}
        </div>
        
        {/* Title */}
        <h3 
          className={cn(
            "font-display text-xl font-semibold mb-2",
            "tracking-wide transition-colors duration-300",
            isHovered && !isComingSoon ? "text-primary" : "text-foreground"
          )}
        >
          {title}
        </h3>
        
        {/* Subtitle */}
        <p className="text-sm text-muted-foreground">
          {subtitle}
        </p>
      </div>
      
      {/* Hover glow effect */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-500",
          isHovered && !isComingSoon ? "opacity-100" : "opacity-0"
        )}
        style={{
          boxShadow: `inset 0 0 40px ${accentColor}20, 0 0 60px ${accentColor}15`,
        }}
      />
      
      {/* Edge highlight on hover */}
      <div 
        className={cn(
          "absolute inset-0 rounded-2xl pointer-events-none transition-opacity duration-300",
          isHovered && !isComingSoon ? "opacity-100" : "opacity-0"
        )}
        style={{
          background: `linear-gradient(135deg, ${accentColor}30 0%, transparent 50%, ${accentColor}10 100%)`,
        }}
      />
    </div>
  );

  if (isComingSoon || !href) {
    return <div className="h-full">{cardContent}</div>;
  }

  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="block h-full no-underline"
    >
      {cardContent}
    </a>
  );
};

export default PlatformCard;
