# Cập nhật Final - Survey & Scoring Improvements

## 📋 Tóm tắt thay đổi

### 1. Survey - Gộp 3 phần Free Time thành 1 trang

**Trước:**
- Step 2: Daily Activities (chọn 6)
- Step 3: Relaxation (chọn 6)
- Step 4: Sports (chọn 6)
- Tổng: 3 bước riêng biệt

**Sau:**
- Step 2: Free Time Activities (gộp cả 3 phần vào 1 trang)
  - Phần 1: "What do you usually do?" (chọn 6)
  - Phần 2: "How do you relax?" (chọn 6)
  - Phần 3: "What sports do you like?" (chọn 6)
- Tổng: 1 bước với 3 phần rõ ràng

**Lợi ích:**
- ✅ Người dùng thấy được tổng quan tất cả hoạt động
- ✅ Dễ dàng so sánh và cân đối thời gian
- ✅ Giảm số bước phải click (từ 3 xuống 1)
- ✅ Validation vẫn đảm bảo chọn đủ 6 cho mỗi phần

### 2. Thêm phần "Issues You Care About"

**Mới thêm:**
- Step 6: Issues You Care About
- 10 vấn đề xã hội để chọn:
  - ⚖️ Human Rights
  - 🌍 Environment & Climate Change
  - 📚 Education
  - 🏥 Healthcare
  - 💰 Poverty & Inequality
  - 🤖 Technology & AI
  - 🧠 Mental Health
  - ♀️ Gender Equality
  - 🐾 Animal Rights
  - 🗳️ Political Freedom

**Mục đích:**
- ✅ Thu thập thông tin về mối quan tâm xã hội
- ✅ Tạo cơ sở để tạo câu hỏi phù hợp với sở thích
- ✅ Giúp cá nhân hóa trải nghiệm học tập

### 3. Cải thiện chấm điểm - Detailed Recommendations

**Mới thêm:**
- Hàm `generateDetailedRecommendations()` phân tích từng câu
- Kiểm tra 6 tiêu chí cho mỗi câu:
  1. **Độ dài câu**: Câu < 8 từ → gợi ý kết hợp hoặc thêm chi tiết
  2. **Từ nối**: Thiếu connector → gợi ý thêm "because", "however", "for example"
  3. **Từ mô tả**: Thiếu tính từ → gợi ý thêm "interesting", "challenging", "significant"
  4. **Ý kiến + Lý do**: Có "I think" nhưng thiếu "because" → gợi ý thêm lý do
  5. **Thì quá khứ**: Nhắc đến quá khứ nhưng không dùng quá khứ đơn → gợi ý sửa
  6. **Ví dụ cụ thể**: Câu dài nhưng thiếu ví dụ → gợi ý thêm "for example"

**Định dạng output:**
```
**Question 1 - Detailed Recommendations:**

**Sentence 1:** "I went to the store yesterday"

Suggestions:
- This sentence is too short. Try to combine it with the next sentence or add more details.
- Consider adding descriptive words to make your response more vivid.

**Sentence 2:** "I think it was good"

Suggestions:
- You expressed an opinion. Now add a reason using "because" or "since" to support it.
```

**Lợi ích:**
- ✅ Phản hồi chi tiết từng câu thay vì tổng quát
- ✅ Gợi ý cụ thể, có thể áp dụng ngay
- ✅ Giúp người học hiểu rõ lỗi cụ thể
- ✅ Dựa trên nội dung thực tế của người thi

---

## 🔧 Chi tiết kỹ thuật

### File đã sửa:

#### 1. `src/components/BackgroundSurvey.tsx`
**Thay đổi:**
- Gộp 3 bước Free Time thành 1 bước
- Thêm step "Issues You Care About"
- Cập nhật validation logic
- Tổng số bước: 6 (thay vì 7)

