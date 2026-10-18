# Cập nhật Question Bank & Survey - Phiên bản đầy đủ

## 🎯 Tổng quan

Đã mở khóa tất cả chủ đề trong question bank và cập nhật survey với cấu trúc mới:
- **10 chủ đề** (tăng từ 6)
- **Survey mới**: 3 câu hỏi Free Time (Daily Activities, Relaxation, Sports) - mỗi câu chọn 6 options
- **Tổng cộng**: 18 options cho Free Time

---

## 📋 Cấu trúc Survey mới

### Step 1: Employment
- Chọn 1: Worker, Housewife, Teacher, Student
- Nếu Student: chọn mục đích học

### Step 2: Living Situation
- Chọn 1: Alone, Roommates, Family, Dormitory, Military

### Step 3: Daily Activities (MỚI)
**Câu hỏi**: "Bạn hay làm gì?"
- **Chọn 6** từ 12 options:
  - 📚 Reading books/articles
  - 👨‍🍳 Cooking/Baking
  - 🛍️ Shopping
  - 🎮 Playing video games
  - 📱 Using social media
  - 📺 Watching TV/Streaming
  - 🎓 Learning new skills
  - 🤝 Volunteering
  - 🌱 Gardening
  - 🎨 DIY/Crafts
  - 📷 Photography
  - ✍️ Writing/Blogging

### Step 4: Relaxation (MỚI)
**Câu hỏi**: "Nghỉ mát như nào?"
- **Chọn 6** từ 12 options:
  - 🧘 Meditation/Yoga
  - 💆 Spa/Massage
  - 🎵 Listening to music
  - 🌳 Walking in nature
  - 🎬 Watching movies
  - 😴 Sleeping/Resting
  - 🛁 Taking a bath
  - ☕ Drinking tea/coffee
  - 📔 Journaling
  - 🎨 Drawing/Painting
  - 🧩 Puzzles/Brain games
  - 🐕 Playing with pets

### Step 5: Sports (MỚI)
**Câu hỏi**: "Thích chơi thể thao gì?"
- **Chọn 6** từ 12 options:
  - 🏀 Basketball
  - ⚽ Soccer/Football
  - 🎾 Tennis
  - 🏊 Swimming
  - 🏃 Running/Jogging
  - 🚴 Cycling
  - 💪 Gym/Weight training
  - 🧘 Yoga
  - 🥾 Hiking
  - 🏸 Badminton
  - 🏐 Volleyball
  - 🥋 Martial arts

### Step 6: Interests & Hobbies
- Chọn ít nhất 1 từ 14 options

### Step 7: Travel Experience
- Chọn ít nhất 1 từ 5 options

---

## 🎨 10 Chủ đề trong Question Bank

### Chủ đề gốc (6):
1. **Furniture** - Nội thất gia đình
2. **Housing** - Nhà ở, nơi ở
3. **Music** - Âm nhạc
4. **Movies** - Phim ảnh
5. **Family/Friends** - Gia đình/Bạn bè
6. **Technology** - Công nghệ

### Chủ đề mới (4):
7. **Human Rights** - Nhân quyền
   - Quyền con người là gì?
   - Vấn đề nhân quyền nào bạn quan tâm?
   - Nhân quyền thay đổi như thế nào qua các thời kỳ?
   - Mọi người có quyền bình đẳng không?

8. **Society** - Xã hội
   - Thách thức lớn nhất của xã hội hiện nay?
   - Xã hội thay đổi như thế nào trong 10 năm qua?
   - Vai trò của giáo dục trong xã hội?
   - Mạng xã hội có tác động tích cực hay tiêu cực?

9. **Environment** - Môi trường
   - Vấn đề môi trường nào quan trọng ở nước bạn?
   - Bạn làm gì để bảo vệ môi trường?
   - Môi trường thay đổi như thế nào trong khu vực của bạn?
   - Chính phủ và cá nhân có thể làm gì để chống biến đổi khí hậu?

10. **Social Issues** - Vấn đề xã hội
    - Vấn đề xã hội nào bạn quan tâm nhất?
    - Nghèo đói ảnh hưởng như thế nào đến cộng đồng?
    - Phong trào xã hội nào đã ảnh hưởng đến bạn?
    - Người trẻ nên đóng vai trò gì trong việc giải quyết vấn đề xã hội?

---

## 🔧 Thay đổi kỹ thuật

### File đã sửa:

#### 1. `src/components/BackgroundSurvey.tsx`
**Thay đổi**:
- Tách Free Time thành 3 bước riêng biệt:
  - Step 2: Daily Activities (chọn 6)
  - Step 3: Relaxation (chọn 6)
  - Step 4: Sports (chọn 6)
- Tổng số bước: 7 (tăng từ 6)
- Validation: Mỗi bước phải chọn đủ số lượng yêu cầu

**Code mới**:
```typescript
const steps = [
  { title: 'Employment', subtitle: 'What is your job?' },
  { title: 'Living Situation', subtitle: 'Where do you live?' },
  { title: 'Daily Activities', subtitle: 'What do you usually do in your free time? (Select 6)' },
  { title: 'Relaxation', subtitle: 'How do you relax? (Select 6)' },
  { title: 'Sports', subtitle: 'What sports do you like? (Select 6)' },
  { title: 'Interests & Hobbies', subtitle: 'What are your interests and hobbies? (Select at least 1)' },
  { title: 'Travel Experience', subtitle: 'Which type of traveling have you done? (Select at least 1)' },
];

const canProceed = () => {
  switch (step) {
    case 0: return answers.employment !== '' && ...;
    case 1: return answers.living !== '';
    case 2: return answers.freeTime.length === 6;  // Daily activities
    case 3: return answers.freeTime.length === 12; // + Relaxation
    case 4: return answers.freeTime.length === 18; // + Sports
    case 5: return answers.interests.length >= 1;
    case 6: return answers.travel.length >= 1;
  }
};
```

