# ARCHITECTURE & AI AGENT GUIDELINES

Tài liệu này đóng vai trò như một bản thiết kế (blueprint) và chỉ dẫn (guidelines) dành cho các AI Coding Agents khi tham gia bảo trì, nâng cấp và mở rộng dự án `learn-system-design`.

## 1. Công nghệ cốt lõi (Tech Stack)
- **Framework:** React 18 (Vite)
- **Styling:** Tailwind CSS v4 (Chỉ hỗ trợ giao diện Dark Mode)
- **Animations:** Framer Motion
- **Icons:** Lucide React

## 2. Cấu trúc thư mục (Directory Structure)
```
src/
├── App.jsx                        # Entry point, quản lý State Routing (activeTab)
├── index.css                      # Global CSS, cài đặt Tailwind và custom utilities (cyberpunk scrollbar)
├── components/
│   ├── layout/
│   │   └── Sidebar.jsx            # Menu bên trái, điều hướng giữa các màn hình
│   ├── ui/
│   │   └── GlowingCard.jsx        # UI Component tái sử dụng (Thẻ có hiệu ứng phát sáng)
│   ├── casestudies/               # Bài tập thực hành, case study thực tế (e.g., UrlShortener)
│   └── (Main Screens)             # Các trang nội dung bài học (CapTheorem.jsx, CachingDemo.jsx...)
```

## 3. Kiến trúc luồng chạy (Routing Architecture)
Dự án **KHÔNG** sử dụng `react-router-dom`. Thay vào đó, dự án áp dụng **State-based Routing** để chuyển cảnh mượt mà với `framer-motion`:
- Trong `App.jsx`, biến `activeTab` lưu trữ ID của trang hiện tại.
- Hàm `renderContent()` sẽ render Component tương ứng với `activeTab`.
- Việc chuyển đổi giữa các màn hình được bọc trong `<AnimatePresence mode="wait">` để tạo hiệu ứng mờ dần (fade-in/fade-out).

## 4. UI/UX Guidelines (Quy tắc thiết kế giao diện)
- **Chủ đề (Theme):** Dark Mode hoàn toàn. Nền sử dụng `bg-slate-950`.
- **Màu sắc nhấn (Accents):** 
  - Sử dụng các gradient rực rỡ để tạo cảm giác công nghệ cao (Cyberpunk/Glassmorphism).
  - Các màu phổ biến: `indigo-500`, `fuchsia-500`, `emerald-500`, `amber-500`, `teal-500`.
- **Hiệu ứng văn bản:** Các tiêu đề chính thường dùng `text-transparent bg-clip-text bg-gradient-to-r...`
- **Chuyển động (Animations):** Luôn import `motion` từ `framer-motion` cho các tương tác. Khung chứa danh sách nên có `staggerChildren`. Các thành phần xuất hiện cần có hiệu ứng mượt (`opacity: 0, y: 20` -> `opacity: 1, y: 0`).
- **Ngôn ngữ:** Tiếng Việt chuẩn mực kỹ thuật phần mềm, kèm theo keyword tiếng Anh chuyên ngành trong ngoặc đơn. 
  - Ví dụ: Cân bằng tải (Load Balancer), Bộ nhớ đệm (Cache), Tính khả dụng (Availability).

## 5. Quy trình thêm màn hình/bài học mới (Hướng dẫn cho AI)
Mỗi khi USER yêu cầu "Thêm một bài học mới" hoặc "Thêm case study", AI Agent cần tuân thủ 3 bước sau:

1. **Tạo Component Mới:**
   - Tạo file `.jsx` trong `src/components/` (nếu là lý thuyết) hoặc `src/components/casestudies/` (nếu là bài tập).
   - Đảm bảo có sử dụng `GlowingCard` và `motion` để giữ sự đồng nhất về UX.

2. **Cập nhật `App.jsx`:**
   - Import Component mới vừa tạo.
   - Bổ sung một `case` mới vào câu lệnh `switch (activeTab)` trong hàm `renderContent()`.

3. **Cập nhật `Sidebar.jsx`:**
   - Chọn một icon phù hợp từ `lucide-react`.
   - Thêm một Object vào mảng `menuItems`. Chú ý đặt `id` khớp với `case` đã khai báo trong `App.jsx`. Chọn `section` phù hợp (như 'Khái niệm cốt lõi', 'Case Studies').

## 6. Software Architecture Rules (Clean Code)
- **Library-first:** Nếu cần xử lý phức tạp (như biểu đồ, đồ thị), hãy tìm kiếm thư viện thay vì tự chế (NIH Syndrome).
- **Tách biệt logic (Separation of Concerns):** Không nhét logic tính toán quá dài vào file giao diện. Nếu file > 200 dòng, hãy cân nhắc tách thành các Component nhỏ hơn nằm trong thư mục `ui/`.
- **Tránh tên chung chung:** Không tạo các file `utils.jsx` hay `helpers.jsx`. Hãy đặt tên có tính ngữ cảnh rõ ràng (VD: `ScaleCalculator.js`).

