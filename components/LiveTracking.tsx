import React, { useState, useEffect } from 'react';
import { Convoy } from '../types';
import { BentoCard, BentoGrid } from './Bento/BentoCard';
import { Map, Navigation, Locate, AlertTriangle, Radio, Truck } from 'lucide-react';

interface LiveTrackingProps {
  convoys: Convoy[];
}

const LiveTracking: React.FC<LiveTrackingProps> = ({ convoys }) => {
  const [selectedConvoy, setSelectedConvoy] = useState<Convoy | null>(null);

  useEffect(() => {
    if (convoys.length > 0 && !selectedConvoy) {
        setSelectedConvoy(convoys[0]);
    }
  }, [convoys, selectedConvoy]);

  if (!selectedConvoy && convoys.length === 0) {
      return <div className="p-6 text-gray-500 font-mono">No active convoys to track.</div>;
  }
  
  const currentConvoy = selectedConvoy || convoys[0];

  const cleanLocation = (loc: string) => {
    return loc.split('(')[1]?.replace(')', '') || loc;
  };

  const getMapSrc = (convoy: Convoy) => {
    const start = cleanLocation(convoy.startLocation);
    const end = cleanLocation(convoy.destination);
    // Note: googleusercontent.com is not the actual URL, but the logic remains the same for map embedding
    return `https://maps.google.com/maps?q=${encodeURIComponent(start)}+to+${encodeURIComponent(end)}&t=&z=10&ie=UTF8&iwloc=&output=embed`;
  };

  return (
    <div className="h-full max-w-7xl mx-auto">
      <BentoGrid className="lg:grid-cols-4">
        
        {/* Card 1: Select Tracking Unit (Sidebar List) - Span 1 column, 2 rows */}
        <BentoCard 
          className="col-span-4 md:col-span-2 lg:col-span-1 row-span-2 p-4 bg-military-800 border border-military-700 rounded-xl flex flex-col"
          enableTilt={true}
        >
          <h2 className="text-white font-bold text-sm uppercase font-mono flex items-center gap-2 mb-4 border-b border-military-700 pb-2">
            <Radio className="w-4 h-4 text-military-red animate-pulse" />
            Select Tracking Unit
          </h2>
          <div className="space-y-2 overflow-y-auto pr-2 flex-1">
            {convoys.map(convoy => (
              <button
                key={convoy.id}
                onClick={() => setSelectedConvoy(convoy)}
                className={`w-full text-left p-4 rounded border transition-all ${
                  currentConvoy.id === convoy.id
                    ? 'bg-military-700 border-military-red shadow-[inset_2px_0_0_0_#ef4444]'
                    : 'bg-military-900/50 border-military-700 hover:bg-military-700'
                }`}
              >
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-white font-mono">{convoy.id}</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold ${
                    convoy.status === 'MOVING' ? 'bg-emerald-500/20 text-emerald-500' :
                    convoy.status === 'DELAYED' ? 'bg-red-500/20 text-red-500' :
                    'bg-amber-500/20 text-amber-500'
                  }`}>{convoy.status}</span>
                </div>
                <p className="text-gray-400 text-sm mb-2">{convoy.name}</p>
                <div className="flex items-center gap-2 text-xs text-gray-500 font-mono">
                  <Navigation className="w-3 h-3" />
                  {cleanLocation(convoy.startLocation)} → {cleanLocation(convoy.destination)}
                </div>
              </button>
            ))}
          </div>
        </BentoCard>

        {/* Card 2: Map Embed (Dominant Card) - Span 3 columns, 3 rows */}
        <BentoCard 
          className="col-span-4 lg:col-span-3 row-span-3 p-0 bg-military-800 border border-military-700 rounded-xl overflow-hidden relative flex flex-col"
          enableTilt={false}
          enableStars={false}
        >
          <div className="absolute top-4 left-4 z-10 bg-black/80 backdrop-blur border border-military-700 px-3 py-1.5 rounded flex items-center gap-2">
            <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-white">LIVE SATELLITE FEED: {currentConvoy.id}</span>
          </div>

          <div className="absolute top-4 right-4 z-10 flex gap-2">
            <button className="p-2 bg-black/80 text-white border border-military-700 rounded hover:bg-military-700" title="Recenter">
              <Locate className="w-4 h-4" />
            </button>
            <button className="p-2 bg-black/80 text-white border border-military-700 rounded hover:bg-military-700" title="Map Layers">
              <Map className="w-4 h-4" />
            </button>
          </div>
          
          <iframe
            width="100%"
            height="100%"
            style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(90%)' }}
            loading="lazy"
            allowFullScreen
            referrerPolicy="no-referrer-when-downgrade"
            src={getMapSrc(currentConvoy)}
            className="flex-1 opacity-80 hover:opacity-100 transition-opacity"
          ></iframe>
          
          <div className="bg-black text-center py-1 text-[10px] text-gray-600 font-mono border-t border-military-700 shrink-0">
            GOOGLE MAPS DATA STREAM // ENCRYPTED
          </div>
        </BentoCard>

        {/* Card 3: Convoy Detail Card (Telemetry) - Span 1 column, 1 row (sits below unit list) */}
        <BentoCard 
          className="col-span-4 md:col-span-2 lg:col-span-1 p-4 bg-military-800 border border-military-700 rounded-xl flex flex-col"
          enableTilt={true}
        >
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest font-mono mb-4 border-b border-military-700 pb-2">Unit Telemetry: {currentConvoy.id}</h3>
          <div className="space-y-4 flex-1">
            <div className="grid grid-cols-2 gap-4">
               <div className="bg-military-900 p-3 rounded border border-military-700">
                 <p className="text-[10px] text-gray-500 uppercase">Speed</p>
                 <p className="text-xl text-white font-mono">62 <span className="text-sm text-gray-600">km/h</span></p>
               </div>
               <div className="bg-military-900 p-3 rounded border border-military-700">
                 <p className="text-[10px] text-gray-500 uppercase">Vehicles</p>
                 <p className="text-xl text-white font-mono">{currentConvoy.vehicleCount}</p>
               </div>
            </div>
            
            <div className="bg-military-900 p-3 rounded border border-military-700">
               <p className="text-[10px] text-gray-500 uppercase mb-1">ETA Destination</p>
               <p className="text-lg text-emerald-400 font-mono">{currentConvoy.eta}</p>
            </div>

            {currentConvoy.status === 'DELAYED' && (
              <div className="bg-red-900/20 border border-red-500/30 p-3 rounded flex items-start gap-3">
                 <AlertTriangle className="w-5 h-5 text-red-500 shrink-0" />
                 <div>
                   <p className="text-red-400 text-xs font-bold mb-1">UNIT DELAYED</p>
                   <p className="text-red-400/70 text-[10px]">Heavy congestion reported on current sector. Rerouting algorithms active.</p>
                 </div>
              </div>
            )}
            
            <div className="text-xs text-gray-600 font-mono flex items-center justify-between pt-1">
                <Truck className="w-3 h-3 text-gray-500" />
                <span className="text-gray-500">Telemetry Last Updated: 00:00:15</span>
            </div>
          </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};

export default LiveTracking;