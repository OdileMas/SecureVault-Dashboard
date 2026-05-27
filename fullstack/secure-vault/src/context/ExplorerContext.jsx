import React, { createContext, useContext, useState } from 'react';
import initialFileSystem from '../data/data.json'; 

const ExplorerContext = createContext();

export const ExplorerProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Explorer');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const [fileSystem, setFileSystem] = useState(initialFileSystem);

  // New: Function to recursively delete an item by ID
  const deleteItem = (id) => {
    const removeNode = (nodes) => {
      return nodes
        .filter(node => node.id !== id)
        .map(node => ({
          ...node,
          children: node.children ? removeNode(node.children) : undefined
        }));
    };
    setFileSystem(prev => removeNode(prev));
    setSelectedItem(null); // Close panel after deletion
  };

  return (
    <ExplorerContext.Provider value={{
      fileSystem,
      setFileSystem,
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      selectedItem,
      setSelectedItem,
      deleteItem // Added to context
    }}>
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorer = () => useContext(ExplorerContext);