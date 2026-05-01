import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ArrowRightLeft, Zap, Database, CheckCircle2, XCircle, LayoutTemplate, Server, Activity } from 'lucide-react';

const API_TYPES = [
  {
    id: 'rest',
    title: 'REST API',
    subtitle: 'Kiến trúc phổ biến nhất',
    icon: Globe,
    color: 'from-blue-500 to-cyan-500',
    description: 'Chuyển trạng thái đại diện (Representational State Transfer). Sử dụng các phương thức HTTP (GET, POST, PUT, DELETE) để tương tác với các tài nguyên qua URI.',
    pros: ['Dễ học, dễ implement', 'Được hỗ trợ rộng rãi', 'Tận dụng tốt HTTP cache'],
    cons: ['Over-fetching (lấy thừa dữ liệu)', 'Under-fetching (phải gọi nhiều API)', 'Payload lớn (JSON)'],
    useCases: ['Web API thông thường', 'CRUD applications', 'Public APIs'],
    animation: 'rest'
  },
  {
    id: 'graphql',
    title: 'GraphQL',
    subtitle: 'Lấy đúng những gì cần',
    icon: Database,
    color: 'from-pink-500 to-rose-500',
    description: 'Ngôn ngữ truy vấn cho API. Client tự định nghĩa cấu trúc dữ liệu muốn nhận về. Chỉ cần một endpoint (thường là /graphql) thay vì nhiều endpoint như REST.',
    pros: ['Không bị over/under-fetching', 'Strongly typed schema', 'Gộp nhiều request thành một'],
    cons: ['Khó cache ở tầng HTTP', 'Độ phức tạp backend cao', 'Vấn đề N+1 queries'],
    useCases: ['Mobile apps (tiết kiệm băng thông)', 'Hệ thống nhiều microservices', 'UI phức tạp'],
    animation: 'graphql'
  },
  {
    id: 'grpc',
    title: 'gRPC',
    subtitle: 'Nhanh & Hiệu suất cao',
    icon: Zap,
    color: 'from-emerald-500 to-teal-500',
    description: 'Framework RPC (Remote Procedure Call) mã nguồn mở của Google. Sử dụng HTTP/2 và Protocol Buffers (dữ liệu nhị phân) thay vì JSON.',
    pros: ['Hiệu suất cực cao', 'Dung lượng payload nhỏ gọn', 'Hỗ trợ streaming 2 chiều', 'Tự động tạo code (Codegen)'],
    cons: ['Trình duyệt không hỗ trợ trực tiếp (cần gRPC-Web)', 'Không human-readable như JSON'],
    useCases: ['Giao tiếp giữa các Microservices', 'Hệ thống yêu cầu độ trễ thấp', 'IoT devices'],
    animation: 'grpc'
  },
  {
    id: 'websockets',
    title: 'WebSockets',
    subtitle: 'Giao tiếp thời gian thực',
    icon: ArrowRightLeft,
    color: 'from-amber-500 to-orange-500',
    description: 'Cung cấp kênh truyền thông hai chiều toàn thời gian (full-duplex) qua một kết nối TCP duy nhất kéo dài.',
    pros: ['Độ trễ siêu thấp', 'Server có thể chủ động push data', 'Giảm overhead của HTTP headers'],
    cons: ['Khó scale (kết nối stateful)', 'Cần cơ chế quản lý kết nối (ping/pong, reconnect)', 'Khó cache'],
    useCases: ['Ứng dụng Chat', 'Bảng giá chứng khoán/Coin', 'Game nhiều người chơi', 'Live tracking'],
    animation: 'websockets'
  }
];

