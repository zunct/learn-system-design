import React, { useState } from 'react';
import { Menu, X, Coffee, BookOpen, Server, Database, Zap, Triangle, Layers, Link as LinkIcon, Activity, LayoutTemplate, Network, Globe, Cloud, HardDrive, Shield, ShieldAlert, Share2, MessageCircle, Video, Building2, ShoppingCart, MapPin, Rss, Bell, Hash, Search, Fingerprint, ClipboardList, AlertTriangle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [showQR, setShowQR] = useState(false);

  const menuItems = [
    // Chương 1: Nhập môn System Design
    { id: 'intro', label: 'System Design là gì?', icon: BookOpen, section: 'Chương 1: Nhập môn' },
    { id: 'network', label: 'Giao tiếp & APIs', icon: Globe, section: 'Chương 1: Nhập môn' },
    
    // Chương 2: Tăng tốc độ & Sức chịu tải
    { id: 'lb', label: 'Cân bằng tải (LB)', icon: Server, section: 'Chương 2: Tăng tốc & Chịu tải' },
    { id: 'cdn', label: 'Mạng lưới CDN', icon: Cloud, section: 'Chương 2: Tăng tốc & Chịu tải' },
    { id: 'cache', label: 'Bộ nhớ đệm (Cache)', icon: Zap, section: 'Chương 2: Tăng tốc & Chịu tải' },

    // Chương 3: Quản trị & Lưu trữ Dữ liệu lớn
    { id: 'cap', label: 'Định lý CAP', icon: Triangle, section: 'Chương 3: Quản trị Dữ liệu' },
    { id: 'db-types', label: 'Chọn Database nào?', icon: HardDrive, section: 'Chương 3: Quản trị Dữ liệu' },
    { id: 'db', label: 'Sharding & Replication', icon: Database, section: 'Chương 3: Quản trị Dữ liệu' },

    // Chương 4: Thiết kế Kiến trúc tổng thể
    { id: 'mq', label: 'Message Queue', icon: Layers, section: 'Chương 4: Kiến trúc tổng thể' },
    { id: 'arch', label: 'Các kiểu kiến trúc', icon: LayoutTemplate, section: 'Chương 4: Kiến trúc tổng thể' },
    { id: 'microservices', label: 'Microservices Patterns', icon: Network, section: 'Chương 4: Kiến trúc tổng thể' },

    // Chương 5: Bảo mật & Định danh
    { id: 'auth-sec', label: 'Xác thực & Phân quyền', icon: Shield, section: 'Chương 5: Bảo mật & Định danh' },
    { id: 'net-sec', label: 'Bảo mật Hạ tầng', icon: ShieldAlert, section: 'Chương 5: Bảo mật & Định danh' },

    // Chương 6: Bảo vệ & Vận hành Hệ thống
    { id: 'observability', label: 'Log, Metric & Trace', icon: Activity, section: 'Chương 6: Vận hành Hệ thống' },
    { id: 'rate-limit', label: 'Rate Limiting', icon: Shield, section: 'Chương 6: Vận hành Hệ thống' },
    { id: 'dist-algo', label: 'Thuật toán Phân tán', icon: Share2, section: 'Chương 6: Vận hành Hệ thống' },

    // Chương 8: Data Engineering & Analytics
    { id: 'data-eng', label: 'Xử lý Dữ liệu lớn (Big Data)', icon: Database, section: 'Chương 8: Data Engineering' },

    // Chương 7: Giải quyết bài toán thực tế
    { id: 'framework', label: 'Khung tư duy 4 Bước', icon: ClipboardList, section: 'Chương 7: Case Studies' },
    { id: 'common-mistakes', label: 'Anti-patterns & Sai lầm', icon: AlertTriangle, section: 'Chương 7: Case Studies' },
    { id: 'url-shortener', label: 'URL Shortener', icon: LinkIcon, section: 'Chương 7: Case Studies' },
    { id: 'chat-app', label: 'Hệ thống Chat (Zalo)', icon: MessageCircle, section: 'Chương 7: Case Studies' },
    { id: 'video-streaming', label: 'Video Streaming (Netflix)', icon: Video, section: 'Chương 7: Case Studies' },
    { id: 'saas-system', label: 'Hệ thống SaaS (B2B)', icon: Building2, section: 'Chương 7: Case Studies' },
    { id: 'ticket-booking', label: 'Flash Sale / Booking', icon: ShoppingCart, section: 'Chương 7: Case Studies' },
    { id: 'location-based', label: 'Tìm kiếm Vị trí (Grab)', icon: MapPin, section: 'Chương 7: Case Studies' },
    { id: 'news-feed', label: 'News Feed (Facebook)', icon: Rss, section: 'Chương 7: Case Studies' },
    { id: 'notification', label: 'Hệ thống Thông Báo', icon: Bell, section: 'Chương 7: Case Studies' },
    { id: 'id-generator', label: 'ID Phân tán (Snowflake)', icon: Hash, section: 'Chương 7: Case Studies' },
    { id: 'search-engine', label: 'Search Engine (Elastic)', icon: Search, section: 'Chương 7: Case Studies' },
    { id: 'sso-case', label: 'SSO Identity Provider', icon: Fingerprint, section: 'Chương 7: Case Studies' },
  ];

  const sections = [...new Set(menuItems.map(item => item.section))];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-slate-900 border-b border-slate-800/50 sticky top-0 z-40 w-full shadow-lg">
        <div className="flex items-center gap-3">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-lg bg-slate-900 border border-slate-700/50 shadow-inner">
            <Activity className="w-4 h-4 text-indigo-400" />
          </div>
          <span className="font-black tracking-tight leading-none">
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-500 drop-shadow-sm">SysDesign</span>
          </span>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="p-2 bg-slate-800 rounded-md text-slate-300 border border-slate-700/50">
          {isOpen ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile Overlay */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 z-40 backdrop-blur-sm" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`
        fixed md:relative top-0 left-0 h-[100dvh] z-50
        w-72 shrink-0 flex flex-col bg-slate-900 border-r border-slate-800/50 overflow-hidden backdrop-blur-xl
        transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
      `}>
        {/* Glow effects */}
        <div className="absolute top-0 left-0 w-full h-32 bg-indigo-500/10 blur-[50px] pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-full h-32 bg-fuchsia-500/10 blur-[50px] pointer-events-none" />

        {/* Header - Desktop only or top of sidebar */}
        <div className="p-6 relative z-10 border-b border-slate-800/50 bg-slate-900/20 backdrop-blur-sm hidden md:block">
        <div className="flex items-center gap-3 mb-1">
          <div className="relative group cursor-default">
            <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-fuchsia-500 rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-500 group-hover:duration-200" />
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/50 shadow-inner">
              <Activity className="w-5 h-5 text-indigo-400 group-hover:text-indigo-300 transition-colors" />
            </div>
          </div>
          <div className="flex flex-col">
            <h1 className="text-2xl font-black tracking-tight leading-none">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-500 drop-shadow-sm">
                SysDesign
              </span>
            </h1>
            <span className="text-[10px] text-slate-500 font-medium tracking-wider mt-1 flex items-center gap-1">
              <span className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="text-slate-300">aicontent.click</span>
            </span>
          </div>
        </div>
        <div className="mt-5 flex items-center gap-3">
          <div className="h-[2px] w-8 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-80"></div>
          <p className="text-[10px] text-slate-400 font-mono uppercase tracking-[0.2em]">Interactive Guide</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-2 px-4 space-y-6 relative z-10 custom-scrollbar">
        {sections.map(section => (
          <div key={section}>
            <h2 className="text-[0.7rem] font-bold text-slate-500 uppercase tracking-widest mb-3 px-2">
              {section}
            </h2>
            <div className="space-y-1">
              {menuItems.filter(item => item.section === section).map(item => {
                const isActive = activeTab === item.id;
                const Icon = item.icon;
                
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      if (!item.comingSoon) {
                        setActiveTab(item.id);
                        setIsOpen(false);
                      }
                    }}
                    disabled={item.comingSoon}
                    className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group
                      ${isActive 
                        ? 'text-white bg-indigo-500/10' 
                        : item.comingSoon
                          ? 'text-slate-500 cursor-not-allowed opacity-50 hover:bg-slate-800/20'
                          : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                      }`}
                  >
                    <div className="flex items-center gap-3 overflow-hidden">
                      {isActive && (
                        <motion.div
                          layoutId="activeTabIndicator"
                          className="absolute left-0 top-0 bottom-0 w-1 bg-indigo-500 rounded-full"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}
                      
                      <Icon size={18} className={`shrink-0 transition-colors ${isActive ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                      <span className="truncate">{item.label}</span>
                    </div>

                    {item.comingSoon && (
                      <span className="text-[0.6rem] uppercase tracking-widest bg-slate-800/80 text-slate-400 px-1.5 py-0.5 rounded border border-slate-700/50 shrink-0 ml-2">
                        Sắp có
                      </span>
                    )}
                    
                    {/* Cyberpunk accent on hover */}
                    {!isActive && !item.comingSoon && (
                      <div className="absolute inset-0 rounded-lg border border-slate-700/0 group-hover:border-indigo-500/30 transition-colors" />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* Support / Tip Coffee */}
      <div className="px-4 py-3 relative z-10">
        <button 
          onClick={() => setShowQR(true)}
          className="flex items-center justify-center gap-2 w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-amber-500/10 to-orange-500/10 border border-amber-500/20 text-amber-500 hover:text-amber-400 hover:bg-amber-500/20 hover:border-amber-500/30 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-amber-400/0 via-amber-400/10 to-amber-400/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700" />
          <Coffee size={16} className="group-hover:rotate-12 transition-transform relative z-10" />
          <span className="font-bold text-sm relative z-10">Tip me a coffee</span>
        </button>
      </div>

      {/* Footer info */}
      <div className="p-4 border-t border-slate-800/50 text-xs flex justify-between items-center relative z-10 bg-slate-900/50">
        <div className="flex items-center gap-2">
          <span className="text-slate-500">v1.0.0</span>
        </div>
        <span className="font-mono text-[10px] text-indigo-500/70">SYS_ONLINE</span>
      </div>
    </aside>

    {/* QR Modal */}
    <AnimatePresence>
      {showQR && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            onClick={() => setShowQR(false)}
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative bg-slate-900 border border-slate-700/50 p-6 rounded-2xl shadow-2xl max-w-sm w-full flex flex-col items-center"
          >
            <button 
              onClick={() => setShowQR(false)}
              className="absolute top-4 right-4 p-2 bg-slate-800/50 hover:bg-slate-700 text-slate-400 hover:text-white rounded-full transition-colors"
            >
              <X size={18} />
            </button>
            
            <div className="w-14 h-14 bg-gradient-to-tr from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center mb-4 shadow-lg shadow-amber-500/20">
              <Coffee size={28} className="text-white" />
            </div>
            
            <h3 className="text-xl font-bold text-white mb-2">Buy me a coffee</h3>
            <p className="text-slate-400 text-sm text-center mb-6 leading-relaxed">
              Cảm ơn bạn đã ủng hộ! Sự đóng góp của bạn giúp dự án duy trì và phát triển tốt hơn.
            </p>
            
            <div className="bg-white p-4 rounded-xl w-full flex justify-center mb-6 shadow-inner relative min-h-[200px]">
              <img 
                src="/qr-momo.png" 
                alt="Momo QR Code" 
                className="max-w-full h-auto rounded-lg object-contain"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.nextSibling.style.display = 'flex';
                }}
              />
              <div className="hidden absolute inset-0 bg-slate-100 rounded-lg flex-col items-center justify-center text-slate-500 border-2 border-dashed border-slate-300 m-4">
                <span className="text-xs text-center px-4">Chưa tìm thấy ảnh QR.<br/>Hãy copy file ảnh QR của bạn vào <b>public/qr-momo.png</b></span>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
    </>
  );
};

export default Sidebar;
