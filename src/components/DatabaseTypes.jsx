import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Share2, Clock, Table, FileJson, Key, ListTree } from 'lucide-react';

const DatabaseTypes = () => {
  const [activeType, setActiveType] = useState('relational');

  const dbTypes = [
    {
      id: 'relational',
      name: 'Relational (SQL)',
      icon: Table,
      color: 'bg-blue-500',
      activeBorder: 'border-blue-500/50',
      activeShadow: 'shadow-[0_0_15px_rgba(59,130,246,0.1)]',
      description: 'Dữ liệu được tổ chức thành các bảng có cấu trúc chặt chẽ, liên kết với nhau bằng khóa (keys). Đảm bảo tính ACID (Atomicity, Consistency, Isolation, Durability).',
      examples: 'MySQL, PostgreSQL, Oracle, SQL Server',
      bestFor: [
        'Hệ thống tài chính, ngân hàng, giao dịch',
        'Ứng dụng có schema dữ liệu rõ ràng, ít thay đổi',
        'Cần thực hiện các truy vấn phức tạp (JOIN)'
      ],
      drawbacks: 'Khó mở rộng theo chiều ngang (Horizontal Scaling), schema cứng nhắc.'
    },
    {
      id: 'document',
      name: 'Document (NoSQL)',
      icon: FileJson,
      color: 'bg-green-500',
      activeBorder: 'border-green-500/50',
      activeShadow: 'shadow-[0_0_15px_rgba(34,197,94,0.1)]',
      description: 'Lưu trữ dữ liệu dưới dạng tài liệu (thường là JSON/BSON). Schema linh hoạt, mỗi tài liệu có thể có cấu trúc khác nhau.',
      examples: 'MongoDB, Couchbase, Firestore',
      bestFor: [
        'Content Management Systems (CMS)',
        'E-commerce catalogs',
        'Dữ liệu không cấu trúc hoặc cấu trúc thay đổi liên tục'
      ],
      drawbacks: 'Không hỗ trợ các giao dịch (transactions) phức tạp qua nhiều tài liệu, không phù hợp cho truy vấn JOIN.'
    },
    {
      id: 'keyvalue',
      name: 'Key-Value',
      icon: Key,
      color: 'bg-purple-500',
      activeBorder: 'border-purple-500/50',
      activeShadow: 'shadow-[0_0_15px_rgba(168,85,247,0.1)]',
      description: 'Cấu trúc dữ liệu đơn giản nhất, lưu trữ dưới dạng cặp Key-Value. Tốc độ đọc/ghi cực kỳ nhanh.',
      examples: 'Redis, Memcached, DynamoDB',
      bestFor: [
        'Caching (Lưu bộ nhớ đệm)',
        'Quản lý Session',
        'Giỏ hàng (Shopping cart)'
      ],
      drawbacks: 'Chỉ truy vấn được qua Key, không phù hợp với dữ liệu phức tạp cần query.'
    },
    {
      id: 'widecolumn',
      name: 'Wide-Column',
      icon: ListTree,
      color: 'bg-red-500',
      activeBorder: 'border-red-500/50',
      activeShadow: 'shadow-[0_0_15px_rgba(239,68,68,0.1)]',
      description: 'Lưu trữ dữ liệu theo cột thay vì hàng. Tối ưu cho việc ghi dữ liệu tốc độ cao và số lượng cực lớn.',
      examples: 'Cassandra, HBase, ScyllaDB',
      bestFor: [
        'Hệ thống IoT (Internet of Things)',
        'Lưu trữ nhật ký hệ thống (Logs), Time-series cơ bản',
        'Recommendation engines'
      ],
      drawbacks: 'Không hỗ trợ JOIN, thiết kế dữ liệu phải dựa theo câu truy vấn (query-driven design).'
    },
    {
      id: 'graph',
      name: 'Graph',
      icon: Share2,
      color: 'bg-pink-500',
      activeBorder: 'border-pink-500/50',
      activeShadow: 'shadow-[0_0_15px_rgba(236,72,153,0.1)]',
      description: 'Được thiết kế để lưu trữ và điều hướng các mối quan hệ phức tạp giữa dữ liệu bằng Đỉnh (Nodes) và Cạnh (Edges).',
      examples: 'Neo4j, Amazon Neptune, ArangoDB',
      bestFor: [
        'Mạng xã hội (Social Networks)',
        'Hệ thống gợi ý (Recommendation Engines)',
        'Phát hiện gian lận (Fraud Detection)'
      ],
      drawbacks: 'Hiệu năng kém khi phải quét toàn bộ dữ liệu, đường cong học tập (learning curve) cao.'
    },
    {
      id: 'search',
      name: 'Search Engine',
      icon: Search,
      color: 'bg-yellow-500',
      activeBorder: 'border-yellow-500/50',
      activeShadow: 'shadow-[0_0_15px_rgba(234,179,8,0.1)]',
      description: 'Tối ưu cho việc tìm kiếm toàn văn bản (full-text search) và phân tích dữ liệu nhanh chóng.',
      examples: 'Elasticsearch, Solr, Algolia',
      bestFor: [
        'Thanh tìm kiếm trong ứng dụng',
        'Phân tích Log (ELK stack)',
        'Tìm kiếm sản phẩm e-commerce'
      ],
      drawbacks: 'Không thay thế được database chính, chi phí duy trì RAM và Disk cao.'
    },
    {
      id: 'timeseries',
      name: 'Time-Series',
      icon: Clock,
      color: 'bg-teal-500',
      activeBorder: 'border-teal-500/50',
      activeShadow: 'shadow-[0_0_15px_rgba(20,184,166,0.1)]',
      description: 'Tối ưu cho dữ liệu gắn với mốc thời gian, tập trung vào việc ghi tốc độ cao và phân tích chuỗi thời gian.',
      examples: 'InfluxDB, Prometheus, TimescaleDB',
      bestFor: [
        'Hệ thống giám sát (Monitoring)',
        'Dữ liệu cảm biến IoT',
        'Phân tích chứng khoán, tiền ảo'
      ],
      drawbacks: 'Chỉ dùng cho mục đích cụ thể (dữ liệu có timestamp), không hỗ trợ tốt cập nhật/xóa.'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-cyan-400 mb-4">
          Chọn Database nào? (Database Types)
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Không có một cơ sở dữ liệu nào hoàn hảo cho mọi bài toán. Lựa chọn database (Polyglot Persistence) phụ thuộc vào <strong>loại dữ liệu</strong>, <strong>cách bạn truy vấn nó</strong>, và <strong>yêu cầu mở rộng</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: DB List */}
        <div className="lg:col-span-1 space-y-3">
          {dbTypes.map(db => {
            const Icon = db.icon;
            const isActive = activeType === db.id;
            
            return (
              <button
                key={db.id}
                onClick={() => setActiveType(db.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-center gap-4 group ${
                  isActive 
                    ? `bg-slate-800/80 ${db.activeBorder} ${db.activeShadow}` 
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <div className={`p-2 rounded-lg ${isActive ? db.color : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                  <Icon className={isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'} size={20} />
                </div>
                <div>
                  <h3 className={`font-semibold ${isActive ? 'text-white' : 'text-slate-300'}`}>
                    {db.name}
                  </h3>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: DB Details */}
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            {dbTypes.map((db) => {
              if (db.id !== activeType) return null;
              const Icon = db.icon;
              
              return (
                <motion.div
                  key={db.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-900/50 rounded-2xl border border-slate-800 p-8 h-full relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-64 h-64 ${db.color} rounded-full mix-blend-multiply filter blur-[80px] opacity-10`} />
                  
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`p-3 rounded-xl ${db.color}`}>
                      <Icon className="text-white" size={32} />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white">{db.name}</h3>
                      <p className="text-slate-400 font-mono text-sm mt-1">Ví dụ: {db.examples}</p>
                    </div>
                  </div>

                  <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                    {db.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                      <h4 className="text-emerald-400 font-semibold mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-emerald-400" />
                        Tốt nhất cho (Best For)
                      </h4>
                      <ul className="space-y-2">
                        {db.bestFor.map((item, idx) => (
                          <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
                            <span className="text-emerald-500/50 mt-1">›</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="bg-slate-800/50 rounded-xl p-5 border border-slate-700/50">
                      <h4 className="text-rose-400 font-semibold mb-3 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-rose-400" />
                        Nhược điểm (Drawbacks)
                      </h4>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {db.drawbacks}
                      </p>
                    </div>
                  </div>

                  <div className="mt-8 p-4 bg-indigo-500/10 border border-indigo-500/20 rounded-xl">
                    <p className="text-sm text-indigo-300">
                      <strong className="text-indigo-400">Pro Tip:</strong> Trong một hệ thống thực tế lớn, hiếm khi người ta chỉ dùng một loại database. Sự kết hợp phổ biến là SQL làm cơ sở dữ liệu chính (Source of truth), Redis (Key-Value) làm cache, và Elasticsearch (Search Engine) để phục vụ tìm kiếm.
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DatabaseTypes;
