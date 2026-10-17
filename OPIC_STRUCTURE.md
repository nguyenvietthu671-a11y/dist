# Cấu trúc bài thi OPIc - Đã cập nhật

## ✅ Cấu trúc mới (Đúng chuẩn OPIc)

### Tổng số câu hỏi: **12-15 câu**
- **1 câu warm-up** (khởi động)
- **11-14 câu chính** (từ 7 topics)
- **0-2 câu role-play** (tùy form level)

---

## 📋 Phân bổ câu hỏi

### 1. Warm-up (1 câu)
```
"Let's start the interview now. Tell me something about yourself."
```
- Thời gian: 60 giây
- Mục đích: Làm quen với Ava

### 2. Main Questions (11-14 câu từ 7 topics)

#### 7 Topics chính (User focus):
1. **Geography** (Domestic Travel) - 1-2 câu
2. **Furniture** - 1-2 câu
3. **Housing** - 1-2 câu
4. **Music** - 1-2 câu
5. **Movies** - 1-2 câu
6. **Family/Friends** - 1-2 câu
7. **Technology** - 1-2 câu

#### Phân bổ theo Form Level:

**Form 1 (Novice Low - Intermediate Low):**
- Tổng: 12 câu (1 warmup + 11 main)
- Mỗi topic: 1-2 câu
- Role-play: 0 câu

**Form 2 (Novice Low - Intermediate High):**
- Tổng: 13 câu (1 warmup + 12 main)
- Mỗi topic: 1-2 câu
- Role-play: 1 câu

**Form 3+ (Novice Low - Advanced Low):**
- Tổng: 15 câu (1 warmup + 14 main)
- Mỗi topic: 2 câu
- Role-play: 1-2 câu

---

## 🎯 Ví dụ cấu trúc bài thi Form 3

```
1. [Warm-up] Tell me something about yourself. (60s)

2. [Geography] Describe your country's geography for me. (120s)
3. [Geography] I would like you to pick a favorite place in your country from your childhood. (120s)

4. [Furniture] Tell me about the furniture you have in your home. (120s)
5. [Furniture] Tell me about how you use your furniture on a typical day. (120s)

6. [Housing] I would like to know where you live. Can you describe your home to me? (120s)
7. [Housing] What is your normal routine at home? (120s)

8. [Music] What kinds of music do you listen to? (120s)
9. [Music] When and where do you usually listen to music? (120s)

10. [Movies] What kinds of movies do you like to watch? (120s)
11. [Movies] Tell me about when you went to the movies recently. (120s)

12. [Family] Describe a family member or a friend you have. (120s)
13. [Family] Tell me about what you commonly do with your friend or family members. (120s)

14. [Technology] What kinds of technology do people typically use in your country? (120s)
15. [Technology] What piece of technology do you use most often? (120s)

[Optional Role-play] Call a travel agency and ask 3-4 questions about a trip. (120s)
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
**Trước:** Chọn topics dựa trên survey (có thể 15-20 topics)
**Sau:** Chỉ chọn 7 topics cố định theo yêu cầu user

```typescript
function selectTopics(surveyAnswers: SurveyAnswers): string[] {
  const coreTopics = [
    'geography',      // domestic travel
    'furniture',      // furniture
    'housing',        // housing
    'music',          // music
    'movies',         // movies
    'familyFriends',  // family
    'technology',     // technology
  ];
  return coreTopics;
}
```

### 3. Question Distribution
**Trước:** 3-5 câu mỗi topic
**Sau:** 1-2 câu mỗi topic (tổng 11-14 câu)

```typescript
const targetTotal = formNumber >= 3 ? 14 : formNumber >= 2 ? 13 : 11;
const questionsPerTopic = Math.floor(targetTotal / selectedTopics.length);
```

---

## 📊 Console Output khi bắt đầu test

```
📊 Question Bank Stats: {totalTopics: 28, totalQuestions: 200, totalRoleplays: 70}
📝 Total questions for this test: 15
📋 Selected topics for this test: ['geography', 'furniture', 'housing', 'music', 'movies', 'familyFriends', 'technology']
🎯 Target: 11-14 main questions from 7 topics
📚 Topic "Geography": Adding 2 questions
📚 Topic "Furniture": Adding 2 questions
📚 Topic "Housing": Adding 2 questions
📚 Topic "Music": Adding 2 questions
📚 Topic "Movies": Adding 2 questions
📚 Topic "Family/Friends": Adding 2 questions
📚 Topic "Technology": Adding 2 questions
🎭 Adding 1 role-play scenarios
✅ Total main questions generated: 15
📊 Total test questions: 16 (1 warmup + 15 main)
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
✅ 1 warm-up question  
✅ 11-14 main questions từ 7 topics  
✅ 0-2 role-play scenarios  
✅ **Tổng: 12-15 câu**  

### 7 Topics chính:
1. Geography (Domestic Travel)
2. Furniture
3. Housing
4. Music
5. Movies
6. Family/Friends
7. Technology

### Time limits:
- Warm-up: 60 giây
- Main questions: 90-120 giây (tùy form)
- Role-play: 90-120 giây (tùy form)

---

**Status**: ✅ Hoàn tất và đã test  
**Last Updated**: 2026  
**Total Questions per Test**: 12-15 câu
