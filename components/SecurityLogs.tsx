import React from 'react';
import { Shield, AlertTriangle, CheckCircle, Lock, Terminal } from 'lucide-react';
import { BentoCard, BentoGrid } from './Bento/BentoCard'; // <-- NEW IMPORT

const SecurityLogs: React.FC = () => {
  const logs = [
    { id: 'LOG-9921', time: '14:02:11', event: 'AUTH_SUCCESS', user: 'CMD-8921', ip: '192.168.1.4', status: 'SUCCESS' },
    { id: 'LOG-9920', time: '13:55:04', event: 'ROUTE_ACCESS', user: 'LOG-4421', ip: '10.0.0.12', status: 'SUCCESS' },
    { id: 'LOG-9919', time: '13:42:00', event: 'FAILED_LOGIN', user: 'UNKNOWN', ip: '45.22.11.9', status: 'WARNING' },
    { id: 'LOG-9918', time: '12:30:15', event: 'SYSTEM_BOOT', user: 'SYSTEM', ip: 'LOCALHOST', status: 'INFO' },
    { id: 'LOG-9917', time: '12:29:55', event: 'ENCRYPTION_KEY_ROTATION', user: 'SYSTEM', ip: 'LOCALHOST', status: 'SUCCESS' },
    { id: 'LOG-9916', time: '11:15:22', event: 'UNAUTHORIZED_PING', user: 'UNKNOWN', ip: '198.51.100.2', status: 'CRITICAL' },
  ];

  return (
    <div className="max-w-7xl mx-auto space-y-6">
      
      {/* Header/Status Card */}
      <BentoCard 
        className="bg-military-800 p-6 rounded-xl border border-military-700 flex justify-between items-center"
        enableTilt={false}
        enableStars={false}
      >
        <div>
           <h2 className="text-2xl font-bold text-white font-mono flex items-center gap-3">
             <Shield className="w-8 h-8 text-military-red" />
             SECURITY LOGS
           </h2>
           <p className="text-gray-400 text-sm font-mono mt-2">AUDIT TRAIL // CLASSIFIED LEVEL 5</p>
        </div>
        <div className="text-right">
           <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-900/30 border border-emerald-500/30 rounded text-emerald-500 text-xs font-mono mb-1">
             <CheckCircle className="w-3 h-3" /> SYSTEM SECURE
           </div>
           <p className="text-gray-500 text-xs font-mono">LAST SCAN: 00:02:15 AGO</p>
        </div>
      </BentoCard>

      {/* Main Logs Table Card */}
      <BentoCard 
        className="bg-military-900 border border-military-700 rounded-xl overflow-hidden p-0"
        enableTilt={true}
        enableMagnetism={false}
      >
        <div className="p-3 bg-black border-b border-military-700 flex items-center gap-2 text-xs font-mono text-gray-500">
          <Terminal className="w-4 h-4" />
          <span>/var/log/sys_audit.log</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm font-mono">
            <thead className="bg-military-800 text-gray-400 uppercase text-xs sticky top-0">
              <tr>
                <th className="p-4">Timestamp</th>
                <th className="p-4">Event ID</th>
                <th className="p-4">Event Type</th>
                <th className="p-4">User</th>
                <th className="p-4">Source IP</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-military-800 text-gray-300">
              {logs.map((log) => (
                <tr key={log.id} className="hover:bg-military-800/50 transition-colors">
                  <td className="p-4 text-emerald-500/80">{log.time}</td>
                  <td className="p-4">{log.id}</td>
                  <td className="p-4 font-bold">{log.event}</td>
                  <td className="p-4">{log.user}</td>
                  <td className="p-4">{log.ip}</td>
                  <td className="p-4">
                    <span className={`px-2 py-1 rounded text-[10px] font-bold border ${
                      log.status === 'CRITICAL' ? 'bg-red-500/20 border-red-500 text-red-500' :
                      log.status === 'WARNING' ? 'bg-amber-500/20 border-amber-500 text-amber-500' :
                      log.status === 'SUCCESS' ? 'bg-emerald-500/20 border-emerald-500 text-emerald-500' :
                      'bg-blue-500/20 border-blue-500 text-blue-500'
                    }`}>
                      {log.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </BentoCard>

      {/* Detail Metrics Grid */}
      <BentoGrid className="grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <BentoCard 
          className="col-span-1 bg-military-800 p-5 rounded-xl border border-military-700"
          enableTilt={true}
        >
           <h3 className="text-white text-sm font-bold uppercase mb-4 flex items-center gap-2 border-b border-military-700 pb-2">
             <Lock className="w-4 h-4 text-military-red" /> Encryption Status
           </h3>
           <div className="space-y-4">
             <div className="flex justify-between text-xs font-mono text-gray-400 border-b border-military-700 pb-2">
               <span>Algorithm</span>
               <span className="text-white">AES-256-GCM</span>
             </div>
             <div className="flex justify-between text-xs font-mono text-gray-400 border-b border-military-700 pb-2">
               <span>Key Rotation</span>
               <span className="text-emerald-500">AUTO (24H)</span>
             </div>
             <div className="flex justify-between text-xs font-mono text-gray-400">
               <span>Handshake</span>
               <span className="text-emerald-500">VERIFIED</span>
             </div>
           </div>
        </BentoCard>

        <BentoCard 
          className="col-span-1 md:col-span-2 bg-military-800 p-5 rounded-xl border border-military-700"
          enableTilt={true}
        >
           <h3 className="text-white text-sm font-bold uppercase mb-4 flex items-center gap-2 border-b border-military-700 pb-2">
             <AlertTriangle className="w-4 h-4 text-amber-500" /> Intrusion Detection
           </h3>
           <div className="flex items-center justify-center h-24">
              <div className="text-center">
                 <p className="text-3xl font-bold text-emerald-500 font-mono">0</p>
                 <p className="text-xs text-gray-500 uppercase mt-1">Active Threats</p>
              </div>
           </div>
        </BentoCard>
      </BentoGrid>
    </div>
  );
};

export default SecurityLogs;