import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';
import { getFileIcon } from '../../utils/getFileIcon';

const RecursiveTree = ({ items = [], depth = 0 }) => {
  const { selectedItem, setSelectedItem, setFileSystem, fileSystem } = useExplorer();

  const toggleFolderOpen = (id) => {
    const updateNodes = (nodes) => {
      return nodes.map(node => {
        if (node.id === id) {
          return { ...node, isOpen: !node.isOpen };
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };
    setFileSystem(updateNodes(fileSystem));
  };

  return (
    <div className="w-full flex flex-col font-mono text-xs">
      {items.map((item) => {
        const isFolder = item.type === 'folder';
        const isSelected = selectedItem?.id === item.id;
        
        // Provide safe defaults for fields missing from the raw assignment data.json
        const itemOwner = item.owner || 'System';
        const itemSize = item.size || '--';
        const itemDate = item.updatedAt || '2026-05-27';
        const itemStatus = item.status || 'Secure';

        return (
          <div key={item.id} className="w-full flex flex-col">
            {/* Row Layout Entry Component */}
            <div
              onClick={() => {
                setSelectedItem(item);
                if (isFolder) toggleFolderOpen(item.id);
              }}
              style={{ paddingLeft: `${depth * 16 + 16}px` }}
              className={`flex items-center justify-between py-3 px-4 border-b border-slate-900/40 cursor-pointer transition-all select-none ${
                isSelected 
                  ? 'bg-slate-850/60 border-l-2 border-cyan-400 text-cyan-400' 
                  : 'hover:bg-slate-900/40 text-slate-300'
              }`}
            >
              <div className="flex items-center space-x-3 flex-1 truncate">
                <span className="w-3 shrink-0 text-center text-[10px] text-slate-500 transition-transform duration-100">
                  {isFolder ? (item.isOpen ? '▼' : '▶') : ''}
                </span>
                <span className="shrink-0">{getFileIcon(item.name, isFolder)}</span>
                <span className={`truncate font-medium ${isSelected ? 'text-cyan-400 font-bold' : 'text-slate-200'}`}>
                  {item.name}
                </span>
              </div>

              {!isFolder && (
                <div className="hidden md:flex items-center space-x-8 text-right text-slate-400">
                  <span className="w-24 text-left truncate">{itemOwner}</span>
                  <span className="w-16 text-left">{itemSize}</span>
                  <span className="w-32 text-right">{itemDate}</span>
                  <span className="w-20 text-center">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold tracking-wide ${
                      itemStatus === 'Secure' 
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-900/60' 
                        : 'bg-amber-950/80 text-amber-400 border border-amber-900/60'
                    }`}>
                      {itemStatus}
                    </span>
                  </span>
                </div>
              )}
            </div>

            {/* Subtree Level Drilldown invocation */}
            {isFolder && item.isOpen && item.children && (
              <RecursiveTree items={item.children} depth={depth + 1} />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default RecursiveTree;