import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Database, Zap, HardDrive, LayoutTemplate, Activity, ArrowRight, Play, X, Server, BarChart, FileText, Layers, CloudRain, Cpu } from 'lucide-react';
import GlowingCard from './ui/GlowingCard';

// ----- Modals ----- //

const MapReduceModal = ({ onClose }) => {
  const [step, setStep] = useState(0); // 0: Idle, 1: Split, 2: Map, 3: Shuffle, 4: Reduce

  const rawData = "apple orange apple grape orange grape";
  const splits = ["apple orange", "apple grape", "orange grape"];
  const maps = [
    [{ k: "apple", v: 1 }, { k: "orange", v: 1 }],
    [{ k: "apple", v: 1 }, { k: "grape", v: 1 }],
    [{ k: "orange", v: 1 }, { k: "grape", v: 1 }]
  ];
  const shuffles = {
    "apple": [1, 1],
    "orange": [1, 1],
    "grape": [1, 1]
  };
  const reduces = [
    { k: "apple", v: 2 },
    { k: "orange", v: 2 },
    { k: "grape", v: 2 }
  ];

  const handleStart = () => {
    setStep(1);
    setTimeout(() => setStep(2), 2000);
    setTimeout(() => setStep(3), 4500);
    setTimeout(() => setStep(4), 7000);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-50 bg-slate-950 p-4 md:p-8 overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-indigo-400">
              <Server /> Hadoop MapReduce Simulator
            </h2>
            <p className="text-slate-400 text-sm mt-1">Xử lý khối lượng dữ liệu khổng lồ bằng cách chia nhỏ và chạy song song.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="mb-6 flex gap-4">
          <button 
            onClick={handleStart} 
            disabled={step > 0}
            className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${step > 0 ? 'bg-slate-800 text-slate-500' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
          >
            <Play size={18} /> Chạy Job MapReduce
          </button>
          <div className="flex-1 p-2 bg-slate-900 border border-slate-700 rounded-lg flex items-center gap-4 text-sm font-mono overflow-x-auto">
            <span className="text-slate-500 shrink-0">Trạng thái:</span>
            <span className={step === 0 ? "text-slate-300" : step === 1 ? "text-sky-400" : step === 2 ? "text-fuchsia-400" : step === 3 ? "text-amber-400" : "text-emerald-400"}>
              {step === 0 ? "Đang chờ..." : step === 1 ? "1. Splitting (Cắt nhỏ Data)" : step === 2 ? "2. Mapping (Xử lý song song)" : step === 3 ? "3. Shuffling (Trao đổi mạng)" : "4. Reducing (Tổng hợp kết quả)"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-5 gap-4 h-[60vh] min-h-[400px]">
          {/* Input */}
          <div className="flex flex-col items-center justify-center border-r border-slate-800">
            <div className="text-sm font-bold text-slate-500 mb-4 uppercase">Input</div>
            <GlowingCard className="bg-slate-900 border-slate-700 p-4 text-center">
              <FileText className="mx-auto mb-2 text-slate-400" />
              <div className="font-mono text-xs text-sky-200">{rawData}</div>
            </GlowingCard>
          </div>

          {/* Split */}
          <div className="flex flex-col justify-center gap-4 border-r border-slate-800 px-2 relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-500 uppercase">Split</div>
            {step >= 1 && splits.map((s, i) => (
              <motion.div key={i} initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: i * 0.2 }}>
                <GlowingCard className="bg-sky-900/20 border-sky-500/50 p-3 text-center">
                  <div className="font-mono text-xs text-sky-200">{s}</div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>

          {/* Map */}
          <div className="flex flex-col justify-center gap-4 border-r border-slate-800 px-2 relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-500 uppercase">Map (Workers)</div>
            {step >= 2 && maps.map((m, i) => (
              <motion.div key={i} initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.2 }}>
                <GlowingCard className="bg-fuchsia-900/20 border-fuchsia-500/50 p-2 text-center">
                  {m.map((pair, j) => (
                    <div key={j} className="font-mono text-[10px] text-fuchsia-200 bg-fuchsia-900/50 rounded px-1 mb-1">
                      [{pair.k}, {pair.v}]
                    </div>
                  ))}
                </GlowingCard>
              </motion.div>
            ))}
          </div>

          {/* Shuffle */}
          <div className="flex flex-col justify-center gap-4 border-r border-slate-800 px-2 relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-500 uppercase text-center">Shuffle<br/><span className="text-[10px] normal-case">(Network I/O)</span></div>
            {step >= 3 && Object.entries(shuffles).map(([k, arr], i) => (
              <motion.div key={k} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.3 }}>
                <GlowingCard className="bg-amber-900/20 border-amber-500/50 p-2 text-center relative z-10">
                  <div className="font-mono text-xs text-amber-200">{k}: [{arr.join(',')}]</div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>

          {/* Reduce */}
          <div className="flex flex-col justify-center gap-4 px-2 relative">
            <div className="absolute top-4 left-1/2 -translate-x-1/2 text-sm font-bold text-slate-500 uppercase">Reduce</div>
            {step >= 4 && reduces.map((r, i) => (
              <motion.div key={i} initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: i * 0.3 }}>
                <GlowingCard className="bg-emerald-900/20 border-emerald-500/50 p-3 text-center">
                  <div className="font-mono text-sm font-bold text-emerald-400">{r.k}: {r.v}</div>
                </GlowingCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const StreamBatchModal = ({ onClose }) => {
  const [running, setRunning] = useState(false);
  const [streamCount, setStreamCount] = useState(0);
  const [batchCount, setBatchCount] = useState(0);
  const [bucket, setBucket] = useState(0);

  useEffect(() => {
    let interval;
    if (running) {
      interval = setInterval(() => {
        // Stream processes instantly
        setStreamCount(c => c + 1);
        
        // Batch fills bucket
        setBucket(b => {
          if (b >= 4) {
            setBatchCount(bc => bc + 5);
            return 0;
          }
          return b + 1;
        });
      }, 500); // 1 event per 500ms
    }
    return () => clearInterval(interval);
  }, [running]);

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="absolute inset-0 z-50 bg-slate-950 p-4 md:p-8 overflow-y-auto"
    >
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-6 border-b border-slate-800 pb-4">
          <div>
            <h2 className="text-2xl font-bold flex items-center gap-2 text-rose-400">
              <Zap /> Stream vs Micro-Batch Pipeline
            </h2>
            <p className="text-slate-400 text-sm mt-1">So sánh độ trễ (Latency) giữa xử lý luồng liên tục và gom cụm.</p>
          </div>
          <button onClick={onClose} className="p-2 bg-slate-800 hover:bg-rose-500/20 text-slate-400 hover:text-rose-400 rounded-lg transition-colors">
            <X size={24} />
          </button>
        </div>

        <div className="mb-8">
          <button 
            onClick={() => { setRunning(!running); if(!running) { setStreamCount(0); setBatchCount(0); setBucket(0); } }} 
            className={`px-6 py-3 rounded-lg font-bold flex items-center gap-2 ${running ? 'bg-rose-600 hover:bg-rose-500 text-white' : 'bg-emerald-600 hover:bg-emerald-500 text-white'}`}
          >
            {running ? <X size={20} /> : <Play size={20} />} {running ? 'Dừng Pipeline' : 'Chạy Pipeline'}
          </button>
        </div>

        <div className="space-y-8">
          {/* Stream Pipeline */}
          <GlowingCard className="bg-slate-900 border-slate-700 p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-sky-400 flex items-center gap-2"><Activity size={18} /> Stream Processing (Kafka/Flink)</h3>
              <span className="text-xs bg-sky-900/50 text-sky-300 px-2 py-1 rounded font-mono">Độ trễ: ~10ms</span>
            </div>
            <div className="relative h-24 bg-slate-950 rounded-lg border border-slate-800 flex items-center px-4 overflow-hidden">
              <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center z-10 shrink-0 border-2 border-slate-700">Source</div>
              <div className="flex-1 h-2 bg-slate-800 relative overflow-hidden mx-4">
                {running && (
                  <motion.div 
                    key={streamCount}
                    className="absolute top-0 left-0 w-4 h-full bg-sky-500 shadow-[0_0_10px_#0ea5e9]"
                    initial={{ x: 0 }}
                    animate={{ x: '1000%' }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  />
                )}
              </div>
              <div className="w-24 h-16 rounded-xl bg-sky-900/30 flex flex-col items-center justify-center z-10 shrink-0 border-2 border-sky-500/50">
                <span className="text-xs text-sky-400">Processed</span>
                <span className="font-mono text-xl font-bold text-white">{streamCount}</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4">Phù hợp: Phát hiện gian lận thẻ tín dụng (Fraud Detection), Gợi ý Real-time.</p>
          </GlowingCard>

          {/* Batch Pipeline */}
          <GlowingCard className="bg-slate-900 border-slate-700 p-6">
            <div className="flex justify-between mb-4">
              <h3 className="font-bold text-fuchsia-400 flex items-center gap-2"><Layers size={18} /> Micro-Batch Processing (Spark)</h3>
              <span className="text-xs bg-fuchsia-900/50 text-fuchsia-300 px-2 py-1 rounded font-mono">Độ trễ: ~Giây/Phút</span>
            </div>
            <div className="relative h-24 bg-slate-950 rounded-lg border border-slate-800 flex items-center px-4 overflow-hidden">
              <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center z-10 shrink-0 border-2 border-slate-700">Source</div>
              <div className="flex-1 h-full relative mx-4 flex items-center">
                {/* Bucket */}
                <div className="w-20 h-16 border-b-4 border-l-4 border-r-4 border-slate-600 rounded-b-lg absolute left-4 flex items-end justify-center pb-1 gap-1">
                  {[...Array(bucket)].map((_, i) => (
                    <div key={i} className="w-3 h-3 bg-fuchsia-500 rounded-full" />
                  ))}
                </div>
                {/* Batch moving */}
                {bucket === 0 && running && batchCount > 0 && (
                  <motion.div 
                    className="absolute top-1/2 -translate-y-1/2 flex gap-1 bg-fuchsia-900/50 p-2 rounded-lg border border-fuchsia-500/50"
                    initial={{ left: 20 }}
                    animate={{ left: '80%' }}
                    transition={{ duration: 0.5, ease: "easeIn" }}
                  >
                     {[...Array(5)].map((_, i) => <div key={i} className="w-3 h-3 bg-fuchsia-500 rounded-full" />)}
                  </motion.div>
                )}
              </div>
              <div className="w-24 h-16 rounded-xl bg-fuchsia-900/30 flex flex-col items-center justify-center z-10 shrink-0 border-2 border-fuchsia-500/50">
                <span className="text-xs text-fuchsia-400">Processed</span>
                <span className="font-mono text-xl font-bold text-white">{batchCount}</span>
              </div>
            </div>
            <p className="text-sm text-slate-400 mt-4">Phù hợp: Lập báo cáo doanh thu cuối ngày, Huấn luyện Machine Learning.</p>
          </GlowingCard>
        </div>
      </div>
    </motion.div>
  );
};


// ----- Main Component ----- //

const DataEngineering = () => {
  const [activeModal, setActiveModal] = useState(null); // 'batch' | 'speed' | null

  return (
    <div className="space-y-8 pb-20 relative">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h1 className="text-3xl md:text-4xl font-black mb-4 flex items-center gap-3">
          <Database className="text-indigo-500" size={40} />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-fuchsia-500">
            Data Engineering & Analytics
          </span>
        </h1>
        <p className="text-slate-400 text-lg max-w-3xl">
          Khi hệ thống tạo ra hàng Terabytes dữ liệu mỗi ngày (Big Data), các Database truyền thống sẽ gục ngã. Đây là lúc chúng ta cần đến <strong>Lambda Architecture</strong> để tách biệt luồng xử lý nhanh (Speed) và luồng xử lý khối lượng lớn (Batch).
        </p>
      </motion.div>

      {/* Lambda Architecture Master Canvas */}
      <GlowingCard className="bg-slate-900/80 p-4 md:p-8 overflow-hidden relative">
        <div className="mb-6">
          <h2 className="text-xl font-bold text-slate-200 flex items-center gap-2">
            <LayoutTemplate className="text-indigo-400" /> Lambda Architecture Master Flow
          </h2>
          <p className="text-sm text-slate-400">Sơ đồ luồng dữ liệu chuẩn cho các tập đoàn công nghệ lớn. Click vào các khối mảng màu để xem mô phỏng chi tiết.</p>
        </div>

        <div className="relative min-h-[400px] flex flex-col lg:flex-row items-center justify-between bg-slate-950 p-6 rounded-2xl border border-slate-800 overflow-x-auto">
          
          {/* Data Sources */}
          <div className="flex flex-row lg:flex-col gap-4 relative z-10 shrink-0 mb-8 lg:mb-0">
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
              <CloudRain className="text-sky-400" />
              <span className="text-sm font-bold text-slate-300">IoT Sensors</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
              <Database className="text-indigo-400" />
              <span className="text-sm font-bold text-slate-300">DB CDC Logs</span>
            </div>
            <div className="bg-slate-800 p-3 rounded-xl border border-slate-700 flex items-center gap-3">
              <Activity className="text-rose-400" />
              <span className="text-sm font-bold text-slate-300">Web Analytics</span>
            </div>
          </div>

          {/* Split Paths */}
          <div className="flex-1 w-full lg:w-auto relative min-w-[300px] px-8">
            {/* Speed Layer */}
            <div 
              onClick={() => setActiveModal('speed')}
              className="bg-sky-900/10 hover:bg-sky-900/30 border-2 border-sky-500/30 hover:border-sky-500 rounded-2xl p-4 mb-8 cursor-pointer transition-all duration-300 group relative"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-sky-500 text-white text-xs px-2 py-1 rounded-full font-bold">Xem mô phỏng</span>
              </div>
              <h3 className="text-sky-400 font-bold mb-2 flex items-center gap-2"><Zap size={18} /> Speed Layer (Real-time)</h3>
              <div className="flex items-center justify-around gap-2 text-sm text-slate-300">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-1"><Layers className="text-sky-300" size={20}/></div>
                  Kafka
                </div>
                <ArrowRight className="text-slate-600" />
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-1"><Cpu className="text-sky-300" size={20}/></div>
                  Spark Stream
                </div>
              </div>
            </div>

            {/* Batch Layer */}
            <div 
              onClick={() => setActiveModal('batch')}
              className="bg-amber-900/10 hover:bg-amber-900/30 border-2 border-amber-500/30 hover:border-amber-500 rounded-2xl p-4 cursor-pointer transition-all duration-300 group relative"
            >
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="bg-amber-500 text-white text-xs px-2 py-1 rounded-full font-bold">Xem mô phỏng</span>
              </div>
              <h3 className="text-amber-400 font-bold mb-2 flex items-center gap-2"><HardDrive size={18} /> Batch Layer (Hadoop)</h3>
              <div className="flex items-center justify-around gap-2 text-sm text-slate-300">
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-1"><Database className="text-amber-300" size={20}/></div>
                  HDFS (Lake)
                </div>
                <ArrowRight className="text-slate-600" />
                <div className="flex flex-col items-center">
                  <div className="w-10 h-10 bg-slate-800 rounded-lg flex items-center justify-center mb-1"><Server className="text-amber-300" size={20}/></div>
                  MapReduce
                </div>
              </div>
            </div>
            
            {/* Visual connecting lines */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" style={{ zIndex: -1 }}>
              <path d="M 0,150 C 50,150 50,50 100,50" fill="none" stroke="#0ea5e9" strokeWidth="2" strokeDasharray="5,5" className="opacity-50" />
              <path d="M 0,150 C 50,150 50,250 100,250" fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="5,5" className="opacity-50" />
            </svg>
          </div>

          {/* Serving Layer */}
          <div className="flex flex-col items-center relative z-10 shrink-0 mt-8 lg:mt-0">
            <div className="bg-fuchsia-900/20 p-6 rounded-2xl border-2 border-fuchsia-500/50 flex flex-col items-center">
              <h3 className="text-fuchsia-400 font-bold mb-4 flex items-center gap-2"><Server size={18} /> Serving Layer</h3>
              <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 flex flex-col items-center gap-2 mb-4">
                <Database className="text-slate-300" size={24} />
                <span className="text-sm font-bold text-slate-300">Data Warehouse<br/><span className="text-xs font-normal text-slate-500">(Snowflake / ClickHouse)</span></span>
              </div>
              <ArrowRight className="text-slate-600 rotate-90 my-2" />
              <div className="bg-indigo-600 text-white p-3 rounded-xl font-bold flex items-center gap-2 w-full justify-center">
                <BarChart size={18} /> BI Dashboard
              </div>
            </div>
          </div>

        </div>
      </GlowingCard>

      {/* Deep Dive Theories */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        <GlowingCard className="bg-slate-900/50 p-6">
          <h3 className="text-xl font-bold text-amber-400 mb-4">Tại sao cần MapReduce/Hadoop?</h3>
          <p className="text-slate-300 text-sm leading-relaxed mb-4">
            Khi file log lên tới hàng ngàn Gigabyte, không một ổ cứng hay RAM của máy chủ đơn lẻ nào chứa nổi. 
            <strong>Hadoop Distributed File System (HDFS)</strong> giải quyết bằng cách băm file đó thành các mảnh 128MB và rải ra hàng trăm máy chủ rẻ tiền.
          </p>
          <p className="text-slate-300 text-sm leading-relaxed">
            Thay vì mang Dữ liệu khổng lồ đến máy chủ để xử lý (rất chậm mạng), <strong>MapReduce</strong> mang Code đến thẳng các máy chủ đang chứa dữ liệu để xử lý tại chỗ.
          </p>
        </GlowingCard>

        <GlowingCard className="bg-slate-900/50 p-6">
          <h3 className="text-xl font-bold text-fuchsia-400 mb-4">Kappa vs Lambda Architecture</h3>
          <ul className="space-y-3 text-slate-300 text-sm">
            <li><strong className="text-indigo-300">Lambda Architecture:</strong> Chạy song song cả 2 luồng Batch (tính toán chậm, độ chính xác tuyệt đối, lưu toàn bộ lịch sử) và Speed (tính toán tức thời, độ chính xác tương đối). Nhược điểm là phải viết code 2 lần cho 2 luồng.</li>
            <li><strong className="text-indigo-300">Kappa Architecture:</strong> Loại bỏ hoàn toàn Batch Layer! Xem mọi thứ là luồng (Stream-first). Nếu cần xử lý lịch sử, hệ thống sẽ "tua lại" (replay) luồng Kafka từ đầu. Code gọn nhẹ hơn rất nhiều.</li>
          </ul>
        </GlowingCard>
      </div>

      {/* Modals Rendering */}
      <AnimatePresence>
        {activeModal === 'batch' && <MapReduceModal onClose={() => setActiveModal(null)} />}
        {activeModal === 'speed' && <StreamBatchModal onClose={() => setActiveModal(null)} />}
      </AnimatePresence>
    </div>
  );
};

export default DataEngineering;
