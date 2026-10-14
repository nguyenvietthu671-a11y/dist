import { TestQuestion, SurveyAnswers } from '../types';

export const warmupQuestion: TestQuestion = {
  id: 'warmup',
  prompt: "Let's start the interview now. Tell me something about yourself.",
  type: 'warmup',
  timeLimit: 60,
};

// Question templates that can be personalized with survey data
const questionTemplates = {
  employment: {
    worker: [
      "Tell me about your job. What are your main responsibilities?",
      "Describe a typical day at your workplace.",
      "What do you like most about your job?",
      "Tell me about a challenge you faced at work and how you handled it.",
      "How has your job changed over the years?",
    ],
    housewife: [
      "Tell me about your daily routine at home.",
      "What do you enjoy most about managing a household?",
      "Describe a typical day for you.",
      "How do you balance different responsibilities at home?",
      "Tell me about something you're proud of accomplishing at home.",
    ],
    teacher: [
      "Tell me about your experience as a teacher.",
      "What do you enjoy most about teaching?",
      "Describe a memorable moment with your students.",
      "How do you handle challenges in the classroom?",
      "What changes would you like to see in education?",
    ],
    student: [
      "Tell me about your studies. What are you studying and why?",
      "Describe a typical day as a student.",
      "What do you enjoy most about your studies?",
      "Tell me about a challenging course or project you've had.",
      "What are your future career goals?",
    ],
  },
  living: {
    alone: [
      "Describe where you live. What do you like about your home?",
      "What are the advantages and disadvantages of living alone?",
      "Tell me about your neighborhood.",
      "How do you make your home comfortable?",
    ],
    roommates: [
      "Tell me about living with your roommates. How do you get along?",
      "Describe your living situation. What's it like sharing a space?",
      "What rules do you and your roommates follow?",
      "Tell me about a fun experience you've had with your roommates.",
    ],
    family: [
      "Tell me about your family and your home life.",
      "Describe a typical family gathering or celebration.",
      "What traditions does your family have?",
      "How has your family influenced who you are today?",
    ],
    dormitory: [
      "Describe your experience living in a dormitory.",
      "What do you like and dislike about dorm life?",
      "Tell me about your dormitory friends.",
      "How do you study and relax in your dormitory?",
    ],
    military: [
      "Tell me about your experience living in military housing.",
      "How is military housing different from civilian housing?",
      "Describe your daily routine in military housing.",
      "What do you enjoy about the military community?",
    ],
  },
  freeTime: {
    movies: "Tell me about a movie you watched recently. What did you think about it?",
    clubbing: "Describe a night out with friends. What makes it memorable?",
    performance: "Tell me about a performance or play you enjoyed. What made it special?",
    concert: "Describe a concert you attended. What was the experience like?",
    park: "Tell me about your favorite park or outdoor space. What do you do there?",
    camping: "Describe a camping trip you've been on. What happened?",
    beach: "Tell me about a memorable beach experience. What did you do?",
    watchSports: "What sports do you enjoy watching? Tell me about a memorable game.",
    kidsSports: "Tell me about watching your kids play sports. How do you feel during their games?",
    coaching: "Describe your experience coaching sports. What do you teach your players?",
    soloGames: "What games do you enjoy playing by yourself? Why do you like them?",
    groupGames: "Tell me about a fun game night with friends or adults.",
    kidsGames: "Describe playing games with kids. What games do you enjoy?",
    homework: "Tell me about helping your child with homework. What subjects do you help with?",
    housework: "Describe your approach to housework. What tasks do you do regularly?",
    carMaintenance: "Tell me about maintaining your car. What do you do to keep it running well?",
  },
  interests: {
    reading: "Tell me about a book you've read recently. What did you think about it?",
    music: "What kind of music do you enjoy? Tell me about your favorite artist or song.",
    instrument: "Tell me about playing your musical instrument. How did you learn?",
    singingAlone: "What songs do you enjoy singing? How does singing make you feel?",
    singingGroup: "Tell me about singing with a group. What kind of music do you perform?",
    danceTeach: "Describe your experience teaching dance. What styles do you teach?",
    dancing: "Tell me about your dancing experience. What styles do you enjoy?",
    writing: "What do you enjoy writing about? Tell me about your writing.",
    painting: "Describe your painting or drawing. What subjects do you like to create?",
    sewing: "Tell me about your sewing projects. What have you made?",
    knitting: "Describe your knitting or cross-stitching. What are you working on?",
    cooking: "Tell me about your cooking. What's your signature dish?",
    gardening: "Describe your garden. What do you grow and how do you care for it?",
    pets: "Tell me about your pets. How do you take care of them?",
  },
  sports: {
    basketball: "Tell me about playing basketball. What position do you play?",
    baseball: "Describe your experience with baseball or softball.",
    soccer: "Tell me about playing soccer. What do you enjoy about it?",
    football: "Describe your experience with American football.",
    rugby: "Tell me about playing rugby. What do you like about the sport?",
    golf: "Describe your golf game. How often do you play?",
    volleyball: "Tell me about playing volleyball. What position do you prefer?",
    tennis: "Describe your tennis experience. How did you learn to play?",
    badminton: "Tell me about playing badminton. What do you enjoy about it?",
    pingpong: "Describe your table tennis experience. How often do you play?",
    swimming: "Tell me about swimming. What strokes do you prefer?",
    biking: "Describe your biking experience. Where do you like to ride?",
    motorbiking: "Tell me about motorbiking. What routes do you enjoy?",
    skiing: "Describe your skiing or snowboarding experience.",
    waterskiing: "Tell me about water skiing. How did you learn?",
    iceskating: "Describe your ice skating experience. How often do you go?",
    rollerblading: "Tell me about rollerblading. Where do you like to skate?",
    horseriding: "Describe your horseback riding experience.",
    jogging: "Tell me about your jogging routine. How far do you usually run?",
    walking: "Describe your walking habits. Where do you like to walk?",
    yoga: "Tell me about your yoga practice. What styles do you prefer?",
    hiking: "Describe a memorable hiking or trekking experience.",
    fishing: "Tell me about fishing. Where do you like to fish?",
    boating: "Describe your experience riding a boat. What kind of boats do you enjoy?",
    workout: "Tell me about your workout routine at the gym.",
    gymnastics: "Describe your gymnastics experience.",
    none: "What activities do you enjoy if you don't do sports or exercise?",
  },
  travel: {
    domesticBusiness: "Tell me about a domestic business trip you took. What happened?",
    overseasBusiness: "Describe an overseas business trip. What was the experience like?",
    noTravel: "What do you enjoy doing for vacation at home?",
    domesticTrip: "Tell me about a domestic trip you took. Where did you go?",
    overseasTrip: "Describe an overseas trip you took. What was memorable about it?",
  },
};

