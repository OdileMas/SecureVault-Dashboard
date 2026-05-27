import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';

const PropertiesPanel = () => {
  const { selectedItem } = useExplorer();

  if (!selectedItem) {
    return (
      <aside className="w-80 border-l border-slate-850 bg-[#090D14] p-6 hidden lg:flex flex-col items-center justify-center font-mono text-xs text-slate-500">
        🛡️ Select an active node signature to execute trace telemetry
      </aside>
    );
  }

  const isFolder = selectedItem.type === 'folder';

  return (
    <aside className="w-80 border-l border-slate-850 bg-[#090D14] flex flex-col justify-between shrink-0 hidden lg:flex font-mono text-xs text-slate-300">
      <div className="p-5 space-y-6 overflow-y-auto flex-1">
        
        {/* Panel Category Header */}
        <div className="flex items-center justify-between border-b border-slate-850 pb-4">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
            {isFolder ? 'Folder Metadata' : 'File Metadata Verification'}
          </span>
          <span className="text-slate-600 text-xs select-none">ID: {selectedItem.id}</span>
        </div>

        {/* Dynamic Status Presentation Box */}
        <div className="flex flex-col items-center py-5 bg-[#0C101A]/60 rounded-xl border border-slate-850 shadow-inner">
          <div className="h-14 w-12 bg-slate-900 border border-slate-800 rounded flex flex-col items-center justify-center text-slate-400 relative">
            <span className="text-lg">{isFolder ? '📁' : '📄'}</span>
          </div>
          <h3 className="mt-3 font-bold text-white text-center px-4 truncate w-full tracking-wide">
            {selectedItem.name}
          </h3>
          <p className="text-[10px] text-slate-500 mt-1">Size Metric: {selectedItem.size || 'Recursive Hierarchy'}</p>
        </div>

        {/* Technical Specification Matrix Grid */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Node Properties</div>
          <div className="space-y-2 bg-[#0C101A]/30 p-3 rounded-lg border border-slate-900">
            <div className="flex justify-between"><span className="text-slate-500">Owner Node</span><span className="text-slate-200">{selectedItem.owner || 'System Authorization'}</span></div>
            {!isFolder && (
              <>
                <div className="flex justify-between"><span className="text-slate-500">Build Layer</span><span>{selectedItem.version || 'v1.0.0'}</span></div>
                <div className="flex justify-between"><span className="text-slate-500">Hash Check</span><span className="text-slate-400 font-mono tracking-tighter">{selectedItem.checksum || 'SHA-256: 0a7d...'}</span></div>
              </>
            )}
            <div className="flex justify-between items-center pt-1">
              <span className="text-slate-500">Security Clearance</span>
              <span className={`px-2 py-0.5 rounded text-[9px] font-bold border ${
                selectedItem.status === 'Unscanned'
                  ? 'bg-amber-950/40 text-amber-400 border-amber-900/60'
                  : 'bg-rose-950/50 text-rose-400 border-rose-900/60'
              }`}>
                {selectedItem.status === 'Unscanned' ? 'UNSCAN_RISK' : selectedItem.dataClass || 'HIGHLY SECURE'}
              </span>
            </div>
          </div>
        </div>

        {/* Simulated Threat Assessment Event Stream */}
        <div className="space-y-3">
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Activity Audits</div>
          <div className="space-y-3 pl-2.5 border-l border-slate-850 text-[11px]">
            <div>
              <p className="text-slate-200 font-medium">🛡️ Cryptographic Integrity Match</p>
              <p className="text-[9px] text-slate-500 mt-0.5">{selectedItem.updatedAt || 'Continuous Monitoring'}</p>
            </div>
            <div>
              <p className="text-slate-400">👤 Node distributed via secure pipeline</p>
              <p className="text-[9px] text-slate-500 mt-0.5">Origin Sync Stable</p>
            </div>
          </div>
        </div>

      </div>

      {/* Footer Interface Options Panel */}
      <div className="p-4 bg-[#090D14] border-t border-slate-850 flex items-center gap-2">
        <button className="flex-1 bg-slate-800 hover:bg-slate-750 text-white font-bold py-2 rounded text-center transition-all">
          Decrypt Stream
        </button>
      </div>
    </aside>
  );
};

export default PropertiesPanel;