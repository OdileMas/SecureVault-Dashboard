import React from 'react';

const ContextMenu = ({ x, y, onClose, onItemClick }) => {
  return (
    <>
      {/* Backdrop tracking layer to catch accidental outer cursor hits */}
      <div className="fixed inset-0 z-40" onClick={onClose} onContextMenu={(e) => { e.preventDefault(); onClose(); }} />
      
      <div 
        style={{ top: `${y}px`, left: `${x}px` }}
        className="fixed z-50 w-48 bg-[#0F131C] border border-slate-800 rounded-md shadow-2xl py-1 font-mono text-xs text-slate-300"
      >
        <button onClick={() => onItemClick('download')} className="w-full text-left px-3.5 py-2 hover:bg-slate-800/80 hover:text-cyan-400 transition-colors flex items-center space-x-2">
          <span>📥</span> <span>Download Decrypted</span>
        </button>
        <button onClick={() => onItemClick('inspect')} className="w-full text-left px-3.5 py-2 hover:bg-slate-800/80 hover:text-cyan-400 transition-colors flex items-center space-x-2">
          <span>🔍</span> <span>Audit Metadata</span>
        </button>
        <div className="border-t border-slate-800/80 my-1" />
        <button onClick={() => onItemClick('revoke')} className="w-full text-left px-3.5 py-2 hover:bg-rose-950/40 text-rose-400 transition-colors flex items-center space-x-2">
          <span>🚫</span> <span>Revoke System Access</span>
        </button>
      </div>
    </>
  );
};

export default ContextMenu;