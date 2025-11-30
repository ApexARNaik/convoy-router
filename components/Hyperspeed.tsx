import React from 'react';

// Keeping the interface so it matches the props passed in LandingPage.tsx
interface HyperspeedProps {
  effectOptions?: any;
}

const Hyperspeed: React.FC<HyperspeedProps> = () => {
  return (
    <div className="w-full h-full bg-black relative overflow-hidden">
      {/* Fallback visual: A deep space gradient compatible with your theme */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-800/20 via-black to-black"></div>
      
      {/* Optional grid effect to keep the tactical feel */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
      ></div>
    </div>
  );
};

export default Hyperspeed;