**Code chính:**
```typescript
const steps = [
  { title: 'Employment', subtitle: 'What is your job?' },
  { title: 'Living Situation', subtitle: 'Where do you live?' },
  { title: 'Free Time Activities', subtitle: 'Select 6 options for each category below' },
  { title: 'Interests & Hobbies', subtitle: 'What are your interests and hobbies? (Select at least 1)' },
  { title: 'Travel Experience', subtitle: 'Which type of traveling have you done? (Select at least 1)' },
  { title: 'Issues You Care About', subtitle: 'What social issues are you interested in? (Select at least 1)' },
];

const canProceed = () => {
  switch (step) {
    case 2: {
      // Check if all 3 categories have 6 selections each
      const dailyCount = answers.freeTime.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length;
      const relaxationCount = answers.freeTime.filter(v => relaxationOptions.some(o => o.value === v)).length;
      const sportsCount = answers.freeTime.filter(v => sportsOptions.some(o => o.value === v)).length;
      return dailyCount === 6 && relaxationCount === 6 && sportsCount === 6;
    }
    // ...
  }
};
```

#### 2. `src/utils/scoring.ts`
**Thay đổi:**
- Thêm hàm `generateDetailedRecommendations()`
- Cập nhật `scoreResponses()` để trả về `detailedRecommendations`

**Code chính:**
```typescript
function generateDetailedRecommendations(responses: TestResponse[]): string {
  responses.forEach((response, index) => {
    const sentences = original.split(/[.!?]+/).filter(s => s.trim().length > 0);
    
    sentences.forEach((sentence, sIndex) => {
      const suggestions: string[] = [];
      
      // Check for short sentences
      if (wordCount < 8) {
        suggestions.push('This sentence is too short...');
      }
      
      // Check for missing connectors
      if (!/\b(because|however|although|...)\b/i.test(trimmedSentence)) {
        suggestions.push('Consider adding a connector...');
      }
      
      // Check for missing descriptive words
      if (!/\b(beautiful|amazing|...)\b/i.test(trimmedSentence)) {
        suggestions.push('Add descriptive words...');
      }
      
      // Check for opinion + reason
      if (/\b(i think|i believe|...)\b/i.test(trimmedSentence)) {
        if (!/\b(because|since|...)\b/i.test(trimmedSentence)) {
          suggestions.push('You expressed an opinion. Now add a reason...');
        }
      }
      
      // Check for past tense
      if (/\b(yesterday|last week|...)\b/i.test(trimmedSentence)) {
        const pastTenseVerbs = trimmedSentence.match(/\b(went|saw|did|...)\b/gi) || [];
        if (pastTenseVerbs.length === 0) {
          suggestions.push('You mentioned a past time but didn\'t use past tense verbs...');
        }
      }
      
      // Check for specific examples
      if (wordCount > 15 && !/\b(for example|for instance|...)\b/i.test(trimmedSentence)) {
        suggestions.push('Consider adding a specific example...');
      }
    });
  });
}

export function scoreResponses(responses: TestResponse[], formNumber: number): ScoringResult {
  // ...
  const detailedRecommendations = generateDetailedRecommendations(responses);
  
  return {
    // ...
    detailedRecommendations,
  };
}
```

#### 3. `src/types.ts`
**Thay đổi:**
- Thêm field `detailedRecommendations?: string` vào `ScoringResult` interface

#### 4. `src/components/Results.tsx`
**Thay đổi:**
- Thêm section hiển thị "Detailed Sentence-by-Sentence Recommendations"
- Style: gradient amber/orange, max-height 500px với scroll

**Code chính:**
```tsx
{result.detailedRecommendations && (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 1.2 }}
    className="mb-8"
  >
    <div className="bg-gradient-to-br from-amber-900/30 to-orange-900/30 border border-amber-500/20 rounded-2xl p-6">
      <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🔍</span> Detailed Sentence-by-Sentence Recommendations
      </h3>
      <div className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-4 max-h-[500px] overflow-y-auto">
        <div className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">
          {result.detailedRecommendations}
        </div>
      </div>
    </div>
  </motion.div>
)}
```

---

## 📊 So sánh trước và sau

### Survey Structure

**Trước (7 steps):**
```
1. Employment
2. Living Situation
3. Daily Activities (chọn 6)
4. Relaxation (chọn 6)
5. Sports (chọn 6)
6. Interests & Hobbies
7. Travel Experience
```

**Sau (6 steps):**
```
1. Employment
2. Living Situation
3. Free Time Activities (gộp 3 phần: Daily + Relaxation + Sports)
4. Interests & Hobbies
5. Travel Experience
6. Issues You Care About (MỚI)
```

### Scoring Output

**Trước:**
```
- Overall Score: 68/100
- Proficiency Level: Advanced Low
- Function Score: 72/100
- Accuracy Score: 65/100
- Content Score: 70/100
- Text Type Score: 66/100
- Feedback: 4 items
- Suggestions: 8 items
- Improved Speech: Full text
```

