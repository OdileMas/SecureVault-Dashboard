import React from 'react';

const SearchOverlay = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return <div className="fixed inset-0 bg-transparent z-40" onClick={onClose} />;
};

export default SearchOverlay;