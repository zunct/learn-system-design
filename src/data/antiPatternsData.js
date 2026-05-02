import {
  Database, ServerCrash, ShieldAlert, Zap, Globe, Cpu, AlertTriangle, 
  Lock, RefreshCw, Key, CloudLightning, Activity, HardDrive, Network, 
  WifiOff, Clock, ShieldOff, FileWarning, TerminalSquare, Search, 
  Settings, Mail, Users, Bell, Layers, GitBranch, Box, Hash, MessageSquare, 
  List, Link, Code, Image
} from 'lucide-react';

export const tagColors = {
  'Database':        'bg-rose-900/30 text-rose-300 border-rose-500/30',
  'Concurrency':     'bg-amber-900/30 text-amber-300 border-amber-500/30',
  'Architecture':    'bg-fuchsia-900/30 text-fuchsia-300 border-fuchsia-500/30',
  'Background Jobs': 'bg-indigo-900/30 text-indigo-300 border-indigo-500/30',
  'Performance':     'bg-sky-900/30 text-sky-300 border-sky-500/30',
  'Security':        'bg-orange-900/30 text-orange-300 border-orange-500/30',
  'Resilience':      'bg-teal-900/30 text-teal-300 border-teal-500/30',
  'Stability':       'bg-red-900/30 text-red-300 border-red-500/30',
  'DevOps':          'bg-violet-900/30 text-violet-300 border-violet-500/30',
  'Frontend':        'bg-pink-900/30 text-pink-300 border-pink-500/30'
};

