import { TestQuestion, SurveyAnswers } from '../types';

// Warm-up questions (always start with these to get comfortable)
export const warmupQuestions: TestQuestion[] = [
  {
    id: 'warmup1',
    prompt: "Let's start the interview now. Tell me something about yourself.",
    type: 'warmup',
    timeLimit: 60,
  },
  {
    id: 'warmup2',
    prompt: "What did you do yesterday?",
    type: 'warmup',
    timeLimit: 60,
  },
];

// Question templates organized by category and proficiency level
const questionBank = {
  // Employment/Work questions
  work: {
    novice: [
      "Tell me about your job. What do you do?",
      "Describe your workplace. What is it like?",
      "What do you like about your job?",
    ],
    intermediate: [
      "Describe a typical day at your work. What do you do from morning to evening?",
      "Tell me about a project you worked on recently. What was your role?",
      "Compare your current job to a previous job. What's different?",
      "Describe a challenge you faced at work. How did you handle it?",
    ],
    advanced: [
      "Tell me about a significant achievement in your career. What made it important?",
      "Describe how your industry has changed over the past few years. What impact has this had?",
      "If you could redesign your workplace, what changes would you make and why?",
      "Tell me about a time you had to persuade someone at work. What was the situation and outcome?",
    ],
  },

  // Education/Study questions
  education: {
    novice: [
      "What are you studying? Tell me about your classes.",
      "Describe your school or university. What is it like?",
      "What is your favorite subject? Why?",
    ],
    intermediate: [
      "Describe a typical day as a student. What do you do?",
      "Tell me about a difficult class or assignment. How did you handle it?",
      "Compare studying online to studying in person. What are the differences?",
      "Describe a teacher who influenced you. How did they help you?",
    ],
    advanced: [
      "Tell me about a research project or paper you worked on. What did you learn?",
      "How has your education prepared you for your future career? Give specific examples.",
      "If you could change one thing about the education system, what would it be and why?",
      "Describe a time when you had to explain a complex topic to someone. How did you do it?",
    ],
  },

  // Daily life/Routine questions
  dailyLife: {
    novice: [
      "What do you usually do in the morning?",
      "Describe your home. What rooms does it have?",
      "What do you like to eat for breakfast?",
    ],
    intermediate: [
      "Describe your daily routine. What do you do from morning to night?",
      "Tell me about your neighborhood. What's it like to live there?",
      "Compare your weekday routine to your weekend routine.",
      "Describe a chore you do regularly. How do you feel about it?",
    ],
    advanced: [
      "How has your daily routine changed over the past few years? What caused these changes?",
      "Tell me about a time when your routine was disrupted. How did you adapt?",
      "If you could redesign your daily schedule, what would you change and why?",
      "Describe how technology has affected your daily life. Give specific examples.",
    ],
  },

  // Free time/Hobbies questions
  hobbies: {
    novice: [
      "What do you like to do in your free time?",
      "Tell me about a hobby you have. What do you do?",
      "Do you like watching movies? What kind?",
    ],
    intermediate: [
      "Describe your favorite hobby. How did you get started?",
      "Tell me about a fun activity you did recently. What happened?",
      "Compare two of your hobbies. Which do you prefer and why?",
      "Describe a skill you'd like to learn. Why does it interest you?",
    ],
    advanced: [
      "Tell me about how your hobbies have evolved over time. What influenced these changes?",
      "Describe a time when your hobby helped you in an unexpected way.",
      "If you had unlimited time and resources, what new hobby would you pursue and why?",
      "How do your hobbies reflect your personality? Give specific examples.",
    ],
  },

  // Travel/Experience questions
  travel: {
    novice: [
      "Have you traveled anywhere recently? Where did you go?",
      "Tell me about a place you'd like to visit. Why?",
      "Do you prefer beaches or mountains? Why?",
    ],
    intermediate: [
      "Describe a memorable trip you took. What did you do?",
      "Tell me about the best vacation you've ever had. What made it special?",
      "Compare traveling alone to traveling with others. What are the pros and cons?",
      "Describe a travel experience that didn't go as planned. What happened?",
    ],
    advanced: [
      "Tell me about a trip that changed your perspective on something. What happened?",
      "Describe how tourism has affected a place you know. What are the positive and negative impacts?",
      "If you could live in another country for a year, where would you choose and why?",
      "Tell me about a cultural experience during travel that surprised you. What did you learn?",
    ],
  },

  // Food/Cooking questions
  food: {
    novice: [
      "What is your favorite food? Why do you like it?",
      "Do you like to cook? What can you make?",
      "Tell me about a restaurant you like. What do you order?",
    ],
    intermediate: [
      "Describe a special meal you had recently. What did you eat and who was there?",
      "Tell me about a traditional dish from your culture. How is it made?",
      "Compare eating at home to eating at restaurants. What do you prefer?",
      "Describe a cooking experience that went wrong. What happened?",
    ],
    advanced: [
      "Tell me about how food culture has changed in your country. What caused these changes?",
      "Describe a meal that has special meaning to you. Why is it important?",
      "If you could only eat one cuisine for the rest of your life, what would it be and why?",
      "How has your relationship with food changed over the years? Give specific examples.",
    ],
  },

  // Technology questions
  technology: {
    novice: [
      "What do you use your phone for? Tell me about your favorite apps.",
      "Do you use social media? What platforms do you use?",
      "Tell me about a website you visit often. What do you do there?",
    ],
    intermediate: [
      "Describe how you use technology in your daily life. Give examples.",
      "Tell me about a time when technology helped you solve a problem.",
      "Compare using a computer to using a phone. When do you use each?",
      "Describe an app or website that you find very useful. Why do you like it?",
    ],
    advanced: [
      "Tell me about how technology has changed communication. What are the positive and negative effects?",
      "Describe a time when technology caused a problem. How did you handle it?",
      "If you could invent a new technology, what would it be and how would it help people?",
      "How do you think technology will change your field in the next 10 years? Give specific examples.",
    ],
  },

  // Family/Friends questions
  relationships: {
    novice: [
      "Tell me about your family. How many people are in your family?",
      "Do you have any brothers or sisters? Tell me about them.",
      "Who is your best friend? What do you do together?",
    ],
    intermediate: [
      "Describe a fun activity you did with your family or friends recently.",
      "Tell me about someone who is important to you. Why are they special?",
      "Compare spending time with family to spending time with friends. What's different?",
      "Describe a time when you helped a friend or family member. What did you do?",
    ],
    advanced: [
      "Tell me about how your relationships have changed over the years. What caused these changes?",
      "Describe a difficult conversation you had with someone close to you. How did you handle it?",
      "How have your friends or family influenced your life choices? Give specific examples.",
      "If you could give advice to your younger self about relationships, what would you say and why?",
    ],
  },

  // Role-play scenarios
  roleplay: {
    novice: [
      "Imagine you're at a restaurant. Order some food from the waiter.",
      "Imagine you're at a store. Ask the clerk for help finding something.",
      "Imagine you're meeting a new neighbor. Introduce yourself.",
    ],
    intermediate: [
      "Imagine you need to call your boss to say you're sick. What do you say?",
      "Imagine you're at a hotel and there's a problem with your room. Call the front desk.",
      "Imagine a friend wants to borrow money. Explain why you can't lend it.",
      "Imagine you're at a job interview. Answer questions about your experience.",
    ],
    advanced: [
      "Imagine you're negotiating a raise with your boss. Present your case.",
      "Imagine you're mediating a conflict between two coworkers. What do you say to each?",
      "Imagine you're giving a presentation to convince your company to adopt a new policy.",
      "Imagine you're a consultant advising a client on expanding to a new market.",
    ],
  },
};

