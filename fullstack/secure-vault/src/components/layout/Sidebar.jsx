import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { fileSystem, activeTab, setActiveTab, selectedItem, setSelectedItem } = useExplorer();
  const navigate = useNavigate();

  // Filter folders out dynamically from your context data layer to populate the folders list
  const folderItems = React.useMemo(() => {
    return fileSystem.filter(item => item.type === 'folder');
  }, [fileSystem]);

  const handleLibraryClick = (tabId) => {
    setActiveTab(tabId);
    setSelectedItem(null); // Clear selected item to return to main directory view
  };

  const handleFolderClick = (folder) => {
    setSelectedItem(folder);
    setActiveTab('Explorer'); // Keep explorer tab highlighted when browsing subfolders
  };

  const handleLockTerminal = () => {
    setSelectedItem(null);
    setActiveTab('Explorer');
    navigate('/login');
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#090D14] flex flex-col justify-between shrink-0 hidden md:flex h-full select-none">
      <div className="flex flex-col pt-5 overflow-y-auto flex-1 no-scrollbar">
        
        {/* Brand Header */}
        <div className="px-5 mb-6 flex items-center space-x-2.5">
          <div className="h-7 w-7 bg-transparent">
            <img src="/logo.png" alt="SV" className="h-full w-full object-contain mix-blend-screen" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide font-sans">SecureVault</h2>
            <p className="text-[10px] font-mono text-slate-500 tracking-wider">Enterprise Security</p>
          </div>
        </div>

        {/* High-Fidelity Action Upload Trigger */}
        <div className="px-3 mb-6">
          <button className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs py-2.5 px-4 rounded font-bold flex items-center justify-center space-x-2 transition-all active:scale-[0.98]">
            <span>📄</span>
            <span>Upload Files</span>
          </button>
        </div>

        {/* --- LIBRARY SECTION --- */}
        <div className="px-5 mb-2 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
          Library
        </div>
        <nav className="space-y-0.5 px-2 font-mono text-xs mb-6">
          {[
            { id: 'Explorer', label: 'Explorer', icon: '📁' },
            { id: 'Favorites', label: 'Favorites', icon: '⭐' },
            { id: 'Recent', label: 'Recent', icon: '⏱️' },
            { id: 'Shared', label: 'Shared', icon: '👥' },
            { id: 'Archive', label: 'Archive', icon: '📦' }
          ].map((tab) => {
            const isTabActive = activeTab === tab.id && !selectedItem;
            return (
              <button
                key={tab.id}
                onClick={() => handleLibraryClick(tab.id)}
                className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-all ${
                  isTabActive
                    ? 'bg-slate-850 text-cyan-400 font-bold border-r-2 border-cyan-400'
                    : 'hover:bg-slate-900/60 text-slate-400 hover:text-slate-200'
                }`}
              >
                <span className="text-sm opacity-80">{tab.icon}</span>
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>

        {/* --- DYNAMIC FOLDERS TREE SECTION --- */}
        <div className="px-5 mb-2 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">
          Folders
        </div>
        <nav className="px-2 font-mono text-xs space-y-1">
          {folderItems.map((folder) => {
            const isFolderSelected = selectedItem?.id === folder.id;
            return (
              <div key={folder.id} className="space-y-0.5">
                <button
                  onClick={() => handleFolderClick(folder)}
                  className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded text-left transition-all ${
                    isFolderSelected 
                      ? 'text-cyan-400 font-bold bg-slate-850/50' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/30'
                  }`}
                >
                  <span>{isFolderSelected ? '▼' : '▶'}</span>
                  <span className="text-amber-500/90">📁</span>
                  <span className="truncate">{folder.name}</span>
                </button>

                {/* Nested rendering for sub-nodes if the target folder is focused */}
                {isFolderSelected && folder.children && (
                  <div className="pl-6 border-l border-slate-800 ml-4 space-y-0.5 mt-0.5 animate-in slide-in-from-top-1 duration-100">
                    {folder.children.map(subItem => (
                      <button
                        key={subItem.id}
                        onClick={() => setSelectedItem(subItem)}
                        className={`w-full text-left py-1 px-2 rounded text-[11px] truncate block ${
                          selectedItem?.id === subItem.id 
                            ? 'text-cyan-400 font-medium bg-slate-800/40' 
                            : 'text-slate-500 hover:text-slate-300'
                        }`}
                      >
                        {subItem.type === 'folder' ? '📁 ' : '📄 '}
                        {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Persistent Utilities Section at bottom */}
      <div className="p-2 border-t border-slate-850 font-mono text-xs space-y-0.5 bg-[#070A0F]">
        <button 
          onClick={() => handleLibraryClick('Security Log')}
          className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded transition-all text-left ${
            activeTab === 'Security Log' ? 'bg-slate-850 text-cyan-400 font-bold' : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <span>🛡️</span>
          <span>SECURITY LOG</span>
        </button>
        
        <button 
          onClick={handleLockTerminal}
          className="w-full flex items-center space-x-3 px-3 py-2.5 rounded text-rose-400 hover:bg-rose-950/10 text-left transition-colors"
        >
          <span>🔒</span>
          <span>LOCK TERMINAL</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;