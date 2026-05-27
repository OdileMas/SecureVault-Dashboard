import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';
import { formatFileSize } from '../../utils/formatFileSize';

const PropertiesPanel = () => {
  const { selectedItem } = useExplorer();

  if (!selectedItem) {
    return (
      <aside className="w-80 border-l border-slate-850 bg-[#090D14] p-6 hidden lg:flex flex-col items-center justify-center font-mono text-xs text-slate-500">
        🛡️ Select an active node signature to execute trace telemetry
      </aside>
    );
  }

  return (
    <aside className="w-80 border-l border-slate-850 bg-[#090D14] flex flex-col shrink-0 hidden lg:flex font-sans text-slate-300">
      
      {/* 1. TOP PREVIEW AREA */}
      <div className="p-6 flex flex-col items-center border-b border-slate-850">
        <div className="h-32 w-full bg-[#0C101A] border border-slate-800 rounded flex items-center justify-center text-4xl mb-4 relative overflow-hidden">
          {/* Mocked PDF preview texture */}
          <div className="absolute inset-0 bg-cyan-950/20" />
          📄
        </div>
        <h3 className="text-sm font-bold text-white text-center break-all">{selectedItem.name}</h3>
        <p className="text-[10px] text-slate-500 font-mono mt-1">SHA-256: {selectedItem.checksum?.substring(0, 12) || 'a8f3...c91'}</p>
      </div>

      {/* 2. METADATA SECTION */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Metadata</h4>
          <div className="text-xs space-y-2">
            <div className="flex justify-between"><span className="text-slate-500">Type</span><span>{selectedItem.type === 'folder' ? 'Folder' : 'PDF Document'}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Size</span><span>{formatFileSize(selectedItem.size)}</span></div>
            <div className="flex justify-between"><span className="text-slate-500">Owner</span><span className="text-cyan-400">{selectedItem.owner || 'Admin_Alpha'}</span></div>
          </div>
        </div>

        {/* 3. ACCESS CONTROL SECTION */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">Access Control</h4>
          <div className="space-y-2">
            <div className="bg-[#0C101A] border border-slate-800 p-2 rounded flex justify-between items-center text-xs">
              <span className="flex items-center gap-2">🛡️ Admin Access</span>
              <span className="text-slate-500">Full</span>
            </div>
            <div className="bg-[#0C101A] border border-slate-800 p-2 rounded flex justify-between items-center text-xs">
              <span className="flex items-center gap-2">🔒 Finance Team</span>
              <span className="text-slate-500">Read/Write</span>
            </div>
          </div>
        </div>

        {/* 4. FILE ACTIVITY HISTORY */}
        <div className="space-y-3">
          <h4 className="text-[10px] font-bold uppercase text-slate-500 tracking-wider">File Activity History</h4>
          <div className="relative pl-4 border-l border-slate-800 space-y-4">
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-cyan-400" />
              <p className="text-xs text-white">Integrity Check Passed</p>
              <p className="text-[9px] text-slate-500">Just now • Automated</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-slate-600" />
              <p className="text-xs text-white">File Encrypted</p>
              <p className="text-[9px] text-slate-500">2 hours ago • System</p>
            </div>
          </div>
        </div>
      </div>

      {/* 5. ACTION FOOTER (DOWNLOAD, SHARE, DELETE) */}
      <div className="p-4 border-t border-slate-850 bg-[#090D14] flex gap-2">
        <button className="flex-[3] bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2.5 rounded transition-all">
          Download
        </button>
        <button className="flex-1 bg-slate-800 hover:bg-slate-700 text-white text-xs rounded flex items-center justify-center">🔗</button>
        <button className="flex-1 bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 text-xs rounded flex items-center justify-center">🗑️</button>
      </div>
    </aside>
  );
};

export default PropertiesPanel;