## 7. Các Thành Phần/Bài Học Hiện Có (Current Features Map)
Đây là danh sách các màn hình đã được hiện thực hoá để các Agent dễ dàng nắm bắt ngữ cảnh, tránh code trùng lặp:

### Chương 1: Nhập môn
- **`Introduction.jsx` (id: `intro`)**: Trang tổng quan, giới thiệu System Design là gì, tại sao phải học, và phân tích các Building Blocks cơ bản (Load Balancer, Cache, MQ...). Kèm Framework 4 bước để thiết kế hệ thống.
- **`NetworkApis.jsx` (id: `network`)**: Giao tiếp & APIs

### Chương 2: Tăng tốc & Chịu tải
- **`LoadBalancerDemo.jsx` (id: `lb`)**: Phân tích cơ chế của Cân bằng tải (Layer 4 vs Layer 7), các thuật toán (Round Robin, Least Connections) và minh hoạ tương tác.
- **`CdnDemo.jsx` (id: `cdn`)**: Mạng lưới CDN
- **`CachingDemo.jsx` (id: `cache`)**: Các chiến lược lưu trữ đệm (Cache Aside, Read Through, Write Through, Write Behind) và chiến lược loại bỏ (LRU, LFU).

### Chương 3: Quản trị Dữ liệu
- **`CapTheorem.jsx` (id: `cap`)**: Trình bày Định lý CAP (Consistency, Availability, Partition Tolerance), giải thích vì sao chỉ chọn được 2 trong 3 và ví dụ thực tế của các DB (MongoDB: CP, Cassandra: AP, RDBMS: CA).
- **`DatabaseTypes.jsx` (id: `db-types`)**: Chọn Database nào?
- **`DatabaseScaling.jsx` (id: `db`)**: Các phương pháp mở rộng CSDL như Replication (Master-Slave), Sharding, Partitioning và ưu nhược điểm.

### Chương 4: Kiến trúc tổng thể
- **`MessageQueueDemo.jsx` (id: `mq`)**: Lý thuyết về xử lý bất đồng bộ, Pub/Sub, Kafka vs RabbitMQ, và cơ chế Decoupling (tách rời dịch vụ).
- **`SoftwareArchitecture.jsx` (id: `arch`)**: Giải thích về Clean Architecture, Domain-Driven Design (DDD), nguyên tắc tách biệt Bounded Context, và Anti-patterns (hội chứng NIH, God Object).
- **`MicroservicesPatterns.jsx` (id: `microservices`)**: Microservices Patterns

### Chương 5: Vận hành Hệ thống
- **`ObservabilityDemo.jsx` (id: `observability`)**: Log, Metric & Trace
- **`RateLimitingDemo.jsx` (id: `rate-limit`)**: Rate Limiting
- **`DistributedAlgorithms.jsx` (id: `dist-algo`)**: Thuật toán Phân tán

### Chương 6: Case Studies
- **`UrlShortenerCaseStudy.jsx` (id: `url-shortener`)**: Bài toán thực tế thiết kế TinyURL. Bao gồm việc ước lượng tài nguyên (Capacity Planning), Database Schema, và thuật toán tạo Hash (Base62 vs MD5).
- **`ChatAppCaseStudy.jsx` (id: `chat-app`)**: Hệ thống Chat (Zalo)
- **`VideoStreamingCaseStudy.jsx` (id: `video-streaming`)**: Video Streaming (Netflix)
- **`SaaSCaseStudy.jsx` (id: `saas-system`)**: Hệ thống SaaS (B2B)
- **`TicketBookingCaseStudy.jsx` (id: `ticket-booking`)**: Flash Sale / Booking
- **`LocationBasedCaseStudy.jsx` (id: `location-based`)**: Tìm kiếm Vị trí (Grab)
- **`NewsFeedCaseStudy.jsx` (id: `news-feed`)**: News Feed (Facebook)
- **`NotificationCaseStudy.jsx` (id: `notification`)**: Hệ thống Thông Báo
- **`IdGeneratorCaseStudy.jsx` (id: `id-generator`)**: ID Phân tán (Snowflake)
- **`SearchEngineCaseStudy.jsx` (id: `search-engine`)**: Search Engine (Elastic)

*(Ghi chú: Khi tạo thêm bài học mới, hãy cập nhật danh sách này để các Agent đời sau có cái nhìn tổng quan nhất).*
