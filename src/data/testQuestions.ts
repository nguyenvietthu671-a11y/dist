import { TestQuestion } from '../types';

export const warmupQuestion: TestQuestion = {
  id: 'warmup',
  prompt: "Let's start the interview now. Tell me something about yourself.",
  type: 'warmup',
  timeLimit: 60,
};

export const testQuestionsByForm: Record<number, TestQuestion[]> = {
  1: [
    { id: 'q1-1', prompt: "Tell me about your daily routine. What do you usually do in the morning?", type: 'experience', timeLimit: 60 },
    { id: 'q1-2', prompt: "Describe your home or apartment. What rooms does it have?", type: 'experience', timeLimit: 60 },
    { id: 'q1-3', prompt: "Talk about your favorite food. How do you cook it?", type: 'experience', timeLimit: 60 },
    { id: 'q1-4', prompt: "Describe a typical weekend for you. What activities do you enjoy?", type: 'experience', timeLimit: 60 },
    { id: 'q1-5', prompt: "Tell me about a friend or family member. What are they like?", type: 'experience', timeLimit: 60 },
  ],
  2: [
    { id: 'q2-1', prompt: "Describe your job or studies in detail. What are the main responsibilities?", type: 'experience', timeLimit: 90 },
    { id: 'q2-2', prompt: "Tell me about a memorable trip you've taken. What happened?", type: 'experience', timeLimit: 90 },
    { id: 'q2-3', prompt: "Imagine you're at a restaurant. Order food and ask questions about the menu.", type: 'roleplay', timeLimit: 90 },
    { id: 'q2-4', prompt: "Compare living in a city versus living in the countryside. What are the pros and cons?", type: 'experience', timeLimit: 90 },
    { id: 'q2-5', prompt: "Describe a hobby you're passionate about. How did you get started?", type: 'experience', timeLimit: 90 },
    { id: 'q2-6', prompt: "Tell me about a challenge you faced recently. How did you handle it?", type: 'experience', timeLimit: 90 },
  ],
  3: [
    { id: 'q3-1', prompt: "Describe your career path. How has it evolved over time, and what are your future goals?", type: 'experience', timeLimit: 120 },
    { id: 'q3-2', prompt: "Tell me about a significant cultural experience you've had. How did it change your perspective?", type: 'experience', timeLimit: 120 },
    { id: 'q3-3', prompt: "Imagine you need to convince your boss to give you a day off. Role-play this conversation.", type: 'roleplay', timeLimit: 120 },
    { id: 'q3-4', prompt: "Discuss the advantages and disadvantages of technology in education. Support your opinion with examples.", type: 'experience', timeLimit: 120 },
    { id: 'q3-5', prompt: "Narrate a story about a time when something unexpected happened during your travel. What did you learn?", type: 'experience', timeLimit: 120 },
    { id: 'q3-6', prompt: "Describe a social issue in your community. What solutions would you propose?", type: 'experience', timeLimit: 120 },
    { id: 'q3-7', prompt: "Imagine you're giving a presentation about your favorite book to a group. Summarize it and explain why you recommend it.", type: 'roleplay', timeLimit: 120 },
    { id: 'q3-8', prompt: "Talk about how your hometown has changed over the years. What impact has this had on the community?", type: 'experience', timeLimit: 120 },
  ],
  4: [
    { id: 'q4-1', prompt: "Analyze the impact of globalization on local cultures. Provide specific examples from your experience.", type: 'experience', timeLimit: 120 },
    { id: 'q4-2', prompt: "Imagine you're mediating a dispute between two colleagues. Role-play this situation.", type: 'roleplay', timeLimit: 120 },
    { id: 'q4-3', prompt: "Argue for or against the implementation of a four-day work week. Support your position with evidence.", type: 'experience', timeLimit: 120 },
    { id: 'q4-4', prompt: "Describe how social media has transformed communication in your professional life.", type: 'experience', timeLimit: 120 },
    { id: 'q4-5', prompt: "Imagine you're a consultant advising a company on expanding to a new market. Present your recommendations.", type: 'roleplay', timeLimit: 120 },
  ],
  5: [
    { id: 'q5-1', prompt: "Evaluate the ethical implications of artificial intelligence in the workplace. Present a nuanced argument.", type: 'experience', timeLimit: 150 },
    { id: 'q5-2', prompt: "Imagine you're addressing an international conference on climate policy. Present your analysis and proposals.", type: 'roleplay', timeLimit: 150 },
    { id: 'q5-3', prompt: "Discuss the relationship between economic development and environmental sustainability. Use hypothetical and real-world examples.", type: 'experience', timeLimit: 150 },
    { id: 'q5-4', prompt: "Argue whether higher education should be free. Consider multiple perspectives and provide a well-supported position.", type: 'experience', timeLimit: 150 },
    { id: 'q5-5', prompt: "Imagine you're negotiating an international trade agreement. Role-play this complex scenario.", type: 'roleplay', timeLimit: 150 },
  ],
};

export const formDescriptions: Record<number, { range: string; label: string }> = {
  1: { range: 'Novice Low to Intermediate Low', label: 'Form 1 (NL – IL)' },
  2: { range: 'Novice Low to Intermediate High', label: 'Form 2 (NL – IH)' },
  3: { range: 'Novice Low to Advanced Low', label: 'Form 3 (NL – AL)' },
  4: { range: 'Intermediate High to Advanced High', label: 'Form 4 (IH – AH)' },
  5: { range: 'Advanced Mid to Superior', label: 'Form 5 (AL – S)' },
};
