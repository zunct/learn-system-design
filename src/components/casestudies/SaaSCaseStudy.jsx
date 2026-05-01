import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Users, Database, Shield, CreditCard, Globe, Server, Layers, CheckCircle2, Terminal, Code } from 'lucide-react';

const SaaSCaseStudy = () => {
  const [activeIsolation, setActiveIsolation] = useState('shared');

  const isolationModels = {
    isolated: {
      name: 'Database-per-Tenant',
      icon: Database,
      description: 'Mỗi khách hàng (tenant) có một database riêng biệt hoàn toàn.',
      pros: ['Bảo mật dữ liệu tuyệt đối', 'Dễ backup/restore cho từng khách hàng', 'Không bị ảnh hưởng bởi truy vấn nặng của khách hàng khác (Noisy Neighbor)'],
      cons: ['Chi phí cơ sở hạ tầng cao', 'Khó khăn khi cập nhật schema cho hàng nghìn DB', 'Tốn nhiều tài nguyên quản lý'],
      color: 'text-rose-400',
      bgColor: 'bg-rose-500/10',
      borderColor: 'border-rose-500/30'
    },
    schema: {
      name: 'Schema-per-Tenant',
      icon: Layers,
      description: 'Dùng chung Database Instance, nhưng mỗi khách hàng có Schema (tables) riêng.',
      pros: ['Cân bằng tốt giữa chi phí và bảo mật', 'Giảm số lượng kết nối DB', 'Phân tách dữ liệu logic rõ ràng'],
      cons: ['Vẫn khó khăn khi cập nhật schema', 'Dễ bị ảnh hưởng nếu DB Server quá tải', 'Khôi phục dữ liệu một khách hàng khó hơn'],
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10',
      borderColor: 'border-amber-500/30'
    },
    shared: {
      name: 'Shared Database (Row-level)',
      icon: Users,
      description: 'Tất cả khách hàng dùng chung Database và Bảng, phân biệt bằng tenant_id.',
      pros: ['Chi phí vận hành thấp nhất', 'Dễ dàng mở rộng và bảo trì schema', 'Tối ưu tài nguyên server'],
      cons: ['Nguy cơ rò rỉ dữ liệu cao nếu dev code sai', 'Vấn đề "Noisy Neighbor" nghiêm trọng', 'Khó backup/restore cho một khách hàng cụ thể'],
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10',
      borderColor: 'border-emerald-500/30'
    }
  };

  return (
    <div className="space-y-8 pb-10">
      {/* Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-indigo-500/20 rounded-lg">
            <Building2 className="text-indigo-400" size={24} />
          </div>
          <h1 className="text-3xl font-bold text-slate-100">Hệ thống SaaS (Software as a Service)</h1>
        </div>
        <p className="text-slate-400 text-lg mt-4 max-w-3xl">
          Thiết kế kiến trúc cho các nền tảng B2B SaaS (như Slack, Salesforce, Notion). Trọng tâm giải quyết bài toán Multi-tenancy (Đa khách hàng), Phân quyền, và Quản lý gói cước (Billing).
        </p>
      </div>

      {/* Core Challenges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Users className="text-blue-400" size={20} />
            <h3 className="font-semibold text-slate-200">Multi-tenancy</h3>
          </div>
          <p className="text-sm text-slate-400">
            Làm sao để phục vụ nhiều doanh nghiệp (tenant) trên cùng một hệ thống mà vẫn đảm bảo dữ liệu không bị rò rỉ chéo.
          </p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <CreditCard className="text-emerald-400" size={20} />
            <h3 className="font-semibold text-slate-200">Billing & Quotas</h3>
          </div>
          <p className="text-sm text-slate-400">
            Tính phí theo các gói (Free, Pro, Enterprise). Quản lý giới hạn API (Rate limit) dựa trên gói cước của khách hàng.
          </p>
        </div>
        <div className="bg-slate-900/50 border border-slate-800 p-5 rounded-xl">
          <div className="flex items-center gap-2 mb-3">
            <Globe className="text-purple-400" size={20} />
            <h3 className="font-semibold text-slate-200">Custom Domains</h3>
          </div>
          <p className="text-sm text-slate-400">
            Cho phép khách hàng dùng tên miền riêng (ví dụ: công-ty.saas.com hoặc domain.com). Yêu cầu cấp phát SSL tự động.
          </p>
        </div>
      </div>

      {/* Multi-tenancy Isolation Models */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
          <Database className="text-indigo-400" />
          Các mô hình Multi-tenancy (Cô lập dữ liệu)
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Tabs/Selector */}
          <div className="flex flex-col gap-3">
            {Object.entries(isolationModels).map(([key, model]) => {
              const Icon = model.icon;
              return (
                <button
                  key={key}
                  onClick={() => setActiveIsolation(key)}
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all ${
                    activeIsolation === key
                      ? `bg-slate-800 ${model.borderColor}`
                      : 'bg-slate-900/50 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <Icon className={activeIsolation === key ? model.color : 'text-slate-500'} size={24} />
                  <div>
                    <div className={`font-medium ${activeIsolation === key ? 'text-slate-200' : 'text-slate-400'}`}>
                      {model.name}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Details */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIsolation}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className={`p-6 rounded-xl border ${isolationModels[activeIsolation].bgColor} ${isolationModels[activeIsolation].borderColor}`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <h3 className={`text-xl font-bold ${isolationModels[activeIsolation].color}`}>
                    {isolationModels[activeIsolation].name}
                  </h3>
                </div>
                
                <p className="text-slate-300 mb-6 leading-relaxed">
                  {isolationModels[activeIsolation].description}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <h4 className="text-sm font-semibold text-emerald-400 mb-3 flex items-center gap-2">
                      <CheckCircle2 size={16} /> Ưu điểm
                    </h4>
                    <ul className="space-y-2">
                      {isolationModels[activeIsolation].pros.map((pro, idx) => (
                        <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-emerald-500 mt-1">•</span> {pro}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-rose-400 mb-3 flex items-center gap-2">
                      <Shield size={16} /> Nhược điểm
                    </h4>
                    <ul className="space-y-2">
                      {isolationModels[activeIsolation].cons.map((con, idx) => (
                        <li key={idx} className="text-sm text-slate-300 flex items-start gap-2">
                          <span className="text-rose-500 mt-1">•</span> {con}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* SaaS Architecture Diagram */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
          <Server className="text-indigo-400" />
          Kiến trúc SaaS Tiêu chuẩn
        </h2>

        <div className="bg-slate-950 rounded-xl border border-slate-800 p-6 font-mono text-sm overflow-x-auto">
          <pre className="text-slate-300 leading-relaxed min-w-[600px]">
{`[Client] (Web/Mobile)
   │
   ▼
[Cloudflare/CDN] ── (Custom Domain Routing, SSL Termination, WAF)
   │
   ▼
[API Gateway] ── (Rate Limiting per Tenant, Auth Verification)
   │
   ├──▶ [Identity Service] (SSO, JWT Auth, OAuth, RBAC)
   │
   ├──▶ [Billing Service] (Stripe Webhooks, Subscription Sync)
   │
   ├──▶ [Core Application Services] ── (Business Logic)
   │
   ▼
[Data Layer]
   ├── [Redis] (Caching, Rate Limit Counters, Session)
   ├── [PostgreSQL] (Tenant Data - Shared or Isolated)
   └── [ElasticSearch] (Full-text Search, Tenant-scoped indexing)`}
          </pre>
        </div>
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-slate-800/30 p-4 rounded-lg">
            <h4 className="text-indigo-400 font-semibold mb-2">Quản lý Định danh (Identity)</h4>
            <p className="text-sm text-slate-400">
              Cần phân biệt User Auth (Login/Password) và Tenant Context. Một user có thể thuộc nhiều tổ chức (tenant) khác nhau. OAuth2/SAML thường được hỗ trợ cho Enterprise.
            </p>
          </div>
          <div className="bg-slate-800/30 p-4 rounded-lg">
            <h4 className="text-indigo-400 font-semibold mb-2">Bảo mật (Security)</h4>
            <p className="text-sm text-slate-400">
              Áp dụng RLS (Row-Level Security) ở mức Database nếu dùng chung DB để đảm bảo ứng dụng không vô tình lấy nhầm dữ liệu của khách hàng khác.
            </p>
          </div>
        </div>
      </div>
      {/* Đi sâu vào Kỹ thuật (Tech Details) */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
        <h2 className="text-xl font-bold text-slate-200 mb-6 flex items-center gap-2">
          <Terminal className="text-indigo-400" />
          Đi sâu vào Kỹ thuật (Tech Details)
        </h2>

        <div className="space-y-6">
          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Database size={16} className="text-blue-400" /> 1. Row-Level Security (RLS) trong PostgreSQL
              </span>
              <span className="text-xs text-slate-500 font-mono">SQL</span>
            </div>
            <div className="p-4 bg-[#0d1117] overflow-x-auto">
<pre className="text-sm font-mono leading-relaxed">
<span className="text-slate-500">{"-- Bật RLS cho bảng users"}</span>
<span className="text-pink-400">ALTER TABLE</span> <span className="text-blue-300">users</span> <span className="text-pink-400">ENABLE ROW LEVEL SECURITY</span>;

<span className="text-slate-500">{"-- Tạo chính sách: user chỉ được xem dữ liệu cùng tenant_id"}</span>
<span className="text-pink-400">CREATE POLICY</span> <span className="text-green-300">tenant_isolation_policy</span> <span className="text-pink-400">ON</span> <span className="text-blue-300">users</span>
<span className="text-pink-400">USING</span> (<span className="text-orange-300">tenant_id</span> = <span className="text-blue-400">current_setting</span>(<span className="text-green-300">'app.current_tenant_id'</span>)::uuid);

<span className="text-slate-500">{"-- Ở Backend (VD: Node.js), trước khi query, ta set biến môi trường này:"}</span>
<span className="text-slate-500">{"-- await db.query(\"SET LOCAL app.current_tenant_id = '\" + tenantId + \"'\");"}</span>
<span className="text-slate-500">{"-- await db.query(\"SELECT * FROM users\"); // Tự động chỉ lấy user của tenant đó"}</span>
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400">
              <strong className="text-blue-400">Tại sao dùng RLS?</strong> Nếu dùng Shared Database (chung bảng), Lập trình viên có thể vô tình quên thêm <code>WHERE tenant_id = ?</code> trong một query phức tạp, dẫn đến lộ dữ liệu chéo giữa các khách hàng (hiển thị đơn hàng của cty A cho cty B). RLS đẩy việc kiểm tra này xuống tầng Database, đảm bảo an toàn tuyệt đối dù code có sai sót.
            </div>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center justify-between bg-slate-900">
              <span className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Code size={16} className="text-emerald-400" /> 2. Rate Limiting phân cấp theo gói cước (Redis)
              </span>
              <span className="text-xs text-slate-500 font-mono">Redis Lua Script</span>
            </div>
            <div className="p-4 bg-[#0d1117] overflow-x-auto">
<pre className="text-sm font-mono leading-relaxed">
<span className="text-slate-500">{"// Lấy thông tin gói cước của Tenant (Free: 100 req/min, Pro: 1000 req/min)"}</span>
<span className="text-pink-400">const</span> limit = tenant.plan === <span className="text-green-300">'Pro'</span> ? <span className="text-orange-300">1000</span> : <span className="text-orange-300">100</span>;
<span className="text-pink-400">const</span> key = <span className="text-green-300">`rate_limit:<span className="text-blue-300">${'{tenant.id}'}</span>:<span className="text-blue-300">${'{currentMinute}'}</span>`</span>;

<span className="text-slate-500">{"// Dùng Redis INCR để đếm số request"}</span>
<span className="text-pink-400">const</span> currentReqs = <span className="text-pink-400">await</span> redis.<span className="text-blue-400">incr</span>(key);

<span className="text-pink-400">if</span> (currentReqs === <span className="text-orange-300">1</span>) {'{'}
  <span className="text-slate-500">{"// Nếu là request đầu tiên trong phút, set thời gian hết hạn (TTL) là 60s"}</span>
  <span className="text-pink-400">await</span> redis.<span className="text-blue-400">expire</span>(key, <span className="text-orange-300">60</span>);
{'}'}

<span className="text-pink-400">if</span> (currentReqs &gt; limit) {'{'}
  <span className="text-pink-400">throw new</span> <span className="text-blue-300">Error</span>(<span className="text-green-300">"429: Too Many Requests. Please upgrade your plan."</span>);
{'}'}
</pre>
            </div>
            <div className="p-4 bg-slate-900 border-t border-slate-800 text-sm text-slate-400">
              <strong className="text-emerald-400">Bảo vệ tài nguyên:</strong> Kiến trúc SaaS rất dễ bị ảnh hưởng bởi một khách hàng cá biệt (Noisy Neighbor). Việc giới hạn Rate Limit cực kỳ nghiêm ngặt tại API Gateway dựa trên gói cước là bắt buộc để đảm bảo hệ thống ổn định cho tất cả mọi người.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default SaaSCaseStudy;
