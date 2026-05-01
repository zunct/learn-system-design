# Lộ trình học System Design (Thiết kế hệ thống)

Chào mừng bạn đến với hành trình học System Design! Đây là một kỹ năng cực kỳ quan trọng đối với Software Engineer, đặc biệt là ở level Senior trở lên.

Dưới đây là lộ trình từng bước để chinh phục System Design.

## 1. Kiến thức nền tảng (Prerequisites)
Trước khi thiết kế các hệ thống lớn, bạn cần nắm vững cách các thành phần cơ bản hoạt động.
- **Mạng (Networking):** TCP/UDP, HTTP/HTTPS, DNS, WebSockets.
- **Hệ điều hành (OS):** Processes vs Threads, Concurrency, Memory management.
- **Cơ sở dữ liệu cơ bản:** SQL (Relational) vs NoSQL (Document, Key-Value, Graph, Column-family), ACID properties.

## 2. Các khái niệm cốt lõi (Core Concepts)
Đây là những "viên gạch" để xây dựng hệ thống scale lớn.
- **Định lý CAP (CAP Theorem):** Consistency, Availability, Partition Tolerance.
- **Load Balancing (Cân bằng tải):** L4 vs L7 Load balancer, các thuật toán (Round Robin, Least Connections, v.v.).
- **Caching (Bộ nhớ đệm):** Các chiến lược (Cache-aside, Write-through, Write-behind), Redis, Memcached, CDN.
- **Database Scaling (Mở rộng CSDL):** Replication (Master-Slave, Master-Master), Sharding/Partitioning, Indexing.
- **Message Queues & Pub/Sub:** Kafka, RabbitMQ, SQS - Giúp hệ thống xử lý bất đồng bộ (Asynchronous) và Decoupling.
- **Kiến trúc (Architecture):** Monolith vs Microservices, Event-driven architecture.
- **Đồng thuận (Consensus):** Raft, Paxos, Quorum (dành cho hệ thống phân tán).
- **Rate Limiting:** Token bucket, Leaking bucket.

## 3. Framework giải quyết bài toán System Design (Khi phỏng vấn hoặc thiết kế thực tế)
Một cấu trúc chuẩn thường có 4 bước:
1. **Hiểu yêu cầu (Understand the goal & constraints):** Hỏi rõ Functional Requirements (Hệ thống làm gì?) và Non-Functional Requirements (Latency, Availability, Scale).
2. **Tính toán ước lượng (Back-of-the-envelope estimation):** Ước lượng Traffic (QPS), Storage, Bandwidth.
3. **Thiết kế High-Level (High-Level Design):** Vẽ các thành phần chính (Client -> Load Balancer -> API Gateway -> Services -> Database).
4. **Thiết kế chi tiết (Deep Dive):** Đi sâu vào các vấn đề thắt cổ chai (bottlenecks), tối ưu hóa database, caching, single point of failure (SPOF).

## 4. Thực hành các Case Study kinh điển
Hãy áp dụng lý thuyết vào việc thiết kế các hệ thống sau:
1. **URL Shortener** (như bit.ly) - *Bài toán về Storage và Read-heavy.*
2. **Hệ thống Chat** (Whatsapp, Messenger) - *Bài toán về WebSockets, Real-time.*
3. **News Feed/Twitter** - *Bài toán về Data modeling, Fan-out architecture.*
4. **Hệ thống Streaming** (Youtube, Netflix) - *Bài toán về xử lý Media, CDN.*
5. **Ride-sharing app** (Uber, Grab) - *Bài toán về Geo-spatial, Real-time tracking.*

## 5. Tài liệu khuyên đọc (Resources)
- **Sách:**
  - *System Design Interview – An Insider’s Guide* (Alex Xu) - Rất dễ hiểu, hình minh họa đẹp. Cực kỳ khuyến nghị!
  - *Designing Data-Intensive Applications* (Martin Kleppmann) - Cuốn sách "kinh thánh" để hiểu sâu về hệ thống phân tán và database.
- **Video/Kênh Youtube:**
  - *ByteByteGo* (Alex Xu)
  - *Hussein Nasser* (Rất hay về backend engineering & database)
  - *Gaurav Sen*

---
**Ghi chú:** Thư mục này sẽ được dùng để lưu trữ các bản thiết kế, note học tập, và mã nguồn (nếu có) trong quá trình bạn tìm hiểu về System Design.
