import React from 'react';

const EmptyState = ({ type = 'search' }) => {
  return (
    <div className="w-full py-16 px-4 flex flex-col items-center justify-center text-center">
      <div className="h-12 w-12 rounded bg-slate-900 border border-slate-800 flex items-center justify-center text-slate-500 mb-4 font-mono text-lg">
        {type === 'search' ? '🔍' : '📂'}
      </div>
      <h3 className="text-sm font-bold text-slate-300 font-sans tracking-wide">
        {type === 'search' ? 'No Encrypted Assets Found' : 'Vault Segment Empty'}
      </h3>
      <p className="text-xs text-slate-500 font-mono mt-1 max-w-xs">
        {type === 'search' 
          ? 'Check your input string parameters or checksum key sequence query.' 
          : 'This repository contains no internal objects or child elements.'}
      </p>
    </div>
  );
};

export default EmptyState;