import React, { useState, useEffect } from 'react';
import { Send, FileText, Server, Cpu, Activity, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowingCard from './ui/GlowingCard';
import CyberButton from './ui/CyberButton';

const MessageQueueDemo = () => {
  const [queue, setQueue] = useState([]);
  const [processed, setProcessed] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);

  // Producer
  const publishMessage = () => {
    const newMsg = { id: Date.now(), text: `Task ${queue.length + processed + 1}` };
    setQueue(prev => [...prev, newMsg]);
  };

  // Consumer worker
  useEffect(() => {
    if (queue.length > 0 && !isProcessing) {
      const syncTimer = setTimeout(() => setIsProcessing(true), 0);
      // Giả lập worker xử lý task tốn thời gian (1.5 giây/task)
      const timer = setTimeout(() => {
        setQueue(prev => prev.slice(1));
        setProcessed(p => p + 1);
        setIsProcessing(false);
      }, 1500);
      
      return () => {
        clearTimeout(syncTimer);
        clearTimeout(timer);
      };
    }
  }, [queue.length, isProcessing]);

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
          <Activity size={16} />
          <span>Interactive Demo</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Hàng đợi tin nhắn <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500">(Message Queue)</span></h2>
        
        <p className="text-slate-400 text-lg max-w-3xl">
          <strong>Message Queue (như Kafka, RabbitMQ)</strong> cho phép các dịch vụ giao tiếp với nhau một cách <strong>bất đồng bộ (Asynchronous)</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlowingCard delay={0.1}>
          <h3 className="text-indigo-400 font-bold mb-2 flex items-center gap-2">Producer</h3>
          <p className="text-slate-400 text-sm">Đẩy công việc/tin nhắn vào hàng đợi và phản hồi ngay cho User (Không cần chờ xử lý xong).</p>
        </GlowingCard>
        <GlowingCard delay={0.2}>
          <h3 className="text-blue-400 font-bold mb-2 flex items-center gap-2">Queue (Broker)</h3>
          <p className="text-slate-400 text-sm">Lưu trữ các tin nhắn một cách an toàn cho đến khi Consumer lấy ra xử lý.</p>
        </GlowingCard>
        <GlowingCard delay={0.3}>
          <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2">Consumer (Worker)</h3>
          <p className="text-slate-400 text-sm">Lấy công việc từ hàng đợi ra xử lý từ từ theo tốc độ của nó.</p>
        </GlowingCard>
      </div>

      <GlowingCard delay={0.4} className="mt-8">
        <div className="relative bg-slate-950/50 rounded-xl border border-slate-800 p-8 flex flex-col items-center overflow-hidden">
          
          <div className="mb-12">
            <CyberButton onClick={publishMessage} variant="primary">
              <Send size={18} /> Push Task (Producer)
            </CyberButton>
          </div>

          <div className="flex flex-col md:flex-row w-full justify-between items-center gap-8 relative max-w-4xl mx-auto">
            
            {/* Web Server / Producer */}
            <div className="flex flex-col items-center w-32 relative z-10">
              <div className="w-24 h-24 bg-slate-900 border-2 border-indigo-500/50 rounded-xl flex flex-col items-center justify-center text-indigo-400 shadow-[0_0_20px_rgba(99,102,241,0.2)]">
                <Server size={32} className="mb-2" />
                <span className="text-xs font-bold">API Server</span>
              </div>
            </div>

            {/* Queue */}
            <div className="flex-1 w-full relative z-10 mx-4">
              <div className="h-20 bg-slate-900/80 border-y-2 border-x-2 border-blue-500/30 rounded-full flex items-center px-4 gap-2 overflow-hidden relative shadow-[inset_0_0_20px_rgba(59,130,246,0.1)]">
                {/* Flow animation */}
                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(59,130,246,0.1)_50%,transparent_100%)] w-[200%] animate-[slideRight_3s_linear_infinite]" />
                
                <AnimatePresence mode="popLayout">
                  {queue.map((msg) => (
                    <motion.div 
                      key={msg.id}
                      layout
                      initial={{ opacity: 0, scale: 0.5, x: -50 }}
                      animate={{ opacity: 1, scale: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.5, y: 50 }}
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                      className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold shadow-[0_0_15px_rgba(37,99,235,0.6)] shrink-0 z-10"
                    >
                      <FileText size={18} />
                    </motion.div>
                  ))}
                </AnimatePresence>
                
                {queue.length === 0 && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-slate-500 text-sm font-medium tracking-widest uppercase">Queue is Empty</span>
                  </div>
                )}
              </div>
              <div className="text-center mt-2 text-xs text-blue-400 font-bold uppercase tracking-widest">Message Broker</div>
            </div>

            {/* Consumer / Worker */}
            <div className="flex flex-col items-center w-32 relative z-10">
              <motion.div 
                animate={{
                  borderColor: isProcessing ? 'rgb(245,158,11,0.8)' : 'rgb(51,65,85,1)',
                  boxShadow: isProcessing ? '0 0 25px rgba(245,158,11,0.4)' : '0 0 0px rgba(0,0,0,0)',
                  scale: isProcessing ? 1.05 : 1
                }}
                className="w-24 h-24 bg-slate-900 border-2 rounded-xl flex flex-col items-center justify-center transition-all duration-300 relative overflow-hidden"
              >
                {/* Processing scanline */}
                {isProcessing && <div className="absolute inset-0 bg-amber-500/10 animate-pulse" />}
                
                <Cpu size={32} className={`mb-2 ${isProcessing ? 'text-amber-400' : 'text-slate-500'}`} />
                <span className={`text-xs font-bold ${isProcessing ? 'text-amber-400' : 'text-slate-500'}`}>Worker</span>
              </motion.div>
              
              <div className="mt-4 flex flex-col items-center">
                <span className={`text-xs font-bold px-2 py-1 rounded mb-2 ${isProcessing ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-400'}`}>
                  {isProcessing ? 'PROCESSING...' : 'IDLE'}
                </span>
                <span className="text-xs text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-1 rounded">
                  Processed: <strong>{processed}</strong>
                </span>
              </div>
            </div>
          </div>

          <div className="mt-12 p-4 rounded-lg bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm flex gap-3 max-w-3xl">
            <Info className="shrink-0" />
            <div>
              <strong>Ưu điểm:</strong> Giúp hệ thống không bị quá tải (Decoupling & Buffering) khi lượng Traffic tăng đột biến. Bạn có thể bấm Push liên tục, nhưng hệ thống vẫn sẽ xử lý từng cái một cách an toàn mà không sập.
            </div>
          </div>
          
        </div>
      </GlowingCard>
    </div>
  );
};

export default MessageQueueDemo;
