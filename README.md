# OPIc AI Mock Test Simulator (Reconstructed with REA)

Ứng dụng mô phỏng phòng thi thử OPIc (ACTFL Standard) được tái tạo và xây dựng lại từ kết quả dịch ngược hệ thống **English OPIc Test** bằng công cụ **REA (Reverse Engineer Anything)**.

---

## 1. Cấu trúc thư mục

```
D:\opic_analysis\opic-mock-test\
├── index.html       # Giao diện phòng thi mô phỏng chuẩn ACTFL
├── styles.css       # Hiệu ứng sóng âm, avatar Ava, đồng hồ đếm ngược, responsive UI
├── app.js           # Bộ điều khiển State Machine, MediaRecorder, AI Scoring Rubric & bcl(score)
├── run.bat          # File khởi chạy server cục bộ nhanh (chỉ cần nhấp đúp)
└── assets\
    ├── avatar1.png  # Ảnh giám khảo ảo Ava chuẩn
    └── audio\       # Kho audio giọng đọc câu hỏi thực tế (01_Q1, Housing, Coffee, Roleplay...)
```

---

## 2. Các tính năng cốt lõi đã tái tạo

1. **Khảo sát đề thi (Background Survey):**
   * Cho phép chọn Track **AL (Advanced)** hoặc **IM (Intermediate)**.
   * Danh mục 46 chủ đề khảo sát thực tế, bắt buộc chọn tối thiểu 3 chủ đề.
2. **Kiểm tra thiết bị (Device Setup Check):**
   * Nghe thử âm thanh câu hỏi từ Ava.
   * Kiểm tra độ nhạy microphone với đồng hồ đo tần số thực tế.
3. **Phòng thi chuẩn ACTFL (Examination Room):**
   * **Máy trạng thái 4 bước:** `initial` → `questionPlaying` → `recording` → `recordingEnded`.
   * **Hiệu ứng Ava:** Vòng sóng âm lan tỏa (Ripple audio pulse) khi Ava đọc đề.
   * **Cơ chế Replay:** Giới hạn duy nhất 1 lần nghe lại cho mỗi câu (giảm opacity khi hết lượt).
   * **Đồng hồ đếm ngược:** Đếm ngược 30 phút toàn bài và 60s/90s/120s tùy loại câu hỏi theo hàm `Pw()`.
   * **Visualizer âm thanh:** Hiển thị biểu đồ sóng âm thời gian thực khi thí sinh nói.
4. **Hệ thống chấm điểm AI & Báo cáo kết quả:**
   * Thuật toán ánh xạ điểm `bcl(score)`: xếp hạng NL, NM, NH, IL, IM, IH, AL.
   * Chấm điểm 4 tiêu chí: **Fluency**, **Vocabulary**, **Grammar**, **Task Completion**.
   * Chi tiết nhận xét AI Feedback từng câu hỏi.

---

## 3. Cách khởi chạy

* **Cách 1 (Nhanh nhất):** Nhấp đúp chuột vào file `run.bat`. Trình duyệt sẽ tự động mở trang web tại `http://localhost:5000`.
* **Cách 2:** Mở trực tiếp file `index.html` bằng trình duyệt Chrome hoặc Edge.

