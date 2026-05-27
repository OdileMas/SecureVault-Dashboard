import React, { useState, useRef, useEffect } from 'react';
import { useExplorer } from '../../context/ExplorerContext';
import { getFileIcon } from '../../utils/getFileIcon';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, fileSystem, setSelectedItem } = useExplorer();
  const [isFocused, setIsFocused] = useState(false);
  const containerRef = useRef(null);

  // Close search focus state when clicking outside the container
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Recursive matching search function to scrape all depths
  const getFilteredItems = React.useMemo(() => {
    if (!searchQuery.trim()) return [];
    const matches = [];
    
    const traverse = (nodes, currentPath = '/Root') => {
      nodes.forEach(node => {
        if (node.name.toLowerCase().includes(searchQuery.toLowerCase())) {
          matches.push({ ...node, path: currentPath });
        }
        if (node.children) {
          traverse(node.children, `${currentPath}/${node.name}`);
        }
      });
    };
    
    traverse(fileSystem);
    return matches;
  }, [searchQuery, fileSystem]);

  const showDropdown = isFocused && searchQuery.trim().length > 0;

  return (
    <div ref={containerRef} className="relative w-full max-w-md z-50">
      {/* 1. Search Input Field */}
      <div className="relative">
        <span className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500 font-mono text-xs">
          🔍
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          placeholder="Search encrypted vault assets... (e.g., .xlsx, Key)"
          className="w-full bg-[#0F1420] text-slate-200 font-mono text-xs rounded border border-slate-800 focus:border-cyan-500 outline-none transition-colors placeholder-slate-600 pl-10 pr-4 py-2"
        />
        {searchQuery && (
          <button 
            onClick={() => setSearchQuery('')}
            className="absolute inset-y-0 right-3 flex items-center text-slate-500 hover:text-slate-300 text-xs"
          >
            ✕
          </button>
        )}
      </div>

      {/* 2. Backdrop Blurring Layer - Injected when searching to blur the background content */}
      {showDropdown && (
        <div className="fixed inset-0 top-16 left-0 right-0 bottom-0 glass-overlay pointer-events-none z-[-1] animate-in fade-in duration-200" />
      )}

      {/* 3. Floating Interactive Results Dropdown Panel */}
      {showDropdown && (
        <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0F131C] border border-cyan-500/30 rounded shadow-2xl max-h-64 overflow-y-auto divide-y divide-slate-850/60 animate-in slide-in-from-top-1 duration-150">
          {getFilteredItems.length === 0 ? (
            <div className="p-4 text-center font-mono text-xs text-slate-500">
              No direct file or folder signatures matched
            </div>
          ) : (
            getFilteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  setSelectedItem(item);
                  setIsFocused(false);
                }}
                className="w-full text-left p-3 hover:bg-slate-800/60 cursor-pointer flex items-center justify-between transition-colors font-mono text-xs"
              >
                <div className="flex items-center space-x-2.5 truncate">
                  <span className="shrink-0">{getFileIcon(item.name, item.type === 'folder')}</span>
                  <span className="text-slate-200 truncate font-medium">{item.name}</span>
                </div>
                <span className="text-[10px] text-cyan-500/80 bg-cyan-950/40 px-2 py-0.5 rounded shrink-0 ml-2">
                  {item.path}
                </span>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;