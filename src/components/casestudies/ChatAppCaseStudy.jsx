import React from 'react';
import { MessageCircle, Database, Server, Smartphone, Zap, ArrowRight, ShieldCheck, Clock, Layers, Terminal, Key, Code } from 'lucide-react';
import { motion } from 'framer-motion';
import GlowingCard from '../ui/GlowingCard';

const ChatAppCaseStudy = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-sm font-medium mb-4">
          <MessageCircle size={16} />
          <span>Case Study</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Thiết kế hệ thống <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-500">Chat (Zalo / Messenger)</span></h2>
        
        <p className="text-slate-400 text-lg max-w-3xl">
          Làm thế nào để xây dựng một ứng dụng nhắn tin theo thời gian thực có thể phục vụ hàng tỷ người dùng trên toàn thế giới?
        </p>
      </div>

      {/* Yêu cầu hệ thống */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlowingCard delay={0.1}>
          <h3 className="text-blue-400 font-bold mb-3 flex items-center gap-2"><ShieldCheck size={20} /> Yêu cầu chức năng</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-blue-500 shrink-0 mt-0.5" /> Hỗ trợ nhắn tin 1-1 và nhắn tin nhóm.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-blue-500 shrink-0 mt-0.5" /> Hiển thị trạng thái Online/Offline.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-blue-500 shrink-0 mt-0.5" /> Lưu trữ lịch sử tin nhắn vô hạn.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-blue-500 shrink-0 mt-0.5" /> Nhận thông báo (Push notifications) khi offline.</li>
          </ul>
        </GlowingCard>

        <GlowingCard delay={0.2}>
          <h3 className="text-cyan-400 font-bold mb-3 flex items-center gap-2"><Clock size={20} /> Yêu cầu phi chức năng</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-cyan-500 shrink-0 mt-0.5" /> <strong>Độ trễ thấp:</strong> Tin nhắn gửi đi phải tới người nhận gần như ngay lập tức.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-cyan-500 shrink-0 mt-0.5" /> <strong>Tính khả dụng cao:</strong> Không bao giờ bị mất tin nhắn.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-cyan-500 shrink-0 mt-0.5" /> <strong>Dữ liệu khổng lồ:</strong> Hàng tỷ tin nhắn được tạo ra mỗi ngày.</li>
          </ul>
        </GlowingCard>
      </div>

      {/* Architecture Blocks linked to Chapters */}
      <GlowingCard delay={0.3} className="mt-8">
        <h3 className="text-white font-bold text-xl mb-6">Liên kết Kiến thức cốt lõi</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-blue-500/30 transition-colors">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mb-4">
              <Zap className="text-blue-400" size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">WebSockets (Chương 1)</h4>
            <p className="text-slate-400 text-sm">
              HTTP thông thường không phù hợp cho chat vì client phải liên tục gọi server (polling). Hệ thống chat sử dụng <strong>WebSockets</strong> để duy trì một kết nối 2 chiều liên tục, giúp đẩy (push) tin nhắn ngay lập tức.
            </p>
          </div>

          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-cyan-500/30 transition-colors">
            <div className="w-12 h-12 bg-cyan-500/10 rounded-lg flex items-center justify-center mb-4">
              <Layers className="text-cyan-400" size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">Message Queue (Chương 4)</h4>
            <p className="text-slate-400 text-sm">
              Khi user A chat với user B, Chat Server nhận tin nhắn, đẩy vào một <strong>Pub/Sub (Redis) hoặc Message Queue (Kafka)</strong>. Các server quản lý kết nối của user B sẽ "nghe" từ queue này và báo cho B.
            </p>
          </div>

          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-emerald-500/30 transition-colors">
            <div className="w-12 h-12 bg-emerald-500/10 rounded-lg flex items-center justify-center mb-4">
              <Database className="text-emerald-400" size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">NoSQL Database (Chương 3)</h4>
            <p className="text-slate-400 text-sm">
              Dữ liệu chat có đặc thù: ghi liên tục, rất lớn, chỉ đọc những tin nhắn gần nhất. Sử dụng <strong>Cassandra hoặc HBase</strong> (Wide-column store) để lưu lịch sử chat sẽ đạt hiệu suất ghi cực kỳ tối ưu và dễ Sharding.
            </p>
          </div>

        </div>
      </GlowingCard>

      {/* Visual Component */}
      <GlowingCard delay={0.4} className="mt-8">
        <h3 className="text-white font-bold text-xl mb-6">Luồng Tin nhắn (Message Flow)</h3>
        <div className="bg-slate-950/50 rounded-xl border border-slate-800 p-8 overflow-hidden relative">
          
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            {/* Sender */}
            <div className="flex flex-col items-center shrink-0 w-24">
              <div className="w-16 h-16 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center relative mb-2 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                <Smartphone className="text-blue-400" size={32} />
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
              <span className="text-sm font-bold text-blue-400">User A</span>
            </div>

            {/* Arrow 1 */}
            <div className="hidden lg:flex flex-1 items-center justify-center relative h-12 min-w-[60px]">
              <div className="absolute inset-0 flex items-center w-full">
                <div className="w-full border-t-2 border-dashed border-slate-700"></div>
              </div>
              <motion.div 
                animate={{ x: [-30, 30] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-3 h-3 bg-blue-500 rounded-full z-10 shadow-[0_0_10px_rgba(59,130,246,0.8)] absolute"
              />
              <div className="absolute -top-4 text-[10px] font-mono text-slate-500 whitespace-nowrap">WebSocket</div>
            </div>

            {/* Chat Server 1 */}
            <div className="flex flex-col items-center shrink-0 w-24">
              <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center mb-2">
                <Server className="text-indigo-400" size={28} />
              </div>
              <span className="text-xs font-bold text-indigo-400 text-center">Chat Server 1</span>
            </div>

            {/* Split Arrows */}
            <div className="hidden lg:flex flex-col items-center justify-between relative h-32 w-12 mx-2">
               {/* Arrow to DB */}
               <div className="w-full flex items-center relative mt-4">
                 <div className="w-full border-t-2 border-dashed border-slate-700"></div>
                 <motion.div 
                  animate={{ x: [-15, 15] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-emerald-500 rounded-full absolute left-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(16,185,129,0.8)]"
                 />
               </div>
               
               {/* Arrow to Redis */}
               <div className="w-full flex items-center relative mb-4">
                 <div className="w-full border-t-2 border-dashed border-slate-700"></div>
                 <motion.div 
                  animate={{ x: [-15, 15] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  className="w-2 h-2 bg-orange-500 rounded-full absolute left-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(249,115,22,0.8)]"
                 />
               </div>
            </div>

            {/* Backend Stack */}
            <div className="flex flex-col justify-between h-32 shrink-0">
               {/* DB */}
               <div className="flex items-center gap-3 bg-emerald-500/5 border border-emerald-500/20 px-3 py-2 rounded-lg">
                  <Database className="text-emerald-400" size={20} />
                  <div>
                    <div className="text-xs font-bold text-emerald-400">Cassandra</div>
                  </div>
               </div>
               {/* Redis */}
               <div className="flex items-center gap-3 bg-orange-500/5 border border-orange-500/20 px-3 py-2 rounded-lg">
                  <Layers className="text-orange-400" size={20} />
                  <div>
                    <div className="text-xs font-bold text-orange-400">Redis Pub/Sub</div>
                  </div>
               </div>
            </div>

            {/* Arrow from Redis to Server 2 */}
            <div className="hidden lg:flex flex-col items-center justify-end relative h-32 w-12 mx-2">
              <div className="w-full flex items-center relative mb-4">
                 <div className="w-full border-t-2 border-dashed border-slate-700"></div>
                 <motion.div 
                  animate={{ x: [-15, 15] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                  className="w-2 h-2 bg-cyan-500 rounded-full absolute left-1/2 -translate-x-1/2 shadow-[0_0_8px_rgba(6,182,212,0.8)]"
                 />
               </div>
            </div>

            {/* Chat Server 2 */}
            <div className="flex flex-col items-center shrink-0 w-24">
              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center mb-2 mt-auto">
                <Server className="text-cyan-400" size={28} />
              </div>
              <span className="text-xs font-bold text-cyan-400 text-center">Chat Server 2</span>
            </div>

            {/* Arrow to User B */}
            <div className="hidden lg:flex flex-1 items-end justify-center relative h-32 min-w-[60px]">
              <div className="absolute bottom-6 flex items-center w-full">
                <div className="w-full border-t-2 border-dashed border-slate-700"></div>
              </div>
              <motion.div 
                animate={{ x: [-30, 30] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 1 }}
                className="w-3 h-3 bg-cyan-500 rounded-full z-10 shadow-[0_0_10px_rgba(6,182,212,0.8)] absolute bottom-[18px]"
              />
            </div>

            {/* Receiver */}
            <div className="flex flex-col items-center shrink-0 w-24">
              <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl flex items-center justify-center relative mb-2 mt-auto shadow-[0_0_15px_rgba(6,182,212,0.2)]">
                <Smartphone className="text-cyan-400" size={32} />
                <motion.div 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-slate-950"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                />
              </div>
              <span className="text-sm font-bold text-cyan-400">User B</span>
            </div>

          </div>
        </div>
      </GlowingCard>

      {/* Đi sâu vào Kỹ thuật (Tech Details) */}
      <GlowingCard delay={0.5} className="mt-8">
        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
          <Terminal size={24} className="text-blue-400" />
          Đi sâu vào Kỹ thuật (Tech Details)
        </h3>
        
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-950 gap-2">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Code size={16} className="text-blue-400" /> 1. WebSocket & Heartbeat (Node.js)
              </span>
              <span className="text-xs text-slate-500 font-mono">socket.io / redis</span>
            </div>
            <div className="w-full bg-[#0d1117] overflow-x-auto">
              <pre className="p-4 text-sm font-mono leading-relaxed min-w-max">
<span className="text-pink-400">io</span>.<span className="text-blue-400">on</span>(<span className="text-green-300">'connection'</span>, (<span className="text-orange-300">socket</span>) <span className="text-pink-400">=&gt;</span> {'{'}{"\n"}
{"  "}<span className="text-slate-500">{"// 1. Lưu trạng thái Online vào Redis"}</span>{"\n"}
{"  "}<span className="text-slate-500">{"//    với TTL (Time-to-Live) = 30s"}</span>{"\n"}
{"  "}<span className="text-pink-400">const</span> userId = socket.handshake.query.userId;{"\n"}
{"  "}<span className="text-pink-400">await</span> redis.setex(<span className="text-green-300">`presence:<span className="text-blue-300">${'{userId}'}</span>`</span>, <span className="text-orange-300">30</span>, <span className="text-green-300">'online'</span>);{"\n"}
{"\n"}
{"  "}<span className="text-slate-500">{"// 2. Client gửi Heartbeat ('ping') mỗi 10s"}</span>{"\n"}
{"  "}<span className="text-slate-500">{"//    để gia hạn trạng thái Online"}</span>{"\n"}
  socket.<span className="text-blue-400">on</span>(<span className="text-green-300">'ping'</span>, <span className="text-pink-400">async</span> () <span className="text-pink-400">=&gt;</span> {'{'}{"\n"}
{"    "}<span className="text-pink-400">await</span> redis.expire(<span className="text-green-300">`presence:<span className="text-blue-300">${'{userId}'}</span>`</span>, <span className="text-orange-300">30</span>);{"\n"}
{"  "}{'});'}{"\n"}
{"\n"}
{"  "}<span className="text-slate-500">{"// 3. Lắng nghe tin nhắn mới & đẩy"}</span>{"\n"}
{"  "}<span className="text-slate-500">{"//    vào Message Queue (Kafka/RabbitMQ)"}</span>{"\n"}
  socket.<span className="text-blue-400">on</span>(<span className="text-green-300">'sendMessage'</span>, <span className="text-pink-400">async</span> (<span className="text-orange-300">msg</span>) <span className="text-pink-400">=&gt;</span> {'{'}{"\n"}
{"    "}<span className="text-pink-400">await</span> kafka.send({'{'}{"\n"}
      topic: <span className="text-green-300">'chat_messages'</span>,{"\n"}
      messages: [JSON.stringify(msg)]{"\n"}
{"    "}{'}'});{"\n"}
{"  "}{'});'}{"\n"}
{'});'}{"\n"}
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400">
              <strong className="text-blue-400">Tại sao dùng Heartbeat?</strong> Nếu User rớt mạng đột ngột mà không gửi lệnh "disconnect", kết nối TCP có thể bị treo (Zombie connection). Redis TTL kết hợp Heartbeat giúp hệ thống tự động đánh dấu Offline sau 30 giây mất tín hiệu.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-950 gap-2">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Database size={16} className="text-emerald-400" /> 2. Database Schema (Cassandra/ScyllaDB)
              </span>
              <span className="text-xs text-slate-500 font-mono">CQL (Cassandra Query Language)</span>
            </div>
            <div className="w-full bg-[#0d1117] overflow-x-auto">
              <pre className="p-4 text-sm font-mono leading-relaxed min-w-max">
<span className="text-pink-400">CREATE TABLE</span> <span className="text-blue-300">chat_messages</span> ({"\n"}
{"    "}<span className="text-orange-300">channel_id</span>    <span className="text-green-300">uuid</span>,{"\n"}
{"    "}<span className="text-orange-300">message_id</span>    <span className="text-green-300">timeuuid</span>,{"\n"}
{"    "}<span className="text-orange-300">sender_id</span>     <span className="text-green-300">uuid</span>,{"\n"}
{"    "}<span className="text-orange-300">content</span>       <span className="text-green-300">text</span>,{"\n"}
{"    "}<span className="text-orange-300">created_at</span>    <span className="text-green-300">timestamp</span>,{"\n"}
{"    "}<span className="text-pink-400">PRIMARY KEY</span> ((<span className="text-orange-300">channel_id</span>), <span className="text-orange-300">message_id</span>){"\n"}
) <span className="text-pink-400">WITH CLUSTERING ORDER BY</span> (<span className="text-orange-300">message_id</span> <span className="text-blue-400">DESC</span>);{"\n"}
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400 space-y-2">
              <p><strong className="text-emerald-400">Partition Key (channel_id):</strong> Gom tất cả tin nhắn của 1 phòng chat (hoặc đoạn hội thoại 1-1) vào chung một Node máy chủ duy nhất để tăng tốc độ truy xuất.</p>
              <p><strong className="text-emerald-400">Clustering Key (message_id):</strong> Sắp xếp dữ liệu theo TimeUUID giảm dần. Khi Client mở chat, truy vấn <code>SELECT * WHERE channel_id=? LIMIT 50</code> sẽ ngay lập tức lấy ra 50 tin nhắn mới nhất với độ phức tạp O(1).</p>
            </div>
          </div>
        </div>
      </GlowingCard>
    </div>
  );
};

export default ChatAppCaseStudy;
