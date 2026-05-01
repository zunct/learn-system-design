import React from 'react';
import { BookOpen, Server, Database, Zap, Triangle, Layers, Link as LinkIcon, Activity, LayoutTemplate, Network, Globe, Cloud, HardDrive, Shield, Share2, MessageCircle, Video, Building2, ShoppingCart, MapPin, Rss, Bell, Hash, Search } from 'lucide-react';
import { motion } from 'framer-motion';

const Sidebar = ({ activeTab, setActiveTab }) => {
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

    // Chương 5: Bảo vệ & Vận hành Hệ thống
    { id: 'observability', label: 'Log, Metric & Trace', icon: Activity, section: 'Chương 5: Vận hành Hệ thống' },
    { id: 'rate-limit', label: 'Rate Limiting', icon: Shield, section: 'Chương 5: Vận hành Hệ thống' },
    { id: 'dist-algo', label: 'Thuật toán Phân tán', icon: Share2, section: 'Chương 5: Vận hành Hệ thống' },

    // Chương 6: Giải quyết bài toán thực tế
    { id: 'url-shortener', label: 'URL Shortener', icon: LinkIcon, section: 'Chương 6: Case Studies' },
    { id: 'chat-app', label: 'Hệ thống Chat (Zalo)', icon: MessageCircle, section: 'Chương 6: Case Studies' },
    { id: 'video-streaming', label: 'Video Streaming (Netflix)', icon: Video, section: 'Chương 6: Case Studies' },
    { id: 'saas-system', label: 'Hệ thống SaaS (B2B)', icon: Building2, section: 'Chương 6: Case Studies' },
    { id: 'ticket-booking', label: 'Flash Sale / Booking', icon: ShoppingCart, section: 'Chương 6: Case Studies' },
    { id: 'location-based', label: 'Tìm kiếm Vị trí (Grab)', icon: MapPin, section: 'Chương 6: Case Studies' },
    { id: 'news-feed', label: 'News Feed (Facebook)', icon: Rss, section: 'Chương 6: Case Studies' },
    { id: 'notification', label: 'Hệ thống Thông Báo', icon: Bell, section: 'Chương 6: Case Studies' },
    { id: 'id-generator', label: 'ID Phân tán (Snowflake)', icon: Hash, section: 'Chương 6: Case Studies' },
    { id: 'search-engine', label: 'Search Engine (Elastic)', icon: Search, section: 'Chương 6: Case Studies' },
  ];

  const sections = [...new Set(menuItems.map(item => item.section))];

  return (
    <aside className="w-full md:w-72 h-[35vh] md:h-screen shrink-0 flex flex-col bg-slate-900 border-b md:border-r md:border-b-0 border-slate-800/50 relative overflow-hidden backdrop-blur-xl">
      {/* Glow effects */}
      <div className="absolute top-0 left-0 w-full h-32 bg-indigo-500/10 blur-[50px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-full h-32 bg-fuchsia-500/10 blur-[50px] pointer-events-none" />

      {/* Header */}
      <div className="p-6 relative z-10">
        <h1 className="text-2xl font-black tracking-tight flex items-center gap-2">
          <Activity className="text-indigo-500" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-fuchsia-500">
            SysDesign
          </span>
          <span className="text-slate-100 text-lg">.vn</span>
        </h1>
        <p className="text-xs text-slate-400 mt-2 font-mono uppercase tracking-widest opacity-80">Interactive Guide</p>
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
                    onClick={() => !item.comingSoon && setActiveTab(item.id)}
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

      {/* Footer info */}
      <div className="p-4 border-t border-slate-800/50 text-xs text-slate-500 flex justify-between items-center relative z-10 bg-slate-900/50">
        <span>v2.0.0</span>
        <span className="font-mono text-indigo-500/70">SYS_ONLINE</span>
      </div>
    </aside>
  );
};

export default Sidebar;
