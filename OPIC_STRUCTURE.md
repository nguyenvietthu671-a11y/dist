# Cấu trúc bài thi OPIc - Đã cập nhật

## ✅ Cấu trúc mới (Đúng chuẩn OPIc)

### Tổng số câu hỏi: **10-17 câu**
- **1 câu warm-up** (khởi động)
- **9-16 câu chính** (từ 3-4 topics được chọn)
- **Mỗi topic có 3-4 câu hỏi liên tiếp**

---

## 📋 Phân bổ câu hỏi

### 1. Warm-up (1 câu)
```
"Let's start the interview now. Tell me something about yourself."
```
- Thời gian: 60 giây
- Mục đích: Làm quen với Ava

### 2. Main Questions (từ 3-4 topics, mỗi topic 3-4 câu)

#### 7 Topics trong pool (chọn ngẫu nhiên 3-4 topics):
1. **Geography** (Domestic Travel)
2. **Furniture**
3. **Housing**
4. **Music**
5. **Movies**
6. **Family/Friends**
7. **Technology**

#### Cấu trúc bài thi:
- **Chọn ngẫu nhiên 3-4 topics** từ pool 7 topics
- **Mỗi topic có 3-4 câu hỏi liên tiếp**
- Các câu hỏi trong cùng topic được hỏi liên tiếp (không xen kẽ)

#### Phân bổ theo Form Level:

**Form 1 (Novice Low - Intermediate Low):**
- Chọn: 3 topics
- Mỗi topic: 3 câu liên tiếp
- Tổng: 1 warmup + (3 × 3) = **10 câu**

**Form 2 (Novice Low - Intermediate High):**
- Chọn: 3-4 topics (random)
- Mỗi topic: 3 câu liên tiếp
- Tổng: 1 warmup + (3-4 × 3) = **10-13 câu**

**Form 3+ (Advanced Low):**
- Chọn: 4 topics
- Mỗi topic: 4 câu liên tiếp
- Tổng: 1 warmup + (4 × 4) = **17 câu**

---

## 🎯 Ví dụ cấu trúc bài thi Form 3

```
1. [Warm-up] Tell me something about yourself. (60s)

=== TOPIC 1: Geography (4 câu liên tiếp) ===
2. [Geography] Describe your country's geography for me. (120s)
3. [Geography] I would like you to pick a favorite place in your country from your childhood. (120s)
4. [Geography] Tell me about the outdoor activities that are popular in your country. (120s)
5. [Geography] How has your country changed in the past decade? (120s)

=== TOPIC 2: Furniture (4 câu liên tiếp) ===
6. [Furniture] Tell me about the furniture you have in your home. (120s)
7. [Furniture] Tell me about how you use your furniture on a typical day. (120s)
8. [Furniture] Tell me about the furniture you had at home when you were a child. (120s)
9. [Furniture] Tell me about a time when you had a problem with your furniture. (120s)

=== TOPIC 3: Housing (4 câu liên tiếp) ===
10. [Housing] I would like to know where you live. Can you describe your home to me? (120s)
11. [Housing] What is your normal routine at home? (120s)
12. [Housing] Describe the home you lived in as a child. (120s)
13. [Housing] Talk about the different rooms in your home. (120s)

=== TOPIC 4: Music (4 câu liên tiếp) ===
14. [Music] What kinds of music do you listen to? (120s)
15. [Music] When and where do you usually listen to music? (120s)
16. [Music] When did you first become interested in music? (120s)
17. [Music] Could you think back to a particular memorable time when you heard live music? (120s)

Tổng: 17 câu (1 warmup + 16 main từ 4 topics × 4 câu)
```

---

## 🎯 Ví dụ cấu trúc bài thi Form 1

```
1. [Warm-up] Tell me something about yourself. (60s)

=== TOPIC 1: Technology (3 câu liên tiếp) ===
2. [Technology] What kinds of technology do people typically use in your country? (90s)
3. [Technology] What piece of technology do you use most often? (90s)
4. [Technology] Technology has definitely changed over time. Tell me about an early memory. (90s)

=== TOPIC 2: Movies (3 câu liên tiếp) ===
5. [Movies] What kinds of movies do you like to watch? (90s)
6. [Movies] Tell me about when you went to the movies recently. (90s)
7. [Movies] Tell me about a memorable movie that you watched in the past. (90s)

=== TOPIC 3: Family (3 câu liên tiếp) ===
8. [Family] Describe a family member or a friend you have. (90s)
9. [Family] Tell me about what you commonly do with your friend or family members. (90s)
10. [Family] Talk about what you did with your family and friends recently. (90s)

Tổng: 10 câu (1 warmup + 9 main từ 3 topics × 3 câu)
```

---

## 🔧 Thay đổi kỹ thuật

### 1. Warm-up Questions
**Trước:** 2 câu
**Sau:** 1 câu

```typescript
export const warmupQuestions: TestQuestion[] = [
  {
    id: 'warmup1',
    prompt: "Let's start the interview now. Tell me something about yourself.",
    type: 'warmup',
    timeLimit: 60,
  },
];
```

