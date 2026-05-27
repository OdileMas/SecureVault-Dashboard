import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useExplorer } from '../context/ExplorerContext';
import { useKeyboardNavigation } from '../hooks/useKeyboardNavigation';
import RecursiveTree from '../components/explorer/RecursiveTree';
import PropertiesPanel from '../components/panels/PropertiesPanel';
import SearchBar from '../components/search/SearchBar';
import EmptyState from '../components/explorer/EmptyState';
import ExplorerHeader from '../components/explorer/ExplorerHeader';
import { getFileIcon } from '../utils/getFileIcon';
import { formatFileSize } from '../utils/formatFileSize';

const Dashboard = () => {
  const { fileSystem, activeTab, setActiveTab, searchQuery, selectedItem, setSelectedItem } = useExplorer();
  const [viewMode, setViewMode] = useState('list');
  const navigate = useNavigate();
  
  useKeyboardNavigation(true);

  // 1. Find the currently active or "opened" directory to display its contents in Grid View
  const currentDirectoryItems = React.useMemo(() => {
    if (searchQuery.trim() !== '') {
      // If searching, flatten matches across the system
      const matches = [];
      const traverse = (nodes) => {
        nodes.forEach(node => {
          if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            matches.push(node);
          }
          if (node.children) traverse(node.children);
        });
      };
      traverse(fileSystem);
      return matches;
    }

    // If a folder is selected, show its children inside the Grid/List main view
    if (selectedItem && selectedItem.type === 'folder' && selectedItem.children) {
      return selectedItem.children;
    }

    // Default fallback: Filter top-level root items based on the active sidebar tab
    switch (activeTab) {
      case 'Explorer':
      case 'Archive':
        return fileSystem;
      case 'Keys':
        return fileSystem.filter(item => item.id === 'root_3' || item.name.includes('.key'));
      case 'Audit':
      case 'Security Log':
        return fileSystem.filter(item => item.id === 'root_1' || item.name.includes('Audit'));
      default:
        return fileSystem;
    }
  }, [fileSystem, activeTab, searchQuery, selectedItem]);

  // 2. Handle double-click or explicit click to open folders in Grid View
  const handleItemClick = (item) => {
    setSelectedItem(item);
    
    // If it's a folder, we dynamically expand it in the state context
    if (item.type === 'folder') {
      item.isOpen = true; 
    }
  };

  const handleLockTerminal = () => {
    setSelectedItem(null);
    setActiveTab('Explorer');
    navigate('/login');
  };

  return (
    <div className="h-screen w-full flex bg-[#0B0F17] overflow-hidden select-none text-slate-300 font-sans">
      
      {/* SIDEBAR COMPONENT */}
      <aside className="w-64 border-r border-slate-850 bg-[#090D14] flex flex-col justify-between shrink-0 hidden md:flex">
        <div className="flex flex-col pt-5">
          <div className="px-5 mb-6 flex items-center space-x-2.5">
            <div className="h-7 w-7 rounded bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center font-bold text-slate-950 text-xs shadow-md shadow-cyan-500/20">
              SV
            </div>
            <div>
              <h2 className="text-sm font-bold text-white tracking-wide">SecureVault</h2>
              <p className="text-[10px] font-mono text-slate-500 tracking-wider">Enterprise Security</p>
            </div>
          </div>

          <nav className="space-y-0.5 px-2 font-mono text-xs">
            {[
              { id: 'Explorer', label: 'Explorer', icon: '📂' },
              { id: 'Favorites', label: 'Favorites', icon: '⭐' },
              { id: 'Archive', label: 'Archive', icon: '📦' },
              { id: 'Keys', label: 'Crypto Keys', icon: '🔑' },
              { id: 'Audit', label: 'Access Audit', icon: '📜' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  setSelectedItem(null); // Reset deep path selection when switching primary categories
                }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded transition-all duration-150 ${
                  activeTab === tab.id && !selectedItem
                    ? 'bg-slate-800/80 text-cyan-400 font-bold border-r-2 border-cyan-400' 
                    : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-sm">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="p-2 border-t border-slate-850 font-mono text-xs space-y-0.5">
          <button 
            onClick={() => setActiveTab('Security Log')}
            className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded transition-all text-left ${
              activeTab === 'Security Log' 
                ? 'bg-slate-800 text-cyan-400 font-bold border-r-2 border-cyan-400' 
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
            }`}
          >
            <span>🛡️</span>
            <span>Security Log</span>
          </button>
          
          <button 
            onClick={handleLockTerminal}
            className="w-full flex items-center space-x-3 px-3 py-2.5 rounded text-rose-400 hover:bg-rose-950/20 text-left transition-colors"
          >
            <span>🔒</span>
            <span>Lock Terminal</span>
          </button>
        </div>
      </aside>

      {/* MAIN WORKSPACE CANVAS */}
      <main className="flex-1 flex flex-col min-w-0 bg-[#0C101A] relative">
        <header className="h-16 border-b border-slate-850 px-6 flex items-center justify-between shrink-0 bg-[#090D14]/80 backdrop-blur-md z-30">
          <SearchBar />
          <div className="flex items-center space-x-3">
            <span className="text-xs font-mono text-slate-400 hidden sm:inline">Sec_Officer_7</span>
            <div className="h-8 w-8 rounded-full border border-slate-700 bg-slate-800 flex items-center justify-center font-mono text-xs text-cyan-400">SO</div>
          </div>
        </header>

        <section className="flex-1 overflow-y-auto p-6 z-10">
          {/* Breadcrumb Info Bar */}
          <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-xl font-bold text-white tracking-wide font-sans flex items-center gap-2">
                {selectedItem && selectedItem.type === 'folder' ? (
                  <span>📁 {selectedItem.name} Contents</span>
                ) : (
                  <span>{activeTab} Records</span>
                )}
              </h1>
              <p className="text-xs text-slate-500 font-mono mt-0.5">
                {selectedItem ? `Viewing current path branch details` : `Secure vault database ledger objects`}
              </p>
            </div>
            
            {/* View Layout Toggles */}
            <div className="flex items-center bg-slate-900 border border-slate-800 rounded p-0.5 font-mono text-xs select-none self-start">
              <button 
                onClick={() => setViewMode('list')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${viewMode === 'list' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}
              >
                List View
              </button>
              <button 
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded font-medium transition-colors ${viewMode === 'grid' ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-400'}`}
              >
                Grid View
              </button>
            </div>
          </div>

          {/* Render Breadcrumbs or Back Button if inside a subfolder */}
          {selectedItem && (
            <button 
              onClick={() => setSelectedItem(null)} 
              className="mb-4 text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-slate-900/50 border border-slate-800 px-2.5 py-1.5 rounded transition-all"
            >
              ⬅ Back to Parent Directory
            </button>
          )}

          <ExplorerHeader />

          {/* DYNAMIC METRIC VIEW PRESENTATION */}
          {activeTab === 'Security Log' ? (
            <div className="w-full glass-panel rounded-lg p-6 border border-slate-850 font-mono text-xs space-y-4">
              <div className="border-b border-slate-850 pb-2 text-slate-400 font-bold">Node Event Trace Ledger Logs</div>
              <div className="space-y-2.5">
                <p className="text-emerald-400">● [04:12 AM] Integrity scan passed. 0 data fragments compromised.</p>
                <p className="text-cyan-400">● [Yesterday, 10:24 PM] Token signature mapping authorized for Admin_Alpha.</p>
                <p className="text-slate-400">● [2026-11-12] System build v2.4.0 successfully compiled and initialized.</p>
              </div>
            </div>
          ) : currentDirectoryItems.length === 0 ? (
            <EmptyState type="vault" />
          ) : viewMode === 'list' ? (
            /* --- 1. THE HIERARCHICAL LIST VIEW TREE --- */
            <div className="w-full glass-panel rounded-lg border border-slate-850/60 overflow-hidden">
              <div className="flex items-center justify-between py-2.5 px-4 bg-slate-900/60 border-b border-slate-850 font-mono text-xs font-bold text-slate-400 uppercase tracking-wider">
                <span className="flex-1 text-left">Name</span>
                <div className="hidden md:flex items-center space-x-8 text-right">
                  <span className="w-24 text-left">Owner</span>
                  <span className="w-16 text-left">Size</span>
                  <span className="w-32 text-right">Last Modified</span>
                  <span className="w-20 text-center">Status</span>
                </div>
              </div>
              <div className="divide-y divide-slate-900/40 bg-[#0F1420]/10">
                <RecursiveTree items={currentDirectoryItems} />
              </div>
            </div>
          ) : (
            /* --- 2. THE SYNCED GRID VIEW COMPONENT --- */
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 animate-in fade-in duration-150">
              {currentDirectoryItems.map((item) => (
                <div 
                  key={item.id}
                  onClick={() => handleItemClick(item)}
                  className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between h-36 ${
                    selectedItem?.id === item.id 
                      ? 'bg-slate-850/90 border-cyan-500 shadow-lg shadow-cyan-500/10' 
                      : 'bg-[#0F1420]/50 border-slate-850 hover:border-slate-700/80 hover:bg-[#131A29]/60'
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3 truncate">
                      <span className="text-xl bg-slate-900 p-2 rounded-lg border border-slate-800 shrink-0">
                        {getFileIcon(item.name, item.type === 'folder')}
                      </span>
                      <div className="truncate">
                        <h3 className="text-xs font-bold text-slate-200 truncate font-mono">{item.name}</h3>
                        <p className="text-[10px] font-mono text-slate-500 mt-0.5">{item.owner || 'System File'}</p>
                      </div>
                    </div>
                    {item.type === 'folder' && (
                      <span className="text-[9px] font-mono bg-cyan-950/80 text-cyan-400 border border-cyan-900/60 px-1.5 py-0.5 rounded">
                        Open ➜
                      </span>
                    )}
                  </div>
                  <div className="border-t border-slate-850/60 pt-3 mt-2 flex items-center justify-between font-mono text-[10px] text-slate-500">
                    <span>Size: <strong className="text-slate-400 font-normal">{formatFileSize(item.size)}</strong></span>
                    <span className="text-slate-600">{item.updatedAt || 'Secure Block'}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* PROPERTIES PREVIEW SIDE PANEL */}
      <PropertiesPanel />
    </div>
  );
};

export default Dashboard;