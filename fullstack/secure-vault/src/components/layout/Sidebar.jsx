import React, { useRef } from 'react';
import { useExplorer } from '../../context/ExplorerContext';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const { fileSystem, activeTab, setActiveTab, selectedItem, setSelectedItem } = useExplorer();
  const navigate = useNavigate();
  
  const fileInputRef = useRef(null);
  const folderInputRef = useRef(null);

  const folderItems = React.useMemo(() => {
    return fileSystem.filter(item => item.type === 'folder');
  }, [fileSystem]);

  const handleLibraryClick = (tabId) => {
    setActiveTab(tabId);
    setSelectedItem(null);
  };

  const handleFolderClick = (folder) => {
    setSelectedItem(folder);
    setActiveTab('Explorer');
  };

  const handleLockTerminal = () => {
    setSelectedItem(null);
    setActiveTab('Explorer');
    navigate('/login');
  };

  const handleUploadClick = () => fileInputRef.current.click();
  const handleFolderUploadClick = () => folderInputRef.current.click();

  const handleFileChange = (e) => {
    console.log("Upload triggered for:", e.target.files);
    alert("System: Processing local file integration...");
  };

  return (
    <aside className="w-64 border-r border-slate-800 bg-[#090D14] flex flex-col justify-between shrink-0 hidden md:flex h-full select-none">
      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" multiple />
      <input type="file" ref={folderInputRef} onChange={handleFileChange} className="hidden" webkitdirectory="true" mozdirectory="true" />

      <div className="flex flex-col pt-5 overflow-y-auto flex-1 no-scrollbar">
        {/* Brand Header */}
        <div className="px-5 mb-6 flex items-center space-x-2.5">
          <div className="h-7 w-7 bg-transparent"><img src="/logo.png" alt="SV" className="h-full w-full object-contain mix-blend-screen" /></div>
          <div>
            <h2 className="text-sm font-bold text-white tracking-wide font-sans">SecureVault</h2>
            <p className="text-[10px] font-mono text-slate-500 tracking-wider">Enterprise Security</p>
          </div>
        </div>

        {/* Upload Buttons */}
        <div className="px-3 mb-6 space-y-2">
          <button onClick={handleUploadClick} className="w-full bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-mono text-xs py-2.5 px-4 rounded font-bold flex items-center justify-center space-x-2 transition-all active:scale-[0.98]">
            <span>📄</span> <span>Upload Files</span>
          </button>
          <button onClick={handleFolderUploadClick} className="w-full bg-slate-800 hover:bg-slate-700 text-slate-300 font-mono text-xs py-2.5 px-4 rounded font-bold flex items-center justify-center space-x-2 transition-all active:scale-[0.98]">
            <span>📁</span> <span>Upload Folder</span>
          </button>
        </div>

        {/* Library Section */}
        <div className="px-5 mb-2 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">Library</div>
        <nav className="space-y-0.5 px-2 font-mono text-xs mb-6">
          {[{id: 'Explorer', label: 'Explorer', icon: '📁'}, {id: 'Favorites', label: 'Favorites', icon: '⭐'}, {id: 'Recent', label: 'Recent', icon: '⏱️'}, {id: 'Shared', label: 'Shared', icon: '👥'}, {id: 'Archive', label: 'Archive', icon: '📦'}].map(tab => (
            <button key={tab.id} onClick={() => handleLibraryClick(tab.id)} className={`w-full flex items-center space-x-3 px-3 py-2 rounded transition-all ${activeTab === tab.id && !selectedItem ? 'bg-slate-850 text-cyan-400 font-bold border-r-2 border-cyan-400' : 'hover:bg-slate-900/60 text-slate-400'}`}>
              <span className="text-sm opacity-80">{tab.icon}</span> <span>{tab.label}</span>
            </button>
          ))}
        </nav>

        {/* Folders Tree Section */}
        <div className="px-5 mb-2 text-[10px] font-mono font-bold tracking-wider text-slate-500 uppercase">Folders</div>
        <nav className="px-2 font-mono text-xs space-y-1">
          {folderItems.map(folder => {
            const isFolderSelected = selectedItem?.id === folder.id;
            return (
              <div key={folder.id} className="space-y-0.5">
                <button onClick={() => handleFolderClick(folder)} className={`w-full flex items-center space-x-2 px-3 py-1.5 rounded text-left transition-all ${isFolderSelected ? 'text-cyan-400 font-bold bg-slate-850/50' : 'text-slate-400 hover:text-slate-200'}`}>
                  <span>{isFolderSelected ? '▼' : '▶'}</span> <span className="text-amber-500/90">📁</span> <span className="truncate">{folder.name}</span>
                </button>
                {isFolderSelected && folder.children && (
                  <div className="pl-6 border-l border-slate-800 ml-4 space-y-0.5 mt-0.5">
                    {folder.children.map(subItem => (
                      <button key={subItem.id} onClick={() => setSelectedItem(subItem)} className={`w-full text-left py-1 px-2 rounded text-[11px] truncate ${selectedItem?.id === subItem.id ? 'text-cyan-400 font-medium bg-slate-800/40' : 'text-slate-500'}`}>
                        {subItem.type === 'folder' ? '📁 ' : '📄 '} {subItem.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Footer Utilities */}
      <div className="p-2 border-t border-slate-850 font-mono text-xs space-y-0.5 bg-[#070A0F]">
        <button onClick={() => handleLibraryClick('Security Log')} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded text-slate-400 hover:text-cyan-400 transition-all text-left">
          <span>🛡️</span> <span>SECURITY LOG</span>
        </button>
        <button onClick={handleLockTerminal} className="w-full flex items-center space-x-3 px-3 py-2.5 rounded text-rose-400 hover:bg-rose-950/10 transition-colors text-left">
          <span>🔒</span> <span>LOCK TERMINAL</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;