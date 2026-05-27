import { useState, useCallback } from 'react';

export const useContextMenu = () => {
  const [contextMenu, setContextMenu] = useState(null);

  const handleContextMenu = useCallback((e, item) => {
    e.preventDefault();
    setContextMenu({
      x: e.clientX,
      y: e.clientY,
      item
    });
  }, []);

  const closeMenu = useCallback(() => {
    setContextMenu(null);
  }, []);

  return { contextMenu, handleContextMenu, closeMenu };
};