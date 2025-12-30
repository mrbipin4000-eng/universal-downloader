const BatBeacon = () => {
  return (
    <div className="relative inline-flex items-center justify-center">
      {/* Outer glow ring */}
      <div 
        className="absolute w-4 h-4 rounded-full bg-accent/20 beacon"
        style={{ animationDelay: '0.2s' }}
      />
      
      {/* Middle ring */}
      <div 
        className="absolute w-3 h-3 rounded-full bg-accent/40 beacon"
        style={{ animationDelay: '0.1s' }}
      />
      
      {/* Core dot */}
      <div className="w-2 h-2 rounded-full bg-accent shadow-glow-gold beacon" />
    </div>
  );
};

export default BatBeacon;
