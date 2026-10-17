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
  
  if (totalResponses === 0) return 0;
  
  responses.forEach(r => {
    const text = r.transcript;
    if (!text || text.trim().length === 0) return;
    
    // Narration (past tense storytelling) - key for Intermediate/Advanced
    if (hasNarration(text)) score += 12;
    
    // Description (detailed descriptions) - key for all levels
    if (hasDescription(text)) score += 10;
    
    // Opinions with support - key for Advanced
    if (hasOpinions(text)) score += 10;
    
    // Abstract topics - key for Advanced High/Superior
    if (hasAbstractTopics(text)) score += 8;
    
    // Connectors and cohesive devices - key for paragraph-level discourse
    if (hasConnectors(text)) score += 8;
    
    // Questions asked (shows interaction ability)
    if (/\?/.test(text)) score += 3;
    
    // Hypothetical situations (Advanced High+)
    if (/would|could|if i|imagine/i.test(text)) score += 5;
  });
  
  // Normalize to 100
  const maxPossible = totalResponses * 56; // Max points per response
  return Math.min(100, Math.round((score / maxPossible) * 100));
}

function calculateAccuracyScore(responses: TestResponse[]): number {
  let score = 40; // Base score
  const validResponses = responses.filter(r => r.transcript && r.transcript.trim().length > 0);
  
  if (validResponses.length === 0) return 0;
  
  validResponses.forEach(r => {
    const wordCount = countWords(r.transcript);
    const sentenceCount = countSentences(r.transcript);
    
    if (wordCount === 0 || r.duration === 0) return;
    
    // Fluency indicator: words per second (natural speech is 2-3 wps)
    const wps = wordCount / r.duration;
    if (wps >= 1.8 && wps <= 3.5) score += 10; // Excellent fluency
    else if (wps >= 1.2 && wps <= 4) score += 6; // Good fluency
    else if (wps >= 0.8) score += 3; // Acceptable
    
    // Sentence complexity (longer sentences = more advanced)
    if (sentenceCount > 0) {
      const avgWordsPerSentence = wordCount / sentenceCount;
      if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 25) score += 8; // Complex sentences
      else if (avgWordsPerSentence >= 7 && avgWordsPerSentence <= 30) score += 5; // Good sentences
      else if (avgWordsPerSentence >= 5) score += 2; // Basic sentences
    }
    
    // Content length (more content = better)
    if (wordCount >= 150) score += 10; // Excellent length
    else if (wordCount >= 100) score += 7; // Good length
    else if (wordCount >= 60) score += 4; // Acceptable length
    else if (wordCount >= 30) score += 2; // Minimal
    
    // Duration (speaking longer shows confidence)
    if (r.duration >= 60) score += 5;
    else if (r.duration >= 40) score += 3;
    else if (r.duration >= 20) score += 1;
  });
  
  return Math.min(100, score);
}

function calculateContentScore(responses: TestResponse[]): number {
  let score = 30; // Base
  const validResponses = responses.filter(r => r.transcript && r.transcript.trim().length > 0);
  
  if (validResponses.length === 0) return 0;
  
  validResponses.forEach(r => {
    const wordCount = countWords(r.transcript);
    const question = r.question.toLowerCase();
    
    // Relevance: Check if response addresses the question
    const questionWords = question.split(/\s+/).filter(w => w.length > 3);
    const responseWords = r.transcript.toLowerCase();
    const relevanceScore = questionWords.filter(qw => responseWords.includes(qw)).length;
    
    if (relevanceScore >= 3) score += 12; // Highly relevant
    else if (relevanceScore >= 2) score += 8; // Somewhat relevant
    else if (relevanceScore >= 1) score += 4; // Minimally relevant
    
    // Specificity: Detailed responses with examples
    if (/\d+/.test(r.transcript)) score += 5; // Contains numbers/specifics
    if (/for example|such as|like|specifically/i.test(r.transcript)) score += 6; // Examples
    if (/because|since|due to|the reason/i.test(r.transcript)) score += 5; // Explanations
    
    // Content depth
    if (wordCount >= 120) score += 8;
    else if (wordCount >= 80) score += 5;
    else if (wordCount >= 50) score += 3;
    
    // Duration shows engagement
    if (r.duration >= 50) score += 4;
    else if (r.duration >= 30) score += 2;
  });
  
  return Math.min(100, score);
}

