import { TestResponse, ScoringResult } from '../types';

// Scoring criteria for Advanced Low level
const AL_CRITERIA = {
  minWordCount: 80,
  idealWordCount: 150,
  minSentenceCount: 4,
  minDuration: 30,
  idealDuration: 90,
  paragraphLevel: true,
  narrationRequired: true,
  descriptionRequired: true,
};

// ACTFL proficiency descriptors
const PROFICIENCY_LEVELS = {
  'Novice Low': { min: 0, max: 25, desc: 'Discrete words and formulas' },
  'Novice Mid': { min: 25, max: 35, desc: 'Simple formulas and memorized phrases' },
  'Novice High': { min: 35, max: 45, desc: 'Simple sentences on familiar topics' },
  'Intermediate Low': { min: 45, max: 52, desc: 'Simple sentences, some connected discourse' },
  'Intermediate Mid': { min: 52, max: 58, desc: 'Strings of sentences, paragraph-level emerging' },
  'Intermediate High': { min: 58, max: 65, desc: 'Paragraph-level on familiar topics' },
  'Advanced Low': { min: 65, max: 75, desc: 'Paragraph-level narration and description' },
  'Advanced Mid': { min: 75, max: 82, desc: 'Extended discourse, handles complications' },
  'Advanced High': { min: 82, max: 90, desc: 'Near Superior, abstract topics' },
  'Superior': { min: 90, max: 100, desc: 'Abstract, hypothetical, supported opinions' },
};

function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(w => w.length > 0).length;
}

function countSentences(text: string): number {
  return text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
}

function hasConnectors(text: string): boolean {
  const connectors = ['because', 'however', 'although', 'therefore', 'moreover', 
    'furthermore', 'in addition', 'on the other hand', 'for example', 'in my opinion',
    'as a result', 'consequently', 'nevertheless', 'while', 'since', 'despite'];
  const lowerText = text.toLowerCase();
  return connectors.some(c => lowerText.includes(c));
}

function hasNarration(text: string): boolean {
  const pastTense = /\b(went|saw|did|had|was|were|said|came|took|made|found|gave|told|thought|knew|got|felt|became|showed|heard|played|ran|brought|held|began|kept|left|let|spoke|stood|grew|drew|felt)\b/i;
  return pastTense.test(text);
}

function hasDescription(text: string): boolean {
  const descriptiveWords = /\b(beautiful|amazing|wonderful|terrible|difficult|easy|interesting|important|significant|challenging|exciting|boring|complex|simple|traditional|modern|ancient|popular|famous|special|different|similar)\b/i;
  return descriptiveWords.test(text);
}

function hasOpinions(text: string): boolean {
  const opinionWords = /\b(i think|i believe|i feel|i agree|i disagree|in my opinion|from my perspective|personally|to me|it seems|it appears)\b/i;
  return opinionWords.test(text);
}

function hasAbstractTopics(text: string): boolean {
  const abstractWords = /\b(society|culture|economy|politics|education|environment|technology|philosophy|ethics|justice|freedom|equality|democracy|globalization|sustainability)\b/i;
  return abstractWords.test(text);
}

function calculateFunctionScore(responses: TestResponse[]): number {
  let score = 0;
  const totalResponses = responses.length;
  
  responses.forEach(r => {
    const text = r.transcript;
    if (hasNarration(text)) score += 10;
    if (hasDescription(text)) score += 10;
    if (hasOpinions(text)) score += 8;
    if (hasAbstractTopics(text)) score += 7;
    if (hasConnectors(text)) score += 5;
  });
  
  return Math.min(100, Math.round((score / (totalResponses * 40)) * 100));
}

function calculateAccuracyScore(responses: TestResponse[]): number {
  let score = 50; // Base score
  
  responses.forEach(r => {
    const wordCount = countWords(r.transcript);
    const sentenceCount = countSentences(r.transcript);
    
    // Fluency indicator: words per second
    const wps = wordCount / Math.max(r.duration, 1);
    if (wps >= 1.5 && wps <= 3) score += 8; // Good fluency
    else if (wps >= 1 && wps <= 4) score += 4; // Acceptable
    
    // Sentence complexity
    if (sentenceCount > 0) {
      const avgWordsPerSentence = wordCount / sentenceCount;
      if (avgWordsPerSentence >= 8 && avgWordsPerSentence <= 20) score += 7;
      else if (avgWordsPerSentence >= 5) score += 3;
    }
    
    // Content length
    if (wordCount >= AL_CRITERIA.idealWordCount) score += 10;
    else if (wordCount >= AL_CRITERIA.minWordCount) score += 5;
  });
  
  return Math.min(100, score);
}

function calculateContentScore(responses: TestResponse[]): number {
  let score = 40; // Base
  
  responses.forEach(r => {
    const wordCount = countWords(r.transcript);
    if (wordCount >= AL_CRITERIA.minWordCount) score += 8;
    if (wordCount >= AL_CRITERIA.idealWordCount) score += 5;
    if (r.duration >= AL_CRITERIA.minDuration) score += 5;
    if (r.duration >= AL_CRITERIA.idealDuration) score += 3;
    
    // Relevance check - longer responses tend to be more on-topic
    if (r.transcript.length > 200) score += 4;
  });
  
  return Math.min(100, score);
}

function calculateTextTypeScore(responses: TestResponse[]): number {
  let score = 30; // Base
  
  const allText = responses.map(r => r.transcript).join(' ');
  
  // Paragraph-level production
  const sentenceCount = countSentences(allText);
  if (sentenceCount >= 8) score += 15;
  else if (sentenceCount >= 4) score += 8;
  
  // Connected discourse
  if (hasConnectors(allText)) score += 15;
  
  // Multiple paragraph-level descriptions
  if (hasNarration(allText) && hasDescription(allText)) score += 15;
  
  // Organization
  if (sentenceCount >= 6) score += 10;
  
  return Math.min(100, score);
}

