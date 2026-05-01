import React from 'react';
import GlowingCard from './ui/GlowingCard';
import { LayoutTemplate, Layers, Component, ShieldAlert, CheckCircle2, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SoftwareArchitecture = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="space-y-10 pb-10">
      <div>
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium mb-4">
          <LayoutTemplate size={16} />
          <span>Kiến trúc phần mềm</span>
        </div>
        <h1 className="text-4xl font-black mb-4 text-white">Kiến trúc & <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-500">Design Patterns</span></h1>
        <p className="text-xl text-slate-400 max-w-3xl leading-relaxed">
          Xây dựng phần mềm tốt không chỉ là việc code sao cho chạy được, mà là thiết kế sao cho dễ bảo trì (maintainable), dễ mở rộng (scalable) và ít nợ kỹ thuật (technical debt).
        </p>
      </div>

      {/* Clean Architecture Section */}
      <GlowingCard delay={0.1} className="border-emerald-500/20">
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-emerald-500/10 rounded-lg text-emerald-400 mt-1">
            <Layers size={24} />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Clean Architecture (Kiến trúc Sạch)</h2>
            <p className="text-slate-300 text-sm leading-relaxed">
              Theo tư tưởng của Robert C. Martin (Uncle Bob), Clean Architecture tập trung vào việc tách biệt các mối quan tâm (Separation of Concerns). Code chứa "Luật nghiệp vụ" (Business Logic) không được phụ thuộc vào Framework, Database hay UI.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-slate-900/50 p-4 rounded-xl border border-yellow-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10"><Layers size={40} /></div>
            <h3 className="text-yellow-400 font-bold mb-2">1. Entities</h3>
            <p className="text-slate-400 text-xs">Luật nghiệp vụ cốt lõi của toàn hệ thống (Enterprise business rules). Ít bị thay đổi nhất.</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-rose-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10"><Component size={40} /></div>
            <h3 className="text-rose-400 font-bold mb-2">2. Use Cases</h3>
            <p className="text-slate-400 text-xs">Luật nghiệp vụ đặc thù của ứng dụng. Điều phối luồng dữ liệu đến và đi từ các Entities.</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-emerald-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10"><ShieldAlert size={40} /></div>
            <h3 className="text-emerald-400 font-bold mb-2">3. Controllers</h3>
            <p className="text-slate-400 text-xs">Chuyển đổi dữ liệu từ định dạng tiện lợi cho Use Case sang định dạng tiện lợi cho Framework (Web/DB).</p>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-blue-500/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-2 opacity-10"><LayoutTemplate size={40} /></div>
            <h3 className="text-blue-400 font-bold mb-2">4. Frameworks</h3>
            <p className="text-slate-400 text-xs">Tầng ngoài cùng: DB, Web Framework, UI. Tất cả chỉ là chi tiết (Details) có thể thay thế được.</p>
          </div>
        </div>
      </GlowingCard>

      {/* SOLID Principles */}
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Layers className="text-indigo-500" />
          Nguyên tắc SOLID
        </h2>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-indigo-500/20 p-4 rounded-xl hover:border-indigo-500/50 transition-colors">
            <div className="text-3xl font-black text-indigo-500 mb-2">S</div>
            <h3 className="text-white font-bold text-sm mb-2">Single Responsibility</h3>
            <p className="text-slate-400 text-xs">Mỗi class/module chỉ nên có ĐÚNG MỘT lý do để thay đổi (chỉ đảm nhiệm một trách nhiệm duy nhất).</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-indigo-500/20 p-4 rounded-xl hover:border-indigo-500/50 transition-colors">
            <div className="text-3xl font-black text-indigo-500 mb-2">O</div>
            <h3 className="text-white font-bold text-sm mb-2">Open/Closed</h3>
            <p className="text-slate-400 text-xs">Phần mềm nên được MỞ để mở rộng (thêm tính năng mới), nhưng ĐÓNG với việc sửa đổi (không sửa code cũ đang chạy tốt).</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-indigo-500/20 p-4 rounded-xl hover:border-indigo-500/50 transition-colors">
            <div className="text-3xl font-black text-indigo-500 mb-2">L</div>
            <h3 className="text-white font-bold text-sm mb-2">Liskov Substitution</h3>
            <p className="text-slate-400 text-xs">Class con phải có khả năng thay thế hoàn toàn class cha mà không làm hỏng tính đúng đắn của chương trình.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-indigo-500/20 p-4 rounded-xl hover:border-indigo-500/50 transition-colors">
            <div className="text-3xl font-black text-indigo-500 mb-2">I</div>
            <h3 className="text-white font-bold text-sm mb-2">Interface Segregation</h3>
            <p className="text-slate-400 text-xs">Nhiều interface nhỏ, đặc thù (chuyên biệt) sẽ tốt hơn một interface lớn ôm đồm tất cả mọi thứ.</p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-indigo-500/20 p-4 rounded-xl hover:border-indigo-500/50 transition-colors">
            <div className="text-3xl font-black text-indigo-500 mb-2">D</div>
            <h3 className="text-white font-bold text-sm mb-2">Dependency Inversion</h3>
            <p className="text-slate-400 text-xs">Module cấp cao không nên phụ thuộc vào module cấp thấp. Cả hai nên phụ thuộc vào Abstraction (Interface).</p>
          </motion.div>
        </motion.div>
      </div>

      {/* Domain Driven Design */}
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Component className="text-teal-500" />
          Domain-Driven Design (DDD)
        </h2>
        <motion.div variants={containerVariants} initial="hidden" animate="show" className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-teal-400 font-bold text-lg mb-3">Ubiquitous Language</h3>
            <p className="text-slate-400 text-sm">
              Ngôn ngữ chung giữa đội ngũ Dev và Business (Domain Experts). Code phải dùng thuật ngữ của ngành nghiệp vụ. Không dùng tên chung chung như <code className="text-rose-400 bg-rose-400/10 px-1 rounded">utils</code>, <code className="text-rose-400 bg-rose-400/10 px-1 rounded">helpers</code>. <br/><br/>
              ✅ Tốt: <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">OrderCalculator</code>, <code className="text-emerald-400 bg-emerald-400/10 px-1 rounded">InvoiceGenerator</code>.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-teal-400 font-bold text-lg mb-3">Bounded Context</h3>
            <p className="text-slate-400 text-sm">
              Ranh giới rõ ràng cho một mô hình nghiệp vụ (Domain Model). Ví dụ: "Product" trong context <em>Bán Hàng</em> có ý nghĩa và thuộc tính khác hoàn toàn với "Product" trong context <em>Vận Chuyển</em>. Giữ các context độc lập giúp code không bị rối rắm.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-teal-400 font-bold text-lg mb-3">Aggregates & Root</h3>
            <p className="text-slate-400 text-sm">
              Nhóm các Entities và Value Objects liên quan chặt chẽ với nhau (VD: Order và OrderItem). Mọi tương tác cập nhật dữ liệu phải đi qua <strong>Aggregate Root</strong> (ví dụ Order) để đảm bảo tính toàn vẹn (Consistency) của cả cụm.
            </p>
          </motion.div>
          <motion.div variants={itemVariants} className="bg-slate-900/50 border border-slate-800 p-6 rounded-xl">
            <h3 className="text-teal-400 font-bold text-lg mb-3">Value Objects</h3>
            <p className="text-slate-400 text-sm">
              Các đối tượng được định nghĩa bằng <em>thuộc tính</em> của chúng chứ không phải danh tính (ID). Chúng phải bất biến (Immutable). Ví dụ: Tiền tệ (Money), Tọa độ (Coordinates). Nếu thay đổi giá trị, ta tạo một Value Object mới.
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Hexagonal Architecture */}
      <div className="pt-4">
        <h2 className="text-2xl font-bold mb-6 text-white flex items-center gap-2">
          <Layers className="text-fuchsia-500" />
          Hexagonal Architecture (Ports & Adapters)
        </h2>
        <GlowingCard delay={0.2} className="border-fuchsia-500/20">
          <div className="flex flex-col md:flex-row gap-6 items-center">
            <div className="flex-1 space-y-4">
              <p className="text-slate-300 text-sm leading-relaxed">
                Được sáng tạo bởi Alistair Cockburn, kiến trúc Lục giác (Hexagonal) giúp ứng dụng có thể được chạy một cách độc lập với UI, Database, hay các script test. 
                Nó phân chia hệ thống thành <strong>Application Core</strong> (Logic cốt lõi) và các phần phụ thuộc bên ngoài.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
                  <h4 className="text-fuchsia-400 font-bold mb-2">Ports (Cổng)</h4>
                  <p className="text-slate-400 text-xs">Các Interface được định nghĩa bởi Application Core. <em>Inbound Port</em> nhận request từ UI. <em>Outbound Port</em> giao tiếp với DB, API ngoài.</p>
                </div>
                <div className="bg-slate-900/80 p-4 rounded-lg border border-slate-700">
                  <h4 className="text-fuchsia-400 font-bold mb-2">Adapters (Bộ chuyển đổi)</h4>
                  <p className="text-slate-400 text-xs">Implement các Ports. Một Port có thể có nhiều Adapter (VD: PostgreSQL Adapter, Mock Adapter cho Testing, Redis Adapter).</p>
                </div>
              </div>
            </div>
            <div className="w-full md:w-1/3 p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex justify-center items-center flex-col gap-2 relative">
              <div className="w-full h-10 bg-fuchsia-500/20 border border-fuchsia-500/50 rounded-lg flex items-center justify-center text-fuchsia-300 font-bold text-xs">UI / REST API (Primary Adapters)</div>
              <div className="w-4 h-4 text-slate-500 flex justify-center items-center text-xs">↓</div>
              <div className="w-full h-16 bg-emerald-500/20 border border-emerald-500/50 rounded-lg flex items-center justify-center text-emerald-400 font-bold">Application Core</div>
              <div className="w-4 h-4 text-slate-500 flex justify-center items-center text-xs">↓</div>
              <div className="w-full h-10 bg-blue-500/20 border border-blue-500/50 rounded-lg flex items-center justify-center text-blue-300 font-bold text-xs">DB / APIs (Secondary Adapters)</div>
            </div>
          </div>
        </GlowingCard>
      </div>

      {/* Best Practices vs Anti-patterns */}
      <div className="pt-4 grid grid-cols-1 lg:grid-cols-2 gap-6">
        <GlowingCard delay={0.2} className="border-emerald-500/20 bg-emerald-950/10">
          <h3 className="text-emerald-400 font-bold text-xl mb-4 flex items-center gap-2">
            <CheckCircle2 size={24} /> Best Practices (Nên làm)
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="text-emerald-400 mt-0.5">•</span>
              <div>
                <strong className="text-white block">Library-First Approach:</strong> Luôn tìm kiếm giải pháp có sẵn (npm, SaaS, APIs) trước khi tự viết code. Code tự viết là "nợ kỹ thuật" cần bảo trì.
              </div>
            </li>
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="text-emerald-400 mt-0.5">•</span>
              <div>
                <strong className="text-white block">Early Return:</strong> Thay vì lồng ghép nhiều câu lệnh if-else, hãy check điều kiện và return sớm (fail-fast) để code dễ đọc hơn.
              </div>
            </li>
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="text-emerald-400 mt-0.5">•</span>
              <div>
                <strong className="text-white block">Separation of Concerns:</strong> Tách biệt rõ ràng: Không gọi Database query trực tiếp trong Controller hay trộn lẫn logic tính toán vào UI component.
              </div>
            </li>
          </ul>
        </GlowingCard>

        <GlowingCard delay={0.3} className="border-rose-500/20 bg-rose-950/10">
          <h3 className="text-rose-400 font-bold text-xl mb-4 flex items-center gap-2">
            <XCircle size={24} /> Anti-Patterns (Tránh xa)
          </h3>
          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="text-rose-400 mt-0.5">✗</span>
              <div>
                <strong className="text-white block">Hội chứng NIH (Not Invented Here):</strong> Tự build lại các hệ thống Authentication, State Management trong khi Auth0, Supabase, Redux, Zustand đã làm rất tốt.
              </div>
            </li>
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="text-rose-400 mt-0.5">✗</span>
              <div>
                <strong className="text-white block">Bãi rác Helpers:</strong> Tạo file <code className="text-rose-400 bg-rose-400/10 px-1 rounded text-xs">utils.js</code> chứa 50 hàm thập cẩm không liên quan đến nhau. Mọi module phải có một mục đích duy nhất.
              </div>
            </li>
            <li className="flex items-start gap-3 text-slate-300 text-sm">
              <span className="text-rose-400 mt-0.5">✗</span>
              <div>
                <strong className="text-white block">God Object:</strong> Một file hoặc một hàm quá dài (&gt;200 dòng), ôm đồm quá nhiều nghiệp vụ. Hãy chia nhỏ thành các module tái sử dụng được.
              </div>
            </li>
          </ul>
        </GlowingCard>
      </div>

    </div>
  );
};

export default SoftwareArchitecture;
