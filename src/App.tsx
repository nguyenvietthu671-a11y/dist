import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { AppStage, SurveyAnswers, SelfAssessmentData, TestResponse, ScoringResult } from './types';
import Welcome from './components/Welcome';
import BackgroundSurvey from './components/BackgroundSurvey';
import SelfAssessment from './components/SelfAssessment';
import TestInterface from './components/TestInterface';
import Results from './components/Results';
import { scoreResponses } from './utils/scoring';

function App() {
  const [stage, setStage] = useState<AppStage>('welcome');
  const [surveyAnswers, setSurveyAnswers] = useState<SurveyAnswers | null>(null);
  const [assessmentData, setAssessmentData] = useState<SelfAssessmentData | null>(null);
  const [testResponses, setTestResponses] = useState<TestResponse[]>([]);
  const [scoringResult, setScoringResult] = useState<ScoringResult | null>(null);

  const handleSurveyComplete = (answers: SurveyAnswers) => {
    setSurveyAnswers(answers);
    setStage('selfAssessment');
  };

  const handleSelfAssessmentComplete = (data: SelfAssessmentData) => {
    setAssessmentData(data);
    setStage('test');
  };

  const handleTestComplete = (responses: TestResponse[]) => {
    setTestResponses(responses);
    if (assessmentData) {
      const result = scoreResponses(responses, assessmentData.formNumber);
      setScoringResult(result);
    }
    setStage('results');
  };

  const handleRestart = () => {
    setStage('welcome');
    setSurveyAnswers(null);
    setAssessmentData(null);
    setTestResponses([]);
    setScoringResult(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white overflow-hidden">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-600/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-purple-900/3 rounded-full blur-3xl" />
      </div>

      {/* Navigation breadcrumb */}
      {stage !== 'welcome' && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/50">
          <div className="max-w-7xl mx-auto px-4 py-2 flex items-center gap-2 text-xs">
            <button 
              onClick={handleRestart}
              className="text-gray-500 hover:text-gray-300 transition-colors"
            >
              🏠 Home
            </button>
            <span className="text-gray-700">/</span>
            {['survey', 'selfAssessment', 'test', 'results'].map((s, i) => {
              const stageOrder = ['survey', 'selfAssessment', 'test', 'results'];
              const currentIndex = stageOrder.indexOf(stage);
              const isActive = s === stage;
              const isCompleted = stageOrder.indexOf(s) < currentIndex;
              const labels = ['Survey', 'Self-Assessment', 'Test', 'Results'];
              
              return (
                <span key={s} className="flex items-center gap-2">
                  <span className={`
                    ${isActive ? 'text-purple-400 font-medium' : isCompleted ? 'text-green-400' : 'text-gray-600'}
                  `}>
                    {isCompleted ? '✓' : `${i + 1}.`} {labels[i]}
                  </span>
                  {i < 3 && <span className="text-gray-700">/</span>}
                </span>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={stage}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className={stage !== 'welcome' ? 'pt-10' : ''}
        >
          {stage === 'welcome' && (
            <Welcome onStart={() => setStage('survey')} />
          )}
          {stage === 'survey' && (
            <BackgroundSurvey onComplete={handleSurveyComplete} />
          )}
          {stage === 'selfAssessment' && (
            <SelfAssessment onComplete={handleSelfAssessmentComplete} />
          )}
          {stage === 'test' && assessmentData && (
            <TestInterface
              formNumber={assessmentData.formNumber}
              onComplete={handleTestComplete}
            />
          )}
          {stage === 'results' && scoringResult && (
            <Results
              result={scoringResult}
              responses={testResponses}
              onRestart={handleRestart}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

export default App;
