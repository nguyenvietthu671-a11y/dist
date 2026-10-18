# Step 3 Survey Fix - Free Time Selection Logic

## 📋 Problem Statement

**Original requirement (misunderstood):**
- Each category (Daily Activities, Relaxation, Sports) requires 6 selections
- Total: 18 selections (6+6+6)

**Correct requirement:**
- **Total: 6 selections across all 3 categories**
- **Each category must have at least 1 selection**
- Example valid distributions:
  - Daily: 3, Relaxation: 2, Sports: 1 ✓
  - Daily: 2, Relaxation: 2, Sports: 2 ✓
  - Daily: 4, Relaxation: 1, Sports: 1 ✓
  - Daily: 1, Relaxation: 1, Sports: 1 ✗ (only 3 total)
  - Daily: 6, Relaxation: 0, Sports: 0 ✗ (missing categories)

---

## 🔧 Changes Made

### 1. Updated Validation Logic (`canProceed()`)

**Before:**
```typescript
case 2: {
  // Check if all 3 categories have 6 selections each
  const dailyCount = answers.freeTime.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length;
  const relaxationCount = answers.freeTime.filter(v => relaxationOptions.some(o => o.value === v)).length;
  const sportsCount = answers.freeTime.filter(v => sportsOptions.some(o => o.value === v)).length;
  return dailyCount === 6 && relaxationCount === 6 && sportsCount === 6;
}
```

**After:**
```typescript
case 2: {
  // Check if total = 6 AND each category has at least 1
  const totalSelected = answers.freeTime.length;
  const dailyCount = answers.freeTime.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length;
  const relaxationCount = answers.freeTime.filter(v => relaxationOptions.some(o => o.value === v)).length;
  const sportsCount = answers.freeTime.filter(v => sportsOptions.some(o => o.value === v)).length;
  
  return totalSelected === 6 && dailyCount >= 1 && relaxationCount >= 1 && sportsCount >= 1;
}
```

**Key changes:**
- ✅ Check `totalSelected === 6` (not each category = 6)
- ✅ Check each category `>= 1` (not === 6)

---

### 2. Updated Toggle Logic (`toggleArrayItem()`)

**Before:**
```typescript
const toggleArrayItem = (field: keyof SurveyAnswers, value: string) => {
  const current = answers[field] as string[];
  if (current.includes(value)) {
    setAnswers({ ...answers, [field]: current.filter(v => v !== value) });
  } else {
    setAnswers({ ...answers, [field]: [...current, value] });
  }
};
```

**After:**
```typescript
const toggleArrayItem = (field: keyof SurveyAnswers, value: string) => {
  const current = answers[field] as string[];
  
  if (field === 'freeTime') {
    // Special logic for freeTime to ensure each category has at least 1
    if (current.includes(value)) {
      // Trying to deselect - check if this would make a category empty
      const category = dailyActivitiesOptions.some(o => o.value === value) ? 'daily' :
                      relaxationOptions.some(o => o.value === value) ? 'relaxation' : 'sports';
      
      const dailyCount = current.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length;
      const relaxationCount = current.filter(v => relaxationOptions.some(o => o.value === v)).length;
      const sportsCount = current.filter(v => sportsOptions.some(o => o.value === v)).length;
      
      // Prevent deselecting if it would make the category empty
      if (category === 'daily' && dailyCount === 1) return;
      if (category === 'relaxation' && relaxationCount === 1) return;
      if (category === 'sports' && sportsCount === 1) return;
      
      setAnswers({ ...answers, [field]: current.filter(v => v !== value) });
    } else {
      // Trying to select - check if we haven't reached 6 total
      if (current.length < 6) {
        setAnswers({ ...answers, [field]: [...current, value] });
      }
    }
  } else {
    // Normal toggle for other fields
    if (current.includes(value)) {
      setAnswers({ ...answers, [field]: current.filter(v => v !== value) });
    } else {
      setAnswers({ ...answers, [field]: [...current, value] });
    }
  }
};
```

**Key changes:**
- ✅ Prevent deselecting if it would make a category have 0 selections
- ✅ Prevent selecting if total already = 6
- ✅ Determine which category the option belongs to
- ✅ Check category count before allowing deselect

---

### 3. Updated UI Display

**Before:**
```tsx
<h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
  <span className="text-2xl">📅</span>
  What do you usually do? (Select 6)
  <span className="text-sm text-gray-400 font-normal">
    ({answers.freeTime.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length}/6)
  </span>
</h3>
```

