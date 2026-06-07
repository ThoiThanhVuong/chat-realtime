# 💬 Moji - Realtime Chat Application

**Moji** là một ứng dụng nhắn tin thời gian thực (realtime) được thiết kế hiện đại, mượt mà và tối ưu hiệu suất. Dự án được phát triển theo cấu trúc Monorepo chia thành hai phần rõ rệt: **Frontend (React + TypeScript + Vite + Tailwind CSS v4)** và **Backend (NodeJS + Express + MongoDB + Socket.IO)**.

---

## 🚀 Các Tính Năng Nổi Bật

### 🔑 Xác thực & Quản lý người dùng
* **Đăng ký & Đăng nhập**: Bảo mật với mật khẩu được mã hóa bcrypt và xác thực JWT qua HttpOnly Cookie.
* **Tự động làm mới phiên (Silent Refresh)**: Sử dụng Refresh Token để duy trì trạng thái đăng nhập an toàn.
* **Hồ sơ Cá nhân**: Cập nhật thông tin hiển thị (Display Name), Bio, số điện thoại và thay đổi mật khẩu.
* **Ảnh đại diện linh hoạt**: Hỗ trợ tải ảnh đại diện lên Cloudinary trực tiếp từ giao diện.

### 👥 Hệ thống Bạn bè (Friend System)
* **Tìm kiếm người dùng**: Tìm kiếm bạn bè qua Username.
* **Gửi/Nhận lời mời kết bạn**: Quản lý danh sách lời mời đã gửi và nhận. Chấp nhận hoặc từ chối yêu cầu kết bạn.
* **Trạng thái Hoạt động**: Theo dõi danh sách bạn bè đang trực tuyến (Online Status) thời gian thực nhờ Socket.IO.

### 💬 Trò chuyện Thời gian thực (Realtime Chat)
* **Trò chuyện cá nhân (1-1 Chat)**: Nhắn tin trực tiếp với bạn bè một cách tức thời.
* **Trò chuyện nhóm (Group Chat)**: Tạo phòng chat nhóm với nhiều thành viên dễ dàng.
* **Trạng thái Tin nhắn**:
  * Đánh dấu đã xem (Seen) trực quan.
  * Hiển thị nội dung tin nhắn mới nhất trong danh sách hội thoại.
  * Số lượng tin nhắn chưa đọc (Unread Count).
* **Chia sẻ hình ảnh**: Tải ảnh lên và gửi trực tiếp trong phòng chat qua Cloudinary.
* **Bộ chọn Emoji**: Tích hợp sẵn `@emoji-mart/react` giúp giao tiếp sinh động hơn.

### 🎨 Giao diện & Trải nghiệm (UI/UX)
* **Giao diện hiện đại**: Sử dụng Tailwind CSS v4 mới nhất kết hợp với các component tối ưu từ Shadcn/UI và Radix/Base UI.
* **Chế độ Sáng/Tối (Light/Dark Mode)**: Chuyển đổi linh hoạt và tự động lưu trạng thái qua Zustand Store.
* **Cuộn vô hạn (Infinite Scroll)**: Tải tin nhắn cũ mượt mà khi cuộn lên đầu đoạn hội thoại bằng `react-infinite-scroll-component` kết hợp phân trang dùng Cursor ở backend.
* **Hiệu ứng mượt mà & Skeletons**: Các bộ khung tải dữ liệu (Skeleton) và hiệu ứng chuyển động tối ưu hóa trải nghiệm người dùng khi mạng chậm.

---

## 🛠️ Công Nghệ Sử Dụng

### Frontend
* **Core**: React 18, TypeScript, Vite
* **Styling & UI**: Tailwind CSS v4, Shadcn/UI, Radix (Base UI), Lucide React
* **State Management**: Zustand (Quản lý Auth, Socket, Chat, Friend, Theme...)
* **Routing**: React Router v7
* **API Client**: Axios (Hỗ trợ Interceptors để tự động chèn JWT token và xử lý Refresh Token khi hết hạn)
* **Realtime**: Socket.IO-Client
* **Form & Validation**: React Hook Form + Zod
* **Thông báo**: Sonner

### Backend
* **Runtime**: NodeJS (ES Modules)
* **Framework**: ExpressJS
* **Database**: MongoDB + Mongoose
* **Realtime**: Socket.IO (Xác thực Socket bằng middleware JWT)
* **Tài nguyên**: Multer & Cloudinary (Upload ảnh)
* **Bảo mật**: Bcrypt, Cookie-parser, Cors
* **API Documentation**: Swagger UI Express (`/api-docs`)

---

## 📂 Cấu Trúc Thư Mục Dự Án

