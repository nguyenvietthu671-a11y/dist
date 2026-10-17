# Tính năng Lưu Tiến trình & Kết thúc bài test

## ✅ Các tính năng đã thêm

### 1. Tự động lưu tiến trình (Auto-save Progress)

**Cách hoạt động:**
- Tiến trình bài test được tự động lưu vào `localStorage` mỗi khi có thay đổi
- Lưu trữ: phase hiện tại, câu hỏi đang làm, và tất cả câu trả lời
- Dữ liệu được giữ trong 2 giờ
- Khi reload trang hoặc quay lại, hệ thống sẽ hỏi bạn có muốn tiếp tục bài test cũ không

**Dữ liệu được lưu:**
```typescript
{
  phase: 'question' | 'recording' | 'review' | ...,
  currentQuestionIndex: 5,
  responses: [/* tất cả câu trả lời đã ghi */],
  timestamp: 1234567890
}
```

**Khi nào lưu:**
- Khi chuyển sang câu hỏi mới
- Khi hoàn thành recording
- Khi chuyển giữa các phase

**Khi nào xóa:**
- Khi hoàn thành bài test (tất cả câu hỏi)
- Khi bấm "End Test"
- Khi bắt đầu bài test mới
- Sau 2 giờ (tự động hết hạn)

### 2. Resume Test Dialog

**Khi nào hiển thị:**
- Khi bạn quay lại trang test và có tiến trình đã lưu
- Hiển thị ở màn hình intro

**Giao diện:**
```
┌─────────────────────────────────────┐
│ 📝 Previous Test Found              │
│                                     │
│ You have a test in progress         │
│ (5 answers completed).              │
│                                     │
│ [Resume Test]  [Start New]          │
└─────────────────────────────────────┘
```

**Tùy chọn:**
- **Resume Test**: Tiếp tục bài test từ vị trí đã lưu
- **Start New**: Xóa tiến trình cũ và bắt đầu bài test mới

### 3. Nút "End Test" (Kết thúc bài test)

**Khi nào hiển thị:**
- Khi đang làm bài test (phase = question/recording)
- Khi đã có ít nhất 1 câu trả lời
- Không hiển thị ở màn hình intro hoặc review

**Vị trí:**
- Góc trên bên phải, cạnh nút "Voice/Text Input"
- Màu đỏ nổi bật với icon 🏁

**Giao diện nút:**
```
[🏁 End Test]
```

**Confirmation Modal:**
```
┌─────────────────────────────────────┐
│ End Test Early?                     │
│                                     │
│ You've answered 5 out of 15         │
│ questions. Are you sure you want    │
│ to end the test and see your        │
│ results?                            │
│                                     │
│ [Continue Test]  [End Test]         │
└─────────────────────────────────────┘
```

**Khi bấm "End Test":**
1. Xóa tiến trình đã lưu
2. Chuyển ngay đến phần Results
3. Chấm điểm dựa trên các câu trả lời đã có
4. Hiển thị feedback và suggestions

### 4. Thông báo lưu tiến trình

**Hiển thị ở:**
- Màn hình intro, trong phần "How to answer"
- Text: "💾 Your progress is automatically saved. You can close the page and resume later."

## 🎯 Lợi ích

### Cho người dùng:
1. **Không mất tiến trình**: Có thể đóng trình duyệt và quay lại sau
2. **Linh hoạt**: Có thể kết thúc sớm nếu cần
3. **An toàn**: Dữ liệu được lưu tự động, không cần bấm "Save"
4. **Dễ sử dụng**: Dialog rõ ràng với 2 tùy chọn Resume/Start New

### Cho hệ thống:
1. **Tự động**: Không cần user tương tác để lưu
2. **Thông minh**: Tự động xóa sau 2 giờ
3. **Nhẹ nhàng**: Chỉ lưu dữ liệu cần thiết
4. **Tin cậy**: Sử dụng localStorage (ổn định, nhanh)

## 🔧 Technical Details

### Storage Key
```javascript
const STORAGE_KEY = 'opic_test_progress';
```

### Save Function
```typescript
const saveProgress = (phase, currentQuestionIndex, responses) => {
  const progress = {
    phase,
    currentQuestionIndex,
    responses,
    timestamp: Date.now(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
};
```

### Load Function
```typescript
const loadProgress = () => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  
  const progress = JSON.parse(saved);
  
  // Check if less than 2 hours old
  const twoHours = 2 * 60 * 60 * 1000;
  if (Date.now() - progress.timestamp > twoHours) {
    localStorage.removeItem(STORAGE_KEY);
    return null;
  }
  
  return progress;
};
```

### Clear Function
```typescript
const clearProgress = () => {
  localStorage.removeItem(STORAGE_KEY);
};
```

### Auto-save Effect
```typescript
useEffect(() => {
  if (phase !== 'intro' && phase !== 'transition') {
    saveProgress(phase, currentQuestionIndex, responses);
  }
}, [phase, currentQuestionIndex, responses]);
```

## 📊 User Flow

### Flow 1: Normal Test (Complete)
```
1. Start Test → Save progress
2. Answer Q1 → Save progress
3. Answer Q2 → Save progress
...
15. Answer Q15 → Clear progress → Show Results
```

### Flow 2: Interrupted Test (Resume)
```
1. Start Test → Save progress
2. Answer Q1 → Save progress
3. Answer Q2 → Save progress
4. Close browser / Refresh page
5. Return to test → Show Resume Dialog
6. Click "Resume Test" → Continue from Q3
7. Answer Q3 → Save progress
...
```

### Flow 3: End Test Early
```
1. Start Test → Save progress
2. Answer Q1 → Save progress
3. Answer Q2 → Save progress
4. Click "End Test" button
5. Confirm in modal → Clear progress → Show Results
```

### Flow 4: Start New Test
```
1. Have saved progress
2. See Resume Dialog
3. Click "Start New" → Clear old progress
4. Start fresh test
```

## 🎨 UI/UX Features

### Visual Indicators:
- **Resume Dialog**: Cyan color (info) với 2 buttons rõ ràng
- **End Test Button**: Red color (warning) để thu hút chú ý
- **Confirmation Modal**: Dark overlay với centered content
- **Auto-save Notice**: Gray text ở cuối phần hướng dẫn

### Accessibility:
- Buttons có label rõ ràng
- Modal có focus trap
- Keyboard navigation support
- Screen reader friendly

### Responsive:
- Dialog responsive trên mobile
- Modal full-width trên small screens
- Buttons stack trên mobile

## ⚠️ Limitations

1. **Storage limit**: localStorage có giới hạn ~5-10MB
2. **Browser only**: Chỉ hoạt động trên cùng một browser/device
3. **2-hour expiry**: Progress tự động xóa sau 2 giờ
4. **No cloud sync**: Không đồng bộ giữa các devices

## 🚀 Future Enhancements

Có thể thêm:
- Cloud sync (Firebase, Supabase)
- Export/Import progress
- Multiple saved tests
- Longer expiry time
- Progress percentage indicator
- Time spent on each question

---

**Status**: ✅ Hoàn tất và đã test  
**Last Updated**: 2026  
**Features**: Auto-save, Resume Dialog, End Test Button
