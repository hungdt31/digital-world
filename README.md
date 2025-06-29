# Digital World

## Giới thiệu
Digital World là một nền tảng thương mại điện tử với đầy đủ tính năng, được xây dựng trên kiến trúc client-server. Dự án này bao gồm giao diện người dùng hiện đại được phát triển bằng React và hệ thống backend mạnh mẽ với Node.js và MongoDB.

## Tính năng chính
- **Quản lý sản phẩm**: Hiển thị, tìm kiếm, lọc và sắp xếp sản phẩm
- **Quản lý người dùng**: Đăng ký, đăng nhập, quên mật khẩu
- **Giỏ hàng và thanh toán**: Xử lý đơn hàng và thanh toán
- **Danh mục và thương hiệu**: Phân loại sản phẩm theo danh mục và thương hiệu
- **Blog**: Hệ thống blog tích hợp
- **Mã giảm giá**: Hệ thống quản lý và áp dụng mã giảm giá
- **Giao diện người dùng phản hồi**: Thiết kế tương thích với nhiều thiết bị

## Công nghệ sử dụng

### Frontend
- React.js
- Redux Toolkit (quản lý state)
- Tailwind CSS (styling)
- Axios (gọi API)

### Backend
- Node.js
- Express.js
- MongoDB (cơ sở dữ liệu)
- JWT (xác thực)
- Cloudinary (lưu trữ hình ảnh)

## Cài đặt

### Yêu cầu
- Node.js (phiên bản 14.x trở lên)
- MongoDB
- NPM hoặc Yarn

### Bước cài đặt

#### Client
```bash
# Di chuyển đến thư mục client
cd client

# Cài đặt các phụ thuộc
npm install

# Khởi động môi trường phát triển
npm start
```

#### Server
```bash
# Di chuyển đến thư mục server
cd server

# Cài đặt các phụ thuộc
npm install

# Khởi động server
npm start
```

## Cấu trúc dự án

```
Digital_World/
  - client/                # Mã nguồn React frontend
    - public/              # Tài nguyên công khai
    - src/
      - apis/             # Các hàm gọi API
      - assets/           # Hình ảnh và tài nguyên tĩnh
      - components/       # Các thành phần React tái sử dụng
      - pages/            # Các trang của ứng dụng
      - store/            # Redux store
      - ultils/           # Các tiện ích và hàm trợ giúp

  - server/               # Mã nguồn Node.js backend
    - config/             # Cấu hình (DB, Cloudinary)
    - controllers/        # Bộ điều khiển xử lý logic
    - middlewares/        # Middleware (JWT, xử lý lỗi)
    - models/             # Schema MongoDB
    - routes/             # API endpoints
    - utils/              # Các tiện ích

  - data/                 # Dữ liệu mẫu
```

## Đóng góp
Vui lòng đọc [CONTRIBUTING.md](./CONTRIBUTING.md) để biết chi tiết về quy trình đóng góp.

## Giấy phép
Dự án này được cấp phép theo [Giấy phép MIT](./LICENSE).
