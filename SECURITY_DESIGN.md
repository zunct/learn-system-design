# Security & Identity Module - Design Specification

## 1. Understanding Summary
- **Sản phẩm:** 3 màn hình mới phục vụ việc học System Design (Xác thực/Phân quyền, Bảo mật Hạ tầng, Thiết kế SSO).
- **Mục đích:** Bổ sung mảng kiến thức Bảo mật (Security) vốn đang thiếu trong giáo trình hiện tại.
- **Đối tượng:** Sinh viên/Lập trình viên muốn học cách thiết kế hệ thống bảo mật, chống tấn công và quản lý user.
- **Giới hạn (Constraints):** Sử dụng React 18, Tailwind CSS v4 (Dark Mode), và Framer Motion. Không thay đổi kiến trúc routing hiện tại.
- **Non-goals:** Không code backend thực tế (ví dụ: Node.js/Python server) mà chỉ mô phỏng (simulate) ở phía Frontend.

## 2. Assumptions (Các giả định)
- Các bài học mới sẽ được xếp vào một chương mới: **"Chương 5: Bảo mật & Định danh"**.
- Các chương cũ (Vận hành Hệ thống, Case Studies) sẽ lần lượt dời xuống thành Chương 6 và Chương 7.
- Case Study thiết kế hệ thống Identity Provider (SSO) sẽ nằm trong phần Case Studies (Chương 7).

## 3. Decision Log
| Quyết định | Các lựa chọn đã xem xét | Lý do chọn |
| :--- | :--- | :--- |
| **Phân chia nội dung** | (A) Gộp chung 1 bài dài; (B) Chia bài nhỏ; (C) Chỉ làm Case Study; **(D) Kết hợp Lý thuyết & Case Study** | Lựa chọn D giúp học viên vừa có nền tảng vững chắc (các khái niệm rời rạc), vừa biết cách ráp chúng lại trong một hệ thống thực tế (SSO). |
| **Hướng tiếp cận UI** | **(1) Framer Motion (Tương tác động)**; (2) UI tĩnh đọc text; (3) Form giả lập thật (Simulator) | Lựa chọn 1 mang lại trải nghiệm hình ảnh tuyệt vời, dễ hiểu luồng dữ liệu (OAuth, DDoS) mà không khiến code trở nên quá phức tạp (Over-engineering) như lựa chọn 3. |

## 4. Final Design (Thiết kế chi tiết)

### 4.1. Cấu trúc Routing & Sidebar
- **Sửa file:** `src/App.jsx`, `src/components/layout/Sidebar.jsx`
- **Mục mới trong Sidebar:**
  - `auth-sec` (Xác thực & Phân quyền) - Thuộc Chương 5
  - `net-sec` (Bảo mật Hạ tầng) - Thuộc Chương 5
  - `sso-case` (SSO Identity Provider) - Thuộc Chương 7

### 4.2. AuthSecurity.jsx (Xác thực & Phân quyền)
- **Kiến thức trọng tâm:** AuthN vs AuthZ, Token-based (JWT) vs Session-based.
- **Framer Motion Component:** Sơ đồ "OAuth 2.0 Authorization Code Flow". 
  - Người dùng ấn nút "Next Step".
  - Một `motion.div` đại diện cho Request chạy từ `Client` -> `Auth Server` -> `Resource Server`.
  - Có các thẻ Tooltip hiện lên giải thích: "Access Token", "Refresh Token", "Authorization Code".

### 4.3. NetworkSecurity.jsx (Bảo mật Hạ tầng)
- **Kiến thức trọng tâm:** Defense in Depth, HTTPS/TLS, WAF, Rate Limiting, DDoS Mitigation.
- **Framer Motion Component:** Sơ đồ "DDoS Defense".
  - Từ bên ngoài, hàng loạt các chấm tròn đỏ (Malicious Traffic) và xanh (Legitimate Traffic) bay vào hệ thống.
  - Vượt qua `Rate Limiter`: Các chấm đỏ bay quá nhanh bị rớt (drop).
  - Vượt qua `WAF`: Các chấm đỏ chứa Payload độc hại bị chặn (Block).
  - Chỉ các chấm xanh đến được `Backend Server`.

### 4.4. SsoCaseStudy.jsx (Thiết kế hệ thống SSO)
- **Kiến thức trọng tâm:** Tại sao cần Centralized Identity? SAML vs OIDC, cơ chế Single Sign-On.
- **Framer Motion Component:** Sơ đồ "SSO Architecture".
  - Giao diện có 3 App giả lập (Service A, Service B, Service C).
  - Khi User login vào Service A, họ bị redirect về `SSO Server` (cấp Token).
  - Khi chuyển qua Service B, mũi tên check Session tại SSO Server sẽ báo "Đã đăng nhập" và lập tức cho vào mà không cần hỏi lại password.

---
*(Tài liệu này được tạo ra từ quá trình Brainstorming để đảm bảo sự thống nhất trước khi code).*
