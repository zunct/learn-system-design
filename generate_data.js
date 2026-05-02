const fs = require('fs');

const existingData = `import {
  Database, ServerCrash, ShieldAlert, Zap, Globe, Cpu, AlertTriangle, 
  Lock, RefreshCw, Key, CloudLightning, Activity, HardDrive, Network, 
  WifiOff, Clock, ShieldOff, FileWarning, TerminalSquare, Search, 
  Settings, Mail, Users, Bell, Layers, GitBranch, Box, Hash
} from 'lucide-react';

export const mistakes = [
  {
    id: 'nplus1',
    title: 'N+1 Query Problem',
    tag: 'Database',
    color: 'rose',
    icon: Database,
    context: 'Lấy danh sách bài viết và tác giả của từng bài.',
    story: 'Lập trình viên lấy 100 bài viết, sau đó vòng lặp 100 lần gọi DB để lấy thông tin tác giả.',
    impact: '101 query thay vì 1 query. DB quá tải, API phản hồi chậm (hàng giây).',
    solution: 'Sử dụng JOIN hoặc Eager Loading (thay vì Lazy Loading).',
    bad: \`// Lặp gọi DB
const posts = await db.query("SELECT * FROM posts");
for (let post of posts) {
  post.author = await db.query("SELECT * FROM users WHERE id = ?", [post.author_id]);
}\`,
    good: \`// Gọi DB 1 lần
const posts = await db.query(\\\`
  SELECT p.*, u.name as author_name 
  FROM posts p 
  JOIN users u ON p.author_id = u.id
\\\`);\`
  },
  {
    id: 'race-condition',
    title: 'Race Condition (Trừ tiền 2 lần)',
    tag: 'Concurrency',
    color: 'amber',
    icon: ServerCrash,
    context: 'Người dùng click đúp nút "Thanh toán" hoặc gọi API 2 lần đồng thời.',
    story: 'Hệ thống kiểm tra số dư, thấy đủ, rồi trừ tiền. Cả 2 request đều đọc thấy số dư đủ trước khi request kia kịp trừ.',
    impact: 'Số dư bị trừ âm, công ty mất tiền túi.',
    solution: 'Dùng Database Lock (Pessimistic/Optimistic) hoặc Queue.',
    bad: \`const user = await db.User.findById(req.userId);
if (user.balance >= 100) {
  user.balance -= 100;
  await user.save();
}\`,
    good: \`// Dùng Optimistic Concurrency Control (version)
// Hoặc Pessimistic Lock (SELECT ... FOR UPDATE)
// Hoặc Atomic update
await db.User.updateOne(
  { _id: req.userId, balance: { $gte: 100 } },
  { $inc: { balance: -100 } }
);\`
  },
  {
    id: 'missing-index',
    title: 'Thiếu Index trên cột Search',
    tag: 'Database',
    color: 'rose',
    icon: Search,
    context: 'Tìm kiếm người dùng theo email trong bảng có 5 triệu record.',
    story: 'Email không được đánh index, DB phải scan toàn bộ 5 triệu dòng mỗi khi có người login.',
    impact: 'CPU Database lên 100%, sập DB, không ai login được.',
    solution: 'Đánh Index cho các cột thường xuyên dùng trong mệnh đề WHERE.',
    bad: \`// Bảng users:
// id (PK), name, email, password
// Cột email KHÔNG có index
SELECT * FROM users WHERE email = 'test@test.com';\`,
    good: \`// Thêm index
CREATE UNIQUE INDEX idx_users_email ON users(email);

// Query sẽ dùng index, tốc độ tính bằng ms
SELECT * FROM users WHERE email = 'test@test.com';\`
  },
  {
    id: 'single-point',
    title: 'Single Point of Failure (SPOF)',
    tag: 'Architecture',
    color: 'fuchsia',
    icon: Globe,
    context: 'Deploy toàn bộ backend, frontend, database lên 1 con VPS.',
    story: 'VPS bị lỗi phần cứng hoặc quá tải, toàn bộ hệ thống sập hoàn toàn.',
    impact: 'Downtime kéo dài, mất dữ liệu nếu ổ cứng hỏng.',
    solution: 'Tách Database sang server riêng (hoặc managed DB), chạy ít nhất 2 server app.',
    bad: \`- Server A (1 IP):
  - Node.js App
  - MySQL
  - Redis\`,
    good: \`- Load Balancer
  - App Server 1
  - App Server 2
- Managed Database (Multi-AZ)
- Managed Redis\`
  },
  {
    id: 'no-rate-limit',
    title: 'Không có Rate Limiting',
    tag: 'Security',
    color: 'orange',
    icon: ShieldAlert,
    context: 'API gửi mã OTP qua SMS.',
    story: 'Hacker dùng tool gọi API liên tục 10,000 lần/phút vào 1 số điện thoại.',
    impact: 'Công ty tốn hàng ngàn USD tiền gửi SMS rác, user bị spam SMS.',
    solution: 'Implement Rate Limiting theo IP hoặc User ID.',
    bad: \`app.post('/api/send-otp', async (req, res) => {
  const { phone } = req.body;
  await smsService.send(phone, generateOTP());
  res.send('Sent');
});\`,
    good: \`import rateLimit from 'express-rate-limit';

const otpLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 phút
  max: 3, // Giới hạn 3 lần/15 phút
  message: 'Quá nhiều request, vui lòng thử lại sau.'
});

app.post('/api/send-otp', otpLimiter, async (req, res) => { ... });\`
  },
  {
    id: 'sync-email',
    title: 'Gửi Email Đồng Bộ (Synchronous)',
    tag: 'Background Jobs',
    color: 'indigo',
    icon: Mail,
    context: 'Gửi email chào mừng khi user đăng ký.',
    story: 'App gọi API của dịch vụ gửi email (SendGrid/AWS SES) và đợi phản hồi rồi mới trả kết quả cho user.',
    impact: 'Nếu SendGrid chậm, user phải đợi 10s mới thấy đăng ký xong. Nếu SendGrid lỗi, user không đăng ký được.',
    solution: 'Bỏ việc gửi email vào Message Queue, gửi bất đồng bộ ở background.',
    bad: \`app.post('/register', async (req, res) => {
  const user = await createUser(req.body);
  // Đợi email gửi xong mới phản hồi
  await sendEmail(user.email, 'Welcome!');
  res.send('Success');
});\`,
    good: \`app.post('/register', async (req, res) => {
  const user = await createUser(req.body);
  // Đẩy vào queue, không đợi
  await messageQueue.push('send_email_task', { email: user.email });
  res.send('Success'); // Phản hồi ngay lập tức
});\`
  },
  {
    id: 'pagination-offset',
    title: 'OFFSET Pagination với data lớn',
    tag: 'Performance',
    color: 'sky',
    icon: Zap,
    context: 'Phân trang danh sách giao dịch (hàng triệu dòng).',
    story: 'Dùng LIMIT 10 OFFSET 100000. Database phải đếm và bỏ qua 100,000 dòng đầu tiên.',
    impact: 'Trang càng sâu, query càng chậm (từ vài ms lên vài giây).',
    solution: 'Sử dụng Cursor-based Pagination (Keyset Pagination).',
    bad: \`// Chậm khi offset lớn
SELECT * FROM transactions 
ORDER BY created_at DESC 
LIMIT 10 OFFSET 100000;\`,
    good: \`// Cursor-based (Rất nhanh)
// client truyền id của item cuối cùng ở trang trước
SELECT * FROM transactions 
WHERE id < 98765 
ORDER BY id DESC 
LIMIT 10;\`
  },
  {
    id: 'hardcode-secrets',
    title: 'Hardcode Credentials',
    tag: 'Security',
    color: 'orange',
    icon: Key,
    context: 'Kết nối Database và AWS S3.',
    story: 'Lập trình viên viết thẳng password DB và AWS Access Key vào source code rồi push lên public GitHub.',
    impact: 'Bị bot quét thấy trong vài giây. Hacker lấy trộm DB và dùng AWS đào coin tốn hàng chục ngàn USD.',
    solution: 'Dùng Environment Variables (.env) hoặc Secret Manager.',
    bad: \`const db = mysql.createConnection({
  host: 'db.company.com',
  user: 'admin',
  password: 'SuperSecretPassword123!',
  database: 'production'
});\`,
    good: \`const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});\`
  },
  {
    id: 'no-circuit-breaker',
    title: 'Thiếu Circuit Breaker',
    tag: 'Resilience',
    color: 'teal',
    icon: WifiOff,
    context: 'Service A gọi API của Service B.',
    story: 'Service B bị chậm (timeout 30s). Service A cứ tiếp tục gọi và đợi, làm cạn kiệt toàn bộ thread/connection pool của Service A.',
    impact: 'Lỗi lan truyền (Cascading failure). Cả Service A và B đều sập.',
    solution: 'Dùng Circuit Breaker (ngắt mạch) và Fallback.',
    bad: \`async function getUserProfile() {
  // B chậm -> A kẹt ở đây
  const response = await axios.get('http://service-b/api/profile');
  return response.data;
}\`,
    good: \`const breaker = new CircuitBreaker(getUserProfile, {
  timeout: 3000, // 3s timeout
  errorThresholdPercentage: 50, // Lỗi 50% thì ngắt mạch
  resetTimeout: 30000 // Sau 30s thử lại
});

breaker.fallback(() => ({ name: 'Khách', isFallback: true }));\`
  },
  {
    id: 'memory-leak-closure',
    title: 'Memory Leak do Global/Closure',
    tag: 'Stability',
    color: 'red',
    icon: Cpu,
    context: 'Lưu cache data trong memory của Node.js.',
    story: 'Tạo một mảng/object global và cứ push data vào đó mỗi request mà không bao giờ xoá.',
    impact: 'RAM tăng dần (Memory Leak), đến khi đầy (OOM - Out of Memory) thì server crash.',
    solution: 'Dùng Redis cho cache, hoặc cấu hình TTL (Time To Live) cho memory cache.',
    bad: \`const userCache = {}; // Global object

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  if (!userCache[id]) {
    userCache[id] = db.getUser(id); // Lưu mãi mãi
  }
  res.json(userCache[id]);
});\`,
    good: \`const NodeCache = require("node-cache");
const myCache = new NodeCache({ stdTTL: 60 }); // Sống 60s

app.get('/user/:id', (req, res) => {
  const id = req.params.id;
  let user = myCache.get(id);
  if (!user) {
    user = db.getUser(id);
    myCache.set(id, user);
  }
  res.json(user);
});\`
  },
  {
    id: 'unhandled-promise',
    title: 'Unhandled Promise Rejection',
    tag: 'Stability',
    color: 'red',
    icon: AlertTriangle,
    context: 'Thực thi một tác vụ async (vd: ghi log) nhưng không await và không try/catch.',
    story: 'Tác vụ async đó quăng lỗi. Trong Node.js mới, unhandled promise rejection sẽ làm crash toàn bộ process.',
    impact: 'Server crash đột ngột, PM2/Docker khởi động lại liên tục, mất request của user khác.',
    solution: 'Luôn thêm .catch() cho promise không được await, hoặc handle global ở process.',
    bad: \`app.post('/do-something', (req, res) => {
  // Quên await, và hàm này lỗi
  doHeavyTaskAsync(req.body); 
  
  res.send('OK');
});\`,
    good: \`app.post('/do-something', (req, res) => {
  // Bắt lỗi nếu không dùng await
  doHeavyTaskAsync(req.body).catch(err => {
    logger.error('Heavy task failed:', err);
  });
  
  res.send('OK');
});\`
  },
  {
    id: 'xss-injection',
    title: 'Cross-Site Scripting (XSS)',
    tag: 'Security',
    color: 'orange',
    icon: ShieldOff,
    context: 'User nhập nội dung comment lên blog.',
    story: 'User nhập <script>alert(document.cookie)</script>. Hệ thống lưu nguyên vào DB và in thẳng ra HTML cho mọi người đọc.',
    impact: 'Hacker đánh cắp Session/Cookie của admin hoặc người dùng khác, chiếm đoạt tài khoản.',
    solution: 'Luôn sanitize input hoặc escape output (React mặc định escape, nhưng cẩn thận dangerouslySetInnerHTML).',
    bad: \`// Backend lưu nguyên chuỗi
// Frontend hiển thị (VD trong React):
<div dangerouslySetInnerHTML={{ __html: comment.body }} />\`,
    good: \`// Frontend (React) - Tự động escape:
<div>{comment.body}</div>

// Hoặc nếu cần render HTML, dùng thư viện sanitize:
import DOMPurify from 'dompurify';
<div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.body) }} />\`
  },
  {
    id: 'sql-injection',
    title: 'SQL Injection',
    tag: 'Security',
    color: 'orange',
    icon: Database,
    context: 'Chức năng tìm kiếm hoặc đăng nhập.',
    story: 'Nối chuỗi string trực tiếp vào câu lệnh SQL thay vì dùng Parameterized Query.',
    impact: 'Hacker nhập \`' OR 1=1 --\` để bypass đăng nhập hoặc \`'; DROP TABLE users --\` để xoá data.',
    solution: 'Sử dụng Parameterized Query / Prepared Statements hoặc ORM.',
    bad: \`const username = req.body.username;
// Nối chuỗi nguy hiểm
const query = "SELECT * FROM users WHERE username = '" + username + "'";
db.execute(query);\`,
    good: \`const username = req.body.username;
// Dùng parameter (?)
const query = "SELECT * FROM users WHERE username = ?";
db.execute(query, [username]);\`
  },
  {
    id: 'no-connection-pool',
    title: 'Không dùng Connection Pool',
    tag: 'Performance',
    color: 'sky',
    icon: Layers,
    context: 'Backend kết nối đến Database.',
    story: 'Mỗi request đến, backend lại tạo một connection mới đến DB, query xong thì đóng lại.',
    impact: 'Tạo connection tốn nhiều chi phí (TCP handshake, auth). Quá nhiều request sẽ làm cạn kiệt connection của DB (max_connections).',
    solution: 'Sử dụng Connection Pool để tái sử dụng các kết nối.',
    bad: \`app.get('/users', async (req, res) => {
  // Tạo connection MỚI mỗi request
  const conn = await mysql.createConnection(config);
  const users = await conn.query('SELECT * FROM users');
  conn.end();
  res.json(users);
});\`,
    good: \`// Tạo Pool 1 lần ở file config
const pool = mysql.createPool({ ...config, connectionLimit: 10 });

app.get('/users', async (req, res) => {
  // Lấy connection từ Pool (tái sử dụng)
  const users = await pool.query('SELECT * FROM users');
  res.json(users);
});\`
  },
  {
    id: 'log-sensitive-data',
    title: 'Log Dữ Liệu Nhạy Cảm',
    tag: 'Security',
    color: 'orange',
    icon: Lock,
    context: 'Ghi log request/response để debug.',
    story: 'Log toàn bộ req.body vào file hoặc đẩy lên dịch vụ tập trung (ELK, Datadog), bao gồm cả password, số thẻ tín dụng.',
    impact: 'Bất kỳ ai có quyền xem log (dev, ops) đều thấy thông tin thẻ tín dụng của khách. Vi phạm nghiêm trọng chuẩn PCI-DSS/GDPR.',
    solution: 'Masking (che mờ) hoặc filter các trường nhạy cảm trước khi log.',
    bad: \`app.post('/checkout', (req, res) => {
  // Log cả số thẻ tín dụng (req.body.creditCard)
  logger.info('Checkout request:', req.body);
  // ...
});\`,
    good: \`app.post('/checkout', (req, res) => {
  const safeBody = { ...req.body };
  if (safeBody.creditCard) {
    safeBody.creditCard = '****-****-****-' + safeBody.creditCard.slice(-4);
  }
  logger.info('Checkout request:', safeBody);
  // ...
});\`
  },
  {
    id: 'schema-drift',
    title: 'Sửa Schema Database Trực Tiếp',
    tag: 'DevOps',
    color: 'violet',
    icon: TerminalSquare,
    context: 'Thêm tính năng mới cần thêm cột vào DB.',
    story: 'Dev mở GUI (như DBeaver/Navicat) kết nối thẳng vào DB production và chạy \`ALTER TABLE\` bằng tay.',
    impact: 'Không ai biết schema đã thay đổi lúc nào. Khi deploy lên môi trường khác hoặc server mới, code bị lỗi vì DB không đồng nhất (Schema Drift).',
    solution: 'Sử dụng Database Migration tools (Flyway, Liquibase, Prisma Migrate, Knex).',
    bad: \`// Mở DBeaver kết nối Prod:
ALTER TABLE users ADD COLUMN phone VARCHAR(20);

// Xong báo anh em: "Em thêm cột phone rồi nha!"\`,
    good: \`// Tạo file migration: 20231015_add_phone_to_users.js
exports.up = function(knex) {
  return knex.schema.alterTable('users', t => {
    t.string('phone', 20);
  });
};
// Chạy lệnh migrate ở CI/CD khi deploy\`
  },
  {
    id: 'sync-io-event-loop',
    title: 'Blocking I/O trong Event Loop',
    tag: 'Performance',
    color: 'sky',
    icon: Clock,
    context: 'Đọc cấu hình hoặc file data lớn trong lúc xử lý request.',
    story: 'Dùng \`fs.readFileSync\` trong một API route của Node.js.',
    impact: 'Node.js chạy single-thread. Hàm Sync sẽ khoá toàn bộ Event Loop. Toàn bộ các request khác của user khác đều bị treo chờ đến khi file đọc xong.',
    solution: 'Chỉ dùng Sync ở lúc khởi động app. Trong runtime, bắt buộc dùng Async/Promises.',
    bad: \`app.get('/data', (req, res) => {
  // Khoá toàn bộ server trong lúc đọc file
  const data = fs.readFileSync('/path/to/large/file.json');
  res.json(JSON.parse(data));
});\`,
    good: \`app.get('/data', async (req, res) => {
  // Không khoá server, các request khác vẫn chạy
  const data = await fs.promises.readFile('/path/to/large/file.json');
  res.json(JSON.parse(data));
});\`
  }
];
\`;

// Define extra cases generator
function generateExtraCases() {
  const extra = [];
  const tags = ['Database', 'Concurrency', 'Architecture', 'Security', 'Performance', 'Stability', 'DevOps', 'Background Jobs', 'Resilience'];
  
  const additionalMistakesData = [
    {
      id: "bulk-insert-loop", title: "Insert DB trong vòng lặp", tag: "Database", color: "rose", icon: "Database",
      context: "Import file Excel/CSV chứa 10,000 dòng dữ liệu người dùng.",
      story: "Đọc từng dòng dữ liệu và gọi lệnh INSERT 10,000 lần liên tục vào database.",
      impact: "Mất nhiều phút để chạy xong, tạo quá tải kết nối và transaction log trên Database.",
      solution: "Sử dụng Bulk Insert / Batch Insert để ghi nhiều records trong 1 câu query.",
      bad: "for(let user of users) {\n  await db.query('INSERT INTO users...', user);\n}",
      good: "await db.query('INSERT INTO users (name, email) VALUES ?', [users.map(u => [u.name, u.email])]);"
    },
    {
      id: "cache-stampede", title: "Cache Stampede (Hiệu ứng bầy đàn)", tag: "Performance", color: "sky", icon: "Zap",
      context: "Dữ liệu trang chủ lấy từ DB, cache trên Redis trong 5 phút.",
      story: "Đúng lúc cache hết hạn (expire), có 1000 requests cùng lúc ập tới. Cả 1000 requests đều thấy cache miss và đồng loạt đập thẳng vào DB.",
      impact: "Database nhận 1000 câu query nặng cùng một khoảnh khắc, CPU vọt lên 100%, sập DB.",
      solution: "Sử dụng kỹ thuật Mutex Lock/Distributed Lock khi fetch data, hoặc refresh cache ở background trước khi nó hết hạn.",
      bad: "let data = cache.get('home');\nif(!data) {\n  data = await db.getHeavyData(); // 1000 req cùng gọi\n  cache.set('home', data);\n}",
      good: "// Dùng lock\nlet data = cache.get('home');\nif(!data) {\n  if(await lock.acquire('home_lock')) {\n    data = await db.getHeavyData();\n    cache.set('home', data);\n    lock.release();\n  } else {\n    // Đợi lock hoặc trả về cache cũ (stale data)\n  }\n}"
    },
    {
      id: "cors-wildcard", title: "CORS Config: Allow Origin *", tag: "Security", color: "orange", icon: "ShieldOff",
      context: "Thiết lập bảo mật API CORS để frontend gọi được.",
      story: "Dev lười cấu hình cụ thể, bật 'Access-Control-Allow-Origin: *' và cho phép gửi credentials.",
      impact: "Bất kỳ trang web nào (kể cả web lừa đảo) cũng có thể gọi API bằng cookie/session của người dùng, dẫn đến lỗi CSRF nghiêm trọng.",
      solution: "Chỉ định rõ domain cụ thể (whitelist) trong cấu hình CORS.",
      bad: "app.use(cors({\n  origin: '*',\n  credentials: true\n}));",
      good: "app.use(cors({\n  origin: 'https://trustedsite.com',\n  credentials: true\n}));"
    },
    {
      id: "fat-payload", title: "API trả về dữ liệu thừa (Overfetching)", tag: "Performance", color: "sky", icon: "HardDrive",
      context: "Lấy danh sách người dùng để hiển thị tên và avatar trên danh sách.",
      story: "Câu query SELECT * trả về toàn bộ trường (bao gồm password_hash, token, bio dài, settings).",
      impact: "Lộ dữ liệu nhạy cảm ra frontend. Kích thước payload API lớn (vài MB) làm chậm thời gian tải mạng.",
      solution: "Chỉ SELECT các trường cần thiết, sử dụng DTO/ViewModel để lọc dữ liệu trả về.",
      bad: "const users = await db.query('SELECT * FROM users');\nres.json(users);",
      good: "const users = await db.query('SELECT id, name, avatar FROM users');\nres.json(users);"
    },
    {
      id: "jwt-no-expiration", title: "JWT Token sống vô hạn (No Expiration)", tag: "Security", color: "orange", icon: "Key",
      context: "Hệ thống xác thực bằng JSON Web Token.",
      story: "Phát hành token nhưng không set thuộc tính exp (expiration).",
      impact: "Nếu hacker lấy cắp được token này, họ sẽ dùng được mãi mãi, không cách nào thu hồi hiệu quả ngoài việc đổi Secret Key.",
      solution: "Luôn set thời hạn ngắn cho Access Token (15m - 1h) và dùng Refresh Token cơ chế xoay vòng.",
      bad: "const token = jwt.sign({ userId: user.id }, SECRET_KEY);",
      good: "const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '15m' });"
    },
    {
      id: "db-no-transaction", title: "Cập nhật nhiều bảng không có Transaction", tag: "Database", color: "rose", icon: "RefreshCw",
      context: "Quy trình chuyển tiền: Trừ tiền người gửi, Cộng tiền người nhận.",
      story: "Trừ tiền thành công, nhưng lúc cộng tiền thì server hoặc mạng bị lỗi.",
      impact: "Dữ liệu bị sai lệch (Inconsistent State). Tiền của người gửi bị mất nhưng người nhận không có tiền.",
      solution: "Bọc các thao tác thay đổi dữ liệu liên quan trong một Database Transaction (ACID).",
      bad: "await db.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');\n// Mạng đứt lúc này -> Lỗi\nawait db.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');",
      good: "const trx = await db.beginTransaction();\ntry {\n  await trx.query('UPDATE accounts SET balance = balance - 100 WHERE id = 1');\n  await trx.query('UPDATE accounts SET balance = balance + 100 WHERE id = 2');\n  await trx.commit();\n} catch (e) {\n  await trx.rollback();\n}"
    },
    {
      id: "dead-letter-queue", title: "Queue không có Dead Letter", tag: "Background Jobs", color: "indigo", icon: "Mail",
      context: "Hệ thống xử lý hóa đơn chạy qua RabbitMQ/Kafka.",
      story: "Một tin nhắn hóa đơn có định dạng lỗi làm worker bị crash. Tin nhắn không được xóa và liên tục đưa lại vào queue (Infinite Retry loop).",
      impact: "Worker kẹt mãi mãi vào tin nhắn lỗi, các hóa đơn khác xếp hàng phía sau không bao giờ được xử lý (Head-of-line blocking).",
      solution: "Cấu hình số lần retry tối đa, sau đó đẩy tin nhắn lỗi sang Dead Letter Queue (DLQ) để dev kiểm tra tay.",
      bad: "channel.consume('invoice_queue', async (msg) => {\n  // Lỗi ở đây nhưng không handle\n  await processInvoice(msg);\n  channel.ack(msg);\n});",
      good: "// Cấu hình RabbitMQ với x-dead-letter-exchange\ntry {\n  await processInvoice(msg);\n  channel.ack(msg);\n} catch (err) {\n  if(retryCount > 3) channel.nack(msg, false, false); // Ném vào DLQ\n  else channel.nack(msg, false, true); // Thử lại\n}"
    },
    {
      id: "docker-latest", title: "Deploy Image dùng tag ':latest'", tag: "DevOps", color: "violet", icon: "Box",
      context: "Cấu hình Docker Compose hoặc Kubernetes.",
      story: "Trong docker-compose.yml ghi image: my-app:latest hoặc node:latest.",
      impact: "Mỗi lần container restart hoặc auto-scaling, nó tự động tải bản code mới nhất thay vì bản ổn định đang dùng. Gây lỗi hệ thống đột ngột do version update âm thầm.",
      solution: "Luôn ghim cụ thể version tag (immutable tags) như node:18.16.0-alpine hoặc my-app:v1.2.3.",
      bad: "services:\n  app:\n    image: node:latest",
      good: "services:\n  app:\n    image: node:18.16.0-alpine"
    },
    {
      id: "floating-point-money", title: "Dùng Float/Double để lưu Tiền", tag: "Architecture", color: "fuchsia", icon: "Hash",
      context: "Tính toán tiền tệ và giỏ hàng.",
      story: "Sử dụng kiểu dữ liệu Float hoặc Double trong DB và Javascript để cộng số tiền (0.1 + 0.2).",
      impact: "Lỗi làm tròn IEEE 754 (0.1 + 0.2 = 0.30000000000000004). Dẫn đến sai lệch số dư, thanh toán qua cổng thất bại do sai checksum.",
      solution: "Lưu tiền ở đơn vị nhỏ nhất (ví dụ: cents) dưới dạng Integer, hoặc dùng kiểu DECIMAL/NUMERIC trong database.",
      bad: "let price = 0.1;\nlet tax = 0.2;\nlet total = price + tax; // 0.30000000000000004",
      good: "// Lưu theo cents\nlet priceCents = 10;\nlet taxCents = 20;\nlet totalCents = priceCents + taxCents; // 30\nlet displayTotal = totalCents / 100; // 0.30"
    },
    {
      id: "missing-timeout", title: "Gọi API bên thứ 3 không Timeout", tag: "Resilience", color: "teal", icon: "Clock",
      context: "Gọi cổng thanh toán (Momo, VNPay) hoặc gửi SMS.",
      story: "Dùng fetch hoặc axios gọi API nhưng quên set trường timeout.",
      impact: "Mặc định timeout của Node.js là rất lớn (khoảng 2 phút). Nếu bên thứ 3 treo, server của bạn cũng treo theo 2 phút, dẫn tới cạn kiệt tài nguyên (Thread exhaustion).",
      solution: "Luôn thiết lập timeout hợp lý (vd 5s - 10s) cho mọi external call.",
      bad: "const response = await axios.get('https://slow-api.com/status');",
      good: "const response = await axios.get('https://slow-api.com/status', {\n  timeout: 5000 // 5 giây\n});"
    },
    {
      id: "config-in-code", title: "Lưu cấu hình môi trường trong Code", tag: "DevOps", color: "violet", icon: "Settings",
      context: "Biến URL của database, cổng thanh toán.",
      story: "Code ghi cứng if (env === 'prod') url = 'pro-db' else url = 'dev-db'.",
      impact: "Mỗi lần đổi mật khẩu DB hoặc đổi port phải sửa code, commit và deploy lại toàn bộ ứng dụng. Khó chuyển giao cho team DevOps.",
      solution: "Áp dụng The 12-Factor App: Tách rời hoàn toàn cấu hình khỏi code, sử dụng biến môi trường (Env Vars).",
      bad: "const apiKeys = {\n  dev: 'dev_key_123',\n  prod: 'prod_key_999'\n};\nconst key = apiKeys[process.env.NODE_ENV];",
      good: "const key = process.env.PAYMENT_API_KEY;"
    },
    {
      id: "no-pagination", title: "Lấy toàn bộ dữ liệu không phân trang", tag: "Performance", color: "sky", icon: "HardDrive",
      context: "Hiển thị danh sách log hoặc sản phẩm.",
      story: "Viết API `SELECT * FROM system_logs`, tháng đầu chạy nhanh vì ít dữ liệu.",
      impact: "Vài tháng sau log lên 1 triệu dòng, API trả về payload 50MB, server Crash do out of memory, client đứng máy vì xử lý JSON quá lớn.",
      solution: "Luôn áp dụng giới hạn (LIMIT) và phân trang cho các endpoint trả về danh sách.",
      bad: "app.get('/logs', async (req, res) => {\n  const logs = await db.query('SELECT * FROM logs');\n  res.json(logs);\n});",
      good: "app.get('/logs', async (req, res) => {\n  const limit = req.query.limit || 50;\n  const page = req.query.page || 1;\n  const offset = (page - 1) * limit;\n  const logs = await db.query('SELECT * FROM logs LIMIT ? OFFSET ?', [limit, offset]);\n  res.json(logs);\n});"
    },
    {
      id: "default-credentials", title: "Không đổi mật khẩu mặc định", tag: "Security", color: "orange", icon: "Lock",
      context: "Cài đặt Redis, MongoDB, RabbitMQ, Jenkins.",
      story: "Cài bằng Docker nhanh gọn nên để nguyên password admin/admin hoặc không có password.",
      impact: "Hacker quét cổng (port scan) mở ra internet, truy cập và xoá toàn bộ data, để lại tin nhắn đòi tiền chuộc (Ransomware).",
      solution: "Bắt buộc đổi mật khẩu mạnh, disable default accounts, bind vào localhost (127.0.0.1) thay vì 0.0.0.0 nếu không cần expose.",
      bad: "# docker-compose.yml\nservices:\n  redis:\n    image: redis\n    ports:\n      - \"6379:6379\"",
      good: "# docker-compose.yml\nservices:\n  redis:\n    image: redis\n    command: redis-server --requirepass ${REDIS_PASSWORD}\n    ports:\n      - \"127.0.0.1:6379:6379\""
    },
    {
      id: "fat-models", title: "Nhồi nhét logic vào Controller", tag: "Architecture", color: "fuchsia", icon: "Layers",
      context: "Phát triển tính năng mua hàng.",
      story: "Toàn bộ logic tính thuế, giảm giá, tạo hóa đơn, gửi email được viết thẳng vào 1 hàm controller dài 1000 dòng.",
      impact: "Khó bảo trì, không thể viết Unit Test, không thể tái sử dụng logic tính thuế cho tính năng khác (như API đối tác).",
      solution: "Tách logic kinh doanh (Business Logic) ra các Service layer, Controller chỉ nhận Request và trả Response.",
      bad: "app.post('/checkout', async (req, res) => {\n  // 1000 dòng code xử lý thuế, kho, db, email...\n});",
      good: "app.post('/checkout', async (req, res) => {\n  const orderDetails = req.body;\n  const order = await CheckoutService.process(orderDetails);\n  res.json(order);\n});"
    },
    {
      id: "retry-storm", title: "Retry bão (Retry Storm)", tag: "Resilience", color: "teal", icon: "RefreshCw",
      context: "Client gọi API thất bại do server quá tải.",
      story: "Client lập tức gọi lại API không có thời gian chờ (immediate retry) trong vòng lặp.",
      impact: "Server vốn đang quá tải nay nhận thêm hàng nghìn request retry từ các client khác nhau, dẫn tới sập dứt điểm không thể phục hồi.",
      solution: "Sử dụng Exponential Backoff kết hợp Jitter (Thử lại với thời gian trễ tăng dần và ngẫu nhiên một chút).",
      bad: "while(retries > 0) {\n  try { return await api.call(); }\n  catch(e) { retries--; }\n}",
      good: "const delay = (attempt) => Math.pow(2, attempt) * 100 + Math.random() * 50;\n// Đợi 100ms, 200ms, 400ms... cộng chút random\nawait sleep(delay(currentAttempt));"
    },
    {
      id: "in-memory-sessions", title: "Lưu Session trên RAM Server", tag: "Architecture", color: "fuchsia", icon: "ServerCrash",
      context: "Hệ thống có form đăng nhập giữ trạng thái người dùng.",
      story: "Lưu sessions (phiên đăng nhập) vào mảng hoặc biến trong RAM của Node.js/Java.",
      impact: "Khi mở rộng ra nhiều servers (Load Balancing), user bị văng ra bắt login lại vì request tiếp theo trúng server khác không có session đó (Stateful).",
      solution: "Kiến trúc Stateless: Lưu session trên DB tập trung (Redis, Memcached) hoặc sử dụng JWT.",
      bad: "const sessions = {}; // Lưu trong RAM\napp.post('/login', (req, res) => {\n  sessions[req.sessionID] = user;\n});",
      good: "const RedisStore = require('connect-redis')(session);\napp.use(session({\n  store: new RedisStore({ client: redisClient }),\n  secret: 'keyboard cat'\n}));"
    },
    {
      id: "ignore-db-timezone", title: "Không chuẩn hóa Timezone DB", tag: "Database", color: "rose", icon: "Clock",
      context: "Ứng dụng phục vụ người dùng đa quốc gia.",
      story: "Server lưu ngày giờ hiện tại theo giờ local của máy chủ (vd: Asia/Ho_Chi_Minh).",
      impact: "Lỗi tính toán ngày tháng. Chuyển server sang khu vực khác dữ liệu sẽ bị lệch. Sinh nhật user sai 1 ngày.",
      solution: "Luôn luôn lưu trữ Datetime ở chuẩn UTC (Timezone 0) vào Database. Chỉ convert sang Local Time ở phía Frontend (trình duyệt).",
      bad: "INSERT INTO events (name, time) VALUES ('Meeting', '2023-10-15 08:00:00'); // Giờ local",
      good: "INSERT INTO events (name, time) VALUES ('Meeting', '2023-10-15 01:00:00'); // Giờ UTC"
    },
    {
      id: "no-foreign-keys", title: "Bỏ qua Khóa ngoại (Foreign Keys)", tag: "Database", color: "rose", icon: "GitBranch",
      context: "Bảng Orders liên kết với bảng Users.",
      story: "Để 'insert cho nhanh', dev bỏ qua không thiết lập ràng buộc FK (Foreign Key) trong SQL.",
      impact: "User bị xóa nhưng Orders của user đó vẫn còn (Orphan data). Bug khi lấy dữ liệu sẽ gây Null Pointer Exception.",
      solution: "Sử dụng Referential Integrity (Khóa ngoại) để DB tự động quản lý dữ liệu mồ côi (ON DELETE CASCADE) hoặc chặn xoá.",
      bad: "CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  user_id INT -- Không ràng buộc\n);",
      good: "CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  user_id INT,\n  CONSTRAINT fk_user FOREIGN KEY (user_id) REFERENCES users(id)\n);"
    },
    {
      id: "large-react-state", title: "Quản lý quá nhiều State ở Root", tag: "Architecture", color: "fuchsia", icon: "Layers",
      context: "Frontend React App.",
      story: "Đặt tất cả state (user, products, cart, UI theme, modal status) vào App.jsx hoặc Redux Store toàn cục.",
      impact: "Bất kỳ thay đổi nhỏ nào (vd gõ chữ vào input) cũng kích hoạt re-render toàn bộ DOM tree, làm UI giật lag trầm trọng.",
      solution: "Đẩy state xuống component con (Colocation). Chỉ đưa lên Store những state thực sự cần share (Global State).",
      bad: "function App() {\n  const [inputValue, setInputValue] = useState('');\n  // Gõ phím làm CẢ App re-render\n  return <Header /><Sidebar /><input onChange={e=>setInputValue(e.target.value)} />;\n}",
      good: "function SearchInput() {\n  // State nội bộ, chỉ component này re-render\n  const [val, setVal] = useState('');\n  return <input onChange={e=>setVal(e.target.value)} />;\n}"
    },
    {
      id: "blind-npm-install", title: "Cài thư viện mù quáng", tag: "Security", color: "orange", icon: "Box",
      context: "Thêm tính năng phụ (như format ngày tháng, kiểm tra chẵn lẻ).",
      story: "Thấy thư viện trên mạng là npm install không kiểm tra lượt tải, cập nhật gần nhất hay mã nguồn.",
      impact: "Bị dính mã độc đánh cắp biến môi trường (Supply Chain Attack) hoặc tăng dung lượng bundle vô lý (node_modules hố đen).",
      solution: "Hạn chế thư viện bên thứ 3 cho logic đơn giản. Kiểm tra kỹ tính phổ biến, bảo trì và dung lượng trên npmjs.",
      bad: "npm install is-even\nnpm install left-pad",
      good: "const isEven = (n) => n % 2 === 0;\nconst padded = str.padStart(5, '0');"
    },
    {
      id: "no-graceful-shutdown", title: "Tắt server đột ngột (No Graceful Shutdown)", tag: "DevOps", color: "violet", icon: "ServerCrash",
      context: "Khi cập nhật phiên bản mới, CI/CD kill process cũ và bật process mới.",
      story: "Gửi tín hiệu SIGKILL (kill -9). Server tắt bụp trong khi đang xử lý thanh toán dở dang.",
      impact: "Request của khách hàng bị đứt kết nối (502 Bad Gateway), database đang update nửa chừng.",
      solution: "Cấu hình Graceful Shutdown (nghe tín hiệu SIGTERM, dừng nhận request mới, đợi request hiện tại xong rồi mới tắt).",
      bad: "process.exit(1); // Hoặc kill -9 từ bên ngoài",
      good: "process.on('SIGTERM', () => {\n  server.close(() => {\n    db.close();\n    process.exit(0);\n  });\n});"
    },
    {
      id: "idempotency-missing", title: "API không có tính Idempotent", tag: "Resilience", color: "teal", icon: "RefreshCw",
      context: "API xử lý nạp thẻ cào hoặc thanh toán.",
      story: "Thiếu cơ chế chống trùng lặp. Mỗi lần POST là hệ thống thực thi lệnh bất chấp.",
      impact: "Mạng rớt giữa chừng, app tự động retry lại POST -> User bị nạp tiền 2 lần cho 1 mã giao dịch.",
      solution: "Thiết kế API theo tính Idempotent: Client gửi kèm 'Idempotency-Key' duy nhất cho mỗi action. Server check key này để không làm 2 lần.",
      bad: "app.post('/charge', async (req, res) => {\n  await doCharge(req.body.amount);\n  res.send('Done');\n});",
      good: "app.post('/charge', async (req, res) => {\n  const key = req.headers['idempotency-key'];\n  if (await isProcessed(key)) return res.send('Already Done');\n  await doCharge(req.body.amount);\n  await markProcessed(key);\n});"
    },
    {
      id: "log-rotate-missing", title: "Không giới hạn file Log", tag: "DevOps", color: "violet", icon: "FileWarning",
      context: "Cấu hình ứng dụng ghi log ra file trên đĩa cứng.",
      story: "Ứng dụng liên tục ghi \`app.log\` qua hàng tháng, không ai dọn dẹp.",
      impact: "Ổ cứng VPS bị đầy (100% Disk Space). Database không thể ghi thêm data, toàn bộ hệ thống sập.",
      solution: "Dùng các công cụ Log Rotation (logrotate trên Linux) hoặc Winston/Pino Rotate file theo ngày và xoá file cũ.",
      bad: "fs.appendFileSync('app.log', logData);",
      good: "const transport = new winston.transports.DailyRotateFile({\n  filename: 'application-%DATE%.log',\n  maxFiles: '14d', // Xoá sau 14 ngày\n  maxSize: '20m'\n});"
    },
    {
      id: "no-healthcheck", title: "Không có Health Check API", tag: "DevOps", color: "violet", icon: "Activity",
      context: "Triển khai app trên Docker Swarm / Kubernetes / Load Balancer.",
      story: "Load Balancer chỉ ping port 80 xem mở không, nhưng nội tại DB đã sập nên app chết đứng.",
      impact: "Load balancer vẫn đẩy traffic vào node đang chết (chỉ trả về 500 error) thay vì chuyển sang node khoẻ.",
      solution: "Viết endpoint \`/healthz\` để trả về trạng thái tổng thể của hệ thống (bao gồm DB, Cache connection).",
      bad: "Chỉ kiểm tra ping port hoặc không có báo cáo.",
      good: "app.get('/health', async (req, res) => {\n  try {\n    await db.query('SELECT 1');\n    res.status(200).json({status: 'OK'});\n  } catch(e) {\n    res.status(503).json({status: 'DOWN'});\n  }\n});"
    },
    {
      id: "god-object", title: "God Object (Lớp toàn năng)", tag: "Architecture", color: "fuchsia", icon: "Layers",
      context: "Thiết kế class quản lý user.",
      story: "Tạo class \`UserManager\` chứa 5000 dòng code, lo từ việc login, gửi email, xoá avatar, tính điểm thưởng.",
      impact: "Mọi thay đổi đều phải động vào class này. Gây xung đột git (merge conflict) liên tục, khó đọc, dễ sinh bug lan truyền.",
      solution: "Áp dụng Single Responsibility Principle (S trong SOLID). Tách thành \`AuthService\`, \`EmailService\`, \`AvatarService\`.",
      bad: "class UserManager {\n  login() {}\n  sendWelcomeEmail() {}\n  compressAvatar() {}\n  calculateRewards() {}\n}",
      good: "class AuthService { login() {} }\nclass CommunicationService { sendEmail() {} }\nclass ImageService { compress() {} }"
    },
    {
      id: "tight-coupling", title: "Tight Coupling (Kết dính code cao)", tag: "Architecture", color: "fuchsia", icon: "GitBranch",
      context: "Service Xử lý hoá đơn muốn gửi SMS thông báo.",
      story: "Trong code hoá đơn, khởi tạo trực tiếp instance của dịch vụ TwilioSMS.",
      impact: "Khi muốn đổi sang dịch vụ VietGuys SMS, phải sửa code trong class Hóa Đơn và sửa ở 50 file khác.",
      solution: "Dùng Dependency Injection (DI) hoặc Event-driven architecture.",
      bad: "class InvoiceService {\n  process() {\n    const sms = new TwilioSMS();\n    sms.send('Done');\n  }\n}",
      good: "class InvoiceService {\n  constructor(smsProvider) {\n    this.smsProvider = smsProvider;\n  }\n  process() {\n    this.smsProvider.send('Done');\n  }\n}"
    },
    {
      id: "regex-dos", title: "ReDoS (Regular Expression DoS)", tag: "Security", color: "orange", icon: "Cpu",
      context: "Dùng Regex (Biểu thức chính quy) để validate email hoặc định dạng chuỗi.",
      story: "Viết Regex phức tạp có độ phức tạp hàm mũ (ví dụ \`^([a-z]+)*$\`). Hacker gửi payload chuỗi cực dài.",
      impact: "Chỉ 1 request của hacker làm engine tính toán Regex treo CPU trong vòng 5 phút (Event loop blocking). Server sập.",
      solution: "Tránh Regex lồng nhau phức tạp. Dùng thư viện validator chuẩn, hoặc giới hạn độ dài input trước khi chạy Regex.",
      bad: "const emailRegex = /^([a-zA-Z0-9]+)*$/;\n// Chuỗi dài sẽ treo CPU\nemailRegex.test('aaaaaaaaaaaaaaaaaaaaaaaaaaaaa!');",
      good: "if (input.length > 50) return false;\n// Hoặc dùng thư viện nhẹ, chuẩn\nimport { isEmail } from 'validator';\nisEmail(input);"
    },
    {
      id: "exposing-stack-trace", title: "Để lộ Stack Trace ra Production", tag: "Security", color: "orange", icon: "TerminalSquare",
      context: "Khi có lỗi (Exception) xảy ra ở backend.",
      story: "Để nguyên cấu hình debug, API trả về toàn bộ Stack Trace báo lỗi (dòng code số mấy, file tên gì, query SQL gốc).",
      impact: "Hacker biết được hệ thống đang dùng thư viện gì, version bao nhiêu, cấu trúc thư mục ra sao để tấn công chính xác lỗ hổng.",
      solution: "Bắt lỗi tập trung (Global Exception Handler) và trả về thông báo lỗi chung chung ('Internal Server Error') trên Production.",
      bad: "app.use((err, req, res, next) => {\n  res.status(500).json({ error: err.stack }); // Lộ hết ruột gan\n});",
      good: "app.use((err, req, res, next) => {\n  logger.error(err); // Lưu log nội bộ\n  res.status(500).json({ error: 'Đã có lỗi hệ thống xảy ra.' });\n});"
    },
    {
      id: "ignoring-cache-headers", title: "Không dùng Cache Headers cho Static files", tag: "Performance", color: "sky", icon: "Zap",
      context: "Phục vụ file JS, CSS, Hình ảnh.",
      story: "Gửi file tĩnh về cho browser mà không có HTTP Cache-Control header.",
      impact: "Khách vào trang nào browser cũng tải lại toàn bộ file ảnh, js, css (vài MB). Load trang cực chậm, tốn băng thông máy chủ.",
      solution: "Cấu hình Cache-Control (ví dụ: max-age=31536000) và dùng Content Hash trong tên file (như \`main.[hash].js\`) để cache mạnh mẽ.",
      bad: "// Header trả về mặc định\nContent-Type: image/jpeg",
      good: "// Header trả về\nContent-Type: image/jpeg\nCache-Control: public, max-age=31536000, immutable"
    },
    {
      id: "websocket-broadcast", title: "Broadcast WebSocket vô tội vạ", tag: "Performance", color: "sky", icon: "Network",
      context: "Ứng dụng chat hoặc cập nhật bảng giá chứng khoán qua WebSocket.",
      story: "Khi có tin nhắn mới, vòng lặp FOR qua toàn bộ danh sách hàng vạn connections và gửi đi.",
      impact: "Nghẽn cổ chai CPU và Network. Tăng độ trễ, memory leak nếu socket bị đứt mà không xoá khỏi danh sách.",
      solution: "Dùng các thư viện quản lý room/channel như Socket.io, Redis Pub/Sub, hoặc chuyển qua Pusher/Firebase nếu quá lớn.",
      bad: "const clients = [...]; // 10k clients\nfunction broadcast(msg) {\n  clients.forEach(c => c.send(msg)); // Rất chậm và chặn luồng\n}",
      good: "// Sử dụng tính năng Rooms có sẵn hoặc Pub/Sub backend\nio.to('room_chứng_khoán_1').emit('update', msg);"
    },
    {
      id: "no-backups", title: "Không có kịch bản Backup Database", tag: "Resilience", color: "teal", icon: "HardDrive",
      context: "Hệ thống đang chạy ngon lành.",
      story: "Chỉ backup database ra cùng ổ cứng máy chủ chạy DB, hoặc chưa bao giờ diễn tập khôi phục (Restore).",
      impact: "Mất máy chủ -> mất luôn file backup. Hoặc có file backup nhưng lúc cần lấy ra lại bị hỏng (corrupted). Đi tong sự nghiệp.",
      solution: "Chiến lược 3-2-1: 3 bản copy, 2 phương tiện khác nhau, 1 bản off-site (như AWS S3). Phải test việc restore định kỳ.",
      bad: "// Crontab backup cùng máy:\nmysqldump > /var/backup/db.sql",
      good: "// Backup tự đẩy lên S3 hoặc dùng Managed DB\nmysqldump | aws s3 cp - s3://my-backup-bucket/db.sql\n// Tháng 1 lần lôi ra chạy thử"
    },
    {
      id: "premature-optimization", title: "Tối ưu sớm (Premature Optimization)", tag: "Architecture", color: "fuchsia", icon: "Clock",
      context: "Dự án mới khởi tạo, yêu cầu tải 100 users.",
      story: "Dev tốn 3 tháng cài đặt Kubernetes, Microservices, Kafka, Redis Cluster cho dự án làm đồ án môn học hoặc startup MVPs.",
      impact: "Chậm ra mắt sản phẩm (Time to market), chi phí duy trì cao (hàng trăm USD/tháng), code quá phức tạp không ai maintain nổi.",
      solution: "YAGNI (You Aren't Gonna Need It). Bắt đầu với Monolith đơn giản (Majestic Monolith), chỉ nâng cấp khi thực sự gặp điểm nghẽn (bottleneck).",
      bad: "- User Service\n- Product Service\n- Auth Service\n- API Gateway\n- Kafka",
      good: "- Monolith NodeJS App\n- Postgres Database\n(Code module hóa tốt để sau này dễ tách)"
    }
  ];

  additionalMistakesData.forEach(item => {
    // We don't map icon correctly here as string, so we'll do it cleanly in JS string map
    extra.push(`{
    id: '${item.id}',
    title: '${item.title}',
    tag: '${item.tag}',
    color: '${item.color}',
    icon: ${item.icon},
    context: '${item.context}',
    story: '${item.story}',
    impact: '${item.impact}',
    solution: '${item.solution}',
    bad: \`${item.bad.replace(/`/g, '\\`')}\`,
    good: \`${item.good.replace(/`/g, '\\`')}\`
  }`);
  });
  
  return extra.join(',\\n  ');
}

const fileContent = existingData.replace('];', ',\\n  ' + generateExtraCases() + '\\n];');

fs.writeFileSync('src/data/antiPatternsData.js', fileContent, 'utf-8');
console.log('Done writing antiPatternsData.js');
