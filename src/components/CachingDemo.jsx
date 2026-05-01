import React, { useState } from 'react';
import { Database, Zap, User, Clock, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import GlowingCard from './ui/GlowingCard';
import CyberButton from './ui/CyberButton';

const CachingDemo = () => {
  const [status, setStatus] = useState('idle'); // idle, checking, hit, miss, loading-db, success
  const [cacheData, setCacheData] = useState(false); // Does cache have data?

  const fetchData = () => {
    setStatus('checking');
    
    setTimeout(() => {
      if (cacheData) {
        setStatus('hit');
        setTimeout(() => setStatus('success'), 1000);
      } else {
        setStatus('miss');
        setTimeout(() => {
          setStatus('loading-db');
          setTimeout(() => {
            setCacheData(true);
            setStatus('success');
          }, 1500); // DB is slow
        }, 1000);
      }
    }, 600); // Cache is fast
  };

  const clearCache = () => {
    setCacheData(false);
    setStatus('idle');
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
          <Zap size={16} />
          <span>Interactive Demo</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Bộ nhớ đệm <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-500">(Caching)</span></h2>
        
        <p className="text-slate-400 text-lg max-w-3xl">
          <strong>Cache</strong> là một lớp lưu trữ dữ liệu tạm thời (thường nằm trên RAM, ví dụ Redis/Memcached) giúp truy xuất dữ liệu cực nhanh so với việc đọc từ Cơ sở dữ liệu (Database - nằm trên ổ cứng).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlowingCard delay={0.1}>
          <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><CheckCircle2 size={18}/> Cache Hit</h3>
          <p className="text-slate-400 text-sm">Dữ liệu đã có trong Cache, trả về ngay lập tức. Tốc độ đọc siêu nhanh (chỉ tốn vài mili-giây).</p>
        </GlowingCard>
        <GlowingCard delay={0.2}>
          <h3 className="text-rose-400 font-bold mb-2 flex items-center gap-2"><XCircle size={18}/> Cache Miss</h3>
          <p className="text-slate-400 text-sm">Dữ liệu chưa có trong Cache. Phải vào Database lấy dữ liệu, sau đó lưu vào Cache cho lần sau (Tốn thời gian hơn).</p>
        </GlowingCard>
      </div>

      <GlowingCard delay={0.3} className="mt-8">
        <div className="relative bg-slate-950/50 rounded-xl border border-slate-800 p-8 flex flex-col items-center overflow-hidden">
          
          <div className="flex gap-4 mb-12">
            <CyberButton onClick={fetchData} disabled={status !== 'idle' && status !== 'success'} variant="primary">
              Mô phỏng Request
            </CyberButton>
            <CyberButton onClick={clearCache} variant="secondary">
              Xóa Cache
            </CyberButton>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-between w-full max-w-3xl gap-8 relative">
            
            {/* Client */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-indigo-500/50 flex items-center justify-center">
                <User size={32} className="text-indigo-400" />
              </div>
              <span className="text-slate-400 text-sm font-bold">Client</span>
            </div>

            {/* Connecting Line 1 */}
            <div className="hidden md:block absolute left-16 right-1/2 top-8 h-0.5 bg-slate-800 -z-10" />

            {/* Redis Cache */}
            <motion.div 
              animate={{
                borderColor: status === 'checking' ? 'rgb(99,102,241,0.8)' : status === 'hit' ? 'rgb(16,185,129,0.8)' : status === 'miss' ? 'rgb(225,29,72,0.8)' : 'rgb(51,65,85,1)',
                boxShadow: status === 'checking' ? '0 0 20px rgba(99,102,241,0.3)' : status === 'hit' ? '0 0 20px rgba(16,185,129,0.3)' : status === 'miss' ? '0 0 20px rgba(225,29,72,0.3)' : '0 0 0px rgba(0,0,0,0)',
                scale: status === 'checking' ? 1.05 : 1
              }}
              className="w-48 p-6 rounded-xl bg-slate-900 border-2 flex flex-col items-center text-center relative z-10 transition-colors duration-300"
            >
              {/* Status Popups */}
              {status === 'hit' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -20 }} className="absolute -top-6 bg-emerald-500 text-white text-xs font-bold px-2 py-1 rounded shadow-[0_0_10px_rgba(16,185,129,0.5)]">
                  CACHE HIT!
                </motion.div>
              )}
              {status === 'miss' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -20 }} className="absolute -top-6 bg-rose-500 text-white text-xs font-bold px-2 py-1 rounded shadow-[0_0_10px_rgba(225,29,72,0.5)]">
                  CACHE MISS!
                </motion.div>
              )}

              <Zap size={40} className={cacheData ? 'text-amber-400' : 'text-slate-600'} />
              <h4 className="font-bold text-slate-200 mt-3 mb-1">Redis Cache</h4>
              <p className="text-xs text-slate-400">
                Data: {cacheData ? <span className="text-emerald-400 font-bold">YES</span> : <span className="text-slate-600">EMPTY</span>}
              </p>
            </motion.div>

            {/* Connecting Line 2 */}
            <div className="hidden md:block absolute left-1/2 right-16 top-8 h-0.5 bg-slate-800 -z-10" />

            {/* Database */}
            <motion.div 
              animate={{
                borderColor: status === 'loading-db' ? 'rgb(99,102,241,0.8)' : 'rgb(51,65,85,1)',
                boxShadow: status === 'loading-db' ? '0 0 20px rgba(99,102,241,0.3)' : '0 0 0px rgba(0,0,0,0)'
              }}
              className="w-48 p-6 rounded-xl bg-slate-900 border-2 flex flex-col items-center text-center relative z-10 transition-colors duration-300"
            >
              {status === 'loading-db' && (
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: -20 }} className="absolute -top-6 bg-indigo-500 text-white text-xs font-bold px-2 py-1 rounded shadow-[0_0_10px_rgba(99,102,241,0.5)] flex items-center gap-1">
                  <Clock size={12} className="animate-spin" /> Querying...
                </motion.div>
              )}
              
              <Database size={40} className="text-indigo-500" />
              <h4 className="font-bold text-slate-200 mt-3 mb-1">Database</h4>
              <p className="text-xs text-slate-400">Disk Storage (Slow)</p>
            </motion.div>
          </div>

          <div className="mt-12 h-10 flex items-center justify-center">
            {status === 'success' && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${cacheData && status === 'hit' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/20 text-amber-400 border border-amber-500/30'}`}
              >
                <CheckCircle2 size={18} />
                Request Complete {cacheData && status === 'hit' ? '(Speed: Fast ⚡)' : '(Speed: Slow 🐢)'}
              </motion.div>
            )}
          </div>
          
        </div>
      </GlowingCard>
    </div>
  );
};

export default CachingDemo;
