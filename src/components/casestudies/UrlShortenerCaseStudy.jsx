import React, { useState } from 'react';
import { Link2, Database, Globe, Hash, Zap, Clock, ShieldCheck, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowingCard from '../ui/GlowingCard';
import CyberButton from '../ui/CyberButton';

const UrlShortenerCaseStudy = () => {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [step, setStep] = useState(0); // 0: input, 1: hashing, 2: saving, 3: done
  const [isAnimating, setIsAnimating] = useState(false);

  const handleShorten = () => {
    if (!url || isAnimating) return;
    setIsAnimating(true);
    setStep(1); // Start hashing

    setTimeout(() => {
      setStep(2); // Saving to DB
      
      // Generate a fake short hash
      const hash = Math.random().toString(36).substring(2, 8);
      
      setTimeout(() => {
        setShortUrl(`https://tiny.vn/${hash}`);
        setStep(3); // Done
        setIsAnimating(false);
      }, 1500);
    }, 1500);
  };

  const reset = () => {
    setUrl('');
    setShortUrl('');
    setStep(0);
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-fuchsia-500/10 border border-fuchsia-500/20 text-fuchsia-400 text-sm font-medium mb-4">
          <Link2 size={16} />
          <span>Case Study</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Thiết kế hệ thống <span className="text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-indigo-500">URL Shortener</span></h2>
        
        <p className="text-slate-400 text-lg max-w-3xl">
          Ví dụ kinh điển trong phỏng vấn System Design: Thiết kế một dịch vụ rút gọn link (như bit.ly hoặc tinyurl).
        </p>
      </div>

      {/* Yêu cầu hệ thống */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlowingCard delay={0.1}>
          <h3 className="text-fuchsia-400 font-bold mb-3 flex items-center gap-2"><TargetIcon /> Yêu cầu chức năng</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-fuchsia-500 shrink-0 mt-0.5" /> Cho một URL dài, trả về một URL ngắn.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-fuchsia-500 shrink-0 mt-0.5" /> Khi truy cập URL ngắn, hệ thống tự động redirect về URL dài ban đầu.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-fuchsia-500 shrink-0 mt-0.5" /> (Mở rộng) Tracking số lượt click.</li>
          </ul>
        </GlowingCard>

        <GlowingCard delay={0.2}>
          <h3 className="text-indigo-400 font-bold mb-3 flex items-center gap-2"><SpeedIcon /> Yêu cầu phi chức năng</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-indigo-500 shrink-0 mt-0.5" /> <strong>Tính khả dụng cao:</strong> Nếu hệ thống sập, mọi link ngắn sẽ chết.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-indigo-500 shrink-0 mt-0.5" /> <strong>Độ trễ thấp:</strong> Redirect phải diễn ra cực kỳ nhanh.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-indigo-500 shrink-0 mt-0.5" /> <strong>Đọc nhiều hơn Ghi:</strong> Tỷ lệ Đọc:Ghi thường là 100:1.</li>
          </ul>
        </GlowingCard>
      </div>

      {/* Interactive Architecture Flow */}
      <GlowingCard delay={0.3} className="mt-8">
        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">Mô phỏng luồng hoạt động (Write Path)</h3>
        
        <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-6 flex flex-col lg:flex-row items-center gap-8 relative overflow-hidden min-h-[300px]">
          
          {/* Input Form */}
          <div className="w-full lg:w-1/3 z-10">
            <div className="bg-slate-900 border border-slate-700 p-4 rounded-lg shadow-lg">
              <label className="block text-xs font-bold text-slate-400 mb-2 uppercase tracking-wide">Original URL</label>
              <input 
                type="text" 
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very/long/url..."
                className="w-full bg-slate-950 border border-slate-700 rounded p-2 text-white mb-4 focus:outline-none focus:border-fuchsia-500 transition-colors"
                disabled={isAnimating || step === 3}
              />
              
              {step === 3 ? (
                <CyberButton onClick={reset} variant="secondary" className="w-full">
                  Làm lại
                </CyberButton>
              ) : (
                <CyberButton 
                  onClick={handleShorten} 
                  variant="primary" 
                  disabled={!url || isAnimating} 
                  className="w-full"
                >
                  Rút gọn Link
                </CyberButton>
              )}
            </div>
          </div>

          {/* Visual Flow */}
          <div className="flex-1 flex justify-between items-center w-full relative z-10 px-4">
            
            {/* Base62 Hash Generator */}
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{
                  borderColor: step === 1 ? 'rgb(217,70,239,0.8)' : 'rgb(51,65,85,1)',
                  boxShadow: step === 1 ? '0 0 20px rgba(217,70,239,0.3)' : '0 0 0px rgba(0,0,0,0)'
                }}
                className="w-20 h-20 bg-slate-900 border-2 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden"
              >
                {step === 1 && <div className="absolute inset-0 bg-fuchsia-500/10 animate-pulse" />}
                <Hash size={32} className={step === 1 ? 'text-fuchsia-400' : 'text-slate-500'} />
              </motion.div>
              <span className={`text-xs font-bold mt-2 ${step === 1 ? 'text-fuchsia-400' : 'text-slate-500'}`}>Base62 Hash</span>
            </div>

            {/* Connecting Line 1 */}
            <div className="flex-1 h-0.5 bg-slate-800 relative mx-4">
               {step === 1 && <motion.div initial={{ x: 0 }} animate={{ x: "100%" }} transition={{ duration: 1.5 }} className="absolute top-1/2 -mt-1 w-2 h-2 bg-fuchsia-500 rounded-full shadow-[0_0_10px_rgba(217,70,239,0.8)]" />}
            </div>

            {/* Database */}
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{
                  borderColor: step === 2 ? 'rgb(99,102,241,0.8)' : 'rgb(51,65,85,1)',
                  boxShadow: step === 2 ? '0 0 20px rgba(99,102,241,0.3)' : '0 0 0px rgba(0,0,0,0)'
                }}
                className="w-20 h-20 bg-slate-900 border-2 rounded-xl flex items-center justify-center transition-all duration-300 relative overflow-hidden"
              >
                {step === 2 && <div className="absolute inset-0 bg-indigo-500/10 animate-pulse" />}
                <Database size={32} className={step === 2 ? 'text-indigo-400' : 'text-slate-500'} />
              </motion.div>
              <span className={`text-xs font-bold mt-2 ${step === 2 ? 'text-indigo-400' : 'text-slate-500'}`}>Database</span>
            </div>

            {/* Connecting Line 2 */}
            <div className="flex-1 h-0.5 bg-slate-800 relative mx-4">
               {step === 2 && <motion.div initial={{ x: 0 }} animate={{ x: "100%" }} transition={{ duration: 1.5 }} className="absolute top-1/2 -mt-1 w-2 h-2 bg-indigo-500 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.8)]" />}
            </div>

            {/* Result */}
            <div className="flex flex-col items-center">
              <motion.div 
                animate={{
                  borderColor: step === 3 ? 'rgb(16,185,129,0.8)' : 'rgb(51,65,85,1)',
                  boxShadow: step === 3 ? '0 0 20px rgba(16,185,129,0.3)' : '0 0 0px rgba(0,0,0,0)'
                }}
                className="w-20 h-20 bg-slate-900 border-2 rounded-xl flex items-center justify-center transition-all duration-300"
              >
                <Globe size={32} className={step === 3 ? 'text-emerald-400' : 'text-slate-500'} />
              </motion.div>
              <span className={`text-xs font-bold mt-2 ${step === 3 ? 'text-emerald-400' : 'text-slate-500'}`}>Short URL</span>
            </div>
            
          </div>

          {/* Result Output */}
          <AnimatePresence>
            {step === 3 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-emerald-500/10 border border-emerald-500/30 px-6 py-3 rounded-lg text-emerald-400 font-mono font-bold shadow-[0_0_15px_rgba(16,185,129,0.2)]"
              >
                {shortUrl}
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </GlowingCard>

      {/* Kiến trúc sâu hơn (Tech details) */}
      <div className="space-y-6 mt-8">
        
        {/* Thuật toán Base62 */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-fuchsia-500/5">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Hash className="text-fuchsia-400" size={24} />
            1. Thuật toán Base62 Encoding
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Để rút gọn URL ngắn nhất có thể, ta chuyển đổi một ID tự tăng (hoặc ID Snowflake) thành hệ cơ số 62 (a-z, A-Z, 0-9). Ví dụ: ID <code>1000000</code> chuyển thành <code>4c92</code>. Với 7 ký tự Base62, có thể tạo <code>62^7 ≈ 3.5 nghìn tỷ</code> URL.
          </p>
          <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-800">
<pre>
<code className="text-slate-300">{"\n"}
<span className="text-fuchsia-400">const</span> BASE62 <span className="text-fuchsia-400">=</span> <span className="text-emerald-300">"0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"</span>;<br/><br/>{"\n"}
<span className="text-fuchsia-400">function</span> <span className="text-blue-400">encodeIdToBase62</span>(id) {'{'}<br/>{"\n"}
&nbsp;&nbsp;<span className="text-fuchsia-400">let</span> shortUrl <span className="text-fuchsia-400">=</span> <span className="text-emerald-300">""</span>;<br/>{"\n"}
&nbsp;&nbsp;<span className="text-fuchsia-400">while</span> (id <span className="text-fuchsia-400">&gt;</span> <span className="text-orange-400">0</span>) {'{'}<br/>{"\n"}
&nbsp;&nbsp;&nbsp;&nbsp;shortUrl <span className="text-fuchsia-400">=</span> BASE62[id <span className="text-fuchsia-400">%</span> <span className="text-orange-400">62</span>] <span className="text-fuchsia-400">+</span> shortUrl;<br/>{"\n"}
&nbsp;&nbsp;&nbsp;&nbsp;id <span className="text-fuchsia-400">=</span> <span className="text-amber-300">Math</span>.<span className="text-blue-400">floor</span>(id <span className="text-fuchsia-400">/</span> <span className="text-orange-400">62</span>);<br/>{"\n"}
&nbsp;&nbsp;{'}'}<br/>{"\n"}
&nbsp;&nbsp;<span className="text-fuchsia-400">return</span> shortUrl;<br/>{"\n"}
{'}'}<br/>{"\n"}
</code>{"\n"}
</pre>
          </div>
        </div>

        {/* Database & Caching Schema */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-indigo-500/5">
            <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Database className="text-indigo-400" size={24} />
              2. NoSQL Database Schema
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              Sử dụng DynamoDB hoặc MongoDB (hướng Document/Key-Value) vì dữ liệu không có tính quan hệ, đọc cực nhanh và cực dễ scale ngang (Horizontal Scaling).
            </p>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm border border-slate-800 text-indigo-300">
<pre>
{`{{"\n"}
  "short_url": "4c92",      // Partition Key{"\n"}
  "long_url": "https://...",{"\n"}
  "created_at": 1714521000,{"\n"}
  "user_id": "usr_99",{"\n"}
  "click_count": 150{"\n"}
}`}{"\n"}
</pre>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-emerald-500/5">
            <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
              <Zap className="text-emerald-400" size={24} />
              3. Redis Cache Policy
            </h2>
            <p className="text-sm text-slate-400 mb-4">
              Áp dụng thuật toán <strong>LRU (Least Recently Used)</strong>. Các link được truy cập nhiều nhất sẽ được giữ lại ở Cache.
            </p>
            <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-800">
<pre>
<code className="text-slate-300">{"\n"}
<span className="text-slate-500">// Cache Miss -{'>'} Query DB -{'>'} Set Cache</span><br/>{"\n"}
<span className="text-fuchsia-400">const</span> longUrl = <span className="text-fuchsia-400">await</span> redis.<span className="text-blue-400">get</span>(<span className="text-emerald-300">`url:${'{shortUrl}'}`</span>);<br/>{"\n"}
<br/>{"\n"}
<span className="text-fuchsia-400">if</span> (!longUrl) {'{'}<br/>{"\n"}
&nbsp;&nbsp;<span className="text-fuchsia-400">const</span> dbRecord = <span className="text-fuchsia-400">await</span> db.<span className="text-blue-400">findOne</span>({'{'} shortUrl {'}'});<br/>{"\n"}
&nbsp;&nbsp;<span className="text-slate-500">// Cache 24h</span><br/>{"\n"}
&nbsp;&nbsp;<span className="text-fuchsia-400">await</span> redis.<span className="text-blue-400">setex</span>(<span className="text-emerald-300">\`url:\${shortUrl}\`</span>, <span className="text-orange-400">86400</span>, dbRecord.longUrl);<br/>{"\n"}
&nbsp;&nbsp;<span className="text-fuchsia-400">return</span> dbRecord.longUrl;<br/>{"\n"}
{'}'}<br/>{"\n"}
</code>{"\n"}
</pre>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};

// Helper icons
const TargetIcon = () => <ShieldCheck className="text-fuchsia-500" size={20} />;
const SpeedIcon = () => <Clock className="text-indigo-500" size={20} />;

export default UrlShortenerCaseStudy;
