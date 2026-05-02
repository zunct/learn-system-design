import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Key, UserCheck, ArrowRight, ArrowLeft, RefreshCw, Database } from 'lucide-react';
import GlowingCard from './ui/GlowingCard';

const SequenceMessage = ({ step, activeStep, from, to, text, delay = 0 }) => {
  const isVisible = activeStep >= step;
  const isCurrent = activeStep === step;
  const isLeftToRight = from < to;
  
  const leftPos = Math.min(from, to);
  const widthPct = Math.abs(to - from);

  return (
    <div className={`relative h-16 w-full flex items-center transition-all duration-500 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {/* Line & Arrow */}
      <motion.div 
        initial={{ width: '0%' }}
        animate={{ width: isVisible ? `${widthPct}%` : '0%' }}
        transition={{ duration: 0.5, delay: isVisible ? delay : 0, ease: "easeInOut" }}
        className={`absolute h-0.5 ${isCurrent ? 'bg-indigo-400' : 'bg-slate-600'}`}
        style={{ left: `${isLeftToRight ? from : to}%`, originX: isLeftToRight ? 0 : 1 }}
      >
        <div className={`absolute top-1/2 -translate-y-1/2 ${isLeftToRight ? '-right-1' : '-left-1'} 
                         w-0 h-0 border-t-[5px] border-t-transparent border-b-[5px] border-b-transparent 
                         ${isLeftToRight ? 'border-l-[6px]' : 'border-r-[6px]'} 
                         ${isCurrent ? (isLeftToRight ? 'border-l-indigo-400' : 'border-r-indigo-400') : (isLeftToRight ? 'border-l-slate-600' : 'border-r-slate-600')}`} 
        />
      </motion.div>
      
      {/* Text Label */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 10 }}
        transition={{ duration: 0.3, delay: isVisible ? delay + 0.3 : 0 }}
        className={`absolute text-center text-xs md:text-sm font-mono z-10 -mt-6`}
        style={{ left: `${leftPos}%`, width: `${widthPct}%` }}
      >
        <span className={`px-2 bg-slate-950 rounded ${isCurrent ? 'text-indigo-300 font-bold' : 'text-slate-400'}`}>
          {text}
        </span>
      </motion.div>
    </div>
  );
};

const AuthSecurity = () => {
  const [activeStep, setActiveStep] = useState(0);

  const stepsInfo = [
    { title: "Bắt đầu", desc: "Tìm hiểu luồng cấp quyền an toàn và phổ biến nhất hiện nay: OAuth 2.0 Authorization Code Flow." },
    { title: "Bước 1: Xin uỷ quyền", desc: "Client (App của bạn) chuyển hướng người dùng đến Auth Server (vd: Google) để xin quyền truy cập." },
    { title: "Bước 2: Cấp Auth Code", desc: "Người dùng đồng ý, Auth Server sinh ra một 'Mã uỷ quyền' (Authorization Code) ngắn hạn và gửi về Client." },
    { title: "Bước 3: Đổi Code lấy Token", desc: "Client dùng Code này kết hợp với Client Secret (chìa khoá bí mật) gọi API ngầm lên Auth Server để đổi Token." },
    { title: "Bước 4: Cấp Access Token", desc: "Auth Server xác thực thành công và trả về Access Token (thường là JWT) cho Client." },
    { title: "Bước 5: Truy cập API", desc: "Client dùng Access Token đính kèm trong Header (Bearer) để gọi lên Resource Server." },
    { title: "Bước 6: Trả về dữ liệu", desc: "Resource Server xác thực Token hợp lệ và trả về dữ liệu được yêu cầu." },
  ];

  const handleNext = () => {
    if (activeStep < 6) setActiveStep(prev => prev + 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <div className="space-y-8 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
          <Shield className="text-indigo-500" size={32} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-500">
            Xác Thực & Phân Quyền (AuthN vs AuthZ)
          </span>
        </h1>
        <p className="text-slate-400 text-lg">
          Tìm hiểu sự khác biệt cốt lõi giữa Authentication (Mày là ai?) và Authorization (Mày được làm gì?) và cơ chế hoạt động của OAuth 2.0.
        </p>
      </motion.div>

      {/* AuthN vs AuthZ */}
      <div className="grid md:grid-cols-2 gap-6">
        <GlowingCard className="bg-slate-900/50">
          <h3 className="text-xl font-bold text-fuchsia-400 mb-4 flex items-center gap-2">
            <UserCheck /> Authentication (AuthN)
          </h3>
          <ul className="space-y-3 text-slate-300">
            <li><strong className="text-white">Định nghĩa:</strong> Xác minh danh tính người dùng.</li>
            <li><strong className="text-white">Câu hỏi:</strong> "Bạn là ai?"</li>
            <li><strong className="text-white">Ví dụ:</strong> Đăng nhập bằng Email/Password, FaceID, vân tay, mã OTP.</li>
          </ul>
        </GlowingCard>

        <GlowingCard className="bg-slate-900/50">
          <h3 className="text-xl font-bold text-indigo-400 mb-4 flex items-center gap-2">
            <Key /> Authorization (AuthZ)
          </h3>
          <ul className="space-y-3 text-slate-300">
            <li><strong className="text-white">Định nghĩa:</strong> Xác minh quyền hạn của người dùng.</li>
            <li><strong className="text-white">Câu hỏi:</strong> "Bạn được phép làm gì?"</li>
            <li><strong className="text-white">Ví dụ:</strong> Quyền Admin/User, quyền Đọc/Ghi file, phân quyền theo Role (RBAC).</li>
          </ul>
        </GlowingCard>
      </div>

      {/* OAuth 2.0 Flow Interactive */}
      <GlowingCard className="bg-slate-900/80 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-2xl font-bold mb-2 text-slate-200">OAuth 2.0 Authorization Code Flow</h2>
            <div className="h-16">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-slate-400"
                >
                  <strong className="text-indigo-400 block">{stepsInfo[activeStep].title}</strong>
                  <span className="text-sm">{stepsInfo[activeStep].desc}</span>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={handleReset}
              className="px-4 py-2 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors flex items-center gap-2"
            >
              <RefreshCw size={16} /> Reset
            </button>
            <button 
              onClick={handleNext}
              disabled={activeStep === 6}
              className="px-4 py-2 rounded-lg font-medium bg-indigo-600 text-white hover:bg-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 shadow-[0_0_15px_rgba(79,70,229,0.3)]"
            >
              {activeStep === 6 ? 'Hoàn thành' : 'Bước tiếp theo'} {activeStep < 6 && <ArrowRight size={16} />}
            </button>
          </div>
        </div>

        {/* Sequence Diagram */}
        <div className="relative w-full bg-slate-950 p-4 md:p-8 rounded-xl border border-slate-800 overflow-x-auto">
          <div className="min-w-[600px]">
            {/* Headers */}
            <div className="flex justify-between mb-8 relative z-20">
              <div className="w-1/3 flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-indigo-500/30 mb-2 shadow-[0_0_15px_rgba(79,70,229,0.2)]">
                  <UserCheck className="text-indigo-400" />
                </div>
                <span className="font-bold text-slate-200">Client App</span>
              </div>
              <div className="w-1/3 flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-fuchsia-500/30 mb-2 shadow-[0_0_15px_rgba(217,70,239,0.2)]">
                  <Shield className="text-fuchsia-400" />
                </div>
                <span className="font-bold text-slate-200">Auth Server</span>
              </div>
              <div className="w-1/3 flex flex-col items-center">
                <div className="w-12 h-12 bg-slate-800 rounded-lg flex items-center justify-center border border-emerald-500/30 mb-2 shadow-[0_0_15px_rgba(16,185,129,0.2)]">
                  <Database className="text-emerald-400" />
                </div>
                <span className="font-bold text-slate-200">Resource Server</span>
              </div>
            </div>
            
            {/* Lifelines (Vertical Lines) */}
            <div className="absolute top-24 bottom-4 left-[16.66%] w-px bg-slate-800/80"></div>
            <div className="absolute top-24 bottom-4 left-[50%] w-px bg-slate-800/80"></div>
            <div className="absolute top-24 bottom-4 left-[83.33%] w-px bg-slate-800/80"></div>

            {/* Sequence Messages */}
            <div className="relative z-10 py-4">
              <SequenceMessage step={1} activeStep={activeStep} from={16.66} to={50} text="1. Login Redirect" />
              <SequenceMessage step={2} activeStep={activeStep} from={50} to={16.66} text="2. Auth Code" />
              <SequenceMessage step={3} activeStep={activeStep} from={16.66} to={50} text="3. Code + Secret -> Token" />
              <SequenceMessage step={4} activeStep={activeStep} from={50} to={16.66} text="4. Access Token (JWT)" />
              <SequenceMessage step={5} activeStep={activeStep} from={16.66} to={83.33} text="5. Call API w/ Bearer Token" />
              <SequenceMessage step={6} activeStep={activeStep} from={83.33} to={16.66} text="6. Protected Data" />
            </div>
          </div>
        </div>
      </GlowingCard>

      {/* Deep Dive Section */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-800 pb-4">Kiến thức chuyên sâu (Deep Dive)</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <GlowingCard className="bg-slate-900/40">
            <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <Key size={20} /> Access Token vs Refresh Token
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <strong className="text-emerald-300 block mb-1">Access Token:</strong> 
                Là chìa khóa đi vào các API. Thường có thời hạn rất ngắn (15p - 1h) để giảm rủi ro nếu bị lộ. Khi gửi lên API, token này không cần DB lookup mà được verify bằng thuật toán chữ ký.
              </li>
              <li className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <strong className="text-rose-300 block mb-1">Refresh Token:</strong> 
                Là "giấy phép" để đi xin Access Token mới khi cái cũ hết hạn. Có thời hạn dài (vài ngày - vài tháng). Khi Refresh Token hết hạn, User mới thực sự bị văng ra trang Login.
              </li>
            </ul>
          </GlowingCard>

          <GlowingCard className="bg-slate-900/40">
            <h3 className="text-xl font-bold text-sky-400 mb-4 flex items-center gap-2">
              <Database size={20} /> Cấu trúc của JWT (JSON Web Token)
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <p>JWT là chuẩn token phổ biến nhất hiện nay, gồm 3 phần ngăn cách bởi dấu chấm <code className="text-rose-400 bg-slate-950 px-1 rounded">.</code></p>
              <div className="font-mono bg-slate-950 p-3 rounded-lg text-xs break-all border border-slate-800">
                <span className="text-rose-400">eyJhbGciOiJIUzI1NiI</span>.
                <span className="text-fuchsia-400">eyJ1c2VySWQiOiIxMjM0In0</span>.
                <span className="text-sky-400">SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c</span>
              </div>
              <ul className="list-disc pl-5 space-y-1">
                <li><span className="text-rose-400 font-bold">Header:</span> Chứa thuật toán mã hóa (VD: HS256, RS256).</li>
                <li><span className="text-fuchsia-400 font-bold">Payload:</span> Chứa data (VD: UserID, Role, Expire time). Ai cũng đọc được phần này (Base64Decode). <strong className="text-rose-400">Không bỏ pass vào đây!</strong></li>
                <li><span className="text-sky-400 font-bold">Signature:</span> Chữ ký điện tử tạo từ Header + Payload + Secret Key. Dùng để chống việc Fake data.</li>
              </ul>
            </div>
          </GlowingCard>
        </div>
      </div>
    </div>
  );
};

export default AuthSecurity;
