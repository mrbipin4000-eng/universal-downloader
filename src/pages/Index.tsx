import { useState } from 'react';
import GothamBackground from '@/components/GothamBackground';
import PlatformCard from '@/components/PlatformCard';
import BatBeacon from '@/components/BatBeacon';
import OrbCursor from '@/components/OrbCursor';
import AnimatedTitle from '@/components/AnimatedTitle';
import LoadingScreen from '@/components/LoadingScreen';
import {
  PinterestIcon,
  TwitterIcon,
  InstagramIcon,
  TikTokIcon,
  YouTubeIcon,
  TeraboxIcon,
} from '@/components/icons/PlatformIcons';

const platforms = [
  {
    title: 'Pinterest Downloader',
    subtitle: 'Images & Videos',
    icon: <PinterestIcon />,
    href: 'https://pin-dl-9fkx.vercel.app/',
    accentColor: 'hsl(354, 82%, 50%)',
  },
  {
    title: 'Twitter / X Downloader',
    subtitle: 'Videos, Images & GIFs',
    icon: <TwitterIcon />,
    href: 'https://x-dnl.netlify.app/',
    accentColor: 'hsl(203, 89%, 53%)',
  },
  {
    title: 'Instagram / Facebook',
    subtitle: 'Reels, Posts & Videos',
    icon: <InstagramIcon />,
    href: 'https://insta-dnl.netlify.app/',
    accentColor: 'hsl(326, 78%, 51%)',
  },
  {
    title: 'TikTok Downloader',
    subtitle: 'Coming Soon',
    icon: <TikTokIcon />,
    isComingSoon: true,
    accentColor: 'hsl(330, 80%, 60%)',
  },
  {
    title: 'YouTube Downloader',
    subtitle: 'Coming Soon',
    icon: <YouTubeIcon />,
    isComingSoon: true,
    accentColor: 'hsl(0, 100%, 50%)',
  },
  {
    title: 'Terabox Downloader',
    subtitle: 'Coming Soon',
    icon: <TeraboxIcon />,
    isComingSoon: true,
    accentColor: 'hsl(210, 100%, 56%)',
  },
];

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  const handleBackgroundLoaded = () => {
    // Add a small delay for smoother transition
    setTimeout(() => setIsLoading(false), 500);
  };

  return (
    <div className="relative min-h-screen overflow-hidden film-grain">
      {/* Loading Screen */}
      <LoadingScreen isLoading={isLoading} />
      
      {/* Custom orb cursor */}
      <OrbCursor />
      
      {/* Gotham Background with video */}
      <GothamBackground onLoaded={handleBackgroundLoaded} />
      
      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Hero Section */}
        <header className="flex-shrink-0 pt-16 md:pt-24 pb-8 md:pb-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Beacon indicator */}
            <div className="flex justify-center mb-6">
              <BatBeacon />
            </div>
            
            {/* Title with Netflix-style animation */}
            <AnimatedTitle text="Universal Downloader" />
            
            {/* Subtitle */}
            <p 
              className="text-muted-foreground text-lg md:text-xl tracking-wide animate-fade-in"
              style={{ animationDelay: '100ms' }}
            >
              Premium all-in-one media downloader
            </p>
          </div>
        </header>
        
        {/* Platform Grid */}
        <main className="flex-1 px-6 py-8 md:py-12">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
              {platforms.map((platform, index) => (
                <PlatformCard
                  key={platform.title}
                  title={platform.title}
                  subtitle={platform.subtitle}
                  icon={platform.icon}
                  href={platform.href}
                  isComingSoon={platform.isComingSoon}
                  accentColor={platform.accentColor}
                  delay={200 + index * 100}
                />
              ))}
            </div>
          </div>
        </main>
        
        {/* Footer */}
        <footer className="flex-shrink-0 py-8 px-6">
          <div className="max-w-4xl mx-auto text-center">
            {/* Ambient shimmer line */}
            <div 
              className="h-px w-48 mx-auto mb-6 opacity-20"
              style={{
                background: 'linear-gradient(90deg, transparent, hsl(var(--primary)), transparent)',
              }}
            />
            
            <p className="text-muted-foreground/50 text-sm font-body tracking-wide">
              © 2025 · Universal Downloader
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;