import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldAlert, Server, Activity, Shield, Zap, Lock, Bug, Layers, CloudRain, ShieldCheck, ArrowRight } from 'lucide-react';
import GlowingCard from './ui/GlowingCard';

const DefenseLayer = ({ id, index, title, icon: Icon, activeColor, desc, enabled, onToggle, isLast }) => {
  return (
    <div className="flex items-center relative z-10 flex-col md:flex-row w-full md:w-auto">
      {/* Node */}
      <div 
        className={`relative flex flex-col items-center p-3 md:p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer w-full md:w-36
          ${enabled ? `border-${activeColor}-500 bg-${activeColor}-900/20 shadow-[0_0_15px_rgba(var(--${activeColor}-500),0.3)]` : 'border-slate-700 bg-slate-900/60 opacity-60 grayscale'}
        `}
        onClick={() => onToggle(id)}
      >
        <div className={`p-2 rounded-lg mb-2 ${enabled ? `bg-${activeColor}-500/20 text-${activeColor}-400` : 'bg-slate-800 text-slate-500'}`}>
          <Icon size={24} />
        </div>
        <span className={`text-xs md:text-sm font-bold text-center leading-tight ${enabled ? 'text-white' : 'text-slate-400'}`}>
          {title}
        </span>
        
        {/* Toggle Indicator */}
        <div className={`mt-3 w-8 h-4 rounded-full flex items-center p-0.5 transition-colors ${enabled ? `bg-${activeColor}-500` : 'bg-slate-700'}`}>
          <div className={`w-3 h-3 bg-white rounded-full shadow-md transform transition-transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`} />
        </div>
      </div>

      {/* Connecting Line */}
      {!isLast && (
        <div className="h-6 w-0.5 md:h-0.5 md:w-10 lg:w-16 bg-slate-700 relative my-2 md:my-0">
          <motion.div 
            className={`absolute top-0 left-0 w-full h-full ${enabled ? `bg-${activeColor}-500/50` : 'bg-transparent'}`}
          />
        </div>
      )}
    </div>
  );
};

