import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Fingerprint, Network, User, Mail, Video as VideoIcon, Map, ArrowRight, CheckCircle2, KeyRound } from 'lucide-react';
import GlowingCard from '../ui/GlowingCard';

const SsoCaseStudy = () => {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < 5) setStep(prev => prev + 1);
  };

  const handleReset = () => {
    setStep(0);
  };

  // Helper component to render a "Service" block
  const ServiceBlock = ({ name, icon: Icon, color, isActive, hasToken }) => (
    <div className={`p-4 rounded-xl border flex flex-col items-center justify-center transition-all duration-300 relative
      ${isActive ? `border-${color}-500 shadow-[0_0_15px_rgba(var(--${color}-500),0.3)] bg-slate-800` : 'border-slate-800 bg-slate-900/50'}
    `}>
      <Icon className={`mb-2 ${isActive ? `text-${color}-400` : 'text-slate-500'}`} size={32} />
      <span className={`font-bold ${isActive ? 'text-white' : 'text-slate-500'}`}>{name}</span>
      
      <AnimatePresence>
        {hasToken && (
          <motion.div 
            initial={{ scale: 0 }} 
            animate={{ scale: 1 }} 
            className="absolute -top-3 -right-3 bg-emerald-500 text-slate-900 p-1 rounded-full shadow-lg"
          >
            <CheckCircle2 size={20} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <div className="space-y-8 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
          <Fingerprint className="text-emerald-500" size={32} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-teal-500">
            Thiết kế hệ thống SSO (Single Sign-On)
          </span>
        </h1>
        <p className="text-slate-400 text-lg">
          Làm thế nào để người dùng chỉ cần đăng nhập 1 lần và sử dụng được tất cả các dịch vụ trong hệ sinh thái (Ví dụ: Google Workspace).
        </p>
      </motion.div>

      {/* Intro */}
      <div className="grid md:grid-cols-2 gap-6">
        <GlowingCard className="bg-slate-900/50">
          <h3 className="text-xl font-bold text-slate-200 mb-4">Vấn đề (Without SSO)</h3>
          <p className="text-slate-400 mb-4">Nếu có 10 ứng dụng khác nhau, người dùng phải nhớ 10 mật khẩu. Mỗi ứng dụng tự xây dựng luồng Đăng nhập/Đăng ký riêng gây trùng lặp code và rủi ro bảo mật.</p>
        </GlowingCard>

        <GlowingCard className="bg-slate-900/50">
          <h3 className="text-xl font-bold text-emerald-400 mb-4">Giải pháp (With SSO)</h3>
          <p className="text-slate-400 mb-4">Tách việc Xác thực (Authentication) ra một Server độc lập (Centralized Identity Provider). Các ứng dụng chỉ cần uỷ quyền việc xác minh danh tính cho Server này (qua giao thức OIDC/SAML).</p>
        </GlowingCard>
      </div>

      {/* Interactive Architecture */}
      <GlowingCard className="bg-slate-900/80 p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <h2 className="text-xl font-bold mb-2 text-slate-200">Luồng hoạt động SSO (Interactive)</h2>
            <div className="h-10 text-slate-400">
              {step === 0 && "Bấm 'Bước tiếp theo' để xem cách người dùng tương tác với nhiều dịch vụ."}
              {step === 1 && <span className="text-blue-400">1. User truy cập App Gmail (chưa login) -&gt; Bị đẩy về SSO Server.</span>}
              {step === 2 && <span className="text-emerald-400">2. User nhập User/Pass tại SSO Server. Đăng nhập thành công!</span>}
              {step === 3 && <span className="text-blue-400">3. SSO trả về Token cho Gmail. User sử dụng Gmail bình thường.</span>}
              {step === 4 && <span className="text-rose-400">4. User chuyển sang App Youtube -&gt; Bị đẩy về SSO Server để kiểm tra.</span>}
              {step === 5 && <span className="text-emerald-400">5. SSO Server nhận ra User ĐÃ ĐĂNG NHẬP trước đó. Trả ngay Token cho Youtube (Không cần nhập lại pass).</span>}
            </div>
          </div>
          
          <div className="flex gap-3 shrink-0">
            <button 
              onClick={handleReset}
              className="px-4 py-2 rounded-lg font-medium bg-slate-800 text-slate-300 hover:bg-slate-700 transition-colors"
            >
              Reset
            </button>
            <button 
              onClick={handleNext}
              disabled={step === 5}
              className="px-4 py-2 rounded-lg font-medium bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
            >
              {step === 5 ? 'Hoàn tất' : 'Bước tiếp theo'} <ArrowRight size={16} />
            </button>
          </div>
        </div>

        {/* Diagram Area */}
        <div className="relative w-full h-[400px] bg-slate-950 rounded-xl border border-slate-800 p-8 flex items-center justify-center overflow-hidden">
          
          {/* User Node */}
          <div className="absolute left-4 top-1/2 -translate-y-1/2 flex flex-col items-center">
            <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center border-2 border-slate-600 z-10">
              <User size={32} className={step >= 2 ? 'text-emerald-400' : 'text-slate-400'} />
            </div>
            <span className="mt-2 font-bold text-slate-300">User</span>
          </div>

          {/* Central SSO Node */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 flex flex-col items-center">
            <div className={`w-20 h-20 rounded-2xl flex items-center justify-center border-2 z-10 transition-colors duration-500
              ${step >= 2 ? 'bg-emerald-900/30 border-emerald-500 shadow-[0_0_30px_rgba(16,185,129,0.3)]' : 'bg-slate-900 border-slate-700'}`}>
              <KeyRound size={40} className={step >= 2 ? 'text-emerald-400' : 'text-slate-500'} />
            </div>
            <span className="mt-2 font-bold text-white bg-slate-900 px-3 py-1 rounded-full border border-slate-800">
              SSO Identity Provider
            </span>
            {step >= 2 && <span className="text-xs text-emerald-400 mt-1">Global Session: Active</span>}
          </div>

          {/* Service Apps (Right Side) */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 flex flex-col gap-8 w-40">
            {/* App A: Gmail */}
            <ServiceBlock 
              name="App 1: Mail" 
              icon={Mail} 
              color="blue" 
              isActive={step === 1 || step === 3} 
              hasToken={step >= 3} 
            />
            {/* App B: Youtube */}
            <ServiceBlock 
              name="App 2: Video" 
              icon={VideoIcon} 
              color="rose" 
              isActive={step === 4 || step === 5} 
              hasToken={step >= 5} 
            />
          </div>

          {/* Animated Connecting Lines / Packets */}
          <AnimatePresence>
            {/* Step 1: User to Mail to SSO */}
            {step === 1 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none">
                 <div className="absolute top-1/2 left-24 h-0.5 w-[calc(100%-16rem)] bg-blue-500/50" />
                 <div className="absolute top-24 left-1/2 w-0.5 h-[calc(50%-6rem)] bg-blue-500/50" />
              </motion.div>
            )}

            {/* Step 2: Auth Success at SSO */}
            {step === 2 && (
               <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ opacity: 0 }} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-emerald-500 font-bold bg-slate-900 p-2 rounded-lg border border-emerald-500/30">
                 Đăng nhập thành công!
               </motion.div>
            )}

            {/* Step 4: User to Video to SSO */}
            {step === 4 && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 pointer-events-none">
                 <div className="absolute bottom-1/4 left-24 h-0.5 w-[calc(100%-16rem)] bg-rose-500/50" />
                 <div className="absolute top-24 right-1/4 w-0.5 h-[calc(75%-6rem)] bg-rose-500/50" />
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </GlowingCard>

      {/* Deep Dive Section */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-800 pb-4">Kiến thức chuyên sâu (Deep Dive)</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <GlowingCard className="bg-slate-900/40">
            <h3 className="text-xl font-bold text-blue-400 mb-4 flex items-center gap-2">
              <Network size={20} /> Giao thức SSO phổ biến
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <strong className="text-blue-300 block mb-1">SAML 2.0 (Security Assertion Markup Language):</strong> 
                Chuẩn công nghiệp lâu đời, dùng XML. Thường dùng trong môi trường Doanh nghiệp (Enterprise) cho B2B SSO. Hỗ trợ Single Logout (SLO) rất tốt nhưng setup khá phức tạp.
              </li>
              <li className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <strong className="text-sky-300 block mb-1">OIDC (OpenID Connect):</strong> 
                Giao thức hiện đại xây dựng trên nền tảng OAuth 2.0, dùng JSON/JWT. Rất nhẹ và phù hợp cho Web/Mobile App hiện đại, B2C (VD: Đăng nhập bằng Google, Facebook).
              </li>
            </ul>
          </GlowingCard>

          <GlowingCard className="bg-slate-900/40">
            <h3 className="text-xl font-bold text-rose-400 mb-4 flex items-center gap-2">
              <Fingerprint size={20} /> Thách thức khi làm SSO
            </h3>
            <ul className="space-y-4 text-sm text-slate-300">
              <li className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <strong className="text-rose-300 block mb-1">Single Point of Failure (SPOF):</strong> 
                Nếu SSO Server sập, người dùng không thể đăng nhập vào BẤT KỲ ứng dụng nào. Cần kiến trúc HA (High Availability) với nhiều cụm Server và Database Replica.
              </li>
              <li className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                <strong className="text-orange-300 block mb-1">Single Logout (SLO):</strong> 
                Khi User bấm Đăng xuất ở App A, làm sao để App B cũng biết mà đăng xuất theo? SSO Server phải lưu danh sách các App mà User đang truy cập để gửi tín hiệu "hủy session" hàng loạt (thường dùng Webhook).
              </li>
            </ul>
          </GlowingCard>
        </div>
      </div>
    </div>
  );
};

export default SsoCaseStudy;
