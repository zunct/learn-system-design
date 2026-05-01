import React from 'react';
import { ShoppingCart, Triangle, Layers, ShieldAlert, ArrowRight, Zap, Server, Database } from 'lucide-react';
import { motion } from 'framer-motion';
import GlowingCard from '../ui/GlowingCard';

const TicketBookingCaseStudy = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-rose-500/20 rounded-lg">
            <ShoppingCart className="text-rose-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Hệ thống Đặt Vé / Flash Sale</h1>
        </div>
        <p className="text-slate-400 text-lg mt-4 max-w-3xl">
          Giải quyết bài toán "tranh giành" tài nguyên khi hàng triệu người dùng cùng mua 1 món hàng hoặc 1 vé xem phim cùng một lúc, chống hiện tượng overselling (bán quá số lượng).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <ShieldAlert className="text-amber-400" size={20} /> Vấn đề cốt lõi
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• Lượng Request tăng đột biến (Spike Traffic) gấp hàng trăm lần bình thường.</li>
            <li>• Concurrency (Đồng thời) rất cao khi cập nhật tồn kho.</li>
            <li>• Race condition: 2 người cùng mua vé số 1, ai sẽ được?</li>
          </ul>
        </GlowingCard>

        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Layers className="text-indigo-400" size={20} /> Thành phần kiến trúc
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• <strong>Redis:</strong> Lưu trữ tồn kho trên RAM để xử lý cực nhanh.</li>
            <li>• <strong>Message Queue (Kafka):</strong> Hứng lượng đơn hàng khổng lồ để xử lý dần.</li>
            <li>• <strong>Relational DB (PostgreSQL):</strong> Lưu trạng thái đơn hàng cuối cùng (cần ACID).</li>
          </ul>
        </GlowingCard>
      </div>

      {/* Kiến trúc chi tiết (Mới) */}
      <div className="space-y-6 mt-8">
        
        {/* Redis Lua Script */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-rose-500/5">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Layers className="text-rose-400" size={24} />
            1. Atomic Inventory Check (Redis Lua Script)
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Để chống Overselling mà không cần dùng Database lock chậm chạp, ta dùng Lua Script trên Redis. Script này đảm bảo lệnh lấy tồn kho và trừ đi 1 được thực thi hoàn toàn Atomic (nguyên tử), không bị Race Condition.
          </p>
          <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-800">
<pre>
<code className="text-slate-300">
<span className="text-slate-500">-- KEYS[1]: flash_sale_inventory_key</span><br/>
<span className="text-slate-500">-- ARGV[1]: user_id (để check trùng)</span><br/>
<br/>
<span className="text-fuchsia-400">if</span> redis.call(<span className="text-emerald-300">"SISMEMBER"</span>, <span className="text-emerald-300">"flash_sale_users"</span>, ARGV[<span className="text-orange-400">1</span>]) <span className="text-fuchsia-400">==</span> <span className="text-orange-400">1</span> <span className="text-fuchsia-400">then</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-fuchsia-400">return</span> <span className="text-orange-400">-1</span> <span className="text-slate-500">-- User đã mua rồi</span><br/>
<span className="text-fuchsia-400">end</span><br/>
<br/>
<span className="text-fuchsia-400">local</span> stock = <span className="text-amber-300">tonumber</span>(redis.call(<span className="text-emerald-300">"GET"</span>, KEYS[<span className="text-orange-400">1</span>]))<br/>
<span className="text-fuchsia-400">if</span> stock <span className="text-fuchsia-400">&lt;=</span> <span className="text-orange-400">0</span> <span className="text-fuchsia-400">then</span><br/>
&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-fuchsia-400">return</span> <span className="text-orange-400">0</span> <span className="text-slate-500">-- Hết hàng</span><br/>
<span className="text-fuchsia-400">end</span><br/>
<br/>
redis.call(<span className="text-emerald-300">"DECR"</span>, KEYS[<span className="text-orange-400">1</span>])<br/>
redis.call(<span className="text-emerald-300">"SADD"</span>, <span className="text-emerald-300">"flash_sale_users"</span>, ARGV[<span className="text-orange-400">1</span>]) <span className="text-slate-500">-- Đánh dấu đã mua</span><br/>
<span className="text-fuchsia-400">return</span> <span className="text-orange-400">1</span> <span className="text-slate-500">-- Mua thành công</span><br/>
</code>
</pre>
          </div>
        </div>

        {/* Architecture Pipeline Visual */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-indigo-500/5 mt-8">
          <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
            <Zap className="text-indigo-400" size={24} />
            2. Event-Driven Pipeline (Quy trình bất đồng bộ)
          </h2>
          
          <div className="flex flex-col lg:flex-row items-center justify-between bg-slate-950 p-8 rounded-xl border border-slate-800 overflow-hidden relative">
            
            {/* Step 1: User Request */}
            <div className="flex flex-col items-center z-10 w-32">
              <div className="w-16 h-16 bg-slate-900 border border-slate-700 rounded-full flex items-center justify-center shadow-lg mb-3">
                <ShoppingCart className="text-slate-300" size={28} />
              </div>
              <span className="text-sm font-bold text-white text-center">Người dùng</span>
              <span className="text-xs text-slate-500 mt-1">Bấm "Mua vé"</span>
            </div>

            {/* Path 1 */}
            <div className="hidden lg:flex flex-1 h-0.5 bg-slate-800 relative mx-4">
              <motion.div 
                animate={{ x: [0, 150] }} 
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="absolute top-1/2 -mt-1 w-2 h-2 bg-rose-500 rounded-full shadow-[0_0_10px_rgba(244,63,94,0.8)]" 
              />
            </div>

            {/* Step 2: Redis */}
            <div className="flex flex-col items-center z-10 w-32 mt-8 lg:mt-0">
              <div className="w-16 h-16 bg-rose-500/10 border border-rose-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-rose-500/10 mb-3 relative">
                <Database className="text-rose-400" size={28} />
                <div className="absolute -top-2 -right-2 bg-rose-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Lua</div>
              </div>
              <span className="text-sm font-bold text-rose-400 text-center">Redis Cache</span>
              <span className="text-xs text-slate-500 mt-1">Trừ tồn kho atomic</span>
            </div>

            {/* Path 2 */}
            <div className="hidden lg:flex flex-1 h-0.5 bg-slate-800 relative mx-4">
              <motion.div 
                animate={{ x: [0, 150] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear", delay: 0.5 }}
                className="absolute top-1/2 -mt-1 w-3 h-3 bg-indigo-500/50 rotate-45" 
              />
            </div>

            {/* Step 3: Kafka */}
            <div className="flex flex-col items-center z-10 w-32 mt-8 lg:mt-0">
              <div className="w-16 h-16 bg-indigo-500/10 border border-indigo-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/10 mb-3">
                <Layers className="text-indigo-400" size={28} />
              </div>
              <span className="text-sm font-bold text-indigo-400 text-center">Kafka Queue</span>
              <span className="text-xs text-slate-500 mt-1">Lưu Event Order</span>
            </div>

            {/* Path 3 */}
            <div className="hidden lg:flex flex-1 h-0.5 bg-slate-800 relative mx-4">
              <motion.div 
                animate={{ x: [0, 150] }} 
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear", delay: 1 }}
                className="absolute top-1/2 -mt-1 w-2 h-2 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.8)]" 
              />
            </div>

            {/* Step 4: Postgres */}
            <div className="flex flex-col items-center z-10 w-32 mt-8 lg:mt-0">
              <div className="w-16 h-16 bg-emerald-500/10 border border-emerald-500/30 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-500/10 mb-3">
                <Server className="text-emerald-400" size={28} />
              </div>
              <span className="text-sm font-bold text-emerald-400 text-center">PostgreSQL</span>
              <span className="text-xs text-slate-500 mt-1">Worker lưu DB ACID</span>
            </div>

          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <h4 className="text-sm font-bold text-indigo-400 mb-2">Kafka Message Payload</h4>
              <pre className="text-xs font-mono text-slate-300 overflow-x-auto">
{`{
  "event_id": "evt_9x8f7s6d",
  "type": "TICKET_RESERVED",
  "payload": {
    "user_id": "usr_10293",
    "ticket_id": "tk_555",
    "quantity": 1
  }
}`}
              </pre>
            </div>
            <div className="bg-slate-950 p-4 rounded-lg border border-slate-800">
              <h4 className="text-sm font-bold text-emerald-400 mb-2">Final DB Schema (ACID)</h4>
              <table className="w-full text-xs text-left text-slate-300">
                <tbody>
                  <tr className="border-b border-slate-800"><td className="py-1 text-emerald-400">id</td><td>BIGINT (PK)</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-1 text-fuchsia-400">user_id</td><td>BIGINT (IDX)</td></tr>
                  <tr className="border-b border-slate-800"><td className="py-1 text-amber-400">status</td><td>'PENDING' / 'PAID'</td></tr>
                  <tr><td className="py-1 text-slate-400">expires_at</td><td>TIMESTAMP (15m)</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

      </div>

      {/* Đánh giá & Tại sao (Liên hệ bài học) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden mt-8">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Triangle size={100} />
        </div>
        <h2 className="text-xl font-bold text-slate-200 mb-6 relative z-10">Liên hệ bài học & Giải thích (Tại sao?)</h2>
        
        <div className="space-y-6 relative z-10">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-emerald-400 mb-2">1. Tại sao không Update trực tiếp tồn kho vào Database? (Chương 2)</h4>
            <p className="text-sm text-slate-300">
              Database truyền thống dùng ổ cứng (Disk) sẽ bị nghẽn (Bottleneck) khi nhận hàng chục ngàn thao tác UPDATE cùng một giây do phải thực hiện cơ chế Locking (khóa dòng - Row Lock) để tránh Race Condition. Thay vào đó, ta trừ tồn kho trên <strong>Redis (Cache/RAM)</strong> vì Redis chạy đơn luồng (Single-threaded) với tốc độ O(1), cùng với Lua script nó tự động chống được Race Condition mà vẫn đảm bảo throughput khổng lồ.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-indigo-400 mb-2">2. Message Queue đóng vai trò gì ở đây? (Chương 4)</h4>
            <p className="text-sm text-slate-300">
              Ngay cả khi Redis trừ kho thành công, ta vẫn phải ghi đơn hàng vào Database và gọi API thanh toán. Nếu làm đồng bộ (Synchronous), người dùng phải chờ rất lâu. <strong>Kafka</strong> được dùng làm "vùng đệm". Server chỉ cần ném thông tin "Đã trừ kho thành công, chờ tạo đơn" vào Queue rồi trả về cho người dùng ngay lập tức. Database phía sau sẽ từ từ đọc từ Queue và ghi vào (Asynchronous Processing). Kỹ thuật này gọi là <strong>Traffic Shaping / Load Leveling</strong>.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-amber-400 mb-2">3. Đảm bảo tính nhất quán (ACID & Định lý CAP) (Chương 3)</h4>
            <p className="text-sm text-slate-300">
              Khi thanh toán, tính nhất quán (Consistency) là quan trọng nhất. Nếu dùng NoSQL (như MongoDB/Cassandra) vốn dĩ thiên về Eventual Consistency, có nguy cơ trạng thái thanh toán bị sai lệch (người mua rồi mà hệ thống báo chưa mua). Ở đây bắt buộc dùng <strong>RDBMS (PostgreSQL/MySQL)</strong> vì tính chất ACID mạnh mẽ, đảm bảo commit transaction an toàn.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketBookingCaseStudy;
