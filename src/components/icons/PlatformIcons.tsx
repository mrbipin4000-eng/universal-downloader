import { Pin, Twitter, Instagram, Music, Play, Package } from 'lucide-react';
import { cn } from '@/lib/utils';

interface IconWrapperProps {
  children: React.ReactNode;
  platform: 'pinterest' | 'twitter' | 'instagram' | 'tiktok' | 'youtube' | 'terabox';
  isComingSoon?: boolean;
  glowColor?: string;
  animationDelay?: number;
}

const IconWrapper = ({ 
  children, 
  platform, 
  isComingSoon = false, 
  glowColor,
  animationDelay = 0 
}: IconWrapperProps) => {
  return (
    <div 
      className={cn(
        "icon-container",
        isComingSoon ? "icon-coming-soon" : "icon-clickable",
        `icon-${platform}`
      )}
      style={{ 
        ['--glow-color' as string]: glowColor,
        ['--animation-delay' as string]: `${animationDelay}s`,
      }}
    >
      {/* Pulse ring for clickable icons */}
      {!isComingSoon && (
        <div 
          className="icon-pulse-ring" 
          style={{ borderColor: glowColor }}
        />
      )}
      
      {/* Icon inner wrapper with idle animations */}
      <div 
        className={cn(
          "icon-inner icon-idle relative z-10",
          "transition-all duration-300 ease-out"
        )}
        style={{ 
          animationDelay: `${animationDelay}s, ${animationDelay + 2}s`,
        }}
      >
        {children}
      </div>
      
      {/* Scanline overlay */}
      <div className="icon-hover-scanline absolute inset-0 rounded-lg pointer-events-none" />
    </div>
  );
};

export const PinterestIcon = () => (
  <IconWrapper 
    platform="pinterest" 
    glowColor="hsl(354 82% 50% / 0.6)"
    animationDelay={0}
  >
    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-red-500/20 to-red-600/10 backdrop-blur-sm">
      <Pin className="w-7 h-7 text-red-500" strokeWidth={2.5} />
    </div>
  </IconWrapper>
);

export const TwitterIcon = () => (
  <IconWrapper 
    platform="twitter" 
    glowColor="hsl(203 89% 53% / 0.6)"
    animationDelay={0.8}
  >
    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-sky-400/20 to-sky-500/10 backdrop-blur-sm">
      <Twitter className="w-7 h-7 text-sky-400" strokeWidth={2} />
    </div>
  </IconWrapper>
);

export const InstagramIcon = () => (
  <IconWrapper 
    platform="instagram" 
    glowColor="hsl(326 78% 51% / 0.6)"
    animationDelay={1.6}
  >
    <div className="relative w-12 h-12 flex items-center justify-center">
      {/* Focus ring for lens effect */}
      <div 
        className="icon-focus-ring absolute inset-[-4px] rounded-xl border-2 border-pink-400/30 pointer-events-none"
      />
      <div 
        className="w-12 h-12 rounded-xl flex items-center justify-center"
        style={{
          background: 'linear-gradient(135deg, #f58529 0%, #dd2a7b 50%, #8134af 100%)',
        }}
      >
        <Instagram className="w-6 h-6 text-white" strokeWidth={2.5} />
      </div>
    </div>
  </IconWrapper>
);

export const TikTokIcon = () => (
  <IconWrapper 
    platform="tiktok" 
    isComingSoon
    glowColor="hsl(330 80% 60% / 0.5)"
    animationDelay={2.4}
  >
    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-400/15 to-cyan-400/15 backdrop-blur-sm border border-pink-400/20">
      <Music className="w-7 h-7 text-pink-400/70" strokeWidth={2} />
    </div>
  </IconWrapper>
);

export const YouTubeIcon = () => (
  <IconWrapper 
    platform="youtube" 
    isComingSoon
    glowColor="hsl(0 100% 50% / 0.5)"
    animationDelay={3.2}
  >
    <div className="relative w-12 h-12 flex items-center justify-center">
      <div className="w-12 h-12 rounded-xl bg-red-600/60 flex items-center justify-center border border-red-500/30">
        <Play className="w-6 h-6 text-white/70 fill-white/70" strokeWidth={0} />
      </div>
    </div>
  </IconWrapper>
);

export const TeraboxIcon = () => (
  <IconWrapper 
    platform="terabox" 
    isComingSoon
    glowColor="hsl(210 100% 56% / 0.5)"
    animationDelay={4}
  >
    <div className="relative w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-blue-400/15 to-blue-600/15 backdrop-blur-sm border border-blue-400/20">
      <Package className="w-7 h-7 text-blue-400/70" strokeWidth={2} />
    </div>
  </IconWrapper>
);