#### 2. `src/data/testQuestions.ts`
**Thay đổi**:
- Thêm 4 chủ đề mới vào `topicThreads`:
  - `humanRights`: 4 câu hỏi
  - `society`: 4 câu hỏi
  - `environment`: 4 câu hỏi
  - `socialIssues`: 4 câu hỏi
- Cập nhật `ALL_TOPICS` để bao gồm 10 chủ đề

**Code mới**:
```typescript
const ALL_TOPICS = [
  'furniture',
  'housing',
  'music',
  'movies',
  'familyFriends',
  'technology',
  'humanRights',    // MỚI
  'society',        // MỚI
  'environment',    // MỚI
  'socialIssues',   // MỚI
];
```

#### 3. `src/types.ts`
**Thay đổi**:
- Cập nhật comment cho `freeTime` field:
```typescript
export interface SurveyAnswers {
  employment: string;
  studentPurpose: string;
  living: string;
  freeTime: string[]; // 18 items: 6 daily + 6 relaxation + 6 sports
  interests: string[];
  sports: string[];
  travel: string[];
}
```

---

## 📊 Thống kê

### Survey:
- **Tổng số bước**: 7
- **Total options**: 73
  - Employment: 4 options
  - Student Purpose: 3 options
  - Living: 5 options
  - Daily Activities: 12 options (chọn 6)
  - Relaxation: 12 options (chọn 6)
  - Sports: 12 options (chọn 6)
  - Interests: 14 options (chọn ≥1)
  - Travel: 5 options (chọn ≥1)

### Question Bank:
- **Tổng số chủ đề**: 10
- **Tổng số câu hỏi**: ~200+ câu
- **Chủ đề mới**: 4 (Human Rights, Society, Environment, Social Issues)
- **Câu hỏi mới**: 16 câu (4 chủ đề × 4 câu)

---

## 🎯 Lợi ích

### Cho người học:
1. **Đa dạng hơn**: 10 chủ đề thay vì 6
2. **Thực tế hơn**: Các vấn đề xã hội, môi trường, nhân quyền
3. **Cá nhân hóa**: Survey chi tiết hơn với 3 loại hoạt động
4. **Phù hợp OPIc**: Cấu trúc giống bài thi thật

### Cho hệ thống:
1. **Linh hoạt**: Có thể chọn ngẫu nhiên từ 10 chủ đề
2. **Mở rộng**: Dễ dàng thêm chủ đề mới
3. **Validation**: Đảm bảo người dùng chọn đủ options
4. **Tracking**: Theo dõi chi tiết sở thích người dùng

---

## 🧪 Testing

### Test case 1: Survey hoàn chỉnh
```
1. Employment: Student → Getting a degree
2. Living: Family
3. Daily Activities: Reading, Cooking, Gaming, Social Media, TV, Learning (6)
4. Relaxation: Music, Nature, Movies, Sleeping, Tea, Pets (6)
5. Sports: Basketball, Swimming, Running, Gym, Yoga, Hiking (6)
6. Interests: Music, Cooking, Gardening (3)
7. Travel: Domestic trip, Overseas trip (2)
→ Continue to Self-Assessment ✅
```

### Test case 2: Validation
```
Step 3 (Daily Activities):
- Chọn 5 → ❌ Không thể tiếp tục
- Chọn 6 → ✅ Có thể tiếp tục
- Chọn 7 → ❌ Không thể chọn thêm (disabled)
```

### Test case 3: Question generation
```
Form 3+ với 4 chủ đề:
- furniture (4 câu)
- humanRights (4 câu)
- environment (3 câu)
- technology (3 câu)
→ Tổng: 14 câu + 1 warmup = 15 câu ✅
```

---

## 🚀 Future Enhancements

### Có thể thêm:
1. **Thêm chủ đề mới**:
   - Politics (Chính trị)
   - Economy (Kinh tế)
   - Education (Giáo dục)
   - Health (Sức khỏe)
   - Culture (Văn hóa)

2. **Survey nâng cao**:
   - Câu hỏi về mức độ quan tâm
   - Câu hỏi về kinh nghiệm
   - Câu hỏi về mục tiêu học tập

3. **Question bank mở rộng**:
   - Thêm role-play scenarios cho chủ đề mới
   - Thêm follow-up questions
   - Thêm câu hỏi theo level (Novice → Superior)

---

## 📝 Checklist

- [x] Tách Free Time thành 3 bước
- [x] Mỗi bước chọn 6 options
- [x] Thêm 4 chủ đề mới (Human Rights, Society, Environment, Social Issues)
- [x] Cập nhật ALL_TOPICS
- [x] Cập nhật types.ts
- [x] Build thành công
- [x] Validation hoạt động đúng
- [x] Navigation bar không bị che

---

**Trạng thái**: ✅ Hoàn tất và đã test  
**Ngày cập nhật**: 2026  
**Version**: 2.0 - Full Topics Unlocked