// Follow-up question templates
const followUpTemplates = [
  "Can you tell me more about that? What happened next?",
  "How did that experience make you feel?",
  "What did you learn from that experience?",
  "Would you do it again? Why or why not?",
  "How has this affected your life?",
  "What advice would you give someone about this?",
  "Compare this to a similar experience you've had.",
  "What was the most challenging part?",
];

// Role-play scenarios
const rolePlayTemplates = [
  "Imagine you're at a restaurant. Order food and ask the waiter questions about the menu.",
  "Imagine you need to explain a problem to your boss and ask for a day off. Role-play this conversation.",
  "Imagine you're helping a friend plan a trip. Give recommendations and answer their questions.",
  "Imagine you're at a job interview. Answer questions about your experience and goals.",
  "Imagine you're calling customer service about a problem. Explain the issue and negotiate a solution.",
];

export function generatePersonalizedQuestions(surveyAnswers: SurveyAnswers, formNumber: number): TestQuestion[] {
  const questions: TestQuestion[] = [];
  let questionId = 1;

  // Get employment-related question
  const employmentQ = questionTemplates.employment[surveyAnswers.employment as keyof typeof questionTemplates.employment];
  if (employmentQ) {
    const q = Array.isArray(employmentQ) 
      ? employmentQ[Math.floor(Math.random() * employmentQ.length)]
      : employmentQ;
    questions.push({
      id: `q${questionId++}`,
      prompt: q,
      type: 'experience',
      timeLimit: formNumber >= 3 ? 120 : 90,
    });
  }

  // Get living-related question
  const livingQ = questionTemplates.living[surveyAnswers.living as keyof typeof questionTemplates.living];
  if (livingQ) {
    const q = Array.isArray(livingQ) 
      ? livingQ[Math.floor(Math.random() * livingQ.length)]
      : livingQ;
    questions.push({
      id: `q${questionId++}`,
      prompt: q,
      type: 'experience',
      timeLimit: formNumber >= 3 ? 120 : 90,
    });
  }

  // Get free time questions (pick 2-3 based on form)
  const freeTimeCount = formNumber >= 3 ? 3 : 2;
  const selectedFreeTime = [...surveyAnswers.freeTime]
    .sort(() => Math.random() - 0.5)
    .slice(0, freeTimeCount);
  
  selectedFreeTime.forEach(activity => {
    const q = questionTemplates.freeTime[activity as keyof typeof questionTemplates.freeTime];
    if (q) {
      questions.push({
        id: `q${questionId++}`,
        prompt: q,
        type: 'experience',
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
    }
  });

  // Get interest question
  if (surveyAnswers.interests.length > 0) {
    const interest = surveyAnswers.interests[Math.floor(Math.random() * surveyAnswers.interests.length)];
    const q = questionTemplates.interests[interest as keyof typeof questionTemplates.interests];
    if (q) {
      questions.push({
        id: `q${questionId++}`,
        prompt: q,
        type: 'experience',
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
    }
  }

  // Get sports question
  if (surveyAnswers.sports.length > 0) {
    const sport = surveyAnswers.sports[Math.floor(Math.random() * surveyAnswers.sports.length)];
    const q = questionTemplates.sports[sport as keyof typeof questionTemplates.sports];
    if (q) {
      questions.push({
        id: `q${questionId++}`,
        prompt: q,
        type: 'experience',
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
    }
  }

  // Get travel question
  if (surveyAnswers.travel.length > 0) {
    const travel = surveyAnswers.travel[Math.floor(Math.random() * surveyAnswers.travel.length)];
    const q = questionTemplates.travel[travel as keyof typeof questionTemplates.travel];
    if (q) {
      questions.push({
        id: `q${questionId++}`,
        prompt: q,
        type: 'experience',
        timeLimit: formNumber >= 3 ? 120 : 90,
      });
    }
  }

  // Add role-play for higher forms
  if (formNumber >= 2) {
    const rolePlay = rolePlayTemplates[Math.floor(Math.random() * rolePlayTemplates.length)];
    questions.push({
      id: `q${questionId++}`,
      prompt: rolePlay,
      type: 'roleplay',
      timeLimit: formNumber >= 3 ? 120 : 90,
    });
  }

  // Add follow-up questions for higher forms
  if (formNumber >= 3 && questions.length > 0) {
    const followUp = followUpTemplates[Math.floor(Math.random() * followUpTemplates.length)];
    questions.push({
      id: `q${questionId++}`,
      prompt: followUp,
      type: 'followup',
      timeLimit: 120,
    });
  }

  // Ensure minimum questions based on form
  const minQuestions = formNumber === 1 ? 4 : formNumber === 2 ? 5 : formNumber === 3 ? 7 : 5;
  while (questions.length < minQuestions) {
    const genericQuestions = [
      "Describe a memorable experience from the past year. What happened?",
      "Tell me about a person who has influenced you. How have they affected your life?",
      "Describe a challenge you overcame. What did you learn from it?",
      "Tell me about a place you'd like to visit. Why does it interest you?",
      "Describe something you're passionate about. Why is it important to you?",
    ];
    questions.push({
      id: `q${questionId++}`,
      prompt: genericQuestions[questions.length % genericQuestions.length],
      type: 'experience',
      timeLimit: formNumber >= 3 ? 120 : 90,
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
