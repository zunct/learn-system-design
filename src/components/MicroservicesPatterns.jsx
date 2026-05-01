import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Network, GitBranch, Database, Clock, Server, ArrowRight, ArrowDown, Activity, ChevronRight, CheckCircle2, XCircle } from 'lucide-react';
import GlowingCard from './ui/GlowingCard';

const PATTERNS_DATA = [
  {
    id: 'api-gateway',
    title: 'API Gateway',
    icon: Network,
    shortDesc: 'Điểm vào duy nhất cho mọi Client',
    renderContent: () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">API Gateway Pattern</h3>
          <p className="text-slate-400">
            Cung cấp một điểm chạm duy nhất (Single Point of Entry) cho tất cả các request từ Client. Gateway làm nhiệm vụ định tuyến (Routing), xác thực (Authentication), gộp dữ liệu (Composition), và giới hạn tốc độ (Rate Limiting).
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-indigo-400 font-bold flex items-center gap-2"><CheckCircle2 size={18}/> Ưu điểm</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Client không cần biết cấu trúc microservices nội bộ.</li>
              <li>• Giảm số lượng request round-trip giữa client và server (nhờ composition).</li>
              <li>• Tập trung logic cross-cutting (Auth, Logging, SSL).</li>
            </ul>
            <h4 className="text-rose-400 font-bold flex items-center gap-2 mt-4"><XCircle size={18}/> Nhược điểm</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Single Point of Failure (Nếu gateway chết, toàn hệ thống sập).</li>
              <li>• Thêm độ trễ (latency) vì qua thêm một network hop.</li>
            </ul>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[200px]">
            {/* Diagram */}
            <div className="flex items-center gap-4 w-full justify-center">
              <div className="bg-slate-800 border border-slate-600 p-3 rounded-lg text-xs font-bold text-slate-300 flex flex-col items-center gap-1">
                📱 Client
              </div>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }}>
                <ArrowRight className="text-indigo-500" />
              </motion.div>
              <div className="bg-indigo-500/20 border border-indigo-500 p-4 rounded-xl text-indigo-300 font-bold flex flex-col items-center shadow-[0_0_15px_rgba(99,102,241,0.3)]">
                <Network size={24} className="mb-1" />
                API Gateway
                <div className="text-[10px] font-normal text-indigo-400 mt-1">Auth / Routing</div>
              </div>
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}>
                <ArrowRight className="text-indigo-500" />
              </motion.div>
              <div className="flex flex-col gap-3">
                <div className="bg-emerald-900/50 border border-emerald-700 p-2 rounded text-xs font-medium text-emerald-400">User Svc</div>
                <div className="bg-blue-900/50 border border-blue-700 p-2 rounded text-xs font-medium text-blue-400">Product Svc</div>
                <div className="bg-rose-900/50 border border-rose-700 p-2 rounded text-xs font-medium text-rose-400">Order Svc</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'saga',
    title: 'Saga Pattern',
    icon: GitBranch,
    shortDesc: 'Quản lý Transaction phân tán',
    renderContent: () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Saga Pattern</h3>
          <p className="text-slate-400">
            Khi một nghiệp vụ cần cập nhật dữ liệu ở nhiều Microservices, thay vì dùng Distributed Transaction (2PC - chậm, dễ deadlock), Saga chia nhỏ thành các giao dịch cục bộ (Local Transaction). Nếu một bước thất bại, nó sẽ chạy các <strong>Compensating Transactions</strong> để hoàn tác (rollback) các bước trước đó.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-indigo-400 font-bold flex items-center gap-2"><CheckCircle2 size={18}/> Đặc điểm</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Giữ được tính toàn vẹn dữ liệu (Eventual Consistency) mà không khóa DB.</li>
              <li>• Có 2 loại: <strong>Choreography</strong> (Event-based, phân tán) và <strong>Orchestration</strong> (Có một Controller trung tâm).</li>
            </ul>
            <h4 className="text-rose-400 font-bold flex items-center gap-2 mt-4"><XCircle size={18}/> Nhược điểm</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Rất phức tạp để debug (Cần Distributed Tracing).</li>
              <li>• Phải code logic "bù trừ" (compensate) cho mọi thao tác Ghi.</li>
            </ul>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 flex flex-col justify-center min-h-[200px]">
            {/* Diagram Orchestration */}
            <p className="text-[10px] text-slate-500 font-mono mb-4 text-center uppercase tracking-widest">Saga Orchestration</p>
            <div className="flex flex-col items-center gap-2">
              <div className="bg-amber-500/20 border border-amber-500/50 p-2 px-4 rounded-lg text-amber-300 text-sm font-bold shadow-[0_0_10px_rgba(245,158,11,0.2)]">
                Saga Orchestrator
              </div>
              <div className="flex gap-4 md:gap-8 mt-2 relative">
                 {/* V-line connection stub */}
                 <div className="absolute top-[-10px] left-[50%] w-[1px] h-[10px] bg-slate-600"></div>
                 
                 <div className="flex flex-col items-center gap-2">
                    <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity }} className="text-emerald-500"><ArrowDown size={16}/></motion.div>
                    <div className="bg-slate-800 border border-slate-600 p-2 text-xs rounded text-slate-300 text-center">1. Create<br/>Order</div>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} className="text-emerald-500"><ArrowDown size={16}/></motion.div>
                    <div className="bg-slate-800 border border-slate-600 p-2 text-xs rounded text-slate-300 text-center">2. Charge<br/>Pay</div>
                 </div>
                 <div className="flex flex-col items-center gap-2">
                    <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.6 }} className="text-rose-500"><ArrowDown size={16}/></motion.div>
                    <div className="bg-slate-800 border border-slate-600 p-2 text-xs rounded text-slate-300 text-center line-through opacity-70">3. Update<br/>Stock</div>
                    <div className="text-[10px] text-rose-400 mt-1 font-bold">FAIL!</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'cqrs',
    title: 'CQRS',
    icon: Database,
    shortDesc: 'Tách biệt luồng Đọc và Ghi',
    renderContent: () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Command Query Responsibility Segregation (CQRS)</h3>
          <p className="text-slate-400">
            Tách biệt hoàn toàn thao tác Ghi dữ liệu (Command) và Đọc dữ liệu (Query). Thay vì dùng chung 1 database/model cho cả đọc và ghi, ta sử dụng 2 database/model được tối ưu riêng biệt cho từng tác vụ và đồng bộ thông qua Event Bus.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-indigo-400 font-bold flex items-center gap-2"><CheckCircle2 size={18}/> Ưu điểm</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Scale độc lập (Ví dụ: scale Query DB gấp 10 lần Command DB).</li>
              <li>• Tối ưu schema: Command DB dùng PostgreSQL, Query DB dùng Elasticsearch hoặc Redis.</li>
            </ul>
            <h4 className="text-rose-400 font-bold flex items-center gap-2 mt-4"><XCircle size={18}/> Nhược điểm</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Dữ liệu có độ trễ đồng bộ (Eventual Consistency).</li>
              <li>• Quá overkill (phức tạp) cho các hệ thống CRUD cơ bản.</li>
            </ul>
          </div>

          <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-700 flex flex-col items-center justify-center min-h-[200px] overflow-hidden">
             <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full justify-center">
                {/* Command Side */}
                <div className="flex flex-row sm:flex-col items-center gap-3 w-full sm:w-auto justify-between sm:justify-center border sm:border-none border-slate-700 p-2 sm:p-0 rounded-lg">
                   <div className="bg-rose-500/20 text-rose-400 p-2 rounded font-bold text-xs sm:text-sm text-center border border-rose-500/30">Command API</div>
                   <div className="text-rose-500 text-xs hidden sm:block">↓ Write</div>
                   <div className="text-rose-500 text-xs sm:hidden">→</div>
                   <div className="bg-slate-800 border border-rose-500/50 w-12 h-12 sm:w-16 sm:h-16 rounded-full flex items-center justify-center text-rose-300 text-[10px] sm:text-xs shadow-[0_0_15px_rgba(244,63,94,0.2)]">SQL DB</div>
                </div>

                {/* Event Bus */}
                <div className="flex sm:flex-col items-center justify-center py-2 sm:py-0 sm:pt-8 w-full sm:w-auto">
                   <div className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2">
                      <motion.div animate={{ x: [0, 5, 0], y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-fuchsia-500 hidden sm:block"><ArrowRight size={16}/></motion.div>
                      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="text-fuchsia-500 sm:hidden"><ArrowDown size={16}/></motion.div>
                      <div className="bg-fuchsia-500/20 text-fuchsia-300 text-[10px] px-2 py-1 rounded-full border border-fuchsia-500/30">Event Bus</div>
                      <motion.div animate={{ x: [0, 5, 0], y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="text-fuchsia-500 hidden sm:block"><ArrowRight size={16}/></motion.div>
                      <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: 0.2 }} className="text-fuchsia-500 sm:hidden"><ArrowDown size={16}/></motion.div>
                   </div>
                   <div className="text-[10px] text-slate-500 mt-1 hidden sm:block">Sync (Async)</div>
                </div>

                {/* Query Side */}
                <div className="flex flex-row sm:flex-col items-center gap-3 w-full sm:w-auto justify-between sm:justify-center border sm:border-none border-slate-700 p-2 sm:p-0 rounded-lg">
                   <div className="bg-emerald-500/20 text-emerald-400 p-2 rounded font-bold text-xs sm:text-sm text-center border border-emerald-500/30">Query API</div>
                   <div className="text-emerald-500 text-xs hidden sm:block">↑ Read</div>
                   <div className="text-emerald-500 text-xs sm:hidden">←</div>
                   <div className="bg-slate-800 border border-emerald-500/50 w-12 h-12 sm:w-16 sm:h-16 rounded-lg flex items-center justify-center text-emerald-300 text-[10px] sm:text-xs shadow-[0_0_15px_rgba(16,185,129,0.2)]">NoSQL</div>
                </div>
             </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'eventsourcing',
    title: 'Event Sourcing',
    icon: Clock,
    shortDesc: 'Lưu trạng thái bằng chuỗi sự kiện',
    renderContent: () => (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl font-bold text-white mb-2">Event Sourcing</h3>
          <p className="text-slate-400">
            Thay vì lưu trạng thái cuối cùng của đối tượng vào Database (Ví dụ: `balance = 50$`), Event Sourcing lưu tất cả các sự kiện thay đổi trạng thái theo trục thời gian (Ví dụ: `Deposited 100$`, `Withdrew 50$`). Thường kết hợp chặt chẽ với CQRS.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h4 className="text-indigo-400 font-bold flex items-center gap-2"><CheckCircle2 size={18}/> Ưu điểm</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Audit log hoàn hảo (Biết chính xác hệ thống đã thay đổi thế nào ở bất kỳ thời điểm nào).</li>
              <li>• Có thể "Time Travel" để khôi phục trạng thái cũ (Replay events).</li>
            </ul>
            <h4 className="text-rose-400 font-bold flex items-center gap-2 mt-4"><XCircle size={18}/> Nhược điểm</h4>
            <ul className="text-sm text-slate-300 space-y-2">
              <li>• Dung lượng lưu trữ (Event Store) tăng liên tục.</li>
              <li>• Phức tạp: Phải thiết kế Snapshotting để tối ưu tốc độ đọc trạng thái.</li>
            </ul>
          </div>

          <div className="bg-slate-900/80 p-6 rounded-xl border border-slate-700 flex flex-col justify-center min-h-[200px] overflow-hidden relative">
            <div className="w-full h-[2px] bg-slate-700 absolute top-1/2 left-0 transform -translate-y-1/2 z-0 hidden sm:block"></div>
            
            <div className="flex flex-col sm:flex-row justify-between items-center relative z-10 w-full gap-4 sm:gap-0 px-0 sm:px-2">
               {/* Timeline V-line for mobile */}
               <div className="w-[2px] h-full bg-slate-700 absolute left-1/2 transform -translate-x-1/2 z-0 sm:hidden"></div>
               
               <div className="flex flex-col items-center bg-slate-900 sm:bg-transparent p-2 sm:p-0 rounded relative z-10">
                 <div className="w-3 h-3 bg-emerald-500 rounded-full sm:mb-2 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
                 <div className="bg-slate-800 border border-slate-600 p-2 rounded text-[10px] text-emerald-300 text-center mt-2">
                    T1<br/>Account Created<br/><span className="text-slate-400">$0</span>
                 </div>
               </div>
               
               <div className="flex flex-col items-center bg-slate-900 sm:bg-transparent p-2 sm:p-0 rounded relative z-10">
                 <div className="w-3 h-3 bg-indigo-500 rounded-full sm:mb-2 shadow-[0_0_10px_rgba(99,102,241,0.8)]"></div>
                 <div className="bg-slate-800 border border-slate-600 p-2 rounded text-[10px] text-indigo-300 text-center mt-2">
                    T2<br/>Deposited $100<br/><span className="text-slate-400">$100</span>
                 </div>
               </div>

               <div className="flex flex-col items-center bg-slate-900 sm:bg-transparent p-2 sm:p-0 rounded relative z-10">
                 <div className="w-3 h-3 bg-rose-500 rounded-full sm:mb-2 shadow-[0_0_10px_rgba(244,63,94,0.8)]"></div>
                 <div className="bg-slate-800 border border-slate-600 p-2 rounded text-[10px] text-rose-300 text-center mt-2">
                    T3<br/>Withdrew $30<br/><span className="text-slate-400">$70</span>
                 </div>
               </div>

               <div className="flex flex-col items-center bg-slate-900 sm:bg-transparent p-2 sm:p-0 rounded relative z-10 mt-2 sm:mt-0">
                 <div className="bg-fuchsia-500 text-white font-bold p-2 rounded shadow-[0_0_15px_rgba(217,70,239,0.5)] flex items-center gap-1 text-[10px] sm:text-xs">
                    <Activity size={14}/> Current: $70
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
];

const MicroservicesPatterns = () => {
  const [activePattern, setActivePattern] = useState(PATTERNS_DATA[0].id);

  const currentPattern = PATTERNS_DATA.find(p => p.id === activePattern);

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h1 className="text-3xl lg:text-4xl font-black text-white tracking-tight flex items-center gap-3 mb-4">
          <Server className="text-indigo-500" size={36} />
          Microservices & Distributed Patterns
        </h1>
        <p className="text-base lg:text-lg text-slate-400 max-w-3xl">
          Khi hệ thống vượt quá giới hạn của Monolith, chúng ta phải phân rã thành các Microservices. Khám phá các mẫu thiết kế (Design Patterns) giúp giải quyết các thách thức về giao tiếp, tính nhất quán dữ liệu và khả năng chịu lỗi trong môi trường phân tán.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        {/* Master: Sidebar List */}
        <div className="md:col-span-4 lg:col-span-3 flex flex-row md:flex-col gap-2 overflow-x-auto md:overflow-visible pb-4 md:pb-0 hide-scrollbar scroll-smooth snap-x">
          {PATTERNS_DATA.map((pattern) => {
            const isActive = activePattern === pattern.id;
            const Icon = pattern.icon;
            return (
              <button
                key={pattern.id}
                onClick={() => setActivePattern(pattern.id)}
                className={`flex-shrink-0 snap-center md:flex-shrink-auto flex items-start gap-3 p-4 rounded-xl text-left transition-all relative overflow-hidden w-[80vw] sm:w-64 md:w-auto ${
                  isActive 
                    ? 'bg-indigo-500/10 border-indigo-500/50 shadow-[0_0_20px_rgba(99,102,241,0.1)]' 
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/50 hover:border-slate-700'
                } border`}
              >
                {isActive && (
                  <motion.div
                    layoutId="activePatternIndicator"
                    className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500"
                  />
                )}
                <div className={`p-2 rounded-lg shrink-0 ${isActive ? 'bg-indigo-500/20 text-indigo-400' : 'bg-slate-800 text-slate-400'}`}>
                  <Icon size={20} />
                </div>
                <div>
                  <h4 className={`font-bold text-sm lg:text-base ${isActive ? 'text-white' : 'text-slate-300'}`}>{pattern.title}</h4>
                  <p className="text-[10px] lg:text-xs text-slate-500 mt-1 line-clamp-1">{pattern.shortDesc}</p>
                </div>
                {isActive && <ChevronRight size={16} className="text-indigo-500 absolute right-4 top-1/2 -translate-y-1/2 opacity-0 md:opacity-100" />}
              </button>
            );
          })}
        </div>

        {/* Detail: Content Area */}
        <div className="md:col-span-8 lg:col-span-9">
          <GlowingCard className="h-full min-h-[500px] border-indigo-500/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activePattern}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -10 }}
                transition={{ duration: 0.2 }}
                className="h-full"
              >
                {currentPattern && currentPattern.renderContent()}
              </motion.div>
            </AnimatePresence>
          </GlowingCard>
        </div>
      </div>
    </div>
  );
};

export default MicroservicesPatterns;
