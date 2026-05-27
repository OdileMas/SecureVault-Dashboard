import { useExplorer } from '../../context/ExplorerContext';
import styles from './TreeNode.module.css';
 
function buildPath(node, data, target, path = []) {
  if (node.id === target) return [...path, node.name];
  if (node.children) {
    for (const child of node.children) {
      const result = buildPath(child, data, target, [...path, node.name]);
      if (result) return result;
    }
  }
  return null;
}
 
export default function TreeNode({ node, depth }) {
  const { expandedIds, toggleFolder, currentFolder, navigateTo, data, focusedId, setFocusedId } = useExplorer();
  const isExpanded = expandedIds.has(node.id);
  const isFocused = focusedId === node.id;
  const isCurrentFolder = currentFolder === node.id;
 
  if (node.type === 'file') return null; // Only show folders in sidebar
 
  const handleClick = () => {
    toggleFolder(node.id);
    setFocusedId(node.id);
    // Build path and navigate
    const path = buildPath(data, data, node.id, []) || [node.name];
    // Remove first duplicate 'SecureVault' if needed
    navigateTo(node, path.filter(Boolean));
  };
 
  return (
    <div className={styles.nodeWrapper}>
      <button
        className={`${styles.node} explorer-node ${isFocused ? styles.focused : ''} ${isCurrentFolder ? styles.current : ''}`}
        style={{ paddingLeft: `${8 + depth * 14}px` }}
        onClick={handleClick}
        data-id={node.id}
      >
        <span className={`${styles.chevron} ${isExpanded ? styles.chevronOpen : ''}`}>
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <polyline points="9 18 15 12 9 6"/>
          </svg>
        </span>
        <span className={styles.folderIcon}>
          {isExpanded ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
            </svg>
          )}
        </span>
        <span className={styles.label}>{node.name}</span>
      </button>
 
      {isExpanded && node.children && (
        <div className={styles.children}>
          {node.children.filter(c => c.type === 'folder').map(child => (
            <TreeNode key={child.id} node={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}