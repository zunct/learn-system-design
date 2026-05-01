import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Share2, Circle, Network, GitMerge, ChevronRight } from 'lucide-react';

const DistributedAlgorithms = () => {
  const [activeAlgo, setActiveAlgo] = useState('consistent-hashing');

  const algorithms = [
    {
      id: 'consistent-hashing',
      name: 'Consistent Hashing',
      icon: Circle,
      desc: 'Giải quyết bài toán chia đều dữ liệu vào các server khi số lượng server thay đổi liên tục.',
      details: 'Thay vì dùng công thức (hash(key) % N) làm cho toàn bộ dữ liệu bị đảo lộn khi thêm/bớt server (N thay đổi), Consistent Hashing ánh xạ cả Server và Dữ liệu lên một "Vòng tròn Hash". Dữ liệu sẽ thuộc về server gần nhất theo chiều kim đồng hồ.',
      useCases: ['Load Balancers', 'Distributed Caches (Redis Cluster)', 'P2P Networks']
    },
    {
      id: 'consensus',
      name: 'Consensus (Raft/Paxos)',
      icon: GitMerge,
      desc: 'Làm sao để một cụm nhiều server đồng thuận về một giá trị duy nhất (Ai làm Leader? Data mới nhất là gì?).',
      details: 'Raft sử dụng cơ chế Bầu cử (Leader Election). Một node sẽ làm Leader, nhận request từ client và sao chép (replicate) dữ liệu sang các Follower. Nếu Leader chết, các Follower sẽ tự động bầu cử ra Leader mới.',
      useCases: ['Kafka (ZooKeeper/KRaft)', 'Etcd (Kubernetes)', 'MongoDB Replica Sets']
    },
    {
      id: 'gossip',
      name: 'Gossip Protocol',
      icon: Share2,
      desc: 'Giống như "Bà hàng xóm" lan truyền tin đồn. Các node liên tục trao đổi thông tin ngẫu nhiên với nhau.',
      details: 'Thay vì có một server trung tâm quản lý trạng thái của mọi server khác (dễ sập), mỗi node sẽ thỉnh thoảng chọn vài node ngẫu nhiên để "tám chuyện" về trạng thái mạng. Chẳng mấy chốc, toàn mạng sẽ biết thông tin mới.',
      useCases: ['Cassandra (Node discovery)', 'Amazon S3', 'Consul']
    },
    {
      id: 'vector-clocks',
      name: 'Vector Clocks',
      icon: Network,
      desc: 'Xác định thứ tự (nhân quả) của các sự kiện trong hệ thống phân tán không có đồng hồ chung.',
      details: 'Trong hệ thống phân tán, thời gian (Timestamp) ở mỗi máy có thể lệch nhau. Vector Clock gán cho mỗi dữ liệu một mảng version (ví dụ [A:2, B:1]). Khi so sánh, ta biết được sự kiện nào xảy ra trước, hay chúng xảy ra đồng thời (conflict cần giải quyết).',
      useCases: ['Amazon DynamoDB', 'Riak', 'Git (Tương tự cơ chế merge conflict)']
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-rose-400 mb-4 flex items-center gap-3">
          <Share2 className="text-orange-500" size={32} />
          Thuật toán Phân tán (Distributed Algorithms)
        </h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          Khi hệ thống vượt ra khỏi một máy chủ duy nhất, bạn phải đối mặt với các vấn đề: Mạng có thể đứt, máy có thể sập, đồng hồ có thể lệch. Các thuật toán phân tán ra đời để giải quyết những sự cố này.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Navigation Sidebar */}
        <div className="md:col-span-4 space-y-3">
          {algorithms.map((algo) => {
            const Icon = algo.icon;
            const isActive = activeAlgo === algo.id;
            
            return (
              <button
                key={algo.id}
                onClick={() => setActiveAlgo(algo.id)}
                className={`w-full text-left p-4 rounded-xl border transition-all flex items-center justify-between group ${
                  isActive 
                    ? 'bg-orange-500/10 border-orange-500/50 shadow-[0_0_15px_rgba(249,115,22,0.1)]' 
                    : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${isActive ? 'bg-orange-500/20 text-orange-400' : 'bg-slate-800 text-slate-400 group-hover:text-slate-300'}`}>
                    <Icon size={18} />
                  </div>
                  <span className={`font-semibold ${isActive ? 'text-orange-400' : 'text-slate-300 group-hover:text-white'}`}>
                    {algo.name}
                  </span>
                </div>
                {isActive && <ChevronRight className="text-orange-400" size={16} />}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="md:col-span-8">
          <AnimatePresence mode="wait">
            {algorithms.map((algo) => {
              if (algo.id !== activeAlgo) return null;
              
              return (
                <motion.div
                  key={algo.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                  className="bg-slate-900/80 rounded-2xl border border-slate-800 p-6 md:p-8 relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500 rounded-full mix-blend-multiply filter blur-[100px] opacity-10" />
                  
                  <h3 className="text-2xl font-bold text-white mb-2">{algo.name}</h3>
                  <p className="text-orange-400 font-medium mb-8 text-lg">{algo.desc}</p>
                  
                  <div className="space-y-6 relative z-10">
                    <div className="bg-slate-950/50 rounded-xl p-5 border border-slate-800">
                      <h4 className="text-slate-200 font-semibold mb-3">Cách hoạt động</h4>
                      <p className="text-slate-400 leading-relaxed text-sm">
                        {algo.details}
                      </p>
                    </div>

                    <div className="bg-slate-800/30 rounded-xl p-5 border border-slate-700/50">
                      <h4 className="text-slate-200 font-semibold mb-3">Ứng dụng thực tế</h4>
                      <div className="flex flex-wrap gap-2">
                        {algo.useCases.map((uc, idx) => (
                          <span key={idx} className="px-3 py-1.5 bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 rounded-lg text-sm">
                            {uc}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {algo.id === 'consistent-hashing' && (
                    <div className="mt-8 p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <Circle className="text-orange-400 mx-auto mb-2" size={32} />
                        <p className="text-sm text-orange-300">
                          <strong>Mẹo:</strong> Để chia đều dữ liệu hơn, người ta thường dùng <em>Virtual Nodes</em> (một server vật lý tạo ra nhiều điểm ảo trên vòng tròn).
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DistributedAlgorithms;
