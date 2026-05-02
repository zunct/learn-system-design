import React, { useState, useEffect } from 'react';
import { Send, FileText, Server, Cpu, Activity, Info, Layers } from 'lucide-react';
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

      {/* Kiến thức chuyên sâu */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Patterns */}
        <GlowingCard className="bg-slate-900/50 p-6">
          <h3 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
            <Layers size={20} /> Mô hình hoạt động (Patterns)
          </h3>
          <ul className="space-y-4 text-slate-300 text-sm">
            <li className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-emerald-400 block mb-1">Point-to-Point (Queue)</strong>
              Mỗi tin nhắn chỉ được tiêu thụ bởi <strong>một</strong> Consumer duy nhất. Phù hợp để chia nhỏ và phân tán công việc (ví dụ: Xử lý video, Gửi Email). Nếu có nhiều Worker, tin nhắn sẽ được chia đều (Round-robin) giúp cân bằng tải.
            </li>
            <li className="p-3 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-purple-400 block mb-1">Publish/Subscribe (Topic/Fan-out)</strong>
              Một tin nhắn (Event) được Broadcast tới <strong>nhiều</strong> Subscriber (Consumer) khác nhau. Phù hợp khi một sự kiện xảy ra cần báo cho nhiều hệ thống (ví dụ: User đặt hàng thành công -&gt; Báo cho Kho hàng, Vận chuyển, và Kế toán).
            </li>
          </ul>
        </GlowingCard>

        {/* Kafka vs RabbitMQ */}
        <GlowingCard className="bg-slate-900/50 p-6">
          <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
            <Server size={20} /> Kafka vs RabbitMQ
          </h3>
          <div className="space-y-4 text-slate-300 text-sm">
            <div className="flex gap-4 p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="w-12 h-12 bg-orange-900/30 rounded-lg flex items-center justify-center shrink-0 border border-orange-500/50 text-orange-400 font-bold text-[10px]">Rabbit</div>
              <div>
                <strong className="text-white block mb-1">RabbitMQ (Smart Broker)</strong>
                <ul className="text-slate-400 space-y-1">
                  <li>• Broker tự nhớ ai đã đọc tin nào (xóa tin sau khi đọc).</li>
                  <li>• Hỗ trợ định tuyến (Routing) phức tạp, có thứ tự ưu tiên.</li>
                  <li>• <strong>Dùng cho:</strong> Các Background Job truyền thống, xử lý thanh toán.</li>
                </ul>
              </div>
            </div>
            <div className="flex gap-4 p-3 bg-slate-950 rounded-lg border border-slate-800">
              <div className="w-12 h-12 bg-slate-200 rounded-lg flex items-center justify-center shrink-0 border border-slate-400 text-slate-800 font-bold text-[10px]">Kafka</div>
              <div>
                <strong className="text-white block mb-1">Apache Kafka (Smart Consumer)</strong>
                <ul className="text-slate-400 space-y-1">
                  <li>• Lưu tin vào đĩa cứng (Log append), không tự xóa. Giữ lại nhiều ngày.</li>
                  <li>• Thông lượng cực khủng, cho phép Consumer "Tua lại" (Replay) dữ liệu.</li>
                  <li>• <strong>Dùng cho:</strong> Stream Processing, Tracking User Activity.</li>
                </ul>
              </div>
            </div>
          </div>
        </GlowingCard>

        {/* Core Concepts */}
        <GlowingCard className="bg-slate-900/50 p-6 md:col-span-2">
          <h3 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
            <Activity size={20} /> Tại sao các Hệ thống lớn bắt buộc phải có Message Queue?
          </h3>
          <div className="grid md:grid-cols-3 gap-4 text-sm text-slate-300">
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-white block text-base mb-2">1. Decoupling (Tách rời)</strong>
              <p className="text-slate-400">Các Microservices không cần biết tới sự tồn tại của nhau. Dịch vụ Email bị sập? Không sao, dịch vụ Đặt hàng vẫn hoạt động, tin nhắn gửi Email sẽ nằm chờ ở Queue tới khi Email sống lại.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-white block text-base mb-2">2. Asynchronous (Bất đồng bộ)</strong>
              <p className="text-slate-400">Không bắt User phải chờ một tác vụ nặng hoàn thành (như upload video). Hệ thống nhận lệnh, báo "Thành công" lập tức, còn việc render video cứ từ từ ném cho Worker chạy ngầm.</p>
            </div>
            <div className="p-4 bg-slate-950 rounded-lg border border-slate-800">
              <strong className="text-white block text-base mb-2">3. Spike Smoothing (Chống sốc)</strong>
              <p className="text-slate-400">Vào giờ vàng Flash Sale, 1 triệu người mua hàng cùng lúc. Thay vì gọi thẳng vào Database làm sập DB, mọi request mua hàng sẽ chui vào Queue. Database sẽ ung dung rút từng tin ra để xử lý.</p>
            </div>
          </div>
        </GlowingCard>
      </div>

    </div>
  );
};

export default MessageQueueDemo;
