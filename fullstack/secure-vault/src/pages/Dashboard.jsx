import React, { useState } from 'react';
import { useExplorer } from '../context/ExplorerContext';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import RecursiveTree from '../components/explorer/RecursiveTree';
import PropertiesPanel from '../components/panels/PropertiesPanel';
import EmptyState from '../components/explorer/EmptyState';
import { getFileIcon } from '../utils/getFileIcon';
import { formatFileSize } from '../utils/formatFileSize';

const Dashboard = () => {
  const { fileSystem, activeTab, searchQuery, selectedItem, setSelectedItem } = useExplorer();
  const [viewMode, setViewMode] = useState('list');
  
  useKeyboardNavigation(true);

  // Dynamic recursive context payload item node path structural resolver
  const currentDirectoryItems = React.useMemo(() => {
    if (searchQuery.trim() !== '') {
      const matches = [];
      const traverse = (nodes) => {
        nodes.forEach(node => {
          if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) matches.push(node);
          if (node.children) traverse(node.children);
        });
      };
      traverse(fileSystem);
      return matches;
    }

    if (selectedItem && selectedItem.type === 'folder' && selectedItem.children) {
      return selectedItem.children;
    }

    switch (activeTab) {
      case 'Explorer':
        return fileSystem;
      case 'Recent':
        return fileSystem.slice(0, 3);
      case 'Archive':
        return fileSystem.filter(item => item.name.includes('Archive') || item.id === 'root_1');
      default:
        return fileSystem;
    }
  }, [fileSystem, activeTab, searchQuery, selectedItem]);

  return (
    <div className="h-full w-full flex bg-[#0C101A] overflow-hidden select-none text-slate-300 font-sans">
      
      {/* NO DUPLICATE HEADERS OR SIDEBARS HERE. 
        They are perfectly positioned in your App layout frame wrapper.
      */}

      {/* COMPONENT CONTENT CANVAS BODY */}
      <main className="flex-1 flex flex-col min-w-0 p-6 overflow-y-auto z-10">
        
        {/* Dynamic Context Header Block Section */}
        <div className="mb-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-bold text-white tracking-tight">
              {selectedItem ? `${selectedItem.name}` : `${activeTab} Records`}
            </h1>
            <span className="bg-emerald-950/60 border border-emerald-900 text-emerald-400 font-mono text-[10px] px-2 py-0.5 rounded-full font-bold">
              {currentDirectoryItems.length} Files
            </span>
          </div>

          {/* Controls: Sorting Dropdown & Layout Grid Toggle Switches */}
          <div className="flex items-center space-x-2 self-start sm:self-auto">
            <button className="flex items-center space-x-1.5 bg-[#111622] border border-slate-800 hover:border-slate-700 font-mono text-xs text-slate-400 px-3 py-1.5 rounded transition-all">
              <span>➔</span>
              <span>Sort</span>
            </button>
            
            <div className="flex items-center bg-[#111622] border border-slate-800 rounded p-0.5 font-mono text-xs">
              <button 
                onClick={() => setViewMode('list')} 
                className={`p-1.5 rounded transition-all ${viewMode === 'list' ? 'bg-[#1A2333] text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-400'}`}
                title="List View"
              >
                📊
              </button>
              <button 
                onClick={() => setViewMode('grid')} 
                className={`p-1.5 rounded transition-all ${viewMode === 'grid' ? 'bg-[#1A2333] text-cyan-400 font-bold' : 'text-slate-500 hover:text-slate-400'}`}
                title="Grid View"
              >
                🎛️
              </button>
            </div>
          </div>
        </div>

        {/* Directory Breadcrumb String Path Navigation Indicator Layout */}
        <div className="text-[11px] font-mono text-slate-500 uppercase tracking-wider mb-5 flex items-center space-x-1.5">
          <span>📁 PATH:</span>
          <span className="text-slate-400">ROOT</span>
          <span>/</span>
          <span className="text-slate-400">{activeTab}</span>
          {selectedItem && (
            <>
              <span>/</span>
              <span className="text-cyan-400 font-bold">{selectedItem.name}</span>
            </>
          )}
        </div>

        {selectedItem && (
          <button 
            onClick={() => setSelectedItem(null)} 
            className="mb-4 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center space-x-1 self-start bg-slate-900/40 border border-slate-800/80 px-2.5 py-1.5 rounded transition-all"
          >
            <span>⬅</span> <span>Back to Parent Directory</span>
          </button>
        )}

        {/* FILE LEDGER CONTENT GENERATOR */}
        {currentDirectoryItems.length === 0 ? (
          <EmptyState type="vault" />
        ) : viewMode === 'list' ? (
          
          /* --- DESIGN SPECIFICATION LIST INTERFACE --- */
          <div className="w-full bg-[#090D14]/40 rounded border border-slate-850/80 overflow-hidden">
            
            {/* Table Dynamic Column Title Headings Layout */}
            <div className="flex items-center py-3 px-4 bg-[#0B0F19] border-b border-slate-850 font-mono text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none">
              <div className="flex items-center space-x-3 flex-1 min-w-0">
                <input type="checkbox" className="rounded border-slate-800 bg-slate-950 text-cyan-500 focus:ring-0 accent-cyan-500 cursor-pointer h-3.5 w-3.5" disabled />
                <span>Name</span>
              </div>
              <div className="flex items-center space-x-6 text-right font-mono">
                <span className="w-36 text-left hidden md:inline-block">Last Modified</span>
                <span className="w-20 text-left hidden sm:inline-block">Size</span>
                <span className="w-24 text-center">Status</span>
              </div>
            </div>

            {/* Structured JSON Array Context Node Trees */}
            <div className="divide-y divide-slate-900/60 bg-[#0A0E16]/20">
              <RecursiveTree items={currentDirectoryItems} />
            </div>
          </div>
        ) : (
          
          /* --- DESIGN SPECIFICATION GRID INTERFACE --- */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-100">
            {currentDirectoryItems.map((item) => {
              const isSelected = selectedItem?.id === item.id;
              return (
                <div 
                  key={item.id} 
                  onClick={() => setSelectedItem(item)} 
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-36 ${
                    isSelected 
                      ? 'bg-[#111724] border-cyan-500/80 shadow-md shadow-cyan-500/5' 
                      : 'bg-[#0E1321]/40 border-slate-850 hover:border-slate-700 hover:bg-[#12192B]/50'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 truncate">
                      <span className="text-xl bg-slate-950 p-2 rounded-lg border border-slate-850/80 shrink-0">
                        {getFileIcon(item.name, item.type === 'folder')}
                      </span>
                      <div className="truncate">
                        <h3 className="text-xs font-bold text-slate-200 font-mono truncate">{item.name}</h3>
                        <p className="text-[10px] font-mono text-slate-500 mt-0.5">{item.owner || 'System Link'}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-slate-850/50 pt-3 mt-2 flex items-center justify-between font-mono text-[10px] text-slate-500">
                    <span>Size: <strong className="text-slate-400 font-normal">{formatFileSize(item.size)}</strong></span>
                    <span className="bg-slate-900 border border-slate-800 px-1.5 py-0.5 rounded uppercase text-[9px] text-cyan-400 tracking-wider">
                      {item.status || 'Secure'}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* PROPERTIES PREVIEW DRAWER PANEL */}
      <PropertiesPanel />
    </div>
  );
};

export default Dashboard;