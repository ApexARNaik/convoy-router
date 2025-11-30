import React from 'react';
import { MOCK_ALERTS } from '../constants';
import { ConvoyStatus, Convoy } from '../types';
import TacticalMap from './TacticalMap';
import { BentoCard, BentoGrid } from './Bento/BentoCard'; // <-- NEW IMPORT
import { Activity, AlertTriangle, Truck, Zap, Radio } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { time: '0600', traffic: 20, speed: 60 },
  { time: '0800', traffic: 65, speed: 45 },
  { time: '1000', traffic: 80, speed: 30 },
  { time: '1200', traffic: 50, speed: 55 },
  { time: '1400', traffic: 40, speed: 65 },
  { time: '1600', traffic: 70, speed: 35 },
  { time: '1800', traffic: 90, speed: 20 },
];

interface DashboardProps {
  convoys: Convoy[];
}

const Dashboard: React.FC<DashboardProps> = ({ convoys }) => {
  const activeUnits = convoys.filter(c => c.status === ConvoyStatus.MOVING).length;

  return (
    <div className="h-full overflow-y-auto">
      {/* Set the grid to be responsive: 4 columns on large screens */}
      <BentoGrid className="lg:grid-cols-4 max-w-7xl mx-auto">
        
        {/* Card 1: Key Metrics - Span 1 column on large screens */}
        <BentoCard 
          className="col-span-4 md:col-span-2 lg:col-span-1 p-4 bg-military-800 border border-military-700 rounded-xl"
          enableTilt={true}
          enableMagnetism={true}
        >
          <div className="flex flex-col h-full">
            <h3 className="text-white font-bold text-lg uppercase tracking-wider font-mono mb-4 border-b border-military-700 pb-2">
                Command Metrics
            </h3>
            <div className="grid grid-cols-2 gap-4 flex-1">
              {/* Active Units */}
              <div className="bg-military-900/80 p-3 rounded border border-military-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-30">
                  <Truck className="w-8 h-8 text-blue-500" />
                </div>
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest font-mono">Active Units</h4>
                <p className="text-2xl text-white font-bold mt-1 font-mono">{activeUnits}</p>
                <p className="text-xs text-emerald-500 mt-2 font-mono flex items-center gap-1">
                    <Activity className="w-3 h-3" /> +2 En Route
                </p>
              </div>
              {/* Threat Level */}
              <div className="bg-military-900/80 p-3 rounded border border-military-700 relative overflow-hidden">
                <div className="absolute top-0 right-0 p-2 opacity-30">
                  <Zap className="w-8 h-8 text-military-red" />
                </div>
                <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest font-mono">Threat Level</h4>
                <p className="text-2xl text-military-red font-bold mt-1 font-mono">MODERATE</p>
                <p className="text-xs text-military-red/70 mt-2 font-mono">Sector 4 Congestion</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-gray-600 font-mono">
                <span className="text-emerald-500">SYSTEM HEALTH: 99%</span>
            </div>
          </div>
        </BentoCard>

        {/* Card 2: Tactical Map - Span 3 columns, 2 rows for a huge main map */}
        <BentoCard 
          className="col-span-4 lg:col-span-3 row-span-2 p-0 bg-military-900 border border-military-700 rounded-xl overflow-hidden shadow-2xl"
          enableTilt={false}
          enableMagnetism={false}
          enableStars={false}
        >
          <TacticalMap />
        </BentoCard>

        {/* Card 3: Live Alerts - Span 1 column, 2 rows on large screen */}
        <BentoCard 
          className="col-span-4 md:col-span-2 lg:col-span-1 row-span-2 p-0 bg-military-800 border border-military-700 rounded-xl flex flex-col overflow-hidden"
          enableTilt={true}
        >
          <div className="p-4 border-b border-military-700 flex justify-between items-center bg-military-900/50 shrink-0">
            <h3 className="text-white font-bold text-sm uppercase tracking-wider font-mono flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-500" />
                Intel Feed
            </h3>
            <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {MOCK_ALERTS.map(alert => (
              <div key={alert.id} className="p-3 bg-military-900/80 border-l-2 border-military-red rounded-r text-sm">
                <div className="flex justify-between items-start mb-1">
                  <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
                    alert.severity === 'CRITICAL' ? 'bg-red-500 text-black' : 
                    alert.severity === 'WARNING' ? 'bg-amber-500 text-black' : 
                    'bg-blue-500 text-black'
                  }`}>{alert.severity}</span>
                  <span className="text-gray-500 text-xs font-mono">{alert.timestamp}</span>
                </div>
                <p className="text-gray-300 font-mono text-xs leading-relaxed">{alert.message}</p>
                {alert.location && <p className="text-military-red/70 text-xs font-mono mt-1">LOC: {alert.location}</p>}
              </div>
            ))}
          </div>
        </BentoCard>

        {/* Card 4: Efficiency Chart - Span 1 column on large screen */}
        <BentoCard 
          className="col-span-4 md:col-span-2 lg:col-span-1 p-4 bg-military-800 border border-military-700 rounded-xl flex flex-col h-full"
          enableTilt={true}
        >
          <h3 className="text-gray-400 text-xs font-bold uppercase tracking-widest font-mono mb-4">Traffic vs Velocity</h3>
          <div className="flex-1 min-h-0">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorTraffic" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorSpeed" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="time" stroke="#475569" fontSize={10} tickLine={false} />
                <YAxis stroke="#475569" fontSize={10} tickLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#fff' }}
                  itemStyle={{ fontFamily: 'monospace', fontSize: '12px' }}
                />
                <Area type="monotone" dataKey="traffic" stroke="#ef4444" fillOpacity={1} fill="url(#colorTraffic)" />
                <Area type="monotone" dataKey="speed" stroke="#10b981" fillOpacity={1} fill="url(#colorSpeed)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </BentoCard>
        
        {/* Card 5: Convoy Status Table - Span 3 columns on large screens */}
        <BentoCard 
          className="col-span-4 lg:col-span-3 p-0 bg-military-800 border border-military-700 rounded-xl overflow-hidden flex flex-col"
          enableTilt={true}
        >
          <div className="p-3 bg-military-900 border-b border-military-700 flex items-center justify-between shrink-0">
            <h3 className="text-white font-bold text-sm uppercase font-mono flex items-center gap-2">
               <Radio className="w-4 h-4 text-emerald-500" />
               Active Convoys Status
            </h3>
            <span className="text-xs text-gray-500 font-mono">SYNCING...</span>
          </div>
          <div className="overflow-auto flex-1">
            <table className="w-full text-left text-sm text-gray-400 font-mono">
              <thead className="bg-military-900/50 text-xs uppercase text-gray-500 sticky top-0">
                <tr>
                  <th className="p-3">ID</th>
                  <th className="p-3">Unit Name</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Progress</th>
                  <th className="p-3">ETA</th>
                  <th className="p-3">Priority</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-military-700">
                {convoys.map(convoy => (
                  <tr key={convoy.id} className="hover:bg-military-700/30 transition-colors">
                    <td className="p-3 text-white font-bold">{convoy.id}</td>
                    <td className="p-3">{convoy.name}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded text-xs font-bold border ${
                        convoy.status === ConvoyStatus.MOVING ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500' :
                        convoy.status === ConvoyStatus.DELAYED ? 'bg-red-500/10 border-red-500 text-red-500' :
                        'bg-amber-500/10 border-amber-500 text-amber-500'
                      }`}>
                        {convoy.status}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="w-24 h-2 bg-military-900 rounded-full overflow-hidden border border-military-700">
                        <div 
                          className="h-full bg-blue-500" 
                          style={{ width: `${convoy.progress}%` }}
                        ></div>
                      </div>
                    </td>
                    <td className="p-3">{convoy.eta}</td>
                    <td className="p-3 text-xs">
                      <span className={convoy.priority === 'HIGH' ? 'text-military-red' : 'text-gray-400'}>
                        [{convoy.priority}]
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </BentoCard>

      </BentoGrid>
    </div>
  );
};

export default Dashboard;