import React from 'react';
import { Hash, Triangle, Layers, Infinity as InfinityIcon } from 'lucide-react';
import { motion } from 'framer-motion';
import GlowingCard from '../ui/GlowingCard';

const IdGeneratorCaseStudy = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-purple-500/20 rounded-lg">
            <Hash className="text-purple-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Hệ thống tạo ID phân tán (Snowflake)</h1>
        </div>
        <p className="text-slate-400 text-lg mt-4 max-w-3xl">
          Khi hệ thống scale ngang ra hàng chục Database Servers, hàm Auto-increment ID của SQL không còn hoạt động. Làm sao để tạo ra hàng triệu ID duy nhất, có thể sắp xếp theo thời gian mà không bị trùng lặp trên môi trường phân tán?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <InfinityIcon className="text-purple-400" size={20} /> Vấn đề Auto-increment
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• ID tăng tự động (1,2,3...) sẽ bị trùng nếu dùng nhiều DB server cùng lúc.</li>
            <li>• UUID thì lại quá dài (128-bit), không thể sắp xếp theo thời gian (k-sortable), làm chậm index của Database.</li>
          </ul>
        </GlowingCard>

        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Layers className="text-indigo-400" size={20} /> Giải pháp Twitter Snowflake
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• Tạo ID 64-bit chứa: Thời gian (Timestamp) + Datacenter ID + Machine ID + Sequence.</li>
            <li>• ID được sinh ra hoàn toàn độc lập ở từng server mà không cần phải kết nối đến một Database trung tâm để hỏi.</li>
          </ul>
        </GlowingCard>
      </div>

      {/* Sơ đồ Bit Snowflake */}
      <GlowingCard delay={0.3} className="mt-8">
        <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
          <Layers className="text-purple-400" size={24} /> 
          Cấu trúc 64-bit của Snowflake ID
        </h2>
        <div className="bg-slate-950/50 border border-slate-800 rounded-xl p-6 overflow-x-auto shadow-lg shadow-purple-500/5 relative">
          
          <div className="flex min-w-[700px] mb-6 text-center text-sm font-mono font-bold relative z-10 gap-1">
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="flex-shrink-0 w-[5%] bg-slate-800 text-slate-400 p-4 rounded-lg shadow-inner border border-slate-700 relative overflow-hidden flex items-center justify-center"
            >
              1
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="flex-shrink-0 w-[55%] bg-purple-500/20 text-purple-300 p-4 rounded-lg shadow-inner border border-purple-500/30 relative overflow-hidden group flex items-center justify-center"
            >
              <motion.div 
                animate={{ x: ['-100%', '100%'] }} 
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-purple-500/20 to-transparent"
              />
              41 bit
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex-shrink-0 w-[15%] bg-indigo-500/20 text-indigo-300 p-4 rounded-lg shadow-inner border border-indigo-500/30 relative overflow-hidden flex items-center justify-center"
            >
              <motion.div 
                animate={{ x: ['-100%', '100%'] }} 
                transition={{ duration: 2, repeat: Infinity, ease: 'linear', delay: 1 }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-500/20 to-transparent"
              />
              10 bit
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex-shrink-0 w-[25%] bg-emerald-500/20 text-emerald-300 p-4 rounded-lg shadow-inner border border-emerald-500/30 relative overflow-hidden flex items-center justify-center"
            >
              <motion.div 
                animate={{ y: ['-100%', '100%'] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: 'linear', delay: 0.5 }}
                className="absolute inset-0 bg-gradient-to-b from-transparent via-emerald-500/20 to-transparent"
              />
              12 bit
            </motion.div>
          </div>

          <div className="flex min-w-[700px] text-center text-sm text-slate-300 gap-1">
            <div className="flex-shrink-0 w-[5%] px-1">
              <span className="font-bold text-slate-300">Sign</span><br/>
              <span className="text-[10px] lg:text-xs text-slate-500">Luôn 0</span>
            </div>
            <div className="flex-shrink-0 w-[55%] px-2">
              <span className="font-bold text-purple-400">Timestamp (Epoch)</span><br/>
              <span className="text-[10px] lg:text-xs text-purple-400/70">~69 năm tới (mili-giây)</span>
            </div>
            <div className="flex-shrink-0 w-[15%] px-2">
              <span className="font-bold text-indigo-400">Machine ID</span><br/>
              <span className="text-[10px] lg:text-xs text-indigo-400/70">Max 1024 máy</span>
            </div>
            <div className="flex-shrink-0 w-[25%] px-2">
              <span className="font-bold text-emerald-400">Sequence</span><br/>
              <span className="text-[10px] lg:text-xs text-emerald-400/70">4096 ID/ms/máy</span>
            </div>
          </div>
          
        </div>
      </GlowingCard>

      {/* Code Snippet */}
      <div className="mt-8">
        <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
          <Hash className="text-emerald-400" size={24} /> 
          Triển khai mã giả (TypeScript)
        </h2>
        <div className="bg-slate-950/80 rounded-xl border border-slate-800 p-6 overflow-x-auto shadow-xl shadow-black">
          <pre className="text-sm font-mono leading-relaxed">
            <code className="text-slate-300">
<span className="text-fuchsia-400">class</span> <span className="text-amber-300">SnowflakeGenerator</span> {'{'}
  <span className="text-fuchsia-400">private</span> workerId<span className="text-slate-400">:</span> <span className="text-emerald-300">bigint</span>;
  <span className="text-fuchsia-400">private</span> sequence<span className="text-slate-400">:</span> <span className="text-emerald-300">bigint</span> <span className="text-fuchsia-400">=</span> <span className="text-orange-400">0n</span>;
  <span className="text-fuchsia-400">private</span> lastTimestamp<span className="text-slate-400">:</span> <span className="text-emerald-300">bigint</span> <span className="text-fuchsia-400">=</span> <span className="text-orange-400">-1n</span>;

  <span className="text-slate-500">// Custom Epoch (Ví dụ: 2024-01-01)</span>
  <span className="text-fuchsia-400">private readonly</span> twepoch <span className="text-fuchsia-400">=</span> <span className="text-orange-400">1704067200000n</span>; 
  <span className="text-fuchsia-400">private readonly</span> workerIdBits <span className="text-fuchsia-400">=</span> <span className="text-orange-400">10n</span>;
  <span className="text-fuchsia-400">private readonly</span> sequenceBits <span className="text-fuchsia-400">=</span> <span className="text-orange-400">12n</span>;

  <span className="text-fuchsia-400">private readonly</span> sequenceMask <span className="text-fuchsia-400">=</span> <span className="text-orange-400">-1n</span> <span className="text-fuchsia-400">^</span> (<span className="text-orange-400">-1n</span> <span className="text-fuchsia-400">&lt;&lt;</span> <span className="text-indigo-400">this</span>.sequenceBits);

  <span className="text-fuchsia-400">public</span> <span className="text-blue-400">nextId</span>()<span className="text-slate-400">:</span> <span className="text-emerald-300">bigint</span> {'{'}
    <span className="text-fuchsia-400">let</span> timestamp <span className="text-fuchsia-400">=</span> <span className="text-amber-300">BigInt</span>(<span className="text-amber-300">Date</span>.<span className="text-blue-400">now</span>());

    <span className="text-fuchsia-400">if</span> (timestamp <span className="text-fuchsia-400">===</span> <span className="text-indigo-400">this</span>.lastTimestamp) {'{'}
      <span className="text-indigo-400">this</span>.sequence <span className="text-fuchsia-400">=</span> (<span className="text-indigo-400">this</span>.sequence <span className="text-fuchsia-400">+</span> <span className="text-orange-400">1n</span>) <span className="text-fuchsia-400">&</span> <span className="text-indigo-400">this</span>.sequenceMask;
      <span className="text-fuchsia-400">if</span> (<span className="text-indigo-400">this</span>.sequence <span className="text-fuchsia-400">===</span> <span className="text-orange-400">0n</span>) {'{'}
        <span className="text-slate-500">// Vượt quá 4096 ID/ms, chờ ms tiếp theo</span>
        <span className="text-fuchsia-400">while</span> (timestamp <span className="text-fuchsia-400">&lt;=</span> <span className="text-indigo-400">this</span>.lastTimestamp) timestamp <span className="text-fuchsia-400">=</span> <span className="text-amber-300">BigInt</span>(<span className="text-amber-300">Date</span>.<span className="text-blue-400">now</span>());
      {'}'}
    {'}'} <span className="text-fuchsia-400">else</span> {'{'}
      <span className="text-indigo-400">this</span>.sequence <span className="text-fuchsia-400">=</span> <span className="text-orange-400">0n</span>;
    {'}'}

    <span className="text-indigo-400">this</span>.lastTimestamp <span className="text-fuchsia-400">=</span> timestamp;

    <span className="text-slate-500">// Bitwise shift để ghép thành số 64-bit hoàn chỉnh</span>
    <span className="text-fuchsia-400">return</span> ((timestamp <span className="text-fuchsia-400">-</span> <span className="text-indigo-400">this</span>.twepoch) <span className="text-fuchsia-400">&lt;&lt;</span> <span className="text-orange-400">22n</span>) <span className="text-fuchsia-400">|</span>
           (<span className="text-indigo-400">this</span>.workerId <span className="text-fuchsia-400">&lt;&lt;</span> <span className="text-orange-400">12n</span>) <span className="text-fuchsia-400">|</span>
           <span className="text-indigo-400">this</span>.sequence;
  {'}'}
{'}'}
            </code>
          </pre>
        </div>
      </div>

      {/* Đánh giá & Tại sao */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden mt-8">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Triangle size={100} />
        </div>
        <h2 className="text-xl font-bold text-slate-200 mb-6 relative z-10">Liên hệ bài học & Giải thích (Tại sao?)</h2>
        
        <div className="space-y-6 relative z-10">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-emerald-400 mb-2">1. Tại sao UUID làm chậm hiệu năng Database (B-Tree Index)? (Chương 3)</h4>
            <p className="text-sm text-slate-300">
              Các RDBMS (như MySQL/PostgreSQL) lưu trữ Index dưới dạng B-Tree. Khi Insert một giá trị có tính tăng dần (như Auto-increment), nó chỉ việc ghi nối vào cuối Node cực nhanh. Nhưng <strong>UUID là chuỗi ngẫu nhiên</strong>, khi Insert, B-Tree phải chia tách Node (Node splitting) liên tục để chèn giá trị vào giữa, tạo ra hàng loạt tác vụ đọc/ghi đĩa (Disk I/O), làm tốc độ hệ thống rớt thê thảm.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-indigo-400 mb-2">2. Tại sao Snowflake ID lại có thể sắp xếp được (K-sortable)? (Chương 5)</h4>
            <p className="text-sm text-slate-300">
              Thuật toán Snowflake dành 41-bit đầu tiên để chứa <strong>Timestamp (Thời gian theo mili-giây)</strong>. Do các bit mang giá trị thời gian nằm ở phần đầu của dãy số, nên khi so sánh hai số ID, số nào sinh ra sau chắc chắn sẽ lớn hơn số sinh ra trước. Điều này giữ lại được đặc tính "Tăng dần" cho B-Tree Database.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-amber-400 mb-2">3. Tại sao không dùng 1 Ticket Server (Redis) để cấp phát ID? (Chương 4)</h4>
            <p className="text-sm text-slate-300">
              Nếu dùng 1 cụm Redis có tính năng INCR để cấp phát ID (Ticket Server), ta lại biến Redis thành một <strong>Single Point of Failure (SPOF)</strong>. Nếu Redis chết, toàn bộ hệ thống tê liệt không tạo được bản ghi mới. Mặc dù Redis rất nhanh, nhưng trong kiến trúc Microservices hiện đại, ưu tiên việc phi tập trung (Decentralized) như thuật toán Snowflake (máy nào tự sinh ID máy đó).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default IdGeneratorCaseStudy;
