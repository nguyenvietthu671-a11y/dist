import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from './Avatar';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { TestQuestion, TestResponse, SurveyAnswers } from '../types';
import { warmupQuestions, generatePersonalizedQuestions, getQuestionBankStats } from '../data/testQuestions';

interface TestInterfaceProps {
  formNumber: number;
  surveyAnswers: SurveyAnswers;
  onComplete: (responses: TestResponse[]) => void;
}

type TestPhase = 'intro' | 'warmup' | 'question' | 'recording' | 'review' | 'transition';

interface TestProgress {
  phase: TestPhase;
  currentQuestionIndex: number;
  responses: TestResponse[];
  timestamp: number;
}

const STORAGE_KEY = 'opic_test_progress';

// Save progress to localStorage
const saveProgress = (phase: TestPhase, currentQuestionIndex: number, responses: TestResponse[]) => {
  try {
    const progress: TestProgress = {
      phase,
      currentQuestionIndex,
      responses,
      timestamp: Date.now(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch (e) {
    console.error('Failed to save progress:', e);
  }
};

// Load progress from localStorage
const loadProgress = (): TestProgress | null => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (!saved) return null;
    
    const progress: TestProgress = JSON.parse(saved);
    
    // Check if progress is less than 2 hours old
    const twoHours = 2 * 60 * 60 * 1000;
    if (Date.now() - progress.timestamp > twoHours) {
      localStorage.removeItem(STORAGE_KEY);
      return null;
    }
    
    return progress;
  } catch (e) {
    console.error('Failed to load progress:', e);
    return null;
  }
};

// Clear progress from localStorage
const clearProgress = () => {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Failed to clear progress:', e);
  }
};

