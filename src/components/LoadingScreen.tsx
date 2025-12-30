import { cn } from '@/lib/utils';

interface LoadingScreenProps {
  isLoading: boolean;
}

const LoadingScreen = ({ isLoading }: LoadingScreenProps) => {
  return (
    <div 
      className={cn(
        "fixed inset-0 z-50 flex flex-col items-center justify-center",
        "bg-background transition-all duration-700",
        isLoading ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
      )}
    >
      {/* Background gradient */}
      <div 
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 60% 40% at 50% 30%, hsl(270 30% 12%) 0%, transparent 60%),
            linear-gradient(180deg, hsl(250 25% 6%) 0%, hsl(240 20% 10%) 100%)
          `,
        }}
      />

      {/* Animated loader */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Bat silhouette loader */}
        <div className="relative w-24 h-24">
          {/* Pulsing rings */}
          <div className="absolute inset-0 rounded-full border border-primary/30 animate-ping" style={{ animationDuration: '2s' }} />
          <div className="absolute inset-2 rounded-full border border-primary/20 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.3s' }} />
          <div className="absolute inset-4 rounded-full border border-primary/10 animate-ping" style={{ animationDuration: '2s', animationDelay: '0.6s' }} />
          
          {/* Center orb */}
          <div 
            className="absolute inset-6 rounded-full animate-pulse"
            style={{
              background: 'radial-gradient(circle, hsl(var(--primary)) 0%, hsl(var(--primary) / 0.5) 50%, transparent 70%)',
              boxShadow: '0 0 40px hsl(var(--primary) / 0.5), 0 0 80px hsl(var(--primary) / 0.3)',
            }}
          />
        </div>

        {/* Loading text */}
        <div className="flex flex-col items-center gap-3">
          <p className="text-foreground/80 font-display text-lg tracking-widest uppercase">
            Loading
          </p>
          
          {/* Animated dots */}
          <div className="flex gap-1.5">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className="w-2 h-2 rounded-full bg-primary animate-bounce"
                style={{
                  animationDelay: `${i * 0.15}s`,
                  animationDuration: '0.8s',
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32"
        style={{
          background: 'linear-gradient(to top, hsl(var(--primary) / 0.05), transparent)',
        }}
      />
    </div>
  );
};

export default LoadingScreen;