function calculateTextTypeScore(responses: TestResponse[]): number {
  let score = 25; // Base
  const validResponses = responses.filter(r => r.transcript && r.transcript.trim().length > 0);
  
  if (validResponses.length === 0) return 0;
  
  const allText = validResponses.map(r => r.transcript).join(' ');
  const totalSentences = countSentences(allText);
  const totalWords = countWords(allText);
  
  // Paragraph-level production (connected sentences)
  if (totalSentences >= 15) score += 15; // Excellent
  else if (totalSentences >= 10) score += 12; // Good
  else if (totalSentences >= 6) score += 8; // Acceptable
  else if (totalSentences >= 3) score += 4; // Basic
  
  // Connected discourse with cohesive devices
  const connectorCount = (allText.match(/\b(because|however|although|therefore|moreover|furthermore|in addition|on the other hand|for example|as a result|consequently|nevertheless|while|since|despite|first|then|finally|next|also)\b/gi) || []).length;
  
  if (connectorCount >= 8) score += 15; // Excellent cohesion
  else if (connectorCount >= 5) score += 12; // Good cohesion
  else if (connectorCount >= 3) score += 8; // Some cohesion
  else if (connectorCount >= 1) score += 4; // Minimal cohesion
  
  // Multiple text types (narration + description + opinion)
  const hasNarr = hasNarration(allText);
  const hasDesc = hasDescription(allText);
  const hasOpin = hasOpinions(allText);
  const textTypeCount = [hasNarr, hasDesc, hasOpin].filter(Boolean).length;
  
  if (textTypeCount >= 3) score += 15; // All three types
  else if (textTypeCount >= 2) score += 10; // Two types
  else if (textTypeCount >= 1) score += 5; // One type
  
  // Organization indicators
  if (/first|second|third|finally|in conclusion|to summarize/i.test(allText)) score += 8;
  if (/on the one hand|on the other hand|in contrast|similarly/i.test(allText)) score += 7;
  
  // Overall length and complexity
  if (totalWords >= 500) score += 10;
  else if (totalWords >= 300) score += 7;
  else if (totalWords >= 150) score += 4;
  
  return Math.min(100, score);
}

function generateFeedback(result: { functionScore: number; accuracyScore: number; contentScore: number; textTypeScore: number }): string[] {
  const feedback: string[] = [];
  
  // Function feedback
  if (result.functionScore < 50) {
    feedback.push("⚠️ Function: Your responses lack variety in language functions. Focus on narrating past events, describing in detail, and supporting your opinions with reasons.");
  } else if (result.functionScore < 70) {
    feedback.push("✓ Function: Good range of language functions. To improve, consistently combine narration and description in single responses.");
  } else if (result.functionScore < 85) {
    feedback.push("✓ Function: Strong functional range! You effectively narrate, describe, and support opinions. Work on handling hypothetical situations.");
  } else {
    feedback.push("✓ Function: Excellent! You demonstrate advanced ability to narrate, describe, support opinions, and discuss abstract topics.");
  }
  
  // Accuracy feedback
  if (result.accuracyScore < 45) {
    feedback.push("⚠️ Accuracy: Focus on speaking in complete sentences. Practice longer responses (45-60 seconds) with natural pacing (2-3 words per second).");
  } else if (result.accuracyScore < 65) {
    feedback.push("✓ Accuracy: Developing well. Work on complex sentence structures and varied vocabulary. Aim for 10-15 words per sentence.");
  } else if (result.accuracyScore < 80) {
    feedback.push("✓ Accuracy: Strong! Your fluency and sentence complexity are good. Continue expanding vocabulary and refining pronunciation.");
  } else {
    feedback.push("✓ Accuracy: Excellent! Your speech is fluent, well-structured, and demonstrates strong control of grammar and vocabulary.");
  }
  
  // Content feedback
  if (result.contentScore < 45) {
    feedback.push("⚠️ Content: Responses are too brief or off-topic. Address the question directly with specific details, examples, and explanations.");
  } else if (result.contentScore < 65) {
    feedback.push("✓ Content: Good relevance. Strengthen responses with more specific examples, numbers, and personal experiences.");
  } else if (result.contentScore < 80) {
    feedback.push("✓ Content: Well-developed! You provide relevant details and examples. Work on deeper explanations and analysis.");
  } else {
    feedback.push("✓ Content: Excellent! Your responses are highly relevant, detailed, and well-supported with specific examples.");
  }
  
  // Text type feedback
  if (result.textTypeScore < 45) {
    feedback.push("⚠️ Text Type: Use connecting words (because, however, for example, in addition) to link ideas into connected paragraphs.");
  } else if (result.textTypeScore < 65) {
    feedback.push("✓ Text Type: Good paragraph-level discourse. Organize ideas with clear structure: topic sentence, supporting details, conclusion.");
  } else if (result.textTypeScore < 80) {
    feedback.push("✓ Text Type: Strong organization! You use cohesive devices effectively. Work on varying your text types (narration, description, opinion).");
  } else {
    feedback.push("✓ Text Type: Excellent! Your discourse is well-organized with sophisticated use of cohesive devices and multiple text types.");
  }
  
  return feedback;
}

