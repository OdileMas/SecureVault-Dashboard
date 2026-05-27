import { useEffect, useState } from 'react';
import { useExplorer } from '../context/ExplorerContext';

export const useKeyboardNavigation = (isActive) => {
  const { fileSystem, setFileSystem, selectedItem, setSelectedItem } = useExplorer();
  const [focusedIndex, setFocusedIndex] = useState(-1);

  // Helper function to get all items that are currently visible to the user (expanded)
  const getFlattenedVisibleItems = (nodes) => {
    let result = [];
    nodes.forEach((node) => {
      result.push(node);
      if (node.type === 'folder' && node.isOpen && node.children) {
        result = [...result, ...getFlattenedVisibleItems(node.children)];
      }
    });
    return result;
  };

  // Helper to deep update a folder's open/close status state
  const setFolderOpenStatus = (id, isOpen) => {
    const updateNodes = (nodes) => {
      return nodes.map((node) => {
        if (node.id === id) {
          return { ...node, isOpen };
        }
        if (node.children) {
          return { ...node, children: updateNodes(node.children) };
        }
        return node;
      });
    };
    setFileSystem(updateNodes(fileSystem));
  };

  useEffect(() => {
    if (!isActive) return;

    const handleKeyDown = (e) => {
      const visibleItems = getFlattenedVisibleItems(fileSystem);
      if (visibleItems.length === 0) return;

      // Find where we currently are based on the selected item
      let currentIndex = visibleItems.findIndex(item => item.id === selectedItem?.id);
      
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          const nextIndex = currentIndex < visibleItems.length - 1 ? currentIndex + 1 : 0;
          setSelectedItem(visibleItems[nextIndex]);
          break;

        case 'ArrowUp':
          e.preventDefault();
          const prevIndex = currentIndex > 0 ? currentIndex - 1 : visibleItems.length - 1;
          setSelectedItem(visibleItems[prevIndex]);
          break;

        case 'ArrowRight':
          e.preventDefault();
          if (selectedItem && selectedItem.type === 'folder' && !selectedItem.isOpen) {
            setFolderOpenStatus(selectedItem.id, true);
          }
          break;

        case 'ArrowLeft':
          e.preventDefault();
          if (selectedItem && selectedItem.type === 'folder' && selectedItem.isOpen) {
            setFolderOpenStatus(selectedItem.id, false);
          }
          break;

        case 'Enter':
          e.preventDefault();
          if (selectedItem) {
            // Set selection explicitly to trigger properties panel reload layout
            setSelectedItem({ ...selectedItem });
            if (selectedItem.type === 'folder') {
              setFolderOpenStatus(selectedItem.id, !selectedItem.isOpen);
            }
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [fileSystem, selectedItem, isActive]);

  return { focusedIndex };
};