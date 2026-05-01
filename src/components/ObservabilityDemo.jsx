import React, { useState } from 'react';
import { Activity, FileText, GitCommit, Search, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const ObservabilityDemo = () => {
  const [activeTab, setActiveTab] = useState('metrics');

  const pillars = [
    {
      id: 'metrics',
      name: 'Metrics (Chỉ số)',
      icon: Activity,
      desc: 'Dữ liệu dạng số được tổng hợp qua thời gian. Cho biết TỔNG QUAN hệ thống đang hoạt động ra sao.',
      color: 'text-blue-400',
      bgColor: 'bg-blue-400/10'
    },
    {
      id: 'logs',
      name: 'Logs (Nhật ký)',
      icon: FileText,
      desc: 'Bản ghi chi tiết các sự kiện (events) đã xảy ra. Cho biết CHÍNH XÁC điều gì đã xảy ra.',
      color: 'text-amber-400',
      bgColor: 'bg-amber-400/10'
    },
    {
      id: 'traces',
      name: 'Traces (Dấu vết)',
      icon: GitCommit,
      desc: 'Theo dõi hành trình của một request qua nhiều microservices. Cho biết request CHẬM Ở ĐÂU.',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-400/10'
    }
  ];

  const renderMetrics = () => (
    <div className="space-y-4 font-mono text-sm">
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-400">CPU Usage</span>
          <span className="text-blue-400">78%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '78%' }}
            className="h-full bg-blue-500"
          />
        </div>
      </div>
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-400">API Error Rate (5xx)</span>
          <span className="text-rose-400">2.4%</span>
        </div>
        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: '2.4%' }}
            className="h-full bg-rose-500"
          />
        </div>
      </div>
      <div className="bg-slate-900 rounded-lg p-4 border border-slate-700">
        <div className="flex justify-between items-center mb-4">
          <span className="text-slate-400">Active Users</span>
          <span className="text-emerald-400">12,453</span>
        </div>
        <div className="flex items-end h-12 gap-1">
          {[40, 60, 45, 70, 85, 90, 75, 65, 80, 100].map((h, i) => (
            <motion.div 
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${h}%` }}
              className="flex-1 bg-emerald-500/50 rounded-t-sm"
            />
          ))}
        </div>
      </div>
    </div>
  );

  const renderLogs = () => (
    <div className="bg-slate-950 rounded-lg p-4 border border-slate-800 font-mono text-xs overflow-x-auto space-y-2">
      <div className="flex gap-3 text-slate-500">
        <span>2024-05-20 10:23:41</span>
        <span className="text-emerald-400">[INFO]</span>
        <span>api-gateway</span>
        <span className="text-slate-300">Request received: POST /api/v1/orders</span>
      </div>
      <div className="flex gap-3 text-slate-500">
        <span>2024-05-20 10:23:41</span>
        <span className="text-emerald-400">[INFO]</span>
        <span>auth-service</span>
        <span className="text-slate-300">Token validated for user_id: 8493</span>
      </div>
      <div className="flex gap-3 text-slate-500">
        <span>2024-05-20 10:23:42</span>
        <span className="text-amber-400">[WARN]</span>
        <span>inventory-service</span>
        <span className="text-slate-300">Low stock alert for item_id: PRD-921</span>
      </div>
      <div className="flex gap-3 text-slate-500 bg-rose-500/10 p-1 -mx-1 rounded">
        <span>2024-05-20 10:23:44</span>
        <span className="text-rose-400">[ERROR]</span>
        <span>payment-service</span>
        <span className="text-slate-300">Connection timeout to Stripe API. Trace_ID: <span className="text-indigo-400">trace-9f8a2b</span></span>
      </div>
      <div className="flex gap-3 text-slate-500">
        <span>2024-05-20 10:23:44</span>
        <span className="text-emerald-400">[INFO]</span>
        <span>api-gateway</span>
        <span className="text-slate-300">Response sent: 500 Internal Server Error (Duration: 3200ms)</span>
      </div>
    </div>
  );

  const renderTraces = () => (
    <div className="bg-slate-900 rounded-lg p-4 border border-slate-700 font-mono text-sm space-y-3">
      <div className="flex justify-between text-slate-400 border-b border-slate-800 pb-2 mb-4">
        <span>Trace ID: trace-9f8a2b</span>
        <span>Total Time: 3200ms</span>
      </div>
      
      <div className="relative">
        {/* Waterfall items */}
        <div className="space-y-3">
          <div className="flex items-center">
            <div className="w-1/3 text-xs text-slate-300">api-gateway</div>
            <div className="w-2/3 relative h-6">
              <div className="absolute left-0 top-1 h-4 bg-blue-500/80 rounded w-full"></div>
              <span className="absolute right-2 top-1 text-[10px] text-white">3200ms</span>
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="w-1/3 text-xs text-slate-300 pl-4 border-l border-slate-700">auth-service</div>
            <div className="w-2/3 relative h-6">
              <div className="absolute left-0 top-1 h-4 bg-emerald-500/80 rounded w-[5%]"></div>
              <span className="absolute left-[7%] top-1 text-[10px] text-slate-400">150ms</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 text-xs text-slate-300 pl-4 border-l border-slate-700">inventory-service</div>
            <div className="w-2/3 relative h-6">
              <div className="absolute left-[5%] top-1 h-4 bg-purple-500/80 rounded w-[2%]"></div>
              <span className="absolute left-[9%] top-1 text-[10px] text-slate-400">50ms</span>
            </div>
          </div>

          <div className="flex items-center">
            <div className="w-1/3 text-xs text-rose-400 pl-4 border-l border-slate-700">payment-service (Error)</div>
            <div className="w-2/3 relative h-6">
              <div className="absolute left-[7%] top-1 h-4 bg-rose-500/80 rounded w-[93%]"></div>
              <span className="absolute right-2 top-1 text-[10px] text-white">3000ms (Timeout)</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold text-white mb-4">Observability (Log, Metric & Trace)</h2>
        <p className="text-slate-400 text-lg leading-relaxed">
          "Giám sát" (Monitoring) chỉ cho bạn biết hệ thống đang bị lỗi. Còn "Khả năng quan sát" (Observability) giúp bạn trả lời câu hỏi <strong>"Tại sao hệ thống lỗi?"</strong> bằng cách kết hợp 3 trụ cột (The Three Pillars).
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {pillars.map((pillar) => {
          const Icon = pillar.icon;
          const isActive = activeTab === pillar.id;
          return (
            <button
              key={pillar.id}
              onClick={() => setActiveTab(pillar.id)}
              className={`p-6 rounded-xl border text-left transition-all ${
                isActive 
                  ? `bg-slate-800 border-slate-600 shadow-lg` 
                  : 'bg-slate-900/50 border-slate-800 hover:bg-slate-800/80'
              }`}
            >
              <div className={`p-3 rounded-lg inline-block mb-4 ${pillar.bgColor}`}>
                <Icon className={pillar.color} size={24} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">{pillar.name}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{pillar.desc}</p>
            </button>
          );
        })}
      </div>

      <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <Search className="text-slate-400" size={20} />
          <h3 className="text-lg font-semibold text-slate-200">
            Minh họa {pillars.find(p => p.id === activeTab)?.name}
          </h3>
        </div>
        
        {activeTab === 'metrics' && renderMetrics()}
        {activeTab === 'logs' && renderLogs()}
        {activeTab === 'traces' && renderTraces()}
      </div>

      <div className="bg-fuchsia-500/10 border border-fuchsia-500/20 rounded-xl p-6">
        <h4 className="text-fuchsia-400 font-semibold mb-2 flex items-center gap-2">
          <AlertCircle size={18} />
          Quy trình Debug thực tế
        </h4>
        <div className="flex flex-col md:flex-row gap-4 mt-4 text-sm text-slate-300 items-start md:items-center">
          <div className="flex-1 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <div className="text-blue-400 font-bold mb-1">1. Metrics</div>
            Cảnh báo (Alert) báo: Error Rate tăng đột biến lên 2.4%.
          </div>
          <span className="hidden md:block text-slate-600">→</span>
          <div className="flex-1 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <div className="text-emerald-400 font-bold mb-1">2. Traces</div>
            Nhìn vào Trace thấy Payment Service mất 3 giây (Timeout).
          </div>
          <span className="hidden md:block text-slate-600">→</span>
          <div className="flex-1 bg-slate-900/50 p-4 rounded-lg border border-slate-800">
            <div className="text-amber-400 font-bold mb-1">3. Logs</div>
            Mở Logs của Payment Service thấy: "Connection timeout to Stripe API".
          </div>
        </div>
      </div>
    </div>
  );
};

export default ObservabilityDemo;
