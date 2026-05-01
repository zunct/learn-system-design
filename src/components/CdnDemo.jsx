import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cloud, Zap, Server, Globe2, ShieldCheck } from 'lucide-react';

const CDN_FEATURES = [
  {
    title: 'Giảm Độ Trễ (Latency)',
    description: 'Nội dung được phân phối từ Edge Server gần người dùng nhất thay vì Origin Server xa xôi.',
    icon: Zap,
    color: 'text-amber-400'
  },
  {
    title: 'Giảm Tải Origin Server',
    description: 'Edge Servers hứng chịu hầu hết lượng traffic (hit rate cao), máy chủ gốc không bị quá tải.',
    icon: Server,
    color: 'text-blue-400'
  },
  {
    title: 'Tăng Cường Bảo Mật',
    description: 'Cung cấp màng bảo vệ DDoS (như Cloudflare) và ẩn địa chỉ IP thực của Origin Server.',
    icon: ShieldCheck,
    color: 'text-emerald-400'
  }
];

const CdnDemo = () => {
  const [useCdn, setUseCdn] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  const [latency, setLatency] = useState(null);

  const handleRequest = () => {
    if (isRequesting) return;
    setIsRequesting(true);
    setLatency(null);

    // Simulate latency based on CDN state
    const timeToWait = useCdn ? 800 : 2500; // Animation duration in ms

    setTimeout(() => {
      setLatency(useCdn ? 20 : 350);
      setIsRequesting(false);
    }, timeToWait);
  };

  return (
    <div className="h-full flex flex-col space-y-8">
      <header>
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Cloud className="text-indigo-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Mạng Lưới CDN</h2>
        </div>
        <p className="text-slate-400 text-sm max-w-3xl leading-relaxed">
          <strong>Content Delivery Network (CDN)</strong> là một mạng lưới các máy chủ phân tán (Edge Servers) đặt ở nhiều khu vực địa lý khác nhau. Nhiệm vụ chính là cache (lưu trữ) các nội dung tĩnh (ảnh, video, js, css) và trả về cho người dùng từ server gần họ nhất, giúp website load cực nhanh.
        </p>
      </header>

      {/* Interactive Simulation */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex-1 flex flex-col items-center">
        <div className="w-full flex items-center justify-between mb-8">
          <h3 className="font-semibold text-slate-200">Mô phỏng truy cập (Người dùng tại Việt Nam)</h3>
          
          <div className="flex items-center gap-4 bg-slate-800 p-2 rounded-xl border border-slate-700">
            <span className="text-sm text-slate-400 font-medium px-2">Trạng thái CDN:</span>
            <button
              onClick={() => { setUseCdn(false); setLatency(null); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                !useCdn ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' : 'text-slate-400 hover:bg-slate-700'
              }`}
            >
              Tắt (Off)
            </button>
            <button
              onClick={() => { setUseCdn(true); setLatency(null); }}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all ${
                useCdn ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' : 'text-slate-400 hover:bg-slate-700'
              }`}
            >
              Bật (On)
            </button>
          </div>
        </div>

        {/* Visualization Canvas */}
        <div className="flex-1 w-full max-w-4xl relative bg-slate-950 rounded-xl border border-slate-800 overflow-hidden flex items-center justify-center p-8">
          {/* Map Background Approximation */}
          <div className="absolute inset-0 opacity-10 flex items-center justify-center">
            <Globe2 size={400} className="text-blue-500" />
          </div>

          <div className="w-full flex items-center justify-between relative z-10">
            
            {/* User (VN) */}
            <div className="flex flex-col items-center z-20">
              <div className="w-16 h-16 bg-slate-800 rounded-full border-2 border-slate-600 flex items-center justify-center mb-2 shadow-lg">
                <span className="text-2xl">👨‍💻</span>
              </div>
              <div className="text-sm font-bold text-slate-200">User</div>
              <div className="text-xs text-slate-500">Ho Chi Minh, VN</div>
              
              <button
                onClick={handleRequest}
                disabled={isRequesting}
                className="mt-6 px-4 py-2 bg-indigo-500 hover:bg-indigo-600 disabled:bg-slate-700 disabled:text-slate-500 text-white text-sm font-semibold rounded-lg transition-colors shadow-[0_0_15px_rgba(99,102,241,0.3)]"
              >
                {isRequesting ? 'Đang tải...' : 'Fetch Image'}
              </button>
            </div>

            {/* Connection Paths & Edge Server */}
            <div className="flex-1 relative flex items-center h-20 px-4">
              
              {/* Path: VN -> US (Without CDN) */}
              <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 border-t-2 border-dashed border-slate-700" />
              
              {!useCdn && isRequesting && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-4 h-4 bg-rose-500 rounded-full shadow-[0_0_15px_rgba(244,63,94,0.6)]"
                  initial={{ left: '0%' }}
                  animate={{ left: ['0%', '100%', '0%'] }}
                  transition={{ duration: 2.5, ease: "easeInOut" }}
                />
              )}

              {/* Edge Server (VN/SG) - Only visible/active when CDN is ON */}
              <AnimatePresence>
                {useCdn && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className="absolute left-[30%] top-1/2 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center"
                  >
                    <div className="w-14 h-14 bg-emerald-900/50 rounded-xl border-2 border-emerald-500/50 flex items-center justify-center text-emerald-400 z-20 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                      <Cloud size={24} />
                    </div>
                    <div className="text-xs font-bold text-emerald-400 mt-2 absolute -bottom-6 w-32 text-center">CDN Edge Node<br/><span className="text-[10px] text-slate-500">(Singapore/VN)</span></div>
                    
                    {/* Path: User -> Edge */}
                    {isRequesting && (
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] z-30"
                        initial={{ left: -100 }} // Starts from user
                        animate={{ left: [ -100, 0, -100 ] }} // Goes to edge and back
                        transition={{ duration: 0.8, ease: "easeInOut" }}
                      />
                    )}
                  </motion.div>
                )}
              </AnimatePresence>

            </div>

            {/* Origin Server (US) */}
            <div className="flex flex-col items-center z-20">
              <div className="w-20 h-24 bg-slate-800 rounded-xl border-2 border-blue-500/30 flex items-center justify-center mb-2 shadow-[0_0_20px_rgba(59,130,246,0.1)]">
                <Server size={32} className="text-blue-400" />
              </div>
              <div className="text-sm font-bold text-slate-200">Origin Server</div>
              <div className="text-xs text-slate-500">New York, US</div>
            </div>

          </div>

          {/* Results Overlay */}
          <AnimatePresence>
            {latency && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                className={`absolute bottom-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full border font-mono font-bold shadow-2xl flex items-center gap-3
                  ${useCdn 
                    ? 'bg-emerald-500/20 border-emerald-500/50 text-emerald-400' 
                    : 'bg-rose-500/20 border-rose-500/50 text-rose-400'
                  }`}
              >
                <Zap size={18} />
                Thời gian tải: {latency}ms
                <span className="text-xs font-normal opacity-80 border-l border-current pl-3">
                  ({useCdn ? 'Cache Hit ở Edge Server' : 'Phải đi nửa vòng trái đất'})
                </span>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

      {/* Information Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        {CDN_FEATURES.map((feature, idx) => (
          <div key={idx} className="bg-slate-800/50 p-5 rounded-xl border border-slate-700/50 flex flex-col">
            <div className={`p-2 bg-slate-900 rounded-lg w-fit mb-4 ${feature.color}`}>
              <feature.icon size={20} />
            </div>
            <h4 className="text-slate-200 font-semibold mb-2">{feature.title}</h4>
            <p className="text-slate-400 text-sm leading-relaxed flex-1">{feature.description}</p>
          </div>
        ))}
      </div>

    </div>
  );
};

export default CdnDemo;
