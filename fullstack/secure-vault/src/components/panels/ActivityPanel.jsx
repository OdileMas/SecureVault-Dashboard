import React from 'react';

const ActivityPanel = () => {
  const activities = [
    { event: 'Key Gen', desc: 'AES-256 Vector rotation executed successfully.', time: '02m ago' },
    { event: 'Access', desc: 'User Admin_Alpha read file Case_Summary_Draft_v3.docx', time: '14m ago' },
    { event: 'Sys Check', desc: 'Cryptographic parity sequence verification passed.', time: '1h ago' }
  ];

  return (
    <div className="p-4 border-t border-slate-800/60 bg-slate-900/10 font-mono">
      <h4 className="text-[10px] font-bold tracking-widest text-slate-500 uppercase mb-3">Live Node Events</h4>
      <div className="space-y-3">
        {activities.map((act, i) => (
          <div key={i} className="text-[11px] leading-relaxed flex justify-between space-x-2">
            <span className="text-slate-400 shrink-0">[{act.event}]</span>
            <span className="text-slate-500 text-left flex-1 truncate">{act.desc}</span>
            <span className="text-slate-600 shrink-0 text-right">{act.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActivityPanel;