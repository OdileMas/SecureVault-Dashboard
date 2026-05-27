import { useExplorer } from '../../context/ExplorerContext';
import { formatFileSize } from '../../utils/formatFileSize';
import { getFileIcon } from '../../utils/getFileIcon';
import styles from './FileList.module.css';
 
const STATUS_MAP = {
  secure: 'badge--secure',
  encrypted: 'badge--encrypted',
  unverified: 'badge--unverified',
  unscanned: 'badge--unscanned',
};
 
function FileIcon({ fileType, size = 18 }) {
  const icon = getFileIcon(fileType);
  return (
    <div className={styles.fileTypeIcon} style={{ background: icon.bg, color: icon.color }}>
      <span style={{ fontSize: size - 4 }}>{icon.symbol}</span>
    </div>
  );
}
 
function FileRow({ node, isSelected, onClick }) {
  const date = node.modified ? new Date(node.modified) : null;
  const dateStr = date ? `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')} ${String(date.getHours()).padStart(2,'0')}:${String(date.getMinutes()).padStart(2,'0')}` : '—';
 
  return (
    <tr
      className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`}
      onClick={onClick}
    >
      <td className={styles.cellCheck}>
        <div className={`${styles.checkbox} ${isSelected ? styles.checkboxChecked : ''}`}>
          {isSelected && (
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
          )}
        </div>
      </td>
      <td className={styles.cellName}>
        <div className={styles.nameWrap}>
          <FileIcon fileType={node.fileType} />
          <span className={`${styles.fileName} ${isSelected ? styles.fileNameSelected : ''}`}>
            {node.name}
          </span>
        </div>
      </td>
      <td className={styles.cellMeta}>{dateStr}</td>
      <td className={styles.cellMeta}>{node.size ? formatFileSize(node.size) : '—'}</td>
      <td className={styles.cellStatus}>
        <span className={`badge ${STATUS_MAP[node.status] || 'badge--unscanned'}`}>
          {node.status?.toUpperCase() || 'UNKNOWN'}
        </span>
      </td>
    </tr>
  );
}
 
function FolderRow({ node, onClick }) {
  return (
    <tr className={styles.row} onDoubleClick={onClick}>
      <td className={styles.cellCheck}><div className={styles.checkbox}/></td>
      <td className={styles.cellName}>
        <div className={styles.nameWrap}>
          <div className={styles.fileTypeIcon} style={{ background: 'rgba(255,171,0,0.12)', color: '#ffab00' }}>
            <span style={{ fontSize: 14 }}>📁</span>
          </div>
          <span className={styles.fileName}>{node.name}</span>
        </div>
      </td>
      <td className={styles.cellMeta}>—</td>
      <td className={styles.cellMeta}>{node.children?.length || 0} items</td>
      <td className={styles.cellStatus}>
        <span className="badge badge--unscanned">FOLDER</span>
      </td>
    </tr>
  );
}
 
export default function FileList() {
  const {
    getCurrentFolderContents, currentPath, selectedFile, selectFile,
    viewMode, setViewMode, navigateTo, toggleFolder, expandedIds, setCurrentPath, findNode
  } = useExplorer();
 
  const contents = getCurrentFolderContents();
  const folders = contents.filter(n => n.type === 'folder');
  const files = contents.filter(n => n.type === 'file');
  const all = [...folders, ...files];
 
  const folderName = currentPath[currentPath.length - 1] || 'Explorer';
 
  const handleFolderDouble = (node) => {
    const newPath = [...currentPath, node.name];
    navigateTo(node, newPath);
    setCurrentPath(newPath);
    if (!expandedIds.has(node.id)) toggleFolder(node.id);
  };
 
  return (
    <div className={styles.container}>
      {/* Header */}
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>{folderName}</h1>
          <div className={styles.subtitle}>{all.length} items found in this directory</div>
        </div>
        <div className={styles.headerActions}>
          <button
            className={`${styles.viewBtn} ${viewMode === 'grid' ? styles.viewBtnActive : ''}`}
            onClick={() => setViewMode('grid')}
            title="Grid view"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/>
            </svg>
          </button>
          <button
            className={`${styles.viewBtn} ${viewMode === 'list' ? styles.viewBtnActive : ''}`}
            onClick={() => setViewMode('list')}
            title="List view"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/>
              <line x1="8" y1="18" x2="21" y2="18"/>
              <line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/>
              <line x1="3" y1="18" x2="3.01" y2="18"/>
            </svg>
          </button>
        </div>
      </div>
 
      {/* Table */}
      {viewMode === 'list' ? (
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.thead}>
                <th className={styles.cellCheck}></th>
                <th className={styles.thName}>NAME</th>
                <th className={styles.th}>LAST MODIFIED</th>
                <th className={styles.th}>SIZE</th>
                <th className={styles.th}>STATUS</th>
              </tr>
            </thead>
            <tbody>
              {folders.map(node => (
                <FolderRow key={node.id} node={node} onClick={() => handleFolderDouble(node)} />
              ))}
              {files.map(node => (
                <FileRow
                  key={node.id}
                  node={node}
                  isSelected={selectedFile?.id === node.id}
                  onClick={() => selectFile(node)}
                />
              ))}
              {all.length === 0 && (
                <tr>
                  <td colSpan={5} className={styles.empty}>
                    <div className={styles.emptyInner}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" opacity="0.3">
                        <path d="M3 7C3 5.9 3.9 5 5 5h5l2 2h7c1.1 0 2 .9 2 2v9c0 1.1-.9 2-2 2H5c-1.1 0-2-.9-2-2V7z"/>
                      </svg>
                      <span>This folder is empty</span>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <div className={styles.grid}>
          {folders.map(node => (
            <div key={node.id} className={styles.gridCard} onDoubleClick={() => handleFolderDouble(node)}>
              <div className={styles.gridIcon} style={{ background: 'rgba(255,171,0,0.12)', color: '#ffab00' }}>📁</div>
              <div className={styles.gridName}>{node.name}</div>
              <div className={styles.gridMeta}>{node.children?.length || 0} items</div>
            </div>
          ))}
          {files.map(node => {
            const icon = getFileIcon(node.fileType);
            return (
              <div
                key={node.id}
                className={`${styles.gridCard} ${selectedFile?.id === node.id ? styles.gridCardSelected : ''}`}
                onClick={() => selectFile(node)}
              >
                <div className={styles.gridIcon} style={{ background: icon.bg, color: icon.color }}>{icon.symbol}</div>
                <div className={styles.gridName}>{node.name}</div>
                <div className={styles.gridMeta}>{formatFileSize(node.size)}</div>
              </div>
            );
          })}
        </div>
      )}
 
      {/* Stats Bar */}
      <div className={styles.statsBar}>
        <StatCard label="STORAGE UTILIZATION" value="74.2%" delta="+2.4%" bar={74} />
        <StatCard label="SECURITY SCANS" value="1,024" sub="0 Threats" isGreen />
        <StatCard label="ACTIVE USERS" value="12+" avatars />
      </div>
    </div>
  );
}
 
function StatCard({ label, value, delta, bar, sub, isGreen, avatars }) {
  return (
    <div className={styles.statCard}>
      <div className={styles.statLabel}>{label}</div>
      <div className={styles.statValue}>
        {value}
        {delta && <span className={styles.statDelta}>{delta}</span>}
        {sub && <span className={`${styles.statSub} ${isGreen ? styles.statGreen : ''}`}>{sub}</span>}
      </div>
      {bar !== undefined && (
        <div className={styles.statBar}>
          <div className={styles.statBarFill} style={{ width: `${bar}%` }} />
        </div>
      )}
      {isGreen && (
        <div className={styles.threatBars}>
          {[...Array(8)].map((_, i) => (
            <div key={i} className={styles.threatBar} style={{ height: `${4 + Math.random() * 10}px` }} />
          ))}
        </div>
      )}
      {avatars && (
        <div className={styles.avatarRow}>
          {['D','S','M'].map((l, i) => (
            <div key={i} className={styles.miniAvatar} style={{ background: ['var(--cyan)','var(--green)','var(--amber)'][i] }}>{l}</div>
          ))}
          <span className={styles.avatarMore}>+12</span>
        </div>
      )}
    </div>
  );
}