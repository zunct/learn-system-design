import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Target, 
  Map, 
  ZoomIn, 
  CheckCircle, 
  MessageSquare, 
  Database, 
  Server, 
  Zap,
  Activity,
  ArrowRight,
  ListChecks,
  BrainCircuit,
  Layers,
  Settings
} from 'lucide-react';
import GlowingCard from '../ui/GlowingCard';

const SystemDesignFramework = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = [
    {
      id: 1,
      title: 'Bước 1: Xác định Bài toán & Phạm vi',
      subtitle: 'Understand the Problem & Scope',
      icon: Target,
      color: 'sky',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">Tuyệt đối không lao vào thiết kế ngay. Hãy đặt câu hỏi để làm rõ bài toán.</p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-sky-500/30">
              <h4 className="font-bold text-sky-400 mb-2 flex items-center gap-2">
                <ListChecks size={16} /> Functional (Chức năng cốt lõi)
              </h4>
              <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                <li>Ứng dụng làm gì? (VD: Đăng ảnh, nhắn tin, đặt xe).</li>
                <li>Ai là người sử dụng? Hệ thống có bao nhiêu DAU (Daily Active Users)?</li>
                <li>Hành vi phổ biến nhất là gì? (Tỉ lệ Đọc/Ghi là bao nhiêu?).</li>
              </ul>
            </div>
            
            <div className="bg-slate-900/80 p-4 rounded-xl border border-sky-500/30">
              <h4 className="font-bold text-emerald-400 mb-2 flex items-center gap-2">
                <Activity size={16} /> Non-Functional (Phi chức năng)
              </h4>
              <ul className="text-sm text-slate-400 space-y-2 list-disc pl-4">
                <li>Hệ thống có cần tính <strong>High Availability</strong> (Luôn sống) không?</li>
                <li>Độ trễ (Latency) cho phép là bao nhiêu?</li>
                <li>Tính nhất quán dữ liệu (Consistency) quan trọng thế nào? (Tham chiếu Định lý CAP).</li>
              </ul>
            </div>
          </div>
          
          <div className="mt-4 p-4 bg-sky-900/20 border border-sky-500/50 rounded-xl">
            <h4 className="font-bold text-white mb-2 text-sm flex items-center gap-2">
              <BrainCircuit size={16} className="text-amber-400"/> Back-of-the-envelope Estimation (Ước tính tải)
            </h4>
            <p className="text-sm text-slate-300">Tính toán nhanh QPS (Queries Per Second), dung lượng lưu trữ (Storage), băng thông mạng (Bandwidth) để chọn công nghệ phù hợp.</p>
          </div>
        </div>
      )
    },
    {
      id: 2,
      title: 'Bước 2: Thiết kế Tổng thể',
      subtitle: 'Propose High-level Design',
      icon: Map,
      color: 'fuchsia',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">Phác thảo bức tranh lớn để các bên liên quan (Interviewer/Stakeholders) đồng ý với hướng đi.</p>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-slate-900/80 p-4 rounded-xl border border-fuchsia-500/30 text-center">
              <MessageSquare className="mx-auto mb-2 text-fuchsia-400" size={24} />
              <h4 className="font-bold text-white mb-1">Xác định API</h4>
              <p className="text-xs text-slate-400">Thiết kế các API Endpoint chính (REST/GraphQL/gRPC). Đầu vào/Đầu ra là gì?</p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-fuchsia-500/30 text-center">
              <Database className="mx-auto mb-2 text-fuchsia-400" size={24} />
              <h4 className="font-bold text-white mb-1">Data Schema</h4>
              <p className="text-xs text-slate-400">Chọn SQL hay NoSQL? Thiết kế bảng/document lưu trữ dữ liệu như thế nào?</p>
            </div>
            <div className="bg-slate-900/80 p-4 rounded-xl border border-fuchsia-500/30 text-center">
              <Layers className="mx-auto mb-2 text-fuchsia-400" size={24} />
              <h4 className="font-bold text-white mb-1">Sơ đồ khối</h4>
              <p className="text-xs text-slate-400">Vẽ Client {`->`} Load Balancer {`->`} API Servers {`->`} Database.</p>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 3,
      title: 'Bước 3: Đi sâu vào Chi tiết',
      subtitle: 'Design Deep Dive',
      icon: ZoomIn,
      color: 'amber',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">Đóng vai trò "Bác sĩ" để bắt bệnh hệ thống (Bottlenecks) và kê đơn thuốc bằng <strong className="text-white">Kiến thức Hiện có</strong>.</p>
          
          <div className="bg-slate-950 p-6 rounded-xl border border-amber-500/30">
            <h4 className="font-bold text-amber-400 mb-4">Kho "Vũ khí" giải quyết Nút thắt:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
              <div className="bg-slate-900 p-3 rounded-lg flex flex-col items-center justify-center text-center gap-2 hover:bg-slate-800 transition-colors">
                <Server className="text-emerald-400" />
                <span>LB & Scale Out<br/><span className="text-[10px] text-slate-500">(Chương 2)</span></span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg flex flex-col items-center justify-center text-center gap-2 hover:bg-slate-800 transition-colors">
                <Zap className="text-amber-400" />
                <span>Redis / Cache<br/><span className="text-[10px] text-slate-500">(Chương 2)</span></span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg flex flex-col items-center justify-center text-center gap-2 hover:bg-slate-800 transition-colors">
                <Database className="text-sky-400" />
                <span>DB Sharding<br/><span className="text-[10px] text-slate-500">(Chương 3)</span></span>
              </div>
              <div className="bg-slate-900 p-3 rounded-lg flex flex-col items-center justify-center text-center gap-2 hover:bg-slate-800 transition-colors">
                <Settings className="text-purple-400" />
                <span>Message Queue<br/><span className="text-[10px] text-slate-500">(Chương 4)</span></span>
              </div>
            </div>
            <div className="mt-4 p-3 bg-amber-900/20 text-amber-200 text-sm rounded border border-amber-500/20">
              Ví dụ: Nếu Database quá tải tác vụ Ghi {`->`} Bơm Message Queue vào. Nếu User kêu Web chậm {`->`} Đẩy tĩnh lên CDN, thêm Redis Cache.
            </div>
          </div>
        </div>
      )
    },
    {
      id: 4,
      title: 'Bước 4: Tổng kết & Tối ưu',
      subtitle: 'Wrap Up',
      icon: CheckCircle,
      color: 'emerald',
      content: (
        <div className="space-y-4">
          <p className="text-slate-300">Không có thiết kế nào hoàn hảo 100%. Hãy tự chỉ ra điểm yếu của hệ thống mình vừa thiết kế.</p>
          
          <ul className="space-y-3">
            <li className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-lg border border-emerald-500/20">
              <div className="w-6 h-6 rounded-full bg-rose-500/20 flex items-center justify-center shrink-0 mt-0.5"><Activity size={14} className="text-rose-400"/></div>
              <div>
                <strong className="text-white text-sm">Điểm mù (SPOF)</strong>
                <p className="text-slate-400 text-xs mt-1">Single Point of Failure: Nếu Load Balancer chết thì sao? DB Master sập thì sao?</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-lg border border-emerald-500/20">
              <div className="w-6 h-6 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0 mt-0.5"><Activity size={14} className="text-sky-400"/></div>
              <div>
                <strong className="text-white text-sm">Observability (Chương 6)</strong>
                <p className="text-slate-400 text-xs mt-1">Làm sao biết hệ thống đang lỗi? Cần cài đặt Metrics, Logs, Tracing ở đâu?</p>
              </div>
            </li>
            <li className="flex items-start gap-3 bg-slate-900/80 p-3 rounded-lg border border-emerald-500/20">
              <div className="w-6 h-6 rounded-full bg-fuchsia-500/20 flex items-center justify-center shrink-0 mt-0.5"><ArrowRight size={14} className="text-fuchsia-400"/></div>
              <div>
                <strong className="text-white text-sm">Next scale</strong>
                <p className="text-slate-400 text-xs mt-1">Nếu Traffic x10, x100 lần hiện tại, hệ thống này sẽ thay đổi như thế nào?</p>
              </div>
            </li>
          </ul>
        </div>
      )
    }
  ];

  return (
    <div className="space-y-8 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
          <ListChecks className="text-indigo-500" size={40} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-500">
            Khung Tư Duy 4 Bước (Framework)
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-3xl">
          Khi đối mặt với bất kỳ bài toán System Design nào (đi phỏng vấn hoặc làm việc thực tế), tuyệt đối đừng "cắm đầu" vẽ ngay. Hãy tuân thủ <strong>Framework 4 Bước</strong> kinh điển dưới đây và sử dụng kho vũ khí bạn đã học ở các chương trước.
        </p>
      </motion.div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Stepper Navigation */}
        <div className="lg:w-1/3 flex flex-col gap-3">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            const isActive = activeStep === step.id;
            const isCompleted = activeStep > step.id;
            
            return (
              <button
                key={step.id}
                onClick={() => setActiveStep(step.id)}
                className={`text-left p-4 rounded-xl border-2 transition-all duration-300 relative overflow-hidden group
                  ${isActive 
                    ? `bg-${step.color}-900/20 border-${step.color}-500/50 shadow-[0_0_20px_rgba(var(--${step.color}-500),0.2)]` 
                    : isCompleted 
                      ? 'bg-slate-900/80 border-emerald-500/30' 
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-600'
                  }`}
              >
                {isActive && (
                  <motion.div layoutId="activeStepIndicator" className={`absolute left-0 top-0 bottom-0 w-1 bg-${step.color}-500`} />
                )}
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 transition-colors
                    ${isActive 
                      ? `bg-${step.color}-500 text-white shadow-lg shadow-${step.color}-500/50` 
                      : isCompleted 
                        ? 'bg-emerald-500/20 text-emerald-400' 
                        : 'bg-slate-800 text-slate-500 group-hover:text-slate-300'
                    }`}
                  >
                    {isCompleted ? <CheckCircle size={20} /> : <Icon size={20} />}
                  </div>
                  <div>
                    <h3 className={`font-bold text-sm ${isActive ? 'text-white' : 'text-slate-400'}`}>
                      {step.title}
                    </h3>
                    <p className={`text-xs ${isActive ? `text-${step.color}-300` : 'text-slate-500'}`}>
                      {step.subtitle}
                    </p>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Step Content */}
        <div className="lg:w-2/3">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="h-full"
            >
              <GlowingCard className="h-full bg-slate-900/80 border-slate-800 p-6 md:p-8">
                <div className="flex items-center gap-3 mb-6 pb-6 border-b border-slate-800">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center bg-${steps[activeStep-1].color}-500/20 text-${steps[activeStep-1].color}-400`}>
                    {React.createElement(steps[activeStep-1].icon, { size: 24 })}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-white">{steps[activeStep-1].title}</h2>
                    <p className={`text-${steps[activeStep-1].color}-400 font-mono text-sm mt-1`}>
                      {steps[activeStep-1].subtitle}
                    </p>
                  </div>
                </div>
                
                {steps[activeStep-1].content}
                
                <div className="mt-8 flex justify-between items-center pt-6 border-t border-slate-800">
                  <button 
                    onClick={() => setActiveStep(prev => Math.max(1, prev - 1))}
                    disabled={activeStep === 1}
                    className={`px-4 py-2 rounded font-medium text-sm transition-colors ${activeStep === 1 ? 'text-slate-600 cursor-not-allowed' : 'text-slate-400 hover:text-white hover:bg-slate-800'}`}
                  >
                    Khung trước
                  </button>
                  <button 
                    onClick={() => setActiveStep(prev => Math.min(steps.length, prev + 1))}
                    disabled={activeStep === steps.length}
                    className={`px-6 py-2 rounded-lg font-bold text-sm transition-colors flex items-center gap-2
                      ${activeStep === steps.length 
                        ? 'bg-slate-800 text-slate-600 cursor-not-allowed' 
                        : `bg-${steps[activeStep-1].color}-600 hover:bg-${steps[activeStep-1].color}-500 text-white shadow-lg shadow-${steps[activeStep-1].color}-500/30`
                      }`}
                  >
                    Bước tiếp theo <ArrowRight size={16} />
                  </button>
                </div>
              </GlowingCard>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default SystemDesignFramework;
