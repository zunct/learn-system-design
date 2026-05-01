import React, { useState } from 'react';
import { Server, User, ArrowDown, ShieldAlert, Power, Activity } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import GlowingCard from './ui/GlowingCard';
import CyberButton from './ui/CyberButton';

const LoadBalancerDemo = () => {
  const [requests, setRequests] = useState([]);
  const [activeServers, setActiveServers] = useState([true, true, true]); // Trạng thái sống/chết của server
  const [animatingServer, setAnimatingServer] = useState(null);
  
  // Thuật toán Round Robin đơn giản
  const [nextServer, setNextServer] = useState(0);

  const toggleServerStatus = (index) => {
    const newServers = [...activeServers];
    newServers[index] = !newServers[index];
    setActiveServers(newServers);
  };

  const sendRequest = () => {
    // Kiểm tra xem có server nào sống không
    if (!activeServers.some(s => s)) {
      alert("Tất cả Server đều chết! Hệ thống sập (Downtime).");
      return;
    }

    const newReqId = Date.now();
    
    // Tìm server tiếp theo còn sống (Round Robin)
    let target = nextServer;
    while (!activeServers[target]) {
      target = (target + 1) % 3;
    }
    
    setNextServer((target + 1) % 3);
    setRequests(prev => [...prev, { id: newReqId, target }]);
    
    // Animate
    setTimeout(() => {
      setAnimatingServer(target);
      setTimeout(() => setAnimatingServer(null), 500);
      
      setTimeout(() => {
        setRequests(prev => prev.filter(r => r.id !== newReqId));
      }, 500);
    }, 600); 
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
          <Activity size={16} />
          <span>Interactive Demo</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Cân bằng tải <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">(Load Balancer)</span></h2>
        
        <p className="text-slate-400 text-lg max-w-3xl">
          <strong>Load Balancer (LB)</strong> là thiết bị đóng vai trò phân phối lưu lượng truy cập (traffic) mạng từ Client đến nhiều máy chủ (Servers) đằng sau nó. 
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlowingCard delay={0.1}>
          <h3 className="text-indigo-400 font-bold mb-2">Ngăn quá tải</h3>
          <p className="text-slate-400 text-sm">Không để một máy chủ nào phải chịu tải quá lớn. Phân phối đều đặn bằng các thuật toán như Round Robin, Least Connections.</p>
        </GlowingCard>
        <GlowingCard delay={0.2}>
          <h3 className="text-emerald-400 font-bold mb-2">Tính khả dụng cao (HA)</h3>
          <p className="text-slate-400 text-sm">Nếu một máy chủ chết (Health Check fail), LB sẽ tự động loại bỏ nó và chuyển request sang máy chủ khác.</p>
        </GlowingCard>
      </div>

      <GlowingCard delay={0.3} className="mt-8">
        <div className="relative bg-slate-950/50 rounded-xl border border-slate-800 p-8 min-h-[450px] flex flex-col items-center overflow-hidden">
          {/* Cyberpunk Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f1a_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f1a_1px,transparent_1px)] bg-[size:20px_20px]" />
          
          <div className="relative z-10 w-full flex flex-col items-center">
            
            {/* Client Area */}
            <div className="flex items-center justify-center mb-8">
              <div className="w-16 h-16 rounded-full bg-slate-800 border-2 border-indigo-500/50 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <User size={32} className="text-indigo-400" />
              </div>
            </div>
            
            <CyberButton onClick={sendRequest} variant="primary" className="mb-8 relative z-20">
              Gửi Request (Round Robin)
            </CyberButton>
            
            {/* Load Balancer */}
            <div className="relative mb-16">
              <div className="w-64 py-3 bg-gradient-to-r from-indigo-600 to-fuchsia-600 rounded-lg text-center font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.4)] border border-white/20 backdrop-blur-sm z-10 relative">
                Load Balancer
              </div>
              <ArrowDown size={24} className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-indigo-500" />
            </div>
            
            {/* Servers Area */}
            <div className="flex justify-center gap-8 w-full relative">
              {[0, 1, 2].map(index => {
                const isActive = activeServers[index];
                const isAnimating = animatingServer === index;
                
                return (
                  <div key={index} className="flex flex-col items-center">
                    <motion.div 
                      animate={{
                        y: isAnimating ? -10 : 0,
                        borderColor: !isActive ? 'rgb(225,29,72,0.5)' : isAnimating ? 'rgb(16,185,129,0.8)' : 'rgb(51,65,85,1)',
                        boxShadow: !isActive ? '0 0 15px rgba(225,29,72,0.2)' : isAnimating ? '0 0 25px rgba(16,185,129,0.5)' : '0 0 0px rgba(0,0,0,0)'
                      }}
                      className={`w-28 h-32 rounded-xl bg-slate-900 border-2 flex flex-col items-center justify-center gap-3 transition-colors duration-300 relative overflow-hidden ${!isActive ? 'opacity-60' : ''}`}
                    >
                      {/* Server scanline */}
                      {isActive && <div className="absolute inset-0 bg-gradient-to-b from-transparent via-white/5 to-transparent animate-[scan_2s_linear_infinite]" />}
                      
                      {isActive ? (
                        <Server size={32} className={`${isAnimating ? 'text-emerald-400' : 'text-slate-400'}`} />
                      ) : (
                        <ShieldAlert size={32} className="text-rose-500" />
                      )}
                      
                      <span className={`text-sm font-bold ${!isActive ? 'text-rose-500' : 'text-slate-300'}`}>
                        Server {index + 1}
                      </span>
                    </motion.div>
                    
                    <button 
                      onClick={() => toggleServerStatus(index)}
                      className={`mt-4 px-3 py-1 rounded text-xs font-bold border transition-colors flex items-center gap-1 ${
                        isActive 
                          ? 'border-rose-500/30 text-rose-400 hover:bg-rose-500/10' 
                          : 'border-emerald-500/30 text-emerald-400 hover:bg-emerald-500/10'
                      }`}
                    >
                      <Power size={12} />
                      {isActive ? 'KILL' : 'REVIVE'}
                    </button>
                  </div>
                );
              })}
              
              {/* Requests Animation */}
              <AnimatePresence>
                {requests.map(req => {
                  // Calculate target X position based on target server (0, 1, 2)
                  const targetX = (req.target - 1) * 144; // Approx 144px spacing
                  
                  return (
                    <motion.div
                      key={req.id}
                      initial={{ opacity: 0, y: -150, x: 0 }}
                      animate={{ 
                        opacity: [0, 1, 1, 0], 
                        y: [-150, -60, 20], 
                        x: [0, 0, targetX] 
                      }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.6, times: [0, 0.4, 1] }}
                      className="absolute top-[80px] left-[50%] w-3 h-3 -ml-1.5 bg-emerald-400 rounded-full shadow-[0_0_15px_rgba(52,211,153,0.8)] z-30"
                    />
                  );
                })}
              </AnimatePresence>
            </div>
          </div>
        </div>
        
        <div className="mt-4 p-4 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm">
          <strong>💡 Mẹo:</strong> Hãy thử Kill (tắt) Server 1 và Server 2, sau đó Gửi Request để xem Load Balancer tự động chuyển hướng traffic (Health Check) như thế nào.
        </div>
      </GlowingCard>
    </div>
  );
};

export default LoadBalancerDemo;
