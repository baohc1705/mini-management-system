# Mini Management System

Hệ thống quản lý Người dùng và Voucher (Khuyến mãi) đơn giản, hiệu quả với giao diện hiện đại và trải nghiệm người dùng tối ưu.

## Công nghệ sử dụng

### Backend
- **Ngôn ngữ**: Java 21
- **Framework**: Spring Boot 3.x
- **Database**: MySQL 8.0
- **ORM**: Spring Data JPA / Hibernate
- **Thư viện**: Lombok, , Validation API

### Frontend
- **Framework**: React 18 (Vite)
- **Ngôn ngữ**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Form & Validation**: React Hook Form, Zod
- **Font**: Be Vietnam Pro (Google Fonts)

---

## Tính năng chính

### 1. Quản lý Người dùng
- Xem danh sách người dùng với phân trang từ server.
- Thêm mới, cập nhật thông tin người dùng.
- Tìm kiếm người dùng nhanh chóng.
- **Validation**: Kiểm tra định dạng Email và đảm bảo Email không trùng lặp trong hệ thống.

### 2. Quản lý Voucher (Khuyến mãi)
- Quản lý mã giảm giá, mức giảm (%), số lượng và ngày hết hạn.
- Tự động cập nhật trạng thái: `HOẠT ĐỘNG`, `KHÔNG HOẠT ĐỘNG`.
- Tìm kiếm Voucher theo mã.

### 3. Sử dụng Voucher
- Cho phép áp dụng Voucher cho một người dùng cụ thể.
- Kiểm tra điều kiện sử dụng: còn hạn dùng, trạng thái hoạt động, số lượng còn lại > 0.
- Tự động trừ số lượng Voucher sau khi sử dụng thành công.
- Lưu trữ và xem lại lịch sử sử dụng chi tiết.

### 4. Giao diện & Trải nghiệm (UI/UX)
- **Thông báo (Toast)**: Popup thông báo ở góc phải màn hình cho mọi thao tác.
- **Xác nhận (Confirm Modal)**: Hộp thoại xác nhận tùy chỉnh cho các hành động xóa dữ liệu.
- **Thiết kế**: Theo phong cách Clean & Modern, hỗ trợ phản hồi nhanh.

---

## Hướng dẫn cài đặt và chạy dự án

### 1. Backend (Spring Boot)
1. Tạo database MySQL có tên `mini_management_system`.
2. **Chạy Script Database**:
   - Mở công cụ quản lý MySQL (như MySQL Workbench, Navicat, hoặc cmd).
   - Chạy file script tại: `script/vti_test.sql` để khởi tạo cấu trúc bảng và dữ liệu mẫu.
3. Mở file `src/main/resources/application.yaml` và cập nhật thông tin kết nối (username, password).
4. Chạy ứng dụng thông qua IDE hoặc lệnh:
   ```bash
   mvn spring-boot:run
   ```

### 2. API & Postman
- Hệ thống cung cấp đầy đủ các endpoint RESTful (chi tiết xem ở mục bên dưới).
- **Import Postman Collections**:
  1. Mở Postman.
  2. Chọn **Import** (hoặc Ctrl+O).
  3. Chọn các file trong thư mục `script/api/`:
     - `users_postman_collection.json`
     - `vouchers_postman_collection.json`
     - `voucher_usages_postman_collection.json`
  4. Sau khi import, bạn có thể chạy thử các request đã được cấu hình sẵn.
- Các request `POST/PUT` yêu cầu header `Content-Type: application/json`.

### 3. Frontend (React)
1. Di chuyển vào thư mục frontend: `cd src/mini-management-system-fe`.
2. Cài đặt các thư viện:
   ```bash
   npm install
   ```
3. Khởi chạy môi trường phát triển:
   ```bash
   npm run dev
   ```
4. Truy cập vào: `http://localhost:5173`

---

## Danh sách API hệ thống

Tất cả các API đều có prefix là `/api` (được cấu hình qua Proxy ở Frontend).

### 1. Quản lý Người dùng (User API)
| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **GET** | `/users/page` | Lấy danh sách người dùng phân trang |
| **GET** | `/users` | Lấy toàn bộ danh sách người dùng |
| **GET** | `/users/{id}` | Lấy thông tin chi tiết một người dùng |
| **POST** | `/users` | Tạo mới người dùng |
| **PUT** | `/users/{id}` | Cập nhật thông tin người dùng |
| **DELETE** | `/users/{id}` | Xóa người dùng |

### 2. Quản lý Khuyến mãi (Voucher API)
| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **GET** | `/vouchers/page` | Lấy danh sách voucher phân trang |
| **GET** | `/vouchers/search/{code}` | Tìm kiếm voucher theo mã code |
| **POST** | `/vouchers` | Tạo mới voucher |
| **PUT** | `/vouchers/{id}` | Cập nhật thông tin voucher |
| **DELETE** | `/vouchers/{id}` | Xóa voucher |

### 3. Lịch sử sử dụng (Voucher Usage API)
| Method | Endpoint | Mô tả |
| :--- | :--- | :--- |
| **POST** | `/voucher-usages/use` | Thực hiện sử dụng voucher cho một người dùng |
| **GET** | `/voucher-usages/page` | Lấy danh sách lịch sử sử dụng phân trang |

---

## Quy tắc giao diện & Dữ liệu
- **Font chữ**: `Be Vietnam Pro` (toàn hệ thống).
- **Bảng dữ liệu**: Cỡ chữ `13px`, màu chữ đen đậm (`#111827`).
- **Phản hồi API**: Tất cả API đều trả về định dạng chuẩn:
  ```json
  {
    "status": true,
    "message": "Thành công",
    "data": { ... }
  }
  ```

---