```text
moji/
├── backend/                  # Mã nguồn phía máy chủ (Backend)
│   ├── src/
│   │   ├── controllers/      # Hàm xử lý logic API
│   │   ├── libs/             # Kết nối Database, cấu hình thư viện
│   │   ├── middlewares/      # Middleware xác thực, phân quyền
│   │   ├── models/           # Định nghĩa Schema MongoDB (Mongoose)
│   │   ├── routes/           # Định nghĩa các Route API
│   │   ├── socket/           # Xử lý các sự kiện Socket.IO
│   │   ├── utils/            # Các hàm tiện ích
│   │   ├── swagger.json      # File cấu hình Swagger API Docs
│   │   └── server.js         # Điểm chạy máy chủ (Server Entrypoint)
│   └── package.json
│
├── frontend/                 # Mã nguồn phía người dùng (Frontend)
│   ├── src/
│   │   ├── components/       # Các Component UI (chat, auth, profile, ui...)
│   │   ├── hooks/            # Custom Hooks
│   │   ├── lib/              # Cấu hình Axios, hàm utils
│   │   ├── pages/            # Các trang giao diện chính
│   │   ├── services/         # Hàm gọi API gửi đến Backend
│   │   ├── stores/           # Zustand Stores quản lý State
│   │   ├── types/            # TypeScript Types/Interfaces
│   │   ├── App.tsx           # Thành phần chính định tuyến ứng dụng
│   │   └── main.tsx          # Điểm gắn kết DOM
│   └── package.json
```

---

## ⚙️ Hướng Dẫn Cài Đặt & Khởi Chạy

### 1. Chuẩn Bị Trước
* Đã cài đặt **NodeJS** (Phiên bản gợi ý >= 18.x)
* Cơ sở dữ liệu **MongoDB** (Local hoặc MongoDB Atlas Cloud)
* Tài khoản **Cloudinary** (Để lưu trữ ảnh đại diện và ảnh trong tin nhắn)

### 2. Cài Đặt Backend

Đi tới thư mục backend:
```bash
cd backend
```

Cài đặt các thư viện cần thiết:
```bash
npm install
```

Tạo file `.env` tại thư mục `/backend` và cấu hình các biến môi trường sau:
```env
PORT=5001
MONGODB_CONNECTIONSTRING=your_mongodb_connection_string
CLIENT_URL=http://localhost:5173
ACCESS_TOKEN_SECRET=your_jwt_access_token_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

> **Lưu ý**: Bạn có thể tự tạo mã bí mật an toàn cho `ACCESS_TOKEN_SECRET` bằng cách chạy lệnh sau trong Node CLI:
> `require('crypto').randomBytes(64).toString('hex')`

Khởi chạy server backend ở chế độ phát triển (Development):
```bash
npm run dev
```
Server backend sẽ khởi chạy tại cổng **5001**.
Xem tài liệu API trực quan tại: `http://localhost:5001/api-docs`

---

### 3. Cài Đặt Frontend

Đi tới thư mục frontend:
```bash
cd ../frontend
```

Cài đặt thư viện:
```bash
npm install
```

Tạo file `.env.development` tại thư mục `/frontend` và thêm cấu hình:
```env
VITE_API_URL=http://localhost:5001/api
VITE_SOCKET_URL=http://localhost:5001/
```

Khởi chạy ứng dụng frontend ở chế độ phát triển:
```bash
npm run dev
```
Giao diện người dùng sẽ chạy tại cổng mặc định **5173** (Truy cập: `http://localhost:5173`).

---

## 📖 Tài Liệu API (Swagger API Docs)

Dự án tích hợp Swagger UI giúp xem và chạy thử các API một cách dễ dàng. 
Sau khi chạy Backend Server, hãy truy cập đường dẫn: **`http://localhost:5001/api-docs`**

Các nhóm API chính bao gồm:
* **`/api/auth`**: Đăng ký, đăng nhập, đăng xuất, refresh token.
* **`/api/users`**: Lấy thông tin cá nhân hiện tại.
* **`/api/friends`**: Quản lý danh sách bạn bè, gửi/nhận/chấp nhận/từ chối lời mời kết bạn.
* **`/api/conversations`**: Lấy danh sách hội thoại, tạo cuộc hội thoại mới (Cá nhân/Nhóm).
* **`/api/messages`**: Gửi tin nhắn và tải các tin nhắn trong hội thoại phân trang qua Cursor.

---

## ⚡ Các Luồng Xử Lý Chính Trong Dự Án

1. **Kết Nối Realtime**: Khi đăng nhập thành công, token được lưu và frontend kết nối tới Socket server thông qua `useSocketStore`. Socket server lưu ánh xạ giữa `userId` và `socketId` nhằm phát đi trạng thái online/offline của người dùng.
2. **Nhận Tin Nhắn**: Khi gửi tin nhắn, Socket server sẽ phát sự kiện `new-message` đến tất cả socket đang join phòng hội thoại đó. Frontend lắng nghe và tự động cập nhật tin nhắn mới vào store `useChatStore`.
3. **Phân Trang Tin Nhắn**: Để tối ưu hiệu năng, tin nhắn cũ được tải động thông qua kỹ thuật phân trang Cursor-based (`limit` & `cursor` thời gian) giúp giảm tải dữ liệu MongoDB và tăng độ mượt mà khi cuộn.
4. **Tải Ảnh**: Tin nhắn hình ảnh và ảnh đại diện được chuyển đến backend thông qua `multer`, sau đó tải trực tiếp lên Cloudinary. Link ảnh trả về sẽ được lưu trữ vào MongoDB.

---
Chúc bạn trải nghiệm và phát triển ứng dụng **Moji** vui vẻ! 🎉
---
