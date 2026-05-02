import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AlertTriangle, Database, Zap, Clock, GitMerge, XOctagon, CheckCircle2, ServerCrash, Shield, Key, Cpu, Link, Layers, Bug, FileWarning, ShieldOff, HardDrive, EyeOff, GitBranch, Workflow, Search, Settings, Mail, Users, Bell, Box, Hash, MessageSquare, List, Image as ImageIcon } from 'lucide-react';
import GlowingCard from '../ui/GlowingCard';
import { mistakes, tagColors } from '../../data/antiPatternsData';

const allTags = ['Tất cả', ...Array.from(new Set(mistakes.map(m => m.tag)))];

const CommonMistakesCaseStudy = () => {
  const [activeId, setActiveId] = useState(mistakes[0].id);
  const [activeTag, setActiveTag] = useState('Tất cả');
  const selected = mistakes.find(m => m.id === activeId);

  const filtered = activeTag === 'Tất cả'
    ? mistakes
    : mistakes.filter(m => m.tag === activeTag);

  const currentIdx = filtered.findIndex(m => m.id === activeId);

  const handleTagChange = (tag) => {
    setActiveTag(tag);
    const first = tag === 'Tất cả' ? mistakes[0] : mistakes.find(m => m.tag === tag);
    if (first) setActiveId(first.id);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-sm font-medium mb-3">
          <AlertTriangle size={14} /> Anti-patterns & Pitfalls
        </div>
        <div className="flex flex-col md:flex-row md:items-end gap-4 justify-between">
          <div>
            <h1 className="text-3xl md:text-4xl font-black mb-2">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-amber-400">Sai lầm thực tế</span>{' '}
              <span className="text-white">hay gặp nhất</span>
            </h1>
            <p className="text-slate-400 max-w-2xl text-sm md:text-base">
              {mistakes.length} anti-patterns từ các dự án thực tế — kèm câu chuyện, hậu quả và code fix.
            </p>
          </div>
          {/* Progress */}
          <div className="shrink-0 flex flex-col items-end gap-1">
            <span className="text-xs text-slate-500 font-mono">{currentIdx + 1} / {filtered.length} trong nhóm này</span>
            <div className="w-48 h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-rose-500 to-amber-500 rounded-full"
                animate={{ width: `${((currentIdx + 1) / filtered.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Tag Filter Chips */}
      <div className="flex flex-wrap gap-2">
        {allTags.map(tag => (
          <button
            key={tag}
            onClick={() => handleTagChange(tag)}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-200
              ${activeTag === tag
                ? 'bg-indigo-600 border-indigo-500 text-white shadow-lg shadow-indigo-500/30'
                : `${tagColors[tag] || 'bg-slate-800/60 text-slate-400 border-slate-700'} hover:opacity-90`
              }`}
          >
            {tag}
            <span className="ml-1.5 opacity-60 font-mono">
              {tag === 'Tất cả' ? mistakes.length : mistakes.filter(m => m.tag === tag).length}
            </span>
          </button>
        ))}
      </div>

      {/* Main Layout: Card Grid + Detail */}
      <div className="flex flex-col xl:flex-row gap-5">

        {/* Left: Compact Card Grid */}
        <div className="xl:w-80 shrink-0">
          <div className="grid grid-cols-2 xl:grid-cols-1 gap-2 xl:max-h-[70vh] xl:overflow-y-auto xl:pr-1">
            {filtered.map((m, i) => {
              const Icon = m.icon;
              const isActive = activeId === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setActiveId(m.id)}
                  className={`text-left p-3 rounded-xl border transition-all duration-200 relative group
                    ${isActive
                      ? `bg-slate-800 border-slate-600 shadow-md`
                      : 'bg-slate-900/60 border-slate-800/80 hover:border-slate-700 hover:bg-slate-800/50'
                    }`}
                >
                  {isActive && (
                    <motion.div layoutId="activeBar" className={`absolute left-0 top-3 bottom-3 w-0.5 rounded-full bg-${m.color}-400`} />
                  )}
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0
                      ${isActive ? `bg-${m.color}-500 text-white` : 'bg-slate-800 text-slate-500'}`}>
                      <Icon size={13} />
                    </div>
                    <span className={`text-[11px] font-mono ${tagColors[m.tag] || ''} px-1.5 py-0.5 rounded border`}>
                      {m.tag}
                    </span>
                    <span className="ml-auto text-[10px] text-slate-600 font-mono shrink-0">
                      #{String(mistakes.indexOf(m) + 1).padStart(2, '0')}
                    </span>
                  </div>
                  <div className={`text-xs font-semibold leading-tight ${isActive ? 'text-white' : 'text-slate-400'}`}>
                    {m.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right: Detail Panel */}
        <div className="flex-1 min-w-0">
          <AnimatePresence mode="wait">
            <motion.div
              key={selected.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              <GlowingCard className="bg-slate-900/90 border-slate-800">
                {/* Card Header Bar */}
                <div className={`px-6 py-4 border-b border-slate-800 flex items-center gap-4 bg-gradient-to-r from-${selected.color}-900/20 to-transparent`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 bg-${selected.color}-500/20 border border-${selected.color}-500/40`}>
                    <selected.icon size={22} className={`text-${selected.color}-400`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-black text-white">{selected.title}</h2>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${tagColors[selected.tag] || ''}`}>
                      {selected.tag}
                    </span>
                  </div>
                  {/* Prev/Next in header */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => { if (currentIdx > 0) setActiveId(filtered[currentIdx - 1].id); }}
                      disabled={currentIdx === 0}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white transition-colors flex items-center justify-center text-sm"
                    >←</button>
                    <span className="text-xs text-slate-600 font-mono w-10 text-center">
                      {currentIdx + 1}/{filtered.length}
                    </span>
                    <button
                      onClick={() => { if (currentIdx < filtered.length - 1) setActiveId(filtered[currentIdx + 1].id); }}
                      disabled={currentIdx === filtered.length - 1}
                      className="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 disabled:opacity-30 disabled:cursor-not-allowed text-slate-400 hover:text-white transition-colors flex items-center justify-center text-sm"
                    >→</button>
                  </div>
                </div>

                <div className="p-5 md:p-6 space-y-4">
                  {/* Context */}
                  <div className="bg-slate-800/50 rounded-lg px-4 py-3 border-l-4 border-slate-600">
                    <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold block mb-0.5">📌 Bối cảnh</span>
                    <p className="text-slate-200 text-sm font-medium">{selected.context}</p>
                  </div>

                  {/* Story + Impact side by side */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="bg-rose-900/10 rounded-lg p-4 border border-rose-500/20">
                      <p className="text-[10px] text-rose-400 uppercase tracking-widest font-bold flex items-center gap-1 mb-2">
                        <XOctagon size={11}/> Chuyện gì xảy ra
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">{selected.story}</p>
                    </div>
                    <div className="bg-amber-900/10 rounded-lg p-4 border border-amber-500/20">
                      <p className="text-[10px] text-amber-400 uppercase tracking-widest font-bold flex items-center gap-1 mb-2">
                        <AlertTriangle size={11}/> Hậu quả
                      </p>
                      <p className="text-slate-300 text-sm leading-relaxed">{selected.impact}</p>
                    </div>
                  </div>

                  {/* Solution */}
                  <div className="bg-emerald-900/10 rounded-lg p-4 border border-emerald-500/20 border-l-4 border-l-emerald-500">
                    <p className="text-[10px] text-emerald-400 uppercase tracking-widest font-bold flex items-center gap-1 mb-2">
                      <CheckCircle2 size={11}/> Cách xử lý đúng
                    </p>
                    <p className="text-slate-300 text-sm leading-relaxed">{selected.solution}</p>
                  </div>

                  {/* Code blocks */}
                  <div className="grid sm:grid-cols-2 gap-3">
                    <div className="rounded-lg overflow-hidden border border-rose-500/25">
                      <div className="bg-rose-950/70 px-3 py-2 text-[11px] text-rose-300 font-mono flex items-center gap-1.5 border-b border-rose-500/20">
                        <XOctagon size={11}/> Anti-pattern
                      </div>
                      <pre className="bg-slate-950 p-3 text-[11px] font-mono text-rose-200/90 overflow-x-auto leading-relaxed whitespace-pre">
{selected.bad}{"\n"}
                      </pre>
                    </div>
                    <div className="rounded-lg overflow-hidden border border-emerald-500/25">
                      <div className="bg-emerald-950/70 px-3 py-2 text-[11px] text-emerald-300 font-mono flex items-center gap-1.5 border-b border-emerald-500/20">
                        <CheckCircle2 size={11}/> Best Practice
                      </div>
                      <pre className="bg-slate-950 p-3 text-[11px] font-mono text-emerald-200/90 overflow-x-auto leading-relaxed whitespace-pre">
{selected.good}{"\n"}
                      </pre>
                    </div>
                  </div>
                </div>
              </GlowingCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default CommonMistakesCaseStudy;