### 2. Topic Selection
**Trước:** Chọn tất cả 7 topics
**Sau:** Chọn ngẫu nhiên 3-4 topics từ pool 7 topics

```typescript
const ALL_TOPICS = [
  'geography',      // domestic travel
  'furniture',      // furniture
  'housing',        // housing
  'music',          // music
  'movies',         // movies
  'familyFriends',  // family
  'technology',     // technology
];

function selectTopics(surveyAnswers: SurveyAnswers): string[] {
  // Shuffle and pick 3-4 topics
  const shuffled = [...ALL_TOPICS].sort(() => Math.random() - 0.5);
  const topicCount = Math.random() > 0.5 ? 4 : 3;
  return shuffled.slice(0, topicCount);
}
```

### 3. Question Distribution
**Trước:** 1-2 câu mỗi topic (tổng 11-14 câu)
**Sau:** 3-4 câu liên tiếp mỗi topic (tổng 10-17 câu)

```typescript
// Each topic gets 3-4 consecutive questions
const questionsPerTopic = formNumber >= 3 ? 4 : 3;

selectedTopics.forEach((topicKey) => {
  const thread = topicThreads[topicKey];
  const threadQuestions = thread.questions.slice(0, questionsPerTopic);
  // Add all questions consecutively
  threadQuestions.forEach((q) => {
    questions.push({ ... });
  });
});
```

---

## 📊 Console Output khi bắt đầu test

**Ví dụ Form 3 (4 topics × 4 câu):**
```
📊 Question Bank Stats: {totalTopics: 28, totalQuestions: 200, totalRoleplays: 70}
📝 Total questions for this test: 17
📋 Selected topics for this test: ['geography', 'furniture', 'housing', 'music']
🎯 Structure: 4 topics × 3-4 questions each
📚 Topic "Geography": Adding 4 consecutive questions
📚 Topic "Furniture": Adding 4 consecutive questions
📚 Topic "Housing": Adding 4 consecutive questions
📚 Topic "Music": Adding 4 consecutive questions
✅ Total main questions generated: 16
📊 Total test questions: 17 (1 warmup + 16 main)
✅ VALIDATION PASSED: All questions are from the question bank
```

**Ví dụ Form 1 (3 topics × 3 câu):**
```
📊 Question Bank Stats: {totalTopics: 28, totalQuestions: 200, totalRoleplays: 70}
📝 Total questions for this test: 10
📋 Selected topics for this test: ['technology', 'movies', 'familyFriends']
🎯 Structure: 3 topics × 3-4 questions each
📚 Topic "Technology": Adding 3 consecutive questions
📚 Topic "Movies": Adding 3 consecutive questions
📚 Topic "Family/Friends": Adding 3 consecutive questions
✅ Total main questions generated: 9
📊 Total test questions: 10 (1 warmup + 9 main)
✅ VALIDATION PASSED: All questions are from the question bank
```

---

## 🎨 Visual Indicators trong UI

Mỗi câu hỏi hiển thị:
- **🌡️ Warm-up** (xanh) - Câu khởi động
- **💬 Experience** (tím) - Câu hỏi chính từ topics
- **🎭 Role-play** (hồng) - Câu hỏi tình huống
- **Question Counter**: "Question 5 of 15"

---

## ✅ Kiểm tra cấu trúc

### Method 1: Console Log
Mở DevTools (F12) → Console tab → Bắt đầu test → Xem logs

### Method 2: Đếm thủ công
- Đếm số câu hỏi trong bài test
- Kiểm tra có đúng 12-15 câu không
- Kiểm tra có 7 topics không

### Method 3: Visual Check
- Xem badge loại câu hỏi
- Xem question counter
- Xem progress bar

---

## 📝 Tổng kết

### Cấu trúc bài thi OPIc chuẩn:
✅ **1 warm-up question**  
✅ **3-4 topics được chọn ngẫu nhiên** từ pool 7 topics  
✅ **Mỗi topic có 3-4 câu hỏi liên tiếp**  
✅ **Tổng: 10-17 câu** (tùy form level)  

### 7 Topics trong pool (chọn 3-4):
1. Geography (Domestic Travel)
2. Furniture
3. Housing
4. Music
5. Movies
6. Family/Friends
7. Technology

### Phân bổ theo Form Level:
- **Form 1**: 3 topics × 3 câu = 10 câu tổng
- **Form 2**: 3-4 topics × 3 câu = 10-13 câu tổng
- **Form 3+**: 4 topics × 4 câu = 17 câu tổng

### Time limits:
- Warm-up: 60 giây
- Main questions: 90-120 giây (tùy form)

### Đặc điểm quan trọng:
- Các câu hỏi trong cùng topic được hỏi **liên tiếp** (không xen kẽ)
- Topics được chọn **ngẫu nhiên** mỗi lần test
- Không có role-play scenarios (đã loại bỏ)

---

**Status**: ✅ Hoàn tất và đã test  
**Last Updated**: 2026  
**Total Questions per Test**: 10-17 câu (tùy form)