const NetworkApis = () => {
  const [activeTab, setActiveTab] = useState('rest');

  const activeData = API_TYPES.find(t => t.id === activeTab);
  const ActiveIcon = activeData.icon;

  const renderAnimation = (type) => {
    switch(type) {
      case 'rest':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="flex items-center justify-between w-full max-w-sm px-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400">
                  <LayoutTemplate size={28} />
                </div>
                <span className="text-xs text-slate-400 mt-2 font-mono">Client</span>
              </div>

              <div className="flex-1 px-4 relative flex flex-col items-center">
                {/* Request */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: [ -20, 20, 20 ], opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="bg-blue-500/20 text-blue-400 text-[10px] px-2 py-1 rounded-full font-mono whitespace-nowrap absolute -top-4"
                >
                  GET /users/1
                </motion.div>
                <div className="h-0.5 w-full bg-slate-700 relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-full bg-blue-500 origin-left"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                {/* Response */}
                <motion.div 
                  initial={{ x: 20, opacity: 0 }}
                  animate={{ x: [ 20, -20, -20 ], opacity: [0, 0, 1, 0], times: [0, 0.5, 0.6, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="bg-green-500/20 text-green-400 text-[10px] px-2 py-1 rounded-full font-mono whitespace-nowrap absolute top-2"
                >
                  &#123; id:1, name:"A" &#125;
                </motion.div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-indigo-400">
                  <Globe size={28} />
                </div>
                <span className="text-xs text-slate-400 mt-2 font-mono">Server</span>
              </div>
            </div>
            <p className="text-sm text-slate-500 font-mono text-center">Stateless Request-Response Cycle</p>
          </div>
        );
      case 'websockets':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="flex items-center justify-between w-full max-w-sm px-4">
              <div className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-orange-500/50 flex items-center justify-center text-orange-400">
                <LayoutTemplate size={28} />
              </div>

              <div className="flex-1 px-4 relative flex flex-col items-center justify-center">
                <div className="h-1 w-full bg-orange-500/30 rounded-full relative overflow-hidden">
                  <motion.div 
                    className="absolute top-0 h-full w-4 bg-orange-400 blur-sm rounded-full"
                    animate={{ left: ['0%', '100%'] }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear", repeatType: "reverse" }}
                  />
                </div>
                <span className="text-[10px] text-orange-400 mt-2 font-mono bg-orange-500/10 px-2 py-0.5 rounded-full">Persistent TCP Connection</span>
              </div>

              <div className="w-16 h-16 rounded-xl bg-slate-800 border-2 border-orange-500/50 flex items-center justify-center text-orange-400">
                <Globe size={28} />
              </div>
            </div>
            <p className="text-sm text-slate-500 font-mono text-center">Bi-directional, Full-duplex</p>
          </div>
        );
      case 'graphql':
        return (
          <div className="flex flex-col items-center justify-center h-full">
             <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 w-full max-w-xs">
                <div className="text-xs font-mono text-slate-400 mb-2">GraphQL Query:</div>
                <div className="font-mono text-sm text-pink-400 bg-slate-900 p-2 rounded border border-slate-800">
                  query &#123;<br/>
                  &nbsp;&nbsp;user(id: 1) &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;name<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;avatar_url<br/>
                  &nbsp;&nbsp;&#125;<br/>
                  &#125;
                </div>
             </div>
             <motion.div 
               animate={{ y: [0, 10, 0] }} 
               transition={{ duration: 2, repeat: Infinity }}
               className="text-slate-500 my-2"
             >
               ↓
             </motion.div>
             <div className="bg-slate-800 rounded-xl p-4 border border-slate-700 w-full max-w-xs">
                <div className="text-xs font-mono text-slate-400 mb-2">JSON Response:</div>
                <div className="font-mono text-sm text-green-400 bg-slate-900 p-2 rounded border border-slate-800">
                  &#123;<br/>
                  &nbsp;&nbsp;"data": &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;"user": &#123;<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "A",<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"avatar_url": "..."<br/>
                  &nbsp;&nbsp;&nbsp;&nbsp;&#125;<br/>
                  &nbsp;&nbsp;&#125;<br/>
                  &#125;
                </div>
             </div>
          </div>
        );
      case 'grpc':
        return (
          <div className="flex flex-col items-center justify-center h-full space-y-6">
            <div className="flex items-center justify-between w-full max-w-sm px-4">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
                  <LayoutTemplate size={28} />
                </div>
                <span className="text-xs text-slate-400 mt-2 font-mono">Microservice A</span>
              </div>

              <div className="flex-1 px-4 relative flex flex-col items-center">
                {/* Binary Request */}
                <motion.div 
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: [ -20, 20, 20 ], opacity: [0, 1, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="bg-teal-500/20 text-teal-400 text-[10px] px-2 py-1 rounded-full font-mono whitespace-nowrap absolute -top-4"
                >
                  010110... (Protobuf)
                </motion.div>
                <div className="h-0.5 w-full bg-slate-700 relative">
                  <motion.div 
                    className="absolute top-0 left-0 h-full w-full bg-teal-500 origin-left"
                    animate={{ scaleX: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                </div>
                <div className="text-[10px] text-slate-500 font-mono absolute top-2 mt-2">HTTP/2 Multiplexing</div>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-xl bg-slate-800 border border-slate-700 flex items-center justify-center text-teal-400">
                  <Server size={28} />
                </div>
                <span className="text-xs text-slate-400 mt-2 font-mono">Microservice B</span>
              </div>
            </div>
            <div className="bg-slate-800 p-3 rounded-lg border border-slate-700 text-xs font-mono text-slate-400 max-w-xs">
              <span className="text-pink-400">message</span> <span className="text-yellow-400">UserRequest</span> &#123;<br/>
              &nbsp;&nbsp;<span className="text-blue-400">int32</span> id = 1;<br/>
              &#125;
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="h-full flex flex-col">
      <header className="mb-8">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Globe className="text-indigo-400" size={24} />
          </div>
          <h2 className="text-2xl font-bold text-slate-100">Giao tiếp & APIs</h2>
        </div>
        <p className="text-slate-400 text-sm max-w-3xl">
          Trong một hệ thống phân tán, các thành phần (Client-Server hoặc Server-Server) cần một cách thức chuẩn mực để nói chuyện với nhau. Lựa chọn giao thức và kiểu API phù hợp ảnh hưởng rất lớn đến hiệu suất, độ trễ và trải nghiệm nhà phát triển.
        </p>
      </header>

      {/* Navigation Tabs */}
      <div className="flex flex-wrap gap-2 mb-8">
        {API_TYPES.map((type) => {
          const Icon = type.icon;
          const isActive = activeTab === type.id;
          return (
            <button
              key={type.id}
              onClick={() => setActiveTab(type.id)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 relative overflow-hidden group
                ${isActive ? 'text-white' : 'text-slate-400 hover:text-slate-200 bg-slate-800/50 hover:bg-slate-800'}`}
            >
              {isActive && (
                <div className={`absolute inset-0 bg-gradient-to-r ${type.color} opacity-20`} />
              )}
              {isActive && (
                <motion.div
                  layoutId="activeApiTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-white/50"
                />
              )}
              <Icon size={18} className={`relative z-10 ${isActive ? 'text-white' : 'group-hover:scale-110 transition-transform'}`} />
              <span className="relative z-10">{type.title}</span>
            </button>
          );
        })}
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 grid lg:grid-cols-2 gap-8">
        
        {/* Detail Panel */}
        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6 flex flex-col overflow-y-auto custom-scrollbar">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <div className={`p-2 rounded-lg bg-gradient-to-br ${activeData.color} bg-opacity-10`}>
                    <ActiveIcon className="text-white" size={20} />
                  </div>
                  <h3 className="text-xl font-bold text-slate-100">{activeData.title}</h3>
                </div>
                <p className="text-sm text-indigo-400 font-medium mb-3">{activeData.subtitle}</p>
                <p className="text-slate-300 text-sm leading-relaxed">{activeData.description}</p>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                    <CheckCircle2 size={16} /> Ưu điểm
                  </h4>
                  <ul className="space-y-2">
                    {activeData.pros.map((pro, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-emerald-500 mt-0.5">•</span>
                        <span>{pro}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700/50">
                  <h4 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
                    <XCircle size={16} /> Nhược điểm
                  </h4>
                  <ul className="space-y-2">
                    {activeData.cons.map((con, i) => (
                      <li key={i} className="text-sm text-slate-300 flex items-start gap-2">
                        <span className="text-rose-500 mt-0.5">•</span>
                        <span>{con}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="bg-slate-800/30 rounded-xl p-4 border border-slate-700/30">
                <h4 className="text-sm font-semibold text-slate-200 mb-3">Trường hợp sử dụng (Use Cases)</h4>
                <div className="flex flex-wrap gap-2">
                  {activeData.useCases.map((useCase, i) => (
                    <span key={i} className="text-xs font-medium bg-slate-800 text-slate-300 px-2.5 py-1.5 rounded-lg border border-slate-700">
                      {useCase}
                    </span>
                  ))}
                </div>
              </div>

            </motion.div>
          </AnimatePresence>
        </div>

        {/* Animation Panel */}
        <div className="bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden flex flex-col">
          <div className="p-4 border-b border-slate-800 bg-slate-900/80 backdrop-blur-sm relative z-10">
            <h3 className="text-sm font-semibold text-slate-300 flex items-center gap-2">
              <Activity size={16} className="text-indigo-400" /> Mô phỏng hoạt động
            </h3>
          </div>
          
          <div className="flex-1 relative flex items-center justify-center p-6 min-h-[300px]">
            {/* Background grid */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:14px_24px] pointer-events-none opacity-30" />
            
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="w-full h-full relative z-10"
              >
                {renderAnimation(activeData.animation)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NetworkApis;
