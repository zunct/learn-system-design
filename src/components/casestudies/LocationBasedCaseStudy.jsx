import React from 'react';
import { MapPin, Database, Triangle, Layers, Grid2X2, Map, Crosshair } from 'lucide-react';
import { motion } from 'framer-motion';
import GlowingCard from '../ui/GlowingCard';

const LocationBasedCaseStudy = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/20 rounded-lg">
            <MapPin className="text-emerald-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Hệ thống Tìm kiếm Vị trí (Grab/Tinder)</h1>
        </div>
        <p className="text-slate-400 text-lg mt-4 max-w-3xl">
          Bài toán: Làm sao để tìm ra các tài xế (hoặc người dùng) xung quanh bạn trong bán kính 5km, giữa hàng triệu tài xế đang di chuyển liên tục, trong thời gian dưới 100ms.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Database className="text-amber-400" size={20} /> Thách thức dữ liệu
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• Tọa độ (Lat/Long) của tài xế cập nhật liên tục (mỗi 3 giây).</li>
            <li>• Tìm kiếm bằng khoảng cách không thể dùng `WHERE` SQL thông thường vì rất chậm (Quét toàn bộ bảng).</li>
            <li>• Tỷ lệ Read/Write cực cao (nhiều write từ tài xế, nhiều read từ khách hàng).</li>
          </ul>
        </GlowingCard>

        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Layers className="text-indigo-400" size={20} /> Giải pháp kiến trúc
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• <strong>Thuật toán GeoHash / QuadTree:</strong> Chuyển bản đồ 2D thành chuỗi 1D để dễ index.</li>
            <li>• <strong>Redis Geospatial:</strong> Lưu trữ dữ liệu vị trí tạm thời trên RAM để tra cứu siêu tốc.</li>
            <li>• <strong>Cassandra / NoSQL:</strong> Lưu trữ lịch sử di chuyển phục vụ phân tích sau này.</li>
          </ul>
        </GlowingCard>
      </div>

      {/* Kiến trúc chi tiết (Tech details) */}
      <div className="space-y-6 mt-8">
        
        {/* Geohash Explanation */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-emerald-500/5">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Grid2X2 className="text-emerald-400" size={24} />
            1. Thuật toán Geohash (Base32)
          </h2>
          <p className="text-sm text-slate-400 mb-6">
            Geohash chia thế giới thành các lưới chữ nhật. Càng nhiều ký tự, ô lưới càng nhỏ và chính xác. Các địa điểm gần nhau sẽ chia sẻ chung tiền tố (prefix). Bằng cách chuyển đổi 2D thành 1D (chuỗi String), ta dễ dàng đánh index và tìm kiếm siêu tốc trong Database.
          </p>

          <div className="flex flex-col md:flex-row gap-6 mb-6">
            {/* Visual Grid */}
            <div className="w-full md:w-1/2 bg-slate-950 p-4 rounded-lg border border-slate-800 flex flex-col items-center justify-center relative overflow-hidden">
              <div className="absolute top-2 left-2 text-[10px] font-mono text-slate-500">Thế giới (w)</div>
              
              <div className="grid grid-cols-2 grid-rows-2 gap-1 w-48 h-48 border-2 border-slate-700 p-1">
                <div className="border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-mono">w0</div>
                <div className="border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-mono">w2</div>
                <div className="border border-slate-700 flex items-center justify-center text-xs text-slate-500 font-mono">w1</div>
                
                {/* Highlighted cell containing sub-grid */}
                <div className="border border-emerald-500/50 bg-emerald-500/5 p-0.5 relative">
                  <div className="absolute top-0 right-1 text-[9px] text-emerald-400 font-bold">w3</div>
                  <div className="grid grid-cols-2 grid-rows-2 w-full h-full gap-0.5 opacity-80">
                    <div className="bg-slate-800/50"></div>
                    <div className="bg-slate-800/50"></div>
                    
                    {/* The specific target cell */}
                    <div className="bg-emerald-500/20 border border-emerald-400/50 flex flex-col items-center justify-center relative overflow-hidden group">
                      <motion.div 
                        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="absolute inset-0 bg-emerald-400/20"
                      />
                      <MapPin size={12} className="text-emerald-400 z-10" />
                      <span className="text-[7px] font-mono text-emerald-300 mt-1 z-10">w3g</span>
                    </div>
                    
                    <div className="bg-slate-800/50"></div>
                  </div>
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 text-sm text-slate-400">
                <Crosshair size={16} className="text-emerald-400" /> 
                Mỗi ký tự thêm vào, chia ô lưới thành 32 ô nhỏ hơn
              </div>
            </div>

            <div className="w-full md:w-1/2 bg-slate-950 rounded-lg p-4 font-mono text-sm overflow-x-auto border border-slate-800 flex flex-col justify-center">
<pre>
<code className="text-slate-300">
<span className="text-slate-500">// Ví dụ tọa độ Hồ Chí Minh: 10.76, 106.66</span><br/>
<span className="text-fuchsia-400">Lat:</span> 10.762622  <span className="text-fuchsia-400">Lng:</span> 106.660172<br/>
<br/>
<span className="text-slate-500">// Geohash Length = 6 (~1.2km)</span><br/>
<span className="text-amber-300">Hash:</span> w3gtpd<br/>
<br/>
<span className="text-slate-500">// Tìm tài xế xung quanh ta dùng SQL:</span><br/>
<span className="text-fuchsia-400">SELECT</span> * <span className="text-fuchsia-400">FROM</span> Drivers <br/>
<span className="text-fuchsia-400">WHERE</span> geohash <span className="text-fuchsia-400">LIKE</span> <span className="text-emerald-300">'w3gtpd%'</span>;<br/>
<span className="text-slate-500">// (Tận dụng B-Tree Index siêu tốc O(log N))</span><br/>
</code>
</pre>
            </div>
          </div>
        </div>

        {/* Redis Geospatial */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 shadow-lg shadow-amber-500/5">
          <h2 className="text-xl font-bold text-slate-200 mb-4 flex items-center gap-2">
            <Database className="text-amber-400" size={24} />
            2. Redis Geospatial (In-Memory Processing)
          </h2>
          <p className="text-sm text-slate-400 mb-4">
            Để đạt latency &lt;100ms, toàn bộ tọa độ tài xế đang online được đẩy thẳng vào Redis bằng các lệnh Geospatial tối ưu. Redis sử dụng Sorted Set và thuật toán Geohash cực lẹ ở bên dưới.
          </p>
          <div className="bg-slate-950 rounded-lg p-4 font-mono text-sm border border-slate-800 text-slate-300 overflow-x-auto">
<pre>
<code className="text-slate-300">
<span className="text-slate-500">// 1. Tài xế (driver_99) cập nhật vị trí mỗi 3 giây</span><br/>
GEOADD online_drivers <span className="text-orange-400">106.660172</span> <span className="text-orange-400">10.762622</span> <span className="text-indigo-300">"driver_99"</span><br/>
<br/>
<span className="text-slate-500">// 2. Khách hàng tìm tài xế quanh tọa độ của mình (bán kính 3km)</span><br/>
GEORADIUS online_drivers <span className="text-orange-400">106.661000</span> <span className="text-orange-400">10.763000</span> <span className="text-orange-400">3</span> km WITHDIST ASC LIMIT 5<br/>
<br/>
<span className="text-slate-500">// 3. Kết quả trả về ngay trong Memory (cực nhanh)</span><br/>
<span className="text-slate-500">1) "driver_99"   (0.5 km)</span><br/>
<span className="text-slate-500">2) "driver_12"   (1.2 km)</span><br/>
<span className="text-slate-500">...</span><br/>
</code>
</pre>
          </div>
        </div>

      </div>

      {/* Đánh giá & Tại sao */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 relative overflow-hidden mt-8">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <Triangle size={100} />
        </div>
        <h2 className="text-xl font-bold text-slate-200 mb-6 relative z-10">Liên hệ bài học & Giải thích (Tại sao?)</h2>
        
        <div className="space-y-6 relative z-10">
          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-emerald-400 mb-2">1. Tại sao không dùng công thức Toán học SQL thuần? (Chương 5)</h4>
            <p className="text-sm text-slate-300">
              SQL Server cần so sánh công thức <code>sqrt((x2-x1)^2 + (y2-y1)^2)</code> cho tất cả tài xế ➜ Độ phức tạp O(n). <strong>GeoHash</strong> đưa bài toán tìm kiếm 2D về so sánh chuỗi 1D (LIKE 'wx4g%'), từ đó tận dụng được B-Tree Index, giảm độ phức tạp xuống O(log n).
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-indigo-400 mb-2">2. Tại sao chọn Redis Geospatial cho vị trí hiện tại? (Chương 3 & 2)</h4>
            <p className="text-sm text-slate-300">
              Tài xế gửi vị trí liên tục. Cần một Database có tốc độ Write siêu nhanh. Nếu lưu vào RDBMS (PostgreSQL), việc cập nhật liên tục sẽ tạo ra disk I/O nghẽn và làm chậm toàn hệ thống. Redis chạy trên RAM và có sẵn module GEO nên tốc độ xử lý là hoàn hảo.
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-amber-400 mb-2">3. Tại sao hệ thống này ưu tiên AP hơn CP (Định lý CAP)? (Chương 3)</h4>
            <p className="text-sm text-slate-300">
              Việc nhìn thấy một tài xế bị lệch 5-10 mét hoặc vị trí chậm mất 2 giây không phải là vấn đề nghiêm trọng chết người. Do đó hệ thống ưu tiên <strong>Tính Sẵn Sàng (Availability)</strong> và Tốc độ cao thay vì Tính Nhất Quán tuyệt đối (Consistency). Kiến trúc Eventual Consistency là lựa chọn hoàn hảo.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LocationBasedCaseStudy;
