import React from 'react';
import GlowingCard from './ui/GlowingCard';
import { BookOpen, Target, Settings, Zap, Database, Globe, Shield, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Introduction = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Tiêu đề & Lời mở đầu */}
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-4">
          <BookOpen size={16} />
          <span>Tổng Quan (Overview)</span>
        </div>
        <h1 className="text-4xl font-black mb-4 text-white">Giới thiệu về <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-fuchsia-500">Thiết Kế Hệ Thống</span> (System Design)</h1>
        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
          Thiết kế hệ thống (System Design) là quá trình định nghĩa kiến trúc tổng thể, các thành phần (modules), giao diện giao tiếp (interfaces) và luồng dữ liệu để giải quyết một bài toán với quy mô lớn.
        </p>
      </div>

      <GlowingCard delay={0.1} className="max-w-4xl border-indigo-500/20">
        <div className="prose prose-invert max-w-none">
          <p className="text-slate-300 text-lg leading-relaxed">
            Trong thực tế, khi ứng dụng của bạn chỉ có vài trăm người dùng, một kiến trúc Monolithic (nguyên khối) với 1 máy chủ (Server) và 1 Cơ sở dữ liệu (Database) là đủ. Tuy nhiên, khi ứng dụng vươn tới hàng triệu hay hàng tỷ người dùng, hệ thống sẽ đối mặt với các vấn đề về <strong>thắt cổ chai (bottlenecks)</strong>, <strong>sập nguồn (downtime)</strong> và <strong>độ trễ cao (high latency)</strong>. Thiết kế hệ thống giúp chúng ta giải quyết các vấn đề này.
          </p>
        </div>
      </GlowingCard>

      {/* Đặc tính của Hệ thống phân tán */}
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Activity className="text-fuchsia-500" />
          Các Đặc Tính Cốt Lõi Của Hệ Thống Lớn
        </h2>
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
            <h3 className="text-indigo-400 font-bold text-lg mb-2 flex items-center gap-2">
              <Zap size={18} /> Khả năng mở rộng (Scalability)
            </h3>
            <p className="text-slate-400 text-sm">Khả năng hệ thống xử lý lượng truy cập và dữ liệu ngày càng tăng bằng cách thêm tài nguyên phần cứng. Gồm <strong>Scale Up</strong> (Mở rộng theo chiều dọc - tăng RAM/CPU) và <strong>Scale Out</strong> (Mở rộng theo chiều ngang - thêm máy chủ mới).</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
            <h3 className="text-emerald-400 font-bold text-lg mb-2 flex items-center gap-2">
              <Shield size={18} /> Tính khả dụng & Sẵn sàng (Availability)
            </h3>
            <p className="text-slate-400 text-sm">Đảm bảo hệ thống luôn hoạt động (uptime thường đo bằng các số 9 như 99.99%). Hệ thống phải có cơ chế <strong>Chịu lỗi (Fault Tolerance)</strong> để khi một máy chủ sập, máy chủ khác sẽ thay thế mà người dùng không nhận ra.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
            <h3 className="text-amber-400 font-bold text-lg mb-2 flex items-center gap-2">
              <Target size={18} /> Hiệu năng & Độ trễ (Performance & Latency)
            </h3>
            <p className="text-slate-400 text-sm">Hệ thống phải có <strong>Độ trễ thấp (Low Latency)</strong> để phản hồi nhanh, và <strong>Thông lượng cao (High Throughput)</strong> để xử lý được nhiều yêu cầu (requests) trong một giây.</p>
          </motion.div>
          
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl hover:bg-slate-800/50 transition-colors">
            <h3 className="text-blue-400 font-bold text-lg mb-2 flex items-center gap-2">
              <Database size={18} /> Tính nhất quán (Consistency)
            </h3>
            <p className="text-slate-400 text-sm">Đảm bảo mọi người dùng đều nhìn thấy cùng một dữ liệu tại cùng một thời điểm, đặc biệt quan trọng trong các hệ thống tài chính, ngân hàng hoặc giao dịch thương mại điện tử.</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Các mảnh ghép kiến trúc */}
      <div className="pt-8">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Globe className="text-emerald-500" />
          Các Thành Phần Cơ Bản (Building Blocks)
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-white font-bold mb-1">Cân bằng tải (Load Balancer)</h4>
            <p className="text-slate-400 text-xs">Điều phối lưu lượng truy cập (traffic) phân đều cho nhiều máy chủ, tránh tình trạng một máy chủ bị quá tải.</p>
          </div>
          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-white font-bold mb-1">Bộ nhớ đệm (Cache)</h4>
            <p className="text-slate-400 text-xs">Lưu trữ dữ liệu truy xuất thường xuyên trên RAM (như Redis/Memcached) để tăng tốc độ phản hồi, giảm tải cho Database chính.</p>
          </div>
          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-white font-bold mb-1">Hàng đợi tin nhắn (Message Queue)</h4>
            <p className="text-slate-400 text-xs">Hệ thống bất đồng bộ (Kafka, RabbitMQ) giúp tách biệt các dịch vụ (decoupling) và xử lý các tác vụ nền nặng nề.</p>
          </div>
          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-white font-bold mb-1">Cơ sở dữ liệu (Database)</h4>
            <p className="text-slate-400 text-xs">Nơi lưu trữ dữ liệu bền vững. Có thể là Relational (SQL) cho dữ liệu có cấu trúc hoặc NoSQL cho dữ liệu phi cấu trúc và scale lớn.</p>
          </div>
          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-white font-bold mb-1">CDN (Content Delivery Network)</h4>
            <p className="text-slate-400 text-xs">Mạng lưới các máy chủ phân bố toàn cầu giúp lưu trữ tĩnh (hình ảnh, video, html) gần với vị trí địa lý của người dùng nhất.</p>
          </div>
          <div className="bg-slate-800/30 p-4 rounded-lg border border-slate-700/50">
            <h4 className="text-white font-bold mb-1">API Gateway</h4>
            <p className="text-slate-400 text-xs">Cổng giao tiếp tập trung duy nhất cho các clients, xử lý xác thực (authentication), giới hạn tốc độ (rate limiting) và định tuyến.</p>
          </div>
        </div>
      </div>

      {/* Khung tư duy thiết kế */}
      <div className="pt-8 mt-8 border-t border-slate-800/80">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Settings className="text-amber-500" />
          Khung Tư Duy 4 Bước (System Design Framework)
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 relative">
          {/* Connector Line */}
          <div className="hidden lg:block absolute top-1/2 left-0 w-full h-0.5 bg-slate-800 -z-10 -translate-y-1/2" />
          
          <GlowingCard delay={0.2} className="h-full bg-slate-900">
            <div className="text-4xl font-black text-indigo-500/20 absolute top-4 right-4">01</div>
            <h4 className="text-indigo-400 font-bold mb-3 relative z-10">Hiểu Yêu Cầu (Requirements)</h4>
            <p className="text-slate-400 text-sm relative z-10">Xác định các <strong>Tính năng cốt lõi (Functional)</strong> và <strong>Quy mô hệ thống (Non-functional)</strong> như lượng user, tính bảo mật.</p>
          </GlowingCard>
          
          <GlowingCard delay={0.3} className="h-full bg-slate-900">
            <div className="text-4xl font-black text-fuchsia-500/20 absolute top-4 right-4">02</div>
            <h4 className="text-fuchsia-400 font-bold mb-3 relative z-10">Ước Lượng (Capacity Planning)</h4>
            <p className="text-slate-400 text-sm relative z-10">Tính toán số lượng request mỗi giây (QPS), dung lượng lưu trữ (Storage) và băng thông (Bandwidth) cần thiết.</p>
          </GlowingCard>
          
          <GlowingCard delay={0.4} className="h-full bg-slate-900">
            <div className="text-4xl font-black text-emerald-500/20 absolute top-4 right-4">03</div>
            <h4 className="text-emerald-400 font-bold mb-3 relative z-10">Kiến Trúc Tổng Thể (High-level)</h4>
            <p className="text-slate-400 text-sm relative z-10">Vẽ sơ đồ khối cơ bản luồng đi của dữ liệu từ Client qua Load Balancer, Web Servers đến Database.</p>
          </GlowingCard>
          
          <GlowingCard delay={0.5} className="h-full bg-slate-900">
            <div className="text-4xl font-black text-amber-500/20 absolute top-4 right-4">04</div>
            <h4 className="text-amber-400 font-bold mb-3 relative z-10">Thiết Kế Chi Tiết (Deep Dive)</h4>
            <p className="text-slate-400 text-sm relative z-10">Xác định các điểm nghẽn (Bottlenecks) và xử lý bằng Caching, Sharding, Replica, hoặc Message Queues.</p>
          </GlowingCard>
        </div>
      </div>
    </div>
  );
};

export default Introduction;
