import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, ShieldAlert, Zap, Clock, Play, RotateCcw } from 'lucide-react';

const RateLimitingDemo = () => {
  const [activeAlgorithm, setActiveAlgorithm] = useState('token-bucket');
  const [tokens, setTokens] = useState(5);
  const [requests, setRequests] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);

  // Constants
  const MAX_TOKENS = 5;
  const REFILL_RATE = 1000; // 1 token per second

  useEffect(() => {
    let interval;
    if (isPlaying && activeAlgorithm === 'token-bucket') {
      interval = setInterval(() => {
        setTokens(prev => Math.min(prev + 1, MAX_TOKENS));
      }, REFILL_RATE);
    }
    return () => clearInterval(interval);
  }, [isPlaying, activeAlgorithm]);

  const sendRequest = () => {
    const newReqId = Date.now();
    let status = 'accepted';

    if (activeAlgorithm === 'token-bucket') {
      if (tokens > 0) {
        setTokens(prev => prev - 1);
        status = 'accepted';
      } else {
        status = 'dropped';
      }
    } else if (activeAlgorithm === 'fixed-window') {
      // Simplified simulation: drop if we had 3 requests in the last 2 seconds
      const recentReqs = requests.filter(r => Date.now() - r.id < 2000 && r.status === 'accepted');
      if (recentReqs.length >= 3) {
        status = 'dropped';
      }
    }

    setRequests(prev => [...prev.slice(-10), { id: newReqId, status }]);
  };

  const algorithms = [
    {
      id: 'token-bucket',
      name: 'Token Bucket',
      desc: 'Có một cái "xô" chứa tối đa N token. Mỗi request đến sẽ lấy 1 token. Hệ thống tự động bỏ thêm token vào xô theo thời gian. Nếu xô trống, request bị từ chối.',
      pros: 'Cho phép lưu lượng bùng nổ (burst) nhẹ.',
      cons: 'Cần lưu trữ số lượng token của từng người dùng.'
    },
    {
      id: 'leaking-bucket',
      name: 'Leaking Bucket',
      desc: 'Giống cái phễu rò rỉ. Request đổ vào phễu với tốc độ bất kỳ, nhưng phễu chỉ nhỏ giọt (xử lý) ra với một tốc độ cố định.',
      pros: 'Làm mượt lưu lượng, giữ tốc độ xử lý ổn định.',
      cons: 'Lưu lượng bùng nổ có thể làm đầy phễu nhanh và rơi rớt các request mới.'
    },
    {
      id: 'fixed-window',
      name: 'Fixed Window Counter',
      desc: 'Chia thời gian thành các khung cố định (VD: 1 phút). Mỗi khung có giới hạn N request. Hết khung thì reset lại từ 0.',
      pros: 'Dễ hiểu, dễ cài đặt.',
      cons: 'Vấn đề ở ranh giới (Spike at edges) - Ví dụ giới hạn 100 req/phút. Người dùng có thể gửi 100 req ở giây 59 và 100 req ở giây 01, gây ra 200 req trong 2 giây.'
    },
    {
      id: 'sliding-window',
      name: 'Sliding Window Log',
      desc: 'Lưu lại timestamp của TỪNG request. Khi có request mới, đếm xem trong N giây VỪA QUA có bao nhiêu request để quyết định.',
      pros: 'Rất chính xác, không bị lỗi ở ranh giới thời gian.',
      cons: 'Tốn rất nhiều bộ nhớ để lưu timestamp của mọi request.'
    }
  ];

  const resetDemo = () => {
    setTokens(MAX_TOKENS);
    setRequests([]);
    setIsPlaying(false);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4 flex items-center gap-3">
          <Shield className="text-rose-500" size={32} />
          Rate Limiting (Giới hạn tốc độ)
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Rate Limiting giúp bảo vệ hệ thống khỏi các cuộc tấn công DDoS, tránh quá tải (cascading failure), và kiểm soát chi phí (đối với API trả phí). 
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left: Algorithms List */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-slate-200">Các Thuật toán phổ biến</h3>
          <div className="space-y-3">
            {algorithms.map(algo => (
              <button
                key={algo.id}
                onClick={() => {
                  setActiveAlgorithm(algo.id);
                  resetDemo();
                }}
                className={`w-full text-left p-4 rounded-xl border transition-all ${
                  activeAlgorithm === algo.id 
                    ? 'bg-rose-500/10 border-rose-500/50 shadow-[0_0_15px_rgba(244,63,94,0.1)]' 
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/80'
                }`}
              >
                <h4 className={`font-bold mb-1 ${activeAlgorithm === algo.id ? 'text-rose-400' : 'text-slate-300'}`}>
                  {algo.name}
                </h4>
                <p className="text-sm text-slate-400">{algo.desc}</p>
                
                {activeAlgorithm === algo.id && (
                  <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    className="mt-3 text-xs bg-slate-950/50 p-3 rounded-lg border border-slate-800"
                  >
                    <div className="text-emerald-400 mb-1"><strong>Ưu điểm:</strong> {algo.pros}</div>
                    <div className="text-amber-400"><strong>Nhược điểm:</strong> {algo.cons}</div>
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Right: Interactive Demo */}
        <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-semibold text-slate-200 flex items-center gap-2">
              <Zap className="text-amber-400" size={20} />
              Mô phỏng: {algorithms.find(a => a.id === activeAlgorithm)?.name}
            </h3>
            <button 
              onClick={resetDemo}
              className="p-2 bg-slate-800 hover:bg-slate-700 text-slate-400 rounded-lg transition-colors"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <div className="flex-1 min-h-[300px] flex flex-col items-center justify-center relative">
            {activeAlgorithm === 'token-bucket' ? (
              <div className="w-full max-w-sm">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-slate-400 text-sm">Số Token hiện tại:</span>
                  <span className="font-mono text-xl font-bold text-rose-400">{tokens} / {MAX_TOKENS}</span>
                </div>
                
                <div className="flex gap-2 mb-8 justify-center">
                  {[...Array(MAX_TOKENS)].map((_, i) => (
                    <motion.div
                      key={i}
                      className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${
                        i < tokens 
                          ? 'bg-rose-500/20 border-rose-500 text-rose-400 shadow-[0_0_10px_rgba(244,63,94,0.3)]' 
                          : 'bg-slate-800 border-slate-700 text-slate-600'
                      }`}
                      animate={i < tokens ? { scale: [1, 1.1, 1] } : {}}
                      transition={{ duration: 0.3 }}
                    >
                      <Zap size={20} />
                    </motion.div>
                  ))}
                </div>

                <div className="flex justify-center gap-4">
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className={`px-4 py-2 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors ${
                      isPlaying ? 'bg-slate-800 text-slate-300' : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                    }`}
                  >
                    {isPlaying ? <Clock size={16} /> : <Play size={16} />}
                    {isPlaying ? 'Đang thêm token...' : 'Bắt đầu thêm token'}
                  </button>
                  <button
                    onClick={sendRequest}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
                  >
                    Gửi Request
                  </button>
                </div>
              </div>
            ) : (
              <div className="text-center text-slate-400">
                <div className="mb-4">
                  <button
                    onClick={sendRequest}
                    className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-bold shadow-lg shadow-blue-500/30 transition-transform active:scale-95"
                  >
                    Gửi Request (Limit: 3/2s)
                  </button>
                </div>
              </div>
            )}

            {/* Request Log */}
            <div className="w-full mt-8 h-32 overflow-hidden border-t border-slate-800 pt-4 relative">
              <div className="absolute inset-x-0 top-0 h-4 bg-gradient-to-b from-slate-900 to-transparent z-10" />
              <div className="space-y-2 relative top-0 flex flex-col-reverse">
                <AnimatePresence>
                  {requests.map((req) => (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, y: -20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex justify-between items-center px-4 py-2 rounded text-sm ${
                        req.status === 'accepted' 
                          ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                          : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                      }`}
                    >
                      <span>Request ID: ...{req.id.toString().slice(-4)}</span>
                      <span className="font-bold flex items-center gap-1">
                        {req.status === 'accepted' ? '200 OK' : <><ShieldAlert size={14}/> 429 Too Many Requests</>}
                      </span>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RateLimitingDemo;
