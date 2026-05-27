import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';

const Sidebar = () => {
  const { activeTab, setActiveTab } = useExplorer();

  return (
    <aside className="w-64 border-r border-slate-850 bg-[#090D14] flex flex-col justify-between shrink-0 hidden md:flex">
      <div className="flex flex-col pt-5">
        <div className="px-5 mb-6 flex items-center space-x-2.5">
          <div className="h-7 w-7 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md shadow-cyan-500/20">
            SV
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide font-sans">SecureVault</h2>
            <p className="text-[10px] font-mono text-slate-500 tracking-wider">Enterprise Security</p>
          </div>
        </div>

        <div className="px-3 mb-4">
          <button className="w-full bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-mono text-xs py-2 px-4 rounded font-bold flex items-center justify-center space-x-2 transition-colors active:scale-[0.99]">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4" />
            </svg>
            <span>Upload File</span>
          </button>
        </div>

        <nav className="space-y-0.5 px-2 font-mono text-xs">
          {[
            { id: 'Archive', label: 'Vault Archive', icon: '📦' },
            { id: 'Keys', label: 'Crypto Keys', icon: '🔑' },
            { id: 'Audit', label: 'Access Audit', icon: '📜' },
            { id: 'Settings', label: 'System Guard', icon: '⚙️' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded transition-all duration-150 ${
                activeTab === tab.id 
                  ? 'bg-slate-800 text-cyan-400 font-bold border-r-2 border-cyan-400' 
                  : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
              }`}
            >
              <span className="text-sm">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      <div className="p-4 border-t border-slate-900 space-y-2 text-[11px] font-mono">
        <div className="flex items-center justify-between text-slate-500 px-2">
          <span>Node Connectivity</span>
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;