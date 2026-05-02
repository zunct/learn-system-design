import React from 'react';
import { Search, Globe, Triangle, Layers, Terminal, Code, Database } from 'lucide-react';
import GlowingCard from '../ui/GlowingCard';

const SearchEngineCaseStudy = () => {
  return (
    <div className="space-y-8 pb-10">
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-500/20 rounded-lg">
            <Search className="text-orange-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Hệ thống Tìm kiếm (Elasticsearch)</h1>
        </div>
        <p className="text-slate-400 text-lg mt-4 max-w-3xl">
          Bài toán: Tìm kiếm cụm từ (Full-text search) có chứa dấu, gõ sai lỗi chính tả trên hàng tỷ văn bản, đánh giá độ liên quan và trả về kết quả trong thời gian dưới 50ms (giống Google Search hoặc Shopee Search).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Globe className="text-orange-400" size={20} /> Web Crawler
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• Thu thập dữ liệu từ các website một cách liên tục.</li>
            <li>• Tránh quét (crawl) cùng 1 trang quá nhiều lần (dùng thuật toán kiểm tra URL đã xem).</li>
            <li>• Phân tách nội dung HTML để lấy văn bản thuần túy.</li>
          </ul>
        </GlowingCard>

        <GlowingCard>
          <h3 className="text-lg font-bold text-slate-200 mb-3 flex items-center gap-2">
            <Layers className="text-indigo-400" size={20} /> Inverted Index (Chỉ mục ngược)
          </h3>
          <ul className="space-y-2 text-slate-400 text-sm">
            <li>• Khác với SQL Index (Tìm Record xem có chứa từ khóa không).</li>
            <li>• Inverted Index lưu theo cấu trúc: <code>[Từ Khóa] ➜ Danh sách ID văn bản chứa nó.</code></li>
            <li>• Cực kỳ tối ưu cho việc tìm cụm từ (Search query).</li>
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
            <h4 className="font-semibold text-emerald-400 mb-2">1. Tại sao lệnh `LIKE '%keyword%'` trong SQL không dùng được? (Chương 3)</h4>
            <p className="text-sm text-slate-300">
              Lệnh `LIKE` với dấu `%` ở đầu sẽ bỏ qua hoàn toàn B-Tree Index của SQL và tiến hành <strong>Table Scan (Quét toàn bộ bảng)</strong>. Càng nhiều dữ liệu, truy vấn càng chậm. <strong>Elasticsearch / Solr</strong> xây dựng cấu trúc <strong>Inverted Index</strong>. Khi bạn tìm "Apple", nó không lật từng trang sách để tìm chữ Apple, mà mở "Mục lục" ở cuối sách, thấy chữ Apple nằm sẵn ở trang 12, 15, 99. Tốc độ chuyển từ O(N) sang O(1).
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-indigo-400 mb-2">2. Tại sao Elasticsearch phải chia thành Primary Shards và Replica Shards? (Chương 3)</h4>
            <p className="text-sm text-slate-300">
              Tìm kiếm là tác vụ rất tốn CPU (tính điểm liên quan TF-IDF / BM25). Chia dữ liệu ra <strong>Primary Shards (Sharding)</strong> giúp phân tán lượng tài liệu cho nhiều Node cùng tìm song song (MapReduce thu nhỏ). Việc có <strong>Replica Shards (Replication)</strong> không chỉ để dự phòng (Availability) mà còn để giúp tăng năng lực Read (Nhiều Replica = Nhiều máy có thể phục vụ query của người dùng cùng lúc).
            </p>
          </div>

          <div className="bg-slate-950 p-5 rounded-lg border border-slate-800">
            <h4 className="font-semibold text-amber-400 mb-2">3. Tại sao cấu trúc Caching ở hệ thống tìm kiếm lại phức tạp? (Chương 2)</h4>
            <p className="text-sm text-slate-300">
              Người dùng thường gõ sai ("shopee", "shope", "shoppee"). Tỷ lệ hit-rate của bộ nhớ đệm (Cache) cho các chuỗi Search ngẫu nhiên là khá thấp so với các hệ thống bình thường. Thay vì cache kết quả cuối cùng, hệ thống tìm kiếm ưu tiên <strong>Cache Query/Filter</strong> (ví dụ: filter "sản phẩm &gt; 1 triệu" có thể dùng lại nhiều lần) và kết hợp với tính năng Auto-complete (Suggest) để điều hướng user về một vài Keyword chung nhất định, từ đó tăng tỷ lệ trúng Cache.
            </p>
          </div>
        </div>
      </div>

      {/* Đi sâu vào Kỹ thuật (Tech Details) */}
      <GlowingCard delay={0.2} className="mt-8">
        <h3 className="text-white font-bold text-xl mb-6 flex items-center gap-2">
          <Terminal size={24} className="text-orange-400" />
          Đi sâu vào Kỹ thuật (Tech Details)
        </h3>
        
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-950 gap-2">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Code size={16} className="text-orange-400" /> 1. Cấu trúc Inverted Index (Chỉ mục ngược)
              </span>
              <span className="text-xs text-slate-500 font-mono">Data Structure</span>
            </div>
            <div className="w-full bg-[#0d1117] overflow-x-auto">
              <pre className="p-4 text-sm font-mono leading-relaxed min-w-max">
<span className="text-slate-500">{"// Tài liệu gốc (Documents)"}</span>{"\n"}
<span className="text-orange-300">Doc 1:</span> <span className="text-green-300">"Apple iPhone 15 Pro Max"</span>{"\n"}
<span className="text-orange-300">Doc 2:</span> <span className="text-green-300">"Apple Macbook Pro M3"</span>{"\n"}
<span className="text-orange-300">Doc 3:</span> <span className="text-green-300">"Ốp lưng iPhone 15"</span>{"\n"}
{"\n"}
<span className="text-slate-500">{"// Inverted Index (Từ -> Danh sách Document IDs)"}</span>{"\n"}
<span className="text-pink-400">Term</span>        | <span className="text-pink-400">Document IDs (Posting List)</span>  | <span className="text-pink-400">Tần suất (TF)</span>{"\n"}
--------------------------------------------------------{"\n"}
<span className="text-green-300">"apple"</span>     | <span className="text-blue-300">[1, 2]</span>                       | <span className="text-orange-300">2</span>{"\n"}
<span className="text-green-300">"iphone"</span>    | <span className="text-blue-300">[1, 3]</span>                       | <span className="text-orange-300">2</span>{"\n"}
<span className="text-green-300">"15"</span>        | <span className="text-blue-300">[1, 3]</span>                       | <span className="text-orange-300">2</span>{"\n"}
<span className="text-green-300">"pro"</span>       | <span className="text-blue-300">[1, 2]</span>                       | <span className="text-orange-300">2</span>{"\n"}
<span className="text-green-300">"max"</span>       | <span className="text-blue-300">[1]</span>                          | <span className="text-orange-300">1</span>{"\n"}
<span className="text-green-300">"macbook"</span>   | <span className="text-blue-300">[2]</span>                          | <span className="text-orange-300">1</span>{"\n"}
<span className="text-green-300">"m3"</span>        | <span className="text-blue-300">[2]</span>                          | <span className="text-orange-300">1</span>{"\n"}
<span className="text-green-300">"ốp"</span>        | <span className="text-blue-300">[3]</span>                          | <span className="text-orange-300">1</span>{"\n"}
<span className="text-green-300">"lưng"</span>      | <span className="text-blue-300">[3]</span>                          | <span className="text-orange-300">1</span>{"\n"}
{"\n"}
<span className="text-slate-500">{"// Khi Query tìm: \"Apple iPhone\""}</span>{"\n"}
<span className="text-slate-500">{"// Hệ thống chỉ cần lấy Giao (Intersection) của 2 Posting Lists:"}</span>{"\n"}
<span className="text-blue-400">Intersect</span>([<span className="text-orange-300">1, 2</span>], [<span className="text-orange-300">1, 3</span>]) = <span className="text-pink-400">Doc 1</span> <span className="text-slate-500">{"-> Độ phức tạp O(1)"}</span>{"\n"}
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400">
              <strong className="text-orange-400">Posting List Compression:</strong> Các ID văn bản thường được nén bằng thuật toán như Roaring Bitmaps để giảm dung lượng RAM, cho phép thực hiện phép Giao (AND) và Hợp (OR) cực kỳ nhanh ở cấp độ bit.
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex flex-col sm:flex-row sm:items-center justify-between bg-slate-950 gap-2">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Database size={16} className="text-indigo-400" /> 2. Elasticsearch Mapping & Text Analysis
              </span>
              <span className="text-xs text-slate-500 font-mono">JSON / Elastic</span>
            </div>
            <div className="w-full bg-[#0d1117] overflow-x-auto">
              <pre className="p-4 text-sm font-mono leading-relaxed min-w-max">
<span className="text-pink-400">PUT</span> <span className="text-blue-300">/products</span>{"\n"}
{'{'}{"\n"}
{"  "}<span className="text-green-300">"mappings"</span>: {'{'}{"\n"}
{"    "}<span className="text-green-300">"properties"</span>: {'{'}{"\n"}
{"      "}<span className="text-green-300">"title"</span>: {'{'}{"\n"}
{"        "}<span className="text-green-300">"type"</span>: <span className="text-orange-300">"text"</span>,{"\n"}
{"        "}<span className="text-green-300">"analyzer"</span>: <span className="text-orange-300">"standard"</span>, <span className="text-slate-500">{"// Phân tích văn bản: cắt từ, bỏ dấu..."}</span>{"\n"}
{"        "}<span className="text-green-300">"fields"</span>: {'{'}{"\n"}
{"          "}<span className="text-green-300">"keyword"</span>: {'{'} {"\n"}
{"            "}<span className="text-green-300">"type"</span>: <span className="text-orange-300">"keyword"</span> <span className="text-slate-500">{"// Dùng cho exact match và sắp xếp"}</span>{"\n"}
{"          "}{'}'}{"\n"}
{"        "}{'}'}{"\n"}
{"      "}{'}'},{"\n"}
{"      "}<span className="text-green-300">"price"</span>: {'{'}{"\n"}
{"        "}<span className="text-green-300">"type"</span>: <span className="text-orange-300">"integer"</span> <span className="text-slate-500">{"// Dữ liệu số (B-K-D Tree index)"}</span>{"\n"}
{"      "}{'}'}{"\n"}
{"    "}{'}'}{"\n"}
{"  "}{'}'}{"\n"}
{'}'}{"\n"}
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400 space-y-2">
              <p><strong className="text-indigo-400">Text vs Keyword:</strong> Trong ES, loại dữ liệu <code>text</code> sẽ được Analyzer băm nhỏ thành Inverted Index để tìm Full-text. Loại <code>keyword</code> được giữ nguyên vẹn để dùng cho việc Lọc (Filter) và Gom nhóm (Aggregations). Việc cấu hình đúng Mapping tiết kiệm rất nhiều bộ nhớ và tăng tốc search.</p>
            </div>
          </div>
        </div>
      </GlowingCard>
    </div>
  );
};

export default SearchEngineCaseStudy;