const NetworkSecurity = () => {
  const [layers, setLayers] = useState({
    edge: true,
    waf: true,
    gateway: true,
    backend: true
  });

  const [activePackets, setActivePackets] = useState([]);
  const [systemStatus, setSystemStatus] = useState("Hệ thống hoạt động bình thường.");

  const toggleLayer = (id) => {
    // Prevent turning off backend
    if (id === 'backend') return;
    setLayers(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const attackTypes = {
    normal: { label: 'Traffic thường', color: 'emerald', threat: 'none' },
    ddos: { label: 'Tấn công DDoS', color: 'sky', threat: 'volumetric' },
    sqli: { label: 'SQL Injection', color: 'fuchsia', threat: 'l7' },
    brute: { label: 'Brute-force', color: 'amber', threat: 'auth' }
  };

  const layerDefs = [
    { id: 'edge', title: '1. CDN/Edge', icon: CloudRain, activeColor: 'sky', blocks: 'volumetric' },
    { id: 'waf', title: '2. WAF', icon: Shield, activeColor: 'fuchsia', blocks: 'l7' },
    { id: 'gateway', title: '3. API Gateway', icon: Zap, activeColor: 'amber', blocks: 'auth' },
    { id: 'backend', title: '4. Backend & DB', icon: Server, activeColor: 'emerald', blocks: 'none' }
  ];

  const sendTraffic = (type) => {
    const packetId = Date.now();
    const attack = attackTypes[type];
    
    // Determine where it gets blocked
    let blockIndex = -1;
    let finalStatus = "Thành công!";
    
    for (let i = 0; i < layerDefs.length; i++) {
      const layer = layerDefs[i];
      if (layers[layer.id] && layer.blocks === attack.threat) {
        blockIndex = i;
        finalStatus = `Bị chặn bởi ${layer.title}`;
        break;
      }
    }

    // If it's malicious and reaches the end without getting blocked
    if (blockIndex === -1 && attack.threat !== 'none') {
      blockIndex = 3; // Reaches backend
      if (attack.threat === 'volumetric') finalStatus = "HỆ THỐNG SẬP DO QUÁ TẢI (DDoS)!";
      if (attack.threat === 'l7') finalStatus = "BỊ XÂM NHẬP DỮ LIỆU (SQLi)!";
      if (attack.threat === 'auth') finalStatus = "BỊ DÒ RỈ MẬT KHẨU (Brute-force)!";
    }

    if (blockIndex === -1) blockIndex = 3; // Normal traffic reaches end

    setActivePackets(prev => [...prev, { id: packetId, type, color: attack.color, blockIndex, status: finalStatus }]);

    // Remove packet after animation and update status
    setTimeout(() => {
      setActivePackets(prev => prev.filter(p => p.id !== packetId));
      setSystemStatus(finalStatus);
    }, 2000);
  };

  return (
    <div className="space-y-8 pb-20">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl font-black mb-4 flex items-center gap-3">
          <ShieldAlert className="text-rose-500" size={32} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-rose-400 to-orange-500">
            Bảo Mật Hạ Tầng & Chống DDoS
          </span>
        </h1>
        <p className="text-slate-400 text-lg">
          Mô phỏng <strong>Defense in Depth</strong>. Hãy thử tắt các lớp phòng thủ và xem hệ thống bị xuyên thủng như thế nào!
        </p>
      </motion.div>

      <div className="grid lg:grid-cols-1 gap-8">
        {/* Defense in Depth Interactive */}
        <GlowingCard className="bg-slate-900/80 p-6 md:p-8 overflow-hidden">
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-2 text-slate-200 flex items-center gap-2">
              <Layers className="text-indigo-400" /> Sa bàn mô phỏng tấn công
            </h2>
            <p className="text-sm text-slate-400">Click vào tên các lớp bảo vệ để Bật/Tắt. Sau đó gửi traffic để xem kết quả.</p>
          </div>

          {/* Interactive Actions */}
          <div className="flex flex-wrap gap-3 mb-10">
            {Object.entries(attackTypes).map(([key, data]) => (
              <button 
                key={key}
                onClick={() => sendTraffic(key)}
                className={`px-4 py-2 rounded-lg font-medium border transition-colors flex items-center gap-2
                  bg-${data.color}-900/30 text-${data.color}-400 border-${data.color}-500/30 hover:bg-${data.color}-900/60`}
              >
                Gửi {data.label} <ArrowRight size={16} />
              </button>
            ))}
          </div>

          {/* Pipeline Diagram */}
          <div className="relative flex flex-col md:flex-row items-center justify-between bg-slate-950 p-6 rounded-2xl border border-slate-800 w-full overflow-x-auto min-h-[250px]">
            
            {/* Start Node */}
            <div className="flex flex-col items-center mr-0 md:mr-8 mb-4 md:mb-0 relative z-10 shrink-0">
              <div className="w-12 h-12 rounded-full bg-slate-800 flex items-center justify-center border-2 border-slate-600">
                <Activity className="text-slate-400" />
              </div>
              <span className="mt-2 text-sm font-bold text-slate-400">Internet</span>
            </div>

            {/* Connecting Line to first layer */}
            <div className="hidden md:block h-0.5 w-8 bg-slate-700 relative z-0"></div>

            {/* Layers */}
            <div className="flex flex-col md:flex-row items-center w-full justify-between">
              {layerDefs.map((layer, index) => (
                <DefenseLayer 
                  key={layer.id}
                  index={index}
                  isLast={index === layerDefs.length - 1}
                  enabled={layers[layer.id]}
                  onToggle={toggleLayer}
                  {...layer}
                />
              ))}
            </div>

            {/* Animated Packets */}
            <AnimatePresence>
              {activePackets.map(packet => (
                <motion.div
                  key={packet.id}
                  className={`absolute left-10 md:left-24 top-1/2 -translate-y-1/2 z-20 w-4 h-4 rounded-full bg-${packet.color}-500 shadow-[0_0_10px_rgba(var(--${packet.color}-500),0.8)]`}
                  initial={{ x: 0, opacity: 1, scale: 1 }}
                  animate={{ 
                    x: `${(packet.blockIndex + 1) * 20}vw`, // approximate translation based on index 
                    opacity: [1, 1, 0],
                    scale: [1, 1, 2]
                  }}
                  transition={{ duration: 1.5, ease: "linear" }}
                  onAnimationComplete={() => {}} // Cleaned up via timeout
                />
              ))}
            </AnimatePresence>
          </div>

          {/* System Status Alert */}
          <div className={`mt-6 p-4 rounded-xl border text-center font-mono font-bold text-lg transition-colors duration-300
            ${systemStatus.includes("SẬP") || systemStatus.includes("XÂM NHẬP") || systemStatus.includes("DÒ RỈ") ? 'bg-rose-900/30 border-rose-500 text-rose-400' : 
              systemStatus.includes("bởi") ? 'bg-amber-900/30 border-amber-500 text-amber-400' : 
              'bg-emerald-900/30 border-emerald-500 text-emerald-400'}
          `}>
            &gt;_ {systemStatus}
          </div>
        </GlowingCard>

        {/* Detailed Attack Vectors & Defense Strategies */}
        <div className="mt-8 space-y-6">
          <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-800 pb-4">Chi tiết các Vector Tấn công & Biện pháp phòng thủ</h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            {/* 1. Volumetric DDoS */}
            <GlowingCard className="bg-slate-900/40 p-6">
              <h3 className="font-bold text-sky-400 mb-4 flex items-center gap-2 text-xl">
                <CloudRain size={24} /> Volumetric DDoS (L3/L4)
              </h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <strong className="text-rose-400 block mb-1">Cách thức tấn công:</strong>
                  Hacker dùng Botnet (mạng lưới hàng triệu camera, router bị nhiễm mã độc) để thực hiện <em>UDP Flood</em> hoặc <em>SYN Flood</em>. Chúng bắn hàng chục Gbps dữ liệu rác liên tục làm nghẽn toàn bộ đường truyền cáp quang dẫn vào máy chủ của bạn (Bandwidth Exhaustion).
                </div>
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">Biện pháp phòng thủ (CDN/Edge):</strong>
                  Máy chủ nội bộ (Dù to đến đâu) cũng không thể tự chống đỡ! Bắt buộc phải sử dụng các dịch vụ Edge Network như Cloudflare, AWS Shield. Họ có hệ thống đường truyền Toàn cầu (Global Anycast) cực lớn, đóng vai trò như một "miếng bọt biển" để hấp thụ (absorb) và vứt bỏ lưu lượng rác dựa trên địa chỉ IP.
                </div>
              </div>
            </GlowingCard>

            {/* 2. L7 Attacks & SQLi */}
            <GlowingCard className="bg-slate-900/40 p-6">
              <h3 className="font-bold text-fuchsia-400 mb-4 flex items-center gap-2 text-xl">
                <Shield size={24} /> Application Layer (L7) & SQLi
              </h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <strong className="text-rose-400 block mb-1">Cách thức tấn công:</strong>
                  Tấn công có chủ đích vào Logic của App. Ví dụ <em>HTTP Flood</em> (gọi liên tục vào API xuất File Excel gây sập CPU), hoặc <em>SQL Injection</em> (Nhập mã <code>' OR 1=1 --</code> vào form Đăng nhập) để lừa Database thực thi truy vấn xóa bảng, lấy cắp dữ liệu khách hàng.
                </div>
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">Biện pháp phòng thủ (WAF):</strong>
                  Triển khai WAF (Web Application Firewall) đứng trước App. WAF sẽ nội soi sâu vào Body của từng HTTP Request. Dựa trên các tập luật (OWASP Top 10) và Machine Learning, nó sẽ phát hiện các chuỗi RegEx có chứa SQL độc hại, XSS script, hay User-Agent của Bot để chặn ngay lập tức.
                </div>
              </div>
            </GlowingCard>

            {/* 3. Brute-force & Credential Stuffing */}
            <GlowingCard className="bg-slate-900/40 p-6">
              <h3 className="font-bold text-amber-400 mb-4 flex items-center gap-2 text-xl">
                <Zap size={24} /> Brute-Force & Credential Stuffing
              </h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <strong className="text-rose-400 block mb-1">Cách thức tấn công:</strong>
                  Hacker thu thập hàng tỷ combo (Username/Password) bị lộ từ các vụ sập web khác. Sau đó viết Script tự động thử liên tục các bộ ID/Pass này vào API Đăng nhập của ứng dụng bạn. Tỷ lệ thành công cực cao do người dùng hay đặt 1 pass cho nhiều nơi.
                </div>
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">Biện pháp phòng thủ (API Gateway & IAM):</strong>
                  Cài đặt thuật toán Rate Limiting (Token Bucket) ở API Gateway để chỉ cho phép thử sai mật khẩu 5 lần/phút/IP. Khóa tài khoản tạm thời (Account Lockout) nếu quá giới hạn. Đặc biệt khuyên dùng Xác thực 2 lớp (MFA/2FA) hoặc Passkeys để diệt tận gốc rủi ro này.
                </div>
              </div>
            </GlowingCard>

            {/* 4. MITM & Data Breach */}
            <GlowingCard className="bg-slate-900/40 p-6">
              <h3 className="font-bold text-emerald-400 mb-4 flex items-center gap-2 text-xl">
                <Lock size={24} /> Man-in-the-Middle (MITM)
              </h3>
              <div className="space-y-4 text-sm text-slate-300">
                <div>
                  <strong className="text-rose-400 block mb-1">Cách thức tấn công:</strong>
                  Tin tặc chặn bắt luồng dữ liệu trên đường truyền (ví dụ qua Wi-Fi công cộng giả mạo ở quán cafe, hoặc thỏa hiệp ISP) để bắt gói tin HTTP thuần. Từ đó lấy cắp Access Token, Session Cookies hoặc nghe trộm dữ liệu nhạy cảm.
                </div>
                <div className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                  <strong className="text-emerald-400 block mb-1">Biện pháp phòng thủ (TLS & VPC):</strong>
                  Bắt buộc dùng HTTPS kết hợp HSTS để mã hóa toàn bộ dữ liệu in-transit (đang bay trên mạng) bằng chuẩn mã hóa đầu cuối TLS 1.3. Đồng thời ẩn máy chủ Backend và Database bên trong Mạng riêng ảo (Private VPC Subnet), không cấp IP Public để ngăn chặn truy cập thẳng từ Internet.
                </div>
              </div>
            </GlowingCard>
          </div>
        </div>
      </div>

      {/* Deep Dive Section */}
      <div className="mt-12 space-y-6">
        <h2 className="text-2xl font-bold text-slate-200 border-b border-slate-800 pb-4">Kiến thức chuyên sâu (Deep Dive)</h2>
        
        <div className="grid md:grid-cols-2 gap-6">
          <GlowingCard className="bg-slate-900/40">
            <h3 className="text-xl font-bold text-amber-400 mb-4 flex items-center gap-2">
              <Zap size={20} /> Các thuật toán Rate Limiting
            </h3>
            <div className="space-y-4 text-sm text-slate-300">
              <p>Để chống Brute-force và kiểm soát lưu lượng, API Gateway dùng các thuật toán:</p>
              <ul className="space-y-3">
                <li className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                  <strong className="text-amber-300 block mb-1">1. Token Bucket:</strong> 
                  Tưởng tượng một cái xô chứa tối đa N token. Mỗi request tốn 1 token. Xô được tự động nạp lại ở tốc độ R token/giây. Nếu xô rỗng, request bị chặn. Ưu điểm: Cho phép "burst" (bùng nổ lượng nhỏ traffic tạm thời).
                </li>
                <li className="p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                  <strong className="text-orange-300 block mb-1">2. Fixed Window Counter:</strong> 
                  Chia thời gian thành các khung cố định (vd: 12:00 - 12:01). Đếm số request. Nếu vượt ngưỡng sẽ block cho đến khung giờ tiếp theo. Nhược điểm: Dễ bị nghẽn ở thời điểm chuyển giao giữa 2 khung giờ.
                </li>
              </ul>
            </div>
          </GlowingCard>

          <GlowingCard className="bg-slate-900/40">
            <h3 className="text-xl font-bold text-emerald-400 mb-4 flex items-center gap-2">
              <Lock size={20} /> TLS/SSL Handshake (HTTPS)
            </h3>
            <div className="space-y-3 text-sm text-slate-300">
              <p>HTTP là text rõ (plaintext), dễ bị đọc trộm (MITM). HTTPS mã hóa nó bằng TLS qua 2 giai đoạn:</p>
              <ul className="list-decimal pl-5 space-y-2">
                <li>
                  <strong className="text-emerald-300">Mã hóa bất đối xứng (Asymmetric Encryption):</strong> Dùng để Client và Server thỏa thuận ra một <span className="text-rose-300">Session Key</span> (Chìa khóa bí mật chung). 
                  Quá trình này tốn nhiều CPU nên chỉ dùng lúc khởi tạo kết nối.
                </li>
                <li>
                  <strong className="text-sky-300">Mã hóa đối xứng (Symmetric Encryption):</strong> Sau khi có <span className="text-rose-300">Session Key</span>, cả hai bên dùng chung một chìa khóa này để mã hóa và giải mã dữ liệu thực tế siêu nhanh.
                </li>
              </ul>
              <div className="mt-4 p-3 bg-slate-950/50 rounded-lg border border-slate-800">
                💡 <em>Mẹo System Design: Để giảm tải CPU cho các máy chủ Backend, người ta thường đặt một "TLS Terminator" (như Nginx/HAProxy) ở ngoài cùng để gỡ lớp mã hóa HTTPS, rồi chuyển HTTP thuần vào mạng nội bộ (nơi an toàn).</em>
              </div>
            </div>
          </GlowingCard>
        </div>
      </div>
    </div>
  );
};

export default NetworkSecurity;
