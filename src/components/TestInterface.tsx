import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Avatar from './Avatar';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';
import { TestQuestion, TestResponse } from '../types';
import { warmupQuestion, testQuestionsByForm } from '../data/testQuestions';

interface TestInterfaceProps {
  formNumber: number;
  onComplete: (responses: TestResponse[]) => void;
}

type TestPhase = 'intro' | 'warmup' | 'question' | 'recording' | 'review' | 'transition';

export default function TestInterface({ formNumber, onComplete }: TestInterfaceProps) {
  const [phase, setPhase] = useState<TestPhase>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(-1);
  const [responses, setResponses] = useState<TestResponse[]>([]);
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isAvaSpeaking, setIsAvaSpeaking] = useState(false);
  const [showTranscript, setShowTranscript] = useState(false);
  const [recordingStarted, setRecordingStarted] = useState(false);
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const recordingTimerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingTimeRef = useRef(0);
  const responsesRef = useRef<TestResponse[]>([]);
  const currentQuestionRef = useRef<TestQuestion | null>(null);
  const currentQuestionIndexRef = useRef(-1);

  const { transcript, isListening, startListening, stopListening, resetTranscript, isSupported } = useSpeechRecognition();
  const { speak: speakText, cancel: cancelSpeech, isSpeaking: ttsSpeaking, isSupported: ttsSupported } = useSpeechSynthesis();

  const questions: TestQuestion[] = [warmupQuestion, ...testQuestionsByForm[formNumber]];
  const currentQuestion = currentQuestionIndex >= 0 ? questions[currentQuestionIndex] : null;

  // Keep refs in sync
  useEffect(() => {
    responsesRef.current = responses;
  }, [responses]);

  useEffect(() => {
    currentQuestionRef.current = currentQuestion;
    currentQuestionIndexRef.current = currentQuestionIndex;
  }, [currentQuestion, currentQuestionIndex]);

  // Timer for question display countdown
  useEffect(() => {
    if (phase === 'question' && currentQuestion) {
      setTimeRemaining(10);
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
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, currentQuestionIndex]);

  // Recording timer & auto-start
  useEffect(() => {
    if (phase === 'recording' && currentQuestion) {
      setRecordingTime(0);
      recordingTimeRef.current = 0;
      setRecordingStarted(false);
      
      // Auto-start recording
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
          startListening();
          setRecordingStarted(true);
        }
      };
      initRecording();

      recordingTimerRef.current = setInterval(() => {
        recordingTimeRef.current += 1;
        setRecordingTime(recordingTimeRef.current);
        
        if (recordingTimeRef.current >= currentQuestion.timeLimit) {
          doStopRecording();
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
        // Small delay before speaking
        const speakTimer = setTimeout(() => {
          speakText(currentQuestion.prompt);
        }, 500);
        return () => {
          clearTimeout(speakTimer);
          cancelSpeech();
        };
      } else {
        const timer = setTimeout(() => setIsAvaSpeaking(false), 3000);
        return () => clearTimeout(timer);
      }
    } else {
      setIsAvaSpeaking(false);
      cancelSpeech();
    }
  }, [phase, currentQuestionIndex]);

  // Update isAvaSpeaking based on TTS state
  useEffect(() => {
    if (ttsSupported && (phase === 'warmup' || phase === 'question')) {
      setIsAvaSpeaking(ttsSpeaking);
    }
  }, [ttsSpeaking, ttsSupported, phase]);

  const doStopRecording = useCallback(() => {
    if (recordingTimerRef.current) {
      clearInterval(recordingTimerRef.current);
      recordingTimerRef.current = null;
    }

    stopListening();

    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
      mediaRecorderRef.current.stream.getTracks().forEach(track => track.stop());
    }

    // Save response using refs to get latest values
    const q = currentQuestionRef.current;
    const qIndex = currentQuestionIndexRef.current;
    
    if (q) {
      const audioBlob = audioChunksRef.current.length > 0 
        ? new Blob(audioChunksRef.current, { type: 'audio/webm' })
        : undefined;

      const response: TestResponse = {
        questionIndex: qIndex,
        question: q.prompt,
        transcript: transcript,
        audioBlob,
        duration: recordingTimeRef.current,
        timestamp: Date.now(),
      };

      setResponses(prev => [...prev, response]);
    }

    setPhase('review');
    setShowTranscript(true);
  }, [transcript, stopListening]);

  const handleStopRecording = () => {
    doStopRecording();
  };

  const handleNextQuestion = () => {
    resetTranscript();
    setShowTranscript(false);
    setRecordingStarted(false);
    
    if (currentQuestionIndex < questions.length - 1) {
      setPhase('transition');
      setTimeout(() => {
        setCurrentQuestionIndex(prev => prev + 1);
        setPhase('question');
      }, 1500);
    } else {
      // Use ref to get the latest responses (including the one just added)
      // Small delay to ensure state update has propagated to ref
      setTimeout(() => {
        onComplete(responsesRef.current);
      }, 100);
    }
  };

  const startTest = () => {
    setCurrentQuestionIndex(0);
    setPhase('warmup');
    setTimeout(() => {
      setPhase('question');
    }, 4000);
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
          {!isSupported && (
            <div className="px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-xs text-amber-400">
              ⚠️ Speech recognition not supported. Use Chrome.
            </div>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="relative z-10 w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mb-6">
        <motion.div
          className="h-full bg-gradient-to-r from-purple-500 to-cyan-500"
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5 }}
        />
      </div>

      {/* Main content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full">
        <AnimatePresence mode="wait">
          {/* Intro Phase */}
          {phase === 'intro' && (
            <motion.div
              key="intro"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
              <Avatar isSpeaking={false} isListening={false} size="lg" />
              <h2 className="text-2xl md:text-3xl font-bold text-white mt-6 mb-3">
                Welcome to your OPIc Test
              </h2>
              <p className="text-gray-400 mb-2">
                You'll be speaking with Ava, your virtual interviewer.
              </p>
              <p className="text-gray-500 text-sm mb-8">
                You have {questions.length} questions to answer. Each question has a time limit.
                <br />Speak naturally and try to give detailed responses.
              </p>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-4 max-w-md mx-auto mb-6">
                <p className="text-amber-400 text-sm font-medium mb-2">📋 Before you start:</p>
                <ul className="text-gray-400 text-sm space-y-1 text-left">
                  <li>• Allow microphone access when prompted</li>
                  <li>• Use Chrome or Edge for best speech recognition</li>
                  <li>• Find a quiet environment</li>
                  <li>• Speak clearly and at a natural pace</li>
                </ul>
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
            <motion.div
              key={`q-${currentQuestionIndex}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center w-full"
            >
              <Avatar isSpeaking={isAvaSpeaking} isListening={false} size="md" />
              
              {/* Question bubble */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-6 mb-6 p-6 rounded-2xl bg-slate-800/80 border border-slate-700 backdrop-blur-sm max-w-2xl mx-auto"
              >
                <p className="text-white text-lg md:text-xl leading-relaxed">
                  "{currentQuestion.prompt}"
                </p>
                {ttsSupported && (
                  <button
                    onClick={() => speakText(currentQuestion.prompt)}
                    className="mt-3 px-4 py-1.5 rounded-lg bg-purple-500/20 border border-purple-500/30 text-purple-300 text-sm hover:bg-purple-500/30 transition-all flex items-center gap-2 mx-auto"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                    </svg>
                    Replay Question
                  </button>
                )}
              </motion.div>

              {/* Timer */}
              {phase === 'question' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center gap-3"
                >
                  <p className="text-gray-400 text-sm">Prepare your answer...</p>
                  <div className={`text-4xl font-bold font-mono ${timeRemaining <= 3 ? 'text-red-400 animate-pulse' : 'text-cyan-400'}`}>
                    {timeRemaining}
                  </div>
                  <p className="text-gray-500 text-xs">seconds to prepare</p>
                  <button
                    onClick={() => {
                      if (timerRef.current) clearInterval(timerRef.current);
                      setPhase('recording');
                    }}
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
            <motion.div
              key="recording"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              className="text-center w-full"
            >
              <Avatar isSpeaking={false} isListening={true} size="md" />
              
              {/* Recording indicator */}
              <div className="mt-6 mb-4 flex items-center justify-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse" />
                <span className="text-red-400 font-medium">Recording...</span>
              </div>

              {/* Waveform visualization */}
              {recordingStarted && (
                <div className="flex items-center justify-center gap-1 mb-4 h-8">
                  {[...Array(12)].map((_, i) => (
                    <div
                      key={i}
                      className="w-1 bg-gradient-to-t from-purple-500 to-cyan-500 rounded-full waveform-bar"
                      style={{ 
                        height: `${Math.random() * 20 + 8}px`,
                        animationDelay: `${i * 0.1}s`,
                        animationDuration: `${0.5 + Math.random() * 0.5}s`
                      }}
                    />
                  ))}
                </div>
              )}

              {/* Timer */}
              <div className="mb-4">
                <div className={`text-5xl font-bold font-mono ${
                  recordingTime >= currentQuestion.timeLimit - 10 ? 'text-amber-400' : 'text-white'
                }`}>
                  {formatTime(recordingTime)}
                </div>
                <p className="text-gray-500 text-sm mt-1">
                  / {formatTime(currentQuestion.timeLimit)} max
                </p>
              </div>

              {/* Timer bar */}
              <div className="w-full max-w-md mx-auto h-2 bg-slate-800 rounded-full overflow-hidden mb-6">
                <motion.div
                  className={`h-full rounded-full ${
                    recordingTime >= currentQuestion.timeLimit - 10 
                      ? 'bg-gradient-to-r from-amber-500 to-red-500' 
                      : 'bg-gradient-to-r from-green-500 to-cyan-500'
                  }`}
                  animate={{ width: `${(recordingTime / currentQuestion.timeLimit) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>

              {/* Live transcript */}
              {transcript && (
                <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50">
                  <p className="text-xs text-gray-500 mb-1">Live transcript:</p>
                  <p className="text-gray-300 text-sm leading-relaxed">{transcript}</p>
                </div>
              )}

              {/* Stop button */}
              <button
                onClick={handleStopRecording}
                className="px-8 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 transition-all flex items-center gap-2 mx-auto"
              >
                <div className="w-4 h-4 rounded-sm bg-white" />
                Stop Recording
              </button>

              {!recordingStarted && (
                <p className="text-amber-400 text-xs mt-3 animate-pulse">
                  ⏳ Initializing microphone...
                </p>
              )}
            </motion.div>
          )}

          {/* Review Phase */}
          {phase === 'review' && (
            <motion.div
              key="review"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="text-center w-full"
            >
              <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/50 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              
              <h3 className="text-xl font-bold text-white mb-2">Response Recorded!</h3>
              <p className="text-gray-400 text-sm mb-4">
                Duration: {formatTime(recordingTime)}
              </p>

              {/* Transcript display */}
              {showTranscript && responses.length > 0 && (
                <div className="max-w-2xl mx-auto mb-6 p-4 rounded-xl bg-slate-800/50 border border-slate-700/50 text-left">
                  <p className="text-xs text-gray-500 mb-2">Your response:</p>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {responses[responses.length - 1]?.transcript || '(No speech detected - try speaking louder or check your microphone)'}
                  </p>
                  {!responses[responses.length - 1]?.transcript && (
                    <p className="text-amber-400 text-xs mt-2">
                      💡 Tip: Make sure your microphone is enabled and speak clearly.
                    </p>
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
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center"
            >
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
