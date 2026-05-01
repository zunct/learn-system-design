import React from 'react';
import { Video, Cloud, Database, ArrowRight, ShieldCheck, Clock, Cpu, Terminal, Code, Network } from 'lucide-react';
import GlowingCard from '../ui/GlowingCard';

const VideoStreamingCaseStudy = () => {
  return (
    <div className="space-y-8">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-medium mb-4">
          <Video size={16} />
          <span>Case Study</span>
        </div>
        <h2 className="text-3xl font-black text-white mb-4">Thiết kế hệ thống <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-orange-500">Video Streaming (Netflix / YouTube)</span></h2>
        
        <p className="text-slate-400 text-lg max-w-3xl">
          Giải phẫu bài toán truyền phát video chất lượng cao cho hàng trăm triệu người xem cùng lúc trên toàn cầu mà không bị giật lag (buffering).
        </p>
      </div>

      {/* Yêu cầu hệ thống */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <GlowingCard delay={0.1}>
          <h3 className="text-red-400 font-bold mb-3 flex items-center gap-2"><ShieldCheck size={20} /> Yêu cầu chức năng</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-red-500 shrink-0 mt-0.5" /> Upload video, xử lý nhiều độ phân giải (1080p, 4K).</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-red-500 shrink-0 mt-0.5" /> Xem video (Streaming) mượt mà, hỗ trợ tua nhanh.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-red-500 shrink-0 mt-0.5" /> Lưu trữ Metadata (tiêu đề, số lượt xem, likes).</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-red-500 shrink-0 mt-0.5" /> Tìm kiếm và đề xuất video.</li>
          </ul>
        </GlowingCard>

        <GlowingCard delay={0.2}>
          <h3 className="text-orange-400 font-bold mb-3 flex items-center gap-2"><Clock size={20} /> Yêu cầu phi chức năng</h3>
          <ul className="space-y-2 text-sm text-slate-300">
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-orange-500 shrink-0 mt-0.5" /> <strong>Không giật lag:</strong> Yêu cầu băng thông lớn, truyền tải gần người dùng.</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-orange-500 shrink-0 mt-0.5" /> <strong>Lưu trữ khổng lồ:</strong> Video gốc tốn rất nhiều dung lượng (Petabytes).</li>
            <li className="flex gap-2 items-start"><ArrowRight size={16} className="text-orange-500 shrink-0 mt-0.5" /> <strong>Tính khả dụng:</strong> Nếu một server chết, video vẫn phải play được.</li>
          </ul>
        </GlowingCard>
      </div>

      {/* Liên kết Kiến thức */}
      <GlowingCard delay={0.3} className="mt-8">
        <h3 className="text-white font-bold text-xl mb-6">Liên kết Kiến thức cốt lõi</h3>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-red-500/30 transition-colors">
            <div className="w-12 h-12 bg-red-500/10 rounded-lg flex items-center justify-center mb-4">
              <Cloud className="text-red-400" size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">Mạng lưới CDN (Chương 2)</h4>
            <p className="text-slate-400 text-sm">
              Netflix không stream video trực tiếp từ máy chủ gốc ở Mỹ cho người xem ở Việt Nam. Họ dùng mạng lưới <strong>CDN (Content Delivery Network)</strong>. Video được copy ra hàng nghìn Edge Server trên toàn cầu. Bạn xem Netflix là đang tải từ máy chủ nằm ngay tại nhà mạng của bạn.
            </p>
          </div>

          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-orange-500/30 transition-colors">
            <div className="w-12 h-12 bg-orange-500/10 rounded-lg flex items-center justify-center mb-4">
              <Cpu className="text-orange-400" size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">Message Queue & Worker (Chương 4)</h4>
            <p className="text-slate-400 text-sm">
              Khi Upload video gốc (4K, dung lượng lớn), luồng xử lý sẽ đẩy vào <strong>Message Queue</strong> (VD: Kafka). Hệ thống các <strong>Worker Nodes</strong> ngầm lấy ra để chia nhỏ, giải nén và Encode (chuyển đổi) sang các độ phân giải thấp hơn (1080p, 720p, 480p).
            </p>
          </div>

          <div className="bg-slate-900/50 p-5 rounded-xl border border-slate-800 hover:border-amber-500/30 transition-colors">
            <div className="w-12 h-12 bg-amber-500/10 rounded-lg flex items-center justify-center mb-4">
              <Database className="text-amber-400" size={24} />
            </div>
            <h4 className="text-white font-bold mb-2">Blob Storage (Chương 3)</h4>
            <p className="text-slate-400 text-sm">
              Database thông thường (MySQL/PostgreSQL) không dùng để chứa file video. Các file gốc và file đã encode được lưu trữ ở <strong>Blob/Object Storage (như Amazon S3)</strong>. Database chỉ lưu đường link trỏ tới các file đó.
            </p>
          </div>

        </div>
      </GlowingCard>

      {/* Đi sâu vào Kỹ thuật (Tech Details) */}
      <GlowingCard delay={0.4} className="mt-8">
        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
          <Terminal size={24} className="text-red-400" />
          Đi sâu vào Kỹ thuật (Tech Details)
        </h3>
        
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Code size={16} className="text-red-400" /> 1. Giao thức HLS (HTTP Live Streaming)
              </span>
              <span className="text-xs text-slate-500 font-mono">.m3u8 Playlist</span>
            </div>
            <div className="p-4 bg-[#0d1117] overflow-x-auto">
<pre className="text-sm font-mono leading-relaxed">
<span className="text-slate-500">{"#EXTM3U"}</span>
<span className="text-slate-500">{"#EXT-X-VERSION:3"}</span>
<span className="text-slate-500">{"#EXT-X-TARGETDURATION:10"}</span>
<span className="text-slate-500">{"#EXT-X-MEDIA-SEQUENCE:0"}</span>

<span className="text-slate-500">{"# Lát cắt 1 (Chunk 1) - dài 10 giây"}</span>
<span className="text-pink-400">#EXTINF</span>:<span className="text-orange-300">10.000</span>,
<span className="text-blue-300">https://cdn.example.com/video123/1080p/chunk_000.ts</span>

<span className="text-slate-500">{"# Lát cắt 2 (Chunk 2) - dài 10 giây"}</span>
<span className="text-pink-400">#EXTINF</span>:<span className="text-orange-300">10.000</span>,
<span className="text-blue-300">https://cdn.example.com/video123/1080p/chunk_001.ts</span>

<span className="text-slate-500">{"# Lát cắt 3 (Chunk 3) - dài 5.5 giây (đoạn kết)"}</span>
<span className="text-pink-400">#EXTINF</span>:<span className="text-orange-300">5.500</span>,
<span className="text-blue-300">https://cdn.example.com/video123/1080p/chunk_002.ts</span>

<span className="text-slate-500">{"#EXT-X-ENDLIST"}</span>
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400 space-y-2">
              <strong className="text-red-400">Video Chunking là gì?</strong> Các hệ thống lớn không tải nguyên 1 file <code>.mp4</code> khổng lồ (2GB) về máy người dùng. Video sẽ được FFmpeg băm nhỏ thành hàng nghìn lát cắt <code>.ts</code> (mỗi file dài khoảng 10 giây). 
              Client đọc file <code>.m3u8</code> (Playlist) để biết có bao nhiêu lát cắt, sau đó vừa xem vừa tải các lát cắt tiếp theo. Nếu mạng yếu, Client có thể đổi sang Playlist của bản 720p hoặc 480p giữa chừng (Adaptive Bitrate Streaming) mà không bị đứt quãng.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-950">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Network size={16} className="text-orange-400" /> 2. Cấu trúc Storage: DB vs Blob Storage
              </span>
              <span className="text-xs text-slate-500 font-mono">Architecture</span>
            </div>
            <div className="p-4 bg-[#0d1117] overflow-x-auto">
<pre className="text-sm font-mono leading-relaxed">
<span className="text-pink-400">TABLE</span> <span className="text-blue-300">videos</span> (Metadata DB - MySQL / PostgreSQL)
--------------------------------------------------
<span className="text-orange-300">id</span>          : <span className="text-green-300">"v_12345"</span>
<span className="text-orange-300">title</span>       : <span className="text-green-300">"System Design Interview"</span>
<span className="text-orange-300">author_id</span>   : <span className="text-green-300">"u_999"</span>
<span className="text-orange-300">status</span>      : <span className="text-green-300">"READY"</span>
<span className="text-orange-300">views</span>       : <span className="text-orange-300">1500000</span>
<span className="text-orange-300">playlist_url</span>: <span className="text-green-300">"https://s3.aws.com/bucket/v_12345/master.m3u8"</span>

<span className="text-slate-500">{"// Database chỉ lưu Metadata cực nhẹ. Còn file nặng lưu trên S3 (Blob Storage)"}</span>
<span className="text-slate-500">{"// Quá trình Upload gốc:"}</span>
<span className="text-pink-400">1.</span> Client xin URL upload tạm thời (Pre-signed URL) từ API Server.
<span className="text-pink-400">2.</span> Client đẩy thẳng file mp4 nặng 2GB lên Amazon S3 (không đi qua API Server để tránh sập).
<span className="text-pink-400">3.</span> S3 bắn Event qua Message Queue. Worker Nodes nhận Event và bắt đầu chuyển đổi (Encode) video.
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400 space-y-2">
              <p><strong className="text-orange-400">Tách biệt Control Plane & Data Plane:</strong> Mọi luồng dữ liệu nặng (Data Plane - Video stream, file upload) phải đi qua hệ thống chuyên biệt như S3 và CDN. Các API Servers (Control Plane) chỉ xử lý Data siêu nhẹ như đăng nhập, tính tiền, cập nhật lượt xem.</p>
            </div>
          </div>
        </div>
      </GlowingCard>

    </div>
  );
};

export default VideoStreamingCaseStudy;