// Determine proficiency level based on form number
function getLevelFromForm(formNumber: number): 'novice' | 'intermediate' | 'advanced' {
  if (formNumber <= 2) return 'novice';
  if (formNumber <= 3) return 'intermediate';
  return 'advanced';
}

// Generate personalized questions based on survey answers
export function generatePersonalizedQuestions(surveyAnswers: SurveyAnswers, formNumber: number): TestQuestion[] {
  const questions: TestQuestion[] = [];
  const level = getLevelFromForm(formNumber);
  let questionId = 1;

  // Helper to pick random items from array
  const pickRandom = <T,>(arr: T[], count: number): T[] => {
    const shuffled = [...arr].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  // 1. Employment/Education question (based on survey)
  if (surveyAnswers.employment === 'student') {
    questions.push({
      id: `q${questionId++}`,
      prompt: pickRandom(questionBank.education[level], 1)[0],
      type: 'experience',
      timeLimit: 90,
    });
  } else {
    questions.push({
      id: `q${questionId++}`,
      prompt: pickRandom(questionBank.work[level], 1)[0],
      type: 'experience',
      timeLimit: 90,
    });
  }

  // 2. Living situation question
  questions.push({
    id: `q${questionId++}`,
    prompt: pickRandom(questionBank.dailyLife[level], 1)[0],
    type: 'experience',
    timeLimit: 90,
  });

  // 3-4. Free time/Hobbies questions (based on survey interests)
  if (surveyAnswers.interests.length > 0) {
    const interest = surveyAnswers.interests[Math.floor(Math.random() * surveyAnswers.interests.length)];
    questions.push({
      id: `q${questionId++}`,
      prompt: pickRandom(questionBank.hobbies[level], 1)[0],
      type: 'experience',
      timeLimit: 90,
    });
  }

  // 5. Travel/Experience question (if they have travel experience)
  if (surveyAnswers.travel.length > 0) {
    questions.push({
      id: `q${questionId++}`,
      prompt: pickRandom(questionBank.travel[level], 1)[0],
      type: 'experience',
      timeLimit: 90,
    });
  }

  // 6. Relationships question
  questions.push({
    id: `q${questionId++}`,
    prompt: pickRandom(questionBank.relationships[level], 1)[0],
    type: 'experience',
    timeLimit: 90,
  });

  // 7. Technology question (modern topic)
  questions.push({
    id: `q${questionId++}`,
    prompt: pickRandom(questionBank.technology[level], 1)[0],
    type: 'experience',
    timeLimit: 90,
  });

  // 8. Food question (universal topic)
  questions.push({
    id: `q${questionId++}`,
    prompt: pickRandom(questionBank.food[level], 1)[0],
    type: 'experience',
    timeLimit: 90,
  });

  // 9. Role-play scenario (for intermediate and above)
  if (formNumber >= 2) {
    questions.push({
      id: `q${questionId++}`,
      prompt: pickRandom(questionBank.roleplay[level], 1)[0],
      type: 'roleplay',
      timeLimit: 120,
    });
  }

  // 10-12. Additional questions based on form level
  const additionalCategories = ['work', 'education', 'dailyLife', 'hobbies', 'travel', 'relationships', 'technology', 'food'];
  const remainingCategories = additionalCategories.filter(cat => {
    // Skip categories we've already used
    return !questions.some(q => {
      const categoryQuestions = questionBank[cat as keyof typeof questionBank][level];
      return categoryQuestions.includes(q.prompt);
    });
  });

  const additionalCount = formNumber >= 3 ? 3 : formNumber >= 2 ? 2 : 1;
  const selectedCategories = pickRandom(remainingCategories, additionalCount);

  selectedCategories.forEach(category => {
    const categoryQuestions = questionBank[category as keyof typeof questionBank][level];
    questions.push({
      id: `q${questionId++}`,
      prompt: pickRandom(categoryQuestions, 1)[0],
      type: 'experience',
      timeLimit: formNumber >= 3 ? 120 : 90,
    });
  });

  // Ensure we have at least 12 questions (standard OPIc has 15)
  while (questions.length < 12) {
    const randomCategory = additionalCategories[Math.floor(Math.random() * additionalCategories.length)];
    const categoryQuestions = questionBank[randomCategory as keyof typeof questionBank][level];
    questions.push({
      id: `q${questionId++}`,
      prompt: pickRandom(categoryQuestions, 1)[0],
      type: 'experience',
      timeLimit: 90,
    });
  }

  return questions;
}

export const formDescriptions: Record<number, { range: string; label: string }> = {
  1: { range: 'Novice Low to Intermediate Low', label: 'Form 1 (NL – IL)' },
  2: { range: 'Novice Low to Intermediate High', label: 'Form 2 (NL – IH)' },
  3: { range: 'Novice Low to Advanced Low', label: 'Form 3 (NL – AL)' },
  4: { range: 'Intermediate High to Advanced High', label: 'Form 4 (IH – AH)' },
  5: { range: 'Advanced Mid to Superior', label: 'Form 5 (AL – S)' },
};
