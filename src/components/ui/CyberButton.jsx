import React from 'react';
import { motion } from 'framer-motion';

const CyberButton = ({ children, onClick, disabled, variant = 'primary', className = '', ...props }) => {
  const baseStyle = "relative px-6 py-2.5 font-bold rounded-lg overflow-hidden transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2";
  
  const variants = {
    primary: "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-[0_0_20px_rgba(99,102,241,0.5)] border border-indigo-400/30",
    secondary: "bg-slate-800 text-slate-200 hover:bg-slate-700 border border-slate-600 hover:border-slate-500 hover:shadow-[0_0_15px_rgba(148,163,184,0.3)]",
    danger: "bg-rose-600/20 text-rose-400 hover:bg-rose-600/30 border border-rose-500/50 hover:shadow-[0_0_20px_rgba(225,29,72,0.4)]",
    success: "bg-emerald-600/20 text-emerald-400 hover:bg-emerald-600/30 border border-emerald-500/50 hover:shadow-[0_0_20px_rgba(16,185,129,0.4)]"
  };

  return (
    <motion.button
      whileTap={!disabled ? { scale: 0.95 } : {}}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyle} ${variants[variant]} ${className}`}
      {...props}
    >
      {/* Cyberpunk horizontal scanline effect */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent opacity-0 hover:opacity-100 transform -translate-y-full hover:translate-y-full transition-all duration-1000 ease-in-out" />
      
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </motion.button>
  );
};

export default CyberButton;