export default function TestInterface({ formNumber, surveyAnswers, onComplete }: TestInterfaceProps) {
  // Load saved progress on mount
  const savedProgress = loadProgress();
  
  const [phase, setPhase] = useState<TestPhase>(savedProgress?.phase || 'intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(savedProgress?.currentQuestionIndex || -1);
  const [responses, setResponses] = useState<TestResponse[]>(savedProgress?.responses || []);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAvaSpeaking, setIsAvaSpeaking] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [recordingStarted, setRecordingStarted] = useState(false);
  const [manualText, setManualText] = useState('');
  const [useManualInput, setUseManualInput] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEndTestModal, setShowEndTestModal] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimeRef = useRef(0);
  const responsesRef = useRef<TestResponse[]>([]);
  const currentQuestionRef = useRef<TestQuestion | null>(null);
  const currentQuestionIndexRef = useRef(-1);
  const manualTextRef = useRef('');
  const useManualInputRef = useRef(false);

  const { transcript, interimTranscript, isListening, startListening, stopListening, resetTranscript, isSupported, getFinalTranscript, error } = useSpeechRecognition();
  const { speak: speakText, cancel: cancelSpeech, isSpeaking: ttsSpeaking, isSupported: ttsSupported } = useSpeechSynthesis();

  // Generate personalized questions based on survey answers
  const personalizedQuestions = useRef(generatePersonalizedQuestions(surveyAnswers, formNumber));
  const questions: TestQuestion[] = [...warmupQuestions, ...personalizedQuestions.current];
  const currentQuestion = currentQuestionIndex >= 0 ? questions[currentQuestionIndex] : null;

  // Keep refs in sync
  useEffect(() => { responsesRef.current = responses; }, [responses]);
  useEffect(() => { currentQuestionRef.current = currentQuestion; currentQuestionIndexRef.current = currentQuestionIndex; }, [currentQuestion, currentQuestionIndex]);
  useEffect(() => { manualTextRef.current = manualText; }, [manualText]);
  useEffect(() => { useManualInputRef.current = useManualInput; }, [useManualInput]);

  // Save progress to localStorage whenever state changes
  useEffect(() => {
    if (phase !== 'intro' && phase !== 'transition') {
      saveProgress(phase, currentQuestionIndex, responses);
    }
  }, [phase, currentQuestionIndex, responses]);

  // Timer for question display countdown
  useEffect(() => {
    if (phase === 'question' && currentQuestion) {
      setTimeRemaining(15);
      timerRef.current = setInterval(() => {
        setTimeRemaining(prev => {
          if (prev <= 1) {
            if (timerRef.current) clearInterval(timerRef.current);
            setPhase('recording');
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, currentQuestionIndex]);

  // Recording timer & auto-start
  useEffect(() => {
    if (phase === 'recording' && currentQuestion) {
      setRecordingTime(0);
      recordingTimeRef.current = 0;
      setRecordingStarted(false);
      setMicError(null);

      if (!useManualInput) {
        // Auto-start recording with microphone
        const initRecording = async () => {
          try {
            const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
            const mediaRecorder = new MediaRecorder(stream);
            mediaRecorderRef.current = mediaRecorder;
            audioChunksRef.current = [];

            mediaRecorder.ondataavailable = (event) => {
              audioChunksRef.current.push(event.data);
            };

            mediaRecorder.start();
            startListening();
            setRecordingStarted(true);
          } catch (err) {
            console.error('Error accessing microphone:', err);
            setMicError('Microphone access denied. Please use manual text input or allow microphone access.');
            setUseManualInput(true);
            setRecordingStarted(true);
          }
        };
        initRecording();
      } else {
        setRecordingStarted(true);
      }

      recordingTimerRef.current = setInterval(() => {
        recordingTimeRef.current += 1;
        setRecordingTime(recordingTimeRef.current);
        
        if (recordingTimeRef.current >= currentQuestion.timeLimit) {
          handleStopRecording();
        }
      }, 1000);
    }
    return () => {
      if (recordingTimerRef.current) {
        clearInterval(recordingTimerRef.current);
        recordingTimerRef.current = null;
      }
    };
  }, [phase, currentQuestionIndex]);

  // Ava speaking - use TTS when available
  useEffect(() => {
    if (phase === 'warmup' || phase === 'question') {
      setIsAvaSpeaking(true);
      if (currentQuestion && ttsSupported) {
        const speakTimer = setTimeout(() => {
          speakText(currentQuestion.prompt);
        }, 500);
        return () => { clearTimeout(speakTimer); cancelSpeech(); };
      } else {
        const timer = setTimeout(() => setIsAvaSpeaking(false), 3000);
        return () => clearTimeout(timer);
      }
    } else {
      setIsAvaSpeaking(false);
      cancelSpeech();
    }
  }, [phase, currentQuestionIndex]);

  useEffect(() => {
    if (ttsSupported && (phase === 'warmup' || phase === 'question')) {
      setIsAvaSpeaking(ttsSpeaking);
    }
  }, [ttsSpeaking, ttsSupported, phase]);

  const handleStopRecording = async () => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    setIsProcessing(true);

    const isManualMode = useManualInputRef.current;
    const q = currentQuestionRef.current;
    const qIndex = currentQuestionIndexRef.current;
    
    if (q) {
      let finalTranscript = '';
      
      if (isManualMode) {
        // Text mode - get immediately
        finalTranscript = manualTextRef.current;
      } else {
        // Voice mode - stop recording first
        stopListening();
        if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
          mediaRecorderRef.current.stop();
          mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
        }
        
        // Wait 2 seconds for speech recognition to finalize
        console.log('⏳ Waiting for speech recognition to finalize...');
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Get the final transcript
        finalTranscript = getFinalTranscript();
        console.log('✅ Final transcript retrieved:', finalTranscript.length, 'characters');
      }
      
      const audioBlob = audioChunksRef.current.length > 0 
        ? new Blob(audioChunksRef.current, { type: 'audio/webm' })
        : undefined;

      const response: TestResponse = {
        questionIndex: qIndex,
        question: q.prompt,
        transcript: finalTranscript.trim(),
        audioBlob,
        duration: recordingTimeRef.current,
        timestamp: Date.now(),
      };

      setResponses(prev => [...prev, response]);
    }

    setIsProcessing(false);
    setPhase('review');
    setShowTranscript(true);
  };

  const handleNextQuestion = () => {
    resetTranscript();
    setShowTranscript(false);
    setRecordingStarted(false);
    setManualText('');
    setMicError(null);
    
    if (currentQuestionIndex < questions.length - 1) {
      setPhase('transition');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setPhase('question');
      }, 1500);
    } else {
      // Test completed - clear progress
      clearProgress();
      setTimeout(() => {
        onComplete(responsesRef.current);
      }, 100);
    }
  };

  const startTest = () => {
    // Clear any saved progress when starting a new test
    clearProgress();
    
    // Log question bank stats
    const stats = getQuestionBankStats();
    console.log('📊 Question Bank Stats:', stats);
    console.log(`📝 Total questions for this test: ${questions.length}`);
    
    // Validate all questions
    const allQuestionsValid = questions.every(q => {
      const isValid = q.prompt && q.prompt.trim().length > 0;
      if (!isValid) {
        console.error(`❌ Invalid question found:`, q);
      }
      return isValid;
    });
    
    if (allQuestionsValid) {
      console.log('✅ All questions are valid and from the question bank');
    } else {
      console.error('❌ Some questions are invalid!');
    }
    
    setCurrentQuestionIndex(0);
    setPhase('warmup');
    setTimeout(() => {
      setPhase('question');
    }, 4000);
  };

  const handleEndTest = () => {
    // Clear saved progress
    clearProgress();
    
    // Complete the test with current responses
    if (responses.length > 0) {
      onComplete(responses);
    } else {
      // If no responses, go back to welcome
      window.location.reload();
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progress = ((currentQuestionIndex + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen flex flex-col p-4 md:p-6 relative">
      {/* Background */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-cyan-900/5" />
      
      {/* Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className="px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-sm text-gray-400">
            Form {formNumber} • {currentQuestionIndex + 1}/{questions.length}
          </div>
        </div>
        <div className="flex items-center gap-2">
          {/* Input mode toggle */}
          {phase === 'recording' && (
            <button
              onClick={() => setUseManualInput(!useManualInput)}
              className={`px-3 py-1 rounded-full text-xs border transition-all ${
                useManualInput 
                  ? 'bg-cyan-500/20 border-cyan-500/30 text-cyan-300' 
                  : 'bg-slate-800 border-slate-700 text-gray-400 hover:border-slate-600'
              }`}
            >
              {useManualInput ? '⌨️ Text Input' : '🎤 Voice Input'}
            </button>
          )}
          
          {/* End Test Button */}
          {phase !== 'intro' && phase !== 'review' && responses.length > 0 && (
            <button
              onClick={() => setShowEndTestModal(true)}
              className="px-3 py-1 rounded-full text-xs border border-red-500/30 bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-all"
            >
              🏁 End Test
            </button>
          )}
          
          {!isSupported && (
            <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400">
              ⚠️ Speech recognition not available
            </div>
          )}
        </div>
      </div>

      {/* End Test Confirmation Modal */}
      {showEndTestModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-slate-800 border border-slate-700 rounded-2xl p-6 max-w-md mx-4"
          >
            <h3 className="text-xl font-bold text-white mb-3">End Test Early?</h3>
            <p className="text-gray-400 mb-4">
              You've answered {responses.length} out of {questions.length} questions. 
              Are you sure you want to end the test and see your results?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowEndTestModal(false)}
                className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-gray-300 hover:bg-slate-700 transition-all"
              >
                Continue Test
              </button>
              <button
                onClick={handleEndTest}
                className="flex-1 px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-medium hover:from-red-500 hover:to-red-400 transition-all"
              >
                End Test
              </button>
            </div>
          </motion.div>
        </div>
      )}

      {/* Progress bar with dots */}
      <div className="relative z-10 w-full mb-6">
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-2">
          <motion.div
            className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
        {/* Progress dots */}
        <div className="flex justify-between items-center px-1">
          {questions.map((_, idx) => (
            <div
              key={idx}
              className={`w-2 h-2 rounded-full transition-all ${
                idx < currentQuestionIndex
                  ? 'bg-green-500' // Completed
                  : idx === currentQuestionIndex
                  ? 'bg-purple-500 scale-150' // Current
                  : 'bg-slate-700' // Not started
              }`}
              title={`Question ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* Intro Phase */}
          {phase === 'intro' && (
            <motion.div key="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <Avatar isSpeaking={false} isListening={false} size="lg" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-6 mb-3">Welcome to your OPIc Test</h2>
              <p className="text-gray-400 mb-2">You'll be speaking with Ava, your virtual interviewer.</p>
              <p className="text-gray-500 text-sm mb-6">
                You have {questions.length} personalized questions based on your survey answers.
              </p>
              
              {/* Resume Test Dialog */}
              {savedProgress && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-cyan-500/10 border border-cyan-500/30 rounded-xl p-4 max-w-md mx-auto mb-6"
                >
                  <p className="text-cyan-300 font-medium mb-2">📝 Previous Test Found</p>
                  <p className="text-gray-400 text-sm mb-3">
                    You have a test in progress ({savedProgress.responses.length} answers completed).
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setPhase(savedProgress.phase);
                        setCurrentQuestionIndex(savedProgress.currentQuestionIndex);
                        setResponses(savedProgress.responses);
                        clearProgress();
                      }}
                      className="flex-1 px-4 py-2 rounded-lg bg-cyan-600 text-white text-sm font-medium hover:bg-cyan-500 transition-all"
                    >
                      Resume Test
                    </button>
                    <button
                      onClick={() => {
                        clearProgress();
                        setResponses([]);
                        setCurrentQuestionIndex(-1);
                      }}
                      className="flex-1 px-4 py-2 rounded-lg border border-slate-600 text-gray-300 text-sm hover:bg-slate-700 transition-all"
                    >
                      Start New
                    </button>
                  </div>
                </motion.div>
              )}
              
              {/* Input options info */}
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 max-w-md mx-auto mb-6 text-left">
                <p className="text-purple-400 text-sm font-medium mb-3">📋 How to answer:</p>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <span className="text-green-400">🎤</span>
                    <span className="text-gray-300"><strong>Voice Input:</strong> Speak your answer. It will be transcribed automatically.</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-cyan-400">⌨️</span>
                    <span className="text-gray-300"><strong>Text Input:</strong> Type your answer if microphone is not available.</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <p className="text-gray-500 text-xs">💡 You can switch between voice and text input at any time during recording.</p>
                  <p className="text-gray-500 text-xs mt-1">💾 Your progress is automatically saved. You can close the page and resume later.</p>
                </div>
              </div>

              <button
                onClick={startTest}
                className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all"
              >
                Begin Interview
              </button>
            </motion.div>
          )}

          {/* Warmup & Question Phase */}
          {(phase === 'warmup' || phase === 'question') && currentQuestion && (
            <motion.div key={`q-${currentQuestionIndex}`} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="text-center w-full">
              <Avatar isSpeaking={isAvaSpeaking} isListening={false} size="md" />
              
              {/* Question bubble */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }} className="mt-6 mb-6 p-6 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-sm max-w-2xl mx-auto">
                {/* Question type indicator */}
                <div className="mb-2 flex items-center justify-between">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    currentQuestion.type === 'warmup' ? 'bg-blue-500/20 text-blue-300' :
                    currentQuestion.type === 'roleplay' ? 'bg-pink-500/20 text-pink-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {currentQuestion.type === 'warmup' ? '🌡️ Warm-up' :
                     currentQuestion.type === 'roleplay' ? '🎭 Role-play' :
                     '💬 Experience'}
                  </span>
                  <span className="text-xs text-gray-500">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                
                <p className="text-white text-lg md:text-xl leading-relaxed">"{currentQuestion.prompt}"</p>
                {ttsSupported && (
                  <button onClick={() => speakText(currentQuestion.prompt)} className="mt-3 px-4 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm hover:bg-purple-500/30 transition-all flex items-center gap-2 mx-auto">
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    🔊 Replay Question
                  </button>
                )}
              </motion.div>

              {/* Timer */}
              {phase === 'question' && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-3">
                  <p className="text-gray-400 text-sm">Prepare your answer...</p>
                  <div className={`text-4xl font-bold font-mono ${timeRemaining <= 3 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
                    {timeRemaining}
                  </div>
                  <p className="text-gray-500 text-xs">seconds to prepare</p>
                  <button
                    onClick={() => { if (timerRef.current) clearInterval(timerRef.current); setPhase('recording'); }}
                    className="mt-2 px-6 py-2 rounded-lg bg-green-500/20 border border-green-500/30 text-green-300 text-sm font-medium hover:bg-green-500/30 transition-all flex items-center gap-2"
                  >
                    <div className="w-3 h-3 rounded-full bg-green-400" />
                    Start Recording Now
                  </button>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* Recording Phase */}
          {phase === 'recording' && currentQuestion && (
            <motion.div key="recording" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="text-center w-full">
              <Avatar isSpeaking={false} isListening={!useManualInput && recordingStarted} size="md" />
              
              {/* Question reminder - ALWAYS show the question during recording */}
              <div className="mt-4 mb-4 p-4 rounded-xl bg-slate-800/60 border border-purple-500/30 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    currentQuestion.type === 'warmup' ? 'bg-blue-500/20 text-blue-300' :
                    currentQuestion.type === 'roleplay' ? 'bg-pink-500/20 text-pink-300' :
                    'bg-purple-500/20 text-purple-300'
                  }`}>
                    {currentQuestion.type === 'warmup' ? '🌡️ Warm-up' :
                     currentQuestion.type === 'roleplay' ? '🎭 Role-play' :
                     '💬 Question'}
                  </span>
                  <span className="text-xs text-gray-400">
                    Question {currentQuestionIndex + 1} of {questions.length}
                  </span>
                </div>
                <p className="text-white text-base md:text-lg leading-relaxed text-left">
                  "{currentQuestion.prompt}"
                </p>
              </div>
              
              {/* Recording indicator */}
              <div className="mt-4 mb-4">
                <div className="flex items-center justify-center gap-3 mb-2">
                  <div className={`w-4 h-4 rounded-full ${useManualInput ? 'bg-cyan-500' : 'bg-red-500'} animate-pulse`} />
                  <span className={`text-lg font-semibold ${useManualInput ? 'text-cyan-400' : 'text-red-400'}`}>
                    {useManualInput ? '⌨️ Typing Mode' : '🎤 Recording...'}
                  </span>
                </div>
                {!useManualInput && (
                  <p className="text-gray-500 text-sm">Speak clearly into your microphone</p>
                )}
              </div>

              {/* Waveform visualization (voice mode only) */}
              {!useManualInput && recordingStarted && (
                <div className="flex items-center justify-center gap-1 mb-4 h-8">
                  {[...Array(12)].map((_, i) => (
                    <div key={i} className="w-1 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full waveform-bar"
                      style={{ height: `${Math.random() * 20 + 8}px`, animationDelay: `${i * 0.1}s`, animationDuration: `${0.5 + Math.random() * 0.5}s` }}
                    />
                  ))}
                </div>
              )}

              {/* Timer */}
              <div className="mb-4">
                <div className={`text-5xl font-bold font-mono ${recordingTime >= currentQuestion.timeLimit - 10 ? 'text-amber-400' : 'text-white'}`}>
                  {formatTime(recordingTime)}
                </div>
                <p className="text-gray-500 text-sm mt-1">/ {formatTime(currentQuestion.timeLimit)} max</p>
              </div>

              {/* Timer bar */}
              <div className="w-full max-w-md mx-auto h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
                <motion.div className={`h-full rounded-full ${recordingTime >= currentQuestion.timeLimit - 10 ? 'bg-gradient-to-r from-amber-500 to-red-500' : 'bg-gradient-to-r from-green-500 to-cyan-500'}`}
                  animate={{ width: `${(recordingTime / currentQuestion.timeLimit) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Voice transcript (live) - always show when in voice mode */}
              {!useManualInput && (
                <div className={`max-w-2xl mx-auto mb-4 p-4 rounded-xl border text-left transition-all ${
                  isListening 
                    ? 'bg-slate-800/50 border-green-500/30' 
                    : 'bg-slate-800/30 border-slate-700/50'
                }`}>
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      {isListening && (
                        <div className="flex gap-0.5">
                          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '0ms' }} />
                          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '150ms' }} />
                          <div className="w-1 h-3 bg-green-400 rounded-full animate-pulse" style={{ animationDelay: '300ms' }} />
                        </div>
                      )}
                      <p className={`text-xs font-medium ${isListening ? 'text-green-400' : 'text-gray-500'}`}>
                        🎤 Speech-to-Text {isListening ? '(Live)' : '(Paused)'}
                      </p>
                    </div>
                    <span className="text-xs text-gray-500">
                      {(transcript + ' ' + interimTranscript).trim().split(/\s+/).filter(w => w).length} words
                    </span>
                  </div>
                  
                  {transcript || interimTranscript ? (
                    <div className="min-h-[60px]">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {transcript}
                        {interimTranscript && (
                          <span className="text-cyan-400/70 italic"> {interimTranscript}</span>
                        )}
                        {isListening && <span className="inline-block w-0.5 h-4 bg-cyan-400 animate-pulse ml-0.5" />}
                      </p>
                    </div>
                  ) : (
                    <div className="min-h-[60px] flex items-center justify-center">
                      <p className="text-gray-600 text-sm italic">
                        {isListening ? '🎙️ Listening... Start speaking now' : '⏳ Waiting for microphone...'}
                      </p>
                    </div>
                  )}
                  
                  {isListening && (
                    <div className="mt-2 pt-2 border-t border-slate-700/50 flex items-center justify-between">
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                        <span className="text-xs text-green-400">Microphone active</span>
                      </div>
                      <span className="text-xs text-gray-500">Speak clearly into your microphone</span>
                    </div>
                  )}
                  
                  {error && (
                    <div className="mt-2 pt-2 border-t border-amber-500/30">
                      <p className="text-xs text-amber-400">⚠️ {error}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Manual text input */}
              {useManualInput && (
                <div className="max-w-2xl mx-auto mb-4 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-cyan-400 font-medium">⌨️ Type your answer:</p>
                    <span className="text-xs text-gray-500">{manualText.split(/\s+/).filter(w => w).length} words</span>
                  </div>
                  <textarea
                    value={manualText}
                    onChange={(e) => setManualText(e.target.value)}
                    placeholder="Type your spoken response here... Write as if you were speaking naturally."
                    className="w-full h-32 p-4 rounded-xl bg-slate-800/80 border border-slate-700 text-gray-200 text-sm leading-relaxed resize-none focus:outline-none focus:border-cyan-500/50 focus:ring-1 focus:ring-cyan-500/30 placeholder-gray-600"
                    autoFocus
                  />
                </div>
              )}

              {/* Microphone error */}
              {micError && (
                <div className="max-w-2xl mx-auto mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-left">
                  <p className="text-amber-400 text-sm">⚠️ {micError}</p>
                  <button
                    onClick={() => { setUseManualInput(true); setMicError(null); }}
                    className="mt-2 text-xs text-cyan-400 hover:text-cyan-300 underline"
                  >
                    Switch to text input →
                  </button>
                </div>
              )}

              {/* Stop button */}
              <button
                onClick={handleStopRecording}
                disabled={isProcessing}
                className={`px-8 py-3 rounded-xl font-semibold text-white transition-all flex items-center gap-2 mx-auto ${
                  isProcessing 
                    ? 'bg-gray-600 cursor-not-allowed' 
                    : 'bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400'
                }`}
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Processing Transcript...
                  </>
                ) : (
                  <>
                    <div className="w-4 h-4 rounded-sm bg-white" />
                    Submit Answer
                  </>
                )}
              </button>

              {!recordingStarted && !useManualInput && (
                <p className="text-amber-400 text-xs mt-3 animate-pulse">⏳ Initializing microphone...</p>
              )}
            </motion.div>
          )}

          {/* Review Phase */}
          {phase === 'review' && (
            <motion.div key="review" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="text-center w-full">
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Answer Submitted!</h3>
              <p className="text-gray-400 text-sm mb-4">Duration: {formatTime(recordingTime)}</p>

              {/* Transcript display */}
              {showTranscript && responses.length > 0 && (
                <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-left">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-purple-400 font-medium">📝 Your response transcript:</p>
                    <span className="text-xs text-gray-500">
                      {responses[responses.length - 1]?.transcript.split(/\s+/).filter(w => w).length || 0} words
                    </span>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {responses[responses.length - 1]?.transcript || '(No response recorded)'}
                  </p>
                  {!responses[responses.length - 1]?.transcript && (
                    <p className="text-amber-400 text-xs mt-2">💡 For better results, try speaking clearly or use the text input option.</p>
                  )}
                </div>
              )}

              <button
                onClick={handleNextQuestion}
                className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-500 hover:to-cyan-500 transition-all"
              >
                {currentQuestionIndex < questions.length - 1 ? 'Next Question →' : 'Finish Test →'}
              </button>
            </motion.div>
          )}

          {/* Transition Phase */}
          {phase === 'transition' && (
            <motion.div key="transition" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center">
              <div className="w-16 h-16 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center mx-auto mb-4 animate-pulse">
                <span className="text-2xl">⏳</span>
              </div>
              <p className="text-gray-400">Preparing next question...</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
