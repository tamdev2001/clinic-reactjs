# Clinic management UI - React js

## Requirements

For building and running the application you need:

-   Nodejs
-   Để lấy API được xây dựng bằng Spring boot: https://github.com/thanhtamnguyen2001/clinic-springboot

## Techs

-   React js vs18.
-   Redux
-   Axios
-   Sass

## Running the application locally

```shell
npm i
npm start
```

## Overview

### 1. Mô tả chung

Giao diện cho website quản lý phòng mạch được xây dựng với Reactjs sử dụng API do spring boot cung cấp.

### 2. Chức năng

-   Người dùng hệ thống (Một user có nhiều roles)
    -   Patient:
        -   Đăng ký/sửa/xóa lịch khám
        -   Xem lịch sử khám
        -   Chat với bác sĩ
        -   Quản lý tài khoản
        -   Nhận mail thông báo
    -   Doctor:
        -   Nhận danh sách khám bệnh
        -   Khám bệnh
            -   Thêm/sửa/xóa/xem phiếu khám (Bệnh nhân có thể có nhiều phiếu khám)
                -   Xem lịch sử khám bệnh của bệnh nhân bằng sđt
            -   Thêm/sửa/xóa/xem toa thuốc (Phiếu khám có thể có nhiều toa thuốc)
                -   Tìm kiếm thuốc
                -   Thêm thuốc (Toa thuốc có thể có nhiều thuốc)
            -
    -   Y tá:
        -   Xác nhận lịch khám và tự động gửi mail
        -   Thanh toán online
    -   Admin:
        -   Thêm/sửa/xóa các entities
        -   Thay đổi các quy tắc (Tiền khám, số bệnh nhân tối đa)
        -   Thống kê

### Hình ảnh minh họa các chức năng
