import React from 'react';
import { Database, Server, ChevronRight, Share2, Layers } from 'lucide-react';
import GlowingCard from './ui/GlowingCard';
import { motion } from 'framer-motion';

const DatabaseScaling = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
          <Database size={16} />
          <span>Core Concept</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Mở rộng Cơ sở dữ liệu <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">(Database Scaling)</span></h2>
        
        <p className="text-slate-400 text-lg max-w-3xl">
          Khi lượng dữ liệu và số lượng truy vấn tăng lên, một Database duy nhất sẽ trở thành "nút thắt cổ chai". Có hai cách chính để mở rộng Database.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Scale Up */}
        <GlowingCard delay={0.1}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
              <Server size={24} />
            </div>
            <div>
              <h4 className="text-purple-400 font-bold text-xl">Vertical Scaling</h4>
              <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">Scale Up</span>
            </div>
          </div>
          
          <div className="bg-slate-950/50 rounded-lg p-6 border border-slate-800 mb-6 flex items-end justify-center gap-4 h-48">
            <motion.div 
              initial={{ height: 40 }}
              animate={{ height: [40, 80, 120, 140] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: 'reverse' }}
              className="w-20 bg-gradient-to-t from-purple-900 to-purple-500 rounded-t-lg border-t-2 border-x-2 border-purple-400/50 flex items-center justify-center relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
              <Server size={24} className="text-white relative z-10" />
            </motion.div>
          </div>

          <p className="text-slate-300 mb-4">
            <strong>Nâng cấp phần cứng:</strong> Mua máy chủ mạnh hơn (thêm CPU, thêm RAM, nâng cấp ổ cứng SSD).
          </p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-2"><ChevronRight size={16} className="text-purple-500 shrink-0 mt-0.5" /> Dễ dàng thực hiện, không cần sửa Code.</li>
            <li className="flex items-start gap-2"><ChevronRight size={16} className="text-rose-500 shrink-0 mt-0.5" /> Có giới hạn phần cứng (Không có cỗ máy nào vô hạn).</li>
            <li className="flex items-start gap-2"><ChevronRight size={16} className="text-rose-500 shrink-0 mt-0.5" /> Rủi ro Single Point of Failure (SPOF - Chết máy là sập toàn hệ thống).</li>
          </ul>
        </GlowingCard>

        {/* Scale Out */}
        <GlowingCard delay={0.2}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-teal-500/10 border border-teal-500/30 flex items-center justify-center text-teal-400">
              <Layers size={24} />
            </div>
            <div>
              <h4 className="text-teal-400 font-bold text-xl">Horizontal Scaling</h4>
              <span className="text-slate-500 text-sm font-medium uppercase tracking-widest">Scale Out</span>
            </div>
          </div>
          
          <div className="bg-slate-950/50 rounded-lg p-6 border border-slate-800 mb-6 flex items-end justify-center gap-4 h-48 relative overflow-hidden">
            <motion.div 
              initial={{ x: 0 }}
              animate={{ x: [-20, 20] }}
              transition={{ duration: 3, repeat: Infinity, repeatType: 'reverse', ease: "easeInOut" }}
              className="flex gap-4"
            >
              {[1, 2, 3].map(i => (
                <div key={i} className="w-16 h-24 bg-gradient-to-t from-teal-900 to-teal-500 rounded-t-lg border-t-2 border-x-2 border-teal-400/50 flex items-center justify-center relative">
                  <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,0.2)_100%)]" />
                  <Database size={20} className="text-white relative z-10" />
                </div>
              ))}
            </motion.div>
          </div>

          <p className="text-slate-300 mb-4">
            <strong>Thêm máy chủ:</strong> Sử dụng nhiều máy chủ nhỏ kết nối lại với nhau thay vì một siêu máy tính.
          </p>
          <ul className="space-y-2 text-sm text-slate-400">
            <li className="flex items-start gap-2"><ChevronRight size={16} className="text-teal-500 shrink-0 mt-0.5" /> Khả năng mở rộng gần như vô hạn.</li>
            <li className="flex items-start gap-2"><ChevronRight size={16} className="text-teal-500 shrink-0 mt-0.5" /> Tăng tính khả dụng (High Availability).</li>
            <li className="flex items-start gap-2"><ChevronRight size={16} className="text-rose-500 shrink-0 mt-0.5" /> Kiến trúc phức tạp (Cần xử lý Replication, Data Sharding).</li>
          </ul>
        </GlowingCard>
      </div>

      <div className="pt-8">
        <h3 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Share2 className="text-blue-500" />
          Các kỹ thuật phổ biến (Horizontal)
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full blur-2xl transition-all group-hover:bg-blue-500/20" />
            <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-blue-500/20 text-blue-400 flex items-center justify-center text-sm">1</span>
              Database Replication
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Tạo ra các bản sao của Database (kiến trúc Master-Slave). 
              <strong className="text-blue-400"> Master</strong> nhận các lệnh Ghi (Write). <strong className="text-emerald-400">Slave</strong> đồng bộ dữ liệu từ Master và chỉ phục vụ các lệnh Đọc (Read). Giúp giảm tải đọc cho DB chính.
            </p>
          </div>

          <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-bl-full blur-2xl transition-all group-hover:bg-teal-500/20" />
            <h4 className="text-white font-bold text-lg mb-3 flex items-center gap-2">
              <span className="w-6 h-6 rounded-full bg-teal-500/20 text-teal-400 flex items-center justify-center text-sm">2</span>
              Data Sharding
            </h4>
            <p className="text-slate-400 text-sm leading-relaxed">
              Chia một Database khổng lồ thành nhiều mảnh nhỏ (Shard). Ví dụ: User ID từ 1-1,000,000 lưu ở DB 1, User ID từ 1,000,001-2,000,000 lưu ở DB 2. Giúp chia nhỏ dung lượng lưu trữ và tải truy vấn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DatabaseScaling;