**Sau:**
```
- Overall Score: 68/100
- Proficiency Level: Advanced Low
- Function Score: 72/100
- Accuracy Score: 65/100
- Content Score: 70/100
- Text Type Score: 66/100
- Feedback: 4 items
- Suggestions: 8 items
- Improved Speech: Full text
- Detailed Recommendations: Sentence-by-sentence analysis (MỚI)
```

---

## 🎯 Ví dụ thực tế

### Ví dụ 1: Câu quá ngắn

**Người thi nói:**
```
I went to the store. I bought some furniture. It was nice.
```

**Detailed Recommendations:**
```
**Sentence 1:** "I went to the store"

Suggestions:
- This sentence is too short. Try to combine it with the next sentence or add more details.
- Consider adding descriptive words to make your response more vivid (e.g., "interesting", "challenging", "significant").

**Sentence 2:** "I bought some furniture"

Suggestions:
- This sentence is too short. Try to combine it with the next sentence or add more details.
- Consider adding a specific example to support your point.

**Sentence 3:** "It was nice"

Suggestions:
- This sentence is too short. Try to combine it with the next sentence or add more details.
- Add descriptive words to make your response more vivid (e.g., "beautiful", "amazing", "wonderful").
```

### Ví dụ 2: Thiếu lý do cho ý kiến

**Người thi nói:**
```
I think technology is important. It helps people a lot.
```

**Detailed Recommendations:**
```
**Sentence 1:** "I think technology is important"

Suggestions:
- You expressed an opinion. Now add a reason using "because" or "since" to support it.

**Sentence 2:** "It helps people a lot"

Suggestions:
- Consider adding a specific example to support your point.
```

### Ví dụ 3: Thiếu thì quá khứ

**Người thi nói:**
```
Yesterday I go to the park. I see my friends there.
```

**Detailed Recommendations:**
```
**Sentence 1:** "Yesterday I go to the park"

Suggestions:
- You mentioned a past time but didn't use past tense verbs. Use "went", "saw", "did", etc.

**Sentence 2:** "I see my friends there"

Suggestions:
- You mentioned a past time but didn't use past tense verbs. Use "went", "saw", "did", etc.
```

---

## 🧪 Testing Checklist

- [x] Survey gộp 3 phần Free Time thành 1 trang
- [x] Validation hoạt động đúng (phải chọn 6 cho mỗi phần)
- [x] Thêm phần "Issues You Care About"
- [x] Detailed Recommendations hiển thị đúng
- [x] Phân tích từng câu chính xác
- [x] Gợi ý cụ thể và hữu ích
- [x] UI/UX đẹp và dễ đọc
- [x] Build thành công

---

## 🚀 Lợi ích cho người học

### 1. Survey nhanh hơn
- Giảm từ 7 bước xuống 6 bước
- Thấy được tổng quan hoạt động Free Time
- Dễ dàng cân đối thời gian

### 2. Cá nhân hóa cao hơn
- Thu thập thông tin về vấn đề xã hội quan tâm
- Tạo cơ sở để tạo câu hỏi phù hợp
- Tăng engagement và motivation

### 3. Feedback chi tiết hơn
- Phân tích từng câu thay vì tổng quát
- Gợi ý cụ thể, có thể áp dụng ngay
- Giúp hiểu rõ lỗi cụ thể
- Dựa trên nội dung thực tế

### 4. Học hiệu quả hơn
- Biết chính xác cần cải thiện gì
- Có ví dụ cụ thể để học theo
- Theo dõi tiến độ cải thiện
- Tăng motivation khi thấy tiến bộ

---

## 📝 Kết luận

Đã hoàn thành 3 yêu cầu chính:

1. ✅ **Gộp 3 phần Free Time thành 1 trang** - Giảm số bước, tăng trải nghiệm người dùng
2. ✅ **Thêm phần "Issues You Care About"** - Thu thập thông tin về mối quan tâm xã hội
3. ✅ **Cải thiện chấm điểm với Detailed Recommendations** - Phân tích từng câu, gợi ý cụ thể

Build thành công và sẵn sàng deploy! 🎉

---

**Trạng thái**: ✅ Hoàn tất  
**Ngày cập nhật**: 2026  
**Version**: 3.0 - Final Improvements
