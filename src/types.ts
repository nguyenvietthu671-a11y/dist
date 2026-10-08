export type AppStage = 'welcome' | 'survey' | 'selfAssessment' | 'test' | 'results';

export interface SurveyAnswers {
  employment: string;
  studentPurpose: string;
  living: string;
  freeTime: string[];
  interests: string[];
  sports: string[];
  travel: string[];
}

export interface SelfAssessmentData {
  selectedLevel: string;
  formNumber: number;
}

export interface TestResponse {
  questionIndex: number;
  question: string;
  transcript: string;
  audioBlob?: Blob;
  duration: number;
  timestamp: number;
}

export interface ScoringResult {
  overallScore: number;
  proficiencyLevel: string;
  functionScore: number;
  accuracyScore: number;
  contentScore: number;
  textTypeScore: number;
  feedback: string[];
  suggestions: string[];
  passed: boolean;
}

export interface TestQuestion {
  id: string;
  prompt: string;
  type: 'warmup' | 'followup' | 'roleplay' | 'experience';
  timeLimit: number;
}
