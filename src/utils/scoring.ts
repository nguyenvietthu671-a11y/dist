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
    
    const wordCount = countWords(text);
    
    // Narration (past tense storytelling) - key for Intermediate/Advanced
    // STRICT: Must have at least 3 past tense verbs for full points
    const pastTenseMatches = text.match(/\b(went|saw|did|had|was|were|said|came|took|made|found|gave|told|thought|knew|got|felt|became|showed|heard|played|ran|brought|held|began|kept|left|let|spoke|stood|grew|drew)\b/gi) || [];
    if (pastTenseMatches.length >= 3) score += 12;
    else if (pastTenseMatches.length >= 1) score += 6;
    
    // Description (detailed descriptions) - STRICT: Need multiple descriptive words
    const descriptiveMatches = text.match(/\b(beautiful|amazing|wonderful|terrible|difficult|easy|interesting|important|significant|challenging|exciting|boring|complex|simple|traditional|modern|ancient|popular|famous|special|different|similar|comfortable|expensive|cheap|large|small|bright|dark|quiet|loud)\b/gi) || [];
    if (descriptiveMatches.length >= 3) score += 10;
    else if (descriptiveMatches.length >= 1) score += 5;
    
    // Opinions with support - STRICT: Must have opinion + reason
    const hasOpinion = /\b(i think|i believe|i feel|i agree|i disagree|in my opinion|from my perspective|personally|to me|it seems|it appears)\b/i.test(text);
    const hasReason = /\b(because|since|due to|the reason|that's why|so|therefore)\b/i.test(text);
    if (hasOpinion && hasReason) score += 10;
    else if (hasOpinion) score += 5;
    
    // Abstract topics - STRICT: Must discuss abstract concepts
    if (hasAbstractTopics(text) && wordCount >= 80) score += 8;
    else if (hasAbstractTopics(text)) score += 4;
    
    // Connectors and cohesive devices - STRICT: Need multiple connectors
    const connectorMatches = text.match(/\b(because|however|although|therefore|moreover|furthermore|in addition|on the other hand|for example|as a result|consequently|nevertheless|while|since|despite|first|second|finally|next|also)\b/gi) || [];
    if (connectorMatches.length >= 3) score += 8;
    else if (connectorMatches.length >= 1) score += 4;
    
    // Questions asked (shows interaction ability)
    if (/\?/.test(text)) score += 3;
    
    // Hypothetical situations (Advanced High+) - STRICT
    const hypotheticalMatches = text.match(/\b(would|could|if i|imagine|suppose|what if|might)\b/gi) || [];
    if (hypotheticalMatches.length >= 2) score += 5;
    else if (hypotheticalMatches.length >= 1) score += 2;
  });
  
  // Normalize to 100 - STRICT: Max possible increased
  const maxPossible = totalResponses * 56;
  const rawScore = Math.round((score / maxPossible) * 100);
  
  // Apply strict penalty: cap at 85 unless exceptional
  return Math.min(85, rawScore);
}

function calculateAccuracyScore(responses: TestResponse[]): number {
  let score = 25; // STRICT: Lower base score
  const validResponses = responses.filter(r => r.transcript && r.transcript.trim().length > 0);
  
  if (validResponses.length === 0) return 0;
  
  validResponses.forEach(r => {
    const wordCount = countWords(r.transcript);
    const sentenceCount = countSentences(r.transcript);
    
    if (wordCount === 0 || r.duration === 0) return;
    
    // Fluency indicator: words per second - STRICT: Narrower ideal range
    const wps = wordCount / r.duration;
    if (wps >= 2 && wps <= 2.8) score += 10; // Perfect fluency
    else if (wps >= 1.8 && wps <= 3) score += 6; // Good fluency
    else if (wps >= 1.5) score += 3; // Acceptable
    
    // Sentence complexity - STRICT: Higher requirements
    if (sentenceCount > 0) {
      const avgWordsPerSentence = wordCount / sentenceCount;
      if (avgWordsPerSentence >= 15 && avgWordsPerSentence <= 20) score += 10; // Complex sentences
      else if (avgWordsPerSentence >= 10 && avgWordsPerSentence <= 25) score += 6; // Good sentences
      else if (avgWordsPerSentence >= 7) score += 3; // Basic sentences
    }
    
    // Content length - STRICT: Much higher requirements
    if (wordCount >= 150) score += 10; // Excellent length
    else if (wordCount >= 100) score += 6; // Good length
    else if (wordCount >= 70) score += 3; // Acceptable
    
    // Duration - STRICT: Must speak for sufficient time
    if (r.duration >= 70) score += 7; // Excellent duration
    else if (r.duration >= 50) score += 4; // Good duration
    else if (r.duration >= 35) score += 2; // Acceptable
  });
  
  // STRICT: Cap at 80
  return Math.min(80, score);
}

