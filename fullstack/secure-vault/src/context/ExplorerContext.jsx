import React, { createContext, useContext, useState } from 'react';
import initialFileSystem from '../data/data.json'; // Direct dynamic load from your data channel

const ExplorerContext = createContext();

export const ExplorerProvider = ({ children }) => {
  const [activeTab, setActiveTab] = useState('Explorer');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Set default initial selection to match the active file configuration from your layout mockups
  const [selectedItem, setSelectedItem] = useState({
    id: "email_1",
    name: "Email_Thread_Jan2024.pdf",
    type: "file",
    size: "4.2MB",
    owner: "Admin_Alpha",
    updatedAt: "2024-01-24 14:32",
    status: "Secure",
    version: "v2.4.0",
    checksum: "SHA-256: 8a4c...e31b",
    dataClass: "HIGHLY CONFIDENTIAL"
  });

  // Load state straight out of your tracking database JSON file
  const [fileSystem, setFileSystem] = useState(initialFileSystem);

  return (
    <ExplorerContext.Provider value={{
      fileSystem,
      setFileSystem,
      activeTab,
      setActiveTab,
      searchQuery,
      setSearchQuery,
      selectedItem,
      setSelectedItem
    }}>
      {children}
    </ExplorerContext.Provider>
  );
};

export const useExplorer = () => useContext(ExplorerContext);