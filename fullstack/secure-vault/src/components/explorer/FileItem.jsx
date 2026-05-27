import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';
import { getFileIcon } from '../../utils/getFileIcon';

const FileItem = ({ item, depth }) => {
  const { selectedItem, selectItem, itemsMetadata } = useExplorer();
  
  // Access dynamically generated metrics derived from client schema definition
  const fullMeta = itemsMetadata[item.id] || item;
  const isSelected = selectedItem?.id === item.id;

  return (
    <div
      onClick={() => selectItem(fullMeta)}
      style={{ paddingLeft: `${depth * 16 + 36}px` }}
      className={`group flex items-center justify-between py-2.5 pr-4 border-b border-slate-800/40 cursor-pointer transition-all duration-150
        ${isSelected ? 'bg-cyan-950/40 border-l-2 border-l-cyan-400 text-cyan-50' : 'hover:bg-slate-800/20 text-slate-300'}`}
    >
      <div className="flex items-center space-x-3 truncate">
        <span>{getFileIcon(item.name, false)}</span>
        <span className="font-mono text-sm tracking-wide truncate">{item.name}</span>
      </div>

      <div className="hidden md:flex items-center space-x-8 text-xs font-mono text-slate-500">
        <span className="w-24 truncate text-left group-hover:text-slate-400">{fullMeta.owner || 'Admin_Alpha'}</span>
        <span className="w-16 text-left group-hover:text-slate-400">{fullMeta.size}</span>
        <span className="w-32 text-right group-hover:text-slate-400">{fullMeta.lastModified?.substring(0,16)}</span>
        <span className="w-20 text-center">
          <span className={`px-2 py-0.5 text-[10px] rounded font-sans tracking-wide uppercase border ${
            fullMeta.status === 'Secure' 
              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-800/40' 
              : fullMeta.status === 'Unscanned'
              ? 'bg-amber-950/40 text-amber-400 border-amber-800/40'
              : 'bg-slate-900 text-slate-400 border-slate-700'
          }`}>
            {fullMeta.status}
          </span>
        </span>
      </div>
    </div>
  );
};

export default FileItem;