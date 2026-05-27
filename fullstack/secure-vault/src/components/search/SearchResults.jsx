import React from 'react';
import { useExplorer } from '../../context/ExplorerContext';
import { getFileIcon } from '../../utils/getFileIcon';

const SearchResults = ({ onResultClick }) => {
  const { searchQuery, itemsMetadata } = useExplorer();

  const filteredResults = Object.values(itemsMetadata).filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!searchQuery) return null;

  return (
    <div className="absolute top-full left-0 right-0 mt-1.5 bg-[#0F131C] border border-slate-800 rounded-md max-h-60 overflow-y-auto shadow-2xl z-50 divide-y divide-slate-850">
      {filteredResults.length === 0 ? (
        <div className="p-4 text-center font-mono text-xs text-slate-600">No telemetry matches found</div>
      ) : (
        filteredResults.map(item => (
          <div
            key={item.id}
            onClick={() => onResultClick(item)}
            className="p-3 hover:bg-slate-800/60 cursor-pointer transition-colors flex items-center justify-between font-mono text-xs"
          >
            <div className="flex items-center space-x-2.5 truncate">
              {getFileIcon(item.name, item.type === 'folder')}
              <span className="text-slate-200 truncate">{item.name}</span>
            </div>
            <span className="text-[10px] text-slate-500 italic truncate max-w-[40%]">{item.location}</span>
          </div>
        ))
      )}
    </div>
  );
};

export default SearchResults;