function generateFeedback(result: { functionScore: number; accuracyScore: number; contentScore: number; textTypeScore: number }): string[] {
  const feedback: string[] = [];
  
  if (result.functionScore < 60) {
    feedback.push("Your responses need more functional variety. Practice narrating events in past tense and describing people, places, and experiences in detail.");
  } else if (result.functionScore < 75) {
    feedback.push("Good functional range! Work on consistently using narration and description together in your responses.");
  } else {
    feedback.push("Excellent functional range! You demonstrate strong ability to narrate, describe, and support opinions.");
  }
  
  if (result.accuracyScore < 50) {
    feedback.push("Focus on fluency and sentence length. Try to speak in longer, more connected sentences rather than short fragments.");
  } else if (result.accuracyScore < 70) {
    feedback.push("Your accuracy is developing well. Continue working on complex sentence structures and varied vocabulary.");
  } else {
    feedback.push("Strong accuracy! Your vocabulary and grammar support clear communication at this level.");
  }
  
  if (result.contentScore < 50) {
    feedback.push("Your responses are too brief. Aim for at least 30 seconds of speaking per question with specific details and examples.");
  } else if (result.contentScore < 70) {
    feedback.push("Good content development. Add more specific examples and personal experiences to strengthen your responses.");
  } else {
    feedback.push("Well-developed content! You provide appropriate detail and stay on topic effectively.");
  }
  
  if (result.textTypeScore < 50) {
    feedback.push("Work on producing connected paragraphs. Use linking words like 'because,' 'however,' 'in addition,' and 'for example' to connect your ideas.");
  } else if (result.textTypeScore < 70) {
    feedback.push("Good paragraph-level production. Focus on organizing your ideas with clear topic sentences and supporting details.");
  } else {
    feedback.push("Excellent text organization! Your discourse is well-structured with clear connections between ideas.");
  }
  
  return feedback;
}

function generateSuggestions(result: { overallScore: number; functionScore: number; accuracyScore: number; contentScore: number; textTypeScore: number; passed: boolean }): string[] {
  const suggestions: string[] = [];
  
  if (!result.passed) {
    suggestions.push("🎯 Target: Advanced Low requires paragraph-level narration and description in past and present tenses.");
    suggestions.push("📝 Practice narrating stories from your past using past tense verbs (went, saw, experienced, felt).");
    suggestions.push("🗣️ Record yourself speaking for 60-90 seconds on familiar topics. Listen back and identify areas for improvement.");
    suggestions.push("📚 Learn and use transition words: 'first,' 'then,' 'after that,' 'finally,' 'however,' 'on the other hand.'");
    suggestions.push("🎬 Watch English movies/series and practice summarizing plots using narration and description.");
    suggestions.push("💬 Find a language partner and practice describing your daily experiences in detail.");
    suggestions.push("📖 Read articles and practice expressing opinions with supporting reasons.");
  } else {
    suggestions.push("🌟 Congratulations! You've demonstrated Advanced Low proficiency!");
    suggestions.push("📈 To advance to Advanced Mid, practice handling complications in narration (unexpected events, problems).");
    suggestions.push("🎯 Work on supporting your opinions with detailed examples and evidence.");
    suggestions.push("📚 Expand your vocabulary to discuss more abstract and hypothetical topics.");
    suggestions.push("💡 Practice the 'describe-narrate-opine' pattern: describe a situation, narrate what happened, then share your opinion.");
  }
  
  if (result.functionScore < 70) {
    suggestions.push("🔧 Function Focus: Practice these patterns daily - 'I remember when...', 'The reason I like this is...', 'In my experience...'");
  }
  if (result.accuracyScore < 70) {
    suggestions.push("🔧 Accuracy Focus: Shadow English speakers (repeat after them) to improve pronunciation and natural rhythm.");
  }
  if (result.contentScore < 70) {
    suggestions.push("🔧 Content Focus: Use the STAR method - Situation, Task, Action, Result - to structure your responses.");
  }
  if (result.textTypeScore < 70) {
    suggestions.push("🔧 Text Type Focus: Practice connecting 4-5 sentences into a coherent paragraph with a clear main idea.");
  }
  
  return suggestions;
}

export function scoreResponses(responses: TestResponse[], formNumber: number): ScoringResult {
  const functionScore = calculateFunctionScore(responses);
  const accuracyScore = calculateAccuracyScore(responses);
  const contentScore = calculateContentScore(responses);
  const textTypeScore = calculateTextTypeScore(responses);
  
  const overallScore = Math.round(
    (functionScore * 0.3) + (accuracyScore * 0.25) + (contentScore * 0.2) + (textTypeScore * 0.25)
  );
  
  // Determine proficiency level
  let proficiencyLevel = 'Novice Low';
  for (const [level, range] of Object.entries(PROFICIENCY_LEVELS)) {
    if (overallScore >= range.min && overallScore < range.max) {
      proficiencyLevel = level;
      break;
    }
  }
  if (overallScore >= 100) proficiencyLevel = 'Superior';
  
  const passed = overallScore >= 65; // Advanced Low threshold
  
  const feedback = generateFeedback({ functionScore, accuracyScore, contentScore, textTypeScore });
  const suggestions = generateSuggestions({ overallScore, functionScore, accuracyScore, contentScore, textTypeScore, passed });
  
  return {
    overallScore,
    proficiencyLevel,
    functionScore,
    accuracyScore,
    contentScore,
    textTypeScore,
    feedback,
    suggestions,
    passed,
  };
}
