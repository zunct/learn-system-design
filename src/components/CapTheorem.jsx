import React, { useState } from 'react';
import { Triangle, Info, Check, Activity, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowingCard from './ui/GlowingCard';

const CapTheorem = () => {
  const [selectedNodes, setSelectedNodes] = useState([]);

  const toggleNode = (node) => {
    if (selectedNodes.includes(node)) {
      setSelectedNodes(selectedNodes.filter(n => n !== node));
    } else {
      if (selectedNodes.length >= 2) {
        // Nếu đã chọn 2, thay thế node đầu tiên được chọn bằng node mới
        setSelectedNodes([selectedNodes[1], node]);
      } else {
        setSelectedNodes([...selectedNodes, node]);
      }
    }
  };

  const hasCA = selectedNodes.includes('C') && selectedNodes.includes('A');
  const hasCP = selectedNodes.includes('C') && selectedNodes.includes('P');
  const hasAP = selectedNodes.includes('A') && selectedNodes.includes('P');

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-sm font-medium mb-4">
          <Activity size={16} />
          <span>Interactive Demo</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Định lý CAP <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-rose-500">(CAP Theorem)</span></h2>
        
        <p className="text-slate-400 text-lg max-w-3xl">
          Định lý CAP phát biểu rằng: Một hệ thống cơ sở dữ liệu phân tán (distributed database) <strong>chỉ có thể đảm bảo tối đa 2 trong 3</strong> đặc tính.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlowingCard delay={0.1}>
          <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2"><Check size={18}/> Consistency</h3>
          <p className="text-slate-400 text-sm">Mọi node đều trả về cùng một dữ liệu mới nhất. Đọc ở đâu cũng ra kết quả giống nhau.</p>
        </GlowingCard>
        <GlowingCard delay={0.2}>
          <h3 className="text-emerald-400 font-bold mb-2 flex items-center gap-2"><Check size={18}/> Availability</h3>
          <p className="text-slate-400 text-sm">Mọi yêu cầu đều nhận được phản hồi (không bị lỗi), kể cả khi một số node đang sập.</p>
        </GlowingCard>
        <GlowingCard delay={0.3}>
          <h3 className="text-rose-400 font-bold mb-2 flex items-center gap-2"><Check size={18}/> Partition Tolerance</h3>
          <p className="text-slate-400 text-sm">Hệ thống vẫn tiếp tục hoạt động ngay cả khi mạng giữa các node bị đứt kết nối.</p>
        </GlowingCard>
      </div>

      <GlowingCard delay={0.4} className="mt-8">
        <div className="p-4 rounded-lg bg-amber-500/10 border border-amber-500/20 text-amber-300 text-sm text-center mb-12">
          <strong>💡 Tương tác:</strong> Hãy Click chọn 2 đỉnh bất kỳ trong tam giác bên dưới để xem hệ thống đang đánh đổi điều gì!
        </div>

        <div className="flex flex-col md:flex-row gap-12 items-center justify-center">
          
          {/* Interactive Triangle */}
          <div className="relative w-80 h-72 flex-shrink-0">
            {/* Lines connecting nodes */}
            <svg className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
              {/* CA Line */}
              <motion.line 
                x1="160" y1="40" x2="60" y2="240" 
                stroke={hasCA ? "#10b981" : "#334155"} 
                strokeWidth={hasCA ? "6" : "2"}
                animate={{ strokeWidth: hasCA ? 6 : 2, stroke: hasCA ? "#10b981" : "#334155" }}
              />
              {/* CP Line */}
              <motion.line 
                x1="160" y1="40" x2="260" y2="240" 
                stroke={hasCP ? "#3b82f6" : "#334155"} 
                strokeWidth={hasCP ? "6" : "2"}
                animate={{ strokeWidth: hasCP ? 6 : 2, stroke: hasCP ? "#3b82f6" : "#334155" }}
              />
              {/* AP Line */}
              <motion.line 
                x1="60" y1="240" x2="260" y2="240" 
                stroke={hasAP ? "#f43f5e" : "#334155"} 
                strokeWidth={hasAP ? "6" : "2"}
                animate={{ strokeWidth: hasAP ? 6 : 2, stroke: hasAP ? "#f43f5e" : "#334155" }}
              />
            </svg>

            {/* C Node (Top) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleNode('C')}
              className={`absolute top-0 left-1/2 -ml-12 w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-lg transition-colors z-10 border-2
                ${selectedNodes.includes('C') 
                  ? 'bg-blue-600 text-white border-blue-400 shadow-[0_0_20px_rgba(37,99,235,0.6)]' 
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-blue-500'}`}
            >
              <span className="text-lg">C</span>
              <span>Consistency</span>
            </motion.button>

            {/* A Node (Bottom Left) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleNode('A')}
              className={`absolute bottom-0 left-0 w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-lg transition-colors z-10 border-2
                ${selectedNodes.includes('A') 
                  ? 'bg-emerald-600 text-white border-emerald-400 shadow-[0_0_20px_rgba(5,150,105,0.6)]' 
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-emerald-500'}`}
            >
              <span className="text-lg">A</span>
              <span>Availability</span>
            </motion.button>

            {/* P Node (Bottom Right) */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => toggleNode('P')}
              className={`absolute bottom-0 right-0 w-24 h-24 rounded-full flex flex-col items-center justify-center font-bold text-xs shadow-lg transition-colors z-10 border-2
                ${selectedNodes.includes('P') 
                  ? 'bg-rose-600 text-white border-rose-400 shadow-[0_0_20px_rgba(225,29,72,0.6)]' 
                  : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-rose-500'}`}
            >
              <span className="text-lg">P</span>
              <span>Partition</span>
            </motion.button>
          </div>

          {/* Analysis Panel */}
          <div className="flex-1 w-full bg-slate-900/50 rounded-xl border border-slate-800 p-6 min-h-[220px] flex items-center justify-center relative overflow-hidden">
            <AnimatePresence mode="wait">
              {hasCA && (
                <motion.div 
                  key="ca"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="w-full"
                >
                  <h4 className="text-emerald-400 font-bold text-xl mb-3 flex items-center gap-2">CA <span className="text-slate-400 text-sm font-normal">(Nhất quán + Khả dụng)</span></h4>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Hệ thống có dữ liệu đồng nhất và luôn sẵn sàng, <strong className="text-rose-400">NHƯNG không thể chống chịu đứt mạng.</strong> Trong thế giới mạng thực tế (luôn có rủi ro đứt mạng), hệ thống CA phân tán không thực sự tồn tại. RDBMS truyền thống (đơn server) thường thuộc nhóm này.
                  </p>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-400 text-sm">
                    <strong>Ví dụ:</strong> PostgreSQL, MySQL (Single Node), Oracle.
                  </div>
                </motion.div>
              )}

              {hasCP && (
                <motion.div 
                  key="cp"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="w-full"
                >
                  <h4 className="text-blue-400 font-bold text-xl mb-3 flex items-center gap-2">CP <span className="text-slate-400 text-sm font-normal">(Nhất quán + Chống cắt mạng)</span></h4>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Hệ thống ưu tiên tính chính xác. Nếu mạng giữa các node bị đứt, hệ thống thà <strong className="text-rose-400">từ chối phục vụ (hy sinh Availability)</strong> thay vì trả về dữ liệu cũ không nhất quán. Rất phù hợp cho hệ thống tài chính, ngân hàng, thanh toán.
                  </p>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-400 text-sm">
                    <strong>Ví dụ:</strong> MongoDB, Redis, Etcd, HBase.
                  </div>
                </motion.div>
              )}

              {hasAP && (
                <motion.div 
                  key="ap"
                  initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  className="w-full"
                >
                  <h4 className="text-rose-400 font-bold text-xl mb-3 flex items-center gap-2">AP <span className="text-slate-400 text-sm font-normal">(Khả dụng + Chống cắt mạng)</span></h4>
                  <p className="text-slate-300 text-sm leading-relaxed mb-4">
                    Hệ thống ưu tiên luôn phục vụ user. Nếu mạng bị đứt, nó <strong className="text-amber-400">chấp nhận trả về dữ liệu cũ (hy sinh Consistency)</strong>, và sẽ đồng bộ lại sau (Eventual Consistency). Phù hợp mạng xã hội, hệ thống giỏ hàng, feed.
                  </p>
                  <div className="bg-slate-950 p-3 rounded border border-slate-800 text-slate-400 text-sm">
                    <strong>Ví dụ:</strong> Cassandra, DynamoDB, CouchDB, Riak.
                  </div>
                </motion.div>
              )}

              {selectedNodes.length < 2 && (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="text-slate-500 flex flex-col items-center justify-center gap-2"
                >
                  <Triangle size={48} className="opacity-20" />
                  <p>Vui lòng chọn 2 đỉnh để xem phân tích.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </GlowingCard>

      {/* PACELC Theorem Section */}
      <GlowingCard delay={0.6}>
        <div className="flex items-start gap-4">
          <div className="p-3 bg-fuchsia-500/10 rounded-lg text-fuchsia-400 mt-1">
            <Layers size={24} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white mb-2">Định lý PACELC (Mở rộng của CAP)</h3>
            <p className="text-slate-300 text-sm mb-4 leading-relaxed">
              Trong thực tế, "Partition" (đứt mạng) hiếm khi xảy ra. Vậy khi hệ thống hoạt động bình thường, ta đánh đổi điều gì? 
              Định lý PACELC giải quyết thiếu sót này của CAP:
            </p>
            
            <div className="bg-slate-900/50 border border-slate-800 rounded-lg p-4 font-mono text-sm mb-4 leading-loose">
              <span className="text-rose-400 font-bold">If (P)</span>artition <span className="text-slate-500">➜</span> <span className="text-emerald-400 font-bold">(A)</span>vailability <span className="text-slate-500">or</span> <span className="text-blue-400 font-bold">(C)</span>onsistency
              <br/>
              <span className="text-slate-500 font-bold">Else</span> <span className="text-fuchsia-400 font-bold">(E)</span> <span className="text-slate-500">➜</span> <span className="text-amber-400 font-bold">(L)</span>atency <span className="text-slate-500">or</span> <span className="text-blue-400 font-bold">(C)</span>onsistency
            </div>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex gap-2">
                <Info size={16} className="text-fuchsia-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Khi đứt mạng (P):</strong> Đánh đổi giữa Khả dụng (A) và Nhất quán (C) - <em>Giống CAP</em>.
                </span>
              </li>
              <li className="flex gap-2">
                <Info size={16} className="text-fuchsia-400 shrink-0 mt-0.5" />
                <span>
                  <strong>Khi hoạt động bình thường (E):</strong> Đánh đổi giữa Độ trễ (L - Latency) và Nhất quán (C - Consistency). 
                  Bạn muốn đọc dữ liệu nhanh nhất có thể (L), hay bạn muốn chờ để đảm bảo đọc được dữ liệu mới nhất (C)?
                </span>
              </li>
            </ul>

            <div className="mt-5 text-sm text-slate-300 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
              <strong className="text-white block mb-2">Ví dụ thực tế:</strong>
              <ul className="space-y-2">
                <li><span className="text-blue-400">MongoDB / HBase:</span> <strong>PA/EC</strong> (Khi đứt mạng chọn A, bình thường chọn C)</li>
                <li><span className="text-amber-400">DynamoDB / Cassandra:</span> <strong>PA/EL</strong> (Khi đứt mạng chọn A, bình thường chọn L)</li>
                <li><span className="text-emerald-400">VoltDB / MySQL Cluster:</span> <strong>PC/EC</strong> (Luôn ưu tiên Consistency)</li>
              </ul>
            </div>
          </div>
        </div>
      </GlowingCard>
    </div>
  );
};

export default CapTheorem;
