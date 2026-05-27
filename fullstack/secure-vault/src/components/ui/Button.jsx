import React from 'react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "font-mono text-xs font-bold py-2 px-4 rounded transition-all duration-150 flex items-center justify-center space-x-2 outline-none select-none active:scale-[0.98]";
  
  const variants = {
    primary: "bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-md shadow-cyan-500/10 focus:ring-2 focus:ring-cyan-500/40",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700/60 focus:ring-2 focus:ring-slate-700/40",
    danger: "bg-rose-950/40 hover:bg-rose-900/60 text-rose-400 border border-rose-800/40 focus:ring-2 focus:ring-rose-500/30",
    ghost: "text-slate-400 hover:text-slate-200 hover:bg-slate-800/40"
  };

  return (
    <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};

export default Button;