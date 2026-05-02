import React from 'react';
import { Rss, Share2, Layers, Users, Server, Database, Smartphone, ArrowRight, Activity, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import GlowingCard from '../ui/GlowingCard';

const NewsFeedCaseStudy = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-blue-500/20 rounded-lg">
            <Rss className="text-blue-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Hệ thống News Feed (Facebook/X)</h1>
        </div>
        <p className="text-slate-400 text-lg mt-4 max-w-3xl">
          Hiển thị các bài viết mới nhất từ bạn bè hoặc các trang bạn theo dõi (Follow) với độ trễ tối thiểu khi có người đăng bài, đồng thời đảm bảo trang News Feed load ngay lập tức khi người dùng mở App.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Users className="text-blue-400" size={20} /> Mô hình The "Fan-out"
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• Một bài đăng của Celeb có hàng chục triệu người theo dõi.</li>
            <li>• Cần phân phối (Fan-out) thông báo/feed này tới hàng chục triệu người.</li>
            <li>• Push Model (Gửi sẵn vào hộp thư của từng follower) vs Pull Model (Khi mở app thì tự query những người mình follow).</li>
          </ul>
        </GlowingCard>

        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Layers className="text-indigo-400" size={20} /> Thành phần kiến trúc
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• <strong>In-Memory Cache (Redis):</strong> Lưu Timeline List cho từng user.</li>
            <li>• <strong>Graph Database:</strong> Lưu trữ quan hệ Friend/Follow.</li>
            <li>• <strong>Message Queue:</strong> Điều phối các tiến trình Fan-out chạy ngầm.</li>
          </ul>
        </GlowingCard>
      </div>

      {/* Kiến trúc chi tiết (Tech details) */}
      <div className="space-y-6 mt-8">
        
        {/* Redis Timeline Schema */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-blue-500/5">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Layers className="text-blue-400" size={24} />
            1. Data Structure: Redis Timeline (Push Model)
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Với người dùng bình thường, khi họ đăng bài, hệ thống sẽ <strong>Push</strong> ID bài đăng vào Redis List/Sorted Set của tất cả bạn bè (Fan-out on write). Khi mở app, Feed được load từ Redis trong O(1).
          </p>
          <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-800">
<pre>
<code className="text-slate-300">{"\n"}
<span className="text-slate-500">// Cấu trúc Redis Sorted Set (ZSET) cho feed của user_id = 1001</span><br/>{"\n"}
<span className="text-fuchsia-400">Key:</span> <span className="text-emerald-300">feed:1001</span><br/>{"\n"}
<span className="text-fuchsia-400">Score</span> (Timestamp)    <span className="text-fuchsia-400">Value</span> (Post ID)<br/>{"\n"}
<span className="text-orange-400">1714521000</span>           <span className="text-indigo-300">post_99</span><br/>{"\n"}
<span className="text-orange-400">1714521050</span>           <span className="text-indigo-300">post_102</span><br/>{"\n"}
<br/>{"\n"}
<span className="text-slate-500">// Lệnh thêm bài viết mới vào feed của bạn bè</span><br/>{"\n"}
ZADD feed:1001 <span className="text-orange-400">1714521100</span> post_205<br/>{"\n"}
<br/>{"\n"}
<span className="text-slate-500">// Lệnh lấy 20 bài viết mới nhất cho News Feed</span><br/>{"\n"}
ZREVRANGE feed:1001 <span className="text-orange-400">0</span> <span className="text-orange-400">19</span><br/>{"\n"}
</code>{"\n"}
</pre>
          </div>
        </div>

        {/* Hybrid Architecture Diagram Visual */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-indigo-500/5">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Share2 className="text-indigo-400" size={24} />
            2. Hybrid Architecture (Pull + Push Model)
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Nếu Cristiano Ronaldo (600M followers) đăng bài, Push Model sẽ sập server vì phải chạy 600 triệu lệnh Redis ZADD. Do đó, ta dùng <strong>Pull Model (Fan-out on read)</strong> riêng cho Celeb và Push cho user thường.
          </p>
          
          <div className="bg-slate-950 rounded-xl p-8 border border-slate-800 relative flex flex-col items-center">
            
            <div className="flex w-full justify-center mb-8 relative z-10">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/10 mb-3 relative">
                  <Smartphone className="text-slate-300" size={32} />
                  <motion.div 
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full"
                  >
                    1
                  </motion.div>
                </div>
                <span className="text-sm font-bold text-slate-300">User App</span>
                <span className="text-xs text-slate-500 mt-1">Load Feed</span>
              </div>
            </div>

            {/* Connecting lines */}
            <div className="absolute top-[80px] left-1/2 w-[200px] md:w-[400px] h-[60px] border-t-2 border-l-2 border-r-2 border-slate-700/50 -translate-x-1/2 rounded-t-xl z-0"></div>

            <div className="flex flex-col md:flex-row w-full justify-around gap-8 md:gap-0 mt-4 relative z-10">
              
              {/* Normal User Path */}
              <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-800 w-full md:w-[220px]">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm mb-3">
                  <Zap size={16} /> Push Model (Bạn bè)
                </div>
                <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center justify-center mb-3">
                  <Database className="text-emerald-400" size={28} />
                </div>
                <span className="text-xs font-mono text-emerald-300/70 text-center">Redis Cache<br/>(Pre-computed Feed)</span>
              </div>

              {/* Celeb Path */}
              <div className="flex flex-col items-center bg-slate-900/80 p-4 rounded-xl border border-slate-800 w-full md:w-[220px]">
                <div className="flex items-center gap-2 text-fuchsia-400 font-bold text-sm mb-3">
                  <Activity size={16} /> Pull Model (Celeb)
                </div>
                <div className="w-16 h-16 bg-fuchsia-500/10 border border-fuchsia-500/30 rounded-full flex items-center justify-center mb-3">
                  <Server className="text-fuchsia-400" size={28} />
                </div>
                <span className="text-xs font-mono text-fuchsia-300/70 text-center">Graph DB + SQL<br/>(Query lúc Runtime)</span>
              </div>

            </div>

            {/* Bottom Merge */}
            <div className="absolute bottom-[90px] left-1/2 w-[200px] md:w-[400px] h-[60px] border-b-2 border-l-2 border-r-2 border-slate-700/50 -translate-x-1/2 rounded-b-xl z-0"></div>

            <div className="mt-12 relative z-10 bg-slate-800 p-3 rounded-lg border border-slate-700 flex flex-col items-center shadow-xl shadow-black/50">
              <Layers className="text-blue-400 mb-2" size={24} />
              <span className="text-sm font-bold text-white">Merge & Ranking Service</span>
              <span className="text-xs text-slate-400 mt-1">Trộn 2 nguồn & Sắp xếp bằng AI</span>
            </div>

          </div>
        </div>

      </div>

      {/* Đánh giá & Tại sao */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden mt-8">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Share2 size={100} />
        </div>
        <h2 className="text-xl font-bold text-slate-200 mb-6 relative z-10">Liên hệ bài học & Giải thích (Tại sao?)</h2>
        
        <div className="space-y-6 relative z-10">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-emerald-400 mb-2">1. Tại sao không dùng JOIN SQL để lấy Feed? (Chương 3)</h4>
            <p className="text-sm text-slate-300">
              Nếu query: <code>Lấy TOP 20 bài viết TỪ user MÀ tôi đang follow SẮP XẾP THEO thời gian</code>. Thao tác JOIN bảng Users, Follows, và Posts trên hàng tỷ bản ghi sẽ tốn nhiều giây để xử lý, làm sập Database. Thay vào đó, Feed được <strong>tính toán trước (Pre-computed)</strong> và ghi vào Redis List của người dùng. Khi mở App, hệ thống chỉ cần đọc trực tiếp (O(1)) từ Redis.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-amber-400 mb-2">2. Tại sao Data Partitioning / Sharding lại khó ở đây? (Chương 3)</h4>
            <p className="text-sm text-slate-300">
              Chia nhỏ dữ liệu (Sharding) bằng `user_id` hay `post_id`? Nếu shard theo `post_id`, khi load feed phải đọc từ rất nhiều server DB ➜ Chậm. Nếu shard theo `user_id`, toàn bộ post của 1 user nằm 1 server, nhưng khi load feed của bạn thì bạn vẫn phải đọc từ server chứa data của những người bạn follow. Thường giải quyết bằng cách Cache cực mạnh lớp ngoài cùng (Redis Clusters) và sử dụng Graph DB tối ưu cho việc traversal quan hệ.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsFeedCaseStudy;