function calculateContentScore(responses: TestResponse[]): number {
  let score = 20; // STRICT: Lower base score
  const validResponses = responses.filter(r => r.transcript && r.transcript.trim().length > 0);
  
  if (validResponses.length === 0) return 0;
  
  validResponses.forEach(r => {
    const wordCount = countWords(r.transcript);
    const question = r.question.toLowerCase();
    
    // Relevance: Check if response addresses the question - STRICT
    const questionWords = question.split(/\s+/).filter(w => w.length > 3);
    const responseWords = r.transcript.toLowerCase();
    const relevanceScore = questionWords.filter(qw => responseWords.includes(qw)).length;
    
    if (relevanceScore >= 4) score += 12; // Highly relevant
    else if (relevanceScore >= 3) score += 8; // Relevant
    else if (relevanceScore >= 2) score += 4; // Somewhat relevant
    
    // Specificity - STRICT: Must have multiple specifics
    const numberMatches = (r.transcript.match(/\d+/g) || []).length;
    if (numberMatches >= 3) score += 6; // Multiple specifics
    else if (numberMatches >= 1) score += 3; // Some specifics
    
    const exampleMatches = (r.transcript.match(/for example|such as|like|specifically|for instance/gi) || []).length;
    if (exampleMatches >= 2) score += 7; // Multiple examples
    else if (exampleMatches >= 1) score += 4; // One example
    
    const reasonMatches = (r.transcript.match(/because|since|due to|the reason|that's why/gi) || []).length;
    if (reasonMatches >= 2) score += 6; // Multiple explanations
    else if (reasonMatches >= 1) score += 3; // One explanation
    
    // Content depth - STRICT: Higher requirements
    if (wordCount >= 150) score += 10; // Excellent depth
    else if (wordCount >= 100) score += 6; // Good depth
    else if (wordCount >= 70) score += 3; // Acceptable depth
    
    // Duration - STRICT
    if (r.duration >= 60) score += 5;
    else if (r.duration >= 40) score += 3;
    else if (r.duration >= 25) score += 1;
  });
  
  // STRICT: Cap at 80
  return Math.min(80, score);
}

function calculateTextTypeScore(responses: TestResponse[]): number {
  let score = 15; // STRICT: Much lower base score
  const validResponses = responses.filter(r => r.transcript && r.transcript.trim().length > 0);
  
  if (validResponses.length === 0) return 0;
  
  const allText = validResponses.map(r => r.transcript).join(' ');
  const totalSentences = countSentences(allText);
  const totalWords = countWords(allText);
  
  // Paragraph-level production - STRICT: Higher requirements
  if (totalSentences >= 20) score += 15; // Excellent
  else if (totalSentences >= 15) score += 12; // Good
  else if (totalSentences >= 10) score += 8; // Acceptable
  else if (totalSentences >= 6) score += 4; // Basic
  
  // Connected discourse with cohesive devices - STRICT
  const connectorCount = (allText.match(/\b(because|however|although|therefore|moreover|furthermore|in addition|on the other hand|for example|as a result|consequently|nevertheless|while|since|despite|first|then|finally|next|also)\b/gi) || []).length;
  
  if (connectorCount >= 10) score += 15; // Excellent cohesion
  else if (connectorCount >= 7) score += 12; // Good cohesion
  else if (connectorCount >= 4) score += 8; // Some cohesion
  else if (connectorCount >= 2) score += 4; // Minimal cohesion
  
  // Multiple text types - STRICT: Must demonstrate all three
  const hasNarr = hasNarration(allText);
  const hasDesc = hasDescription(allText);
  const hasOpin = hasOpinions(allText);
  const textTypeCount = [hasNarr, hasDesc, hasOpin].filter(Boolean).length;
  
  if (textTypeCount >= 3) score += 15; // All three types
  else if (textTypeCount >= 2) score += 8; // Two types
  else if (textTypeCount >= 1) score += 4; // One type
  
  // Organization indicators - STRICT
  if (/first|second|third|finally|in conclusion|to summarize/i.test(allText)) score += 8;
  if (/on the one hand|on the other hand|in contrast|similarly/i.test(allText)) score += 7;
  
  // Overall length and complexity - STRICT: Much higher requirements
  if (totalWords >= 600) score += 12; // Excellent
  else if (totalWords >= 400) score += 8; // Good
  else if (totalWords >= 250) score += 4; // Acceptable
  
  // STRICT: Cap at 80
  return Math.min(80, score);
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

// Generate improved version of user's speech
function generateImprovedSpeech(responses: TestResponse[]): string {
  if (responses.length === 0) return '';
  
  const improvements: string[] = [];
  
  responses.forEach((response, index) => {
    const original = response.transcript;
    if (!original || original.trim().length === 0) return;
    
    // Step 1: Clean up the original text
    let improved = cleanupSpeech(original);
    
    // Step 2: Improve sentence structure
    improved = improveSentenceStructure(improved);
    
    // Step 3: Add natural connectors (not repetitive)
    improved = addNaturalConnectors(improved);
    
    // Step 4: Enhance vocabulary
    improved = enhanceVocabulary(improved);
    
    // Step 5: Add specific examples naturally
    improved = addSpecificExamples(improved, response.question);
    
    improvements.push(`**Question ${index + 1} - Improved Version:**\n\n${improved}\n`);
  });
  
  return improvements.join('\n---\n\n');
}

// Clean up speech recognition errors and filler words
function cleanupSpeech(text: string): string {
  let cleaned = text;
  
  // Remove common filler words
  cleaned = cleaned.replace(/\b(uh|um|umm|uhh|er|ah|like, you know|you know|I mean|basically|actually|sort of|kind of)\b/gi, '');
  
  // Remove repeated words
  cleaned = cleaned.replace(/\b(\w+)\s+\1\b/gi, '$1');
  
  // Fix common speech recognition errors
  cleaned = cleaned.replace(/\btwen\b/gi, 'twenty');
  cleaned = cleaned.replace(/\bper sign\b/gi, 'person');
  cleaned = cleaned.replace(/\bLuka\b/gi, 'look at');
  
  // Remove extra spaces
  cleaned = cleaned.replace(/\s+/g, ' ').trim();
  
  // Fix capitalization after periods
  cleaned = cleaned.replace(/\.\s+([a-z])/g, (match, letter) => `. ${letter.toUpperCase()}`);
  
  return cleaned;
}

// Improve sentence structure by combining short sentences
function improveSentenceStructure(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const improved: string[] = [];
  
  for (let i = 0; i < sentences.length; i++) {
    const current = sentences[i].trim();
    const next = i < sentences.length - 1 ? sentences[i + 1].trim() : '';
    
    // Combine very short sentences (< 8 words) with the next one
    if (current.split(/\s+/).length < 8 && next && next.split(/\s+/).length < 15) {
      const connectors = ['and', 'which', 'where', 'while', 'as'];
      const connector = connectors[Math.floor(Math.random() * connectors.length)];
      improved.push(`${current} ${connector} ${next.charAt(0).toLowerCase()}${next.slice(1)}`);
      i++; // Skip next sentence
    } else {
      improved.push(current);
    }
  }
  
  return improved.join('. ') + '.';
}

// Add natural connectors without repetition
function addNaturalConnectors(text: string): string {
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const connectorTypes = {
    addition: ['Additionally', 'Moreover', 'Furthermore', 'Also'],
    contrast: ['However', 'On the other hand', 'Nevertheless', 'Although'],
    example: ['For instance', 'Specifically', 'To illustrate', 'For example'],
    result: ['Therefore', 'As a result', 'Consequently', 'Thus'],
    sequence: ['First', 'Second', 'Finally', 'Next']
  };
  
  const usedConnectors = new Set<string>();
  const improved: string[] = [];
  
  sentences.forEach((sentence, index) => {
    let improvedSentence = sentence.trim();
    
    // Add connector to some sentences (not all)
    if (index > 0 && index % 3 === 0 && improvedSentence.length > 20) {
      const types = Object.keys(connectorTypes) as Array<keyof typeof connectorTypes>;
      const type = types[Math.floor(Math.random() * types.length)];
      const availableConnectors = connectorTypes[type].filter(c => !usedConnectors.has(c));
      
      if (availableConnectors.length > 0) {
        const connector = availableConnectors[Math.floor(Math.random() * availableConnectors.length)];
        usedConnectors.add(connector);
        improvedSentence = `${connector}, ${improvedSentence.charAt(0).toLowerCase()}${improvedSentence.slice(1)}`;
      }
    }
    
    improved.push(improvedSentence);
  });
  
  return improved.join('. ') + '.';
}

// Enhance vocabulary with better descriptive words
function enhanceVocabulary(text: string): string {
  let enhanced = text;
  
  // Replace basic words with better alternatives (only once per word)
  const replacements = [
    { old: /\bgood\b/gi, new: 'excellent' },
    { old: /\bbad\b/gi, new: 'challenging' },
    { old: /\bbig\b/gi, new: 'substantial' },
    { old: /\bsmall\b/gi, new: 'modest' },
    { old: /\bnice\b/gi, new: 'pleasant' },
    { old: /\bvery\b/gi, new: 'remarkably' },
  ];
  
  replacements.forEach(({ old, new: replacement }) => {
    const matches = enhanced.match(old);
    if (matches && matches.length <= 2) { // Only replace if used 2 times or less
      enhanced = enhanced.replace(old, replacement);
    }
  });
  
  return enhanced;
}

// Add specific examples naturally based on the question
function addSpecificExamples(text: string, question: string): string {
  // Only add example if the text is long enough and doesn't already have one
  if (text.length < 150 || /\b(for example|for instance|specifically)\b/i.test(text)) {
    return text;
  }
  
  // Add example at a natural breaking point (after a period in the middle)
  const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
  const middleIndex = Math.floor(sentences.length / 2);
  
  if (middleIndex > 0 && middleIndex < sentences.length) {
    const examplePhrases = [
      'To give you a specific example, ',
      'Let me illustrate this with an example: ',
      'For instance, I can recall a particular situation where '
    ];
    const examplePhrase = examplePhrases[Math.floor(Math.random() * examplePhrases.length)];
    
    sentences.splice(middleIndex, 0, examplePhrase + sentences[middleIndex].charAt(0).toLowerCase() + sentences[middleIndex].slice(1));
  }
  
  return sentences.join('. ') + '.';
}

export function scoreResponses(responses: TestResponse[], formNumber: number): ScoringResult {
  const functionScore = calculateFunctionScore(responses);
  const accuracyScore = calculateAccuracyScore(responses);
  const contentScore = calculateContentScore(responses);
  const textTypeScore = calculateTextTypeScore(responses);
  
  // STRICT: Apply harsher weighting
  const overallScore = Math.round(
    (functionScore * 0.28) + (accuracyScore * 0.27) + (contentScore * 0.22) + (textTypeScore * 0.23)
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
  
  // Generate improved speech
  const improvedSpeech = generateImprovedSpeech(responses);
  
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
    improvedSpeech,
  };
}
