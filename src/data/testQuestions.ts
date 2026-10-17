import { TestQuestion, SurveyAnswers } from '../types';

// Warm-up questions (2-3 questions to get comfortable)
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

// Topic threads - each topic has 3-4 sequential questions
interface TopicThread {
  topic: string;
  questions: {
    prompt: string;
    type: 'experience' | 'roleplay' | 'followup';
  }[];
}

const topicThreads: Record<string, TopicThread> = {
  work: {
    topic: 'Work/Career',
    questions: [
      { prompt: "Tell me about your job. What are your main responsibilities?", type: 'experience' },
      { prompt: "Describe a typical day at your workplace.", type: 'experience' },
      { prompt: "Tell me about a challenging situation you faced at work. How did you handle it?", type: 'experience' },
      { prompt: "If you could change one thing about your job, what would it be and why?", type: 'experience' },
    ],
  },
  education: {
    topic: 'Education/Studies',
    questions: [
      { prompt: "What are you studying? Tell me about your major or field of study.", type: 'experience' },
      { prompt: "Describe a typical day as a student. What do you do?", type: 'experience' },
      { prompt: "Tell me about a difficult class or assignment you had. How did you manage it?", type: 'experience' },
      { prompt: "How has your education prepared you for your future career?", type: 'experience' },
    ],
  },
  dailyRoutine: {
    topic: 'Daily Life',
    questions: [
      { prompt: "Describe your morning routine. What do you do when you wake up?", type: 'experience' },
      { prompt: "Tell me about your daily schedule. What do you usually do throughout the day?", type: 'experience' },
      { prompt: "How is your weekend routine different from your weekday routine?", type: 'experience' },
      { prompt: "If you could change one thing about your daily routine, what would it be and why?", type: 'experience' },
    ],
  },
  hobbies: {
    topic: 'Hobbies/Interests',
    questions: [
      { prompt: "What do you like to do in your free time? Tell me about your hobbies.", type: 'experience' },
      { prompt: "Describe your favorite hobby. How did you get started with it?", type: 'experience' },
      { prompt: "Tell me about a memorable experience related to your hobby.", type: 'experience' },
      { prompt: "If you had more free time, what new hobby would you like to try and why?", type: 'experience' },
    ],
  },
  travel: {
    topic: 'Travel',
    questions: [
      { prompt: "Tell me about a memorable trip you've taken. Where did you go?", type: 'experience' },
      { prompt: "Describe what you did during that trip. What was your favorite part?", type: 'experience' },
      { prompt: "Tell me about a travel experience that didn't go as planned. What happened?", type: 'experience' },
      { prompt: "If you could travel anywhere in the world, where would you go and why?", type: 'experience' },
    ],
  },
  family: {
    topic: 'Family',
    questions: [
      { prompt: "Tell me about your family. Who are the members of your family?", type: 'experience' },
      { prompt: "Describe a fun activity you do with your family. What do you usually do?", type: 'experience' },
      { prompt: "Tell me about a family tradition or celebration. How do you celebrate it?", type: 'experience' },
      { prompt: "How has your family influenced who you are today? Give specific examples.", type: 'experience' },
    ],
  },
  friends: {
    topic: 'Friends',
    questions: [
      { prompt: "Tell me about your best friend or a close friend. What are they like?", type: 'experience' },
      { prompt: "Describe a fun experience you had with your friends recently.", type: 'experience' },
      { prompt: "How do you and your friends spend time together? What do you usually do?", type: 'experience' },
      { prompt: "What qualities do you value most in a friendship? Why are they important?", type: 'experience' },
    ],
  },
  food: {
    topic: 'Food/Cooking',
    questions: [
      { prompt: "What is your favorite food? Why do you like it?", type: 'experience' },
      { prompt: "Do you like to cook? Tell me about a dish you can make.", type: 'experience' },
      { prompt: "Describe a special meal you had recently. What did you eat and who was there?", type: 'experience' },
      { prompt: "If you could only eat one type of cuisine for the rest of your life, what would it be and why?", type: 'experience' },
    ],
  },
  technology: {
    topic: 'Technology',
    questions: [
      { prompt: "What technology do you use every day? Tell me about your favorite devices or apps.", type: 'experience' },
      { prompt: "Describe how you use your smartphone or computer. What do you use it for most?", type: 'experience' },
      { prompt: "Tell me about a time when technology helped you solve a problem.", type: 'experience' },
      { prompt: "How do you think technology will change our lives in the future? Give examples.", type: 'experience' },
    ],
  },
  shopping: {
    topic: 'Shopping',
    questions: [
      { prompt: "Do you enjoy shopping? What do you like to buy?", type: 'experience' },
      { prompt: "Describe your favorite store or shopping mall. What do you like about it?", type: 'experience' },
      { prompt: "Tell me about a memorable shopping experience. What happened?", type: 'experience' },
      { prompt: "Imagine you're at a store and need help finding something. Ask the clerk for assistance.", type: 'roleplay' },
    ],
  },
  health: {
    topic: 'Health/Exercise',
    questions: [
      { prompt: "How do you stay healthy? Tell me about your exercise or fitness routine.", type: 'experience' },
      { prompt: "Describe a sport or physical activity you enjoy. How often do you do it?", type: 'experience' },
      { prompt: "Tell me about a time when you achieved a health or fitness goal. What did you do?", type: 'experience' },
      { prompt: "If you could improve one aspect of your health, what would it be and how would you do it?", type: 'experience' },
    ],
  },
  movies: {
    topic: 'Movies/Entertainment',
    questions: [
      { prompt: "What kind of movies or TV shows do you like? Tell me about your favorites.", type: 'experience' },
      { prompt: "Describe a movie or TV show you watched recently. What was it about?", type: 'experience' },
      { prompt: "Tell me about a movie that had a strong impact on you. Why was it memorable?", type: 'experience' },
      { prompt: "If you could star in any movie, what kind of movie would it be and what role would you play?", type: 'experience' },
    ],
  },
  music: {
    topic: 'Music',
    questions: [
      { prompt: "What kind of music do you like? Tell me about your favorite artists or songs.", type: 'experience' },
      { prompt: "Do you play any musical instruments? Tell me about your experience.", type: 'experience' },
      { prompt: "Describe a concert or live music event you attended. What was it like?", type: 'experience' },
      { prompt: "How does music affect your mood or daily life? Give specific examples.", type: 'experience' },
    ],
  },
  home: {
    topic: 'Home/Living',
    questions: [
      { prompt: "Describe where you live. What is your home like?", type: 'experience' },
      { prompt: "Tell me about your neighborhood. What do you like about it?", type: 'experience' },
      { prompt: "Describe your favorite room in your home. What do you do there?", type: 'experience' },
      { prompt: "If you could redesign your home, what changes would you make and why?", type: 'experience' },
    ],
  },
  weather: {
    topic: 'Weather/Seasons',
    questions: [
      { prompt: "What's the weather like where you live? Describe the different seasons.", type: 'experience' },
      { prompt: "What's your favorite season? Why do you like it?", type: 'experience' },
      { prompt: "Tell me about a memorable weather experience. What happened?", type: 'experience' },
      { prompt: "How does the weather affect your daily activities? Give examples.", type: 'experience' },
    ],
  },
};

