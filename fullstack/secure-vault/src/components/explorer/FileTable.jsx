import React from 'react';
import { useExplorer } from '../../hooks/useExplorer';
import { useContextMenu } from '../../hooks/useContextMenu';
import { getFileIcon } from '../../utils/getFileIcon';
import { flattenTree } from '../../utils/flattenTree';
import { clsx } from 'clsx';
import { CheckSquare, Square, Grid, List, SortAsc, Shield, Lock, AlertCircle } from 'lucide-react';

export const FileTable = () => {
  const { data, selectedFolderId, selectedFileId, selectFile, searchResults } = useExplorer();
  const { onContextMenu } = useContextMenu();

  // Find the selected folder to get its files
  const flatList = flattenTree(data);
  const selectedFolder = flatList.find(n => n.id === selectedFolderId);

  if (!selectedFolder) return null;

  const files = selectedFolder.children?.filter(child => child.type === 'file') || [];

  // Get status badge component
  const StatusBadge = ({ status }) => {
    const statusConfig = {
      secure: {
        bg: 'bg-[#10B981]/10',
        text: 'text-[#10B981]',
        border: 'border-[#10B981]/20',
        label: 'SECURE',
        icon: Shield
      },
      encrypted: {
        bg: 'bg-[#00E5FF]/10',
        text: 'text-[#00E5FF]',
        border: 'border-[#00E5FF]/20',
        label: 'ENCRYPTED',
        icon: Lock
      },
      unscanned: {
        bg: 'bg-[#6B7280]/10',
        text: 'text-[#6B7280]',
        border: 'border-[#6B7280]/20',
        label: 'UNSCANNED',
        icon: AlertCircle
      },
      unverified: {
        bg: 'bg-[#6B7280]/10',
        text: 'text-[#6B7280]',
        border: 'border-[#6B7280]/20',
        label: 'UNVERIFIED',
        icon: AlertCircle
      }
    };

    const config = statusConfig[status] || statusConfig.unscanned;
    const Icon = config.icon;

    return (
      <span className={clsx(
        "inline-flex items-center gap-1.5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded border",
        config.bg, config.text, config.border
      )}>
        <Icon size={10} />
        {config.label}
      </span>
    );
  };

  if (files.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 text-[#8A94A6] h-64 border border-[rgba(255,255,255,0.05)] rounded-lg border-dashed bg-[#06090F]/30">
        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-4">
          <Grid size={20} className="opacity-50" />
        </div>
        <p className="text-sm">No files in this folder.</p>
      </div>
    );
  }

  return (
    <div className="w-full text-left">
      {/* Table Header */}
      <div className="grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-2.5 border-b border-[rgba(255,255,255,0.05)] text-[10px] uppercase tracking-widest text-[#8A94A6] font-semibold">
        <div className="w-5 flex items-center justify-center">
          <Square size={12} className="opacity-50" />
        </div>
        <div>Name</div>
        <div className="w-32">Owner</div>
        <div className="w-24">Size</div>
        <div className="w-28">Last Modified</div>
        <div className="w-28">Status</div>
      </div>

      {/* Table Body */}
      <div className="flex flex-col">
        {files.map((file, index) => {
          const isSelected = selectedFileId === file.id;
          const isMatched = searchResults.matchedIds?.has(file.id);
          const Icon = getFileIcon(file.name);
          const status = file.status || 'unscanned';

          return (
            <div 
              key={file.id}
              onClick={() => selectFile(file.id)}
              onContextMenu={(e) => {
                e.preventDefault();
                selectFile(file.id);
                onContextMenu(e, file.id, 'file', file.name);
              }}
              className={clsx(
                "grid grid-cols-[auto_1fr_auto_auto_auto] gap-4 px-4 py-3 items-center text-sm border-b border-[rgba(255,255,255,0.03)] cursor-pointer transition-all duration-200 group",
                isSelected 
                  ? "bg-[#00E5FF]/5 border-l-2 border-l-[#00E5FF]" 
                  : "hover:bg-white/5 border-l-2 border-l-transparent",
                isMatched && !isSelected && "bg-[#10B981]/5"
              )}
            >
              {/* Checkbox */}
              <div className="w-5 flex items-center justify-center">
                {isSelected ? (
                  <CheckSquare size={14} className="text-[#00E5FF]" />
                ) : (
                  <Square size={14} className="text-[#8A94A6] opacity-0 group-hover:opacity-50 transition-opacity" />
                )}
              </div>

              {/* Name */}
              <div className="flex items-center gap-3 text-[#F3F4F6] truncate">
                <Icon 
                  size={15} 
                  className={clsx(
                    "flex-shrink-0",
                    file.name.includes('.pdf') ? "text-[#EF4444]" : 
                    file.name.includes('.xlsx') || file.name.includes('.xls') ? "text-[#10B981]" :
                    file.name.includes('.docx') || file.name.includes('.doc') ? "text-[#3B82F6]" :
                    file.name.includes('.zip') || file.name.includes('.rar') ? "text-[#F59E0B]" :
                    file.name.includes('.key') || file.name.includes('.bin') ? "text-[#8B5CF6]" :
                    "text-[#8A94A6]"
                  )} 
                />
                <span className={clsx(
                  "truncate text-sm", 
                  isMatched && "text-[#10B981] font-medium",
                  file.confidential && "text-[#EF4444]"
                )}>
                  {file.name}
                </span>
              </div>

              {/* Owner */}
              <div className="w-32 text-[#8A94A6] text-xs truncate">
                {file.owner || '--'}
              </div>

              {/* Size */}
              <div className="w-24 text-[#8A94A6] text-xs font-mono">
                {file.size || '--'}
              </div>

              {/* Last Modified */}
              <div className="w-28 text-[#8A94A6] text-xs">
                {file.modified || '--'}
              </div>

              {/* Status */}
              <div className="w-28">
                <StatusBadge status={status} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};