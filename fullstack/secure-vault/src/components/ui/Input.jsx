import React from 'react';

const Input = ({ icon, className = '', ...props }) => {
  return (
    <div className="relative w-full">
      {icon && (
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none text-slate-500">
          {icon}
        </div>
      )}
      <input
        className={`w-full bg-[#0B0F17] text-slate-200 font-mono text-xs rounded border border-slate-800 focus:border-cyan-500 outline-none transition-colors placeholder-slate-600 ${
          icon ? 'pl-10 pr-3.5' : 'px-3.5'
        } py-2.5 ${className}`}
        {...props}
      />
    </div>
  );
};

export default Input;