// Role-play scenarios (standalone)
const roleplayScenarios = [
  {
    prompt: "Imagine you're at a restaurant and need to order food. Talk to the waiter.",
    type: 'roleplay' as const,
  },
  {
    prompt: "Imagine you're calling your boss to say you can't come to work today. What do you say?",
    type: 'roleplay' as const,
  },
  {
    prompt: "Imagine you're at a hotel and there's a problem with your room. Call the front desk to explain.",
    type: 'roleplay' as const,
  },
  {
    prompt: "Imagine a friend wants to borrow money from you, but you can't lend it. Explain why politely.",
    type: 'roleplay' as const,
  },
  {
    prompt: "Imagine you're at a job interview. Answer questions about your experience and goals.",
    type: 'roleplay' as const,
  },
];

// Determine which topics to use based on survey answers
function selectTopics(surveyAnswers: SurveyAnswers): string[] {
  const topics: string[] = [];

  // Always include work or education based on employment
  if (surveyAnswers.employment === 'student') {
    topics.push('education');
  } else {
    topics.push('work');
  }

  // Add daily routine
  topics.push('dailyRoutine');

  // Add hobbies if they have interests
  if (surveyAnswers.interests.length > 0) {
    // Map interests to topics
    const interestToTopic: Record<string, string> = {
      music: 'music',
      instrument: 'music',
      singingAlone: 'music',
      singingGroup: 'music',
      cooking: 'food',
      reading: 'movies', // close to entertainment
      painting: 'hobbies',
      drawing: 'hobbies',
      gardening: 'hobbies',
      pets: 'hobbies',
      dancing: 'hobbies',
      writing: 'hobbies',
    };

    const hobbyTopics = surveyAnswers.interests
      .map(i => interestToTopic[i])
      .filter(t => t && !topics.includes(t));
    
    if (hobbyTopics.length > 0) {
      topics.push(hobbyTopics[0]);
    } else {
      topics.push('hobbies');
    }
  } else {
    topics.push('hobbies');
  }

  // Add travel if they have travel experience
  if (surveyAnswers.travel.length > 0) {
    topics.push('travel');
  }

  // Add family or friends
  topics.push(surveyAnswers.living === 'family' ? 'family' : 'friends');

  // Add food (universal topic)
  topics.push('food');

  // Add technology
  topics.push('technology');

  // Add health if they do sports
  if (surveyAnswers.sports.length > 0 && !surveyAnswers.sports.includes('none')) {
    topics.push('health');
  }

  // Add home
  topics.push('home');

  return topics;
}

// Generate personalized questions based on survey answers
export function generatePersonalizedQuestions(surveyAnswers: SurveyAnswers, formNumber: number): TestQuestion[] {
  const questions: TestQuestion[] = [];
  let questionId = 1;

  // Select topics based on survey
  const selectedTopics = selectTopics(surveyAnswers);

  // For each topic, add 3-4 questions from the topic thread
  selectedTopics.forEach(topicKey => {
    const thread = topicThreads[topicKey];
    if (!thread) return;

    // Determine how many questions from this topic based on form level
    const questionCount = formNumber >= 3 ? 4 : formNumber >= 2 ? 3 : 3;
    const threadQuestions = thread.questions.slice(0, questionCount);

    threadQuestions.forEach((q, idx) => {
      questions.push({
        id: `q${questionId++}`,
        prompt: q.prompt,
        type: q.type,
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
    });
  });

  // Add 1-2 role-play scenarios for higher forms
  if (formNumber >= 2) {
    const roleplayCount = formNumber >= 3 ? 2 : 1;
    const selectedRoleplays = roleplayScenarios
      .sort(() => Math.random() - 0.5)
      .slice(0, roleplayCount);

    selectedRoleplays.forEach(rp => {
      questions.push({
        id: `q${questionId++}`,
        prompt: rp.prompt,
        type: 'roleplay',
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
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
