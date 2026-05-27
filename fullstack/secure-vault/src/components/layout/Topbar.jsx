import React from 'react';
import SearchBar from '../search/SearchBar';
import { useExplorer } from '../../context/ExplorerContext';

const Topbar = ({ onMenuClick }) => {
  return (
    <header className="h-16 border-b border-slate-850 px-4 md:px-6 flex items-center justify-between shrink-0 bg-[#090D14]/80 backdrop-blur-md z-20 relative">
      <div className="flex items-center space-x-3 w-full max-w-xl">
        {/* Mobile Toggle Trigger */}
        <button 
          onClick={onMenuClick}
          className="md:hidden p-2 text-slate-400 hover:text-slate-200 hover:bg-slate-800/40 rounded transition-colors"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <SearchBar />
      </div>
      
      <div className="flex items-center space-x-4 shrink-0 pl-4">
        <div className="hidden sm:flex flex-col text-right font-mono">
          <span className="text-xs text-slate-300 font-bold">Sec_Officer_7</span>
          <span className="text-[10px] text-emerald-400">IP: 192.168.1.104</span>
        </div>
        <div className="h-8 w-8 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center font-mono text-xs font-bold text-cyan-400 shadow-inner">
          SO
        </div>
      </div>
    </header>
  );
};

export default Topbar;