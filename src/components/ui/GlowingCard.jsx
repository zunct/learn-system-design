import React from 'react';
import { motion } from 'framer-motion';

const GlowingCard = ({ children, title, icon: Icon, delay = 0, className = '' }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`relative group ${className}`}
    >
      {/* Background glow effect on hover */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-2xl opacity-20 group-hover:opacity-40 transition duration-500 blur-sm" />
      
      {/* Card Content */}
      <div className="relative bg-slate-900/80 backdrop-blur-md border border-slate-700/50 rounded-2xl p-6 h-full flex flex-col">
        {title && (
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-slate-800">
            {Icon && (
              <div className="p-2 bg-indigo-500/10 rounded-lg text-indigo-400">
                <Icon size={20} />
              </div>
            )}
            <h3 className="text-xl font-bold text-slate-100">{title}</h3>
          </div>
        )}
        <div className="flex-1">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

export default GlowingCard;