function generateSuggestions(result: { overallScore: number; functionScore: number; accuracyScore: number; contentScore: number; textTypeScore: number; passed: boolean }): string[] {
  const suggestions: string[] = [];
  
  // Overall level guidance
  if (!result.passed) {
    if (result.overallScore < 40) {
      suggestions.push("🎯 Current Level: Novice/Early Intermediate. Target: Advanced Low (65+ points)");
      suggestions.push("📝 Priority: Build sentence-level fluency. Practice speaking in complete sentences for 30-45 seconds.");
    } else if (result.overallScore < 55) {
      suggestions.push("🎯 Current Level: Intermediate. Target: Advanced Low (65+ points)");
      suggestions.push("📝 Priority: Develop paragraph-level discourse. Connect 4-6 sentences with transition words.");
    } else {
      suggestions.push("🎯 Current Level: High Intermediate. Target: Advanced Low (65+ points)");
      suggestions.push("📝 Priority: Master narration in past tense and description with detailed examples.");
    }
  } else {
    suggestions.push("🌟 Congratulations! You've achieved Advanced Low proficiency!");
    if (result.overallScore < 75) {
      suggestions.push("📈 Next Target: Advanced Mid (75+ points). Focus on handling complications and supporting opinions.");
    } else {
      suggestions.push("📈 Next Target: Advanced High (82+ points). Work on abstract topics and hypothetical situations.");
    }
  }
  
  // Specific skill improvements based on lowest scores
  const scores = [
    { name: 'Function', score: result.functionScore },
    { name: 'Accuracy', score: result.accuracyScore },
    { name: 'Content', score: result.contentScore },
    { name: 'Text Type', score: result.textTypeScore },
  ].sort((a, b) => a.score - b.score);
  
  const weakest = scores[0];
  const secondWeakest = scores[1];
  
  // Weakest area suggestions
  if (weakest.name === 'Function') {
    suggestions.push("🔧 Priority - Function: Practice these daily patterns:");
    suggestions.push("   • Narration: 'Last week, I went to... First, I... Then, I... Finally, I...'");
    suggestions.push("   • Description: 'It was a [adjective] place with [details]. The most interesting part was...'");
    suggestions.push("   • Opinion: 'I think/believe [opinion] because [reason 1] and [reason 2].'");
  } else if (weakest.name === 'Accuracy') {
    suggestions.push("🔧 Priority - Accuracy: Improve fluency and sentence structure:");
    suggestions.push("   • Shadowing: Listen to native speakers and repeat after them for 10 minutes daily");
    suggestions.push("   • Record yourself: Speak for 60 seconds, listen back, identify areas to improve");
    suggestions.push("   • Sentence expansion: Start with simple sentences, add details gradually");
  } else if (weakest.name === 'Content') {
    suggestions.push("🔧 Priority - Content: Provide more specific details:");
    suggestions.push("   • Use the 5 W's: Who, What, When, Where, Why in every response");
    suggestions.push("   • Add examples: 'For example...', 'Such as...', 'Like when I...'");
    suggestions.push("   • Include numbers: 'I've been doing this for 3 years', 'There were 5 people'");
  } else if (weakest.name === 'Text Type') {
    suggestions.push("🔧 Priority - Text Type: Improve organization and cohesion:");
    suggestions.push("   • Use transitions: 'First...', 'However...', 'In addition...', 'For example...', 'As a result...'");
    suggestions.push("   • Structure: Topic sentence → Supporting details → Conclusion");
    suggestions.push("   • Practice: Write outlines before speaking to organize your thoughts");
  }
  
  // Second weakest area
  if (secondWeakest.name !== weakest.name && secondWeakest.score < 70) {
    suggestions.push("");
    suggestions.push(`📚 Also improve - ${secondWeakest.name}:`);
    if (secondWeakest.name === 'Function') {
      suggestions.push("   • Mix narration and description: Tell a story AND describe the setting/people");
    } else if (secondWeakest.name === 'Accuracy') {
      suggestions.push("   • Practice complex sentences: Use 'although', 'because', 'while', 'despite'");
    } else if (secondWeakest.name === 'Content') {
      suggestions.push("   • Answer completely: Address all parts of the question with specific details");
    } else if (secondWeakest.name === 'Text Type') {
      suggestions.push("   • Connect ideas: Use 'therefore', 'consequently', 'on the other hand'");
    }
  }
  
  // General practice tips
  suggestions.push("");
  suggestions.push("💡 Daily Practice Routine:");
  suggestions.push("   • Morning: Describe your plans for the day (30 seconds)");
  suggestions.push("   • Afternoon: Narrate something that happened (45 seconds)");
  suggestions.push("   • Evening: Share your opinion on a topic (60 seconds)");
  suggestions.push("   • Weekly: Record a 2-minute response and review it");
  
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
