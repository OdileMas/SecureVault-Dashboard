import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';
import { getFileIcon } from '../../utils/getFileIcon';

const FolderItem = ({ item, depth, isExpanded }) => {
  const { selectedItem, selectItem, toggleFolder } = useExplorer();
  const isSelected = selectedItem?.id === item.id;

  const handleRowClick = (e) => {
    selectItem(item);
  };

  const handleChevronClick = (e) => {
    e.stopPropagation();
    toggleFolder(item.id);
  };

  return (
    <div
      onClick={handleRowClick}
      style={{ paddingLeft: `${depth * 16 + 12}px` }}
      className={`group flex items-center justify-between py-2.5 pr-4 border-b border-slate-800/40 cursor-pointer transition-all duration-150 select-none
        ${isSelected ? 'bg-cyan-950/30 border-l-2 border-l-cyan-400 text-white' : 'hover:bg-slate-800/30 text-slate-300'}`}
    >
      <div className="flex items-center space-x-3 truncate">
        <button 
          onClick={handleChevronClick}
          className="p-0.5 rounded hover:bg-slate-700/50 transition-colors text-slate-500 hover:text-slate-200"
        >
          <svg 
            className={`w-4 h-4 transform transition-transform duration-150 ${isExpanded ? 'rotate-90' : ''}`} 
            fill="none" stroke="currentColor" viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" />
          </svg>
        </button>
        
        <span>{getFileIcon(item.name, true, isExpanded)}</span>
        <span className="font-mono text-sm tracking-wide truncate">{item.name}</span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-xs font-mono text-slate-500">
        <span className="w-24 truncate text-left">System_Root</span>
        <span className="w-16 text-left">--</span>
        <span className="w-32 text-right">2024-10-19 16:45</span>
        <span className="w-20 text-center">
          <span className="px-2 py-0.5 text-[10px] rounded bg-emerald-950/50 text-emerald-400 border border-emerald-800/50 font-sans tracking-wide uppercase">
            Secure
          </span>
        </span>
      </div>
    </div>
  );
};

export default FolderItem;