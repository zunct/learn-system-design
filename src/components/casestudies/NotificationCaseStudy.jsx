import React from 'react';
import { Bell, Triangle, Layers, CloudLightning, Terminal, Code, Key } from 'lucide-react';
import GlowingCard from '../ui/GlowingCard';

const NotificationCaseStudy = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-yellow-500/20 rounded-lg">
            <Bell className="text-yellow-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Hệ thống Thông Báo (Notification)</h1>
        </div>
        <p className="text-slate-400 text-lg mt-4 max-w-3xl">
          Làm thế nào để gửi hàng triệu thông báo Push, SMS, và Email trong một phút mà không làm nghẽn hệ thống nội bộ, đồng thời đảm bảo không bị mất hay trùng lặp thông báo.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <CloudLightning className="text-yellow-400" size={20} /> Tích hợp Third-party
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• Phải phụ thuộc vào Apple (APNs), Google (FCM) hoặc Mailgun/Twilio.</li>
            <li>• Các dịch vụ này có Rate Limit, có thể bị lỗi mạng (Timeouts).</li>
            <li>• Hệ thống phải chịu tải được sự phản hồi chậm của Third-party.</li>
          </ul>
        </GlowingCard>

        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Layers className="text-indigo-400" size={20} /> Xử lý lỗi & Retry
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• Cơ chế Retry (Thử lại) phải áp dụng thuật toán Exponential Backoff (Giãn cách thời gian thử).</li>
            <li>• Đảm bảo Idempotency: Người dùng không nhận 2 thông báo giống hệt nhau.</li>
          </ul>
        </GlowingCard>
      </div>

      {/* Đánh giá & Tại sao */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Triangle size={100} />
        </div>
        <h2 className="text-xl font-bold text-slate-200 mb-6 relative z-10">Liên hệ bài học & Giải thích (Tại sao?)</h2>
        
        <div className="space-y-6 relative z-10">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-emerald-400 mb-2">1. Tại sao phải tách biệt Worker theo loại kênh (Push/SMS/Email)? (Chương 4)</h4>
            <p className="text-sm text-slate-300">
              Mỗi kênh giao tiếp có đặc thù riêng. Email mất vài giây để gửi, trong khi Push APNs cực nhanh. Nếu dùng chung 1 Worker xử lý tuần tự, gửi SMS bị chậm sẽ làm kẹt cả hàng đợi Push. Kiến trúc <strong>Microservices & Đa Queue</strong> (Queue riêng cho Push, Queue riêng cho SMS) giúp hệ thống cô lập lỗi (Fault Isolation) và scale độc lập từng phần.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-indigo-400 mb-2">2. Tại sao Message Queue lại cực kỳ thiết yếu ở đây? (Chương 4)</h4>
            <p className="text-sm text-slate-300">
              Notification Service nhận request "Gửi 1 triệu thông báo Sale". Nó không thể gọi trực tiếp API của Apple 1 triệu lần ngay lập tức. MQ (Kafka/RabbitMQ) hoạt động như một <strong>Bộ đệm (Buffer) / Rate Limiter tự nhiên</strong>. Các Notification Workers sẽ "hút" dần dữ liệu từ Queue với tốc độ mà hệ thống Third-party chịu đựng được, tránh hiện tượng nghẽn cổ chai (Bottleneck).
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-amber-400 mb-2">3. Tại sao cần Redis để kiểm tra trùng lặp (Deduplication)? (Chương 2)</h4>
            <p className="text-sm text-slate-300">
              Đôi khi mạng chập chờn, client (hoặc service nội bộ) gửi lệnh tạo thông báo 2 lần. Redis sẽ lưu một khóa duy nhất (Idempotency Key) như <code>noti:event123:user456</code> trong 10 phút. Nếu lệnh tạo thông báo tiếp theo đến mà Key đã tồn tại (O(1)), hệ thống bỏ qua lệnh đó. Dùng Redis nhanh hơn gấp hàng nghìn lần so với việc `SELECT` kiểm tra trong DB.
            </p>
          </div>
        </div>
      </div>

      {/* Đi sâu vào Kỹ thuật (Tech Details) */}
      <GlowingCard delay={0.2} className="mt-8">
        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
          <Terminal size={24} className="text-blue-400" />
          Đi sâu vào Kỹ thuật (Tech Details)
        </h3>
        
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Code size={16} className="text-blue-400" /> 1. Thuật toán Exponential Backoff (Node.js)
              </span>
              <span className="text-xs text-slate-500 font-mono">JS / Retry Logic</span>
            </div>
            <div className="w-full bg-[#0d1117] overflow-x-auto">
              <pre className="p-4 text-sm font-mono leading-relaxed min-w-max">
<span className="text-pink-400">async function</span> <span className="text-blue-400">sendNotificationWithRetry</span>(<span className="text-orange-300">payload</span>, <span className="text-orange-300">maxRetries</span> = <span className="text-orange-300">5</span>) {'{'}{"\n"}
{"  "}<span className="text-pink-400">let</span> attempt = <span className="text-orange-300">0</span>;{"\n"}
  {"\n"}
{"  "}<span className="text-pink-400">while</span> (attempt &lt; maxRetries) {'{'}{"\n"}
{"    "}<span className="text-pink-400">try</span> {'{'}{"\n"}
{"      "}<span className="text-slate-500">{"// Gọi API của Apple (APNs)"}</span>{"\n"}
{"      "}<span className="text-slate-500">{"// hoặc Firebase (FCM)"}</span>{"\n"}
{"      "}<span className="text-pink-400">return await</span> APNService.<span className="text-blue-400">send</span>(payload);{"\n"}
{"    "}{'}'} <span className="text-pink-400">catch</span> (error) {'{'}{"\n"}
{"      "}<span className="text-pink-400">if</span> (error.status === <span className="text-orange-300">429</span> || error.status &gt;= <span className="text-orange-300">500</span>) {'{'}{"\n"}
{"        "}<span className="text-slate-500">{"// Tính thời gian chờ: 2^attempt * 100ms"}</span>{"\n"}
{"        "}<span className="text-slate-500">{"// + Jitter (để tránh thundering herd)"}</span>{"\n"}
{"        "}<span className="text-pink-400">const</span> baseDelay = Math.<span className="text-blue-400">pow</span>(<span className="text-orange-300">2</span>, attempt) * <span className="text-orange-300">100</span>;{"\n"}
{"        "}<span className="text-pink-400">const</span> jitter = Math.<span className="text-blue-400">random</span>() * <span className="text-orange-300">50</span>; {"\n"}
        {"\n"}
{"        "}<span className="text-pink-400">await</span> <span className="text-blue-400">sleep</span>(baseDelay + jitter);{"\n"}
        attempt++;{"\n"}
{"      "}{'}'} <span className="text-pink-400">else</span> {'{'}{"\n"}
{"        "}<span className="text-slate-500">{"// Lỗi do payload sai (400), không retry"}</span>{"\n"}
{"        "}<span className="text-pink-400">throw</span> error;{"\n"}
{"      "}{'}'}{"\n"}
{"    "}{'}'}{"\n"}
{"  "}{'}'}{"\n"}
{"  "}<span className="text-pink-400">throw new</span> <span className="text-blue-300">Error</span>(<span className="text-green-300">'Max retries exceeded'</span>);{"\n"}
{'}'}{"\n"}
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400">
              <strong className="text-blue-400">Exponential Backoff & Jitter:</strong> Khi 3rd party bị quá tải, nếu tất cả worker đồng loạt gửi lại request cùng lúc sẽ làm hệ thống của họ sập luôn (Thundering Herd problem). Exponential Backoff kéo giãn thời gian chờ (100ms, 200ms, 400ms...), và Jitter (+ random ms) làm lệch pha các worker để giảm tải đỉnh.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Key size={16} className="text-amber-400" /> 2. Chống lặp thông báo (Idempotency) với Redis
              </span>
              <span className="text-xs text-slate-500 font-mono">Redis Commands</span>
            </div>
            <div className="w-full bg-[#0d1117] overflow-x-auto">
              <pre className="p-4 text-sm font-mono leading-relaxed min-w-max">
<span className="text-slate-500">{"// 1. Tạo Idempotency Key duy nhất"}</span>{"\n"}
<span className="text-slate-500">{"//    cho event và user"}</span>{"\n"}
<span className="text-pink-400">const</span> idempotencyKey = <span className="text-green-300">`noti:order_1234:user_5678`</span>;{"\n"}
{"\n"}
<span className="text-slate-500">{"// 2. SETNX (Set if Not Exists) - Trả về 1"}</span>{"\n"}
<span className="text-slate-500">{"//    nếu thành công, 0 nếu key đã có"}</span>{"\n"}
<span className="text-pink-400">const</span> isFirstTime = <span className="text-pink-400">await</span> redis.<span className="text-blue-400">setnx</span>(idempotencyKey, <span className="text-green-300">'processing'</span>);{"\n"}
{"\n"}
<span className="text-pink-400">if</span> (isFirstTime === <span className="text-orange-300">1</span>) {'{'}{"\n"}
{"  "}<span className="text-slate-500">{"// Đặt thời gian hết hạn là 24h"}</span>{"\n"}
{"  "}<span className="text-slate-500">{"// để tiết kiệm bộ nhớ"}</span>{"\n"}
{"  "}<span className="text-pink-400">await</span> redis.<span className="text-blue-400">expire</span>(idempotencyKey, <span className="text-orange-300">86400</span>);{"\n"}
  {"\n"}
{"  "}<span className="text-slate-500">{"// Tiến hành gửi thông báo"}</span>{"\n"}
{"  "}<span className="text-pink-400">await</span> <span className="text-blue-400">sendPushNotification</span>(payload);{"\n"}
{'}'} <span className="text-pink-400">else</span> {'{'}{"\n"}
{"  "}<span className="text-slate-500">{"// Bỏ qua vì thông báo này"}</span>{"\n"}
{"  "}<span className="text-slate-500">{"// đang hoặc đã được gửi rồi"}</span>{"\n"}
{"  "}<span className="text-blue-400">console.log</span>(<span className="text-green-300">"Duplicate notification dropped"</span>);{"\n"}
{'}'}{"\n"}
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400 space-y-2">
              <p><strong className="text-amber-400">Tính chất Nguyên tử (Atomic):</strong> Lệnh <code>SETNX</code> thực thi trong 1 atomic step. Dù có 100 process cùng lúc gọi lệnh này, Redis đảm bảo chỉ có duy nhất 1 process nhận được giá trị <code>1</code>. Điều này giải quyết hoàn hảo bài toán Race Condition khi gửi thông báo.</p>
            </div>
          </div>
        </div>
      </GlowingCard>
    </div>
  );
};

export default NotificationCaseStudy;
