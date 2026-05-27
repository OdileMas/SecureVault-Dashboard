import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';

const MobileSidebar = ({ isOpen, onClose }) => {
  const { activeTab, setActiveTab } = useExplorer();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-40 md:hidden flex">
      {/* Overlay backdrop */}
      <div className="fixed inset-0 bg-[#06090E]/60 backdrop-blur-sm" onClick={onClose} />
      
      {/* Sidebar Panel Drawer */}
      <div className="relative w-64 max-w-xs bg-[#090D14] border-r border-slate-850 h-full flex flex-col justify-between p-5 text-slate-300 z-10 animate-in slide-in-from-left duration-200">
        <div className="flex flex-col">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2.5">
              <div className="h-7 w-7 rounded bg-cyan-500 flex items-center justify-center font-bold text-slate-950 text-xs">SV</div>
              <span className="text-sm font-bold text-white tracking-wide">SecureVault</span>
            </div>
            <button onClick={onClose} className="text-slate-500 hover:text-slate-300">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <nav className="space-y-1 font-mono text-xs">
            {[
              { id: 'Archive', label: 'Vault Archive', icon: '📦' },
              { id: 'Keys', label: 'Crypto Keys', icon: '🔑' },
              { id: 'Audit', label: 'Access Audit', icon: '📜' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  onClose();
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded ${
                  activeTab === tab.id ? 'bg-slate-800 text-cyan-400 font-bold' : 'text-slate-400'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
};

export default MobileSidebar;