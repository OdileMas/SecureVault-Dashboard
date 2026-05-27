import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';

const ExplorerHeader = () => {
  const { searchQuery } = useExplorer();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-800/60 mb-4 gap-2">
      <div className="font-mono text-xs text-slate-400">
        Showing path: <span className="text-cyan-400 font-bold">/Root_System{searchQuery ? `?query="${searchQuery}"` : ''}</span>
      </div>
      <div className="font-mono text-[11px] text-slate-500 flex items-center space-x-4">
        <span>Nodes Scanned: <strong className="text-slate-300 font-normal">18</strong></span>
        <span>Secure Protocol: <strong className="text-emerald-400 font-normal">TLS 1.3</strong></span>
      </div>
    </div>
  );
};

export default ExplorerHeader;