export const mistakes = [
  // --- DATABASE ---
  {
    id: 'nplus1', title: 'N+1 Query Problem', tag: 'Database', color: 'rose', icon: Database,
    context: 'Lấy danh sách bài viết và tác giả của từng bài.',
    story: 'Lập trình viên lấy 100 bài viết, sau đó vòng lặp 100 lần gọi DB để lấy thông tin tác giả.',
    impact: '101 query thay vì 1 query. DB quá tải, API phản hồi chậm (hàng giây).',
    solution: 'Sử dụng JOIN hoặc Eager Loading (thay vì Lazy Loading).',
    bad: `// Lặp gọi DB\nconst posts = await db.query("SELECT * FROM posts");\nfor (let post of posts) {\n  post.author = await db.query("SELECT * FROM users WHERE id = ?", [post.author_id]);\n}`,
    good: `// Gọi DB 1 lần\nconst posts = await db.query(\`\n  SELECT p.*, u.name as author_name \n  FROM posts p \n  JOIN users u ON p.author_id = u.id\n\`);`
  },
  {
    id: 'missing-index', title: 'Thiếu Index trên cột Search', tag: 'Database', color: 'rose', icon: Search,
    context: 'Tìm kiếm người dùng theo email trong bảng có 5 triệu record.',
    story: 'Email không được đánh index, DB phải scan toàn bộ 5 triệu dòng mỗi khi có người login.',
    impact: 'CPU Database lên 100%, sập DB, không ai login được.',
    solution: 'Đánh Index cho các cột thường xuyên dùng trong mệnh đề WHERE.',
    bad: `// Cột email KHÔNG có index\nSELECT * FROM users WHERE email = 'test@test.com';`,
    good: `// Thêm index\nCREATE UNIQUE INDEX idx_users_email ON users(email);\n// Query sẽ dùng index, tốc độ tính bằng ms\nSELECT * FROM users WHERE email = 'test@test.com';`
  },
  {
    id: 'bulk-insert-loop', title: 'Insert DB trong vòng lặp', tag: 'Database', color: 'rose', icon: RefreshCw,
    context: 'Import file Excel/CSV chứa 10,000 dòng dữ liệu người dùng.',
    story: 'Đọc từng dòng dữ liệu và gọi lệnh INSERT 10,000 lần liên tục vào database.',
    impact: 'Mất nhiều phút để chạy xong, tạo quá tải kết nối và transaction log trên DB.',
    solution: 'Sử dụng Bulk Insert / Batch Insert để ghi nhiều records trong 1 câu query.',
    bad: `for(let user of users) {\n  await db.query('INSERT INTO users...', user);\n}`,
    good: `await db.query('INSERT INTO users (name, email) VALUES ?', \n  [users.map(u => [u.name, u.email])]);`
  },
  {
    id: 'db-no-transaction', title: 'Cập nhật nhiều bảng thiếu Transaction', tag: 'Database', color: 'rose', icon: Database,
    context: 'Quy trình chuyển tiền: Trừ tiền người gửi, Cộng tiền người nhận.',
    story: 'Trừ tiền thành công, nhưng lúc cộng tiền thì server hoặc mạng bị lỗi.',
    impact: 'Dữ liệu bị sai lệch. Tiền của người gửi bị mất nhưng người nhận không có tiền.',
    solution: 'Bọc các thao tác thay đổi dữ liệu liên quan trong một Database Transaction (ACID).',
    bad: `await db.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');\n// Mạng đứt lúc này -> Lỗi\nawait db.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');`,
    good: `const trx = await db.beginTransaction();\ntry {\n  await trx.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');\n  await trx.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');\n  await trx.commit();\n} catch (e) { await trx.rollback(); }`
  },
  {
    id: 'ignore-db-timezone', title: 'Không chuẩn hóa Timezone DB', tag: 'Database', color: 'rose', icon: Clock,
    context: 'Ứng dụng phục vụ người dùng đa quốc gia.',
    story: 'Server lưu ngày giờ hiện tại theo giờ local của máy chủ (vd: Asia/Ho_Chi_Minh).',
    impact: 'Lỗi tính toán ngày tháng. Chuyển server sang khu vực khác dữ liệu sẽ bị lệch. Sinh nhật user sai 1 ngày.',
    solution: 'Luôn luôn lưu trữ Datetime ở chuẩn UTC (Timezone 0) vào Database.',
    bad: `INSERT INTO events (name, time) VALUES ('Meeting', '2023-10-15 08:00:00'); // Giờ local`,
    good: `INSERT INTO events (name, time) VALUES ('Meeting', '2023-10-15 01:00:00'); // Giờ UTC`
  },
  {
    id: 'no-foreign-keys', title: 'Bỏ qua Khóa ngoại (Foreign Keys)', tag: 'Database', color: 'rose', icon: GitBranch,
    context: 'Bảng Orders liên kết với bảng Users.',
    story: 'Để "insert cho nhanh", dev bỏ qua không thiết lập ràng buộc FK trong SQL.',
    impact: 'User bị xóa nhưng Orders của user đó vẫn còn (Orphan data). Bug khi lấy dữ liệu sẽ gây Exception.',
    solution: 'Sử dụng Referential Integrity (Khóa ngoại) để DB tự động quản lý dữ liệu mồ côi.',
    bad: `CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  user_id INT -- Không ràng buộc\n);`,
    good: `CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  user_id INT,\n  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)\n);`
  },
  {
    id: 'select-star', title: 'Sử dụng SELECT * ở mọi nơi', tag: 'Database', color: 'rose', icon: Database,
    context: 'Lấy danh sách người dùng để hiển thị tên.',
    story: 'Dev dùng SELECT * FROM users trả về cả trường password_hash, token, description dài.',
    impact: 'Tốn RAM máy chủ, nghẽn băng thông mạng, và lộ lọt dữ liệu nhạy cảm ra Frontend.',
    solution: 'Chỉ định đích danh các cột cần lấy.',
    bad: `SELECT * FROM users WHERE active = 1;`,
    good: `SELECT id, full_name, avatar_url FROM users WHERE active = 1;`
  },

  // --- CONCURRENCY ---
  {
    id: 'race-condition', title: 'Race Condition (Trừ tiền 2 lần)', tag: 'Concurrency', color: 'amber', icon: ServerCrash,
    context: 'Người dùng click đúp nút "Thanh toán" hoặc gọi API 2 lần đồng thời.',
    story: 'Hệ thống kiểm tra số dư, thấy đủ, rồi trừ tiền. Cả 2 request đều đọc thấy số dư đủ trước khi request kia kịp trừ.',
    impact: 'Số dư bị trừ âm, công ty mất tiền túi.',
    solution: 'Dùng Database Lock (Pessimistic/Optimistic) hoặc Queue.',
    bad: `const user = await db.User.findById(req.userId);\nif (user.balance >= 100) {\n  user.balance -= 100;\n  await user.save();\n}`,
    good: `// Atomic update (Optimistic Concurrency Control)\nawait db.User.updateOne(\n  { _id: req.userId, balance: { $gte: 100 } },\n  { $inc: { balance: -100 } }\n);`
  },
  {
    id: 'deadlock-db', title: 'Database Deadlock', tag: 'Concurrency', color: 'amber', icon: Lock,
    context: 'Hai luồng (thread) cập nhật chéo dữ liệu.',
    story: 'Thread A lock Row 1 chờ Row 2. Thread B lock Row 2 chờ Row 1. Cả 2 kẹt vô hạn.',
    impact: 'Toàn bộ transaction bị kẹt, request timeout, DB nghẽn.',
    solution: 'Đảm bảo thứ tự cập nhật dữ liệu (Locking Order) trên tất cả các luồng luôn giống nhau.',
    bad: `// Thread A:\nUPDATE T1 SET...;\nUPDATE T2 SET...;\n\n// Thread B:\nUPDATE T2 SET...;\nUPDATE T1 SET...;`,
    good: `// Cả A và B đều tuân thủ thứ tự:\nUPDATE T1 SET...;\nUPDATE T2 SET...;`
  },

  // --- PERFORMANCE ---
  {
    id: 'pagination-offset', title: 'OFFSET Pagination với data lớn', tag: 'Performance', color: 'sky', icon: Zap,
    context: 'Phân trang danh sách giao dịch (hàng triệu dòng).',
    story: 'Dùng LIMIT 10 OFFSET 100000. Database phải đếm và bỏ qua 100,000 dòng đầu tiên.',
    impact: 'Trang càng sâu, query càng chậm (từ vài ms lên vài giây).',
    solution: 'Sử dụng Cursor-based Pagination (Keyset Pagination).',
    bad: `SELECT * FROM transactions \nORDER BY created_at DESC \nLIMIT 10 OFFSET 100000;`,
    good: `// Client truyền id của item cuối cùng ở trang trước\nSELECT * FROM transactions \nWHERE id < 98765 \nORDER BY id DESC \nLIMIT 10;`
  },
  {
    id: 'no-connection-pool', title: 'Không dùng Connection Pool', tag: 'Performance', color: 'sky', icon: Layers,
    context: 'Backend kết nối đến Database.',
    story: 'Mỗi request đến, backend lại tạo một connection mới đến DB, query xong thì đóng lại.',
    impact: 'Tạo connection tốn nhiều chi phí (TCP handshake). Quá nhiều request sẽ làm cạn kiệt max_connections.',
    solution: 'Sử dụng Connection Pool để tái sử dụng các kết nối.',
    bad: `const conn = await mysql.createConnection(config);\nawait conn.query(...);\nconn.end();`,
    good: `const pool = mysql.createPool({...config, connectionLimit: 10});\n// Tái sử dụng connection từ pool\nawait pool.query(...);`
  },
  {
    id: 'sync-io-event-loop', title: 'Blocking I/O trong Event Loop', tag: 'Performance', color: 'sky', icon: Clock,
    context: 'Đọc cấu hình hoặc file data lớn trong lúc xử lý request.',
    story: 'Dùng fs.readFileSync trong một API route của Node.js.',
    impact: 'Node.js chạy single-thread. Hàm Sync sẽ khoá toàn bộ Event Loop. Các request khác bị treo.',
    solution: 'Chỉ dùng Sync ở lúc khởi động app. Trong runtime, bắt buộc dùng Async/Promises.',
    bad: `app.get('/data', (req, res) => {\n  const data = fs.readFileSync('/large.json');\n  res.json(JSON.parse(data));\n});`,
    good: `app.get('/data', async (req, res) => {\n  const data = await fs.promises.readFile('/large.json');\n  res.json(JSON.parse(data));\n});`
  },
  {
    id: 'cache-stampede', title: 'Cache Stampede (Hiệu ứng bầy đàn)', tag: 'Performance', color: 'sky', icon: Zap,
    context: 'Dữ liệu trang chủ lấy từ DB, cache trên Redis trong 5 phút.',
    story: 'Đúng lúc cache hết hạn (expire), có 1000 requests cùng lúc ập tới, đều miss cache và đập thẳng vào DB.',
    impact: 'Database nhận 1000 query nặng cùng một khoảnh khắc, CPU vọt lên 100%, sập DB.',
    solution: 'Sử dụng kỹ thuật Mutex Lock/Distributed Lock khi fetch data, hoặc refresh cache background trước khi hết hạn.',
    bad: `let data = cache.get('home');\nif(!data) {\n  data = await db.getHeavyData(); // 1000 req cùng gọi\n  cache.set('home', data);\n}`,
    good: `let data = cache.get('home');\nif(!data) {\n  if(await lock.acquire('home_lock')) {\n    data = await db.getHeavyData();\n    cache.set('home', data);\n    lock.release();\n  }\n}`
  },
  {
    id: 'fat-payload', title: 'API trả về dữ liệu thừa (Overfetching)', tag: 'Performance', color: 'sky', icon: HardDrive,
    context: 'Lấy danh sách người dùng để hiển thị tên và avatar trên danh sách.',
    story: 'Câu query SELECT * trả về toàn bộ trường. API trả file JSON quá lớn.',
    impact: 'Kích thước payload API lớn (vài MB) làm chậm thời gian tải mạng, parse JSON lâu.',
    solution: 'Sử dụng DTO/ViewModel để lọc và trả về đúng dữ liệu Frontend cần.',
    bad: `const users = await db.query('SELECT * FROM users');\nres.json(users);`,
    good: `const users = await db.query('SELECT id, name, avatar FROM users');\nres.json(users);`
  },
  {
    id: 'no-pagination', title: 'Lấy toàn bộ dữ liệu không phân trang', tag: 'Performance', color: 'sky', icon: HardDrive,
    context: 'Hiển thị danh sách log hoặc sản phẩm.',
    story: 'Viết API lấy toàn bộ SELECT * FROM system_logs, tháng đầu chạy nhanh vì ít dữ liệu.',
    impact: 'Vài tháng sau log lên 1 triệu dòng, API trả về 50MB, server Crash do OOM, client đứng máy.',
    solution: 'Luôn áp dụng giới hạn (LIMIT) và phân trang cho các endpoint mảng.',
    bad: `app.get('/logs', async (req, res) => {\n  const logs = await db.query('SELECT * FROM logs');\n  res.json(logs);\n});`,
    good: `app.get('/logs', async (req, res) => {\n  const { limit=50, offset=0 } = req.query;\n  const logs = await db.query('SELECT * FROM logs LIMIT ? OFFSET ?', [limit, offset]);\n  res.json(logs);\n});`
  },
  {
    id: 'ignoring-cache-headers', title: 'Không dùng Cache Headers cho File Tĩnh', tag: 'Performance', color: 'sky', icon: Zap,
    context: 'Phục vụ file JS, CSS, Hình ảnh.',
    story: 'Gửi file tĩnh về cho browser mà không có HTTP Cache-Control header.',
    impact: 'Khách vào trang nào browser cũng tải lại toàn bộ ảnh, js, css. Load chậm, tốn băng thông máy chủ.',
    solution: 'Cấu hình Cache-Control và dùng Content Hash trong tên file để cache mạnh mẽ (CDN/Browser cache).',
    bad: `// Không có header cache\nContent-Type: image/jpeg`,
    good: `// Header cache dài hạn\nContent-Type: image/jpeg\nCache-Control: public, max-age=31536000, immutable`
  },
  {
    id: 'websocket-broadcast', title: 'Broadcast WebSocket vô tội vạ', tag: 'Performance', color: 'sky', icon: Network,
    context: 'Ứng dụng chat hoặc cập nhật bảng giá chứng khoán.',
    story: 'Khi có tin nhắn mới, dùng mảng FOR lặp qua toàn bộ hàng vạn connections và gửi đi.',
    impact: 'Nghẽn cổ chai CPU và Network. Tăng độ trễ.',
    solution: 'Dùng các thư viện quản lý room/channel như Socket.io, Redis Pub/Sub.',
    bad: `const clients = [...]; // 10k clients\nfunction broadcast(msg) {\n  clients.forEach(c => c.send(msg));\n}`,
    good: `// Sử dụng tính năng Rooms hoặc Pub/Sub backend\nio.to('room_chung_khoan_1').emit('update', msg);`
  },

  // --- SECURITY ---
  {
    id: 'no-rate-limit', title: 'Không có Rate Limiting', tag: 'Security', color: 'orange', icon: ShieldAlert,
    context: 'API gửi mã OTP qua SMS.',
    story: 'Hacker dùng tool gọi API liên tục 10,000 lần/phút vào 1 số điện thoại.',
    impact: 'Công ty tốn hàng ngàn USD tiền gửi SMS rác, server bị từ chối dịch vụ (DDoS).',
    solution: 'Implement Rate Limiting theo IP hoặc User ID.',
    bad: `app.post('/api/send-otp', async (req, res) => {\n  await sms.send(req.body.phone, getOTP());\n});`,
    good: `const otpLimiter = rateLimit({ windowMs: 15*60*1000, max: 3 });\napp.post('/api/send-otp', otpLimiter, ...);`
  },
  {
    id: 'hardcode-secrets', title: 'Hardcode Credentials', tag: 'Security', color: 'orange', icon: Key,
    context: 'Kết nối Database và AWS S3.',
    story: 'Ghi thẳng password DB và AWS Access Key vào source code rồi push lên GitHub.',
    impact: 'Bị bot quét thấy trong vài giây. Hacker lấy trộm DB và dùng AWS đào coin tốn hàng chục ngàn USD.',
    solution: 'Dùng Environment Variables (.env) hoặc Secret Manager.',
    bad: `const db = mysql.createConnection({\n  host: 'db.company.com',\n  password: 'SuperSecretPassword123!'\n});`,
    good: `const db = mysql.createConnection({\n  host: process.env.DB_HOST,\n  password: process.env.DB_PASSWORD\n});`
  },
  {
    id: 'xss-injection', title: 'Cross-Site Scripting (XSS)', tag: 'Security', color: 'orange', icon: ShieldOff,
    context: 'User nhập nội dung comment lên blog.',
    story: 'User nhập <script>alert("XSS")</script>. Hệ thống lưu nguyên vào DB và in thẳng ra HTML.',
    impact: 'Hacker đánh cắp Session/Cookie của người dùng khác, chiếm đoạt tài khoản.',
    solution: 'Luôn sanitize input hoặc escape output (React mặc định escape).',
    bad: `<div dangerouslySetInnerHTML={{ __html: comment.body }} />`,
    good: `import DOMPurify from 'dompurify';\n<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.body) }} />`
  },
  {
    id: 'sql-injection', title: 'SQL Injection', tag: 'Security', color: 'orange', icon: Database,
    context: 'Chức năng tìm kiếm hoặc đăng nhập.',
    story: 'Nối chuỗi string trực tiếp vào câu lệnh SQL thay vì dùng Parameterized Query.',
    impact: 'Hacker nhập "\' OR 1=1 --" để bypass đăng nhập hoặc "DROP TABLE" để xoá data.',
    solution: 'Sử dụng Parameterized Query / Prepared Statements hoặc ORM.',
    bad: `const q = "SELECT * FROM users WHERE username = '" + user + "'";\ndb.execute(q);`,
    good: `const q = "SELECT * FROM users WHERE username = ?";\ndb.execute(q, [user]);`
  },
  {
    id: 'log-sensitive-data', title: 'Log Dữ Liệu Nhạy Cảm', tag: 'Security', color: 'orange', icon: Lock,
    context: 'Ghi log request/response để debug.',
    story: 'Log toàn bộ req.body (gồm password, số thẻ tín dụng) lên dịch vụ tập trung (ELK, Datadog).',
    impact: 'Lộ thông tin khách hàng cho nội bộ (Dev, Ops), vi phạm chuẩn PCI-DSS/GDPR.',
    solution: 'Masking (che mờ) hoặc filter các trường nhạy cảm trước khi log.',
    bad: `logger.info('Checkout request:', req.body); // Chứa số thẻ`,
    good: `const safeBody = { ...req.body };\nsafeBody.creditCard = '****-' + safeBody.creditCard.slice(-4);\nlogger.info('Checkout request:', safeBody);`
  },
  {
    id: 'cors-wildcard', title: 'CORS Config: Allow Origin *', tag: 'Security', color: 'orange', icon: ShieldOff,
    context: 'Thiết lập bảo mật API CORS để frontend gọi được.',
    story: 'Dev lười cấu hình cụ thể, bật Access-Control-Allow-Origin: * và allow credentials.',
    impact: 'Bất kỳ trang web nào cũng có thể gọi API bằng cookie của người dùng (lỗi CSRF).',
    solution: 'Chỉ định rõ domain cụ thể (whitelist) trong cấu hình CORS.',
    bad: `app.use(cors({ origin: '*', credentials: true }));`,
    good: `app.use(cors({ origin: 'https://trustedsite.com', credentials: true }));`
  },
  {
    id: 'jwt-no-expiration', title: 'JWT Token sống vô hạn', tag: 'Security', color: 'orange', icon: Key,
    context: 'Hệ thống xác thực bằng JSON Web Token.',
    story: 'Phát hành token nhưng không set thuộc tính exp (expiration).',
    impact: 'Nếu hacker lấy cắp được token này, họ sẽ dùng được mãi mãi, khó thu hồi.',
    solution: 'Luôn set thời hạn ngắn cho Access Token (15m - 1h) và dùng Refresh Token.',
    bad: `const token = jwt.sign({ userId: user.id }, SECRET_KEY);`,
    good: `const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '15m' });`
  },
  {
    id: 'default-credentials', title: 'Không đổi mật khẩu mặc định', tag: 'Security', color: 'orange', icon: Lock,
    context: 'Cài đặt Redis, MongoDB, ElasticSearch.',
    story: 'Cài bằng Docker nhanh gọn nên để không password hoặc admin/admin.',
    impact: 'Hacker quét cổng mở ra internet, truy cập xoá data và để lại tin nhắn tống tiền (Ransomware).',
    solution: 'Đổi mật khẩu, disable default accounts, bind vào localhost nếu không cần expose.',
    bad: `services:\n  redis:\n    image: redis\n    ports: ["6379:6379"]`,
    good: `services:\n  redis:\n    image: redis\n    command: redis-server --requirepass \${PASS}\n    ports: ["127.0.0.1:6379:6379"]`
  },
  {
    id: 'regex-dos', title: 'ReDoS (Regular Expression DoS)', tag: 'Security', color: 'orange', icon: Cpu,
    context: 'Dùng Regex để validate chuỗi đầu vào.',
    story: 'Viết Regex phức tạp có độ phức tạp hàm mũ (vd ^([a-z]+)*$).',
    impact: 'Hacker gửi 1 chuỗi cực dài làm engine tính toán Regex treo CPU trong vòng 5 phút. Server sập.',
    solution: 'Dùng thư viện validator chuẩn, giới hạn độ dài chuỗi trước khi chạy Regex.',
    bad: `const emailRegex = /^([a-zA-Z0-9]+)*$/;\nemailRegex.test(veryLongString); // Treo CPU`,
    good: `if (input.length > 50) return false;\nimport { isEmail } from 'validator';\nisEmail(input);`
  },
  {
    id: 'exposing-stack-trace', title: 'Lộ Stack Trace ra Production', tag: 'Security', color: 'orange', icon: TerminalSquare,
    context: 'Xử lý lỗi (Exception) ở backend.',
    story: 'API trả về toàn bộ Stack Trace báo lỗi (dòng code số mấy, file tên gì).',
    impact: 'Hacker biết được thư viện, version, cấu trúc thư mục để tấn công lỗ hổng.',
    solution: 'Bắt lỗi tập trung và trả về thông báo lỗi chung chung trên Production.',
    bad: `app.use((err, req, res, next) => {\n  res.status(500).json({ error: err.stack });\n});`,
    good: `app.use((err, req, res, next) => {\n  logger.error(err);\n  res.status(500).json({ error: 'Internal Server Error' });\n});`
  },
  {
    id: 'blind-npm-install', title: 'Cài thư viện mù quáng', tag: 'Security', color: 'orange', icon: Box,
    context: 'Thêm tính năng phụ (format ngày, số).',
    story: 'Thấy thư viện trên mạng là npm install không kiểm tra.',
    impact: 'Dính mã độc đánh cắp biến môi trường (Supply Chain Attack) hoặc bloat dung lượng.',
    solution: 'Kiểm tra kỹ lượt tải, uy tín thư viện. Code tay những hàm logic quá đơn giản.',
    bad: `npm install is-even\nnpm install left-pad`,
    good: `const isEven = (n) => n % 2 === 0;\nconst padded = String(n).padStart(5, '0');`
  },

  // --- ARCHITECTURE ---
  {
    id: 'single-point', title: 'Single Point of Failure (SPOF)', tag: 'Architecture', color: 'fuchsia', icon: Globe,
    context: 'Deploy toàn bộ backend, frontend, database lên 1 con VPS.',
    story: 'VPS bị lỗi phần cứng hoặc quá tải, toàn bộ hệ thống sập hoàn toàn.',
    impact: 'Downtime kéo dài, mất dữ liệu nếu ổ cứng hỏng.',
    solution: 'Tách Database sang server riêng (hoặc managed DB), chạy ít nhất 2 server app qua Load Balancer.',
    bad: `- Server A (1 IP):\n  - Node.js App\n  - MySQL\n  - Redis`,
    good: `- Load Balancer\n  - App Server 1\n  - App Server 2\n- Managed Database (Multi-AZ)`
  },
  {
    id: 'floating-point-money', title: 'Dùng Float để lưu Tiền', tag: 'Architecture', color: 'fuchsia', icon: Hash,
    context: 'Tính toán tiền tệ và giỏ hàng.',
    story: 'Dùng kiểu dữ liệu Float hoặc Double trong DB và Javascript (0.1 + 0.2).',
    impact: 'Lỗi làm tròn IEEE 754 (0.1 + 0.2 = 0.30000000000000004). Dẫn đến sai lệch số dư, lỗi thanh toán.',
    solution: 'Lưu tiền ở đơn vị nhỏ nhất (cents) dưới dạng Integer, hoặc dùng DECIMAL trong database.',
    bad: `let price = 0.1;\nlet tax = 0.2;\nlet total = price + tax; // 0.30000000000000004`,
    good: `let priceCents = 10;\nlet taxCents = 20;\nlet totalCents = priceCents + taxCents; // 30`
  },
  {
    id: 'fat-models', title: 'Nhồi nhét logic vào Controller', tag: 'Architecture', color: 'fuchsia', icon: Layers,
    context: 'Phát triển tính năng mua hàng.',
    story: 'Logic tính thuế, kho, tạo hóa đơn, email viết thẳng vào 1 hàm controller dài 1000 dòng.',
    impact: 'Khó bảo trì, không thể viết Unit Test, khó tái sử dụng (Spaghetti code).',
    solution: 'Tách logic kinh doanh ra Service layer, Controller chỉ routing và trả kết quả.',
    bad: `app.post('/checkout', async (req, res) => {\n  // 1000 dòng code xử lý thập cẩm\n});`,
    good: `app.post('/checkout', async (req, res) => {\n  const order = await CheckoutService.process(req.body);\n  res.json(order);\n});`
  },
  {
    id: 'in-memory-sessions', title: 'Lưu Session trên RAM Server', tag: 'Architecture', color: 'fuchsia', icon: ServerCrash,
    context: 'Hệ thống có form đăng nhập giữ trạng thái người dùng.',
    story: 'Lưu sessions vào mảng/biến trong RAM của Node.js.',
    impact: 'Mở rộng ra nhiều servers (Load Balancing), user bị văng ra bắt login lại liên tục (Stateful).',
    solution: 'Kiến trúc Stateless: Lưu session trên DB tập trung (Redis) hoặc sử dụng JWT.',
    bad: `const sessions = {}; // Lưu trong RAM\napp.post('/login', (req, res) => {\n  sessions[req.sessionID] = user;\n});`,
    good: `const RedisStore = require('connect-redis')(session);\napp.use(session({\n  store: new RedisStore({ client: redisClient })\n}));`
  },
  {
    id: 'god-object', title: 'God Object (Lớp toàn năng)', tag: 'Architecture', color: 'fuchsia', icon: Layers,
    context: 'Thiết kế class quản lý ứng dụng.',
    story: 'Tạo class UserManager chứa 5000 dòng code, lo từ login, đổi avatar đến tính điểm thưởng.',
    impact: 'Gây xung đột git liên tục, khó đọc, vi phạm Single Responsibility.',
    solution: 'Áp dụng SRP. Tách thành AuthService, EmailService, AvatarService.',
    bad: `class UserManager {\n  login() {}\n  sendWelcomeEmail() {}\n  compressAvatar() {}\n}`,
    good: `class AuthService { login() {} }\nclass CommunicationService { sendEmail() {} }`
  },
  {
    id: 'tight-coupling', title: 'Tight Coupling (Kết dính code cao)', tag: 'Architecture', color: 'fuchsia', icon: GitBranch,
    context: 'Service Xử lý hoá đơn muốn gửi SMS.',
    story: 'Khởi tạo trực tiếp (new) đối tượng TwilioSMS ngay trong code Hoá Đơn.',
    impact: 'Muốn đổi sang dịch vụ VietGuys SMS thì phải sửa code ở mọi nơi.',
    solution: 'Dùng Dependency Injection (DI) truyền Provider từ ngoài vào.',
    bad: `class InvoiceService {\n  process() {\n    const sms = new TwilioSMS();\n    sms.send();\n  }\n}`,
    good: `class InvoiceService {\n  constructor(smsProvider) { this.smsProvider = smsProvider; }\n  process() { this.smsProvider.send(); }\n}`
  },
  {
    id: 'premature-optimization', title: 'Tối ưu sớm (Premature Optimization)', tag: 'Architecture', color: 'fuchsia', icon: Clock,
    context: 'Dự án mới khởi tạo, chỉ 100 users nội bộ.',
    story: 'Tốn 3 tháng cài Kubernetes, Microservices, Kafka, Redis Cluster cho MVP.',
    impact: 'Chậm ra mắt (Time to market), tốn tài nguyên, code phức tạp.',
    solution: 'Bắt đầu với Monolithic Architecture đơn giản (YAGNI). Tối ưu khi thực sự nghẽn.',
    bad: `Microservices (10 services) + Kafka + K8s cho 1 app ToDo list.`,
    good: `Monolith Node.js + PostgreSQL. Module hoá code rõ ràng để dễ tách sau này.`
  },

  // --- BACKGROUND JOBS ---
  {
    id: 'sync-email', title: 'Gửi Email Đồng Bộ', tag: 'Background Jobs', color: 'indigo', icon: Mail,
    context: 'Gửi email chào mừng khi user đăng ký.',
    story: 'App gọi API dịch vụ email và đợi phản hồi xong mới trả kết quả cho user.',
    impact: 'Đăng ký mất 10s. Nếu dịch vụ email lỗi, user không thể tạo tài khoản.',
    solution: 'Đẩy công việc gửi email vào Message Queue (Async Background Job).',
    bad: `const user = await createUser();\nawait sendEmail(user.email); // Chờ 3 giây\nres.send('Success');`,
    good: `const user = await createUser();\nawait queue.push('send_email', { email: user.email });\nres.send('Success'); // Phản hồi ngay 10ms`
  },
  {
    id: 'dead-letter-queue', title: 'Queue không có Dead Letter', tag: 'Background Jobs', color: 'indigo', icon: Mail,
    context: 'Hệ thống xử lý hóa đơn chạy qua RabbitMQ/Kafka.',
    story: 'Một tin nhắn định dạng lỗi làm worker crash. Tin nhắn liên tục bị đưa lại vào queue.',
    impact: 'Worker kẹt ở tin nhắn lỗi vô hạn (Infinite Retry loop). Các hóa đơn khác không được xử lý.',
    solution: 'Cấu hình Max Retry. Vượt quá giới hạn thì đẩy sang Dead Letter Queue (DLQ).',
    bad: `channel.consume('queue', async (msg) => {\n  await processInvoice(msg);\n  channel.ack(msg);\n});`,
    good: `try {\n  await processInvoice(msg);\n} catch (e) {\n  if(retryCount > 3) moveToDLQ(msg);\n}`
  },

  // --- RESILIENCE ---
  {
    id: 'no-circuit-breaker', title: 'Thiếu Circuit Breaker', tag: 'Resilience', color: 'teal', icon: WifiOff,
    context: 'Service A gọi API của Service B.',
    story: 'Service B chậm (timeout 30s). Service A chờ làm cạn kiệt thread pool.',
    impact: 'Lỗi lan truyền (Cascading failure). Cả A và B đều sập.',
    solution: 'Dùng Circuit Breaker ngắt mạch và trả về Fallback data khi Service B lỗi nhiều.',
    bad: `const response = await axios.get('http://service-b/api/profile'); // Kẹt 30s`,
    good: `const breaker = new CircuitBreaker(callServiceB, { errorThreshold: 50 });\nbreaker.fallback(() => ({ isFallback: true }));`
  },
  {
    id: 'missing-timeout', title: 'Gọi External API không Timeout', tag: 'Resilience', color: 'teal', icon: Clock,
    context: 'Gọi cổng thanh toán (Momo) hoặc gửi SMS.',
    story: 'Dùng fetch gọi API nhưng quên set timeout.',
    impact: 'Nếu API thứ 3 treo, server của bạn treo hàng phút, cạn kiệt connection.',
    solution: 'Luôn thiết lập timeout hợp lý (5s-10s) cho mọi external call.',
    bad: `const res = await axios.get('https://slow-api.com/status');`,
    good: `const res = await axios.get('https://slow-api.com/status', { timeout: 5000 });`
  },
  {
    id: 'retry-storm', title: 'Retry bão (Retry Storm)', tag: 'Resilience', color: 'teal', icon: RefreshCw,
    context: 'Client gọi API thất bại do server quá tải.',
    story: 'Client lập tức gọi lại API không có thời gian chờ trong vòng lặp vô tận.',
    impact: 'Server vốn đang quá tải nhận thêm hàng nghìn request retry dồn dập, sập hoàn toàn.',
    solution: 'Sử dụng Exponential Backoff kết hợp Jitter (Thử lại với độ trễ tăng dần ngẫu nhiên).',
    bad: `while(retries > 0) {\n  try { await api.call(); }\n  catch(e) { retries--; }\n}`,
    good: `const delay = (attempt) => Math.pow(2, attempt) * 100 + Math.random() * 50;\nawait sleep(delay(currentAttempt));`
  },
  {
    id: 'idempotency-missing', title: 'API không có tính Idempotent', tag: 'Resilience', color: 'teal', icon: RefreshCw,
    context: 'API xử lý thanh toán (Charge).',
    story: 'Thiếu cơ chế chống trùng. Mạng rớt giữa chừng, client tự động retry lại POST request.',
    impact: 'User bị trừ tiền 2 lần cho 1 mã đơn hàng.',
    solution: 'Client gửi kèm Idempotency-Key. Server check key để không charge 2 lần.',
    bad: `app.post('/charge', async (req, res) => {\n  await doCharge(req.body.amount);\n  res.send('Done');\n});`,
    good: `const key = req.headers['idempotency-key'];\nif (await hasKey(key)) return res.send('Done');\nawait doCharge(); await saveKey(key);`
  },
  {
    id: 'no-backups', title: 'Không có kịch bản Backup Database', tag: 'Resilience', color: 'teal', icon: HardDrive,
    context: 'Lưu trữ Database.',
    story: 'Chỉ backup file SQL ngay trên ổ cứng của VPS đang chạy DB. Chưa bao giờ test khôi phục.',
    impact: 'VPS hỏng ổ cứng -> mất luôn file backup. Đi tong cơ nghiệp.',
    solution: 'Chiến lược 3-2-1. Gửi file backup lên S3. Thử nghiệm restore định kỳ.',
    bad: `mysqldump > /var/backup/db.sql`,
    good: `mysqldump | aws s3 cp - s3://my-backup-bucket/db.sql\n// Test restore hàng quý`
  },

  // --- STABILITY ---
  {
    id: 'memory-leak-closure', title: 'Memory Leak do Global Variable', tag: 'Stability', color: 'red', icon: Cpu,
    context: 'Lưu cache data trong memory Node.js.',
    story: 'Tạo mảng/object global và push data vào liên tục không bao giờ xoá.',
    impact: 'RAM tăng dần đến khi hết (OOM - Out of Memory) thì server crash.',
    solution: 'Sử dụng thư viện Cache có cơ chế TTL (Time to Live) hoặc LRU eviction.',
    bad: `const userCache = {}; // Lưu mãi mãi\nuserCache[id] = db.getUser(id);`,
    good: `const NodeCache = require("node-cache");\nconst cache = new NodeCache({ stdTTL: 60 }); // 60 giây`
  },
  {
    id: 'unhandled-promise', title: 'Unhandled Promise Rejection', tag: 'Stability', color: 'red', icon: AlertTriangle,
    context: 'Thực thi một async function nhưng quên await/catch.',
    story: 'Hàm quăng lỗi. Node.js process sẽ bị crash đột ngột vì Unhandled Promise.',
    impact: 'Server sập, PM2/Docker khởi động lại, ngắt kết nối của mọi user đang truy cập.',
    solution: 'Luôn thêm .catch() hoặc try/catch.',
    bad: `app.post('/api', (req, res) => {\n  doHeavyTaskAsync(); // Quên await\n  res.send('OK');\n});`,
    good: `app.post('/api', (req, res) => {\n  doHeavyTaskAsync().catch(err => logger.error(err));\n  res.send('OK');\n});`
  },

  // --- DEVOPS ---
  {
    id: 'schema-drift', title: 'Sửa Schema Database Trực Tiếp', tag: 'DevOps', color: 'violet', icon: TerminalSquare,
    context: 'Thêm trường dữ liệu mới.',
    story: 'Mở DBeaver/Navicat vào thẳng DB Production chạy câu lệnh ALTER TABLE tay.',
    impact: 'Schema Drift. Khi cần tạo môi trường Staging mới, code chạy bị lỗi do cấu trúc DB không khớp.',
    solution: 'Dùng Migration tool (Flyway, Prisma Migrate, TypeORM) lưu vào Git.',
    bad: `/* Chạy tay trên Production */\nALTER TABLE users ADD COLUMN phone VARCHAR(20);`,
    good: `// Migration file 20231015_add_phone.js\nexports.up = (knex) => knex.schema.alterTable(...);`
  },
  {
    id: 'config-in-code', title: 'Lưu cấu hình môi trường trong Code', tag: 'DevOps', color: 'violet', icon: Settings,
    context: 'Cấu hình URL kết nối DB, khóa bí mật.',
    story: 'Dùng if-else hardcode URL prod và dev thẳng trong file constants.js.',
    impact: 'Muốn đổi mật khẩu DB phải sửa code, commit và build lại toàn bộ app.',
    solution: 'Sử dụng Biến môi trường (Environment Variables) theo chuẩn 12-Factor App.',
    bad: `const dbUrl = env === 'prod' ? '10.0.0.1' : 'localhost';`,
    good: `const dbUrl = process.env.DATABASE_URL;`
  },
  {
    id: 'docker-latest', title: "Dùng Docker image tag ':latest'", tag: 'DevOps', color: 'violet', icon: Box,
    context: 'Viết Dockerfile hoặc docker-compose.yml.',
    story: 'Khai báo image: node:latest hoặc my-db:latest.',
    impact: 'Khi container restart, nó ngầm kéo bản update mới có breaking changes làm sập app vô cớ.',
    solution: 'Luôn ghim cứng phiên bản cụ thể (Immutable tags).',
    bad: `services:\n  app:\n    image: node:latest`,
    good: `services:\n  app:\n    image: node:18.16.0-alpine`
  },
  {
    id: 'no-graceful-shutdown', title: 'Tắt server đột ngột (Kill -9)', tag: 'DevOps', color: 'violet', icon: ServerCrash,
    context: 'Deploy phiên bản mới.',
    story: 'CI/CD tắt cái rụp server cũ đang chạy dở dang giao dịch.',
    impact: 'Request của user đứt mạng nhận lỗi 502, data đang ghi dở bị lỗi.',
    solution: 'Lắng nghe SIGTERM, dừng nhận request mới, đợi request cũ xong mới tắt.',
    bad: `process.exit(1); // Chết ngay lập tức`,
    good: `process.on('SIGTERM', () => {\n  server.close(() => process.exit(0));\n});`
  },
  {
    id: 'log-rotate-missing', title: 'Không giới hạn dung lượng Log', tag: 'DevOps', color: 'violet', icon: FileWarning,
    context: 'Ứng dụng lưu log file.',
    story: 'Cứ ghi tiếp vào 1 file app.log duy nhất xuyên suốt hàng năm trời.',
    impact: 'Ổ cứng VPS bị đầy 100%. Toàn bộ hệ thống kể cả Database cũng tê liệt.',
    solution: 'Dùng Log Rotation xoá log cũ sau 14 ngày, nén log cũ.',
    bad: `fs.appendFileSync('app.log', data);`,
    good: `const transport = new winston.transports.DailyRotateFile({\n  maxFiles: '14d', maxSize: '20m'\n});`
  },
  {
    id: 'no-healthcheck', title: 'Thiếu API Health Check', tag: 'DevOps', color: 'violet', icon: Activity,
    context: 'Chạy app qua Load Balancer (LB) hoặc K8s.',
    story: 'Không cung cấp api /health để LB check, LB chỉ ping port.',
    impact: 'App bị đứt kết nối DB nhưng port 80 vẫn mở, LB vẫn đổ user vào dẫn tới chết chùm.',
    solution: 'Viết API /healthz kiểm tra tính toàn vẹn của mọi kết nối DB/Redis.',
    bad: `// Không có route check health`,
    good: `app.get('/health', async (req, res) => {\n  await db.query('SELECT 1');\n  res.json({status: 'OK'});\n});`
  },

  // --- FRONTEND ---
  {
    id: 'large-react-state', title: 'State quá lớn ở Root Component', tag: 'Frontend', color: 'pink', icon: Layers,
    context: 'Phát triển React App.',
    story: 'Khai báo input state, search state ở tít thẻ App.jsx ngoài cùng.',
    impact: 'Gõ 1 phím vào ô search làm re-render toàn bộ DOM Tree của cả trang web, giật lag nặng.',
    solution: 'Colocation: Chuyển state vào component con nhỏ nhất cần dùng nó.',
    bad: `function App() {\n  const [val, setVal] = useState('');\n  return <><Sidebar /><input onChange={e=>setVal(e)} /></>;\n}`,
    good: `function SearchBar() {\n  const [val, setVal] = useState('');\n  return <input onChange={e=>setVal(e)} />;\n}`
  },
  {
    id: 'missing-key-prop', title: 'Lỗi thiếu Key trong React Map', tag: 'Frontend', color: 'pink', icon: List,
    context: 'Render mảng danh sách.',
    story: 'Bỏ qua warning của React, hoặc dùng index của mảng làm key.',
    impact: 'Khi xóa/sửa item ở giữa mảng, React xoá nhầm component hoặc state của item bị nhảy sai vị trí.',
    solution: 'Sử dụng id duy nhất (unique id) của dữ liệu làm Key.',
    bad: `items.map((item, index) => <Todo key={index} data={item} />)`,
    good: `items.map((item) => <Todo key={item.id} data={item} />)`
  },
  {
    id: 'useEffect-loop', title: 'Vòng lặp vô tận useEffect', tag: 'Frontend', color: 'pink', icon: RefreshCw,
    context: 'Gọi API lấy dữ liệu khi component mount.',
    story: 'Gọi API xong set vào State, nhưng quên dependency array [] hoặc nhét array/object vào dependency.',
    impact: 'useEffect chạy lại -> set State -> component render -> useEffect chạy lại. API bị gọi hàng vạn lần, sập Backend.',
    solution: 'Cẩn thận với dependency array, tránh truyền tham chiếu thay đổi liên tục.',
    bad: `useEffect(() => {\n  fetchData().then(d => setData(d));\n}); // Thiếu array []`,
    good: `useEffect(() => {\n  fetchData().then(d => setData(d));\n}, []); // Chỉ chạy 1 lần`
  },
  {
    id: 'heavy-bundle', title: 'Bundle JS quá khổ (Không Lazy Load)', tag: 'Frontend', color: 'pink', icon: Box,
    context: 'Ứng dụng SPA (Single Page Application).',
    story: 'Import thẳng mọi màn hình (Dashboard, Profile, Settings) vào thẻ App.js gốc.',
    impact: 'Tạo ra 1 file JS nặng 5MB. User mới vào trang Login phải chờ tải xong 5MB mới thấy màn hình.',
    solution: 'Sử dụng Code Splitting / Lazy Loading cho các Route không cần ngay.',
    bad: `import Dashboard from './Dashboard';\nimport Profile from './Profile';`,
    good: `const Dashboard = React.lazy(() => import('./Dashboard'));\n// Render qua <Suspense fallback={<Loader />}>`
  },
  {
    id: 'img-no-dimensions', title: 'Thẻ Image không có Width/Height', tag: 'Frontend', color: 'pink', icon: Image,
    context: 'Load danh sách bài viết có hình ảnh cover.',
    story: 'Dùng thẻ <img> bình thường không báo trước kích thước.',
    impact: 'Khi ảnh tải xong, nó đẩy các đoạn text bên dưới tụt xuống (Layout Shift - CLS). Trải nghiệm giật cục, SEO giảm điểm.',
    solution: 'Khai báo cứng width/height hoặc dùng aspect-ratio bằng CSS.',
    bad: `<img src="cover.jpg" alt="Cover" />`,
    good: `<img src="cover.jpg" width="800" height="400" alt="Cover" />`
  }
];