**After:**
```tsx
<h3 className="text-lg font-semibold text-white mb-3 flex items-center gap-2">
  <span className="text-2xl">📅</span>
  What do you usually do?
  <span className={`text-sm font-normal ${
    answers.freeTime.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length >= 1 
      ? 'text-green-400' 
      : 'text-gray-400'
  }`}>
    ({answers.freeTime.filter(v => dailyActivitiesOptions.some(o => o.value === v)).length} selected, min 1)
  </span>
</h3>
```

**Key changes:**
- ✅ Removed "(Select 6)" from title
- ✅ Changed counter to show "min 1" instead of "/6"
- ✅ Added green color when category has ≥ 1 selection
- ✅ Added summary box at top showing total selected

**New summary box:**
```tsx
<div className="p-4 rounded-xl bg-purple-500/10 border border-purple-500/30">
  <p className="text-purple-300 font-medium mb-2">
    📋 Select a total of 6 options across all 3 categories below. Each category must have at least 1 selection.
  </p>
  <p className="text-gray-400 text-sm">
    Total selected: <span className="text-white font-bold">{answers.freeTime.length}/6</span>
  </p>
</div>
```

---

## 🎯 How It Works Now

### User Flow:

1. **User sees summary box:**
   - "Select a total of 6 options across all 3 categories"
   - "Each category must have at least 1 selection"
   - "Total selected: 0/6"

2. **User selects options:**
   - Can select any option from any category
   - Counter updates: "Total selected: 1/6"
   - Category counter shows: "(1 selected, min 1)" in green

3. **User tries to deselect last item in a category:**
   - System prevents deselection
   - User must select from another category first

4. **User reaches 6 total selections:**
   - All other options become disabled (grayed out)
   - User can only deselect (if category has > 1)

5. **User clicks "Next":**
   - Validation checks:
     - Total = 6? ✓
     - Daily ≥ 1? ✓
     - Relaxation ≥ 1? ✓
     - Sports ≥ 1? ✓
   - If all pass → proceed to next step

---

## 📊 Example Scenarios

### Scenario 1: Valid Selection
```
Daily Activities: 3 selected ✓
Relaxation: 2 selected ✓
Sports: 1 selected ✓
Total: 6 ✓
→ Can proceed ✓
```

### Scenario 2: Missing Category
```
Daily Activities: 4 selected ✓
Relaxation: 2 selected ✓
Sports: 0 selected ✗
Total: 6 ✓
→ Cannot proceed (Sports has 0)
```

### Scenario 3: Not Enough Total
```
Daily Activities: 2 selected ✓
Relaxation: 1 selected ✓
Sports: 1 selected ✓
Total: 4 ✗
→ Cannot proceed (need 6 total)
```

### Scenario 4: Too Many Total
```
Daily Activities: 3 selected ✓
Relaxation: 2 selected ✓
Sports: 2 selected ✓
Total: 7 ✗
→ Cannot proceed (exceeded 6)
→ System prevents selecting 7th option
```

---

## 🎨 Visual Indicators

### Category Status:
- **Gray text**: Category has 0 selections (needs at least 1)
- **Green text**: Category has ≥ 1 selection (requirement met)

### Option Status:
- **Selected**: Purple/Cyan/Green border with background
- **Available**: Gray border, hover effect
- **Disabled**: Dark gray, no hover, cursor-not-allowed

### Summary Box:
- **Purple background**: Shows total progress
- **Bold white number**: Current/total (e.g., "3/6")
- **Clear instruction**: Explains the rule

---

## 🧪 Testing Checklist

- [x] Can select options from any category
- [x] Counter updates correctly (total and per category)
- [x] Cannot select more than 6 total
- [x] Cannot deselect last item in a category
- [x] Green indicator appears when category has ≥ 1
- [x] Summary box shows correct total
- [x] Next button disabled until requirements met
- [x] Can proceed with valid distribution (e.g., 3-2-1)
- [x] Cannot proceed with invalid distribution (e.g., 6-0-0)
- [x] Build successful

---

## 📝 Summary

**Fixed the survey logic to match the correct requirement:**
- ✅ Total: 6 selections (not 18)
- ✅ Each category: at least 1 (not exactly 6)
- ✅ Prevent invalid states (empty categories, >6 total)
- ✅ Clear visual feedback (counters, colors, summary)
- ✅ User-friendly instructions

**Build status:** ✅ Successful

---

**Last updated:** 2026
**File modified:** `src/components/BackgroundSurvey.tsx`
