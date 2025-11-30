// src/components/LandingPage.tsx
import React, { useRef } from 'react';
import { Shield, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Hyperspeed from './Hyperspeed';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleEnter = () => {
    // 1. Simulate a mousedown event on the hyperspeed container to trigger the "warp" speed up
    if (containerRef.current) {
      const event = new MouseEvent('mousedown', {
        bubbles: true,
        cancelable: true,
        view: window
      });
      const canvas = containerRef.current.querySelector('canvas');
      if (canvas) canvas.dispatchEvent(event);
    }

    // 2. Wait for the speed-up effect to kick in, then transition
    setTimeout(() => {
      onEnter();
    }, 800);
  };

  return (
    <div className="relative h-screen w-full bg-black overflow-hidden flex flex-col items-center justify-center text-white">
      {/* Hyperspeed Background - Absolute Positioning */}
      <div ref={containerRef} className="absolute inset-0 z-0 opacity-40">
        <Hyperspeed 
          effectOptions={{
            onSpeedUp: () => { },
            // timeSkip: true,
            isHyper: true,
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xffffff,
              brokenLines: 0xffffff,
              leftCars: [0xd856bf, 0x6750a2, 0xc247ac],
              rightCars: [0x03b3c3, 0x0e5ea5, 0x324555],
              sticks: 0x03b3c3
            },
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 9,
            islandWidth: 2,
            lanesPerRoad: 3,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 3, // High speed multiplier for the effect
            carLightsFade: 0.4,
            totalSideLightSticks: 50,
            lightPairsPerRoadWay: 50,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.02, 0.05],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [20, 50],
            movingCloserSpeed: [-150, -230],
            carLightsLength: [400 * 0.05, 400 * 0.15],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.1, 0.3],
            carShiftX: [-0.2, 0.2],
            carFloorSeparation: [0.05, 1],
          }}
        />
      </div>
      
      {/* Red Glow Overlay to blend the 3D scene with the UI theme */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-military-red/5 blur-[120px] rounded-full pointer-events-none z-0"></div>

      <div className="z-10 text-center space-y-8 max-w-4xl px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4"
        >
          <div className="w-24 h-24 bg-military-red/10 border border-military-red rounded-full flex items-center justify-center mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)] backdrop-blur-sm">
            <Shield className="w-12 h-12 text-military-red" />
          </div>
          
          <h1 className="text-5xl md:text-7xl font-black italic tracking-tighter uppercase drop-shadow-2xl">
            AI Convoy <span className="text-military-red">Chain</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 font-mono tracking-widest uppercase mt-2 drop-shadow-lg">
            DEFENCE LOGISTICS SYSTEM
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="bg-military-900/80 backdrop-blur-md border border-military-700 p-8 rounded-lg max-w-lg mx-auto shadow-2xl"
        >
          <div className="space-y-4 text-left font-mono text-sm text-gray-300 mb-8 border-l-2 border-military-red pl-4">
            <p>SYSTEM STATUS: <span className="text-emerald-500">ONLINE</span></p>
            <p>ENCRYPTION: <span className="text-emerald-500">AES-256 ACTIVE</span></p>
            <p>NETWORK: <span className="text-emerald-500">SECURE MESH DETECTED</span></p>
          </div>

          <button 
            onClick={handleEnter}
            className="cursor-target group w-full bg-military-red hover:bg-red-600 text-white transition-all duration-300 py-4 px-8 rounded font-bold tracking-widest flex items-center justify-center gap-2 shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:shadow-[0_0_40px_rgba(239,68,68,0.6)]"
          >
            INITIALIZE SEQUENCE
            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-0 w-full text-center z-10 pointer-events-none">
        <p className="text-[10px] text-gray-500 uppercase tracking-[0.5em] font-mono">
          Restricted Access // Authorized Personnel Only
        </p>
      </div>
    </div>
  );
};

export default LandingPage;